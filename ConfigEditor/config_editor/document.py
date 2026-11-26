"""Locate editable values, splice bytes, and save without rewriting the file."""

from dataclasses import dataclass
from datetime import datetime
from hashlib import sha256
import os
from pathlib import Path
import re
import stat
import tempfile

from .tex import TexError, control, group, option, skip_trivia


class DocumentError(ValueError):
    """A configuration file or an edit cannot be processed safely."""


class ExternalChange(DocumentError):
    """The loaded copy is no longer current."""


class SaveError(DocumentError):
    def __init__(self, message, backup=None):
        super().__init__(message)
        self.backup = backup


@dataclass(frozen=True)
class Field:
    span: tuple[int, int] | None = None
    reason: str = ""


_DECLARATIONS = {b"newcommand", b"renewcommand", b"providecommand",
                 b"DeclareRobustCommand", b"DeclareDocumentCommand",
                 b"NewDocumentCommand", b"RenewDocumentCommand",
                 b"ProvideDocumentCommand", b"let", b"futurelet",
                 b"def", b"gdef", b"edef", b"xdef", b"NewExpandableDocumentCommand",
                 b"RenewExpandableDocumentCommand", b"DeclareExpandableDocumentCommand"}
_UNSAFE = {b"catcode", b"endlinechar", b"obeylines", b"obeyspaces",
           b"ExplSyntaxOn", b"scantokens", b"verb"}
_ENVIRONMENTS = {b"verbatim", b"verbatim*", b"Verbatim", b"lstlisting", b"minted"}
_CONTEXTS = {b"begingroup", b"endgroup", b"bgroup", b"egroup",
             b"begin", b"end"}


def _target(data, pos):
    if data[pos:pos + 1] == b"{":
        start, end = group(data, pos)
        pos = skip_trivia(data, start)
        if data[pos:pos + 1] == b"\\":
            name, tail = control(data, pos)
            if skip_trivia(data, tail) == end:
                return name, end + 1
        return None, end + 1
    if data[pos:pos + 1] == b"\\":
        return control(data, pos)
    return None, pos


def inspect(data, names):
    """Return editable spans only for unambiguous top-level definitions."""
    wanted = {name.encode("ascii"): name for name in names}
    hits = {name: [] for name in names}
    conditional = block = 0
    pos = 3 if data.startswith(b"\xef\xbb\xbf") else 0
    try:
        while (pos := skip_trivia(data, pos)) < len(data):
            byte = data[pos]
            if byte == ord("{"):
                start, end = group(data, pos)
                # A declaration or override hidden in a group/argument is
                # not a safe target, even if its effect cannot be inferred.
                for name, item in inspect(data[start:end], names).items():
                    if item.span or (item.reason and item.reason != _MISSING):
                        hits[name].append(Field(reason=_AMBIGUOUS))
                pos = end + 1
                continue
            if byte == ord("}"):
                raise TexError("Llave de cierre sin grupo.")
            if byte != ord("\\"):
                pos += 1
                continue
            command, pos = control(data, pos)
            if command in _UNSAFE:
                raise TexError("El fichero usa una sintaxis de TeX no compatible con la edición segura.")
            if command.startswith(b"if"):
                conditional += 1
            elif command == b"fi":
                conditional -= 1
            elif command in _CONTEXTS:
                block += 1 if command in {b"begingroup", b"bgroup", b"begin"} else -1
                if command == b"begin":
                    p = skip_trivia(data, pos)
                    start, end = group(data, p)
                    if data[start:end] in _ENVIRONMENTS:
                        raise TexError("El fichero contiene un entorno de código no compatible.")
            if command not in _DECLARATIONS:
                continue

            pos += data[pos:pos + 1] == b"*"
            name, pos = _target(data, skip_trivia(data, pos))
            if command not in {b"newcommand", b"renewcommand", b"providecommand",
                               b"DeclareRobustCommand"}:
                if name in wanted:
                    hits[wanted[name]].append(Field(reason=_AMBIGUOUS))
                continue

            pos = skip_trivia(data, pos)
            has_options = False
            while data[pos:pos + 1] == b"[":
                has_options = True
                pos = skip_trivia(data, option(data, pos))
            start, end = group(data, pos)
            pos = end + 1
            if name in wanted:
                if command == b"newcommand" and not (has_options or conditional or block):
                    hits[wanted[name]].append(Field((start, end)))
                else:
                    hits[wanted[name]].append(Field(reason=_AMBIGUOUS))
    except (TexError, RecursionError) as exc:
        raise DocumentError("No se puede analizar el fichero con seguridad.") from exc

    return {name: results[0] if len(results) == 1 else
            Field(reason=_AMBIGUOUS if results else _MISSING)
            for name, results in hits.items()}


_MISSING = "No se encontró una definición editable de este campo."
_AMBIGUOUS = "La definición no es única o no puede editarse con seguridad."

_ESCAPES = {
    "\\": r"\textbackslash{}", "{": r"\{", "}": r"\}", "#": r"\#",
    "%": r"\%", "$": r"\$", "&": r"\&", "_": r"\_",
    "~": r"\textasciitilde{}", "^": r"\textasciicircum{}",
}
_ESCAPED = {value: key for key, value in _ESCAPES.items()}
_SPECIAL = re.compile("|".join(map(re.escape, _ESCAPED)) + r"|[\\{}#%$&_~^]")


def escape_text(text):
    return "".join(_ESCAPES.get(char, char) for char in text)


def plain_text(source):
    """Decode only the literal subset; never simplify other TeX markup."""
    parts = []
    pos = 0
    for match in _SPECIAL.finditer(source):
        literal = _ESCAPED.get(match[0])
        if literal is None:
            return None
        parts.extend([source[pos:match.start()], literal])
        pos = match.end()
    parts.append(source[pos:])
    return "".join(parts)


def validate_value(value):
    if any(ord(char) < 32 and char not in "\t\r\n" for char in value):
        raise DocumentError("El valor contiene caracteres de control no admitidos.")
    encoded = value.encode("utf-8")
    try:
        _, end = group(b"{" + encoded + b"}", 0)
    except TexError as exc:
        raise DocumentError("Revisa las llaves y los comentarios del valor.") from exc
    if end != len(encoded) + 1:
        raise DocumentError("El valor contiene una llave de cierre sin pareja.")
    return encoded


class ConfigDocument:
    def __init__(self, path, data, names):
        self.path = Path(path)
        self.data = data
        self.fingerprint = sha256(data).digest()
        self.names = tuple(names)
        try:
            data.decode("utf-8-sig")
        except UnicodeError as exc:
            raise DocumentError("Solo se admite myconfig.tex en UTF-8.") from exc
        self.fields = inspect(data, self.names)
        newline = re.search(rb"\r\n?|\n", data)
        self.newline = newline[0].decode() if newline else "\n"

    @classmethod
    def open(cls, path, names):
        path = Path(path)
        if not stat.S_ISREG(path.lstat().st_mode):
            raise DocumentError("Selecciona un myconfig.tex normal, no un enlace.")
        return cls(path, path.read_bytes(), names)

    def value(self, name):
        span = self.fields[name].span
        return None if span is None else self.data[slice(*span)].decode("utf-8")

    def render(self, edits):
        pieces = []
        for name, value in edits.items():
            field = self.fields.get(name)
            if not field or field.span is None:
                raise DocumentError("Se intentó modificar un campo no editable.")
            start, end = field.span
            encoded = validate_value(value)
            if encoded != self.data[start:end]:
                pieces.append((start, end, encoded))
        result = self.data
        for start, end, value in sorted(pieces, reverse=True):
            result = result[:start] + value + result[end:]
        return result

    def _ensure_current(self):
        if (not stat.S_ISREG(self.path.lstat().st_mode)
                or sha256(self.path.read_bytes()).digest() != self.fingerprint):
            raise ExternalChange("El fichero cambió en disco. Recárgalo antes de guardar.")

    def save(self, edits):
        """Return the reloaded byte snapshot and backup path; no-op if unchanged."""
        result = self.render(edits)
        if result == self.data:
            return self, None
        updated = ConfigDocument(self.path, result, self.names)
        backup = backup_candidate = temporary = None
        try:
            self._ensure_current()
            mode = stat.S_IMODE(self.path.stat().st_mode)
            backups = self.path.parent / ".myconfig-backups"
            backups.mkdir(mode=0o700, exist_ok=True)
            if backups.is_symlink() or not backups.is_dir():
                raise OSError("Invalid backup directory")
            stamp = datetime.now().strftime("%Y%m%d-%H%M%S-%f")
            with tempfile.NamedTemporaryFile(dir=backups, prefix=f"myconfig-{stamp}-",
                                             suffix=".tex", delete=False) as stream:
                backup_candidate = Path(stream.name)
                stream.write(self.data)
                stream.flush()
                os.fsync(stream.fileno())
            backup = backup_candidate
            with tempfile.NamedTemporaryFile(dir=self.path.parent, prefix=".myconfig-",
                                             suffix=".tmp", delete=False) as stream:
                temporary = Path(stream.name)
                stream.write(result)
                stream.flush()
                os.fsync(stream.fileno())
            os.chmod(temporary, mode)
            self._ensure_current()
            os.replace(temporary, self.path)
        except OSError as exc:
            raise SaveError("No se pudo guardar. Comprueba los permisos y que el fichero no esté bloqueado.",
                            backup) from exc
        finally:
            for leftover in (temporary, backup_candidate if backup is None else None):
                if leftover is None:
                    continue
                try:
                    leftover.unlink(missing_ok=True)
                except OSError:
                    pass
        return updated, backup

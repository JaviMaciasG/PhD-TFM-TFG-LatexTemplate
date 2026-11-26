"""Escape literals in a small LaTeX-aware subset, without expanding TeX."""

import re

from .tex import TexError


_TOKEN = re.compile(r"\\(?:[A-Za-z@]+|[^\r\n])")
_ENV = re.compile(r"\{([A-Za-z*]+)\}")
_COMMENTS = re.compile(r"(?:\\(?:[A-Za-z@]+|[^\r\n]))|(%[^\r\n]*)")
_ALIGN = frozenset({"align", "align*", "aligned", "alignedat", "alignat", "alignat*",
                    "gathered", "split", "array", "tabular", "tabular*", "tabularx", "cases",
                    "matrix", "pmatrix", "bmatrix", "Bmatrix", "vmatrix", "Vmatrix", "smallmatrix"})
_MATH_ENVS = (_ALIGN - {"tabular", "tabular*", "tabularx"}) | {
    "equation", "equation*", "displaymath", "math", "gather", "gather*", "multline", "multline*"}
_TEXT_COMMANDS = {"text", "textrm", "textsf", "texttt", "textnormal", "textbf",
                  "textmd", "textit", "textsl", "textsc", "emph", "mbox"}
_URI_COMMANDS = {"url", "nolinkurl", "href"}
_ESCAPED_DISPLAY = {"^": r"\textasciicircum{}"}


def normalise_entry(text, *, kind="text", original=""):
    """Apply only to dirty values. The document service still validates braces."""
    comments = {match[1] for match in _COMMENTS.finditer(original) if match[1]}
    return _Reader(text, comments).read(uri=kind == "uri", email=kind == "email")


class _Reader:
    def __init__(self, text, existing_comments):
        self.text = text
        self.existing_comments = existing_comments
        self.i = 0

    def _close_inline(self):
        """Single dollars pair on one line; a dollar followed by a digit can start another price."""
        i = self.i + 1
        while i < len(self.text) and self.text[i] not in "\r\n":
            token = _TOKEN.match(self.text, i)
            if token:
                i = token.end()
                continue
            if self.text[i] == "$":
                tail = self.text[i + 1:i + 2]
                return (bool(self.text[self.i + 1:i].strip()) and tail != "$" and not tail.isdigit())
            i += 1
        return False

    def _argument(self, **kwargs):
        start = self.i
        while self.i < len(self.text) and self.text[self.i] in " \t":
            self.i += 1
        gap = self.text[start:self.i]
        if self.text[self.i:self.i + 1] != "{":
            return gap
        self.i += 1
        return gap + "{" + self.read(stop="}", **kwargs) + "}"

    def read(self, stop=None, *, math=False, alignment=False, uri=False, email=False):
        parts = []
        text = self.text
        while self.i < len(text):
            if stop and text.startswith(stop, self.i):
                self.i += len(stop)
                return "".join(parts)
            c = text[self.i]
            if c == "\\":
                token = _TOKEN.match(text, self.i)
                if not token:
                    raise TexError("Barra invertida sin terminar.")
                cmd = token[0]
                self.i = token.end()
                if not uri and cmd in {r"\(", r"\["}:
                    close = r"\)" if cmd == r"\(" else r"\]"
                    parts.append(cmd + self.read(close, math=True) + close)
                elif not uri and cmd in {r"\)", r"\]", r"\end"}:
                    raise TexError("Hay un cierre de LaTeX sin pareja.")
                elif not uri and cmd == r"\begin":
                    match = _ENV.match(text, self.i)
                    if not match:
                        raise TexError("El entorno LaTeX no tiene un nombre válido.")
                    name = match[1]
                    close = r"\end{" + name + "}"
                    self.i = match.end()
                    contents = self.read(close, math=math or name in _MATH_ENVS, alignment=name in _ALIGN)
                    parts.append(cmd + match[0] + contents + close)
                elif cmd == r"\verb":
                    star = text[self.i:self.i + 1] == "*"
                    self.i += star
                    delimiter = text[self.i:self.i + 1]
                    end = text.find(delimiter, self.i + 1) if delimiter and not delimiter.isspace() else -1
                    if end < 0 or re.search("[\r\n]", text[self.i:end]):
                        raise TexError("Verbatim sin terminar.")
                    parts.append(cmd + ("*" if star else "") + text[self.i:end + 1])
                    self.i = end + 1
                else:
                    parts.append(cmd)
                    if cmd[1:] in _URI_COMMANDS:
                        parts.append(self._argument(uri=True))
                    elif math and cmd[1:] in _TEXT_COMMANDS:
                        parts.append(self._argument())
                continue
            if c == "}":
                raise TexError("El valor contiene una llave de cierre sin pareja.")
            if c == "{":
                self.i += 1
                parts.append("{" + self.read("}", math=math, alignment=alignment, uri=uri, email=email) + "}")
                continue
            if c == "$" and not (math or uri or email):
                delim = "$$" if text.startswith("$$", self.i) else "$" if self._close_inline() else ""
                if delim:
                    self.i += len(delim)
                    parts.append(delim + self.read(delim, math=True) + delim)
                    continue
            if c == "%" and not (uri or email):
                match = re.search(r"\r\n?|\n", text[self.i:])
                if match:
                    pos = self.i + match.start()
                    start = max(text.rfind("\n", 0, self.i), text.rfind("\r", 0, self.i)) + 1
                    comment = text[self.i:pos]
                    if not text[start:self.i].strip() or comment in self.existing_comments:
                        self.i += match.end()
                        parts.append(comment + match[0])
                        continue
            if uri:
                # Hyperref's URL scanner needs literal URL separators. %
                # and # must still survive the outer \newcommand argument.
                escaped = c in "%#"
            elif math:
                escaped = c in "%#$" or (c == "&" and not alignment)
            else:
                escaped = c in "%#$_^" or (c == "&" and not alignment)
            parts.append(_ESCAPED_DISPLAY.get(c, "\\" + c) if escaped else c)
            self.i += 1
        if stop:
            raise TexError("Hay un grupo, una fórmula o un entorno LaTeX sin cerrar.")
        return "".join(parts)

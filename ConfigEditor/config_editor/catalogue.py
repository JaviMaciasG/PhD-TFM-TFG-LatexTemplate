"""Read the selected project's registries without executing TeX."""

from dataclasses import dataclass
import re

from .tex import TexError, group, skip_trivia


@dataclass(frozen=True)
class Degree:
    identifier: str
    name: str
    university: str
    school: str
    work_type: str
    structure: str
    status: str
    profile: str = ""
    institution: str = ""
    name_en: str = ""
    university_en: str = ""
    school_en: str = ""

    def displayed(self, attribute, lang):
        return ((getattr(self, attribute + "_en") if lang == "english" else "")
                or getattr(self, attribute))

    @property
    def label(self):
        return self.display_label("spanish")

    def display_label(self, lang):
        variants = {"spanish": " — por compendio", "english": " — by publication"}
        variant = variants[lang] if self.structure == "compendium" else ""
        return f"{self.displayed('name', lang)}{variant} ({self.identifier})"


def _entries(path, commands):
    """Read the registry's declarative, one-property-per-line format."""
    data = path.read_bytes()
    data.decode("utf-8-sig")
    pattern = rb"(?m)^[ \t]*\\(" + b"|".join(commands) + rb")(?=\s|\{)"
    end = 0
    for match in re.finditer(pattern, data):
        if match.start() < end:
            continue
        start, end = group(data, skip_trivia(data, match.end()))
        identifier = data[start:end].decode().strip()
        parent = None
        if match[1] == b"DeclareDegreeVariant":
            start, end = group(data, skip_trivia(data, end + 1))
            parent = data[start:end].decode().strip()
        start, closing = group(data, skip_trivia(data, end + 1))
        fields = {}
        for line in data[start:closing].decode().splitlines():
            line = re.split(r"(?<!\\)%", line, maxsplit=1)[0].strip()
            if not line:
                continue
            key, separator, value = line.partition("=")
            if not separator or key.strip() in fields:
                raise TexError("Formato de registro no admitido.")
            value = value.strip().removesuffix(",").rstrip()
            fields[key.strip()] = value[1:-1] if value.startswith("{") and value.endswith("}") else value
        end = closing + 1
        yield identifier, parent, fields


def load_degrees(config_directory):
    institutions = {
        key: fields
        for key, _, fields in _entries(config_directory / "institutions.tex", (b"DeclareInstitution",))
    }
    resolved = {}
    result = []
    for key, parent, fields in _entries(config_directory / "degrees.tex",
                                         (b"DeclareDegreeVariant", b"DeclareDegree")):
        if key in resolved or (parent and parent not in resolved):
            raise TexError("El registro tiene una titulación duplicada o una variante sin base.")
        entry = {**resolved[parent], **fields} if parent else fields
        resolved[key] = entry
        institution = entry["institution"]
        university = institutions[institution]
        result.append(Degree(key, entry["degree-name"], university.get("university-name", institution),
                             entry["school"], entry["work-type"],
                             entry.get("document-structure", "standard"), entry["status"],
                             entry["layout-profile"], institution, entry.get("degree-name-english", ""),
                             university.get("university-name-english", ""), entry.get("school-english", "")))
    if not result:
        raise TexError("No se encontraron titulaciones.")
    return result


def load_styles(config_directory):
    data = (config_directory / "typesetting" / "typesetting.tex").read_bytes()
    match = re.search(rb"(?m)^\\def\\thesis@registeredstyles\{([a-z,-]+)\}", data)
    if not match:
        raise TexError("No se encontró la lista de estilos.")
    return tuple(match[1].decode().split(","))

"""Small, deliberately conservative reader for the template's TeX syntax."""

import re


class TexError(ValueError):
    """A construct cannot be read safely."""


_CONTROL = re.compile(rb"\\([A-Za-z@]+|[^A-Za-z@])", re.DOTALL)
_LINE = re.compile(rb"\r\n?|\n")


def control(data, pos):
    match = _CONTROL.match(data, pos)
    if not match:
        raise TexError("Barra invertida sin terminar.")
    return match[1], match.end()


def after_comment(data, pos):
    end = _LINE.search(data, pos)
    return end.end() if end else len(data)


def skip_trivia(data, pos):
    while pos < len(data):
        if data[pos] == ord("%"):
            pos = after_comment(data, pos)
        elif data[pos] in b" \t\r\n":
            pos += 1
        else:
            break
    return pos


def group(data, pos):
    """Return the half-open span of the contents of a braced group."""
    if data[pos:pos + 1] != b"{":
        raise TexError("Se esperaba un grupo entre llaves.")
    start = pos + 1
    pos = start
    depth = 1
    while pos < len(data):
        byte = data[pos]
        if byte == ord("\\"):
            name, pos = control(data, pos)
            if name == b"verb":
                pos += data[pos:pos + 1] == b"*"
                delimiter = data[pos:pos + 1]
                closing = data.find(delimiter, pos + 1) if delimiter else -1
                if closing < 0 or _LINE.search(data, pos, closing):
                    raise TexError("Verbatim sin terminar.")
                pos = closing + 1
            continue
        if byte == ord("%"):
            pos = after_comment(data, pos)
            continue
        if byte == ord("{"):
            depth += 1
        elif byte == ord("}"):
            depth -= 1
            if not depth:
                return start, pos
        pos += 1
    raise TexError("Hay un grupo sin cerrar.")


def option(data, pos):
    """End of a square-bracket command argument; groups shield inner brackets."""
    pos += 1
    while pos < len(data):
        byte = data[pos]
        if byte == ord("]"):
            return pos + 1
        if byte == ord("{"):
            _, pos = group(data, pos)
            pos += 1
        elif byte == ord("%"):
            pos = after_comment(data, pos)
        elif byte == ord("\\"):
            _, pos = control(data, pos)
        else:
            pos += 1
    raise TexError("Hay un argumento opcional sin cerrar.")

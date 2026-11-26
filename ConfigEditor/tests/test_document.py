import os
from pathlib import Path
import stat
import tempfile
import unittest
from unittest.mock import patch

from config_editor.document import (
    ConfigDocument, DocumentError, ExternalChange, SaveError, escape_text, plain_text,
)
from config_editor.fields import NAMES


ROOT = Path(__file__).resolve().parents[2]
STOCK = (ROOT / "Config" / "myconfig.tex").read_bytes()


class DocumentTest(unittest.TestCase):
    def setUp(self):
        directory = tempfile.TemporaryDirectory(prefix="editor-Á con espacios-")
        self.addCleanup(directory.cleanup)
        self.path = Path(directory.name) / "myconfig.tex"

    def load(self, data=STOCK):
        self.path.write_bytes(data)
        return ConfigDocument.open(self.path, NAMES)

    def test_stock_noop_is_byte_identical_and_does_not_write(self):
        document = self.load()
        self.assertTrue(all(field.span for field in document.fields.values()))
        timestamp = self.path.stat().st_mtime_ns
        self.assertEqual(document.save({}), (document, None))
        self.assertEqual(document.save({"myDegree": "GIEC"}), (document, None))
        self.assertEqual(STOCK, self.path.read_bytes())
        self.assertEqual(timestamp, self.path.stat().st_mtime_ns)
        self.assertFalse((self.path.parent / ".myconfig-backups").exists())

    def test_cross_tab_edits_only_change_selected_values(self):
        document = self.load()
        edits = {"myDegree": "PHDUAH-COMPENDIUM", "myAuthorName": "Ágata",
                 "myThesisDefenseYear": "2030", "ZenMode": "true"}
        expected = STOCK.replace(rb"\newcommand{\myDegree}{GIEC}",
                                 rb"\newcommand{\myDegree}{PHDUAH-COMPENDIUM}", 1)
        expected = expected.replace(rb"\newcommand{\myAuthorName}{Javier}",
                                    r"\newcommand{\myAuthorName}{Ágata}".encode(), 1)
        expected = expected.replace(rb"\newcommand{\myThesisDefenseYear}{2027}",
                                    rb"\newcommand{\myThesisDefenseYear}{2030}", 1)
        expected = expected.replace(rb"\newcommand{\ZenMode}{false}",
                                    rb"\newcommand{\ZenMode}{true}", 1)
        self.assertEqual(expected, document.render(edits))
        if os.name != "nt":
            self.path.chmod(0o640)
        updated, backup = document.save(edits)
        self.assertEqual(STOCK, backup.read_bytes())
        self.assertEqual(expected, self.path.read_bytes())
        self.assertEqual("Ágata", updated.value("myAuthorName"))
        if os.name != "nt":
            self.assertEqual(0o640, stat.S_IMODE(self.path.stat().st_mode))

    def test_bom_crlf_nested_comments_custom_commands_and_no_final_newline(self):
        def sample(value):
            return (b"\xef\xbb\xbf% untouched\r\n"
                    b"% \\newcommand{\\myAuthorName}{Ignored}\r\n"
                    b"\\newcommand* % comment between arguments\r\n"
                    b"  {\\myAuthorName}\t{" + value + b"} % keep\r\n"
                    b"\\newcommand{\\custom}[1]{#1}")
        raw = sample(b"First % } comment\r\nSecond \\textbf{{X}}\\{\\%")
        document = self.load(raw)
        self.assertEqual("First % } comment\r\nSecond \\textbf{{X}}\\{\\%", document.value("myAuthorName"))
        self.assertEqual("\r\n", document.newline)
        edited = "Nuevo\r\nvalor con \\textbf{énfasis}"
        updated, _ = document.save({"myAuthorName": edited})
        self.assertEqual(sample(edited.encode()), updated.data)
        self.assertEqual(updated.data, self.path.read_bytes())

    def test_missing_duplicate_conditional_and_nested_definitions_not_editable(self):
        data = (rb"\newcommand{\myDegree}{GIEC}\renewcommand{\myDegree}{OTHER}"
                rb"\iftrue\newcommand{\myLanguage}{spanish}\fi"
                rb"\other{\newcommand{\myAuthorSurname}{Surname}}"
                rb"\newcommand{\myAuthorName}[1]{#1}"
                rb"\def\myAuthorEmail{contact}"
                rb"\newcommand\myBookTitleSpanish{Title}")
        document = self.load(data)
        for field in ("myDegree", "myLanguage", "myAuthorSurname", "myAuthorName",
                      "myAuthorEmail", "myBookTitleEnglish"):
            with self.subTest(field=field):
                self.assertIsNone(document.value(field))
                with self.assertRaises(DocumentError):
                    document.render({field: "ignored"})
        self.assertEqual("Title", document.value("myBookTitleSpanish"))

    def test_markup_validation_never_writes_bad_braces_or_trailing_comments(self):
        document = self.load()
        for value in ("{unclosed", "}anything{", "part % hides closing brace", "\\"):
            with self.subTest(value=value), self.assertRaises(DocumentError):
                document.save({"myAuthorName": value})
        self.assertEqual(STOCK, self.path.read_bytes())
        literal = r"A\ B # {C} & 50% $_^~"
        self.assertEqual(literal, plain_text(escape_text(literal)))
        self.assertIsNone(plain_text(r"\LaTeX{}"))
        self.assertIn(escape_text(literal).encode(), document.render({"myAuthorName": escape_text(literal)}))

    def test_stale_snapshot_is_not_overwritten(self):
        document = self.load()
        external = STOCK + b"\n% external edit\n"
        self.path.write_bytes(external)
        with self.assertRaises(ExternalChange):
            document.save({"myAuthorName": "Ada"})
        self.assertEqual(external, self.path.read_bytes())
        self.assertFalse((self.path.parent / ".myconfig-backups").exists())

    def test_failed_replace_keeps_original_and_backup(self):
        document = self.load()
        with patch("config_editor.document.os.replace", side_effect=PermissionError):
            with self.assertRaises(SaveError) as error:
                document.save({"myAuthorName": "Ada"})
        self.assertEqual(STOCK, self.path.read_bytes())
        self.assertEqual(STOCK, error.exception.backup.read_bytes())
        self.assertEqual([], list(self.path.parent.glob("*.tmp")))

    def test_failed_backup_cannot_replace_original(self):
        document = self.load()
        with patch("config_editor.document.os.fsync", side_effect=OSError):
            with self.assertRaises(SaveError) as error:
                document.save({"myAuthorName": "Ada"})
        self.assertIsNone(error.exception.backup)
        self.assertEqual(STOCK, self.path.read_bytes())
        self.assertEqual([], list((self.path.parent / ".myconfig-backups").iterdir()))

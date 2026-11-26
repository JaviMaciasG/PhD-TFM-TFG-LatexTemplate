import os
from pathlib import Path
import shutil
import tempfile
import unittest
from unittest.mock import patch

os.environ.setdefault("QT_QPA_PLATFORM", "offscreen")

from PySide6.QtCore import QSettings, Qt  # noqa: E402
from PySide6.QtGui import QColor, QPalette  # noqa: E402
from PySide6.QtTest import QTest  # noqa: E402
from PySide6.QtWidgets import QApplication, QLineEdit, QPlainTextEdit  # noqa: E402

from config_editor.entry_text import normalise_entry  # noqa: E402
from config_editor.gui import ChangeSummary, MainWindow, _LATEX_EXAMPLES  # noqa: E402
from config_editor.widgets import DegreePicker, SourceValue  # noqa: E402
from config_editor.catalogue import Degree, load_degrees  # noqa: E402


ROOT = Path(__file__).resolve().parents[2]
XCOLOR_NAMES = set("""
    black blue brown cyan darkgray gray green lightgray lime magenta olive
    orange pink purple red teal violet white yellow
""".split())


class GuiTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.app = QApplication.instance() or QApplication([])

    def setUp(self):
        directory = tempfile.TemporaryDirectory(prefix="Editor Ágata ")
        self.addCleanup(directory.cleanup)
        self.root = Path(directory.name)
        shutil.copytree(ROOT / "Config", self.root / "Config",
                        ignore=shutil.ignore_patterns(".myconfig-backups"))
        self.path = self.root / "Config" / "myconfig.tex"
        self.original = self.path.read_bytes()
        self.settings_file = self.root / "prefs" / "editor.ini"
        self.window = self.new_window()
        self.assertTrue(self.window.open_project(self.root, show_errors=False))

    def new_window(self):
        window = MainWindow(QSettings(str(self.settings_file), QSettings.Format.IniFormat))
        self.addCleanup(window.deleteLater)
        return window

    def test_open_revert_and_save_changes_from_multiple_tabs(self):
        self.assertEqual(5, self.window.tabs.count())
        tab = self.window.tabs.widget(0)
        title = tab.controls["myBookTitleSpanish"]
        previous = title.editor.toPlainText()
        title.editor.setPlainText("changed")
        self.assertTrue(self.window.save_button.isEnabled())
        title.editor.setPlainText(previous)
        self.assertFalse(self.window.save_button.isEnabled())
        self.assertTrue(self.window.save())
        self.assertEqual(self.original, self.path.read_bytes())
        self.assertFalse((self.path.parent / ".myconfig-backups").exists())

        title.editor.setPlainText("Medición & control (50%)")
        language = tab.controls["myLanguage"]
        language.buttons["english"].click()
        author = self.window.tabs.widget(1).controls["myAuthorName"]
        author.editor.setText("Ágata")
        expected = self.original.replace(rb"\newcommand{\myLanguage}{spanish}",
                                         rb"\newcommand{\myLanguage}{english}", 1)
        expected = expected.replace(rb"\newcommand{\myAuthorName}{Javier}",
                                    r"\newcommand{\myAuthorName}{Ágata}".encode(), 1)
        start = rb"\newcommand{\myBookTitleSpanish}{"
        prefix, remainder = expected.split(start, 1)
        _, suffix = remainder.split(b"}", 1)
        expected = prefix + start + r"Medición \& control (50\%)".encode() + b"}" + suffix
        self.assertTrue(self.window.save())
        self.assertEqual(expected, self.path.read_bytes())
        self.assertFalse(self.window.save_button.isEnabled())

    def test_link_colours_offer_only_builtin_xcolor_names_and_save_one_value(self):
        index = self.window.tabs.count() - 1
        tab = self.window.tabs.widget(index)
        self.assertEqual("Colores de los enlaces", self.window.tabs.tabText(index))
        names = ("mytoclinkcolor", "myloflinkcolor", "mylotlinkcolor", "myothertoclinkcolor",
                 "mylinkcolor", "myurlcolor", "mycitecolor")
        self.assertEqual(set(names), tab.visible_fields)
        for name in names:
            with self.subTest(name=name):
                control = tab.controls[name]
                self.assertFalse(control.isEditable())
                self.assertEqual(len(XCOLOR_NAMES), control.count())
                self.assertEqual(XCOLOR_NAMES, {control.itemData(i) for i in range(control.count())})
                self.assertTrue(all(not control.itemIcon(i).isNull() for i in range(control.count())))
                self.assertEqual(self.window.document.value(name), control.currentData())
        language = self.window.tabs.widget(0).controls["myLanguage"]
        language.buttons["english"].click()
        self.assertEqual("Link colours", self.window.tabs.tabText(index))
        self.assertEqual("Web links", tab.label("myurlcolor"))
        language.buttons["spanish"].click()
        control = tab.controls["myurlcolor"]
        original_colour = control.currentData()
        control.setCurrentIndex(control.findData("teal"))
        self.assertTrue(self.window.save())
        old = (r"\newcommand{\myurlcolor}{" + original_colour + "}").encode()
        self.assertEqual(self.original.replace(old, rb"\newcommand{\myurlcolor}{teal}", 1),
                         self.path.read_bytes())

    def test_project_colour_is_displayed_but_not_offered_or_overwritten(self):
        marker = rb"\newcommand{\myurlcolor}{"
        prefix, remainder = self.original.split(marker, 1)
        _, suffix = remainder.split(b"}", 1)
        changed = prefix + marker + b"LightSkyBlue!50!black}" + suffix
        self.path.write_bytes(changed)
        self.assertTrue(self.window.reload())
        control = self.window.tabs.widget(self.window.tabs.count() - 1).controls["myurlcolor"]
        self.assertEqual("LightSkyBlue!50!black", control.currentData())
        self.assertFalse(control.model().item(control.currentIndex()).isEnabled())
        self.assertEqual(XCOLOR_NAMES, {control.itemData(i) for i in range(control.count())
                                       if control.model().item(i).isEnabled()})
        self.assertFalse(self.window.save_button.isEnabled())
        self.window.tabs.widget(1).controls["myAuthorName"].editor.setText("Ágata")
        self.assertTrue(self.window.save())
        self.assertIn(marker + b"LightSkyBlue!50!black}", self.path.read_bytes())

    def test_working_directory_is_remembered_only_after_successful_open(self):
        self.assertTrue(self.settings_file.is_file())
        reopened = self.new_window()
        self.assertIsNone(reopened.document)
        with patch("config_editor.gui.QFileDialog.getExistingDirectory", return_value="") as picker:
            reopened.choose_project()
            self.assertEqual(str(self.root), picker.call_args.args[2])

        invalid = self.root / "not a template"
        invalid.mkdir()
        with (patch("config_editor.gui.QFileDialog.getExistingDirectory", return_value=str(invalid)),
              patch.object(reopened, "_message") as message):
            reopened.choose_project()
            message.assert_called_once()
        self.assertIsNone(reopened.document)
        with patch("config_editor.gui.QFileDialog.getExistingDirectory", return_value="") as picker:
            self.new_window().choose_project()
            self.assertEqual(str(self.root), picker.call_args.args[2])

        other = self.root / "Otro directorio"
        other.mkdir()
        shutil.move(self.path.parent, other / "Config")
        with patch("config_editor.gui.QFileDialog.getExistingDirectory", return_value=str(other)):
            reopened.choose_project()
        self.assertEqual(other, reopened.document.path.parent.parent)
        newer = self.new_window()
        with patch("config_editor.gui.QFileDialog.getExistingDirectory", return_value="") as picker:
            newer.choose_project()
            self.assertEqual(str(other), picker.call_args.args[2])

        shutil.move(other / "Config", self.path.parent)
        other.rmdir()
        with patch("config_editor.gui.QFileDialog.getExistingDirectory", return_value="") as picker:
            self.new_window().choose_project()
            self.assertEqual(str(Path.home()), picker.call_args.args[2])

    def test_cancel_open_and_external_edit(self):
        self.window.tabs.widget(1).controls["myAuthorName"].editor.setText("Ágata")
        with patch.object(self.window, "_confirm_leave", return_value=False):
            self.assertFalse(self.window.open_project(self.root / "other"))
        self.assertTrue(self.window.save_button.isEnabled())
        external = self.original + b"\n% hand edit\n"
        self.path.write_bytes(external)
        with patch.object(self.window, "_message") as message:
            self.assertFalse(self.window.save())
            message.assert_called_once()
            self.assertIn("cambió en disco", message.call_args.args[2])
        self.assertEqual(external, self.path.read_bytes())

    def test_raw_values_and_mixed_endings_are_noops_until_edited(self):
        value = SourceValue("15 de junio de \\myThesisDefenseYear{}\r\n% nota\nX", "\r\n")
        self.assertFalse(hasattr(value, "mode"))
        self.assertEqual(value.original, value.value())
        value.editor.setPlainText("16 de junio de \\myThesisDefenseYear{}")
        self.assertEqual(r"16 de junio de \myThesisDefenseYear{}", value.value())

    def test_catalogue_uses_target_project_and_searches_without_accents(self):
        directory = self.root / "Config"
        path = directory / "degrees.tex"
        path.write_bytes(path.read_bytes().replace(
            rb"\DeclareDegree{GIEC}", rb"\DeclareDegree{LOCAL-GIEC}", 1))
        self.assertTrue(self.window.open_project(self.root))
        degree = self.window.tabs.widget(0).controls["myDegree"]
        self.assertIn("no reconocido", degree.label.text())
        self.assertEqual("GIEC", degree.value())
        picker = DegreePicker(self.window, load_degrees(directory))
        picker.search.setText("local-giec electronica")
        visible = [item.text(0) for item, _ in picker.leaves if not item.isHidden()]
        self.assertEqual(1, len(visible))
        self.assertIn("LOCAL-GIEC", visible[0])
        self.assertNotIn("IT", [item.data(0, Qt.ItemDataRole.UserRole)
                                for item, _ in picker.leaves])

    def test_picker_orders_schools_and_their_degrees_alphabetically(self):
        picker = DegreePicker(self.window, [
            Degree("AAA", "Zoología", "Universidad de Alcalá", "Centro A", "TFG", "standard", "active"),
            Degree("ZZZ", "Álgebra", "Universidad de Alcalá", "Centro Zafiro", "TFG", "standard", "active"),
            Degree("YYY", "Física", "Universidad de Alcalá", "Centro A", "TFG", "standard", "active"),
            Degree("BC", "Biología", "Universidad de Sevilla", "Centro B", "TFG", "standard", "active"),
        ])
        first = picker.tree.topLevelItem(0)
        self.assertEqual("Universidad de Alcalá", first.text(0))
        self.assertEqual("Universidad de Sevilla", picker.tree.topLevelItem(1).text(0))
        self.assertEqual(["Centro A", "Centro Zafiro"],
                         [first.child(i).text(0) for i in range(first.childCount())])
        school = first.child(0)
        self.assertEqual(["Física (YYY)", "Zoología (AAA)"],
                         [school.child(i).text(0) for i in range(school.childCount())])
        picker.search.setText("centro zafiro")
        self.assertTrue(first.child(0).isHidden())
        self.assertFalse(first.child(1).isHidden())
        self.assertTrue(first.child(1).isExpanded())
        self.assertTrue(picker.tree.topLevelItem(1).isHidden())

    def test_picker_university_order_and_only_current_branch_is_expanded(self):
        degrees = load_degrees(self.root / "Config")
        for lang in ("spanish", "english"):
            for current, selected in ((None, "GIEC"), ("unknown", "GIEC"),
                                      ("GIE-EIIA-UCLM", "GIE-EIIA-UCLM")):
                with self.subTest(language=lang, degree=current):
                    picker = DegreePicker(self.window, degrees, lang, current)
                    expected = [next(d for d in degrees if d.institution == code).displayed("university", lang)
                                for code in ("UAH", "UPM", "URJC", "US", "UCLM")]
                    universities = [picker.tree.topLevelItem(i) for i in range(picker.tree.topLevelItemCount())]
                    self.assertEqual(expected, [item.text(0) for item in universities])
                    self.assertEqual(selected, picker.selection)
                    self.assertEqual([picker.tree.currentItem().parent().parent()],
                                     [item for item in universities if item.isExpanded()])
                    self.assertEqual([picker.tree.currentItem().parent()],
                                     [item.child(i) for item in universities for i in range(item.childCount())
                                      if item.child(i).isExpanded()])
                    picker.search.setText("GISD-ETSIT-UPM")
                    self.assertTrue(universities[1].isExpanded())
                    picker.search.clear()
                    self.assertEqual(selected, picker.selection)
                    self.assertEqual([picker.tree.currentItem().parent().parent()],
                                     [item for item in universities if item.isExpanded()])

    def test_warning_on_unusual_date_can_cancel_save(self):
        entry = self.window.tabs.widget(2).controls["myThesisAcademicYear"]
        entry.editor.setText("2030")
        with patch.object(self.window, "_check_dates", return_value=False):
            self.assertFalse(self.window.save())
        self.assertEqual(self.original, self.path.read_bytes())

    def test_simple_fields_and_gender_control_change_only_their_values(self):
        authors = self.window.tabs.widget(1).controls
        dates = self.window.tabs.widget(2).controls
        for control in (authors["myAuthorName"], authors["myAcademicTutorFullName"],
                        authors["myCoTutorFullName"], dates["myThesisAcademicYear"],
                        dates["myThesisDefenseYear"]):
            self.assertIsInstance(control.editor, QLineEdit)
            self.assertFalse(hasattr(control, "mode"))
        self.assertFalse(hasattr(dates["myThesisDefenseDate"], "mode"))
        gender = authors["myAuthorGender"]
        self.window.tabs.setCurrentIndex(1)
        self.window.show()
        self.app.processEvents()
        gender.buttons["male"].setFocus()
        self.assertTrue(gender.buttons["male"].hasFocus())
        QTest.keyClick(gender.buttons["male"], Qt.Key.Key_Right)
        self.assertTrue(gender.buttons["female"].isChecked())
        QTest.keyClick(gender.buttons["female"], Qt.Key.Key_Left)
        self.assertFalse(self.window.save_button.isEnabled())
        QTest.keyClick(gender.buttons["male"], Qt.Key.Key_Right)
        dates["myThesisDefenseYear"].editor.setText("2028")
        expected = self.original.replace(rb"\newcommand{\myAuthorGender}{male}",
                                         rb"\newcommand{\myAuthorGender}{female}", 1)
        expected = expected.replace(rb"\newcommand{\myThesisDefenseYear}{2027}",
                                    rb"\newcommand{\myThesisDefenseYear}{2028}", 1)
        self.assertTrue(self.window.save())
        self.assertEqual(expected, self.path.read_bytes())

    def test_unknown_gender_and_non_plain_values_survive_other_edits(self):
        custom = self.original.replace(rb"\newcommand{\myAuthorGender}{male}",
                                       rb"\newcommand{\myAuthorGender}{\customGender}", 1)
        custom = custom.replace(rb"\newcommand{\myAuthorName}{Javier}",
                                rb"\newcommand{\myAuthorName}{\textbf{Javier}}", 1)
        custom = custom.replace(rb"\newcommand{\myThesisDefenseYear}{2027}",
                                rb"\newcommand{\myThesisDefenseYear}{\customYear}", 1)
        self.path.write_bytes(custom)
        self.assertTrue(self.window.reload())
        authors = self.window.tabs.widget(1).controls
        self.assertEqual(r"\textbf{Javier}", authors["myAuthorName"].editor.text())
        self.assertFalse(authors["myAuthorName"].editor.isReadOnly())
        self.assertEqual(r"\customYear", self.window.tabs.widget(2).controls["myThesisDefenseYear"].editor.text())
        gender = authors["myAuthorGender"]
        self.assertFalse(any(button.isChecked() for button in gender.buttons.values()))
        authors["myAuthorSurname"].editor.setText("Ingeniería & Control")
        expected = custom.replace(r"\newcommand{\myAuthorSurname}{Macías Guarasa}".encode(),
                                  r"\newcommand{\myAuthorSurname}{Ingeniería \& Control}".encode(), 1)
        self.assertTrue(self.window.save())
        self.assertEqual(expected, self.path.read_bytes())

    def set_degree(self, identifier):
        degree = self.window.tabs.widget(0).controls["myDegree"]
        degree.identifier = identifier
        degree.changed.emit()

    def test_context_switches_live_without_replacing_text_widgets(self):
        doc, people, dates, _ = [self.window.tabs.widget(i) for i in range(4)]
        primary = "myAcademicTutorFullName"
        secondary = "myCoTutorFullName"
        name = people.controls[primary]
        name.editor.setText(r"\textbf{Eva}")
        self.assertEqual("Tutor/a", people.label(primary))
        self.assertNotIn("myWebsite", doc.visible_fields)
        language = doc.controls["myLanguage"]
        language.buttons["english"].click()
        self.assertEqual("Advisor", people.label(primary))
        self.assertEqual("Save", self.window.save_button.text())
        self.assertEqual("Dates", self.window.tabs.tabText(2))
        self.assertIn("All text fields accept LaTeX", self.window.latex_note.text())
        self.assertIs(name, people.controls[primary])
        self.assertEqual(r"\textbf{Eva}", name.editor.text())
        cases = (
            ("MUIT", "Advisor", "Co-advisor", ()),
            ("GII-ETSII-URJC", "Supervisor", "Co-supervisor", ()),
            ("ITI-ESCET-URJC", "Advisor", "Co-advisor", ()),
            ("GISTS-ETSIT-UPM", "Advisor", "Co-advisor", ("myPonenteFullName",)),
            ("GISD-ETSIT-UPM", "Technical supervisor", "Academic supervisor", ()),
            ("MUNE-ETSIT-UPM", "Academic supervisor", None, ("myUPMTechnicalSupervisorFullName",)),
            ("GIEC-ETSIST-UPM", "Advisor", "Director", ()),
            ("PHD-ETSII-UPM", "Supervisor", "Co-supervisor", ("myFirstExternalReviewerFullName",)),
            ("PHD-ETSII-UPM-COMPENDIUM", "Supervisor", "Co-supervisor", ("myFirstExternalReviewerFullName",)),
        )
        for identifier, first, second, extras in cases:
            with self.subTest(degree=identifier):
                self.set_degree(identifier)
                self.assertEqual(first, people.label(primary))
                if second:
                    self.assertEqual(second, people.label(secondary))
                else:
                    self.assertNotIn(secondary, people.visible_fields)
                self.assertEqual(set(extras), people.visible_fields &
                                 {"myPonenteFullName", "myUPMTechnicalSupervisorFullName",
                                  "myFirstExternalReviewerFullName"})
        self.assertIn("myThesisDepositYear", dates.visible_fields)
        self.set_degree("GIE-EIIA-UCLM")
        self.assertTrue({"myWebsite", "myStudentRecordNumber", "mySchoolAddress"} <= doc.visible_fields)
        self.assertNotIn("myThesisDepositYear", dates.visible_fields)
        self.assertEqual("Website", doc.label("myWebsite"))

    def test_context_hides_only_paperwork_not_applicable_to_project_or_degree(self):
        tfg = self.root / "PapeleoTFG"
        tfm = self.root / "PapeleoTFM"
        tfg.mkdir()
        tfm.mkdir()
        for path in (tfg / "TFG-AnexoV-ConvenioCooperacion-EPS-UAH.tex",
                     tfg / "TFG-AnexoII-InformeTutorPlagio-UAH.tex",
                     tfg / "TFG-AnexoIX-ActaYRubricaDefensa-EPS-UAH.tex",
                     tfm / "TFM-AnexoX-VistoBuenoTutor.tex",
                     tfm / "TFM-AnexoVII-HojaControlAnteproyecto-EPS-UAH.tex",
                     tfm / "TFM-AnexoXII-AutorizacionPublicarAbierto.tex"):
            path.touch()
        # In a real project availability is checked when the context changes.
        self.assertTrue(self.window.reload())
        options = self.window.tabs.widget(3)
        self.assertIn("myAcademicTutorGrade", options.visible_fields)
        self.assertIn("myTribunalMHProposal", options.visible_fields)
        self.assertNotIn("myAuthorizationOpenPublishingEmbargoMonths", options.visible_fields)
        self.set_degree("GB")
        self.assertNotIn("myAcademicTutorGrade", options.visible_fields)
        self.assertIn("myAuthorDNI", options.visible_fields)
        self.set_degree("MUIE")
        self.assertIn("myConfidentialContent", options.visible_fields)
        self.assertIn("myAuthorizationOpenPublishingEmbargoMonths", options.visible_fields)
        self.set_degree("MUIT")
        self.assertNotIn("myConfidentialContent", options.visible_fields)

    def test_english_picker_keeps_acronyms_and_falls_back_to_official_names(self):
        picker = DegreePicker(self.window, [
            Degree("A", "Ingeniería", "Universidad de Alcalá", "Centro",
                   "TFG", "standard", "active", name_en="Engineering",
                   university_en="University of Alcalá"),
            Degree("B", "Matemáticas", "Universidad de Alcalá", "Centro",
                   "TFG", "standard", "active", university_en="University of Alcalá"),
        ], language="english")
        self.assertEqual("Select degree", picker.windowTitle())
        university = picker.tree.topLevelItem(0)
        self.assertEqual("University of Alcalá", university.text(0))
        school = university.child(0)
        self.assertEqual(["Engineering (A)", "Matemáticas (B)"],
                         [school.child(i).text(0) for i in range(school.childCount())])
        picker.search.setText("ingenieria centro")
        self.assertFalse(school.child(0).isHidden())
        self.assertTrue(school.child(1).isHidden())

    def test_hidden_drafts_survive_cancel_and_failed_save_then_only_visible_save(self):
        doc = self.window.tabs.widget(0)
        self.set_degree("GIE-EIIA-UCLM")
        website = doc.controls["myWebsite"]
        website.editor.setText("https://example.org/private_draft")
        self.set_degree("GIEC")
        self.assertNotIn("myWebsite", doc.visible_fields)
        self.assertTrue(website.isHidden())
        with patch.object(self.window, "_confirm_hidden", return_value=False):
            self.assertFalse(self.window.save())
        self.set_degree("GIE-EIIA-UCLM")
        self.assertIn("private_draft", website.editor.text())
        self.set_degree("GIEC")
        doc.controls["myBookTitleSpanish"].editor.setPlainText(r"PEPE_JUAN and $3_4$")
        with patch.object(self.window, "_confirm_hidden", return_value=True), \
             patch("config_editor.document.os.replace", side_effect=PermissionError), \
             patch.object(self.window, "_message"):
            self.assertFalse(self.window.save())
        self.assertIn("private_draft", self.window._edits()["myWebsite"])
        with patch.object(self.window, "_confirm_hidden", return_value=True) as confirm:
            self.assertTrue(self.window.save())
            confirm.assert_called_once_with(["myWebsite"])
        start = rb"\newcommand{\myBookTitleSpanish}{"
        head, tail = self.original.split(start, 1)
        _, rest = tail.split(b"}", 1)
        self.assertEqual(head + start + rb"PEPE\_JUAN and $3_4$" + b"}" + rest, self.path.read_bytes())
        self.assertEqual({}, self.window._edits())

    def test_hidden_only_discard_does_not_write_or_back_up(self):
        self.set_degree("GIE-EIIA-UCLM")
        self.window.tabs.widget(0).controls["myWebsite"].editor.setText("https://example.org")
        self.set_degree("GIEC")
        before = self.path.stat().st_mtime_ns
        with patch.object(self.window, "_confirm_hidden", return_value=True):
            self.assertTrue(self.window.save())
        self.assertEqual(before, self.path.stat().st_mtime_ns)
        self.assertEqual(self.original, self.path.read_bytes())
        self.assertFalse((self.path.parent / ".myconfig-backups").exists())

    def test_malformed_latex_error_uses_localised_field_and_does_not_write(self):
        tab = self.window.tabs.widget(0)
        language = tab.controls["myLanguage"]
        language.buttons["english"].click()
        tab.controls["myBookTitleSpanish"].editor.setPlainText(r"Incomplete \(x")
        with patch.object(self.window, "_message") as message:
            self.assertFalse(self.window.save())
        notice = message.call_args.args[2]
        self.assertIn("Spanish title", notice)
        self.assertIn("is not closed", notice)
        self.assertEqual(self.original, self.path.read_bytes())

    def test_language_radio_is_exclusive_and_working_directory_stays_visible(self):
        doc = self.window.tabs.widget(0)
        language = doc.controls["myLanguage"]
        self.window.show()
        self.app.processEvents()
        language.buttons["spanish"].setFocus()
        QTest.keyClick(language.buttons["spanish"], Qt.Key.Key_Right)
        self.assertTrue(language.buttons["english"].isChecked())
        self.assertFalse(language.buttons["spanish"].isChecked())
        self.assertEqual("LaTeX template configuration editor", self.window.heading.text())
        self.assertEqual(f"Working directory: {self.root}", self.window.project.text())
        self.assertEqual(str(self.root), self.window.project.accessibleDescription())
        self.assertEqual("Open working directory…", self.window.open_button.text())
        self.assertEqual({"myLanguage": "english"}, self.window._edits())
        self.assertEqual("Unsaved changes (Document language)", self.window.editor_state.text())
        QTest.keyClick(language.buttons["english"], Qt.Key.Key_Left)
        self.assertEqual({}, self.window._edits())
        self.assertEqual("Sin cambios pendientes", self.window.editor_state.text())

    def test_unsaved_summary_never_shows_values(self):
        doc, author = self.window.tabs.widget(0), self.window.tabs.widget(1)
        doc.controls["myBookTitleSpanish"].editor.setPlainText("private title")
        doc.controls["myBookTitleEnglish"].editor.setPlainText("another private title")
        author.controls["myAuthorName"].editor.setText("private name")
        self.assertNotIn("private", self.window.editor_state.text())
        self.assertEqual("Título en español\nTítulo en inglés\nNombre", self.window.editor_state.toolTip())
        self.assertTrue(self.window.editor_state.property("dirty"))
        self.assertTrue(self.window.save())
        self.assertFalse(self.window.editor_state.property("dirty"))
        self.assertEqual("", self.window.editor_state.toolTip())

    def test_unsaved_summary_fits_as_many_whole_labels_as_possible(self):
        summary = ChangeSummary()
        labels = ("Degree", "Language", "Doctoral programme in Spanish", "Doctoral programme in English")
        heading, hint = "Unsaved changes", "more details in tooltip"
        summary.show()
        summary.set_summary(heading, labels, hint)
        two = f"{heading} (Degree, Language... ; {hint})"
        fallback = f"{heading} ({hint})"
        all_fields = f"{heading} ({', '.join(labels)})"
        summary.resize(summary.fontMetrics().horizontalAdvance(two) + 1, 36)
        self.app.processEvents()
        self.assertEqual(two, summary.text())
        summary.resize(summary.fontMetrics().horizontalAdvance(all_fields) + 1, 36)
        self.app.processEvents()
        self.assertEqual(all_fields, summary.text())
        summary.resize(summary.fontMetrics().horizontalAdvance(fallback), 48)
        self.app.processEvents()
        self.assertEqual(fallback, summary.text())
        self.assertEqual("\n".join(labels), summary.toolTip())
        summary.close()

    def test_toolbar_minimum_reserves_single_line_summary_and_all_buttons(self):
        self.window.show()
        for code, fallback in (
            ("spanish", "Cambios sin guardar (más detalles al pasar el ratón)"),
            ("english", "Unsaved changes (more details in tooltip)"),
        ):
            with self.subTest(language=code):
                self.window.tabs.widget(0).controls["myLanguage"].buttons[code].click()
                self.assertTrue(self.window.save())
                tab = self.window.tabs.widget(0)
                self.app.processEvents()  # Apply the translated layout constraints before resizing.
                self.window.resize(1, 680)
                self.app.processEvents()
                width = self.window.width()
                for name in ("myBookTitleSpanish", "myBookTitleEnglish", "myThesisKeywords"):
                    tab.controls[name].editor.setPlainText("Edited value")
                self.app.processEvents()
                summary = self.window.editor_state
                self.assertEqual(width, self.window.width())
                self.assertEqual(summary.fontMetrics().horizontalAdvance(fallback), summary.minimumWidth())
                self.assertLessEqual(summary.fontMetrics().horizontalAdvance(summary.text()),
                                     summary.contentsRect().width())
                self.assertNotIn("\n", summary.text())
                widgets = (summary, self.window.open_button, self.window.reload_button, self.window.save_button)
                for first, second in zip(widgets, widgets[1:]):
                    self.assertLess(first.geometry().right(), second.geometry().left())
                    self.assertLessEqual(abs(first.geometry().center().y() - second.geometry().center().y()), 1)
                for name in ("myBookTitleSpanish", "myBookTitleEnglish", "myThesisKeywords"):
                    control = tab.controls[name]
                    control.editor.setPlainText(control.initial)
                self.assertFalse(self.window.save_button.isEnabled())

    def test_link_colour_layout_and_tab_guidance_in_both_languages(self):
        long_colour = b"blue" + b"!50!black" * 70
        self.path.write_bytes(self.original.replace(rb"\newcommand{\myurlcolor}{blue}",
                                                    rb"\newcommand{\myurlcolor}{" + long_colour + b"}"))
        self.assertTrue(self.window.reload())
        index = self.window.tabs.count() - 1
        tab = self.window.tabs.widget(index)
        self.assertEqual(long_colour.decode(), tab.controls["myurlcolor"].currentData())
        self.window.tabs.setCurrentIndex(index)
        self.window.show()
        language = self.window.tabs.widget(0).controls["myLanguage"]
        for code, citation, guidance in (
            ("spanish", "Enlaces a citas bibliográficas", "Pasa el ratón por encima"),
            ("english", "Links to citations", "Hover over a field label"),
        ):
            language.buttons[code].click()
            self.assertEqual(citation, tab.label("mycitecolor"))
            for widget_index in range(self.window.tabs.count()):
                intro = self.window.tabs.widget(widget_index).intro.text()
                self.assertIn(guidance, intro)
                self.assertIn("Config/myconfig.tex", intro)
            for width in (1, 850):
                with self.subTest(language=code, width=width):
                    self.window.resize(width, 680)
                    self.app.processEvents()
                    self.assertEqual(0, tab.horizontalScrollBar().maximum())
                    starts = set()
                    for name, (_, label, selector, _, _, _, _) in tab.rows.items():
                        self.assertFalse(label.wordWrap())
                        self.assertGreaterEqual(label.width(), label.sizeHint().width())
                        self.assertEqual("\\" + name, label.toolTip())
                        self.assertLess(label.geometry().right(), selector.geometry().left())
                        self.assertLessEqual(label.geometry().top(), selector.geometry().bottom())
                        self.assertLessEqual(selector.geometry().top(), label.geometry().bottom())
                        self.assertEqual(tab.form.contentsRect().right(), selector.geometry().right())
                        starts.add(selector.x())
                    self.assertEqual(1, len(starts))

    def test_latex_help_explains_real_save_behaviour_in_both_languages(self):
        language = self.window.tabs.widget(0).controls["myLanguage"]
        for code, description, caution in (
            ("spanish", "Al guardar un campo", "no compila el documento"),
            ("english", "When you save an edited field", "does not compile the document"),
        ):
            language.buttons[code].click()
            with patch.object(self.window, "_message") as message:
                self.window._show_latex_help()
            help_text = message.call_args.args[2]
            self.assertIn(description, help_text)
            self.assertIn(caution, help_text)
            for _, entered, saved in _LATEX_EXAMPLES:
                self.assertEqual(saved, normalise_entry(entered))
                self.assertIn(f"{entered} → {saved}", help_text)

    def test_field_heights_and_hints(self):
        self.window.show()
        self.app.processEvents()
        doc, dates = self.window.tabs.widget(0), self.window.tabs.widget(2)
        for name in ("myBookTitleSpanish", "myBookTitleEnglish", "myThesisKeywords", "myThesisKeywordsEnglish"):
            editor = doc.controls[name].editor
            self.assertIsInstance(editor, QPlainTextEdit)
            editor.setPlainText("First\nSecond")
            self.app.processEvents()
            self.assertEqual(0, editor.verticalScrollBar().maximum())
            editor.setPlainText("First\nSecond\nThird")
            self.app.processEvents()
            self.assertGreater(editor.verticalScrollBar().maximum(), 0)
        self.assertIsInstance(doc.controls["myCopyrightStatement"].editor, QLineEdit)
        for name in ("myThesisDepositDate", "myThesisDepositDateEnglish", "myThesisDefenseDate",
                     "myThesisdefenseDateEnglish"):
            self.assertIsInstance(dates.controls[name].editor, QLineEdit)
        keyword = doc.rows["myThesisKeywords"]
        next_field = doc.rows["myThesisKeywordsEnglish"]
        self.assertEqual(keyword[5] + 1, next_field[5])
        self.assertEqual(2, keyword[4].geometry().top() - keyword[2].geometry().bottom() - 1)

    def test_multiline_dates_and_copyright_are_preserved_on_other_saves(self):
        custom = self.original.replace(rb"\newcommand{\myThesisDepositDate}{15 de junio de 2027}",
                                       b"\\newcommand{\\myThesisDepositDate}{15 de junio\n de 2027}", 1)
        custom = custom.replace(rb"\newcommand{\myCopyrightStatement}{",
                                b"\\newcommand{\\myCopyrightStatement}{Copyright\n", 1)
        self.path.write_bytes(custom)
        self.assertTrue(self.window.reload())
        doc, dates = self.window.tabs.widget(0), self.window.tabs.widget(2)
        self.assertIsInstance(dates.controls["myThesisDepositDate"].editor, QPlainTextEdit)
        self.assertIsInstance(doc.controls["myCopyrightStatement"].editor, QPlainTextEdit)
        doc.controls["myLanguage"].buttons["english"].click()
        self.assertTrue(self.window.save())
        self.assertEqual(custom.replace(rb"\newcommand{\myLanguage}{spanish}",
                                        rb"\newcommand{\myLanguage}{english}", 1), self.path.read_bytes())

    def test_project_header_and_forms_fit_light_and_dark_at_two_widths(self):
        previous = self.app.palette()
        self.addCleanup(self.app.setPalette, previous)
        long_path = "/proyectos/" + "directorio-muy-largo/" * 4 + "x" * 220
        self.window.project.set_path(long_path)
        self.window.show()
        for background, expected_color in (("#fafafa", "#f2f5f9"), ("#202020", "#20262e")):
            palette = QPalette(previous)
            palette.setColor(QPalette.ColorRole.Window, QColor(background))
            self.app.setPalette(palette)
            self.app.processEvents()
            self.assertIn(expected_color, self.window.styleSheet())
            for width in (500, 850):
                self.window.resize(width, 680)
                self.app.processEvents()
                self.assertEqual(max(width, self.window.minimumWidth()), self.window.width())
                self.assertEqual(long_path, self.window.project.toolTip())
                self.assertEqual(f"Directorio de trabajo: {long_path}", self.window.project.text())
                self.assertGreater(self.window.project.height(), 2 * self.window.project.fontMetrics().lineSpacing())
                for index in range(self.window.tabs.count()):
                    self.window.tabs.setCurrentIndex(index)
                    self.app.processEvents()
                    self.assertEqual(0, self.window.tabs.widget(index).horizontalScrollBar().maximum())

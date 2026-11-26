"""Reusable Qt controls for source values and the grouped degree picker."""

from math import ceil
import unicodedata

from PySide6.QtCore import QSize, Qt, Signal
from PySide6.QtWidgets import (
    QButtonGroup, QDialog, QDialogButtonBox, QHBoxLayout, QLabel, QLineEdit,
    QPlainTextEdit, QPushButton, QRadioButton, QSizePolicy, QTreeWidget, QTreeWidgetItem,
    QVBoxLayout, QWidget,
)

from .locale import tr


def _normalise_lines(text):
    return text.replace("\r\n", "\n").replace("\r", "\n")


def _hint(text):
    label = QLabel(text)
    label.setProperty("formRole", "help")
    label.setTextFormat(Qt.TextFormat.PlainText)
    label.setWordWrap(True)
    return label


class CompactTextEdit(QPlainTextEdit):
    def __init__(self, lines):
        super().__init__()
        self.lines = lines
        self.setSizePolicy(QSizePolicy.Policy.Expanding, QSizePolicy.Policy.Fixed)

    def _line_height(self):
        return (self.lines * self.fontMetrics().lineSpacing()
                + ceil(2 * self.document().documentMargin()) + 2 * self.frameWidth())

    def sizeHint(self):
        return QSize(super().sizeHint().width(), self._line_height())

    def minimumSizeHint(self):
        return QSize(super().minimumSizeHint().width(), self._line_height())


class SourceValue(QWidget):
    changed = Signal()

    def __init__(self, original, newline="\n", *, multiline=False, visible_lines=0):
        super().__init__()
        self.original = original
        self.newline = newline
        layout = QVBoxLayout(self)
        layout.setContentsMargins(0, 0, 0, 0)
        if multiline or len(original.splitlines()) > 1 or "\n" in original or "\r" in original:
            self.editor = CompactTextEdit(visible_lines) if visible_lines else QPlainTextEdit()
            self.editor.setTabChangesFocus(True)
            if not visible_lines:
                self.editor.setMinimumHeight(56)
                self.editor.setMaximumHeight(105)
            self.editor.setPlainText(_normalise_lines(original))
        else:
            self.editor = QLineEdit(original)
        self.initial = self._text()
        layout.addWidget(self.editor)
        self.editor.textChanged.connect(self.changed)

    def _text(self):
        return self.editor.text() if isinstance(self.editor, QLineEdit) else self.editor.toPlainText()

    def value(self):
        text = self._text()
        return self.original if text == self.initial else text.replace("\n", self.newline)


class RadioValue(QWidget):
    changed = Signal()

    def __init__(self, original, choices):
        super().__init__()
        self.original = original
        self.choices = choices
        self.group = QButtonGroup(self)
        layout = QVBoxLayout(self)
        layout.setContentsMargins(0, 0, 0, 0)
        row = QHBoxLayout()
        row.setSpacing(18)
        layout.addLayout(row)
        self.buttons = {}
        for index, (label, token) in enumerate(choices):
            button = QRadioButton(label)
            self.group.addButton(button, index)
            self.buttons[token] = button
            row.addWidget(button)
            if token == original.strip():
                button.setChecked(True)
        row.addStretch()
        self.note = _hint("")
        layout.addWidget(self.note)
        self.note.setVisible(self.group.checkedButton() is None)
        self.retranslate("spanish")
        # Let the tab order enter on the selected option, if there is one.
        self.focus_target = self.group.checkedButton() or next(iter(self.buttons.values()))
        self.focus_target.setFocusPolicy(Qt.FocusPolicy.StrongFocus)
        # One notification after the selection changes; keyboard arrows use
        # the same signal as mouse clicks.
        self.group.idToggled.connect(self._toggled)

    def _toggled(self, _index, checked):
        if checked:
            self.note.hide()
            self.changed.emit()

    def retranslate(self, language, field_label=""):
        for label, token in self.choices:
            button = self.buttons[token]
            button.setText(tr(label, language))
            button.setAccessibleName(f"{field_label}: {button.text()}" if field_label else button.text())
        self.note.setText(tr("El valor actual se conserva si no eliges ninguna opción.", language))

    def value(self):
        index = self.group.checkedId()
        if index == -1 or self.choices[index][1] == self.original.strip():
            return self.original
        return self.choices[index][1]




def _search_text(text):
    return "".join(c for c in unicodedata.normalize("NFD", text.casefold())
                   if not unicodedata.combining(c))

_UNIVERSITY_ORDER = {code: number for number, code in enumerate(("UAH", "UPM", "URJC", "US", "UCLM"))}


def _degree_order(item, language):
    return (_UNIVERSITY_ORDER.get(item.institution, len(_UNIVERSITY_ORDER)),
            _search_text(item.displayed("university", language)), item.institution,
            _search_text(item.displayed("school", language)), item.school,
            _search_text(item.displayed("name", language)), item.identifier)


class DegreePicker(QDialog):
    def __init__(self, parent, degrees, language="spanish", current=None):
        super().__init__(parent)
        message = lambda source: tr(source, language)
        self.setWindowTitle(message("Seleccionar titulación"))
        self.resize(704, 450)
        self.search = QLineEdit()
        self.search.setPlaceholderText(message("Busca por titulación, centro o universidad"))
        self.search.setAccessibleName(message("Buscar titulación"))
        self.tree = QTreeWidget()
        self.tree.setHeaderHidden(True)
        self.tree.setAccessibleName(message("Titulaciones disponibles"))
        self.buttons = QDialogButtonBox(QDialogButtonBox.StandardButton.Ok |
                                       QDialogButtonBox.StandardButton.Cancel)
        self.buttons.button(QDialogButtonBox.StandardButton.Ok).setText(message("Seleccionar"))
        self.buttons.button(QDialogButtonBox.StandardButton.Cancel).setText(message("Cancelar"))
        self.ok = self.buttons.button(QDialogButtonBox.StandardButton.Ok)
        self.ok.setEnabled(False)
        layout = QVBoxLayout(self)
        layout.addWidget(self.search)
        layout.addWidget(self.tree)
        layout.addWidget(self.buttons)
        self.selection = None
        self._current_item = None
        default_item = None
        universities = {}
        schools = {}
        self.leaves = []
        ordered = sorted(degrees, key=lambda item: _degree_order(item, language))
        for degree in ordered:
            if degree.status != "active":
                continue
            university = degree.displayed("university", language)
            institution = degree.institution or degree.university
            if institution not in universities:
                universities[institution] = self._heading(self.tree, university)
            label = degree.display_label(language)
            school = degree.displayed("school", language)
            school_key = institution, degree.school
            if school_key not in schools:
                schools[school_key] = self._heading(universities[institution], school)
            leaf = QTreeWidgetItem(schools[school_key], [label])
            if degree.identifier == current:
                self._current_item = leaf
            if degree.identifier == "GIEC":
                default_item = leaf
            leaf.setData(0, Qt.ItemDataRole.UserRole, degree.identifier)
            leaf.setToolTip(0, f"{label}\n{school}")
            self.leaves.append((leaf, _search_text(f"{institution} {university} {school} {label} "
                                                  f"{degree.university} {degree.school} {degree.name}")))
        self.search.textChanged.connect(self._filter)
        self.search.returnPressed.connect(self._activate_first)
        self.tree.currentItemChanged.connect(self._refresh_selection)
        self.tree.itemDoubleClicked.connect(lambda *_: self._accept_selection())
        self.buttons.accepted.connect(self._accept_selection)
        self.buttons.rejected.connect(self.reject)
        if self._current_item is None:
            self._current_item = default_item
        self._restore_branch()
        self.search.setFocus()

    @staticmethod
    def _heading(parent, title):
        item = QTreeWidgetItem(parent, [title])
        item.setFlags(item.flags() & ~Qt.ItemFlag.ItemIsSelectable)
        return item

    def _refresh_selection(self, *_):
        item = self.tree.currentItem()
        self.selection = item.data(0, Qt.ItemDataRole.UserRole) if item and not item.isHidden() else None
        self.ok.setEnabled(self.selection is not None)

    def _accept_selection(self):
        self._refresh_selection()
        if self.selection:
            self.accept()

    def _activate_first(self):
        first = next((leaf for leaf, _ in self.leaves if not leaf.isHidden()), None)
        if first:
            self._reveal(first)
            self.tree.setFocus()

    def _reveal(self, item):
        item.parent().parent().setExpanded(True)
        item.parent().setExpanded(True)
        self.tree.setCurrentItem(item)
        self.tree.scrollToItem(item)

    def _restore_branch(self):
        self.tree.collapseAll()
        if self._current_item:
            self._reveal(self._current_item)
        else:
            self.tree.setCurrentItem(None)
        self._refresh_selection()

    def _filter(self, text):
        words = _search_text(text).split()
        for leaf, haystack in self.leaves:
            leaf.setHidden(not all(word in haystack for word in words))
        for index in range(self.tree.topLevelItemCount()):
            university = self.tree.topLevelItem(index)
            for number in range(university.childCount()):
                school = university.child(number)
                school.setHidden(all(school.child(i).isHidden() for i in range(school.childCount())))
                if words and not school.isHidden():
                    school.setExpanded(True)
            university.setHidden(all(university.child(i).isHidden() for i in range(university.childCount())))
            if words and not university.isHidden():
                university.setExpanded(True)
        if words:
            self._refresh_selection()
        else:
            self._restore_branch()


class DegreeValue(QWidget):
    changed = Signal()

    def __init__(self, original, degrees):
        super().__init__()
        self.original = original
        self.language = "spanish"
        self.identifier = original.strip()
        self.degrees = {degree.identifier: degree for degree in degrees}
        self.label = QLabel()
        self.label.setTextFormat(Qt.TextFormat.PlainText)
        self.label.setWordWrap(True)
        self.button = QPushButton("Elegir titulación…")
        self.button.setEnabled(any(entry.status == "active" for entry in degrees))
        self.button.clicked.connect(self._choose)
        layout = QVBoxLayout(self)
        layout.setContentsMargins(0, 0, 0, 0)
        layout.addWidget(self.label)
        layout.addWidget(self.button, alignment=Qt.AlignmentFlag.AlignLeft)
        self._refresh_label()

    def _refresh_label(self):
        degree = self.degrees.get(self.identifier)
        if degree:
            note = "" if degree.status == "active" else self._note("no disponible para nuevas selecciones")
            self.label.setText(degree.display_label(self.language) + note)
        else:
            self.label.setText(self.identifier + self._note("valor actual no reconocido"))

    def _note(self, source):
        return f" ({tr(source, self.language)})"

    def retranslate(self, language):
        self.language = language
        self.button.setText(tr("Elegir titulación…", language))
        self._refresh_label()

    def _choose(self):
        dialog = DegreePicker(self, self.degrees.values(), self.language, current=self.identifier)
        if dialog.exec() == QDialog.DialogCode.Accepted:
            self.identifier = dialog.selection
            self._refresh_label()
            self.changed.emit()

    def value(self):
        return self.original if self.identifier == self.original.strip() else self.identifier

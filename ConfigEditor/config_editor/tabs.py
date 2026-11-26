"""Independent tabs with live labels, applicability, and untouched drafts."""

from PySide6.QtCore import QSignalBlocker, Qt, Signal
from PySide6.QtGui import QColor, QIcon, QPainter, QPixmap
from PySide6.QtWidgets import QComboBox, QFormLayout, QLabel, QScrollArea, QSizePolicy, QVBoxLayout, QWidget

from .fields import AUTHORSHIP, CHOICES, DATES, DOCUMENT, LINK_COLOURS, OPTIONS
from .locale import tr
from .widgets import DegreeValue, RadioValue, SourceValue


# xcolor's base palette, expressed as RGB (not the CSS named colours).
XCOLOR_RGB = {
    "black": (0, 0, 0), "blue": (0, 0, 1), "brown": (.75, .5, .25),
    "cyan": (0, 1, 1), "darkgray": (.25, .25, .25), "gray": (.5, .5, .5),
    "green": (0, 1, 0), "lightgray": (.75, .75, .75), "lime": (.75, 1, 0),
    "magenta": (1, 0, 1), "olive": (.5, .5, 0), "orange": (1, .5, 0),
    "pink": (1, .75, .75), "purple": (.75, 0, .25), "red": (1, 0, 0),
    "teal": (0, .5, .5), "violet": (.5, 0, .5), "white": (1, 1, 1),
    "yellow": (1, 1, 0),
}


def _swatch(rgb, widget):
    ratio = widget.devicePixelRatioF()
    pixmap = QPixmap(round(16 * ratio), round(16 * ratio))
    pixmap.setDevicePixelRatio(ratio)
    pixmap.fill(Qt.GlobalColor.transparent)
    painter = QPainter(pixmap)
    painter.setPen(QColor("#737373"))
    painter.setBrush(QColor.fromRgbF(*rgb))
    painter.drawRect(1, 1, 13, 13)
    painter.end()
    return QIcon(pixmap)


class SettingsTab(QScrollArea):
    changed = Signal()
    settings = ()
    description = ""
    headings = {}
    single_line_labels = False

    def __init__(self, document, degrees, styles):
        super().__init__()
        self.setWidgetResizable(True)
        self.setObjectName("settingsTab")
        content = QWidget()
        content.setObjectName("formContent")
        self.setWidget(content)
        self.form = form = QFormLayout(content)
        form.setContentsMargins(22, 17, 22, 20)
        form.setVerticalSpacing(10)
        form.setHorizontalSpacing(18)
        form.setLabelAlignment(Qt.AlignmentFlag.AlignLeft | Qt.AlignmentFlag.AlignTop)
        form.setFieldGrowthPolicy(QFormLayout.FieldGrowthPolicy.AllNonFixedFieldsGrow)
        form.setRowWrapPolicy(QFormLayout.RowWrapPolicy.DontWrapRows if self.single_line_labels
                              else QFormLayout.RowWrapPolicy.WrapLongRows)
        self.controls = {}
        self.rows = {}
        self.sections = {}
        self._readers = {}
        self.visible_fields = set()
        self.intro = self._note("", "help")
        form.addRow(self.intro)
        section = ""
        for item in self.settings:
            group = self.headings.get(item.name) or item.section
            if group and group != section:
                section = group
                heading = self._note("", "section")
                self.sections[section] = (heading, [])
                form.addRow(heading)
            if section:
                self.sections[section][1].append(item.name)
            value = document.value(item.name)
            label = self._note("")
            if self.single_line_labels:
                label.setWordWrap(False)
            label.setToolTip("\\" + item.name)
            index = form.rowCount()
            detail = None
            if value is None:
                reason = document.fields[item.name].reason
                widget = self._note(reason, "help")
                focus = None
            else:
                widget, focus, reader = self._control(item, value, document.newline, degrees, styles)
                self.controls[item.name] = widget
                self._readers[item.name] = value, reader
                widget.setToolTip("\\" + item.name)
                label.setBuddy(focus)
                reason = ""
            if item.help:
                detail = self._note("", "help")
                field = QWidget()
                stack = QVBoxLayout(field)
                stack.setContentsMargins(0, 0, 0, 0)
                stack.setSpacing(2)
                stack.addWidget(widget)
                stack.addWidget(detail)
                form.addRow(label, field)
            else:
                form.addRow(label, widget)
            self.rows[item.name] = (item, label, widget, focus, detail, index, reason)

    def _control(self, item, value, newline, degrees, styles):
        if item.kind == "degree":
            control = DegreeValue(value, degrees)
            focus = control.button
        elif item.kind in {"text", "date", "line", "uri", "email"}:
            control = SourceValue(value, newline, multiline=item.kind == "text",
                                  visible_lines=item.visible_lines)
            focus = control.editor
        elif item.kind in {"gender", "language"}:
            control = RadioValue(value, CHOICES[item.kind])
            focus = control.focus_target
        else:
            if item.kind == "style":
                choices = tuple((style, style) for style in styles)
            elif item.kind == "colour":
                choices = tuple((name, name) for name in XCOLOR_RGB)
            else:
                choices = CHOICES[item.kind]
            control = QComboBox()
            if item.kind == "colour":
                control.setSizeAdjustPolicy(QComboBox.SizeAdjustPolicy.AdjustToMinimumContentsLengthWithIcon)
                control.setMinimumContentsLength(8)
                control.setSizePolicy(QSizePolicy.Policy.Expanding, QSizePolicy.Policy.Fixed)
            for label, token in choices:
                control.addItem(label, token)
                if item.kind == "colour":
                    control.setItemIcon(control.count() - 1, _swatch(XCOLOR_RGB[token], control))
            index = control.findData(value.strip())
            if index < 0:
                control.insertItem(0, value, value)
                index = 0
                control.setItemData(0, True, Qt.ItemDataRole.UserRole + 1)
                if item.kind == "colour":
                    control.model().item(0).setEnabled(False)
            control.setCurrentIndex(index)
            control.setEnabled(bool(choices))
            control.currentIndexChanged.connect(self.changed)
            control.choice_labels = dict((token, label) for label, token in choices)
            return control, control, lambda: value if control.currentIndex() == index else control.currentData()
        control.changed.connect(self.changed)
        return control, focus, control.value

    @staticmethod
    def _note(text, role="label"):
        label = QLabel(text)
        label.setTextFormat(Qt.TextFormat.PlainText)
        label.setWordWrap(True)
        label.setProperty("formRole", role)
        return label

    def retranslate(self, context):
        language = context.language
        def translate(text):
            return tr(text, language)

        self.intro.setText(translate(self.description) + " " + translate(
            "Pasa el ratón por encima de la etiqueta de un campo para ver el nombre de su variable en Config/myconfig.tex."))
        visible = set()
        for name, (item, label, widget, focus, detail, index, reason) in self.rows.items():
            applicable = bool(context.features.intersection(item.uses.split()))
            if applicable:
                visible.add(name)
            if self.form.isRowVisible(index) != applicable:
                self.form.setRowVisible(index, applicable)
            if detail is not None:
                detail.setText(translate(item.help))
            title = (item.suffix_en if language == "english" and item.suffix_en
                     else translate(item.label))
            if name in {"myAcademicTutorFullName", "myCoTutorFullName",
                        "myAcademicTutorGender", "myCoTutorGender"}:
                secondary = name.startswith("myCoTutor")
                role = context.role(secondary=secondary) or translate("Cotutor/a" if secondary else "Tutor/a")
                title = role if name.endswith("FullName") else f"{role}: {translate(item.label)}"
            if (context.known and context.degree.profile in
                    {"upm-etsit-tft", "upm-etsit-gisd-tfg", "upm-etsit-mune-tfm", "upm-etsist-pfg"}):
                single_member = {"myTribunalFirstSpokesperson": "Vocal",
                                 "myTribunalFirstSpokespersonGender": "Vocal: género gramatical"}
                if name in single_member:
                    title = translate(single_member[name])
            label.setText(title)
            if reason:
                widget.setText(translate(reason))
            elif isinstance(widget, DegreeValue):
                widget.retranslate(language)
                focus.setAccessibleName(title)
            elif isinstance(widget, RadioValue):
                widget.retranslate(language, title)
            else:
                focus.setAccessibleName(title)
                if isinstance(widget, QComboBox):
                    with QSignalBlocker(widget):
                        for index in range(widget.count()):
                            token = widget.itemData(index)
                            if widget.itemData(index, Qt.ItemDataRole.UserRole + 1):
                                text = f"{translate('Valor actual:')} {token}"
                            elif item.kind == "colour":
                                text = token
                            else:
                                text = translate(widget.choice_labels[token])
                            widget.setItemText(index, text)
        self.visible_fields = visible
        for key, (header, fields) in self.sections.items():
            if key in {"primary", "secondary"}:
                header.setText(context.role(secondary=key == "secondary"))
            else:
                header.setText(translate(key))
            show = not visible.isdisjoint(fields)
            if self.form.isRowVisible(header) != show:
                self.form.setRowVisible(header, show)

    def edits(self):
        return {name: value for name, (original, read) in self._readers.items()
                if (value := read()) != original}

    def label(self, name):
        return self.rows[name][1].text()


class DocumentTab(SettingsTab):
    settings = DOCUMENT
    description = "Selecciona tu titulación e idioma. Los títulos y palabras clave se editan por separado."


class AuthorshipTab(SettingsTab):
    settings = AUTHORSHIP
    description = "Sustituye los datos de ejemplo por los tuyos y los de las personas que dirigen tu trabajo."
    headings = {"myAuthorName": "Autoría", "myAcademicTutorFullName": "primary",
                "myCoTutorFullName": "secondary"}


class DatesTab(SettingsTab):
    settings = DATES
    description = "No hace falta cambiar todas las fechas ahora. Conserva las referencias LaTeX que quieras reutilizar."


class OptionsTab(SettingsTab):
    settings = OPTIONS
    description = "Estos ajustes afectan al libro. Si no necesitas cambiarlos, conserva los valores actuales."
    headings = {"myTypesettingStyle": "Presentación", "myIncludeSampleLetter": "Elementos opcionales",
                "myIncludeChapterBibliographies": "Bibliografía"}


class LinkColoursTab(SettingsTab):
    settings = LINK_COLOURS
    single_line_labels = True
    description = "Elige un color para cada tipo de enlace. Los valores que no estén en la paleta se conservan hasta que elijas otro."

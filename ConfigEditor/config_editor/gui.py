"""Application shell: project selection, tabs, and explicit save/reload."""

import argparse
from pathlib import Path
import re
import sys

from PySide6.QtCore import QEvent, QPointF, QSettings, Qt
from PySide6.QtGui import QAction, QFontMetrics, QKeySequence, QPainter, QPalette, QTextLayout, QTextOption
from PySide6.QtWidgets import (
    QApplication, QFileDialog, QHBoxLayout, QLabel, QMainWindow, QMessageBox,
    QPushButton, QSizePolicy, QTabWidget, QVBoxLayout, QWidget,
)

from .appearance import stylesheet
from .catalogue import load_degrees, load_styles
from .context import make_context
from .document import ConfigDocument, DocumentError, SaveError, plain_text
from .entry_text import normalise_entry
from .fields import FIELD_BY_NAME, NAMES
from .locale import tr
from .tabs import AuthorshipTab, DatesTab, DocumentTab, LinkColoursTab, OptionsTab
from .tex import TexError


APP_NAME = "Editor de la configuración de la plantilla LaTeX"
TABS = ((DocumentTab, "Documento"), (AuthorshipTab, "Autoría y tutoría"),
        (DatesTab, "Fechas"), (OptionsTab, "Opciones del documento"),
        (LinkColoursTab, "Colores de los enlaces"))
_LAST_DIRECTORY = "project/lastDirectory"
_UNSAVED = "Cambios sin guardar"
_MORE_DETAILS = "más detalles al pasar el ratón"
_LATEX_EXAMPLES = (
    ("Guion bajo en texto", r"PEPE_JUAN", r"PEPE\_JUAN"),
    ("Guion bajo ya escapado", r"PEPE\_JUAN", r"PEPE\_JUAN"),
    ("Ampersand y porcentaje", "Medición & control (50%)", r"Medición \& control (50\%)"),
    ("Comando de formato", r"\emph{Texto}", r"\emph{Texto}"),
    ("Fórmula", r"$3_4$", r"$3_4$"),
)
_SPANISH_DATE = (r"[0-9]{1,2} de (enero|febrero|marzo|abril|mayo|junio|julio|"
                 r"agosto|septiembre|octubre|noviembre|diciembre) de [0-9]{4}")


class ProjectPath(QLabel):
    def __init__(self, text):
        super().__init__()
        self.setObjectName("projectPath")
        self.setTextFormat(Qt.TextFormat.PlainText)
        policy = QSizePolicy(QSizePolicy.Policy.Ignored, QSizePolicy.Policy.Preferred)
        policy.setHeightForWidth(True)
        self.setSizePolicy(policy)
        self.setWordWrap(True)
        self.set_path("", text)

    def set_path(self, path, label="Directorio de trabajo:"):
        display = f"{label} {path}" if path else label
        self.setText(display)
        self.setAccessibleName(display)
        self.setAccessibleDescription(path)
        self.setToolTip(path)

    def _wrapped(self, width):
        layout = QTextLayout(self.text(), self.font())
        option = QTextOption()
        option.setWrapMode(QTextOption.WrapMode.WrapAtWordBoundaryOrAnywhere)
        layout.setTextOption(option)
        layout.beginLayout()
        height = 0
        while (line := layout.createLine()).isValid():
            line.setLineWidth(max(width, 1))
            line.setPosition(QPointF(0, height))
            height += line.height()
        layout.endLayout()
        return layout, height

    def heightForWidth(self, width):
        margins = self.contentsMargins()
        _, height = self._wrapped(width - margins.left() - margins.right())
        return round(height + margins.top() + margins.bottom())

    def paintEvent(self, _event):
        area = self.contentsRect()
        layout, _ = self._wrapped(area.width())
        painter = QPainter(self)
        painter.setPen(self.palette().color(QPalette.ColorRole.WindowText))
        layout.draw(painter, QPointF(area.topLeft()))


class ChangeSummary(QLabel):
    """Fit complete field names in the space the layout gives the toolbar."""

    def __init__(self):
        super().__init__()
        self._summary = "", (), ""
        self._minimum_text = ""
        self.setObjectName("editorState")
        self.setTextFormat(Qt.TextFormat.PlainText)
        self.setSizePolicy(QSizePolicy.Policy.Ignored, QSizePolicy.Policy.Preferred)

    def set_summary(self, heading, labels=(), hint="", *, minimum_text=""):
        dirty = bool(labels)
        if self.property("dirty") != dirty:
            self.setProperty("dirty", dirty)
            self.style().unpolish(self)
            self.style().polish(self)
        self._summary = heading, labels, hint
        self._minimum_text = minimum_text
        self.setToolTip("\n".join(labels))
        self.setAccessibleName(heading)
        self.setAccessibleDescription(", ".join(labels))
        self._fit()

    def _fit(self):
        if self._minimum_text:
            font = self.font()
            font.setBold(True)
            margins = self.contentsMargins()
            minimum = (QFontMetrics(font).horizontalAdvance(self._minimum_text)
                       + margins.left() + margins.right())
            if minimum != self.minimumWidth():
                self.setMinimumWidth(minimum)
        heading, labels, hint = self._summary
        if not labels:
            text = heading
        else:
            width = self.contentsRect().width()
            measure = self.fontMetrics().horizontalAdvance
            text = f"{heading} ({', '.join(labels)})"
            if measure(text) > width:
                text = f"{heading} ({hint})"
                for count in range(1, len(labels)):
                    candidate = f"{heading} ({', '.join(labels[:count])}... ; {hint})"
                    if measure(candidate) > width:
                        break
                    text = candidate
        if text != self.text():
            self.setText(text)

    def resizeEvent(self, event):
        super().resizeEvent(event)
        self._fit()

    def changeEvent(self, event):
        super().changeEvent(event)
        if event.type() in {QEvent.Type.FontChange, QEvent.Type.StyleChange}:
            self._fit()


class MainWindow(QMainWindow):
    def __init__(self, settings=None):
        super().__init__()
        # INI storage also keeps the preference in a file on Windows.
        self.settings = settings if settings is not None else QSettings(
            QSettings.Format.IniFormat, QSettings.Scope.UserScope, "PhDTFMTFG", "ConfigEditor")
        self.settings.setFallbacksEnabled(False)
        self.resize(850, 680)
        self.document = None
        self.degrees = ()
        self.styles = ()
        self.language = "spanish"
        self._context_key = None
        self._registry_warnings = []
        self._status = ("Abre una carpeta de proyecto para empezar.", "")
        self.tabs = QTabWidget()
        self.tabs.setEnabled(False)
        self.project = ProjectPath("Selecciona la carpeta donde descomprimiste la plantilla.")
        self.notice = self._label("")
        self.notice.setProperty("formRole", "help")
        self.notice.hide()
        self.editor_state = ChangeSummary()
        self.open_button = QPushButton("Abrir directorio de trabajo…")
        self.open_button.clicked.connect(self.choose_project)
        self.reload_button = QPushButton("Recargar")
        self.reload_button.clicked.connect(self.reload)
        self.save_button = QPushButton("Guardar")
        self.save_button.setObjectName("saveButton")
        self.save_button.clicked.connect(self.save)
        self.save_button.setEnabled(False)
        self.reload_button.setEnabled(False)
        row = QHBoxLayout()
        row.setSpacing(8)
        row.addWidget(self.editor_state, 1)
        for button in (self.open_button, self.reload_button, self.save_button):
            row.addWidget(button)
        base = QWidget()
        base.setObjectName("workspace")
        layout = QVBoxLayout(base)
        layout.setContentsMargins(18, 14, 18, 14)
        layout.setSpacing(9)
        self.heading = self._label(APP_NAME)
        self.heading.setObjectName("heading")
        self.latex_note = self._label("")
        self.latex_note.setProperty("formRole", "help")
        self.latex_help = QPushButton()
        self.latex_help.clicked.connect(self._show_latex_help)
        help_row = QHBoxLayout()
        help_row.addWidget(self.latex_note, 1)
        help_row.addWidget(self.latex_help)
        layout.addWidget(self.heading)
        layout.addWidget(self.project)
        layout.addLayout(row)
        layout.addWidget(self.notice)
        layout.addLayout(help_row)
        layout.addSpacing(3)
        layout.addWidget(self.tabs, 1)
        self.setCentralWidget(base)
        self._set_palette(QApplication.palette())
        QApplication.instance().paletteChanged.connect(self._set_palette)

        self.file_menu = menu = self.menuBar().addMenu("Archivo")
        self.open_action = self._action(menu, "Abrir directorio de trabajo…",
                                        QKeySequence.StandardKey.Open, self.choose_project)
        self.save_action = self._action(menu, "Guardar", QKeySequence.StandardKey.Save, self.save)
        self.save_action.setEnabled(False)
        self._retranslate()
        self._update_dirty()

    @staticmethod
    def _label(text):
        widget = QLabel(text)
        widget.setTextFormat(Qt.TextFormat.PlainText)
        widget.setWordWrap(True)
        return widget

    def _action(self, menu, title, shortcut, slot):
        action = QAction(title, self)
        action.setShortcut(shortcut)
        action.triggered.connect(slot)
        menu.addAction(action)
        return action

    def _edits(self):
        return {name: value for index in range(self.tabs.count())
                for name, value in self.tabs.widget(index).edits().items()}

    def _t(self, message):
        return tr(message, self.language)

    def _show_status(self, message=None, detail=""):
        if message is not None:
            self._status = message, detail
        message, detail = self._status
        self.statusBar().showMessage(f"{self._t(message)} {detail}".rstrip())

    def _retranslate(self):
        self.heading.setText(self._t(APP_NAME))
        if self.document is None:
            self.project.set_path("", self._t("Selecciona la carpeta donde descomprimiste la plantilla."))
        else:
            self.project.set_path(str(self.document.path.parent.parent), self._t("Directorio de trabajo:"))
        for widget, source in ((self.open_button, "Abrir directorio de trabajo…"), (self.reload_button, "Recargar"),
                               (self.save_button, "Guardar"), (self.latex_help, "Ejemplos de texto y LaTeX"),
                               (self.open_action, "Abrir directorio de trabajo…"), (self.save_action, "Guardar")):
            widget.setText(self._t(source))
        self.file_menu.setTitle(self._t("Archivo"))
        self.latex_note.setText(self._t(
            "Todos los campos de texto admiten código LaTeX. El editor escapa automáticamente los caracteres especiales del texto normal."))
        for index, (_, title) in enumerate(TABS[:self.tabs.count()]):
            self.tabs.setTabText(index, self._t(title))
        self._show_status()

    def _show_latex_help(self):
        examples = "\n".join(f"• {self._t(label)}: {entered} → {saved}"
                             for label, entered, saved in _LATEX_EXAMPLES)
        self._message(
            QMessageBox.Icon.Information, self._t("Ejemplos de texto y LaTeX"),
            self._t("Puedes mezclar texto normal y código LaTeX en un mismo campo. Al guardar un campo que has "
                    "editado, el editor escapa los símbolos especiales del texto normal, sin volver a escapar los "
                    "que ya lo están. Los campos que no cambies se quedan tal como estaban.") +
            "\n\n" + self._t("Lo que escribes → Lo que se guarda en Config/myconfig.tex") +
            "\n" + examples + "\n\n" +
            self._t("El editor detecta algunos problemas, como llaves sin pareja, pero no compila el documento. "
                    "Compílalo con tu herramienta habitual para comprobar el resultado."))

    def _update_context(self, edits):
        if not self.document:
            return
        language, identifier = ((edits.get(key, self.document.value(key)) or "").strip()
                                for key in ("myLanguage", "myDegree"))
        key = language, identifier
        if key == self._context_key:
            return
        self._context_key = key
        degree = next((entry for entry in self.degrees if entry.identifier == identifier), None)
        context = make_context(degree, language, self.document.path.parent.parent)
        self.language = context.language
        for index in range(self.tabs.count()):
            self.tabs.widget(index).retranslate(context)
        self._retranslate()
        warnings = list(self._registry_warnings)
        if not context.known:
            warnings.append("No se pudieron determinar las opciones institucionales de esta titulación.")
        self.notice.setText(" ".join(map(self._t, warnings)))
        self.notice.setVisible(bool(warnings))

    def _update_dirty(self):
        edits = self._edits()
        self._update_context(edits)
        dirty = bool(edits)
        self.save_button.setEnabled(dirty)
        self.save_action.setEnabled(dirty)
        self.setWindowTitle(f"{'• ' if dirty else ''}{self._t(APP_NAME)}")
        heading, hint = self._t(_UNSAVED), self._t(_MORE_DETAILS)
        minimum_text = f"{heading} ({hint})"
        if dirty:
            labels = [self._label_for(name) for name in edits]
            self.editor_state.set_summary(heading, labels, hint, minimum_text=minimum_text)
        else:
            self.editor_state.set_summary(
                self._t("Sin cambios pendientes" if self.document else "Ningún proyecto abierto"),
                minimum_text=minimum_text)

    def _set_palette(self, palette):
        style = stylesheet(palette)
        if self.styleSheet() != style:
            self.setStyleSheet(style)

    def _confirm_leave(self):
        if not self._edits():
            return True
        dialog = QMessageBox(QMessageBox.Icon.Question, self._t("Cambios sin guardar"),
                             self._t("¿Qué quieres hacer con los cambios pendientes?"), parent=self)
        save = dialog.addButton(self._t("Guardar"), QMessageBox.ButtonRole.AcceptRole)
        discard = dialog.addButton(self._t("Descartar"), QMessageBox.ButtonRole.DestructiveRole)
        cancel = dialog.addButton(self._t("Cancelar"), QMessageBox.ButtonRole.RejectRole)
        dialog.setDefaultButton(save)
        dialog.setEscapeButton(cancel)
        dialog.exec()
        if dialog.clickedButton() is save:
            return self.save()
        return dialog.clickedButton() is discard

    def choose_project(self):
        if self.document:
            initial = self.document.path.parent.parent
        else:
            last = self.settings.value(_LAST_DIRECTORY, "", type=str)
            initial = Path(last) if last else Path.home()
        if not initial.is_dir():
            initial = Path.home()
        chosen = QFileDialog.getExistingDirectory(
            self, self._t("Seleccionar directorio de trabajo"), str(initial))
        if chosen:
            self.open_project(Path(chosen))

    def open_project(self, root, *, confirm=True, show_errors=True, remember=True):
        if confirm and not self._confirm_leave():
            return False
        config_dir = Path(root).absolute() / "Config"
        try:
            document = ConfigDocument.open(config_dir / "myconfig.tex", NAMES)
            if not any(field.span is not None for field in document.fields.values()):
                raise DocumentError("No hay ningún campo de configuración que se pueda editar.")
        except (OSError, DocumentError) as exc:
            if show_errors:
                explanation = str(exc) if isinstance(exc, DocumentError) else (
                    "No se puede abrir Config/myconfig.tex. Selecciona la carpeta superior "
                    "de la plantilla y comprueba que puedes leer el fichero.")
                self._message(QMessageBox.Icon.Warning, self._t("No se pudo abrir el proyecto"), self._t(explanation))
            return False

        warnings = []
        try:
            self.degrees = load_degrees(config_dir)
        except (OSError, TexError, ValueError, KeyError):
            self.degrees = ()
            warnings.append("No se pudo leer el registro de titulaciones.")
        try:
            self.styles = load_styles(config_dir)
        except (OSError, TexError):
            self.styles = ()
            warnings.append("No se pudo leer la lista de estilos.")
        self._registry_warnings = warnings
        self.reload_button.setEnabled(True)
        self._load_tabs(document)
        self._show_status("Fichero cargado. Solo se guardarán los valores que cambies.")
        if remember:
            self.settings.setValue(_LAST_DIRECTORY, str(document.path.parent.parent))
            self.settings.sync()
            if self.settings.status() != QSettings.Status.NoError:
                self._show_status("Fichero cargado, pero no se pudo recordar el directorio de trabajo.")
        return True

    def _load_tabs(self, document):
        self.document = document
        self._context_key = None
        current = self.tabs.currentIndex()
        while self.tabs.count():
            item = self.tabs.widget(0)
            self.tabs.removeTab(0)
            item.deleteLater()
        for panel, title in TABS:
            tab = panel(document, self.degrees, self.styles)
            tab.changed.connect(self._update_dirty)
            self.tabs.addTab(tab, title)
        self.tabs.setCurrentIndex(max(0, current))
        self.tabs.setEnabled(True)
        self._update_dirty()

    def reload(self):
        if self.document:
            return self.open_project(self.document.path.parent.parent, remember=False)
        return False

    def _message(self, icon, title, message):
        dialog = QMessageBox(icon, title, message, parent=self)
        dialog.addButton(self._t("Aceptar"), QMessageBox.ButtonRole.AcceptRole)
        dialog.setTextFormat(Qt.TextFormat.PlainText)
        dialog.exec()

    def _check_dates(self, edits):
        patterns = {"myThesisAcademicYear": r"[0-9]{4}/[0-9]{4}",
                    "myThesisDefenseYear": r"[0-9]{4}",
                    "myThesisDepositYear": r"[0-9]{4}",
                    "myThesisDepositDate": _SPANISH_DATE,
                    "myThesisDefenseDate": _SPANISH_DATE}
        notes = []
        for name, pattern in patterns.items():
            if name not in edits:
                continue
            value = plain_text(edits[name])
            if value and not re.fullmatch(pattern, value.strip(), re.IGNORECASE):
                notes.append(self._label_for(name))
        if not notes:
            return True
        dialog = QMessageBox(QMessageBox.Icon.Warning, self._t("Comprueba el formato de las fechas"),
                             self._t("Algunos valores no tienen el formato habitual y tu portada puede depender de él:") +
                             "\n" + "\n".join(notes), parent=self)
        dialog.setTextFormat(Qt.TextFormat.PlainText)
        save = dialog.addButton(self._t("Guardar de todos modos"), QMessageBox.ButtonRole.AcceptRole)
        cancel = dialog.addButton(self._t("Volver a la edición"), QMessageBox.ButtonRole.RejectRole)
        dialog.setDefaultButton(cancel)
        dialog.exec()
        return dialog.clickedButton() is save

    def _label_for(self, name):
        for index in range(self.tabs.count()):
            tab = self.tabs.widget(index)
            if name in tab.rows:
                return tab.label(name)
        return "\\" + name

    def _confirm_hidden(self, hidden):
        dialog = QMessageBox(QMessageBox.Icon.Warning, self._t("Ediciones ocultas"),
                             self._t("No se aplicarán a la titulación seleccionada los cambios de estos campos:") +
                             "\n\n" + "\n".join(f"• {self._label_for(name)}" for name in hidden), parent=self)
        dialog.setTextFormat(Qt.TextFormat.PlainText)
        save = dialog.addButton(self._t("Guardar lo visible y descartar lo oculto"),
                                QMessageBox.ButtonRole.AcceptRole)
        cancel = dialog.addButton(self._t("Cancelar"), QMessageBox.ButtonRole.RejectRole)
        dialog.setDefaultButton(cancel)
        dialog.setEscapeButton(cancel)
        dialog.exec()
        return dialog.clickedButton() is save

    def save(self):
        drafts = self._edits()
        if not drafts:
            return True
        visible = set().union(*(self.tabs.widget(i).visible_fields for i in range(self.tabs.count())))
        hidden = [name for name in drafts if name not in visible]
        if hidden and not self._confirm_hidden(hidden):
            return False
        edits = {}
        try:
            for name, value in drafts.items():
                if name not in visible:
                    continue
                try:
                    kind = FIELD_BY_NAME[name].kind
                    if kind in {"line", "text", "date", "uri", "email"}:
                        value = normalise_entry(value, kind=kind, original=self.document.value(name))
                    self.document.render({name: value})
                except (DocumentError, TexError, RecursionError) as exc:
                    message = ("Hay un grupo, una fórmula o un entorno LaTeX sin cerrar."
                               if isinstance(exc, RecursionError) else str(exc))
                    label = self._label_for(name)
                    self._message(QMessageBox.Icon.Warning, self._t("No se guardaron los cambios"),
                                  f"{label} (\\{name}): {self._t(message)}")
                    return False
                edits[name] = value
            if not self._check_dates(edits):
                return False
            document, backup = self.document.save(edits)
        except DocumentError as exc:
            message = self._t(str(exc))
            if isinstance(exc, SaveError) and exc.backup:
                message += f"\n{self._t('Copia de seguridad:')} {exc.backup}"
            self._message(QMessageBox.Icon.Warning, self._t("No se guardaron los cambios"), message)
            return False
        self._load_tabs(document)
        if backup:
            self._show_status("Guardado. Copia de seguridad:", str(backup))
        elif hidden:
            self._show_status("Se descartaron las ediciones ocultas. No se modificó el fichero.")
        return True

    def closeEvent(self, event):
        if self._confirm_leave():
            event.accept()
        else:
            event.ignore()


def main(argv=None):
    parser = argparse.ArgumentParser(description=APP_NAME)
    parser.add_argument("project", nargs="?", type=Path)
    parser.add_argument("--smoke-test", action="store_true", help=argparse.SUPPRESS)
    args = parser.parse_args(argv)
    app = QApplication([sys.argv[0]])
    app.setApplicationName(APP_NAME)
    window = MainWindow()
    if args.project and not window.open_project(
            args.project, show_errors=not args.smoke_test, remember=not args.smoke_test):
        if args.smoke_test:
            return 2
    if args.smoke_test:
        window.show()
        app.processEvents()
        return 0 if (window.tabs.count() == len(TABS) and
                     window.degrees and window.styles and not window._edits()) else 1
    window.show()
    return app.exec()

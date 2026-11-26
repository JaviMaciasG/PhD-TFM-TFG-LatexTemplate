"""Small, palette-aware stylesheet; widgets keep native behaviour."""

from PySide6.QtGui import QPalette


def stylesheet(palette):
    dark = palette.color(QPalette.ColorRole.Window).lightness() < 128
    window, surface, line = ("#20262e", "#272f3a", "#535f70") if dark else (
        "#f2f5f9", "#ffffff", "#c7d2df")
    foreground, muted, accent = ("#f0f4fa", "#b8c6d7", "#91c8f2") if dark else (
        "#192f43", "#465b70", "#175b8c")
    on_accent, hover = ("#142636", "#b0d9f9") if dark else ("#ffffff", "#104b77")
    neutral_hover = "#354457" if dark else "#e7eff7"
    disabled = "#8d9cae" if dark else "#647486"
    unsaved = "#ffa2a8" if dark else "#a12430"
    return f"""
        QWidget#workspace {{ background: {window}; }}
        QWidget#formContent, QScrollArea#settingsTab {{ background: {surface}; border: 0; }}
        QLabel#heading {{ color: {foreground}; font-size: 22px; font-weight: 700; }}
        QLabel[formRole="label"] {{ color: {foreground}; }}
        QLabel[formRole="help"], QLabel#editorState {{ color: {muted}; }}
        QLabel#projectPath {{ color: {foreground}; font-size: 14px; font-weight: 700; }}
        QLabel[formRole="section"] {{
            color: {foreground}; font-weight: 700; font-size: 15px;
            border-bottom: 1px solid {line}; padding: 8px 0 5px;
        }}
        QLabel#editorState[dirty="true"] {{ color: {unsaved}; font-weight: 700; }}
        QTabWidget::pane {{ background: {surface}; border: 1px solid {line}; border-radius: 6px; }}
        QLineEdit, QPlainTextEdit {{
            border: 1px solid {line}; border-radius: 5px; padding: 5px 7px;
            background: {surface}; color: {foreground};
        }}
        QLineEdit:focus, QPlainTextEdit:focus {{ border-color: {accent}; }}
        QLineEdit:read-only {{ color: {muted}; }}
        QPushButton {{
            padding: 6px 11px; border: 1px solid {line}; border-radius: 5px;
            background: {surface}; color: {foreground};
        }}
        QPushButton:hover {{ background: {neutral_hover}; border-color: {accent}; }}
        QPushButton:pressed {{ background: {neutral_hover}; border: 2px solid {accent}; padding: 5px 10px; }}
        QPushButton:focus {{ border: 2px solid {accent}; padding: 5px 10px; }}
        QPushButton#saveButton {{ background: {accent}; color: {on_accent};
                                   border-color: {accent}; font-weight: 700; }}
        QPushButton#saveButton:hover {{ background: {hover}; }}
        QPushButton#saveButton:focus {{ border-color: {on_accent}; }}
        QPushButton:disabled, QPushButton#saveButton:disabled {{
            color: {disabled}; background: {window}; border: 1px solid {line};
        }}
    """

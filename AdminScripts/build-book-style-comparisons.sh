#!/usr/bin/env bash
# Build and concatenate comparison excerpts for every registered Book style.
# Label each comparison page with its style in the upper-right margin (8pt).
# Keep this file in AdminScripts/; no other template files need to change.
# Requires Python 3 + PyMuPDF; fresh builds delegate to the Bash prototype helper.
# Run from the template root:
#   bash AdminScripts/build-book-style-comparisons.sh
#   bash AdminScripts/build-book-style-comparisons.sh --pdf-dir Book/typesetting-prototypes
#   bash AdminScripts/build-book-style-comparisons.sh --list-styles
# Install the PDF dependency: python3 -m pip install PyMuPDF
set -euo pipefail

script_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
exec "${PYTHON:-python3}" - "$script_dir/.." "$@" <<'PYTHON'
import argparse
import os
from pathlib import Path
import re
import subprocess
import sys
import tempfile
import unicodedata


BLUE = (0.12, 0.30, 0.48)
DARK = (0.12, 0.14, 0.17)
GREY = (0.40, 0.43, 0.47)


def fail(message):
    raise RuntimeError(message)


def uncomment(text):
    return re.sub(r"(?<!\\)%[^\n]*", "", text)


def registered_styles(root):
    dispatcher = root / "Config/typesetting/typesetting.tex"
    text = uncomment(dispatcher.read_text(encoding="utf-8"))
    # The dispatcher owns the accepted styles and their presentation order.
    match = re.search(r"\\def\\thesis@registeredstyles\{([^}]*)\}", text)
    if not match:
        fail(f"Cannot read the style registry in {dispatcher}")
    styles = [item.strip() for item in match.group(1).split(",")]
    if not styles or len(styles) != len(set(styles)):
        fail("The style registry must contain distinct, nonempty names.")
    for style in styles:
        if not re.fullmatch(r"[A-Za-z0-9_-]+", style):
            fail(f"Unsupported style name: {style!r}")
        path = root / f"Config/typesetting/styles/{style}.tex"
        if not path.is_file():
            fail(f"Registered style {style!r} has no definition: {path}")
    return styles


def normalized(text):
    text = unicodedata.normalize("NFKD", text).casefold()
    return " ".join("".join(c for c in text if not unicodedata.combining(c)).split())


def sample_pages(pdf, path, override):
    if override is not None:
        pages = [n - 1 for n in override]
    else:
        toc = pdf.get_toc()
        chapter_entries = [(title, page - 1) for level, title, page in toc
                           if level == 1 and re.match(r"^0*1\s+", title)]
        contents_entries = [(title, page - 1) for level, title, page in toc
                            if level == 1 and normalized(title) in
                            {"indice general", "contents", "table of contents"}]
        long_entries = [(title, page - 1) for level, title, page in toc
                        if level == 1 and "ejemplos avanzados de composicion" in normalized(title)]
        texts = [normalized(page.get_text()) for page in pdf]
        # This identifies the example equation page, even when the section
        # bookmark points to the preceding page after a pagination change.
        equations = [i for i, text in enumerate(texts)
                     if "matematicas y referencias cruzadas" in text and "equation" in text
                     and "\\label" in text]
        if not (len(contents_entries) == len(chapter_entries) == len(long_entries) == 1
                and len(equations) == 1):
            fail(f"Cannot uniquely locate the four guide samples in {path}. "
                 "Use --pages with four 1-based page numbers for a different book.")
        pages = [contents_entries[0][1], chapter_entries[0][1],
                 equations[0], long_entries[0][1]]
    if any(n < 0 or n >= len(pdf) for n in pages):
        fail(f"Sample page outside the 1-{len(pdf)} range in {path}")
    return pages


def stamp_style(page, style, fitz):
    # Use the visible page coordinates, then compensate for any PDF rotation.
    # Only copied comparison pages are stamped; source PDFs remain untouched.
    fontsize = 8
    margin = 12
    width = fitz.get_text_length(style, fontname="helv", fontsize=fontsize)
    if width > page.rect.width - 2 * margin:
        fail(f"Style name {style!r} does not fit in the comparison-page margin.")
    origin = fitz.Point(page.rect.x1 - margin - width, page.rect.y0 + 18)
    page.insert_text(origin * page.derotation_matrix, style,
                     fontname="helv", fontsize=fontsize, color=(0.35, 0.35, 0.35),
                     rotate=page.rotation, overlay=True)


def add_textbox(page, rect, text, fitz, **kwargs):
    remaining = page.insert_textbox(fitz.Rect(*rect), text, **kwargs)
    if remaining < 0:
        fail(f"Front-matter text does not fit its box: {text[:40]!r}")


def add_front_matter(comparison, root, fitz):
    release_path = root / "RELEASE.txt"
    release = release_path.read_text(encoding="utf-8").strip() if release_path.is_file() else ""
    page_rect = fitz.paper_rect("a4")

    cover = comparison.new_page(width=page_rect.width, height=page_rect.height)
    cover.draw_rect(fitz.Rect(0, 0, 22, page_rect.height), color=BLUE, fill=BLUE)
    cover.draw_line(fitz.Point(72, 176), fitz.Point(222, 176), color=BLUE, width=3)
    add_textbox(cover, (72, 72, 523, 112), "PhD-TFM-TFG LaTeX Template", fitz,
                fontname="helv", fontsize=11, color=GREY)
    add_textbox(cover, (72, 205, 523, 290), "TYPESETTING STYLES", fitz,
                fontname="hebo", fontsize=29, color=DARK, lineheight=1.05)
    add_textbox(cover, (72, 292, 523, 352), "Estilos de composición tipográfica", fitz,
                fontname="helv", fontsize=21, color=BLUE, lineheight=1.05)
    add_textbox(cover, (72, 384, 523, 430), "Visual comparison / Comparación visual", fitz,
                fontname="helv", fontsize=13, color=GREY)
    if release:
        add_textbox(cover, (72, 744, 523, 772), f"Release {release}", fitz,
                    fontname="helv", fontsize=9, color=GREY, align=fitz.TEXT_ALIGN_RIGHT)

    intro = comparison.new_page(width=page_rect.width, height=page_rect.height)
    intro.draw_rect(fitz.Rect(0, 0, page_rect.width, 18), color=BLUE, fill=BLUE)
    add_textbox(intro, (58, 54, 537, 94), "ABOUT THIS COMPARISON", fitz,
                fontname="hebo", fontsize=18, color=DARK)
    english = (
        "A typesetting style changes the visual design of the main document without changing its "
        "content or structure. It affects:\n\n"
        "- the table of contents and the other lists;\n"
        "- chapter titles;\n"
        "- the layout of standard pages, including headers and footers; and\n"
        "- the default document font.\n\n"
        "Each style is represented by the same four pages: the table of contents, a chapter opening, "
        "a standard page containing equations, and a long chapter title. The name of the displayed "
        "style appears in the upper-right corner of every sample page."
    )
    add_textbox(intro, (58, 110, 537, 344), english, fitz,
                fontname="helv", fontsize=10.5, color=DARK, lineheight=1.35)
    intro.draw_line(fitz.Point(58, 386), fitz.Point(537, 386), color=BLUE, width=1)
    add_textbox(intro, (58, 414, 537, 454), "SOBRE ESTA COMPARACIÓN", fitz,
                fontname="hebo", fontsize=18, color=DARK)
    spanish = (
        "Un estilo tipográfico cambia el diseño visual del documento principal sin modificar su "
        "contenido ni su estructura. Afecta a:\n\n"
        "- el índice general y las demás listas;\n"
        "- los títulos de los capítulos;\n"
        "- la composición de las páginas ordinarias, incluidos los encabezados y pies; y\n"
        "- la fuente predeterminada del documento.\n\n"
        "Cada estilo se representa mediante las mismas cuatro páginas: el índice general, el comienzo "
        "de un capítulo, una página ordinaria con ecuaciones y un título de capítulo largo. El nombre "
        "del estilo mostrado aparece en la esquina superior derecha de cada página de muestra."
    )
    add_textbox(intro, (58, 470, 537, 718), spanish, fitz,
                fontname="helv", fontsize=10.5, color=DARK, lineheight=1.35)
    add_textbox(intro, (58, 770, 537, 794), "PhD-TFM-TFG LaTeX Template", fitz,
                fontname="helv", fontsize=8.5, color=GREY, align=fitz.TEXT_ALIGN_RIGHT)


def main():
    default_root = Path(sys.argv[1]).resolve()
    parser = argparse.ArgumentParser(
        prog="build-book-style-comparisons.sh",
        description="Create a bookmarked, four-page-per-style Book comparison with style labels.",
        epilog="Fresh builds run in temporary source copies. The template configuration is never edited.")
    parser.add_argument("--root", type=Path, default=default_root, help="template root (default: parent of AdminScripts)")
    parser.add_argument("--output", type=Path, help="output PDF (default: Book/book-style-comparisons.pdf)")
    parser.add_argument("--pdf-dir", type=Path, help="reuse book-STYLE.pdf files in this directory instead of building")
    parser.add_argument("--font-mode", choices=("institutional", "document"), default="institutional",
                        help="institutional-page font policy; document mode uses book-STYLE-document-fonts.pdf")
    parser.add_argument("--language", choices=("spanish", "english"), default="spanish",
                        help="document language; English inputs use an -english filename suffix")
    parser.add_argument("--pages", metavar="TOC,CHAPTER,EQUATIONS,LONG_TITLE",
                        help="override automatic guide selection with four 1-based page numbers, identical for every style")
    parser.add_argument("--list-styles", action="store_true", help="print registered styles and exit")
    args = parser.parse_args(sys.argv[2:])
    root = args.root.resolve()
    styles = registered_styles(root)
    if args.list_styles:
        print("\n".join(styles))
        return
    pages = None
    if args.pages:
        if not re.fullmatch(r"[1-9][0-9]*(,[1-9][0-9]*){3}", args.pages):
            parser.error("--pages requires four positive integers separated by commas")
        pages = [int(n) for n in args.pages.split(",")]
    try:
        import pymupdf as fitz
    except ImportError:
        fail("PyMuPDF is required. Install it with: python3 -m pip install PyMuPDF "
             "(or set PYTHON to a Python environment containing PyMuPDF).")
    output = (args.output or root / "Book/book-style-comparisons.pdf").resolve()
    pdf_dir = (args.pdf_dir or root / "Book/typesetting-prototypes").resolve()
    language_suffix = "" if args.language == "spanish" else "-english"
    font_suffix = "" if args.font_mode == "institutional" else "-document-fonts"
    suffix = language_suffix + font_suffix
    inputs = [(style, f"book-{style}{suffix}") for style in styles]
    if output in [(pdf_dir / f"{name}.pdf").resolve() for _, name in inputs]:
        fail("The output must not overwrite an input style PDF.")
    if args.pdf_dir is None:
        if pdf_dir in {root, root / "Book"}:
            fail("Build output requires a separate directory.")
        pdf_dir.mkdir(parents=True, exist_ok=True)
        builder = root / "AdminScripts/build-book-typesetting-prototypes.sh"
        if not builder.is_file():
            fail(f"Prototype builder not found: {builder}")
        command = [str(builder), "--root", str(root), "--output-dir", str(pdf_dir),
                   "--font-mode", args.font_mode, "--language", args.language]
        result = subprocess.run(command)
        if result.returncode:
            fail("One or more prototype builds failed; review the build logs above.")
    missing = [str(pdf_dir / f"{name}.pdf") for _, name in inputs if not (pdf_dir / f"{name}.pdf").is_file()]
    if missing:
        fail("Missing PDFs for registered styles:\n" + "\n".join(missing))
    output.parent.mkdir(parents=True, exist_ok=True)
    labels = ["TOC", "Chapter opening", "Equations", "Long chapter title"]
    with fitz.open() as comparison:
        add_front_matter(comparison, root, fitz)
        bookmarks = [[1, "About this comparison / Sobre esta comparación", 2]]
        for style, name in inputs:
            path = pdf_dir / f"{name}.pdf"
            with fitz.open(path) as pdf:
                selected = sample_pages(pdf, path, pages)
                bookmarks.append([1, style, len(comparison) + 1])
                for label, page in zip(labels, selected):
                    comparison.insert_pdf(pdf, from_page=page, to_page=page)
                    stamp_style(comparison[-1], style, fitz)
                    bookmarks.append([2, label, len(comparison)])
                print(f"[INF] {style}: source pages {', '.join(str(n + 1) for n in selected)}", flush=True)
        comparison.set_toc(bookmarks)
        comparison.set_metadata({
            "title": f"Typesetting styles / Estilos de composición tipográfica - {len(styles)} styles",
            "subject": "Visual comparison of the typesetting styles available in the PhD-TFM-TFG LaTeX Template",
        })
        with tempfile.NamedTemporaryFile(dir=output.parent, suffix=".pdf", delete=False) as handle:
            staging = Path(handle.name)
        try:
            comparison.save(staging, garbage=4, deflate=True)
            with fitz.open(staging) as saved:
                if len(saved) != 2 + 4 * len(styles) or saved.get_toc() != bookmarks:
                    fail("Generated PDF failed the page-count or bookmark check.")
            os.replace(staging, output)
        finally:
            staging.unlink(missing_ok=True)
    print(f"[INF] Created {output} ({len(styles)} styles, {2 + 4 * len(styles)} pages)")


try:
    main()
except (RuntimeError, OSError, ValueError) as error:
    print(f"[ERR] {error}", file=sys.stderr)
    sys.exit(1)
except KeyboardInterrupt:
    print("[ERR] Interrupted; the previous comparison PDF was preserved.", file=sys.stderr)
    sys.exit(130)
PYTHON

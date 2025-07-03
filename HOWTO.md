# LaTeX Template HOWTO

This guide provides a quick start, an overview of the directory structure, typical workflow, and customization tips for this comprehensive LaTeX template.

## 1. Quick Start Guide

To quickly compile a basic document (e.g., the main `book.tex`):

1.  **Ensure LaTeX Distribution:** Make sure you have a full LaTeX distribution installed (e.g., TeX Live, MiKTeX).
2.  **Navigate to Document Directory:**
    ```bash
    cd Book/
    ```
3.  **Compile:** Use the provided `Makefile` to compile the document.
    ```bash
    make
    ```
    This command will typically generate `book.pdf` (and other related files) in the `Book/` directory.
4.  **Clean (Optional):** To remove auxiliary files generated during compilation:
    ```bash
    make clean
    ```

## 2. Directory Breakdown

This template is organized into several key directories:

*   **`.auctex-auto/`**: (Hidden) Used by AUCTeX for Emacs.
*   **`AdminScripts/`**: Contains shell scripts for administrative tasks like generating PDFs, managing branches, and other utilities.
*   **`Anteproyecto/`**: Template files specifically for the "Anteproyecto" (pre-project/proposal) document.
*   **`Book/`**: The main directory for the final document (PhD, TFM, TFG). It contains the primary `.tex` file (`book.tex`) and subdirectories for chapters, abstract, bibliography, figures, etc.
*   **`Config/`**: Stores all configuration files (`.tex` files) that define the document's appearance, language settings, glossaries, and other global parameters. **`myconfig.tex` in this directory is the primary file for user-specific settings.**
*   **`Deprecated/`**: Contains older or deprecated template components, kept for reference but not actively used.
*   **`Distribs/`**: Likely for distribution-related files or compiled outputs.
*   **`normativas/`**: Contains official guidelines or regulations related to PhD, TFG, and TFM documents.
*   **`PapeleoPHD/`**: Specific paperwork and template files for PhD-related documents.
*   **`PapeleoTFG/`**: Specific paperwork and template files for TFG (Bachelor's Final Project) related documents.
*   **`PapeleoTFM/`**: Specific paperwork and template files for TFM (Master's Final Project) related documents.
*   **`UsefulDocs/`**: Provides helpful LaTeX-related documentation, cheat sheets, and symbol references.

## 3. Workflow Overview

A typical workflow for using this template involves:

1.  **Select Document Type:** Decide whether you are working on a PhD, TFM, or TFG. This will guide which main `.tex` file (e.g., `Book/book.tex`, `Anteproyecto/anteproyecto.tex`) and `Papeleo` directory is most relevant.
2.  **Edit Content:**
    *   For main content, modify `.tex` files within `Book/chapters/`, `Book/abstract/`, `Book/appendix/`, etc.
    *   For bibliography, update `Book/biblio/biblio.bib`.
    *   For figures, place image files in `Book/figures/` and `Book/diagrams/`. The `\graphicspath` command in `book.tex` is configured to look in these directories. Note that `logos/` is primarily for template-specific logos, and you only need to add your own content to `figures/` or `diagrams/`.
3.  **Configure Document:** Adjust settings primarily in `Config/myconfig.tex` (see Customization Guide below). Avoid modifying `Config/preamble.tex` and `Config/postamble.tex` unless you are an advanced user.
4.  **Compile:** Use the `Makefile` in the respective document directory (e.g., `Book/`) to compile your LaTeX source into a PDF.
5.  **Review and Iterate:** Check the generated PDF, make further edits, and recompile until satisfied.

## 4. Customization Guide

Most common customizations are handled through files in the `Config/` and `Book/cover/` directories.

*   **Main Document Settings (Author, Title, University, Year, Language):**
    *   These are primarily set in `Config/myconfig.tex`. Look for variables and commands like `\author{}`, `\title{}`, `\university{}`, `\date{}`, and language settings (e.g., `\usepackage[spanish]{babel}`).
*   **Cover Page:**
    *   The `Book/cover/` directory contains various cover page templates (e.g., `portada-tfg-uah-2024.tex`, `cover-phd-uah.tex`). The selection of the appropriate cover page is handled automatically based on values set in `Config/myconfig.tex`. You should edit the specific cover `.tex` file for details like your name, title, and university-specific information.
*   **Bibliography Style:**
    *   Managed in `Config/config-bibbackend.tex` and `Book/biblio/bibliography.tex`.
    *   The `Book/biblio/biblio.bib` file is where you add your bibliographic entries.
*   **Glossaries and Acronyms:**
    *   Definitions are typically in `Book/acronyms/defacronymsgl.tex`.
    *   Configuration for glossaries is in `Config/glossaries.tex`.
*   **Colors and Styling:**
    *   General color definitions and some styling options are found in `Config/colors.tex`.
*   **Adding New Chapters/Sections:**
    *   Create a new `.tex` file in `Book/chapters/` (e.g., `new_chapter.tex`).
    *   Include it in `Book/book.tex` using `\include{chapters/new_chapter}` at the desired position.
*   **Adding Figures/Diagrams:**
    *   Place image files (e.g., `.pdf`, `.png`, `.eps`) in `Book/figures/` or `Book/diagrams/`. 
    *   Include them in your `.tex` files using `\includegraphics{figures/your_image}`.
*   **Including External PDF Files:**
    *   You can include entire PDF files using `\includepdf[pages=-]{path/to/your/file.pdf}`.
    *   After each `\includepdf` command, it's often necessary to add `\clearemptydoublepage` to ensure correct page breaks and formatting.

By focusing on these key areas, you can effectively customize the template without needing to delve into every single file.

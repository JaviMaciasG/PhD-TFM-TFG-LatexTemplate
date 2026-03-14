# Repository Overview: PhD-TFM-TFG-LatexTemplate

## What this repository is

This repository is a comprehensive LaTeX template ecosystem for final academic documents at Universidad de Alcalá (UAH), including:

- Bachelor final projects (TFG)
- Master final projects (TFM)
- PhD theses
- Anteproyecto/proposal documents
- Related official paperwork templates

The template is multilingual (Spanish/English), degree-aware, and driven by user configuration values centralized in `Config/myconfig.tex`.

## High-level structure

Top-level directories and their primary role:

- `Book/`: Main long-form thesis/book document template (`book.tex`) with modular content folders.
- `Anteproyecto/`: Proposal document template and build workflow.
- `Config/`: Core global configuration and compilation logic (`preamble`, `postamble`, language/worktype handling).
- `PapeleoTFG/`, `PapeleoTFM/`, `PapeleoPHD/`: Administrative paperwork templates by document type.
- `normativas/`: Official regulations and annexes in PDF/DOCX format.
- `AdminScripts/`: Utility scripts for maintenance/distribution automation.
- `UsefulDocs/`: Reference docs (cheatsheets and symbols).
- `Deprecated/`: Legacy material kept for reference.

Repository volume snapshot (current checkout):

- Total files: 719
- TeX files: 229
- PDF files: 131
- Word documents (`.doc/.docx`): 24

## Main user workflow

1. Configure personal/degree metadata in `Config/myconfig.tex`.
2. Edit content files in `Book/` (chapters, abstract, appendices, bibliography).
3. Compile from `Book/` using `make` (or your IDE toolchain configured for `biber`).
4. Optionally compile `Anteproyecto/` and the corresponding paperwork templates in `Papeleo*` directories.

The root `Makefile` can also produce a PDF version of the README and delegate build to `Book/`.

## Build and tooling model

### Root build

- `Makefile` target `all` builds:
  - `00-README.pdf` via `pandoc`
  - Main `book` by delegating to `Book/Makefile`

### Book build pipeline

`Book/Makefile` drives a full build including:

- Multi-pass `pdflatex`
- Bibliography tool selection (`biber` by default, fallback logic for `bibtex`)
- `makeglossaries`
- Figure/diagram conversion support (`dia`, `inkscape`, `epspdf`)
- Ghostscript compression output variants (`-screen`, `-compressed`)
- Flatten/snapshot/diff workflows (`latexpand`, `latexdiff`)

### Other components

- `Anteproyecto/Makefile` includes similar multi-pass compilation with bibliography support.
- `PapeleoTFG/Makefile` compiles each `*.tex` into `*.pdf` with two LaTeX passes.

## Configuration architecture

### Primary user configuration

`Config/myconfig.tex` is the central customization file. It exposes structured macros for:

- Language (`spanish` / `english`)
- Degree code (e.g., `GIEC`, `MUIT`, `PHDUAH`)
- Author and advisor identity data
- Institution/department metadata
- Dates, legal/publishing options, and grades
- Link colors and optional helper macros

### Degree/work-type mapping

`Config/worktypes.txt` maps degree codes to work categories (`TFG`, `TFM`, `PhD`, etc.), used by build/cover logic.

### Dynamic post-configuration

`Config/postamble.tex` derives runtime macros from user config, handling:

- Language-dependent labels and wording
- Gender-dependent grammatical variants
- Advisor singular/plural wording
- Work-type and document metadata used throughout covers and paperwork

## Document composition model

`Book/book.tex` is the orchestrator. It:

- Loads preamble/config/glossary/postamble layers.
- Sets graphics search paths (`logos`, `figures`, `diagrams`).
- Builds front matter (covers, letters, dedication, acknowledgements, lists, acronyms/symbols).
- Includes core chapters (`introduccion`, `estudioTeorico`, `desarrollo`, `resultados`, `conclusiones`).
- Injects bibliography and appendices.
- Adds back page logic.

The template intentionally uses modular `\input{...}` structure so users can comment/uncomment sections as needed.

## Cover and degree-specific behavior

`Book/cover/cover.tex` performs conditional inclusion of distinct cover implementations based on `\myWorkType` and specific degree exceptions (`MUCTE`, `MUC`, `MUANBD`, etc.).

This central switchboard is where most format branching is coordinated for TFG/TFM/PhD and special report types.

## Repository maturity and maintenance signals

- The project contains long-lived legacy material and historical comments (`$Id` tags, old workflows).
- `Deprecated/` keeps earlier assets/tools, indicating strong backward compatibility concerns.
- `TODO` still tracks pending improvements (e.g., acronym issues, Windows usage guidance).
- Documentation is broad (`README.md`, `HOWTO.md`) but there is natural overlap and some outdated notes.

## Strengths

- Very complete end-to-end ecosystem (writing + paperwork + norms references).
- Highly parameterized configuration model.
- Supports both Spanish and English outputs.
- Includes practical build automation and PDF optimization.
- Good baseline for institutional compliance at UAH.

## Risks / complexity hotspots

- Build dependencies are extensive (`pandoc`, `biber`, `makeglossaries`, `dia`, `inkscape`, `gs`, etc.).
- Some Makefile logic is shell-heavy and brittle to environment differences.
- Mixed-era structure and duplicated assets can make onboarding harder.
- Legacy/Deprecated content increases navigation noise for first-time users.

## Practical onboarding recommendation

For a new user, the safest path is:

1. Read `README.md` once end-to-end.
2. Edit only `Config/myconfig.tex` first.
3. Start from `Book/book.tex` with existing example chapters.
4. Use `make` in `Book/` and verify bibliography backend is set to `biber` in editor.
5. Only after successful first compile, touch covers/paperwork files.


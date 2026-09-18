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

Repository volume snapshot (tracked files):

- Total files: 719
- TeX files: 238
- PDF files: 129
- Word documents (`.doc/.docx`): 25

## Main user workflow

1. Configure personal/degree metadata in `Config/myconfig.tex`.
2. Edit content files in `Book/` (chapters, abstract, appendices, bibliography).
3. Compile `Book/book.tex` with your usual LaTeX editor or build tool configured for `biber`; optionally use `make` from `Book/` to automate the complete sequence.
4. Optionally compile `Anteproyecto/` and the corresponding paperwork templates in `Papeleo*` directories.

The root `Makefile` can also produce a PDF version of the README, delegate the build to `Book/`, and generate maintainer release archives through `make distrib`.

## Build and tooling model

### Root build

- `Makefile` target `all` builds:
  - `00-README.pdf` via `pandoc`
  - Main `book` by delegating to `Book/Makefile`
- `Makefile` target `distrib` reads `RELEASE.txt` and delegates to `AdminScripts/go.build-distribution.sh` to create matching `.tgz` and `.zip` release archives.

### Book build pipeline

`Book/Makefile` drives a full build including:

- Multi-pass `pdflatex`
- Bibliography processing with `biber`
- `makeglossaries`
- Figure/diagram conversion support (`dia`, `inkscape`, `epspdf`)
- Ghostscript compressed output (`-compressed`); the former low-quality `-screen` output is disabled
- Flatten/snapshot/diff workflows (`latexpand`, `latexdiff`)

### Other components

- `Anteproyecto/Makefile` includes similar multi-pass compilation with bibliography support.
- The Makefiles under `PapeleoTFG/`, `PapeleoTFM/`, and `PapeleoPHD/` compile the administrative documents provided by each directory.

## Configuration architecture

### Primary user configuration

`Config/myconfig.tex` is the central customization file. It exposes structured macros for:

- Language (`spanish` / `english`)
- Degree code (e.g., `GIEC`, `MUIT`, `PHDUAH`)
- Author and advisor identity data
- Department and project-specific affiliation metadata
- Dates, legal/publishing options, and grades
- Link colors and optional helper macros

### Degree registry and layouts

`Config/degrees.tex` is the authoritative registry of degree identifiers, work categories (`TFG`, `TFM`, `PhD`, etc.), display names, institutions, and schools. `Config/institutions.tex` defines university names, acronyms, and the institution style loaded for each university. Shared colors live in `Config/colors.tex`, while branded colors and cover helpers live under `Config/institution-styles/`. `Config/layout-profiles.tex` maps degree entries to their cover and back-page files. The build tools query the same registry through `Config/query-degree-registry.sh`.

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
- Loads the tutorial chapters (`introduccion`, `primeros-pasos`, `configuracion`, `estructura-documento`, `documentos-complementarios`, `compilacion-avanzada`, `elementos-basicos`, `ejemplos-avanzados`, and `conclusiones`) directly from `Book/book.tex`.
- Injects bibliography and appendices.
- Adds back page logic.

The template intentionally uses modular `\input{...}` structure so users can comment/uncomment sections as needed.

## Cover and degree-specific behavior

`Book/cover/cover.tex` and `Book/cover/backpage.tex` delegate cover selection to the degree registry. `Config/layout-profiles.tex` maps each degree profile to its required files.

Institution-specific implementations are grouped under `Book/cover/uah/`, `Book/cover/upm/`, and `Book/cover/urjc/`. Shared orchestration and front-matter files remain directly under `Book/cover/`. Logos follow the same division under `Book/logos/`; cross-institution and project artwork is kept in `Book/logos/shared/`.

## Repository maturity and maintenance signals

- The project contains long-lived legacy material and historical comments (`$Id` tags, old workflows).
- `Deprecated/` keeps earlier assets/tools, indicating strong backward compatibility concerns.
- `TODO` still tracks pending improvements (e.g., acronym issues, Windows usage guidance).
- User documentation is centralized in `README.md`, with additional examples embedded in the template chapters. Maintainer procedures for release packaging and adding degrees or universities are centralized in `MAINTAINERS.md`.

## Strengths

- Very complete end-to-end ecosystem (writing + paperwork + norms references).
- Highly parameterized configuration model.
- Supports both Spanish and English outputs.
- Includes practical build automation and PDF optimization.
- Good baseline for institutional compliance at UAH.

## Risks / complexity hotspots

- A basic editor-based build needs `pdflatex` and, when applicable, `biber` or `makeglossaries`; optional Makefile workflows add dependencies such as `pandoc`, Dia, Inkscape, Ghostscript, `latexpand`, and `latexdiff`.
- Some Makefile logic is shell-heavy and brittle to environment differences.
- Mixed-era structure and duplicated assets can make onboarding harder.
- Legacy/Deprecated content increases navigation noise for first-time users.

## Practical onboarding recommendation

For a new user, the safest path is:

1. Read `README.md` once end-to-end.
2. Edit only `Config/myconfig.tex` first.
3. Start from `Book/book.tex` with existing example chapters.
4. Build `Book/book.tex` with your editor and verify that its bibliography backend is set to `biber`; use `make` only if you prefer the provided automation.
5. Only after successful first compile, touch covers/paperwork files.

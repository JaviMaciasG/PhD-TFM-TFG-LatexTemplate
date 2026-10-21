# Repository Overview: PhD-TFM-TFG-LatexTemplate

## What this repository is

This repository is a comprehensive LaTeX template ecosystem focused on final academic documents at Universidad de Alcalá (UAH), with additional support for ESCET-URJC, ETSII-URJC, EIF-URJC and ETSIT-UPM, including:

- Bachelor final projects (TFG)
- Master final projects (TFM)
- PhD theses
- Anteproyecto/proposal documents
- Related official paperwork templates

The template is multilingual (Spanish/English), degree-aware, and driven by user configuration values centralized in `Config/myconfig.tex`.

## High-level structure

Top-level directories and their primary role:

- `Book/`: Main long-form thesis/book document template, with the stable `book.tex` entry point, the normal `content-standard.tex` organization file, and the specialized `content-compendium.tex` alternative.
- `Anteproyecto/`: Proposal document template and build workflow.
- `Config/`: Core global configuration and compilation logic (`preamble`, `postamble`, language/worktype handling, and the Book-only typesetting profiles under `Config/typesetting/`).
- `PapeleoTFG/`, `PapeleoTFM/`, `PapeleoPHD/`: Administrative paperwork templates by document type.
- `normativas/`: Official regulations and annexes in PDF/DOCX format.
- `AdminScripts/`: Maintainer-only release and regression automation.
- `Documentation/`: User guides, maintainer documentation, and repository notes. The README files remain at the root.
- `UsefulDocs/`: Reference docs (cheatsheets and symbols).
- `Deprecated/`: Legacy material kept for reference.

The root-level `sync-git-sources.sh` is the user-facing implementation behind `make sync-git-sources`; it is kept outside `AdminScripts/` because it is distributed with the template and is not a maintainer utility.

## Main user workflow

1. Download and extract the student distribution and set up your editor or a project in `Overleaf` or `Prism`. In `TeXstudio`, select `biber` as the bibliography tool.
2. Compile `Book/book.tex` without modifying the template to check your environment and consult the generated manual.
3. Enter personal and degree details in `Config/myconfig.tex`, compile again and check the result.
4. Prepare the minimal structure if you wish. Keep the usual `standard` structure, organise the content in `Book/content-standard.tex` and write your chapters, abstracts, appendices and bibliography. Only doctoral students submitting a thesis by compendium select `compendium` and use `Book/content-compendium.tex`.
5. Keep compiling `Book/book.tex` from your editor or online service. Use `make` from `Book/` only if you prefer that automation. The proposal and forms are standalone documents you can compile when needed.

The root `Makefile` can also produce a PDF version of the README and delegate the build to `Book/`. In repository checkouts it optionally loads `AdminScripts/maintainer.mk`, which adds the maintainer-only `make distrib` target; that fragment is absent from user releases.

## Build and tooling model

### Root build

- `Makefile` target `all` builds:
  - `README.pdf` via `pandoc`
  - Main `book` by delegating to `Book/Makefile`
- `make -C Documentation` generates only the Spanish `README.pdf` and `TYPESETTING-STYLES-COMPARISON.pdf` in the repository root. Other guides remain Markdown sources in the language-specific directories; the Dropbox download guide is rendered into its publication destination, and the full typesetting guide is rendered into distribution staging. The ZIP/TGZ archives rename the first two as `00-README.pdf` and `02-TYPESETTING-STYLES-COMPARISON.pdf`.
- The optional maintainer target `distrib` reads `RELEASE.txt`, generates the rendered typesetting guide, and delegates to `AdminScripts/go.build-distribution.sh` to create matching `.tgz` and `.zip` user archives from a structural allowlist. The archives include `04-TYPESETTING-STYLES-GUIDE.pdf`, but exclude the `Documentation/` source folder.

### Book build pipeline

`Book/Makefile` uses `latexmk` to track dependencies and drive an incremental build including:

- Multi-pass `pdflatex` when required
- Bibliography processing with `biber` when required
- Conditional `makeglossaries` processing for glossaries, acronyms, and symbols
- Figure/diagram conversion support (`dia`, `inkscape`, `epspdf`)
- Ghostscript compressed output (`-compressed`); the former low-quality `-screen` output is disabled
- Flatten/snapshot/diff workflows (`latexpand`, `latexdiff`)

### Other components

- `Anteproyecto/Makefile` uses the same incremental `latexmk` layer with automatic bibliography support.
- The Makefiles under `PapeleoTFG/`, `PapeleoTFM/`, and `PapeleoPHD/` use `latexmk` to track direct and shared configuration dependencies for every administrative document.
- The root targets `anteproyecto`, `paperwork`, and `all-documents` optionally orchestrate these components; `paperwork` selects the directory matching the configured degree type.
- The root target `sync-git-sources` invokes `sync-git-sources.sh` to update a user's Git index from the dependencies of the book, proposal, and paperwork; the script refuses to run in the marked official template repository.
- Shared engine options and glossary integration live in `Config/latex-common.mk` and `Config/latexmkrc`.
- `AdminScripts/build-book-typesetting-prototypes.sh` builds isolated full-book samples for the registered visual profiles. `AdminScripts/build-book-style-comparisons.sh` uses Python and PyMuPDF to add neutral bilingual front matter and extract, label, and compose the comparison pages.
- `AdminScripts/go.gen-public-sample-pdfs.sh` generates the reduced public Dropbox matrix and optionally publishes its PDFs plus `RELEASE.txt` after interactive confirmation. The maintainer-only `publish-dropbox` target also builds and publishes both validated release archives in the same confirmed operation. `go.gen-all-pdfs.sh` previews a selectable regression matrix and asks for confirmation; its default is representative, while `--all` enables exhaustive coverage. Builds use isolated copies and save PDFs and logs under `Book/all-pdfs/`.

## Configuration architecture

### Primary user configuration

`Config/myconfig.tex` is the central customization file. It exposes structured macros for:

- Language (`spanish` / `english`)
- Document structure (`standard` for normal use and `compendium` for the specialized PhD modality)
- Book typesetting style (`\myTypesettingStyle`); institutional pages retain their original fonts by default.
- Optional preliminary elements and generated lists through the validated `\myInclude...` switches
- Degree code (e.g., `GIEC`, `MUIT`, `PHDUAH`, `ITI-ESCET-URJC`, `GIB-ETSIT-UPM`, `MUNE-ETSIT-UPM`, `PHD-ETSIT-UPM`)
- Author and advisor identity data
- Separate tutor/cotutor department and institution fields, with English variants
- Independent department where the work is carried out (`\myDepartment`, `\myDepartmentEnglish`)
- Expanded doctoral committee, external-reviewer and project-specific metadata
- Dates, legal/publishing options, and grades
- Link colors and optional helper macros

### Degree registry and layouts

The standard manual also includes a supported-degree appendix, grouped by university and school, with identifiers, full names and available English translations. Its read-only renderer uses the registry directly and excludes legacy degrees and research reports. The short identifier list remains in the configuration chapter. EIF-URJC degrees share a dedicated bilingual cover profile without a back cover.

`Config/degrees.tex` is the authoritative registry of degree identifiers, work categories (`TFG`, `TFM`, `PhD`, etc.), display names, institutions, and schools. `Config/institutions.tex` defines university names, acronyms, and the institution style loaded for each university. Shared colors live in `Config/colors.tex`, while branded colors and cover helpers live under `Config/institution-styles/`. `Config/layout-profiles.tex` maps degree entries to their cover and back-page files. The build tools query the same registry through `Config/query-degree-registry.sh`.

### Dynamic post-configuration

`Config/postamble.tex` derives runtime macros from user config, handling:

- Language-dependent labels and wording
- Gender-dependent grammatical variants
- Advisor singular/plural wording
- Combined adviser affiliations and an independent work department, configurable in Spanish and English
- Work-type and document metadata used throughout covers and paperwork

## Document composition model

`Book/book.tex` is the stable orchestrator. It:

- Loads preamble/config/glossary/postamble layers.
- Loads the Book-only typesetting dispatcher, which validates the two visual selectors and applies the selected profile before the document begins.
- Sets graphics search paths (`logos`, `figures`, `diagrams`).
- Builds front matter (covers, letters, dedication, acknowledgements, lists, acronyms/symbols) according to the `\myInclude...` switches.
- Loads `Book/content-standard.tex` for almost every document. That user-facing file selects the chapters, bibliography, and appendices.
- Loads `Book/content-compendium.tex` only when a PhD student explicitly selects the specialized compendium structure; that file defines the extended summary, intervening bibliography, and publication PDFs.
- Adds back page logic.

The template intentionally keeps `book.tex` stable. Users select optional front matter in `Config/myconfig.tex` and change the body through the applicable `content-*.tex` file rather than commenting infrastructure lines in `book.tex`.

Prepared minimal and original structures are colocated with their chapters: `Book/chapters/{bare,orig}/` for standard documents and `Book/chapters/compendium/{bare,orig}/` for the specialized modality. Each directory also contains the `content-*.tex` organization file that the Makefile copies separately to the `Book/` root.

## Cover and degree-specific behavior

`Book/cover/cover.tex` and `Book/cover/backpage.tex` delegate cover selection to the degree registry. `Config/layout-profiles.tex` maps each degree profile to its required files.

Institution-specific implementations are grouped under `Book/cover/uah/`, `Book/cover/upm/`, and `Book/cover/urjc/`. Shared orchestration and front-matter files remain directly under `Book/cover/`. Logos follow the same division under `Book/logos/`; cross-institution and project artwork is kept in `Book/logos/shared/`.


Doctoral identifiers ending in `-COMPENDIUM` inherit the base programme’s metadata and select compendium content automatically. The optional registry property `document-structure` defaults to `standard`. `postamble.tex` derives the internal structure variable, and build tools query the same registry instead of reading a user structure flag.

The ETSIT-UPM undergraduate/master variants share orange covers and an orange back cover, while GISD and MUNE have specific supervision/committee sheets. MUNE opening-page texts follow the configured Spanish/English language. PHD-ETSIT-UPM uses a separate doctoral cover, inner title page with both crests, and a credits page with advisors, external reviewers, committee members and defence date; it has no independent back cover. The current degree/profile tables and the focused regression commands are documented in MAINTAINERS.md and DEGREE_REGISTRY_COMPATIBILITY.md in this directory. These variants have received less extensive testing than the UAH cases.

The standard manual includes Book/appendix/aspectos-eticos.tex only for ETSIT-UPM degrees. Its conditional inclusion and source are also maintained in the orig copies; the prepared minimal and compendium bodies do not include it automatically.

## Repository maturity and maintenance signals

- The project contains long-lived legacy material and historical comments (`$Id` tags, old workflows).
- `Deprecated/` keeps earlier assets/tools, indicating strong backward compatibility concerns.
- `TODO` still tracks pending improvements (e.g., acronym issues, Windows usage guidance).
- User documentation starts at the Spanish `README.md` (the English overview is `README-en.md`), with additional examples embedded in the template chapters. `Documentation/en/TYPESETTING-STYLES-GUIDE.md` is the authoritative source for the preliminary visual-style layer, while user distributions contain its rendered `04-TYPESETTING-STYLES-GUIDE.pdf`. Maintainer procedures for release packaging and adding degrees or universities are centralized in `Documentation/en/MAINTAINERS.md`.

## Strengths

- Very complete end-to-end ecosystem (writing + paperwork + norms references).
- Highly parameterized configuration model.
- Supports both Spanish and English outputs.
- Includes practical build automation and PDF optimization.
- Good baseline for institutional compliance at UAH.

## Risks / complexity hotspots

- Editor-based compilation uses `pdflatex` and `biber` when there is a bibliography. The `automake` option of `glossaries` generates lists through `makeindex` when the environment permits its execution, without requiring the `makeglossaries` script or `perl` for that task. The supplied `latexmk` configuration, used by the Makefiles, does invoke `makeglossaries` and needs `perl`. Book's default target also uses `Ghostscript` to compress the PDF. Other targets may need `pandoc`, `Dia`, `Inkscape`, `latexpand` or `latexdiff`.
- The active document Makefiles share their engine and dependency configuration, but release and registry automation still relies on shell tooling.
- Mixed-era structure and duplicated assets can make onboarding harder.
- Legacy/Deprecated content increases navigation noise for first-time users.

## Practical onboarding recommendation

For a new user, the safest path is:

1. Follow the quick start in `README.md` or its English translation, `README-en.md`, without having to read the whole document first.
2. Compile the template without modifications and review the resulting manual.
3. Personalise `Config/myconfig.tex`, compile again and check the displayed details.
4. Save a backup before replacing sources and optionally prepare the minimal structure described in the manual. Write in the content files and organise chapters in `Book/content-standard.tex`. The specialised compendium structure uses `Book/content-compendium.tex`.
5. Normally leave `Book/book.tex` and institutional cover templates untouched. Edit forms and additional fields only when the administrative procedure requires it.

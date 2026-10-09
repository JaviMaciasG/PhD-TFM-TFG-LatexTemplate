# Maintainer manual

This document covers release packaging and extension of the institutional degree registry. It is intended for template maintainers; ordinary users should start with `README.md` or `README-en.md` and the manual compiled from `Book/book.tex`.

## Protecting the official maintenance checkout

Mark every authoritative maintenance checkout once with `git config template.officialRepository true`. This local setting is not committed or inherited by users; it prevents the user-oriented `make sync-git-sources` target from changing the Git index of the template repository.

## Generating the changelog

`Documentation/CHANGELOG.md` is generated in English from Git tags. Install `git-cliff` on the maintainer system and run `make -C Documentation changelog`; this regenerates the complete tagged history up to the version in `RELEASE.txt`. The tracked `Documentation/cliff.toml` maps the repository's commit prefixes and keeps unmatched legacy messages under “Other Changes”. Tags that point to the same commit are grouped together in one section. The output is generated, so adjust the configuration rather than editing the changelog by hand. The normal PDF target does not require `git-cliff`.

## Maintaining the document structures and optional-content switches

`Book/book.tex` is deliberately a stable entry point. The normal document body lives in `Book/content-standard.tex`; only the specialized PhD compendium modality uses `Book/content-compendium.tex`. Keep common front matter and selection logic in `book.tex`, normal user-owned chapter and appendix ordering in `content-standard.tex`, and compendium parts and publication declarations in `content-compendium.tex`.

Each prepared structure is kept beside the chapters it organizes. The standard templates live under `Book/chapters/bare/` and `Book/chapters/orig/`; the specialized templates live under `Book/chapters/compendium/bare/` and `Book/chapters/compendium/orig/`. Each directory contains its corresponding `content-*.tex` file, which the Makefile explicitly excludes from the chapter-copy list and copies to the `Book/` root separately. Whenever a distributed organization changes, update both its active files and canonical `orig` copies. The Makefile must copy these prepared files; it must not return to rewriting marked regions inside `book.tex`.

The `bare` and `orig` targets dispatch according to `\myDocumentStructure`; the explicit `bare-standard`, `bare-compendium`, `orig-standard`, and `orig-compendium` targets are also available. Keep `bare-chapters` and `orig-chapters` as backward-compatible aliases for the standard structure.

The user-facing Boolean options in `Config/myconfig.tex` share the `\myInclude...` prefix and accept exactly `true` or `false`. `Config/postamble.tex` validates every option. When adding a switch, update its validation, the relevant conditional inclusion, the configuration chapter and its maintained `orig` copy. Switches controlling generated lists should not disable the underlying LaTeX feature.

The standard workflow must remain dominant in `README.md` and the manual. Mention the compendium alternative briefly in the normal quick start and direct the small set of affected PhD users to the authoritative specialized section rather than presenting both structures as equivalent choices throughout the documentation.

## Maintaining the Book typesetting styles

The preliminary Book-only visual layer lives under `Config/typesetting/` and is selected through `\myTypesettingStyle` and `\myInstitutionalPageFontMode` in `Config/myconfig.tex`. Keep the latter values named `institutional` and `document`; `standard` is a typesetting profile, not an institutional-page font policy. `Documentation/en/TYPESETTING-STYLES-GUIDE.md` is the authoritative usage and implementation reference, including the single style registry, renderer architecture, validation procedure, Bash prototype builder, optional PyMuPDF comparison composer, and Mimosis licence notice. Update that guide, the concise README reference, both copies of the manual configuration chapter, and the selector comments whenever the public choices change.

## Maintaining the Makefile build layer

The active document Makefiles include `Config/latex-common.mk`, which defines the supported LaTeX engines and the common `latexmk` build and cleanup commands. Glossary dependencies are registered centrally in `Config/latexmkrc`. Keep document lists, user-facing group targets, conversion rules and final-output processing in the Makefile belonging to each directory; do not duplicate engine flags or unconditional sequences of LaTeX and Biber passes there.

Every active document target deliberately invokes a lightweight `latexmk` dependency check. An unchanged document must not rerun LaTeX, Biber, `makeglossaries`, conversion, compression or copy commands. When adding a new paperwork document, add its base name to the appropriate directory list and let `latexmk` discover its direct and shared inputs. Preserve the compatibility aliases documented in the user manual, and update the root paperwork dispatcher only when introducing a new maintained work type.

## Building the documentation PDFs

Run `make -C Documentation` to build the two Spanish PDFs kept in the repository root: `README.pdf` and `TYPESETTING-STYLES-COMPARISON.pdf`. The latter compares the registered Book styles using Spanish GIEC pages. This requires Pandoc, PyMuPDF and a PDF-capable LaTeX setup. The other guides remain Markdown files in `Documentation/en/` and `Documentation/es/`; their PDFs are not generated into the repository root. The generated changelog is not part of this target because historical commit messages may contain LaTeX commands and are not intended as a rendered user guide. Distribution archives rename the first two files to `00-README.pdf` and `02-TYPESETTING-STYLES-COMPARISON.pdf`.

## Generating a release distribution

Set `RELEASE.txt` to the existing release/tag identifier and run:

```console
make distrib
```

The optional `AdminScripts/maintainer.mk` fragment supplies this target only in repository checkouts. It generates `README.pdf` and `TYPESETTING-STYLES-COMPARISON.pdf`, then calls `AdminScripts/go.build-distribution.sh`, which renames those files to `00-README.pdf` and `02-TYPESETTING-STYLES-COMPARISON.pdf` in the archive and renders `04-TYPESETTING-STYLES-GUIDE.pdf` directly into the temporary distribution staging area. It creates `03-PhDTFMTFG-LaTeX-Template-UAH-<release>.tgz` and `.zip` with identical contents whose root directly contains the template files and directories. Because the fragment and `AdminScripts/` are absent from the archives, ordinary users do not see the maintainer-only target.

The distribution is assembled from an explicit structural allowlist of tracked user sources. It contains `RELEASE.txt`, all registered degree and institutional variants, the book, anteproyecto, paperwork, user build files, `00-README.pdf`, `02-TYPESETTING-STYLES-COMPARISON.pdf`, the rendered user-facing `04-TYPESETTING-STYLES-GUIDE.pdf`, the Git synchronization helper, and required input assets. It excludes `Documentation/`, `AdminScripts/`, `Deprecated/`, `normativas/`, `UsefulDocs/`, slide material, and other generated PDFs. The command validates mandatory and forbidden paths and compiles the default book, anteproyecto, and all three paperwork groups from an isolated staged copy before creating the archives. It does not commit, tag, push, modify `RELEASE.txt`, or leave the rendered guide PDF in the repository root.

Before publishing, start from a clean worktree, confirm that `RELEASE.txt` matches the intended Git tag, run the complete PDF regression generation, run `make distrib`, inspect both archives, and verify that they unpack and compile in a clean directory.

## Generating the public Dropbox examples

Run `make public-samples`, or invoke `AdminScripts/go.gen-public-sample-pdfs.sh` directly from any directory, to generate the deliberately reduced set of complete public examples documented in `Documentation/en/DOWNLOAD-GUIDE.md`. The script uses isolated builds and does not rewrite the working `Config/myconfig.tex`. It also generates `00-README.pdf`, `01-DOWNLOAD-GUIDE.pdf` and the bilingual `02-TYPESETTING-STYLES-COMPARISON.pdf`, continues after an individual sample failure, and refuses to offer publication unless every expected PDF exists. The comparison is built deterministically from Spanish GIEC sources for every registered style; it does not reuse possibly stale prototype PDFs.

At the end, the script asks whether the generated PDFs and `RELEASE.txt` should be copied to `$HOME/Dropbox/PhDTFMTFG-LaTeX-Template`. If copying is requested and the destination already contains top-level PDF files, it lists them and asks separately whether they should be removed. Review that list carefully: accepting the second prompt deletes those existing PDFs, while declining it preserves unrelated or older PDF files and overwrites only matching generated filenames. Use `--destination PATH` when invoking the script directly to select another directory.

To perform the complete publication in one operation, run:

```bash
make publish-dropbox
```

This maintainer-only target first runs the validated `distrib` target and then generates the public examples. It lists and asks for confirmation before publishing the ten PDFs, both release archives and `RELEASE.txt`. It separately offers to remove the existing top-level PDFs and matching template ZIP/TGZ archives before installing the new set. Declining that cleanup preserves older files while still overwriting files with identical names.

The destination defaults to `$HOME/Dropbox/PhDTFMTFG-LaTeX-Template`. Override it without editing tracked files when necessary:

```bash
make publish-dropbox DROPBOX_DISTRIBUTION_DIR=/path/to/distribution-folder
```

The target and its local destination are defined in `AdminScripts/maintainer.mk`, which is deliberately omitted from user ZIP/TGZ distributions.

Use `AdminScripts/go.gen-all-pdfs.sh --all` for exhaustive degree/language/PhD-structure/style/font regression; it is no longer the publication set. Update `Documentation/en/DOWNLOAD-GUIDE.md` and the sample matrix in `go.gen-public-sample-pdfs.sh` together whenever a published example changes.

## How to add degrees and universities

This guide is intended for template maintainers. It explains how to add a degree to an institution that is already supported and how to add a completely new university. Ordinary template users only need to select an existing identifier with `\myDegree` in `Config/myconfig.tex`; they should not need to edit the registries or institutional files described here.

## How the configuration is connected

Degree-dependent behaviour is split across a small set of authoritative files:

- `Config/degrees.tex` declares degree identifiers, names, work types, schools, institutions, and layout profiles.
- `Config/institutions.tex` declares universities and connects each one to an institutional style.
- `Config/institution-styles/` contains branded colors and reusable institutional cover helpers.
- `Config/layout-profiles.tex` declares the ordered cover files and optional back page used by each layout.
- `Book/cover/<institution>/` contains institution-specific cover and back-page implementations.
- `Book/logos/<institution>/` contains institution-specific logos. Cross-institution or project artwork belongs in `Book/logos/shared/`.
- `Config/degree-registry.tex` implements the registry. You normally must not edit it when adding a degree or university.

At compilation time, `Config/postamble.tex` loads the registries, selects `\myDegree`, loads the corresponding institution style, and defines the public macros consumed by the cover files. `Book/cover/cover.tex` and `Book/cover/backpage.tex` then include the files selected by the layout profile.

The selection can be summarized as:

```text
\myDegree
    -> degree declaration
       -> institution -> university names, acronym and institution style
       -> layout profile -> ordered cover files and optional back page
       -> degree fields -> degree name, school and work type
```

## Choose stable identifiers first

Before editing files, choose two identifiers when applicable:

- A degree identifier such as `GIEC`, `MUIT`, or `ITIURJC`. It is the value users put in `\myDegree`, appears in generated PDF filenames, and should remain stable once released.
- An institution identifier such as `UAH`, `UPM`, or `URJC`. Reuse an existing identifier when the university is already registered.

Use short ASCII identifiers without spaces. Uppercase degree and institution identifiers follow the current convention. Layout-profile names use lowercase words separated with hyphens, for example `uah-tfg-2024` or `urjc-iti-tfg`.

Do not encode a separate work type into the degree identifier merely to solve a filename problem. The canonical work type is stored independently in the `work-type` field.

## Adding a degree to an existing university

### Step 1: determine whether an existing layout can be reused

Inspect `Config/layout-profiles.tex` and the files under `Book/cover/<institution>/`. Reuse an existing profile when the new degree has exactly the same cover sequence and back page as another supported degree.

For example, several UAH bachelor degrees share `uah-tfg-2024`. A new UAH bachelor degree using the same institutional format normally needs only a new declaration in `Config/degrees.tex`; duplicating the profile or cover files would make later maintenance harder.

Create a new layout profile only when at least one of the following differs:

- The ordered set of cover or certification pages.
- The cover design or its institutional text.
- The back page.
- A regulation-specific format that should evolve independently.

### Step 2: add the degree declaration

Add a `\DeclareDegree` block to the appropriate section of `Config/degrees.tex`:

```tex
\DeclareDegree{NEWDEGREE}{
  status = active,
  institution = UAH,
  school = {Escuela Politécnica Superior},
  school-english = {Polytechnic School},
  degree-name = {Nombre oficial de la titulación},
  degree-name-english = {Official English degree name},
  degree-name-wrapped = {Nombre oficial\\de la titulación},
  degree-name-wrapped-uppercase = {\MakeUppercase{Nombre oficial}\\\MakeUppercase{de la titulación}},
  work-type = TFG,
  work-type-full-spanish = {Trabajo de Fin de Grado},
  work-type-full-english = {Bachelor's Thesis},
  layout-profile = uah-tfg-2024
}
```

The required fields are:

- `status`: maintenance metadata. The current conventions are `active`, `legacy`, and `experimental`.
- `institution`: an identifier declared in `Config/institutions.tex`.
- `school`: the official school, faculty, or academic centre displayed for the degree.
- `degree-name`: the official degree name currently assigned to `\myDegreefull`.
- `work-type`: the canonical short work category. Existing values include `TFC`, `TFG`, `TFM`, `PhD`, and `RR`. It is also used in generated filenames.
- `work-type-full-spanish` and `work-type-full-english`: language-dependent display names assigned to `\myWorkTypeFull`.
- `layout-profile`: a profile declared in `Config/layout-profiles.tex`.

The optional fields are:

- `school-english`: English school name. If omitted, `\mySchoolEnglish` falls back to `\mySchool`.
- `degree-name-english`: retained as registry metadata. At present, degree selection still assigns `degree-name` to `\myDegreefull` in both languages, so do not rely on this field to switch the rendered degree name automatically.
- `degree-name-wrapped`: an explicitly wrapped form used by covers with limited width. If omitted, `\myDegreefullwrapped` falls back to `\myDegreefull`.
- `degree-name-wrapped-uppercase`: an explicitly wrapped uppercase form. If omitted, `\myDegreefullwrappedUpcase` applies `\MakeUppercase` to `\myDegreefull`.

Keep the declaration formatting compatible with `Config/query-degree-registry.sh`:

- Put `\DeclareDegree{IDENTIFIER}{` on its own line, without leading spaces.
- Put `work-type = VALUE,` on its own line inside the declaration.
- Keep the trailing comma on `work-type`.

The TeX registry itself is more flexible, but the Makefile and PDF-generation script intentionally use the simple line-oriented query tool.

### Step 3: create a layout profile only if needed

If no existing profile is suitable, add one to `Config/layout-profiles.tex`:

```tex
\DeclareLayoutProfile{uah-newdegree-tfg}{
  cover-files = {
    cover/uah/portada-newdegree.tex,
    cover/uah/cover-newdegree.tex
  },
  backpage-file = {cover/uah/backpage-newdegree.tex}
}
```

`cover-files` is a comma-separated ordered list of arbitrary length. A profile may contain one file, two files, or more than two files; every listed file is included exactly once and in the declared order. The registry does not insert page breaks between them, so each file must provide its own `titlepage`, `\newpage`, `\clearpage`, or equivalent page-boundary handling. A missing file produces the normal LaTeX file-not-found error, while repeating a filename includes it repeatedly. An empty or omitted `cover-files` value currently produces no cover and is not rejected by the registry, so every normal document profile should declare at least one cover file. `backpage-file` is optional; omit it when the degree has no back page.

Paths are resolved while compiling from `Book/`, so institutional paths normally start with `cover/<institution>/`. Use forward slashes and preserve filename case.

Point the new degree declaration to the new profile:

```tex
layout-profile = uah-newdegree-tfg
```

### Step 4: implement any new cover files

Place new files under `Book/cover/<institution>/`. Start from the closest existing format, but remove assumptions that do not belong to the new degree.

Prefer the macros already derived from the registries and `myconfig.tex`:

- `\myUniversity`, `\myUniversityEnglish`, and `\myUniversityAcronym`.
- `\mySchool` and `\mySchoolEnglish`.
- `\myDegreefull`, `\myDegreefullwrapped`, and `\myDegreefullwrappedUpcase`.
- `\myWorkType` and `\myWorkTypeFull`.
- `\myBookTitle`, `\myAuthorFullName`, `\myAcademicTutorFullName`, and `\myCoTutorFullName`.
- `\myDepartment` and `\myDepartmentEnglish`, which deliberately remain user-configurable because departments can vary within one degree.
- Existing language, gender, date, and advisor macros defined by the shared configuration.

Do not hard-code a university, school, author, tutor, language, or degree name when an existing macro represents it. Treat an empty `\myCoTutorFullName` explicitly if the page displays cotutor information.

Keep images under `Book/logos/<institution>/` when they are reusable logos, or beside the cover under `Book/cover/<institution>/` when they are full-page cover assets tightly coupled to that implementation.

### Step 5: expose the identifier to users

Add the new identifier and its description to the supported-degree comments in `Config/myconfig.tex`. Also update the degree list in `Book/chapters/configuracion.tex` and its maintained original copy under `Book/chapters/orig/`.

If the compatibility audit is being maintained for the release, update `Documentation/en/DEGREE_REGISTRY_COMPATIBILITY.md` with the new degree and layout profile.

## Adding a completely new university

A new university requires an institution declaration, a style, organized assets, at least one layout profile, and at least one degree declaration.

### Step 1: create the institutional directories

Using a lowercase directory name based on the institution identifier, create:

```text
Book/cover/newuni/
Book/logos/newuni/
```

Use `Book/logos/shared/` only for assets genuinely shared by multiple institutions or external projects. Do not place institution-specific files directly in `Book/logos/` or `Book/cover/`.

### Step 2: create the institution style

Create `Config/institution-styles/newuni.tex`. This file is loaded automatically before language-dependent and cover content is defined.

A minimal style may contain only comments if the covers use standard colors:

```tex
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% NEWUNI-specific cover style.
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

% Add institution-specific colors and reusable cover helpers here.
```

A style with branded colors might contain:

```tex
\definecolor{NEWUNIPrimary}{RGB}{12,34,56}
\definecolor{NEWUNISecondary}{RGB}{210,180,40}
\newcommand{\colorNEWUNI}{\color{NEWUNIPrimary}}
```

Use institution-prefixed names for new colors and commands to avoid collisions with other styles and user commands. Shared, institution-independent colors belong in `Config/colors.tex`; do not add branded colors back to `Config/preamble.tex`.

If several covers need the same background or drawing helper, define it in the institution style rather than copying it between cover files. The UAH style demonstrates reusable full-page background commands. If a cover uses `\BgThispage`, configure `background` explicitly in the institution style so it cannot inherit artwork from another institution.

### Step 3: register the university

Add a declaration to `Config/institutions.tex`:

```tex
\DeclareInstitution{NEWUNI}{
  university-name = {Universidad Nueva},
  university-name-english = {New University},
  university-acronym = NEWUNI,
  style-file = {\myConfigDirectory/institution-styles/newuni.tex}
}
```

The required fields are `university-name`, `university-acronym`, and `style-file`. Although `university-name-english` is not currently enforced as mandatory, define it: English covers receive it through `\myUniversityEnglish`, and leaving it blank can produce incomplete text.

Institution identifiers must be unique. Referencing an undeclared institution from a degree produces an explicit registry error.

### Step 4: add logos and cover assets

Copy reusable university and school logos into `Book/logos/newuni/`. Reference them from cover files relative to the `Book/logos/` graphic path:

```tex
\includegraphics[width=5cm]{newuni/university-logo.pdf}
```

Put institution-specific cover and back-page files in `Book/cover/newuni/`. Full-page bitmap or PDF artwork that belongs to only one cover may stay with that cover:

```tex
\includegraphics[width=\paperwidth,height=\paperheight]{cover/newuni/front-background.png}
```

Prefer vector PDF artwork when available. Check that every asset is licensed for redistribution and record required attribution.

### Step 5: declare a layout profile

Add the new university layout to `Config/layout-profiles.tex`:

```tex
\DeclareLayoutProfile{newuni-tfg}{
  cover-files = {
    cover/newuni/front-page.tex,
    cover/newuni/certification-page.tex
  },
  backpage-file = {cover/newuni/back-page.tex}
}
```

A profile name must be unique. The registry reports duplicate and unknown profiles explicitly.

### Step 6: declare the first degree

Add the degree to `Config/degrees.tex`, referring to the new institution and layout:

```tex
\DeclareDegree{NEWUNITFG}{
  status = active,
  institution = NEWUNI,
  school = {Escuela de Ingeniería},
  school-english = {School of Engineering},
  degree-name = {Grado en Ingeniería de Ejemplo},
  degree-name-english = {Bachelor's Degree in Example Engineering},
  work-type = TFG,
  work-type-full-spanish = {Trabajo Fin de Grado},
  work-type-full-english = {Bachelor's Thesis},
  layout-profile = newuni-tfg
}
```

The institution controls university-wide names and branding. The degree controls its school because different degrees at one university may belong to different schools or faculties.

Do not move tutor, cotutor, department, research-group, tribunal, title, or date data into the institution registry. Those values can vary per document and remain in `Config/myconfig.tex`.

### Step 7: document the new support

Update at least:

- The supported-degree comments in `Config/myconfig.tex`.
- The supported-degree list in `Book/chapters/configuracion.tex` and `Book/chapters/orig/configuracion.tex`.
- `Documentation/en/DEGREE_REGISTRY_COMPATIBILITY.md` when the compatibility audit is part of the release process.
- `Documentation/en/REPOSITORY_OVERVIEW.md` if the addition introduces new structural conventions.
- Contributor credits when the integration is based on another person's work.

## Validation procedure

Perform validation in increasing order of cost.

### Query-tool checks

From the repository root, confirm that the identifier is discoverable and that its work type is correct:

```sh
sh Config/query-degree-registry.sh identifiers | grep -Fx NEWDEGREE
sh Config/query-degree-registry.sh work-type NEWDEGREE
```

The second command should print only the canonical value, for example `TFG`.

### Static path checks

Confirm that every file named by the new layout exists below `Book/`. Check both cover files and the optional back page. Search for obsolete asset paths after moving or renaming files:

```sh
rg -n "old-logo-name|old-cover-name" Config Book
```

Run Git's whitespace check:

```sh
git diff --check
```

### Compile one language at a time

Save the current configuration before testing:

```sh
cp Config/myconfig.tex /tmp/myconfig.tex.before-new-degree
```

Set `\myDegree` to the new identifier and compile from `Book/` with your normal LaTeX workflow. If you use the supplied Makefile:

```sh
cd Book
make clean
make
```

The `make` target uses `latexmk` to run pdfLaTeX, Biber, `makeglossaries`, and additional pdfLaTeX passes only when their inputs require them. Compression and descriptive output copies are also regenerated only when their source PDF changes.

Test both:

```tex
\newcommand{\myLanguage}{spanish}
```

and:

```tex
\newcommand{\myLanguage}{english}
```

Restore the saved configuration when finished:

```sh
cp /tmp/myconfig.tex.before-new-degree Config/myconfig.tex
```

Inspect the generated PDF visually. Compilation alone will not detect incorrect official wording, overflow, inappropriate line breaks, low-resolution artwork, hidden layers, or a wrong back page.

Verify at least:

- University, school, degree, and work-type names.
- Spanish and English wording.
- Title wrapping with short and deliberately long titles.
- Tutor-only and tutor-plus-cotutor cases.
- Empty optional values.
- Front-cover, certification-page, and back-page order.
- Logos, colors, background images, margins, and print quality.
- Generated filename and canonical work type.

### Run the complete degree matrix last

`AdminScripts/go.gen-all-pdfs.sh` reads degrees, institutions, cover/back-page profiles and styles from the template registries. With no options it generates one representative per institution/type/layout combination: TFG, TFM and PhD only, in Spanish, with standard structure/style and institutional fonts. Run it from any directory. From the repository root, preview and generate the exhaustive matrix with:

```sh
AdminScripts/go.gen-all-pdfs.sh --all --dry-run
AdminScripts/go.gen-all-pdfs.sh --all
```

Before starting, the script shows every planned document, total count, destination and existing PDFs that successful builds will replace, then asks for confirmation (`[y/N]`). `--dry-run` only displays this information, without writing or compiling; `--yes` skips the question, not validation or the preview, and is required for noninteractive generation. Builds use isolated temporary source copies: working `Config/myconfig.tex` and build artifacts are not rewritten or cleaned.

`--all` generates every supported combination: all non-TFC degrees, including research reports, both languages, both PhD structures, all styles and both font policies. This can mean hundreds of builds. `--all-degrees` expands degrees only; `--all-tfgs`, `--all-tfms` and `--all-phds` select every degree of those types and can be combined. `--all-universities` explicitly includes every institution, already the default; `--all-styles` and `--all-fonts` expand only their respective dimensions.

Narrow selections with comma-separated lists: `--universities UAH,URJC`, `--degrees GIEC,MUC`, `--degree-types TFG,TFM,PhD,RR`, `--layout-profiles uah-muie,uah-muc-2026`, `--styles standard,framed`, `--font-modes institutional,document`, `--languages spanish,english` and `--structures standard,compendium`. Filters intersect and can narrow `--all`. Explicit degree lists retain every listed degree rather than selecting representatives. Each degree keeps its registered cover/back-page profile; layouts are not freely interchangeable.

Do not combine `--all-universities` with `--universities`, `--all-styles` with `--styles`, or `--all-fonts` with `--font-modes`. These contradictions, unknown values, empty lists and empty selections are rejected. Compendium is PhD-only; TFC is always excluded. Use `--list-options` and `--help` for available values and examples.

Compressed PDFs and logs are saved under `Book/all-pdfs/` or the destination chosen with `--output-dir`; names include work type, degree, language, structure, style and font policy. Failed builds retain their logs and do not stop later builds; any failure produces a nonzero final exit status.

Review the per-degree log as well as the PDF. A successful command does not guarantee that the institutional page is visually or legally correct.

## Common mistakes

- Adding an identifier only to the comments in `myconfig.tex`. Comments do not register a degree.
- Declaring a degree but forgetting its institution or layout profile. The registry rejects these cases.
- Repeating university names in every degree instead of using `Config/institutions.tex`.
- Putting the school in the institution declaration. Schools belong to degrees because one university can contain several schools.
- Moving department or advisor affiliations into the degree registry. They may vary for individual works.
- Copying an existing layout when it could be reused unchanged.
- Reusing a layout whose official wording or page order is only approximately similar.
- Hard-coding names already available through registry macros.
- Placing branded colors in the generic preamble instead of the institution style.
- Leaving logos loose in `Book/logos/` instead of the institution directory.
- Forgetting to test English, no-cotutor configurations, and long titles.
- Changing `Config/degree-registry.tex` merely to add data. That file implements the mechanism; normal extensions belong in the declarative registry files.

## Files normally changed

For a degree that reuses an existing university and layout, the minimal change is usually:

```text
Config/degrees.tex
Config/myconfig.tex                         # supported-degree comment
Book/chapters/configuracion.tex             # manual
Book/chapters/orig/configuracion.tex        # maintained original copy
```

For a degree requiring a new layout, add:

```text
Config/layout-profiles.tex
Book/cover/<institution>/...
Book/logos/<institution>/...                # only when new assets are needed
```

For a new university, add or change:

```text
Config/institutions.tex
Config/institution-styles/<institution>.tex
Config/degrees.tex
Config/layout-profiles.tex
Book/cover/<institution>/...
Book/logos/<institution>/...
Config/myconfig.tex
Book/chapters/configuracion.tex
Book/chapters/orig/configuracion.tex
```

Do not add generated PDFs, LaTeX auxiliary files, logs, or temporary test configurations to the commit. Commit only the source files and distributable institutional assets required to reproduce the documents.

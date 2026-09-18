# Maintainer manual

This document covers release packaging and extension of the institutional degree registry. It is intended for template maintainers; ordinary users should start with `README.md` and the manual compiled from `Book/book.tex`.

## Generating a release distribution

Set `RELEASE.txt` to the existing release/tag identifier and run:

```console
make distrib
```

The root target first generates `00-README.pdf`, then calls `AdminScripts/go.build-distribution.sh`. It creates `00-PhDTFMTFG-LaTeX-Template-UAH-<release>.tgz` and `.zip` with identical contents whose root directly contains the template files and directories.

The distribution is assembled from tracked template sources so it contains all registered degree and institutional variants, the book, anteproyecto, paperwork, build files, README documentation, and required input assets. It excludes `TODO`, `SUGGESTED_IMPROVEMENTS.md`, `Deprecated/`, slide material, and generated PDFs other than `00-README.pdf`. The command does not commit, tag, push, or modify `RELEASE.txt`.

Before publishing, start from a clean worktree, confirm that `RELEASE.txt` matches the intended Git tag, run the complete PDF regression generation, run `make distrib`, inspect both archives, and verify that they unpack and compile in a clean directory.

## How to add degrees and universities

This guide is intended for template maintainers. It explains how to add a degree to an institution that is already supported and how to add a completely new university. Ordinary template users only need to select an existing identifier with `\myDegree` in `Config/myconfig.tex`; they should not need to edit the registries or institutional files described here.

## 1. How the configuration is connected

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

## 2. Choose stable identifiers first

Before editing files, choose two identifiers when applicable:

- A degree identifier such as `GIEC`, `MUIT`, or `ITIURJC`. It is the value users put in `\myDegree`, appears in generated PDF filenames, and should remain stable once released.
- An institution identifier such as `UAH`, `UPM`, or `URJC`. Reuse an existing identifier when the university is already registered.

Use short ASCII identifiers without spaces. Uppercase degree and institution identifiers follow the current convention. Layout-profile names use lowercase words separated with hyphens, for example `uah-tfg-2024` or `urjc-iti-tfg`.

Do not encode a separate work type into the degree identifier merely to solve a filename problem. The canonical work type is stored independently in the `work-type` field.

## 3. Adding a degree to an existing university

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

`cover-files` is a comma-separated ordered list. Every listed file is included, in order. `backpage-file` is optional; omit it when the degree has no back page.

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

If the compatibility audit is being maintained for the release, update `Config/DEGREE_REGISTRY_COMPATIBILITY.md` with the new degree and layout profile.

## 4. Adding a completely new university

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
- `Config/DEGREE_REGISTRY_COMPATIBILITY.md` when the compatibility audit is part of the release process.
- `REPOSITORY_OVERVIEW.md` if the addition introduces new structural conventions.
- Contributor credits when the integration is based on another person's work.

## 5. Validation procedure

Perform validation in increasing order of cost.

### 5.1 Query-tool checks

From the repository root, confirm that the identifier is discoverable and that its work type is correct:

```sh
sh Config/query-degree-registry.sh identifiers | grep -Fx NEWDEGREE
sh Config/query-degree-registry.sh work-type NEWDEGREE
```

The second command should print only the canonical value, for example `TFG`.

### 5.2 Static path checks

Confirm that every file named by the new layout exists below `Book/`. Check both cover files and the optional back page. Search for obsolete asset paths after moving or renaming files:

```sh
rg -n "old-logo-name|old-cover-name" Config Book
```

Run Git's whitespace check:

```sh
git diff --check
```

### 5.3 Compile one language at a time

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

The `make` target runs pdfLaTeX, Biber, `makeglossaries`, additional pdfLaTeX passes, compression, and output-file generation. It also refreshes and stages `RELEASE.txt`; review the worktree afterward.

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

### 5.4 Run the complete degree matrix last

`AdminScripts/go.gen-all-pdfs.sh` obtains every identifier and work type from `Config/degrees.tex`, so a correctly formatted new declaration is discovered automatically. Run it from `Book/` only after the individual degree works:

```sh
cd Book
../AdminScripts/go.gen-all-pdfs.sh
```

This is an expensive regression test: it builds every degree in Spanish and English. The script temporarily rewrites `Config/myconfig.tex` and normally restores it afterward, but an interruption can leave the generated configuration in place. Start from a clean worktree, keep a separate backup, and check `git status` when it finishes.

Review the per-degree log as well as the PDF. A successful command does not guarantee that the institutional page is visually or legally correct.

## 6. Common mistakes

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

## 7. Files normally changed

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

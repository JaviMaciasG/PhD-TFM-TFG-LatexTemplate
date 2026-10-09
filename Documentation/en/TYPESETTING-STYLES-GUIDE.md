# Typesetting styles: usage and maintainer guide

This guide describes the preliminary Book-only typesetting layer, including its
use, implementation, validation, maintainer tools and third-party attribution.
All repository paths are relative to the template root. Shell examples state
their working directory.

Selecting one of the supplied styles is a normal user-level operation and only
requires changing the documented style selector. Modifying a style or
creating a new one is advanced work: typography, headings, generated lists,
running headers and institutional pages interact across several files. Approach
those changes carefully, read the relevant sections of this technical guide and
validate the complete document after every modification.

## Contents

1. [What the feature does](#1-what-the-feature-does)
2. [Selecting and comparing styles](#2-selecting-and-comparing-styles)
3. [How the implementation works](#3-how-the-implementation-works)
4. [Complete settings reference](#4-complete-settings-reference)
5. [Designing a new style step by step](#5-designing-a-new-style-step-by-step)
6. [Extending the renderers](#6-extending-the-renderers)
7. [Validation and troubleshooting](#7-validation-and-troubleshooting)
8. [Maintenance and reference material](#8-maintenance-and-reference-material)
9. [Mimosis adaptation and MIT licence](#9-mimosis-adaptation-and-mit-licence)

## 1. What the feature does

A typesetting style is a named visual profile for the document generated from
`Book/book.tex`. It combines font selection, chapter and section headings,
table-of-contents formatting and running headers. Selecting a style does not
select a different document structure or degree.

The six current profiles are:

| Selector | Text/math system | Chapter design | Contents and regular-page navigation |
| --- | --- | --- | --- |
| `standard` | Original template fonts, currently Latin Modern | Original `book` appearance | Original contents and running headers |
| `editorial` | New PX | Bold serif number, pale vertical separator and left-aligned hanging title; no Chapter/Capítulo label | Dotted contents; small serif chapter/section headers, no rule |
| `modern` | New TX; TeX Gyre Heros for sans serif | Large displayed chapter number, muted blue accent and short rule | Leaderless chapter entries; chapter headers; thin header rule |
| `framed` | New PX | Actual `fncychap` Lenny design: outlined label/number and left-aligned title | Leaderless contents; small serif chapter/section headers, no rule |
| `shaded` | New TX; TeX Gyre Heros for sans serif | Actual `fncychap` Bjornstrup design: grey panel, large number and right-aligned title | Compact dotted contents; small sans-serif chapter/section headers and a rule |
| `mimosis` | EB Garamond text; original math; Source Code Pro monospace | Large inline number and serif small-cap title | Leaderless chapter entries; inner slanted-serif chapter/section headers and outer footer page numbers |

`mimosis` is an adaptation to this template's existing `book` class and pdfLaTeX
workflow. It does not load `mimosis.cls` or change the template to KOMA-Script.
The retired profile names are not aliases for the current selectors.

### Scope and preservation

The layer explicitly controls body-font packages; chapters, sections,
subsections and subsubsections; the main contents list; the shared title and
entry styles used by the generated figure, table, source-code, algorithm and
video lists; and page-style settings.
It retains the existing geometry, base class size, paragraph settings,
line-spacing multiplier, float parameters, language, numbering depths,
bibliography configuration and content structure. Different fonts and chapter
dimensions can nevertheless change line wrapping and pagination.

Figure, table, source-code, algorithm and video entries reuse the configured TOC
section-entry renderer. Consequently, they share its font, spacing, indentation,
number-column width, page-number treatment and leader policy. Captions in the
document body and the acronym and symbol glossaries remain package-owned.

The shared `Config/preamble.tex` remains unchanged. The video helper in
`Config/postamble.tex` records only its semantic number and text; it delegates
indentation and leader formatting to the shared list renderer. Administrative
forms and Anteproyecto do not load this Book-only dispatcher.

## 2. Selecting and comparing styles

### 2.1 Select the profile

Edit the existing style definition in `Config/myconfig.tex`:

```latex
\newcommand{\myTypesettingStyle}{framed}
```

Replace its value; do not add a second `\newcommand` with the same name. Names are case-sensitive. The default style is `standard`. Institutional pages retain their original fonts automatically; no additional user setting is needed. The dispatcher also supplies the default style when its command is absent, although the build helpers expect one existing style definition.

`\myDocumentStructure` is a separate setting: it selects the standard or
compendium organisation of the content, not a typesetting profile.

### 2.2 Advanced configuration: institutional font policy

The Book-only dispatcher in `Config/typesetting/typesetting.tex` defaults `\myInstitutionalPageFontMode` to `institutional`. This advanced setting is intentionally absent from the supplied `Config/myconfig.tex`. Most users should leave institutional-page fonts unchanged.

If you explicitly want those pages to inherit the document fonts, add this optional definition to `Config/myconfig.tex`:

```latex
\newcommand{\myInstitutionalPageFontMode}{document}
```

If an older configuration already defines the command, change its value instead of adding a duplicate. Remove the optional definition to return to the internal default. Do not edit `postamble.tex` or `book.tex` for this purpose. The existing `--font-mode institutional|document` build-helper interface remains available: it updates a legacy definition or adds an override only to the isolated configuration copy, never to the working file.

| Value | Cover/back-page behaviour |
| --- | --- |
| `institutional` | Restore the original roman, sans-serif and monospace families, encoding and legacy weight mappings locally |
| `document` | Use the selected document families within the existing institutional layout |

Both policies retain the institutional source files, logos, explicit sizes and
alignment. Explicit family choices in a cover still take precedence. With
`document`, new font metrics can change automatic wrapping. With the
`standard` typesetting profile, the wrapper directly inputs the institutional file in both
policies because the document already uses the original fonts.

The policy applies to the two `\ThesisInstitutionalPage{...}` call sites in
`Book/book.tex`, not to every front-matter page or every arbitrary included file.

### 2.3 Build the selected document

From `Book`:

```bash
make
```

Use the template's existing pdfLaTeX workflow. Alternative font systems are
explicitly guarded for pdfLaTeX. This feature does not implement a general
XeLaTeX/LuaLaTeX font configuration.

The packages loaded by the visual layer are:

| Choice | Additional packages selected by this layer |
| --- | --- |
| `fontsystem=original` | No additional font package |
| `fontsystem=px` | `newpxtext`, `newpxmath` |
| `fontsystem=tx` | `tgheros`, `newtxtext`, `newtxmath`, in that order |
| `fontsystem=mimosis` | `ebgaramond` with `lf`; `sourcecodepro` with `oldstyle,scale=0.7`; no replacement math package |
| Any non-`original` chapter layout | `titlesec` for the heading machinery |
| `chapterlayout=fncychap` | Additionally `fncychap` with the selected option |

The full document also needs the original template's packages and bibliography/
glossary tools. Install missing packages through your TeX distribution. Package
availability varies between installations; the source's required `.sty` names
are the authoritative dependency list.

### 2.4 Generate independent full-book prototypes

These maintainer helpers are available in the complete Git repository; the
ordinary user ZIP/TGZ distribution intentionally omits `AdminScripts/`.

From the template root:

```bash
AdminScripts/build-book-typesetting-prototypes.sh
AdminScripts/build-book-typesetting-prototypes.sh --styles framed shaded
AdminScripts/build-book-typesetting-prototypes.sh --styles framed --font-mode document
AdminScripts/build-book-typesetting-prototypes.sh --styles modern --language english
```

The Bash helper stages one restricted temporary source tree and leaves your
working configuration unchanged. The default directory is
`Book/typesetting-prototypes/`. Institutional-policy Spanish output is named
`book-STYLE.pdf`; English adds `-english`, and document-font policy adds
`-document-fonts`. Build and LaTeX logs are saved alongside the PDFs. Use
`--output-dir PATH` to change the destination. The helper reads the authoritative
style registry from the LaTeX dispatcher, so it has no duplicate style list.

### 2.5 Generate the comparison PDF

From the template root:

```bash
bash AdminScripts/build-book-style-comparisons.sh --list-styles
bash AdminScripts/build-book-style-comparisons.sh
```

The second command builds every registered style in isolated copies, creates a
neutral bilingual cover and introduction, selects four sample pages per style
and concatenates them. The default output is
`Book/book-style-comparisons.pdf`. This is a PDF composition operation, not a
separate comparison `.tex` file.

The samples are the contents, first chapter opening, example equation page and
long chapter title. The script uses bookmarks and page text from the supplied
guide to locate them. It keeps per-style/sample bookmarks and adds the style
name in 8-point grey text at the upper-right corner of every copied page. The
cover and introduction remain unlabelled because they do not represent a
specific style. Original style PDFs are not stamped or overwritten.

To reuse existing PDFs, from the template root:

```bash
bash AdminScripts/build-book-style-comparisons.sh \
  --pdf-dir Book/typesetting-prototypes

bash AdminScripts/build-book-style-comparisons.sh \
  --pdf-dir Book/typesetting-prototypes --font-mode document
```

Every registered style must have the appropriately named input PDF in that
directory. Rebuild outdated inputs after changing style definitions; `--pdf-dir`
does not verify that their source is current.

For a different book, automatic guide detection may fail. You can override the
four source page numbers, in contents/chapter/equations/long-title order:

```bash
bash AdminScripts/build-book-style-comparisons.sh \
  --pdf-dir Book/typesetting-prototypes --pages 5,9,24,38 \
  --output Book/my-comparison.pdf
```

These are physical, 1-based PDF page numbers, not printed page labels. The same
four numbers apply to every style; differing pagination may require separate
inspection or an extension to the script. The script requires Python 3 and
PyMuPDF; fresh builds additionally require the existing TeX toolchain. `PYTHON`
can select a Python executable containing PyMuPDF.

## 3. How the implementation works

### 3.1 The baseline, override and application sequence

`Book/book.tex` loads the shared preamble, user configuration and postamble,
then loads `Config/typesetting/typesetting.tex` before `\begin{document}`.

The dispatcher:

1. Supplies missing user-option defaults and validates the style/font-policy
   selectors.
2. Saves the original font-family/weight state and chapter/page-style machinery
   needed by institutional pages; defines the institutional-page wrapper.
3. Loads `default-settings.tex`, defining the original-template baseline.
4. Loads exactly one `styles/<selected-style>.tex`, overriding differences.
5. Loads the display-number helper and applies typography, headings, contents
   and page-style settings, in that order.

All profiles, including `standard`, follow this sequence. `standard.tex` has no
overrides. Its application branch uses a parameterised native `book` renderer
with original values; it does not simply skip all application files. It selects
the existing font setup and loads neither extra font packages nor `titlesec`.

Every style inherits directly from `default-settings.tex`, not from another
style. The effective value of a setting is the selected style's override when
present, otherwise the baseline value. Thus different style files need not
repeat every variable. Changing the baseline would affect every profile that
does not override the changed setting, including `standard`.

### 3.2 File responsibilities

- `Config/myconfig.tex`: public selectors and existing document configuration.
- `Config/typesetting/typesetting.tex`: accepted style registry, validation,
  saved original state and load order.
- `Config/typesetting/default-settings.tex`: explicit 10pt original-template
  baseline: 39 macros and four colours.
- `Config/typesetting/styles/*.tex`: per-profile overrides only.
- `Config/typesetting/apply/typography.tex`: font packages; preserves paragraph
  settings and the spacing multiplier around font loading.
- `Config/typesetting/apply/headings.tex`: native, `titlesec` and `fncychap`
  heading application.
- `Config/typesetting/apply/contents.tex`: shared list-title rendering plus main
  TOC typography, skips, leaders and number-column dimensions.
- `Config/typesetting/apply/pagestyle.tex`: `fancyhdr` placement,
  chapter/section marks, header rules and plain pages.
- `Config/typesetting/apply/institutional-fonts.tex`: scoped restoration for
  institutional pages, including original chapter renderers.
- `Config/typesetting/apply/display-number.tex`: display-only leading zero for
  decimal chapter numbers below 10.
- `AdminScripts/build-book-typesetting-prototypes.sh`: discovers the dispatcher
  registry and performs isolated full-book builds.
- `AdminScripts/build-book-style-comparisons.sh`: builds or reuses PDFs and
  creates labelled comparison excerpts.

### 3.3 Setting names are not renderer definitions

`\thesis@chapterlayout`, `\thesis@toclayout` and `\thesis@headerlayout` select
implemented rendering branches. Their values need not equal the public style
name. For example, `framed` uses chapter layout `fncychap`, TOC layout `framed`
and header layout `navigation`.

Changing a profile name does not create a new rendering algorithm. Conversely,
a new profile can reuse an existing renderer without modifying it. Although
public selectors are validated, internal layout/font tokens do not have a
comprehensive enum validator. Use the implemented choices documented below;
unknown tokens may fall through to another branch or fail later in compilation.

### 3.4 Numbering, marks and special pages

The visual layer does not redefine `\thechapter`, references or numbering
depths. The display helper formats `1` as `01` where explicitly called by the
modern chapter, contents and running-header designs. Appendix letters are not
padded. Selecting another layout does not automatically invoke this helper.

In navigation headers, `\chaptermark` sets the chapter mark and clears the
section mark; `\sectionmark` updates the section mark. Normal two-sided pages
can therefore show the chapter on even pages and the current section on odd
pages. Header content follows marks, not the chapter-title font.

Chapter-opening pages use `plain`. Alternative profiles retain their own
plain-page policy: empty headers, page numbers at the outer footer and no rule.
The original profile retains the original plain-page setup. Inserted blank
pages can also follow class/template behaviour rather than the regular header.

Unnumbered chapters may need explicit marks. For a custom front/back-matter
chapter, follow the pattern used by the template's acknowledgement sources:

```latex
\chapter*{Acknowledgements}
\markboth{Acknowledgements}{Acknowledgements}
\addcontentsline{toc}{chapter}{Acknowledgements}
```

The TOC entry and running marks are separate concerns. Adding a TOC entry alone
does not establish the desired running header for a starred chapter.

## 4. Complete settings reference

The following tables cover all 39 baseline macros and all four colour names.
Defaults are the literal original-template baseline, not the effective values
of any alternative profile. These are authoring settings, not extra public
commands to place in `myconfig.tex`.

Define an override in the style file with `\def`, for example:

```latex
\def\thesis@sectionleading{19}
\definecolor{ThesisAccent}{HTML}{35566F}
```

The dispatcher loads style files while `\makeatletter` is active. An independent
test outside this dispatcher must use `\makeatletter`/`\makeatother` around
commands containing `@`. Do not insert a premature `\makeatother` inside a style
file, because subsequent application code also uses those internal names.

Font sizes and nominal leading below are numeric values in points; the existing
line-spacing multiplier can affect actual baselines. Spacing and widths accept
LaTeX dimensions/glue such as `20pt`, `1.5em`, `3ex plus 1ex minus .2ex` or
`1.725\baselineskip`. `em`, `ex` and `\baselineskip` depend on the context in
which the renderer evaluates them.

### 4.1 Font system and heading typography

| Macro | Baseline | Effect / supported values |
| --- | --- | --- |
| `\thesis@fontsystem` | `original` | `original`, `px`, `tx`, `mimosis`; selects package-loading branch, not the class text size |
| `\thesis@headingfamily` | `\rmfamily` | Family declaration for shared heading fonts, e.g. `\rmfamily` or `\sffamily` |
| `\thesis@headingweight` | `\bfseries` | Heading declarations; may combine weight/shape, e.g. `\mdseries\scshape` |

These declarations also reach every generated list title. `fncychap` owns the
actual chapter font declarations; some other layouts also hard-code parts of their label font.
Changing the common heading family therefore does not necessarily change every
chapter-number glyph or label.

### 4.2 Chapters and list-title coupling

| Macro | Baseline | Effect |
| --- | --- | --- |
| `\thesis@chapterlayout` | `original` | Selects an implemented chapter renderer; choices below |
| `\thesis@fncychapstyle` | empty | Case-sensitive package option when layout is `fncychap`, e.g. `Lenny` or `Bjornstrup` |
| `\thesis@chaptertitlesize` | `24.88` | Shared chapter/list-title size |
| `\thesis@chaptertitleleading` | `30` | Shared chapter/list-title nominal leading |
| `\thesis@chapternumbersize` | `20.74` | Number or chapter-label size in layouts that explicitly read it |
| `\thesis@chapternumberleading` | `25` | Nominal leading for that number/label |
| `\thesis@chapterbefore` | `50pt` | Space before the chapter heading and every generated list title |
| `\thesis@chaptergap` | `20pt` | Renderer-specific number/label-to-title gap |
| `\thesis@chapterseparatorgap` | `20pt` | Horizontal gap before the vertical separator in `separator` |
| `\thesis@chapterafter` | `40pt` | Space after the chapter heading and every generated list title |

| Chapter layout | Numbered design and setting consumers |
| --- | --- |
| `original` | Native stacked Chapter/Capítulo label plus title; uses shared family/weight, title/number sizes and vertical before/gap/after values; native heading colours remain original |
| `traditional` | `titlesec` display layout: lowercase small-cap chapter-name label, then title; number/label uses roman small caps; gap is vertical. This implemented branch is not selected by a current profile |
| `separator` | Hanging number, pale vertical separator, then title; number uses shared family/weight and number size. `chapterseparatorgap` is before the separator; `chaptergap` is after it |
| `display` | Displayed sans-serif bold accent-coloured number, then title and a short accent rule; label uses the display-number helper; gap is vertical |
| `mimosis` | Hanging large medium-weight roman number beside the shared title; gap is horizontal |
| `fncychap` | Package-defined chapter headings selected by `fncychapstyle`; package defaults own actual chapter size, number size, alignment and before/gap/after spacing |

For the non-`fncychap` alternative layouts, generic starred headings use the
shared title font and spacing, with no number or separator. For `fncychap`, the
package supplies its unnumbered chapter renderer as well. The application
restores the original appendix command and unnumbered chapter entry point
after loading the package; it preserves the existing book/hyperref hooks.

**Important for `framed` and `shaded`:** changing `chaptertitlesize`,
`chaptertitleleading`, `chapterbefore` or `chapterafter` changes their list-title
formatting, not the package's actual chapter heading. `chapternumbersize`,
`chapternumberleading`, `chaptergap` and `chapterseparatorgap` are not consumed
by their actual fncychap headings. Their existing overrides include legacy
number/gap values; those values are not fncychap controls. There is no separate
list-title setting group yet. Section headings still use the common settings.

### 4.3 Sections, subsections and subsubsections

| Macro | Baseline | Effect |
| --- | --- | --- |
| `\thesis@sectionsize` | `14.4` | Section font size |
| `\thesis@sectionleading` | `18` | Section nominal leading |
| `\thesis@subsectionsize` | `12` | Subsection font size |
| `\thesis@subsectionleading` | `14` | Subsection nominal leading |
| `\thesis@subsubsectionsize` | `10` | Subsubsection font size |
| `\thesis@subsubsectionleading` | `12` | Subsubsection nominal leading |
| `\thesis@sectionbefore` | `-3.5ex plus -1ex minus -.2ex` | Space/indentation control before sections; see signed-skip distinction |
| `\thesis@sectionafter` | `2.3ex plus .2ex` | Space after sections |
| `\thesis@subsectionbefore` | `-3.25ex plus -1ex minus -.2ex` | Before-skip shared by subsections and subsubsections |
| `\thesis@subsectionafter` | `1.5ex plus .2ex` | After-skip shared by subsections and subsubsections |

The native branch uses `\@startsection`: negative before-skips implement the
original no-indentation-after-heading behaviour. The alternative branch uses
positive before-skips and starred `\titlespacing*` to suppress indentation.
When selecting any alternative chapter layout, explicitly override both before-
skip settings with appropriate positive glue rather than inheriting the native
negative values accidentally.

Alternative section titles are ragged right and use `ThesisText`; their numbers
use `ThesisAccent`. The native branch follows the original heading rendering.
Subsection and subsubsection skips cannot currently be changed independently
through this baseline. Paragraph/subparagraph formats have no dedicated settings
here. Changing either requires an explicit renderer extension.

### 4.4 Contents and auxiliary lists

| Macro | Baseline | Effect |
| --- | --- | --- |
| `\thesis@toclayout` | `original` | TOC branch; choices below |
| `\thesis@tocchaptergap` | `1em plus 1pt` | Skip before chapter entries |
| `\thesis@tocentrygap` | `0pt plus .2pt` | Skip before section, subsection and subsubsection entries |
| `\thesis@tocchapterfont` | `\bfseries` | Chapter-entry text declarations, subject to branch overrides |
| `\thesis@tocchapterpagefont` | `\bfseries` | Chapter-entry page-number declarations, subject to branch overrides |
| `\thesis@tocchapterdotsep` | `\cftnodots` | Chapter dot spacing; `\cftdotsep` requests normal dotted leaders when the branch retains leaders |
| `\thesis@tocchapnumwidth` | `1.5em` | Chapter-number column width |
| `\thesis@tocsecindent` | `1.5em` | Section-entry left indent |
| `\thesis@tocsecnumwidth` | `2.3em` | Section-number column width |
| `\thesis@tocsubsecindent` | `3.8em` | Subsection-entry left indent |
| `\thesis@tocsubsecnumwidth` | `3.2em` | Subsection-number column width |
| `\thesis@tocsubsubsecindent` | `7em` | Subsubsection-entry left indent |
| `\thesis@tocsubsubsecnumwidth` | `4.1em` | Subsubsection-number column width |

| TOC layout | Additional behaviour after applying the common values |
| --- | --- |
| `original`, `traditional`, `shaded` | Common TOC application only; no extra branch for these tokens |
| `modern` | Removes chapter leaders and overrides chapter-entry font to sans-serif bold; chapter numbers are accent-coloured and display-padded |
| `framed` | Removes leaders at chapter, section, subsection, subsubsection, paragraph and subparagraph levels |
| `mimosis` | Removes chapter leaders; overrides chapter text/page fonts to normal roman bold |

Subordinate entry fonts are explicitly `\normalfont`; there are no separate
section/subsection entry-font or dot-spacing settings in this interface.
Chapter page-number font in `modern` still comes from its configured macro;
the special branch overrides chapter text font only. Setting chapter dot spacing
does not reinstate leaders removed by a layout branch.

Entries in the lists of figures, tables, source-code listings, algorithms and
videos use the section-entry renderer after these settings and layout-specific
overrides have been applied. They therefore follow `\cftsecfont`,
`\cftsecpagefont`, `\cftsecleader`, `\cftbeforesecskip`, `\cftsecindent` and
`\cftsecnumwidth`. Their package-specific labels, counters and file formats are
unchanged. Acronym and symbol lists are glossaries rather than TOC-style lists
and retain their own entry rendering.

Keep each level's text start beyond the number column of its parent. A useful
starting arrangement is section indent = chapter number width, subsection
indent = section indent + section number width, and similarly for subsubsections.
Check two-digit chapters and long dotted section numbers for collisions.

### 4.5 Running headers and rules

| Macro | Baseline | Effect |
| --- | --- | --- |
| `\thesis@headerlayout` | `original` | Header/page-placement branch; choices below |
| `\thesis@headerfont` | `\bfseries` | Declarations used for regular header text and, in most profiles, page numbers |
| `\thesis@headerrule` | `0.5pt` | Regular-page header-rule width; `0pt` removes it |

The following description assumes the template's two-sided Book setup. In
`fancyhdr`, `LE` means left/even, `RO` right/odd, `RE` right/even, and `LO`
left/odd. The outer edge is `LE,RO`; the inner edge is `RE,LO`.

| Header layout | Regular pages |
| --- | --- |
| `original` | Original chapter-name/number mark on even pages, section mark on odd pages; outer header page numbers; original plain-page policy |
| `book`, `navigation` | Same navigation placement: chapter mark on even pages, section mark on odd pages; outer header page numbers; no chapter-name label added by the alternative chapter mark |
| `quiet` | Header page numbers only; alternative plain-page policy |
| `modern` | Chapter mark on both even and odd pages; outer header page numbers; padded decimal chapter mark with a centred-dot separator |
| `mimosis` | Chapter mark on even pages and section mark on odd pages at the inner header; page numbers in the outer footer with explicit upright roman formatting |

The alternative marks suppress forced uppercase with `\nouppercase`. The
header layout is independent of the chapter-heading layout: a Lenny chapter
does not require quiet headers, and a shaded chapter does not require a rule.
The current `framed` profile uses `navigation`, small serif text and `0pt`.
There is no baseline setting for footer-rule width, separate header-title/page
fonts, header alignment or plain-page policy; extend the application file if
those need independent control.

### 4.6 Colours

| Colour name | Baseline definition | Current consumers |
| --- | --- | --- |
| `ThesisText` | `gray`, `0` | Shared alternative title/section fonts, including generated list titles; not native original headings or package-owned fncychap chapter fonts |
| `ThesisAccent` | `gray`, `0` | Alternative section numbers; modern displayed chapter number/rule and TOC numbers |
| `ThesisSecondary` | `gray`, `.35` | Declared baseline colour, currently unused by the active application renderers |
| `ThesisChapterSeparator` | `gray`, `.75` | Vertical separator in the `separator` chapter layout |

Use `\definecolor` in a style file to redefine a colour. An HTML hexadecimal
value has six digits and no leading `#`. For `gray`, `0` is black and `1` is white.
Redefining a colour has no effect if the chosen renderer does not consume it.
In particular, Bjornstrup's panel/number greys are package-defined values;
`ThesisAccent` is not a general fncychap palette control.

## 5. Designing a new style step by step

### Step 1: Specify the visual decisions

Write down the body/math font system, heading family/weight, chapter renderer,
title sizes and spacing, contents hierarchy/leaders and header navigation policy.
Treat numbering semantics, language, institutional sources and document
structure as existing template decisions. Keep the original baseline intact.

Choose an unused lowercase name containing only letters, digits, underscores
or hyphens. For this worked example, use `balanced`. Reusing existing renderers
is enough; no new package or renderer is required beyond installed `titlesec`.

### Step 2: Create an override-only file

Create `Config/typesetting/styles/balanced.tex` with:

```latex
% Balanced: original text/math, bold serif separator chapters and navigation.
% All omitted values inherit default-settings.tex.
\def\thesis@chapterlayout{separator}
\def\thesis@chaptertitlesize{28}
\def\thesis@chaptertitleleading{34}
\def\thesis@chapternumbersize{28}
\def\thesis@chapternumberleading{34}
\def\thesis@chapterbefore{36pt}
\def\thesis@chapterseparatorgap{14pt}
\def\thesis@chaptergap{14pt}
\def\thesis@chapterafter{28pt}
\def\thesis@sectionsize{15}
\def\thesis@sectionbefore{3.5ex plus 1ex minus .2ex}
\def\thesis@sectionafter{1.5ex plus .2ex}
\def\thesis@subsectionbefore{3ex plus .8ex minus .2ex}
\def\thesis@subsectionafter{1ex plus .2ex}
\def\thesis@toclayout{traditional}
\def\thesis@tocchaptergap{10pt}
\def\thesis@tocentrygap{1pt}
\def\thesis@tocchapterdotsep{\cftdotsep}
\def\thesis@tocchapnumwidth{2.6em}
\def\thesis@tocsecindent{2.6em}
\def\thesis@tocsecnumwidth{3em}
\def\thesis@tocsubsecindent{5.6em}
\def\thesis@tocsubsecnumwidth{4em}
\def\thesis@tocsubsubsecindent{9.6em}
\def\thesis@tocsubsubsecnumwidth{5em}
\def\thesis@headerlayout{navigation}
\def\thesis@headerfont{\small\rmfamily}
\def\thesis@headerrule{0pt}
\definecolor{ThesisChapterSeparator}{gray}{.65}
```

This inherits `fontsystem=original`, roman bold headings, black text/accent and
the baseline subsection sizes. It therefore preserves original body/math fonts
while using an alternative chapter layout. Its section leading remains the
baseline 18pt. Every listed override records a changed setting value.

Do not `\input` another style file: that would create an inheritance chain
outside the intended shared-baseline design. Do not place `\usepackage` calls
for a new font system here; handle package loading in `apply/typography.tex`.

### Step 3: Register the name in the dispatcher

In `Config/typesetting/typesetting.tex`, append it to the existing registry:

```latex
\def\thesis@registeredstyles{standard,editorial,modern,framed,shaded,mimosis,balanced}
```

The validation loop, its error message and both maintainer helpers read this
single registry. The filename must exactly match the registry entry, including
case. The registry order also becomes the prototype and comparison order.

### Step 4: Verify helper discovery

From the template root, confirm that both helpers discover the new entry:

```bash
AdminScripts/build-book-typesetting-prototypes.sh --list-styles
AdminScripts/build-book-style-comparisons.sh --list-styles
```

No separate hard-coded style list should be updated. If discovery fails, check
that the registry remains a single `\def\thesis@registeredstyles{...}` line.

### Step 5: Update user-facing documentation

Add `balanced` to the selector comment in `Config/myconfig.tex`, briefly expose
it in the README and user manual when appropriate, and describe its design and
dependencies in this guide. Leave the existing default `standard` value
unchanged unless you intentionally want the distributed example to use it.

### Step 6: Compile and inspect

From the template root, build the example without altering the working selector:

```bash
AdminScripts/build-book-typesetting-prototypes.sh --styles balanced
AdminScripts/build-book-typesetting-prototypes.sh --styles balanced --font-mode document
AdminScripts/build-book-typesetting-prototypes.sh --styles balanced --language english
```

Alternatively, change the existing `myTypesettingStyle` value to `balanced` and
run the normal `make` build. Inspect headings, TOC and regular/chapter-opening
pages. Build sufficient passes through the normal toolchain to stabilise contents,
references, bibliography and glossaries; a single raw pdfLaTeX pass is not a
full-book validation.

### Step 7: Verify discovery and comparison

From the template root:

```bash
bash AdminScripts/build-book-style-comparisons.sh --list-styles
bash AdminScripts/build-book-style-comparisons.sh
```

The fresh comparison should contain seven groups, four pages per group, and
`balanced` labels on its four pages. To use `--pdf-dir` instead, first build all
seven inputs into the specified directory; building only `balanced` is not enough.

### Step 8: Check preservation and commit the intended files

Review your diff. A profile built from existing renderers normally requires only
the new style file, dispatcher registry/help text, helper tuple and documentation/
selector comment. It does not require changing the shared preamble, postamble,
chapter content, covers, Makefiles or bibliography. Rebuild `standard` and check
it against the same original reference/configuration; avoid comparing different
content or stale PDFs.

## 6. Extending the renderers

The examples in this section require implementation changes. They are not
additional settings already supported by the current template.

### 6.1 Use another existing fncychap design

For a new profile using an installed package design, set:

```latex
\def\thesis@chapterlayout{fncychap}
\def\thesis@fncychapstyle{Conny}
```

Register the new profile normally and explicitly give positive section/subsection
before-skips. Choose body fonts, TOC and headers independently. No heading-renderer
change is needed merely to select another compatible package option. Check the
installed fncychap manual for option spelling and design-specific limitations;
Lenny/Bjornstrup have been tested here, not every package design/language combination.

### 6.2 Customise package fonts after fncychap is loaded

The current style file loads **before** `fncychap`. Writing `\ChTitleVar{...}`
directly at style-file load time will therefore encounter an undefined command.
For configurable post-load customisation, introduce a deliberate hook:

1. Add this default to `default-settings.tex`:

   ```latex
   \def\thesis@afterfncychap{}
   ```

2. In the `fncychap` branch of `apply/headings.tex`, invoke it after
   `\RequirePackage[...]` and the following `\makeatletter`:

   ```latex
   \thesis@afterfncychap
   ```

3. In the new style file, override the hook, for example:

   ```latex
   \def\thesis@afterfncychap{%
     \ChTitleVar{\Huge\rmfamily\bfseries}%
   }
   ```

Document this new setting and its scope. `\ChNameVar`, `\ChNumVar`,
`\ChTitleVar` and `\ChRuleWidth` configure the package, but individual designs
can consume them differently. Changing Bjornstrup's panel colours or package
chapter spacing requires examining/customising its rendering routines; the
four baseline colours and generic chapter skips do not supply those controls.
Keep all such changes conditional on the intended style/layout.

### 6.3 Add a new titlesec chapter layout

Suppose a new profile requires a full-width rule beneath a displayed title.
Choose an unused layout token, such as `ruled`, then add a conditional branch
inside the non-fncychap alternative chapter renderer in `apply/headings.tex`,
alongside the existing `separator`, `display` and `mimosis` branches and before
the common `\titlespacing*{\chapter}` call:

```latex
\ifthenelse{\equal{\thesis@chapterlayout}{ruled}}{%
  \titleformat{\chapter}[display]{\thesis@chapterfont}%
    {\normalfont\thesis@headingfamily\thesis@headingweight
      \color{ThesisAccent}%
      \fontsize{\thesis@chapternumbersize}{\thesis@chapternumberleading}\selectfont
      \thechapter}%
    {\thesis@chaptergap}{}%
    [\vspace{6pt}{\color{ThesisAccent}\titlerule[.5pt]}]%
}{}
```

Then select `\def\thesis@chapterlayout{ruled}` in the new style. The existing
common code provides before/after spacing and generic numberless titles. In
this example, the rule belongs only to numbered headings; modify the numberless
branch explicitly if it should also have a rule. No public selector change is
needed for `ruled` itself unless `ruled` is also the name of a new profile.

Avoid overwriting `\chapter`, counters or reference semantics merely to draw a
new heading. Use existing setting macros in the renderer. For a new configurable
rule width, add a baseline macro, consume it in this branch and document it.
Otherwise the `.5pt` above is a hard-coded renderer detail.

### 6.4 Add a font system or other independent control

For a new font-system token, add an explicit branch to `apply/typography.tex`.
Do not rely on an unknown token: the current non-original, non-mimosis,
non-px fallback loads the TX packages. Keep package checks, engine constraints,
load order, saved paragraph lengths, spacing multiplier and final font selection.
Keep the `original` branch unchanged and extend institutional-state restoration
only if the new packages change additional state that covers require.

For independent TOC-title typography, subsubsection spacing, lower-level TOC
fonts, header alignment, footer style or captions, add a baseline setting **and**
the corresponding consumer in the appropriate application file. Merely declaring
a macro produces no output change. Preserve old effective defaults so existing
profiles, particularly `standard`, keep their appearance. Add profile-specific
overrides only where required. A future caption extension must also be loaded
by the dispatcher.

## 7. Validation and troubleshooting

### 7.1 Visual and structural validation

Validate both institutional font policies and the actual font packages you
intend to ship. A controlled fixture with fallback fonts can test rendering
logic, but does not establish New PX/New TX/Garamond font fidelity.

Use documents containing:

- Short and multiline chapter titles, chapter 10 and at least one appendix.
- Numbered and starred chapters; front matter, main matter and back matter.
- Sections, subsections and subsubsections, including long numbered headings.
- A multi-page chapter so even/odd running headers can actually be observed.
- TOC entries with long titles, two-digit numbers and multiple numbering levels.
- Equations, references, bibliography, enabled lists and representative figures.
- The selected institutional cover/back-page family and any compendium structure
  intended for release.

Check counters, reference text, TOC entries and hyperlink/bookmark hierarchy,
not just screenshots. Inspect logs for missing packages/fonts/glyphs, substitutions,
unresolved references, overfull boxes and header-height warnings. Distinguish
inherited diagnostics from new ones. Larger header fonts or wrapped header
titles may need an explicit, carefully scoped header-height solution; there is
no current baseline `headheight` macro.

For original-output preservation, compare `standard` against an untouched
reference built with identical content, configuration and toolchain. For an
isolated style change, also compare unchanged profiles and unaffected page areas.
Record the environment, fonts, document configuration and any test limitations.

### 7.2 Common problems

| Symptom | Likely cause and action |
| --- | --- |
| Unknown style | Check case, style filename and dispatcher registry; update error help text |
| Helper omits a valid LaTeX style | Keep the registry as one parseable `\def\thesis@registeredstyles{...}` line and ensure its style file exists |
| Style file found but heading fails | Check that its layout token has an implemented branch; a new name is not a renderer |
| Package missing | Install the required `.sty` package in the active TeX distribution; do not ship test-only stubs |
| Heading skip behaves unexpectedly | Check native negative skips versus alternative positive skips, and whether the value is vertical or horizontal in this layout |
| Chapter changes also alter generated list titles | Shared chapter title/font/before/after settings deliberately supply every list title |
| Changing chapter size does nothing in framed/shaded | fncychap owns actual chapter typography; inspect its option/customisation interface |
| TOC font override appears ineffective | `modern` and `mimosis` apply additional overrides after the common values |
| Chapter dots remain absent | The selected TOC branch removes leaders; dot spacing alone cannot restore them |
| No title on chapter-opening page | The page uses `plain`; regular navigation headers intentionally do not apply there |
| Wrong/stale header on a starred chapter | Supply appropriate `\markboth`/`\markright` marks; adding a TOC entry does not set them |
| Comparison uses old formatting | Rebuild the individual PDFs; `--pdf-dir` reuses existing bytes |
| Comparison cannot find samples | Automatic selection is guide-specific; inspect bookmarks/text or use `--pages` |
| Comparison has a missing registered input | Build every registered style using the selected institutional font-policy suffix |

## 8. Maintenance and reference material

For ordinary profile additions, keep `default-settings.tex` as the explicit
original-template baseline. Add overrides rather than moving style-specific
definitions into the shared preamble. When an extension introduces a new setting,
define its compatible default, add its consumer, describe supported values and
scope, and verify existing profiles. Update the dispatcher registry, selector
comment, README, user manual and this guide together.

The shipped profiles have been checked through the complete pdfLaTeX, Biber and
glossary pipeline in both institutional-page font modes. The `standard` output
was also compared with the pre-feature template to guard its original rendering.
Validation should always include at least one English document as well as the
default Spanish manual. The exact commands and results depend on the current TeX
installation and should be recorded with the change that introduced a profile.

The source files are authoritative for this guide's settings and load order.

Primary package documentation is available through:

- [titlesec on CTAN](https://ctan.org/pkg/titlesec): heading layouts and spacing.
- [fncychap on CTAN](https://ctan.org/pkg/fncychap): package options, example
  chapter designs and customisation commands.
- [tocloft on CTAN](https://ctan.org/pkg/tocloft): contents/list typography and
  number-column controls.
- [fancyhdr on CTAN](https://ctan.org/pkg/fancyhdr): page-style placement and marks.

Consult the documentation matching your installed packages when extending
renderers; installed versions can differ from current upstream releases.

## 9. Mimosis adaptation and MIT licence

The `mimosis` profile is a visual adaptation inspired by Bastian Rieck's
[latex-mimosis](https://github.com/Pseudomanifold/latex-mimosis), examined at
commit `54e43088a06a1808c7914540a7b7cd9f38fad326`. It does not load
`mimosis.cls` or reproduce its KOMA-Script implementation. Instead, it adapts
recognisable choices such as its font basis, restrained small-cap chapter
headings, contents typography and running-header treatment to this template's
existing `book`-class architecture. Consequently, changes must be implemented
through this repository's settings and renderers rather than copied as Mimosis
class options.

The adapted upstream material is available under the following MIT licence:

```text
Copyright (c) 2018 Bastian Rieck

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

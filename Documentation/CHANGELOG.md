# Changelog

This file is generated from tagged Git history with `git-cliff`. Regenerate it with `make -C Documentation changelog`; edit this configuration rather than the generated output.

## [v7.2.3] - 2026-10-08

### Bug Fixes

- Validate Dropbox destination before building


### Documentation

- Focus getting started on the basic workflow

- README.md content simplified (English version too)


### Maintenance

- Prepare v7.2.2

- Prepare v7.2.3


### Other Changes

- Build(distribution): distinguish styles comparison and guide PDFs

## [v7.2.1] - 2026-10-08

### Bug Fixes

- Stabilize indexing of Spanish Roman page numbers


### Maintenance

- Updated changeglo

- Prepare v7.2.1

## [v7.2.0] - 2026-10-08

### Features

- Updating to release v7.2.0


### Bug Fixes

- Keep documentation PDF names unnumbered in the repository


### Documentation

- Reorganize guides and make Spanish README the landing page

- Organize bilingual guides and generate changelog


### Maintenance

- Doc language is no longer loaded in documentclass definition (it is done in postamble.tex

- Renamed English md files to -en (preparing translation)

## [v7.1.0] - 2026-10-07

### Maintenance

- Adding two subsections to avoid single sibling

- Fixed wrong punctuation marks

- Fixed title

- Date update

## [v7.0.0] - 2026-10-06

### Features

- Added colors used in commented out code (JIC)

- Add configurable Book typesetting styles

- Add curated public distribution and typesetting guides

- Added form of Annex I in TFM-EPS-UAH regulations (educational agreement with institution)

- Fully replicating new cover page for TFM at EPS-UAH

- Increased for size in chapter titles (ñapa)

- Moved papeleo to PapeleoTFM root dir (name explicits the related regulations) & nes form for TFMs at EPS-UAH

- Visto bueno document updated to EPS-UAH regulations (for both MUIE and MUIT/MUII, don't know about other Masters

- New form for Anexx V in EPS-UAH TFM regulations

- Working in TFM Acta for EPS-UAH

- Improved documents for papeleo TFG (UAH and EPS-UAH)

- Improve paperwork for TFGs at UAH and EPS-UAH

- Updated regulations and paperwork

- New paperwork docs for TFGs at EPS-UAH

- Generate confidentiality forms for all TFG evaluators

- New and improved paperwork docs for TFGs and TFMs at EPS-UAH

- Unify TFG and TFM paperwork builds

- Organize and build PhD paperwork collections

- Working in PapeleoPhD

- Working in PapeleoPhD

- Updating to release v7.0.0


### Bug Fixes

- Unify entry styles across generated lists

- Remove remaining framed TOC leaders

- Fixed wrong variable name (case issue)


### Documentation

- Explain automatic grammatical agreement


### Maintenance

- Updated access date in bib refs

- Now referencing TFG-GIEC-spanish.pdf

- Updated dates in myconfig.tex variables

- Changed form title size

- Renamed form to state it applies to TFM at EPS-UAH

- Improved layot for prorroga form

- Move unused solicitud.tex to deprecated

- Updated to follow new format in EPS-UAH TFM regulations

- Working in TFM Acta for EPS-UAH

- Minor mods to fix line spacing overlaping table border and extra title

- Removed old files for TFM regulations

- Added comment (TODO)

- Improving documentation

- Removing distribution of PapeleoPhD

- Removed useless file

## [v6.0.0] - 2026-10-02

### Features

- Add maintainer distribution workflow

- Ignoring new files

- Add ITIURJC degree support

- Add maintainer distribution workflow

- Add UAH Faculty of Sciences degrees

- Add PhD thesis-by-compendium template

- Unify standard and compendium book entry points

- Now compendium requires a PhD program and generates an error otherwise

- Softened description of bare start

- Simplify document structure and optional content

- Identify PhD structure in output filenames

- Generate every PhD document structure

- Minor indentation change

- Cleaned repo structure and redesigned distrib building

- Bare chapters improvements

- Bare chapters improvements

- Now bare introduccion.tex shows minimal samples of figure, table, equation and acronym


### Bug Fixes

- Back to default GIEC

- Report PDF generation failures

- Preserve release metadata during book builds

- Exclude regulations from release archives

- Restore latexmk builds and document graphical Git setup

- Fixed missing bib entries in anteproyecto.tex sample

- Added missing Config files in sync-git-sources.sh

- Fixed type in find command


### Documentation

- Explain how to add degrees and universities

- Simplify degree selection guidance

- Clarify cover file sequence behavior

- Clarify Git repository prerequisite

- Cross-reference compendium from standard workflows


### Refactoring

- Centralize degree configuration

- Derive institutions from degree registry

- Organize institutional branding assets

- Present standard book structure first

- Split generated lists into dedicated cover files

- Colocate prepared document structures

- Make active LaTeX builds incremental


### Maintenance

- Minor mods in acknowlegements material

- Adding ignored paths

- Archive unused legacy resources

- Added relevant names to tribunal (easter egg like)

- Adjusted pdf zoom value (scaled pdfs were too close to header)

- Added comments to ease book.tex understanding

- Reordered definition of document structure

- Reordering variable sections

- Changed unused path for future use

- Prepare v6.0.0 release

- Merge devel into master

- Removed useless scripts

- Removed README.md from mandatory distrib files

- Fixed pdf link to dropbox & do not generate docs for pre-Bologna degrees

## [v5.0.0a] - 2026-09-16

### Features

- Document the repository structure

- Clarify the main book workflow

- Add book content customization guidance

- Improved references to the 'make' build alternative

- Add a minimal book starting structure

- Synchronize Git sources from LaTeX dependencies


### Bug Fixes

- Update paperwork paths in README

- Remove unsupported BibTeX guidance

- Focus bibliography guidance on Biber

- Correct the Overleaf download link

- Stop generating low-quality screen PDFs

- Refresh repository overview metadata

- Use a unique label for the video links section

- Modernize paperwork builds


### Documentation

- Update the introduction and repository structure

- Modernize the compilation instructions

- Update the generated document structure

- Document general and author configuration

- Document academic and assessment configuration

- Complete the shared configuration reference

- Update project and paperwork guidance

- Modernize revision and troubleshooting guidance

- Refresh the LaTeX usage examples

- Restore presentation notes and personal tone

- Restore the complete video link example

- Restore the invitation to contribute fixes

- Restore the personal revision guidance

- Restore the personal Makefile introduction

- Personalize the custom command guidance

- Personalize the figure inclusion guidance

- Restore the diagram example footnote

- Restore the personal thanks to Cristina Losada

- Restore the personal thanks to Carlos Cruz

- Restore the interactive acronym example

- Restore the acronym plural example

- Personalize the preliminary proposal guidance

- Personalize the paperwork introduction

- Remove duplicate Makefile instructions

- Replace description lists with itemized lists

- Address the reader in compilation guidance

- Address the reader in structure guidance

- Address the reader in configuration guidance

- Address the reader in paperwork guidance

- Address the reader in revision guidance

- Address the reader in usage examples

- Introduce itemized variable lists

- Prioritize editor-based compilation

- Improve introduction cross-references

- Integrate optional tools into makefile guidance

- Clarify which document elements require editing

- Distinguish basic and advanced make targets

- Align guidance with the reorganized template

- Expand template examples and citation guidance

- Promote template utilities to a dedicated chapter

- Categorize custom command examples

- Clarify the document structure chapter

- Add chapter introductions and summaries

- Add Overleaf guidance and refine README structure

- Clean and format the example bibliography

- Streamline README navigation and bibliography guidance

- Acknowledge AI-assisted template revisions

- Refine advanced composition examples

- Explain how to start from the minimal structure

- Introduce the anteproyecto in first steps


### Refactoring

- Reorganize the example document as a tutorial

- Rebalance tutorial chapters and appendix

- Split the template guide into focused chapters

- Include chapters directly from book


### Maintenance

- Changes for generating specific grades documents

- Remove the redundant HOWTO guide

- Record remaining repository updates

- Consolidate repository ignore rules


### Other Changes

- Release v5.0.0a

## [v4.2.4j] - 2026-09-08

### Other Changes

- Release v4.2.4j

## [v4.2.4i] - 2026-09-08

### Bug Fixes

- Restore original cover and backpages for MUIE


### Other Changes

- Release v4.2.4i

## [v4.2.4h] - 2026-07-23

### Maintenance

- 2025 -> 2026


### Other Changes

- Release v4.2.4h

## [v4.2.4g] - 2026-07-23

### Features

- Now vertically centers the book title in the cover page title area


### Bug Fixes

- Handling of language and sex in MUC cover page


### Other Changes

- Release v4.2.4g

## [v4.2.4f] - 2026-07-21

### Other Changes

- Release v4.2.4f

## [v4.2.4e] - 2026-07-21

### Features

- Copied new TFM normativa EPS-UAH


### Bug Fixes

- Removed deactivatetilden as it breaks compilation with TexLive 2025 (still don't know why)

- Wrong name in MUANDB (my bad)


### Maintenance

- Back to using compressed instead of screen compression


### Other Changes

- Add UAH Cybersecurity TFM cover

- Release v4.2.4e

## [v4.2.4d] - 2026-03-23

### Other Changes

- Release v4.2.4d

## [v4.2.4c] - 2026-03-17

### Features

- Updated TFGs cover&back with new UAH corporate image


### Other Changes

- Release v4.2.4c

## [v4.2.4b] - 2026-03-17

### Other Changes

- Release v4.2.4b

## [v4.2.4] - 2026-03-17

### Features

- Added new UAH logos 2026

- Updated TFGs cover&back with new UAH corporate image


### Other Changes

- Add detailed repository overview document

- Release v4.2.4

## [v4.2.3] - 2026-02-08

### Features

- Updated TFM cover to new UAH/EPS regulation

- Updated TFM cover to new UAH/EPS regulation

- Add new logo UAH with white font

- Updated (most) covers to new UAH logos


### Bug Fixes

- Removed www from www.miktex.org (strange the full std url does not work)


### Other Changes

- Release v4.2.3

## [v4.2.2] - 2025-09-18

### Features

- Updates to customization and papeleo


### Bug Fixes

- Fixed makeglossaries error in TexLive 2025 due to the use of supertabular


### Other Changes

- Fun: updated "meaningful" DNIs for participants

- Fun: updated "meaningful" DNIs for participants

- Release v4.2.2

## [v4.2.1] - 2025-07-06

### Features

- Now date is 'a la fecha de la firma digital' instead of \myThesisDefenseDate


### Bug Fixes

- Removed useless copy section

- Now avoids error if no git repo when make

- Fixed compilation error


### Maintenance

- Date updated


### Other Changes

- Release v4.2.1

## [v4.2.0] - 2025-07-04

### Features

- Added vertical spacing to make indexes more readable


### Bug Fixes

- Fixed wrong uppercase of MUSEA

- Now properly handling evaluation committee member & sex for TFM and TFGs

- Removed vspace (should not be used)

- Too long committee name

- Now properly handling English/Spanish in standard UAH TFM template cover


### Maintenance

- Minor changes, improved rendering

- Minor changes, improved rendering

- Minor changes, improved content

- Cleaning up files


### Other Changes

- Fea+chore: added suport for MUANBD + cleaning up

- Release v4.2.0

## [v4.1.4] - 2025-06-07

### Features

- New files to handle new TFG regulations

- Cleaning normativas, added UsefuDocs

- Added explicit compress options to reduce pdf size


### Bug Fixes

- Distribution now includes Papeleo* directories


### Maintenance

- Added ignored files to avoid pdf inclusion


### Other Changes

- Added compressed pdf generation (courtesy of Pedro Revenga)

- Removed ancient TFC regulations

- Release v4.1.4

## [v4.1.3] - 2025-03-26

### Other Changes

- Release v4.1.3

## [v4.1.2] - 2025-03-25

### Bug Fixes

- Moving glossaries package *after* hyperref to get acronym hyperlinks


### Other Changes

- Release v4.1.2

## [v4.1.1] - 2025-03-19

### Features

- Minor update related to Papeleo rework


### Other Changes

- Release v4.1.1

## [v4.1.0] - 2025-03-19

### Features

- Unifying pre and postambles in PapeleoTFG

- Unifying pre and postambles in PapeleoTFG

- Unifying pre and postambles in PapeleoTFG

- Added \myPaperworkDateEnglish

- Unifying pre and postambles in PapeleoTFG

- Unifying pre and postambles in PapeleoTFG

- Reworked all papeleo TFG to use unified pre and postamble

- Unifying pre and postambles in PapeleoTFG

- Reworked all papeleo TFM to use unified pre and postamble

- Unifying pre and postambles in PapeleoTFG

- Unifying pre and postambles in PapeleoPHD

- Unifying pre and postambles in PapeleoPHD

- Unifying pre and postambles in PapeleoPHD

- Unifying pre and postambles in PapeleoPHD


### Other Changes

- Release v4.1.0

## [v4.0.3] - 2025-03-19

### Features

- Added Miguel Tradecete for bug reporting contributions :-)

- Added support for MUC & more


### Bug Fixes

- Added missing files for new UAH TFG back/front pages

- Now RELEASE.txt is updated at distribution generation time


### Maintenance

- Minor update to the long forgotten versiones.tex


### Other Changes

- Release v4.0.3

## [v4.0.2] - 2025-02-25

### Features

- Sample maximum grades provided


### Bug Fixes

- Fixed wrong numbering in anteproyecto


### Maintenance

- Updated list of sample docs to generate

## [v4.0.0, v4.0.1] - 2025-02-09

### Features

- Added .gitignore files to the distribution

- Added new section given new TFG regulations

- Added gant example using pgfgantt package (nice!)

- Reference to chatgpt and proper paragraphs

- Added Manuel Sánchez Monge as contributor

- Now frontpage and backpages compliant with new TFG regulations (2024)

- Now frontpage and backpages compliant with new TFG regulations (2024)

- Added pgfgantt package (nice!)

- Added TFG for the GMC and fixed TFG full name

- Added TFG for the GMC and fixed TFG full name

- Now frontpage and backpages compliant with new TFG regulations (2024)

- Added TFG for the GMC and fixed TFG full name

- Form for advisor report and evaluation rubric

- Added variables for foreign tutor

- Updated dates to show major update in Feb 2025

- Added variables for TFG defense grades

- General Makefile for TFG paperwork

- Minor improvements in signature section

- New code for the TFG rubrica

- New code for the TFG rubrica tutor/tribunal

- Added gender management in new documents

- Hyphenation no longer applied

- New tribunal rubrica done!

- Setting up new TFM directory

- Setting up new TFM directory

- Minor updates to reflect recent changes on paperwork support


### Bug Fixes

- Fixed compilation error due to lofcounter re-definition

- Removed useless lines

- Moved old regulations on UAH TFGs

- Double compilation to fix bad rectangle placement

- Fixing spacing between elements in new docs

- Fixed wrong multirow spans in tutor rubrica

- Removed no longer used files

- Removed no longer used files

- TFM autorizacionPublicarAbierto.tex compilation now works

- TFM autorizacionPublicarAbierto.tex compilation now works

- TFM autorizacionPublicarAbierto.tex compilation now works


### Other Changes

- Moving to release 3.1.8k

## [v3.1.8k] - 2024-09-28

### Other Changes

- Added ../ to \input search paths & mdtpdf pandoc url for future ref

- Ignoring *tgz *tar.gz *rubbercache files

- Improved README.md

- Added todo comments

- Added examples on the inclusion of videos

## [v3.1.8.j, v3.1.8i] - 2024-09-03

### Other Changes

- Now providing release number info

- First attempt to generate listing style for json (still not tested)

## [v3.1.8e, v3.1.8f, v3.1.8g, v3.1.8h] - 2024-07-03

### Other Changes

- Now cite ref color is blue (green does not look good)

## [v3.1.8d] - 2024-07-01

### Other Changes

- Added locally ignored files to general TeX .gitignore template

- Added support for tt&bf simultaneously (bold-extra package)

- Fixed wrong reference to D. instead of D/Dª

## [v3.1.8c] - 2024-02-08

### Other Changes

- Removed toc in anteproyecto (commented out)

- Fixed problem with tocbibind

## [v3.1.8b] - 2023-11-17

### Other Changes

- First commit

- New script to get all branches after clone

- Added detection of cotutor name starting with I

- Added detection of cotutor name starting with I

- Working version with and -> e or y

- Fixed compilation problem (still don't know why)

## [v3.1.4a, v3.1.8a] - 2023-11-09

### Other Changes

- First commit

## [v3.1.8] - 2023-10-18

### Other Changes

- New Makefile generated with ChatGPT... Knows far better than me

- Fixed silly typo in usepackage (missing \)

## [v3.1.7] - 2023-10-04

### Other Changes

- Fixed wrong pointer to bibliofiles.tex file

- Spell checked (ya me vale)

- Updated date

- Fixed wrong order in usepackage hyperref-hyperxmp

- Added xmp info to pdf

## [v3.1.6] - 2023-07-11

### Other Changes

- Now set spanish as default in documentclass

- Now spanish is default \myLanguage

- Minor changes for full generation

## [v3.1.5] - 2023-06-29

### Other Changes

- Fixed long time issue with multiple languages support

- Videos changed

## [v3.1.4] - 2023-06-28

### Other Changes

- Now using Makefile to compile README.md

- Fixing typo

- Minor change in introduction

- Back to default style for added tex in latexdiff output

- Proper indentation

- Book.pdf will now be ignored

- Unwrapping all files... doom side effect :-)

- Added description on relevant files to consider in overleaf as 'main document'

- Properly formatting description on relevant 'main document' files

- Added some comments on the use of package makecell to allow line breaks in cells

- Added comment on overleaf issues and pointer to resource

- Fixed make error due to missing file...

- Fixed gender error when single tutora in autorizacion TFG

- Added csquotes as suggested by Miguel Cubero

- Added Esquema_objetos.pdf to avoid error in overleaf, added TODO item (background related)

## [v3.1.3] - 2023-04-29

### Other Changes

- Document IMPORTANT-BIBLIOGRAPHY.md is now integrated in the README

- Document IMPORTANT-BIBLIOGRAPHY.md is now integrated in the README

- Title change

- Updated date

- New top level Makefile to generate README.pdf and make book

- Tidying up phony targets

## [v3.1.2] - 2023-04-18

### Other Changes

- Added .latexmkrc to generate acronyms+symbols in overleaf

## [v3.1.0, v3.1.1] - 2023-04-17

### Other Changes

- Fixed glossaries and tocloft induced errors in anteproyecto

## [v3.0.9] - 2023-04-12

### Other Changes

- Now glossaries includes automake option to (theoretically) allow for automatic generation within the compilation process

## [v3.0.8] - 2023-04-10

### Other Changes

- Gonzalo Corral added in acknowledgement section

- Fixed nobiblio entry to fix its appearance in the references section

- New work to add list of videos

- Fixed wrong default of embargo (was 24, now 0)

- Now ignoring new .vdo aux file

- Fixed variable DirectorOrDirectora already defined when it is Directora...

## [v3.0.7] - 2023-02-22

### Other Changes

- Added README.pdf and related files to the distribution

- Added new vars in pdf xmpdata

- Removed useles files

- Minor changes to update dates to 2022-2023

- Added comments to set double spacing and Helvetica (Arial) font

- Checked functionality of \fullcite{} to include inline bib references

## [v3.0.6] - 2023-01-08

### Other Changes

- Improved README.md and README.pdf generation.

## [v3.0.5] - 2023-01-08

### Other Changes

- Added specific cover for MUCTE

- Defaults in myconfig.tex back to normal

## [v3.0.4] - 2023-01-07

### Other Changes

- Now forget about  (just commented out)

- Now md files in root dir are included in distribution tgz and zip files

- Move acronyms and symbols definition inclusion.

- Add an option to use makenoidxglossaries.

- Adapt the makefile to latex changes.

- Added additional info to explain changes in makeglossaries options

- Fixed wrong message in makeglossaries tool definition section

- Now using \glossariessystem}=makenoidxglossaries

- Unified bibbackend code in config-bibbackend.tex + fixed missing bib files in processing

- Revert "Unified bibbackend code in config-bibbackend.tex + fixed missing bib files in processing"

- Revert "Now using \glossariessystem}=makenoidxglossaries"

- Revert "Fixed wrong message in makeglossaries tool definition section"

- Revert "Added additional info to explain changes in makeglossaries options"

- Revert "Adapt the makefile to latex changes."

- Revert "Add an option to use makenoidxglossaries."

- Revert "Move acronyms and symbols definition inclusion."

- Unified bibbackend code in config-bibbackend.tex + fixed missing bib files in processing

- Now using config-bibbackend in preamble-slides, JIC somebody uses them

- Added pending file to fix missing bib files in processing

- Changes in general information to comply with regulations (added grade/master full name)

- Added Miguel Cuberto in contributors list

- Minor changes

## [v3.0.3] - 2022-10-29

### Other Changes

- Typo fixed in verb environment

- Added suppor for up to 25 bib files (courtesy of Frank Sanabria's PhD Thesis)

- Removed useless files

- Now caption if loaded *after* hyperref to improve hyperref links to point to top of floats

- Removed deprecated windows installation

- Instructions for Windows/Linux/TeXStudio/overleaf added to the README.md

- Improved instructions added to the README.md

- Removed howto files as they have been integrated in the README.md file

## [v3.0.2] - 2022-10-11

### Other Changes

- Fixed removal of book.pdf, and now deleting it when 'make clean'

- New howto document to use the template in windows, including makeglossaries

## [v3.0.1] - 2022-10-11

### Other Changes

- Changes in default documents

- Removed useless file

- Now sample pliego is correct

- New ignores

- Defined variables to avoid LaTeX complainint too much about tiny mismatches in bad boxes

- Aborted attempt to generate a toc entry for the cover page. Does not make sense really

- Added explicit toc entry for Acknowledgements. Should appear by default, but it does not (?)

- Now pdf is generated with pdfstartview=Fit and pdfpagemode=UseOutlines

## [v3.0.0] - 2022-09-06

### Other Changes

- Added exception in cover page for MUCTE

- Implemented preliminary support for MUCTE TFMs

- Removed inclusion of Department name in cover for old UAH TFM cover page

- Implemented preliminary support for MUCTE TFMs

- Implemented preliminary support for MUCTE TFMs

- First version

- Moved variable to where it belongs

- Added support for Department secretary gender

- Added support for Department secretary gender + minor change in document 'solicitud'

- Added support for Department secretary gender + minor change in document 'solicitud'

- Added prerrequisites section, suggested by Cosmin Madalin Marina

- Now generation of authorization for open publishing is fully automated

- Now fully working VB tutor PhD

- Still working on XMPDATA, but commiting for Gonzalo to PR

- Fixed extra spaces at end of line

- Fixed extra spaces at end of line

- Now all labels follow usual convention "type:label"

- Now all labels follow usual convention "type:label"

- Convert all remaining files to utf-8

- Add more filetypes and generated files to gitignore

- Fix bug with bibliography in biber.

- Remove input encoding hack from manual.

- Allow utf-8 in bibliography

- Allow compilation with alternative engines.

- Fix opacity bug in front page when we are using xe/luaLatex

- Add compilation selection support to makefiles

- Cleanup Makefiles from book and anteproyecto.

- Fix slides compilation.

- Use biblatex as default bibliography system in anteproyecto

- Make listings work with utf-8 encoded source files.

- Remove input encoding bibliography hack.

- Use pdflatex by default to compile the book.

- Fix color of header in cover.

- Add bibliography to general index

- Added info about compilation tools been used. Added full rm clean command.

- Nuevo Makefile para cosas de PhD y variables xmpdata (TODO)

- Silly line removal

- Changes to avoid users editing the Config/preamble.tex file to deal with bibliography

- Changes to avoid users editing the Config/preamble.tex file to deal with bibliography

- Changes to avoid users editing the Config/preamble.tex file to deal with bibliography

- Changes to avoid users editing the Config/preamble.tex file to deal with bibliography

- Added proper make clean commands

- Biblatex back to being the preferred bib system

- Config-anteproyecto.tex now handles bibliography correctly (as main book)

- New file with info on biblio related changes

- Cleaning up files

## [v2.0.4, v2.0.5] - 2022-01-13

### Other Changes

- Added Config/worktypes.txt, required in compilation

- Fixed uppercase DE in document title

- Fixed uppercase DE in document title

- Created new variable for solicitudTFGTFM.tex to account for the required co-advisor signature

- Created new variable for solicitudTFGTFM.tex to account for the required co-advisor signature

- Making explicit the effect of using \ac{} a second time in conclusiones.tex

- Adding TeX-master variable in introduction.tex

- Just indentation improvement

- Now omitting "signed by coadvisor" lines if there is no coadvisor

- Added generally ignored files and minor modifications in Makefile to generate final filename

- Added ignores .lof files

- New ignored files

- Unified all .gitignore files: from github plus our needs

## [v2.0.2, v2.0.3] - 2021-09-02

### Other Changes

- Improved script to generate distribution: now request tag name and tag message (to better keep track of changes). tgz/zip distrib files are now named including tag name

- New ignored files

- Fixed typo in .gitignore

- New ignored files

- New ignored files

- Simple script I used to check differences between two directory structures

- New ignored files

## [v2.0.0, v2.0.1] - 2021-07-26

### Other Changes

- Re-structuring Papeleo directory

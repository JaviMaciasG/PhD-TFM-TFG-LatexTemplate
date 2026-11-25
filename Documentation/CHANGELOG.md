# Changelog

This file is generated from tagged Git history with `git-cliff`. Regenerate it with `make -C Documentation changelog`; edit this configuration rather than the generated output.

## [v8.14.8] - 2026-11-25

### Features

- Added Manuel Ruano to contributors (he was the one with the idea of the videos list


### Bug Fixes

- Added temp fix for LaTeX issue


### Maintenance

- No longer tracking normativas folder (updated ignored files and docs)

- Prepare v8.14.8

## [v8.14.7] - 2026-11-24

### Features

- Redesign the Spanish GitHub Pages landing page with a prominent download button, links to both READMEs and a gallery of eight example PDFs

- Add a worked robot-prototype budget covering labour, equipment depreciation, software licences, overhead, professional fees and VAT, and offer the budget and conditions document as optional appendices


### Maintenance

- Prepare v8.14.7

## [v8.14.6] - 2026-11-23

### Features

- Add a Spanish GitHub Pages landing page with direct links to the student ZIP, quick start, and example manual


### Documentation

- Link the student ZIP directly from both READMEs, offer ZIP and TGZ in the manual and download guides, and open the public guide and example PDFs inline


### Maintenance

- Prepare v8.14.6

## [v8.14.5] - 2026-11-23

### Build System

- Publish one ZIP and one TGZ to Dropbox under fixed filenames, updating them in place and removing obsolete versioned copies while retaining versioned local builds


### Maintenance

- Prepare v8.14.5

## [v8.14.4] - 2026-11-23

### Documentation

- Move the privacy notice next to the Overleaf upload, explain optional project preparation before chapter organisation, and sync both READMEs


### Build System

- Remove the -UAH suffix from student ZIP and TGZ filenames while keeping the 03- prefix; update any direct links or scripts that use the old names


### Maintenance

- Refresh the Spanish README introduction and shorten its examples, compendium instructions, and paperwork section

- Prepare v8.14.4

## [v8.14.3] - 2026-11-23

### Features

- Ship Windows, macOS, and Linux helpers to prepare a minimal book or restore the examples without Make, with confirmation and backups


### Bug Fixes

- Rebuild the student distribution's README PDF when its Markdown source changes


### Documentation

- Shorten the README quick start, link directly to the downloadable PDFs, and point terminal and Make users to numbered sections of the manual

- Explain how to launch the book preparation helper and recover its backup in the manual, and link to the full GIEC example

- Clarify which chapter and appendix sources to edit and make the ETSIT-UPM advisor note easier to find

- Move Zen Mode out of the Spanish README quick start, simplify setup instructions, and explain hidden backups

- Give the Spanish README one download step and separate first-build instructions for local editors and Overleaf

- Bring the English README in line with the Spanish guide for local and Overleaf builds, Zen Mode, and backup recovery


### Maintenance

- Prepare v8.14.3

## [v8.14.2] - 2026-11-20

### Bug Fixes

- Prevent glossary commands in a manual example caption from being repeated in the list of figures


### Documentation

- Explain how to find degree identifiers


### Maintenance

- List the University of Seville among the supported universities in the READMEs

- Prepare v8.14.2


### Other Changes

- Speed up degree-registry lookups by storing metadata in smaller per-degree records

## [v8.14.1] - 2026-11-20

### Bug Fixes

- Prevent the missing-comma warning in Anteproyecto Gantt charts without changing their layout


### Maintenance

- Prepare v8.14.1

## [v8.14.0] - 2026-11-20

### Features

- Add conventional and compendium PhD thesis support for ETSII-US

- Add bilingual MISCDG master's thesis covers for ETSII-US using the original Overleaf artwork

- Add bilingual covers for six ETSII-US undergraduate degrees and derive the submission month and year from the deposit date


### Bug Fixes

- Fix LuaLaTeX and XeLaTeX compilation by using engine-specific PDF compression settings


### Documentation

- Streamline Chapter 3, group degree-specific settings, and remove the preliminary label from the typesetting documentation


### Maintenance

- Prepare v8.14.0


### Other Changes

- Speed up manual compilation by precomputing the degree catalogue once for the release archives, public samples, and local appendix copies

## [v8.13.8] - 2026-11-16

### Bug Fixes

- Remove ineffective hyperref options

- Preserve footnote links and replace legacy page backgrounds


### Documentation

- Clarify historical release summaries


### Maintenance

- Prepare v8.13.8

## [v8.13.7] - 2026-11-16

### Bug Fixes

- Render tribunal-chair titles with gender agreement in UAH and URJC covers

- Keep reviewer, committee, and defense-date labels visible on UPM PhD credits pages when their values are blank


### Documentation

- Replace regulation-specific manual notes with a general reminder to check current rules


### Maintenance

- Prepare v8.13.7

## [v8.13.6] - 2026-11-15

### Features

- Added latexindent config to properly format tex files (focus on tikz)

- Added script for formatting tex and comparing pdf results


### Bug Fixes

- Centralize cotutor-presence checks and gender-aware labels across covers and paperwork

- Translate ETSII-URJC cover labels and omit the ETSIT-UPM academic-sponsor row when its name is blank


### Refactoring

- Reuse language and capitalization helpers across covers, lists, anteproyecto, and paperwork

- Reuse degree-registry values and shared labels on EIF-URJC TFG covers


### Maintenance

- Keep latexindent profiles with maintainer tools

- Prepare v8.13.6


### Other Changes

- Align English-title conditional comment

## [v8.13.5] - 2026-11-14

### Refactoring

- Simplify editable chapters to Spanish examples


### Maintenance

- Prepare v8.13.5

## [v8.13.4] - 2026-11-14

### Maintenance

- Adjust the background image and text placement on ETSII-UPM TFM covers

- Prepare v8.13.4

## [v8.13.3] - 2026-11-13

### Refactoring

- Keep separate advisor lines without a flag


### Maintenance

- Prepare v8.13.3

## [v8.13.2] - 2026-11-13

### Build System

- Avoid duplicate local glossary processing


### Maintenance

- Prepare v8.13.2

## [v8.13.1] - 2026-11-13

### Refactoring

- Reuse shared wording and degree values


### Maintenance

- Prepare v8.13.1

## [v8.13.0] - 2026-11-13

### Features

- Add three EIIA-UCLM TFG degrees and their four-page institutional covers

- Add standard and compendium doctoral-thesis support for ETSII-UPM

- Add ETSII-UPM cover and back-page support for three engineering TFGs

- Add dedicated ETSII-UPM TFM covers for MUII and MUIQ


### Bug Fixes

- Preserve configuration macro during flattening

- Validate language before selecting degree


### Documentation

- Clarify UAH paperwork scope


### Refactoring

- Reuse shared gender-aware tutor and director labels in UAH and URJC covers


### Maintenance

- Prepare v8.13.0


### Other Changes

- Emphasize Madrid year on doctoral covers

## [v8.12.1] - 2026-11-11

### Features

- Add UPM and ETSIST logo assets for institutional covers


### Maintenance

- Prepare v8.12.1

## [v8.12.0] - 2026-11-11

### Features

- Added sample support for bib style following ISO 690:2024 (commented out)

- Place Spanish and English summaries on one page

- Add one shared cover for four individual ETSIST-UPM final-degree projects


### Maintenance

- Prepare v8.12.0

## [v8.11.1] - 2026-11-06

### Maintenance

- Remove language conditionals from the compendium content entry points

- Prepare v8.11.1

## [v8.11.0] - 2026-11-06

### Features

- Include ethics appendix for all standard degrees


### Maintenance

- Prepare v8.11.0

## [v8.10.2] - 2026-11-06

### Features

- Add Zen mode to compile selected chapters without covers, lists, or front matter


### Bug Fixes

- Disable zen mode by default


### Documentation

- Explain how to select chapters while drafting in Zen mode

- Clarify optional-content section introduction


### Maintenance

- Prepare v8.10.0

- Prepare v8.10.1

- Prepare v8.10.2


### Other Changes

- Align compendium restoration formatting

## [v8.9.1] - 2026-10-31

### Features

- \myAcademicCotutor* variables renamed to \myCoTutor* for consistency

- Add the 2026 EPS-UAH TFG and TFM regulations and their source templates


### Bug Fixes

- Align TFG forms with October 2026 EPS-UAH regulations

- Update EPS-UAH TFG paperwork templates to the 2026 regulations

- Clarify signature names and roles

- Correct the cotutor variable spelling and its myconfig comment

- Resize checkboxes and clarify the commission decision in the EPS-UAH TFM proposal-control form


### Documentation

- Add v8.9.0 release notes


### Build System

- Skip bibliography processing when building TFG and TFM paperwork


### Refactoring

- Add regulation-annex numbers to TFG paperwork filenames


### Maintenance

- Prepare v8.9.0

- Reorganize acknowledgements and remove an outdated note

- Prepare v8.9.1


### Other Changes

- Increase spacing in the EPS-UAH open-publication authorization form

- Tighten spacing around publication-embargo choices

- Refine the EPS-UAH TFG tribunal-rubric layout

## [v8.8.6] - 2026-10-26

### Maintenance

- Clarify bibliography guidance and add an objectives-and-scope section to the anteproyecto

- Prepare v8.8.6

## [v8.8.5] - 2026-10-24

### Documentation

- Remove references to Prism, as they are discontinuing it in January 2027 :-(


### Maintenance

- Prepare v8.8.5

## [v8.8.4] - 2026-10-24

### Features

- Added latest TFM regulations approved at EPS-UAH


### Bug Fixes

- Use gender-aware external co-tutor wording in TFG agreements


### Documentation

- Update the regulation reference in the EPS-UAH TFM cooperation agreement


### Maintenance

- Prepare v8.8.4

## [v8.8.3] - 2026-10-23

### Bug Fixes

- Start figure and table captions at one


### Maintenance

- Prepare v8.8.3

## [v8.8.2] - 2026-10-21

### Documentation

- Group configuration guidance by purpose


### Maintenance

- Prepare v8.8.2

## [v8.8.1] - 2026-10-21

### Documentation

- Clarify local and browser setup workflows

- Use consistent Spanish wording for the terminal


### Maintenance

- Prepare v8.8.1

## [v8.8.0] - 2026-10-21

### Breaking Changes

- Register doctoral structures and school-specific degrees


### Bug Fixes

- Localize information sheets and remove dotted placeholders

- Correct UAH academic years and MUCTE date language

- Correct gendered advisor labels and balance the URJC cover layouts


### Maintenance

- Prepare v8.7.3

- Prepare v8.8.0

## [v8.7.2] - 2026-10-20

### Features

- Configure UAH agreement signatories and update TFM forms


### Bug Fixes

- Use regulation blue for MUIT and MUII bands

- Preserve manual illustrations when removing example figures


### Documentation

- Clarify glossary-tool requirements and installation options for beginners

- Add a guided beginner workflow and PDF rendering

- Replace the introduction with a guided beginner workflow

- Align beginner guidance and supporting documentation


### Maintenance

- Refine the closing guidance in the English and Spanish READMEs

- Prepare v8.7.2

## [v8.7.1] - 2026-10-16

### Bug Fixes

- Align MUIE with the shared EPS master layout


### Maintenance

- Prepare v8.7.1

## [v8.7.0] - 2026-10-16

### Features

- Add automatic chapter-level reference lists and an optional final bibliography

- Add an editorial-style UAH PhD example with chapter bibliographies


### Documentation

- Expand and organise reference entries by topic

- Add manuals for demonstrated LaTeX features

- Expand reference examples and reduce semicolon usage


### Maintenance

- Add publication years to the web references in biblio.bib

- Add source documents for UAH doctoral-school paperwork

- Prepare v8.7.0

## [v8.6.1] - 2026-10-16

### Bug Fixes

- Keep any padding page before a back cover blank


### Maintenance

- Prepare v8.6.1

## [v8.6.0] - 2026-10-16

### Features

- Support individual TFG workflows for ETSII-URJC degrees


### Bug Fixes

- Store the work department independently of tutor and cotutor affiliations


### Documentation

- Simplify supported-degree descriptions in the user manual


### Maintenance

- Back to default GIEC degree

- Prepare v8.6.0

## [v8.5.1] - 2026-10-15

### Bug Fixes

- Standardize paperwork clean and distclean targets without deleting PDFs


### Maintenance

- Reformat and organize the comments in Config/myconfig.tex

- Prepare v8.5.1

## [v8.5.0] - 2026-10-15

### Features

- Add EPS-UAH TFM proposal control form


### Refactoring

- Normalize EPS-UAH guide filenames


### Maintenance

- Remove redundant commit metadata from generated changelog entries

- Prepare v8.5.0

## [v8.4.2] - 2026-10-14

### Bug Fixes

- Correct María de Pedraza's sample surname in Config/myconfig.tex

- Improve spacing and alignment on UPM institutional information pages

- Complete example DNI values and document their meanings


### Maintenance

- Prepare v8.4.2

## [v8.4.1] - 2026-10-13

### Bug Fixes

- Hide font policies from public examples and user guidance


### Maintenance

- Prepare v8.4.1

## [v8.4.0] - 2026-10-13

### Features

- Include the ethical-aspects appendix for ETSIT-UPM degrees


### Maintenance

- Remove useless comment on dots usage

- Prepare v8.4.0

## [v8.3.1] - 2026-10-13

### Documentation

- List UAH examples before UPM and URJC


### Maintenance

- Prepare v8.3.1

## [v8.3.0] - 2026-10-13

### Features

- Add a distribution README with placeholders for degree and document details


### Maintenance

- Prepare v8.3.0

## [v8.2.0] - 2026-10-13

### Features

- Add a Spanish GISTS-UPM public example


### Documentation

- Clarify Spanish configuration guidance and hide legacy degrees


### Maintenance

- Prepare v8.2.0

## [v8.1.0] - 2026-10-12

### Features

- Remove superseded TFM regulations and source form templates

- Localize master degree names and thesis labels in English


### Bug Fixes

- Remove orange highlighting from ETSIT-UPM assessment headings


### Maintenance

- Prepare v8.1.0

## [v8.0.0] - 2026-10-12

### Breaking Changes

- Extend ETSIT-UPM TFG, TFM, and PhD support and separate supervisor affiliations


### Features

- Add the ETSIT-UPM crest to the doctoral cover resources


### Bug Fixes

- Allow PDF generation from an extracted distribution without Git

- Synchronize Dropbox publications in place

- Start the dedication and preliminary chapters on recto pages

- Recognize breaking Conventional Commit markers in changelog generation


### Documentation

- Align degree references and overview with ETSIT-UPM support


### Maintenance

- Prepare v8.0.0

## [v7.3.0] - 2026-10-09

### Breaking Changes

- Add filters for degree, university, work type, layout, language, structure, style, and font mode


### Features

- Provide EPS-UAH form guides in user distributions


### Bug Fixes

- Correct the GIEC link in the English and Spanish READMEs

- Include the Turnitin section for MUII documents

- Highlight unavailable paperwork fields with yellow N/D placeholders

- Distribute paperwork guides as PDFs without their editable TeX sources

- Simplify manual defaults and expose only editable settings


### Documentation

- Standardize headers across distributed template sources


### Refactoring

- Hide the advanced institutional font policy from standard myconfig and user guidance


### Maintenance

- Prepare v7.3.0

## [v7.2.3] - 2026-10-08

### Bug Fixes

- Validate the Dropbox destination before generating distribution files


### Documentation

- Focus getting started on the basic workflow

- Simplify the English README while keeping it aligned with the Spanish version

- Regenerate v7.2.3 release notes


### Build System

- Use distinct filenames for the typesetting comparison and guide PDFs


### Maintenance

- Prepare v7.2.2

- Prepare v7.2.3

## [v7.2.1] - 2026-10-08

### Bug Fixes

- Stabilize indexing of Spanish Roman page numbers


### Maintenance

- Update the changelog-generation instructions

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

- Correct punctuation in the README

- Hyphenate the title in the generated README PDF

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

- Replace the generic TFM tutor-approval form with an EPS-UAH version for MUIE, MUIT, and MUII

- Add the EPS-UAH TFM Annex V form for requesting a change to the assigned thesis

- Add the EPS-UAH TFM defense record and tribunal rubric

- Update TFG paperwork forms and build targets for UAH and EPS-UAH

- Align UAH and EPS-UAH TFG reports and publication-authorization forms

- Add the 2026 UAH and EPS-UAH TFG/TFM regulations and source templates

- New paperwork docs for TFGs at EPS-UAH

- Generate confidentiality forms for all TFG evaluators

- Add and revise cooperation and open-publication forms for EPS-UAH TFGs and TFMs

- Use consistent Makefile build targets for TFG and TFM paperwork

- Organize PhD paperwork by topic and add Makefile generation targets

- Reformat UAH doctoral forms and update the PapeleoPHD build rules

- Add shared page-layout helpers for UAH doctoral forms

- Updating to release v7.0.0


### Bug Fixes

- Unify entry styling across the table of contents and generated lists

- Remove remaining framed TOC leaders

- Fix a case-sensitive grade-calculation macro reference in the TFM forms


### Documentation

- Explain automatic grammatical-gender and number agreement in paperwork


### Maintenance

- Refresh access dates for bibliography web references

- Now referencing TFG-GIEC-spanish.pdf

- Update sample academic and defense dates in Config/myconfig.tex

- Increase the title size in the TFM open-publication authorization form

- Renamed form to state it applies to TFM at EPS-UAH

- Improve the layout of the TFM extension-request form

- Move unused solicitud.tex to deprecated

- Align EPS-UAH TFM covers with the updated regulation format

- Refine the tables and spacing in the EPS-UAH TFM defense record

- Fix overlapping cell text and remove a duplicate title in the TFM defense form

- Removed old files for TFM regulations

- Add initial UAH doctoral paperwork templates and record remaining TODOs

- Improving documentation

- Removing distribution of PapeleoPhD

- Remove the obsolete doctoral research-stay project-form template

## [v6.0.0] - 2026-10-02

### Features

- Add maintainer distribution workflow

- Ignoring new files

- Add ITI degree support for URJC

- Add maintainer distribution workflow

- Register and document new UAH Faculty of Sciences degrees

- Add a PhD thesis-by-compendium structure and publication-inclusion helper

- Unify standard and compendium book entry points

- Require a PhD program when compendium structure is selected

- Softened description of bare start

- Separate editable standard/compendium content files and add optional-content flags

- Add standard/compendium suffixes to generated PhD PDF filenames

- Generate Spanish and English PhD PDFs for both document structures

- Reformat the language-dependent part titles in the compendium content file

- Cleaned repo structure and redesigned distrib building

- Preserve the bare sample figure and remove only optional content when creating bare chapters

- Remove the Perl dependency from the Anteproyecto latexdiff target and refine bare-chapter cleanup

- Add figure, table, equation, and acronym examples to the bare introduction


### Bug Fixes

- Back to default GIEC

- Report PDF generation failures

- Preserve RELEASE.txt metadata during book builds

- Exclude regulations and source templates from distribution archives

- Restore latexmk builds and document graphical Git setup

- Fixed missing bib entries in anteproyecto.tex sample

- Add missing Config dependencies to sync-git-sources

- Correct the file-type predicate in the Book Makefile search command


### Documentation

- Explain how to add degrees and universities

- Simplify degree selection guidance

- Document how profiles behave with one, two, or more cover/back-page files

- Explain that sync-git-sources requires an existing Git repository

- Cross-reference compendium from standard workflows


### Refactoring

- Centralize degree configuration

- Resolve university and school details from the degree registry

- Organize university logos and institutional branding assets

- Present standard book structure first

- Split generated lists into dedicated cover files

- Keep prepared bare and original content files beside their chapter sources

- Avoid redundant LaTeX rebuilds when inputs have not changed


### Maintenance

- Refine acknowledgement wording and contributor credits

- Adding ignored paths

- Move unused resources into Deprecated while preserving their directory structure

- Add sample tribunal names and corresponding example DNI values

- Adjust the scaling of included publication PDFs in compendium theses

- Explain the standard and compendium content branches in book.tex

- Prioritize the standard structure in book.tex before the compendium branch

- Group myconfig variables by configuration purpose

- Set the configurable output directory in the PDF-generation script

- Prepare v6.0.0 release

- Merge devel into master

- Remove the obsolete first-commit helper scripts

- Removed README.md from mandatory distrib files

- Fix the Dropbox example-PDF link and exclude pre-Bologna degrees from generation

## [v5.0.0a] - 2026-09-16

### Features

- Describe the repository's top-level directory structure

- Clarify the main book workflow

- Explain how to replace the sample book content with thesis chapters

- Clarify Makefile as an optional build path in the README

- Add a ready-to-copy minimal book structure for new thesis projects

- Derive Git synchronization inputs from LaTeX dependency analysis


### Bug Fixes

- Correct paperwork folder paths in the README

- Remove unsupported BibTeX setup instructions from the README

- Focus bibliography setup guidance on Biber

- Correct the Overleaf template download link

- Stop generating low-quality screen-version PDFs

- Refresh repository overview metadata

- Use a unique label for the video links section

- Use consistent latexmk-based build targets for paperwork Makefiles


### Documentation

- Update the manual introduction and repository-structure guidance

- Modernize the compilation instructions

- Document the generated book structure and its included sections

- Document general and author metadata variables in myconfig.tex

- Document academic and assessment variables in myconfig.tex

- Complete the manual's reference for shared configuration variables

- Update project and paperwork guidance

- Update revision and troubleshooting guidance in the manual

- Refresh the manual's examples of LaTeX elements and utilities

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

- Prioritize editor-based compilation in the README

- Add explicit cross-references to the introduction chapter

- Move optional tools and targets into advanced Makefile guidance

- Clarify which document elements require editing

- Distinguish basic and advanced Makefile targets

- Align guidance with the reorganized template

- Expand template examples and citation guidance

- Promote template utilities to a dedicated chapter

- Categorize custom command examples

- Clarify the document structure chapter

- Add numbered chapter introductions and summaries to the manual

- Add Overleaf guidance and refine README structure

- Reorganize and format bibliography examples in biblio.bib

- Streamline README navigation and bibliography guidance

- Credit AI assistance in the acknowledgements

- Refine advanced composition examples

- Explain how to start from the minimal structure

- Introduce the anteproyecto workflow in the first-steps chapter


### Refactoring

- Reorganize the example document as a tutorial

- Rebalance the tutorial chapters and LaTeX-example appendix

- Split the template guide into focused chapters

- Include chapter files directly from book.tex instead of an intermediate contents file


### Maintenance

- Add options to generate selected degree and document combinations

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

- Correct the sample name of the MUANDB degree


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

- Apply the new UAH logos to supported covers and add the EPS TFM cover draft


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

- Update sample DNI values and their explanations

- Update sample DNI values and their explanations

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

- Render evaluation-committee role labels with gender agreement on TFG/TFM covers

- Removed vspace (should not be used)

- Too long committee name

- Render the standard UAH TFM cover correctly in Spanish and English


### Maintenance

- Improve the TFG tutor rubric and document its use in the HOWTO

- Refine the layout of the UAH TFG tutor report and rubric

- Clarify myconfig settings, figure placement, and editing guidance in the HOWTO

- Consolidate shared preamble and postamble settings and remove obsolete request-form configurations


### Other Changes

- Add the MUANBD master's identifier and simplify shared cover and request-form configuration

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

- Update the introduction to match the reorganized paperwork folders


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

- Add MUC support and update cover/back-page selection for UAH master's degrees


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

- Correct figure numbering in the anteproyecto


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

- Update sample dates to reflect the February 2025 template revision

- Added variables for TFG defense grades

- General Makefile for TFG paperwork

- Align the signature fields in the TFG open-publication authorization

- Add configurable criteria and scoring rows for the TFG rubric

- Separate the TFG tutor rubric from the tribunal rubric configuration

- Added gender management in new documents

- Hyphenation no longer applied

- New tribunal rubrica done!

- Setting up new TFM directory

- Setting up new TFM directory

- Align the introduction and README with the expanded paperwork support


### Bug Fixes

- Fix duplicate list-of-figures counter setup in the TFG request form

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

- Clarify the README workflow and remove generated PDFs from version control

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

- Generate Spanish examples before English ones and copy generated PDFs to the Dropbox folder

## [v3.1.5] - 2023-06-29

### Other Changes

- Fixed long time issue with multiple languages support

- Videos changed

## [v3.1.4] - 2023-06-28

### Other Changes

- Now using Makefile to compile README.md

- Fixing typo

- Refresh macOS acronym guidance and reorganize the example document-structure list

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

- Add a generated list of videos and a video-link example to the manual

- Set the default publication embargo to zero months

- Now ignoring new .vdo aux file

- Avoid redefining the feminine director label in UAH covers

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

- Add the MUCTE TFM cover and refine README PDF generation

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

- Clarify the initial download and compilation instructions in the README

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

- Remove the unused sample budget file

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

- Clarify how to add bibliography files without editing the shared preamble

- Clarify how to add bibliography files without editing the shared preamble

- Clarify how to add bibliography files without editing the shared preamble

- Clarify how to add bibliography files without editing the shared preamble

- Added proper make clean commands

- Biblatex back to being the preferred bib system

- Config-anteproyecto.tex now handles bibliography correctly (as main book)

- New file with info on biblio related changes

- Remove the obsolete budget chapter from the example and bare structures

## [v2.0.4, v2.0.5] - 2022-01-13

### Other Changes

- Added Config/worktypes.txt, required in compilation

- Fixed uppercase DE in document title

- Fixed uppercase DE in document title

- Created new variable for solicitudTFGTFM.tex to account for the required co-advisor signature

- Created new variable for solicitudTFGTFM.tex to account for the required co-advisor signature

- Making explicit the effect of using \ac{} a second time in conclusiones.tex

- Adding TeX-master variable in introduction.tex

- Reindent the UAH TFG back-cover layout

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

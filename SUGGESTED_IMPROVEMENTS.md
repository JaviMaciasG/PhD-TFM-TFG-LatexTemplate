# Suggested improvements

## Reducing complexity for users

1. **Separate essential and advanced configuration — Improvement; complexity: medium; priority: high.** Keep the variables most users must edit in `myconfig.tex` and move paperwork-specific, institutional, visual and deprecated settings into clearly identified secondary files. Evidence: `myconfig.tex` contains personal data, tribunal members, grades, paperwork dates, publication settings, link colours, research-report settings and deprecated compatibility commands in one file.

2. **Mark variables as required, optional or document-specific — Improvement; complexity: low; priority: high.** Make it immediately clear which values every user must supply and which matter only for a particular degree or form. Evidence: the configuration is grouped thematically, but variables for the main book, anteproyecto, foreign-advisor forms, evaluation forms and research reports are presented together without a consistent requirement classification.

3. **Add explicit configuration validation — New; complexity: medium; priority: high.** Detect unsupported degrees, invalid language or gender values, missing required names and inconsistent options, and report the precise variable that must be corrected. Evidence: no `\PackageError`, equivalent validation mechanism or clear unsupported-value diagnostic is currently present in the active TeX configuration.

4. **Improve the rendering of every empty optional field — Improvement; complexity: medium; priority: medium.** Audit covers and forms so that optional data are omitted cleanly, including their labels and surrounding text. Evidence: cotutors are handled conditionally in many files, but the PHD form assumes two directors, while fields such as specialty, telephone and tribunal members may still render as blank labelled fields.

5. **Provide `make help` consistently — Improvement; complexity: low; priority: high.** Add discoverable help to the top-level, `Book/` and `Anteproyecto/` Makefiles, using the same style already present in the three `Papeleo*/` Makefiles. Evidence: only the newly modernised paperwork Makefiles currently implement a `help` target.

6. **Reduce the default package load — Improvement; complexity: high; priority: medium.** Load specialised functionality only when needed, especially packages for Gantt charts, source listings, diagrams, review notes, advanced algorithms and bibliography processing. Evidence: `Config/preamble.tex` loads many specialised packages unconditionally, and even a two-page administrative request currently loads most of the book infrastructure and BibLaTeX.

7. **Offer a lightweight first-compilation mode — New; complexity: medium; priority: medium.** Provide a target or entry document that verifies the installation without compiling the complete example manual, bibliography and optional lists. Evidence: the documented first step compiles the full manual, and the documentation warns that this example may exceed Overleaf compilation limits.

8. **Clean up ambiguous user-facing filenames — Improvement; complexity: low; priority: medium.** Rename files such as `PapeleoTFM/solicitud.tex` to describe the document explicitly and remove obsolete companions such as `PapeleoTFM/Makefile-solicitud`. Evidence: the current generic name does not identify the type of request, and the old alternative Makefile remains alongside the maintained one.

9. **Provide a separately downloadable minimal distribution — New; complexity: medium; priority: low.** Package `book-bare.tex`, the bare chapters, configuration and required assets as a ready-to-use archive, while retaining the complete manual distribution. Evidence: the minimal structure exists, but users still have to transform the complete distribution manually or through Make.

## Reducing complexity for maintainers

1. **Create one authoritative degree registry — Improvement; complexity: high; priority: high.** Store each supported identifier, work type, institution, languages, cover and back-page selection in one structured source. Evidence: degree lists are duplicated in `myconfig.tex`, `worktypes.txt`, `postamble.tex`, cover selectors, documentation and `go.gen-all-pdfs.sh`; the script even contains several successive assignments to `DEGREES_ENG_SPA`.

2. **Share common Makefile definitions — Improvement; complexity: medium; priority: high.** Extract compiler flags, auxiliary-file cleanup and standard targets into a common included Makefile. Evidence: the three paperwork Makefiles now use nearly identical compilation and cleaning recipes, while `Book/` and `Anteproyecto/` retain separate older implementations of similar targets.

3. **Add automated compilation checks — New; complexity: high; priority: high.** Compile representative TFG, TFM and PhD documents, the manual, bare document, anteproyecto and paperwork after each relevant change. Evidence: no active GitHub Actions or other CI configuration is present; the only related active script is the older `AdminScripts/go.check-files.sh`.

4. **Validate the complete degree/language matrix automatically — New; complexity: high; priority: high.** Check that every declared degree selects valid covers, back pages and work-type text in Spanish and English. Evidence: `go.gen-all-pdfs.sh` contains a manually maintained degree list, but there is no automated assertion that it agrees with the active TeX conditionals or documentation.

5. **Move deprecated material out of the normal source tree — Improvement; complexity: medium; priority: medium.** Preserve it in a historical branch, tag or separate archive instead of maintaining it beside active sources. Evidence: `Deprecated/` contains old configuration files, paperwork, copied packages, generated PDF, DVI, AUX and LOG files, and complete third-party package trees.

6. **Remove duplicated source snapshots and obsolete generated files — Improvement; complexity: medium; priority: medium.** Replace permanent `orig/` copies and historical build products with Git history or deliberately generated backups. Evidence: the repository tracks parallel chapter and appendix trees under `orig/`, old PDFs and auxiliary files, while Git already preserves every committed version.

7. **Retire or isolate obsolete maintenance scripts — Improvement; complexity: low; priority: medium.** Separate current release tools from CVS migration scripts, hard-coded personal deployment scripts and alternative implementations retained only for possible future use. Evidence: `AdminScripts/` still contains CVS migration utilities, a script with a personal Dropbox destination, two first-commit scripts and both Bash and Python source-synchronisation implementations.

8. **Break up the shared TeX infrastructure by responsibility — Improvement; complexity: high; priority: medium.** Separate core packages, language handling, document metadata, bibliography, utility commands and specialised features behind a small stable interface. Evidence: `preamble.tex` and `postamble.tex` combine packages and behaviour for the book, anteproyecto and paperwork, making a change for one document capable of affecting all of them.

9. **Generate repeated support documentation from metadata — New; complexity: medium; priority: medium.** Generate the supported-degree list and possibly cover-routing documentation from the proposed authoritative registry. Evidence: the same degree information is currently maintained manually in `myconfig.tex`, the manual, scripts and mapping files.

10. **Introduce a reproducible release check — New; complexity: medium; priority: medium.** Add one target that validates builds, checks documentation consistency, generates distributions and reports readiness for tagging without creating or pushing the tag. Evidence: release-related information is split between top-level and `Book/` `RELEASE.txt` files, distribution scripts and manual procedures, with no single validation entry point.

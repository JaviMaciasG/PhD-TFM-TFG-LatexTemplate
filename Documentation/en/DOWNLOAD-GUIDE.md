---
title: "Download guide for the PhD-TFM-TFG LaTeX Template"
author: "Javier Macías-Guarasa"
---

# What should I download?

If you want to start a new document, download the current ZIP or TGZ archive. Both archives contain the same template. ZIP is normally the most convenient option for Windows, macOS and `Overleaf`, while TGZ may be more convenient on GNU/Linux. The `RELEASE.txt` file identifies the published template version.

If you want to inspect the result before downloading the template, start with `TFG-GIEC-spanish.pdf`. It uses the default structure and appearance, and its first chapters constitute the complete user manual.

The remaining PDFs are deliberately selected examples rather than one generated document for every supported degree. Together they demonstrate both languages, the supported document structures, the alternative typesetting styles, URJC and ETSIT-UPM support, and the distinct MUIE, MUCTE and MUC cover designs. The absence of a dedicated PDF for a degree does not mean that the degree is unsupported; consult `Config/myconfig.tex` and the manual for the complete list of identifiers.

# Template archives and release information

- `03-PhDTFMTFG-LaTeX-Template-UAH-<release>.zip`: complete user template in ZIP format.
- `03-PhDTFMTFG-LaTeX-Template-UAH-<release>.tgz`: the same template in compressed TAR format.
- `RELEASE.txt`: exact release identifier used to create the archives and examples.
- `00-README.pdf`: rendered project introduction and quick-start information.
- `01-DOWNLOAD-GUIDE.pdf`: this guide, provided in a format that can be opened directly from Dropbox.
- `02-TYPESETTING-STYLES-COMPARISON.pdf`: a bilingual visual comparison of every available typesetting style, using the same representative pages for each one.

Each ZIP or TGZ archive also contains `04-TYPESETTING-STYLES-GUIDE.pdf` in its root directory. That document is the complete usage and reference guide for configuring the preliminary typesetting styles; it is different from the visual comparison file `02-TYPESETTING-STYLES-COMPARISON.pdf` provided alongside the archives.

After downloading an archive, extract or upload it, compile `Book/book.tex` once without modifying it, and use the resulting manual to check your installation and learn the normal workflow.

# Complete example documents

- **`TFG-GIEC-spanish.pdf`**: UAH GIEC bachelor final project. Spanish; standard content structure; `standard` typesetting.
- **`TFM-MUIE-spanish-modern.pdf`**: UAH MUIE master final project. Spanish; standard content structure; `modern` typesetting. Uses the same cover and back-page layout as MUIT and MUII.
- **`TFM-MUCTE-english-framed.pdf`**: UAH MUCTE master final project. English; standard content structure; `framed` typesetting.
- **`TFM-MUC-spanish-shaded.pdf`**: UAH MUC master final project. Spanish; standard content structure; `shaded` typesetting.
- **`PhD-PHDUAH-english-conventional-mimosis.pdf`**: Conventional UAH doctoral thesis. English; standard content structure; `mimosis` typesetting.
- **`PhD-PHDUAH-spanish-conventional-chapterbib-editorial.pdf`**: Conventional UAH doctoral thesis. Spanish; standard content structure; `editorial` typesetting. Includes per-chapter bibliographies with local numbering and a general bibliography with independent numbering.
- **`PhD-PHDUAH-spanish-compendium-standard.pdf`**: UAH doctoral thesis by compendium of publications. Spanish; compendium structure; `standard` typesetting.
- **`TFG-GISTS-ETSIT-UPM-spanish.pdf`**: ETSIT-UPM GISTS bachelor final project. Spanish; standard content structure; `standard` typesetting. Shows the orange cover and back page, the assessment page without highlighted headings, and the ethical-aspects appendix.
- **`TFG-GII-ETSII-URJC-english-editorial.pdf`**: ETSII-URJC Computer Engineering bachelor final project. English; standard content structure; `editorial` typesetting.

All five alternative typesetting styles are represented. The `editorial` style appears in the URJC example and the thesis with per-chapter bibliographies. The default `standard` style appears in the main GIEC example, the GISTS-ETSIT-UPM example and the compendium example, so that institutional and structural differences can be assessed without an additional visual variation.

# Understanding the variations

The `standard` content structure is appropriate for TFGs, TFMs and conventional doctoral theses. The `compendium` structure is a specialized alternative for doctoral theses presented as a compendium of publications.

The typesetting style controls the document fonts, chapter and section headings, table of contents and running headers. By default, covers retain their institutional fonts without any additional configuration.

Open `02-TYPESETTING-STYLES-COMPARISON.pdf` for a direct comparison of the styles without having to move between the complete example documents. It repeats the same table of contents, chapter opening, ordinary page with equations and long chapter title for every registered style. The active style name appears in the upper-right corner of each sample page.

Every example is a complete document, so you can inspect the covers, front matter, manual chapters, bibliography, appendices and back page. These PDFs are demonstrations, not degree-specific regulations; always check the current requirements of your institution before submitting your work.

# Choosing an example

- Start with `TFG-GIEC-spanish.pdf` if you want to understand the normal workflow or simply verify the default appearance.
- Compare the MUIE, MUCTE and MUC examples when you need to inspect their different master cover sequences.
- Use the conventional PHDUAH example for an ordinary doctoral thesis and the compendium example only when your thesis is formally presented as a compendium of publications.
- Open `PhD-PHDUAH-spanish-conventional-chapterbib-editorial.pdf` to inspect the bibliographies at the end of each chapter and compare them with the general bibliography. Citations link to the entries in the corresponding chapter.
- Use the GISTS-ETSIT-UPM example to inspect the shared ETSIT-UPM opening-page layout used by GISTS, GIB and several supported master degrees, together with the ethical-aspects appendix.
- Use the GII-ETSII-URJC example if you are working at URJC or want to see how institutional support changes without changing the document workflow.

The visual styles are distributed across these documents to avoid publishing every possible combination. Any supported document can select any available style through `Config/myconfig.tex`; the pairings in this folder are examples, not restrictions.

# Keeping the files together

Keep `RELEASE.txt`, the selected example PDFs and the ZIP/TGZ archives from the same publication together. If their release identifiers or publication dates differ, download the current set again before using an example to evaluate the template.

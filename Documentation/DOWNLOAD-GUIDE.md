---
title: "Download guide for the PhD-TFM-TFG LaTeX Template"
author: "Javier Macías-Guarasa"
---

# What should I download?

If you want to start a new document, download the current ZIP or TGZ archive. Both archives contain the same template; ZIP is normally the most convenient option for Windows, macOS and Overleaf, while TGZ may be more convenient on GNU/Linux. The `RELEASE.txt` file identifies the published template version.

If you want to inspect the result before downloading the template, start with `TFG-GIEC-spanish.pdf`. It uses the default structure and appearance, and its first chapters constitute the complete user manual.

The remaining PDFs are deliberately selected examples rather than one generated document for every supported degree. Together they demonstrate both languages, the supported document structures, the alternative typesetting styles, both institutional-page font policies, URJC support, and the distinct MUIE, MUCTE and MUC cover designs. The absence of a dedicated PDF for a degree does not mean that the degree is unsupported; consult `Config/myconfig.tex` and the manual for the complete list of identifiers.

# Template archives and release information

- `03-PhDTFMTFG-LaTeX-Template-UAH-<release>.zip`: complete user template in ZIP format.
- `03-PhDTFMTFG-LaTeX-Template-UAH-<release>.tgz`: the same template in compressed TAR format.
- `RELEASE.txt`: exact release identifier used to create the archives and examples.
- `00-README.pdf`: rendered project introduction and quick-start information.
- `01-DOWNLOAD-GUIDE.pdf`: this guide, provided in a format that can be opened directly from Dropbox.
- `02-TYPESETTING-STYLES.pdf`: a bilingual visual comparison of every available typesetting style, using the same representative pages for each one.

Each ZIP or TGZ archive also contains `TYPESETTING-STYLES-GUIDE.pdf` in its root directory. That document is the complete usage and reference guide for configuring the preliminary typesetting styles; it is different from the visual comparison file `02-TYPESETTING-STYLES.pdf` provided alongside the archives.

After downloading an archive, extract or upload it, compile `Book/book.tex` once without modifying it, and use the resulting manual to check your installation and learn the normal workflow.

# Complete example documents

- **`TFG-GIEC-spanish.pdf`**: UAH GIEC bachelor final project. Spanish; standard content structure; `standard` typesetting; `institutional` page fonts.
- **`TFG-ITIURJC-english-editorial-document-fonts.pdf`**: URJC ITI bachelor final project. English; standard content structure; `editorial` typesetting; `document` page fonts.
- **`TFM-MUIE-spanish-modern-institutional-fonts.pdf`**: UAH MUIE master final project. Spanish; standard content structure; `modern` typesetting; `institutional` page fonts.
- **`TFM-MUCTE-english-framed-document-fonts.pdf`**: UAH MUCTE master final project. English; standard content structure; `framed` typesetting; `document` page fonts.
- **`TFM-MUC-spanish-shaded-institutional-fonts.pdf`**: UAH MUC master final project. Spanish; standard content structure; `shaded` typesetting; `institutional` page fonts.
- **`PhD-PHDUAH-english-conventional-mimosis-document-fonts.pdf`**: Conventional UAH doctoral thesis. English; standard content structure; `mimosis` typesetting; `document` page fonts.
- **`PhD-PHDUAH-spanish-compendium-standard-institutional-fonts.pdf`**: UAH doctoral thesis by compendium of publications. Spanish; compendium structure; `standard` typesetting; `institutional` page fonts.

The five alternative typesetting styles appear exactly once. The default `standard` style appears in the main GIEC example and again in the compendium example so that the specialized structure can be assessed without an additional visual variation.

# Understanding the variations

The `standard` content structure is appropriate for TFGs, TFMs and conventional doctoral theses. The `compendium` structure is a specialized alternative for doctoral theses presented as a compendium of publications.

The typesetting style controls the document fonts, chapter and section headings, table of contents and running headers. The `institutional` font policy preserves the original fonts on institutional pages such as covers and back pages, whereas `document` lets those pages inherit the selected document fonts. Neither choice changes the institutional logos, wording or page layout.

Open `02-TYPESETTING-STYLES.pdf` for a direct comparison of the styles without having to move between the complete example documents. It repeats the same table of contents, chapter opening, ordinary page with equations and long chapter title for every registered style. The active style name appears in the upper-right corner of each sample page.

Every example is a complete document, so you can inspect the covers, front matter, manual chapters, bibliography, appendices and back page. These PDFs are demonstrations, not degree-specific regulations; always check the current requirements of your institution before submitting your work.

# Choosing an example

- Start with `TFG-GIEC-spanish.pdf` if you want to understand the normal workflow or simply verify the default appearance.
- Use the ITIURJC example if you are working at URJC or want to see how institutional support changes without changing the document workflow.
- Compare the MUIE, MUCTE and MUC examples when you need to inspect their different master cover sequences.
- Use the conventional PHDUAH example for an ordinary doctoral thesis and the compendium example only when your thesis is formally presented as a compendium of publications.

The visual styles are distributed across these documents to avoid publishing every possible combination. Any supported document can select any available style and either institutional-page font policy through `Config/myconfig.tex`; the pairings in this folder are examples, not restrictions.

# Keeping the files together

Keep `RELEASE.txt`, the selected example PDFs and the ZIP/TGZ archives from the same publication together. If their release identifiers or publication dates differ, download the current set again before using an example to evaluate the template.

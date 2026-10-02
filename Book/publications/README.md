# Publications included in a thesis by compendium

Place the final PDF of each publication in this directory. Use the publisher's or conference's definitive PDF when its reuse conditions permit it, and verify the current doctoral-program requirements and copyright permissions before submitting the thesis.

Declare each publication in `Book/content-compendium.tex` with `\includecompendiumpublication`. The command is defined in `Config/preamble.tex`. It creates a numbered introductory chapter, prints the BibLaTeX reference associated with the supplied citation key, adds any optional LaTeX-formatted information, and includes every page of the PDF at the configured scale with the abbreviated title and thesis page number in the running header.

The distributed `paper1.pdf`, `paper2.pdf` and `paper3.pdf` files are fictional two-page examples. Replace their declarations and PDFs with the student's actual publications.

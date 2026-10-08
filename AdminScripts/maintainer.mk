DROPBOX_DISTRIBUTION_DIR ?= $(HOME)/Dropbox/PhDTFMTFG-LaTeX-Template

.PHONY: distrib public-samples publish-dropbox

01-DOWNLOAD-GUIDE.pdf: Documentation/es/DOWNLOAD-GUIDE.md
	pandoc Documentation/es/DOWNLOAD-GUIDE.md -t pdf -o 01-DOWNLOAD-GUIDE.pdf --variable urlcolor=blue --number-sections --highlight-style kate -V colorlinks -V papersize:a4 -V geometry:"top=2cm, bottom=1.5cm, left=2cm, right=2cm"

TYPESETTING-STYLES-GUIDE.pdf: Documentation/es/TYPESETTING-STYLES-GUIDE.md
	pandoc Documentation/es/TYPESETTING-STYLES-GUIDE.md -t pdf -o TYPESETTING-STYLES-GUIDE.pdf --variable urlcolor=blue --highlight-style kate -V colorlinks -V papersize:a4 -V geometry:"top=2cm, bottom=1.5cm, left=2cm, right=2cm"

distrib:
	@command -v pymupdf >/dev/null 2>&1 || { echo "ERROR: pymupdf is required to generate the distribution; install or enable it in PATH first." >&2; exit 1; }
	$(MAKE) 00-README.pdf TYPESETTING-STYLES-GUIDE.pdf
	@bash AdminScripts/go.build-distribution.sh

public-samples:
	@bash AdminScripts/go.gen-public-sample-pdfs.sh

publish-dropbox: distrib
	@bash AdminScripts/go.gen-public-sample-pdfs.sh \
		--destination "$(DROPBOX_DISTRIBUTION_DIR)" \
		--include-distribution

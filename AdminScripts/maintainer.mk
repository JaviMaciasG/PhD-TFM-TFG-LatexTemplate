DROPBOX_DISTRIBUTION_DIR ?= $(HOME)/Dropbox/PhDTFMTFG-LaTeX-Template

.PHONY: distrib public-samples publish-dropbox

01-DOWNLOAD-GUIDE.pdf: DOWNLOAD-GUIDE.md
	pandoc DOWNLOAD-GUIDE.md -t pdf -o 01-DOWNLOAD-GUIDE.pdf --variable urlcolor=blue --number-sections --highlight-style kate -V colorlinks -V papersize:a4 -V geometry:"top=2cm, bottom=1.5cm, left=2cm, right=2cm"

TYPESETTING-STYLES-GUIDE.pdf: TYPESETTING-STYLES-GUIDE.md
	pandoc TYPESETTING-STYLES-GUIDE.md -t pdf -o TYPESETTING-STYLES-GUIDE.pdf --variable urlcolor=blue --highlight-style kate -V colorlinks -V papersize:a4 -V geometry:"top=2cm, bottom=1.5cm, left=2cm, right=2cm"

distrib: 00-README.pdf TYPESETTING-STYLES-GUIDE.pdf
	@bash AdminScripts/go.build-distribution.sh

public-samples:
	@bash AdminScripts/go.gen-public-sample-pdfs.sh

publish-dropbox: distrib
	@bash AdminScripts/go.gen-public-sample-pdfs.sh \
		--destination "$(DROPBOX_DISTRIBUTION_DIR)" \
		--include-distribution

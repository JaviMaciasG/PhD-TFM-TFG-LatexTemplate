.DEFAULT_GOAL := pdfs
.PHONY: all pdfs changelog style-comparison paperwork-guides

all: pdfs

pdfs: ../README.pdf style-comparison paperwork-guides

paperwork-guides:
	$(MAKE) -C ../PapeleoTFG guia
	$(MAKE) -C ../PapeleoTFM guia

../README.pdf:
	$(MAKE) -C .. README.pdf

style-comparison:
	@if [ -f ../Book/public-samples/02-TYPESETTING-STYLES-COMPARISON.pdf ]; then \
		cp -p ../Book/public-samples/02-TYPESETTING-STYLES-COMPARISON.pdf ../TYPESETTING-STYLES-COMPARISON.pdf; \
	else \
		bash ../AdminScripts/build-book-style-comparisons.sh --output ../TYPESETTING-STYLES-COMPARISON.pdf --language spanish; \
	fi

changelog:
	bash ./generate-changelog.sh

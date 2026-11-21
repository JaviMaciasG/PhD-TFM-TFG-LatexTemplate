.DEFAULT_GOAL := pdfs
.PHONY: all pdfs changelog style-comparison paperwork-guides ../README.pdf

all: pdfs

pdfs: ../README.pdf style-comparison paperwork-guides

paperwork-guides:
	$(MAKE) -C ../PapeleoTFG guia
	$(MAKE) -C ../PapeleoTFM guia

# Always delegate the freshness check to the root Makefile, which knows
# about the Markdown, metadata and image dependencies.
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

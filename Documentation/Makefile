.DEFAULT_GOAL := pdfs
.PHONY: all pdfs changelog style-comparison

all: pdfs

pdfs: ../README.pdf style-comparison

../README.pdf:
	$(MAKE) -C .. README.pdf

style-comparison:
	@if [ -f ../Book/public-samples/02-TYPESETTING-STYLES.pdf ]; then \
		cp -p ../Book/public-samples/02-TYPESETTING-STYLES.pdf ../TYPESETTING-STYLES.pdf; \
	else \
		bash ../AdminScripts/build-book-style-comparisons.sh --output ../TYPESETTING-STYLES.pdf --language spanish; \
	fi

changelog:
	bash ./generate-changelog.sh

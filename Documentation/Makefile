PANDOC_OPTIONS = --variable urlcolor=blue --number-sections --highlight-style kate -V colorlinks -V papersize:a4 -V geometry:"top=2cm, bottom=1.5cm, left=2cm, right=2cm"

EN_SOURCES := $(wildcard en/*.md)
ES_SOURCES := $(wildcard es/*.md)
EN_PDFS := $(patsubst en/%.md,../%-en.pdf,$(EN_SOURCES))
ES_PDFS := $(patsubst es/%.md,../%-es.pdf,$(ES_SOURCES))
.DEFAULT_GOAL := pdfs
.PHONY: all pdfs changelog

all: pdfs

pdfs: $(EN_PDFS) $(ES_PDFS)

../%-en.pdf: en/%.md
	pandoc $< -t pdf -o $@ --metadata lang=en $(PANDOC_OPTIONS)

../%-es.pdf: es/%.md
	pandoc $< -t pdf -o $@ --metadata lang=es $(PANDOC_OPTIONS)

changelog:
	bash ./generate-changelog.sh

PDFLATEX ?= pdflatex
LATEXFLAGS ?= -interaction=nonstopmode -halt-on-error -file-line-error

DOCUMENT := PHD-VistoBuenoTutorTesis
PDF := $(DOCUMENT).pdf
COMMON_DEPS := \
	../Book/logos/logoUAH.jpg \
	../Config/myconfig.tex \
	../Config/postamble.tex \
	../Config/preamble.tex

.DEFAULT_GOAL := all

.PHONY: all clean cleanall help

all: $(PDF)

$(PDF): $(COMMON_DEPS)

%.pdf: %.tex
	$(PDFLATEX) $(LATEXFLAGS) $<
	$(PDFLATEX) $(LATEXFLAGS) $<

clean:
	$(RM) *.aux *.bbl *.bcf *.blg *.fdb_latexmk *.fls *.lof *.log *.lot *.out *.run.xml *.synctex.gz *.toc

cleanall: clean
	$(RM) $(PDF)

help:
	@printf '%s\n' \
		'make          Generate the PhD advisor-approval form' \
		'make clean    Remove auxiliary files' \
		'make cleanall Remove auxiliary files and the generated PDF'

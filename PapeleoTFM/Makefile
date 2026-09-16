PDFLATEX ?= pdflatex
LATEXFLAGS ?= -interaction=nonstopmode -halt-on-error -file-line-error

AUTHORIZATION_DOCUMENT := TFM-AutorizacionPublicarAbierto
APPROVAL_DOCUMENT := TFM-VistoBuenoTutorTFM
PROPOSAL_DOCUMENT := solicitud
DOCUMENTS := $(AUTHORIZATION_DOCUMENT) $(APPROVAL_DOCUMENT) $(PROPOSAL_DOCUMENT)
PDFFILES := $(addsuffix .pdf,$(DOCUMENTS))

COMMON_DEPS := \
	../Config/myconfig.tex \
	../Config/postamble.tex \
	../Config/preamble.tex

.DEFAULT_GOAL := all

.PHONY: all autorizacion visto-bueno solicitud clean cleanall help

all: $(PDFFILES)

autorizacion: $(AUTHORIZATION_DOCUMENT).pdf

visto-bueno: $(APPROVAL_DOCUMENT).pdf

solicitud: $(PROPOSAL_DOCUMENT).pdf

$(PDFFILES): $(COMMON_DEPS)
TFM-AutorizacionPublicarAbierto.pdf: ../Config/setlanguagedependentissues.tex
solicitud.pdf: ../Config/setlanguagedependentissues.tex

%.pdf: %.tex
	$(PDFLATEX) $(LATEXFLAGS) $<
	$(PDFLATEX) $(LATEXFLAGS) $<

clean:
	$(RM) *.aux *.bbl *.bcf *.blg *.fdb_latexmk *.fls *.lof *.log *.lot *.out *.run.xml *.synctex.gz *.toc

cleanall: clean
	$(RM) $(PDFFILES)

help:
	@printf '%s\n' \
		'make               Generate all TFM paperwork' \
		'make autorizacion  Generate the open-publication authorization' \
		'make visto-bueno   Generate the approval for deposit and defense' \
		'make solicitud     Generate the project-proposal request' \
		'make FILE.pdf      Generate one specific form' \
		'make clean         Remove auxiliary files' \
		'make cleanall      Remove auxiliary files and generated PDFs'

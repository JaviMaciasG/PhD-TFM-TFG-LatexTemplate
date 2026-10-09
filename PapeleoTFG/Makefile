PDFLATEX ?= pdflatex
LATEXFLAGS ?= -interaction=nonstopmode -halt-on-error -file-line-error
LATEX_ENGINE ?= $(PDFLATEX)
LATEX_CONFIG_DIR := ../Config
include $(LATEX_CONFIG_DIR)/latex-common.mk

AUTHORIZATION_DOCUMENTS := \
	TFG-AutorizacionAutorPubAbierto-EPS-UAH \
	TFG-AutorizacionTutorExtranjeroPubAbierto-EPS-UAH \
	TFG-CompromisoConfidencialidad-EPS-UAH \
	TFG-AutorizacionALLPubAbierto-EPS-UAH

AGREEMENT_DOCUMENTS := \
	TFG-ConvenioCooperacion-EPS-UAH

EVALUATION_DOCUMENTS := \
	TFG-InformeTutorYRubrica-EPS-UAH \
	TFG-ActaYRubricaDefensa-EPS-UAH \
	TFG-InformeTutorPlagio-UAH

DOCUMENTS := \
	$(AUTHORIZATION_DOCUMENTS) \
	$(AGREEMENT_DOCUMENTS) \
	$(EVALUATION_DOCUMENTS)
PDFFILES := $(addsuffix .pdf,$(DOCUMENTS))
TEXFILES := $(addsuffix .tex,$(DOCUMENTS))
GUIDE_DOCUMENT := guia-papeleo-tfg-eps-uah
GUIDE_TEX := $(GUIDE_DOCUMENT).tex
GUIDE_PDF := $(GUIDE_DOCUMENT).pdf
GUIDE_BUILD_TEX := $(wildcard $(GUIDE_TEX))

.DEFAULT_GOAL := all

.PHONY: all autorizaciones convenios evaluacion guia FORCE clean cleanall help

all: $(PDFFILES)

autorizaciones: $(addsuffix .pdf,$(AUTHORIZATION_DOCUMENTS))

convenios: $(addsuffix .pdf,$(AGREEMENT_DOCUMENTS))

evaluacion: $(addsuffix .pdf,$(EVALUATION_DOCUMENTS))

guia: $(GUIDE_PDF)

FORCE:

$(PDFFILES): %.pdf: %.tex FORCE
	$(call latexmk_build,$<)

ifneq ($(GUIDE_BUILD_TEX),)
$(GUIDE_PDF): $(GUIDE_BUILD_TEX) FORCE
	$(call latexmk_build,$<)
endif

clean:
	$(call latexmk_clean,$(TEXFILES) $(GUIDE_BUILD_TEX))

cleanall:
	$(call latexmk_cleanall,$(TEXFILES) $(GUIDE_BUILD_TEX))

help:
	@printf '%s\n' \
		'make                 Generate all TFG paperwork incrementally' \
		'make autorizaciones  Generate publication and confidentiality forms' \
		'make convenios       Generate the cooperation-agreement form' \
		'make evaluacion      Generate advisor reports and defense records' \
		'make FILE.pdf        Generate one specific form' \
		'make clean           Remove auxiliary files' \
		'make cleanall        Remove auxiliary files and generated PDFs'

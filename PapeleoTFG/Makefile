PDFLATEX ?= pdflatex
LATEXFLAGS ?= -interaction=nonstopmode -halt-on-error -file-line-error
LATEX_ENGINE ?= $(PDFLATEX)
LATEX_CONFIG_DIR := ../Config
include $(LATEX_CONFIG_DIR)/latex-common.mk

AUTHORIZATION_DOCUMENTS := \
	TFG-AutorizacionAutorPubAbierto \
	TFG-AutorizacionTutorPubAbierto \
	TFG-AutorizacionTutorExtranjeroPubAbierto
EVALUATION_DOCUMENTS := \
	TFG-InformeTutorYRubrica \
	TFG-ActaYRubricaDefensa
DOCUMENTS := $(AUTHORIZATION_DOCUMENTS) $(EVALUATION_DOCUMENTS)
PDFFILES := $(addsuffix .pdf,$(DOCUMENTS))
TEXFILES := $(addsuffix .tex,$(DOCUMENTS))

.DEFAULT_GOAL := all

.PHONY: all autorizaciones evaluacion FORCE clean cleanall help

all: $(PDFFILES)

autorizaciones: $(addsuffix .pdf,$(AUTHORIZATION_DOCUMENTS))

evaluacion: $(addsuffix .pdf,$(EVALUATION_DOCUMENTS))

FORCE:

$(PDFFILES): %.pdf: %.tex FORCE
	$(call latexmk_build,$<)

clean:
	$(call latexmk_clean,$(TEXFILES))

cleanall:
	$(call latexmk_cleanall,$(TEXFILES))

help:
	@printf '%s\n' \
		'make                 Generate all TFG paperwork incrementally' \
		'make autorizaciones  Generate the three open-publication authorizations' \
		'make evaluacion      Generate the tutor report and defense record' \
		'make FILE.pdf        Generate one specific form' \
		'make clean           Remove auxiliary files' \
		'make cleanall        Remove auxiliary files and generated PDFs'

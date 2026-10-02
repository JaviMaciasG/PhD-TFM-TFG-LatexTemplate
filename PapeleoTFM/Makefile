PDFLATEX ?= pdflatex
LATEXFLAGS ?= -interaction=nonstopmode -halt-on-error -file-line-error
LATEX_ENGINE ?= $(PDFLATEX)
LATEX_CONFIG_DIR := ../Config
include $(LATEX_CONFIG_DIR)/latex-common.mk

AUTHORIZATION_DOCUMENT := TFM-AutorizacionPublicarAbierto
APPROVAL_DOCUMENT := TFM-VistoBuenoTutorTFM
PROPOSAL_DOCUMENT := solicitud
DOCUMENTS := $(AUTHORIZATION_DOCUMENT) $(APPROVAL_DOCUMENT) $(PROPOSAL_DOCUMENT)
PDFFILES := $(addsuffix .pdf,$(DOCUMENTS))
TEXFILES := $(addsuffix .tex,$(DOCUMENTS))

.DEFAULT_GOAL := all

.PHONY: all autorizacion visto-bueno solicitud FORCE clean cleanall help

all: $(PDFFILES)

autorizacion: $(AUTHORIZATION_DOCUMENT).pdf

visto-bueno: $(APPROVAL_DOCUMENT).pdf

solicitud: $(PROPOSAL_DOCUMENT).pdf

FORCE:

$(PDFFILES): %.pdf: %.tex FORCE
	$(call latexmk_build,$<)

clean:
	$(call latexmk_clean,$(TEXFILES))

cleanall:
	$(call latexmk_cleanall,$(TEXFILES))

help:
	@printf '%s\n' \
		'make               Generate all TFM paperwork incrementally' \
		'make autorizacion  Generate the open-publication authorization' \
		'make visto-bueno   Generate the approval for deposit and defense' \
		'make solicitud     Generate the project-proposal request' \
		'make FILE.pdf      Generate one specific form' \
		'make clean         Remove auxiliary files' \
		'make cleanall      Remove auxiliary files and generated PDFs'

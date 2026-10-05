PDFLATEX ?= pdflatex
LATEXFLAGS ?= -interaction=nonstopmode -halt-on-error -file-line-error
LATEX_ENGINE ?= $(PDFLATEX)
LATEX_CONFIG_DIR := ../Config
include $(LATEX_CONFIG_DIR)/latex-common.mk

AUTHORIZATION_DOCUMENTS := \
	TFM-AutorizacionPublicarAbierto \
	TFM-VistoBuenoTutor

AGREEMENT_DOCUMENTS := \
	TFM-AnexoI-ConvenioCooperacion-EPS-UAH

EVALUATION_DOCUMENTS := \
	TFM-ActaYRubricaDefensa-EPS-UAH

REQUEST_DOCUMENTS := \
	TFM-AnexoIV-SolicitudProrroga-EPS-UAH \
	TFM-AnexoV-SolicitudCambioTFM-EPS-UAH

DOCUMENTS := \
	$(AUTHORIZATION_DOCUMENTS) \
	$(AGREEMENT_DOCUMENTS) \
	$(EVALUATION_DOCUMENTS) \
	$(REQUEST_DOCUMENTS)
PDFFILES := $(addsuffix .pdf,$(DOCUMENTS))
TEXFILES := $(addsuffix .tex,$(DOCUMENTS))

.DEFAULT_GOAL := all

.PHONY: all autorizaciones convenios evaluacion solicitudes FORCE clean cleanall help

all: $(PDFFILES)

autorizaciones: $(addsuffix .pdf,$(AUTHORIZATION_DOCUMENTS))

convenios: $(addsuffix .pdf,$(AGREEMENT_DOCUMENTS))

evaluacion: $(addsuffix .pdf,$(EVALUATION_DOCUMENTS))

solicitudes: $(addsuffix .pdf,$(REQUEST_DOCUMENTS))

FORCE:

$(PDFFILES): %.pdf: %.tex FORCE
	$(call latexmk_build,$<)

clean:
	$(call latexmk_clean,$(TEXFILES))

cleanall:
	$(call latexmk_cleanall,$(TEXFILES))

help:
	@printf '%s\n' \
		'make                 Generate all TFM paperwork incrementally' \
		'make autorizaciones  Generate publication and defense authorizations' \
		'make convenios       Generate the cooperation-agreement form' \
		'make evaluacion      Generate the defense record and rubric' \
		'make solicitudes     Generate extension and assignment-change requests' \
		'make FILE.pdf        Generate one specific form' \
		'make clean           Remove auxiliary files' \
		'make cleanall        Remove auxiliary files and generated PDFs'

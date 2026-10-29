PDFLATEX ?= pdflatex
LATEXFLAGS ?= -interaction=nonstopmode -halt-on-error -file-line-error
LATEX_ENGINE ?= $(PDFLATEX)
LATEX_CONFIG_DIR := ../Config
include $(LATEX_CONFIG_DIR)/latex-common.mk

AUTHORIZATION_DOCUMENTS := \
	TFM-AnexoXII-AutorizacionPublicarAbierto \
	TFM-AnexoX-VistoBuenoTutor

AGREEMENT_DOCUMENTS := \
	TFM-AnexoI-ConvenioCooperacion-EPS-UAH

EVALUATION_DOCUMENTS := \
	TFM-AnexoXI-ActaYRubricaDefensa-EPS-UAH

REQUEST_DOCUMENTS := \
	TFM-AnexoVII-HojaControlAnteproyecto-EPS-UAH \
	TFM-AnexoIV-SolicitudProrroga-EPS-UAH \
	TFM-AnexoV-SolicitudCambioTFM-EPS-UAH

DOCUMENTS := \
	$(AUTHORIZATION_DOCUMENTS) \
	$(AGREEMENT_DOCUMENTS) \
	$(EVALUATION_DOCUMENTS) \
	$(REQUEST_DOCUMENTS)
PDFFILES := $(addsuffix .pdf,$(DOCUMENTS))
TEXFILES := $(addsuffix .tex,$(DOCUMENTS))
GUIDE_DOCUMENT := TFM-GuiaPapeleo-EPS-UAH
GUIDE_TEX := $(GUIDE_DOCUMENT).tex
GUIDE_PDF := $(GUIDE_DOCUMENT).pdf
GUIDE_BUILD_TEX := $(wildcard $(GUIDE_TEX))

.DEFAULT_GOAL := all

.PHONY: all autorizaciones convenios evaluacion solicitudes guia FORCE clean distclean help

all: $(PDFFILES)

autorizaciones: $(addsuffix .pdf,$(AUTHORIZATION_DOCUMENTS))

convenios: $(addsuffix .pdf,$(AGREEMENT_DOCUMENTS))

evaluacion: $(addsuffix .pdf,$(EVALUATION_DOCUMENTS))

solicitudes: $(addsuffix .pdf,$(REQUEST_DOCUMENTS))

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

distclean:
	$(call latexmk_distclean,$(TEXFILES) $(GUIDE_BUILD_TEX))

help:
	@printf '%s\n' \
		'make                 Generate all TFM paperwork incrementally' \
		'make autorizaciones  Generate publication and defense authorizations' \
		'make convenios       Generate the cooperation-agreement form' \
		'make evaluacion      Generate the defense record and rubric' \
		'make solicitudes     Generate proposal control, extension and assignment-change forms' \
		'make FILE.pdf        Generate one specific form' \
		'make clean           Remove auxiliary files' \
		'make distclean       Remove auxiliary files and generated PDFs'

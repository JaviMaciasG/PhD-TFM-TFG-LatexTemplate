###########################################################################
# 
# Makefile to generate anteproyecto.pdf
#
# $Id: Makefile,v 1.4 2016/03/31 23:38:15 macias Exp $
#
# By:
#  + Javier Macías-Guarasa. 
#    Departamento de Electrónica
#    Universidad de Alcalá
#  + Roberto Barra-Chicote. 
#    Departamento de Ingeniería Electrónica
#    Universidad Politécnica de Madrid   
# 
# Based on original sources by Roberto Barra, Manuel Ocaña, Jesús Nuevo,
# Pedro Revenga, Fernando Herránz and Noelia Hernández. Thanks a lot to
# all of them, and to the many anonymous contributors found (thanks to
# google) that provided help in setting all this up.
#
# See also the additionalContributors.txt file to check the name of
# additional contributors to this work.
#
# If you think you can add pieces of relevant/useful examples,
# improvements, please contact us at (macias@depeca.uah.es)
#
# Copyleft 2013
#
###########################################################################

ROOT_FILENAME = anteproyecto
TEX_FILE = $(ROOT_FILENAME).tex
FLATTEN_TEX_FILE = $(ROOT_FILENAME)-flatten.tex
SNAPSHOT_FLATTEN_TEX_FILE = $(ROOT_FILENAME)-flatten-snapshot.tex
DIFF_FLATTEN_ROOT_FILENAME = $(ROOT_FILENAME)-flatten-diff
DIFF_FLATTEN_TEX_FILE = $(DIFF_FLATTEN_ROOT_FILENAME).tex

PDF_TOOL ?= pdflatex
LATEX_ENGINE ?= $(PDF_TOOL)
LATEX_CONFIG_DIR := ../Config
include $(LATEX_CONFIG_DIR)/latex-common.mk

LATEXPAND_TOOL ?= latexpand
LATEXDIFF_TOOL ?= latexdiff
EPSPDF_TOOL ?= epspdf
DIA_TOOL ?= dia
INKSCAPE_TOOL ?= inkscape

DIA_SOURCES = $(wildcard ../Book/diagrams/*.dia)
SVG_SOURCES = $(wildcard ../Book/diagrams/*.svg)
EPS_SOURCES = $(wildcard ../eps/*.eps) $(wildcard ../ALLcurvesROC-AV16.3/*.eps) $(wildcard ../ALLcurvesROC-HIFI-MM1/*.eps)
PDFS_FROM_DIA = $(patsubst %.dia,%.pdf,$(DIA_SOURCES))
PDFS_FROM_SVG = $(patsubst %.svg,%.pdf,$(SVG_SOURCES))
PDFS_FROM_EPS = $(patsubst %.eps,%.pdf,$(EPS_SOURCES))
CONVERSION_STAMPS = pdf_dia_done pdf_svg_done pdf_eps_done

.DEFAULT_GOAL := all

.PHONY: all anteproyecto anteproyecto_latexmk snapshot flatten latexdiff clean cleanall clean_latexmk help

all: $(CONVERSION_STAMPS) anteproyecto

anteproyecto:
	$(call latexmk_build,$(TEX_FILE))

anteproyecto_latexmk: anteproyecto

snapshot:
	$(LATEXPAND_TOOL) $(TEX_FILE) > $(SNAPSHOT_FLATTEN_TEX_FILE)

flatten:
	$(LATEXPAND_TOOL) $(TEX_FILE) > $(FLATTEN_TEX_FILE)

latexdiff: flatten
	$(LATEXDIFF_TOOL) --encoding=utf8 --config="PICTUREENV=(?:picture|tikzpicture|DIFnomarkup)[\w\d*@]*" $(SNAPSHOT_FLATTEN_TEX_FILE) $(FLATTEN_TEX_FILE) > $(DIFF_FLATTEN_TEX_FILE)
	$(call latexmk_build,$(DIFF_FLATTEN_TEX_FILE))

pdf_dia_done: $(PDFS_FROM_DIA)
	@echo "Generating PDFs from Dia sources..."
	touch $@

pdf_svg_done: $(PDFS_FROM_SVG)
	@echo "Generating PDFs from SVG sources..."
	touch $@

pdf_eps_done: $(PDFS_FROM_EPS)
	@echo "Generating PDFs from EPS sources..."
	touch $@

%.pdf: %.dia
	@echo "Converting $< to $@..."
	$(DIA_TOOL) -e $@.eps $<
	$(EPSPDF_TOOL) $@.eps $@
	$(RM) $@.eps

%.pdf: %.svg
	@echo "Converting $< to $@..."
	$(INKSCAPE_TOOL) $< --export-pdf=$@ -D

%.pdf: %.eps
	@echo "Converting $< to $@..."
	$(EPSPDF_TOOL) $< $@

clean:
	$(call latexmk_clean,$(TEX_FILE))
	$(RM) $(CONVERSION_STAMPS)

cleanall:
	$(call latexmk_cleanall,$(TEX_FILE))
	$(RM) $(CONVERSION_STAMPS)

clean_latexmk: cleanall

help:
	@printf '%s\n' \
		'make                     Generate anteproyecto.pdf incrementally' \
		'make snapshot            Save a flattened comparison baseline' \
		'make flatten             Flatten the current document' \
		'make latexdiff            Generate the comparison document' \
		'make clean               Remove auxiliary files' \
		'make cleanall            Remove auxiliary files and anteproyecto.pdf' \
		'make anteproyecto_latexmk Compatibility alias for make anteproyecto' \
		'make clean_latexmk        Compatibility alias for make cleanall'


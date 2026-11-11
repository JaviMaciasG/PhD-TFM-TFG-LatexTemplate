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
# See also Book/acknowledgements/additional-contributors.txt to check the name of
# additional contributors to this work.
#
# If you think you can add pieces of relevant/useful examples,
# improvements, please contact us at (macias@depeca.uah.es)
#
# Copyleft 2013
#
###########################################################################

ROOT_FILENAME = anteproyecto
SHELL = /bin/bash
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
# Match the trailing slash too, so macro declarations stay intact.
LATEXPAND_FLAGS ?= --define myConfigDirectory/=../Config/
LATEXPAND_TEXINPUTS ?= .:../Book:
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

.PHONY: all anteproyecto anteproyecto_latexmk snapshot flatten latexdiff clean distclean help

all: $(CONVERSION_STAMPS) anteproyecto

anteproyecto:
	$(call latexmk_build,$(TEX_FILE))

anteproyecto_latexmk: anteproyecto

snapshot:
	TEXINPUTS="$(LATEXPAND_TEXINPUTS)" $(LATEXPAND_TOOL) $(LATEXPAND_FLAGS) $(TEX_FILE) > $(SNAPSHOT_FLATTEN_TEX_FILE)

flatten:
	TEXINPUTS="$(LATEXPAND_TEXINPUTS)" $(LATEXPAND_TOOL) $(LATEXPAND_FLAGS) $(TEX_FILE) > $(FLATTEN_TEX_FILE)

latexdiff:
	@set -euo pipefail; \
	baseline="$(SNAPSHOT_FLATTEN_TEX_FILE)"; \
	tempdir=''; \
	trap 'if [[ -n "$$tempdir" ]]; then rm -rf -- "$$tempdir"; fi' EXIT; \
	if [[ ! -f "$$baseline" ]]; then \
	  echo "No snapshot found: $(SNAPSHOT_FLATTEN_TEX_FILE)."; \
	  echo "Create one with 'make snapshot' before editing to save a comparison baseline."; \
	  if [[ ! -t 0 ]]; then echo "ERROR: no interactive input available; create a snapshot or run make latexdiff interactively." >&2; exit 1; fi; \
	  read -r -p "Continue by comparing with the last committed version? [y/N] " answer; \
	  case "$$answer" in y|Y|yes|YES) ;; *) echo "Comparison cancelled. Run 'make snapshot' to create a baseline."; exit 1 ;; esac; \
	  command -v git >/dev/null 2>&1 || { echo "ERROR: Git is required for the committed-version fallback." >&2; exit 1; }; \
	  repo_root=$$(git -C "$$PWD" rev-parse --show-toplevel 2>/dev/null) || { echo "ERROR: this directory is not inside a Git repository; create a snapshot with 'make snapshot'." >&2; exit 1; }; \
	  git -C "$$repo_root" rev-parse --verify 'HEAD^{commit}' >/dev/null 2>&1 || { echo "ERROR: this Git repository has no committed version yet; create a snapshot with 'make snapshot'." >&2; exit 1; }; \
	  component_path=$${PWD#"$$repo_root"/}; \
	  tempdir=$$(mktemp -d) || { echo "ERROR: could not create a temporary directory." >&2; exit 1; }; \
	  git -C "$$repo_root" archive HEAD Config Book Anteproyecto | tar -xf - -C "$$tempdir"; \
	  (cd "$$tempdir/$$component_path" && TEXINPUTS="$(LATEXPAND_TEXINPUTS)" $(LATEXPAND_TOOL) $(LATEXPAND_FLAGS) $(TEX_FILE) > "$$tempdir/$(SNAPSHOT_FLATTEN_TEX_FILE)"); \
	  baseline="$$tempdir/$(SNAPSHOT_FLATTEN_TEX_FILE)"; \
	fi; \
	$(MAKE) --no-print-directory flatten; \
	$(LATEXDIFF_TOOL) --encoding=utf8 --config="PICTUREENV=(?:picture|tikzpicture|DIFnomarkup)[\w\d*@]*" "$$baseline" $(FLATTEN_TEX_FILE) > $(DIFF_FLATTEN_TEX_FILE); \
	$(LATEXMK) $(LATEXMK_FLAGS) $(DIFF_FLATTEN_TEX_FILE)

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

CLEAN_TEX_FILES = $(TEX_FILE) $(FLATTEN_TEX_FILE) $(SNAPSHOT_FLATTEN_TEX_FILE) $(DIFF_FLATTEN_TEX_FILE)

clean:
	$(call latexmk_clean,$(CLEAN_TEX_FILES))
	$(RM) $(CONVERSION_STAMPS)

distclean:
	$(call latexmk_distclean,$(CLEAN_TEX_FILES))
	$(RM) $(CONVERSION_STAMPS)

help:
	@printf '%s\n' \
		'make                     Generate anteproyecto.pdf incrementally' \
		'make snapshot            Save a flattened comparison baseline' \
		'make flatten             Flatten the current document' \
		'make latexdiff            Generate the comparison document' \
		'make clean               Remove auxiliary files' \
		'make distclean           Remove auxiliary files and generated document PDFs' \
		'make anteproyecto_latexmk Compatibility alias for make anteproyecto'


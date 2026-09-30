PDFLATEX ?= pdflatex
LATEXFLAGS ?= -interaction=nonstopmode -halt-on-error -file-line-error
LATEX_ENGINE ?= $(PDFLATEX)
LATEX_CONFIG_DIR := ../Config
include $(LATEX_CONFIG_DIR)/latex-common.mk

DOCUMENT := PHD-VistoBuenoTutorTesis
PDF := $(DOCUMENT).pdf
TEX_FILE := $(DOCUMENT).tex

.DEFAULT_GOAL := all

.PHONY: all FORCE clean cleanall help

all: $(PDF)

FORCE:

$(PDF): $(TEX_FILE) FORCE
	$(call latexmk_build,$(TEX_FILE))

clean:
	$(call latexmk_clean,$(TEX_FILE))

cleanall:
	$(call latexmk_cleanall,$(TEX_FILE))

help:
	@printf '%s\n' \
		'make          Generate the PhD advisor-approval form incrementally' \
		'make clean    Remove auxiliary files' \
		'make cleanall Remove auxiliary files and the generated PDF'

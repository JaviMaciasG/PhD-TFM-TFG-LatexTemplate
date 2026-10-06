PDFLATEX ?= pdflatex
LATEXFLAGS ?= -interaction=nonstopmode -halt-on-error -file-line-error
LATEX_ENGINE ?= $(PDFLATEX)
LATEX_CONFIG_DIR := ../Config
include $(LATEX_CONFIG_DIR)/latex-common.mk

THESIS_TEXFILES := $(sort $(wildcard 02-TesisDoctoral/PHD-*.tex))
RESEARCH_STAY_TEXFILES := $(sort $(wildcard 03-MencionInternacional/PHD-*.tex))
INDUSTRIAL_DOCTORATE_TEXFILES := $(sort $(wildcard 04-DoctoradoIndustrial/PHD-*.tex))
COTUTELLE_TEXFILES := $(sort $(wildcard 05-CotutelaDeTesis/PHD-*.tex))

TEXFILES := \
	$(THESIS_TEXFILES) \
	$(RESEARCH_STAY_TEXFILES) \
	$(COTUTELLE_TEXFILES) \
	$(INDUSTRIAL_DOCTORATE_TEXFILES)

THESIS_PDFS := $(notdir $(THESIS_TEXFILES:.tex=.pdf))
RESEARCH_STAY_PDFS := $(notdir $(RESEARCH_STAY_TEXFILES:.tex=.pdf))
COTUTELLE_PDFS := $(notdir $(COTUTELLE_TEXFILES:.tex=.pdf))
INDUSTRIAL_DOCTORATE_PDFS := $(notdir $(INDUSTRIAL_DOCTORATE_TEXFILES:.tex=.pdf))
PDFFILES := $(THESIS_PDFS) $(RESEARCH_STAY_PDFS) $(INDUSTRIAL_DOCTORATE_PDFS) $(COTUTELLE_PDFS)

SOURCE_DIRECTORIES := \
	02-TesisDoctoral \
	03-MencionInternacional \
	04-DoctoradoIndustrial \
	05-CotutelaDeTesis
vpath %.tex $(SOURCE_DIRECTORIES)

SOURCE_BASENAMES := $(notdir $(TEXFILES))
ifneq ($(words $(SOURCE_BASENAMES)),$(words $(sort $(SOURCE_BASENAMES))))
$(error Duplicate PhD paperwork source basenames found; filenames must be unique across thematic folders)
endif

# This local overlay is intentionally optional and is not required in the
# distributed template. When present, latexmk tracks it as a dependency.
OPTIONAL_PHD_CONFIG := $(wildcard ../Config/myconfig-phd.tex)
PHD_FORM_LAYOUT := phd-form-layout.tex
PHD_FORM_ASSETS := $(sort $(wildcard assets/uah/*))
SHARED_CONFIG := \
	../Config/myconfig.tex \
	../Config/preamble.tex \
	../Config/postamble.tex \
	$(PHD_FORM_LAYOUT) \
	$(PHD_FORM_ASSETS)

.DEFAULT_GOAL := all

.PHONY: all thesis research-stays cotutelle industrial-doctorate list clean cleanall help

all: $(PDFFILES)

thesis: $(THESIS_PDFS)

research-stays: $(RESEARCH_STAY_PDFS)

cotutelle: $(COTUTELLE_PDFS)

industrial-doctorate: $(INDUSTRIAL_DOCTORATE_PDFS)

$(PDFFILES): %.pdf: %.tex $(SHARED_CONFIG) $(OPTIONAL_PHD_CONFIG)
	$(call latexmk_build,$<)

list:
	@printf '%s\n' 'Thesis procedure paperwork:'
	@printf '  %s\n' $(THESIS_PDFS)
	@printf '%s\n' 'Research stays and international mention:'
	@printf '  %s\n' $(RESEARCH_STAY_PDFS)
	@printf '%s\n' 'Cotutelle:'
	@printf '  %s\n' $(COTUTELLE_PDFS)
	@printf '%s\n' 'Industrial doctorate:'
	@printf '  %s\n' $(INDUSTRIAL_DOCTORATE_PDFS)

clean:
	$(call latexmk_clean,$(TEXFILES))

cleanall:
	$(call latexmk_cleanall,$(TEXFILES))

help:
	@printf '%s\n' \
		'make                       Generate all supported PhD paperwork' \
		'make thesis                Generate thesis-procedure paperwork' \
		'make research-stays        Generate research-stay and international-mention paperwork' \
		'make cotutelle             Generate cotutelle paperwork' \
		'make industrial-doctorate  Generate industrial-doctorate paperwork' \
		'make FILE.pdf              Generate one form listed by make list' \
		'make list                  List the generated PDF names by category' \
		'make clean                 Remove auxiliary files' \
		'make cleanall              Remove auxiliary files and generated PDFs' \
		'' \
		'Run make from PapeleoPHD/ so that the shared ../Config paths resolve correctly.'

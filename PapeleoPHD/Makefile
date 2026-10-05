PDFLATEX ?= pdflatex
LATEXFLAGS ?= -interaction=nonstopmode -halt-on-error -file-line-error
LATEX_ENGINE ?= $(PDFLATEX)
LATEX_CONFIG_DIR := ../Config
include $(LATEX_CONFIG_DIR)/latex-common.mk

CORE_TEXFILES := $(sort $(wildcard CoreDoctoralPaperwork/PHD-*.tex))
RESEARCH_STAY_TEXFILES := $(sort $(wildcard ResearchStays+InternationalMention/PHD-*.tex))
COTUTELLE_TEXFILES := $(sort $(wildcard Cotutelle/PHD-*.tex))
INDUSTRIAL_DOCTORATE_TEXFILES := $(sort $(wildcard IndustrialDoctorate/PHD-*.tex))

TEXFILES := \
	$(CORE_TEXFILES) \
	$(RESEARCH_STAY_TEXFILES) \
	$(COTUTELLE_TEXFILES) \
	$(INDUSTRIAL_DOCTORATE_TEXFILES)

CORE_PDFS := $(notdir $(CORE_TEXFILES:.tex=.pdf))
RESEARCH_STAY_PDFS := $(notdir $(RESEARCH_STAY_TEXFILES:.tex=.pdf))
COTUTELLE_PDFS := $(notdir $(COTUTELLE_TEXFILES:.tex=.pdf))
INDUSTRIAL_DOCTORATE_PDFS := $(notdir $(INDUSTRIAL_DOCTORATE_TEXFILES:.tex=.pdf))
PDFFILES := $(CORE_PDFS) $(RESEARCH_STAY_PDFS) $(COTUTELLE_PDFS) $(INDUSTRIAL_DOCTORATE_PDFS)

SOURCE_DIRECTORIES := \
	CoreDoctoralPaperwork \
	ResearchStays+InternationalMention \
	Cotutelle \
	IndustrialDoctorate
vpath %.tex $(SOURCE_DIRECTORIES)

SOURCE_BASENAMES := $(notdir $(TEXFILES))
ifneq ($(words $(SOURCE_BASENAMES)),$(words $(sort $(SOURCE_BASENAMES))))
$(error Duplicate PhD paperwork source basenames found; filenames must be unique across thematic folders)
endif

# This local overlay is intentionally optional and is not required in the
# distributed template. When present, latexmk tracks it as a dependency.
OPTIONAL_PHD_CONFIG := $(wildcard ../Config/myconfig-phd.tex)

.DEFAULT_GOAL := all

.PHONY: all core research-stays cotutelle industrial-doctorate list FORCE clean cleanall help

all: $(PDFFILES)

core: $(CORE_PDFS)

research-stays: $(RESEARCH_STAY_PDFS)

cotutelle: $(COTUTELLE_PDFS)

industrial-doctorate: $(INDUSTRIAL_DOCTORATE_PDFS)

FORCE:

$(PDFFILES): %.pdf: %.tex $(OPTIONAL_PHD_CONFIG) FORCE
	$(call latexmk_build,$<)

list:
	@printf '%s\n' 'Core doctoral paperwork:'
	@printf '  %s\n' $(CORE_PDFS)
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
		'make core                  Generate core doctoral paperwork' \
		'make research-stays        Generate research-stay and international-mention paperwork' \
		'make cotutelle             Generate cotutelle paperwork' \
		'make industrial-doctorate  Generate industrial-doctorate paperwork' \
		'make FILE.pdf              Generate one form listed by make list' \
		'make list                  List the generated PDF names by category' \
		'make clean                 Remove auxiliary files' \
		'make cleanall              Remove auxiliary files and generated PDFs' \
		'' \
		'Run make from PapeleoPHD/ so that the shared ../Config paths resolve correctly.'

# Makefile to generate book.pdf

# Configuration
.DEFAULT_GOAL := all
SHELL = /bin/bash
CONFIG_FILE = ../Config/myconfig.tex
PRELUDE_FILE = ../Config/preamble.tex
DEGREES_FILE = ../Config/degrees.tex
DEGREE_REGISTRY_TOOL = ../Config/query-degree-registry.sh

# Tools
EPSPDF_TOOL = epspdf
DIA_TOOL = dia
GS_TOOL = gs
INKSCAPE_TOOL = inkscape
LATEXPAND_TOOL = latexpand
# Match the trailing slash too, so macro declarations stay intact.
LATEXPAND_FLAGS ?= --define myConfigDirectory/=../Config/
LATEXDIFF_TOOL ?= latexdiff
RM = rm -f
PDF_TOOL ?= pdflatex
LATEX_ENGINE ?= $(PDF_TOOL)
LATEX_CONFIG_DIR := ../Config
include $(LATEX_CONFIG_DIR)/latex-common.mk

# Read configuration variables
DEGREE_NAME = $(shell grep -v "%" $(CONFIG_FILE) | grep "myDegree" | cut -f 3 -d "{" | cut -f 1 -d "}")
AUTHOR_NAME = $(shell grep -v "%" $(CONFIG_FILE) | grep "myAuthorName" | grep -v "myAuthorFullName" | cut -f 3 -d "{" | cut -f 1 -d "}" | tr -d " " | iconv -f utf8 -t ascii//TRANSLIT)
AUTHOR_SURNAME = $(shell grep -v "%" $(CONFIG_FILE) | grep "myAuthorSurname" | grep -v "myAuthorFullName" | cut -f 3 -d "{" | cut -f 1 -d "}" | tr -d " " | iconv -f utf8 -t ascii//TRANSLIT)
BOOK_LANGUAGE = $(shell grep -v "%" $(CONFIG_FILE) | grep "myLanguage" | cut -f 3 -d "{" | cut -f 1 -d "}")
DOCUMENT_STRUCTURE = $(shell sh $(DEGREE_REGISTRY_TOOL) document-structure "$(DEGREE_NAME)" "$(DEGREES_FILE)")
BOOK_TYPE = $(shell sh $(DEGREE_REGISTRY_TOOL) work-type "$(DEGREE_NAME)" "$(DEGREES_FILE)")

# Filenames
ROOT_FILENAME = book
OUTPUT_SUFFIX =
ifeq ($(BOOK_TYPE),PhD)
	DOCUMENT_STRUCTURE_SUFFIX = -$(DOCUMENT_STRUCTURE)
else
	DOCUMENT_STRUCTURE_SUFFIX =
endif
ROOT_FINAL_BOOK_FILENAME = $(BOOK_TYPE)-$(DEGREE_NAME)-$(AUTHOR_SURNAME)-$(AUTHOR_NAME)-$(BOOK_LANGUAGE)$(DOCUMENT_STRUCTURE_SUFFIX)$(OUTPUT_SUFFIX)
TEX_FILE = $(ROOT_FILENAME).tex
FLATTEN_TEX_FILE = $(ROOT_FILENAME)-flatten.tex
SNAPSHOT_FLATTEN_TEX_FILE = $(ROOT_FILENAME)-flatten-snapshot.tex
DIFF_FLATTEN_ROOT_FILENAME = $(ROOT_FILENAME)-flatten-diff
DIFF_FLATTEN_TEX_FILE = $(DIFF_FLATTEN_ROOT_FILENAME).tex

# Source files
STANDARD_CONTENT_FILE = content-standard.tex
STANDARD_CONTENT_ORIG_FILE = chapters/orig/content-standard.tex
STANDARD_CONTENT_BARE_FILE = chapters/bare/content-standard.tex
COMPENDIUM_CONTENT_FILE = content-compendium.tex
COMPENDIUM_CONTENT_ORIG_FILE = chapters/compendium/orig/content-compendium.tex
COMPENDIUM_CONTENT_BARE_FILE = chapters/compendium/bare/content-compendium.tex
CHAPTER_SOURCES = $(wildcard chapters/*.tex)
CHAPTER_ORIG_SOURCES = $(filter-out $(STANDARD_CONTENT_ORIG_FILE),$(wildcard chapters/orig/*.tex))
CHAPTER_BARE_SOURCES = $(filter-out $(STANDARD_CONTENT_BARE_FILE),$(wildcard chapters/bare/*.tex))
COMPENDIUM_CHAPTER_SOURCES = $(wildcard chapters/compendium/*.tex)
COMPENDIUM_CHAPTER_ORIG_SOURCES = $(filter-out $(COMPENDIUM_CONTENT_ORIG_FILE),$(wildcard chapters/compendium/orig/*.tex))
COMPENDIUM_CHAPTER_BARE_SOURCES = $(filter-out $(COMPENDIUM_CONTENT_BARE_FILE),$(wildcard chapters/compendium/bare/*.tex))
APPENDIX_SOURCES = $(wildcard appendix/*.tex)
APPENDIX_ORIG_SOURCES = $(wildcard appendix/orig/*.tex)
APPENDIX_BARE_SOURCES = $(wildcard appendix/bare/*.tex)
DIA_SOURCES = $(wildcard diagrams/*.dia)
SVG_SOURCES = $(wildcard diagrams/*.svg)
EPS_SOURCES = $(wildcard figures/*.eps) $(wildcard additional/*.eps)
TOOLS_SOURCES = $(wildcard tools/cals2latex/*.tex)

# PDFs from source files
PDFS_FROM_DIA = $(patsubst %.dia, %.pdf, $(DIA_SOURCES))
PDFS_FROM_SVG = $(patsubst %.svg, %.pdf, $(SVG_SOURCES))
PDFS_FROM_EPS = $(patsubst %.eps, %.pdf, $(EPS_SOURCES))

# Dummy targets
DUMMY_MAIN_TARGETS = all final-pdfs bare bare-standard bare-compendium backup-chapters backup-compendium orig orig-standard orig-compendium orig-chapters bare-chapters clean-orig-figures clean-orig-diagrams all_latexmk clean distclean
DUMMY_DIFF_TARGETS = snapshot flatten latexdiff
DUMMY_TARGETS = pdf_dia_done pdf_svg_done pdf_eps_done

# Unique timestamp used by backup directories. The process suffix prevents two
# consecutive Make invocations within the same second from sharing a directory.
DATE := $(shell date "+%C%y%m%d-%H%M%S")-$(shell echo $$$$)


# Change only the selected identifier; structure metadata stays in the registry.
define select-document-structure
	@selected_degree=$$(sh "$(DEGREE_REGISTRY_TOOL)" structure-variant "$(DEGREE_NAME)" $(1) "$(DEGREES_FILE)") || { echo "ERROR: no $(1) variant for $(DEGREE_NAME)." >&2; exit 1; }; \
	sed -Ei 's!(\\newcommand\{\\myDegree\}\{)[^}]*\}!\1'"$$selected_degree"'}!' "$(CONFIG_FILE)"
endef

.PHONY: check-compendium-degree
check-compendium-degree:
	@sh "$(DEGREE_REGISTRY_TOOL)" structure-variant "$(DEGREE_NAME)" compendium "$(DEGREES_FILE)" >/dev/null || { echo "ERROR: select a supported PhD degree before preparing a compendium." >&2; exit 1; }

# Main targets
all: $(DUMMY_TARGETS)
	@echo "Checking LaTeX dependencies with $(LATEXMK)"
	$(call latexmk_build,$(TEX_FILE))
	$(MAKE) final-pdfs

final-pdfs: $(ROOT_FILENAME)-compressed.pdf $(ROOT_FINAL_BOOK_FILENAME).pdf $(ROOT_FINAL_BOOK_FILENAME)-compressed.pdf

$(ROOT_FILENAME)-compressed.pdf: $(ROOT_FILENAME).pdf
	$(GS_TOOL) -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/prepress -dNOPAUSE -dQUIET -dBATCH -sOutputFile=$(ROOT_FILENAME)-compressed.pdf $(ROOT_FILENAME).pdf

$(ROOT_FINAL_BOOK_FILENAME).pdf: $(ROOT_FILENAME).pdf
	cp $(ROOT_FILENAME).pdf $(ROOT_FINAL_BOOK_FILENAME).pdf

$(ROOT_FINAL_BOOK_FILENAME)-compressed.pdf: $(ROOT_FILENAME)-compressed.pdf
	cp $(ROOT_FILENAME)-compressed.pdf $(ROOT_FINAL_BOOK_FILENAME)-compressed.pdf

bare:
	@if [[ "$(DOCUMENT_STRUCTURE)" == "standard" ]]; then \
		$(MAKE) bare-standard; \
	elif [[ "$(DOCUMENT_STRUCTURE)" == "compendium" ]]; then \
		$(MAKE) bare-compendium; \
	else \
		echo "ERROR: unknown registry document structure '$(DOCUMENT_STRUCTURE)'. Use standard or compendium." >&2; \
		exit 1; \
	fi
	$(MAKE) clean-orig-figures clean-orig-diagrams

backup-chapters:
	@echo "Backup up chapter sources to chapters/$(DATE)..."
	mkdir -p chapters/$(DATE)
	cp $(STANDARD_CONTENT_FILE) chapters/$(DATE)/content-standard.tex
	cp $(CONFIG_FILE) chapters/$(DATE)/myconfig.tex
	cp $(CHAPTER_SOURCES) chapters/$(DATE)
	@echo " Done!"
	@echo "Backup up appendix sources to appendix/$(DATE)..."
	mkdir -p appendix/$(DATE)
	cp $(APPENDIX_SOURCES) appendix/$(DATE)
	@echo " Done!"

backup-compendium: check-compendium-degree
	@echo "Backing up compendium sources to chapters/compendium/$(DATE)..."
	mkdir -p chapters/compendium/$(DATE)
	cp $(COMPENDIUM_CONTENT_FILE) chapters/compendium/$(DATE)/content-compendium.tex
	cp $(CONFIG_FILE) chapters/compendium/$(DATE)/myconfig.tex
	cp $(COMPENDIUM_CHAPTER_SOURCES) chapters/compendium/$(DATE)
	@echo " Done!"

orig:
	@if [[ "$(DOCUMENT_STRUCTURE)" == "standard" ]]; then \
		$(MAKE) orig-standard; \
	elif [[ "$(DOCUMENT_STRUCTURE)" == "compendium" ]]; then \
		$(MAKE) orig-compendium; \
	else \
		echo "ERROR: unknown registry document structure '$(DOCUMENT_STRUCTURE)'. Use standard or compendium." >&2; \
		exit 1; \
	fi

orig-standard: backup-chapters
	@echo "Setting orig chapters..."
	$(call select-document-structure,standard)
#	perl -0pi -e 's!(\\newcommand\{\\myInclude(?:SampleLetter|Dedication|Acknowledgements|ListOfFigures|ListOfTables|ListOfAcronyms|ListOfSymbols|ListOfCode|ListOfAlgorithms|ListOfVideos)\}\{).*?(\})!$$1true$$2!g' $(CONFIG_FILE)
	sed -Ei 's!(\\newcommand\{\\myInclude(SampleLetter|Dedication|Acknowledgements|ListOfFigures|ListOfTables|ListOfAcronyms|ListOfSymbols|ListOfCode|ListOfAlgorithms|ListOfVideos)\}\{)[^}]*\}!\1true}!g' $(CONFIG_FILE)
	rm -f chapters/*.tex
	rm -f appendix/*.tex
	for f in $(CHAPTER_ORIG_SOURCES);  do cp $$f chapters; done
	for f in $(APPENDIX_ORIG_SOURCES); do cp $$f appendix; done
	cp $(STANDARD_CONTENT_ORIG_FILE) $(STANDARD_CONTENT_FILE)
	@echo " Done!"

orig-chapters: orig-standard

orig-compendium: backup-compendium
	@echo "Setting original compendium chapters and publications..."
	$(call select-document-structure,compendium)
#	perl -0pi -e 's!(\\newcommand\{\\myInclude(?:SampleLetter|Dedication|Acknowledgements|ListOfFigures|ListOfTables|ListOfAcronyms|ListOfSymbols|ListOfCode|ListOfAlgorithms|ListOfVideos)\}\{).*?(\})!$$1true$$2!g' $(CONFIG_FILE)
	sed -Ei 's!(\\newcommand\{\\myInclude(SampleLetter|Dedication|Acknowledgements|ListOfFigures|ListOfTables|ListOfAcronyms|ListOfSymbols|ListOfCode|ListOfAlgorithms|ListOfVideos)\}\{)[^}]*\}!\1true}!g' $(CONFIG_FILE)
	rm -f chapters/compendium/*.tex
	for f in $(COMPENDIUM_CHAPTER_ORIG_SOURCES); do cp $$f chapters/compendium; done
	cp $(COMPENDIUM_CONTENT_ORIG_FILE) $(COMPENDIUM_CONTENT_FILE)
	@echo " Done!"

bare-standard: backup-chapters
	@echo "Setting bare chapters..."
	$(call select-document-structure,standard)
#	perl -0pi -e 's!(\\newcommand\{\\myInclude(?:SampleLetter|ListOfSymbols|ListOfCode|ListOfAlgorithms|ListOfVideos)\}\{).*?(\})!$$1false$$2!g' $(CONFIG_FILE)
	sed -Ei 's!(\\newcommand\{\\myInclude(SampleLetter|ListOfSymbols|ListOfCode|ListOfAlgorithms|ListOfVideos)\}\{)[^}]*\}!\1false}!g' $(CONFIG_FILE)
	rm -f chapters/*.tex
	rm -f appendix/*.tex
	for f in $(CHAPTER_BARE_SOURCES);  do cp $$f chapters; done
	for f in $(APPENDIX_BARE_SOURCES); do cp $$f appendix; done
	cp $(STANDARD_CONTENT_BARE_FILE) $(STANDARD_CONTENT_FILE)
	@echo " Done!"

bare-chapters: bare-standard

bare-compendium: backup-compendium
	@echo "Setting bare compendium chapters and publications..."
	$(call select-document-structure,compendium)
#	perl -0pi -e 's!(\\newcommand\{\\myInclude(?:SampleLetter|ListOfSymbols|ListOfCode|ListOfAlgorithms|ListOfVideos)\}\{).*?(\})!$$1false$$2!g' $(CONFIG_FILE)
	sed -Ei 's!(\\newcommand\{\\myInclude(SampleLetter|ListOfSymbols|ListOfCode|ListOfAlgorithms|ListOfVideos)\}\{)[^}]*\}!\1false}!g' $(CONFIG_FILE)
	rm -f chapters/compendium/*.tex
	for f in $(COMPENDIUM_CHAPTER_BARE_SOURCES); do cp $$f chapters/compendium; done
	cp $(COMPENDIUM_CONTENT_BARE_FILE) $(COMPENDIUM_CONTENT_FILE)
	@echo " Done!"

clean-orig-figures:
	@echo "About to delete the files in the 'figures' directory (except sample figures/Figure1.png and figures/manual/)..."
	@echo "This cannot be undone..."
	@echo "Got it?..."
	@read -p "I will ask you once... Are you sure to delete all files there? " dodelete; \
	if [ "$$dodelete" == "Y" ]; \
	then \
	find figures -type f \( -iname '*.png' -o -iname '*.eps' -o -iname '*.pdf' -o -iname '*.jpg' \) ! -name 'Figure1.png' ! -path 'figures/manual/*' -delete; \
	fi

clean-orig-diagrams:
	@echo "About to delete the files in the 'diagrams' directory..."
	@echo "This cannot be undone..."
	@echo "Got it?..."
	@read -p "I will ask you once... Are you sure to delete all files there? " dodelete; \
	if [ "$$dodelete" == "Y" ]; \
	then \
	rm -f diagrams/*.eps diagrams/*.pdf diagrams/*.dia; \
	fi

all_latexmk: all

snapshot:
	$(LATEXPAND_TOOL) $(LATEXPAND_FLAGS) $(TEX_FILE) > $(SNAPSHOT_FLATTEN_TEX_FILE)

flatten:
	$(LATEXPAND_TOOL) $(LATEXPAND_FLAGS) $(TEX_FILE) > $(FLATTEN_TEX_FILE)

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
	  (cd "$$tempdir/$$component_path" && $(LATEXPAND_TOOL) $(LATEXPAND_FLAGS) $(TEX_FILE) > "$$tempdir/$(SNAPSHOT_FLATTEN_TEX_FILE)"); \
	  baseline="$$tempdir/$(SNAPSHOT_FLATTEN_TEX_FILE)"; \
	fi; \
	$(MAKE) --no-print-directory flatten; \
	$(LATEXDIFF_TOOL) --encoding=utf8 \
	--config="PICTUREENV=(?:picture|tikzpicture|DIFnomarkup)[\w\d*@]*" \
	"$$baseline" $(FLATTEN_TEX_FILE) \
	| sed -e 's/^[ ]*//' -e 's/[ ]*$$//' \
	| sed -z 's/}\n\\end{tikzpicture};\n\\end{tikzpicture}/\\end{tikzpicture}\n};\n\\end{tikzpicture}/g' \
	> $(DIFF_FLATTEN_TEX_FILE); \
	$(LATEXMK) $(LATEXMK_FLAGS) $(DIFF_FLATTEN_TEX_FILE)

pdf_dia_done: $(PDFS_FROM_DIA)
	@echo "Generating pdfs from DIA..."
	touch $@

pdf_svg_done: $(PDFS_FROM_SVG)
	@echo "Generating pdfs from SVG..."
	touch $@

pdf_eps_done: $(PDFS_FROM_EPS)
	@echo "Generating pdfs from EPS..."
	touch $@

%.pdf: %.dia
	@echo "Converting $^ to $@..."
	$(DIA_TOOL) -e $@.eps $^
	$(EPSPDF_TOOL) $@.eps $@
	$(RM) $@.eps

%.pdf: %.svg
	@echo "Converting $^ to $@..."
	$(INKSCAPE_TOOL) $^ --export-pdf=$@

%.pdf: %.eps
	@echo "Converting $^ to $@..."
	$(EPSPDF_TOOL) $^ $@


CLEAN_TEX_FILES = $(TEX_FILE) $(FLATTEN_TEX_FILE) $(SNAPSHOT_FLATTEN_TEX_FILE) $(DIFF_FLATTEN_TEX_FILE)
CLEAN_EXTRA_AUX_STEMS = $(basename $(CHAPTER_SOURCES) $(COMPENDIUM_CHAPTER_SOURCES) $(APPENDIX_SOURCES))

clean:
	$(call latexmk_clean,$(CLEAN_TEX_FILES),$(CLEAN_EXTRA_AUX_STEMS))
	$(RM) $(DUMMY_TARGETS)

distclean:
	$(call latexmk_distclean,$(CLEAN_TEX_FILES),$(CLEAN_EXTRA_AUX_STEMS))
	$(RM) $(DUMMY_TARGETS) $(ROOT_FILENAME)-compressed.pdf $(ROOT_FINAL_BOOK_FILENAME).pdf $(ROOT_FINAL_BOOK_FILENAME)-compressed.pdf

.PHONY: $(DUMMY_MAIN_TARGETS) $(DUMMY_DIFF_TARGETS)

# Makefile to generate book.pdf

# Configuration
SHELL = /bin/bash
CONFIG_FILE = ../Config/myconfig.tex
PRELUDE_FILE = ../Config/preamble.tex
DEGREES_FILE = ../Config/degrees.tex
DEGREE_REGISTRY_TOOL = ../Config/query-degree-registry.sh

# Tools
LATEXMK_TOOL = latexmk
EPSPDF_TOOL = epspdf
DIA_TOOL = dia
GS_TOOL = gs
INKSCAPE_TOOL = inkscape
MAKEGLOSSARIES_TOOL = makeglossaries
LATEXPAND_TOOL = latexpand
RM = rm -f
ifeq ($(shell grep -e bibliosystem $(PRELUDE_FILE) | grep -v ifthenelse | grep newcommand | grep -v "^\%" | cut -d'{' -f3 | cut -d'}' -f1 | tr -d " "), bibtex)
	BIBLIO_TOOL := bibtex
else
	BIBLIO_TOOL := biber
endif
PDF_TOOL = pdflatex
FLAGS_SYNCTEX_PDFLATEX = -synctex=1

ifeq ($(PDF_TOOL),pdflatex)
	PDF_PREFIX := $(shell echo $(PDF_TOOL) | sed -e "s/latex//")
else
	PDF_PREFIX := pdf$(shell echo $(PDF_TOOL) | sed -e "s/latex//")
endif

# Read configuration variables
DEGREE_NAME = $(shell grep -v "%" $(CONFIG_FILE) | grep "myDegree" | cut -f 3 -d "{" | cut -f 1 -d "}")
AUTHOR_NAME = $(shell grep -v "%" $(CONFIG_FILE) | grep "myAuthorName" | grep -v "myAuthorFullName" | cut -f 3 -d "{" | cut -f 1 -d "}" | tr -d " " | iconv -f utf8 -t ascii//TRANSLIT)
AUTHOR_SURNAME = $(shell grep -v "%" $(CONFIG_FILE) | grep "myAuthorSurname" | grep -v "myAuthorFullName" | cut -f 3 -d "{" | cut -f 1 -d "}" | tr -d " " | iconv -f utf8 -t ascii//TRANSLIT)
BOOK_LANGUAGE = $(shell grep -v "%" $(CONFIG_FILE) | grep "myLanguage" | cut -f 3 -d "{" | cut -f 1 -d "}")
DOCUMENT_STRUCTURE = $(shell grep -v "%" $(CONFIG_FILE) | grep "myDocumentStructure" | cut -f 3 -d "{" | cut -f 1 -d "}")
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
DUMMY_MAIN_TARGETS = all bare bare-standard bare-compendium backup-chapters backup-compendium orig orig-standard orig-compendium orig-chapters bare-chapters clean-orig-figures clean-orig-diagrams all_latexmk clean clean_latexmk
DUMMY_DIFF_TARGETS = snapshot flatten latexdiff
DUMMY_TARGETS = pdf_dia_done pdf_svg_done pdf_eps_done

# Unique timestamp used by backup directories. The process suffix prevents two
# consecutive Make invocations within the same second from sharing a directory.
DATE := $(shell date "+%C%y%m%d-%H%M%S")-$(shell echo $$$$)

# Main targets
all: $(DUMMY_TARGETS)
	@echo "Processing LaTeX code with $(PDF_TOOL)"
	@echo "Processing bibliography with $(BIBLIO_TOOL)"
	$(PDF_TOOL) $(FLAGS_SYNCTEX_PDFLATEX) $(TEX_FILE)
	$(BIBLIO_TOOL) $(ROOT_FILENAME)
	$(MAKEGLOSSARIES_TOOL) $(ROOT_FILENAME)
	$(PDF_TOOL) $(FLAGS_SYNCTEX_PDFLATEX) $(TEX_FILE)
	$(PDF_TOOL) $(FLAGS_SYNCTEX_PDFLATEX) $(TEX_FILE)
# Compress pdf file
# Screen-quality output is disabled because its image quality is too low.
#	$(GS_TOOL) -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/screen   -dNOPAUSE -dQUIET -dBATCH -sOutputFile=$(ROOT_FILENAME)-screen.pdf     $(ROOT_FILENAME).pdf
	$(GS_TOOL) -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/prepress -dNOPAUSE -dQUIET -dBATCH -sOutputFile=$(ROOT_FILENAME)-compressed.pdf $(ROOT_FILENAME).pdf
	cp $(ROOT_FILENAME).pdf $(ROOT_FINAL_BOOK_FILENAME).pdf
	cp $(ROOT_FILENAME)-compressed.pdf $(ROOT_FINAL_BOOK_FILENAME)-compressed.pdf
#	cp $(ROOT_FILENAME)-screen.pdf $(ROOT_FINAL_BOOK_FILENAME)-screen.pdf

bare:
	@if [[ "$(DOCUMENT_STRUCTURE)" == "standard" ]]; then \
		$(MAKE) bare-standard; \
	elif [[ "$(DOCUMENT_STRUCTURE)" == "compendium" ]]; then \
		$(MAKE) bare-compendium; \
	else \
		echo "ERROR: unknown myDocumentStructure '$(DOCUMENT_STRUCTURE)'. Use standard or compendium." >&2; \
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

backup-compendium:
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
		echo "ERROR: unknown myDocumentStructure '$(DOCUMENT_STRUCTURE)'. Use standard or compendium." >&2; \
		exit 1; \
	fi

orig-standard: backup-chapters
	@echo "Setting orig chapters..."
	perl -0pi -e 's!\\newcommand\{\\myDocumentStructure\}\{.*?\}!\\newcommand{\\myDocumentStructure}{standard}!' $(CONFIG_FILE)
	perl -0pi -e 's!(\\newcommand\{\\myInclude(?:SampleLetter|Dedication|Acknowledgements|ListOfFigures|ListOfTables|ListOfAcronyms|ListOfSymbols|ListOfCode|ListOfAlgorithms|ListOfVideos)\}\{).*?(\})!$$1true$$2!g' $(CONFIG_FILE)
	rm -f chapters/*.tex
	rm -f appendix/*.tex
	for f in $(CHAPTER_ORIG_SOURCES);  do cp $$f chapters; done
	for f in $(APPENDIX_ORIG_SOURCES); do cp $$f appendix; done
	cp $(STANDARD_CONTENT_ORIG_FILE) $(STANDARD_CONTENT_FILE)
	@echo " Done!"

orig-chapters: orig-standard

orig-compendium: backup-compendium
	@echo "Setting original compendium chapters and publications..."
	perl -0pi -e 's!\\newcommand\{\\myDocumentStructure\}\{.*?\}!\\newcommand{\\myDocumentStructure}{compendium}!' $(CONFIG_FILE)
	perl -0pi -e 's!(\\newcommand\{\\myInclude(?:SampleLetter|Dedication|Acknowledgements|ListOfFigures|ListOfTables|ListOfAcronyms|ListOfSymbols|ListOfCode|ListOfAlgorithms|ListOfVideos)\}\{).*?(\})!$$1true$$2!g' $(CONFIG_FILE)
	rm -f chapters/compendium/*.tex
	for f in $(COMPENDIUM_CHAPTER_ORIG_SOURCES); do cp $$f chapters/compendium; done
	cp $(COMPENDIUM_CONTENT_ORIG_FILE) $(COMPENDIUM_CONTENT_FILE)
	@echo " Done!"

bare-standard: backup-chapters
	@echo "Setting bare chapters..."
	perl -0pi -e 's!\\newcommand\{\\myDocumentStructure\}\{.*?\}!\\newcommand{\\myDocumentStructure}{standard}!' $(CONFIG_FILE)
	perl -0pi -e 's!(\\newcommand\{\\myInclude(?:SampleLetter|Dedication|Acknowledgements|ListOfFigures|ListOfTables|ListOfAcronyms|ListOfSymbols|ListOfCode|ListOfAlgorithms|ListOfVideos)\}\{).*?(\})!$$1false$$2!g' $(CONFIG_FILE)
	rm -f chapters/*.tex
	rm -f appendix/*.tex
	for f in $(CHAPTER_BARE_SOURCES);  do cp $$f chapters; done
	for f in $(APPENDIX_BARE_SOURCES); do cp $$f appendix; done
	cp $(STANDARD_CONTENT_BARE_FILE) $(STANDARD_CONTENT_FILE)
	@echo " Done!"

bare-chapters: bare-standard

bare-compendium: backup-compendium
	@echo "Setting bare compendium chapters and publications..."
	perl -0pi -e 's!\\newcommand\{\\myDocumentStructure\}\{.*?\}!\\newcommand{\\myDocumentStructure}{compendium}!' $(CONFIG_FILE)
	perl -0pi -e 's!(\\newcommand\{\\myInclude(?:SampleLetter|Dedication|Acknowledgements|ListOfFigures|ListOfTables|ListOfAcronyms|ListOfSymbols|ListOfCode|ListOfAlgorithms|ListOfVideos)\}\{).*?(\})!$$1false$$2!g' $(CONFIG_FILE)
	rm -f chapters/compendium/*.tex
	for f in $(COMPENDIUM_CHAPTER_BARE_SOURCES); do cp $$f chapters/compendium; done
	cp $(COMPENDIUM_CONTENT_BARE_FILE) $(COMPENDIUM_CONTENT_FILE)
	@echo " Done!"

clean-orig-figures:
	@echo "About to delete the files in the 'figures' directory..."
	@echo "This cannot be undone..."
	@echo "Got it?..."
	@read -p "I will ask you once... Are you sure to delete all files there? " dodelete; \
	if [ "$$dodelete" == "Y" ]; \
	then \
	rm -f figures/*.eps figures/*.pdf figures/*.png figures/*.jpg; \
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

all_latexmk: $(DUMMY_TARGETS)
	$(LATEXMK_TOOL) -$(PDF_PREFIX) -pdflatex="pdflatex $(FLAGS_SYNCTEX_PDFLATEX) -interactive=nonstopmode" -xelatex="xelatex $(FLAGS_SYNCTEX_PDFLATEX) -interactive=nonstopmode" -lualatex="lualatex $(FLAGS_SYNCTEX_PDFLATEX) -interactive=nonstopmode" -use-make $(TEX_FILE)
	$(MAKEGLOSSARIES_TOOL) $(ROOT_FILENAME)
	$(LATEXMK_TOOL) -$(PDF_PREFIX) -pdflatex="pdflatex $(FLAGS_SYNCTEX_PDFLATEX) -interactive=nonstopmode" -xelatex="xelatex $(FLAGS_SYNCTEX_PDFLATEX) -interactive=nonstopmode" -lualatex="lualatex $(FLAGS_SYNCTEX_PDFLATEX) -interactive=nonstopmode" -use-make $(TEX_FILE)

snapshot:
	$(LATEXPAND_TOOL) $(TEX_FILE) > $(SNAPSHOT_FLATTEN_TEX_FILE)

flatten:
	$(LATEXPAND_TOOL) $(TEX_FILE) > $(FLATTEN_TEX_FILE)

latexdiff: flatten
	latexdiff --encoding=utf8 --config="PICTUREENV=(?:picture|tikzpicture|DIFnomarkup)[\w\d*@]*" $(SNAPSHOT_FLATTEN_TEX_FILE) $(FLATTEN_TEX_FILE) | sed -e 's/^[ ]*//g' | sed -e 's/[ ]*$$//g' | perl -0777 -pe 's/[}]\n\\end[{]tikzpicture[}];\n\\end[{]tikzpicture[}]/\\end{tikzpicture}\n};\n\\end{tikzpicture}/g' > $(DIFF_FLATTEN_TEX_FILE)
	$(PDF_TOOL) $(FLAGS_SYNCTEX_PDFLATEX) $(DIFF_FLATTEN_TEX_FILE)
	$(BIBLIO_TOOL) $(DIFF_FLATTEN_ROOT_FILENAME)
	$(MAKEGLOSSARIES_TOOL) $(DIFF_FLATTEN_ROOT_FILENAME)
	$(PDF_TOOL) $(FLAGS_SYNCTEX_PDFLATEX) $(DIFF_FLATTEN_TEX_FILE)

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


clean:
	$(RM) $(DUMMY_TARGETS)
	$(RM) $(ROOT_FILENAME).pdf $(ROOT_FILENAME).acn $(ROOT_FILENAME).sbl $(ROOT_FILENAME).out $(ROOT_FILENAME).log $(ROOT_FILENAME).bcf $(ROOT_FILENAME).aux $(ROOT_FILENAME).bbl  $(ROOT_FILENAME).blg  $(ROOT_FILENAME).ist $(ROOT_FILENAME).glsdefs $(ROOT_FILENAME).toc $(ROOT_FILENAME).run.xml $(ROOT_FILENAME).lot $(ROOT_FILENAME).lof $(ROOT_FILENAME).loa $(ROOT_FILENAME).cod $(ROOT_FILENAME).alg $(ROOT_FILENAME).acr $(ROOT_FILENAME).sym $(ROOT_FILENAME).slg

clean_latexmk:
	$(LATEXMK_TOOL) -C $(TEX_FILE)
	$(RM) $(ROOT_FILENAME).bbl
	$(RM) $(ROOT_FILENAME).sbl
	$(RM) $(ROOT_FILENAME).ist
	$(RM) $(ROOT_FILENAME).acn
	$(RM) $(ROOT_FILENAME).cod
	$(RM) $(ROOT_FILENAME).alg
	$(RM) $(ROOT_FILENAME).acr
	$(RM) $(ROOT_FILENAME).sym
	$(RM) $(ROOT_FILENAME).slg

.PHONY: $(DUMMY_MAIN_TARGETS) $(DUMMY_DIFF_TARGETS) $(DUMMY_TARGETS)

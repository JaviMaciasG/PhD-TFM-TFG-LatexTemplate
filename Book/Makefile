# Makefile to generate book.pdf

# Configuration
SHELL = /bin/bash
CONFIG_FILE = ../Config/myconfig.tex
PRELUDE_FILE = ../Config/preamble.tex
WORKTYPES_FILE = ../Config/worktypes.txt

# Tools
LATEXMK_TOOL = latexmk
EPSPDF_TOOL = epspdf
TAR_TOOL = tar
GZIP_TOOL = gzip
ZIP_TOOL = zip
DIA_TOOL = dia
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

# Read configuration variables
DEGREE_NAME = $(shell grep -v "%" $(CONFIG_FILE) | grep "myDegree" | cut -f 3 -d "{" | cut -f 1 -d "}")
AUTHOR_NAME = $(shell grep -v "%" $(CONFIG_FILE) | grep "myAuthorName" | grep -v "myAuthorFullName" | cut -f 3 -d "{" | cut -f 1 -d "}" | tr -d " " | iconv -f utf8 -t ascii//TRANSLIT)
AUTHOR_SURNAME = $(shell grep -v "%" $(CONFIG_FILE) | grep "myAuthorSurname" | grep -v "myAuthorFullName" | cut -f 3 -d "{" | cut -f 1 -d "}" | tr -d " " | iconv -f utf8 -t ascii//TRANSLIT)
BOOK_LANGUAGE = $(shell grep -v "%" $(CONFIG_FILE) | grep "myLanguage" | cut -f 3 -d "{" | cut -f 1 -d "}")
BOOK_TYPE = $(shell grep -w $(DEGREE_NAME) $(WORKTYPES_FILE) | tr -s " " | cut -f 2 -d " " | tr -d " ")
RELEASE = $(shell git describe --tags --abbrev=0)

# Filenames
ROOT_FILENAME = book
ROOT_FINAL_BOOK_FILENAME = $(BOOK_TYPE)-$(DEGREE_NAME)-$(AUTHOR_SURNAME)-$(AUTHOR_NAME)-$(BOOK_LANGUAGE)
TEX_FILE = $(ROOT_FILENAME).tex
FLATTEN_TEX_FILE = $(ROOT_FILENAME)-flatten.tex
SNAPSHOT_FLATTEN_TEX_FILE = $(ROOT_FILENAME)-flatten-snapshot.tex
DIFF_FLATTEN_ROOT_FILENAME = $(ROOT_FILENAME)-flatten-diff
DIFF_FLATTEN_TEX_FILE = $(DIFF_FLATTEN_ROOT_FILENAME).tex

# Source files
CHAPTER_SOURCES = $(wildcard chapters/*.tex)
CHAPTER_ORIG_SOURCES = $(wildcard chapters/orig/*.tex)
CHAPTER_BARE_SOURCES = $(wildcard chapters/bare/*.tex)
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
DUMMY_MAIN_TARGETS = all bare backup-chapters orig-chapters bare-chapters clean-orig-figures clean-orig-diagrams all_latexmk tar clean clean_latexmk
DUMMY_DIFF_TARGETS = snapshot flatten latexdiff
DUMMY_TARGETS = pdf_dia_done pdf_svg_done pdf_eps_done

# Date
DATE = $(shell date "+%C%y%m%d-%H%M%S")

# Main targets
all: $(DUMMY_TARGETS)
	@echo "Processing LaTeX code with $(PDF_TOOL)"
	@echo "Processing bibliography with $(BIBLIO_TOOL)"
	$(PDF_TOOL) $(FLAGS_SYNCTEX_PDFLATEX) $(TEX_FILE)
	$(BIBLIO_TOOL) $(ROOT_FILENAME)
	$(MAKEGLOSSARIES_TOOL) $(ROOT_FILENAME)
	$(PDF_TOOL) $(FLAGS_SYNCTEX_PDFLATEX) $(TEX_FILE)
	$(PDF_TOOL) $(FLAGS_SYNCTEX_PDFLATEX) $(TEX_FILE)
	cp $(ROOT_FILENAME).pdf $(ROOT_FINAL_BOOK_FILENAME).pdf
	@echo "Generating release number"
	-rm ../RELEASE.txt
	echo "$(RELEASE)" > ../RELEASE.txt
	git add ../RELEASE.txt


bare: backup-chapters bare-chapters clean-orig-figures clean-orig-diagrams

backup-chapters:
	@echo "Backup up chapter sources to chapters/$(DATE)..."
	mkdir -p chapters/$(DATE)
	cp $(CHAPTER_SOURCES) chapters/$(DATE)
	@echo " Done!"
	@echo "Backup up appendix sources to appendix/$(DATE)..."
	mkdir -p appendix/$(DATE)
	cp $(APPENDIX_SOURCES) appendix/$(DATE)
	@echo " Done!"

orig-chapters: backup-chapters
	@echo "Setting orig chapters..."
	for f in $(CHAPTER_ORIG_SOURCES);  do cp $$f chapters; done
	for f in $(APPENDIX_ORIG_SOURCES); do cp $$f appendix; done
	@echo " Done!"

bare-chapters: backup-chapters
	@echo "Setting orig chapters..."
	for f in $(CHAPTER_BARE_SOURCES);  do cp $$f chapters; done
	for f in $(APPENDIX_BARE_SOURCES); do cp $$f appendix; done
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

tar:
	$(TAR_TOOL) -uvf $(ROOT_FILENAME)-latex.tar `find . -name Makefile -o -name README -o -name "*.txt" -o -name "*.ppt*" -o -name "*.c" -o -name "*.sty" -o -name "*.tex" -o -name "*.bib" -o -name "*.pdf" -o -name "*.png" -o -name "*.jpg" -o -name "*.dia" -o -name "*.eps" -o -name "*.EPS" `
	$(GZIP_TOOL) $(ROOT_FILENAME)-latex.tar
	$(ZIP_TOOL) -u $(ROOT_FILENAME)-latex.zip `find . -name Makefile -o -name README -o -name "*.txt" -o -name "*.ppt*" -o -name "*.c" -o -name "*.sty" -o -name "*.tex" -o -name "*.bib" -o -name "*.pdf" -o -name "*.png" -o -name "*.jpg" -o -name "*.dia" -o -name "*.eps" -o -name "*.EPS" `

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

###########################################################################
# 
# Makefile to generate book.pdf
#
# $Id: Makefile,v 1.22 2016/07/14 23:37:33 macias Exp $
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

SHELL=/bin/bash

DEGREE_NAME=$(shell cat ../Config/myconfig.tex | grep -v "%" | grep "myDegree" | cut -f 3 -d "{"| cut -f 1 -d "}")
# Here you can use "iconv -f utf8 -t ascii//TRANSLIT test1" or sed "y/áéíóúñüÁÉÍÓÚÑÜ/aeiounuAEIOUNU/"
AUTHOR_NAME=$(shell cat ../Config/myconfig.tex | grep -v "%" | grep "myAuthorName" | grep -v "myAuthorFullName" | cut -f 3 -d "{"| cut -f 1 -d "}" | tr -d " ")
AUTHOR_SURNAME=$(shell cat ../Config/myconfig.tex | grep -v "%" | grep "myAuthorSurname" | grep -v "myAuthorFullName" | cut -f 3 -d "{"| cut -f 1 -d "}" | tr -d " ")
BOOK_LANGUAGE=$(shell cat ../Config/myconfig.tex | grep -v "%" | grep "myLanguage" | cut -f 3 -d "{"| cut -f 1 -d "}")
BOOK_TYPE=$(shell cat ../Config/worktypes.txt | grep -w $(DEGREE_NAME) | tr -s " " | cut -f 2 -d " " | tr -d " ")

ROOT_FILENAME=book
#ROOT_FINAL_BOOK_FILENAME=$(ROOT_FILENAME)-$(DEGREE_NAME)-$(AUTHOR_SURNAME)-$(AUTHOR_NAME)-$(BOOK_LANGUAGE)
ROOT_FINAL_BOOK_FILENAME=$(BOOK_TYPE)-$(DEGREE_NAME)-$(AUTHOR_SURNAME)-$(AUTHOR_NAME)-$(BOOK_LANGUAGE)
TEX_FILE = $(ROOT_FILENAME).tex
FLATTEN_TEX_FILE = $(ROOT_FILENAME)-flatten.tex
SNAPSHOT_FLATTEN_TEX_FILE = $(ROOT_FILENAME)-flatten-snapshot.tex
DIFF_FLATTEN_ROOT_FILENAME = $(ROOT_FILENAME)-flatten-diff
DIFF_FLATTEN_TEX_FILE = $(DIFF_FLATTEN_ROOT_FILENAME).tex
RUBBER_TOOL=rubber
LATEXMK_TOOL=latexmk
EPSPDF_TOOL=epspdf
RM=rm -f

###########################################################################
# Support to automagically compile dia+svg files. Adapt to your own needs
CHAPTER_SOURCES=$(wildcard chapters/*.tex)
CHAPTER_ORIG_SOURCES=$(wildcard chapters/orig/*.tex)
CHAPTER_BARE_SOURCES=$(wildcard chapters/bare/*.tex)
APPENDIX_SOURCES=$(wildcard appendix/*.tex)
APPENDIX_ORIG_SOURCES=$(wildcard appendix/orig/*.tex)
APPENDIX_BARE_SOURCES=$(wildcard appendix/bare/*.tex)
DIA_SOURCES=$(wildcard diagrams/*.dia)
SVG_SOURCES=$(wildcard diagrams/*.svg)
EPS_SOURCES=$(wildcard figures/*.eps) $(wildcard additional/*.eps) 

TOOLS_SOURCES=$(wildcard tools/cals2latex/*.tex)

PDFS_FROM_DIA=$(patsubst %.dia,%.pdf,$(DIA_SOURCES)) 
PDFS_FROM_SVG=$(patsubst %.svg,%.pdf,$(SVG_SOURCES)) 
PDFS_FROM_EPS=$(patsubst %.eps,%.pdf,$(EPS_SOURCES)) 

DUMMY_TARGETS=pdf_dia_done pdf_svg_done pdf_eps_done

DATE=$(shell date "+%C%y%m%d-%H%M%S")

# To use synctex 
FLAGS_SYNCTEX_RUBBER=--synctex
FLAGS_SYNCTEX_PDFLATEX=-synctex=1

# To generate 
all: $(DUMMY_TARGETS)
	# $(RUBBER_TOOL) $(FLAGS_SYNCTEX_RUBBER) -f -d $(TEX_FILE)
	# makeglossaries $(ROOT_FILENAME)
	# $(RUBBER_TOOL) $(FLAGS_SYNCTEX_RUBBER) -f -d $(TEX_FILE)
	pdflatex $(FLAGS_SYNCTEX_PDFLATEX) $(TEX_FILE)
	bibtex $(ROOT_FILENAME)
	makeglossaries $(ROOT_FILENAME)
	pdflatex $(FLAGS_SYNCTEX_PDFLATEX) $(TEX_FILE)
	pdflatex $(FLAGS_SYNCTEX_PDFLATEX) $(TEX_FILE)
	echo $(ROOT_FINAL_BOOK_FILENAME)
	echo "[$(BOOK_TYPE)][$(DEGREE_NAME)][$(AUTHOR_SURNAME)][$(AUTHOR_NAME)][$(BOOK_LANGUAGE)]"
	mv $(ROOT_FILENAME).pdf $(ROOT_FINAL_BOOK_FILENAME).pdf

all_old: $(DUMMY_TARGETS)
	$(RUBBER_TOOL) $(FLAGS_SYNCTEX_RUBBER) -f -d $(TEX_FILE)
	makeglossaries $(ROOT_FILENAME)
	$(RUBBER_TOOL) $(FLAGS_SYNCTEX_RUBBER) -f -d $(TEX_FILE)


bare: backup-chapters bare-chapters clean-orig-figures clean-orig-diagrams


backup-chapters:
	@echo "Backup up chapter sources to chapters/$(DATE)..."
	mkdir chapters/$(DATE)
	cp $(CHAPTER_SOURCES) chapters/$(DATE)
	@echo " Done!"
	@echo "Backup up appendix sources to appendix/$(DATE)..."
	mkdir appendix/$(DATE)
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
	if [ \"$$dodelete\" == \"Y\" ]; \
	then \
	rm figures/*.eps figures/*.pdf figures/*.png figures/*.jpg; \
  fi

clean-orig-diagrams:
	@echo "About to delete the files in the 'diagrams' directory..."
	@echo "This cannot be undone..."
	@echo "Got it?..."
	@read -p "I will ask you once... Are you sure to delete all files there? " dodelete; \
	if [ \"$$dodelete\" == \"Y\" ]; \
	then \
	rm diagrams/*.eps diagrams/*.pdf diagrams/*.dia; \
	fi


all_latexmk: $(DUMMY_TARGETS)
	$(LATEXMK_TOOL) -pdf -pdflatex="pdflatex $(FLAGS_SYNCTEX_PDFLATEX) -interactive=nonstopmode" -use-make $(TEX_FILE)
	makeglossaries $(ROOT_FILENAME)
	$(LATEXMK_TOOL) -pdf -pdflatex="pdflatex $(FLAGS_SYNCTEX_PDFLATEX) -interactive=nonstopmode" -use-make $(TEX_FILE)

snapshot:
	latexpand $(TEX_FILE) > $(SNAPSHOT_FLATTEN_TEX_FILE)

flatten: 
	latexpand $(TEX_FILE) > $(FLATTEN_TEX_FILE)

# The very dirty hack you can see in the latexdiff command below is
# meant to fix the wrong code generation by latexdiff as of july
# 2021. This will very probably break in the future, but it just work
# now. 
latexdiff: flatten
	latexdiff --encoding=utf8 --config="PICTUREENV=(?:picture|tikzpicture|DIFnomarkup)[\w\d*@]*" $(SNAPSHOT_FLATTEN_TEX_FILE) $(FLATTEN_TEX_FILE)| sed -e 's/^[ ]*//g' | sed -e 's/[ ]*$$//g' | perl -0777  -pe 's/[}]\n\\end[{]tikzpicture[}];\n\\end[{]tikzpicture[}]/\\end{tikzpicture}\n};\n\\end{tikzpicture}/g' >  $(DIFF_FLATTEN_TEX_FILE)
#	$(RUBBER_TOOL) $(FLAGS_SYNCTEX_RUBBER) -d $(DIFF_FLATTEN_TEX_FILE)
#	makeglossaries $(DIFF_FLATTEN_ROOT_FILENAME)
#	$(RUBBER_TOOL) $(FLAGS_SYNCTEX_RUBBER) -d $(DIFF_FLATTEN_TEX_FILE)
	pdflatex $(FLAGS_SYNCTEX_PDFLATEX) $(DIFF_FLATTEN_TEX_FILE)
	bibtex $(DIFF_FLATTEN_ROOT_FILENAME)
	makeglossaries $(DIFF_FLATTEN_ROOT_FILENAME)
	pdflatex $(FLAGS_SYNCTEX_PDFLATEX) $(DIFF_FLATTEN_TEX_FILE)
	pdflatex $(FLAGS_SYNCTEX_PDFLATEX) $(DIFF_FLATTEN_TEX_FILE)



pdf_dia_done: $(PDFS_FROM_DIA)
#	echo "Generating pdfs from DIA: [$(PDFS_FROM_DIA)]..."
	echo "Generating pdfs from DIA..."
	touch $@

pdf_svg_done: $(PDFS_FROM_SVG)
#	echo "Generating pdfs from SVG: [$(PDFS_FROM_SVG)]..."
	echo "Generating pdfs from SVG..."
	touch $@

pdf_eps_done: $(PDFS_FROM_EPS)
#	echo "Generating pdfs from EPS: [$(PDFS_FROM_EPS)]..."
	echo "Generating pdfs from EPS..."
	touch $@

%.pdf: %.dia
	echo "Converting $^ to $@..."
	dia -e $@.eps $^
	$(EPSPDF_TOOL) $@.eps $@
	$(RM) $@.eps

%.pdf: %.svg
	echo "Converting $^ to $@..."
	inkscape $^ --export-pdf=$@ -D

%.pdf: %.eps
	echo "Converting $^ to $@..."
	$(EPSPDF_TOOL) $^ $@ 
#	-epstopdf -outfile=$@ $^ 

tar:
#	gunzip $(ROOT_FILENAME)-latex.tar.gz
	tar -uvf $(ROOT_FILENAME)-latex.tar `find . -name Makefile -o -name README -o -name "*.txt" -o -name "*.ppt*" -o -name "*.c" -o -name "*.sty" -o -name "*.tex" -o -name "*.bib" -o -name "*.pdf" -o -name "*.png" -o -name "*.PNG" -o -name "*.jpg" -o -name "*.JPG" -o -name "*.dia" -o -name "*.eps" -o -name "*.EPS" ` 
	gzip $(ROOT_FILENAME)-latex.tar
	zip -u $(ROOT_FILENAME)-latex.zip `find . -name Makefile -o -name README -o -name "*.txt" -o -name "*.ppt*" -o -name "*.c" -o -name "*.sty" -o -name "*.tex" -o -name "*.bib" -o -name "*.pdf" -o -name "*.png" -o -name "*.PNG" -o -name "*.jpg" -o -name "*.JPG" -o -name "*.dia" -o -name "*.eps" -o -name "*.EPS" ` 

clean:
	$(RUBBER_TOOL) $(FLAGS_SYNCTEX_RUBBER) --clean -d $(TEX_FILE)
#	$(RM) $(PDFS_FROM_DIA)
#	$(RM) $(PDFS_FROM_SVG)
	$(RM) $(DUMMY_TARGETS)


clean_latexmk:
	$(LATEXMK_TOOL) -C $(TEX_FILE)
#	$(RM) $(PDFS_FROM_DIA)
#	$(RM) $(PDFS_FROM_SVG)
	-$(RM) $(ROOT_FILENAME).bbl
	-$(RM) $(ROOT_FILENAME).sbl
	-$(RM) $(ROOT_FILENAME).ist
	-$(RM) $(ROOT_FILENAME).acn
	-$(RM) $(ROOT_FILENAME).cod
	-$(RM) $(ROOT_FILENAME).alg
	-$(RM) $(ROOT_FILENAME).acr
	-$(RM) $(ROOT_FILENAME).sym
	-$(RM) $(ROOT_FILENAME).slg
	$(RM) $(DUMMY_TARGETS)

.PHONY:	all pdf clean tar $(DUMMY_TARGETS)



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

ROOT_FILENAME=anteproyecto
TEX_FILE = $(ROOT_FILENAME).tex
FLATTEN_TEX_FILE = $(ROOT_FILENAME)-flatten.tex
SNAPSHOT_FLATTEN_TEX_FILE = $(ROOT_FILENAME)-flatten-snapshot.tex
DIFF_FLATTEN_ROOT_FILENAME = $(ROOT_FILENAME)-flatten-diff
DIFF_FLATTEN_TEX_FILE = $(DIFF_FLATTEN_ROOT_FILENAME).tex
LATEXMK_TOOL=latexmk
EPSPDF_TOOL=epspdf
PDF_TOOL=pdflatex
# PDF_TOOL=xelatex
# PDF_TOOL=lualatex

ifeq ($(PDF_TOOL),pdflatex)
	PDF_PREFIX := $(shell echo $(PDF_TOOL) | sed -e "s/latex//")
else
	PDF_PREFIX := pdf$(shell echo $(PDF_TOOL) | sed -e "s/latex//" )
endif

RM=rm -f

BIBLIO_PACKAGE=$(shell cat ../Config/preamble-anteproyecto.tex | grep -e bibliosystem | grep -v ifthenelse | grep newcommand | grep -v "^\%" | cut -d'{' -f3 | cut -d'}' -f1 | tr -d " ")
ifeq ($(BIBLIO_PACKAGE),bibtex)
	BIBLIO_TOOL := bibtex
else
	BIBLIO_TOOL := biber
endif

###########################################################################
# Support to automagically compile dia+svg files. Adapt to your own needs
DIA_SOURCES=$(wildcard ../Book/diagrams/*.dia)
SVG_SOURCES=$(wildcard ../Book/diagrams/*.svg)
EPS_SOURCES=$(wildcard ../eps/*.eps) $(wildcard ../ALLcurvesROC-AV16.3/*.eps) $(wildcard ../ALLcurvesROC-HIFI-MM1/*.eps)

PDFS_FROM_DIA=$(patsubst %.dia,%.pdf,$(DIA_SOURCES)) 
PDFS_FROM_SVG=$(patsubst %.svg,%.pdf,$(SVG_SOURCES)) 
PDFS_FROM_EPS=$(patsubst %.eps,%.pdf,$(EPS_SOURCES)) 

DUMMY_TARGETS=pdf_dia_done pdf_svg_done pdf_eps_done

# To use synctex 
FLAGS_SYNCTEX_PDFLATEX=-synctex=1

all: $(DUMMY_TARGETS) anteproyecto

anteproyecto: $(TEX_FILENAME)
	$(PDF_TOOL) $(FLAGS_SYNCTEX_PDFLATEX) $(TEX_FILE)
	$(BIBLIO_TOOL) $(ROOT_FILENAME)	
	$(PDF_TOOL) $(FLAGS_SYNCTEX_PDFLATEX) $(TEX_FILE)
	$(PDF_TOOL) $(FLAGS_SYNCTEX_PDFLATEX) $(TEX_FILE)

anteproyecto_latexmk: $(TEX_FILENAME)
	# Note: pdflatex/lualatex, etc option when provided with the COMMAND
	# argument only sets the command for invoking pdflatex; it does not turn on
	# the use of pdflatex. That is done by other options or in an
	# initialization file. (Or using -pdf, -xepdf, -luapdf) as specified in $(PDF_TOOL)
	$(LATEXMK_TOOL) -$(PDF_PREFIX) -pdflatex="pdflatex $(FLAGS_SYNCTEX_PDFLATEX) -interactive=nonstopmode" -xelatex="xelatex $(FLAGS_SYNCTEX_PDFLATEX) -interactive=nonstopmode" -lualatex="lualatex $(FLAGS_SYNCTEX_PDFLATEX) -interactive=nonstopmode" -use-make $(TEX_FILE)

snapshot:
	latexpand $(TEX_FILE) > $(SNAPSHOT_FLATTEN_TEX_FILE)

flatten: 
	latexpand $(TEX_FILE) > $(FLATTEN_TEX_FILE)

latexdiff: flatten
	# latexdiff --encoding=utf8 --config="PICTUREENV=(?:picture|tikzpicture|DIFnomarkup)[\w\d*@]*" $((SNAPSHOT_FLATTEN_TEX_FILE) $(FLATTEN_TEX_FILE)
	latexdiff --encoding=utf8 --config="PICTUREENV=(?:picture|tikzpicture|DIFnomarkup)[\w\d*@]*" $(SNAPSHOT_FLATTEN_TEX_FILE) $(FLATTEN_TEX_FILE) > $(DIFF_FLATTEN_TEX_FILE)
	# latexdiff-git --force -r $(FLATTEN_TEX_FILE)
	$(PDF_TOOL) $(FLAGS_SYNCTEX_PDFLATEX) $(DIFF_FLATTEN_ROOT_FILENAME)
	$(BIBLIO_TOOL)  $(DIFF_FLATTEN_ROOT_FILENAME)
	$(PDF_TOOL) $(FLAGS_SYNCTEX_PDFLATEX) $(DIFF_FLATTEN_ROOT_FILENAME)
	$(PDF_TOOL) $(FLAGS_SYNCTEX_PDFLATEX) $(DIFF_FLATTEN_ROOT_FILENAME)


pdf_dia_done: $(PDFS_FROM_DIA)
	echo "Generating pdfs from DIA: [$(PDFS_FROM_DIA)]..."
	touch $@

pdf_svg_done: $(PDFS_FROM_SVG)
	echo "Generating pdfs from SVG: [$(PDFS_FROM_SVG)]..."
	touch $@

pdf_eps_done: $(PDFS_FROM_EPS)
	echo "Generating pdfs from EPS: [$(PDFS_FROM_EPS)]..."
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
	gunzip $(ROOT_FILENAME)-latex.tar.gz
	tar -uvf $(ROOT_FILENAME)-latex.tar `find . -name Makefile -o -name README -o -name "*.txt" -o -name "*.ppt*" -o -name "*.c" -o -name "*.sty" -o -name "*.tex" -o -name "*.bib" -o -name "*.pdf" -o -name "*.png" -o -name "*.PNG" -o -name "*.jpg" -o -name "*.JPG" -o -name "*.dia" -o -name "*.eps" -o -name "*.EPS"` 
	gzip $(ROOT_FILENAME)-latex.tar
	zip -u $(ROOT_FILENAME)-latex.zip `find . -name Makefile -o -name README -o -name "*.txt" -o -name "*.ppt*" -o -name "*.c" -o -name "*.sty" -o -name "*.tex" -o -name "*.bib" -o -name "*.pdf" -o -name "*.png" -o -name "*.PNG" -o -name "*.jpg" -o -name "*.JPG" -o -name "*.dia" -o -name "*.eps" -o -name "*.EPS"` 

clean:
#	$(RM) $(PDFS_FROM_DIA)
#	$(RM) $(PDFS_FROM_SVG)
	$(RM) $(DUMMY_TARGETS)
	$(RM) $(ROOT_FILENAME).acn $(ROOT_FILENAME).sbl $(ROOT_FILENAME).out $(ROOT_FILENAME).log $(ROOT_FILENAME).bcf $(ROOT_FILENAME).aux $(ROOT_FILENAME).bbl  $(ROOT_FILENAME).blg  $(ROOT_FILENAME).ist $(ROOT_FILENAME).glsdefs $(ROOT_FILENAME).toc $(ROOT_FILENAME).run.xml $(ROOT_FILENAME).lot $(ROOT_FILENAME).lof $(ROOT_FILENAME).loa $(ROOT_FILENAME).cod $(ROOT_FILENAME).alg $(ROOT_FILENAME).acr $(ROOT_FILENAME).sym $(ROOT_FILENAME).slg


clean_latexmk:
	$(LATEXMK_TOOL) -C $(TEX_FILE)
#	$(RM) $(PDFS_FROM_DIA)
#	$(RM) $(PDFS_FROM_SVG)
	-$(RM) $(ROOT_FILENAME).blg
	-$(RM) $(ROOT_FILENAME).bbl
	-$(RM) $(ROOT_FILENAME).out
	-$(RM) $(ROOT_FILENAME).aux
	-$(RM) $(ROOT_FILENAME).pdf
	-$(RM) $(ROOT_FILENAME).log
	-$(RM) $(ROOT_FILENAME).fdb_latexmk
	$(RM) $(DUMMY_TARGETS)

.PHONY:	all pdf clean tar $(DUMMY_TARGETS)



###########################################################################
# 
# Makefile to generate slides
#
# $Id: Makefile,v 1.2 2014/10/13 12:57:40 macias Exp $
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

ROOT_FILENAME=slides
TEX_FILE = $(ROOT_FILENAME).tex
RUBBER_TOOL=rubber
LATEXMK_TOOL=latexmk
EPSPDF_TOOL=epspdf
RM=rm -f

# PDF_TOOL=pdflatex
# PDF_TOOL=xelatex
PDF_TOOL=lualatex

ifeq ($(PDF_TOOL),pdflatex)
	PDF_PREFIX := $(shell echo $(PDF_TOOL) | sed -e "s/latex//")
else
	PDF_PREFIX := pdf$(shell echo $(PDF_TOOL) | sed -e "s/latex//" )
endif

###########################################################################
# Support to automagically compile dia+svg files. Adapt to your own needs
DIA_SOURCES=$(wildcard ../diagrams/*.dia)
SVG_SOURCES=$(wildcard ../diagrams/*.svg)
EPS_SOURCES=$(wildcard ../eps/*.eps) $(wildcard ALLcurvesROC-AV16.3/*.eps) $(wildcard ALLcurvesROC-HIFI-MM1/*.eps)

PDFS_FROM_DIA=$(patsubst %.dia,%.pdf,$(DIA_SOURCES)) 
PDFS_FROM_SVG=$(patsubst %.svg,%.pdf,$(SVG_SOURCES)) 
PDFS_FROM_EPS=$(patsubst %.eps,%.pdf,$(EPS_SOURCES)) 

DUMMY_TARGETS=pdf_dia_done pdf_svg_done pdf_eps_done

all: $(DUMMY_TARGETS) $(TEX_FILE)
	$(PDF_TOOL) $(FLAGS_SYNCTEX_PDFLATEX) $(TEX_FILE)
	$(PDF_TOOL) $(FLAGS_SYNCTEX_PDFLATEX) $(TEX_FILE)
	$(PDF_TOOL) $(FLAGS_SYNCTEX_PDFLATEX) $(TEX_FILE)

all_latexmk: $(DUMMY_TARGETS)
	$(LATEXMK_TOOL) -$(PDF_PREFIX) -pdflatex="pdflatex $(FLAGS_SYNCTEX_PDFLATEX) -interactive=nonstopmode" -xelatex="xelatex $(FLAGS_SYNCTEX_PDFLATEX) -interactive=nonstopmode" -lualatex="lualatex $(FLAGS_SYNCTEX_PDFLATEX) -interactive=nonstopmode" -use-make $(TEX_FILE)

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
#	gunzip $(ROOT_FILENAME)-latex.tar.gz
	tar -uvf $(ROOT_FILENAME)-latex.tar `find . -name Makefile -o -name README -o -name "*.txt" -o -name "*.ppt*" -o -name "*.c" -o -name "*.sty" -o -name "*.tex" -o -name "*.bib" -o -name "*.pdf" -o -name "*.png" -o -name "*.PNG" -o -name "*.jpg" -o -name "*.JPG" -o -name "*.dia" -o -name "*.eps" -o -name "*.EPS"` 
	gzip $(ROOT_FILENAME)-latex.tar
	zip -u $(ROOT_FILENAME)-latex.zip `find . -name Makefile -o -name README -o -name "*.txt" -o -name "*.ppt*" -o -name "*.c" -o -name "*.sty" -o -name "*.tex" -o -name "*.bib" -o -name "*.pdf" -o -name "*.png" -o -name "*.PNG" -o -name "*.jpg" -o -name "*.JPG" -o -name "*.dia" -o -name "*.eps" -o -name "*.EPS"` 

clean:
	$(RUBBER_TOOL) --clean -d $(TEX_FILE)
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



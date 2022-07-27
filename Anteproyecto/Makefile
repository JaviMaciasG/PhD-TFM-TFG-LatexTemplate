###########################################################################
# 
# Makefile to generate anteproyecto.pdf
#
# $Id: Makefile,v 1.4 2016/03/31 23:38:15 macias Exp $
#
# By:
#  + Javier MacÃ­as-Guarasa. 
#    Departamento de ElectrÃ³nica
#    Universidad de AlcalÃ¡
#  + Roberto Barra-Chicote. 
#    Departamento de IngenierÃ­a ElectrÃ³nica
#    Universidad PolitÃ©cnica de Madrid   
# 
# Based on original sources by Roberto Barra, Manuel OcaÃ±a, JesÃºs Nuevo,
# Pedro Revenga, Fernando HerrÃ¡nz and Noelia HernÃ¡ndez. Thanks a lot to
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
RUBBER_TOOL=rubber
LATEXMK_TOOL=latexmk
EPSPDF_TOOL=epspdf
RM=rm -f

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
FLAGS_SYNCTEX_RUBBER=--synctex
FLAGS_SYNCTEX_PDFLATEX=-synctex=1

all: $(DUMMY_TARGETS) anteproyecto
#	$(RUBBER_TOOL) -f -d $(TEX_FILE)
#	$(RUBBER_TOOL) -f -d $(TEX_FILE)

anteproyecto: $(TEX_FILENAME)
	pdflatex $(FLAGS_SYNCTEX_PDFLATEX) $(TEX_FILE)
	bibtex $(ROOT_FILENAME)	
	pdflatex $(FLAGS_SYNCTEX_PDFLATEX) $(TEX_FILE)
	pdflatex $(FLAGS_SYNCTEX_PDFLATEX) $(TEX_FILE)
#	$(RUBBER_TOOL) -f -d $(TEX_FILE)
#	$(RUBBER_TOOL) -f -d $(TEX_FILE)

anteproyecto_latexmk: $(TEX_FILENAME)
	$(LATEXMK_TOOL) -pdf -pdflatex="pdflatex $(FLAGS_SYNCTEX_PDFLATEX) -interactive=nonstopmode" -use-make $(TEX_FILE)
	$(LATEXMK_TOOL) -pdf -pdflatex="pdflatex $(FLAGS_SYNCTEX_PDFLATEX) -interactive=nonstopmode" -use-make $(TEX_FILE)

snapshot:
	latexpand $(TEX_FILE) > $(SNAPSHOT_FLATTEN_TEX_FILE)

flatten: 
	latexpand $(TEX_FILE) > $(FLATTEN_TEX_FILE)

latexdiff: flatten
#	latexdiff --encoding=utf8 --config="PICTUREENV=(?:picture|tikzpicture|DIFnomarkup)[\w\d*@]*" $((SNAPSHOT_FLATTEN_TEX_FILE) $(FLATTEN_TEX_FILE)
	latexdiff --encoding=utf8 --config="PICTUREENV=(?:picture|tikzpicture|DIFnomarkup)[\w\d*@]*" $(SNAPSHOT_FLATTEN_TEX_FILE) $(FLATTEN_TEX_FILE) > $(DIFF_FLATTEN_TEX_FILE)
#latexdiff-git --force -r $(FLATTEN_TEX_FILE)
	pdflatex $(FLAGS_SYNCTEX_PDFLATEX) $(DIFF_FLATTEN_ROOT_FILENAME)
	bibtex  $(DIFF_FLATTEN_ROOT_FILENAME)
	pdflatex $(FLAGS_SYNCTEX_PDFLATEX) $(DIFF_FLATTEN_ROOT_FILENAME)
	pdflatex $(FLAGS_SYNCTEX_PDFLATEX) $(DIFF_FLATTEN_ROOT_FILENAME)
#	$(RUBBER_TOOL) -d $(DIFF_FLATTEN_TEX_FILE)
#	$(RUBBER_TOOL) -d $(DIFF_FLATTEN_TEX_FILE)


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
	$(RUBBER_TOOL) --clean -d $(TEX_FILE)
#	$(RM) $(PDFS_FROM_DIA)
#	$(RM) $(PDFS_FROM_SVG)
	$(RM) $(DUMMY_TARGETS)


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



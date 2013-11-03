###########################################################################
# 
# Makefile to compile proyecto.tex 
#
###########################################################################

ROOT_FILENAME=book
TEX_FILE = $(ROOT_FILENAME).tex

# Support to automagically compile dia and svg files. Adapt to your own
# needs
DIA_SOURCES=$(wildcard diagrams/*.dia)
SVG_SOURCES=$(wildcard diagrams/*.svg)

PDFS_FROM_DIA=$(patsubst %.dia,%.pdf,$(DIA_SOURCES)) 
PDFS_FROM_SVG=$(patsubst %.svg,%.pdf,$(SVG_SOURCES)) 

all: pdf_dia_done pdf_svg_done
	rubber -f -d $(TEX_FILE)
	makeglossaries $(ROOT_FILENAME)
	rubber -f -d $(TEX_FILE)

pdf_dia_done: $(PDFS_FROM_DIA)
	echo "Generating pdfs from DIA: [$(PDFS_FROM_DIA)]..."
	touch $@

pdf_svg_done: $(PDFS_FROM_SVG)
	echo "Generating pdfs from SVG: [$(PDFS_FROM_SVG)]..."
	touch $@

%.pdf: %.dia
	echo "Converting $^ to $@..."
	dia -e $@.eps $^
	epspdf $@.eps $@
	rm -f $@.eps

%.pdf: %.svg
	echo "Converting $^ to $@..."
	inkscape $^ --export-pdf=$@ -D



tar:
	tar czvf `basename $(TEX_FILE) .tex`.tgz *.tex *.bib *.pdf *.bst *.cls *.png *.PNG *.jpg *.JPG 

clean:
	rubber --clean -d $(TEX_FILE)
	rm -f $(PDFS_FROM_DIA)
	rm -f $(PDFS_FROM_SVG)

.PHONY:	all pdf clean tar 



###########################################################################
# 
# Makefile to compile proyecto.tex 
#
###########################################################################

ROOT_FILENAME=book
TEX_FILE = $(ROOT_FILENAME).tex
RUBBER_TOOL=rubber
LATEXMK_TOOL=latexmk
EPSPDF_TOOL=epspdf
RM=rm -f

###########################################################################
# Support to automagically compile dia+svg files. Adapt to your own needs
DIA_SOURCES=$(wildcard diagrams/*.dia)
SVG_SOURCES=$(wildcard diagrams/*.svg)
EPS_SOURCES=$(wildcard eps/*.eps) $(wildcard ALLcurvesROC-AV16.3/*.eps) $(wildcard ALLcurvesROC-HIFI-MM1/*.eps)

PDFS_FROM_DIA=$(patsubst %.dia,%.pdf,$(DIA_SOURCES)) 
PDFS_FROM_SVG=$(patsubst %.svg,%.pdf,$(SVG_SOURCES)) 
PDFS_FROM_EPS=$(patsubst %.eps,%.pdf,$(EPS_SOURCES)) 

DUMMY_TARGETS=pdf_dia_done pdf_svg_done pdf_eps_done

all: $(DUMMY_TARGETS)
	$(RUBBER_TOOL) -f -d $(TEX_FILE)
	makeglossaries $(ROOT_FILENAME)
	$(RUBBER_TOOL) -f -d $(TEX_FILE)

all_latexmk: $(DUMMY_TARGETS)
	$(LATEXMK_TOOL) -pdf -pdflatex="pdflatex -interactive=nonstopmode" -use-make $(TEX_FILE)
	makeglossaries $(ROOT_FILENAME)
	$(LATEXMK_TOOL) -pdf -pdflatex="pdflatex -interactive=nonstopmode" -use-make $(TEX_FILE)

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
	tar czvf $(ROOT_FILENAME).tgz Makefile README additionalContributors.txt `find . -name "*.c" -o -name "*.sty" -o -name "*.tex" -o -name "*.bib" -o -name "*.pdf" -o -name "*.png" -o -name "*.PNG" -o -name "*.jpg" -o -name "*.JPG" -o -name "*.dia" -o -name "*.eps" -o -name "*.EPS"` 

clean:
	$(RUBBER_TOOL) --clean -d $(TEX_FILE)
#	$(RM) $(PDFS_FROM_DIA)
#	$(RM) $(PDFS_FROM_SVG)
	$(RM) $(DUMMY_TARGETS)

clean_latexmk:
	$(LATEXMK_TOOL) -CF
#	$(RM) $(PDFS_FROM_DIA)
#	$(RM) $(PDFS_FROM_SVG)
	-$(RM) book.bbl
	-$(RM) book.sbl
	-$(RM) book.ist
	-$(RM) book.acn
	-$(RM) book.cod
	-$(RM) book.alg
	-$(RM) book.acr
	-$(RM) book.sym
	-$(RM) book.slg
	$(RM) $(DUMMY_TARGETS)

.PHONY:	all pdf clean tar $(DUMMY_TARGETS)



###########################################################################
# 
# Makefile to compile proyecto.tex 
#
###########################################################################


ROOT_CARTA8 = vistoBuenoTutorTFM
TEX_CARTA8 = $(ROOT_CARTA8).tex
RUBBER_TOOL=rubber
LATEXMK_TOOL=latexmk
EPSPDF_TOOL=epspdf
PDFLATEX=pdflatex
RM=rm -f

###########################################################################

all: $(DUMMY_TARGETS)
	$(PDFLATEX) $(TEX_CARTA8)
#	$(RUBBER_TOOL) -f -d $(TEX_CARTA8)


all_rubber: $(DUMMY_TARGETS)
#	$(RUBBER_TOOL) -d $(TEX_CARTA8)
	$(RUBBER_TOOL) -f -d $(TEX_CARTA8)

all_latexmk: $(DUMMY_TARGETS)
#	$(LATEXMK_TOOL) -pdf -pdflatex="pdflatex -interactive=nonstopmode" -use-make $(TEX_CARTA8)
#	$(LATEXMK_TOOL) -pdf -pdflatex="pdflatex -interactive=nonstopmode" -use-make $(TEX_CARTA8)

tar:
	tar czvf $(ROOT_FILENAME).tgz Makefile README `find . -name "*.txt" -o -name "*.ppt*" -o -name "*.c" -o -name "*.sty" -o -name "*.tex" -o -name "*.bib" -o -name "*.pdf" -o -name "*.png" -o -name "*.PNG" -o -name "*.jpg" -o -name "*.JPG" -o -name "*.dia" -o -name "*.eps" -o -name "*.EPS"` 
	zip $(ROOT_FILENAME).zip Makefile README `find . -name "*.txt" -o -name "*.ppt*" -o -name "*.c" -o -name "*.sty" -o -name "*.tex" -o -name "*.bib" -o -name "*.pdf" -o -name "*.png" -o -name "*.PNG" -o -name "*.jpg" -o -name "*.JPG" -o -name "*.dia" -o -name "*.eps" -o -name "*.EPS"` 

clean:
	$(RUBBER_TOOL) --clean -d $(TEX_CARTA8)

#	$(RM) $(PDFS_FROM_DIA)
#	$(RM) $(PDFS_FROM_SVG)
	$(RM) $(DUMMY_TARGETS)

.PHONY:	all pdf clean tar



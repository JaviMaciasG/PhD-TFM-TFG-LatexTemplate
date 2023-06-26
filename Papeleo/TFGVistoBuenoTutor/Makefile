###########################################################################
# 
# Makefile to compile proyecto.tex 
#
###########################################################################


ROOT_CARTA3 = vistoBuenoTutorTFG
ROOT_CARTA7 = solicitudActaTFG
TEX_CARTA3 = $(ROOT_CARTA3).tex
TEX_CARTA7 = $(ROOT_CARTA7).tex
RUBBER_TOOL=rubber
LATEXMK_TOOL=latexmk
EPSPDF_TOOL=epspdf
PDFLATEX=pdflatex
RM=rm -f

###########################################################################

all: $(DUMMY_TARGETS)
	$(PDFLATEX) $(TEX_CARTA3)
#	$(RUBBER_TOOL) -f -d $(TEX_CARTA3)
#	$(PDFLATEX) $(TEX_CARTA7)
#	$(RUBBER_TOOL) -f -d $(TEX_CARTA7)


all_rubber: $(DUMMY_TARGETS)
	$(RUBBER_TOOL) -d $(TEX_CARTA3)
#	$(RUBBER_TOOL) -f -d $(TEX_CARTA3)
#	$(RUBBER_TOOL) -d $(TEX_CARTA7)
#	$(RUBBER_TOOL) -f -d $(TEX_CARTA7)

all_latexmk: $(DUMMY_TARGETS)
	$(LATEXMK_TOOL) -pdf -pdflatex="pdflatex -interactive=nonstopmode" -use-make $(TEX_CARTA3)
#	$(LATEXMK_TOOL) -pdf -pdflatex="pdflatex -interactive=nonstopmode" -use-make $(TEX_CARTA3)
#	$(LATEXMK_TOOL) -pdf -pdflatex="pdflatex -interactive=nonstopmode" -use-make $(TEX_CARTA7)
#	$(LATEXMK_TOOL) -pdf -pdflatex="pdflatex -interactive=nonstopmode" -use-make $(TEX_CARTA7)

tar:
	tar czvf $(ROOT_FILENAME).tgz Makefile README `find . -name "*.txt" -o -name "*.ppt*" -o -name "*.c" -o -name "*.sty" -o -name "*.tex" -o -name "*.bib" -o -name "*.pdf" -o -name "*.png" -o -name "*.PNG" -o -name "*.jpg" -o -name "*.JPG" -o -name "*.dia" -o -name "*.eps" -o -name "*.EPS"` 
	zip $(ROOT_FILENAME).zip Makefile README `find . -name "*.txt" -o -name "*.ppt*" -o -name "*.c" -o -name "*.sty" -o -name "*.tex" -o -name "*.bib" -o -name "*.pdf" -o -name "*.png" -o -name "*.PNG" -o -name "*.jpg" -o -name "*.JPG" -o -name "*.dia" -o -name "*.eps" -o -name "*.EPS"` 

clean:
	$(RUBBER_TOOL) --clean -d $(TEX_CARTA3)
#	$(RUBBER_TOOL) --clean -d $(TEX_CARTA7)

#	$(RM) $(PDFS_FROM_DIA)
#	$(RM) $(PDFS_FROM_SVG)
	$(RM) $(DUMMY_TARGETS)

.PHONY:	all pdf clean tar



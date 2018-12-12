###########################################################################
# 
# Makefile to compile proyecto.tex 
#
###########################################################################


ROOT_CARTA1 = autorizacionTutorPublicarRepositorio
ROOT_CARTA2 = autorizacionAutorPublicarRepositorio
ROOT_CARTA3 = vistoBuenoTutorTFG
ROOT_CARTA4 = vistoBuenoTutorTFM-MUSEA
ROOT_CARTA5 = autorizacionPublicarAbiertoTFM-MUSEA
ROOT_CARTA6 = certificadoDepositoTFG
ROOT_CARTA7 = solicitudActaTFG
ROOT_CARTA8 = vistoBuenoTutorTFM
ROOT_CARTA8 = solicitudDepositoDefensa
TEX_CARTA1 = $(ROOT_CARTA1).tex
TEX_CARTA2 = $(ROOT_CARTA2).tex
TEX_CARTA3 = $(ROOT_CARTA3).tex
TEX_CARTA4 = $(ROOT_CARTA4).tex
TEX_CARTA5 = $(ROOT_CARTA5).tex
TEX_CARTA6 = $(ROOT_CARTA6).tex
TEX_CARTA7 = $(ROOT_CARTA7).tex
TEX_CARTA8 = $(ROOT_CARTA8).tex
TEX_CARTA9 = $(ROOT_CARTA9).tex
RUBBER_TOOL=rubber
LATEXMK_TOOL=latexmk
EPSPDF_TOOL=epspdf
PDFLATEX=pdflatex
RM=rm -f

###########################################################################

all: $(DUMMY_TARGETS)
	$(PDFLATEX) $(TEX_CARTA1)
#	$(RUBBER_TOOL) -f -d $(TEX_CARTA1)
	$(PDFLATEX) $(TEX_CARTA2)
#	$(RUBBER_TOOL) -f -d $(TEX_CARTA2)
	$(PDFLATEX) $(TEX_CARTA3)
#	$(RUBBER_TOOL) -f -d $(TEX_CARTA3)
	$(PDFLATEX) $(TEX_CARTA4)
#	$(RUBBER_TOOL) -f -d $(TEX_CARTA4)
	$(PDFLATEX) $(TEX_CARTA5)
#	$(RUBBER_TOOL) -f -d $(TEX_CARTA5)
	$(PDFLATEX) $(TEX_CARTA6)
#	$(RUBBER_TOOL) -f -d $(TEX_CARTA6)
	$(PDFLATEX) $(TEX_CARTA7)
#	$(RUBBER_TOOL) -f -d $(TEX_CARTA7)
	$(PDFLATEX) $(TEX_CARTA8)
#	$(RUBBER_TOOL) -f -d $(TEX_CARTA8)
	$(PDFLATEX) $(TEX_CARTA9)
#	$(RUBBER_TOOL) -f -d $(TEX_CARTA9)


all_rubber: $(DUMMY_TARGETS)
	$(RUBBER_TOOL) -d $(TEX_CARTA1)
#	$(RUBBER_TOOL) -f -d $(TEX_CARTA1)
	$(RUBBER_TOOL) -d $(TEX_CARTA2)
#	$(RUBBER_TOOL) -f -d $(TEX_CARTA2)
	$(RUBBER_TOOL) -d $(TEX_CARTA3)
#	$(RUBBER_TOOL) -f -d $(TEX_CARTA3)
	$(RUBBER_TOOL) -d $(TEX_CARTA4)
#	$(RUBBER_TOOL) -f -d $(TEX_CARTA4)
	$(RUBBER_TOOL) -d $(TEX_CARTA5)
#	$(RUBBER_TOOL) -f -d $(TEX_CARTA5)
	$(RUBBER_TOOL) -d $(TEX_CARTA6)
#	$(RUBBER_TOOL) -f -d $(TEX_CARTA6)
	$(RUBBER_TOOL) -d $(TEX_CARTA7)
#	$(RUBBER_TOOL) -f -d $(TEX_CARTA7)
	$(RUBBER_TOOL) -d $(TEX_CARTA8)
#	$(RUBBER_TOOL) -f -d $(TEX_CARTA8)
	$(RUBBER_TOOL) -d $(TEX_CARTA9)
#	$(RUBBER_TOOL) -f -d $(TEX_CARTA9)

all_latexmk: $(DUMMY_TARGETS)
	$(LATEXMK_TOOL) -pdf -pdflatex="pdflatex -interactive=nonstopmode" -use-make $(TEX_CARTA1)
#	$(LATEXMK_TOOL) -pdf -pdflatex="pdflatex -interactive=nonstopmode" -use-make $(TEX_CARTA1)
	$(LATEXMK_TOOL) -pdf -pdflatex="pdflatex -interactive=nonstopmode" -use-make $(TEX_CARTA2)
#	$(LATEXMK_TOOL) -pdf -pdflatex="pdflatex -interactive=nonstopmode" -use-make $(TEX_CARTA2)
	$(LATEXMK_TOOL) -pdf -pdflatex="pdflatex -interactive=nonstopmode" -use-make $(TEX_CARTA3)
#	$(LATEXMK_TOOL) -pdf -pdflatex="pdflatex -interactive=nonstopmode" -use-make $(TEX_CARTA3)
	$(LATEXMK_TOOL) -pdf -pdflatex="pdflatex -interactive=nonstopmode" -use-make $(TEX_CARTA4)
#	$(LATEXMK_TOOL) -pdf -pdflatex="pdflatex -interactive=nonstopmode" -use-make $(TEX_CARTA4)
	$(LATEXMK_TOOL) -pdf -pdflatex="pdflatex -interactive=nonstopmode" -use-make $(TEX_CARTA5)
#	$(LATEXMK_TOOL) -pdf -pdflatex="pdflatex -interactive=nonstopmode" -use-make $(TEX_CARTA5)
	$(LATEXMK_TOOL) -pdf -pdflatex="pdflatex -interactive=nonstopmode" -use-make $(TEX_CARTA6)
#	$(LATEXMK_TOOL) -pdf -pdflatex="pdflatex -interactive=nonstopmode" -use-make $(TEX_CARTA6)
	$(LATEXMK_TOOL) -pdf -pdflatex="pdflatex -interactive=nonstopmode" -use-make $(TEX_CARTA7)
#	$(LATEXMK_TOOL) -pdf -pdflatex="pdflatex -interactive=nonstopmode" -use-make $(TEX_CARTA7)
	$(LATEXMK_TOOL) -pdf -pdflatex="pdflatex -interactive=nonstopmode" -use-make $(TEX_CARTA8)
#	$(LATEXMK_TOOL) -pdf -pdflatex="pdflatex -interactive=nonstopmode" -use-make $(TEX_CARTA8)
	$(LATEXMK_TOOL) -pdf -pdflatex="pdflatex -interactive=nonstopmode" -use-make $(TEX_CARTA9)
#	$(LATEXMK_TOOL) -pdf -pdflatex="pdflatex -interactive=nonstopmode" -use-make $(TEX_CARTA9)

tar:
	tar czvf $(ROOT_FILENAME).tgz Makefile README `find . -name "*.txt" -o -name "*.ppt*" -o -name "*.c" -o -name "*.sty" -o -name "*.tex" -o -name "*.bib" -o -name "*.pdf" -o -name "*.png" -o -name "*.PNG" -o -name "*.jpg" -o -name "*.JPG" -o -name "*.dia" -o -name "*.eps" -o -name "*.EPS"` 
	zip $(ROOT_FILENAME).zip Makefile README `find . -name "*.txt" -o -name "*.ppt*" -o -name "*.c" -o -name "*.sty" -o -name "*.tex" -o -name "*.bib" -o -name "*.pdf" -o -name "*.png" -o -name "*.PNG" -o -name "*.jpg" -o -name "*.JPG" -o -name "*.dia" -o -name "*.eps" -o -name "*.EPS"` 

clean:
	$(RUBBER_TOOL) --clean -d $(TEX_CARTA1)
	$(RUBBER_TOOL) --clean -d $(TEX_CARTA2)
	$(RUBBER_TOOL) --clean -d $(TEX_CARTA3)
	$(RUBBER_TOOL) --clean -d $(TEX_CARTA4)
	$(RUBBER_TOOL) --clean -d $(TEX_CARTA5)
	$(RUBBER_TOOL) --clean -d $(TEX_CARTA6)
	$(RUBBER_TOOL) --clean -d $(TEX_CARTA7)
	$(RUBBER_TOOL) --clean -d $(TEX_CARTA8)
	$(RUBBER_TOOL) --clean -d $(TEX_CARTA9)

#	$(RM) $(PDFS_FROM_DIA)
#	$(RM) $(PDFS_FROM_SVG)
	$(RM) $(DUMMY_TARGETS)

.PHONY:	all pdf clean tar



###########################################################################
# 
# Makefile to generate solicitud.pdf
#
# $Id: Makefile,v 1.4 2016/07/14 23:38:15 macias Exp $
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

ROOT_FILENAME=solicitud
TEX_FILE = $(ROOT_FILENAME).tex
PDF_FILE = $(ROOT_FILENAME).tex
FLATTEN_TEX_FILE = $(ROOT_FILENAME)-flatten.tex
DIFF_FLATTEN_ROOT_FILENAME = $(ROOT_FILENAME)-flatten-diff
DIFF_FLATTEN_TEX_FILE = $(DIFF_FLATTEN_ROOT_FILENAME).tex
RUBBER_TOOL=rubber
LATEXMK_TOOL=latexmk
EPSPDF_TOOL=epspdf
RM=rm -f


DUMMY_TARGETS=solicitud

all: $(DUMMY_TARGETS)
	$(RUBBER_TOOL) -f -d $(TEX_FILE)
	$(RUBBER_TOOL) -f -d $(TEX_FILE)

solicitud: $(TEX_FILENAME)
	$(RUBBER_TOOL) -f -d $(TEX_FILE)
	$(RUBBER_TOOL) -f -d $(TEX_FILE)

solicitud_latexmk: $(TEX_FILENAME)
	$(LATEXMK_TOOL) -pdf -pdflatex="pdflatex -interactive=nonstopmode" -use-make $(TEX_FILE)
	$(LATEXMK_TOOL) -pdf -pdflatex="pdflatex -interactive=nonstopmode" -use-make $(TEX_FILE)

flatten: 
	latexpand $(TEX_FILE) > $(FLATTEN_TEX_FILE)

latexdiff: flatten
	latexdiff-cvs --force -r $(FLATTEN_TEX_FILE)
	rubber -d $(DIFF_FLATTEN_TEX_FILE)
	rubber -d $(DIFF_FLATTEN_TEX_FILE)



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



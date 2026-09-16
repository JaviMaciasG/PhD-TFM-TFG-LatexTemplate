PDFLATEX ?= pdflatex
LATEXFLAGS ?= -interaction=nonstopmode -halt-on-error -file-line-error

AUTHORIZATION_DOCUMENTS := \
	TFG-AutorizacionAutorPubAbierto \
	TFG-AutorizacionTutorPubAbierto \
	TFG-AutorizacionTutorExtranjeroPubAbierto
EVALUATION_DOCUMENTS := \
	TFG-InformeTutorYRubrica \
	TFG-ActaYRubricaDefensa
DOCUMENTS := $(AUTHORIZATION_DOCUMENTS) $(EVALUATION_DOCUMENTS)
PDFFILES := $(addsuffix .pdf,$(DOCUMENTS))

COMMON_DEPS := \
	../Config/myconfig.tex \
	../Config/postamble.tex \
	../Config/preamble.tex

.DEFAULT_GOAL := all

.PHONY: all autorizaciones evaluacion clean cleanall help

all: $(PDFFILES)

autorizaciones: $(addsuffix .pdf,$(AUTHORIZATION_DOCUMENTS))

evaluacion: $(addsuffix .pdf,$(EVALUATION_DOCUMENTS))

$(PDFFILES): $(COMMON_DEPS)
TFG-InformeTutorYRubrica.pdf: ../Config/setlanguagedependentissues.tex ../Config/rubricaTFGTutor.tex
TFG-ActaYRubricaDefensa.pdf: ../Config/grades-calculation.tex ../Config/setlanguagedependentissues.tex ../Config/rubricaTFGTribunal.tex

%.pdf: %.tex
	$(PDFLATEX) $(LATEXFLAGS) $<
	$(PDFLATEX) $(LATEXFLAGS) $<

clean:
	$(RM) *.aux *.bbl *.bcf *.blg *.fdb_latexmk *.fls *.lof *.log *.lot *.out *.run.xml *.synctex.gz *.toc

cleanall: clean
	$(RM) $(PDFFILES)

help:
	@printf '%s\n' \
		'make                 Generate all TFG paperwork' \
		'make autorizaciones  Generate the three open-publication authorizations' \
		'make evaluacion      Generate the tutor report and defense record' \
		'make FILE.pdf        Generate one specific form' \
		'make clean           Remove auxiliary files' \
		'make cleanall        Remove auxiliary files and generated PDFs'

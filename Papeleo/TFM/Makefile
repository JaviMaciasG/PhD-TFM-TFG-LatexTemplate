TEXFILES := $(wildcard *.tex)
PDFFILES := $(TEXFILES:.tex=.pdf)

# Default target: generate all PDFs
all: $(PDFFILES)

# Implicit rule to convert .tex to .pdf
%.pdf: %.tex
	pdflatex -interaction=nonstopmode -halt-on-error $<
	pdflatex -interaction=nonstopmode -halt-on-error $<

# Clean auxiliary files
clean:
	rm -f $(PDFFILES) *.aux *.log *.out *.toc *.lof *.lot *.bbl *.blg *.synctex.gz *.fls *.fdb_latexmk

# Remove PDFs as well
cleanall: clean
	rm -f $(PDFFILES)

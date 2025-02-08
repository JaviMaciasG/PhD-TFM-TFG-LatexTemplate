# Makefile for compiling LaTeX documents

# Name of the main LaTeX file (without .tex extension)
MAIN = TFG-InformeTutorYRubrica

# LaTeX compiler
LATEX = pdflatex

PDF = $(MAIN).pdf

# Default target
all: $(PDF)

# Rule to compile the LaTeX document into a PDF
$(PDF): $(MAIN).tex
	$(LATEX) $(MAIN).tex
	$(LATEX) $(MAIN).tex
	$(LATEX) $(MAIN).tex

# Rule to clean up auxiliary files
clean:
	rm -f *.pdf *.aux *.log *.out *.toc *.bbl *.blg *.idx *.ilg *.ind *.lof *.lot *.lol *.synctex.gz

# Rule to clean up everything except the PDF
distclean: clean
	rm -f $(PDF)

# Phony targets (not actual files)
.PHONY: all clean distclean

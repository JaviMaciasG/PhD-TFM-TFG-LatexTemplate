# Shared latexmk configuration for the active document Makefiles.

ifndef LATEX_CONFIG_DIR
$(error LATEX_CONFIG_DIR must point to the repository Config directory)
endif

LATEXMK ?= latexmk
LATEX_ENGINE ?= pdflatex
LATEXFLAGS ?= -synctex=1 -interaction=nonstopmode -halt-on-error -file-line-error
LATEXMKRC ?= $(LATEX_CONFIG_DIR)/latexmkrc

ifeq ($(LATEX_ENGINE),pdflatex)
LATEXMK_MODE := -pdf
LATEXMK_ENGINE_OPTION := -pdflatex="pdflatex $(LATEXFLAGS) %O %S"
else ifeq ($(LATEX_ENGINE),xelatex)
LATEXMK_MODE := -xelatex
LATEXMK_ENGINE_OPTION := -pdfxelatex="xelatex $(LATEXFLAGS) %O %S"
else ifeq ($(LATEX_ENGINE),lualatex)
LATEXMK_MODE := -lualatex
LATEXMK_ENGINE_OPTION := -pdflualatex="lualatex $(LATEXFLAGS) %O %S"
else
$(error Unsupported LATEX_ENGINE '$(LATEX_ENGINE)'; use pdflatex, xelatex, or lualatex)
endif

LATEXMK_FLAGS ?= $(LATEXMK_MODE) $(LATEXMK_ENGINE_OPTION) -r "$(LATEXMKRC)"

define latexmk_build
	$(LATEXMK) $(LATEXMK_FLAGS) $(1)
endef

define latexmk_clean
	$(LATEXMK) -r "$(LATEXMKRC)" -c $(1)
endef

define latexmk_cleanall
	$(LATEXMK) -r "$(LATEXMKRC)" -C $(1)
endef

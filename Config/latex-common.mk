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

# Known job files supplement latexmk's dependency-aware cleanup, including
# bibliography and SyncTeX files which latexmk may otherwise retain.
# Root-level auxiliary patterns also cover old job names after a source rename;
# PDFs are never included in these patterns.
LATEX_AUX_EXTENSIONS := aux bbl bcf bcf-SAVE-ERROR blg fdb_latexmk fls log out run.xml synctex synctex.gz toc lof lot lol loa cod vdo acn acr alg sbl sym slg glo gls glg glsdefs ist idx ind ilg nav snm vrb
# PhD sources live in subdirectories but normally write to the working directory.
latex_cleanup_stems = $(sort $(basename $(1)) $(basename $(notdir $(1))))

define latexmk_clean
	$(if $(strip $(wildcard $(1))),$(LATEXMK) -r "$(LATEXMKRC)" -c $(wildcard $(1)) || printf '%s\n' 'Warning: latexmk cleanup failed; removing known auxiliary files directly.',:)
	@for stem in $(sort $(call latex_cleanup_stems,$(1)) $(2)); do \
		$(RM) -- $(addprefix "$$stem".,$(LATEX_AUX_EXTENSIONS)); \
	done
	@$(RM) -- $(addprefix *.,$(LATEX_AUX_EXTENSIONS))
endef

define latexmk_distclean
	$(call latexmk_clean,$(1),$(2))
	$(RM) -- $(addsuffix .pdf,$(call latex_cleanup_stems,$(1)))
endef

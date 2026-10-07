.DEFAULT_GOAL := all

CONFIG_FILE := Config/myconfig.tex
DEGREES_FILE := Config/degrees.tex
DEGREE_REGISTRY_TOOL := Config/query-degree-registry.sh
DEGREE_NAME = $(shell grep -v '%' $(CONFIG_FILE) | grep 'myDegree' | cut -f 3 -d '{' | cut -f 1 -d '}')
WORK_TYPE = $(shell sh $(DEGREE_REGISTRY_TOOL) work-type "$(DEGREE_NAME)" "$(DEGREES_FILE)")

-include AdminScripts/maintainer.mk

.PHONY: all book anteproyecto paperwork all-documents clean clean-paperwork clean-all-documents sync-git-sources help

all: 00-README.pdf book

00-README.pdf: README-es.md README.yaml
	pandoc README.yaml README-es.md -t pdf -o 00-README.pdf --metadata title="Miniintroducción a la plantilla LaTeX PhD-TFM-TFG" --metadata lang=es --variable urlcolor=blue --number-sections --table-of-contents --highlight-style kate -V colorlinks -V geometry:"top=2cm, bottom=1.5cm, left=2cm, right=2cm"  --toc-depth=4

book:
	$(MAKE) -C Book

anteproyecto:
	$(MAKE) -C Anteproyecto

paperwork:
	@case "$(WORK_TYPE)" in \
		TFG) $(MAKE) -C PapeleoTFG ;; \
		TFM) $(MAKE) -C PapeleoTFM ;; \
		PhD) $(MAKE) -C PapeleoPHD ;; \
		*) echo "ERROR: no maintained paperwork is available for work type '$(WORK_TYPE)' (degree $(DEGREE_NAME))." >&2; exit 1 ;; \
	esac

all-documents: 00-README.pdf book anteproyecto paperwork

clean:
	$(MAKE) -C Book clean

clean-paperwork:
	@case "$(WORK_TYPE)" in \
		TFG) $(MAKE) -C PapeleoTFG clean ;; \
		TFM) $(MAKE) -C PapeleoTFM clean ;; \
		PhD) $(MAKE) -C PapeleoPHD clean ;; \
		*) echo "ERROR: no maintained paperwork is available for work type '$(WORK_TYPE)' (degree $(DEGREE_NAME))." >&2; exit 1 ;; \
	esac

clean-all-documents: clean
	$(MAKE) -C Anteproyecto clean
	$(MAKE) clean-paperwork

sync-git-sources:
	@bash sync-git-sources.sh

help:
	@printf '%s\n' \
		'make                     Generate the README PDF and the main book' \
		'make book                Generate the main book' \
		'make anteproyecto        Generate the project proposal' \
		'make paperwork           Generate paperwork matching myDegree' \
		'make all-documents       Generate the README, book, proposal, and matching paperwork' \
		'make clean               Clean the default README and book outputs' \
		'make clean-all-documents Clean all outputs covered by all-documents' \
		'make sync-git-sources    Stage the sources required to reproduce user documents'

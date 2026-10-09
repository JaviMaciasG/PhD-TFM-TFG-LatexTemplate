DROPBOX_DISTRIBUTION_DIR ?= $(HOME)/Dropbox/PhDTFMTFG-LaTeX-Template

.PHONY: distrib public-samples publish-dropbox

distrib:
	@command -v pymupdf >/dev/null 2>&1 || { echo "ERROR: pymupdf is required to generate the distribution; install or enable it in PATH first." >&2; exit 1; }
	$(MAKE) -C Documentation pdfs
	@bash AdminScripts/go.build-distribution.sh

public-samples:
	@bash AdminScripts/go.gen-public-sample-pdfs.sh

publish-dropbox:
	@test -d "$(DROPBOX_DISTRIBUTION_DIR)" || { echo "ERROR: Dropbox destination directory does not exist: $(DROPBOX_DISTRIBUTION_DIR)" >&2; exit 1; }
	@test -w "$(DROPBOX_DISTRIBUTION_DIR)" || { echo "ERROR: Dropbox destination is not writable: $(DROPBOX_DISTRIBUTION_DIR)" >&2; exit 1; }
	@command -v rsync >/dev/null 2>&1 || { echo "ERROR: rsync is required for publication." >&2; exit 1; }
	$(MAKE) distrib
	@bash AdminScripts/go.gen-public-sample-pdfs.sh \
		--destination "$(DROPBOX_DISTRIBUTION_DIR)" \
		--include-distribution

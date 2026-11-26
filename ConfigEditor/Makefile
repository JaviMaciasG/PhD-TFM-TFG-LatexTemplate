PYTHON ?= python3
PACKAGE_PYTHON ?= .venv-package/bin/python
PACKAGE_REF ?=
PACKAGE_REPO ?=
PACKAGE_DOWNLOAD_DIR ?= dist/packages/remote
SMOKE_PROJECT ?= $(if $(wildcard ../Config/myconfig.tex),..)

REMOTE_ARGS = $(if $(PACKAGE_REF),--ref "$(PACKAGE_REF)") \
              $(if $(PACKAGE_REPO),--repo "$(PACKAGE_REPO)") \
              --output-dir "$(PACKAGE_DOWNLOAD_DIR)"

.DEFAULT_GOAL := help
.PHONY: help distrib all clean package-linux package-windows package-macos \
        package-macos-arm64 package-macos-intel package-all package-clean

help:
	@echo 'make distrib               - archive only the editor source (dist/source.zip)'
	@echo 'make package-linux         - build and archive Linux x64 locally'
	@echo 'make package-windows       - build Windows x64 in GitHub Actions'
	@echo 'make package-macos         - build Apple Silicon and Intel in GitHub Actions'
	@echo 'make package-macos-arm64   - build only for Apple Silicon'
	@echo 'make package-macos-intel   - build only for Intel'
	@echo 'make all (package-all)     - build all four native packages'
	@echo 'make clean (package-clean) - remove build/, dist/ and .venv-package/ only'
	@echo 'Remote builds use gh and a pushed ref; set PACKAGE_REF and PACKAGE_REPO to override.'
	@echo 'Other overrides: PYTHON, PACKAGE_PYTHON, PACKAGE_DOWNLOAD_DIR, SMOKE_PROJECT.'

distrib:
	"$(PYTHON)" package_source.py

.venv-package/.dependencies-installed: requirements.txt packaging-requirements.txt
	"$(PYTHON)" -m venv .venv-package
	.venv-package/bin/python -m pip install -r requirements.txt -r packaging-requirements.txt
	.venv-package/bin/python -c 'from pathlib import Path; Path("$@").touch()'

package-linux:
	"$(PYTHON)" package_bundle.py --target linux-x64 --check-platform
ifeq ($(PACKAGE_PYTHON),.venv-package/bin/python)
	$(MAKE) .venv-package/.dependencies-installed
endif
	"$(PACKAGE_PYTHON)" build_standalone.py
	"$(PACKAGE_PYTHON)" package_bundle.py --target linux-x64 $(if $(SMOKE_PROJECT),--smoke-test-project "$(SMOKE_PROJECT)")

package-windows:
	"$(PYTHON)" package_remote.py --target windows-x64 $(REMOTE_ARGS)

package-macos:
	"$(PYTHON)" package_remote.py --target macos $(REMOTE_ARGS)

package-macos-arm64:
	"$(PYTHON)" package_remote.py --target macos-arm64 $(REMOTE_ARGS)

package-macos-intel:
	"$(PYTHON)" package_remote.py --target macos-intel $(REMOTE_ARGS)

all: package-all
package-all: package-linux package-windows package-macos

clean: package-clean
package-clean:
	"$(PYTHON)" -c 'from pathlib import Path; from shutil import rmtree; [rmtree(p) for p in map(Path, ("build", "dist", ".venv-package")) if p.is_dir() and not p.is_symlink()]'

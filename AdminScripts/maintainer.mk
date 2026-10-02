.PHONY: distrib

distrib: 00-README.pdf
	@bash AdminScripts/go.build-distribution.sh

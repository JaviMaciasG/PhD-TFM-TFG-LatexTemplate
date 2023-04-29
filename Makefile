all: 00-README.pdf book

00-README.pdf: README.md README.yaml
	pandoc README.yaml README.md -t pdf -o 00-README.pdf --variable urlcolor=blue --number-sections --table-of-contents --highlight-style kate -V colorlinks -V geometry:"top=2cm, bottom=1.5cm, left=2cm, right=2cm"  --toc-depth=4

book:
	$(MAKE) -C Book

clean:
	rm 00-README.pdf
	$(MAKE) -C Book clean

.PHONY: all book

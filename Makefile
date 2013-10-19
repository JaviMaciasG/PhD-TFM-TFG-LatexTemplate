TEX_FILE = proyecto.tex

all:
	rubber -d $(TEX_FILE)

tar:
	tar czvf `basename $(TEX_FILE) .tex`.tgz *.tex *.bib *.pdf *.bst *.cls *.png *.PNG *.jpg *.JPG 

clean:
	rubber --clean -d $(TEX_FILE)

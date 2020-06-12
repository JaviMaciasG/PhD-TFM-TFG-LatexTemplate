#!/bin/sh
# go.cvs-initial.sh
# Created Tue Apr  9 2019 by Javier Macias-Guarasa <macias@depeca.uah.es>
# $Id$
# $Log$

DIRNAMES="
#abstract acknowledgements acronyms anteproyecto appendix biblio cdromCover chapters config cover dedication diagrams figures letters logos normativas packagesDocumentation papeleo pliego portadaTFGs presupuesto slides solicitud sty symbols "

for d in `find . -type d | grep -v CVS`
do
    
    cvs add $d
done


cvs add `find . -name Makefile`
cvs add `find . -name "*.tex"`
cvs add `find . -name "*.sty"`

cvs add `find . -name "*.jpg"`
cvs add `find . -name "*.png"`

cvs add additionalContributors.txt

cvs add `find . -name "*.dia"`
cvs add `find . -name "*.c"`
cvs add `find . -name "*.bib"`

# Silly extras

cvs add diagrams/*.pdf
cvs add figures/*.eps

cvs add logos/uah/01_logo-vA_pant293.pdf

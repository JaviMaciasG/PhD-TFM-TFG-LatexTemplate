#!/bin/bash


DIST_FILE="PhDTFMTFG-LaTeX-Template-UAH"
DIRS="Anteproyecto Book Config Papeleo"

FILES_ALL="windows-installation.txt Book/additionalContributors.txt"
for d in $DIRS
do

    FILES=`find $d -name "*.tex" -o -name "*.bib" -o -name "*.png" -o -name "*.jpg" -o -name "Makefile" -o -name "*.dia"`
    FILES_ALL="$FILES_ALL $FILES"
done

# directorios especiales
FILES=`find Book/letters`
FILES_ALL="$FILES_ALL $FILES"
FILES=`find Book/figures -name "*.eps"`
FILES_ALL="$FILES_ALL $FILES"
FILES=`find Book/appendix -name "*.c"`
FILES_ALL="$FILES_ALL $FILES"
FILES=`find Book/logos -name "*.pdf"`
FILES_ALL="$FILES_ALL $FILES"

echo $FILES_ALL

tar czvf $DIST_FILE.tgz $FILES_ALL
zip $DIST_FILE.zip $FILES_ALL

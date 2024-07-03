#!/bin/bash


#pandoc README.yaml README.md -t pdf -o README.pdf --variable urlcolor=blue --number-sections --table-of-contents --highlight-style kate -V colorlinks -V geometry:"top=2cm, bottom=1.5cm, left=2cm, right=2cm"  --toc-depth=4

echo "Showing distribution tags:"
git tag

echo ""
echo "Now you must create a required tag name and tag message"
echo -n "Please enter the tag name: "
read tagname

echo -n "Please enter the tag message: "
read tagmessage


echo "The tag name you selected is [$tagname]"
echo "The tag message you selected is [$tagmessage]"
echo -n "Is it correct? (Y/N) "
read answer

if [ "$answer" == "Y" ]
then
    # First make sure README.md is compiled
    make 00-README.pdf
    make -C Book

    DIST_FILE="00-PhDTFMTFG-LaTeX-Template-UAH-$tagname"
    DIRS="Anteproyecto Book Config Papeleo"

    echo "Tagging distribution with tag name [$tagname] and tag message [$tagmessage]..."
    git tag -a $tagname -m "$tagmessage"
    echo "Now generating distribution..."

    FILES_ALL=".latexmkrc windows-installation.txt Book/additionalContributors.txt"
    for d in $DIRS
    do

    # I add here Esquema_objetos.pdf to allow compilation
	FILES=`find $d -name "*.tex" -o -name "*.bib" -o -name "*.png" -o -name "*.jpg" -o -name "Makefile" -o -name "*.dia" -o -name "Esquema_objetos.pdf"`
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
    FILES="Config/worktypes.txt"
    FILES_ALL="$FILES_ALL $FILES"
    FILES="00-README.pdf RELEASE.txt"
    FILES_ALL="$FILES_ALL $FILES"

    echo $FILES_ALL

    tar czvf $DIST_FILE.tgz $FILES_ALL
    zip $DIST_FILE.zip $FILES_ALL

    rsync -avu $DIST_FILE.tgz $DIST_FILE.zip ~/Dropbox/PhDTFMTFG-LaTeX-Template/
    cp README.md ~/Dropbox/PhDTFMTFG-LaTeX-Template/00-README.md
    cp 00-README.pdf ~/Dropbox/PhDTFMTFG-LaTeX-Template/00-README.pdf
else
    echo "You replied something different from 'Y', so that I'm exiting..."
    exit 1
fi

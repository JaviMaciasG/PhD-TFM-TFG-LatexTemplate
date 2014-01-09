#!/bin/sh
# go.gen-all-pdfs.sh
# Created Mon Dec 30 2013 by Javier Macias-Guarasa <macias@depeca.uah.es>
# $Id$
# $Log$

DEGREES="IT IE ITTSE ITTST ITI GIEAI GIST GITT GIT GIC GII GSI MUSEA PHDUAH PHDUPM GIEC"
MYCONFIG_ORIG="config/myconfig.tex.orig"
MYCONFIG="config/myconfig.tex"
BOOK="book"

for degree in $DEGREES
do
		echo "Making for degree $degree"
		cat $MYCONFIG_ORIG | sed "s/__DEGREE__/$degree/g" > $MYCONFIG
		make clean
		make 
		cp $BOOK.pdf $BOOK-$degree.pdf
done

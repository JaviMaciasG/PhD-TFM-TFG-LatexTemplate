#!/bin/sh
# go.gen-all-pdfs.sh
# Created Mon Dec 30 2013 by Javier Macias-Guarasa <macias@depeca.uah.es>
# $Id: go.gen-all-pdfs.sh,v 1.1 2014/01/09 00:50:35 macias Exp $
# $Log: go.gen-all-pdfs.sh,v $
# Revision 1.1  2014/01/09 00:50:35  macias
# Final draft before releasing
#

#DEGREES="IT IE ITTSE ITTST ITI GIEAI GIST GITT GIT GIC GII GSI MUSEA PHDUAH PHDUPM GIEC"
DEGREES="IT IE ITTSE ITTST ITI GIEAI GIST GITT GIT GIC GII GSI MUSEA PHDUPM GIEC"
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

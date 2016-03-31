#!/bin/sh
# go.gen-all-pdfs.sh
# Created Mon Dec 30 2013 by Javier Macias-Guarasa <macias@depeca.uah.es>
# $Id: go.gen-all-pdfs.sh,v 1.5 2014/06/28 22:08:20 macias Exp $
# $Log: go.gen-all-pdfs.sh,v $
# Revision 1.5  2014/06/28 22:08:20  macias
# Have been playing with colors, let's see if in the imprenta everything
# is ok, and also it still compiles in ubuntu 12.04!
#
# Revision 1.4  2014/01/20 10:06:28  macias
# Added comment on pantone 160c + updated font sizes in tfc's portada
#
# Revision 1.3  2014/01/16 23:02:07  macias
# Addel lmodern to allow searchable accented characters in the pdf files.
#
# Revision 1.2  2014/01/11 23:27:55  macias
# + Fixed text sizes in covers
# + anteproyecto template has been added
# + papeleo documents have been added
# + Minor changes in introduction.tex, reflecting these changes
#
# Revision 1.1  2014/01/09 00:50:35  macias
# Final draft before releasing
#

#DEGREES="IT IE ITTSE ITTST ITI GIEAI GIST GITT GIT GIC GII GSI MUSEA PHDUAH PHDUPM GIEC"
DEGREES_ENG_SPA="PHDUAH PHDUPM"
DEGREES_ENG_SPA="PHDUAH"
DEGREES_SPA="IT IE ITTSE ITTST ITI GIEAI GIST GITT GIT GIC GII GSI MUSEA MUIT MUII GIEC"
#DEGREES_SPA="IT IE ITTSE ITTST ITI"
MYCONFIG_ORIG="config/myconfig.tex.orig"
MYCONFIG="config/myconfig.tex"
BOOK="book"

for lang in english spanish
do
		for degree in $DEGREES_ENG_SPA
		do
				echo "Making for degree $degree"
				cat $MYCONFIG_ORIG | sed "s/__DEGREE__/$degree/g"  | sed "s/__LANG__/$lang/g" > $MYCONFIG
				make clean
				make 
				cp $BOOK.pdf $BOOK-$degree-$lang.pdf
		done
done

lang="spanish"
for degree in $DEGREES_SPA
do
		echo "Making for degree $degree"
		cat $MYCONFIG_ORIG | sed "s/__DEGREE__/$degree/g"  | sed "s/__LANG__/$lang/g" > $MYCONFIG
		make clean
		make 
		cp $BOOK.pdf $BOOK-$degree-$lang.pdf
done

#!/bin/sh
# go.gen-all-pdfs.sh
# Created Mon Dec 30 2013 by Javier Macias-Guarasa <macias@depeca.uah.es>
# $Id: go.gen-all-pdfs.sh,v 1.3 2014/01/16 23:02:07 macias Exp $
# $Log: go.gen-all-pdfs.sh,v $
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
DEGREES_SPA="IT IE ITTSE ITTST ITI GIEAI GIST GITT GIT GIC GII GSI MUSEA GIEC"
DEGREES_SPA="IT IE ITTSE ITTST ITI"
MYCONFIG_ORIG="config/myconfig.tex.orig"
MYCONFIG="config/myconfig.tex"
BOOK="book"

# for lang in english spanish
# do
# 		for degree in $DEGREES_ENG_SPA
# 		do
# 				echo "Making for degree $degree"
# 				cat $MYCONFIG_ORIG | sed "s/__DEGREE__/$degree/g"  | sed "s/__LANG__/$lang/g" > $MYCONFIG
# 				make clean
# 				make 
# 				cp $BOOK.pdf $BOOK-$degree-$lang.pdf
# 		done
# done

lang="spanish"
for degree in $DEGREES_SPA
do
		echo "Making for degree $degree"
		cat $MYCONFIG_ORIG | sed "s/__DEGREE__/$degree/g"  | sed "s/__LANG__/$lang/g" > $MYCONFIG
		make clean
		make 
		cp $BOOK.pdf $BOOK-$degree-$lang.pdf
done

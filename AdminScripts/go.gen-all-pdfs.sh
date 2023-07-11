#!/bin/sh
# go.gen-all-pdfs.sh
# Created Mon Dec 30 2013 by Javier Macias-Guarasa <macias@depeca.uah.es>
# $Id: go.gen-all-pdfs.sh,v 1.6 2016/03/31 16:39:31 macias Exp $
# $Log: go.gen-all-pdfs.sh,v $
# Revision 1.6  2016/03/31 16:39:31  macias
# Added preliminary support for MUIT MUII
#
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

DST_DIR="/home/macias/Dropbox/PhDTFMTFG-LaTeX-Template"

#DEGREES="IT IE ITTSE ITTST ITI GIEAI GIST GITT GIT GIC GII GSI MUSEA PHDUAH PHDUPM GIEC"
DEGREES_ENG_SPA="PHDUAH PHDUPM"
DEGREES_SPA="IT IE ITTSE ITTST ITI GIEAI GITI GIST GITT GIT GIC GII GSI GISI MUSEA MUIT MUII MUCTE GIEC"
DEGREES_SPA="GIEAI GITI GIST GITT GIT GIC GII GSI GISI MUSEA MUIT MUII MUCTE GIEC"
DEGREES_ENG_SPA="GIEC GIEAI GITI GIST GITT GIT GIC GII GISI MUIT MUII MUIE MUCTE PHDUAH"
DEGREES_ENG_SPA="MUCTE"
DEGREES_SPA=""
DEGREES_ENG_SPA="GIEC GIEAI GITI GIST GITT GIT GIC GII GISI MUIT MUII MUIE MUCTE PHDUAH"

MYCONFIG_VARS="../Config/myconfig.tex.vars"
MYCONFIG="../Config/myconfig.tex"
BOOK="book"

cat $MYCONFIG |sed -E "s/newcommand[{][\\]myLanguage[}][{](.*)[}]/newcommand{\\\myLanguage}{__LANG__}/g" |sed -E "s/newcommand[{][\\]myDegree[}][{](.*)[}]/newcommand{\\\myDegree}{__DEGREE__}/g" > $MYCONFIG_VARS

#exit

cp $MYCONFIG $MYCONFIG.before

for lang in spanish english
do
    for degree in $DEGREES_ENG_SPA
    do
	TYPE=`cat ../Config/worktypes.txt | grep -w $degree | tr -s " " | cut -f 2 -d " "`
	OUTPUT_NAME=$TYPE-$degree-$lang.pdf
	echo -n "Making for degree $degree, generating $OUTPUT_NAME..."
	cat $MYCONFIG_VARS | sed "s/__DEGREE__/$degree/g"  | sed "s/__LANG__/$lang/g" > $MYCONFIG
	make clean >& /dev/null
	make  >& /dev/null
	#echo "mv book.pdf $DST_DIR/$OUTPUT_NAME"
    mv book.pdf $DST_DIR/$OUTPUT_NAME
	echo " Done!"
	#exit
    done
done

# lang="spanish"
# for degree in $DEGREES_SPA
# do
#     TYPE=`cat ../Config/worktypes.txt | grep -w $degree | tr -s " " | cut -f 2 -d " "`
#     OUTPUT_NAME=$TYPE-$degree-$lang.pdf
#     echo -n "Making for degree $degree, generating $OUTPUT_NAME..."
#     cat $MYCONFIG_VARS | sed "s/__DEGREE__/$degree/g"  | sed "s/__LANG__/$lang/g" > $MYCONFIG
#     make clean >& /dev/null
#     make >& /dev/null
# #    mv $BOOK*.pdf $OUTPUT_NAME
#     echo " Done!"
# done

cp $MYCONFIG.before $MYCONFIG

for f in `ls *.pdf`
do
    NEWNAME=`echo $f | cut -f 1,2,5 -d "-"`
    echo "Trying to move $f to $NEWNAME"
    mv $f $NEWNAME
done


cp *.pdf ~/Dropbox/PhDTFMTFG-LaTeX-Template/


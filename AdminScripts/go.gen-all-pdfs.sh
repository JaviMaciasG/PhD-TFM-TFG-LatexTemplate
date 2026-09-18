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

DEGREE_REGISTRY="../Config/degrees.tex"
DEGREE_REGISTRY_TOOL="../Config/query-degree-registry.sh"
DEGREES_ENG_SPA=`sh "$DEGREE_REGISTRY_TOOL" identifiers "$DEGREE_REGISTRY"`

MYCONFIG_VARS="../Config/myconfig.tex.vars"
MYCONFIG="../Config/myconfig.tex"
BOOK="book"
ERROR_COUNT=0

cat $MYCONFIG |sed -E "s/newcommand[{][\\]myLanguage[}][{](.*)[}]/newcommand{\\\myLanguage}{__LANG__}/g" |sed -E "s/newcommand[{][\\]myDegree[}][{](.*)[}]/newcommand{\\\myDegree}{__DEGREE__}/g" > $MYCONFIG_VARS

#exit

cp $MYCONFIG $MYCONFIG.before

for lang in english spanish
do
    for degree in $DEGREES_ENG_SPA
    do
	TYPE=`sh "$DEGREE_REGISTRY_TOOL" work-type "$degree" "$DEGREE_REGISTRY"`
	OUTPUT_NAME=$TYPE-$degree-$lang.pdf
	LOG_NAME=$TYPE-$degree-$lang.log
	echo -n "Making for degree $degree, generating $OUTPUT_NAME..."
	cat $MYCONFIG_VARS | sed "s/__DEGREE__/$degree/g"  | sed "s/__LANG__/$lang/g" > $MYCONFIG
	make clean > /dev/null 2>&1
	rm -f "$BOOK-compressed.pdf"
	if make > "$LOG_NAME" 2>&1
	then
	    if [ ! -f "$BOOK-compressed.pdf" ]
	    then
		echo " ERROR: the build finished without producing $BOOK-compressed.pdf; see $LOG_NAME" >&2
		ERROR_COUNT=$((ERROR_COUNT + 1))
	    elif mv "$BOOK-compressed.pdf" "$OUTPUT_NAME"
	    then
		echo " Done!"
	    else
		echo " ERROR: could not save the generated PDF as $OUTPUT_NAME; see $LOG_NAME" >&2
		ERROR_COUNT=$((ERROR_COUNT + 1))
	    fi
	else
	    BUILD_STATUS=$?
	    echo " ERROR: generation failed with status $BUILD_STATUS; see $LOG_NAME" >&2
	    ERROR_COUNT=$((ERROR_COUNT + 1))
	fi
	#exit
    done
done

cp $MYCONFIG.before $MYCONFIG

if [ "$ERROR_COUNT" -ne 0 ]
then
    echo "ERROR: $ERROR_COUNT PDF generation(s) failed. Review the corresponding log files." >&2
    exit 1
fi

# for f in `ls *.pdf`
# do
#     NEWNAME=`echo $f | cut -f 1,2,5 -d "-"`
#     echo "Trying to move $f to $NEWNAME"
#     mv $f $NEWNAME
# done


# cp *.pdf ~/Dropbox/PhDTFMTFG-LaTeX-Template/

# makefile for program flatten --- include all "include" files
#                                  into a LaTeX root file
#
##################### Change the following for your setup
# The compiler
CC = cc

# We use flex (or equivalent) to generate the lexer
LEX = flex
# and the options
LEXFLAGS = -v

# Libraries to be used
LIBS = -ll -lm

# The root directory for installation (e.g., /usr/local )
ROOTDIR = /proj/ltx/teTeX033

# Where to place the running code (e.g. /usr/local/bin )
BINDIR = ${ROOTDIR}/bin/sparc-sunos4.1.3

# Where to place the man page (e.g., /usr/local/man/man1 )
MANEXT = 1
MANDIR = ${ROOTDIR}/man/man${MANEXT}

# Just in case you want to change the name of the binary
# (and then you should also change the man page and documentation).
# So, do not change this.
PROG = flatten

# Where to place the user documentation (e.g., /usr/local/doc/flatten )
DOCDIR = ${ROOTDIR}/doc/${PROG}

# The file copy command (copy but do not delete original)
COPY = cp

# The file move command (move and delete original)
MOVE = mv

# The file delete command
DELETE = rm

# The make directory (hierarchy) command
MAKEDIR = mkdirhier

# The stream editor command
SED = sed

################### You should not have to change anything after this

# The object modules
OBJS = flatten.o getopt.o srchenv.o

# Link object code together into PROG
flatten : ${OBJS}
	${CC} -o ${PROG} ${OBJS} ${LIBS}

# Compile C source code into object code
flatten.o : flatten.c getopt.h srchenv.h
	${CC} -c flatten.c
getopt.o : getopt.c getopt.h
	${CC} -c getopt.c
srchenv.o : srchenv.c
	${CC} -c srchenv.c

# Generate C code via LEXing
flatten.c : flatten.l
	${LEX} ${LEXFLAGS} flatten.l
	${MOVE} lex.yy.c flatten.c

# Only call make install if BINDIR has been set
install : flatten
	${MAKEDIR} ${BINDIR}
	${COPY} ${PROG} ${BINDIR}

# Edit file man to replace DOCUMENTDIR by the actual directory
# where the user manual is to be placed.
# Then copy the man page to the proper place.
manpage :
	${SED} 's!DOCUMENTDIR!${DOCDIR}!' man > tman
	${MAKEDIR} ${MANDIR}
	${COPY} tman ${MANDIR}/${PROG}.${MANEXT}

# Copy the user manuals to the proper place
doc :
	${MAKEDIR} ${DOCDIR}
	${COPY} flatten.tex ${DOCDIR}/${PROG}.tex
	${COPY} flatten.ps ${DOCDIR}/${PROG}.ps

# Do everything except clean up
all : flatten install manpage doc

# Call make clean to remove object files and edited man page
clean :
	${DELETE} ${PROG}
	${DELETE} *.o
	${DELETE} tman


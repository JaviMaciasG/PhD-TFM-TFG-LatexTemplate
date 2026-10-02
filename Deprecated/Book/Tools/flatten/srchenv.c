/* file srchenv.c                                                  */
/* searchenv() from Holub's "Compiler Design in C"                 */
/* strtoul() from C standard library (not all compilers find this) */
/* strtol() from C standard library (not all compilers find this)  */


#include <stdio.h>

   

/* searchenv(filename, envname, pathname, ...) searches for a file along an
 * environment declared path. Modification of Alan Holub "Compiler Design in C"
 * Prentice Hall, 1990, page 747.
 *
 * Searches for a file by looking in the directories listed in the envname
 * environment. Puts the full path name (if found) into pathname
 * and returns 1.
 * Otherwise, set *pathname to 0 and return 0. User specified characters are used
 * to seperate directory names. The directory seperator character is
 * also user specified. The pathname array must be at least 128 characters.
 * Prints diagnostic trace if debug == 1.
 */

#define PBUF_SIZE 129                /* max length of pathname - 1 */

int searchenv(filename, envname, pathname, sepchars, dirchar, debug)
char *filename;                   /* file name to search for */
char *envname;                    /* environment name to use as path */
char *pathname;          /* place to put path name when found (min 128 chars) */
char *sepchars;                   /* path name seperators */
char dirchar;                     /* directory catenation char */
int debug;                        /* print diagnostics if equals 1 */
{
  char pbuf[PBUF_SIZE];
  char *p;
  char *strpbrk(), *strtok(), *getenv(), *strchr();

  if (debug == 1) {
    fprintf(stderr, "\nSEARCHENV: filename is: %s\n", filename);
  }

  strcpy(pathname, filename);
  if (access(pathname, 0) != -1 ) {          /* search current directory */
    if (debug == 1) {
      fprintf(stderr, "SEARCHENV: Found it in current directory\n");
    }
    return(1);                                  /* found filename */
  }    

  /* Filename not in current directory. If a path was requested 
   * (i.e. filename contains dirchar) or if environment not set,
   * return a NULL, else search for filename on path.
   */

  if (debug == 1) {
    fprintf(stderr, "SEARCHENV: envname is: %s with value of: %s\n",
                     envname, getenv(envname));
  }

/*  if (strpbrk(filename, "\\/") || !(p = getenv(envname)) ) { */
  if (strchr(filename, dirchar) || !(p = getenv(envname)) ) { 
    *pathname = '\0';
    return(0);
  }

  strncpy(pbuf, p, PBUF_SIZE);
  if (p = strtok(pbuf, sepchars) ) {
    do {
      sprintf(pathname, "%0.90s%c%0.20s", p, dirchar, filename);
      if (debug == 1) {
        fprintf(stderr, "SEARCHENV: looking for pathname: %s\n", pathname);
      }
      if (access(pathname, 0) >= 0 ) {           /* found it */
        if (debug == 1) {
          fprintf(stderr, "SEARCHENV: Found file (pathname): %s\n", pathname);
        }
        return(1);
      }
    }
    while (p = strtok(NULL, sepchars) );
  }
  if (debug == 1) {
    fprintf(stderr, "SEARCHENV: RETURNED WITH NO PATHNAME\n");
  }
  *pathname = '\0';
  return(0);
}                                     /* end SEARCHENV */


/* 
 * strtoul.c --
 *
 *	Source code for the "strtoul" library procedure.
 *
 * Copyright (c) 1988 The Regents of the University of California.
 * All rights reserved.
 *
 * Permission is hereby granted, without written agreement and without
 * license or royalty fees, to use, copy, modify, and distribute this
 * software and its documentation for any purpose, provided that the
 * above copyright notice and the following two paragraphs appear in
 * all copies of this software.
 * 
 * IN NO EVENT SHALL THE UNIVERSITY OF CALIFORNIA BE LIABLE TO ANY PARTY FOR
 * DIRECT, INDIRECT, SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGES ARISING OUT
 * OF THE USE OF THIS SOFTWARE AND ITS DOCUMENTATION, EVEN IF THE UNIVERSITY OF
 * CALIFORNIA HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * THE UNIVERSITY OF CALIFORNIA SPECIFICALLY DISCLAIMS ANY WARRANTIES,
 * INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY
 * AND FITNESS FOR A PARTICULAR PURPOSE.  THE SOFTWARE PROVIDED HEREUNDER IS
 * ON AN "AS IS" BASIS, AND THE UNIVERSITY OF CALIFORNIA HAS NO OBLIGATION TO
 * PROVIDE MAINTENANCE, SUPPORT, UPDATES, ENHANCEMENTS, OR MODIFICATIONS.
 */

/* PRW: deleted lint stuff
 * #ifndef lint
 * static char rcsid[] = "$Header: /user6/ouster/tcl/compat/RCS/strtoul.c,v 1.3 93/03/19 15:25:41 ouster Exp $ SPRITE (Berkeley)";
 * #endif
 */

#include <ctype.h>

/*
 * The table below is used to convert from ASCII digits to a
 * numerical equivalent.  It maps from '0' through 'z' to integers
 * (100 for non-digit characters).
 */

static char cvtIn[] = {
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,		/* '0' - '9' */
    100, 100, 100, 100, 100, 100, 100,		/* punctuation */
    10, 11, 12, 13, 14, 15, 16, 17, 18, 19,	/* 'A' - 'Z' */
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
    30, 31, 32, 33, 34, 35,
    100, 100, 100, 100, 100, 100,		/* punctuation */
    10, 11, 12, 13, 14, 15, 16, 17, 18, 19,	/* 'a' - 'z' */
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
    30, 31, 32, 33, 34, 35};

/*
 *----------------------------------------------------------------------
 *
 * strtoul --
 *
 *	Convert an ASCII string into an integer.
 *
 * Results:
 *	The return value is the integer equivalent of string.  If endPtr
 *	is non-NULL, then *endPtr is filled in with the character
 *	after the last one that was part of the integer.  If string
 *	doesn't contain a valid integer value, then zero is returned
 *	and *endPtr is set to string.
 *
 * Side effects:
 *	None.
 *
 *----------------------------------------------------------------------
 */

unsigned long int
strtoul(string, endPtr, base)
    char *string;		/* String of ASCII digits, possibly
				 * preceded by white space.  For bases
				 * greater than 10, either lower- or
				 * upper-case digits may be used.
				 */
    char **endPtr;		/* Where to store address of terminating
				 * character, or NULL. */
    int base;			/* Base for conversion.  Must be less
				 * than 37.  If 0, then the base is chosen
				 * from the leading characters of string:
				 * "0x" means hex, "0" means octal, anything
				 * else means decimal.
				 */
{
    register char *p;
    register unsigned long int result = 0;
    register unsigned digit;
    int anyDigits = 0;

    /*
     * Skip any leading blanks.
     */

    p = string;
    while (isspace(*p)) {
	p += 1;
    }

    /*
     * If no base was provided, pick one from the leading characters
     * of the string.
     */
    
    if (base == 0)
    {
	if (*p == '0') {
	    p += 1;
	    if (*p == 'x') {
		p += 1;
		base = 16;
	    } else {

		/*
		 * Must set anyDigits here, otherwise "0" produces a
		 * "no digits" error.
		 */

		anyDigits = 1;
		base = 8;
	    }
	}
	else base = 10;
    } else if (base == 16) {

	/*
	 * Skip a leading "0x" from hex numbers.
	 */

	if ((p[0] == '0') && (p[1] == 'x')) {
	    p += 2;
	}
    }

    /*
     * Sorry this code is so messy, but speed seems important.  Do
     * different things for base 8, 10, 16, and other.
     */

    if (base == 8) {
	for ( ; ; p += 1) {
	    digit = *p - '0';
	    if (digit > 7) {
		break;
	    }
	    result = (result << 3) + digit;
	    anyDigits = 1;
	}
    } else if (base == 10) {
	for ( ; ; p += 1) {
	    digit = *p - '0';
	    if (digit > 9) {
		break;
	    }
	    result = (10*result) + digit;
	    anyDigits = 1;
	}
    } else if (base == 16) {
	for ( ; ; p += 1) {
	    digit = *p - '0';
	    if (digit > ('z' - '0')) {
		break;
	    }
	    digit = cvtIn[digit];
	    if (digit > 15) {
		break;
	    }
	    result = (result << 4) + digit;
	    anyDigits = 1;
	}
    } else {
	for ( ; ; p += 1) {
	    digit = *p - '0';
	    if (digit > ('z' - '0')) {
		break;
	    }
	    digit = cvtIn[digit];
	    if (digit >= base) {
		break;
	    }
	    result = result*base + digit;
	    anyDigits = 1;
	}
    }

    /*
     * See if there were any digits at all.
     */

    if (!anyDigits) {
	p = string;
    }

    if (endPtr != 0) {
	*endPtr = p;
    }

    return result;
}


/* 
 * strtol.c --
 *
 *	Source code for the "strtol" library procedure.
 *
 * Copyright (c) 1988 The Regents of the University of California.
 * All rights reserved.
 *
 * Permission is hereby granted, without written agreement and without
 * license or royalty fees, to use, copy, modify, and distribute this
 * software and its documentation for any purpose, provided that the
 * above copyright notice and the following two paragraphs appear in
 * all copies of this software.
 * 
 * IN NO EVENT SHALL THE UNIVERSITY OF CALIFORNIA BE LIABLE TO ANY PARTY FOR
 * DIRECT, INDIRECT, SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGES ARISING OUT
 * OF THE USE OF THIS SOFTWARE AND ITS DOCUMENTATION, EVEN IF THE UNIVERSITY OF
 * CALIFORNIA HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * THE UNIVERSITY OF CALIFORNIA SPECIFICALLY DISCLAIMS ANY WARRANTIES,
 * INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY
 * AND FITNESS FOR A PARTICULAR PURPOSE.  THE SOFTWARE PROVIDED HEREUNDER IS
 * ON AN "AS IS" BASIS, AND THE UNIVERSITY OF CALIFORNIA HAS NO OBLIGATION TO
 * PROVIDE MAINTENANCE, SUPPORT, UPDATES, ENHANCEMENTS, OR MODIFICATIONS.
 */

/* PRW: deleted lint stuff
 * #ifndef lint
 * static char rcsid[] = "$Header: /user6/ouster/tcl/compat/RCS/strtol.c,v 1.2 93/03/19 15:25:43 ouster Exp $ SPRITE (Berkeley)";
 * #endif
 */

#include <ctype.h>

/*
 *----------------------------------------------------------------------
 *
 * strtol --
 *
 *	Convert an ASCII string into an integer.
 *
 * Results:
 *	The return value is the integer equivalent of string.  If endPtr
 *	is non-NULL, then *endPtr is filled in with the character
 *	after the last one that was part of the integer.  If string
 *	doesn't contain a valid integer value, then zero is returned
 *	and *endPtr is set to string.
 *
 * Side effects:
 *	None.
 *
 *----------------------------------------------------------------------
 */

long int
strtol(string, endPtr, base)
    char *string;		/* String of ASCII digits, possibly
				 * preceded by white space.  For bases
				 * greater than 10, either lower- or
				 * upper-case digits may be used.
				 */
    char **endPtr;		/* Where to store address of terminating
				 * character, or NULL. */
    int base;			/* Base for conversion.  Must be less
				 * than 37.  If 0, then the base is chosen
				 * from the leading characters of string:
				 * "0x" means hex, "0" means octal, anything
				 * else means decimal.
				 */
{
    register char *p;
    int result;

    /*
     * Skip any leading blanks.
     */

    p = string;
    while (isspace(*p)) {
	p += 1;
    }

    /*
     * Check for a sign.
     */

    if (*p == '-') {
	p += 1;
	result = -(strtoul(p, endPtr, base));
    } else {
	if (*p == '+') {
	    p += 1;
	}
	result = strtoul(p, endPtr, base);
    }
    if ((result == 0) && (endPtr != 0) && (*endPtr == p)) {
	*endPtr = string;
    }
    return result;
}

%{  
/* flatten.l     (flex) lexer for concatenating "included" (La)TeX files
 *               Written by Peter Wilson (Catholic University and NIST)
 *               pwilson@cme.nist.gov
 */

char FILE_VERSION[] = "Version 1.1";
char FILE_DATE[] = "October 1995";

/* Version History:
 *         1.0 (December 1994): First release
 *         1.1 (October 1995): Added:
 *             -- directory searching
 *             -- use of \endinput to stop processing an included file
 */

/* Development of this software was funded by the United States Government
 * and is not subject to copyright.
 */

/* National Institute of Standards and Technology (NIST)
 * Manufacturing Engineering Laboratory (MEL)
 * Manufacturing Systems Integration Division (MSID)
 * ********************************************************************
 *                            D I S C L A I M E R
 *  
 * There is no warranty for the FLaTTeN software.
 * If the FLaTTeN software
 * is modified by someone else and passed on, NIST wants
 * the software's recipients to know that what they have is not what NIST
 * distributed.
 * 
 * Policies
 * 
 * 1. Anyone may copy and distribute verbatim copies of the 
 *    source code as received in any medium.
 * 
 * 2. Anyone may modify your copy or copies of the FLaTTeN source
 *    code or any portion of it, and copy and distribute such modifications
 *    provided that all modifications are clearly associated with the entity
 *    that performs the modifications.
 * 
 * NO WARRANTY
 * ===========
 * 
 * NIST PROVIDES ABSOLUTELY NO WARRANTY.  THE FLaTTeN SOFTWARE
 * IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, EITHER
 * EXPRESSED OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.
 * THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE PROGRAM IS
 * WITH YOU.  SHOULD ANY PORTION OF THE FLaTTeN SOFTWARE PROVE DEFECTIVE,
 * YOU ASSUME THE COST OF ALL NECESSARY SERVICING, REPAIR OR CORRECTION.
 * 
 * IN NO EVENT WILL NIST BE LIABLE FOR DAMAGES,
 * INCLUDING ANY LOST PROFITS, LOST MONIES, OR OTHER SPECIAL,
 * INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OR
 * INABILITY TO USE (INCLUDING BUT NOT LIMITED TO LOSS OF DATA OR DATA
 * BEING RENDERED INACCURATE OR LOSSES SUSTAINED BY THIRD PARTIES OR A
 * FAILURE OF THE PROGRAM TO OPERATE WITH PROGRAMS NOT DISTRIBUTED BY
 * NIST) THE PROGRAMS, EVEN IF YOU HAVE BEEN ADVISED OF THE POSSIBILITY OF
 * SUCH DAMAGES, OR FOR ANY CLAIM BY ANY OTHER PARTY.
 */


#include <stdio.h>
#include <string.h>
#include <ctype.h>
#include "getopt.h"
#include "srchenv.h"

typedef char *STRING;    /* a pointer-to-a-char */
typedef STRING *PTRADR;  /* A pointer-to-a-pointer-to-a-char */


#ifndef TRUE
# define TRUE 1
#endif
#ifndef FALSE
# define FALSE 0
#endif
# define MAX_DEPTH 100               /* max file nesting depth */
# define MAX_NAME 100                /* max length of a file name */
# define MY_EOS '\0'
# define MAX_ERRORS 10               /* max number of errors */

FILE *filerr;                        /* error file */
FILE *filout;                        /* output file */
FILE *filin;                         /* input root file */
int kind;                            /* kind of file inclusion */
int depth = 0;                       /* depth of file nesting */
FILE *file_stack[MAX_DEPTH];         /* stack of files */
char *name_stack[MAX_DEPTH];         /* stack of file names */
YY_BUFFER_STATE buffer_stack[MAX_DEPTH]; /* stack of input buffers */
char filnam[MAX_NAME];               /* name of a file */
char extnam[MAX_NAME];               /* name of file with extension */

extern FILE *yyin;
extern FILE *yyout;

int DEBUG;                           /* >=1 for debugging */
int num_errors = 0;                  /* number of errors */
int lineno = 1;                      /* input file line number */
# define MAX_LINE 2000               /* max length of an input line */
char linebuf[MAX_LINE];              /* buffer for input line */
int linlen = 0;                     /* current no of chars in linebuf */

char verb_char;                     /* delimeter for \verb command */

FILE *filtabin;                     /* command input file */
int num_commands = 0;               /* number of types of include commands */
# define MAX_TABLE_LINE 100         /* max number of chars in command table line */
# define MAX_COMMANDS 100           /* max number of inclusion commands */
STRING ctable[MAX_COMMANDS];        /* include command name table */

int lex_result;                     /* scratch integer for lexer */

                 /* Environment variable defined search path stuff */
char path_name[257];                /* name of a path */
char sys_envname[20];               /* name of environment variable */
char path_sep[10];                  /* path name seperators */
char dir_cat;                       /* directory catenation char */
int senv_debug;                     /* =1 for debug searchenv() */

void packup();
char *strsave();
void yyerror();
void start_a_file();
void end_a_file();
void catl();
void warning();
void read_table();
int lookup();
void initialise_senv();

%}
            /* END OF C CODE TO BE COPIED TO OUTPUT */
 
            /* TeX comments from % through eol and gobble following whitespace */
tex_comment (%.*\n[ \t]*)
verbatim (verbatim\*?)
verb (\\verb\*?)
ws ([ \t])
whitespace ([ \t]*)
lbrace ([ \t]*\{[ \t]*)
rbrace ([ \t]*\}[ \t]*)
include (\\include)
input (\\input)
infile (\\infile)
endinput (\\endinput)
fname ([^\{\}]+)
newline (\n)
alpha ([a-zA-Z]+)

backslash (\\)
begin_c (\\begin)
end_c (\\end)
command (\\[a-zA-Z]+)

%x VERBATIM_STATE
%x VERB_STATE
%x IN_STATE

                /* END OF DEFINITIONS SECTION */              
%%
                /* START OF RULES SECTION */

               /*--------------- expressions and actions -------------------*/

                /* TeX comment */
{tex_comment} { catl(yyleng, yytext);
                 if (DEBUG) {
                   fprintf(filerr, "%s", yytext);
                   fflush(filerr);
                 }
                 lineno++;
                 linebuf[0] = MY_EOS;
                 linlen = 0;
                 fprintf(filout, "%s", yytext);
               }

              /* verbatims */
              /* \begin{verbatim} */
{begin_c}{lbrace}{verbatim}{rbrace} { catl(yyleng, yytext);
                 if (DEBUG) {
                   fprintf(filerr, "%s", yytext);
                   fflush(filerr);
                 }
                 BEGIN VERBATIM_STATE;
                 fprintf(filout, "%s", yytext);
               }
                      /* newline in verbatim */
<VERBATIM_STATE>{newline} { catl(yyleng, yytext);
                 if (DEBUG) {
                   fprintf(filerr, "%s", yytext);
                   fflush(filerr);
                 }
                 lineno++;
                 linebuf[0] = MY_EOS;
                 linlen = 0;
                 fprintf(filout, "%s", yytext); 
               }
                      /* backslash in verbatim */
<VERBATIM_STATE>{backslash} { catl(yyleng, yytext);
                 if (DEBUG) {
                   fprintf(filerr, "%s", yytext);
                   fflush(filerr);
                 }
                 fprintf(filout, "%s", yytext); 
               }
                   /* all except backslash and newline */
<VERBATIM_STATE>[^\n\\]+ { catl(yyleng, yytext);
                 if (DEBUG) {
                   fprintf(filerr, "%s", yytext);
                   fflush(filerr);
                 }
                 fprintf(filout, "%s", yytext); 
               }
                      /* \end{verbatim} */
<VERBATIM_STATE>{end_c}{lbrace}{verbatim}{rbrace} { catl(yyleng, yytext);
                 if (DEBUG) {
                   fprintf(filerr, "%s", yytext);
                   fflush(filerr);
                 }
                 BEGIN 0;
                 fprintf(filout, "%s", yytext); 
               }

                     /* \verb (and its trailing char) */
{verb}.  { catl(yyleng, yytext);
                 if (DEBUG) {
                   fprintf(filerr, "%s", yytext);
                   fflush(filerr);
                 }
                 BEGIN VERB_STATE;
                 fprintf(filout, "%s", yytext); 
                 verb_char = yytext[yyleng - 1];
               }
                    /* newline inside \verb */
<VERB_STATE>{newline} { catl(yyleng, yytext);
                 if (DEBUG) {
                   fprintf(filerr, "%s", yytext);
                   fflush(filerr);
                 }
                 lineno++;
                 linebuf[0] = MY_EOS;
                 linlen = 0;
                 fprintf(filout, "%s", yytext); 
               }
                    /* chars inside \verb */
<VERB_STATE>. { catl(yyleng, yytext);
                 if (DEBUG) {
                   fprintf(filerr, "%s", yytext);
                   fflush(filerr);
                 }
                 if (verb_char == yytext[0]) {
                   BEGIN 0;
                 }
                 fprintf(filout, "%s", yytext); 
               }

                /*-------- endinput command ------*/

{endinput} { catl(yyleng, yytext);
                 if (DEBUG) {
                   fprintf(filerr, "\nlex DEBUG: End of input %s\n", name_stack[depth]);
                   fflush(filerr);
                 }
                 if (depth > 0) {
                   end_a_file();
                   yy_switch_to_buffer(buffer_stack[depth]);
                 }
                 else {
                   return(EOF);
                 }
	}

               /*--------- includes? -------------*/

{command} { catl(yyleng, yytext);
                 if (DEBUG) {
                   fprintf(filerr, "%s", yytext);
                   fflush(filerr);
                 }
                 lex_result = lookup(yytext);
                 if (DEBUG) {
                   fprintf(filerr, " (lookup=%d) ", lex_result);
                   fflush(filerr);
                 }
                 if (lex_result >= 0) {           /* found an include */
                   fprintf(filout, "%%%s", yytext);
                   BEGIN IN_STATE;
                 }
                 else {
                   fprintf(filout, "%s", yytext);
                 }
               }

                     /* left brace */
<IN_STATE>{lbrace}  { catl(yyleng, yytext);
                 if (DEBUG) {
                   fprintf(filerr, "%s", yytext);
                   fflush(filerr);
                 }
                 fprintf(filout, "%s", yytext);
	}


                     /* file name */
<IN_STATE>{fname}  { catl(yyleng, yytext);
                 if (DEBUG) {
                   fprintf(filerr, "%s", yytext);
                   fflush(filerr);
                 }
                 strcpy(filnam, yytext);
                 fprintf(filout, "%s", yytext);
	}

                     /* close brace */
<IN_STATE>{rbrace}  { catl(yyleng, yytext);
                 if (DEBUG) {
                   fprintf(filerr, "%s", yytext);
                   fflush(filerr);
                 }
                 fprintf(filout, "%s\n", yytext);
                 start_a_file(filnam);
                 yy_switch_to_buffer(buffer_stack[depth]);
                 if (DEBUG) {
                   fprintf(filerr, "\nlex DEBUG: Start of file: %s\n", name_stack[depth]);
                   fflush(filerr);
                 }
                 BEGIN 0;
	}

               /*------------- uninteresting stuff -----------------*/

                     /* newline */
{newline}  { catl(yyleng, yytext);
                 if (DEBUG) {
                   fprintf(filerr, "%s", yytext);
                   fflush(filerr);
                 }
                 lineno++;
                 linebuf[0] = MY_EOS;
                 linlen = 0;
                 fprintf(filout, "%s", yytext); 
	}

                    /* alphabetic string */
{alpha} { catl(yyleng, yytext);
                 if (DEBUG) {
                   fprintf(filerr, "%s", yytext);
                   fflush(filerr);
                 }
                 fprintf(filout, "%s", yytext); 
	}

                   /* End Of File */
<<EOF>> { catl(yyleng, yytext);
                 if (DEBUG) {
                   fprintf(filerr, "\nlex DEBUG: End of file %s\n", name_stack[depth]);
                   fflush(filerr);
                 }
                 if (depth > 0) {
                   end_a_file();
                   yy_switch_to_buffer(buffer_stack[depth]);
                 }
                 else {
                   return(EOF);
                 }
	}

                   /* anything else */
.  { catl(yyleng, yytext);
                 if (DEBUG) {
                   fprintf(filerr, "%s", yytext);
                   fflush(filerr);
                 }
                 fprintf(filout, "%s", yytext); 
	}

               /* END OF RULES SECTION */
%%
               /* START OF USER SUBROUTINE SECTION */


/* MAIN program */
main(argc, argv)
int argc;
char **argv;
{
    char optchar;
    int n;
    FILE *file;
    int result;
    int i, j;
    char tabnam[100];             /* command table input file */
    int TABLE = FALSE;

                 /* print banner */
  fprintf(stdout, "\n        flatten: Source file inclusion for LaTeX files");
  fprintf(stdout, "\n        (%s, %s)\n", FILE_VERSION, FILE_DATE);


                 /* open error log file */
   file = fopen("flatten.err", "w");
   if (!file) {
     fprintf(stderr, "\n Could not open file flatten.err\n");
     exit(1);
   }
   filerr = file;
   fprintf(stdout, "\nError file is flatten.err\n");
   fprintf(filerr, "Error file for program flatten (%s, %s)\n",
                    FILE_VERSION, FILE_DATE);
   fprintf(filerr, "Author: Peter Wilson (Catholic University and NIST)\n");
   fprintf(filerr, "Email any comments or suggestions to pwilson@cme.nist.gov\n\n");
    
               /* set up for directory searching */
   initialise_senv();

    /* get command line optional parameters */
    opterr = 1;                   /* getopt will print errors with opterr = 1 */
    while (EOF != (optchar =
          getopt(argc,argv,"d:f:P:D:"))) { 
          switch(optchar) {
            case '?': {              /* command line error */
 fprintf(stdout,"\nUsage [-d number] [-f tablename] [-P chars] [-D char] infile outfile\n");
 fprintf(filerr,"\nUsage [-d number] [-f tablename] [-P chars] [-D char] infile outfile\n");
              break;
            }
            case 'd': {              /* switch on debugging */
              senv_debug = atoi(optarg);
              if (senv_debug > 1) {     /* debug everything */
                DEBUG = 1;
                senv_debug = 1;
                fprintf(stdout, "All debugging set ON\n");
                fprintf(filerr, "All debugging set ON\n");
              }
              else if (senv_debug = 1) {  /* debug directory search only */
                fprintf(stdout, "Directory search debugging set ON\n");
                fprintf(filerr, "Directory search debugging set ON\n");
              }
              else {              /* an error */
                senv_debug = 0;
                fprintf(stdout, "Debug option error. Requires number greater than zero\n");
                fprintf(filerr, "Debug option error. Requires number greater than zero\n");
              }
              break;
            }
            case 'f': {               /* commands in a file */
              TABLE = TRUE;
              strcpy(tabnam, optarg);
              break;
            }
            case 'P': {               /* pathname seperators */
              strcpy(path_sep, optarg);
              strcat(path_sep, " ");
              fprintf(stdout,"Pathname seperators set to (%s)\n", path_sep);
              fprintf(filerr,"Pathname seperators set to (%s)\n", path_sep);
              break;
            }
            case 'D': {               /* directory catenation char */
              dir_cat = optarg[0];
              fprintf(stdout,"Directory catenation character set to %c\n", dir_cat);
              fprintf(filerr,"Directory catenation character set to %c\n", dir_cat);
              break;
            }
         }
    } /* end of optional parameter processing */

    if (TABLE) {                  /* open table file */
      if (!searchenv(tabnam, sys_envname, path_name, path_sep, dir_cat, senv_debug)) {
        fprintf(stderr,"Fatal error: Could not find file %s\n", tabnam);
        exit(1);
      }
      file = fopen(path_name, "r");
      if (!file) {
        fprintf(stderr, "Fatal error: Could not open file %s\n", path_name);
        exit(1);
      }
      filtabin = file;
      fprintf(stdout, "Command input file is %s\n", path_name);
      fprintf(filerr, "Command input file is %s\n", path_name);
    }
    else {
      fprintf(stdout, "Using default inclusion commands\n");
      fprintf(filerr, "Using default inclusion commands\n");
    }

    /* rest of parameters are file names (input and output) */
    n = 0;
    for (;optind < argc; optind++) {
        n++;
        if (n == 1) {
           strcpy(filnam, argv[optind]);      /* take copy of input file name */
           file = fopen(argv[optind], "r");
           if (!file) {
              fprintf(stderr,"\nCould not open input file %s\n",argv[optind]);
              fprintf(filerr,"\nCould not open input file %s\n",argv[optind]);
              exit(1);
           }
           fprintf(stdout,"\nReading file %s", argv[optind]);
           fprintf(filerr,"\nReading file %s", argv[optind]);
           filin = file;
        }
        else { 
          if (n == 2) {
            file = fopen(argv[optind], "w");
            if (!file) {
              fprintf(stderr,"\nCould not open output file %s\n",argv[optind]);
              fprintf(filerr,"\nCould not open output file %s\n",argv[optind]);
                     exit(1);
            }
            fprintf(stdout," and writing to file %s\n",argv[optind]);
            fprintf(filerr," and writing to file %s\n",argv[optind]);
            filout = file;
          }
          else {
  fprintf(stderr,"\nOnly two files permitted. File %s ignored\n",argv[optind]);
  fprintf(filerr,"\nOnly two files permitted. File %s ignored\n",argv[optind]);
          }
        }
    }
    if (n == 0) { 
       fprintf(stderr,"\nAn input and an output file are required.\n");
       fprintf(filerr,"\nAn input and an output file are required.\n");
       exit(1);
    }
                 /* initialize file stacks */
    file_stack[0] = filin;
    if (DEBUG) {
      fprintf(stderr, "\n DEBUG: Source filnam = %s", filnam);
      fprintf(filerr, "\n DEBUG: Source filnam = %s", filnam);
                   fflush(filerr);
    }
    name_stack[0] = strsave(filnam);
    buffer_stack[0] = yy_create_buffer(filin, YY_BUF_SIZE);
/*    strcpy(name_stack[0], filnam); */
    if (DEBUG) {
      fprintf(stderr, "\n DEBUG: filnam = %s", filnam);
      fprintf(stderr, "\n        name_stack[0] = %s", name_stack[0]);
      fprintf(filerr, "\n DEBUG: filnam = %s", filnam);
      fprintf(filerr, "\n        name_stack[0] = %s", name_stack[0]);
                   fflush(filerr);
    }
    for (i = 1; i < MAX_DEPTH; i++) {
        file_stack[i] = NULL;
        name_stack[i] = NULL;
    }

                       /* set up command table */
    if (TABLE) {                                 /* read commands */
      read_table();
    }
    else {                                       /* use default commands */
      ctable[0] = "\\input";
      ctable[1] = "\\include";
      num_commands = 2;
    }
    if (DEBUG) {                     /* print table */
      fprintf(filerr, "\n COMMAND TABLE (%d commands)\n", num_commands);
      for (j = 0; j < num_commands; j++) {
        fprintf(filerr, "(%d) %s\n", j, ctable[j]);
      }
      fflush(filerr);
    }

                 /* process input */
      /* fprintf(filout, "File %s incorporates the following files:\n", name_stack[0]); */
      fprintf(filerr, "\nProcessing root source file %s", name_stack[depth]);
      fprintf(stdout, "\nProcessing root source file %s", name_stack[depth]);
                   fflush(filerr);

    for (;;) {
    /*      yyin = file_stack[depth]; */
      if (file_stack[depth] == NULL) {
        yyerror("FATAL ERROR: Null file name");
        exit(1);
      }
      yy_switch_to_buffer(buffer_stack[depth]);
      result = yylex();
      if (DEBUG) {
        fprintf(stderr, "\n DEBUG: Parse returned with result = %d",result);
        fprintf(filerr, "\n DEBUG: Parse returned with result = %d",result);
                   fflush(filerr);
      }
      if (result == EOF) {               /* end of current file */
        if (depth <= 0) {                /* end of all files */
          fprintf(stdout, "\nEnd of root input file %s\n", name_stack[0]);
          fprintf(filerr, "\nEnd of root input file %s\n", name_stack[0]);
          fprintf(stdout, "\nCompleted file processing\n");
          fprintf(filerr, "\nCompleted file processing\n");
          packup(filin, filout, filerr);
          return(0);
        }
        else {                          /* pop stacks */
          end_a_file();
        }
      }
      else {                       /* new file inclusion */
        start_a_file(filnam);
      }
    } /* end for loop */
}                                             /* end MAIN */


/* ADDEXT adds a .tex extension to a file name */
int addext(in, out)
char in[];                   /* name as input */
char out[];                  /* name with .tex extension */
{
  int i, n;
  int period;

  period = FALSE;
  for (i = 0; in[i] != MY_EOS; i++) {
    out[i] = in[i];
    if (in[i] == '.') {
      period = TRUE;
    }
  }
  out[i] = MY_EOS;
  if (period == FALSE) {
    strcat(out, ".tex");
  }
  return(period);
}                                                          /* end ADDEXT */

/* PACKUP closes 3 files */
void packup(f1, f2, f3)
FILE *f1;
FILE *f2;
FILE *f3;
{
    fclose(f1);
    fclose(f2);
    fclose(f3);
}                                                          /* end PACKUP */


/* STRSAVE saves a string somewhere */
char *strsave(s)
char *s;                           /* string to be saved */
{
  char *p, *malloc();

  if ((p = malloc(strlen(s)+1)) != NULL) {
     strcpy(p, s);
     return(p);
   }
  else {
    fprintf(stderr, "\nFATAL ERROR: Out of memory in STRSAVE\n");
    fprintf(filerr, "\nFATAL ERROR: Out of memory in STRSAVE\n");
    exit(1);
  }
}                                                         /* end STRSAVE */


/* YYERROR prints parse error message */
void yyerror(s)
char *s;                          /* string to be printed */
{
  fprintf(stderr, "\n%s in line\n%d: %s\n", s, lineno, linebuf);
  fprintf(filerr, "\n%s in line\n%d: %s\n", s, lineno, linebuf);
  num_errors++;
  if (num_errors >= MAX_ERRORS) {
    fprintf(stderr, "\n** Program ended with at least %d errors **\n", num_errors);
    fprintf(filerr, "\n** Program ended with at least %d errors **\n", num_errors);
    fprintf(yyout, "\n** Program ended with at least %d errors **\n", num_errors);
    exit(1);
  }
}                                         /* end YYERROR */


/* START_A_FILE starts a new input file */
void start_a_file(filnam)          
char filnam[];                     /* name of file */
{
  char extnam[MAX_NAME];
  FILE *file;
  int i;

  addext(filnam, extnam);           /* add extension to file name */
  if (depth >= MAX_DEPTH - 1) {
    fprintf(stderr, "\n File nesting too deep (over %d)\n", MAX_DEPTH);
    fprintf(filerr, "\n File nesting too deep (over %d)\n", MAX_DEPTH);
                   fflush(filerr);
    packup(filin, filout, filerr);
    exit(0);
  }
  if (!searchenv(extnam, sys_envname, path_name, path_sep, dir_cat, senv_debug)) {
    fprintf(stderr,"\nCould not find file %s\n", extnam);
    fprintf(filerr,"\nCould not find file %s\n", extnam);
                   fflush(filerr);
    fprintf(filout, "\n%%FLATTEN WARNING: Could not find file %s\n", extnam);
    fprintf(filout, "%%                  Skipping it\n");
    return;
  }
  file = fopen(path_name, "r");
  if (!file) {
    fprintf(stderr, "\n Could not open file %s\n", path_name);
    fprintf(filerr, "\n Could not open file %s\n", path_name);
                   fflush(filerr);
    fprintf(filout, "\n%%FLATTEN WARNING: Could not open file %s\n", path_name);
    fprintf(filout, "%%                  Skipping it\n");
    return;
  }
  depth++;
  name_stack[depth] = strsave(path_name);
  file_stack[depth] = file;
  buffer_stack[depth] = yy_create_buffer(file, YY_BUF_SIZE);
  if (DEBUG) {
    fprintf(filerr, "\n DEBUG (start_a_file): depth = %d", depth);
                   fflush(filerr);
    for (i = 0; i <= depth; i++) {
      fprintf(filerr, "\n        depth = %d, name_stack = %s", i, name_stack[i]);
    }
    fprintf(filerr, "\n DEBUG (start_a_file): New file is %s", name_stack[depth]);
    fprintf(stdout, "\n DEBUG (start_a_file): New file is %s", name_stack[depth]);
                   fflush(filerr);
  }

  fprintf(stdout, "\nProcessing file %s as %s", filnam, name_stack[depth]);
  fprintf(filerr, "\nProcessing file %s as %s", filnam, name_stack[depth]);
                   fflush(filerr);

}                                  /* end START_A_FILE */


/* END_A_FILE closes down a file */
void end_a_file()                             
{
  int i;

  fprintf(filout, "%%   END OF FILE %s\n", name_stack[depth]);
  fprintf(stdout, "\n   End of file %s", name_stack[depth]);
  fprintf(filerr, "\n   End of file %s", name_stack[depth]);
                   fflush(filerr);
  if (DEBUG) {
    fprintf(filerr, "\n DEBUG (end_a_file): depth = %d", depth);
    for (i = 0; i <= depth; i++) {
      fprintf(filerr, "\n        depth = %d, name_stack = %s", i, name_stack[i]);
                   fflush(filerr);
    }
    fprintf(filerr, "\n DEBUG (end_a_file): Old file was %s", name_stack[depth]);
    fprintf(stdout, "\n DEBUG (end_a_file): Old file was %s", name_stack[depth]);
                   fflush(filerr);
  }

                 /* pop stack */
  fclose(file_stack[depth]);
  file_stack[depth] = NULL;
  free(name_stack[depth]);
  name_stack[depth] = NULL;
  yy_delete_buffer(buffer_stack[depth]);
  depth--;
  if (depth < 0) {
    yyerror("Nesting depth gone negative");
    depth = 0;
  }
}                                  /* end END_A_FILE */


/* WARNING prints a warning */
void warning(s)                             
char *s;
{
  fprintf(stderr, "\nWARNING: %s in line\n%d: %s\n", s, lineno, linebuf);
  fprintf(filerr, "\nWARNING: %s in line\n%d: %s\n", s, lineno, linebuf);
                   fflush(filerr);
}                                   /* end WARNING */


/* CATL concatenates S to line buffer */
void catl(n,s)                
int n;               /* no of chars in s */
char *s;
{
  linlen = linlen + n;           /* current no. of chars to be in linebuf */
  if (linlen >= MAX_LINE) {      /* linebuf will overflow */
    warning("A very long line. Internal buffer size exceeded");
    linebuf[0] = '\0';
    linlen = n;
  }
  strcat(linebuf, s);
}                                         /* end CATL */


/* READ_TABLE sets up commands from filtabin */
void read_table()             
{
  char line[MAX_TABLE_LINE];
  char code_name[MAX_TABLE_LINE];
  int num_names;

  while ( fgets(line, MAX_TABLE_LINE, filtabin) != NULL) {  /* read a line */
                   /* get first name on line */
    num_names = sscanf(line, "%s", code_name);
    if (num_names == 0) {               /* ignore blank line */
      ;
    }
    else {                              /* add to table */
      if (num_commands >= MAX_COMMANDS) {  /* overflow */
        fprintf(stderr, "\nWARNING Too many commands, limited to %d\n", MAX_COMMANDS);
        fprintf(filerr, "\nWARNING Too many commands, limited to %d\n", MAX_COMMANDS);
                   fflush(filerr);
        return;
      }
      ctable[num_commands] = strsave(code_name);
      num_commands++;
    }
  }
}                                       /* end READ_TABLE */


/* LOOKUP searches for str in ctable */
int lookup(str)                         
char str[];
{
  int i;
 
  for (i = 0; i < num_commands; i++) {
    if (strcmp(ctable[i], str) == 0) {           /* found it */
      return(i);
    }
  }
  return(-1);
}                                       /* end LOOKUP */


/* INITIALISE_SENV initialises path searching */
void initialise_senv()
{
  strcpy(sys_envname,"FLATINPUTS");      /* the environment variable name */
  strcpy(path_sep," :;");                /* path seperators */
  dir_cat = '/';                         /* directory catenation char */
  senv_debug = 0;                        /* debugging off */
}                                      /* end INITIALISE_SENV */
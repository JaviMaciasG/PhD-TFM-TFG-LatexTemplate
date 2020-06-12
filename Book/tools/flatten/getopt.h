/* getopt.h   from Don Libes "Obfuscated C" (extended by PRW) */
#ifndef GETOPT_H
#define GETOPT_H
extern int getopt();
extern char *optarg;           /* current argv string */
extern int optind;             /* current argv index */
extern int optopt;             /* option character */
extern int opterr;             /* getopt prints errors if 1 */
#endif /* GETOPT_H */


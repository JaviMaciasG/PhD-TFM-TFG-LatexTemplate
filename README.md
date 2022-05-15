# PhD-TFM-TFG-LatexTemplate

This repo contains a generic template for PhD, Msc (TFM) and BsC (TFG) thesis documents mainly designed to be used at the University of Alcala (UAH), so that it is written in Spanish, although the template can generate the documents in English (just setting a variable in the configuration file).

The template uses configuration variables (defined in the `Config/myconfig.tex` file) to customize all the document generation process, so that you don't need to devote any effort to comply with formatting requirements (cover and back pages for example), document layout, etc.

Support to generate the "anteproyecto" is also provided, along with some of the paperwork required by the current regulations, that will be useful for you and your advisor/s (request for anteproyecto, deposit, authoratization for the defense, authorization for open publication in the institutional repository, request for "acta", etc.).


## Quick start

### Prerrequisites

You will need a good \LaTeX{} distribution (TexLive, MikTex, MacTeX, etc.). Most of the ones you can get out there will cover almost every required packages, being typical exceptions `texlive-publishers`, `texlive-lang-spanish` and `texlive-lang-english`. For a list of all required packages, you can have a look at the `\usepackage{...}` statements in the file `Config/preamble.tex`. Beware that the main compilation is done using `pdflatex`. The preferred compilation method is by using the provided `make`, but if you are in a Windows environment without this utility, a good \LaTeX{} editor will do fine. Please carefully read chapter 1 of any of the precompiled examples in the dropbox distribuition (for example that for the [GIEC TFG at UAH](https://www.dropbox.com/s/p8htef58cusv4x6/TFG-GIEC-spanish.pdf?dl=0)).
  
  
### Download the template

The template is accessible in two ways:

1. In github, in case you want to clone or fork my working version. It is available at 
[my gitHub account project page](https://github.com/JaviMaciasG/PhD-TFM-TFG-LatexTemplate), so that you can clone it from [the clone URL](https://github.com/JaviMaciasG/PhD-TFM-TFG-LatexTemplate.git). Beware that it has a lot of extra files that should not be useful for the general user
2. In my dropbox, in zip and tgz formats, accesible at [this Dropbox download folder](https://www.dropbox.com/sh/mm6fwh3ruuuyjz2/AABDUmo7Xj1S968FeJgbmFPva?dl=0).  At this location you will also be able to access the sample book files for all the different flavours (degrees...) and in Spanish and English versions. Note that the introduction chapter will provide you with general instructions and details on the use of the template. **Please do read it**. The rests of the chapters provide you with sample code to do a varity of (IMHO) nice things you might find useful.

### Configure your data

   All the information you can customize is in the `Config/myconfig.tex` file. The variable names are all defined in `\newcommand{}{}` statements and all of then start with the `\my' prefix. Most of the variable names should be self-explanatory, and you can find additional information in the introduction chapter (check any pdf file in [the distribution Dropbox folder](https://www.dropbox.com/sh/mm6fwh3ruuuyjz2/AABDUmo7Xj1S968FeJgbmFPva?dl=0)).

### To fill in and generate the "anteproyecto"

1. Go to the "Anteproyecto" directory, where you will find the `anteproyecto.tex` file. This is the one you should work in. An example is provided in the repo file.
2. Edit the file to suit your needs
3. Compile it (there is a `Makefile` available, but you can use your standard LaTeX build tool).

### To fill in and generate the main book

1. Go to the "Book" directory
2. The main compilation file is `book.tex` that you can suit to your needs commenting out what you don't need. If you compile it "as provided" you will see a lot of examples that can be useful for your particular case.
3. Edit the files you need (abstract files, chapter files, dedication files, appendix files, etc.) There is a specific directory for each of them
4. Compile the book.tex (there is a `Makefile` available, but you can use your standard LaTeX build tools).

### To fill in and generate paperwork

1. Go to the `Papeleo` directory where you will find general files required for all document types, and specific subdirectories for PhDs, TFGs and TFMs
2. Edit the files you need and compile them by using the corresponding `Makefile`s or your standard LaTeX build tool.


## Disclaimer & request for help & offer to help

There is a lot of work to do in documenting this template, and I'll do my best to do it, but I can't promise you anything. 

There are a lot of bad and very unprofessional coding habits (see Book/Makefile for a sample), but I'm not an expert and I just tried to make things work out of the box. It would be great if you can contribute in any way to improve this template, so that [drop me a message](mailto:javier.maciasguarasa@uah.es) or consider submitting a pull request.

Also, if you need help to make this work, or you have any compilation errors, or even suggestions for improvements, please contact me at [my email address](mailto:javier.maciasguarasa@uah.es).

Enjoy!


Javi

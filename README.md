# Introduction

This repo contains a generic template for PhD, Msc (TFM) and BsC (TFG) thesis documents mainly designed to be used at the University of Alcala (UAH), so that it is written in Spanish, although the template can generate the documents in English (just setting a variable in the configuration file).

The template uses configuration variables (defined in the `Config/myconfig.tex` file) to customize all the document generation process, so that you don't need to devote any effort to comply with formatting requirements (cover and back pages for example), document layout, etc.

Support to generate the "anteproyecto" is also provided, along with some of the paperwork required by the current regulations, that will be useful for you and your advisor/s (request for anteproyecto, deposit, authorization for the defense, authorization for open publication in the institutional repository, request for "acta", etc.).

Please carefully read chapter 1 of any of the precompiled examples in the dropbox distribution (for example that for the [GIEC TFG at UAH](https://www.dropbox.com/s/69ppvvp9i03sp4m/TFG-GIEC-spanish.pdf?dl=0)).
     

# Quick start

## Prerequisites

You have two main options to work with the template: Do your work locally in any PC (my preferred configuration is using [TexStudio](https://www.texstudio.org/)), or do it online using [Overleaf](https://www.overleaf.com/). Both options are described below.


### Working on a local machine

You will need a good \LaTeX{} distribution (TexLive, MikTex, MacTeX, etc., depending on your working environment). For a list of all required packages, you can have a look at the `\usepackage{...}` statements in the file `Config/preamble.tex`, but this should not be a problem as most distributions would have everything you need. If you run into errors due to packages not being available, install them (this should be easy enough).

Beware that the main compilation is done using `pdflatex+biber`. The preferred compilation method is by using the provided `make` as it will do most of the required work automatically, but if you are in a Windows environment without this utility, my recommendation for you is to use [TexStudio](https://www.texstudio.org/) although any good \LaTeX{} editor should do fine. 

  
#### Notes on GNU/Linux installation

I'm talking here about debian-like distributions (mainly Ubuntu), but package instructions and package names should be similar across other ones.

I would recommend you to install the TexLive distribution (`sudo apt-get install texlive` will do in an Ubuntu box, for example). Most of the required packages will be installed by default being typical exceptions `texlive-publishers`, `texlive-lang-spanish` and `texlive-lang-english`. Do install them. 

You can also use `sudo apt-get install texlive-full` for an overloaded full texlive distribution, but this will take a lot of disk space.

Regarding editors I would suggest you to use [TexStudio](https://www.texstudio.org/) or [emacs](https://www.gnu.org/software/emacs/). I personally use the latter, with the [Doom emacs configuration](https://github.com/doomemacs/doomemacs), but the learning curve can be really steep, so that [TexStudio](https://www.texstudio.org/) is, IMHO, a safer bet.


#### Notes on Windows installation

This is my recommended route to have everything ready to go:


1. Install the latest version of [MikTeX](https://www.miktex.org). Select install required packages on the fly (either "Yes" or "Ask me first")

   1.1. Run `MiKTeX Console` and `Check for updates` (otherwise you'll probably get an error when compiling LaTeX sources)

   1.2. In `MiKTeX Console`, run `Updates|Update` now

2. Install the latest version of [TexStudio](https://www.texstudio.org/)

3. Install a perl interpreter (if you plan to use acronyms, handled by `makeglossaries` in the template, which I fully recommend). I used Strawberry perl from https://strawberryperl.com/, but you can go to the perl site (https://www.perl.org/get.html) and check other alternatives.


#### Notes on TeXStudio configuration (VERY IMPORTANT)

The bibliography backend is now biber (from 2022), so that you have to configure TeXStudio to use biber as the bibliography processor. In the application just go to "Options > Configure TeXstudio > Build > Default Bibliography > Biber"

  
### Working in [Overleaf](https://www.overleaf.com/) 
  
First of all I have bad news on using [Overleaf](https://www.overleaf.com/) to compile your work: the [Overleaf](https://www.overleaf.com/) free plan option (from 2024, with their new restrictions) will not assign you enough compile time to generate the pdf file :-(.  

Anyway, if you want to work with the template in [Overleaf](https://www.overleaf.com/) (using one of the paid plans), it's pretty easy. Here you are the main steps:

1. Log in to [Overleaf](https://www.overleaf.com/)
2. In the main page, select the `New Project` button
3. Select `Upload project`
4. Select the corresponding zip among the ones you may find in the [template dropbox folder](https://www.dropbox.com/sh/mm6fwh3ruuuyjz2/AABDUmo7Xj1S968FeJgbmFPva?dl=0e)
5. [Overleaf](https://www.overleaf.com/) will do its magic and in a few seconds you'll have the template installed

Remember that you will have to select the "main document" (access it through the options you will find clicking the overleaf logo in the top left corner of the project main page). See below in the "To fill in and generate..." to see which are the main files you have available. The most relevant files to select as "main document" are: 

+ `Anteproyecto/anteproyecto.tex`
+ `Book/book.tex`

But you should also have a look to the paperwork related ones:

+ `Papeleo/SolicitudTFGTFM/solicitud.tex`
+ `Papeleo/TFGAutorizacionPubAbierto/autorizacionAutorPublicarRepositorio.tex`
+ `Papeleo/TFGAutorizacionPubAbierto/autorizacionTutorPublicarRepositorio.tex`
+ `Papeleo/TFMAutorizacionPubAbierto//autorizacionPublicarAbierto.tex`
+ etc.

We have had a number of issues with [Overleaf](https://www.overleaf.com/) in the past (mainly regarding glossaries), and they should be fully working. If new issues arise in the future, [this repo](https://github.com/gkilleen33/overleaf-offline/tree/master) has nice configurations for `latexmkrc` that should provide hints on how to solve them).


## Download the template

The template is accessible in two ways:

1. In GitHub, in case you want to clone or fork my working version. It is available at 
[my GitHub account project page](https://github.com/JaviMaciasG/PhD-TFM-TFG-LatexTemplate), so that you can clone it from [the clone URL](https://github.com/JaviMaciasG/PhD-TFM-TFG-LatexTemplate.git). Beware that it has a lot of extra files that should not be useful for the general user
2. In my dropbox, in zip and tgz formats, accessible at [this Dropbox download folder](https://www.dropbox.com/sh/mm6fwh3ruuuyjz2/AABDUmo7Xj1S968FeJgbmFPva?dl=0).  At this location you will also be able to access the sample book files for all the different flavors (degrees, masters, PhD programs) and in Spanish and English versions. Note that the introduction chapter will provide you with general instructions and details on the use of the template. **Please do read it**. The rests of the chapters provide you with sample code to do a variety of (IMHO) nice things you might find useful.

## Configure your data

   All the information you can customize is in the `Config/myconfig.tex` file. The variable names are all defined in `\newcommand{}{}` statements and all of then start with the `\my` prefix. Most of the variable names should be self-explanatory, and you can find additional information in the introduction chapter (check any pdf file in [the distribution Dropbox folder](https://www.dropbox.com/sh/mm6fwh3ruuuyjz2/AABDUmo7Xj1S968FeJgbmFPva?dl=0)).

## To fill in and generate the "anteproyecto"

1. Go to the `Anteproyecto` directory, where you will find the `anteproyecto.tex` file. This is the one you should work in. An example is provided in the repo file.
2. Edit the file to suit your needs
3. Compile it (there is a `Makefile` available, but you can use your standard LaTeX build tool).

## To fill in and generate the main book

1. Go to the "Book" directory
2. The main compilation file is `book.tex` that you can suit to your needs commenting out what you don't need. If you compile it "as provided" you will see a lot of examples that can be useful for your particular case.
3. Edit the files you need (abstract files, chapter files, dedication files, appendix files, etc.) There is a specific directory for each of them
4. Compile the `book.tex` file (there is a `Makefile` available, but you can use your standard LaTeX build tools).

## To fill in and generate paperwork

1. Go to the `Papeleo` directory where you will find general files required for all document types, and specific subdirectories for PhDs, TFGs and TFMs
2. Edit the files you need and compile them by using the corresponding `Makefile`s or your standard LaTeX build tool. If you use [Overleaf](https://www.overleaf.com/), change the `main document` to be the one you want to compile.


# Important note about bibliography handling

## For the impatient

Regarding bibliography files, you just have to edit the `Book/biblio/bibliofiles.tex`
file, stating (uncommenting) which files you need for the bibliography. No
changes are needed elsewhere.

The default bibliography processing backend is now `biber` (from September 2022
onwards). This implies that you have to tell your IDE that you are using `biber`
instead of `bibtex`. This applies to TeXStudio for example.

## More details

As of September 2022, nice work from Gonzalo Corral abandoned the `bibtex`
processing tool in favor of `biber`.

There a number of advantages and disadvantages on using `biber` (see for example
[here](https://tex.stackexchange.com/questions/25701/bibtex-vs-biber-and-biblatex-vs-natbib)
and [here](https://tex.stackexchange.com/questions/53247/why-is-biber-so-slow))
but the fact that it can use UTF-8 as the encoding for the bib files was the
number one reason for accepting this change.

The change in the backend processor caused a major headache as `biblatex`
requires specifying the bib files in the preamble, and we did not want to make
users deal with it. The solution we found was quick and dirty but it seems to
work: now the users just have to edit the `Book/biblio/bibliofiles.tex` file to include the
required biblio files.

## If you still prefer (for whatever reason) `bibtex` as your backend

Gonzalo still kept some support for `bibtex` in the `Makefile` and `Book/book.tex` files. If you want to use the `bibtex` you have to:

- Define the `\bibliosystem` variable in `Config/preamble.tex` to be equal to `bibtex`
- Convert the `biblio/biblio.bib` file to ISO-8859-1 encoding


## Collaboration with your advisor or colleagues

### Using GitHub for Version Control

I strongly recommend using [GitHub](https://www.github.com) to keep track of your LaTeX source code. Version control allows you to:

- Track changes over time.
- Collaborate with your advisor or colleagues.
- Keep a backup of your work in a remote repository.

You will find lot of useful information on [GitHub](https://www.github.com) out there, so that I will not bore you here with the details

### Managing the revision of the document

In order to manage the revision of the document (by your advisor for example), you can make use of the [GitHub](https://www.github.com) repository tools. I also found useful the revision process by using the `todonotes` package. It is installed by default and we defined some useful macros at the end of the `Config/myconfig.tex` file. Check them if you are interested.

# Disclaimer & request for help & offer to help

There is a lot of work to do in documenting this template, and I'll do my best to do it, but I can't promise you anything. I know the structure and complexity of the template can be overwhelming when you first face it, so that I would like you to contribute with ideas or suggestions on how to make it easier to understand and use.

There are a lot of bad and very unprofessional coding habits (see Book/Makefile for a sample), but I'm not an expert and I just tried to make things work out of the box. It would be great if you can contribute in any way to improve this template, so that [drop me a message](mailto:javier.maciasguarasa@uah.es) or consider submitting a pull request.

Also, if you need help to make this work, or you have any compilation errors, or even suggestions for improvements, please contact me at [my email address](mailto:javier.maciasguarasa@uah.es).

Enjoy!


Javi

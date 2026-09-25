# Introduction

This repo contains a generic template for PhD, Msc (TFM) and BsC (TFG) thesis documents mainly designed to be used at the University of Alcala (UAH), so that it is written in Spanish, although the template can generate the documents in English (just setting a variable in the configuration file).

The template uses configuration variables (defined in the `Config/myconfig.tex` file) to customize all the document generation process, so that you don't need to devote any effort to comply with formatting requirements (cover and back pages for example), document layout, etc.

Support to generate the "anteproyecto" is also provided (in the `Anteproyecto` folder), along with some of the paperwork required by the current regulations. As of February 2025 I have reworked all the paperwork required for the UAH TFGs (in the `PapeleoTFG/` folder) to comply with recently approved regulations. This support will be useful for you and your advisor/s (advisor report and rubric, defense rubric, and authorization for open publishing (for advisor/author/foreign advisor)). Paperwork support for TFM and PhD is pending to be fully re-checked against new regulations, but you can fully use the template to write the document itself.

Please read the guide at the beginning of any of the precompiled examples in the Dropbox distribution (for example, the [GIEC TFG at UAH](https://www.dropbox.com/s/69ppvvp9i03sp4m/TFG-GIEC-spanish.pdf?dl=0)). Chapter 1 presents the template and points you to the following chapters according to what you need.


# Quick start

## Download the template

The template is accessible in two ways:

1. In GitHub, in case you want to clone or fork my working version. It is available at
[my GitHub account project page](https://github.com/JaviMaciasG/PhD-TFM-TFG-LatexTemplate), so that you can clone it from [the clone URL](https://github.com/JaviMaciasG/PhD-TFM-TFG-LatexTemplate.git). Beware that it has a lot of extra files that should not be useful for the general user
2. In my dropbox, in zip and tgz formats, accessible at [this Dropbox download folder](https://www.dropbox.com/sh/mm6fwh3ruuuyjz2/AABDUmo7Xj1S968FeJgbmFPva?dl=0).  At this location you will also be able to access the sample book files for all the different flavors (degrees, masters, PhD programs) and in Spanish and English versions. The first chapters form a practical guide to installing, configuring and using the template. **Please do read the introductory itinerary** and then consult the chapters that apply to your work. The final tutorial chapters provide sample code for a variety of (IMHO) nice things you might find useful.


## Choose where you want to work

You have two main options to work with the template: Do your work locally in any PC (my preferred configuration is using [TeXstudio](https://www.texstudio.org/)), or do it online using [Overleaf](https://www.overleaf.com/). Both options are described below.


### Working on a local machine

You will need a good LaTeX distribution (Tex Live, MiKTeX, MacTeX, etc., depending on your working environment). For a list of all required packages, you can have a look at the `\usepackage{...}` statements in the file `Config/preamble.tex`, but this should not be a problem as most distributions would have everything you need. If you run into errors due to packages not being available, install them (this should be easy enough).

Beware that the main compilation is done using `pdflatex+biber`. You can compile the document with [TeXstudio](https://www.texstudio.org/) or any good LaTeX editor after configuring the required tools. The provided `make` workflow automates the complete process and is convenient if it is available in your environment, but you do not need it to use the template.


#### Notes on GNU/Linux installation

I'm talking here about debian-like distributions (mainly Ubuntu), but package instructions and package names should be similar across other ones.

I would recommend you to install the Tex Live distribution (`sudo apt-get install texlive` will do in an Ubuntu box, for example). Most of the required packages will be installed by default being typical exceptions `texlive-publishers`, `texlive-lang-spanish` and `texlive-lang-english`. Do install them.

You can also use `sudo apt-get install texlive-full` for an overloaded full texlive distribution, but this will take a lot of disk space.

Regarding editors I would suggest you to use [TeXstudio](https://www.texstudio.org/) or [emacs](https://www.gnu.org/software/emacs/). I personally use the latter, with the [Doom emacs configuration](https://github.com/doomemacs/doomemacs), but the learning curve can be really steep, so that [TeXstudio](https://www.texstudio.org/) is, IMHO, a safer bet.


#### Notes on Windows installation

This is my recommended route to have everything ready to go:


1. Install the latest version of [MikTeX](https://miktex.org). Select install required packages on the fly (either "Yes" or "Ask me first")

   1.1. Run `MiKTeX Console` and `Check for updates` (otherwise you'll probably get an error when compiling LaTeX sources)

   1.2. In `MiKTeX Console`, run `Updates|Update` now

2. Install the latest version of [TeXstudio](https://www.texstudio.org/)

3. Install a perl interpreter (if you plan to use acronyms, handled by `makeglossaries` in the template, which I fully recommend). I used Strawberry perl from https://strawberryperl.com/, but you can go to the perl site (https://www.perl.org/get.html) and check other alternatives.


#### Notes on TeXStudio configuration (VERY IMPORTANT)

The bibliography backend is now biber (from 2022), so that you have to configure TeXStudio to use biber as the bibliography processor. In the application just go to "Options > Configure TeXstudio > Build > Default Bibliography > Biber"


### Working in [Overleaf](https://www.overleaf.com/)

First of all I have bad news on using [Overleaf](https://www.overleaf.com/) to compile your work: the [Overleaf](https://www.overleaf.com/) free plan option (from 2024, with their new restrictions) will not assign you enough compile time to generate the pdf file :-(.

Anyway, if you want to work with the template in [Overleaf](https://www.overleaf.com/) (using one of the paid plans), it's pretty easy. Here you are the main steps:

1. Log in to [Overleaf](https://www.overleaf.com/)
2. In the main page, select the `New Project` button
3. Select `Upload project`
4. Select the corresponding zip among the ones you may find in the [template dropbox folder](https://www.dropbox.com/sh/mm6fwh3ruuuyjz2/AABDUmo7Xj1S968FeJgbmFPva?dl=0)
5. [Overleaf](https://www.overleaf.com/) will do its magic and in a few seconds you'll have the template installed

Remember that you will have to select the "main document" (access it through the options you will find clicking the overleaf logo in the top left corner of the project main page). See below in the "To work in the..." to see which are the main files you have available. The most relevant files to select as "main document" are:

+ `Anteproyecto/anteproyecto.tex`
+ `Book/book.tex`

You might also need some of the paperwork files described in the Repository structure (#repository-structure) section.

We have had a number of issues with [Overleaf](https://www.overleaf.com/) in the past (mainly regarding glossaries), and they should be fully working. If new issues arise in the future, [this repo](https://github.com/gkilleen33/overleaf-offline/tree/master) has nice configurations for `latexmkrc` that should provide hints on how to solve them).


## Repository structure

The directories most users need are:

- `Config/`: Shared configuration and document-generation logic. For most of the cases, you will just have to edit `Config/myconfig.tex`, that is the main file for personal, degree, language, and document settings.
- `Book/`: Main TFG, TFM, or PhD document. Its entry point is `Book/book.tex`; its subdirectories contain abstracts, chapters, appendices, bibliography files, figures, diagrams, acronyms, and symbols.
- `Anteproyecto/`: Anteproyecto or proposal document. Its entry point is `Anteproyecto/anteproyecto.tex`.

In some cases you might also need the resources found at:

- `PapeleoTFG/`, `PapeleoTFM/`, and `PapeleoPHD/`: Administrative documents (paperwork) associated with each type of work.
- `normativas/`: Official regulations and source annexes used as references when maintaining the templates.
- `UsefulDocs/`: LaTeX reference documents and cheat sheets.

The following directories are primarily intended for template maintainers:

- `AdminScripts/`: Distribution, validation, and maintenance scripts.
- `Deprecated/`: Legacy implementations retained for reference; new documents should not depend on them.

For a normal thesis or final-project document, start with `Config/myconfig.tex` and `Book/book.tex`. You should not normally need to modify `Config/preamble.tex`, `Config/postamble.tex`, or files under `Book/cover/` unless you are changing the template infrastructure or implementing a new institutional format.

## Configure your data

   All the information you can customize is in the `Config/myconfig.tex` file. The variable names are all defined in `\newcommand{}{}` statements and all of them start with the `\my` prefix. Most of the variable names should be self-explanatory, and you can find the complete variable reference in the configuration chapter (check any pdf file in [the distribution Dropbox folder](https://www.dropbox.com/sh/mm6fwh3ruuuyjz2/AABDUmo7Xj1S968FeJgbmFPva?dl=0)). **Critical**: Do not remove nor comment out any of the lines with a variable definition. If a variable is not relevant to your case (for example the "cotutor" information), just leave it empty (by emptying the definition).

## To work in the "anteproyecto"

1. Configure the document metadata in `Config/myconfig.tex`.
2. Go to the `Anteproyecto` directory, where you will find the `anteproyecto.tex` file. This is the one you should work in and the entry point for compilation. An example is provided in the repo file.
3. Edit the file to suit your needs
4. Compile it (there is a `Makefile` available, but you can use your standard LaTeX build tool or command within your preferred LaTeX editor).

## To work in the main book

After downloading the template, first compile `Book/book.tex` without modifying it. The resulting PDF is the complete manual, including examples of the available features; use this first build to check that everything works and review the guide before starting your document.

1. Configure the document metadata in `Config/myconfig.tex`, if you haven't already done it.
2. Review `Book/book.tex` and comment out any material you do not need. The example document enables a sample external letter, dedication, acknowledgements, acronym and symbol lists, example chapters, and appendices.
3. Edit the content under `Book/abstract/`, `Book/chapters/`, `Book/appendix/`, and the other content directories as required.
4. Build the document from the `Book/book.tex` entry file, or from the `Book/` directory by using `make` (optional). You can compile `Book/book.tex` with a standard LaTeX build tool or from your preferred LaTeX editor. Configure the tool or editor to use `pdflatex` and `biber`; add `makeglossaries` only if you use acronyms or symbols. Run the additional LaTeX passes required to resolve references, the bibliography, and any glossaries.

The provided Makefile runs those steps automatically. It generates `book.pdf` and a reduced-size `book-compressed.pdf` variant, and copies them to filenames derived from the work type, degree, author, and language. Other build tools may generate only `book.pdf` unless configured to reproduce these additional steps.

If you follow the `make` compilation alternative, to remove generated auxiliary files, run this from `Book/`:

```bash
make clean
```

When you are ready to write your own document, you can start from the minimal, almost empty structure we prepared for you. If you are not using `make`, replace `Book/book.tex` with `Book/book-bare.tex`, remove the `.tex` files located directly under `Book/chapters/` and `Book/appendix/`, and copy into those directories the files from `Book/chapters/bare/` and `Book/appendix/bare/`, respectively. If you use `make`, running `make bare-chapters` from `Book/` performs this preparation automatically after creating a backup.

Once the minimal structure is ready, create your Git repository and make a first commit of its source files. If you prefer a graphical Git client, keep the supplied `.gitignore`, ask the client to include all unignored changes in the commit, review the proposed file list, and then create the commit; the client may call this operation *Stage all*, *Stage all changes*, *Select all*, or simply present checkboxes for the files to commit. The complete beginner-friendly procedure, the files that must never be committed, and the dependency-aware `make sync-git-sources` alternative are explained in the manual section *Preparación del repositorio Git*.


## Customize the book contents

### Chapters and appendices

Create or edit `.tex` files under `Book/chapters/` and `Book/appendix/`, then add or remove the corresponding `\input{...}` lines directly in `Book/book.tex`. The same approach applies to the dedication, acknowledgements, abstracts, and optional lists.

### Figures and diagrams

Place document illustrations in `Book/figures/` or `Book/diagrams/`. Because `Book/book.tex` adds both directories to `\graphicspath`, they can normally be included by filename:

```latex
\includegraphics[width=0.8\textwidth]{my-figure.pdf}
```

If you follow the `make` compilation alternative, the Makefile can convert supported Dia, SVG, and EPS sources when the corresponding external tools are installed. PDF, PNG, and JPEG files can be used directly by `pdflatex`. Keep institutional logos under `Book/logos/` separate from document-specific illustrations.

### Acronyms and symbols

Define acronyms in `Book/acronyms/defacronymsgl.tex` and symbols in `Book/symbols/defsymbolsgl.tex`. Their presentation is controlled by the corresponding `acronymsgl.tex` and `symbolsgl.tex` files and the shared glossary configuration.

### External PDF pages

Use `\includepdf` when an approval letter or another PDF must be inserted into the document:

```latex
\includepdf[pages=-]{letters/my-letter.pdf}
\clearemptydoublepage
```

The `pages=-` option includes every page. Review the sample inclusion in `Book/book.tex` and comment it out when it is not required.

## To work with the paperwork

1. Go to `PapeleoTFG/`, `PapeleoTFM/`, or `PapeleoPHD/`, according to the type of document you need.
2. Edit the files you need and compile them by using the corresponding `Makefile`s or your standard LaTeX build tool. Running `make` generates every form in the directory; use `make help` to see the available groups and individual targets. If you use [Overleaf](https://www.overleaf.com/), change the `main document` to be the one you want to compile.


# Bibliography handling

Regarding bibliography files, for normal use, you just have to edit `Book/biblio/biblio.bib` to include your desired BibTeX entries.

If you have a number of different `.bib` files, add each of them under `Book/biblio/` and define its path in `Book/biblio/bibliofiles.tex` using the provided `\mybibfileOne`, `\mybibfileTwo`, and subsequent examples. No changes are needed elsewhere.

Remember that the default bibliography processing backend is now `biber` (from September 2022 onwards). This implies that you have to tell your IDE that you are using `biber` instead of `bibtex`. This applies to TeXStudio for example.

# Collaboration with your advisor or colleagues

## Using GitHub for Version Control

I strongly recommend using [GitHub](https://www.github.com) to keep track of your LaTeX source code. Version control allows you to:

- Track changes over time.
- Collaborate with your advisor or colleagues.
- Keep a backup of your work in a remote repository.

You will find lot of useful information on [GitHub](https://www.github.com) out there, so that I will not bore you here with the details

## Managing the revision of the document

In order to manage the revision of the document (by your advisor for example), you can make use of the [GitHub](https://www.github.com) repository tools. I also found useful the revision process by using the `todonotes` package. It is installed by default and we defined some useful macros at the end of the `Config/myconfig.tex` file. Check them if you are interested. The template document has also a section devoted to generating a *change control* document.

# Disclaimer & request for help & offer to help

There is a lot of work to do in documenting this template, and I'll do my best to do it, but I can't promise you anything. I know the structure and complexity of the template can be overwhelming when you first face it, so that I would like you to contribute with ideas or suggestions on how to make it easier to understand and use.

There are a lot of bad and very unprofessional coding habits (see Book/Makefile for a sample), but I'm not an expert and I just tried to make things work out of the box. It would be great if you can contribute in any way to improve this template, so that [drop me a message](mailto:javier.maciasguarasa@uah.es) or consider submitting a pull request.

Also, if you need help to make this work, or you have any compilation errors, or even suggestions for improvements, please contact me at [my email address](mailto:javier.maciasguarasa@uah.es).

Enjoy!


Javi

# LaTeX template for bachelor's, master's and doctoral theses

## Introduction

Writing a bachelor's, master's or doctoral thesis is enough work already. Wrestling with margins, the cover and page numbering shouldn't be part of the package.

The template is designed mainly for the University of Alcalá (UAH), although it also supports some degrees at URJC and ETSIT-UPM. It can generate documents in Spanish or English and covers everything from conventional academic reports to project proposals, administrative paperwork and doctoral theses by compendium of publications.

When you first use the template, all those files and options may feel a little intimidating. That's normal, but you don't need to know them all or have Jedi-level skills to get started. You'll only need to deal with a few files, and I'll show you which ones. You'll discover the rest as you need it, so relax and keep going, because I'm sure you've got this.


## What the template does for you

By simply filling in a few configuration details, you let the template take care of much of your document's formatting. It also includes examples you can adapt to your work. Specifically, it handles:

- Front covers, back covers, preliminary pages, and the structure of chapters and appendices.
- Table of contents and lists of figures, tables, code, algorithms (and interesting extras such as lists of videos).
- Figures, tables, equations and cross-references.
- Per-chapter bibliographies, a general bibliography or both.
- Acronyms and lists of symbols.
- Different typesetting styles, so you can quickly and easily change the visual appearance.
- Project proposals, some administrative paperwork and even doctoral theses by compendium of publications.

## Start here: the short version

Here's the route I suggest (use the links to jump to the section of this document where I explain the details):

1. **[Set up your environment](#set-up-your-environment)**: a local installation with `TeXstudio` or a project in `Overleaf` or `Prism`.
2. **[Download and extract the student distribution](#download-and-extract-the-student-distribution)**.
3. **[Compile the example without changing anything](#compile-the-example-without-changing-anything)** to check that everything works and consult the manual it generates.
4. **[Enter your details and compile again](#enter-your-details-and-compile-again)** to check them in the PDF.
5. **[Prepare the minimal structure](#prepare-the-template-for-writing)** and start writing your document.

If the PDF shows your name and your thesis title, you've got the template working. Congratulations, you've already overcome 80% of the fear. You'll learn the rest as you need it.

## Set up your environment

To get started, I recommend working on your own computer with a LaTeX distribution and [`TeXstudio`](https://www.texstudio.org/). If you already use another editor, you can keep using it. You can also work in your browser with `Overleaf` or `Prism`.[^privacidad]

[^privacidad]: Before uploading your project to an online service, review its privacy terms and, if you use AI features, its data-use controls. If your project contains confidential information, personal data or material covered by agreements with third parties, check with your advisor or institution first. A local installation lets you work without uploading your project to these services.

### Windows

1. Install the current version of [`MiKTeX`](https://miktex.org/download).
2. During installation, allow `MiKTeX` to install missing packages, either automatically or after asking you.
3. Open `MiKTeX Console`, check for updates and install them (use the `Check for updates` option on the main screen).
4. Install [`TeXstudio`](https://www.texstudio.org/).

Then follow the instructions in [Configure `TeXstudio`](#configure-texstudio).

### GNU/Linux

On Ubuntu or Debian, look for these exact names in your system's package manager:

- `texlive-full`: installs the complete LaTeX distribution, including its packages, fonts and languages. It takes up several gigabytes and may take a while to install, but saves you from having to work out which individual packages the template needs.
- `texstudio`: installs the editor where you'll write your thesis.
- `biber`: installs the tool that prepares the bibliography. With `texlive-full`, it will usually already be installed as a dependency, but you can check in the package manager.

For example, if you have the `Synaptic` Package Manager on Ubuntu, open it, search for each name, select `Marcar para instalar` and click `Aplicar`. Accept any dependencies it suggests too. `Synaptic` isn't installed by default in every version of Ubuntu. The [Ubuntu help page for `Synaptic`](https://help.ubuntu.com/stable/ubuntu-help/addremove-install-synaptic.html.en) explains how to get it and use it. If you prefer installing from the terminal, you'll find the commands in the manual.

On other GNU/Linux distributions, install `TeX Live`, `TeXstudio` and `biber` through their package manager. The names of the `TeX Live` collections may differ from those above.

Then follow the instructions in [Configure `TeXstudio`](#configure-texstudio).

### macOS

1. Install [`MacTeX`](https://www.tug.org/mactex/).
2. Install [`TeXstudio`](https://www.texstudio.org/) if you want to follow the recommended route.

The full `MacTeX` installation already includes `biber`.

Then follow the instructions in [Configure `TeXstudio`](#configure-texstudio).

### Configure `TeXstudio`

The template uses `biber` to prepare bibliographic references. You only need to select it in the editor, not learn how to use it separately. This configuration is the same for Windows, GNU/Linux and macOS:

1. Open `Opciones` > `Configurar TeXstudio`. On macOS, open `TeXstudio` > `Preferencias`.
2. Go to `Compilar` and select `Biber` under `Herramienta bibliográfica por defecto`.
3. Confirm the changes with `Aceptar`.

If the menus are in English, look for `Options` > `Configure TeXstudio` (or `TeXstudio` > `Preferences` on macOS), then `Build` > `Default Bibliography Tool` > `Biber`.

### `Overleaf`

With [`Overleaf`](https://www.overleaf.com/), you can work in your browser without installing LaTeX or `TeXstudio` on your computer.[^privacidad] You only need an account and an Internet connection. The instructions for importing the template are in [Compile the example in `Overleaf`](#compile-the-example-in-overleaf).

A word of warning: on the free plan, you almost certainly won't be able to compile the complete manual because that version of `Overleaf` has a very restrictive compilation time limit. If it times out, it doesn't mean you've done anything wrong. You can use a local installation or, after reviewing the precompiled manual, try the minimal structure and leave out any example material you don't need. A smaller document may fit within the time limit, but I can't guarantee it.

### `Prism`

[`Prism`](https://prism.openai.com/) is another option for working with LaTeX in your browser, with AI assistance features.[^privacidad] You need a `ChatGPT` account with access to `Prism` and an Internet connection, but you don't need to install LaTeX or `TeXstudio`. I've checked that the template distribution imports and compiles without modifications.

The instructions in [Compile the example in `Prism`](#compile-the-example-in-prism) will guide you through generating your first PDF without asking you to use the AI features. You can consult the [official privacy information for `Prism`](https://help.openai.com/en/articles/20001050-troubleshooting-and-getting-help-in-prism) before uploading your work.

### If you're comfortable with the terminal

`make` is an optional alternative to the editor for automating tasks. Besides the LaTeX distribution and `biber`, this route needs `make`, `bash`, `latexmk`, `perl` and `makeglossaries` (if any of these tools is missing from your distribution, you'll get a clear error message and can simply install what's missing). The book's default target also uses `Ghostscript` to generate a compressed copy. The manual explains these requirements and the additional tools for converting certain figure and diagram formats.

**You don't need to use the terminal or** `make` **to work with the template**: your LaTeX editor is an equally valid alternative. If you choose this route, you'll find the instructions in [Optional compilation with `make`](#optional-compilation-with-make).

## Your first PDF, step by step

### Download and extract the student distribution

To write your document, I recommend downloading the `zip` distribution from [`Dropbox`](https://www.dropbox.com/sh/mm6fwh3ruuuyjz2/AABDUmo7Xj1S968FeJgbmFPva?dl=0)[^1].

[^1]: The [`GitHub` repository](https://github.com/JaviMaciasG/PhD-TFM-TFG-LatexTemplate) also contains maintenance tools, regulations and historical files. You can clone it or create a *fork* if you want to contribute, but you don't need those materials to get started.

The [PDF download guide](https://www.dropbox.com/scl/fi/n4jtan9a5v06cc1cp7n4h/01-DOWNLOAD-GUIDE.pdf?rlkey=ux7d8ox85zwlpwhr6nyjvx7zk&dl=0) explains what each example demonstrates. We only provide a few examples to avoid overwhelming you with dozens of files and possibilities, and the absence of a PDF for your particular degree doesn't mean it isn't supported (the list is very long). If you want to consult the manual before installing anything, open the [GIEC bachelor's thesis example at UAH](https://www.dropbox.com/scl/fi/wwzbaow0g4cgs7euxvwxy/TFG-GIEC-spanish.pdf?rlkey=2x54yp52avfad67a2fdl3esmv&dl=0).

Extract the template into a folder where you have write permissions. Keep the distribution's directories together: `Book/` needs the shared files in `Config/`.

### Compile the example without changing anything

With your [environment set up](#set-up-your-environment), open `Book/book.tex` in `TeXstudio` and select `Herramientas` > `Compilar y ver` (`F5`), or click the double green arrow icon ![Build and view](Book/figures/manual/texstudio-build-and-view-16.png) on the toolbar. Do this first compilation before changing anything. If you use another editor, open the same file and use its usual build function. To work in your browser, follow the instructions for [`Overleaf`](#compile-the-example-in-overleaf) or [`Prism`](#compile-the-example-in-prism).

The template automatically generates the lists of acronyms and symbols. When using the editor this way, you don't need to install anything else (apart from the LaTeX distribution, of course). If the lists don't appear after the first compilation, compile again. For other issues, consult the compilation section of the manual.

The resulting PDF confirms that your environment works and serves as the template manual and a collection of examples. Browse it to get your bearings, without having to read it all. If this first compilation fails, check [Common problems](#common-problems) before changing other files.

### Compile the example in `Overleaf`

Log in to `Overleaf`, create a project through `New Project` > `Upload Project` and upload the distribution `zip` without extracting it. Open `Settings` > `Compiler` > `Main document` and select `Book/book.tex`. Check that the compiler is `pdfLaTeX` and click `Recompile`. You don't need to configure `biber` separately. If compilation times out, review the warning in the [`Overleaf`](#overleaf) section.

When you want to compile another standalone document, such as `Anteproyecto/anteproyecto.tex` or a paperwork form, select it in the same `Main document` field. To work on the book's chapters, keep `Book/book.tex` selected, not the individual chapter file.

### Compile the example in `Prism`

Log in to `Prism` and, in the project list, open the `Import` dropdown and select `Import a .zip file`. Upload the distribution `zip` without extracting it and wait for the complete project to import, including `Book/` and `Config/`. Select `Book/book.tex` in the `Archivos` list and click `Compilar`. Check the result in the PDF view before changing any files. You don't need to run the `Makefile` or ask the AI assistant to make changes for this first test.

To compile another standalone document, such as `Anteproyecto/anteproyecto.tex` or a paperwork form, select it in `Archivos` and click `Compilar`. If you're writing a chapter of the book, select `Book/book.tex` to compile the complete document, not the chapter file.

If you need help importing the project, consult the [official `Prism` guide](https://help.openai.com/en/articles/20001050-troubleshooting-and-getting-help-in-prism). Then continue with [Enter your details and compile again](#enter-your-details-and-compile-again).

### Enter your details and compile again

Open `Config/myconfig.tex` and use your editor's search function to find the following definitions. You don't need to know their line numbers, which may change between versions. In a definition such as `\newcommand{\myDegree}{GIEC}`, change only the contents of the last pair of braces.

- **Degree:** search for `\myDegree` and replace `GIEC` with your degree's identifier. The comments immediately above it contain the available options.
- **Language:** search for `\myLanguage` and choose `spanish` or `english`.
- **Title:** search for `\myBookTitleSpanish` and `\myBookTitleEnglish` and replace the example titles with those of your thesis. The template selects the one matching the language, although some institutional pages may use both.
- **Authorship:** fill in `\myAuthorName` and `\myAuthorSurname`. Set `\myAuthorGender` to `male` or `female` to adapt the grammatical gender.
- **Supervision:** fill in `\myAcademicTutorFullName` and `\myAcademicTutorGender`. If you have a coadvisor, also fill in `\myCoTutorFullName` and `\myCoTutorGender`. If not, leave the last pair of braces in the definition of their name empty: `{}`.

These details let you check the initial personalisation. Leave the advanced options for later and review the other fields as you need them. You can fill in dates, such as the defence date, once you know them.

> **Important:** don't delete or comment out variable definitions. If an optional detail doesn't apply to you, such as the coadvisor, keep the variable and leave its value empty.

Compile `Book/book.tex` again and check that your name, title and degree appear correctly. Also check that the advisors' names and any dates you've entered have been updated if your degree's layout displays those details, as the UAH layouts do. Don't leave the example details in the version you submit. `Book/book.tex` is the file you compile, but you normally won't need to edit it: configuration and content are kept separate.

### Optional compilation with `make`

If you've installed the tools described in [If you're comfortable with the terminal](#if-youre-comfortable-with-the-terminal), open a terminal in `Book/` and run:

```bash
make
```

The `Makefile` uses `latexmk` to coordinate LaTeX, `biber` and glossary processing, run the necessary passes and avoid unnecessary recompilations. The proposal and paperwork directories also include `Makefile` files. Further down, you'll find two other uses: preparing the minimal structure and selecting sources for `git`, explained in the [collaboration](#collaboration-with-your-advisor-and-document-review) section.

## The files you really need to know

The folders aren't there to make your work more complicated, but to keep everything in its place so you can find it easily. Most files have a specific purpose, and you won't need to deal with them all at once.

To begin with, you only need to locate these files:

- `Config/myconfig.tex`: where you'll find your document's details and general options.
- `Book/book.tex`: where you'll find the main document you need to compile, although you normally won't need to edit it.
- `Book/content-standard.tex`: where you'll find the organisation of chapters, bibliography and appendices.
- `Book/biblio/biblio.bib`: where you'll find the bibliographic references.

And these folders, where you'll store the content of your work:

- `Book/chapters/`: where you'll find the chapters of your thesis.
- `Book/abstract/`: where you'll find the Spanish summary and the English abstract.
- `Book/appendix/`: where you'll find the appendices.
- `Book/figures/`: where you'll find figures and images.
- `Book/diagrams/`: where you'll find editable or generated diagrams.

For now, focus on these files and folders. The others can wait.

You'll find the files to compile for the proposal and forms in [When you need something more](#when-you-need-something-more).

## Prepare the template for writing

You can already write in the template as it stands. However, its chapters contain the manual and examples. To start your work without having to remove them one by one, you can replace them with a minimal structure of almost-empty chapters. This preparation is optional: keep the current organisation if you'd rather adapt it yourself.

Once you've compiled and reviewed the manual, save a backup copy of the entire folder, including anything you've written, in case something goes wrong.

Once you've prepared the minimal structure using either of the two methods below, organise your work by adding, removing or reordering the `\input{...}` instructions in `Book/content-standard.tex`. Write in the content files, compile `Book/book.tex` and review the PDF and warnings. Making small changes and compiling frequently makes errors easier to find.

### Manual method

The distribution includes minimal versions (in other words, almost empty so you can write *your* book) of an initial chapter structure in:

```text
Book/chapters/bare/
Book/appendix/bare/
```

To prepare a conventional minimal structure manually, follow these steps:

1. Check that you've saved the backup copy before replacing or deleting files.
2. To avoid leaving example chapters that might confuse you, delete only the `.tex` files directly inside `Book/chapters/` and `Book/appendix/`. Don't delete the folders or their subfolders, such as `bare/`, `orig/` or `compendium/`, or files of other types. This cleanup isn't necessary for compilation, but makes it clearer which content you'll be using.
3. Copy the chapter files from `Book/chapters/bare/` to `Book/chapters/`, except for the organisation file `content-standard.tex`.
4. Copy the files from `Book/appendix/bare/` to `Book/appendix/`.
5. Replace `Book/content-standard.tex` with `Book/chapters/bare/content-standard.tex`.
6. Review which optional elements you want to include in `Config/myconfig.tex` and leave those you don't need set to `false`. For example, the lists of videos and symbols are usually unnecessary when starting out, because they serve more specialised needs.
7. Compile `Book/book.tex` again.

### If you feel comfortable with the terminal

If you use `make`, run this from `Book/`:

```bash
make bare
```

This target creates a backup, prepares the minimal structure, installs the corresponding source files and disables some of the optional example material. It also offers to delete example figures and diagrams, but only if you confirm. Before running it, still check that you've saved your own backup copy.

You can also prepare the minimal structure for a doctoral thesis by compendium if that's the selected structure. Consult the manual before applying it to a document you've already started.

## Collaboration with your advisor and document review

### `git` for keeping and sharing your work

`git` stores your project's history in a repository and lets you recover earlier versions. Each *commit* records a set of changes with a message describing them. You don't need it to compile, but I recommend it so you don't have to rely on copies called "final", "final-good" and "really-final-this-time".

`git` keeps the history on your computer. You can share a remote copy through `GitHub`, `GitLab` or another service, but remember to synchronise your changes to keep it up to date.

Once you've prepared the minimal structure, you can create your repository and make the first *commit* from a graphical application, without using the console:

1. Open the project's root folder and use the option to create or initialise a repository if one doesn't exist yet.
2. Keep the `.gitignore` file included with the template. It excludes auxiliary files and the PDFs generated during compilation.
3. Select all the files the application suggests for your first *commit*. The option may be called `Stage all changes`, `Select all` or appear as a checkbox to select everything. Even if there are lots of files, you don't have to choose them one by one. If any personal files you've copied into that folder appear and you don't want to share them, deselect them.
4. Write a message describing the start of your work and create the *commit*. Publishing it to a remote service is a separate, later operation.

The manual's *Preparación del repositorio `git`* section explains which files to keep, which ones not to upload and how to continue with subsequent *commits*. You'll find plenty of information about `git` and `GitHub`, so I won't bore you with the details here.

If you're comfortable with the terminal and use `make`, with your repository already created, run `make sync-git-sources` from the root to select sources according to the compilation dependencies. It will show you the changes and ask for confirmation before preparing your next *commit*. It can stop tracking files it doesn't detect as necessary for compilation, without deleting them from disk. This option doesn't make the *commit* or upload the changes to the online repository for you. Consult the manual for the requirements.

### Reviewing the document with your advisor

The `git` history helps you see what's changed, but doesn't replace comments on the content. You can combine it with the review tools provided by whichever service you use to share the project.

I've also found the `todonotes` package useful, and the template already loads it. At the end of `Config/myconfig.tex`, you'll find example commands such as `\todojmg`, `\todorbc` and `\todomig`, which you can adapt to the people reviewing your work. For example, `\todojmg{Revisar esta explicación}` inserts a review note. The manual describes these tools and how to generate a document showing tracked changes. Come back to these tools when you start exchanging versions with your advisor.

## When you need something more

Add these features as you need them. The manual contains the full details and examples.

### Project proposal

To work on your project proposal, open `Anteproyecto/anteproyecto.tex`, which shares the details defined in `Config/myconfig.tex` with the main document. If you work online, follow the document-selection instructions for [`Overleaf`](#compile-the-example-in-overleaf) or [`Prism`](#compile-the-example-in-prism).

### Bibliography

For normal use, add your BibTeX references to `Book/biblio/biblio.bib`. The template uses `biblatex` with `biber`. If you work with `TeXstudio`, apply the configuration described in [Configure `TeXstudio`](#configure-texstudio).

If you work with several `.bib` files, place them in `Book/biblio/` and declare them in `Book/biblio/bibliofiles.tex`, following the existing examples.

### Figures and diagrams

Store illustrations in `Book/figures/` or `Book/diagrams/`. You can use figures in PDF, PNG and JPEG format directly in the template.

For example:

```latex
\includegraphics[width=0.8\textwidth]{mi-figura.png}
```

The `Makefile` files can convert some source formats, such as SVG, EPS or DIA, when the corresponding external tools are installed.

### Acronyms and symbols

You can define your acronyms and symbols in:

```text
Book/acronyms/defacronymsgl.tex
Book/symbols/defsymbolsgl.tex
```

Both files already contain examples you can follow to add your own definitions. To generate the lists (indexes), follow the instructions for [the first compilation](#compile-the-example-without-changing-anything). If you use `make`, remember the requirements in [If you're comfortable with the terminal](#if-youre-comfortable-with-the-terminal).

### Administrative paperwork

You'll find some of the administrative documents grouped by type of work in these directories:

```text
PapeleoTFG/
PapeleoTFM/
```

You can compile the `.tex` file for an individual form from your editor or use the corresponding `Makefile` files (run `make help` in the relevant folder for more help). If you work online, select it as explained in the [`Overleaf`](#compile-the-example-in-overleaf) or [`Prism`](#compile-the-example-in-prism) sections. Consult the PDF guides included in those folders and always check the applicable regulations.

### Doctoral thesis by compendium of publications

For a doctoral thesis by compendium:

- Select `PHDUAH-COMPENDIUM` or `PHD-ETSIT-UPM-COMPENDIUM` through `\myDegree` in `Config/myconfig.tex`, according to your university.
- Organise the content in `Book/content-compendium.tex`.
- Keep compiling `Book/book.tex`.

Consult the manual and your programme's regulations before including publications, especially regarding permission to reuse them.

## Common problems

### The PDF isn't generated

First try a freshly downloaded copy, without modifications. If that doesn't compile either:

1. Check the first actual error message in the log, not just the last one.
2. Update your LaTeX distribution.
3. Allow any missing packages to be installed.
4. Check that you're compiling `Book/book.tex`.
5. Verify that you've selected `biber`, as explained in [Configure `TeXstudio`](#configure-texstudio). If you've changed the compiler in `TeXstudio`, check that `Compilador por defecto` is set to `PdfLaTeX` under `Opciones` > `Configurar TeXstudio` > `Compilar` (on macOS, `TeXstudio` > `Preferencias` > `Compilar`).

### The bibliography doesn't appear

Check that:

- The entries are in `Book/biblio/biblio.bib` or in a file declared in `Book/biblio/bibliofiles.tex`.
- You've cited the references in the text.
- You've followed the instructions in [Configure `TeXstudio`](#configure-texstudio) to select `biber`.

After checking these points, compile again as explained in [Compile the example without changing anything](#compile-the-example-without-changing-anything). If the bibliography still doesn't appear and there are no outstanding errors in the log, try `Herramientas` > `Limpiar los archivos auxiliares` in `TeXstudio`. Review the list of files it will delete, click `Aceptar` and compile again. This cleanup is a troubleshooting measure, not a necessary step in every compilation.

### The example compiled before I modified it

Save all files and compile `Book/book.tex` again. In `TeXstudio`, open the messages or log panel and find the first error, not the formatting warnings. If the editor lets you jump to its location, open the indicated line and also check the preceding ones: sometimes the problem starts before the point where LaTeX detects it.

Start by checking the changes you've just made:

- That every opening brace `{` has its closing brace `}` and you haven't removed a backslash `\` from a command.
- That you haven't commented out or deleted a definition in `Config/myconfig.tex`.
- That file paths and names match exactly what you're using, including the extension.
- That special characters in the text are written correctly, for example `\%`, `\&` or `\_` when you want to print those symbols.
- That bibliography entries still have their braces and the commas between fields.

If you identify a recent change that might be responsible, first save a copy of the file and undo just that change to test it. You can also compare it with your backup. Avoid replacing entire folders or deleting your work to try to fix an error.

If your changes in `myconfig.tex` don't appear, also check that you're editing the same copy you're compiling.

### I don't understand the error message

Review the errors in the compilation log. Start with the first one: the others are usually collateral damage. Note down:

- The file and line indicated.
- The exact error message.
- The last change you made.

If you ask for help, include that information. A message like "it won't compile" describes the symptom, but offers few technical clues.

## Manual, examples and help

When you compile the distribution, you'll also get the complete manual and a collection of examples. You don't need to read it from beginning to end before starting: consult it whenever you want to configure a feature or copy the structure of an example.

The links to the download guide and precompiled example are in [Download and extract the student distribution](#download-and-extract-the-student-distribution). To report a reproducible error or suggest an improvement, you can use the [`GitHub` issue tracker](https://github.com/JaviMaciasG/PhD-TFM-TFG-LatexTemplate/issues).

If you need help with a compilation error or want to send a suggestion, you can write to me at [javier.maciasguarasa@uah.es](mailto:javier.maciasguarasa@uah.es). If possible, include your operating system, LaTeX distribution, editor, the file you were compiling and the first error message.

## Credits, licence and contributions

I'm Javier Macías Guarasa, and I maintain this template so you can spend more time on the content of your work than on formatting. Your corrections, experiences and suggestions help me improve it, as they have over the years.

I'm not an expert in LaTeX or template design, and many decisions have come from trying to solve specific problems. As I mentioned in the introduction, I'm well aware that the structure can feel overwhelming at first and that some things could still be made simpler. If you spot any, or have any suggestions, let me know by sending a message to [javier.maciasguarasa@uah.es](mailto:javier.maciasguarasa@uah.es).

The project keeps evolving, and all contributions are welcome, especially to:

- Fix errors.
- Improve the documentation.
- Update forms and institutional requirements.
- Extend compatibility with degrees.
- Simplify the experience for people using the template for the first time.

You can suggest changes through a *pull request* or report an issue on [`GitHub`](https://github.com/JaviMaciasG/PhD-TFM-TFG-LatexTemplate).

Consult the licence file included in the distribution before redistributing or modifying the project.

Enjoy!



Javi

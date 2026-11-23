# LaTeX template for bachelor's, master's and doctoral theses

## Introduction

Writing a BSc, MSc or PhD thesis is already a lot of work, and fighting with margins, cover pages and page numbers shouldn’t be part of the deal. That’s what this template is for: you bring the content, and it takes on the formatting fight.

The template is designed mainly for BSc, MSc and PhD students at the University of Alcalá (UAH), although it also supports some degrees from other universities (URJC, UPM, UCLM and US). It can generate documents in either Spanish or English, and covers everything from BSc and MSc final projects to PhD theses, including theses by compendium of publications. It also supports project proposals and, for UAH BSc and MSc projects, part of the administrative paperwork.

If opening the template makes you want to close it and pretend you never saw it because of all those files and options, take a deep breath: it’s perfectly normal. You don’t need to know them all, or to have *Jedi-level* skills, to get started. You’ll only need to deal with a few files, and I’ll tell you which ones. You’ll discover the rest when you need it. Spending a little time at the start pays off: the table of contents, cross-references and bibliography update themselves, your document gets a professional finish, and you can focus on what matters: writing. Relax and *ánimo*: I’m sure you can do it.


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

To get started, I recommend a local installation with TeXstudio, but you can also work online with Overleaf (I'll show you how as we go).

Here's the route I suggest (use the links to jump to the section of this document where I explain the details):

1. **[Set up your environment](#set-up-your-environment)** if you're working on your computer with TeXstudio. If you're using Overleaf, skip this step.
2. **[Download the student distribution](#download-the-student-distribution)**.
3. **Compile the example without changing anything** to check that everything works and consult the manual it generates:
    - On your computer: [extract the template and compile the example](#compile-the-example-on-your-computer-without-changing-anything).
    - In your browser: [compile the example in Overleaf](#compile-the-example-in-overleaf-without-changing-anything).
4. **[Enter your details and compile again](#enter-your-details-and-compile-again)** to check them in the PDF, whether you're working on your computer or using Overleaf.
5. If you want to start with a [minimal structure](#prepare-the-template-for-writing), set it up before you begin writing.

If the PDF you get after these steps shows your name and your thesis title, you've got the template working. Congratulations: 80% of the fear is behind you, and you'll learn the rest as you need it.

## Set up your environment

Here's how to install LaTeX and configure TeXstudio on your computer. If you already use another editor, you can keep using it. If you'd rather work in your browser, go straight to [Compile the example in Overleaf](#compile-the-example-in-overleaf-without-changing-anything).

With the setup above, you don't need the terminal or `make` to work with the template. If you'd like to use them, section 7.2 (*Compilación mediante el Makefile*) of the [manual] explains the process and which tools you need.

### Windows

1. Install the current version of [MiKTeX](https://miktex.org/download).
2. During installation, allow MiKTeX to install missing packages, either automatically or after asking you.
3. Open MiKTeX Console, check for updates and install them (use the `Check for updates` option on the main screen).
4. Install [TeXstudio](https://www.texstudio.org/).

Then follow the instructions in [Configure TeXstudio](#configure-texstudio).

### GNU/Linux

On Ubuntu or Debian, look for these exact names in your system's package manager:

- `texlive-full`: installs the complete LaTeX distribution, including its packages, fonts and languages. It takes up several gigabytes and may take a while to install, but saves you from having to work out which individual packages the template needs.
- `texstudio`: installs the editor where you'll write your thesis.
- `biber`: installs the tool that prepares the bibliography. With `texlive-full`, it will usually already be installed as a dependency, but you can check in the package manager.

If you prefer installing from the terminal, you'll find the commands in section 7.1 (*Instalación desde la terminal en GNU/Linux*) of the [manual].

On other GNU/Linux distributions, install TeX Live, TeXstudio and `biber` through their package manager. The names of the TeX Live collections may differ from those above.

Then follow the instructions in [Configure TeXstudio](#configure-texstudio).

### macOS

1. Install [MacTeX](https://www.tug.org/mactex/).
2. Install [TeXstudio](https://www.texstudio.org/) if you want to follow the recommended route.

The full MacTeX installation already includes `biber`.

Then follow the instructions in [Configure TeXstudio](#configure-texstudio).

### Configure TeXstudio

The template uses `biber` to prepare bibliographic references. You only need to select it in the editor, not learn how to use it separately. This configuration is the same for Windows, GNU/Linux and macOS:

1. Open `Opciones` > `Configurar TeXstudio`. On macOS, open `TeXstudio` > `Preferencias`.
2. Go to `Compilar` and select `Biber` under `Herramienta bibliográfica por defecto`.
3. Confirm the changes with `Aceptar`.

If the menus are in English, look for `Options` > `Configure TeXstudio` (or `TeXstudio` > `Preferences` on macOS), then `Build` > `Default Bibliography Tool` > `Biber`.

## Your first PDF, step by step

### Download the student distribution

To write your document, download `03-PhDTFMTFG-LaTeX-Template-UAH-<version>.zip` from [Dropbox](https://www.dropbox.com/sh/mm6fwh3ruuuyjz2/AABDUmo7Xj1S968FeJgbmFPva?dl=0), where `<version>` is the template's version number.

The [PDF download guide](https://dl.dropboxusercontent.com/scl/fi/n4jtan9a5v06cc1cp7n4h/01-DOWNLOAD-GUIDE.pdf?rlkey=ux7d8ox85zwlpwhr6nyjvx7zk) explains what each example demonstrates. We only provide a few examples to avoid overwhelming you with dozens of files and possibilities, and the absence of a PDF for your particular degree doesn't mean it isn't supported (the list is very long). When this README refers to a section of the "manual", it means the full document available on Dropbox: the [GIEC bachelor's thesis example at UAH][manual]. You can read it without installing anything.

### Compile the example on your computer without changing anything

Extract the template into a folder where you have write permissions. Keep the distribution's directories together: `Book/` needs the shared files in `Config/`.

With your [environment set up](#set-up-your-environment), open `Book/book.tex` in TeXstudio and select `Herramientas` > `Compilar y ver` (`F5`), or click the double green arrow icon ![Build and view](Book/figures/manual/texstudio-build-and-view-16.png) on the toolbar. Do this first compilation before changing anything. If you use another editor, open the same file and use its usual build function. To work in your browser, follow the instructions for [Overleaf](#compile-the-example-in-overleaf-without-changing-anything).

The template automatically generates the lists of acronyms and symbols. When using the editor this way, you don't need to install anything else (apart from the LaTeX distribution, of course). If the lists don't appear after the first compilation, compile again. For other issues, see section 7.4 (*Resolución de problemas*) of the [manual].

The resulting PDF confirms that your environment works and serves as the template manual and a collection of examples. Browse it to get your bearings, without having to read it all. If this first compilation fails, check [Common problems](#common-problems) before changing other files.

### Compile the example in Overleaf without changing anything

This option lets you work without installing LaTeX or TeXstudio on your computer. All you need is an account and an Internet connection. Before uploading your project to Overleaf, review the service's privacy terms.[^privacidad]

[^privacidad]: Before uploading your project to an online service, review its privacy terms and, if you use AI features, its data-use controls. If your project contains confidential information, personal data or material covered by agreements with third parties, check with your advisor or institution first. A local installation lets you work without uploading your project to these services.

A word of warning: on the free plan, you almost certainly won't be able to compile the complete manual because that version of Overleaf has a very restrictive compilation time limit. If it times out, it doesn't mean you've done anything wrong. You can use a local installation or, after reviewing the [precompiled manual][manual], try the [minimal structure](#prepare-the-template-for-writing) and leave out any example material you don't need. A smaller document may fit within the time limit, but I can't guarantee it.

Log in to [Overleaf](https://www.overleaf.com/), create a project through `New Project` > `Upload Project` and upload the [`zip` distribution](#download-the-student-distribution) without extracting it. Open `Settings` > `Compiler` > `Main document` and select `Book/book.tex`. Check that the compiler is `pdfLaTeX` and click `Recompile`. You don't need to configure `biber` separately.

When you want to compile another standalone document, such as `Anteproyecto/anteproyecto.tex` or a paperwork form, select it in the same `Main document` field. To work on the book's chapters, keep `Book/book.tex` selected, not the individual chapter file.

Then continue with [Enter your details and compile again](#enter-your-details-and-compile-again).

### Enter your details and compile again

Open `Config/myconfig.tex` and use your editor's search function to find the following definitions. You don't need to know their line numbers, which may change between versions. In a definition such as `\newcommand{\myDegree}{GIEC}`, change only the contents of the last pair of braces.

- **Degree:** search for `\myDegree` and replace `GIEC` with your degree's identifier. The available options are in the comments above that definition. The list is long, so search for your university or school acronym to find your degree faster.
- **Language:** search for `\myLanguage` and choose `spanish` or `english`.
- **Title:** search for `\myBookTitleSpanish` and `\myBookTitleEnglish` and replace the example titles with those of your thesis. The template selects the one matching the language, although some institutional pages may use both.
- **Authorship:** fill in `\myAuthorName` and `\myAuthorSurname`. Set `\myAuthorGender` to `male` or `female` to adapt the grammatical gender.
- **Supervision:** fill in `\myAcademicTutorFullName` and `\myAcademicTutorGender`. If you have a coadvisor, also fill in `\myCoTutorFullName` and `\myCoTutorGender`. If not, leave the last pair of braces in the definition of their name empty: `{}`.

These details let you check the initial personalisation. Leave the advanced options for later and review the other fields as you need them. You can fill in dates, such as the defence date, once you know them.

> **Important:** don't delete or comment out variable definitions. If an optional detail doesn't apply to you, such as the coadvisor, keep the variable and leave its value empty.

Compile `Book/book.tex` again and check that your name, title and degree appear correctly. Also check that the advisors' names and any dates you've entered have been updated if your degree's layout displays those details, as the UAH layouts do. Don't leave the example details in the version you submit. `Book/book.tex` is the file you compile, but you normally won't need to edit it: configuration and content are kept separate.

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

To use the preparation tool, open your file manager in the folder where you extracted the distribution, then follow the steps for your operating system. You can usually run a tool by double-clicking it:

- On **Windows:** run `Tools/prepare-book.bat`.
- On **macOS:** run `Tools/prepare-book.command`.
- On **GNU/Linux:** run `Tools/prepare-book.sh` and choose `Run in Terminal`.

When the tool starts, choose whether to prepare a minimal document or restore the examples. The tool backs up the files it will replace in `Book/.YYYYMMDD-HHMMSS-backup`. If you don't see the backup folder, turn on the option to show hidden files. Then compile `Book/book.tex`.

If you'd rather prepare the minimal structure by hand or your file manager won't let you run the tool, you'll find the steps in section 2.7 (*Preparación de una estructura mínima*) of the [manual]. This method also works if you're working in a browser. If you already use `make`, the same section explains how to automate the process.

Whether you start with the minimal structure or keep the original one, organise your work by adding, removing or reordering the `\input{...}` instructions in `Book/content-standard.tex`. Write in the content files, compile `Book/book.tex` and review the PDF and warnings. Making small changes and compiling frequently makes errors easier to find.

## Collaboration with your advisor and document review

### `git` for keeping and sharing your work

`git` stores your project's history in a repository and lets you recover earlier versions. Each *commit* records a set of changes with a message describing them. You don't need it to compile, but I recommend it so you don't have to rely on copies called `final`, `final-good` and `final-for-real-this-time-no-really`.

`git` keeps the history on your computer. You can share a remote copy through [GitHub](https://github.com/), [GitLab](https://gitlab.com/) or another service, but remember to synchronise your changes to keep it up to date.

Once you've prepared the minimal structure, you can create your repository and make the first *commit* from a [graphical application](https://git-scm.com/tools/guis), without using the console:

1. Open the project's root folder and use the option to create or initialise a repository if one doesn't exist yet.
2. Keep the `.gitignore` file included with the template. It excludes auxiliary files and the PDFs generated during compilation.
3. Select all the files the application suggests for your first *commit*. The option may be called `Stage all changes`, `Select all` or appear as a checkbox to select everything. Even if there are lots of files, you don't have to choose them one by one. If any personal files you've copied into that folder appear and you don't want to share them, deselect them.
4. Write a message describing the start of your work and create the *commit*. Publishing it to a remote service is a separate, later operation.

Section 2.8 (*Preparación del repositorio Git*) of the [manual] explains which files to keep, which ones not to upload and how to continue with subsequent *commits*. You'll find plenty of information about `git` and GitHub online, so I won't bore you with the details here.

If you already use `make`, section 2.8.3 (*Sincronización mediante el Makefile*) of the [manual] explains how to prepare the files for your next *commit*.

### Reviewing the document with your advisor

The `git` history helps you see what's changed, but doesn't replace comments on the content. You can combine it with the review tools provided by whichever service you use to share the project.

I've found the `todonotes` package useful, and it's available in the template. At the end of `Config/myconfig.tex`, you'll find example commands such as `\todojmg`, `\todorbc` and `\todomig`, which you can adapt to the people reviewing your work. For example, `\todojmg{Revisar esta explicación}` inserts a review note. See section 5.1 (*Comandos personalizados*) of the [manual] for review notes and section 7.3 (*Generación del documento con control de cambios*) for comparing versions. Come back to these tools when you start exchanging versions with your advisor.

## When you need something more

Add these features as you need them. The [manual] contains the full details and examples.

### Project proposal

To work on your project proposal, open `Anteproyecto/anteproyecto.tex`, which shares the details defined in `Config/myconfig.tex` with the main document. If you work online, follow the document-selection instructions for [Overleaf](#compile-the-example-in-overleaf-without-changing-anything).

### Bibliography

For normal use, add your BibTeX references to `Book/biblio/biblio.bib`. The template uses `biblatex` with `biber`. If you work with TeXstudio, apply the configuration described in [Configure TeXstudio](#configure-texstudio).

If you work with several `.bib` files, place them in `Book/biblio/` and declare them in `Book/biblio/bibliofiles.tex`, following the existing examples.

### Figures and diagrams

Store illustrations in `Book/figures/` or `Book/diagrams/`. You can use figures in PDF, PNG and JPEG format directly in the template.

For example: `\includegraphics[width=0.8\textwidth]{mi-figura.png}`

### Acronyms and symbols

You can define your acronyms and symbols in `Book/acronyms/defacronymsgl.tex` and `Book/symbols/defsymbolsgl.tex`, respectively.

Both files already contain examples you can follow to add your own definitions. To generate the lists (indexes), follow the instructions for [the first compilation](#compile-the-example-on-your-computer-without-changing-anything).

### Zen Mode for writing

When you're concentrating on a chapter, you may not want to wade through covers, abstracts and lists every time you open the PDF. To work without those pages, set `\ZenMode` to `true` in `Config/myconfig.tex` and keep compiling `Book/book.tex`. Section 3.4.1 (*Modo zen para redactar*) of the [manual] explains how to choose which chapters to compile. Before submitting your work, set `\ZenMode` back to `false` and review the complete document.

### Doctoral thesis by compendium of publications

For a doctoral thesis by compendium:

- In `Config/myconfig.tex`, set `\myDegree` to the `PHD*-COMPENDIUM` identifier for your university and school.
- Organise the content in `Book/content-compendium.tex`.
- Keep compiling `Book/book.tex`.

Check section 6.2 (*Caso especializado: tesis por compendio de publicaciones*) of the [manual] and your programme's regulations before including publications, especially regarding permission to reuse them.

### Administrative paperwork (UAH only)

You'll find some of the administrative documents grouped by type of work in `PapeleoTFG/` and `PapeleoTFM/`.

You can compile each form's `.tex` file from your editor. If you work online, select it as explained in the [Overleaf](#compile-the-example-in-overleaf-without-changing-anything) section. Consult the PDF guides in those folders and always check the applicable regulations.


## Common problems

### The PDF isn't generated

First try a freshly downloaded copy, without modifications. If that doesn't compile either:

1. Check the first actual error message in the log, not just the last one.
2. Update your LaTeX distribution.
3. Allow any missing packages to be installed.
4. Check that you're compiling `Book/book.tex`.
5. Verify that you've selected `biber`, as explained in [Configure TeXstudio](#configure-texstudio). If you've changed the compiler in TeXstudio, check that `Compilador por defecto` is set to `PdfLaTeX` under `Opciones` > `Configurar TeXstudio` > `Compilar` (on macOS, `TeXstudio` > `Preferencias` > `Compilar`).

### The bibliography doesn't appear

Check that:

- The entries are in `Book/biblio/biblio.bib` or in a file declared in `Book/biblio/bibliofiles.tex`.
- You've cited the references in the text.
- You've followed the instructions in [Configure TeXstudio](#configure-texstudio) to select `biber`.

After checking these points, compile again as explained in [Compile the example without changing anything](#compile-the-example-on-your-computer-without-changing-anything). If the bibliography still doesn't appear and there are no outstanding errors in the log, try `Herramientas` > `Limpiar los archivos auxiliares` in TeXstudio. Review the list of files it will delete, click `Aceptar` and compile again. This cleanup is a troubleshooting measure, not a necessary step in every compilation.

### The example compiled before I modified it

Save all files and compile `Book/book.tex` again. In TeXstudio, open the messages or log panel and find the first error, not the formatting warnings. If the editor lets you jump to its location, open the indicated line and also check the preceding ones: sometimes the problem starts before the point where LaTeX detects it.

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

The links to the download guide and precompiled example ([manual]) are in [Download the student distribution](#download-the-student-distribution). To report a reproducible error or suggest an improvement, you can use the [GitHub issue tracker](https://github.com/JaviMaciasG/PhD-TFM-TFG-LatexTemplate/issues).

If you need help with a compilation error or want to send a suggestion, you can write to me at [javier.maciasguarasa@uah.es](mailto:javier.maciasguarasa@uah.es). If possible, include your operating system, LaTeX distribution, editor, the file you were compiling and the first error message.

## Credits, licence and contributions

I maintain this template so you can spend more time on the content of your work than on formatting. Your corrections, experiences and suggestions have helped me improve it over the years, so don't hesitate to send them my way.

I'm not an expert in LaTeX or template design, and many decisions have come from trying to solve specific problems. As I mentioned in the introduction, I'm well aware that the structure can feel overwhelming at first and that some things could still be made simpler. If you spot any, or have any suggestions, let me know by sending a message to [javier.maciasguarasa@uah.es](mailto:javier.maciasguarasa@uah.es).

The project keeps evolving, and all contributions are welcome, especially to:

- Suggest improvements.
- Fix errors.
- Improve the documentation.
- Update forms and institutional requirements, including those of universities other than UAH.
- Extend compatibility with degrees.
- Simplify the experience for people using the template for the first time.

You can suggest changes through a *pull request* or [report an issue](https://github.com/JaviMaciasG/PhD-TFM-TFG-LatexTemplate/issues) on [GitHub](https://github.com/JaviMaciasG/PhD-TFM-TFG-LatexTemplate).

Consult the licence file included in the distribution before redistributing or modifying the project.

Enjoy!



Javi

[manual]: https://dl.dropboxusercontent.com/scl/fi/wwzbaow0g4cgs7euxvwxy/TFG-GIEC-spanish.pdf?rlkey=2x54yp52avfad67a2fdl3esmv

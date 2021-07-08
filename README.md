# PhD-TFM-TFG-LatexTemplate

This repo contains a generic template for PhD, Msc (TFM) and BsC (TFG) thesis documents mainly designed to be used at the University of Alcala (UAH), so that it is written in Spanish, although the template can generate the documents in English (just setting a variable in the configuration file).

The template uses configuration variables (defined in the `Book/config/myconfig.tex` file) to customize all the document generation process.


## Quick start

### Configure your data

   All the information you can customize is in the `config/myconfig.tex` file. The variable names are all defined in `\newcommand{}{}` statements and all of then start with the `\my' prefix. Most of the names should be self-explanatory.

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


## Disclaimer

There is a lot of work to do in documenting this template, and I'll do my best to do it, but I can't promise you anything. 

If you need help, or you are unable to make this work, or you have any compilation errors, or you have suggestions for improvements, please contact me at [my email address](mailto:javier.maciasguarasa@uah.es).

Enjoy!


Javi

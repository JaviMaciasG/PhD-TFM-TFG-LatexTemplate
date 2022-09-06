# Important note about bibliography handling

## For the impatient

Regarding bibliography files, you just have to edit the `Book/bibliofiles.tex`
file, stating (uncommenting) which files you need for the bibliography. No
changes are needed elseware.

The default bibliography processing backend is now `biber` (from september 2022
onwards). This implies that you have to tell your IDE that you are using `biber`
instead of `bibtex`. This applies to TeXStudio for example.


## More details

As of September 2022, nice work from Gonzalo Corral abandoned the `bibtex`
processing tool in favour of `biber`.

There a number of advantages and disadvantages on using `biber` (see for example
[here](https://tex.stackexchange.com/questions/25701/bibtex-vs-biber-and-biblatex-vs-natbib)
and [here](https://tex.stackexchange.com/questions/53247/why-is-biber-so-slow))
but the fact that it can use UTF-8 as the encoding for the bib files was the
number one reason for accepting this change.

The change in the backend processor caused a major headeache as `biblatex`
requires specifying the bib files in the preamble, and we did not want to make
users deal with it. The solution we found was quick and dirty but it seems to
work: now the users just have to edit the `Book/bibliofiles` file to include the
required biblio files.


## If you still prefer (for whatever reason) `bibtex` as your backend

Gonzalo still kept some support for `bibtex` in the `Makefile` and `Book/book.tex` files. If you want to use the `bibtex` you have to:

- Define the ``\bibliosystem` variable in `Config/preamble.tex` to be equal to `bibtex`
- Convert the `biblio/biblio.bib` file to ISO-8859-1 encoding



# Maintainer manual

This document covers release packaging for template maintainers. It is intended for template maintainers; ordinary users should start with `README.md` and the manual compiled from `Book/book.tex`.

## Generating a release distribution

Set `RELEASE.txt` to the existing release/tag identifier and run:

```console
make distrib
```

The root target first generates `00-README.pdf`, then calls `AdminScripts/go.build-distribution.sh`. It creates `00-PhDTFMTFG-LaTeX-Template-UAH-<release>.tgz` and `.zip` with identical contents whose root directly contains the template files and directories.

The distribution is assembled from tracked template sources so it contains all registered degree and institutional variants, the book, anteproyecto, paperwork, build files, README documentation, and required input assets. It excludes `TODO`, `SUGGESTED_IMPROVEMENTS.md`, `Deprecated/`, slide material, and generated PDFs other than `00-README.pdf`. The command does not commit, tag, push, or modify `RELEASE.txt`.

Before publishing, start from a clean worktree, confirm that `RELEASE.txt` matches the intended Git tag, run the complete PDF regression generation, run `make distrib`, inspect both archives, and verify that they unpack and compile in a clean directory.

#!/usr/bin/env bash
# Keep user documentation limited to configuration fields exposed in myconfig.tex.
set -euo pipefail

repository_root=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/../.." && pwd)
cd "$repository_root"

documentation=(
  README.md README-en.md
  Book/chapters Book/appendix
  PapeleoTFG/guia-papeleo-tfg-eps-uah.tex
  PapeleoTFM/guia-papeleo-tfm-eps-uah.tex
  Documentation/es/DOWNLOAD-GUIDE.md
  Documentation/en/DOWNLOAD-GUIDE.md
  Documentation/es/TYPESETTING-STYLES-GUIDE.md
  Documentation/en/TYPESETTING-STYLES-GUIDE.md
)

defined_variables=$(sed -nE \
  's/^[[:space:]]*\\(newcommand|renewcommand|providecommand)[[:space:]]*\{\\(my[A-Za-z]+)\}.*/\2/p' \
  Config/myconfig.tex | LC_ALL=C sort -u)
documented_variables=$(rg --no-filename -o '\bmy[A-Za-z]+\b' \
  --glob '*.tex' --glob '*.md' "${documentation[@]}" | \
  # File names and the documented myInclude... prefix are not variables.
  sed '/^myconfig$/d; /^myInclude$/d' | LC_ALL=C sort -u)
unknown_variables=$(LC_ALL=C comm -23 \
  <(printf '%s\n' "$documented_variables") \
  <(printf '%s\n' "$defined_variables"))
if [[ -n $unknown_variables ]]; then
  printf 'FAIL: user documentation mentions variables absent from myconfig.tex:\n%s\n' \
    "$unknown_variables" >&2
  exit 1
fi

for guide in PapeleoTFG/guia-papeleo-tfg-eps-uah.tex PapeleoTFM/guia-papeleo-tfm-eps-uah.tex; do
  grep -Fq 'Anexo normativa EPS-UAH' "$guide"
  if grep -Fq '\raggedright' "$guide"; then
    printf 'FAIL: guide prose must be fully justified: %s\n' "$guide" >&2
    exit 1
  fi
  while IFS= read -r variable; do
    if ! grep -Fxq "$variable" <<< "$defined_variables"; then
      printf 'FAIL: %s documents an unavailable field: %s\n' "$guide" "$variable" >&2
      exit 1
    fi
  done < <(rg -o '\\variable\{[A-Za-z]+\}' "$guide" | sed 's/^\\variable{//; s/}$//' | LC_ALL=C sort -u)
done

grep -Fq '\newcommand{\myIncludeSampleLetter}{false}' Config/myconfig.tex
grep -Fq '\ifthenelse{\equal{\myIncludeSampleLetter}{true}}' Book/book.tex
grep -Fq '\includepdf[pages=-]{letters/sampleLetter.pdf}' Book/book.tex

printf 'PASS: user documentation exposes only myconfig.tex variables; guides use justified prose and explicit regulation headings; the optional opening PDF is disabled by default\n'

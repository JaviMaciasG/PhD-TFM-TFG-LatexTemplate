#!/usr/bin/env bash
# Check combined ETSIT-UPM TFG/TFM summaries without changing live sources.
set -euo pipefail
test_directory=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)
repository_root=$(cd -- "$test_directory/../.." && pwd)
fixture=$(mktemp -d)
trap 'rm -rf -- "$fixture"' EXIT
mkdir -p "$fixture/base"
while IFS= read -r -d '' file; do
  case "$file" in Book/book*.pdf) continue ;; esac
  mkdir -p "$fixture/base/$(dirname "$file")"
  cp -p "$repository_root/$file" "$fixture/base/$file"
done < <(git -C "$repository_root" ls-files -z -- Book Config)
# The new wrapper may not be committed when this regression is first run.
cp -p "$repository_root/Book/abstract/summary-pages.tex" "$fixture/base/Book/abstract/summary-pages.tex"

build_case() {
  local degree=$1 language=$2 style=$3 expected=$4 extra=${5:-}
  local name="$degree-$language-$style" tree
  if [[ -n $extra ]]; then name="${name}-${extra%.tex}"; fi
  tree="$fixture/$name"
  cp -a "$fixture/base" "$tree"
  if [[ -n $extra ]]; then
    cp -p "$test_directory/fixtures/$extra" "$tree/Book/abstract/abstract.tex"
  fi
  sed -Ei \
    -e 's!(\\newcommand\{\\myDegree\}\{)[^}]*\}!\1'"$degree"'}!' \
    -e 's!(\\newcommand\{\\myLanguage\}\{)[^}]*\}!\1'"$language"'}!' \
    -e 's!(\\newcommand\{\\myTypesettingStyle\}\{)[^}]*\}!\1'"$style"'}!' \
    "$tree/Config/myconfig.tex"
  if ! (cd "$tree/Book" && latexmk -pdf -interaction=nonstopmode -halt-on-error \
    -r ../Config/latexmkrc book.tex) >"$fixture/$name.log" 2>&1; then
    tail -n 80 "$fixture/$name.log" >&2
    exit 1
  fi
  local spanish_page english_page
  spanish_page=$(pdftotext -layout "$tree/Book/book.pdf" - | awk 'BEGIN {RS="\f"} /Palabras clave:/ {print NR; exit}')
  english_page=$(pdftotext -layout "$tree/Book/book.pdf" - | awk 'BEGIN {RS="\f"} /Keywords:/ {print NR; exit}')
  [[ -n $spanish_page && -n $english_page ]]
  grep -Fq '\contentsline {chapter}{Resumen}' "$tree/Book/book.toc"
  grep -Fq '\contentsline {chapter}{Abstract}' "$tree/Book/book.toc"
  if [[ $expected == together ]]; then
    [[ $spanish_page == "$english_page" ]]
  else
    [[ $spanish_page != "$english_page" ]]
  fi
  if [[ -n ${ETSIT_SUMMARY_TEST_OUTPUT_DIR:-} ]]; then
    mkdir -p "$ETSIT_SUMMARY_TEST_OUTPUT_DIR"
    cp -p "$tree/Book/book.pdf" "$ETSIT_SUMMARY_TEST_OUTPUT_DIR/$name.pdf"
  fi
  echo "PASS: $name ($expected; PDF pages $spanish_page and $english_page)."
}

build_case GISTS-ETSIT-UPM spanish standard together
build_case MUISE-ETSIT-UPM english framed together
build_case MUIT-ETSIT-UPM spanish modern together near-limit-summary.tex
build_case PHD-ETSIT-UPM spanish standard separate
build_case GIEC spanish standard separate

# An overlong summary must fail rather than shrinking below 9 pt.
overflow="$fixture/overflow"
cp -a "$fixture/base" "$overflow"
sed -Ei 's!(\\newcommand\{\\myDegree\}\{)[^}]*\}!\1GISTS-ETSIT-UPM}!' "$overflow/Config/myconfig.tex"
cp -p "$test_directory/fixtures/overlong-summary.tex" "$overflow/Book/abstract/abstract.tex"
if (cd "$overflow/Book" && latexmk -pdf -interaction=nonstopmode -halt-on-error \
  -r ../Config/latexmkrc book.tex) >"$fixture/overflow.log" 2>&1; then
  echo 'FAIL: overlong ETSIT-UPM summaries compiled.' >&2
  exit 1
fi
grep -q 'Spanish and English summaries do not fit' "$overflow/Book/book.log"
echo 'PASS: overlong ETSIT-UPM summaries stop with a readable-size error.'

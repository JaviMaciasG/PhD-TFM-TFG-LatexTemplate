#!/usr/bin/env bash
# Exercise the real isolated helper with a fixture-only latexmk substitute.
set -euo pipefail
if [[ ${0##*/} == git ]]; then exit 1; fi
if [[ ${0##*/} == latexmk ]]; then
  for argument in "$@"; do [[ $argument != -C ]] || exit 0; done
  config=../Config/myconfig.tex
  count=$(grep -Ec '^\\newcommand\{\\myInstitutionalPageFontMode\}\{[^}]*\}' "$config")
  [[ $count == 1 ]] || exit 1
  mode=$(sed -n 's/^\\newcommand{\\myInstitutionalPageFontMode}{\([^}]*\)}$/\1/p' "$config")
  [[ $mode == "$EXPECTED_FONT_MODE" ]] || exit 1
  if [[ ${CHECK_SOURCE_SELECTION:-false} == true ]]; then
    for asset in publications/paper1.pdf cover/artwork.pdf chapters/example.tex appendix/example.c; do
      [[ -f $asset ]] || { echo "FAIL: missing asset $asset" >&2; exit 1; }
    done
    for excluded in book-compressed.pdf book.toc book.acr chapters/example.tex~ all-pdfs/generated.pdf chapters/orig/backup.tex; do
      [[ ! -e $excluded ]] || { echo "FAIL: copied generated/backup file $excluded" >&2; exit 1; }
    done
  fi
  printf 'Fixture PDF with font mode %s\n' "$mode" > book.pdf
  printf 'Fixture compilation with font mode %s\n' "$mode" > book.log
  exit 0
fi
test_directory=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)
repository_root=$(cd -- "$test_directory/../.." && pwd)
fixture=$(mktemp -d)
trap 'rm -rf -- "$fixture"' EXIT
mkdir -p "$fixture/source/Config/typesetting/styles" "$fixture/source/Book" "$fixture/bin"
cp "$repository_root/Config/myconfig.tex" "$fixture/source/Config/"
cp "$repository_root/Config/typesetting/typesetting.tex" "$fixture/source/Config/typesetting/"
cp "$repository_root/Config/typesetting/styles/"*.tex "$fixture/source/Config/typesetting/styles/"
cp "$repository_root/Book/book.tex" "$fixture/source/Book/"
cp "$0" "$fixture/bin/latexmk"
chmod +x "$fixture/bin/latexmk"
git -C "$fixture/source" init -q
git -C "$fixture/source" add Config Book
export PATH="$fixture/bin:$PATH"
helper="$repository_root/AdminScripts/build-book-typesetting-prototypes.sh"
base="$fixture/base.tex"
cp "$fixture/source/Config/myconfig.tex" "$base"
if grep -q '^\\newcommand{\\myInstitutionalPageFontMode}' "$base"; then
  echo 'FAIL: normal configuration still exposes the advanced font policy.' >&2
  exit 1
fi
checks=0
run_case() {
  local name=$1 requested=$2 before
  before=$(sha256sum "$fixture/source/Config/myconfig.tex")
  EXPECTED_FONT_MODE=$requested bash "$helper" --root "$fixture/source" --styles framed \
    --font-mode "$requested" --output-dir "$fixture/$name" >/dev/null
  [[ $before == "$(sha256sum "$fixture/source/Config/myconfig.tex")" ]] || exit 1
  [[ -z $(find "$fixture/source/Book" -name '*.pdf' -print -quit) ]] || exit 1
  [[ $(find "$fixture/$name" -name '*.pdf' | wc -l) == 1 ]] || exit 1
  checks=$((checks + 1))
}
run_case absent-institutional institutional
run_case absent-document document
cp "$base" "$fixture/source/Config/myconfig.tex"
printf '\n\\newcommand{\\myInstitutionalPageFontMode}{document}\n' >> "$fixture/source/Config/myconfig.tex"
run_case legacy-document-to-institutional institutional
cp "$base" "$fixture/source/Config/myconfig.tex"
printf '\n\\newcommand{\\myInstitutionalPageFontMode}{institutional}\n' >> "$fixture/source/Config/myconfig.tex"
run_case legacy-institutional-to-document document
printf '\\newcommand{\\myInstitutionalPageFontMode}{document}\n' >> "$fixture/source/Config/myconfig.tex"
before=$(sha256sum "$fixture/source/Config/myconfig.tex")
if EXPECTED_FONT_MODE=document bash "$helper" --root "$fixture/source" --styles framed \
    --font-mode document --output-dir "$fixture/duplicate" >"$fixture/duplicate.log" 2>&1; then
  echo 'FAIL: duplicate definitions were accepted.' >&2
  exit 1
fi
grep -q 'expected exactly one active' "$fixture/duplicate.log"
[[ $before == "$(sha256sum "$fixture/source/Config/myconfig.tex")" ]] || exit 1
checks=$((checks + 1))
# An extracted distribution has no Git metadata and may contain old outputs.
cp "$base" "$fixture/source/Config/myconfig.tex"
mv "$fixture/source/.git" "$fixture/git-metadata"
mkdir -p "$fixture/source/Book/"{publications,cover,chapters/orig,appendix,all-pdfs}
for file in publications/paper1.pdf cover/artwork.pdf chapters/example.tex appendix/example.c \
    book-compressed.pdf book.toc book.acr chapters/example.tex~ all-pdfs/generated.pdf chapters/orig/backup.tex; do
  printf 'Fixture source or excluded output\n' >"$fixture/source/Book/$file"
done
before=$(sha256sum "$fixture/source/Config/myconfig.tex")
CHECK_SOURCE_SELECTION=true EXPECTED_FONT_MODE=document bash "$helper" --root "$fixture/source" \
  --styles framed --font-mode document --output-dir "$fixture/distribution" >"$fixture/distribution.log" 2>&1
grep -q 'selecting distribution sources' "$fixture/distribution.log"
[[ -f $fixture/distribution/book-framed-document-fonts.pdf ]]
[[ $before == "$(sha256sum "$fixture/source/Config/myconfig.tex")" ]]
checks=$((checks + 1))
# A failing Git command must also fall back, even if metadata exists.
mv "$fixture/git-metadata" "$fixture/source/.git"
cp "$0" "$fixture/bin/git"
chmod +x "$fixture/bin/git"
CHECK_SOURCE_SELECTION=true EXPECTED_FONT_MODE=institutional bash "$helper" --root "$fixture/source" \
  --styles framed --font-mode institutional --output-dir "$fixture/git-failure" >"$fixture/git-failure.log" 2>&1
grep -q 'selecting distribution sources' "$fixture/git-failure.log"
[[ -f $fixture/git-failure/book-framed.pdf ]]
checks=$((checks + 1))
printf 'PASS: %s optional/legacy font-policy cases; working configuration and Book unchanged.\n' "$checks"

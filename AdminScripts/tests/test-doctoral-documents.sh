#!/usr/bin/env bash
# Compile full and manually prepared minimal doctoral books without Git or Make
# in the staged student trees. latexmk retains the standard Biber pipeline.
set -euo pipefail
test_directory=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)
repository_root=$(cd -- "$test_directory/../.." && pwd)
fixture=$(mktemp -d)
trap 'rm -rf -- "$fixture"' EXIT
mkdir -p "$fixture/base"
before=$(sha256sum "$repository_root/Config/myconfig.tex")
while IFS= read -r file; do
  case "$file" in
    *.aux|*.log|*.fls|*.bbl|*.bcf|*.blg|*.fdb_latexmk|*.run.xml|*.synctex.gz|Book/book*.pdf) continue ;;
  esac
  mkdir -p "$fixture/base/$(dirname "$file")"
  cp -p "$repository_root/$file" "$fixture/base/$file"
done < <(git -C "$repository_root" ls-files -- Book Config)
cases=(
  'PHDUAH|spanish|minimal'
  'PHDUAH-COMPENDIUM|english|minimal'
  'PHD-ETSIT-UPM|english|minimal'
  'PHD-ETSIT-UPM-COMPENDIUM|spanish|minimal'
  'PHDUAH-COMPENDIUM|english|full'
  'PHD-ETSIT-UPM-COMPENDIUM|spanish|full'
)
for spec in "${cases[@]}"; do
  IFS='|' read -r degree language mode <<<"$spec"
  name="$degree-$language-$mode"
  tree="$fixture/$name"
  cp -a "$fixture/base" "$tree"
  structure=$(sh "$tree/Config/query-degree-registry.sh" document-structure "$degree" "$tree/Config/degrees.tex")
  config="$tree/Config/myconfig.tex"
  sed -Ei \
    -e 's!(\\newcommand\{\\myDegree\}\{)[^}]*\}!\1'"$degree"'}!' \
    -e 's!(\\newcommand\{\\myLanguage\}\{)[^}]*\}!\1'"$language"'}!' "$config"
  if [[ $mode == minimal ]]; then
    if [[ $structure == standard ]]; then
      cp "$tree/Book/chapters/bare/"*.tex "$tree/Book/chapters/"
      cp "$tree/Book/appendix/bare/"*.tex "$tree/Book/appendix/"
      cp "$tree/Book/chapters/bare/content-standard.tex" "$tree/Book/content-standard.tex"
    else
      cp "$tree/Book/chapters/compendium/bare/"*.tex "$tree/Book/chapters/compendium/"
      cp "$tree/Book/chapters/compendium/bare/content-compendium.tex" "$tree/Book/content-compendium.tex"
    fi
    sed -Ei 's!(\\newcommand\{\\myInclude(SampleLetter|ListOfSymbols|ListOfCode|ListOfAlgorithms|ListOfVideos)\}\{)[^}]*\}!\1false}!g' "$config"
  fi
  if ! (cd "$tree/Book" && latexmk -pdf -interaction=nonstopmode -halt-on-error \
    -r ../Config/latexmkrc book.tex) >"$fixture/$name-build.log" 2>&1; then
    tail -n 80 "$fixture/$name-build.log" >&2
    exit 1
  fi
  [[ -s $tree/Book/book.pdf && -s $tree/Book/book.bbl ]]
  grep -q "content-$structure.tex" "$tree/Book/book.fls"
  if [[ $structure == compendium ]]; then
    [[ $(grep -c '\\contentsline {part}' "$tree/Book/book.toc") == 2 ]]
  else
    ! grep -q '\\contentsline {part}' "$tree/Book/book.toc"
  fi
  ! grep -q 'Ignoring legacy myDocumentStructure' "$tree/Book/book.log"
  if [[ -n ${DOCTORAL_TEST_OUTPUT_DIR:-} ]]; then
    mkdir -p "$DOCTORAL_TEST_OUTPUT_DIR"
    cp "$tree/Book/book.pdf" "$DOCTORAL_TEST_OUTPUT_DIR/$name.pdf"
  fi
  echo "PASS: $name (no Git metadata or Make invocation; Biber processed)."
done
[[ $(sha256sum "$repository_root/Config/myconfig.tex") == "$before" ]]

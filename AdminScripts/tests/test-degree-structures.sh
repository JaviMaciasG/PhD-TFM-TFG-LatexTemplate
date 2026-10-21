#!/usr/bin/env bash
# Registry defaults, inherited variants, legacy warnings and safe preparation.
set -euo pipefail
test_directory=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)
repository_root=$(cd -- "$test_directory/../.." && pwd)
query="$repository_root/Config/query-degree-registry.sh"
fixture=$(mktemp -d)
trap 'rm -rf -- "$fixture"' EXIT
cp -a "$repository_root/Config" "$fixture/Config"
mkdir -p "$fixture/Book"
cp -a "$repository_root/Book/biblio" "$fixture/Book/"
cp "$repository_root/Book/Makefile" "$repository_root/Book/content-"*.tex "$fixture/Book/"
cp -a "$repository_root/Book/chapters" "$repository_root/Book/appendix" "$fixture/Book/"
before=$(sha256sum "$repository_root/Config/myconfig.tex")
for base in PHDUAH PHD-ETSIT-UPM; do
  variant="$base-COMPENDIUM"
  [[ $(sh "$query" structure-variant "$base" compendium) == "$variant" ]]
  [[ $(sh "$query" structure-variant "$variant" standard) == "$base" ]]
  for property in work-type institution layout-profile base-degree; do
    [[ $(sh "$query" "$property" "$base") == "$(sh "$query" "$property" "$variant")" ]]
  done
done
[[ $(sh "$query" document-structure GEINTRARR) == standard ]]
! sh "$query" structure-variant GIEC compendium >/dev/null
if bash "$repository_root/AdminScripts/build-book-typesetting-prototypes.sh" \
  --degree GIEC --structure compendium --styles standard --output-dir "$fixture/rejected-output" >"$fixture/builder.log" 2>&1; then
  echo 'FAIL: non-PhD compendium builder request succeeded.' >&2
  exit 1
fi
[[ ! -e $fixture/rejected-output ]]
grep -q 'no compendium variant' "$fixture/builder.log"
build() {
  local degree=$1 expected=$2 extra=${3:-} job=$4
  (cd "$fixture/Book" && pdflatex -draftmode -interaction=nonstopmode -halt-on-error \
    -jobname="$job" "\def\TestDegree{$degree}\def\ExpectedStructure{$expected}$extra\input{$test_directory/fixtures/degree-structures.tex}") >"$fixture/$job.log" 2>&1
}
for degree in GIEC PHDUAH PHDUAH-COMPENDIUM PHD-ETSIT-UPM PHD-ETSIT-UPM-COMPENDIUM GEINTRARR; do
  expected=$(sh "$query" document-structure "$degree")
  build "$degree" "$expected" '' "$degree" || { tail -n 60 "$fixture/$degree.log"; exit 1; }
  grep -q 'PASS: REGISTRY-STRUCTURE' "$fixture/$degree.log"
done
build PHDUAH standard '\def\TestLegacyStructure{compendium}' legacy
build PHDUAH standard '\def\TestStandalone{1}' standalone
grep -q 'Ignoring legacy myDocumentStructure' "$fixture/legacy.log"
build PHDUAH-COMPENDIUM compendium '\def\TestLegacyStructure{standard}' legacy-variant
grep -q 'Ignoring legacy myDocumentStructure' "$fixture/legacy-variant.log"
invalid=(
  '\DeclareDegreeVariant{BAD}{GIEC}{document-structure=compendium}'
  '\DeclareDegreeVariant{BAD}{PHDUAH}{document-structure=unknown}'
  '\DeclareDegreeVariant{BAD}{UNKNOWN}{document-structure=compendium}'
  '\DeclareDegreeVariant{PHDUAH}{PHDUAH}{document-structure=compendium}'
)
for i in "${!invalid[@]}"; do
  ! build PHDUAH standard "\def\TestDeclaration{${invalid[$i]}}" "invalid-$i"
  grep -q '^!' "$fixture/invalid-$i.log"
done
# Non-PhD compendium targets must not create backups or edit any sources.
sed -Ei 's!(\\newcommand\{\\myDegree\}\{)[^}]*\}!\1GIEC}!' "$fixture/Config/myconfig.tex"
snapshot=$(find "$fixture/Book" "$fixture/Config" -type f -exec sha256sum {} + | sort)
for target in bare-compendium orig-compendium; do
  ! make -s -C "$fixture/Book" "$target" >"$fixture/rejected.log" 2>&1
  grep -q 'select a supported PhD degree' "$fixture/rejected.log"
  [[ $(find "$fixture/Book" "$fixture/Config" -type f -exec sha256sum {} + | sort) == "$snapshot" ]]
done
for base in PHDUAH PHD-ETSIT-UPM; do
  sed -Ei 's!(\\newcommand\{\\myDegree\}\{)[^}]*\}!\1'"$base"'}!' "$fixture/Config/myconfig.tex"
  make -s -C "$fixture/Book" bare-compendium >"$fixture/preparation.log" 2>&1
  grep -Fq "\newcommand{\myDegree}{$base-COMPENDIUM}" "$fixture/Config/myconfig.tex"
  cmp "$fixture/Book/content-compendium.tex" "$fixture/Book/chapters/compendium/bare/content-compendium.tex"
  printf 'n\nn\n' | make -s -C "$fixture/Book" bare >"$fixture/preparation.log" 2>&1
  cmp "$fixture/Book/content-compendium.tex" "$fixture/Book/chapters/compendium/bare/content-compendium.tex"
  make -s -C "$fixture/Book" orig >"$fixture/preparation.log" 2>&1
  cmp "$fixture/Book/content-compendium.tex" "$fixture/Book/chapters/compendium/orig/content-compendium.tex"
  make -s -C "$fixture/Book" bare-standard >"$fixture/preparation.log" 2>&1
  grep -Fq "\newcommand{\myDegree}{$base}" "$fixture/Config/myconfig.tex"
  cmp "$fixture/Book/content-standard.tex" "$fixture/Book/chapters/bare/content-standard.tex"
  make -s -C "$fixture/Book" orig >"$fixture/preparation.log" 2>&1
  cmp "$fixture/Book/content-standard.tex" "$fixture/Book/chapters/orig/content-standard.tex"
done
[[ $(sha256sum "$repository_root/Config/myconfig.tex") == "$before" ]]
echo 'PASS: registry structures, inherited metadata, legacy migration and safe minimal/original preparation.'

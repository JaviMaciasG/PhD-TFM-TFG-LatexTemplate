#!/usr/bin/env bash
# Registry coverage and one real cover/backpage build for ETSII-UPM TFGs.
set -euo pipefail
test_directory=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)
repository_root=$(cd -- "$test_directory/../.." && pwd)
query="$repository_root/Config/query-degree-registry.sh"
for degree in GITI-ETSII-UPM GIQ-ETSII-UPM GIO-ETSII-UPM; do
  [[ $(sh "$query" institution "$degree") == UPM ]]
  [[ $(sh "$query" work-type "$degree") == TFG ]]
  [[ $(sh "$query" layout-profile "$degree") == upm-etsii-tfg ]]
done
temporary_directory=$(mktemp -d)
trap 'rm -rf -- "$temporary_directory"' EXIT
for pass in 1 2; do
  if ! (cd "$repository_root/Book" && pdflatex -interaction=nonstopmode -halt-on-error -file-line-error \
    -output-directory="$temporary_directory" -jobname=etsii-upm-tfg \
    "\\input{../AdminScripts/tests/fixtures/etsii-upm-tfg-cover.tex}") >"$temporary_directory/build.log" 2>&1; then
    tail -n 70 "$temporary_directory/build.log" >&2
    exit 1
  fi
done
pdf="$temporary_directory/etsii-upm-tfg.pdf"
[[ $(pdfinfo "$pdf" | awk '/^Pages:/ {print $2}') == 4 ]]
pdftotext -raw "$pdf" "$temporary_directory/cover.txt"
normalized_text=$(tr '[:space:]' ' ' < "$temporary_directory/cover.txt" | tr -s ' ')
[[ $normalized_text == *'GRADUADA EN INGENIERÍA EN TECNOLOGÍAS INDUSTRIALES'* ]]
grep -q 'Autora de Ejemplo' "$temporary_directory/cover.txt"
! grep -q 'AUTORA:' "$temporary_directory/cover.txt"
grep -q 'DIRECTORES DEL TRABAJO FIN DE GRADO' "$temporary_directory/cover.txt"
! grep -q 'CODIRECTORA DEL TRABAJO FIN DE GRADO' "$temporary_directory/cover.txt"
grep -q 'JUNIO 2027' "$temporary_directory/cover.txt"
grep -q 'imagen-contraportada-tfg-etsii-upm.png' "$temporary_directory/etsii-upm-tfg.log"
[[ -z $(pdftotext -f 2 -l 2 "$pdf" - | tr -d '[:space:]') ]]
[[ -z $(pdftotext -f 4 -l 4 "$pdf" - | tr -d '[:space:]') ]]
echo 'PASS: three ETSII-UPM degrees and one four-page cover/backpage sample.'

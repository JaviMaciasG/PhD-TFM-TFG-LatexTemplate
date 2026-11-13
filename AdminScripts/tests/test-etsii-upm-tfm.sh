#!/usr/bin/env bash
# Registry coverage and focused cover/backpage builds for ETSII-UPM TFMs.
set -euo pipefail
test_directory=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)
repository_root=$(cd -- "$test_directory/../.." && pwd)
query="$repository_root/Config/query-degree-registry.sh"
temporary_directory=$(mktemp -d)
trap 'rm -rf -- "$temporary_directory"' EXIT
for spec in 'MUII-ETSII-UPM|Codirectora de Ejemplo|Directoras del trabajo fin de máster' 'MUIQ-ETSII-UPM||Directora del trabajo fin de máster'; do
  IFS='|' read -r degree cotutor heading <<<"$spec"
  [[ $(sh "$query" institution "$degree") == UPM ]]
  [[ $(sh "$query" work-type "$degree") == TFM ]]
  [[ $(sh "$query" layout-profile "$degree") == upm-etsii-tfm ]]
  job="etsii-upm-tfm-$degree"
  for pass in 1 2; do
    if ! (cd "$repository_root/Book" && pdflatex -interaction=nonstopmode -halt-on-error -file-line-error \
      -output-directory="$temporary_directory" -jobname="$job" \
      "\def\TestDegree{$degree}\def\TestCoTutor{$cotutor}\input{../AdminScripts/tests/fixtures/etsii-upm-tfm-cover.tex}") >"$temporary_directory/build.log" 2>&1; then
      tail -n 70 "$temporary_directory/build.log" >&2
      exit 1
    fi
  done
  pdf="$temporary_directory/$job.pdf"
  [[ $(pdfinfo "$pdf" | awk '/^Pages:/ {print $2}') == 4 ]]
  if [[ -n ${ETSII_TFM_TEST_OUTPUT_DIR:-} ]]; then
    mkdir -p "$ETSII_TFM_TEST_OUTPUT_DIR"
    cp "$pdf" "$ETSII_TFM_TEST_OUTPUT_DIR/"
  fi
  pdftotext -raw "$pdf" "$temporary_directory/cover.txt"
  normalized_text=$(tr '[:space:]' ' ' < "$temporary_directory/cover.txt" | tr -s ' ')
  grep -qi "$heading" "$temporary_directory/cover.txt"
  grep -q 'Autora de Ejemplo' "$temporary_directory/cover.txt"
  grep -q 'JUNIO 2027' "$temporary_directory/cover.txt"
  grep -q 'imagen-portada-tfm-etsii-upm.png' "$temporary_directory/$job.log"
  grep -q 'imagen-contraportada-tfg-etsii-upm.png' "$temporary_directory/$job.log"
  ! grep -q 'TRABAJO FIN DE GRADO' "$temporary_directory/cover.txt"
  if [[ $degree == MUII-ETSII-UPM ]]; then
    [[ $normalized_text == *'MÁSTER EN INGENIERÍA INDUSTRIAL'* ]]
    grep -q 'Codirectora de Ejemplo' "$temporary_directory/cover.txt"
  else
    [[ $normalized_text == *'MÁSTER EN INGENIERÍA QUÍMICA'* ]]
    ! grep -q 'Codirectora de Ejemplo' "$temporary_directory/cover.txt"
  fi
  [[ -z $(pdftotext -f 2 -l 2 "$pdf" - | tr -d '[:space:]') ]]
  [[ -z $(pdftotext -f 4 -l 4 "$pdf" - | tr -d '[:space:]') ]]
  echo "PASS: $degree cover and back page."
done

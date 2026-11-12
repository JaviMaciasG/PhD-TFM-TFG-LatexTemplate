#!/usr/bin/env bash
# Check the three EIIA-UCLM TFG covers and their shared data page.
set -euo pipefail

test_directory=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)
repository_root=$(cd -- "$test_directory/../.." && pwd)
temporary_directory=$(mktemp -d)
trap 'rm -rf -- "$temporary_directory"' EXIT

compile_cover() {
  local degree=$1 code=$2 language=$3 style=$4 record=$5 date=$6
  local job="${degree}-${language}-${style}"
  local website=https://example.org/tfg
  [[ $language != english ]] || website=
  local command="\\def\\CoverTestDegree{$degree}\\def\\CoverTestLanguage{$language}\\def\\CoverTestStyle{$style}\\def\\CoverTestRecord{$record}\\def\\CoverTestDate{$date}\\def\\CoverTestWebsite{$website}\\input{../AdminScripts/tests/fixtures/eiia-uclm-cover.tex}"
  local pass
  for pass in 1 2; do
    if ! (cd "$repository_root/Book" && pdflatex -interaction=nonstopmode -halt-on-error -file-line-error -output-directory="$temporary_directory" -jobname="$job" "$command") >"$temporary_directory/$job-output.log" 2>&1; then
      tail -n 60 "$temporary_directory/$job-output.log" >&2
      return 1
    fi
  done
  local pdf="$temporary_directory/$job.pdf"
  [[ $(pdfinfo "$pdf" | awk '/^Pages:/ {print $2}') == 4 ]]
  [[ -z $(pdftotext -f 2 -l 2 "$pdf" - | tr -d '[:space:]') ]]
  pdftotext -layout "$pdf" "$temporary_directory/$job.txt"
  grep -q 'TRABAJO FIN DE GRADO' "$temporary_directory/$job.txt"
  grep -q 'Licencia Creative Commons Atribución 4.0 Internacional' "$temporary_directory/$job.txt"
  grep -q 'Campus Universitario de la Real Fábrica de Armas' "$temporary_directory/$job.txt"
  if [[ -n $website ]]; then
    grep -q 'Sitio web:' "$temporary_directory/$job.txt"
  else
    ! grep -q 'Sitio web:' "$temporary_directory/$job.txt"
  fi
  if [[ -n $record ]]; then
    grep -q "Nº 27-$code-$record" "$temporary_directory/$job.txt"
  else
    ! grep -q 'Nº 27-' "$temporary_directory/$job.txt"
  fi
  if [[ $date == '24 de junio de 2027' ]]; then
    grep -q 'JUNIO DE 2027' "$temporary_directory/$job.txt"
    ! grep -q 'Cannot derive a month' "$temporary_directory/$job-output.log"
  else
    grep -q 'NO SE HA PODIDO DEDUCIR EL MES' "$temporary_directory/$job.txt"
    grep -q 'Cannot derive a month' "$temporary_directory/$job-output.log"
  fi
}

compile_cover GIE-EIIA-UCLM A spanish standard 123456 '24 de junio de 2027'
compile_cover GIEIA-EIIA-UCLM B spanish standard 123456 '24 de junio de 2027'
compile_cover GIA-EIIA-UCLM D spanish standard 123456 '24 de junio de 2027'
compile_cover GIE-EIIA-UCLM A english editorial '' 'June 24, 2027'
printf 'PASS: EIIA-UCLM codes A/B/D, four-page sequence, optional fields and date fallback.\n'

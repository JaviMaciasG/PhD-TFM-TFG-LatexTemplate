#!/usr/bin/env bash
# Check that ETSII-US TFG and MISCDG covers use their respective date sources.
set -euo pipefail
test_directory=$(cd -- "$(dirname -- "$0")" && pwd)
repository_root=$(cd -- "$test_directory/../.." && pwd)
fixture=$(mktemp -d)
trap 'rm -rf -- "$fixture"' EXIT
mkdir -p "$fixture/Book"
cp -a "$repository_root/Config" "$fixture/"
cp -a "$repository_root/Book/"{cover,logos,biblio} "$fixture/Book/"
cp "$test_directory/fixtures/etsii-us-cover-dates.tex" "$fixture/Book/"
cd "$fixture/Book"

build() {
  local job=$1 language=$2 date=$3 degree=$4
  for pass in 1 2; do
    pdflatex -interaction=nonstopmode -halt-on-error -jobname="$job" \
      "\def\TestDegree{$degree}\def\TestLanguage{$language}\def\TestDepositDate{$date}\input{etsii-us-cover-dates.tex}" \
      >"$job.build.log" 2>&1 || { tail -n 70 "$job.build.log" >&2; return 1; }
  done
  pdftotext -layout "$job.pdf" "$job.txt"
  if [[ -n ${ETSII_US_TEST_OUTPUT_DIR:-} ]]; then
    cp "$job.pdf" "$ETSII_US_TEST_OUTPUT_DIR/"
  fi
}

build deposit-es spanish '15 de diciembre de 2027' GIC-ETSII-US
grep -Fq 'Sevilla, diciembre de 2027' deposit-es.txt
build deposit-en english '15 de diciembre de 2027' GIC-ETSII-US
grep -Fq 'Seville, December 2027' deposit-en.txt

build deposit-empty spanish '' GIC-ETSII-US
build deposit-invalid english '15 de diciembre de 2027 (provisional)' GIC-ETSII-US
if grep -Eq 'Sevilla,|Seville,' deposit-{empty,invalid}.txt; then
  echo 'FAIL: the date line must be omitted with a missing or invalid deposit date.' >&2
  exit 1
fi
if grep -q 'Package template-cover-date Warning' deposit-empty.log; then
  echo 'FAIL: a blank date should not warn.' >&2
  exit 1
fi
grep -q 'Package template-cover-date Warning' deposit-invalid.log

build miscdg-es spanish '15 de diciembre de 2027' MISCDG-ETSII-US
grep -Fq 'Convocatoria de Enero, curso 2027/2028' miscdg-es.txt
build miscdg-en english '15 de diciembre de 2027' MISCDG-ETSII-US
grep -Fq 'January examination session, academic year 2027/2028' miscdg-en.txt
echo 'PASS: ETSII-US deposit dates in both languages, blank and invalid inputs, and MISCDG defense dates.'

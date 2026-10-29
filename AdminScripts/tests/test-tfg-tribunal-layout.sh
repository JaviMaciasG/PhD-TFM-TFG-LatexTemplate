#!/usr/bin/env bash
# Build Annex IX independently of unrelated paperwork sources.
set -euo pipefail
repository_root=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/../.." && pwd)
fixture=$(mktemp -d)
trap 'rm -rf -- "$fixture"' EXIT
trap 'printf "FAIL: line %s (%s): %s\n" "$LINENO" "${spec:-setup}" "$BASH_COMMAND" >&2' ERR
before=$(sha256sum "$repository_root/Config/myconfig.tex")
mkdir -p "$fixture/Book" "$fixture/PapeleoTFG"
cp -a "$repository_root/Config" "$fixture/"
cp -a "$repository_root/Book/biblio" "$fixture/Book/"
cp "$repository_root/PapeleoTFG/Makefile" "$repository_root/PapeleoTFG/"TFG-AnexoIX-*.tex "$fixture/PapeleoTFG/"
document=TFG-AnexoIX-ActaYRubricaDefensa-EPS-UAH
for spec in 'male|female|present|spanish' 'female|male|present|spanish' 'male|female|absent|spanish' 'female|male|absent|english'; do
  IFS='|' read -r president_gender secretary_gender presence language <<< "$spec"
  cotutor='Cotutora de prueba'
  secretary='Miembro tercero de prueba'
  if [[ $presence == absent ]]; then cotutor=''; secretary=''; fi
  sed \
    -e 's/\\newcommand{\\myDegree}{[^}]*}/\\newcommand{\\myDegree}{GIEC}/' \
    -e "s/\\\\newcommand{\\\\myLanguage}{[^}]*}/\\\\newcommand{\\\\myLanguage}{$language}/" \
    -e "s/\\\\newcommand{\\\\myTribunalPresidentGender}{[^}]*}/\\\\newcommand{\\\\myTribunalPresidentGender}{$president_gender}/" \
    -e "s/\\\\newcommand{\\\\myTribunalSecondSpokespersonGender}{[^}]*}/\\\\newcommand{\\\\myTribunalSecondSpokespersonGender}{$secretary_gender}/" \
    -e "s/\\\\newcommand{\\\\myTribunalSecondSpokesperson}{[^}]*}/\\\\newcommand{\\\\myTribunalSecondSpokesperson}{$secretary}/" \
    -e "s/\\\\newcommand{\\\\myCoTutorFullName}{[^}]*}/\\\\newcommand{\\\\myCoTutorFullName}{$cotutor}/" \
    -e 's/\\newcommand{\\myAcademicTutorDepartment}{[^}]*}/\\newcommand{\\myAcademicTutorDepartment}{TutorDept}/' \
    -e 's/\\newcommand{\\myAcademicTutorGrade}{[^}]*}/\\newcommand{\\myAcademicTutorGrade}{8}/' \
    -e 's/\\newcommand{\\myTribunalGrade}{[^}]*}/\\newcommand{\\myTribunalGrade}{6}/' \
    "$repository_root/Config/myconfig.tex" > "$fixture/Config/myconfig.tex"
  make -s -C "$fixture/PapeleoTFG" "$document.pdf" > "$fixture/build.log" 2>&1 || { tail -n 60 "$fixture/build.log" >&2; exit 1; }
  pdf="$fixture/PapeleoTFG/$document.pdf"
  [[ $(pdfinfo "$pdf" | awk '/^Pages:/ {print $2}') == 3 ]]
  if grep -q 'Overfull' "${pdf%.pdf}.log"; then echo 'FAIL: overflowing Annex IX'; exit 1; fi
  pdftotext -layout "$pdf" "$fixture/document.txt"
  for expected in '7.4' 'notable' 'TutorDept' 'Los pesos de la calificación son' 'calificación honorífica' '25/06/2024' 'en cuyo caso se diseñará una específica' CE3 CE4; do
    grep -Fq "$expected" "$fixture/document.txt"
  done
  if grep -Eq 'Peso máximo|Campus Universitario|direccion.eps@uah.es|Anexo IX\.' "$fixture/document.txt"; then echo 'FAIL: obsolete labels or institutional furniture'; exit 1; fi
  role=Presidente
  [[ $president_gender == male ]] || role=Presidenta
  grep -Fq "$role" "$fixture/document.txt"
  if [[ $presence == present ]]; then
    role='Secretario / Vocal 2º'
    [[ $secretary_gender == male ]] || role='Secretaria / Vocal 2ª'
    grep -Fq "$role" "$fixture/document.txt"
    grep -Fq "$cotutor" "$fixture/document.txt"
  elif grep -Fq 'Miembro tercero de prueba' "$fixture/document.txt"; then echo 'FAIL: absent third member rendered'; exit 1; fi
  if [[ -n ${TFG_TRIBUNAL_TEST_OUTPUT_DIR:-} ]]; then
    mkdir -p "$TFG_TRIBUNAL_TEST_OUTPUT_DIR"
    cp "$pdf" "$TFG_TRIBUNAL_TEST_OUTPUT_DIR/${spec//|/-}.pdf"
  fi
  printf 'PASS: Annex IX %s\n' "$spec"
done
[[ $before == "$(sha256sum "$repository_root/Config/myconfig.tex")" ]]

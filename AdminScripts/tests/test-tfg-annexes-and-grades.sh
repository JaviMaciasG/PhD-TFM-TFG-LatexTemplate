#!/usr/bin/env bash
# Verify current EPS-UAH TFG annexes and isolated TFG/TFM grading rules.
set -euo pipefail
repository_root=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/../.." && pwd)
fixture=$(mktemp -d)
trap 'rm -rf -- "$fixture"' EXIT
trap 'printf "FAIL: line %s (%s): %s\n" "$LINENO" "${spec:-setup}" "$BASH_COMMAND" >&2' ERR
before=$(sha256sum "$repository_root/Config/myconfig.tex")
standalone_before=$(sha256sum "$repository_root/PapeleoTFG/TFG-AnexoII-InformeTutorPlagio-UAH.tex" "$repository_root/PapeleoTFG/TFG-AnexoII-SeccionInformePlagio-UAH.tex")
mkdir -p "$fixture/PapeleoTFG" "$fixture/PapeleoTFM" "$fixture/Book"
cp -a "$repository_root/Config" "$fixture/"
cp -a "$repository_root/Book/biblio" "$fixture/Book/"
ln -s "$repository_root/Book/logos" "$fixture/Book/logos"
cp "$repository_root/PapeleoTFG/"*.tex "$repository_root/PapeleoTFG/Makefile" "$fixture/PapeleoTFG/"
cp "$repository_root/PapeleoTFM/"*.tex "$repository_root/PapeleoTFM/Makefile" "$fixture/PapeleoTFM/"
cp "$repository_root/AdminScripts/tests/fixtures/paperwork-grades.tex" "$fixture/PapeleoTFG/"

for spec in \
  'TFG|8|6|7.4|notable' \
  'TFG|5|5|5|aprobado' \
  'TFG|7|7|7|notable' \
  'TFG|9|9|9|sobresaliente' \
  'TFG|10|10|10|sobresaliente' \
  'TFG|0|0|0|suspenso' \
  'TFG|4|4|4|suspenso' \
  'TFG|0|10|3|suspenso' \
  'TFM||8|8|notable' \
  'TFM|unused|9|9|sobresaliente'; do
  IFS='|' read -r kind tutor tribunal expected category <<< "$spec"
  (cd "$fixture/PapeleoTFG" && pdflatex -draftmode -interaction=nonstopmode -halt-on-error \
    -jobname=grade-check "\def\GradeTestWorkType{$kind}\def\GradeTestTutor{$tutor}\def\GradeTestTribunal{$tribunal}\input{paperwork-grades.tex}") \
    > "$fixture/grade.log" 2>&1
  actual=$(sed -n 's/^GRADE RESULT=//p' "$fixture/PapeleoTFG/grade-check.log")
  awk -v actual="$actual" -v expected="$expected" 'BEGIN {d=actual-expected; exit !(d < 0.000001 && d > -0.000001)}'
  grep -Fq "GRADE NAME=$category" "$fixture/PapeleoTFG/grade-check.log"
  printf 'PASS: grade %s\n' "$spec"
done
for spec in 'TFG|4|10' 'TFG|10|4' 'TFG|-1|10' 'TFG|11|10' 'TFG|10|11' 'TFM|unused|-1' 'TFG|invalid|10'; do
  IFS='|' read -r kind tutor tribunal <<< "$spec"
  if (cd "$fixture/PapeleoTFG" && pdflatex -draftmode -interaction=nonstopmode -halt-on-error \
    -jobname=grade-invalid "\def\GradeTestWorkType{$kind}\def\GradeTestTutor{$tutor}\def\GradeTestTribunal{$tribunal}\input{paperwork-grades.tex}") \
    > "$fixture/grade-invalid.log" 2>&1; then
    echo "FAIL: invalid grading was accepted: $spec" >&2
    exit 1
  fi
  printf 'PASS: rejected %s\n' "$spec"
done

sed -i \
  -e 's/\\newcommand{\\myDegree}{[^}]*}/\\newcommand{\\myDegree}{GIEC}/' \
  -e 's/\\newcommand{\\myLanguage}{[^}]*}/\\newcommand{\\myLanguage}{spanish}/' \
  -e 's/\\newcommand{\\myDepartment}{[^}]*}/\\newcommand{\\myDepartment}{WorkDept}/' \
  -e 's/\\newcommand{\\myAcademicTutorDepartment}{[^}]*}/\\newcommand{\\myAcademicTutorDepartment}{TutorDept}/' \
  -e 's/\\newcommand{\\myCoTutorDepartment}{[^}]*}/\\newcommand{\\myCoTutorDepartment}{CotutorDept}/' \
  -e 's/\\newcommand{\\myCoTutorInstitution}{[^}]*}/\\newcommand{\\myCoTutorInstitution}{CotutorInstitution}/' \
  -e 's/\\newcommand{\\myCoTutorFullName}{[^}]*}/\\newcommand{\\myCoTutorFullName}{Cotutora de prueba}/' \
  -e 's/\\newcommand{\\myTribunalSecondSpokesperson}{[^}]*}/\\newcommand{\\myTribunalSecondSpokesperson}{Segunda vocal de prueba}/' \
  -e 's/\\newcommand{\\myTribunalSecondSpokespersonGender}{[^}]*}/\\newcommand{\\myTribunalSecondSpokespersonGender}{female}/' \
  -e 's/\\newcommand{\\myAcademicTutorGrade}{[^}]*}/\\newcommand{\\myAcademicTutorGrade}{8}/' \
  -e 's/\\newcommand{\\myTribunalGrade}{[^}]*}/\\newcommand{\\myTribunalGrade}{6}/' \
  "$fixture/Config/myconfig.tex"
if ! make -s -j 2 -C "$fixture/PapeleoTFG" all guia > "$fixture/forms.log" 2>&1; then
  tail -n 80 "$fixture/forms.log" >&2
  exit 1
fi
report=TFG-AnexoIII-InformeTutorYRubrica-EPS-UAH
acta=TFG-AnexoIX-ActaYRubricaDefensa-EPS-UAH
for document in "$report" "$acta"; do
  [[ $(pdfinfo "$fixture/PapeleoTFG/$document.pdf" | awk '/^Pages:/ {print $2}') == 3 ]]
done
pdftotext -layout "$fixture/PapeleoTFG/$report.pdf" "$fixture/report.txt"
pdftotext -layout "$fixture/PapeleoTFG/$acta.pdf" "$fixture/acta.txt"
grep -Fq 'ACTA DE EVALUACIÓN DE TRABAJO DE FIN DE GRADO' "$fixture/report.txt"
grep -Fq 'TutorDept' "$fixture/report.txt"
grep -Fq 'CotutorDept, CotutorInstitution' "$fixture/report.txt"
if grep -Fq 'WorkDept' "$fixture/report.txt"; then echo 'FAIL: extra work department rendered in Annex III'; exit 1; fi
if grep -Fq 'Peso máximo' "$fixture/report.txt"; then echo 'FAIL: old rubric grading label rendered'; exit 1; fi
[[ -f $fixture/PapeleoTFG/TFG-AnexoIII-SeccionRubrica-Tutor-EPS-UAH.tex ]]
[[ ! -f $fixture/PapeleoTFG/TFG-AnexoIII-Rubrica-Tutor-EPS-UAH.tex ]]
[[ $(grep -c 'INFORMACIÓN SOBRE LA PROTECCIÓN DE DATOS PERSONALES' "$fixture/report.txt") -eq 2 ]]
pdftotext -f 1 -l 2 -bbox "$fixture/PapeleoTFG/$report.pdf" "$fixture/privacy.html"
awk -F '"' '/>INFORMACIÓN</ {count++; if ($4 < 650 || $4 > 780) exit 1} END {if (count != 2) exit 1}' "$fixture/privacy.html"
if grep -Eq 'Campus Universitario|direccion.eps@uah.es|Anexo III\.' "$fixture/report.txt"; then echo 'FAIL: removed institutional furniture rendered'; exit 1; fi
grep -Fq '7.4' "$fixture/acta.txt"
grep -Fq 'notable' "$fixture/acta.txt"
grep -Fq 'TutorDept' "$fixture/acta.txt"
if grep -Fq 'WorkDept' "$fixture/acta.txt"; then echo 'FAIL: work department used for tutor'; exit 1; fi
for criterion in CE3 CE4; do grep -Fq "$criterion" "$fixture/acta.txt"; done
grep -Fq 'Secretaria / Vocal 2ª' "$fixture/acta.txt"

if [[ -n ${TFG_ANNEX_TEST_OUTPUT_DIR:-} ]]; then
  mkdir -p "$TFG_ANNEX_TEST_OUTPUT_DIR"
  cp "$fixture/PapeleoTFG/"TFG-*.pdf "$TFG_ANNEX_TEST_OUTPUT_DIR/"
fi
for spec in 'male|absent' 'female|absent' 'male|male' 'male|female' 'female|male' 'female|female'; do
  IFS='|' read -r tutor_gender cotutor_gender <<< "$spec"
  name='Cotutor de prueba'
  [[ $cotutor_gender != absent ]] || name=''
  sed -i \
    -e "s/\\\\newcommand{\\\\myAcademicTutorGender}{[^}]*}/\\\\newcommand{\\\\myAcademicTutorGender}{$tutor_gender}/" \
    -e "s/\\\\newcommand{\\\\myCoTutorGender}{[^}]*}/\\\\newcommand{\\\\myCoTutorGender}{$cotutor_gender}/" \
    -e "s/\\\\newcommand{\\\\myCoTutorFullName}{[^}]*}/\\\\newcommand{\\\\myCoTutorFullName}{$name}/" \
    "$fixture/Config/myconfig.tex"
  make -s -C "$fixture/PapeleoTFG" "$report.pdf" > "$fixture/gender.log" 2>&1 || { tail -n 60 "$fixture/gender.log" >&2; exit 1; }
  [[ $(pdfinfo "$fixture/PapeleoTFG/$report.pdf" | awk '/^Pages:/ {print $2}') == 3 ]]
  pdftotext -raw -f 3 -l 3 "$fixture/PapeleoTFG/$report.pdf" - | tr -d '[:space:]' > "$fixture/heading.txt"
  expected='Informe del tutor'
  [[ $tutor_gender == male ]] || expected='Informe de la tutora'
  case $cotutor_gender in male) expected+=' y del cotutor';; female) expected+=' y de la cotutora';; esac
  grep -Fq "$(printf '%s' "$expected" | tr -d '[:space:]')" "$fixture/heading.txt"
  if grep -q 'Overfull' "$fixture/PapeleoTFG/$report.log"; then echo "FAIL: overflowing report ($spec)"; exit 1; fi
  if [[ -n ${TFG_ANNEX_TEST_OUTPUT_DIR:-} ]]; then
    cp "$fixture/PapeleoTFG/$report.pdf" "$TFG_ANNEX_TEST_OUTPUT_DIR/report-${spec//|/-}.pdf"
  fi
  printf 'PASS: Annex III layout and heading %s\n' "$spec"
done
# Force a wrapped degree name as well as the existing multi-line title.
for pass in 1 2; do
  (cd "$fixture/PapeleoTFG" && pdflatex -interaction=nonstopmode -halt-on-error \
    -jobname=report-wrapped '\AtBeginDocument{\renewcommand{\myDegreefull}{Grado en Ingeniería de Sistemas de Telecomunicación, Electrónica y Tecnologías de la Información y de las Comunicaciones}}\input{TFG-AnexoIII-InformeTutorYRubrica-EPS-UAH.tex}') \
    > "$fixture/wrapped.log" 2>&1
done
[[ $(pdfinfo "$fixture/PapeleoTFG/report-wrapped.pdf" | awk '/^Pages:/ {print $2}') == 3 ]]
if grep -q 'Overfull' "$fixture/PapeleoTFG/report-wrapped.log"; then echo 'FAIL: overflowing wrapped fields'; exit 1; fi
if [[ -n ${TFG_ANNEX_TEST_OUTPUT_DIR:-} ]]; then
  cp "$fixture/PapeleoTFG/report-wrapped.pdf" "$TFG_ANNEX_TEST_OUTPUT_DIR/"
fi
echo 'PASS: wrapped degree and title fields'
sed -i \
  -e 's/\\newcommand{\\myCoTutorFullName}{[^}]*}/\\newcommand{\\myCoTutorFullName}{}/' \
  -e 's/\\newcommand{\\myTribunalSecondSpokesperson}{[^}]*}/\\newcommand{\\myTribunalSecondSpokesperson}{}/' \
  -e 's/\\newcommand{\\myAcademicTutorGender}{[^}]*}/\\newcommand{\\myAcademicTutorGender}{female}/' \
  "$fixture/Config/myconfig.tex"
make -s -C "$fixture/PapeleoTFG" "$report.pdf" "$acta.pdf" > "$fixture/two-member.log" 2>&1
pdftotext -layout "$fixture/PapeleoTFG/$acta.pdf" "$fixture/two-member.txt"
if grep -Eq 'Secretari[oa] / Vocal 2|CotutorDept' "$fixture/two-member.txt"; then
  echo 'FAIL: absent cotutor or third signature rendered'; exit 1
fi
if [[ -n ${TFG_ANNEX_TEST_OUTPUT_DIR:-} ]]; then
  cp "$fixture/PapeleoTFG/$report.pdf" "$TFG_ANNEX_TEST_OUTPUT_DIR/report-no-cotutor.pdf"
  cp "$fixture/PapeleoTFG/$acta.pdf" "$TFG_ANNEX_TEST_OUTPUT_DIR/acta-two-members.pdf"
fi
sed -i \
  -e 's/\\newcommand{\\myDegree}{[^}]*}/\\newcommand{\\myDegree}{MUIT}/' \
  -e 's/\\newcommand{\\myAcademicTutorGrade}{[^}]*}/\\newcommand{\\myAcademicTutorGrade}{}/' \
  -e 's/\\newcommand{\\myTribunalGrade}{[^}]*}/\\newcommand{\\myTribunalGrade}{8}/' \
  "$fixture/Config/myconfig.tex"
make -s -C "$fixture/PapeleoTFM" TFM-ActaYRubricaDefensa-EPS-UAH.pdf > "$fixture/tfm.log" 2>&1
pdftotext -layout "$fixture/PapeleoTFM/TFM-ActaYRubricaDefensa-EPS-UAH.pdf" "$fixture/tfm.txt"
grep -Fq 'El Tribunal ha resuelto otorgar la calificación de:' "$fixture/tfm.txt"
[[ $before == "$(sha256sum "$repository_root/Config/myconfig.tex")" ]]
[[ $standalone_before == "$(sha256sum "$repository_root/PapeleoTFG/TFG-AnexoII-InformeTutorPlagio-UAH.tex" "$repository_root/PapeleoTFG/TFG-AnexoII-SeccionInformePlagio-UAH.tex")" ]]
echo 'PASS: seven TFG forms, guide, optional roles, TFM regression and unchanged configuration'

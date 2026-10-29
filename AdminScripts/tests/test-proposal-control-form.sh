#!/usr/bin/env bash
# Compile the EPS-UAH proposal-control form with current shared configuration.
set -euo pipefail
test_directory=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)
repository_root=$(cd -- "$test_directory/../.." && pwd)
fixture=$(mktemp -d)
trap 'rm -rf -- "$fixture"' EXIT
mkdir -p "$fixture/PapeleoTFM" "$fixture/Book"
cp -a "$repository_root/Config" "$fixture/Config"
cp -a "$repository_root/Book/biblio" "$fixture/Book/"
cp "$repository_root/PapeleoTFM/TFM-AnexoVII-HojaControlAnteproyecto-EPS-UAH.tex" "$repository_root/PapeleoTFM/Makefile" "$fixture/PapeleoTFM/"
before=$(sha256sum "$repository_root/Config/myconfig.tex")
document=TFM-AnexoVII-HojaControlAnteproyecto-EPS-UAH
cases=('MUIE|spanish|present' 'MUIE|english|absent' 'MUII|spanish|present' 'MUIT|english|absent' 'MUCTE|spanish|absent')
for spec in "${cases[@]}"; do
  IFS='|' read -r degree language cotutor <<< "$spec"
  cp "$repository_root/Config/myconfig.tex" "$fixture/Config/myconfig.tex"
  sed -i \
    -e "s/\\\\newcommand{\\\\myDegree}{[^}]*}/\\\\newcommand{\\\\myDegree}{$degree}/" \
    -e "s/\\\\newcommand{\\\\myLanguage}{[^}]*}/\\\\newcommand{\\\\myLanguage}{$language}/" \
    -e 's/\\newcommand{\\myDepartment}{[^}]*}/\\newcommand{\\myDepartment}{Departamento del trabajo}/' \
    "$fixture/Config/myconfig.tex"
  president=Presidente
  if [[ $language == english ]]; then
    president=Presidenta
    sed -i \
      -e 's/\\newcommand{\\myTFMComisionPresidentGender}{[^}]*}/\\newcommand{\\myTFMComisionPresidentGender}{female}/' \
      -e 's/\\newcommand{\\mySpecialty}{[^}]*}/\\newcommand{\\mySpecialty}{Perfil de prueba}/' \
      "$fixture/Config/myconfig.tex"
  else
    sed -i \
      -e 's/\\newcommand{\\myTFMComisionPresidentGender}{[^}]*}/\\newcommand{\\myTFMComisionPresidentGender}{male}/' \
      -e 's/\\newcommand{\\mySpecialty}{[^}]*}/\\newcommand{\\mySpecialty}{}/' \
      "$fixture/Config/myconfig.tex"
  fi
  if [[ $cotutor == absent ]]; then
    sed -i \
      -e 's/\\newcommand{\\myCoTutorFullName}{[^}]*}/\\newcommand{\\myCoTutorFullName}{}/' \
      -e 's/\\newcommand{\\myAcademicTutorDepartment}{[^}]*}/\\newcommand{\\myAcademicTutorDepartment}{}/' \
      -e 's/\\newcommand{\\myCoTutorDepartment}{[^}]*}/\\newcommand{\\myCoTutorDepartment}{Departamento de prueba}/' \
      "$fixture/Config/myconfig.tex"
  fi
  if ! make -C "$fixture/PapeleoTFM" "$document.pdf" > "$fixture/build.log" 2>&1; then
    tail -n 60 "$fixture/build.log" >&2
    exit 1
  fi
  [[ $(pdfinfo "$fixture/PapeleoTFM/$document.pdf" | awk '/^Pages:/ {print $2}') == 1 ]]
  if grep -Eq 'Overfull \\hbox|Overfull \\vbox' "$fixture/PapeleoTFM/$document.log"; then
    echo 'FAIL: overflowing form content' >&2
    exit 1
  fi
  pdftotext -layout "$fixture/PapeleoTFM/$document.pdf" "$fixture/form.txt"
  grep -q 'Acuerdo de la Comisión de TFM' "$fixture/form.txt"
  grep -q 'PERFIL/ESPECIALIDAD:' "$fixture/form.txt"
  grep -q "Fdo: $president de la Comisión de TFM" "$fixture/form.txt"
  if [[ $degree == MUIE ]]; then
    grep -q 'Sello del departamento' "$fixture/form.txt"
  elif grep -q 'Sello del departamento' "$fixture/form.txt"; then
    echo 'FAIL: department seal outside MUIE' >&2
    exit 1
  fi
  if [[ $degree == MUII || $degree == MUIT ]]; then
    grep -q 'nombrado por la Comisión Académica del Máster' "$fixture/form.txt"
  elif grep -q 'nombrado por la Comisión Académica del Máster' "$fixture/form.txt"; then
    echo 'FAIL: unexpected academic-commission appointment text' >&2
    exit 1
  fi
  if [[ $language == english ]]; then
    grep -q 'PERFIL/ESPECIALIDAD:.*Perfil de prueba' "$fixture/form.txt"
    grep -q 'TÍTULO EN INGLÉS:' "$fixture/form.txt"
    grep -Eq '\[ *\] ESPAÑOL.*\[X\] INGLÉS' "$fixture/form.txt"
  else
    ! grep -q 'TÍTULO EN INGLÉS:' "$fixture/form.txt"
    grep -Eq '\[X\] ESPAÑOL.*\[ *\] INGLÉS' "$fixture/form.txt"
  fi
  if [[ $cotutor == absent ]]; then
    ! grep -q 'CODIRECTOR' "$fixture/form.txt"
    grep -q 'Departamento del trabajo' "$fixture/form.txt"
    if grep -q 'Departamento de prueba' "$fixture/form.txt"; then
      echo 'FAIL: work department inferred from cotutor' >&2
      exit 1
    fi
  fi
  pdftotext -bbox "$fixture/PapeleoTFM/$document.pdf" "$fixture/form.xml"
  python3 - "$fixture/form.xml" <<'PY'
import sys
import xml.etree.ElementTree as ET
ns = {'x': 'http://www.w3.org/1999/xhtml'}
page = ET.parse(sys.argv[1]).find('.//x:page', ns)
words = page.findall('.//x:word', ns)
date = [word for word in words if word.text == 'Alcalá'][-1]
date_row = [word for word in words if abs(float(word.attrib['yMin']) - float(date.attrib['yMin'])) < 3]
# A4 right margin 2.5 cm, minus the table's inner cell padding.
right_edge = float(page.attrib['width']) - 72 / 2.54 * 2.5 - 6 * 72 / 72.27
# The final year underline is a drawing, not text; include its 1.2 cm width.
text_end = max(float(word.attrib['xMax']) for word in date_row)
gap = right_edge - text_end - 72 / 2.54 * 1.2
assert 0 <= gap <= 5, f'Administrative date is not right aligned (gap {gap:.2f})'
PY
  if sed -n '/\\spacingFour{}\\wordPresidenteOrPresidenta:/,/\\spacingFour{}Suplente:/p' \
      "$fixture/PapeleoTFM/$document.tex" | grep -q '\\hrulefill'; then
    echo 'FAIL: ruling lines after tribunal names' >&2
    exit 1
  fi
  if [[ -n ${PROPOSAL_CONTROL_TEST_OUTPUT_DIR:-} ]]; then
    mkdir -p "$PROPOSAL_CONTROL_TEST_OUTPUT_DIR"
    cp "$fixture/PapeleoTFM/$document.pdf" "$PROPOSAL_CONTROL_TEST_OUTPUT_DIR/$degree-$language.pdf"
  fi
  make -C "$fixture/PapeleoTFM" "$document.pdf" > "$fixture/rebuild.log" 2>&1
  grep -q 'Nothing to do\|up-to-date' "$fixture/rebuild.log"
  printf 'PASS: %s / %s / cotutor %s\n' "$degree" "$language" "$cotutor"
done
[[ $before == "$(sha256sum "$repository_root/Config/myconfig.tex")" ]]

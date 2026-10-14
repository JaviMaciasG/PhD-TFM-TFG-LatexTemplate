#!/usr/bin/env bash
# Registry checks; optional real cover-only builds in an isolated source tree.
set -euo pipefail
test_directory=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)
repository_root=$(cd -- "$test_directory/../.." && pwd)
query="$repository_root/Config/query-degree-registry.sh"
for degree in GISTS-UPM GIB-UPM; do
  [[ $(sh "$query" work-type "$degree") == TFG ]]
  [[ $(sh "$query" institution "$degree") == UPM ]]
  [[ $(sh "$query" layout-profile "$degree") == upm-etsit-tft ]]
done
masters=(MUIT-UPM MUCS-UPM MUESFV-UPM MUIB-UPM MUIRST-UPM MUISE-UPM MUTSC-UPM)
for degree in "${masters[@]}"; do
  [[ $(sh "$query" work-type "$degree") == TFM ]]
  [[ $(sh "$query" institution "$degree") == UPM ]]
  [[ $(sh "$query" layout-profile "$degree") == upm-etsit-tft ]]
done
# MUIT without the suffix still selects the existing UAH master.
[[ $(sh "$query" institution MUIT) == UAH ]]
[[ $(sh "$query" work-type GISD-UPM) == TFG ]]
[[ $(sh "$query" institution GISD-UPM) == UPM ]]
[[ $(sh "$query" layout-profile GISD-UPM) == upm-etsit-gisd-tfg ]]
[[ -s $repository_root/Book/cover/upm/tribunal-tfg-gisd-upm.tex ]]
[[ $(sh "$query" work-type MUNE-UPM) == TFM ]]
[[ $(sh "$query" institution MUNE-UPM) == UPM ]]
[[ $(sh "$query" layout-profile MUNE-UPM) == upm-etsit-mune-tfm ]]
[[ -s $repository_root/Book/cover/upm/cover-tfm-mune-etsit-upm.tex ]]
[[ -s $repository_root/Book/cover/upm/tribunal-tfm-mune-etsit-upm.tex ]]
[[ $(sh "$query" layout-profile PHD-ETSIT-UPM) == upm-phd ]]
for file in portada-tfg-etsit-upm.tex tribunal-tfg-etsit-upm.tex cover-tfg-etsit-upm.tex imagen-portada-tfg-etsit-upm.png backpage-etsit-upm.tex; do
  [[ -s $repository_root/Book/cover/upm/$file ]]
done
grep -q '\\newcommand{\\myPonenteFullName}{}' "$repository_root/Config/myconfig.tex"
if (($# == 0)); then
  echo 'PASS: ETSIT-UPM degree registry, cover assets and optional ponente configuration.'
  exit 0
fi
[[ $# == 1 && $1 == --compile ]] || { echo "Usage: $0 [--compile]" >&2; exit 2; }
fixture=$(mktemp -d)
trap 'rm -rf -- "$fixture"' EXIT
mkdir -p "$fixture/Book"
cp -a "$repository_root/Config" "$fixture/Config"
cp -a "$repository_root/Book/cover" "$repository_root/Book/logos" "$repository_root/Book/biblio" "$fixture/Book/"
before=$(sha256sum "$repository_root/Config/myconfig.tex")
cases=(
  'GIB-UPM|standard|rgb|institutional|spanish|Cotutora de ejemplo|Ponente de ejemplo||male'
  'GISTS-UPM|framed|cmyk|institutional|spanish||||female'
  'GIB-UPM|editorial|rgb|document|english||Ponente de ejemplo'
  'GISD-UPM|standard|rgb|institutional|spanish|Cotutora academica de ejemplo|Ponente no utilizado|Supervisora tecnica no utilizada'
  'GISD-UPM|framed|cmyk|institutional|spanish||||legacy'
  'MUNE-UPM|standard|rgb|institutional|english|Cotutora no utilizada|Ponente no utilizado|Technical supervisor example'
  'MUNE-UPM|framed|cmyk|document|spanish|||'
  'MUNE-UPM|editorial|rgb|institutional|spanish|Cotutora no utilizada|Ponente no utilizado|Supervisora tecnica de ejemplo|male'
)
for degree in "${masters[@]}"; do
  cases+=("$degree|standard|rgb|institutional|spanish|Cotutora de ejemplo|Ponente de ejemplo||female")
done
for row in "${cases[@]}"; do
  IFS='|' read -r degree style color_space font_mode language cotutor ponente technical_supervisor secretary_gender <<<"$row"
  secretary_gender=${secretary_gender:-female}
  long_text=''
  [[ $degree != GISTS-UPM ]] || long_text='\def\CoverTestLongText{1}'
  name="$degree-$style-$color_space"
  for pass in 1 2; do
    (cd "$fixture/Book" && pdflatex -interaction=nonstopmode -halt-on-error -jobname="$name" \
      "\def\CoverTestDegree{$degree}\def\CoverTestStyle{$style}\def\CoverTestColorSpace{$color_space}\def\CoverTestFontMode{$font_mode}\def\CoverTestLanguage{$language}\def\CoverTestCoTutor{$cotutor}\def\CoverTestPonente{$ponente}\def\CoverTestTechnicalSupervisor{$technical_supervisor}\def\CoverTestSecretaryGender{$secretary_gender}$long_text\input{$test_directory/fixtures/etsit-upm-cover.tex}") \
      >"$fixture/$name-build.log" 2>&1 || { tail -n 50 "$fixture/$name-build.log"; exit 1; }
  done
  expected_type=$(sh "$query" work-type "$degree")
  if [[ $expected_type == TFM && $degree != MUNE-UPM ]]; then
    pdftotext -f 1 -l 5 "$fixture/Book/$name.pdf" "$fixture/$name-covers.txt"
    grep -q "TRABAJO FIN DE MÁSTER" "$fixture/$name-covers.txt"
    ! grep -q "TRABAJO FIN DE GRADO" "$fixture/$name-covers.txt"
  fi
  grep -q "COVER-TEST-TYPE: $expected_type" "$fixture/Book/$name.log"
  grep -q 'COVER-TEST-INSTITUTION: UPM' "$fixture/Book/$name.log"
  grep -q 'COVER-TEST-BACK: cover/upm/backpage-etsit-upm.tex' "$fixture/Book/$name.log"
  [[ $(pdfinfo "$fixture/Book/$name.pdf" | awk '/^Pages:/ {print $2}') == 8 ]]
  pdftotext -f 8 -l 8 "$fixture/Book/$name.pdf" "$fixture/$name-back.txt"
  grep -q '2027' "$fixture/$name-back.txt"
  expected_secretary=Secretaria
  [[ $secretary_gender != male ]] || expected_secretary=Secretario
  grep -q "COVER-TEST-SECRETARY: $expected_secretary" "$fixture/Book/$name.log"
  pdftotext "$fixture/Book/$name.pdf" "$fixture/$name.txt"
  pdftotext -f 3 -l 3 -layout "$fixture/Book/$name.pdf" "$fixture/$name-sheet.txt"
  pdftotext -f 3 -l 3 -bbox "$fixture/Book/$name.pdf" "$fixture/$name-sheet.xml"
  python3 - "$fixture/$name-sheet.xml" <<'PY'
import sys
import xml.etree.ElementTree as ET
ns = {'x': 'http://www.w3.org/1999/xhtml'}
words = ET.parse(sys.argv[1]).findall('.//x:word', ns)
def text(word):
    return (word.text or '').replace('’', "'")
work_type = next(word for index, word in enumerate(words)
                 if text(word) == 'TRABAJO'
                 or (text(word) == "MASTER'S" and index + 1 < len(words)
                     and text(words[index + 1]) == 'THESIS'))
work_top = float(work_type.attrib['yMin'])
degree_bottom = max(float(word.attrib['yMax']) for word in words
                    if float(word.attrib['yMax']) < work_top)
assert work_top - degree_bottom >= 20, 'Insufficient degree/work-type spacing on assessment page'
PY
  if [[ $degree == MUNE-UPM ]]; then
    if [[ $language == english ]]; then
      grep -q 'MASTER OF SCIENCE IN NEUROTECHNOLOGY' "$fixture/$name.txt"
      grep -Eq "MASTER['’]S THESIS" "$fixture/$name.txt"
      grep -q 'MEMBERS OF THE EXAMINATION COMMITTEE' "$fixture/$name.txt"
      grep -q 'Technical Supervisor:' "$fixture/$name.txt"
      grep -q 'Academic Supervisor:' "$fixture/$name.txt"
      grep -q 'Secretary:' "$fixture/$name.txt"
      grep -q 'Member:.*Primer vocal de ejemplo' "$fixture/$name-sheet.txt"
      grep -q 'Academic Supervisor:.*Tutor de ejemplo' "$fixture/$name-sheet.txt"
      grep -q 'Department:.*Departamento del tutor' "$fixture/$name-sheet.txt"
      grep -q 'June' "$fixture/$name-sheet.txt"
      ! grep -q 'junio' "$fixture/$name-sheet.txt"
      ! grep -q 'MIEMBROS DEL TRIBUNAL' "$fixture/$name.txt"
    else
      grep -q 'MÁSTER UNIVERSITARIO' "$fixture/$name.txt"
      grep -q 'NEUROTECNOLOGÍA' "$fixture/$name.txt"
      grep -q 'TRABAJO FIN DE MÁSTER' "$fixture/$name.txt"
      grep -q 'MIEMBROS DEL TRIBUNAL' "$fixture/$name.txt"
      grep -q 'Supervisión técnica:' "$fixture/$name.txt"
      grep -q 'Supervisión académica:.*Tutor de ejemplo' "$fixture/$name-sheet.txt"
      grep -q 'Departamento:.*Departamento del tutor' "$fixture/$name-sheet.txt"
      grep -q 'Vocal:.*Primer vocal de ejemplo' "$fixture/$name-sheet.txt"
      grep -q "$expected_secretary:" "$fixture/$name-sheet.txt"
      grep -q 'Presidenta:' "$fixture/$name-sheet.txt"
      grep -q 'junio' "$fixture/$name-sheet.txt"
      ! grep -q 'June' "$fixture/$name-sheet.txt"
      ! grep -q 'MEMBERS OF THE EXAMINATION COMMITTEE' "$fixture/$name.txt"
      ! grep -q 'MASTER OF SCIENCE IN NEUROTECHNOLOGY' "$fixture/$name.txt"
    fi
    if [[ -z $technical_supervisor ]]; then
      technical_label='Technical Supervisor'
      [[ $language != spanish ]] || technical_label='Supervisión técnica'
      technical_row=$(grep "$technical_label:" "$fixture/$name-sheet.txt")
      ! grep -q 'Tutor de ejemplo' <<< "$technical_row"
      grep -q '\.' <<< "$technical_row"
    fi
    ! grep -q 'Cotutora no utilizada' "$fixture/$name.txt"
    ! grep -q 'Ponente no utilizado' "$fixture/$name.txt"
    if [[ -n $technical_supervisor ]]; then grep -q "$technical_supervisor" "$fixture/$name.txt"; fi
  else
    grep -q 'MIEMBROS DEL TRIBUNAL' "$fixture/$name.txt"
    grep -q "$expected_secretary:" "$fixture/$name.txt"
    ! grep -q 'Secretario/a:' "$fixture/$name.txt"
    grep -q 'Vocal:.*Primer vocal de ejemplo' "$fixture/$name-sheet.txt"
  fi
  ! grep -q 'Segundo vocal no utilizado' "$fixture/$name-sheet.txt"
  if [[ $degree == GISD-UPM ]]; then
    grep -q 'Supervisión técnica:' "$fixture/$name.txt"
    grep -q 'Supervisión académica:' "$fixture/$name.txt"
    ! grep -q 'Ponente:' "$fixture/$name.txt"
    grep -q 'Supervisión técnica:.*Tutor de ejemplo' "$fixture/$name-sheet.txt"
    grep -q 'Departamento:.*Departamento del cotutor' "$fixture/$name-sheet.txt"
    if [[ -n $cotutor ]]; then
      grep -q "Supervisión académica:.*$cotutor" "$fixture/$name-sheet.txt"
    else
      grep -Eq '^[[:space:]]*Supervisión académica:[[:space:]]*$' "$fixture/$name-sheet.txt"
    fi
    if [[ -n $technical_supervisor ]]; then ! grep -q "$technical_supervisor" "$fixture/$name.txt"; fi
  elif [[ $degree != MUNE-UPM && -n $ponente ]]; then
    grep -q "$ponente" "$fixture/$name.txt"
    grep -q 'Departamento:.*Departamento del ponente' "$fixture/$name-sheet.txt"
  elif [[ $degree != MUNE-UPM ]]; then
    grep -Eq '^[[:space:]]*Ponente:[[:space:]]*$' "$fixture/$name-sheet.txt"
    grep -q 'Departamento:.*Departamento del tutor' "$fixture/$name-sheet.txt"
  fi
  if [[ -n ${ETSIT_UPM_TEST_OUTPUT_DIR:-} ]]; then
    mkdir -p "$ETSIT_UPM_TEST_OUTPUT_DIR"
    cp "$fixture/Book/$name.pdf" "$ETSIT_UPM_TEST_OUTPUT_DIR/"
  fi
done
[[ $before == "$(sha256sum "$repository_root/Config/myconfig.tex")" ]]
echo 'PASS: isolated ETSIT-UPM TFG/TFM builds; all seven shared-model masters, eight pages with orange back cover, independent secretary genders and legacy fallback, long title/name, supervision roles, RGB/CMYK, Spanish/English (including bilingual MUNE labels and dates) and both font policies.'

#!/usr/bin/env bash
# Test all ETSII degrees in an isolated tree; optionally retain review PDFs.
set -euo pipefail
test_directory=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)
repository_root=$(cd -- "$test_directory/../.." && pwd)
query="$repository_root/Config/query-degree-registry.sh"
degrees=(GCID-URJC GDDV-URJC GII-URJC GICO-URJC GICI-URJC GIS-URJC GIA-URJC GMAT-URJC)
fixture=$(mktemp -d)
trap 'rm -rf -- "$fixture"' EXIT
mkdir -p "$fixture/Book"
cp -a "$repository_root/Config" "$fixture/Config"
cp -a "$repository_root/Book/cover" "$repository_root/Book/logos" "$repository_root/Book/biblio" "$fixture/Book/"
before=$(sha256sum "$repository_root/Config/myconfig.tex")
for degree in "${degrees[@]}"; do
  [[ $(sh "$query" work-type "$degree") == TFG ]]
  [[ $(sh "$query" institution "$degree") == URJC ]]
  [[ $(sh "$query" layout-profile "$degree") == urjc-etsii-tfg ]]
done
[[ $(sh "$query" layout-profile ITI-URJC) == urjc-iti-tfg ]]
[[ -s $repository_root/Book/logos/urjc/URJ_logo_Color_POS.png ]]
for degree in "${degrees[@]}"; do
  language=spanish style=standard cotutor='Cotutora de ejemplo' tutor_gender=female author_gender=female
  [[ $degree != GMAT-URJC ]] || { language=english; style=framed; cotutor=''; }
  [[ $degree != GIA-URJC ]] || { tutor_gender=male; author_gender=male; }
  [[ $degree != GII-URJC ]] || { tutor_gender=male; cotutor=''; }
  for pass in 1 2; do
    (cd "$fixture/Book" && pdflatex -interaction=nonstopmode -halt-on-error -jobname="$degree" \
      "\def\CoverTestDegree{$degree}\def\CoverTestLanguage{$language}\def\CoverTestStyle{$style}\def\CoverTestCotutor{$cotutor}\def\CoverTestTutorGender{$tutor_gender}\def\CoverTestAuthorGender{$author_gender}\input{$test_directory/fixtures/etsii-urjc-cover.tex}") \
      > "$fixture/build.log" 2>&1 || { tail -n 60 "$fixture/build.log" >&2; exit 1; }
  done
  pdf="$fixture/Book/$degree.pdf"
  [[ $(pdfinfo "$pdf" | awk '/^Pages:/ {print $2}') == 2 ]]
  pdftotext -f 1 -l 1 -layout "$pdf" "$fixture/cover.txt"
  grep -q 'ESCUELA TÉCNICA SUPERIOR DE INGENIERÍA INFORMÁTICA' "$fixture/cover.txt"
  grep -q 'Trabajo de Fin de Grado' "$fixture/cover.txt"
  author_label=Autora tutor_label=Tutora plural_label=Tutoras
  [[ $author_gender != male ]] || author_label=Autor
  [[ $tutor_gender != male ]] || { tutor_label=Tutor; plural_label=Tutores; }
  grep -q "$author_label:" "$fixture/cover.txt"
  grep -q 'Tutora de ejemplo' "$fixture/cover.txt"
  if [[ -n $cotutor ]]; then
    grep -q "$plural_label:" "$fixture/cover.txt"
    grep -q "$cotutor" "$fixture/cover.txt"
  else
    grep -q "$tutor_label:" "$fixture/cover.txt"
    ! grep -q 'Cotutora de ejemplo' "$fixture/cover.txt"
  fi
  pdftotext -f 2 -l 2 "$pdf" "$fixture/back.txt"
  [[ $(tr -d '[:space:]\f' < "$fixture/back.txt") == 2027 ]]
  pdftotext -f 2 -l 2 -bbox "$pdf" "$fixture/back.xml"
  python3 - "$fixture/back.xml" <<'PY'
import sys
import xml.etree.ElementTree as ET
ns = {'x': 'http://www.w3.org/1999/xhtml'}
page = ET.parse(sys.argv[1]).find('.//x:page', ns)
words = page.findall('.//x:word', ns)
assert len(words) == 1 and words[0].text == '2027'
word = words[0]
for axis, extent in [('x', 'width'), ('y', 'height')]:
    center = (float(word.attrib[axis + 'Min']) + float(word.attrib[axis + 'Max'])) / 2
    assert abs(center - float(page.attrib[extent]) / 2) < 8, 'Back-cover year is not centered'
PY
  ! grep -Eq 'Overfull \\hbox|Overfull \\vbox' "$fixture/Book/$degree.log"
  if [[ -n ${ETSII_URJC_TEST_OUTPUT_DIR:-} ]]; then
    mkdir -p "$ETSII_URJC_TEST_OUTPUT_DIR"
    cp "$pdf" "$ETSII_URJC_TEST_OUTPUT_DIR/"
  fi
  printf 'PASS: %s (%s, %s)\n' "$degree" "$language" "$style"
done
[[ $before == "$(sha256sum "$repository_root/Config/myconfig.tex")" ]]

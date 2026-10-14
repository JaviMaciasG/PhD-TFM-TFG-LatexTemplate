#!/usr/bin/env bash
# Compile doctoral opening pages and verify language, optional fields and numbering.
set -euo pipefail
test_directory=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)
repository_root=$(cd -- "$test_directory/../.." && pwd)
fixture=$(mktemp -d)
trap 'rm -rf -- "$fixture"' EXIT
mkdir -p "$fixture/Book"
cp -a "$repository_root/Config" "$fixture/Config"
cp -a "$repository_root/Book/cover" "$repository_root/Book/logos" "$repository_root/Book/biblio" "$fixture/Book/"
cp "$test_directory/fixtures/upm-phd.tex" "$fixture/Book/test.tex"
before=$(sha256sum "$repository_root/Config/myconfig.tex")
cases=(
  'spanish|standard|Codirectora de ejemplo|Financiacion de ejemplo|two'
  'english|framed|||two'
  'spanish|editorial|||none'
  'english|standard|Co-supervisor example|Funding example|none'
  'spanish|framed|Codirectora de ejemplo|Financiacion de ejemplo|none'
  'english|standard|||none'
  'spanish|standard|||two'
  'english|editorial|Co-supervisor example|Funding example. This doctoral research was supported by competitive research projects and institutional grants for the development and validation of advanced electronic communication systems.|two'
)
for spec in "${cases[@]}"; do
  IFS='|' read -r language style cotutor funding reviewers <<<"$spec"
  funding_case=none
  [[ -z $funding ]] || funding_case=set
  job="upm-phd-$language-$style-$reviewers-$funding_case"
  for pass in 1 2; do
    if ! (cd "$fixture/Book" && pdflatex -interaction=nonstopmode -halt-on-error -jobname="$job" \
      "\def\PhDTestDegree{PHD-ETSIT-UPM}\def\PhDTestLanguage{$language}\def\PhDTestStyle{$style}\def\PhDTestCoTutor{$cotutor}\def\PhDTestFunding{$funding}\def\PhDTestReviewers{$reviewers}\input{test.tex}" >"$job-output.log" 2>&1); then
      tail -n 60 "$fixture/Book/$job-output.log" >&2
      exit 1
    fi
  done
  if [[ -n ${UPM_PHD_TEST_OUTPUT_DIR:-} ]]; then
    mkdir -p "$UPM_PHD_TEST_OUTPUT_DIR"
    cp "$fixture/Book/$job.pdf" "$UPM_PHD_TEST_OUTPUT_DIR/"
  fi
  # Los nombres y las instituciones pueden ocupar varias líneas al ampliar la fuente.
  pdftotext -f 1 -l 6 -raw "$fixture/Book/$job.pdf" - | tr '\n' ' ' > "$fixture/Book/$job.txt"
  grep -q 'Madrid, 2026' "$fixture/Book/$job.txt"
  pdftotext -f 1 -l 4 "$fixture/Book/$job.pdf" "$fixture/Book/$job-covers.txt"
  ! grep -q '2027' "$fixture/Book/$job-covers.txt"
  grep -q '2027' "$fixture/Book/$job.txt"
  for name in 'Tercera vocal de ejemplo' 'Segundo suplente de ejemplo'; do
    grep -q "$name" "$fixture/Book/$job.txt"
  done
  if [[ $language == spanish ]]; then
    grep -q 'Presentada para optar al título de Doctora' "$fixture/Book/$job.txt"
    grep -q 'Dra. Directora de ejemplo' "$fixture/Book/$job.txt"
    grep -q '24 de junio de 2027' "$fixture/Book/$job.txt"
  else
    grep -q 'Under the supervision of:' "$fixture/Book/$job.txt"
    grep -q 'Associate Professor' "$fixture/Book/$job.txt"
    grep -q 'Alternate member 1:' "$fixture/Book/$job.txt"
    grep -q 'Alternate member 2:' "$fixture/Book/$job.txt"
    ! grep -Eq 'Alternate [12]:' "$fixture/Book/$job.txt"
    grep -q 'June 24' "$fixture/Book/$job.txt"
  fi
  reviewer_heading='External Reviewers:'
  reviewer_institution='First reviewer institution'
  if [[ $language == spanish ]]; then
    reviewer_heading='Revisores Externos:'
    reviewer_institution='Institucion primera revisora'
  fi
  if [[ $reviewers == two ]]; then
    grep -q "$reviewer_heading" "$fixture/Book/$job.txt"
    grep -q "$reviewer_institution" "$fixture/Book/$job.txt"
    grep -q 'Primera revisora de ejemplo' "$fixture/Book/$job.txt"
    grep -q 'Segundo revisor de ejemplo' "$fixture/Book/$job.txt"
  else
    ! grep -q "$reviewer_heading" "$fixture/Book/$job.txt"
    ! grep -q "$reviewer_institution" "$fixture/Book/$job.txt"
    ! grep -q 'Primera revisora de ejemplo' "$fixture/Book/$job.txt"
    ! grep -q 'Segundo revisor de ejemplo' "$fixture/Book/$job.txt"
  fi
  if [[ -n $funding ]]; then
    grep -Fq "${funding%%.*}" "$fixture/Book/$job.txt"
  else
    ! grep -Eq 'Funding example|Financiacion de ejemplo' "$fixture/Book/$job.txt"
  fi
  [[ -z $cotutor ]] || grep -q "$cotutor" "$fixture/Book/$job.txt"
  ! grep -q 'destination with the same identifier' "$fixture/Book/$job.log"
  ! grep -Fq 'Overfull \vbox' "$fixture/Book/$job.log"
  pdftotext -bbox "$fixture/Book/$job.pdf" "$fixture/Book/$job.xml"
  python3 - "$fixture/Book/$job.xml" "$language" "$funding_case" <<'PY'
import sys
import xml.etree.ElementTree as ET
ns = {'x': 'http://www.w3.org/1999/xhtml'}
pages = ET.parse(sys.argv[1]).findall('.//x:page', ns)
assert len(pages) == 13, 'Unexpected opening-page parity or back cover'
for index in (1, 3, 5, 7):
    assert not pages[index].findall('.//x:word', ns), 'Expected a blank even opening page'
for index in (0, 2, 4):
    assert pages[index].findall('.//x:word', ns), 'Missing institutional content on odd page'
assert any(word.text == 'Dedicatoria' for word in pages[6].findall('.//x:word', ns)), 'Dedication must start on physical page 7'
assert any(word.text == 'Preliminares' for word in pages[8].findall('.//x:word', ns)), 'Next preliminary chapter must start on physical page 9'
for index, number in ((4, 'i'), (8, 'v'), (9, 'vi'), (10, '1'), (11, '2'), (12, '3')):
    page = pages[index]
    width, height = float(page.attrib['width']), float(page.attrib['height'])
    assert abs(width - 595.276) < 1 and abs(height - 841.89) < 1, 'Not A4'
    matches = [word for word in page.findall('.//x:word', ns)
               if word.text == number and float(word.attrib['yMin']) > height - 70]
    assert len(matches) == 1, f'Missing footer number {number} on physical page {index + 1}'
    word = matches[0]
    centre = (float(word.attrib['xMin']) + float(word.attrib['xMax'])) / 2
    assert abs(centre - width / 2) < 2, 'Page number is not centred'
for page in (pages[0], pages[2]):
    assert not any(float(word.attrib['yMin']) > float(page.attrib['height']) - 50
                   for word in page.findall('.//x:word', ns)), 'Opening page is numbered'
credit_words = pages[4].findall('.//x:word', ns)
body = [word for word in credit_words if word.text != 'i']
if sys.argv[2] == 'english':
    alternates = [index for index, word in enumerate(body) if word.text == 'Alternate']
    assert len(alternates) == 2, 'Missing alternate-member labels'
    for index in alternates:
        label = body[index:index + 3]
        assert label[1].text == 'member' and label[2].text in ('1:', '2:'), 'Incomplete alternate-member label'
        assert max(float(word.attrib['yMin']) for word in label) - min(float(word.attrib['yMin']) for word in label) < 0.5, 'Alternate-member label wraps'
    row_names = ['Francisca', 'María', 'Francisco', 'Sira', 'Tercera', 'Elio', 'Segundo']
    committee_top = next(float(word.attrib['yMin']) for word in body if word.text == 'Committee:')
    name_starts = [next(word for word in body if word.text == name
                       and float(word.attrib['yMin']) > committee_top) for name in row_names]
    columns = [float(word.attrib['xMin']) for word in name_starts]
    assert max(columns) - min(columns) < 1, 'Committee names are not left-aligned in one column'
assert min(float(word.attrib['yMin']) for word in body) >= 69, 'Credits exceed the top margin'
# Permite el pequeño descenso de los glifos respecto al borde de la caja.
assert max(float(word.attrib['yMax']) for word in body) <= 775, 'Credits exceed the bottom margin'
date_label = 'Fecha' if sys.argv[2] == 'spanish' else 'Thesis'
date = next(word for word in body if word.text == date_label and float(word.attrib['yMin']) > 700)
assert 740 <= float(date.attrib['yMin']) <= 773, 'Defense date is not at the bottom'
if sys.argv[3] == 'set':
    funding_word = 'Financiacion' if sys.argv[2] == 'spanish' else 'Funding'
    funding = next(word for word in body if word.text == funding_word)
    funding_bottom = max(float(word.attrib['yMax']) for word in body
                         if float(word.attrib['yMin']) >= float(funding.attrib['yMin']) - 0.2
                         and float(word.attrib['yMax']) < float(date.attrib['yMin']))
    assert float(date.attrib['yMin']) - funding_bottom >= 9.4, 'Funding is too close to the defense date'
PY
  printf 'PASS: %s (cotutor: %s, funding: %s, reviewers: %s)\n' "$job" "${cotutor:-none}" "$funding_case" "$reviewers"
done
[[ $before == "$(sha256sum "$repository_root/Config/myconfig.tex")" ]]

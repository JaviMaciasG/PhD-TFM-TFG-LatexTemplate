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
for spec in 'spanish|standard|Codirectora de ejemplo|Financiacion de ejemplo' 'english|framed||' 'spanish|editorial||' 'english|standard|Co-supervisor example|Funding example'; do
  IFS='|' read -r language style cotutor funding <<<"$spec"
  job="upm-phd-$language-$style"
  for pass in 1 2; do
    if ! (cd "$fixture/Book" && pdflatex -interaction=nonstopmode -halt-on-error -jobname="$job" \
      "\def\PhDTestDegree{PHD-ETSIT-UPM}\def\PhDTestLanguage{$language}\def\PhDTestStyle{$style}\def\PhDTestCoTutor{$cotutor}\def\PhDTestFunding{$funding}\input{test.tex}" >"$job-output.log" 2>&1); then
      tail -n 60 "$fixture/Book/$job-output.log" >&2
      exit 1
    fi
  done
  # Los nombres y las instituciones pueden ocupar varias líneas al ampliar la fuente.
  pdftotext -f 1 -l 6 -raw "$fixture/Book/$job.pdf" - | tr '\n' ' ' > "$fixture/Book/$job.txt"
  grep -q 'Madrid, 2026' "$fixture/Book/$job.txt"
  pdftotext -f 1 -l 4 "$fixture/Book/$job.pdf" "$fixture/Book/$job-covers.txt"
  ! grep -q '2027' "$fixture/Book/$job-covers.txt"
  grep -q '2027' "$fixture/Book/$job.txt"
  for name in 'Tercera vocal de ejemplo' 'Segundo suplente de ejemplo' 'Primera revisora de ejemplo' 'Segundo revisor de ejemplo'; do
    grep -q "$name" "$fixture/Book/$job.txt"
  done
  if [[ $language == spanish ]]; then
    grep -q 'Revisores Externos:' "$fixture/Book/$job.txt"
    grep -q 'Presentada para optar al título de Doctora' "$fixture/Book/$job.txt"
    grep -q 'Dra. Directora de ejemplo' "$fixture/Book/$job.txt"
    grep -q 'Institucion primera revisora' "$fixture/Book/$job.txt"
    grep -q '24 de junio de 2027' "$fixture/Book/$job.txt"
  else
    grep -q 'External Reviewers:' "$fixture/Book/$job.txt"
    grep -q 'Under the supervision of:' "$fixture/Book/$job.txt"
    grep -q 'Associate Professor' "$fixture/Book/$job.txt"
    grep -q 'First reviewer institution' "$fixture/Book/$job.txt"
    grep -q 'June 24' "$fixture/Book/$job.txt"
  fi
  [[ -z $funding ]] || grep -q "$funding" "$fixture/Book/$job.txt"
  [[ -z $cotutor ]] || grep -q "$cotutor" "$fixture/Book/$job.txt"
  ! grep -q 'destination with the same identifier' "$fixture/Book/$job.log"
  pdftotext -bbox "$fixture/Book/$job.pdf" "$fixture/Book/$job.xml"
  python3 - "$fixture/Book/$job.xml" <<'PY'
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
PY
  if [[ -n ${UPM_PHD_TEST_OUTPUT_DIR:-} ]]; then
    mkdir -p "$UPM_PHD_TEST_OUTPUT_DIR"
    cp "$fixture/Book/$job.pdf" "$UPM_PHD_TEST_OUTPUT_DIR/"
  fi
  printf 'PASS: %s (cotutor: %s, funding: %s)\n' "$job" "${cotutor:-none}" "${funding:-none}"
done
[[ $before == "$(sha256sum "$repository_root/Config/myconfig.tex")" ]]

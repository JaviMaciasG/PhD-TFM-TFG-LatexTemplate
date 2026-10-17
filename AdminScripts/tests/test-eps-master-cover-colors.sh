#!/usr/bin/env bash
# Check actual cover/back-page band colors without changing user configuration.
set -euo pipefail
test_directory=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)
repository_root=$(cd -- "$test_directory/../.." && pwd)
fixture=$(mktemp -d)
trap 'rm -rf -- "$fixture"' EXIT
before=$(sha256sum "$repository_root/Config/myconfig.tex")
mkdir -p "$fixture/Book"
cp -a "$repository_root/Config" "$fixture/Config"
cp -a "$repository_root/Book/cover" "$repository_root/Book/biblio" "$fixture/Book/"
ln -s "$repository_root/Book/logos" "$fixture/Book/logos"
for degree in MUIT MUII MUIE MUCTE; do
  job="cover-$degree"
  for pass in 1 2; do
    if ! (cd "$fixture/Book" && pdflatex -interaction=nonstopmode -halt-on-error -jobname="$job" \
      "\def\CoverTestDegree{$degree}\def\CoverTestStyle{standard}\def\CoverTestColorSpace{rgb}\def\CoverTestFontMode{institutional}\def\CoverTestLanguage{spanish}\def\CoverTestCoTutor{}\def\CoverTestPonente{}\def\CoverTestTechnicalSupervisor{}\input{$test_directory/fixtures/etsit-upm-cover.tex}" \
      > "$job-output.log" 2>&1); then
      tail -n 60 "$fixture/Book/$job-output.log" >&2
      exit 1
    fi
  done
  pdf="$fixture/Book/$job.pdf"
  last_page=$(pdfinfo "$pdf" | awk '/^Pages:/ {print $2}')
  pdftoppm -f 1 -singlefile -r 30 "$pdf" "$fixture/front" >/dev/null 2>&1
  pdftoppm -f "$last_page" -singlefile -r 30 "$pdf" "$fixture/back" >/dev/null 2>&1
  python3 - "$degree" "$fixture/front.ppm" "$fixture/back.ppm" <<'PY'
from pathlib import Path
import re
import sys

degree, front, back = sys.argv[1:]
expected = (0, 44, 145) if degree in ('MUIT', 'MUII') else (0, 90, 170)
# MUCTE has a different front cover, but shares the banded back page.
for name in ([back] if degree == 'MUCTE' else [front, back]):
    data = Path(name).read_bytes()
    header = re.match(rb'P6\s+(\d+)\s+(\d+)\s+255\s', data)
    assert header, 'Unexpected PPM format'
    width, height = map(int, header.groups())
    pixels = data[header.end():]
    for y in (int(height * .02), int(height * .98)):
        offset = (y * width + int(width * .1)) * 3
        actual = tuple(pixels[offset:offset + 3])
        assert actual == expected, f'{degree} / {name} / y={y}: {actual} != {expected}'
print(f'PASS: {degree} bands = #{expected[0]:02x}{expected[1]:02x}{expected[2]:02x}')
PY
  if [[ -n ${EPS_MASTER_COLOR_TEST_OUTPUT_DIR:-} ]]; then
    mkdir -p "$EPS_MASTER_COLOR_TEST_OUTPUT_DIR"
    cp "$pdf" "$EPS_MASTER_COLOR_TEST_OUTPUT_DIR/"
  fi
done
[[ $before == "$(sha256sum "$repository_root/Config/myconfig.tex")" ]]
echo 'PASS: user configuration unchanged'

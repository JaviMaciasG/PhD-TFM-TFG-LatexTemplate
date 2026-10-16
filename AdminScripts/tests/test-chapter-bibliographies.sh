#!/usr/bin/env bash
# Exercise automatic bibliographies in isolation, including PDF link targets.
set -euo pipefail
test_directory=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)
repository_root=$(cd -- "$test_directory/../.." && pwd)
for dependency in pdflatex biber latexmk pdftotext mutool python3; do
  command -v "$dependency" >/dev/null || { echo "Missing test dependency: $dependency" >&2; exit 1; }
done
fixture=$(mktemp -d)
trap 'rm -rf -- "$fixture"' EXIT
mkdir -p "$fixture/Book"
cp -a "$repository_root/Config" "$fixture/Config"
cp -a "$repository_root/Book/biblio" "$fixture/Book/"
cp "$test_directory/fixtures/chapter-bibliographies.tex" "$fixture/Book/test.tex"
cp "$test_directory/fixtures/chapter-bibliographies.bib" "$fixture/Book/fixture.bib"

build_case() {
  local job=$1 chapters=$2 final=$3 numbering=$4 language=$5 style=$6 extra=${7:-}
  local definitions="\def\TestChapterBibliographies{$chapters}\def\TestFinalBibliography{$final}\def\TestNumbering{$numbering}\def\TestLanguage{$language}\def\TestStyle{$style}$extra"
  (
    cd "$fixture/Book"
    latexmk -g -pdf -interaction=nonstopmode -halt-on-error -r ../Config/latexmkrc \
      -jobname="$job" "-pdflatex=pdflatex %O '$definitions\input{%S}'" test.tex > "$job-build.log" 2>&1 || {
        tail -n 70 "$job-build.log" >&2; exit 1;
      }
    pdftotext -layout "$job.pdf" "$job.txt"
    mutool show "$job.pdf" grep > "$job-objects.txt"
  )
  python3 - "$fixture/Book" "$job" "$chapters" "$final" "$numbering" "$language" "$extra" <<'PY'
from pathlib import Path
import re
import sys

directory, job, chapters, final, numbering, language, extra = sys.argv[1:]
directory = Path(directory)
text = (directory / f'{job}.txt').read_text()
log = (directory / f'{job}.log').read_text(errors='replace')
toc = (directory / f'{job}.toc').read_text().replace(r"\'{\i }", 'í')
objects = (directory / f'{job}-objects.txt').read_text()
compendium = 'TestCompendium' in extra
omitted = 'TestOmitAppendixReference' in extra
title = 'Chapter references' if language == 'english' else 'Bibliografía del capítulo'
general_title = 'Bibliography' if language == 'english' else 'Bibliografía'
expected_sections = (2 if compendium or omitted else 3) if chapters == 'true' else 0
assert toc.count(title) == expected_sections, (job, toc)
general = re.search(r'\\contentsline\s*\{chapter\}\{'+general_title+r'\}', toc)
assert bool(general) == (final == 'true'), (job, 'general bibliography visibility')
pages = text.split('\f')
general_pages = [page for page in pages if re.search(r'^'+general_title+r'\s*$', page, re.M)]
if final == 'true':
    assert len(general_pages) == 1, (job, general_pages)
    general_text = general_pages[0]
    for entry in ['Alpha reference', 'Beta reference', 'Preliminary reference', 'Explicitly requested reference']:
        assert entry in general_text, (job, entry)
    assert ('Appendix-only reference' in general_text) != omitted, job
    assert 'Excluded quotation' not in general_text, job
    if not compendium and not omitted:
        assert text.index(general_text) < text.index('Appendix-only citation:')
if chapters == 'true':
    records = re.findall(r'BIBTEST: (alpha|beta):(\d+):(\d+)', log)
    labels = {(key, section): number for key, section, number in records}
    if numbering == 'chapter':
        assert labels[('alpha', '1')] == labels[('beta', '2')] == '1', (job, labels)
        assert labels[('beta', '1')] == labels[('alpha', '2')] == '2', (job, labels)
        for section, key in [('1', 'alpha'), ('1', 'beta'), ('2', 'alpha'), ('2', 'beta')]:
            target = f'cite.{section}@{key}'
            assert f'/D({target})' in objects, (job, 'citation destination', target)
            assert re.search(r'\('+re.escape(target)+r'\)\d+ 0 R', objects), (job, 'missing target', target)
        if final == 'true':
            assert re.search(r'\(cite\.0@alpha\)\d+ 0 R', objects), job
            assert re.search(r'\[2\]\s+A\. Alpha,', general_text), (job, 'independent general numbering')
            destinations = dict(re.findall(r'\((cite\.[^)]+)\)(\d+) 0 R', objects))
            assert destinations['cite.0@alpha'] != destinations['cite.1@alpha'], job
    else:
        assert {section for _, section, _ in records} == {'0'}, (job, records)
assert 'undefined on input line' not in log, job
assert 'There were undefined references' not in log, job
assert 'Maximum runs' not in log, job
assert 'same identifier' not in log, job
print(f'PASS: {job}')
PY
}

build_case local-general true true chapter english standard
build_case local-spanish true true chapter spanish standard
build_case global-general true true global english standard
build_case local-only true false chapter english standard
build_case global-only true false global english standard
build_case default false true global english standard
build_case numbering-inactive false true chapter english standard
build_case no-bibliographies false false global english standard
build_case framed true true chapter spanish framed
build_case modern true true chapter english modern
build_case compendium true true chapter english standard '\def\TestCompendium{1}'
build_case local-general true true chapter english standard '\def\TestOmitAppendixReference{1}'

# A second invocation of latexmk must not need another TeX or Biber pass.
(
  cd "$fixture/Book"
  latexmk -pdf -interaction=nonstopmode -halt-on-error -r ../Config/latexmkrc \
    -jobname=local-general \
    '-pdflatex=pdflatex %O '\''\def\TestChapterBibliographies{true}\def\TestFinalBibliography{true}\def\TestNumbering{chapter}\def\TestLanguage{english}\def\TestStyle{standard}\def\TestOmitAppendixReference{1}\input{%S}'\''' \
    test.tex > repeat-build.log 2>&1
  if grep -q 'applying rule' repeat-build.log; then
    echo 'ERROR: repeated build was not stable' >&2; exit 1
  fi
)

for definitions in \
  '\def\TestChapterBibliographies{invalid}' \
  '\def\TestFinalBibliography{invalid}' \
  '\def\TestNumbering{invalid}'; do
  if (cd "$fixture/Book" && pdflatex -interaction=nonstopmode -halt-on-error \
    -jobname=invalid "$definitions\input{test.tex}" > invalid-build.log 2>&1); then
    echo 'ERROR: invalid bibliography setting was accepted' >&2; exit 1
  fi
  grep -Eq 'Invalid value|Invalid bibliography numbering' "$fixture/Book/invalid-build.log"
done
echo 'PASS: invalid settings rejected; removed references disappear; repeated build is stable.'

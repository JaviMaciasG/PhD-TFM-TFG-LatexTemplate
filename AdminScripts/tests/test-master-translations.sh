#!/usr/bin/env bash
# Check all master names, work-type labels and wrapping in both languages.
set -euo pipefail
[[ $# == 0 || ( $# == 1 && $1 == --compile ) ]] || { echo "Usage: $0 [--compile]" >&2; exit 2; }
test_directory=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)
repository_root=$(cd -- "$test_directory/../.." && pwd)
fixture=$(mktemp -d)
trap 'rm -rf -- "$fixture"' EXIT
for language in spanish english; do
  if ! pdflatex -draftmode -interaction=nonstopmode -halt-on-error \
    -output-directory="$fixture" -jobname="masters-$language" \
    "\def\TestConfigDirectory{$repository_root/Config}\def\TestLanguage{$language}\input{$test_directory/fixtures/master-translations.tex}" \
    >"$fixture/$language-output.log" 2>&1; then
    tail -n 60 "$fixture/$language-output.log" >&2
    exit 1
  fi
  [[ $(grep -c '^PASS: master ' "$fixture/masters-$language.log") == 15 ]]
  grep -q '^PASS: untranslated TFM fallback' "$fixture/masters-$language.log"
  grep -q '^PASS: non-TFM names unchanged' "$fixture/masters-$language.log"
done
echo 'PASS: all 15 master names and labels in Spanish and English, wrapping, fallback and non-TFM compatibility.'
if (($# == 0)); then exit 0; fi

# Real covers are built in isolation, never with the user's live configuration.
mkdir -p "$fixture/Book"
cp -a "$repository_root/Config" "$fixture/Config"
cp -a "$repository_root/Book/cover" "$repository_root/Book/logos" "$repository_root/Book/biblio" "$fixture/Book/"
before=$(sha256sum "$repository_root/Config/myconfig.tex")
masters=(MUSEA MUIT MUII MUIE MUCTE MUANBD MUC MUIT-UPM MUCS-UPM MUESFV-UPM MUIB-UPM MUIRST-UPM MUISE-UPM MUTSC-UPM MUNE-UPM)
for language in spanish english; do
  for degree in "${masters[@]}"; do
    job="master-$degree-$language"
    for pass in 1 2; do
      if ! (cd "$fixture/Book" && pdflatex -interaction=nonstopmode -halt-on-error -jobname="$job" \
        "\def\CoverTestDegree{$degree}\def\CoverTestStyle{standard}\def\CoverTestColorSpace{rgb}\def\CoverTestFontMode{institutional}\def\CoverTestLanguage{$language}\def\CoverTestCoTutor{}\def\CoverTestPonente{}\def\CoverTestTechnicalSupervisor{}\input{$test_directory/fixtures/etsit-upm-cover.tex}" \
        >"$job-output.log" 2>&1); then
        tail -n 60 "$fixture/Book/$job-output.log" >&2
        exit 1
      fi
    done
    pdftotext "$fixture/Book/$job.pdf" "$fixture/Book/$job.txt"
    python3 - "$fixture/Config/degrees.tex" "$degree" "$language" "$fixture/Book/$job.txt" <<'PY'
from pathlib import Path
import re
import sys
registry, degree, language, text_file = sys.argv[1:]
block = re.search(r'\\DeclareDegree\{' + re.escape(degree) + r'\}\{\n(.*?)\n\}', Path(registry).read_text(), re.S).group(1)
field = 'degree-name-english' if language == 'english' else 'degree-name'
expected = re.search(r'^  ' + field + r' = \{(.*)\},$', block, re.M).group(1)
def normalize(value):
    return ' '.join(value.replace('’', "'").split()).casefold()
text = normalize(Path(text_file).read_text())
assert normalize(expected) in text, f'{degree}: missing {language} degree name'
label = "Master's Thesis" if language == 'english' else 'Trabajo Fin de Máster'
assert normalize(label) in text, f'{degree}: missing {language} work-type label'
PY
    if [[ -n ${MASTER_TRANSLATION_TEST_OUTPUT_DIR:-} ]]; then
      mkdir -p "$MASTER_TRANSLATION_TEST_OUTPUT_DIR"
      cp "$fixture/Book/$job.pdf" "$MASTER_TRANSLATION_TEST_OUTPUT_DIR/"
    fi
    printf 'PASS: covers %s / %s\n' "$degree" "$language"
  done
done
[[ $(sha256sum "$repository_root/Config/myconfig.tex") == "$before" ]]
echo 'PASS: 30 bilingual master cover builds; live configuration unchanged.'

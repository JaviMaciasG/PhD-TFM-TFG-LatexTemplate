#!/usr/bin/env bash
# Compile isolated UAH covers and verify academic-year and language selection.
set -euo pipefail
test_directory=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)
repository_root=$(cd -- "$test_directory/../.." && pwd)
fixture=$(mktemp -d)
trap 'rm -rf -- "$fixture"' EXIT
mkdir -p "$fixture/Book"
cp -a "$repository_root/Config" "$fixture/Config"
cp -a "$repository_root/Book/cover" "$repository_root/Book/logos" "$repository_root/Book/biblio" "$fixture/Book/"
before=$(sha256sum "$repository_root/Config/myconfig.tex")
for degree in GIEC GBS MUCTE; do
  for language in spanish english; do
    name="$degree-$language"
    for pass in 1 2; do
      (cd "$fixture/Book" && pdflatex -interaction=nonstopmode -halt-on-error -jobname="$name" \
        "\def\CoverTestDegree{$degree}\def\CoverTestLanguage{$language}\input{$test_directory/fixtures/uah-cover-dates.tex}") \
        >"$fixture/$name-build.log" 2>&1 || { tail -n 50 "$fixture/$name-build.log"; exit 1; }
    done
    pdf="$fixture/Book/$name.pdf"
    if [[ -n ${UAH_COVER_TEST_OUTPUT_DIR:-} ]]; then
      mkdir -p "$UAH_COVER_TEST_OUTPUT_DIR"
      cp "$pdf" "$UAH_COVER_TEST_OUTPUT_DIR/"
    fi
    pages=$(pdfinfo "$pdf" | awk '/^Pages:/ {print $2}')
    pdftotext -f 1 -l 1 "$pdf" "$fixture/$name-front.txt"
    pdftotext -f "$pages" -l "$pages" "$pdf" "$fixture/$name-back.txt"
    if [[ $degree == GIEC ]]; then
      for side in front back; do
        grep -q '2030/2031' "$fixture/$name-$side.txt"
        ! grep -q '2032' "$fixture/$name-$side.txt"
      done
    elif [[ $degree == GBS ]]; then
      for side in front back; do
        grep -q '2032' "$fixture/$name-$side.txt"
        ! grep -q '2030/2031' "$fixture/$name-$side.txt"
      done
    elif [[ $language == english ]]; then
      grep -q 'June 24' "$fixture/$name-front.txt"
      grep -q '2032' "$fixture/$name-front.txt"
      ! grep -q 'junio' "$fixture/$name-front.txt"
    else
      grep -q '24 de junio de 2032' "$fixture/$name-front.txt"
      ! grep -q 'June' "$fixture/$name-front.txt"
    fi
    echo "PASS: $degree ($language) cover dates."
  done
done
[[ $(sha256sum "$repository_root/Config/myconfig.tex") == "$before" ]]

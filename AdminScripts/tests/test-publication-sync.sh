#!/usr/bin/env bash
# Real rsync tests with fixture files; no LaTeX builds or Dropbox writes.
set -euo pipefail
case ${0##*/} in
  make) exit 0 ;;
  pandoc)
    while (($#)); do
      if [[ $1 == -o ]]; then printf 'Fixture documentation\n' >"$2"; exit 0; fi
      shift
    done
    exit 1 ;;
  build-book-style-comparisons.sh)
    while (($#)); do
      if [[ $1 == --output ]]; then printf 'Fixture comparison\n' >"$2"; exit 0; fi
      shift
    done
    exit 1 ;;
  build-book-typesetting-prototypes.sh)
    [[ ${FAIL_FIXTURE_BUILD:-false} != true ]] || exit 1
    destination= language=spanish font=institutional style=
    chapter_bibliographies=unset final_bibliography=unset bibliography_numbering=unset
    while (($#)); do
      case $1 in
        --output-dir) destination=$2; shift 2 ;;
        --language) language=$2; shift 2 ;;
        --font-mode) font=$2; shift 2 ;;
        --styles) style=$2; shift 2 ;;
        --chapter-bibliographies) chapter_bibliographies=$2; shift 2 ;;
        --final-bibliography) final_bibliography=$2; shift 2 ;;
        --bibliography-numbering) bibliography_numbering=$2; shift 2 ;;
        *) shift ;;
      esac
    done
    mkdir -p "$destination"
    name="book-${style:-standard}"
    [[ $language != english ]] || name+=-english
    [[ $font != document ]] || name+=-document-fonts
    printf 'Fixture sample: chapters=%s final=%s numbering=%s\n' \
      "$chapter_bibliographies" "$final_bibliography" "$bibliography_numbering" >"$destination/$name.pdf"
    exit 0 ;;
esac
test_directory=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)
repository_root=$(cd -- "$test_directory/../.." && pwd)
helper="$repository_root/AdminScripts/sync-publication-files.sh"
fixture=$(mktemp -d)
trap 'rm -rf -- "$fixture"' EXIT
source_directory="$fixture/staging"
destination="$fixture/destination"
mkdir -p "$source_directory" "$destination/subdirectory"
printf 'vtest\n' >"$source_directory/RELEASE.txt"
printf 'new content\n' >"$source_directory/00-README.pdf"
printf 'old content\n' >"$destination/00-README.pdf"
# Same size and timestamp: --checksum must still detect the changed content.
touch -r "$destination/00-README.pdf" "$source_directory/00-README.pdf"
inode=$(stat -c %i "$destination/00-README.pdf")
printf 'obsolete\n' >"$destination/TFG-old.pdf"
printf 'obsolete archive\n' >"$destination/03-PhDTFMTFG-LaTeX-Template-UAH-old.zip"
printf 'unrelated\n' >"$destination/personal.pdf"
printf 'unrelated\n' >"$destination/notes.txt"
printf 'nested\n' >"$destination/subdirectory/TFG-old.pdf"
snapshot() { (cd "$destination" && find . -type f -exec sha256sum {} + | sort); }
before=$(snapshot)
preview=$(bash "$helper" --dry-run --include-distribution "$source_directory" "$destination")
[[ $before == "$(snapshot)" && $preview == *'*deleting'* && $preview == *'00-README.pdf'* ]]
bash "$helper" --include-distribution "$source_directory" "$destination" >"$fixture/sync.log"
cmp "$source_directory/00-README.pdf" "$destination/00-README.pdf"
[[ $inode == "$(stat -c %i "$destination/00-README.pdf")" ]]
[[ ! -e $destination/TFG-old.pdf && ! -e $destination/03-PhDTFMTFG-LaTeX-Template-UAH-old.zip ]]
[[ -f $destination/personal.pdf && -f $destination/notes.txt && -f $destination/subdirectory/TFG-old.pdf ]]
[[ -z $(bash "$helper" --dry-run --include-distribution "$source_directory" "$destination") ]]
printf 'preserved without archive publication\n' >"$destination/03-PhDTFMTFG-LaTeX-Template-UAH-old.tgz"
bash "$helper" "$source_directory" "$destination" >/dev/null
[[ -f $destination/03-PhDTFMTFG-LaTeX-Template-UAH-old.tgz ]]
mkdir "$fixture/incomplete"
before=$(snapshot)
if bash "$helper" "$fixture/incomplete" "$destination" >"$fixture/incomplete.log" 2>&1; then exit 1; fi
[[ $before == "$(snapshot)" ]]
if bash "$helper" "$source_directory" "$fixture/missing" >"$fixture/missing.log" 2>&1; then exit 1; fi
[[ ! -e $fixture/missing ]]

# Exercise the real publishing orchestration with mocked document generation.
mkdir -p "$fixture/repository/AdminScripts" "$fixture/bin"
cp "$repository_root/AdminScripts/go.gen-public-sample-pdfs.sh" "$fixture/repository/AdminScripts/"
cp "$helper" "$fixture/repository/AdminScripts/"
for builder in build-book-typesetting-prototypes.sh build-book-style-comparisons.sh; do
  cp "$0" "$fixture/repository/AdminScripts/$builder"
  chmod +x "$fixture/repository/AdminScripts/$builder"
done
for tool in make pandoc; do cp "$0" "$fixture/bin/$tool"; chmod +x "$fixture/bin/$tool"; done
printf 'vtest\n' >"$fixture/repository/RELEASE.txt"
printf 'Fixture README\n' >"$fixture/repository/README.pdf"
generator="$fixture/repository/AdminScripts/go.gen-public-sample-pdfs.sh"
before=$(snapshot)
PATH="$fixture/bin:$PATH" bash "$generator" --destination "$destination" </dev/null >"$fixture/cancel.log" 2>&1
grep -q 'Synchronization preview' "$fixture/cancel.log"
grep -q 'Dropbox was not modified' "$fixture/cancel.log"
grep -q 'Generating TFG-GISTS-UPM-spanish.pdf (GISTS-UPM, spanish, standard, standard, institutional)' "$fixture/cancel.log"
grep -q 'Generated 12 PDF files' "$fixture/cancel.log"
[[ -s $fixture/repository/Book/public-samples/TFG-GISTS-UPM-spanish.pdf ]]
public_names=(
  TFG-GIEC-spanish.pdf
  TFM-MUIE-spanish-modern.pdf
  TFM-MUCTE-english-framed.pdf
  TFM-MUC-spanish-shaded.pdf
  PhD-PHDUAH-english-conventional-mimosis.pdf
  PhD-PHDUAH-spanish-conventional-chapterbib-editorial.pdf
  PhD-PHDUAH-spanish-compendium-standard.pdf
  TFG-GISTS-UPM-spanish.pdf
  TFG-ITI-URJC-english-editorial.pdf
)
for filename in "${public_names[@]}"; do
  [[ -s $fixture/repository/Book/public-samples/$filename ]]
  if [[ $filename == PhD-PHDUAH-spanish-conventional-chapterbib-editorial.pdf ]]; then
    grep -q 'chapters=true final=true numbering=chapter' "$fixture/repository/Book/public-samples/$filename"
  else
    grep -q 'chapters=false final=true numbering=global' "$fixture/repository/Book/public-samples/$filename"
  fi
  grep -Fq "Generating $filename (" "$fixture/cancel.log"
  for language in es en; do
    grep -Fq "$filename" "$repository_root/Documentation/$language/DOWNLOAD-GUIDE.md"
  done
done
grep -q 'Generating PhD-PHDUAH-spanish-conventional-chapterbib-editorial.pdf (PHDUAH, spanish, standard, editorial, document)' "$fixture/cancel.log"
[[ -z $(find "$fixture/repository/Book/public-samples" -maxdepth 1 -type f \
  \( -name '*-institutional-fonts.pdf' -o -name '*-document-fonts.pdf' \) -print -quit) ]]
[[ $before == "$(snapshot)" ]]

# Renamed files replace old policy-suffixed publications through the normal sync.
rename_source="$fixture/renamed-publication"
rename_destination="$fixture/renamed-destination"
mkdir "$rename_source" "$rename_destination"
cp "$fixture/repository/Book/public-samples/"*.pdf "$rename_source/"
cp "$fixture/repository/RELEASE.txt" "$rename_source/"
printf 'obsolete policy-suffixed sample\n' >"$rename_destination/TFM-MUIE-spanish-modern-institutional-fonts.pdf"
printf 'obsolete policy-suffixed sample\n' >"$rename_destination/TFG-ITI-URJC-english-editorial-document-fonts.pdf"
printf 'original GIEC sample\n' >"$rename_destination/TFG-GIEC-spanish.pdf"
giec_inode=$(stat -c %i "$rename_destination/TFG-GIEC-spanish.pdf")
bash "$helper" "$rename_source" "$rename_destination" >"$fixture/rename-sync.log"
[[ ! -e $rename_destination/TFM-MUIE-spanish-modern-institutional-fonts.pdf ]]
[[ ! -e $rename_destination/TFG-ITI-URJC-english-editorial-document-fonts.pdf ]]
[[ $(stat -c %i "$rename_destination/TFG-GIEC-spanish.pdf") == "$giec_inode" ]]
for filename in "${public_names[@]}"; do cmp "$rename_source/$filename" "$rename_destination/$filename"; done
if FAIL_FIXTURE_BUILD=true PATH="$fixture/bin:$PATH" bash "$generator" --destination "$destination" </dev/null >"$fixture/failure.log" 2>&1; then exit 1; fi
grep -q 'Dropbox was not modified' "$fixture/failure.log"
[[ $before == "$(snapshot)" ]]
# Reject malformed bibliography overrides before attempting a real build.
for option in --chapter-bibliographies --final-bibliography --bibliography-numbering; do
  for invalid_case in invalid empty missing; do
    arguments=("$option")
    case $invalid_case in
      invalid) arguments+=(invalid) ;;
      empty) arguments+=('') ;;
    esac
    if bash "$repository_root/AdminScripts/build-book-typesetting-prototypes.sh" "${arguments[@]}" >"$fixture/invalid-option.log" 2>&1; then
      echo "ERROR: accepted malformed bibliography option: $option / $invalid_case" >&2
      exit 1
    else
      [[ $? == 2 ]]
    fi
    grep -q 'ERROR:' "$fixture/invalid-option.log"
  done
done
echo 'PASS: safe publication, public filenames, per-sample bibliography settings and override validation.'

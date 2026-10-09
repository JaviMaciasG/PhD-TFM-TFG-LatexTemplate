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
    while (($#)); do
      case $1 in
        --output-dir) destination=$2; shift 2 ;;
        --language) language=$2; shift 2 ;;
        --font-mode) font=$2; shift 2 ;;
        --styles) style=$2; shift 2 ;;
        *) shift ;;
      esac
    done
    mkdir -p "$destination"
    name="book-${style:-standard}"
    [[ $language != english ]] || name+=-english
    [[ $font != document ]] || name+=-document-fonts
    printf 'Fixture sample\n' >"$destination/$name.pdf"
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
[[ $before == "$(snapshot)" ]]
if FAIL_FIXTURE_BUILD=true PATH="$fixture/bin:$PATH" bash "$generator" --destination "$destination" </dev/null >"$fixture/failure.log" 2>&1; then exit 1; fi
grep -q 'Dropbox was not modified' "$fixture/failure.log"
[[ $before == "$(snapshot)" ]]
echo 'PASS: preview, in-place checksum update, obsolete-file deletion, unrelated-file protection, archive policy, invalid inputs, cancellation and build failure.'

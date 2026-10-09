#!/usr/bin/env bash
# Fast matrix and orchestration tests; no TeX compilation is performed.
set -euo pipefail

# Copies of this test file act as fixture-only executables.
case ${0##*/} in
  build-book-typesetting-prototypes.sh)
    language=spanish
    font=institutional
    degree=
    destination=
    declare -a styles=()
    while (($#)); do
      case $1 in
        --styles)
          shift
          while (($#)) && [[ $1 != --* ]]; do styles+=("$1"); shift; done ;;
        --degree) degree=$2; shift 2 ;;
        --language) language=$2; shift 2 ;;
        --font-mode) font=$2; shift 2 ;;
        --output-dir) destination=$2; shift 2 ;;
        --structure) shift 2 ;;
        *) exit 2 ;;
      esac
    done
    mkdir -p "$destination"
    if [[ ${MOCK_INTERRUPT:-false} == true ]]; then kill -TERM "$PPID"; exit 143; fi
    failed=0
    for style in "${styles[@]}"; do
      name="book-$style"
      [[ $language != english ]] || name+=-english
      [[ $font != document ]] || name+=-document-fonts
      printf 'Fixture build: %s %s\n' "$degree" "$style" >"$destination/$name-build.log"
      if [[ $style == ${MOCK_FAIL_STYLE:-} ]]; then failed=1; continue; fi
      printf 'Fixture PDF: %s %s\n' "$degree" "$style" >"$destination/$name.pdf"
    done
    exit "$failed" ;;
  gs)
    destination=
    for arg in "$@"; do
      case $arg in -sOutputFile=*) destination=${arg#*=} ;; esac
    done
    [[ ${MOCK_FAIL_COMPRESSION:-false} != true ]] || exit 1
    cp -- "${!#}" "$destination"
    exit 0 ;;
  git|latexmk) exit 0 ;;
esac

test_directory=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)
repository_root=$(cd -- "$test_directory/../.." && pwd)
fixture=$(mktemp -d)
trap 'rm -rf -- "$fixture"' EXIT
mkdir -p "$fixture/AdminScripts" "$fixture/Config/typesetting" "$fixture/Book" "$fixture/bin"
cp "$repository_root/AdminScripts/go.gen-all-pdfs.sh" "$fixture/AdminScripts/"
cp "$repository_root/Config/query-degree-registry.sh" "$fixture/Config/"
cp "$repository_root/Config/degrees.tex" "$fixture/Config/"
cp "$repository_root/Config/typesetting/typesetting.tex" "$fixture/Config/typesetting/"
cp "$repository_root/Config/myconfig.tex" "$fixture/Config/"
cp "$0" "$fixture/AdminScripts/build-book-typesetting-prototypes.sh"
for tool in gs git latexmk; do cp "$0" "$fixture/bin/$tool"; done
chmod +x "$fixture/AdminScripts/"*.sh "$fixture/bin/"*
export PATH="$fixture/bin:$PATH"
generator="$fixture/AdminScripts/go.gen-all-pdfs.sh"
query="$fixture/Config/query-degree-registry.sh"
registry="$fixture/Config/degrees.tex"
config_hash=$(sha256sum "$fixture/Config/myconfig.tex")
checks=0

assert_contains() { [[ $1 == *"$2"* ]] || { echo "FAIL: expected '$2'" >&2; exit 1; }; checks=$((checks + 1)); }
assert_absent() { [[ $1 != *"$2"* ]] || { echo "FAIL: unexpected '$2'" >&2; exit 1; }; checks=$((checks + 1)); }
assert_count() { assert_contains "$1" "Generation preview: $2 documents"; }
expect_error() {
  local output status
  if output=$("$generator" "$@" 2>&1); then echo "FAIL: expected error for $*" >&2; exit 1; else status=$?; fi
  [[ $status == 2 ]] || { echo "FAIL: expected status 2, got $status: $output" >&2; exit 1; }
  checks=$((checks + 1))
}
mapfile -t ids < <(sh "$query" identifiers "$registry")
tfgs=0; tfms=0; phds=0; reports=0
declare -A representatives=()
for id in "${ids[@]}"; do
  type=$(sh "$query" work-type "$id" "$registry")
  case $type in
    TFG) tfgs=$((tfgs + 1)) ;;
    TFM) tfms=$((tfms + 1)) ;;
    PhD) phds=$((phds + 1)) ;;
    RR) reports=$((reports + 1)); continue ;;
    TFC) continue ;;
  esac
  university=$(sh "$query" institution "$id" "$registry")
  layout=$(sh "$query" layout-profile "$id" "$registry")
  representatives["$university|$type|$layout"]=true
done
style_count=$(sed -n 's/^\\def\\thesis@registeredstyles{\([^}]*\)}$/\1/p' "$fixture/Config/typesetting/typesetting.tex" | awk -F, '{print NF}')
default=$("$generator" --dry-run)
assert_count "$default" "${#representatives[@]}"
[[ ! -e $fixture/Book/all-pdfs ]] || exit 1
assert_absent "$default" 'TFC-'
assert_absent "$default" 'RR-'
assert_contains "$default" 'Styles: standard'
assert_contains "$default" 'Font modes: institutional'
assert_contains "$default" 'Languages: spanish'
assert_contains "$default" 'Structures: standard'
explicit_all_universities=$("$generator" --all-universities --dry-run)
[[ $default == "$explicit_all_universities" ]] || exit 1
assert_count "$("$generator" --all-tfgs --dry-run)" "$tfgs"
assert_count "$("$generator" --all-tfms --dry-run)" "$tfms"
assert_count "$("$generator" --all-phds --dry-run)" "$phds"
assert_count "$("$generator" --all-tfgs --all-tfms --dry-run)" "$((tfgs + tfms))"
assert_count "$("$generator" --all-degrees --dry-run)" "$((tfgs + tfms + phds + reports))"
assert_count "$("$generator" --all --dry-run)" "$(((tfgs + tfms + 2 * phds + reports) * 2 * style_count * 2))"
assert_count "$("$generator" --all --degrees PHDUAH --dry-run)" "$((2 * 2 * style_count * 2))"
assert_count "$("$generator" --degrees GIEC,GITT,GIEC --dry-run)" 2
assert_count "$("$generator" --degrees GIEC --all-styles --all-fonts --dry-run)" "$((style_count * 2))"
assert_count "$("$generator" --all --universities URJC --dry-run)" "$((2 * style_count * 2))"
assert_count "$("$generator" --all-tfms --layout-profiles uah-muc-2026 --dry-run)" 1
assert_count "$("$generator" --degree-types RR --dry-run)" "$reports"
assert_count "$("$generator" --degrees GEINTRARR --dry-run)" 1
assert_count "$("$generator" --degrees GIEC,PHDUAH --structures compendium --dry-run)" 1
assert_count "$("$generator" --degrees GIEC --styles framed,standard,framed --font-modes document,institutional --languages english,spanish --dry-run)" 8
assert_contains "$("$generator" --list-options)" 'Universities: UAH URJC UPM GEINTRA'
assert_contains "$("$generator" --help)" '--yes'
expect_error --degrees INVALID --dry-run
expect_error --degree-types TFC --dry-run
expect_error --degrees IT --dry-run
expect_error --universities INVALID --dry-run
expect_error --layout-profiles INVALID --dry-run
expect_error --font-modes INVALID --dry-run
expect_error --languages INVALID --dry-run
expect_error --structures INVALID --dry-run
expect_error --styles INVALID --dry-run
expect_error --degrees GIEC,
expect_error --degrees GIEC,,MUC
expect_error --styles
expect_error --unknown
expect_error --all-universities --universities UAH
expect_error --all-styles --styles framed
expect_error --all-fonts --font-modes document
expect_error --degrees GIEC --degree-types TFM
expect_error --degrees GIEC --structures compendium
expect_error --output-dir "$fixture/Book" --dry-run
expect_error --degrees GIEC
[[ ! -e $fixture/Book/all-pdfs ]] || exit 1

# Inspection must not require git, latexmk, gs or create directories.
mkdir "$fixture/inspection-bin"
for tool in bash dirname sh awk sed realpath; do ln -s "$(command -v "$tool")" "$fixture/inspection-bin/$tool"; done
PATH="$fixture/inspection-bin" /bin/bash "$generator" --all --dry-run >/dev/null
PATH="$fixture/inspection-bin" /bin/bash "$generator" --list-options >/dev/null
PATH="$fixture/inspection-bin" /bin/bash "$generator" --help >/dev/null

output=$("$generator" --degrees GIEC --styles standard,framed --yes --output-dir "$fixture/success")
assert_contains "$output" '2 successful, 0 failed (2 planned)'
assert_contains "$output" '[OK] 001/002 TFG-GIEC-spanish-standard-standard-institutional.pdf'
assert_contains "$output" '[OK] 002/002 TFG-GIEC-spanish-standard-framed-institutional.pdf'
[[ $(find "$fixture/success" -name '*.pdf' | wc -l) == 2 ]] || exit 1
assert_contains "$("$generator" --degrees GIEC --styles standard,framed --dry-run --output-dir "$fixture/success")" '[REPLACE]'

output=$("$generator" --all --degrees PHDUAH --yes --output-dir "$fixture/phd-matrix")
assert_contains "$output" "$((2 * 2 * style_count * 2)) successful, 0 failed"
[[ $(find "$fixture/phd-matrix" -name '*.pdf' | wc -l) == $((2 * 2 * style_count * 2)) ]] || exit 1
[[ -f $fixture/phd-matrix/PhD-PHDUAH-english-compendium-mimosis-document.pdf ]] || exit 1

if output=$(MOCK_FAIL_STYLE=framed "$generator" --degrees GIEC --styles standard,framed,modern --yes --output-dir "$fixture/failure" 2>&1); then exit 1; else [[ $? == 1 ]] || exit 1; fi
assert_contains "$output" '2 successful, 1 failed (3 planned)'
assert_contains "$output" '[OK] 002/003 TFG-GIEC-spanish-standard-modern-institutional.pdf'
[[ -f $fixture/failure/TFG-GIEC-spanish-standard-framed-institutional.log ]] || exit 1
[[ ! -f $fixture/failure/TFG-GIEC-spanish-standard-framed-institutional.pdf ]] || exit 1
if output=$(MOCK_FAIL_COMPRESSION=true "$generator" --degrees GIEC --yes --output-dir "$fixture/compression" 2>&1); then exit 1; else [[ $? == 1 ]] || exit 1; fi
assert_contains "$output" '0 successful, 1 failed (1 planned)'
if output=$(MOCK_FAIL_STYLE=standard "$generator" --degrees GIEC --yes --output-dir "$fixture/success" 2>&1); then exit 1; fi
assert_contains "$( < "$fixture/success/TFG-GIEC-spanish-standard-standard-institutional.pdf")" 'Fixture PDF'

mkdir "$fixture/temporary"
if output=$(TMPDIR="$fixture/temporary" MOCK_INTERRUPT=true "$generator" --degrees GIEC --yes --output-dir "$fixture/interrupted" 2>&1); then exit 1; else [[ $? == 143 ]] || exit 1; fi
[[ -z $(find "$fixture/temporary" -mindepth 1 -print -quit) ]] || exit 1

# util-linux script supplies an actual terminal for confirmation tests.
if command -v script >/dev/null; then
  printf -v command '%q --degrees GIEC --output-dir %q' "$generator" "$fixture/confirmed"
  output=$(printf 'n\n' | script -q -e -c "$command" /dev/null)
  assert_contains "$output" 'Cancelled; no files were changed.'
  [[ ! -e $fixture/confirmed ]] || exit 1
  output=$(script -q -e -c "$command" /dev/null </dev/null)
  assert_contains "$output" 'Cancelled; no files were changed.'
  [[ ! -e $fixture/confirmed ]] || exit 1
  output=$(printf 'YES\n' | script -q -e -c "$command" /dev/null)
  assert_contains "$output" '1 successful, 0 failed (1 planned)'
else
  echo 'SKIP: interactive confirmation tests require util-linux script.'
fi
[[ $config_hash == "$(sha256sum "$fixture/Config/myconfig.tex")" ]] || exit 1
printf 'PASS: %s matrix/orchestration assertions; fixture configuration unchanged.\n' "$checks"

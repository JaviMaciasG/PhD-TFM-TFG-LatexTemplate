#!/usr/bin/env bash
# Check bare preparation and unconditional ethics inclusion without changing live sources.
set -euo pipefail
test_directory=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)
repository_root=$(cd -- "$test_directory/../.." && pwd)
fixture=$(mktemp -d)
trap 'rm -rf -- "$fixture"' EXIT
mkdir -p "$fixture/Book/chapters" "$fixture/Book/appendix"
cp -a "$repository_root/Config" "$fixture/Config"
cp "$repository_root/Book/Makefile" "$repository_root/Book/content-standard.tex" "$fixture/Book/"
cp -a "$repository_root/Book/chapters/bare" "$fixture/Book/chapters/"
cp -a "$repository_root/Book/appendix/bare" "$fixture/Book/appendix/"
cp "$repository_root/Book/chapters/"*.tex "$fixture/Book/chapters/"
cp "$repository_root/Book/appendix/"*.tex "$fixture/Book/appendix/"
before=$(sha256sum "$repository_root/Config/myconfig.tex" "$repository_root/Book/content-standard.tex" "$repository_root/Book/appendix/aspectos-eticos.tex")
# The full manual adds suggested readings. Only its regulatory outline must
# match the minimal editable appendix, which intentionally omits citations.
sed '/^\\section\*{Lecturas complementarias/,$d' "$repository_root/Book/appendix/aspectos-eticos.tex" > "$fixture/full-outline.tex"
sed '/^%%% Local Variables:/,$d' "$repository_root/Book/appendix/bare/aspectos-eticos.tex" > "$fixture/bare-outline.tex"
cmp "$fixture/full-outline.tex" "$fixture/bare-outline.tex"
if ! make --no-print-directory -C "$fixture/Book" bare-standard >"$fixture/make.log" 2>&1; then
  cat "$fixture/make.log" >&2
  exit 1
fi
cmp "$repository_root/Book/chapters/bare/content-standard.tex" "$fixture/Book/content-standard.tex"
cmp "$repository_root/Book/appendix/bare/aspectos-eticos.tex" "$fixture/Book/appendix/aspectos-eticos.tex"

check_degree() {
  local degree=$1 job=$2 other_school=${3:-}
  if ! (cd "$fixture/Book" && pdflatex -draftmode -interaction=nonstopmode -halt-on-error \
    -jobname="$job" "\def\TestDegree{$degree}$other_school\input{$test_directory/fixtures/bare-ethics.tex}" \
    >"$job-output.log" 2>&1); then
    tail -n 60 "$fixture/Book/$job-output.log" >&2
    exit 1
  fi
  grep -q '^PASS: ETHICAL-APPENDIX-INCLUDED' "$fixture/Book/$job.log"
  grep -q 'cha:aspectos-eticos' "$fixture/Book/$job.aux"
}
check_degree GIEC GIEC-UAH
check_degree GISTS-ETSIT-UPM GISTS-ETSIT-UPM
check_degree ITI-ESCET-URJC ITI-ESCET-URJC
check_degree GISTS-ETSIT-UPM GISTS-other-UPM-school '\def\TestOtherSchool{1}'
[[ $(sha256sum "$repository_root/Config/myconfig.tex" "$repository_root/Book/content-standard.tex" "$repository_root/Book/appendix/aspectos-eticos.tex") == "$before" ]]
echo 'PASS: bare preparation copies the ethical appendix; UAH, ETSIT-UPM, URJC and other UPM schools include it; live sources unchanged.'

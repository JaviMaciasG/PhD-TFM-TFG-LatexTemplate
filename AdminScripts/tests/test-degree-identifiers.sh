#!/usr/bin/env bash
# Check non-UAH identifiers in the query tool and actual LaTeX conditionals.
set -euo pipefail
test_directory=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)
repository_root=$(cd -- "$test_directory/../.." && pwd)
query="$repository_root/Config/query-degree-registry.sh"
checks=0
while IFS= read -r degree; do
  institution=$(sh "$query" institution "$degree")
  case $institution in
    UPM|URJC)
      [[ $degree == *-"$institution" ]] || { echo "FAIL: missing university suffix: $degree" >&2; exit 1; }
      legacy=${degree//-/}
      if sh "$query" work-type "$legacy" >/dev/null 2>&1; then
        echo "FAIL: obsolete identifier still registered: $legacy" >&2
        exit 1
      fi
      checks=$((checks + 1)) ;;
  esac
done < <(sh "$query" identifiers)
[[ $checks == 21 ]] || { echo "FAIL: expected 21 non-UAH degrees, found $checks" >&2; exit 1; }

fixture=$(mktemp -d)
trap 'rm -rf -- "$fixture"' EXIT
for language in spanish english; do
  if ! pdflatex -draftmode -interaction=nonstopmode -halt-on-error \
    -output-directory="$fixture" -jobname="identifiers-$language" \
    "\def\TestConfigDirectory{$repository_root/Config}\def\TestLanguage{$language}\input{$test_directory/fixtures/degree-identifiers.tex}" \
    >"$fixture/$language-output.log" 2>&1; then
    tail -n 60 "$fixture/$language-output.log" >&2
    exit 1
  fi
  [[ $(grep -c '^PASS:' "$fixture/identifiers-$language.log") == 25 ]] || exit 1
done
printf 'PASS: %s non-UAH degrees; 50 LaTeX registry/conditional assertions.\n' "$checks"

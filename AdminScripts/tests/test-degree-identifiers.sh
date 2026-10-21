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
      [[ ${degree%-COMPENDIUM} == *-"$institution" ]] || { echo "FAIL: missing university suffix: $degree" >&2; exit 1; }
      if [[ $institution == UPM ]]; then
        [[ ${degree%-COMPENDIUM} == *-ETSIT-UPM ]] || { echo "FAIL: missing ETSIT school suffix: $degree" >&2; exit 1; }
      fi
      legacy=${degree//-/}
      if sh "$query" work-type "$legacy" >/dev/null 2>&1; then
        echo "FAIL: obsolete identifier still registered: $legacy" >&2
        exit 1
      fi
      checks=$((checks + 1)) ;;
  esac
done < <(sh "$query" identifiers)
[[ $checks == 35 ]] || { echo "FAIL: expected 35 non-UAH degrees, found $checks" >&2; exit 1; }
for old in ITI-URJC GCID-URJC GDDV-URJC GII-URJC GICO-URJC GICI-URJC GIS-URJC GIA-URJC GMAT-URJC; do
  if sh "$query" work-type "$old" >/dev/null 2>&1; then
    echo "FAIL: obsolete URJC identifier still registered: $old" >&2
    exit 1
  fi
done
for old in GISTS-UPM GIB-UPM GISD-UPM MUIT-UPM MUCS-UPM MUESFV-UPM MUIB-UPM MUIRST-UPM MUISE-UPM MUTSC-UPM MUNE-UPM; do
  if sh "$query" work-type "$old" >/dev/null 2>&1; then
    echo "FAIL: obsolete UPM identifier still registered: $old" >&2
    exit 1
  fi
done
for degree in ITI-ESCET-URJC GCID-ETSII-URJC GDDV-ETSII-URJC GII-ETSII-URJC GICO-ETSII-URJC GICI-ETSII-URJC GIS-ETSII-URJC GIA-ETSII-URJC GMAT-ETSII-URJC; do
  [[ $(sh "$query" institution "$degree") == URJC ]]
  [[ $(sh "$query" work-type "$degree") == TFG ]]
  expected_profile=urjc-etsii-tfg
  [[ $degree != ITI-ESCET-URJC ]] || expected_profile=urjc-iti-tfg
  [[ $(sh "$query" layout-profile "$degree") == "$expected_profile" ]]
done

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
  [[ $(grep -c '^PASS:' "$fixture/identifiers-$language.log") == 40 ]] || exit 1
done
if pdflatex -draftmode -interaction=nonstopmode -halt-on-error \
  -output-directory="$fixture" -jobname=rejected-urjc \
  "\def\TestConfigDirectory{$repository_root/Config}\def\TestLanguage{spanish}\def\TestRejectedDegree{GII-URJC}\input{$test_directory/fixtures/degree-identifiers.tex}" \
  >"$fixture/rejected-output.log" 2>&1; then
  echo 'FAIL: TeX accepted an obsolete URJC identifier.' >&2
  exit 1
fi
grep -q "Unsupported degree identifier 'GII-URJC'" "$fixture/rejected-output.log"
printf 'PASS: %s non-UAH degrees; 80 LaTeX registry/conditional assertions.\n' "$checks"

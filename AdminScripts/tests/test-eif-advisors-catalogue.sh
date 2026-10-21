#!/usr/bin/env bash
# Group cover and catalogue checks in one isolated source tree.
set -euo pipefail
test_directory=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)
repository_root=$(cd -- "$test_directory/../.." && pwd)
query="$repository_root/Config/query-degree-registry.sh"
scope=${EIF_TEST_SCOPE:-all}
case $scope in all|covers|advisors|catalogue) ;; *) echo 'Invalid EIF_TEST_SCOPE' >&2; exit 2 ;; esac
fixture=$(mktemp -d)
trap 'rm -rf -- "$fixture"' EXIT
mkdir -p "$fixture/Book/appendix"
cp -a "$repository_root/Config" "$fixture/Config"
cp -a "$repository_root/Book/cover" "$repository_root/Book/logos" "$repository_root/Book/biblio" "$fixture/Book/"
cp "$repository_root/Book/appendix/titulaciones-soportadas.tex" "$fixture/Book/appendix/"
before=$(sha256sum "$repository_root/Config/myconfig.tex")
build() {
  local job=$1 source=$2 definitions=${3:-}
  for pass in 1 2; do
    (cd "$fixture/Book" && pdflatex -interaction=nonstopmode -halt-on-error -jobname="$job" \
      "$definitions\input{$test_directory/fixtures/$source.tex}") >"$fixture/build.log" 2>&1 || {
      tail -n 70 "$fixture/build.log" >&2; exit 1;
    }
  done
  pdftotext -layout "$fixture/Book/$job.pdf" "$fixture/text.txt"
  if [[ -n ${EIF_TEST_OUTPUT_DIR:-} ]]; then
    mkdir -p "$EIF_TEST_OUTPUT_DIR"
    cp "$fixture/Book/$job.pdf" "$EIF_TEST_OUTPUT_DIR/"
  fi
}
cover() {
  local job=$1 degree=$2 language=$3 split=$4 cotutor=$5 gender=$6
  build "$job" eif-advisors-cover \
    "\def\TestDegree{$degree}\def\TestLanguage{$language}\def\TestSplit{$split}\def\TestCotutor{$cotutor}\def\TestTutorGender{$gender}"
  if [[ $degree == *-EIF-URJC ]]; then
    ! grep -Eq 'Overfull \\hbox|Overfull \\vbox' "$fixture/Book/$job.log"
  fi
}
degrees=(GISAM GIST GIT GITT GIAA GIATA GIAVA GIA GIB GIRS GCID GP GFA)
if [[ $scope == all || $scope == covers ]]; then
for i in "${!degrees[@]}"; do
  degree=${degrees[$i]}-EIF-URJC
  [[ $(sh "$query" work-type "$degree") == TFG ]]
  [[ $(sh "$query" institution "$degree") == URJC ]]
  [[ $(sh "$query" layout-profile "$degree") == urjc-eif-tfg ]]
  language=spanish split=true gender=female cotutor='Nombre cotutora'
  ((i % 2 == 0)) || { language=english; split=false; gender=male; }
  ((i % 3 != 0)) || cotutor=''
  cover "$degree" "$degree" "$language" "$split" "$cotutor" "$gender"
  [[ $(pdfinfo "$fixture/Book/$degree.pdf" | awk '/^Pages:/ {print $2}') == 1 ]]
  grep -q 'ESCUELA DE INGENIERÍA DE FUENLABRADA' "$fixture/text.txt"
  grep -q 'Nombre tutora principal' "$fixture/text.txt"
  if [[ $language == english ]]; then
    grep -q 'BACHELOR THESIS' "$fixture/text.txt"
    grep -q 'Academic year:' "$fixture/text.txt"
    grep -q 'BACHELOR.S DEGREE IN' "$fixture/text.txt"
    if [[ -n $cotutor ]]; then grep -q 'Supervisors:' "$fixture/text.txt"; else grep -q 'Supervisor:' "$fixture/text.txt"; fi
  else
    grep -q 'TRABAJO FIN DE GRADO' "$fixture/text.txt"
    grep -q 'Curso académico:' "$fixture/text.txt"
    if [[ -n $cotutor ]]; then grep -q 'Tutoras:' "$fixture/text.txt"; else grep -q 'Tutora:' "$fixture/text.txt"; fi
  fi
  if [[ -n $cotutor ]]; then grep -q "$cotutor" "$fixture/text.txt"; else ! grep -q 'Nombre cotutora' "$fixture/text.txt"; fi
  echo "PASS: $degree ($language, split=$split)."
done
fi

# Exercise each changed layout branch, reusing outer+inner cover builds.
cases=(
  'tfg-split|GIEC|spanish|true|Nombre cotutora|female|Tutora:|Cotutora:'
  'tfg-group|GIEC|spanish|false|Nombre cotutora|female|Tutoras:|'
  'tfm-split|MUIT|spanish|true||female|Directora:|'
  'tfm-group|MUII|spanish|false|Nombre cotutora|female|Directoras:|'
  'tfg-english|GIEC|english|true|Nombre cotutora|male|Advisor:|Co-advisor:'
  'tfm-english|MUIT|english|false|Nombre cotutora|male|Advisors:|'
  'mucte-split|MUCTE|spanish|true|Nombre cotutora|female|Directora:|Codirectora:'
  'mucte-group|MUCTE|spanish|false|Nombre cotutora|female|Directoras:|'
  'escet-group|ITI-ESCET-URJC|spanish|false|Nombre cotutora|female|Tutoras:|'
)
if [[ $scope == all || $scope == advisors ]]; then
for spec in "${cases[@]}"; do
  IFS='|' read -r job degree language split cotutor gender label co_label <<<"$spec"
  cover "$job" "$degree" "$language" "$split" "$cotutor" "$gender"
  grep -q "$label" "$fixture/text.txt"
  [[ -z $co_label ]] || grep -q "$co_label" "$fixture/text.txt"
  if [[ -z $cotutor ]]; then
    ! grep -Eqi 'cotutora|codirectora|co-advisor' "$fixture/text.txt"
    ! grep -q 'Dña\.' "$fixture/text.txt" || [[ $(grep -o 'Dña\.' "$fixture/text.txt" | wc -l) == 1 ]]
  fi
  echo "PASS: advisor layout $job."
done

if (cd "$fixture/Book" && pdflatex -interaction=nonstopmode -halt-on-error -jobname=invalid \
  "\def\TestDegree{GIEC}\def\TestLanguage{spanish}\def\TestSplit{invalid}\def\TestCotutor{}\def\TestTutorGender{female}\input{$test_directory/fixtures/eif-advisors-cover.tex}") >"$fixture/invalid.log" 2>&1; then
  echo 'FAIL: invalid advisor flag was accepted.' >&2; exit 1
fi
grep -q "Invalid value 'invalid'" "$fixture/invalid.log"
fi
if [[ $scope == all || $scope == catalogue ]]; then
build catalogue degree-catalogue
! grep -Eq '^CATALOGUE: (GSI|IT|IE|ITTSE|ITTST|ITI|GEINTRARR)$' "$fixture/Book/catalogue.log"
grep -q 'not translated' "$fixture/text.txt"
grep -q 'Master.s Degree in' "$fixture/text.txt"
python3 - "$fixture/text.txt" <<'PY'
import re
import sys
from pathlib import Path
text = Path(sys.argv[1]).read_text()
text = re.sub(r'(\w)-\n\s*(\w)', r'\1\2', text)
text = ' '.join(text.split())
assert 'Aerospace Engineering in Air Transport and Airports' in text
assert 'Grado en Ciencias Ambientales (not translated).' in text
assert 'Sistemas Inteligentes (Master’s Degree' in text
assert 'Inglés:' not in text
PY
grep -q 'Modalidad de tesis por' "$fixture/text.txt"
[[ $(grep -c '\\contentsline {section}' "$fixture/Book/catalogue.toc") == 3 ]]
[[ $(grep -c '\\contentsline {subsection}' "$fixture/Book/catalogue.toc") == 5 ]]
while IFS= read -r degree; do
  type=$(sh "$query" work-type "$degree")
  case $type in TFG|TFM|PhD) ;; *) continue ;; esac
  [[ $degree != GSI ]] || continue
  grep -Fxq "CATALOGUE: $degree" "$fixture/Book/catalogue.log"
done < <(sh "$query" identifiers)
fi
cmp "$repository_root/Book/appendix/titulaciones-soportadas.tex" "$repository_root/Book/appendix/orig/titulaciones-soportadas.tex"
! grep -Eq '\\texttt\{GSI\}' "$repository_root/Book/chapters/configuracion.tex"
! grep -Eq '^%[[:space:]]+GSI[[:space:]]' "$repository_root/Config/myconfig.tex"
[[ $before == "$(sha256sum "$repository_root/Config/myconfig.tex")" ]]
echo "PASS: $scope checks, manual-copy consistency, configuration preservation and GSI exclusion."

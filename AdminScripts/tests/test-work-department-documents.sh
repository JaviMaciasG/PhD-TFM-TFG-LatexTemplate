#!/usr/bin/env bash
# Build representative real documents without touching the working tree.
set -euo pipefail
test_directory=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)
repository_root=$(cd -- "$test_directory/../.." && pwd)
fixture=$(mktemp -d)
trap 'rm -rf -- "$fixture"' EXIT
before=$(sha256sum "$repository_root/Config/myconfig.tex")
mkdir -p "$fixture/Book/diagrams" "$fixture/Anteproyecto" "$fixture/PapeleoTFG" "$fixture/PapeleoTFM"
cp -a "$repository_root/Config" "$fixture/Config"
cp -a "$repository_root/Book/cover" "$repository_root/Book/logos" "$repository_root/Book/biblio" "$fixture/Book/"
cp "$repository_root/Book/diagrams/Diagrama2.pdf" "$fixture/Book/diagrams/"
cp "$repository_root/Anteproyecto/anteproyecto.tex" "$fixture/Anteproyecto/"
cp "$repository_root/PapeleoTFG/"*.tex "$fixture/PapeleoTFG/"
cp "$repository_root/PapeleoTFM/"*.tex "$fixture/PapeleoTFM/"
cp "$test_directory/fixtures/work-department-urjc.tex" "$fixture/Book/urjc.tex"
sed -i \
  -e 's/\\newcommand{\\myDepartment}{[^}]*}/\\newcommand{\\myDepartment}{WorkDeptES}/' \
  -e 's/\\newcommand{\\myDepartmentEnglish}{[^}]*}/\\newcommand{\\myDepartmentEnglish}{WorkDeptEN}/' \
  -e 's/\\newcommand{\\myAcademicTutorDepartment}{[^}]*}/\\newcommand{\\myAcademicTutorDepartment}{TutorDept}/' \
  -e 's/\\newcommand{\\myCoTutorDepartment}{[^}]*}/\\newcommand{\\myCoTutorDepartment}{CotutorDept}/' \
  -e 's/\\newcommand{\\myCoTutorFullName}{[^}]*}/\\newcommand{\\myCoTutorFullName}{Cotutora de prueba}/' \
  "$fixture/Config/myconfig.tex"

build() {
  local directory=$1 source=$2 expected=$3 job=${2%.tex}
  if ! (cd "$fixture/$directory" && latexmk -pdf -interaction=nonstopmode -halt-on-error \
      -r ../Config/latexmkrc "$source") > "$fixture/build.log" 2>&1; then
    tail -n 60 "$fixture/build.log" >&2
    exit 1
  fi
  pdftotext -layout "$fixture/$directory/$job.pdf" "$fixture/document.txt"
  grep -Fq "$expected" "$fixture/document.txt"
  if [[ $expected == WorkDeptES ]]; then
    if grep -Eq 'TutorDept|CotutorDept' "$fixture/document.txt"; then
      echo "FAIL: advisor department leaked into $source" >&2
      exit 1
    fi
  elif grep -q 'WorkDeptES' "$fixture/document.txt"; then
    echo "FAIL: work department used in advisor-specific field in $source" >&2
    exit 1
  fi
  if [[ -n ${WORK_DEPARTMENT_TEST_OUTPUT_DIR:-} ]]; then
    mkdir -p "$WORK_DEPARTMENT_TEST_OUTPUT_DIR"
    cp "$fixture/$directory/$job.pdf" "$WORK_DEPARTMENT_TEST_OUTPUT_DIR/$job.pdf"
  fi
  printf 'PASS: %s/%s uses %s\n' "$directory" "$source" "$expected"
}

for spec in \
  'Anteproyecto|anteproyecto.tex|GIEC|WorkDeptES' \
  'PapeleoTFG|TFG-AnexoIX-ActaYRubricaDefensa-EPS-UAH.tex|GIEC|TutorDept' \
  'PapeleoTFM|TFM-AnexoXI-ActaYRubricaDefensa-EPS-UAH.tex|MUIE|WorkDeptES' \
  'PapeleoTFG|TFG-AnexoV-ConvenioCooperacion-EPS-UAH.tex|GIEC|TutorDept' \
  'PapeleoTFM|TFM-AnexoI-ConvenioCooperacion-EPS-UAH.tex|MUIE|TutorDept' \
  'PapeleoTFM|TFM-AnexoXII-AutorizacionPublicarAbierto.tex|MUIE|TutorDept' \
  'PapeleoTFM|TFM-AnexoV-SolicitudCambioTFM-EPS-UAH.tex|MUIE|TutorDept'; do
  IFS='|' read -r directory source degree expected <<< "$spec"
  sed -i "s/\\\\newcommand{\\\\myDegree}{[^}]*}/\\\\newcommand{\\\\myDegree}{$degree}/" "$fixture/Config/myconfig.tex"
  build "$directory" "$source" "$expected"
done

for language in spanish english; do
  job="urjc-$language"
  for pass in 1 2; do
    (cd "$fixture/Book" && pdflatex -interaction=nonstopmode -halt-on-error -jobname="$job" \
      "\def\DepartmentTestLanguage{$language}\input{urjc.tex}") > "$fixture/urjc.log" 2>&1 || { tail -n 50 "$fixture/urjc.log" >&2; exit 1; }
  done
  pdftotext -layout "$fixture/Book/$job.pdf" "$fixture/urjc.txt"
  expected=WorkDeptES
  [[ $language != english ]] || expected=WorkDeptEN
  grep -Fq "$expected" "$fixture/urjc.txt"
  if grep -q 'Temporary page!' "$fixture/urjc.txt"; then exit 1; fi
  if grep -Eq 'TutorDept|CotutorDept' "$fixture/urjc.txt"; then exit 1; fi
  if [[ -n ${WORK_DEPARTMENT_TEST_OUTPUT_DIR:-} ]]; then cp "$fixture/Book/$job.pdf" "$WORK_DEPARTMENT_TEST_OUTPUT_DIR/"; fi
  printf 'PASS: URJC %s work-location statement\n' "$language"
done
[[ $before == "$(sha256sum "$repository_root/Config/myconfig.tex")" ]]

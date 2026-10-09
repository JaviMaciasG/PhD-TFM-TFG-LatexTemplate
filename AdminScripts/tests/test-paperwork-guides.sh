#!/usr/bin/env bash
# Check guide inventories and build integration without compiling personal forms.
set -euo pipefail

repository_root=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/../.." && pwd)
cd "$repository_root"
checks=0
temporary_directory=$(mktemp -d)
trap 'rm -rf "$temporary_directory"' EXIT

check_contains() {
  local needle=$1 file=$2
  if ! grep -Fq -- "$needle" "$file"; then
    printf 'FAIL: %s does not mention %s\n' "$file" "$needle" >&2
    exit 1
  fi
  checks=$((checks + 1))
}

for kind in tfg tfm; do
  component="Papeleo${kind^^}"
  guide="guia-papeleo-${kind}-eps-uah"
  source="$component/$guide.tex"
  expected=8
  [[ $kind == tfm ]] && expected=6

  documents=$(make --no-print-directory -s -C "$component" \
    --eval='print-guide-inventory:;@printf "%s\n" $(DOCUMENTS)' print-guide-inventory)
  actual=0
  while IFS= read -r document; do
    check_contains "\\fichero{$document.tex}" "$source"
    actual=$((actual + 1))
  done <<< "$documents"
  [[ $actual -eq $expected ]] || { echo "FAIL: unexpected $kind form inventory: $actual" >&2; exit 1; }
  checks=$((checks + 1))

  if grep -Eq '^\\(input|include)[{[:space:]]' "$source"; then
    echo "FAIL: the generic guide must not load personal configuration or shared form sources" >&2
    exit 1
  fi
  checks=$((checks + 1))
  for variable in myAuthorGender myAcademicTutorGender myCoTutorGender; do
    check_contains "\\variable{$variable}" "$source"
  done
  if grep -Fq 'make guia' "$source"; then
    echo "FAIL: user guides must not advertise maintainer compilation targets" >&2
    exit 1
  fi
  checks=$((checks + 1))
  check_contains '\subsection{Casillas configurables y casillas fijas}' "$source"
  check_contains '\variable{myAuthorizationOpenPublishing}' "$source"
  check_contains '\variable{myTribunalMHProposal}' "$source"
  check_contains '\texttt{YES}' "$source"
  check_contains '\texttt{NO}' "$source"
  check_contains "Guía del papeleo disponible para los ${kind^^}s en la EPS-UAH" "$source"
  check_contains '\tableofcontents' "$source"
  check_contains '\setcounter{tocdepth}{1}' "$source"
  check_contains '\sethlcolor{yellow}' "$source"
  check_contains '\hl{N/D}' "$source"
  if grep -Fq 'N/A' "$source"; then
    echo "FAIL: Spanish guides must use N/D instead of N/A" >&2
    exit 1
  fi
  checks=$((checks + 1))
  check_contains '\verb|$\XBox$|' "$source"
  check_contains '\verb|$\Box$|' "$source"
  check_contains 'debes editar este fichero e intercambiar' "$source"
  check_contains "make -C $component guia" AdminScripts/go.build-distribution.sh
  check_contains "$component/$guide.tex" AdminScripts/go.build-distribution.sh
  check_contains "$component/$guide.pdf" AdminScripts/go.build-distribution.sh
  for manual in Book/chapters/documentos-complementarios.tex Book/chapters/orig/documentos-complementarios.tex; do
    check_contains "$component/$guide.pdf" "$manual"
  done
  default_build=$(make --no-print-directory -n -C "$component" all)
  [[ $default_build != *"$guide.tex"* ]] || { echo "FAIL: default form generation builds the guide" >&2; exit 1; }
  guide_build=$(make --no-print-directory -n -C "$component" guia)
  [[ $guide_build == *"$guide.tex"* ]] || { echo "FAIL: missing guide build rule" >&2; exit 1; }
  checks=$((checks + 2))

  # Simulate the PDF-only guide shipped in user distributions.
  mkdir -p "$temporary_directory/$component"
  cp "$component/Makefile" "$temporary_directory/$component/Makefile"
  touch "$temporary_directory/$component/$guide.pdf"
  make --no-print-directory -s -C "$temporary_directory/$component" \
    LATEX_CONFIG_DIR="$repository_root/Config" guia
  for target in clean cleanall; do
    cleanup=$(make --no-print-directory -n -C "$temporary_directory/$component" \
      LATEX_CONFIG_DIR="$repository_root/Config" "$target")
    [[ $cleanup != *"$guide"* ]] || { echo "FAIL: $target touches the PDF-only guide" >&2; exit 1; }
  done
  checks=$((checks + 3))
done

check_contains 'printf '\''%s\n'\'' "${guide_pdfs[@]}" >> "$manifest"' AdminScripts/go.build-distribution.sh
check_contains 'TODO "${guide_sources[@]}"; do' AdminScripts/go.build-distribution.sh
for form in PapeleoTFG/TFG-ConvenioCooperacion-EPS-UAH.tex \
  PapeleoTFM/TFM-AnexoI-ConvenioCooperacion-EPS-UAH.tex \
  PapeleoTFM/TFM-AnexoV-SolicitudCambioTFM-EPS-UAH.tex; do
  check_contains '\newcommand{\AnnexNA}{\hl{N/D}}' "$form"
  check_contains '\sethlcolor{yellow}' "$form"
done

check_contains '\variable{myResearchVicerrectorGender}' PapeleoTFG/guia-papeleo-tfg-eps-uah.tex
check_contains '\variable{myTribunalAlternateMemberGender}' PapeleoTFG/guia-papeleo-tfg-eps-uah.tex
check_contains '\variable{myAuthorizationOpenPublishingEmbargoMonths}' PapeleoTFM/guia-papeleo-tfm-eps-uah.tex
check_contains '\variable{myConfidentialContent}' PapeleoTFM/guia-papeleo-tfm-eps-uah.tex
check_contains 'quedan vacías todas las opciones de embargo' PapeleoTFM/guia-papeleo-tfm-eps-uah.tex
check_contains 'no en las de confidencialidad' PapeleoTFM/guia-papeleo-tfm-eps-uah.tex
check_contains 'no interviene en este formulario' PapeleoTFG/guia-papeleo-tfg-eps-uah.tex
check_contains 'anexo VIII / anexo 4' PapeleoTFM/guia-papeleo-tfm-eps-uah.tex
check_contains 'paperwork-guides' Documentation/Makefile
check_contains '\equal{\myDegree}{MUII}' PapeleoTFM/TFM-VistoBuenoTutor.tex
check_contains '\texttt{MUIT} y \texttt{MUII}' PapeleoTFM/guia-papeleo-tfm-eps-uah.tex
bash -n AdminScripts/go.build-distribution.sh
printf 'PASS: %s paperwork-guide checks\n' "$checks"

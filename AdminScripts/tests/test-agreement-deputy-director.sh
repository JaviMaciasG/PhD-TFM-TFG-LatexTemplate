#!/usr/bin/env bash
# Compile UAH agreements with named and unnamed school deputy directors.
set -euo pipefail
repository_root=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/../.." && pwd)
fixture=$(mktemp -d)
trap 'rm -rf -- "$fixture"' EXIT
trap 'printf "FAIL: line %s (%s): %s\n" "$LINENO" "${spec:-setup}" "$BASH_COMMAND" >&2' ERR
before=$(sha256sum "$repository_root/Config/myconfig.tex")
mkdir -p "$fixture/Book" "$fixture/PapeleoTFG" "$fixture/PapeleoTFM"
cp -a "$repository_root/Config" "$fixture/Config"
cp -a "$repository_root/Book/biblio" "$fixture/Book/"
ln -s "$repository_root/Book/logos" "$fixture/Book/logos"
for kind in TFG TFM; do
  cp "$repository_root/Papeleo$kind/Makefile" "$fixture/Papeleo$kind/"
  cp "$repository_root/Papeleo$kind/"*ConvenioCooperacion*.tex "$fixture/Papeleo$kind/"
  cp "$repository_root/Papeleo$kind/$kind-GuiaPapeleo-EPS-UAH.tex" "$fixture/Papeleo$kind/"
done
cases=(
  'male|'
  'female|'
  'male|Nombre y apellidos de prueba'
  'female|Nombre compuesto y primer apellido y segundo apellido de prueba'
)
for spec in "${cases[@]}"; do
  IFS='|' read -r gender name <<< "$spec"
  for kind in TFG TFM; do
    degree=GIEC
    document=TFG-ConvenioCooperacion-EPS-UAH
    if [[ $kind == TFM ]]; then
      degree=MUIT
      document=TFM-AnexoI-ConvenioCooperacion-EPS-UAH
    fi
    sed \
      -e "s/\\\\newcommand{\\\\myDegree}{[^}]*}/\\\\newcommand{\\\\myDegree}{$degree}/" \
      -e 's/\\newcommand{\\myLanguage}{[^}]*}/\\newcommand{\\myLanguage}{spanish}/' \
      -e "s/\\\\newcommand{\\\\mySchoolDeputyDirectorFullName}{[^}]*}/\\\\newcommand{\\\\mySchoolDeputyDirectorFullName}{$name}/" \
      -e "s/\\\\newcommand{\\\\mySchoolDeputyDirectorGender}{[^}]*}/\\\\newcommand{\\\\mySchoolDeputyDirectorGender}{$gender}/" \
      "$repository_root/Config/myconfig.tex" > "$fixture/Config/myconfig.tex"
    if ! make -s -C "$fixture/Papeleo$kind" "$document.pdf" > "$fixture/build.log" 2>&1; then
      tail -n 80 "$fixture/build.log" >&2
      exit 1
    fi
    pdf="$fixture/Papeleo$kind/$document.pdf"
    [[ $(pdfinfo "$pdf" | awk '/^Pages:/ {print $2}') == 1 ]]
    if grep -Eq 'Overfull \\hbox|Overfull \\vbox' "${pdf%.pdf}.log"; then
      echo "FAIL: overflowing $kind agreement ($spec)" >&2
      exit 1
    fi
    pdftotext -layout "$pdf" - | tr '\n\f' '  ' | sed 's/[[:space:]]\+/ /g' > "$fixture/form.txt"
    role=Subdirector
    [[ $gender == male ]] || role=Subdirectora
    grep -Fq "$role de la" "$fixture/form.txt"
    grep -Fq 'Escuela Politécnica Superior' "$fixture/form.txt"
    ! grep -Eq 'Coordinador (TFG|TFM)|Subdirector/a' "$fixture/form.txt"
    if [[ -n $name ]]; then
      grep -Fq "$name" "$fixture/form.txt"
    fi
    if [[ -n ${AGREEMENT_DEPUTY_TEST_OUTPUT_DIR:-} ]]; then
      mkdir -p "$AGREEMENT_DEPUTY_TEST_OUTPUT_DIR"
      label=empty
      [[ -z $name ]] || label=named
      cp "$pdf" "$AGREEMENT_DEPUTY_TEST_OUTPUT_DIR/$kind-$gender-$label.pdf"
    fi
    printf 'PASS: %s / %s / %s\n' "$kind" "$gender" "${name:-empty name}"
  done
done
for kind in TFG TFM; do
  if ! make -s -C "$fixture/Papeleo$kind" guia > "$fixture/guide.log" 2>&1; then
    tail -n 80 "$fixture/guide.log" >&2
    exit 1
  fi
  if [[ -n ${AGREEMENT_DEPUTY_TEST_OUTPUT_DIR:-} ]]; then
    cp "$fixture/Papeleo$kind/$kind-GuiaPapeleo-EPS-UAH.pdf" "$AGREEMENT_DEPUTY_TEST_OUTPUT_DIR/"
  fi
done
[[ $before == "$(sha256sum "$repository_root/Config/myconfig.tex")" ]]
echo 'PASS: both guides compile; user configuration unchanged'

#!/usr/bin/env bash
# Verify the external co-tutor wording without changing user configuration.
set -euo pipefail

repository_root=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/../.." && pwd)
fixture=$(mktemp -d)
trap 'rm -rf -- "$fixture"' EXIT
trap 'printf "FAIL: line %s (%s): %s\n" "$LINENO" "${spec:-setup}" "$BASH_COMMAND" >&2' ERR
before=$(sha256sum "$repository_root/Config/myconfig.tex")
mkdir -p "$fixture/Book" "$fixture/PapeleoTFG"
cp -a "$repository_root/Config" "$fixture/Config"
cp -a "$repository_root/Book/biblio" "$fixture/Book/"
ln -s "$repository_root/Book/logos" "$fixture/Book/logos"
cp "$repository_root/PapeleoTFG/Makefile" \
  "$repository_root/PapeleoTFG/TFG-AnexoV-ConvenioCooperacion-EPS-UAH.tex" \
  "$repository_root/PapeleoTFG/TFG-GuiaPapeleo-EPS-UAH.tex" \
  "$fixture/PapeleoTFG/"

document=TFG-AnexoV-ConvenioCooperacion-EPS-UAH
cases=(
  'male|female|present|spanish'
  'female|male|present|spanish'
  'female|male|present|english'
  'male|female|absent|spanish'
)
for spec in "${cases[@]}"; do
  IFS='|' read -r cotutor tutor presence language <<< "$spec"
  name='Persona externa de prueba'
  [[ $presence == present ]] || name=''
  sed \
    -e 's/\\newcommand{\\myDegree}{[^}]*}/\\newcommand{\\myDegree}{GIEC}/' \
    -e "s/\\\\newcommand{\\\\myLanguage}{[^}]*}/\\\\newcommand{\\\\myLanguage}{$language}/" \
    -e "s/\\\\newcommand{\\\\myAcademicTutorGender}{[^}]*}/\\\\newcommand{\\\\myAcademicTutorGender}{$tutor}/" \
    -e "s/\\\\newcommand{\\\\myCoTutorGender}{[^}]*}/\\\\newcommand{\\\\myCoTutorGender}{$cotutor}/" \
    -e "s/\\\\newcommand{\\\\myCoTutorFullName}{[^}]*}/\\\\newcommand{\\\\myCoTutorFullName}{$name}/" \
    "$repository_root/Config/myconfig.tex" > "$fixture/Config/myconfig.tex"
  if ! make -s -C "$fixture/PapeleoTFG" "$document.pdf" > "$fixture/build.log" 2>&1; then
    tail -n 80 "$fixture/build.log" >&2
    exit 1
  fi
  pdf="$fixture/PapeleoTFG/$document.pdf"
  [[ $(pdfinfo "$pdf" | awk '/^Pages:/ {print $2}') == 1 ]]
  if grep -Eq 'Overfull \\[hv]box' "${pdf%.pdf}.log"; then
    echo "FAIL: overflowing agreement ($spec)" >&2
    exit 1
  fi
  pdftotext -layout "$pdf" - | tr '\n\f' '  ' | sed 's/[[:space:]]\+/ /g' > "$fixture/form.txt"
  role=cotutor
  article=El
  [[ $cotutor == male ]] || { role=cotutora; article=La; }
  grep -Fq "Datos de la persona de contacto (${role^})" "$fixture/form.txt"
  grep -Fq "$article $role de la entidad realizará" "$fixture/form.txt"
  grep -Fq "$article $role de la entidad recibirá" "$fixture/form.txt"
  grep -Fq "${role^} de TFG en la entidad" "$fixture/form.txt"
  academic='del tutor'
  [[ $tutor == male ]] || academic='de la tutora'
  grep -Fq "Datos $academic en la Universidad de Alcalá" "$fixture/form.txt"
  if grep -Eq 'contacto \(Tutor\)|El tutor de la entidad|El tutor/a de la entidad' "$fixture/form.txt"; then
    echo "FAIL: obsolete external tutor wording ($spec)" >&2
    exit 1
  fi
  if [[ $presence == present ]]; then
    grep -Fq "$name" "$fixture/form.txt"
    present_na_count=$(grep -oF 'N/D' "$fixture/form.txt" | wc -l)
  else
    if grep -Fq 'Persona externa de prueba' "$fixture/form.txt"; then
      echo 'FAIL: absent co-tutor name was rendered' >&2
      exit 1
    fi
    # Entity (title and table), contact name, position, DNI, email and signature.
    [[ $(grep -oF 'N/D' "$fixture/form.txt" | wc -l) -eq $((present_na_count + 7)) ]]
  fi
  if [[ -n ${TFG_COTUTOR_TEST_OUTPUT_DIR:-} ]]; then
    mkdir -p "$TFG_COTUTOR_TEST_OUTPUT_DIR"
    cp "$pdf" "$TFG_COTUTOR_TEST_OUTPUT_DIR/${spec//|/-}.pdf"
  fi
  printf 'PASS: %s\n' "$spec"
done

make -s -C "$fixture/PapeleoTFG" guia > "$fixture/guide.log" 2>&1 || {
  tail -n 80 "$fixture/guide.log" >&2
  exit 1
}
if [[ -n ${TFG_COTUTOR_TEST_OUTPUT_DIR:-} ]]; then
  cp "$fixture/PapeleoTFG/TFG-GuiaPapeleo-EPS-UAH.pdf" "$TFG_COTUTOR_TEST_OUTPUT_DIR/"
fi
[[ $before == "$(sha256sum "$repository_root/Config/myconfig.tex")" ]]
echo 'PASS: guide compilation and unchanged user configuration'

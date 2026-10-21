#!/usr/bin/env bash
# Verify TFM role labels and student articles without changing user configuration.
set -euo pipefail

repository_root=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/../.." && pwd)
fixture=$(mktemp -d)
trap 'rm -rf -- "$fixture"' EXIT
trap 'printf "FAIL: line %s (%s): %s\n" "$LINENO" "${spec:-setup}" "$BASH_COMMAND" >&2' ERR
before=$(sha256sum "$repository_root/Config/myconfig.tex")
mkdir -p "$fixture/PapeleoTFM" "$fixture/Book"
cp -a "$repository_root/Config" "$fixture/Config"
cp -a "$repository_root/Book/biblio" "$fixture/Book/"
ln -s "$repository_root/Book/logos" "$fixture/Book/logos"
cp "$repository_root"/PapeleoTFM/*.tex "$repository_root/PapeleoTFM/Makefile" "$fixture/PapeleoTFM/"

cases=(
  'male|male|absent|male|spanish'
  'female|female|absent|female|spanish'
  'female|female|present|female|spanish'
  'male|male|present|male|spanish'
  'female|male|present|female|english'
  'male|female|present|male|english'
)
for spec in "${cases[@]}"; do
  IFS='|' read -r student director coadvisor codirector language <<< "$spec"
  coadvisor_name='Nombre de codireccion'
  [[ $coadvisor == present ]] || coadvisor_name=''
  sed \
    -e 's/\\newcommand{\\myDegree}{[^}]*}/\\newcommand{\\myDegree}{MUIT}/' \
    -e "s/\\\\newcommand{\\\\myLanguage}{[^}]*}/\\\\newcommand{\\\\myLanguage}{$language}/" \
    -e "s/\\\\newcommand{\\\\myAuthorGender}{[^}]*}/\\\\newcommand{\\\\myAuthorGender}{$student}/" \
    -e "s/\\\\newcommand{\\\\myAcademicTutorGender}{[^}]*}/\\\\newcommand{\\\\myAcademicTutorGender}{$director}/" \
    -e "s/\\\\newcommand{\\\\myCoTutorGender}{[^}]*}/\\\\newcommand{\\\\myCoTutorGender}{$codirector}/" \
    -e "s/\\\\newcommand{\\\\myCoTutorFullName}{[^}]*}/\\\\newcommand{\\\\myCoTutorFullName}{$coadvisor_name}/" \
    "$repository_root/Config/myconfig.tex" > "$fixture/Config/myconfig.tex"
  if ! make -s -j 4 -C "$fixture/PapeleoTFM" all > "$fixture/build.log" 2>&1; then
    tail -n 80 "$fixture/build.log" >&2
    exit 1
  fi
  for pdf in "$fixture/PapeleoTFM"/*.pdf; do
    pdftotext -layout "$pdf" - | tr '\n\f' '  ' | sed 's/[[:space:]]\+/ /g' > "${pdf%.pdf}.txt"
    if grep -Eiq '\b(alumn[oa]s?|tutor(a|es|as)?|cotutor(a|es|as)?)\b' "${pdf%.pdf}.txt"; then
      echo "FAIL: obsolete person label in $pdf ($spec)" >&2
      exit 1
    fi
  done
  student_article=del
  student_subject=El
  [[ $student == male ]] || { student_article='de la'; student_subject=La; }
  director_role=director
  [[ $director == male ]] || director_role=directora
  codirector_role=codirector
  [[ $codirector == male ]] || codirector_role=codirectora
  control="$fixture/PapeleoTFM/TFM-AnexoVII-HojaControlAnteproyecto-EPS-UAH.txt"
  change="$fixture/PapeleoTFM/TFM-AnexoV-SolicitudCambioTFM-EPS-UAH.txt"
  [[ $(pdfinfo "${change%.txt}.pdf" | awk '/^Pages:/ {print $2}') == 1 ]]
  grep -Fq 'Fdo.:' "$change"
  approval="$fixture/PapeleoTFM/TFM-VistoBuenoTutor.txt"
  agreement="$fixture/PapeleoTFM/TFM-AnexoI-ConvenioCooperacion-EPS-UAH.txt"
  grep -Eq "Datos personales $student_article estudiante" "$control"
  grep -Eq "Datos $student_article estudiante" "$change"
  acta="$fixture/PapeleoTFM/TFM-ActaYRubricaDefensa-EPS-UAH.txt"
  grep -Fq "$student_subject estudiante que, habiendo sido propuesto para Matrícula de Honor" "$acta"
  grep -Fq 'Título de Máster' "$acta"
  grep -Fq 'las Matrículas de Honor no afectan al cálculo de la media' "$acta"
  ! grep -Eq 'renuncia voluntariamente|Título de Graduado|El Tribunal podrá proponer' "$acta"
  grep -Eq "Datos .* $director_role en la Universidad" "$agreement"
  grep -Eq 'Subdirector(a)? de la' "$agreement"
  ! grep -q 'Coordinador TFM' "$agreement"
  director_article=del
  codirector_article=del
  academic=académico
  [[ $director == male ]] || { director_article='de la'; academic=académica; }
  [[ $codirector == male ]] || codirector_article='de la'
  grep -q "Datos $director_article $director_role $academic" "$change"
  grep -q "Datos $codirector_article $codirector_role" "$change"
  grep -q "${director_role^^}" "$control"
  if [[ $coadvisor == present ]]; then
    grep -q 'directores del Trabajo' "$approval"
    grep -q 'dan su conformidad' "$approval"
    grep -q "${codirector_role^^}" "$control"
    grep -q "$codirector_role de la entidad recibirá" "$agreement"
  else
    grep -q "$director_role del Trabajo" "$approval"
    grep -q 'da su conformidad' "$approval"
    ! grep -q 'CODIRECTOR' "$control"
  fi
  if [[ -n ${TFM_WORDING_TEST_OUTPUT_DIR:-} ]]; then
    destination="$TFM_WORDING_TEST_OUTPUT_DIR/${spec//|/-}"
    mkdir -p "$destination"
    cp "$fixture/PapeleoTFM"/*.pdf "$destination/"
  fi
  printf 'PASS: %s\n' "$spec"
done
if ! make -s -C "$fixture/PapeleoTFM" guia > "$fixture/guide.log" 2>&1; then
  tail -n 80 "$fixture/guide.log" >&2
  exit 1
fi
if [[ -n ${TFM_WORDING_TEST_OUTPUT_DIR:-} ]]; then
  cp "$fixture/PapeleoTFM/TFM-GuiaPapeleo-EPS-UAH.pdf" "$TFM_WORDING_TEST_OUTPUT_DIR/"
fi
[[ $before == "$(sha256sum "$repository_root/Config/myconfig.tex")" ]]
echo 'PASS: guide compilation and unchanged user configuration'

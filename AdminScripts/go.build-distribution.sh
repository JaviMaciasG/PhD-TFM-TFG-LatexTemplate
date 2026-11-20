#!/usr/bin/env bash
set -euo pipefail

repository_root=$(git rev-parse --show-toplevel)
cd "$repository_root"
command -v pymupdf >/dev/null 2>&1 || {
  echo "ERROR: pymupdf is required to generate the distribution; install or enable it in PATH first." >&2
  exit 1
}
release=$(tr -d '\r\n' < RELEASE.txt)
if [[ -z $release || $release == */* || $release == *' '* ]]; then
  echo "ERROR: RELEASE.txt must contain one non-empty, filename-safe release identifier." >&2
  exit 1
fi
command -v pandoc >/dev/null 2>&1 || { echo "ERROR: pandoc is required to render the typesetting guide for the distribution." >&2; exit 1; }
[[ -f README.pdf ]] || { echo "ERROR: README.pdf is missing; run make README.pdf first." >&2; exit 1; }
[[ -f TYPESETTING-STYLES-COMPARISON.pdf ]] || { echo "ERROR: TYPESETTING-STYLES-COMPARISON.pdf is missing; run make -C Documentation first." >&2; exit 1; }
project_readme=Documentation/es/README-PROYECTO.md
[[ -s $project_readme ]] || { echo "ERROR: project README template is missing or empty: $project_readme" >&2; exit 1; }

guide_sources=(
  PapeleoTFG/TFG-GuiaPapeleo-EPS-UAH.tex
  PapeleoTFM/TFM-GuiaPapeleo-EPS-UAH.tex
)
guide_pdfs=("${guide_sources[@]/%.tex/.pdf}")
# Include essential sources when testing a release before they are committed.
reference_sources=(
  Book/abstract/summary-pages.tex
  Book/appendix/titulaciones-soportadas.tex
  Book/appendix/orig/titulaciones-soportadas.tex
  Book/cover/urjc/portada-tfg-eif-urjc.tex
  Book/cover/upm/portada-pfg-etsist-upm.tex
  Book/logos/upm/logo-tfgs-etsist-upm.png
  Book/cover/upm/portada-tfg-etsii-upm.tex
  Book/cover/upm/backpage-tfg-etsii-upm.tex
  Book/cover/upm/imagen-portada-tfg-etsii-upm.png
  Book/cover/upm/imagen-contraportada-tfg-etsii-upm.png
  Book/cover/upm/portada-tfm-etsii-upm.tex
  Book/cover/upm/backpage-tfm-etsii-upm.tex
  Book/cover/upm/imagen-portada-tfm-etsii-upm.png
  Book/cover/uclm/portada-tfg-eiia-uclm.tex
  Book/cover/uclm/credits-tfg-eiia-uclm.tex
  Book/cover/us/portada-phd-etsii-us.tex
  Book/cover/us/portada-tfg-etsii-us.tex
  Book/cover/us/portada-tfm-miscdg-etsii-us.tex
  Book/logos/us/escudo-trp.png
  Book/logos/us/logo-ETSII-US-Horizontal-Color.png
  Book/logos/us/logo-miscdg-us.png
  Book/logos/us/MISCDG-LICENSE.txt
  Book/logos/uclm/Logo_UCLM_2025_b.pdf
  Book/logos/uclm/Logo_EIIA_2024_b.pdf
  Book/logos/uclm/Logo_UCLM_2025.pdf
  Book/logos/uclm/Logo_EIIA_2024.pdf
  Config/institution-styles/uclm.tex
  Config/institution-styles/us.tex
)
# Build these generic guides even when this script is invoked without make distrib.
make -C PapeleoTFG guia
make -C PapeleoTFM guia

base="03-PhDTFMTFG-LaTeX-Template-UAH-$release"
temporary_directory=$(mktemp -d)
trap 'rm -rf "$temporary_directory"' EXIT
stage="$temporary_directory/stage"
manifest="$temporary_directory/manifest"
mkdir -p "$stage"
pandoc Documentation/es/TYPESETTING-STYLES-GUIDE.md -t pdf \
  -o "$stage/04-TYPESETTING-STYLES-GUIDE.pdf" --metadata lang=es \
  --variable urlcolor=blue --highlight-style kate -V colorlinks -V papersize:a4 \
  -V geometry:"top=2cm, bottom=1.5cm, left=2cm, right=2cm"

{
  printf '%s\n' \
    .gitignore \
    .latexmkrc \
    LICENSE \
    Makefile \
    RELEASE.txt \
    sync-git-sources.sh
  printf '%s\n' "${reference_sources[@]}"
  git ls-files -- Anteproyecto Book Config PapeleoTFG PapeleoTFM
} | while IFS= read -r file; do
  case "$file" in
    TODO|*/TODO|Book/slides/*|Documentation/*|Config/myconfig-phd.tex|Config/preamble-slides.tex|PapeleoTFG/TFG-GuiaPapeleo-EPS-UAH.tex|PapeleoTFM/TFM-GuiaPapeleo-EPS-UAH.tex) continue ;;
    *.pdf)
      case "$file" in
        PapeleoTFG/TFG-GuiaPapeleo-EPS-UAH.pdf|PapeleoTFM/TFM-GuiaPapeleo-EPS-UAH.pdf) ;;
        Book/additional/*.pdf|Book/cover/*.pdf|Book/cover/*/*.pdf|Book/diagrams/*.pdf|Book/figures/*.pdf|Book/letters/*.pdf|Book/logos/*.pdf|Book/logos/*/*.pdf|Book/logos/*/*/*.pdf|Book/portadaTFGs/*.pdf|Book/publications/*.pdf) ;;
        *) continue ;;
      esac
      ;;
  esac
  printf '%s\n' "$file"
done > "$manifest"
printf '%s\n' README.pdf TYPESETTING-STYLES-COMPARISON.pdf >> "$manifest"
# Generated PDFs are intentionally ignored by Git; list the guides explicitly.
printf '%s\n' "${guide_pdfs[@]}" >> "$manifest"
LC_ALL=C sort -u -o "$manifest" "$manifest"

while IFS= read -r file; do
  [[ -f $file ]] || { echo "ERROR: distribution source is missing: $file" >&2; exit 1; }
  mkdir -p -- "$(dirname "$stage/$file")"
  cp -p -- "$file" "$stage/$file"
done < "$manifest"

# Freeze the catalogue in both manual copies before validating or archiving them.
appendices=(Book/appendix/titulaciones-soportadas.tex Book/appendix/orig/titulaciones-soportadas.tex)
for appendix in "${appendices[@]}"; do
  cp -- "$stage/$appendix" "$temporary_directory/${appendix//\//-}.source"
done
echo "Exporting the supported-degrees appendix..."
bash AdminScripts/export-degree-catalogue.sh --root "$stage" \
  "$stage/Book/appendix/titulaciones-soportadas.tex" \
  "$stage/Book/appendix/orig/titulaciones-soportadas.tex"

# Students receive a project README, not the upstream repository introduction.
cp -p -- "$project_readme" "$stage/README.md"
mv "$stage/README.pdf" "$stage/00-README.pdf"
mv "$stage/TYPESETTING-STYLES-COMPARISON.pdf" "$stage/02-TYPESETTING-STYLES-COMPARISON.pdf"

for required_file in README.md 00-README.pdf 02-TYPESETTING-STYLES-COMPARISON.pdf RELEASE.txt Makefile 04-TYPESETTING-STYLES-GUIDE.pdf sync-git-sources.sh Book/book.tex Book/abstract/summary-pages.tex Config/myconfig.tex "${guide_pdfs[@]}"; do
  [[ -f $stage/$required_file ]] || { echo "ERROR: required distribution file is missing: $required_file" >&2; exit 1; }
done

for forbidden_path in AdminScripts Deprecated Documentation normativas PapeleoPHD UsefulDocs TODO "${guide_sources[@]}"; do
  [[ ! -e $stage/$forbidden_path ]] || { echo "ERROR: maintainer-only path entered the distribution: $forbidden_path" >&2; exit 1; }
done
forbidden_todo=$(find "$stage" -type f -name TODO -print -quit)
[[ -z $forbidden_todo ]] || { echo "ERROR: internal TODO entered the distribution: ${forbidden_todo#"$stage/"}" >&2; exit 1; }

validation="$temporary_directory/validation"
mkdir -p "$validation"
cp -a "$stage/." "$validation/"
validation_log="$temporary_directory/validation.log"
: > "$validation_log"

validate_component() {
  local label=$1
  local directory=$2
  shift 2
  printf '  %-16s' "$label"
  if make -C "$validation/$directory" "$@" >> "$validation_log" 2>&1; then
    echo " ok"
  else
    echo " FAILED"
    echo "ERROR: $label did not compile from the staged distribution." >&2
    tail -n 120 "$validation_log" >&2
    exit 1
  fi
}

echo "Validating the default documents from the staged user distribution..."
validate_component "Book" Book all_latexmk
validate_component "Anteproyecto" Anteproyecto anteproyecto_latexmk
validate_component "TFG paperwork" PapeleoTFG
validate_component "TFM paperwork" PapeleoTFM

for appendix in "${appendices[@]}"; do
  if ! cmp -s -- "$temporary_directory/${appendix//\//-}.source" "$appendix"; then
    echo "ERROR: $appendix changed during validation; rerun 'make distrib' to preserve the edits." >&2
    exit 1
  fi
done

rm -f -- "$base.tgz" "$base.zip"
tar -C "$stage" -czf "$repository_root/$base.tgz" .
(cd "$stage" && zip -qr "$repository_root/$base.zip" .)

# Keep exactly the validated copies for local manual builds. Avoid touching
# their timestamps when the registry and the surrounding prose are unchanged.
for appendix in "${appendices[@]}"; do
  if ! cmp -s -- "$stage/$appendix" "$appendix"; then
    cp -- "$stage/$appendix" "$appendix"
  fi
done
echo "Static degree catalogue available in Book/appendix/ and Book/appendix/orig/."
printf 'Created %s.tgz and %s.zip from release %s (%s files).\n' "$base" "$base" "$release" "$(wc -l < "$manifest")"

#!/usr/bin/env bash
set -euo pipefail

repository_root=$(git rev-parse --show-toplevel)
cd "$repository_root"
release=$(tr -d '\r\n' < RELEASE.txt)
if [[ -z $release || $release == */* || $release == *' '* ]]; then
  echo "ERROR: RELEASE.txt must contain one non-empty, filename-safe release identifier." >&2
  exit 1
fi
[[ -f 00-README.pdf ]] || { echo "ERROR: 00-README.pdf is missing; run make 00-README.pdf first." >&2; exit 1; }

base="00-PhDTFMTFG-LaTeX-Template-UAH-$release"
temporary_directory=$(mktemp -d)
trap 'rm -rf "$temporary_directory"' EXIT
stage="$temporary_directory/stage"
manifest="$temporary_directory/manifest"
mkdir -p "$stage"

{
  printf '%s\n' \
    .gitignore \
    .latexmkrc \
    LICENSE \
    Makefile \
    RELEASE.txt \
    sync-git-sources.sh
  git ls-files -- Anteproyecto Book Config PapeleoTFG PapeleoTFM PapeleoPHD
} | while IFS= read -r file; do
  case "$file" in
    TODO|*/TODO|Book/slides/*|Config/DEGREE_REGISTRY_COMPATIBILITY.md|Config/preamble-slides.tex) continue ;;
    *.pdf)
      case "$file" in
        Book/additional/*.pdf|Book/cover/*.pdf|Book/cover/*/*.pdf|Book/diagrams/*.pdf|Book/figures/*.pdf|Book/letters/*.pdf|Book/logos/*.pdf|Book/logos/*/*.pdf|Book/logos/*/*/*.pdf|Book/portadaTFGs/*.pdf|Book/publications/*.pdf) ;;
        *) continue ;;
      esac
      ;;
  esac
  printf '%s\n' "$file"
done > "$manifest"
printf '%s\n' 00-README.pdf >> "$manifest"
LC_ALL=C sort -u -o "$manifest" "$manifest"

while IFS= read -r file; do
  [[ -f $file ]] || { echo "ERROR: distribution source is missing: $file" >&2; exit 1; }
  mkdir -p -- "$(dirname "$stage/$file")"
  cp -p -- "$file" "$stage/$file"
done < "$manifest"

for required_file in README.md RELEASE.txt Makefile sync-git-sources.sh Book/book.tex Config/myconfig.tex; do
  [[ -f $stage/$required_file ]] || { echo "ERROR: required distribution file is missing: $required_file" >&2; exit 1; }
done

for forbidden_path in AdminScripts Deprecated normativas UsefulDocs MAINTAINERS.md HOWTO_ADD_DEGREES_AND_UNIVERSITIES.md REPOSITORY_OVERVIEW.md SUGGESTED_IMPROVEMENTS.md TODO; do
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
validate_component "PhD paperwork" PapeleoPHD

rm -f -- "$base.tgz" "$base.zip"
tar -C "$stage" -czf "$repository_root/$base.tgz" .
(cd "$stage" && zip -qr "$repository_root/$base.zip" .)
printf 'Created %s.tgz and %s.zip from release %s (%s files).\n' "$base" "$base" "$release" "$(wc -l < "$manifest")"

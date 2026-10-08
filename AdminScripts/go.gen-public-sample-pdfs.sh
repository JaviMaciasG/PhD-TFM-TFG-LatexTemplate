#!/usr/bin/env bash
# Generate the deliberately reduced set of complete PDFs published in Dropbox.

set -uo pipefail

script_directory=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)
repository_root=$(cd -- "$script_directory/.." && pwd)
builder="$script_directory/build-book-typesetting-prototypes.sh"
comparison_builder="$script_directory/build-book-style-comparisons.sh"
output_directory="$repository_root/Book/public-samples"
dropbox_directory="${HOME}/Dropbox/PhDTFMTFG-LaTeX-Template"
include_distribution=false
temporary_directory=$(mktemp -d)
trap 'rm -rf "$temporary_directory"' EXIT

usage() {
  cat <<'EOF'
Usage: go.gen-public-sample-pdfs.sh [OPTIONS]

Options:
  --destination DIRECTORY   Dropbox publication directory.
  --include-distribution    Also publish the release ZIP and TGZ archives.
  -h, --help                Show this help.
EOF
}

while (($#)); do
  case $1 in
    --destination)
      (($# >= 2)) || { echo "ERROR: --destination requires a directory." >&2; exit 2; }
      dropbox_directory=$2
      shift 2
      ;;
    --include-distribution)
      include_distribution=true
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "ERROR: unknown option: $1" >&2
      usage >&2
      exit 2
      ;;
  esac
done

[[ -x $builder ]] || { echo "ERROR: sample builder is unavailable: $builder" >&2; exit 1; }
[[ -x $comparison_builder ]] || { echo "ERROR: comparison builder is unavailable: $comparison_builder" >&2; exit 1; }
[[ -f $repository_root/RELEASE.txt ]] || { echo "ERROR: RELEASE.txt is missing." >&2; exit 1; }
command -v make >/dev/null || { echo "ERROR: make is required." >&2; exit 1; }

release=$(tr -d '\r\n' < "$repository_root/RELEASE.txt")
if [[ -z $release || $release == */* || $release == *' '* ]]; then
  echo "ERROR: RELEASE.txt must contain one non-empty, filename-safe release identifier." >&2
  exit 1
fi

mkdir -p "$output_directory"
rm -f -- \
  "$output_directory/00-DOWNLOAD-GUIDE.pdf" \
  "$output_directory/01-TYPESETTING-STYLES.pdf"

echo "[INF] Generating the Dropbox documentation PDFs..."
if ! make -C "$repository_root" README.pdf; then
  echo "ERROR: could not generate README.pdf." >&2
  exit 1
fi
if ! pandoc "$repository_root/Documentation/es/DOWNLOAD-GUIDE.md" \
    -t pdf -o "$temporary_directory/01-DOWNLOAD-GUIDE.pdf" \
    --metadata lang=es --variable urlcolor=blue --number-sections \
    --highlight-style kate -V colorlinks -V papersize:a4 \
    -V geometry:"top=2cm, bottom=1.5cm, left=2cm, right=2cm"; then
  echo "ERROR: could not generate the Spanish Dropbox download guide." >&2
  exit 1
fi
cp -p -- "$repository_root/README.pdf" "$output_directory/00-README.pdf"
cp -p -- "$temporary_directory/01-DOWNLOAD-GUIDE.pdf" "$output_directory/01-DOWNLOAD-GUIDE.pdf"

# degree|language|structure|style|font policy|published filename
samples=(
  'GIEC|spanish|standard|standard|institutional|TFG-GIEC-spanish.pdf'
  'ITIURJC|english|standard|editorial|document|TFG-ITIURJC-english-editorial-document-fonts.pdf'
  'MUIE|spanish|standard|modern|institutional|TFM-MUIE-spanish-modern-institutional-fonts.pdf'
  'MUCTE|english|standard|framed|document|TFM-MUCTE-english-framed-document-fonts.pdf'
  'MUC|spanish|standard|shaded|institutional|TFM-MUC-spanish-shaded-institutional-fonts.pdf'
  'PHDUAH|english|standard|mimosis|document|PhD-PHDUAH-english-conventional-mimosis-document-fonts.pdf'
  'PHDUAH|spanish|compendium|standard|institutional|PhD-PHDUAH-spanish-compendium-standard-institutional-fonts.pdf'
)

generated_files=(
  "$output_directory/00-README.pdf"
  "$output_directory/01-DOWNLOAD-GUIDE.pdf"
)
error_count=0

comparison_inputs="$temporary_directory/typesetting-comparison"
comparison_output="$repository_root/TYPESETTING-STYLES-COMPARISON.pdf"
echo "[INF] Generating $comparison_output from Spanish GIEC samples..."
if "$builder" \
    --degree GIEC \
    --language spanish \
    --structure standard \
    --font-mode institutional \
    --output-dir "$comparison_inputs" && \
   "$comparison_builder" \
    --pdf-dir "$comparison_inputs" \
    --font-mode institutional \
    --language spanish \
    --output "$comparison_output"; then
  cp -p -- "$comparison_output" "$output_directory/02-TYPESETTING-STYLES-COMPARISON.pdf"
  generated_files+=("$output_directory/02-TYPESETTING-STYLES-COMPARISON.pdf")
else
  echo "[ERR] the public typesetting comparison could not be generated." >&2
  error_count=$((error_count + 1))
fi

for index in "${!samples[@]}"; do
  IFS='|' read -r degree language structure style font_mode output_name <<<"${samples[$index]}"
  build_directory="$temporary_directory/sample-$index"
  mkdir -p "$build_directory"
  echo "[INF] Generating $output_name ($degree, $language, $structure, $style, $font_mode)..."
  if "$builder" \
      --degree "$degree" \
      --language "$language" \
      --structure "$structure" \
      --styles "$style" \
      --font-mode "$font_mode" \
      --output-dir "$build_directory"; then
    language_suffix=
    [[ $language == english ]] && language_suffix=-english
    font_suffix=
    [[ $font_mode == document ]] && font_suffix=-document-fonts
    source_pdf="$build_directory/book-${style}${language_suffix}${font_suffix}.pdf"
    if [[ -f $source_pdf ]]; then
      cp -p -- "$source_pdf" "$output_directory/$output_name"
      generated_files+=("$output_directory/$output_name")
      echo "[INF] Created $output_directory/$output_name"
    else
      echo "[ERR] the build did not produce the expected PDF for $output_name." >&2
      error_count=$((error_count + 1))
    fi
  else
    build_status=$?
    log_source=$(find "$build_directory" -maxdepth 1 -type f -name '*-build.log' -print -quit)
    [[ -z $log_source ]] || cp -p -- "$log_source" "$output_directory/${output_name%.pdf}.log"
    echo "[ERR] $output_name failed with status $build_status." >&2
    error_count=$((error_count + 1))
  fi
done

if [[ $error_count -ne 0 ]]; then
  echo "ERROR: $error_count public sample build(s) failed; Dropbox was not modified." >&2
  exit 1
fi

echo "[INF] Generated ${#generated_files[@]} PDF files in $output_directory."

publication_files=("${generated_files[@]}" "$repository_root/RELEASE.txt")
if $include_distribution; then
  distribution_base="03-PhDTFMTFG-LaTeX-Template-UAH-$release"
  distribution_zip="$repository_root/$distribution_base.zip"
  distribution_tgz="$repository_root/$distribution_base.tgz"
  [[ -f $distribution_zip ]] || {
    echo "ERROR: distribution archive is missing: $distribution_zip" >&2
    echo "Run 'make distrib' first, or use the 'make publish-dropbox' target." >&2
    exit 1
  }
  [[ -f $distribution_tgz ]] || {
    echo "ERROR: distribution archive is missing: $distribution_tgz" >&2
    echo "Run 'make distrib' first, or use the 'make publish-dropbox' target." >&2
    exit 1
  }
  publication_files+=("$distribution_zip" "$distribution_tgz")
fi

confirm() {
  local prompt=$1 reply
  if [[ ! -t 0 ]]; then
    return 1
  fi
  if ! read -r -p "$prompt [y/N] " reply; then
    return 1
  fi
  case ${reply:-} in
    Y|YES|Yes|yes|y) return 0 ;;
    *) return 1 ;;
  esac
}

echo "The following files are ready to be published to $dropbox_directory:"
printf '  %s\n' "${publication_files[@]##*/}"
if ! confirm "Publish these files?"; then
  echo "[INF] Dropbox was not modified."
  exit 0
fi

[[ -d $dropbox_directory ]] || {
  echo "ERROR: Dropbox destination does not exist: $dropbox_directory" >&2
  exit 1
}
[[ -w $dropbox_directory ]] || {
  echo "ERROR: Dropbox destination is not writable: $dropbox_directory" >&2
  exit 1
}

shopt -s nullglob
existing_managed_files=("$dropbox_directory"/*.pdf)
if $include_distribution; then
  existing_managed_files+=(
    "$dropbox_directory"/00-PhDTFMTFG-LaTeX-Template-UAH-*.zip
    "$dropbox_directory"/00-PhDTFMTFG-LaTeX-Template-UAH-*.tgz
    "$dropbox_directory"/03-PhDTFMTFG-LaTeX-Template-UAH-*.zip
    "$dropbox_directory"/03-PhDTFMTFG-LaTeX-Template-UAH-*.tgz
  )
fi
remove_existing=false
if ((${#existing_managed_files[@]})); then
  echo "The following existing managed files can be removed before publishing the new ones:"
  printf '  %s\n' "${existing_managed_files[@]##*/}"
  confirm "Remove these existing managed files?" && remove_existing=true
else
  echo "[INF] No existing managed files were found in the Dropbox destination."
fi

dropbox_staging="$dropbox_directory/.public-sample-update-$$"
mkdir "$dropbox_staging" || exit 1
for file in "${publication_files[@]}"; do
  cp -p -- "$file" "$dropbox_staging/" || { rm -rf "$dropbox_staging"; exit 1; }
done

if $remove_existing; then
  rm -f -- "${existing_managed_files[@]}"
fi
for file in "$dropbox_staging"/*; do
  mv -f -- "$file" "$dropbox_directory/"
done
rmdir "$dropbox_staging"
echo "[INF] Published ${#publication_files[@]} files to $dropbox_directory."

#!/usr/bin/env bash
# Build full Book PDFs for one or more registered typesetting styles without
# modifying the working configuration. This is a maintainer-only helper.

set -uo pipefail

script_directory=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)
repository_root=$(cd -- "$script_directory/.." && pwd)
font_mode=institutional
language=spanish
degree=
document_structure=
output_directory=
list_styles=false
declare -a requested_styles=()

usage() {
  cat <<'EOF'
Usage: build-book-typesetting-prototypes.sh [OPTIONS]

Options:
  --styles STYLE [STYLE ...]       Build only the selected registered styles.
  --font-mode MODE                institutional (default) or document.
  --language LANGUAGE             spanish (default) or english.
  --degree IDENTIFIER             Override myDegree for every build.
  --structure STRUCTURE           standard or compendium; defaults to myconfig.
  --output-dir DIRECTORY          Default: Book/typesetting-prototypes.
  --root DIRECTORY                Template repository root.
  --list-styles                   Print registered styles and exit.
  -h, --help                      Show this help.
EOF
}

while (($#)); do
  case $1 in
    --styles)
      shift
      while (($#)) && [[ $1 != --* ]]; do
        requested_styles+=("$1")
        shift
      done
      ((${#requested_styles[@]})) || { echo "ERROR: --styles requires at least one style." >&2; exit 2; }
      ;;
    --font-mode)
      (($# >= 2)) || { echo "ERROR: --font-mode requires a value." >&2; exit 2; }
      font_mode=$2
      shift 2
      ;;
    --language)
      (($# >= 2)) || { echo "ERROR: --language requires a value." >&2; exit 2; }
      language=$2
      shift 2
      ;;
    --degree)
      (($# >= 2)) || { echo "ERROR: --degree requires an identifier." >&2; exit 2; }
      degree=$2
      shift 2
      ;;
    --structure)
      (($# >= 2)) || { echo "ERROR: --structure requires a value." >&2; exit 2; }
      document_structure=$2
      shift 2
      ;;
    --output-dir)
      (($# >= 2)) || { echo "ERROR: --output-dir requires a directory." >&2; exit 2; }
      output_directory=$2
      shift 2
      ;;
    --root)
      (($# >= 2)) || { echo "ERROR: --root requires a directory." >&2; exit 2; }
      repository_root=$(cd -- "$2" && pwd) || exit 2
      shift 2
      ;;
    --list-styles)
      list_styles=true
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

dispatcher="$repository_root/Config/typesetting/typesetting.tex"
[[ -f $dispatcher ]] || { echo "ERROR: typesetting dispatcher not found: $dispatcher" >&2; exit 1; }
style_list=$(sed -n 's/^\\def\\thesis@registeredstyles{\([^}]*\)}$/\1/p' "$dispatcher")
[[ -n $style_list ]] || { echo "ERROR: cannot read the style registry in $dispatcher" >&2; exit 1; }
IFS=, read -r -a registered_styles <<<"$style_list"

if $list_styles; then
  printf '%s\n' "${registered_styles[@]}"
  exit 0
fi

case $font_mode in
  institutional|document) ;;
  *) echo "ERROR: --font-mode must be institutional or document." >&2; exit 2 ;;
esac
case $language in
  spanish|english) ;;
  *) echo "ERROR: --language must be spanish or english." >&2; exit 2 ;;
esac
if [[ -n $document_structure ]]; then
  case $document_structure in
    standard|compendium) ;;
    *) echo "ERROR: --structure must be standard or compendium." >&2; exit 2 ;;
  esac
fi
if [[ -n $degree ]]; then
  degree_registry_tool="$repository_root/Config/query-degree-registry.sh"
  degree_registry="$repository_root/Config/degrees.tex"
  [[ -f $degree_registry_tool && -f $degree_registry ]] || {
    echo "ERROR: the degree registry tools are not available." >&2
    exit 1
  }
  sh "$degree_registry_tool" work-type "$degree" "$degree_registry" >/dev/null 2>&1 || {
    echo "ERROR: unknown degree identifier: $degree" >&2
    exit 2
  }
fi

is_registered_style() {
  local candidate=$1 registered
  for registered in "${registered_styles[@]}"; do
    [[ $candidate == "$registered" ]] && return 0
  done
  return 1
}

if ((${#requested_styles[@]} == 0)); then
  requested_styles=("${registered_styles[@]}")
fi
for style in "${requested_styles[@]}"; do
  is_registered_style "$style" || { echo "ERROR: unknown typesetting style: $style" >&2; exit 2; }
  [[ -f $repository_root/Config/typesetting/styles/$style.tex ]] || {
    echo "ERROR: registered style '$style' has no definition file." >&2
    exit 1
  }
done

command -v git >/dev/null || { echo "ERROR: git is required to prepare the isolated source tree." >&2; exit 1; }
command -v latexmk >/dev/null || { echo "ERROR: latexmk is required to build prototypes." >&2; exit 1; }
git -C "$repository_root" rev-parse --show-toplevel >/dev/null 2>&1 || {
  echo "ERROR: the template must be inside a Git working tree." >&2
  exit 1
}

if [[ -z $output_directory ]]; then
  output_directory="$repository_root/Book/typesetting-prototypes"
elif [[ $output_directory != /* ]]; then
  output_directory="$PWD/$output_directory"
fi
mkdir -p "$output_directory"
output_directory=$(cd -- "$output_directory" && pwd)
if [[ $output_directory == "$repository_root" || $output_directory == "$repository_root/Book" ]]; then
  echo "ERROR: choose a dedicated prototype output directory." >&2
  exit 2
fi

temporary_directory=$(mktemp -d)
trap 'rm -rf "$temporary_directory"' EXIT
source_tree="$temporary_directory/source"
manifest="$temporary_directory/manifest"
mkdir -p "$source_tree"

# Copy one source-scoped working tree per invocation. Only tracked Book/Config
# inputs are eligible; known backup, documentation and generated areas are not.
git -C "$repository_root" ls-files -- Book Config | while IFS= read -r file; do
  case $file in
    Book/Tools/calc2latex/sample.tex)
      ;;
    Book/.auctex-auto/*|Book/OldDocs/*|Book/SampleTypesettings/*|Book/Tools/*|Book/tools/*|Book/slides/*|\
    Book/appendix/bare/*|Book/appendix/orig/*|Book/chapters/bare/*|Book/chapters/orig/*|\
    Book/book-flatten-snapshot.tex|Book/readme-latexdiff-windows.txt|\
    Config/.auctex-auto/*|Documentation/en/DEGREE_REGISTRY_COMPATIBILITY.md|Config/preamble-slides.tex)
      continue
      ;;
    *.aux|*.bbl|*.bcf|*.blg|*.fdb_latexmk|*.fls|*.glg|*.glo|*.gls|*.glsdefs|*.log|*.out|*.run.xml|*.synctex.gz)
      continue
      ;;
  esac
  printf '%s\n' "$file"
done >"$manifest"

while IFS= read -r file; do
  [[ -f $repository_root/$file ]] || { echo "ERROR: tracked source is missing: $file" >&2; exit 1; }
  mkdir -p "$source_tree/$(dirname -- "$file")"
  cp -p -- "$repository_root/$file" "$source_tree/$file"
done <"$manifest"

config="$source_tree/Config/myconfig.tex"
config_base="$temporary_directory/myconfig.tex"
cp -p -- "$config" "$config_base"

replace_config_value() {
  local command_name=$1 value=$2 file=$3 temporary
  temporary="$temporary_directory/myconfig.updated"
  if [[ $(grep -Ec "^[[:space:]]*\\\\newcommand\{\\\\${command_name}\}\{[^}]*\}" "$file") -ne 1 ]]; then
    echo "ERROR: expected exactly one active \\$command_name definition in $file" >&2
    return 1
  fi
  sed -E "s|^([[:space:]]*\\\\newcommand\{\\\\${command_name}\}\{)[^}]*\}|\\1${value}}|" "$file" >"$temporary"
  mv -- "$temporary" "$file"
}

language_suffix=
[[ $language == english ]] && language_suffix=-english
font_suffix=
[[ $font_mode == document ]] && font_suffix=-document-fonts
error_count=0

for style in "${requested_styles[@]}"; do
  cp -p -- "$config_base" "$config"
  replace_config_value myTypesettingStyle "$style" "$config" || exit 1
  replace_config_value myInstitutionalPageFontMode "$font_mode" "$config" || exit 1
  replace_config_value myLanguage "$language" "$config" || exit 1
  [[ -z $degree ]] || replace_config_value myDegree "$degree" "$config" || exit 1
  [[ -z $document_structure ]] || replace_config_value myDocumentStructure "$document_structure" "$config" || exit 1

  name="book-${style}${language_suffix}${font_suffix}"
  build_log="$output_directory/${name}-build.log"
  echo "[INF] Building $style ($language, $font_mode); log: $build_log"
  (
    cd "$source_tree/Book"
    latexmk -norc -r ../Config/latexmkrc -C book.tex >/dev/null 2>&1 || true
    latexmk -norc -r ../Config/latexmkrc -pdf \
      -interaction=nonstopmode -halt-on-error -file-line-error book.tex
  ) >"$build_log" 2>&1
  build_status=$?
  if [[ $build_status -ne 0 || ! -f $source_tree/Book/book.pdf ]]; then
    echo "[ERR] $name failed; see $build_log" >&2
    error_count=$((error_count + 1))
    continue
  fi
  cp -p -- "$source_tree/Book/book.pdf" "$output_directory/$name.pdf"
  [[ -f $source_tree/Book/book.log ]] && cp -p -- "$source_tree/Book/book.log" "$output_directory/$name-latex.log"
  echo "[INF] Created $output_directory/$name.pdf"
done

if [[ $error_count -ne 0 ]]; then
  echo "ERROR: $error_count prototype build(s) failed." >&2
  exit 1
fi

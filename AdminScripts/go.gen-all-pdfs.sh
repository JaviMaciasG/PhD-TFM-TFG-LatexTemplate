#!/usr/bin/env bash
# Generate a selectable regression matrix using isolated Book builds.
set -euo pipefail

script_directory=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)
repository_root=$(cd -- "$script_directory/.." && pwd)
registry="$repository_root/Config/degrees.tex"
query="$repository_root/Config/query-degree-registry.sh"
builder="$script_directory/build-book-typesetting-prototypes.sh"
output_directory="$repository_root/Book/all-pdfs"
all=false
all_degrees=false
all_universities=false
all_styles=false
all_fonts=false
yes=false
dry_run=false
list_options=false
declare -a expanded_types=() universities=() degrees=() degree_types=()
declare -a layouts=() styles=() fonts=() languages=() structures=()
declare -A specified=()

usage() {
  printf '%s\n' 'Usage: go.gen-all-pdfs.sh [OPTIONS]' '' \
    'Default: one degree per institution/type/layout, TFG/TFM/PhD only,' \
    '         Spanish, standard structure/style, institutional fonts.' '' \
    '  --all                  All non-TFC degrees and every applicable combination.' \
    '  --all-degrees          All non-TFC degrees; other dimensions stay unchanged.' \
    '  --all-tfgs             All TFG degrees (combine with other type flags).' \
    '  --all-tfms             All TFM degrees.' \
    '  --all-phds             All PhD degrees.' \
    '  --all-universities     All institutions (also the default).' \
    '  --all-styles           Every registered typesetting style.' \
    '  --all-fonts            Both institutional-page font policies.' \
    '  --universities LIST    Institution identifiers, e.g. UAH,URJC.' \
    '  --degrees LIST         Degree identifiers, e.g. GIEC,MUC,PHDUAH.' \
    '  --degree-types LIST    TFG,TFM,PhD,RR.' \
    '  --layout-profiles LIST Registered cover/back-page profile identifiers.' \
    '  --styles LIST          Registered typesetting styles.' \
    '  --font-modes LIST      institutional,document.' \
    '  --languages LIST       spanish,english.' \
    '  --structures LIST      standard,compendium (compendium is PhD-only).' \
    '  --output-dir DIRECTORY Default: Book/all-pdfs; relative paths use current dir.' \
    '  --yes                  Skip confirmation, not validation or the preview.' \
    '  --dry-run              Preview without writing files or compiling.' \
    '  --list-options         List available values and degree metadata.' \
    '  -h, --help             Show this help.' '' \
    'Requires Bash 4.3+; lists are comma-separated. Filters intersect; type flags combine.' \
    'Filters can narrow --all. Matching --all-OPTION and explicit lists conflict.' \
    'TFC degrees are always excluded. Noninteractive generation needs --yes.' '' \
    'Examples:' \
    '  go.gen-all-pdfs.sh --all --dry-run' \
    '  go.gen-all-pdfs.sh --all-tfms --universities UAH --all-styles --all-fonts' \
    '  go.gen-all-pdfs.sh --all --degrees GIEC,MUC,PHDUAH --yes'
}
die() { echo "ERROR: $*" >&2; exit 2; }
contains() {
  local wanted=$1 item
  shift
  for item in "$@"; do [[ $item == "$wanted" ]] && return 0; done
  return 1
}
read_list() {
  local name=$1 value=$2 item
  local -n destination=$name
  local -a items=()
  [[ -n $value && $value != ,* && $value != *, && $value != *,,* ]] || die "empty value in --$3."
  IFS=, read -r -a items <<<"$value"
  for item in "${items[@]}"; do
    [[ $item =~ ^[A-Za-z0-9_-]+$ ]] || die "invalid value '$item' in --$3."
    contains "$item" "${destination[@]}" || destination+=("$item")
  done
  specified[$name]=true
}
while (($#)); do
  case $1 in
    --all) all=true; shift ;;
    --all-degrees) all_degrees=true; shift ;;
    --all-tfgs) expanded_types+=(TFG); shift ;;
    --all-tfms) expanded_types+=(TFM); shift ;;
    --all-phds) expanded_types+=(PhD); shift ;;
    --all-universities) all_universities=true; shift ;;
    --all-styles) all_styles=true; shift ;;
    --all-fonts) all_fonts=true; shift ;;
    --yes) yes=true; shift ;;
    --dry-run) dry_run=true; shift ;;
    --list-options) list_options=true; shift ;;
    -h|--help) usage; exit 0 ;;
    --universities|--degrees|--degree-types|--layout-profiles|--styles|--font-modes|--languages|--structures|--output-dir)
      option=$1
      (($# >= 2)) && [[ -n $2 && $2 != --* ]] || die "$option requires a value."
      case $option in
        --universities) read_list universities "$2" universities ;;
        --degrees) read_list degrees "$2" degrees ;;
        --degree-types) read_list degree_types "$2" degree-types ;;
        --layout-profiles) read_list layouts "$2" layout-profiles ;;
        --styles) read_list styles "$2" styles ;;
        --font-modes) read_list fonts "$2" font-modes ;;
        --languages) read_list languages "$2" languages ;;
        --structures) read_list structures "$2" structures ;;
        --output-dir) output_directory=$2 ;;
      esac
      shift 2
      ;;
    *) die "unknown option '$1'; use --help." ;;
  esac
done
$all_universities && [[ ${specified[universities]:-false} == true ]] && die "--all-universities conflicts with --universities."
$all_styles && [[ ${specified[styles]:-false} == true ]] && die "--all-styles conflicts with --styles."
$all_fonts && [[ ${specified[fonts]:-false} == true ]] && die "--all-fonts conflicts with --font-modes."

declare -a registered_degrees=() registered_styles=() registered_universities=() registered_layouts=()
declare -A degree_type=() degree_university=() degree_layout=()
mapfile -t registered_degrees < <(sh "$query" identifiers "$registry")
((${#registered_degrees[@]})) || die "cannot read degree registry."
for degree in "${registered_degrees[@]}"; do
  degree_type[$degree]=$(sh "$query" work-type "$degree" "$registry")
  degree_university[$degree]=$(sh "$query" institution "$degree" "$registry")
  degree_layout[$degree]=$(sh "$query" layout-profile "$degree" "$registry")
  contains "${degree_university[$degree]}" "${registered_universities[@]}" || registered_universities+=("${degree_university[$degree]}")
  contains "${degree_layout[$degree]}" "${registered_layouts[@]}" || registered_layouts+=("${degree_layout[$degree]}")
done
style_list=$(sed -n 's/^\\def\\thesis@registeredstyles{\([^}]*\)}$/\1/p' "$repository_root/Config/typesetting/typesetting.tex")
[[ -n $style_list ]] || die "cannot read typesetting registry."
IFS=, read -r -a registered_styles <<<"$style_list"
validate_list() {
  local name=$1 value
  shift
  local -n values=$name
  for value in "${values[@]}"; do contains "$value" "$@" || die "unknown $name value '$value'."; done
}
validate_list degrees "${registered_degrees[@]}"
validate_list universities "${registered_universities[@]}"
validate_list layouts "${registered_layouts[@]}"
validate_list degree_types TFG TFM PhD RR
validate_list styles "${registered_styles[@]}"
validate_list fonts institutional document
validate_list languages spanish english
validate_list structures standard compendium
for degree in "${degrees[@]}"; do [[ ${degree_type[$degree]} != TFC ]] || die "pre-Bologna TFC degree '$degree' is excluded."; done

if $list_options; then
  printf '%-12s %-6s %-12s %s\n' DEGREE TYPE INSTITUTION LAYOUT
  for degree in "${registered_degrees[@]}"; do
    [[ ${degree_type[$degree]} != TFC ]] || continue
    printf '%-12s %-6s %-12s %s\n' "$degree" "${degree_type[$degree]}" "${degree_university[$degree]}" "${degree_layout[$degree]}"
  done
  printf '\nUniversities: %s\nLayouts: %s\nStyles: %s\n' "${registered_universities[*]}" "${registered_layouts[*]}" "${registered_styles[*]}"
  printf '%s\n' 'Degree types: TFG TFM PhD RR (TFC excluded)' 'Font modes: institutional document' 'Languages: spanish english' 'Structures: standard compendium (PhD-only)'
  exit 0
fi
if ((${#styles[@]} == 0)); then
  if $all || $all_styles; then styles=("${registered_styles[@]}"); else styles=(standard); fi
fi
if ((${#fonts[@]} == 0)); then
  if $all || $all_fonts; then fonts=(institutional document); else fonts=(institutional); fi
fi
if ((${#languages[@]} == 0)); then
  if $all; then languages=(spanish english); else languages=(spanish); fi
fi
if ((${#structures[@]} == 0)); then
  if $all; then structures=(standard compendium); else structures=(standard); fi
fi
if ((${#degree_types[@]} == 0)); then
  if $all || $all_degrees || ((${#degrees[@]} || ${#expanded_types[@]})); then
    degree_types=(TFG TFM PhD RR)
  else
    degree_types=(TFG TFM PhD)
  fi
fi
# Normalize ordering so equivalent selections have identical plans.
order_list() {
  local name=$1 value
  shift
  local -n values=$name
  local -a ordered=()
  for value in "$@"; do contains "$value" "${values[@]}" && ordered+=("$value"); done
  values=("${ordered[@]}")
}
order_list styles "${registered_styles[@]}"
order_list fonts institutional document
order_list languages spanish english
order_list structures standard compendium

declare -a selected_degrees=() matrix=()
declare -A represented=()
for degree in "${registered_degrees[@]}"; do
  type=${degree_type[$degree]}
  university=${degree_university[$degree]}
  layout=${degree_layout[$degree]}
  [[ $type != TFC ]] || continue
  contains "$type" "${degree_types[@]}" || continue
  ((${#degrees[@]} == 0)) || contains "$degree" "${degrees[@]}" || continue
  ((${#universities[@]} == 0)) || contains "$university" "${universities[@]}" || continue
  ((${#layouts[@]} == 0)) || contains "$layout" "${layouts[@]}" || continue
  ((${#expanded_types[@]} == 0)) || contains "$type" "${expanded_types[@]}" || continue
  if [[ $type != PhD ]] && ! contains standard "${structures[@]}"; then
    echo "[INF] Excluding $degree: compendium is PhD-only."
    continue
  fi
  key="$university|$type|$layout"
  if ! $all && ! $all_degrees && ((${#degrees[@]} == 0 && ${#expanded_types[@]} == 0)); then
    [[ ${represented[$key]:-false} == false ]] || continue
    represented[$key]=true
  fi
  selected_degrees+=("$degree")
  for language in "${languages[@]}"; do
    for structure in "${structures[@]}"; do
      [[ $structure != compendium || $type == PhD ]] || continue
      for font in "${fonts[@]}"; do
        for style in "${styles[@]}"; do matrix+=("$degree|$language|$structure|$style|$font"); done
      done
    done
  done
done
((${#matrix[@]})) || die "selection yields no documents; check filters (reports require --degree-types RR or --degrees)."
if [[ $output_directory != /* ]]; then output_directory="$PWD/$output_directory"; fi
output_directory=$(realpath -m -- "$output_directory")
case $output_directory in
  "$repository_root"|"$repository_root/Book"|"$repository_root/Config"|/) die "choose a dedicated output directory." ;;
esac
output_name() {
  printf '%s-%s-%s-%s-%s-%s' "${degree_type[$1]}" "$1" "$2" "$3" "$4" "$5"
}
printf '\nGeneration preview: %s documents\nDestination: %s\n' "${#matrix[@]}" "$output_directory"
printf 'Degrees: %s\nLanguages: %s\nStructures: %s\nStyles: %s\nFont modes: %s\n\n' "${selected_degrees[*]}" "${languages[*]}" "${structures[*]}" "${styles[*]}" "${fonts[*]}"
printf '%-10s %-10s %-23s %-8s %-10s %-10s %-13s %s\n' DEGREE UNIVERSITY LAYOUT LANGUAGE STRUCTURE STYLE FONT PDF
for row in "${matrix[@]}"; do
  IFS='|' read -r degree language structure style font <<<"$row"
  name=$(output_name "$degree" "$language" "$structure" "$style" "$font")
  printf '%-10s %-10s %-23s %-8s %-10s %-10s %-13s %s.pdf\n' "$degree" "${degree_university[$degree]}" "${degree_layout[$degree]}" "$language" "$structure" "$style" "$font" "$name"
  [[ ! -e $output_directory/$name.pdf ]] || echo "  [REPLACE] $output_directory/$name.pdf (only if this build succeeds)"
done
$dry_run && exit 0
if ! $yes; then
  [[ -t 0 ]] || die "noninteractive generation requires --yes; use --dry-run to inspect the plan."
  reply=
  if ! read -r -p "Generate these ${#matrix[@]} documents? [y/N] " reply; then reply=; fi
  case ${reply,,} in
    y|yes) ;;
    *) echo '[INF] Cancelled; no files were changed.'; exit 0 ;;
  esac
fi
for tool in git latexmk gs; do command -v "$tool" >/dev/null || die "$tool is required for generation."; done
[[ -x $builder ]] || die "isolated builder is unavailable: $builder"
mkdir -p -- "$output_directory"
temporary_directory=$(mktemp -d)
trap 'rm -rf -- "$temporary_directory"' EXIT
trap 'exit 130' INT
trap 'exit 143' TERM
success_count=0
error_count=0
group_count=0
for degree in "${selected_degrees[@]}"; do
  for language in "${languages[@]}"; do
    for structure in "${structures[@]}"; do
      [[ $structure != compendium || ${degree_type[$degree]} == PhD ]] || continue
      for font in "${fonts[@]}"; do
        group_count=$((group_count + 1))
        group_directory="$temporary_directory/group-$group_count"
        group_log="$temporary_directory/group-$group_count.log"
        echo "[INF] Building $degree / $language / $structure / $font (${#styles[@]} styles)..."
        if "$builder" --degree "$degree" --language "$language" --structure "$structure" \
            --font-mode "$font" --styles "${styles[@]}" --output-dir "$group_directory" >"$group_log" 2>&1; then
          group_status=0
        else
          group_status=$?
          echo "[WARN] Builder exited with status $group_status; inspecting individual outputs." >&2
        fi
        for style in "${styles[@]}"; do
          name=$(output_name "$degree" "$language" "$structure" "$style" "$font")
          prototype_name="book-$style"
          [[ $language != english ]] || prototype_name+=-english
          [[ $font != document ]] || prototype_name+=-document-fonts
          log="$output_directory/$name.log"
          cp -- "$group_log" "$log"
          [[ ! -f $group_directory/$prototype_name-build.log ]] || cp -- "$group_directory/$prototype_name-build.log" "$log"
          if [[ -f $group_directory/$prototype_name.pdf ]] && \
              gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/prepress \
                -dNOPAUSE -dQUIET -dBATCH -sOutputFile="$group_directory/$name-compressed.pdf" \
                "$group_directory/$prototype_name.pdf" >>"$log" 2>&1 && \
              [[ -s $group_directory/$name-compressed.pdf ]] && \
              cp -- "$group_directory/$name-compressed.pdf" "$output_directory/.$name.pdf.tmp" && \
              mv -f -- "$output_directory/.$name.pdf.tmp" "$output_directory/$name.pdf"; then
            success_count=$((success_count + 1))
            printf '[OK] %03d/%03d %s.pdf\n' "$success_count" "${#matrix[@]}" "$name"
          else
            error_count=$((error_count + 1))
            echo "[ERR] $name failed; see $log" >&2
          fi
        done
      done
    done
  done
done
printf '\nGeneration finished: %s successful, %s failed (%s planned).\n' "$success_count" "$error_count" "${#matrix[@]}"
[[ $error_count -eq 0 ]]

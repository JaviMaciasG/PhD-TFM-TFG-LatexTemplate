#!/usr/bin/env bash

set -euo pipefail

if ! repository_root=$(git rev-parse --show-toplevel 2>/dev/null); then
  echo "ERROR: this target must be run inside a Git repository." >&2
  exit 1
fi
repository_root=$(realpath -e "$repository_root")

if [[ $(git -C "$repository_root" config --bool --get template.officialRepository 2>/dev/null || true) == true ]]; then
  echo "This is the official template repository."
  echo "The Git source synchronization target is disabled here; nothing was changed."
  exit 0
fi

temporary_directory=$(mktemp -d)
trap 'rm -rf "$temporary_directory"' EXIT
required_unsorted="$temporary_directory/required-unsorted"
required_files="$temporary_directory/required"
tracked_files="$temporary_directory/tracked"
obsolete_files="$temporary_directory/obsolete"
files_to_update="$temporary_directory/update"
: >"$required_unsorted"

is_generated_file() {
  case "$1" in
    *.acn | *.acr | *.alg | *.aux | *.bbl | *.bcf | *.blg | *.fdb_latexmk | *.fls | \
      *.glg | *.glo | *.gls | *.glsdefs | *.ilg | *.ind | *.ist | *.loa | *.lof | \
      *.log | *.lot | *.nav | *.out | *.run.xml | *.sbl | *.slg | *.slo | *.sls | \
      *.snm | *.sym | *.synctex | *.synctex.gz | *.toc | *.vrb | \
      pdf_dia_done | pdf_eps_done | pdf_svg_done)
      return 0
      ;;
  esac
  return 1
}

add_repository_file() {
  local candidate=$1
  local base_directory=$2
  local resolved relative

  if [[ $candidate != /* ]]; then
    candidate="$base_directory/$candidate"
  fi
  resolved=$(realpath -e -- "$candidate" 2>/dev/null || true)
  [[ -n $resolved && -f $resolved ]] || return 0
  case "$resolved" in
    "$repository_root"/*) ;;
    *) return 0 ;;
  esac
  relative=${resolved#"$repository_root"/}
  is_generated_file "$relative" && return 0
  printf '%s\n' "$relative" >>"$required_unsorted"
}

compile_and_collect() {
  local entry_point=$1
  local document_directory="$repository_root/${entry_point%/*}"
  local document_name=${entry_point##*/}
  local document_stem=${document_name%.tex}
  local fls_file="$document_directory/$document_stem.fls"
  local bcf_file="$document_directory/$document_stem.bcf"
  local command_log="$temporary_directory/$document_stem-command.log"
  local line dependency bibliography

  echo "Generating dependencies for $entry_point..."
  if ! (
    cd "$document_directory"
    pdflatex -draftmode -interaction=nonstopmode -halt-on-error -recorder "$document_name"
  ) >"$command_log" 2>&1; then
    if [[ ! -f $fls_file ]]; then
      echo "ERROR: ${fls_file#"$repository_root"/} was not generated." >&2
      exit 1
    fi
    echo "WARNING: $entry_point did not compile successfully; using the dependencies recorded before the error." >&2
    echo "Review ${document_directory#"$repository_root"/}/$document_stem.log." >&2
  fi
  if [[ ! -f $fls_file ]]; then
    echo "ERROR: ${fls_file#"$repository_root"/} was not generated." >&2
    exit 1
  fi

  while IFS= read -r line; do
    [[ $line == "INPUT "* ]] || continue
    dependency=${line#INPUT }
    dependency=${dependency#\"}
    dependency=${dependency%\"}
    add_repository_file "$dependency" "$document_directory"
  done <"$fls_file"

  if [[ -f $bcf_file ]]; then
    while IFS= read -r bibliography; do
      [[ -n $bibliography ]] || continue
      add_repository_file "$bibliography" "$document_directory"
    done < <(sed -n 's!.*<bcf:datasource[^>]*>\([^<]*\)</bcf:datasource>.*!\1!p' "$bcf_file")
  fi
}

for explicit_file in \
  .gitignore \
  LICENSE \
  README.md \
  Makefile \
  AdminScripts/sync-git-sources.sh \
  AdminScripts/sync-git-sources.py \
  Config/Makefile \
  Book/Makefile \
  Anteproyecto/Makefile \
  PapeleoTFG/Makefile \
  PapeleoTFM/Makefile \
  PapeleoPHD/Makefile; do
  [[ -f "$repository_root/$explicit_file" ]] && printf '%s\n' "$explicit_file" >>"$required_unsorted"
done

compile_and_collect Book/book.tex
compile_and_collect Anteproyecto/anteproyecto.tex
for paperwork_directory in PapeleoTFG PapeleoTFM PapeleoPHD; do
  while IFS= read -r -d '' paperwork_file; do
    compile_and_collect "${paperwork_file#"$repository_root"/}"
  done < <(find "$repository_root/$paperwork_directory" -maxdepth 1 -type f -name '*.tex' -print0 | sort -z)
done

LC_ALL=C sort -u "$required_unsorted" >"$required_files"
git -C "$repository_root" ls-files | LC_ALL=C sort -u >"$tracked_files"
LC_ALL=C comm -23 "$tracked_files" "$required_files" >"$obsolete_files"
: >"$files_to_update"
while IFS= read -r required_file; do
  if ! git -C "$repository_root" ls-files --error-unmatch -- "$required_file" >/dev/null 2>&1 || \
    ! git -C "$repository_root" diff --quiet -- "$required_file" || \
    ! git -C "$repository_root" diff --cached --quiet -- "$required_file"; then
    printf '%s\n' "$required_file" >>"$files_to_update"
  fi
done <"$required_files"

print_group() {
  local title=$1
  local file_list=$2
  local count
  count=$(wc -l <"$file_list")
  echo
  echo "$title ($count):"
  if [[ -s $file_list ]]; then
    sed 's/^/  /' "$file_list"
  else
    echo "  (none)"
  fi
}

print_group "Files to add or update" "$files_to_update"
print_group "Files to stop tracking (they will remain on disk)" "$obsolete_files"

if [[ ! -s $files_to_update && ! -s $obsolete_files ]]; then
  echo
  echo "The Git index already matches the current document dependencies."
  exit 0
fi

echo
read -r -p "Update the Git index with these changes? [y/N] " answer
case ${answer,,} in
  y | yes) ;;
  *)
    echo "Cancelled; the Git index was not changed."
    exit 0
    ;;
esac

while IFS= read -r required_file; do
  printf '%s\0' "$required_file"
done <"$required_files" | git -C "$repository_root" add -f --pathspec-from-file=- --pathspec-file-nul

if [[ -s $obsolete_files ]]; then
  while IFS= read -r obsolete_file; do
    printf '%s\0' "$obsolete_file"
  done <"$obsolete_files" | git -C "$repository_root" rm --cached -f --ignore-unmatch --pathspec-from-file=- --pathspec-file-nul >/dev/null
fi

echo
echo "The Git index has been updated. No commit or push was performed."
echo "Review the result with 'git status' and create the appropriate commit when ready."
echo
git -C "$repository_root" status --short

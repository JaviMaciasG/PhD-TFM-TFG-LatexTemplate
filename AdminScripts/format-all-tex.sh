#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage: AdminScripts/format-all-tex.sh [--check | --write] [--] [path ...]

Preview formatting changes by default. Use --write to apply them.
Paths are optional repository-relative files or directories and limit the
tracked .tex files considered. With no paths, all tracked .tex files are used.
EOF
}

mode=check
paths=()
while (($#)); do
  case "$1" in
    --check) mode=check; shift ;;
    --write) mode=write; shift ;;
    --help|-h) usage; exit 0 ;;
    --) shift; paths+=("$@"); break ;;
    -*) echo "ERROR: unknown option: $1" >&2; usage >&2; exit 2 ;;
    *) paths+=("$1"); shift ;;
  esac
done

script_directory=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)
repository_root=$(git -C "$script_directory" rev-parse --show-toplevel) || {
  echo 'ERROR: run this tool from a clone of the template repository.' >&2
  exit 1
}
config="$script_directory/.latexindent-merged.yaml"

command -v latexindent >/dev/null 2>&1 || {
  echo 'ERROR: latexindent is not installed or is not in PATH.' >&2
  exit 1
}
[[ -f $config ]] || { echo "ERROR: configuration not found: $config" >&2; exit 1; }

for index in "${!paths[@]}"; do
  paths[$index]=${paths[$index]#./}
  paths[$index]=${paths[$index]%/}
  [[ -n ${paths[$index]} ]] || paths[$index]=.
  path=${paths[$index]}
  [[ $path != /* && $path != .. && $path != ../* && $path != */../* && $path != */.. ]] || {
    echo "ERROR: paths must stay inside the repository: $path" >&2
    exit 2
  }
done
if [[ ${paths[*]-} == . ]]; then
  paths=()
fi

files=()
while IFS= read -r -d '' file; do
  if ((${#paths[@]} == 0)); then
    files+=("$file")
    continue
  fi
  for path in "${paths[@]}"; do
    if [[ $file == "$path" || $file == "$path/"* ]]; then
      files+=("$file")
      break
    fi
  done
done < <(git -C "$repository_root" ls-files -z -- '*.tex')

((${#files[@]} > 0)) || {
  echo 'ERROR: no tracked .tex files matched the requested paths.' >&2
  exit 1
}

temporary_directory=$(mktemp -d)
trap 'rm -rf -- "$temporary_directory"' EXIT
formatted_file="$temporary_directory/formatted.tex"
log_file="$temporary_directory/indent.log"
changed=0
failed=0

for file in "${files[@]}"; do
  source_file="$repository_root/$file"
  printf '%s: %s\n' "$mode" "$file"
  if ! latexindent -s -m -l="$config" -g="$log_file" -c="$temporary_directory" \
    -o="$formatted_file" "$source_file"; then
    printf 'FAILED: %s\n' "$file" >&2
    ((failed += 1))
    continue
  fi

  if cmp -s -- "$source_file" "$formatted_file"; then
    continue
  fi

  ((changed += 1))
  if [[ $mode == check ]]; then
    diff_status=0
    diff -u --label "a/$file" --label "b/$file" "$source_file" "$formatted_file" || diff_status=$?
    if ((diff_status > 1)); then
      printf 'FAILED to compare: %s\n' "$file" >&2
      ((failed += 1))
    fi
  else
    cp -- "$formatted_file" "$source_file"
    printf 'UPDATED: %s\n' "$file"
  fi
done

if [[ $mode == check ]]; then
  printf '\nChecked: %d | Would change: %d | Failed: %d\n' "${#files[@]}" "$changed" "$failed"
  if ((changed > 0)); then
    echo 'Preview only; rerun with --write to apply these changes.'
  else
    echo 'All selected files are already formatted.'
  fi
else
  printf '\nChecked: %d | Updated: %d | Failed: %d\n' "${#files[@]}" "$changed" "$failed"
fi

if ((failed > 0)); then
  exit 1
fi
if [[ $mode == check ]] && ((changed > 0)); then
  exit 1
fi

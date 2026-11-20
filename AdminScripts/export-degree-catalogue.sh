#!/usr/bin/env bash
# Export the manual appendix to the requested paths.
set -euo pipefail
usage() { echo "Usage: $0 [--root SOURCE_TREE] OUTPUT [ORIGINAL_COPY_OUTPUT]" >&2; }
script_directory=$(cd -- "$(dirname -- "$0")" && pwd)
source_tree=$(cd -- "$script_directory/.." && pwd)
if (($# > 0)) && [[ $1 == --root ]]; then
  if (($# < 3)); then usage; exit 2; fi
  source_tree=$(cd -- "$2" && pwd)
  shift 2
fi
if (($# < 1 || $# > 2)); then
  usage
  exit 2
fi
command -v pdflatex >/dev/null || {
  echo "ERROR: pdflatex is required to export the degree catalogue." >&2
  exit 1
}

temporary_directory=$(mktemp -d)
trap 'rm -rf -- "$temporary_directory"' EXIT
if ! (cd "$source_tree" &&
  pdflatex -halt-on-error -interaction=nonstopmode -file-line-error \
    -output-directory="$temporary_directory" "$script_directory/degree-catalogue-export.tex"
) >"$temporary_directory/export.log" 2>&1; then
  echo "ERROR: could not export the degree catalogue." >&2
  tail -n 60 "$temporary_directory/export.log" >&2
  exit 1
fi
body="$temporary_directory/degree-catalogue-body.tex"
if [[ ! -s $body ]] || ! grep -Fq '\item ' "$body"; then
  echo "ERROR: the exported degree catalogue has no entries." >&2
  exit 1
fi

render_appendix() {
  local template=$1
  if ! awk -v body="$body" '
    BEGIN {
      start = "% Catalogue generated for distribution from the degree registry."
      end = "% End of generated degree catalogue."
    }
    function emit(    status, line) {
      print start
      print "\\begingroup"
      while ((status = getline line < body) > 0) print line
      if (status < 0) failed = 1
      close(body)
      print "\\endgroup"
      print end
    }
    $0 == start {
      if (inside || ++count != 1) exit 1
      inside = 1
      emit()
      next
    }
    $0 == end {
      if (!inside) exit 1
      inside = 0
      next
    }
    inside { next }
    /^[[:space:]]*%?[[:space:]]*\\DegreeRegistryPrintCatalogue[[:space:]]*$/ {
      if (++count != 1) exit 1
      emit()
      next
    }
    { print }
    END { if (count != 1 || inside || failed) exit 1 }
  ' "$source_tree/Book/appendix/$template"; then
    echo "ERROR: expected one catalogue placeholder or complete generated block in Book/appendix/$template." >&2
    return 1
  fi
}

render_appendix titulaciones-soportadas.tex >"$temporary_directory/appendix.tex"
if (($# == 2)); then
  render_appendix orig/titulaciones-soportadas.tex >"$temporary_directory/original.tex"
fi
cp -- "$temporary_directory/appendix.tex" "$1"
if (($# == 2)); then
  cp -- "$temporary_directory/original.tex" "$2"
fi

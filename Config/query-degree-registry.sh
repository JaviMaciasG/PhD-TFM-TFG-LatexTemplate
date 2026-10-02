#!/bin/sh

set -eu

registry_file=${3:-"$(dirname "$0")/degrees.tex"}

case ${1:-} in
  identifiers)
    awk '
      /^\\DeclareDegree\{/ {
        identifier = $0
        sub(/^\\DeclareDegree\{/, "", identifier)
        sub(/\}.*/, "", identifier)
        print identifier
      }
    ' "${2:-"$(dirname "$0")/degrees.tex"}"
    ;;
  work-type)
    if [ "$#" -lt 2 ]; then
      echo "Usage: $0 work-type DEGREE [REGISTRY_FILE]" >&2
      exit 2
    fi
    awk -v degree="$2" '
      $0 == "\\DeclareDegree{" degree "}{" {
        selected = 1
        next
      }
      selected && /^[[:space:]]*work-type[[:space:]]*=/ {
        value = $0
        sub(/^[[:space:]]*work-type[[:space:]]*=[[:space:]]*/, "", value)
        sub(/[[:space:]]*,[[:space:]]*$/, "", value)
        print value
        found = 1
        exit
      }
      selected && /^}/ {
        exit
      }
      END {
        if (!found) {
          exit 1
        }
      }
    ' "$registry_file"
    ;;
  *)
    echo "Usage: $0 identifiers [REGISTRY_FILE]" >&2
    echo "       $0 work-type DEGREE [REGISTRY_FILE]" >&2
    exit 2
    ;;
esac

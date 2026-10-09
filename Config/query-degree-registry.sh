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
  work-type|institution|layout-profile)
    if [ "$#" -lt 2 ]; then
      echo "Usage: $0 $1 DEGREE [REGISTRY_FILE]" >&2
      exit 2
    fi
    awk -v degree="$2" -v field="$1" '
      $0 == "\\DeclareDegree{" degree "}{" {
        selected = 1
        next
      }
      selected && $0 ~ "^[[:space:]]*" field "[[:space:]]*=" {
        value = $0
        sub("^[[:space:]]*" field "[[:space:]]*=[[:space:]]*", "", value)
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
    echo "       $0 institution DEGREE [REGISTRY_FILE]" >&2
    echo "       $0 layout-profile DEGREE [REGISTRY_FILE]" >&2
    exit 2
    ;;
esac

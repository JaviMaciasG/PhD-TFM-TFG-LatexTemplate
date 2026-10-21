#!/bin/sh
# Read the registry without requiring TeX, including inherited variants.
set -eu
operation=${1:-}
degree=${2:-}
target=
case "$operation" in
  identifiers) registry_file=${2:-"$(dirname "$0")/degrees.tex"} ;;
  work-type|institution|layout-profile|document-structure|base-degree)
    registry_file=${3:-"$(dirname "$0")/degrees.tex"} ;;
  structure-variant)
    target=${3:-}
    registry_file=${4:-"$(dirname "$0")/degrees.tex"}
    case "$target" in standard|compendium) ;; *) echo 'ERROR: structure must be standard or compendium.' >&2; exit 2 ;; esac ;;
  *) echo "Usage: $0 identifiers [REGISTRY_FILE]" >&2
     echo "       $0 work-type|institution|layout-profile|document-structure|base-degree DEGREE [REGISTRY_FILE]" >&2
     echo "       $0 structure-variant DEGREE standard|compendium [REGISTRY_FILE]" >&2; exit 2 ;;
esac
awk -v operation="$operation" -v degree="$degree" -v target="$target" '
  function value(id, field) {
    if ((id SUBSEP field) in fields) return fields[id,field]
    if (parent[id] != "") return value(parent[id],field)
    if (field == "document-structure") return "standard"
    if (field == "base-degree") return id
    return ""
  }
  /^\\DeclareDegree(Variant)?\{/ {
    variant = ($0 ~ /^\\DeclareDegreeVariant/)
    split($0, parts, /[{}]/)
    id = parts[2]
    if (id in known) { bad=1; exit }
    if (variant) {
      parent[id]=parts[4]
      if (!(parent[id] in known)) { bad=1; exit }
    }
    known[id]=1; order[++count]=id
    next
  }
  id != "" && /^[[:space:]]*[a-z-]+[[:space:]]*=/ {
    line=$0; sub(/%.*/, "", line)
    field=line; sub(/[[:space:]]*=.*/, "", field); sub(/^[[:space:]]*/, "", field)
    if (parent[id] != "" && field != "document-structure") { bad=1; exit }
    sub(/^[^=]*=[[:space:]]*/, "", line); sub(/[[:space:]]*,?[[:space:]]*$/, "", line)
    sub(/^\{/, "", line); sub(/\}$/, "", line)
    fields[id,field]=line
  }
  /^}/ { id="" }
  END {
    if (bad) exit 1
    for (i=1;i<=count;i++) {
      s=value(order[i],"document-structure")
      if (s != "standard" && s != "compendium") exit 1
      if (s == "compendium" && value(order[i],"work-type") != "PhD") exit 1
    }
    if (operation == "identifiers") {
      for (i=1;i<=count;i++) print order[i]
      exit
    }
    if (!(degree in known)) exit 1
    if (operation == "structure-variant") {
      if (value(degree,"document-structure") == target) { print degree; exit }
      root=value(degree,"base-degree")
      for (i=1;i<=count;i++)
        if (value(order[i],"base-degree") == root && value(order[i],"document-structure") == target) {
          print order[i]; exit
        }
      exit 1
    }
    result=value(degree,operation)
    if (result == "") exit 1
    print result
  }
' "$registry_file"

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

git ls-files | while IFS= read -r file; do
  case "$file" in
    TODO|*/TODO|SUGGESTED_IMPROVEMENTS.md|Deprecated/*|Book/slides/*) continue ;;
    *.pdf)
      case "$file" in
        Book/additional/*.pdf|Book/cover/*.pdf|Book/cover/*/*.pdf|Book/diagrams/*.pdf|Book/figures/*.pdf|Book/letters/*.pdf|Book/logos/*.pdf|Book/logos/*/*.pdf|Book/logos/*/*/*.pdf|Book/portadaTFGs/*.pdf) ;;
        *) continue ;;
      esac
      ;;
  esac
  printf '%s\n' "$file"
done > "$manifest"
printf '%s\n' 00-README.pdf MAINTAINERS.md AdminScripts/go.build-distribution.sh >> "$manifest"
LC_ALL=C sort -u -o "$manifest" "$manifest"

while IFS= read -r file; do
  [[ -f $file ]] || { echo "ERROR: distribution source is missing: $file" >&2; exit 1; }
  mkdir -p -- "$(dirname "$stage/$file")"
  cp -p -- "$file" "$stage/$file"
done < "$manifest"

rm -f -- "$base.tgz" "$base.zip"
tar -C "$stage" -czf "$repository_root/$base.tgz" .
(cd "$stage" && zip -qr "$repository_root/$base.zip" .)
printf 'Created %s.tgz and %s.zip from release %s (%s files).\n' "$base" "$base" "$release" "$(wc -l < "$manifest")"

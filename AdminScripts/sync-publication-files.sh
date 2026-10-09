#!/usr/bin/env bash
# Internal publishing helper: update managed root files without recreating them.
set -euo pipefail

dry_run=false
include_distribution=false
while (($#)); do
  case $1 in
    --dry-run) dry_run=true; shift ;;
    --include-distribution) include_distribution=true; shift ;;
    --*) echo "ERROR: unknown synchronization option: $1" >&2; exit 2 ;;
    *) break ;;
  esac
done
(($# == 2)) || { echo 'Usage: sync-publication-files.sh [--dry-run] [--include-distribution] SOURCE DESTINATION' >&2; exit 2; }
command -v rsync >/dev/null || { echo 'ERROR: rsync is required for publication.' >&2; exit 1; }
[[ -d $1 && -d $2 && -w $2 ]] || { echo 'ERROR: source and writable destination directories must exist.' >&2; exit 1; }
source_directory=$(cd -- "$1" && pwd -P)
destination_directory=$(cd -- "$2" && pwd -P)
[[ $destination_directory != / && $source_directory != "$destination_directory" &&
   $source_directory != "$destination_directory/"* && $destination_directory != "$source_directory/"* ]] || {
  echo 'ERROR: source and destination must be separate, non-nested directories; destination cannot be /.' >&2
  exit 1
}
[[ -s $source_directory/RELEASE.txt && -n $(find "$source_directory" -maxdepth 1 -type f -name '*.pdf' -print -quit) ]] || {
  echo 'ERROR: publication staging must contain RELEASE.txt and generated PDFs.' >&2
  exit 1
}

# Excluded files/directories are protected from deletion by rsync. Do not use
# --delete-excluded: unrelated destination content must survive synchronization.
options=(-rt --checksum --inplace --delete-after --itemize-changes --exclude='/*/' --include='/RELEASE.txt')
for file in "$source_directory"/*; do
  [[ -f $file ]] || { echo 'ERROR: publication staging must contain only regular root files.' >&2; exit 1; }
  options+=("--include=/${file##*/}")
done
for pattern in 'TFG-*.pdf' 'TFM-*.pdf' 'PhD-*.pdf' 'PHD-*.pdf' 'TFC-*.pdf' \
    '00-README.pdf' '00-DOWNLOAD-GUIDE.pdf' '01-DOWNLOAD-GUIDE.pdf' \
    '01-TYPESETTING-STYLES.pdf' '02-TYPESETTING-STYLES.pdf' \
    '02-TYPESETTING-STYLES-COMPARISON.pdf' '04-TYPESETTING-STYLES-GUIDE.pdf'; do
  options+=("--include=/$pattern")
done
if $include_distribution; then
  for pattern in '00-PhDTFMTFG-LaTeX-Template-UAH-*.zip' '00-PhDTFMTFG-LaTeX-Template-UAH-*.tgz' \
      '03-PhDTFMTFG-LaTeX-Template-UAH-*.zip' '03-PhDTFMTFG-LaTeX-Template-UAH-*.tgz'; do
    options+=("--include=/$pattern")
  done
fi
options+=(--exclude='*')
$dry_run && options+=(--dry-run)
rsync "${options[@]}" -- "$source_directory/" "$destination_directory/"

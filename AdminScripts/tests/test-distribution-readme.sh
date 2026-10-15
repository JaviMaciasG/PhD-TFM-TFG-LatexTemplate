#!/usr/bin/env bash
# Exercise real archive packaging with fixture sources and mocked PDF builds.
set -euo pipefail
case ${0##*/} in
  pymupdf) exit 0 ;;
  pandoc)
    while (($#)); do
      if [[ $1 == -o ]]; then printf 'Fixture typesetting guide\n' >"$2"; exit 0; fi
      shift
    done
    exit 1 ;;
  make)
    [[ $1 == -C ]]
    directory=$2
    if [[ ${3:-} == guia ]]; then
      case ${directory##*/} in
        PapeleoTFG) guide=TFG-GuiaPapeleo-EPS-UAH ;;
        PapeleoTFM) guide=TFM-GuiaPapeleo-EPS-UAH ;;
        *) exit 1 ;;
      esac
      printf 'Fixture paperwork guide\n' >"$directory/$guide.pdf"
    else
      # Every staged build must receive the project README, not the upstream one.
      cmp "$EXPECTED_PROJECT_README" "$(dirname "$directory")/README.md"
    fi
    exit 0 ;;
esac

test_directory=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)
repository_root=$(cd -- "$test_directory/../.." && pwd)
fixture=$(mktemp -d)
trap 'rm -rf -- "$fixture"' EXIT
source_root="$fixture/repository"
mkdir -p "$source_root/Documentation/es" "$source_root/AdminScripts" \
  "$source_root/Book" "$source_root/Config" "$source_root/Anteproyecto" \
  "$source_root/PapeleoTFG" "$source_root/PapeleoTFM" "$fixture/bin"
cp "$repository_root/AdminScripts/go.build-distribution.sh" "$source_root/AdminScripts/"
cp "$repository_root/Documentation/es/README-PROYECTO.md" "$source_root/Documentation/es/"
for tool in pymupdf pandoc make; do
  cp "$0" "$fixture/bin/$tool"
  chmod +x "$fixture/bin/$tool"
done
for file in .gitignore .latexmkrc LICENSE Makefile sync-git-sources.sh \
  Book/book.tex Config/myconfig.tex Anteproyecto/anteproyecto.tex \
  PapeleoTFG/TFG-GuiaPapeleo-EPS-UAH.tex PapeleoTFM/TFM-GuiaPapeleo-EPS-UAH.tex \
  Documentation/es/TYPESETTING-STYLES-GUIDE.md; do
  printf 'Fixture source\n' >"$source_root/$file"
done
printf 'vtest\n' >"$source_root/RELEASE.txt"
printf 'Upstream repository introduction\n' >"$source_root/README.md"
printf 'Upstream English introduction\n' >"$source_root/README-en.md"
printf 'Fixture README PDF\n' >"$source_root/README.pdf"
printf 'Fixture comparison PDF\n' >"$source_root/TYPESETTING-STYLES-COMPARISON.pdf"
git -C "$source_root" init -q
git -C "$source_root" add .
upstream_before=$(sha256sum "$source_root/README.md" "$source_root/README-en.md")
run_distribution() {
  (cd "$source_root" && EXPECTED_PROJECT_README="$source_root/Documentation/es/README-PROYECTO.md" \
    PATH="$fixture/bin:$PATH" bash AdminScripts/go.build-distribution.sh)
}
run_distribution >"$fixture/build.log" 2>&1 || { cat "$fixture/build.log" >&2; exit 1; }

base=03-PhDTFMTFG-LaTeX-Template-UAH-vtest
mkdir "$fixture/tgz" "$fixture/zip"
tar -xzf "$source_root/$base.tgz" -C "$fixture/tgz"
unzip -q "$source_root/$base.zip" -d "$fixture/zip"
for unpacked in "$fixture/tgz" "$fixture/zip"; do
  cmp "$source_root/Documentation/es/README-PROYECTO.md" "$unpacked/README.md"
  [[ -s $unpacked/00-README.pdf && -s $unpacked/Book/book.tex && -s $unpacked/Config/myconfig.tex ]]
  [[ ! -e $unpacked/Documentation && ! -e $unpacked/README-en.md && ! -e $unpacked/README-PROYECTO.md ]]
done
diff -r "$fixture/tgz" "$fixture/zip"
[[ $(sha256sum "$source_root/README.md" "$source_root/README-en.md") == "$upstream_before" ]]

# Preflight rejects missing and empty templates without replacing old archives.
archives_before=$(sha256sum "$source_root/$base.zip" "$source_root/$base.tgz")
mv "$source_root/Documentation/es/README-PROYECTO.md" "$fixture/project-readme.md"
if run_distribution >"$fixture/missing.log" 2>&1; then exit 1; fi
grep -q 'project README template is missing or empty' "$fixture/missing.log"
: >"$source_root/Documentation/es/README-PROYECTO.md"
if run_distribution >"$fixture/empty.log" 2>&1; then exit 1; fi
grep -q 'project README template is missing or empty' "$fixture/empty.log"
[[ $(sha256sum "$source_root/$base.zip" "$source_root/$base.tgz") == "$archives_before" ]]
echo 'PASS: identical ZIP/TGZ project READMEs, staged presence, upstream preservation, internal-source exclusion and missing/empty-template preflight.'

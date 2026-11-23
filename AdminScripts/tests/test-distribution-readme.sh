#!/usr/bin/env bash
# Exercise real archive packaging with fixture sources and mocked PDF builds.
set -euo pipefail
case ${0##*/} in
  pymupdf|rsync) exit 0 ;;
  sync-publication-files.sh)
    [[ $1 == --dry-run ]]
    if [[ $2 == --include-distribution ]]; then
      for extension in zip tgz; do
        cmp "$EXPECTED_DISTRIBUTION_BASE.$extension" "$3/03-PhDTFMTFG-LaTeX-Template.$extension"
        [[ ! -e $3/${EXPECTED_DISTRIBUTION_BASE##*/}.$extension ]]
      done
    else
      [[ ! -e $2/03-PhDTFMTFG-LaTeX-Template.zip && ! -e $2/03-PhDTFMTFG-LaTeX-Template.tgz ]]
    fi
    exit 0 ;;
  build-book-style-comparisons.sh)
    while (($#)); do
      if [[ $1 == --output ]]; then printf 'Fixture comparison PDF\n' >"$2"; exit 0; fi
      shift
    done
    exit 1 ;;
  build-book-typesetting-prototypes.sh)
    language=spanish font=institutional style=standard
    while (($#)); do
      case $1 in
        --catalogue) catalogue=$2 ;;
        --output-dir) output_directory=$2 ;;
        --styles) style=$2 ;;
        --language) language=$2 ;;
        --font-mode) font=$2 ;;
      esac
      shift 2
    done
    cmp "$EXPECTED_CATALOGUE" "$catalogue"
    printf '%s\n' "$catalogue" >>"$SAMPLE_CATALOGUE_LOG"
    name="book-$style"
    if [[ $language == english ]]; then name+=-english; fi
    if [[ $font == document ]]; then name+=-document-fonts; fi
    mkdir -p "$output_directory"
    printf 'Fixture public sample PDF\n' >"$output_directory/$name.pdf"
    exit 0 ;;
  pandoc)
    while (($#)); do
      if [[ $1 == -o ]]; then printf 'Fixture typesetting guide\n' >"$2"; exit 0; fi
      shift
    done
    exit 1 ;;
  pdflatex)
    if [[ $FAIL_CATALOGUE_EXPORT == true ]]; then exit 1; fi
    if [[ -n ${CATALOGUE_EXPORT_LOG:-} ]]; then
      printf 'export\n' >>"$CATALOGUE_EXPORT_LOG"
    fi
    for argument; do
      case $argument in
        -output-directory=*) output_directory=${argument#*=};;
      esac
    done
    printf '\\section{Fixture university}\n\\begin{itemize}\n\\item \\texttt{TEST-DEGREE}\n\\end{itemize}\n' \
      >"$output_directory/degree-catalogue-body.tex"
    exit 0 ;;
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
    elif [[ ${3:-} == README.pdf ]]; then
      [[ -s $directory/README.pdf ]]
    else
      # Every staged build must receive the project README, not the upstream one.
      cmp "$EXPECTED_PROJECT_README" "$(dirname "$directory")/README.md"
      if [[ ${3:-} == all_latexmk ]]; then
        grep -Fq '\item \texttt{TEST-DEGREE}' "$directory/appendix/titulaciones-soportadas.tex"
      fi
    fi
    exit 0 ;;
esac

test_directory=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)
repository_root=$(cd -- "$test_directory/../.." && pwd)
fixture=$(mktemp -d)
trap 'rm -rf -- "$fixture"' EXIT

# An existing PDF must not prevent the documentation Makefile from asking
# the root Makefile whether README.md has changed.
readme_fixture="$fixture/readme-delegation"
mkdir -p "$readme_fixture/Documentation"
cp "$repository_root/Documentation/Makefile" "$readme_fixture/Documentation/"
printf 'README.pdf: README.md\n\tcp README.md README.pdf\n' >"$readme_fixture/Makefile"
printf 'Old documentation\n' >"$readme_fixture/README.pdf"
printf 'Use Tools/prepare-book.sh\n' >"$readme_fixture/README.md"
touch -t 200001010000 "$readme_fixture/README.pdf"
make -s -C "$readme_fixture/Documentation" ../README.pdf
cmp "$readme_fixture/README.md" "$readme_fixture/README.pdf"

source_root="$fixture/repository"
mkdir -p "$source_root/Documentation/es" "$source_root/AdminScripts" \
  "$source_root/Book" "$source_root/Config" "$source_root/Anteproyecto" \
  "$source_root/PapeleoTFG" "$source_root/PapeleoTFM" "$fixture/bin"
mkdir -p "$source_root/Book/appendix/orig" "$source_root/Book/cover/urjc"
cp "$repository_root/AdminScripts/go.build-distribution.sh" "$source_root/AdminScripts/"
cp "$repository_root/AdminScripts/"{export-degree-catalogue.sh,degree-catalogue-export.tex} "$source_root/AdminScripts/"
cp "$repository_root/AdminScripts/go.gen-public-sample-pdfs.sh" "$source_root/AdminScripts/"
cp "$repository_root/Documentation/es/README-PROYECTO.md" "$source_root/Documentation/es/"
for tool in pymupdf pandoc pdflatex make rsync; do
  cp "$0" "$fixture/bin/$tool"
  chmod +x "$fixture/bin/$tool"
done
for script in build-book-typesetting-prototypes.sh build-book-style-comparisons.sh sync-publication-files.sh; do
  cp "$0" "$source_root/AdminScripts/$script"
  chmod +x "$source_root/AdminScripts/$script"
done
cp "$repository_root/Book/appendix/titulaciones-soportadas.tex" "$source_root/Book/appendix/"
cp "$repository_root/Book/appendix/orig/titulaciones-soportadas.tex" "$source_root/Book/appendix/orig/"
cp -a "$repository_root/Tools" "$source_root/"
for file in .gitignore .latexmkrc LICENSE Makefile \
  Book/book.tex Config/myconfig.tex Config/degrees.tex Config/institutions.tex Anteproyecto/anteproyecto.tex \
  Book/cover/urjc/portada-tfg-eif-urjc.tex \
  PapeleoTFG/TFG-GuiaPapeleo-EPS-UAH.tex PapeleoTFM/TFM-GuiaPapeleo-EPS-UAH.tex \
  Documentation/es/TYPESETTING-STYLES-GUIDE.md; do
  printf 'Fixture source\n' >"$source_root/$file"
done
# Keep the fixture aligned with the distribution script's explicit pre-commit sources.
cp "$repository_root/Config/"{degrees.tex,query-degree-registry.sh} "$source_root/Config/"
while IFS= read -r file; do
  mkdir -p "$source_root/$(dirname "$file")"
  [[ -e $source_root/$file ]] || printf 'Fixture source\n' >"$source_root/$file"
done < <(awk '/^reference_sources=\(/ { in_list=1; next } in_list && /^\)/ { exit } in_list { gsub(/^[[:space:]]+|[[:space:]]+$/, ""); print }' "$repository_root/AdminScripts/go.build-distribution.sh")
cp "$repository_root/PapeleoTFG/"*.tex "$repository_root/PapeleoTFG/Makefile" "$source_root/PapeleoTFG/"
cp "$repository_root/Config/grades-calculation.tex" "$source_root/Config/"
printf 'vtest\n' >"$source_root/RELEASE.txt"
printf 'Upstream repository introduction\n' >"$source_root/README.md"
printf 'Upstream English introduction\n' >"$source_root/README-en.md"
printf 'Fixture README PDF\n' >"$source_root/README.pdf"
printf 'Fixture comparison PDF\n' >"$source_root/TYPESETTING-STYLES-COMPARISON.pdf"
git -C "$source_root" init -q
git -C "$source_root" add .
upstream_files=("$source_root/README.md" "$source_root/README-en.md")
upstream_before=$(sha256sum "${upstream_files[@]}")
appendices=(Book/appendix/titulaciones-soportadas.tex Book/appendix/orig/titulaciones-soportadas.tex)
appendix_prose() {
  sed -e '/^% Catalogue generated for distribution from the degree registry\.$/,/^% End of generated degree catalogue\.$/d' \
    -e '/^%\?\\DegreeRegistryPrintCatalogue$/d' "$1"
}
for appendix in "${appendices[@]}"; do
  appendix_prose "$source_root/$appendix" >"$fixture/${appendix//\//-}.prose"
done
run_distribution() {
  (cd "$source_root" && EXPECTED_PROJECT_README="$source_root/Documentation/es/README-PROYECTO.md" \
    FAIL_CATALOGUE_EXPORT="$1" \
    PATH="$fixture/bin:$PATH" bash AdminScripts/go.build-distribution.sh)
}
run_distribution false >"$fixture/build.log" 2>&1 || { cat "$fixture/build.log" >&2; exit 1; }

base=03-PhDTFMTFG-LaTeX-Template-vtest
[[ ! -e $source_root/03-PhDTFMTFG-LaTeX-Template-UAH-vtest.tgz ]]
[[ ! -e $source_root/03-PhDTFMTFG-LaTeX-Template-UAH-vtest.zip ]]
mkdir "$fixture/tgz" "$fixture/zip"
tar -xzf "$source_root/$base.tgz" -C "$fixture/tgz"
unzip -q "$source_root/$base.zip" -d "$fixture/zip"
for unpacked in "$fixture/tgz" "$fixture/zip"; do
  cmp "$source_root/Documentation/es/README-PROYECTO.md" "$unpacked/README.md"
  [[ -s $unpacked/00-README.pdf && -s $unpacked/Book/book.tex && -s $unpacked/Config/myconfig.tex ]]
  for tool in prepare-book.bat prepare-book.command prepare-book.sh estructuras.tsv sync-git-sources.sh; do
    cmp "$repository_root/Tools/$tool" "$unpacked/Tools/$tool"
  done
  [[ -x $unpacked/Tools/prepare-book.command && ! -e $unpacked/sync-git-sources.sh ]]
  [[ -s $unpacked/Book/appendix/titulaciones-soportadas.tex && -s $unpacked/Book/cover/urjc/portada-tfg-eif-urjc.tex ]]
  cmp "$unpacked/Book/appendix/titulaciones-soportadas.tex" "$unpacked/Book/appendix/orig/titulaciones-soportadas.tex"
  grep -Fq '\item \texttt{TEST-DEGREE}' "$unpacked/Book/appendix/titulaciones-soportadas.tex"
  ! grep -Fq '\DegreeRegistryPrintCatalogue' "$unpacked/Book/appendix/titulaciones-soportadas.tex"
  [[ -s $unpacked/Book/cover/upm/portada-tfm-etsii-upm.tex && -s $unpacked/Book/cover/upm/backpage-tfm-etsii-upm.tex && -s $unpacked/Book/cover/upm/imagen-portada-tfm-etsii-upm.png ]]
  [[ -s $unpacked/Book/cover/us/portada-tfg-etsii-us.tex && -s $unpacked/Book/logos/us/logo-ETSII-US-Horizontal-Color.png ]]
  [[ -s $unpacked/Book/cover/us/portada-tfm-miscdg-etsii-us.tex ]]
  [[ -s $unpacked/Book/logos/us/logo-miscdg-us.png && -s $unpacked/Book/logos/us/MISCDG-LICENSE.txt ]]
  [[ ! -e $unpacked/Documentation && ! -e $unpacked/README-en.md && ! -e $unpacked/README-PROYECTO.md ]]
  for form in "$repository_root/PapeleoTFG/"TFG-Anexo*.tex; do
    cmp "$form" "$unpacked/PapeleoTFG/${form##*/}"
  done
  cmp "$source_root/Config/grades-calculation.tex" "$unpacked/Config/grades-calculation.tex"
  [[ ! -e $unpacked/PapeleoTFG/TFG-AutorizacionAutorPubAbierto-EPS-UAH.tex ]]
  [[ ! -e $unpacked/PapeleoTFG/TFG-GuiaPapeleo-EPS-UAH.tex ]]
  [[ -s $unpacked/PapeleoTFG/TFG-GuiaPapeleo-EPS-UAH.pdf ]]
done
diff -r "$fixture/tgz" "$fixture/zip"
[[ $(sha256sum "${upstream_files[@]}") == "$upstream_before" ]]
for appendix in "${appendices[@]}"; do
  cmp "$source_root/$appendix" "$fixture/tgz/$appendix"
  appendix_prose "$source_root/$appendix" | cmp - "$fixture/${appendix//\//-}.prose"
  # An unchanged rebuild must not touch the generated sources' timestamps.
  touch -t 202001010000 "$source_root/$appendix"
done
run_distribution false >"$fixture/rebuild.log" 2>&1 || { cat "$fixture/rebuild.log" >&2; exit 1; }
for appendix in "${appendices[@]}"; do
  cmp "$source_root/$appendix" "$fixture/tgz/$appendix"
  [[ ! $source_root/$appendix -nt $fixture/${appendix//\//-}.prose ]]
  tar -xOf "$source_root/$base.tgz" "./$appendix" | cmp - "$source_root/$appendix"
  unzip -p "$source_root/$base.zip" "$appendix" | cmp - "$source_root/$appendix"
done

# Both publication modes pass the same file to the comparison and every sample.
mkdir "$fixture/dropbox"
export EXPECTED_CATALOGUE="$fixture/tgz/Book/appendix/titulaciones-soportadas.tex"
export EXPECTED_DISTRIBUTION_BASE="$source_root/$base"
export SAMPLE_CATALOGUE_LOG="$fixture/sample-catalogue.log"
export CATALOGUE_EXPORT_LOG="$fixture/catalogue-export.log"
export FAIL_CATALOGUE_EXPORT=false
for mode in archive standalone; do
  options=()
  if [[ $mode == archive ]]; then options+=(--include-distribution); fi
  : >"$SAMPLE_CATALOGUE_LOG"
  : >"$CATALOGUE_EXPORT_LOG"
  PATH="$fixture/bin:$PATH" bash "$source_root/AdminScripts/go.gen-public-sample-pdfs.sh" \
    --destination "$fixture/dropbox" "${options[@]}" >"$fixture/publication.log" 2>&1 ||
    { cat "$fixture/publication.log" >&2; exit 1; }
  sample_count=$(sed -n '/^samples=(/,/^)/p' "$source_root/AdminScripts/go.gen-public-sample-pdfs.sh" | grep -c "^  '")
  [[ $(wc -l <"$SAMPLE_CATALOGUE_LOG") == $((sample_count + 1)) ]]
  [[ $(sort -u "$SAMPLE_CATALOGUE_LOG" | wc -l) == 1 ]]
  if [[ $mode == archive ]]; then
    [[ ! -s $CATALOGUE_EXPORT_LOG ]]
  else
    [[ $(wc -l <"$CATALOGUE_EXPORT_LOG") == 1 ]]
  fi
done

# Do not build public samples from a catalogue exported from an older registry.
printf 'Changed registry\n' >>"$source_root/Config/degrees.tex"
if PATH="$fixture/bin:$PATH" bash "$source_root/AdminScripts/go.gen-public-sample-pdfs.sh" \
  --destination "$fixture/dropbox" --include-distribution >"$fixture/stale.log" 2>&1; then exit 1; fi
grep -Fq 'the archive does not match Config/degrees.tex' "$fixture/stale.log"
cp "$fixture/tgz/Config/degrees.tex" "$source_root/Config/degrees.tex"

# Preflight rejects missing and empty templates without replacing old archives.
archives_before=$(sha256sum "$source_root/$base.zip" "$source_root/$base.tgz")
appendix_before=$(cd "$source_root" && sha256sum "${appendices[@]}")
if run_distribution true >"$fixture/export-failure.log" 2>&1; then exit 1; fi
grep -q 'could not export the degree catalogue' "$fixture/export-failure.log"
[[ $(sha256sum "$source_root/$base.zip" "$source_root/$base.tgz") == "$archives_before" ]]
[[ $(cd "$source_root" && sha256sum "${appendices[@]}") == "$appendix_before" ]]
mv "$source_root/Documentation/es/README-PROYECTO.md" "$fixture/project-readme.md"
if run_distribution false >"$fixture/missing.log" 2>&1; then exit 1; fi
grep -q 'project README template is missing or empty' "$fixture/missing.log"
: >"$source_root/Documentation/es/README-PROYECTO.md"
if run_distribution false >"$fixture/empty.log" 2>&1; then exit 1; fi
grep -q 'project README template is missing or empty' "$fixture/empty.log"
[[ $(sha256sum "$source_root/$base.zip" "$source_root/$base.tgz") == "$archives_before" ]]
echo 'PASS: identical ZIP/TGZ catalogues, repeatable checkout refresh, public reuse and failed-export preflight.'

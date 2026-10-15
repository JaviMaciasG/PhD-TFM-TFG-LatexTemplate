#!/usr/bin/env bash
# Exercise real cleanup commands only inside disposable, isolated source trees.
set -euo pipefail
repository_root=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/../.." && pwd)
fixture=$(mktemp -d)
trap 'rm -rf -- "$fixture"' EXIT
cp -a "$repository_root/Config" "$fixture/Config"
before=$(sha256sum "$repository_root/Makefile" "$repository_root/Config/myconfig.tex")
extensions=(aux bbl bcf blg fdb_latexmk fls log out run.xml synctex.gz vdo acn acr alg sbl sym slg glo gls glg glsdefs ist toc lof lot lol loa cod idx ind ilg)
components=(Book Anteproyecto PapeleoTFG PapeleoTFM PapeleoPHD)

make_value() {
  make --no-print-directory -s -C "$fixture/$1" \
    --eval="print-cleanup-value:;@printf '%s\\n' \$($2)" print-cleanup-value
}

write_source() {
  mkdir -p -- "$(dirname -- "$1")"
  printf '%s\n' '\documentclass{article}' '\begin{document}' 'Cleanup fixture.' '\end{document}' > "$1"
}

for component in "${components[@]}"; do
  directory="$fixture/$component"
  mkdir -p "$directory/figures"
  cp "$repository_root/$component/Makefile" "$directory/Makefile"
  case $component in
    Book|Anteproyecto)
      if [[ $component == Book ]]; then root=book; else root=anteproyecto; fi
      sources=("$root.tex" "$root-flatten.tex" "$root-flatten-snapshot.tex" "$root-flatten-diff.tex")
      if [[ $component == Book ]]; then
        write_source "$directory/chapters/example.tex"
        write_source "$directory/chapters/compendium/example.tex"
        write_source "$directory/appendix/example.tex"
      fi
      ;;
    PapeleoPHD)
      sources=(02-TesisDoctoral/PHD-FixtureThesis.tex 03-MencionInternacional/PHD-FixtureStay.tex)
      root=PHD-FixtureThesis
      ;;
    *)
      read -r -a sources <<< "$(make_value "$component" TEXFILES | tr '\n' ' ')"
      sources+=("$(make_value "$component" GUIDE_TEX)")
      root=${sources[0]%.tex}
      ;;
  esac
  for source in "${sources[@]}"; do write_source "$directory/$source"; done
  if [[ $component == PapeleoPHD ]]; then root_source=${sources[0]}; else root_source="$root.tex"; fi
  mapfile -t stems < <(printf '%s\n' "${sources[@]%.tex}" | while IFS= read -r stem; do
    printf '%s\n' "$stem" "${stem##*/}"
  done | sort -u)
  extra_stems=()
  [[ $component != Book ]] || extra_stems=(chapters/example chapters/compendium/example appendix/example)
  outputs=()
  for stem in "${stems[@]}"; do outputs+=("$stem.pdf"); done
  if [[ $component == Book ]]; then
    export_name=$(make_value Book ROOT_FINAL_BOOK_FILENAME)
    outputs+=(book-compressed.pdf "$export_name.pdf" "$export_name-compressed.pdf")
  fi
  printf 'Input PDF - preserve\n' > "$directory/figures/source.pdf"
  printf 'Unrelated PDF - preserve\n' > "$directory/unrelated.pdf"
  source_hashes=$(cd "$directory" && sha256sum "${sources[@]}" figures/source.pdf unrelated.pdf)
  for old_target in cleanall clean_latexmk; do
    if make --no-print-directory -n -C "$directory" "$old_target" > "$fixture/old-target.log" 2>&1; then
      echo "FAIL: obsolete $component/$old_target target still exists" >&2
      exit 1
    fi
  done
  for metadata in missing recorded; do
    if [[ $metadata == recorded ]]; then
      if ! (cd "$directory" && latexmk -pdf -interaction=nonstopmode -halt-on-error \
          -r ../Config/latexmkrc "$root_source") > "$fixture/build.log" 2>&1; then
        tail -n 40 "$fixture/build.log" >&2
        exit 1
      fi
    fi
    for target in clean distclean; do
      for stem in "${stems[@]}" "${extra_stems[@]}" obsolete-form-name; do
        for extension in "${extensions[@]}"; do
          [[ $metadata != missing || ( $extension != fdb_latexmk && $extension != fls ) ]] || continue
          file="$directory/$stem.$extension"
          [[ ! -e $file ]] || continue
          case $extension in
            aux|bbl) printf '%s\n' '\relax' > "$file" ;;
            fdb_latexmk) printf '# Fdb version 4\n' > "$file" ;;
            *) : > "$file" ;;
          esac
        done
      done
      for output in "${outputs[@]}"; do printf 'Generated PDF\n' > "$directory/$output"; done
      touch "$directory/pdf_dia_done" "$directory/pdf_svg_done" "$directory/pdf_eps_done"
      if ! make --no-print-directory -C "$directory" "$target" > "$fixture/cleanup.log" 2>&1; then
        cat "$fixture/cleanup.log" >&2
        exit 1
      fi
      for stem in "${stems[@]}" "${extra_stems[@]}" obsolete-form-name; do
        for extension in "${extensions[@]}"; do
          [[ ! -e $directory/$stem.$extension ]] || { echo "FAIL: $target retained $component/$stem.$extension" >&2; exit 1; }
        done
      done
      for output in "${outputs[@]}"; do
        if [[ $target == clean ]]; then
          [[ -s $directory/$output ]] || { echo "FAIL: clean removed $component/$output" >&2; exit 1; }
        else
          [[ ! -e $directory/$output ]] || { echo "FAIL: distclean retained $component/$output" >&2; exit 1; }
        fi
      done
      [[ $(cd "$directory" && sha256sum "${sources[@]}" figures/source.pdf unrelated.pdf) == "$source_hashes" ]]
      make --no-print-directory -s -C "$directory" "$target" > "$fixture/repeated.log" 2>&1
      printf 'PASS: %s %s (%s dependency metadata)\n' "$component" "$target" "$metadata"
    done
  done
  if [[ $component == PapeleoTFG || $component == PapeleoTFM ]]; then
    guide=$(make_value "$component" GUIDE_DOCUMENT)
    mv "$directory/$guide.tex" "$fixture/$guide.tex"
    printf 'Distributed guide PDF - preserve\n' > "$directory/$guide.pdf"
    for target in clean distclean; do
      make --no-print-directory -s -C "$directory" "$target" > "$fixture/pdf-only.log" 2>&1
      [[ -s $directory/$guide.pdf ]] || { echo "FAIL: $target removed PDF-only $component guide" >&2; exit 1; }
    done
    printf 'PASS: %s protects PDF-only distributed guide\n' "$component"
  fi
done
[[ $before == "$(sha256sum "$repository_root/Makefile" "$repository_root/Config/myconfig.tex")" ]]
echo 'PASS: working sources, root Makefile, and personal configuration unchanged'

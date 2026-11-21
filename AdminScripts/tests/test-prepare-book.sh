#!/usr/bin/env bash
set -euo pipefail
root=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/../.." && pwd)
temporary=$(mktemp -d)
trap 'rm -rf -- "$temporary"' EXIT
project="$temporary/Proyecto con espacios y acentos á"
mkdir -p "$project/Book" "$project/Config" "$temporary/bin"
cp -a "$root/Tools" "$project/"
cp "$root/Config/myconfig.tex" "$project/Config/"
cp "$root/Book/"{book,content-standard,content-compendium}.tex "$project/Book/"
cp -a "$root/Book/"{chapters,appendix} "$project/Book/"
cd "$project"
snapshot() {
    find Book Config -type f ! -path 'Book/.[0-9]*-backup/*' -print0 |
        sort -z | xargs -0 sha256sum
}
run() { (cd "$temporary" && printf '%s\n' "$@" | sh "$project/Tools/prepare-book.sh"); }
set_degree() { sed -i "s/^\\\\newcommand{\\\\myDegree}{[^}]*}/\\\\newcommand{\\\\myDegree}{$1}/" Config/myconfig.tex; }

set_degree GIEC
initial=$(snapshot)
cancelled=$(run 1 n)
grep -Fq '[INF] 1. Preparar un documento mínimo' <<<"$cancelled"
grep -Fq '[INF] Elige una opción [3]:' <<<"$cancelled"
grep -Fq '[INF] ¿Continuar? [s/N]' <<<"$cancelled"
grep -Fq '[INF] Cancelado' <<<"$cancelled"
[[ $(snapshot) == "$initial" ]]
! compgen -G 'Book/.[0-9]*-backup' >/dev/null
set_degree UNKNOWN
initial=$(snapshot)
if run 1 s >"$temporary/unknown.log" 2>&1; then exit 1; fi
grep -q 'no reconocida' "$temporary/unknown.log"
[[ $(snapshot) == "$initial" ]]
set_degree GIEC
mv Book/chapters/bare/desarrollo.tex "$temporary/"
initial=$(snapshot)
if run 1 s >"$temporary/missing.log" 2>&1; then exit 1; fi
grep -q 'desarrollo.tex' "$temporary/missing.log"
[[ $(snapshot) == "$initial" ]]
mv "$temporary/desarrollo.tex" Book/chapters/bare/
printf 'Capítulo del estudiante\n' >'Book/chapters/mi capítulo.tex'
printf 'No se sustituye\n' >'Book/appendix/datos.txt'
initial=$(snapshot)
export REAL_CP=$(command -v cp)
# Fail during a selected stage, but let rollback copy from the backup.
printf '%s\n' '#!/bin/sh' 'case "$FAIL_COPY_STAGE" in' \
  '  backup) case "$*" in *"-backup/"*) exit 91 ;; esac ;;' \
  '  apply) case "$*" in *"chapters/bare/desarrollo.tex"*) exit 92 ;; esac ;;' \
  'esac' 'exec "$REAL_CP" "$@"' >"$temporary/bin/cp"
chmod +x "$temporary/bin/cp"
for stage in backup apply; do
    if FAIL_COPY_STAGE=$stage PATH="$temporary/bin:$PATH" run 1 s >"$temporary/$stage.log" 2>&1; then exit 1; fi
    [[ $(snapshot) == "$initial" ]]
done
grep -q '^\[ERR\].*No se ha sustituido' "$temporary/backup.log"
grep -q '^\[WRN\].*Recuperando los archivos originales' "$temporary/apply.log"
grep -q '^\[ERR\].*recuperado los archivos originales' "$temporary/apply.log"

for degree in GIEC PHDUAH-COMPENDIUM; do
    set_degree "$degree"
    if [[ $degree == GIEC ]]; then
        active=Book/chapters
        content=content-standard.tex
    else
        active=Book/chapters/compendium
        content=content-compendium.tex
    fi
    printf 'Capítulo propio\n' >"$active/mi capítulo.tex"
    config_before=$(sha256sum Config/myconfig.tex)
    for mode in bare orig; do
        choice=1; [[ $mode != orig ]] || choice=2
        output=$(run "$choice" s)
        backup=$(sed -n 's/^\[INF\] Copia de seguridad: //p' <<<"$output")
        [[ $backup =~ ^Book/\.[0-9]{8}-[0-9]{6}-backup$ && -d $backup ]]
        grep -Fq "[INF] Antes de sustituir los archivos, se creará una copia en $backup." <<<"$output"
        grep -Fq '[INF] Creando la copia de seguridad...' <<<"$output"
        grep -Fq '[INF] Sustituyendo los archivos de contenido...' <<<"$output"
        grep -Fq '[INF] Operación completada.' <<<"$output"
        [[ ! -e "$active/mi capítulo.tex" ]]
        if [[ $mode == bare ]]; then [[ -f "$backup/$active/mi capítulo.tex" ]]; fi
        cmp "$active/$mode/$content" "Book/$content"
        for source in "$active/$mode/"*.tex; do
            [[ ${source##*/} == "$content" ]] || cmp "$source" "$active/${source##*/}"
        done
        if [[ $degree == GIEC ]]; then
            for source in "Book/appendix/$mode/"*.tex; do cmp "$source" "Book/appendix/${source##*/}"; done
        fi
        [[ $(sha256sum Config/myconfig.tex) == "$config_before" ]]
        [[ -f Book/appendix/datos.txt ]]
    done
done
printf '3\n\n' | "$project/Tools/prepare-book.command" >/dev/null
echo 'PASS: prepare and restore both structures; validate, back up, recover and preserve unrelated files.'

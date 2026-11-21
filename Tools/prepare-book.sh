#!/bin/sh
# Student helper. Keep the batch version's scope and safeguards in sync.
set -eu

# Keep file-manager terminals open, without blocking redirected input.
if [ -t 0 ] && [ -t 1 ]; then
  wait_before_exit() {
    status=$?
    trap - 0
    printf '\n%s Pulsa Intro para cerrar. ' "$inf"
    IFS= read -r ignored || :
    exit "$status"
  }
  trap wait_before_exit 0
fi

inf='[INF]'
wrn='[WRN]'
err='[ERR]'
if [ -z "${NO_COLOR:-}" ] && [ "${TERM:-dumb}" != dumb ]; then
  if [ -t 1 ]; then inf=$(printf '\033[32m[INF]\033[0m'); fi
  if [ -t 2 ]; then
    wrn=$(printf '\033[33m[WRN]\033[0m')
    err=$(printf '\033[31m[ERR]\033[0m')
  fi
fi
info() {
  for message do printf '%s %s\n' "$inf" "$message"; done
}
prompt() { printf '%s %s' "$inf" "$*"; }
warn() { printf '%s %s\n' "$wrn" "$*" >&2; }
fail() { printf '%s %s\n' "$err" "$*" >&2; exit 1; }

info 'Comprobando la plantilla...'
root=$(CDPATH='' cd "$(dirname "$0")/.." && pwd -P) || fail 'No se pudo localizar el proyecto.'
cd "$root" || fail 'No se pudo abrir la carpeta del proyecto.'

safe_dir() { [ -d "$1" ] && [ ! -L "$1" ]; }
safe_file() { [ -f "$1" ] && [ ! -L "$1" ]; }
for dir in Config Book Tools Book/chapters; do
  safe_dir "$dir" || fail "Falta una carpeta de la plantilla o no es segura: $dir"
done
for file in Config/myconfig.tex Tools/estructuras.tsv Book/book.tex; do
  safe_file "$file" || fail "Falta un archivo de la plantilla o no es seguro: $file"
done
degree=$(awk '
  { sub(/%.*/, ""); sub(/\r$/, "") }
  /^[[:space:]]*\\(newcommand|renewcommand)[[:space:]]*\{\\myDegree\}/ {
    count++
    if ($0 !~ /^[[:space:]]*\\(newcommand|renewcommand)[[:space:]]*\{\\myDegree\}[[:space:]]*\{[A-Za-z0-9-]+\}[[:space:]]*$/) bad=1
    sub(/^[^}]*\}[[:space:]]*\{/, ""); sub(/\}[[:space:]]*$/, ""); id=$0
  }
  END { if (count != 1 || bad) exit 1; print id }
' Config/myconfig.tex) || fail 'No se pudo leer una única titulación en Config/myconfig.tex.'
structure=$(awk -v id="$degree" '
  $1 == id { count++; if (NF != 2) bad=1; value=$2 }
  END { if (count != 1 || bad) exit 1; print value }
' Tools/estructuras.tsv) || fail "Titulación no reconocida: $degree"
case "$structure" in
  standard) label=convencional; dirs='Book/chapters Book/appendix' ;;
  compendium) label='por compendio'; dirs=Book/chapters/compendium ;;
  *) fail "Estructura no reconocida para $degree." ;;
esac
content=content-$structure.tex

info '1. Preparar un documento mínimo' '2. Restaurar los ejemplos de la plantilla' '3. Salir'
prompt 'Elige una opción [3]: '
IFS= read -r choice || choice=''
case "$choice" in
  1) mode=bare; action='Preparar un documento mínimo' ;;
  2) mode=orig; action='Restaurar los ejemplos de la plantilla' ;;
  3|'') exit 0 ;;
  *) fail 'Opción no válida.' ;;
esac

# Build the lists inside functions to preserve paths with spaces and accents.
# Globs below only select immediate .tex entries, never descendants.
entries() {
  for dir in $dirs; do
    for file in "$dir"/*.tex; do
      [ -e "$file" ] || [ -L "$file" ] || continue
      "$1" "$file" || return 1
    done
  done
  "$1" "Book/$content"
}
install_sources() {
  for dir in $dirs; do
    for file in "$dir/$mode"/*.tex; do
      [ -e "$file" ] || [ -L "$file" ] || continue
      name=${file##*/}
      if [ "$dir" = "${dirs%% *}" ] && [ "$name" = "$content" ]; then
        dest=Book/$content
      else
        dest=$dir/$name
      fi
      "$1" "$file" "$dest" || return 1
    done
  done
}

for dir in $dirs; do
  safe_dir "$dir" && safe_dir "$dir/$mode" || fail "Falta una carpeta o no es segura: $dir/$mode"
  found=no
  for file in "$dir/$mode"/*.tex; do
    [ -e "$file" ] || [ -L "$file" ] || continue
    safe_file "$file" || fail "No se puede usar: $file"
    [ "${file##*/}" = "$content" ] || found=yes
  done
  [ "$found" = yes ] || fail "No hay archivos de contenido en $dir/$mode."
done
safe_file "${dirs%% *}/$mode/$content" || fail "Falta $content en la carpeta $mode."
inputs=$(sed -n 's/^[[:space:]]*\\input{\([^}]*\.tex\)}.*/\1/p' "${dirs%% *}/$mode/$content") || fail "No se pudo leer $content."
while IFS= read -r input; do
  for dir in $dirs; do
    case "$input" in
      "${dir#Book/}/"*)
        name=${input#"${dir#Book/}/"}
        case "$name" in */*) continue ;; esac
        safe_file "$dir/$mode/$name" || fail "Falta el archivo de origen $dir/$mode/$name."
        ;;
    esac
  done
done <<EOF
$inputs
EOF
entries safe_file || fail 'Falta el archivo de organización o hay archivos de destino que no son seguros.'
while :; do
  stamp=$(date +%Y%m%d-%H%M%S) || fail 'No se pudo obtener la fecha de la copia de seguridad.'
  backup="Book/.$stamp-backup"
  if [ ! -e "$backup" ] && [ ! -L "$backup" ]; then break; fi
  sleep 1
done
printf '\n'
info "$action"
info "Titulación: $degree ($label)." "Carpetas: $dirs." "Archivo: Book/$content."
info "Antes de sustituir los archivos, se creará una copia en $backup."
prompt '¿Continuar? [s/N] '
IFS= read -r answer || answer=''
case "$answer" in s|S|si|Si|SI|sí|Sí|SÍ) ;; *) info 'Cancelado. No se ha cambiado ningún archivo.'; exit 0 ;; esac

info 'Creando la copia de seguridad...'
(umask 077; mkdir "$backup" 2>/dev/null) || fail "No se pudo crear la copia de seguridad en $backup."
save_file() {
  mkdir -p "$backup/${1%/*}" 2>/dev/null && cp -p "$1" "$backup/$1" 2>/dev/null
}
entries save_file || fail "No se ha sustituido ningún archivo. Copia incompleta en $backup."

remove_file() { rm -f "$1" 2>/dev/null; }
copy_file() { cp -p "$1" "$2" 2>/dev/null; }
recover() {
  trap - HUP INT TERM
  warn 'No se pudo completar la sustitución. Recuperando los archivos originales...'
  recovered=yes
  for dir in $dirs; do
    for file in "$dir"/*.tex; do
      [ -e "$file" ] || [ -L "$file" ] || continue
      remove_file "$file" || recovered=no
    done
    for file in "$backup/$dir"/*.tex; do
      [ -f "$file" ] || continue
      copy_file "$file" "$dir/" || recovered=no
    done
  done
  copy_file "$backup/Book/$content" "Book/$content" || recovered=no
  if [ "$recovered" = yes ]; then
    fail "No se completó la operación. Se han recuperado los archivos originales. Copia: $backup"
  fi
  fail "No se pudo recuperar todo automáticamente. Recupera tus archivos desde $backup."
}
info 'Sustituyendo los archivos de contenido...'
trap recover HUP INT TERM
entries remove_file && install_sources copy_file || recover
trap - HUP INT TERM
printf '\n'
info 'Operación completada.'
info "Copia de seguridad: $backup" 'Abre y compila Book/book.tex.'

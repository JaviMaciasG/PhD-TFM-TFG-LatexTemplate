# CLAUDE.md

Guía para trabajar en este repositorio: una plantilla LaTeX genérica para TFG/TFM/Tesis (principalmente orientada a la Universidad de Alcalá, UAH), escrita en español pero configurable a inglés. La documentación humana de referencia es `README.md` (introducción y guía general), `HOWTO.md` (guía rápida por directorios) y `REPOSITORY_OVERVIEW.md` (resumen arquitectónico); este archivo resume lo esencial para operar en el repo día a día.

## Estructura del proyecto

- `Book/` — el documento final (TFG/TFM/Tesis). Contiene `book.tex` como fichero orquestador y subdirectorios de contenido:
  - `Book/chapters/` — capítulos principales: `introduccion.tex`, `estudioTeorico.tex`, `desarrollo.tex`, `resultados.tex`, `conclusiones.tex`. Cada uno se incluye desde `book.tex` con `\input{chapters/...}`.
  - `Book/appendix/` — apéndices (`manual.tex`, `herramientas.tex`, `versiones.tex`), incluidos dentro de `\begin{appendices}...\end{appendices}` en `book.tex`.
  - `Book/abstract/` — `resumen.tex` / `abstract.tex` (y `resumen-extendido.tex`, opcional/solo TFG).
  - `Book/dedication/`, `Book/acknowledgements/` — dedicatoria y agradecimientos.
  - `Book/biblio/` — ficheros de bibliografía (ver sección propia más abajo).
  - `Book/acronyms/`, `Book/symbols/` — definición y listado de acrónimos/símbolos (ver sección propia).
  - `Book/cover/` — portadas/contraportadas específicas por titulación/universidad; `cover.tex` selecciona automáticamente la variante según `\myWorkType` y el código de titulación definido en `Config/myconfig.tex`. No se edita `cover.tex` salvo necesidad avanzada; si acaso se edita el fichero de portada concreto (p.ej. `portada-tfg-uah-2024.tex`).
  - `Book/figures/`, `Book/diagrams/` — imágenes propias del usuario (el `\graphicspath` de `book.tex` busca en `logos/`, `figures/` y `diagrams/`; `logos/` es solo para logos de la plantilla).
  - Carpetas `orig/` y `bare/` dentro de `chapters/`/`appendix/` son variantes de ejemplo/plantilla vacía — no forman parte del documento activo salvo que se referencien explícitamente.
- `Anteproyecto/` — plantilla y flujo de compilación del anteproyecto (`anteproyecto.tex` es el fichero principal a editar).
- `Config/` — configuración global y lógica de compilación compartida entre `Book/` y `Anteproyecto/`:
  - `Config/myconfig.tex` — **fichero central de configuración de usuario**. Todas las variables usan el prefijo `\my` (p.ej. `\myLanguage`, `\myDegree`, `\myAuthorName`). No se debe borrar ni comentar ninguna línea de definición de variable; si una variable no aplica, se deja vacía (`{}`).
  - `Config/preamble.tex`, `Config/postamble.tex` — no tocar salvo usuario avanzado; `postamble.tex` deriva macros en tiempo de compilación (idioma, género gramatical, singular/plural de tutores, tipo de trabajo, etc.) a partir de `myconfig.tex`.
  - `Config/glossaries.tex` — configuración de glosarios/acrónimos.
  - `Config/colors.tex` — colores y estilos.
  - `Config/config-bibbackend.tex` — selección de backend bibliográfico.
  - `Config/worktypes.txt` — mapeo de código de titulación → tipo de trabajo (TFG/TFM/PhD/...), usado por el Makefile y la lógica de portadas.
- `PapeleoTFG/`, `PapeleoTFM/`, `PapeleoPHD/` — plantillas de papeleo administrativo específico por tipo de documento (informes de tutor, rúbricas, autorizaciones de publicación en abierto, etc.), cada uno con su propio `Makefile`.
- `normativas/` — normativa oficial (PDF/DOCX) de referencia, no se edita.
- `AdminScripts/` — scripts de utilidad para mantenimiento/distribución del propio repositorio de la plantilla.
- `UsefulDocs/` — chuletas y documentación de referencia de LaTeX.
- `Deprecated/` — material antiguo conservado por compatibilidad; no usar para contenido nuevo.

## Bibliografía

- Backend por defecto: **biber** (desde 2022). Hay que configurar el editor para usar `biber` en vez de `bibtex` (en TeXStudio: `Options > Configure TeXstudio > Build > Default Bibliography > Biber`).
- Para añadir/activar ficheros `.bib`, se edita **únicamente** `Book/biblio/bibliofiles.tex`, definiendo `\mybibfileOne`, `\mybibfileTwo`, ... `\mybibfileTen` (ampliable hasta 25 editando también `Config/preamble.tex` y `Book/biblio/bibliography.tex`). Los ficheros deben residir en `Book/biblio/`.
- Las entradas bibliográficas propiamente dichas van en `Book/biblio/biblio.bib` (y opcionalmente otros `.bib` adicionales referenciados desde `bibliofiles.tex`, como `nobiblio.bib`).
- No se debe editar `Book/biblio/bibliography.tex` (mecanismo interno que ensambla los ficheros declarados en `bibliofiles.tex`).
- Si se prefiere `bibtex` en vez de `biber`: definir `\bibliosystem` a `bibtex` en `Config/preamble.tex` y convertir `biblio/biblio.bib` a codificación ISO-8859-1.

## Acrónimos y símbolos

- Basado en el paquete `glossaries`.
- Definición de acrónimos: `Book/acronyms/defacronymsgl.tex` (usa `\newacronym{CLAVE}{SIGLA}{Expansión}`, o `\newglossaryentry` para casos con plural irregular).
- Configuración de presentación/listado de acrónimos: `Book/acronyms/acronymsgl.tex` (título del listado según idioma, ancho de columna de descripción, etc.).
- Símbolos siguen el mismo patrón en `Book/symbols/defsymbolsgl.tex` (definición) y `Book/symbols/symbolsgl.tex` (presentación).
- Uso en el texto: `\ac{CLAVE}` (expande la primera vez, luego usa solo la sigla), `\acs{CLAVE}` (fuerza sigla), `\acf{CLAVE}` (fuerza forma completa), `\acl{CLAVE}` (solo forma larga), `\acp{CLAVE}` (plural). `\glsresetall[acronym]` reinicia el estado "ya usado" de todos los acrónimos.
- Ambos ficheros de definición se incluyen desde `book.tex` antes del resumen/abstract, por si se quieren usar acrónimos ahí también.

## Convención de labels

Los `\label{}` siguen un prefijo por tipo de elemento, con el nombre en minúsculas y guiones:

- `cha:` — capítulos (p.ej. `\label{cha:introduccion}`, `\label{cha:desarrollo}`)
- `sec:` — secciones/subsecciones (p.ej. `\label{sec:estadoarte}`, `\label{sec:conclusiones-desarrollo}`)
- `fig:` — figuras (p.ej. `\label{fig:fig1}`)
- `tab:` — tablas (p.ej. `\label{tab:table1}`)
- `eq:` — ecuaciones (p.ej. `\label{eq:eq1}`)

Al añadir contenido nuevo, seguir este mismo esquema de prefijos para mantener la coherencia y que las referencias cruzadas (`\ref{}`) sean legibles.

## Compilación

- Requiere una distribución LaTeX completa (TeX Live, MikTeX, MacTeX) con el backend **`pdflatex` + `biber`**, más `makeglossaries` (necesita un intérprete Perl) para acrónimos/símbolos.
- **Documento principal** (`Book/`):
  ```
  cd Book
  make          # genera book.pdf (varias pasadas de pdflatex + biber + makeglossaries)
  make clean    # limpia ficheros auxiliares
  ```
  El `Makefile` de `Book/` también soporta compresión con Ghostscript (variantes `-screen`/`-compressed`), conversión de figuras (`dia`, `inkscape`, `epspdf`), y flujos de `latexpand`/`latexdiff` para aplanado y diffs del documento.
- **Anteproyecto**: `cd Anteproyecto && make` (misma lógica multi-pasada con soporte de bibliografía).
- **Papeleo**: dentro de `PapeleoTFG/`, `PapeleoTFM/` o `PapeleoPHD/`, `make` compila cada `.tex` a `.pdf` con dos pasadas de LaTeX.
- **Raíz del repo**: `make` en la raíz genera `00-README.pdf` (vía `pandoc`) y delega en `Book/Makefile` para el documento principal.
- En Windows sin `make`, se recomienda compilar directamente desde TeXStudio (configurando biber como procesador de bibliografía, ver arriba).
- En Overleaf, hay que seleccionar manualmente el "main document" correcto (`Book/book.tex`, `Anteproyecto/anteproyecto.tex`, o el fichero de papeleo correspondiente); requiere plan de pago para tener minutos de compilación suficientes.

## Notas de edición

- No tocar las líneas marcadas `DO NOT TOUCH THIS LINE` en `book.tex` (los `\input` de preamble/config/glossaries/postamble y las líneas `\frontmatter`/`\mainmatter`/`\backmatter`); sí se pueden editar los ficheros que esas líneas incluyen, y comentar/descomentar los `\input` de contenido opcional (dedicatoria, agradecimientos, acrónimos, símbolos, capítulos, apéndices, etc.).
- Para añadir un capítulo nuevo: crear el `.tex` en `Book/chapters/` y añadir `\include{chapters/nombre}` en `Book/book.tex` en la posición deseada.
- Las imágenes van en `Book/figures/` o `Book/diagrams/` e incluirse con `\includegraphics{nombre_sin_extension}` (gracias al `\graphicspath` ya configurado).

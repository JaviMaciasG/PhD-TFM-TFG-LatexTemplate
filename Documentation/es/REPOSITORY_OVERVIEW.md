# Descripción general del repositorio: PhD-TFM-TFG-LatexTemplate

## Qué es este repositorio

Este repositorio es un ecosistema completo de plantillas LaTeX para documentos académicos finales de la Universidad de Alcalá (UAH), que incluye:

- Trabajos Fin de Grado (TFG)
- Trabajos Fin de Máster (TFM)
- Tesis doctorales
- Documentos de anteproyecto/propuesta
- Plantillas de documentación administrativa oficial relacionada

La plantilla es multilingüe (español/inglés), tiene en cuenta la titulación y se controla mediante valores de configuración del usuario centralizados en `Config/myconfig.tex`.

## Estructura de alto nivel

Directorios de nivel superior y su función principal:

- `Book/`: plantilla principal del documento extenso de tesis/libro, con `book.tex` como punto de entrada estable, el fichero de organización normal `content-standard.tex` y la alternativa especializada `content-compendium.tex`.
- `Anteproyecto/`: plantilla del documento de anteproyecto y flujo de compilación.
- `Config/`: configuración global básica y lógica de compilación (`preamble`, `postamble`, gestión del idioma/tipo de trabajo y los perfiles de maquetación exclusivos de Book en `Config/typesetting/`).
- `PapeleoTFG/`, `PapeleoTFM/`, `PapeleoPHD/`: plantillas de documentación administrativa por tipo de documento.
- `normativas/`: normativas oficiales y anexos en formato PDF/DOCX.
- `AdminScripts/`: automatización de publicaciones y regresión destinada únicamente a mantenedores.
- `Documentation/`: guías de usuario, documentación para mantenedores y notas del repositorio. Los ficheros README permanecen en la raíz.
- `UsefulDocs/`: documentación de referencia (hojas de consulta y símbolos).
- `Deprecated/`: material heredado conservado como referencia.

El fichero `sync-git-sources.sh` de la raíz es la implementación orientada al usuario que hay detrás de `make sync-git-sources`; se mantiene fuera de `AdminScripts/` porque se distribuye con la plantilla y no es una utilidad para mantenedores.

Instantánea del volumen del repositorio (ficheros bajo control de versiones):

- Ficheros totales: 719
- Ficheros TeX: 238
- Ficheros PDF: 129
- Documentos Word (`.doc/.docx`): 25

## Flujo de trabajo principal del usuario

1. Configure los metadatos personales/de la titulación en `Config/myconfig.tex`.
2. Mantenga la estructura normal `standard`, edite `Book/content-standard.tex` y escriba los capítulos, resúmenes, apéndices y bibliografía correspondientes. Solo los estudiantes de doctorado que utilicen la modalidad por compendio seleccionan la estructura especializada `content-compendium.tex`.
3. Compile `Book/book.tex` con su editor LaTeX o herramienta de compilación habitual configurada para `biber`; de forma opcional, use `make` desde `Book/` para automatizar la secuencia completa.
4. Si lo desea, compile `Anteproyecto/` y las plantillas de documentación correspondientes en los directorios `Papeleo*`.

El `Makefile` de la raíz también puede generar una versión PDF del README y delegar la compilación en `Book/`. En los checkouts del repositorio carga opcionalmente `AdminScripts/maintainer.mk`, que añade el objetivo `make distrib`, exclusivo para mantenedores; ese fragmento no está presente en las distribuciones de usuario.

## Modelo de compilación y herramientas

### Compilación desde la raíz

- El objetivo `all` del `Makefile` genera:
  - `README.pdf` mediante `pandoc`
  - El `book` principal delegando en `Book/Makefile`
- `make -C Documentation` genera únicamente `README.pdf` y `TYPESETTING-STYLES-COMPARISON.pdf` en español en la raíz del repositorio. Las demás guías siguen como fuentes Markdown en los directorios por idioma; la guía de descarga de Dropbox se renderiza en su destino de publicación y la guía completa de estilos se renderiza en el área temporal de preparación de la distribución. Los archivos ZIP/TGZ renombran los dos primeros como `00-README.pdf` y `02-TYPESETTING-STYLES-COMPARISON.pdf`.
- El objetivo opcional `distrib`, exclusivo para mantenedores, lee `RELEASE.txt`, genera la guía de estilos de maquetación renderizada y delega en `AdminScripts/go.build-distribution.sh` para crear archivos de usuario `.tgz` y `.zip` equivalentes a partir de una lista estructural de elementos permitidos. Los archivos incluyen `04-TYPESETTING-STYLES-GUIDE.pdf`, pero excluyen la carpeta fuente `Documentation/`.

### Flujo de compilación de Book

`Book/Makefile` utiliza `latexmk` para seguir las dependencias y dirigir una compilación incremental que incluye:

- Múltiples pasadas de `pdflatex` cuando son necesarias
- Procesado de la bibliografía con `biber` cuando es necesario
- Procesado condicional con `makeglossaries` para glosarios, acrónimos y símbolos
- Compatibilidad con la conversión de figuras/diagramas (`dia`, `inkscape`, `epspdf`)
- Salida comprimida con Ghostscript (`-compressed`); la antigua salida de baja calidad `-screen` está deshabilitada
- Flujos de aplanado/instantánea/diferencias (`latexpand`, `latexdiff`)

### Otros componentes

- `Anteproyecto/Makefile` utiliza la misma capa incremental de `latexmk` con soporte automático de bibliografía.
- Los Makefiles de `PapeleoTFG/`, `PapeleoTFM/` y `PapeleoPHD/` utilizan `latexmk` para seguir las dependencias directas y de configuración compartida de cada documento administrativo.
- Los objetivos de raíz `anteproyecto`, `paperwork` y `all-documents` pueden orquestar opcionalmente estos componentes; `paperwork` selecciona el directorio correspondiente al tipo de titulación configurado.
- El objetivo de raíz `sync-git-sources` invoca `sync-git-sources.sh` para actualizar el índice Git de un usuario a partir de las dependencias del libro, el anteproyecto y la documentación administrativa; el script se niega a ejecutarse en el repositorio oficial de la plantilla marcado como tal.
- Las opciones compartidas del motor y la integración de glosarios están en `Config/latex-common.mk` y `Config/latexmkrc`.
- `AdminScripts/build-book-typesetting-prototypes.sh` genera muestras aisladas del libro completo para los perfiles visuales registrados. `AdminScripts/build-book-style-comparisons.sh` utiliza Python y PyMuPDF para añadir preliminares bilingües neutros y extraer, etiquetar y componer las páginas de comparación.
- `AdminScripts/go.gen-public-sample-pdfs.sh` genera la matriz pública reducida de Dropbox y, opcionalmente, publica sus PDF junto con `RELEASE.txt` tras una confirmación interactiva. El objetivo `publish-dropbox`, exclusivo para mantenedores, también genera y publica ambos archivos de versión validados en la misma operación confirmada. El antiguo `go.gen-all-pdfs.sh` sigue siendo el generador de regresión exhaustivo.

## Arquitectura de configuración

### Configuración principal del usuario

`Config/myconfig.tex` es el fichero central de personalización. Expone macros estructuradas para:

- Idioma (`spanish` / `english`)
- Estructura del documento (`standard` para el uso normal y `compendium` para la modalidad especializada de doctorado)
- Estilo de maquetación de Book y política de fuentes de las páginas institucionales (`\myTypesettingStyle` y `\myInstitutionalPageFontMode`)
- Elementos preliminares opcionales y listas generadas mediante los conmutadores validados `\myInclude...`
- Código de titulación (por ejemplo, `GIEC`, `MUIT`, `PHDUAH`)
- Datos de identidad del autor y del tutor
- Metadatos de afiliación del departamento y específicos del proyecto
- Fechas, opciones legales/de publicación y calificaciones
- Colores de enlaces y macros auxiliares opcionales

### Registro de titulaciones y maquetaciones

`Config/degrees.tex` es el registro de referencia de identificadores de titulaciones, categorías de trabajo (`TFG`, `TFM`, `PhD`, etc.), nombres visibles, instituciones y centros. `Config/institutions.tex` define los nombres de las universidades, sus siglas y el estilo institucional que se carga para cada universidad. Los colores compartidos están en `Config/colors.tex`, mientras que los colores de marca y las utilidades para portadas están en `Config/institution-styles/`. `Config/layout-profiles.tex` relaciona las entradas de titulaciones con sus ficheros de portada y contraportada. Las herramientas de compilación consultan el mismo registro mediante `Config/query-degree-registry.sh`.

### Posconfiguración dinámica

`Config/postamble.tex` deriva macros en tiempo de ejecución a partir de la configuración del usuario y gestiona:

- Etiquetas y textos dependientes del idioma
- Variantes gramaticales dependientes del género
- Redacción singular/plural para tutores
- Tipo de trabajo y metadatos del documento utilizados en portadas y documentación administrativa

## Modelo de composición del documento

`Book/book.tex` es el orquestador estable. Se encarga de:

- Cargar las capas de preámbulo/configuración/glosario/posámbulo.
- Cargar el despachador de maquetación exclusivo de Book, que valida los dos selectores visuales y aplica el perfil seleccionado antes de que comience el documento.
- Establecer las rutas de búsqueda de gráficos (`logos`, `figures`, `diagrams`).
- Construir los preliminares (portadas, cartas, dedicatoria, agradecimientos, listas, acrónimos/símbolos) según los conmutadores `\myInclude...`.
- Cargar `Book/content-standard.tex` para casi todos los documentos. Ese fichero orientado al usuario selecciona los capítulos, la bibliografía y los apéndices.
- Cargar `Book/content-compendium.tex` únicamente cuando un estudiante de doctorado selecciona explícitamente la estructura especializada por compendio; ese fichero define el resumen extendido, la bibliografía intermedia y los PDF de las publicaciones.
- Añadir la lógica de contraportada.

La plantilla mantiene intencionadamente estable `book.tex`. Los usuarios seleccionan los preliminares opcionales en `Config/myconfig.tex` y modifican el cuerpo mediante el fichero `content-*.tex` aplicable, en lugar de comentar líneas de infraestructura en `book.tex`.

Las estructuras mínimas y originales preparadas se encuentran junto a los capítulos correspondientes: `Book/chapters/{bare,orig}/` para documentos estándar y `Book/chapters/compendium/{bare,orig}/` para la modalidad especializada. Cada directorio contiene también el fichero de organización `content-*.tex` que el Makefile copia por separado a la raíz de `Book/`.

## Comportamiento específico de portadas y titulaciones

`Book/cover/cover.tex` y `Book/cover/backpage.tex` delegan la selección de portadas en el registro de titulaciones. `Config/layout-profiles.tex` relaciona cada perfil de titulación con los ficheros necesarios.

Las implementaciones específicas de institución se agrupan en `Book/cover/uah/`, `Book/cover/upm/` y `Book/cover/urjc/`. La orquestación compartida y los ficheros de preliminares permanecen directamente en `Book/cover/`. Los logotipos siguen la misma división en `Book/logos/`; los elementos gráficos compartidos entre instituciones y los de proyectos se mantienen en `Book/logos/shared/`.

## Madurez del repositorio e indicadores de mantenimiento

- El proyecto contiene material heredado de larga duración y comentarios históricos (etiquetas `$Id`, flujos de trabajo antiguos).
- `Deprecated/` conserva recursos/herramientas anteriores, lo que indica una fuerte preocupación por la compatibilidad hacia atrás.
- `TODO` sigue recogiendo mejoras pendientes (por ejemplo, problemas con acrónimos y orientación de uso en Windows).
- La documentación de usuario comienza en el `README.md` en español (la descripción general en inglés es `README-en.md`), con ejemplos adicionales integrados en los capítulos de la plantilla. `Documentation/es/TYPESETTING-STYLES-GUIDE.md` es la fuente de referencia de la capa preliminar de estilos visuales, mientras que las distribuciones para usuarios contienen su versión renderizada `04-TYPESETTING-STYLES-GUIDE.pdf`. Los procedimientos para mantenedores relacionados con la generación de versiones y la incorporación de titulaciones o universidades están centralizados en `Documentation/es/MAINTAINERS.md`.

## Puntos fuertes

- Ecosistema integral muy completo (redacción + documentación administrativa + referencias normativas).
- Modelo de configuración altamente parametrizado.
- Permite generar documentos tanto en español como en inglés.
- Incluye automatización práctica de compilación y optimización de PDF.
- Buena base para el cumplimiento institucional en la UAH.

## Riesgos / puntos críticos de complejidad

- Una compilación básica desde un editor necesita `pdflatex` y, cuando corresponda, `biber` o `makeglossaries`; los flujos mediante Makefile requieren además `latexmk`, mientras que determinados objetivos pueden utilizar `pandoc`, Dia, Inkscape, Ghostscript, `latexpand` o `latexdiff`.
- Los Makefiles activos de los documentos comparten su configuración de motor y dependencias, pero la automatización de versiones y registros sigue dependiendo de herramientas de shell.
- La estructura de distintas épocas y los recursos duplicados pueden dificultar la incorporación de nuevos usuarios.
- El contenido heredado/Deprecated aumenta el ruido de navegación para los usuarios que empiezan.

## Recomendación práctica para empezar

Para un usuario nuevo, el camino más seguro es:

1. Leer `README.md` completo una vez.
2. Editar inicialmente solo `Config/myconfig.tex`.
3. Mantener `\myDocumentStructure` con el valor `standard` y partir de `Book/content-standard.tex` con los capítulos de ejemplo existentes o su versión mínima preparada. Solo los estudiantes de doctorado que utilicen la modalidad por compendio deberían seleccionar `compendium` y trabajar con `Book/content-compendium.tex` y su estructura especializada preparada.
4. Compilar `Book/book.tex` con su editor y comprobar que el backend de bibliografía está configurado como `biber`; use `make` únicamente si prefiere la automatización suministrada.
5. Solo después de una primera compilación correcta, modifique los ficheros de portadas/documentación administrativa.

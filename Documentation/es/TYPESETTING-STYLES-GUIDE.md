# Estilos tipográficos: guía de uso y mantenimiento

Esta guía describe la capa preliminar de composición tipográfica exclusiva de Book, incluido su uso, implementación, validación, herramientas para mantenedores y atribución a terceros. Todas las rutas del repositorio son relativas a la raíz de la plantilla. Los ejemplos de *shell* indican su directorio de trabajo.

Seleccionar uno de los estilos suministrados es una operación normal de usuario y solo requiere cambiar el selector de estilo documentado. Modificar un estilo o crear uno nuevo es una tarea avanzada: la tipografía, los encabezados, las listas generadas, las cabeceras de página y las páginas institucionales interactúan entre varios archivos. Aborda esos cambios con cuidado, lee las secciones relevantes de esta guía técnica y valida el documento completo después de cada modificación.

## Contenido

1. [Qué hace esta funcionalidad](#1-qué-hace-esta-funcionalidad)
2. [Seleccionar y comparar estilos](#2-seleccionar-y-comparar-estilos)
3. [Cómo funciona la implementación](#3-cómo-funciona-la-implementación)
4. [Referencia completa de ajustes](#4-referencia-completa-de-ajustes)
5. [Diseñar un estilo nuevo paso a paso](#5-diseñar-un-estilo-nuevo-paso-a-paso)
6. [Ampliar los renderizadores](#6-ampliar-los-renderizadores)
7. [Validación y resolución de problemas](#7-validación-y-resolución-de-problemas)
8. [Mantenimiento y material de referencia](#8-mantenimiento-y-material-de-referencia)
9. [Adaptación de Mimosis y licencia MIT](#9-adaptación-de-mimosis-y-licencia-mit)

## 1. Qué hace esta funcionalidad

Un estilo tipográfico es un perfil visual con nombre para el documento generado a partir de `Book/book.tex`. Combina la selección de fuentes, los encabezados de capítulos y secciones, el formato del índice y las cabeceras de página. Seleccionar un estilo no selecciona una estructura de documento ni una titulación diferentes.

Los seis perfiles actuales son:

| Selector | Sistema de texto/matemáticas | Diseño de capítulo | Índice y navegación en páginas normales |
| --- | --- | --- | --- |
| `standard` | Fuentes originales de la plantilla, actualmente Latin Modern | Aspecto original de `book` | Índice y cabeceras de página originales |
| `editorial` | New PX | Número en serif y negrita, separador vertical claro y título colgante alineado a la izquierda; sin etiqueta Chapter/Capítulo | Índice con puntos; cabeceras pequeñas en serif para capítulo/sección, sin línea |
| `modern` | New TX; TeX Gyre Heros para sans serif | Número de capítulo grande y destacado, acento azul apagado y línea corta | Entradas de capítulo sin guías; cabeceras de capítulo; línea fina de cabecera |
| `framed` | New PX | Diseño Lenny real de `fncychap`: etiqueta/número contorneados y título alineado a la izquierda | Índice sin guías; cabeceras pequeñas en serif para capítulo/sección, sin línea |
| `shaded` | New TX; TeX Gyre Heros para sans serif | Diseño Bjornstrup real de `fncychap`: panel gris, número grande y título alineado a la derecha | Índice compacto con puntos; cabeceras pequeñas sans serif para capítulo/sección y una línea |
| `mimosis` | Texto EB Garamond; matemáticas originales; Source Code Pro monoespaciada | Número grande en línea y título en versalitas serif | Entradas de capítulo sin guías; cabeceras interiores en serif inclinada para capítulo/sección y números de página en el pie exterior |

`mimosis` es una adaptación al flujo de trabajo existente de esta plantilla, basado en la clase `book` y pdfLaTeX. No carga `mimosis.cls` ni cambia la plantilla a KOMA-Script. Los nombres de perfiles retirados no son alias de los selectores actuales.

### Alcance y preservación

La capa controla explícitamente los paquetes de fuentes del cuerpo; capítulos, secciones, subsecciones y subsubsecciones; el índice principal; los estilos compartidos de títulos y entradas usados por las listas generadas de figuras, tablas, código fuente, algoritmos y vídeos; y los ajustes de estilo de página. Conserva la geometría existente, el tamaño base de la clase, los ajustes de párrafo, el multiplicador de interlineado, los parámetros de flotantes, el idioma, las profundidades de numeración, la configuración bibliográfica y la estructura de contenido. No obstante, fuentes y dimensiones de capítulo diferentes pueden cambiar los saltos de línea y la paginación.

Las entradas de figuras, tablas, código fuente, algoritmos y vídeos reutilizan el renderizador configurado para entradas de sección del índice. En consecuencia, comparten su fuente, espaciado, sangría, anchura de la columna de numeración, tratamiento del número de página y política de guías. Los pies de figura/tabla del cuerpo del documento y los glosarios de acrónimos y símbolos siguen siendo responsabilidad de sus paquetes.

El `Config/preamble.tex` compartido permanece sin cambios. El auxiliar de vídeo de `Config/postamble.tex` registra únicamente su número semántico y su texto; delega la sangría y el formato de las guías en el renderizador compartido de listas. Los formularios administrativos y el Anteproyecto no cargan este despachador exclusivo de Book.

## 2. Seleccionar y comparar estilos

### 2.1 Seleccionar el perfil

Edita la definición existente del estilo en `Config/myconfig.tex`:

```latex
\newcommand{\myTypesettingStyle}{framed}
```

Sustituye su valor; no añadas un segundo `\newcommand` con el mismo nombre. Los nombres distinguen entre mayúsculas y minúsculas. El estilo predeterminado es `standard`. Las páginas institucionales conservan sus fuentes originales automáticamente, sin que tengas que configurar otra variable. El despachador también proporciona el estilo predeterminado cuando el comando no existe, aunque los auxiliares de compilación esperan una definición existente del estilo.

`\myDocumentStructure` es un ajuste independiente: selecciona la organización estándar o por compendio del contenido, no un perfil tipográfico.

### 2.2 Fuentes de las páginas institucionales

Las portadas y contraportadas conservan automáticamente sus fuentes institucionales, aunque selecciones otro estilo para el cuerpo del documento. No necesitas configurar ningún campo adicional en `Config/myconfig.tex`.

La comparación de estilos también puede mostrar páginas institucionales con las fuentes del documento. Es una variante avanzada para pruebas: los logotipos, los tamaños explícitos y la maquetación se mantienen, pero las nuevas métricas pueden cambiar los saltos de línea. Si necesitas modificar ese comportamiento, consulta la documentación para mantenedores; para un uso normal, conserva las fuentes institucionales originales.

### 2.3 Compilar el documento seleccionado

Desde `Book`:

```bash
make
```

Utiliza el flujo de trabajo pdfLaTeX existente de la plantilla. Los sistemas de fuentes alternativos están protegidos explícitamente para pdfLaTeX. Esta funcionalidad no implementa una configuración general de fuentes para XeLaTeX/LuaLaTeX.

Los paquetes cargados por la capa visual son:

| Elección | Paquetes adicionales seleccionados por esta capa |
| --- | --- |
| `fontsystem=original` | Ningún paquete de fuentes adicional |
| `fontsystem=px` | `newpxtext`, `newpxmath` |
| `fontsystem=tx` | `tgheros`, `newtxtext`, `newtxmath`, en ese orden |
| `fontsystem=mimosis` | `ebgaramond` con `lf`; `sourcecodepro` con `oldstyle,scale=0.7`; sin paquete de sustitución para matemáticas |
| Cualquier diseño de capítulo distinto de `original` | `titlesec` para la maquinaria de encabezados |
| `chapterlayout=fncychap` | Además, `fncychap` con la opción seleccionada |

El documento completo también necesita los paquetes originales de la plantilla y las herramientas de bibliografía/glosarios. Instala los paquetes que falten mediante tu distribución TeX. La disponibilidad de paquetes varía entre instalaciones; los nombres `.sty` requeridos por los archivos fuente son la lista de dependencias autoritativa.

### 2.4 Generar prototipos independientes del libro completo

Estos auxiliares para mantenedores están disponibles en el repositorio Git completo; la distribución ordinaria ZIP/TGZ para usuarios omite intencionadamente `AdminScripts/`.

Desde la raíz de la plantilla:

```bash
AdminScripts/build-book-typesetting-prototypes.sh
AdminScripts/build-book-typesetting-prototypes.sh --styles framed shaded
AdminScripts/build-book-typesetting-prototypes.sh --styles framed --font-mode document
AdminScripts/build-book-typesetting-prototypes.sh --styles modern --language english
```

El auxiliar Bash prepara un árbol fuente temporal restringido y deja sin cambios tu configuración de trabajo. El directorio predeterminado es `Book/typesetting-prototypes/`. La salida en español con política institucional se denomina `book-STYLE.pdf`; en inglés se añade `-english`, y con la política de fuentes de documento se añade `-document-fonts`. Los registros de compilación y de LaTeX se guardan junto a los PDF. Utiliza `--output-dir PATH` para cambiar el destino. El auxiliar lee el registro de estilos autoritativo desde el despachador LaTeX, por lo que no mantiene una lista de estilos duplicada.

### 2.5 Generar el PDF de comparación

Desde la raíz de la plantilla:

```bash
bash AdminScripts/build-book-style-comparisons.sh --list-styles
bash AdminScripts/build-book-style-comparisons.sh
```

El segundo comando compila cada estilo registrado en copias aisladas, crea una portada e introducción bilingües neutras, selecciona cuatro páginas de muestra por estilo y las concatena. La salida predeterminada es `Book/book-style-comparisons.pdf`. Se trata de una operación de composición de PDF, no de un archivo `.tex` de comparación independiente.

Las muestras son el índice, el inicio del primer capítulo, una página de ejemplo con ecuaciones y un título de capítulo largo. El script utiliza marcadores y texto de página de la guía suministrada para localizarlas. Conserva marcadores por estilo/muestra y añade el nombre del estilo en texto gris de 8 puntos en la esquina superior derecha de cada página copiada. La portada y la introducción permanecen sin etiqueta porque no representan un estilo concreto. Los PDF originales de cada estilo no se marcan ni se sobrescriben.

Para reutilizar PDF existentes, desde la raíz de la plantilla:

```bash
bash AdminScripts/build-book-style-comparisons.sh \
  --pdf-dir Book/typesetting-prototypes

bash AdminScripts/build-book-style-comparisons.sh \
  --pdf-dir Book/typesetting-prototypes --font-mode document
```

Cada estilo registrado debe tener en ese directorio el PDF de entrada con el nombre adecuado. Vuelve a compilar las entradas desactualizadas después de cambiar las definiciones de estilo; `--pdf-dir` no comprueba que su fuente esté actualizado.

Para un libro diferente, la detección automática basada en la guía puede fallar. Puedes sobrescribir los cuatro números de página fuente, en el orden índice/capítulo/ecuaciones/título-largo:

```bash
bash AdminScripts/build-book-style-comparisons.sh \
  --pdf-dir Book/typesetting-prototypes --pages 5,9,24,38 \
  --output Book/my-comparison.pdf
```

Son números físicos de página del PDF, empezando en 1, no etiquetas de página impresas. Los mismos cuatro números se aplican a todos los estilos; si la paginación difiere puede ser necesaria una inspección separada o ampliar el script. El script requiere Python 3 y PyMuPDF; las compilaciones desde cero requieren además la cadena de herramientas TeX existente. `PYTHON` puede seleccionar un ejecutable de Python que contenga PyMuPDF.

## 3. Cómo funciona la implementación

### 3.1 Secuencia de base, sobrescritura y aplicación

`Book/book.tex` carga el preámbulo compartido, la configuración del usuario y el postámbulo, y después carga `Config/typesetting/typesetting.tex` antes de `\begin{document}`.

El despachador:

1. Proporciona los valores predeterminados de las opciones de usuario que falten y valida los selectores de estilo/política de fuentes.
2. Guarda el estado original de familias/pesos de fuente y la maquinaria de capítulos/estilos de página necesaria para las páginas institucionales; define el envoltorio de páginas institucionales.
3. Carga `default-settings.tex`, que define la base de la plantilla original.
4. Carga exactamente un archivo `styles/<selected-style>.tex`, sobrescribiendo las diferencias.
5. Carga el auxiliar de visualización del número y aplica, en este orden, los ajustes de tipografía, encabezados, índice y estilo de página.

Todos los perfiles, incluido `standard`, siguen esta secuencia. `standard.tex` no contiene sobrescrituras. Su rama de aplicación utiliza un renderizador nativo parametrizado de `book` con los valores originales; no se limita a omitir todos los archivos de aplicación. Selecciona la configuración de fuentes existente y no carga ni paquetes de fuentes adicionales ni `titlesec`.

Cada estilo hereda directamente de `default-settings.tex`, no de otro estilo. El valor efectivo de un ajuste es la sobrescritura del estilo seleccionado cuando existe; en caso contrario, el valor base. Por tanto, los distintos archivos de estilo no necesitan repetir todas las variables. Cambiar la base afectaría a todos los perfiles que no sobrescriban el ajuste modificado, incluido `standard`.

### 3.2 Responsabilidades de los archivos

- `Config/myconfig.tex`: selectores públicos y configuración de documento existente.
- `Config/typesetting/typesetting.tex`: registro de estilos aceptados, validación, estado original guardado y orden de carga.
- `Config/typesetting/default-settings.tex`: base explícita de la plantilla original a 10 pt: 39 macros y cuatro colores.
- `Config/typesetting/styles/*.tex`: únicamente sobrescrituras por perfil.
- `Config/typesetting/apply/typography.tex`: paquetes de fuentes; conserva los ajustes de párrafo y el multiplicador de espaciado alrededor de la carga de fuentes.
- `Config/typesetting/apply/headings.tex`: aplicación de encabezados nativos, `titlesec` y `fncychap`.
- `Config/typesetting/apply/contents.tex`: renderizado compartido de títulos de listas más tipografía del índice principal, espacios, guías y dimensiones de columnas de numeración.
- `Config/typesetting/apply/pagestyle.tex`: colocación con `fancyhdr`, marcas de capítulo/sección, líneas de cabecera y páginas `plain`.
- `Config/typesetting/apply/institutional-fonts.tex`: restauración acotada para páginas institucionales, incluidos los renderizadores de capítulo originales.
- `Config/typesetting/apply/display-number.tex`: cero inicial únicamente visual para números decimales de capítulo menores que 10.
- `AdminScripts/build-book-typesetting-prototypes.sh`: descubre el registro del despachador y realiza compilaciones aisladas del libro completo.
- `AdminScripts/build-book-style-comparisons.sh`: compila o reutiliza PDF y crea extractos de comparación etiquetados.

### 3.3 Los nombres de los ajustes no son definiciones de renderizadores

`\thesis@chapterlayout`, `\thesis@toclayout` y `\thesis@headerlayout` seleccionan ramas de renderizado implementadas. Sus valores no tienen por qué coincidir con el nombre público del estilo. Por ejemplo, `framed` utiliza el diseño de capítulo `fncychap`, el diseño de índice `framed` y el diseño de cabecera `navigation`.

Cambiar el nombre de un perfil no crea un nuevo algoritmo de renderizado. A la inversa, un perfil nuevo puede reutilizar un renderizador existente sin modificarlo. Aunque los selectores públicos se validan, los *tokens* internos de diseño/fuente no disponen de un validador completo de enumeración. Utiliza las opciones implementadas documentadas más abajo; los *tokens* desconocidos pueden caer en otra rama o fallar posteriormente durante la compilación.

### 3.4 Numeración, marcas y páginas especiales

La capa visual no redefine `\thechapter`, las referencias ni las profundidades de numeración. El auxiliar visual formatea `1` como `01` allí donde lo invocan explícitamente los diseños modernos de capítulo, índice y cabecera. Las letras de apéndice no se rellenan con cero. Seleccionar otro diseño no invoca automáticamente este auxiliar.

En las cabeceras de navegación, `\chaptermark` establece la marca de capítulo y limpia la marca de sección; `\sectionmark` actualiza la marca de sección. Por tanto, las páginas normales a doble cara pueden mostrar el capítulo en las páginas pares y la sección actual en las impares. El contenido de la cabecera sigue las marcas, no la fuente del título de capítulo.

Las páginas de inicio de capítulo utilizan `plain`. Los perfiles alternativos conservan su propia política de página `plain`: cabeceras vacías, números de página en el pie exterior y sin línea. El perfil original conserva la configuración original de páginas `plain`. Las páginas en blanco insertadas también pueden seguir el comportamiento de la clase/plantilla en lugar de la cabecera normal.

Los capítulos sin numerar pueden necesitar marcas explícitas. Para un capítulo personalizado de preliminares/finales, sigue el patrón utilizado por los archivos fuente de agradecimientos de la plantilla:

```latex
\chapter*{Agradecimientos}
\markboth{Agradecimientos}{Agradecimientos}
\addcontentsline{toc}{chapter}{Agradecimientos}
```

La entrada del índice y las marcas de cabecera son cuestiones independientes. Añadir únicamente una entrada al índice no establece la cabecera de página deseada para un capítulo con asterisco.

## 4. Referencia completa de ajustes

Las tablas siguientes cubren las 39 macros base y los cuatro nombres de color. Los valores predeterminados son los valores literales de la base de la plantilla original, no los valores efectivos de ningún perfil alternativo. Son ajustes de autoría, no comandos públicos adicionales que deban colocarse en `myconfig.tex`.

Define una sobrescritura en el archivo de estilo con `\def`, por ejemplo:

```latex
\def\thesis@sectionleading{19}
\definecolor{ThesisAccent}{HTML}{35566F}
```

El despachador carga los archivos de estilo mientras `\makeatletter` está activo. Una prueba independiente fuera de este despachador debe utilizar `\makeatletter`/`\makeatother` alrededor de los comandos que contengan `@`. No insertes un `\makeatother` prematuro dentro de un archivo de estilo, porque el código de aplicación posterior también utiliza esos nombres internos.

Los tamaños de fuente y los interlineados nominales que aparecen a continuación son valores numéricos en puntos; el multiplicador de interlineado existente puede afectar a las líneas base reales. Los espaciados y anchuras aceptan dimensiones/*glue* de LaTeX como `20pt`, `1.5em`, `3ex plus 1ex minus .2ex` o `1.725\baselineskip`. `em`, `ex` y `\baselineskip` dependen del contexto en el que los evalúe el renderizador.

### 4.1 Sistema de fuentes y tipografía de encabezados

| Macro | Base | Efecto / valores admitidos |
| --- | --- | --- |
| `\thesis@fontsystem` | `original` | `original`, `px`, `tx`, `mimosis`; selecciona la rama de carga de paquetes, no el tamaño de texto de la clase |
| `\thesis@headingfamily` | `\rmfamily` | Declaración de familia para las fuentes compartidas de encabezados, p. ej. `\rmfamily` o `\sffamily` |
| `\thesis@headingweight` | `\bfseries` | Declaraciones de encabezado; puede combinar peso/forma, p. ej. `\mdseries\scshape` |

Estas declaraciones también alcanzan a todos los títulos de listas generadas. `fncychap` controla las declaraciones de fuente reales de los capítulos; algunos otros diseños también fijan explícitamente partes de la fuente de sus etiquetas. Por tanto, cambiar la familia común de encabezados no cambia necesariamente todos los glifos del número o de la etiqueta de capítulo.

### 4.2 Capítulos y acoplamiento con los títulos de listas

| Macro | Base | Efecto |
| --- | --- | --- |
| `\thesis@chapterlayout` | `original` | Selecciona un renderizador de capítulo implementado; opciones más abajo |
| `\thesis@fncychapstyle` | vacío | Opción del paquete, sensible a mayúsculas/minúsculas, cuando el diseño es `fncychap`, p. ej. `Lenny` o `Bjornstrup` |
| `\thesis@chaptertitlesize` | `24.88` | Tamaño compartido para título de capítulo/lista |
| `\thesis@chaptertitleleading` | `30` | Interlineado nominal compartido para título de capítulo/lista |
| `\thesis@chapternumbersize` | `20.74` | Tamaño del número o de la etiqueta de capítulo en los diseños que lo leen explícitamente |
| `\thesis@chapternumberleading` | `25` | Interlineado nominal para ese número/etiqueta |
| `\thesis@chapterbefore` | `50pt` | Espacio antes del encabezado de capítulo y de cada título de lista generado |
| `\thesis@chaptergap` | `20pt` | Separación específica del renderizador entre número/etiqueta y título |
| `\thesis@chapterseparatorgap` | `20pt` | Separación horizontal antes del separador vertical en `separator` |
| `\thesis@chapterafter` | `40pt` | Espacio después del encabezado de capítulo y de cada título de lista generado |

| Diseño de capítulo | Diseño numerado y ajustes utilizados |
| --- | --- |
| `original` | Etiqueta nativa apilada Chapter/Capítulo seguida del título; utiliza familia/peso compartidos, tamaños de título/número y valores verticales antes/separación/después; los colores nativos de encabezado siguen siendo los originales |
| `traditional` | Diseño `display` de `titlesec`: etiqueta del nombre de capítulo en minúsculas y versalitas, seguida del título; el número/etiqueta utiliza versalitas romanas; la separación es vertical. Ningún perfil actual selecciona esta rama implementada |
| `separator` | Número colgante, separador vertical claro y después el título; el número utiliza familia/peso compartidos y el tamaño de número. `chapterseparatorgap` va antes del separador; `chaptergap`, después |
| `display` | Número sans serif en negrita y color de acento, mostrado por separado, seguido del título y una línea corta de acento; la etiqueta utiliza el auxiliar de visualización del número; la separación es vertical |
| `mimosis` | Número romano grande, de peso medio y colgante junto al título compartido; la separación es horizontal |
| `fncychap` | Encabezados de capítulo definidos por el paquete, seleccionados mediante `fncychapstyle`; los valores predeterminados del paquete controlan el tamaño real del capítulo, el tamaño del número, la alineación y los espaciados antes/separación/después |

Para los diseños alternativos que no son `fncychap`, los encabezados genéricos con asterisco utilizan la fuente y el espaciado compartidos del título, sin número ni separador. En `fncychap`, el paquete proporciona también su renderizador de capítulos no numerados. La aplicación restaura el comando original de apéndice y el punto de entrada de capítulo no numerado después de cargar el paquete; conserva los *hooks* existentes de book/hyperref.

**Importante para `framed` y `shaded`:** cambiar `chaptertitlesize`, `chaptertitleleading`, `chapterbefore` o `chapterafter` modifica el formato de los títulos de listas, no el encabezado real de capítulo del paquete. `chapternumbersize`, `chapternumberleading`, `chaptergap` y `chapterseparatorgap` no son utilizados por sus encabezados `fncychap` reales. Sus sobrescrituras existentes incluyen valores heredados de número/separación; esos valores no controlan `fncychap`. Todavía no existe un grupo separado de ajustes para los títulos de listas. Los encabezados de sección sí siguen utilizando los ajustes comunes.

### 4.3 Secciones, subsecciones y subsubsecciones

| Macro | Base | Efecto |
| --- | --- | --- |
| `\thesis@sectionsize` | `14.4` | Tamaño de fuente de sección |
| `\thesis@sectionleading` | `18` | Interlineado nominal de sección |
| `\thesis@subsectionsize` | `12` | Tamaño de fuente de subsección |
| `\thesis@subsectionleading` | `14` | Interlineado nominal de subsección |
| `\thesis@subsubsectionsize` | `10` | Tamaño de fuente de subsubsección |
| `\thesis@subsubsectionleading` | `12` | Interlineado nominal de subsubsección |
| `\thesis@sectionbefore` | `-3.5ex plus -1ex minus -.2ex` | Control del espacio/sangría antes de las secciones; consulta la distinción de saltos con signo |
| `\thesis@sectionafter` | `2.3ex plus .2ex` | Espacio después de las secciones |
| `\thesis@subsectionbefore` | `-3.25ex plus -1ex minus -.2ex` | Espacio previo compartido por subsecciones y subsubsecciones |
| `\thesis@subsectionafter` | `1.5ex plus .2ex` | Espacio posterior compartido por subsecciones y subsubsecciones |

La rama nativa utiliza `\@startsection`: los espacios previos negativos implementan el comportamiento original de no sangrar el párrafo posterior al encabezado. La rama alternativa utiliza espacios previos positivos y `\titlespacing*` con asterisco para suprimir la sangría. Al seleccionar cualquier diseño alternativo de capítulo, sobrescribe explícitamente ambos ajustes de espacio previo con *glue* positivo adecuado, en lugar de heredar accidentalmente los valores negativos de la rama nativa.

Los títulos de sección alternativos quedan alineados a la izquierda de forma irregular (*ragged right*) y utilizan `ThesisText`; sus números usan `ThesisAccent`. La rama nativa sigue el renderizado original de encabezados. Los espacios de subsección y subsubsección no pueden cambiarse actualmente de forma independiente mediante esta base. Los formatos de párrafo/subpárrafo no tienen ajustes dedicados aquí. Cambiar cualquiera de ellos requiere una ampliación explícita del renderizador.

### 4.4 Índice y listas auxiliares

| Macro | Base | Efecto |
| --- | --- | --- |
| `\thesis@toclayout` | `original` | Rama del índice; opciones más abajo |
| `\thesis@tocchaptergap` | `1em plus 1pt` | Espacio antes de las entradas de capítulo |
| `\thesis@tocentrygap` | `0pt plus .2pt` | Espacio antes de las entradas de sección, subsección y subsubsección |
| `\thesis@tocchapterfont` | `\bfseries` | Declaraciones de texto de las entradas de capítulo, sujetas a sobrescrituras de la rama |
| `\thesis@tocchapterpagefont` | `\bfseries` | Declaraciones del número de página de las entradas de capítulo, sujetas a sobrescrituras de la rama |
| `\thesis@tocchapterdotsep` | `\cftnodots` | Separación de puntos de capítulo; `\cftdotsep` solicita guías de puntos normales cuando la rama conserva las guías |
| `\thesis@tocchapnumwidth` | `1.5em` | Anchura de la columna del número de capítulo |
| `\thesis@tocsecindent` | `1.5em` | Sangría izquierda de las entradas de sección |
| `\thesis@tocsecnumwidth` | `2.3em` | Anchura de la columna del número de sección |
| `\thesis@tocsubsecindent` | `3.8em` | Sangría izquierda de las entradas de subsección |
| `\thesis@tocsubsecnumwidth` | `3.2em` | Anchura de la columna del número de subsección |
| `\thesis@tocsubsubsecindent` | `7em` | Sangría izquierda de las entradas de subsubsección |
| `\thesis@tocsubsubsecnumwidth` | `4.1em` | Anchura de la columna del número de subsubsección |

| Diseño del índice | Comportamiento adicional después de aplicar los valores comunes |
| --- | --- |
| `original`, `traditional`, `shaded` | Solo aplicación común del índice; no existe una rama adicional para estos *tokens* |
| `modern` | Elimina las guías de capítulo y sobrescribe la fuente de las entradas de capítulo con sans serif en negrita; los números de capítulo usan color de acento y relleno visual |
| `framed` | Elimina las guías en los niveles de capítulo, sección, subsección, subsubsección, párrafo y subpárrafo |
| `mimosis` | Elimina las guías de capítulo; sobrescribe las fuentes de texto/página del capítulo con romana normal en negrita |

Las fuentes de las entradas subordinadas son explícitamente `\normalfont`; no existen en esta interfaz ajustes separados para la fuente de entradas de sección/subsección ni para la separación de puntos. La fuente del número de página de capítulo en `modern` sigue procediendo de su macro configurada; la rama especial solo sobrescribe la fuente del texto del capítulo. Definir la separación de puntos de capítulo no restablece las guías eliminadas por una rama de diseño.

Las entradas de las listas de figuras, tablas, listados de código fuente, algoritmos y vídeos utilizan el renderizador de entradas de sección una vez aplicados estos ajustes y las sobrescrituras específicas del diseño. Por tanto, siguen `\cftsecfont`, `\cftsecpagefont`, `\cftsecleader`, `\cftbeforesecskip`, `\cftsecindent` y `\cftsecnumwidth`. Sus etiquetas específicas de paquete, contadores y formatos de archivo no cambian. Las listas de acrónimos y símbolos son glosarios, no listas de tipo índice, y conservan su propio renderizado de entradas.

Mantén el inicio del texto de cada nivel más allá de la columna de numeración de su nivel padre. Una disposición inicial útil es: sangría de sección = anchura del número de capítulo, sangría de subsección = sangría de sección + anchura del número de sección, y de forma análoga para subsubsecciones. Comprueba capítulos de dos dígitos y números de sección largos con puntos para detectar colisiones.

### 4.5 Cabeceras de página y líneas

| Macro | Base | Efecto |
| --- | --- | --- |
| `\thesis@headerlayout` | `original` | Rama de cabecera/colocación en página; opciones más abajo |
| `\thesis@headerfont` | `\bfseries` | Declaraciones utilizadas para el texto normal de cabecera y, en la mayoría de los perfiles, para los números de página |
| `\thesis@headerrule` | `0.5pt` | Anchura de la línea de cabecera en páginas normales; `0pt` la elimina |

La descripción siguiente presupone la configuración a doble cara de Book de la plantilla. En `fancyhdr`, `LE` significa izquierda/par, `RO` derecha/impar, `RE` derecha/par y `LO` izquierda/impar. El borde exterior es `LE,RO`; el interior es `RE,LO`.

| Diseño de cabecera | Páginas normales |
| --- | --- |
| `original` | Marca original de nombre/número de capítulo en páginas pares, marca de sección en impares; números de página en la cabecera exterior; política original para páginas `plain` |
| `book`, `navigation` | Misma colocación de navegación: marca de capítulo en páginas pares, marca de sección en impares; números de página en la cabecera exterior; la marca de capítulo alternativa no añade la etiqueta del nombre del capítulo |
| `quiet` | Solo números de página en la cabecera; política alternativa para páginas `plain` |
| `modern` | Marca de capítulo tanto en páginas pares como impares; números de página en la cabecera exterior; marca de capítulo decimal rellenada con cero y separador mediante punto centrado |
| `mimosis` | Marca de capítulo en páginas pares y marca de sección en impares, en la cabecera interior; números de página en el pie exterior con formato romano vertical explícito |

Las marcas alternativas evitan las mayúsculas forzadas mediante `\nouppercase`. El diseño de cabecera es independiente del diseño de encabezado de capítulo: un capítulo Lenny no requiere cabeceras `quiet`, y un capítulo sombreado no requiere una línea. El perfil `framed` actual utiliza `navigation`, texto pequeño serif y `0pt`. No existe un ajuste base para la anchura de la línea de pie, fuentes separadas para título/número de página de la cabecera, alineación de cabecera ni política de páginas `plain`; amplía el archivo de aplicación si necesitas controlar estos aspectos de forma independiente.

### 4.6 Colores

| Nombre del color | Definición base | Usos actuales |
| --- | --- | --- |
| `ThesisText` | `gray`, `0` | Fuentes compartidas alternativas de títulos/secciones, incluidos los títulos de listas generadas; no los encabezados originales nativos ni las fuentes de capítulo controladas por `fncychap` |
| `ThesisAccent` | `gray`, `0` | Números de sección alternativos; número/línea del capítulo `modern` y números del índice |
| `ThesisSecondary` | `gray`, `.35` | Color base declarado, actualmente no utilizado por los renderizadores de aplicación activos |
| `ThesisChapterSeparator` | `gray`, `.75` | Separador vertical en el diseño de capítulo `separator` |

Utiliza `\definecolor` en un archivo de estilo para redefinir un color. Un valor hexadecimal HTML tiene seis dígitos y no lleva `#` inicial. Para `gray`, `0` es negro y `1` es blanco. Redefinir un color no tiene efecto si el renderizador seleccionado no lo utiliza. En particular, los grises del panel/número de Bjornstrup son valores definidos por el paquete; `ThesisAccent` no es un control general de paleta para `fncychap`.

## 5. Diseñar un estilo nuevo paso a paso

### Paso 1: Especificar las decisiones visuales

Anota el sistema de fuentes para cuerpo/matemáticas, la familia/peso de los encabezados, el renderizador de capítulos, los tamaños y espaciados de los títulos, la jerarquía/guías del índice y la política de navegación de las cabeceras. Considera la semántica de numeración, el idioma, los archivos fuente institucionales y la estructura del documento como decisiones ya existentes de la plantilla. Mantén intacta la base original.

Elige un nombre en minúsculas que no se esté utilizando y que contenga únicamente letras, dígitos, guiones bajos o guiones. Para este ejemplo desarrollado, utiliza `balanced`. Basta con reutilizar los renderizadores existentes; no se necesita ningún paquete ni renderizador nuevo aparte de tener instalado `titlesec`.

### Paso 2: Crear un archivo que contenga solo sobrescrituras

Crea `Config/typesetting/styles/balanced.tex` con:

```latex
% Balanced: texto/matemáticas originales, capítulos con separador serif en negrita y navegación.
% Todos los valores omitidos heredan de default-settings.tex.
\def\thesis@chapterlayout{separator}
\def\thesis@chaptertitlesize{28}
\def\thesis@chaptertitleleading{34}
\def\thesis@chapternumbersize{28}
\def\thesis@chapternumberleading{34}
\def\thesis@chapterbefore{36pt}
\def\thesis@chapterseparatorgap{14pt}
\def\thesis@chaptergap{14pt}
\def\thesis@chapterafter{28pt}
\def\thesis@sectionsize{15}
\def\thesis@sectionbefore{3.5ex plus 1ex minus .2ex}
\def\thesis@sectionafter{1.5ex plus .2ex}
\def\thesis@subsectionbefore{3ex plus .8ex minus .2ex}
\def\thesis@subsectionafter{1ex plus .2ex}
\def\thesis@toclayout{traditional}
\def\thesis@tocchaptergap{10pt}
\def\thesis@tocentrygap{1pt}
\def\thesis@tocchapterdotsep{\cftdotsep}
\def\thesis@tocchapnumwidth{2.6em}
\def\thesis@tocsecindent{2.6em}
\def\thesis@tocsecnumwidth{3em}
\def\thesis@tocsubsecindent{5.6em}
\def\thesis@tocsubsecnumwidth{4em}
\def\thesis@tocsubsubsecindent{9.6em}
\def\thesis@tocsubsubsecnumwidth{5em}
\def\thesis@headerlayout{navigation}
\def\thesis@headerfont{\small\rmfamily}
\def\thesis@headerrule{0pt}
\definecolor{ThesisChapterSeparator}{gray}{.65}
```

Esto hereda `fontsystem=original`, encabezados romanos en negrita, texto/acento negros y los tamaños base de subsección. Por tanto, conserva las fuentes originales del cuerpo y de matemáticas mientras utiliza un diseño alternativo de capítulo. Su interlineado de sección sigue siendo el valor base de 18 pt. Cada sobrescritura incluida registra un valor de ajuste modificado.

No hagas `\input` de otro archivo de estilo: eso crearía una cadena de herencia fuera del diseño previsto de base compartida. No coloques aquí llamadas `\usepackage` para un nuevo sistema de fuentes; gestiona la carga de paquetes en `apply/typography.tex`.

### Paso 3: Registrar el nombre en el despachador

En `Config/typesetting/typesetting.tex`, añádelo al registro existente:

```latex
\def\thesis@registeredstyles{standard,editorial,modern,framed,shaded,mimosis,balanced}
```

El bucle de validación, su mensaje de error y los dos auxiliares para mantenedores leen este único registro. El nombre del archivo debe coincidir exactamente con la entrada del registro, incluidas mayúsculas y minúsculas. El orden del registro pasa a ser también el orden de los prototipos y de la comparación.

### Paso 4: Verificar que los auxiliares lo descubren

Desde la raíz de la plantilla, confirma que ambos auxiliares detectan la nueva entrada:

```bash
AdminScripts/build-book-typesetting-prototypes.sh --list-styles
AdminScripts/build-book-style-comparisons.sh --list-styles
```

No debe actualizarse ninguna lista de estilos separada y codificada explícitamente. Si el descubrimiento falla, comprueba que el registro siga siendo una única línea `\def\thesis@registeredstyles{...}`.

### Paso 5: Actualizar la documentación orientada al usuario

Añade `balanced` al comentario del selector en `Config/myconfig.tex`, menciónalo brevemente en el README y en el manual de usuario cuando corresponda, y describe su diseño y dependencias en esta guía. Deja sin cambios el valor predeterminado existente `standard`, salvo que quieras deliberadamente que el ejemplo distribuido utilice el nuevo estilo.

### Paso 6: Compilar e inspeccionar

Desde la raíz de la plantilla, compila el ejemplo sin modificar el selector de trabajo:

```bash
AdminScripts/build-book-typesetting-prototypes.sh --styles balanced
AdminScripts/build-book-typesetting-prototypes.sh --styles balanced --font-mode document
AdminScripts/build-book-typesetting-prototypes.sh --styles balanced --language english
```

Como alternativa, cambia el valor existente de `myTypesettingStyle` a `balanced` y ejecuta la compilación normal con `make`. Inspecciona los encabezados, el índice y las páginas normales/de inicio de capítulo. Realiza suficientes pasadas de la cadena de herramientas normal para estabilizar el índice, las referencias, la bibliografía y los glosarios; una única pasada directa de pdfLaTeX no constituye una validación del libro completo.

### Paso 7: Verificar el descubrimiento y la comparación

Desde la raíz de la plantilla:

```bash
bash AdminScripts/build-book-style-comparisons.sh --list-styles
bash AdminScripts/build-book-style-comparisons.sh
```

La comparación recién generada debería contener siete grupos, cuatro páginas por grupo y etiquetas `balanced` en sus cuatro páginas. Para utilizar `--pdf-dir` en su lugar, compila primero las siete entradas en el directorio especificado; compilar únicamente `balanced` no es suficiente.

### Paso 8: Comprobar la preservación y confirmar los archivos previstos

Revisa tu *diff*. Un perfil construido a partir de renderizadores existentes normalmente solo requiere el nuevo archivo de estilo, el registro/texto de ayuda del despachador, la tupla del auxiliar y la documentación/comentario del selector. No requiere cambiar el preámbulo compartido, el postámbulo, el contenido de los capítulos, las portadas, los Makefiles ni la bibliografía. Vuelve a compilar `standard` y compáralo con la misma referencia/configuración original; evita comparar contenidos diferentes o PDF desactualizados.

## 6. Ampliar los renderizadores

Los ejemplos de esta sección requieren cambios de implementación. No son ajustes adicionales ya admitidos por la plantilla actual.

### 6.1 Utilizar otro diseño existente de fncychap

Para un perfil nuevo que utilice un diseño instalado del paquete, establece:

```latex
\def\thesis@chapterlayout{fncychap}
\def\thesis@fncychapstyle{Conny}
```

Registra el nuevo perfil de la forma habitual y asigna explícitamente espacios previos positivos para secciones/subsecciones. Elige de forma independiente las fuentes del cuerpo, el índice y las cabeceras. No es necesario modificar el renderizador de encabezados únicamente para seleccionar otra opción compatible del paquete. Consulta el manual de fncychap instalado para comprobar la ortografía de las opciones y las limitaciones específicas de cada diseño; aquí se han probado Lenny/Bjornstrup, no todas las combinaciones de diseño/idioma del paquete.

### 6.2 Personalizar las fuentes del paquete después de cargar fncychap

El archivo de estilo actual se carga **antes** de `fncychap`. Por tanto, escribir `\ChTitleVar{...}` directamente durante la carga del archivo de estilo provocará que se encuentre un comando no definido. Para permitir una personalización configurable posterior a la carga, introduce un *hook* deliberado:

1. Añade este valor predeterminado a `default-settings.tex`:

   ```latex
   \def\thesis@afterfncychap{}
   ```

2. En la rama `fncychap` de `apply/headings.tex`, invócalo después de `\RequirePackage[...]` y del `\makeatletter` siguiente:

   ```latex
   \thesis@afterfncychap
   ```

3. En el nuevo archivo de estilo, sobrescribe el *hook*, por ejemplo:

   ```latex
   \def\thesis@afterfncychap{%
     \ChTitleVar{\Huge\rmfamily\bfseries}%
   }
   ```

Documenta este nuevo ajuste y su alcance. `\ChNameVar`, `\ChNumVar`, `\ChTitleVar` y `\ChRuleWidth` configuran el paquete, pero cada diseño puede utilizarlos de forma diferente. Cambiar los colores del panel de Bjornstrup o el espaciado de capítulos del paquete exige examinar/personalizar sus rutinas de renderizado; los cuatro colores base y los espacios genéricos de capítulo no proporcionan esos controles. Mantén todos estos cambios condicionados al estilo/diseño previsto.

### 6.3 Añadir un nuevo diseño de capítulo con titlesec

Supongamos que un perfil nuevo requiere una línea de ancho completo bajo un título mostrado. Elige un *token* de diseño que no se use, como `ruled`, y añade después una rama condicional dentro del renderizador alternativo de capítulos que no usa fncychap en `apply/headings.tex`, junto a las ramas existentes `separator`, `display` y `mimosis` y antes de la llamada común `\titlespacing*{\chapter}`:

```latex
\ifthenelse{\equal{\thesis@chapterlayout}{ruled}}{%
  \titleformat{\chapter}[display]{\thesis@chapterfont}%
    {\normalfont\thesis@headingfamily\thesis@headingweight
      \color{ThesisAccent}%
      \fontsize{\thesis@chapternumbersize}{\thesis@chapternumberleading}\selectfont
      \thechapter}%
    {\thesis@chaptergap}{}%
    [\vspace{6pt}{\color{ThesisAccent}\titlerule[.5pt]}]%
}{}
```

A continuación, selecciona `\def\thesis@chapterlayout{ruled}` en el nuevo estilo. El código común existente proporciona el espaciado antes/después y los títulos genéricos sin numeración. En este ejemplo, la línea pertenece únicamente a los encabezados numerados; modifica explícitamente la rama sin numeración si también debe incluir una línea. No es necesario cambiar ningún selector público para `ruled` en sí, salvo que `ruled` sea también el nombre de un perfil nuevo.

Evita sobrescribir `\chapter`, los contadores o la semántica de las referencias únicamente para dibujar un encabezado nuevo. Utiliza en el renderizador las macros de ajuste existentes. Para una nueva anchura de línea configurable, añade una macro base, consúmela en esta rama y documéntala. De lo contrario, el `.5pt` anterior es un detalle codificado explícitamente en el renderizador.

### 6.4 Añadir un sistema de fuentes u otro control independiente

Para un *token* nuevo de sistema de fuentes, añade una rama explícita a `apply/typography.tex`. No confíes en un *token* desconocido: la alternativa actual que no es original, mimosis ni px carga los paquetes TX. Conserva las comprobaciones de paquetes, las restricciones del motor, el orden de carga, las longitudes de párrafo guardadas, el multiplicador de espaciado y la selección final de fuentes. Mantén sin cambios la rama `original` y amplía la restauración del estado institucional únicamente si los paquetes nuevos modifican estado adicional que las portadas necesiten.

Para controlar de forma independiente la tipografía del título del índice, el espaciado de subsubsecciones, las fuentes de niveles inferiores del índice, la alineación de cabeceras, el estilo del pie o los pies de figura/tabla, añade un ajuste base **y** el consumidor correspondiente en el archivo de aplicación adecuado. Declarar una macro por sí solo no produce ningún cambio en la salida. Conserva los valores predeterminados efectivos anteriores para que los perfiles existentes, especialmente `standard`, mantengan su aspecto. Añade sobrescrituras específicas de perfil únicamente donde sean necesarias. Una futura ampliación para pies de figura/tabla también deberá cargarse desde el despachador.

## 7. Validación y resolución de problemas

### 7.1 Validación visual y estructural

Valida tanto las dos políticas de fuentes institucionales como los paquetes de fuentes reales que pretendas distribuir. Un documento de prueba controlado con fuentes de sustitución puede comprobar la lógica de renderizado, pero no demuestra la fidelidad de las fuentes New PX/New TX/Garamond.

Utiliza documentos que contengan:

- Títulos de capítulo cortos y de varias líneas, el capítulo 10 y al menos un apéndice.
- Capítulos numerados y con asterisco; preliminares, cuerpo principal y materia final.
- Secciones, subsecciones y subsubsecciones, incluidos encabezados numerados largos.
- Un capítulo de varias páginas para poder observar realmente las cabeceras de página pares/impares.
- Entradas del índice con títulos largos, números de dos dígitos y varios niveles de numeración.
- Ecuaciones, referencias, bibliografía, listas habilitadas y figuras representativas.
- La familia seleccionada para portada/contraportada institucional y cualquier estructura de compendio que se pretenda distribuir.

Comprueba los contadores, el texto de las referencias, las entradas del índice y la jerarquía de hipervínculos/marcadores, no solo capturas de pantalla. Inspecciona los registros en busca de paquetes/fuentes/glifos ausentes, sustituciones, referencias sin resolver, cajas desbordadas (*overfull*) y avisos sobre la altura de la cabecera. Distingue los diagnósticos heredados de los nuevos. Las fuentes de cabecera más grandes o los títulos de cabecera partidos en varias líneas pueden necesitar una solución explícita y cuidadosamente acotada para la altura de cabecera; actualmente no existe una macro base `headheight`.

Para preservar la salida original, compara `standard` con una referencia sin modificar compilada con contenido, configuración y cadena de herramientas idénticos. Para un cambio aislado de estilo, compara también los perfiles no modificados y las zonas de página no afectadas. Registra el entorno, las fuentes, la configuración del documento y cualquier limitación de las pruebas.

### 7.2 Problemas habituales

| Síntoma | Causa probable y acción |
| --- | --- |
| Estilo desconocido | Comprueba mayúsculas/minúsculas, nombre del archivo de estilo y registro del despachador; actualiza el texto de ayuda del error |
| El auxiliar omite un estilo LaTeX válido | Mantén el registro como una única línea analizable `\def\thesis@registeredstyles{...}` y asegúrate de que exista su archivo de estilo |
| Se encuentra el archivo de estilo, pero falla el encabezado | Comprueba que su *token* de diseño tenga una rama implementada; un nombre nuevo no es un renderizador |
| Falta un paquete | Instala el paquete `.sty` requerido en la distribución TeX activa; no distribuyas *stubs* destinados únicamente a pruebas |
| El espacio del encabezado se comporta de forma inesperada | Comprueba los espacios negativos nativos frente a los espacios positivos alternativos y si el valor es vertical u horizontal en este diseño |
| Los cambios de capítulo también modifican los títulos de listas generadas | Los ajustes compartidos de título/fuente/antes/después del capítulo proporcionan deliberadamente el formato de todos los títulos de lista |
| Cambiar el tamaño del capítulo no tiene efecto en framed/shaded | fncychap controla la tipografía real de los capítulos; revisa su interfaz de opciones/personalización |
| La sobrescritura de fuente del índice parece no tener efecto | `modern` y `mimosis` aplican sobrescrituras adicionales después de los valores comunes |
| Siguen sin aparecer puntos en los capítulos del índice | La rama de índice seleccionada elimina las guías; la separación de puntos por sí sola no puede restaurarlas |
| No aparece título en la página de inicio de capítulo | La página utiliza `plain`; las cabeceras normales de navegación no se aplican allí deliberadamente |
| Cabecera incorrecta/obsoleta en un capítulo con asterisco | Proporciona las marcas `\markboth`/`\markright` adecuadas; añadir una entrada al índice no las establece |
| La comparación utiliza formato antiguo | Vuelve a compilar los PDF individuales; `--pdf-dir` reutiliza los bytes existentes |
| La comparación no encuentra las muestras | La selección automática es específica de la guía; inspecciona los marcadores/texto o utiliza `--pages` |
| Falta una entrada registrada en la comparación | Compila todos los estilos registrados utilizando el sufijo correspondiente a la política de fuentes institucionales seleccionada |

## 8. Mantenimiento y material de referencia

Para las incorporaciones normales de perfiles, mantén `default-settings.tex` como base explícita de la plantilla original. Añade sobrescrituras en lugar de mover definiciones específicas de estilo al preámbulo compartido. Cuando una ampliación introduzca un ajuste nuevo, define su valor predeterminado compatible, añade su consumidor, describe los valores admitidos y su alcance, y verifica los perfiles existentes. Actualiza conjuntamente el registro del despachador, el comentario del selector, el README, el manual de usuario y esta guía.

Los perfiles distribuidos se han comprobado mediante la cadena completa de pdfLaTeX, Biber y glosarios en ambos modos de fuentes de las páginas institucionales. La salida `standard` también se comparó con la plantilla anterior a esta funcionalidad para proteger su renderizado original. La validación siempre debería incluir al menos un documento en inglés, además del manual predeterminado en español. Los comandos y resultados exactos dependen de la instalación TeX actual y deberían registrarse junto con el cambio que introdujo un perfil.

Los archivos fuente son la referencia autoritativa para los ajustes y el orden de carga descritos en esta guía.

La documentación principal de los paquetes está disponible en:

- [titlesec en CTAN](https://ctan.org/pkg/titlesec): diseños de encabezados y espaciado.
- [fncychap en CTAN](https://ctan.org/pkg/fncychap): opciones del paquete, diseños de capítulo de ejemplo y comandos de personalización.
- [tocloft en CTAN](https://ctan.org/pkg/tocloft): tipografía del índice/listas y controles de las columnas de numeración.
- [fancyhdr en CTAN](https://ctan.org/pkg/fancyhdr): colocación de estilos de página y marcas.

Cuando amplíes los renderizadores, consulta la documentación correspondiente a las versiones de los paquetes que tengas instaladas; las versiones instaladas pueden diferir de las versiones actuales del proyecto original.

## 9. Adaptación de Mimosis y licencia MIT

El perfil `mimosis` es una adaptación visual inspirada en [latex-mimosis](https://github.com/Pseudomanifold/latex-mimosis), de Bastian Rieck, examinada en el *commit* `54e43088a06a1808c7914540a7b7cd9f38fad326`. No carga `mimosis.cls` ni reproduce su implementación KOMA-Script. En su lugar, adapta decisiones reconocibles, como su base de fuentes, sus sobrios encabezados de capítulo en versalitas, la tipografía del índice y el tratamiento de las cabeceras de página, a la arquitectura existente de esta plantilla basada en la clase `book`. En consecuencia, los cambios deben implementarse mediante los ajustes y renderizadores de este repositorio, en lugar de copiarse como opciones de la clase Mimosis.

El material original adaptado está disponible bajo la siguiente licencia MIT:

```text
Copyright (c) 2018 Bastian Rieck

Por la presente se concede permiso, de forma gratuita, a cualquier persona que obtenga una copia
de este software y de los archivos de documentación asociados (el «Software»), para utilizar
el Software sin restricciones, incluyendo, sin limitación, los derechos de
usar, copiar, modificar, fusionar, publicar, distribuir, sublicenciar y/o vender
copias del Software, y para permitir que las personas a las que se proporcione el Software
hagan lo mismo, con sujeción a las siguientes condiciones:

El aviso de copyright anterior y este aviso de permiso deberán incluirse en todas
las copias o partes sustanciales del Software.

EL SOFTWARE SE PROPORCIONA «TAL CUAL», SIN GARANTÍA DE NINGÚN TIPO, EXPRESA O
IMPLÍCITA, INCLUIDAS, ENTRE OTRAS, LAS GARANTÍAS DE COMERCIABILIDAD,
IDONEIDAD PARA UN FIN DETERMINADO Y NO INFRACCIÓN. EN NINGÚN CASO LOS
AUTORES O TITULARES DE LOS DERECHOS DE AUTOR SERÁN RESPONSABLES DE RECLAMACIÓN, DAÑO U OTRA
RESPONSABILIDAD ALGUNA, YA SEA EN UNA ACCIÓN CONTRACTUAL, EXTRACONTRACTUAL O DE OTRO TIPO, DERIVADA DE,
OCASIONADA POR O RELACIONADA CON EL SOFTWARE O CON EL USO U OTRAS OPERACIONES CON EL
SOFTWARE.
```

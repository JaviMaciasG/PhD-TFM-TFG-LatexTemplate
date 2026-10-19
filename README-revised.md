# Plantilla LaTeX para TFG, TFM y tesis doctorales

## Introducción

Escribir un TFG, un TFM o una tesis doctoral ya da bastante trabajo. Pelearte con los márgenes, la portada y la numeración, no debería formar parte del pack.

La plantilla está diseñada principalmente para la Universidad de Alcalá (UAH), aunque también incluye soporte para algunas titulaciones de la URJC y de la ETSIT-UPM. Permite generar documentos en español o en inglés y cubre desde trabajos académicos convencionales hasta anteproyectos, documentación administrativa y tesis doctorales por compendio de publicaciones.

Al usar la plantilla puede que tantos archivos y opciones te impongan un poco. Es normal, pero no necesitas conocerlos todos ni tener nivel Jedi para empezar. Sólo tendrás que ocuparte de unos pocos archivos, y te iré indicando cuáles. El resto lo irás descubriendo cuando lo necesites, así que relax y ánimo con ello, porque estoy seguro de que eres perfectamente capaz.


## Qué hace la plantilla por ti

Con sólo definir, de forma muy sencilla, unos pocos datos de configuración, la plantilla se encarga de buena parte del formato de tu documento, incluyendo además ejemplos que puedes adaptar a tu trabajo. En concreto gestiona:

- Portadas, contraportadas, páginas preliminares, estructura de capítulos y apéndices.
- Índice general y listas de figuras, tablas, código, algoritmos (y elementos interesantes como las listas de vídeos).
- Figuras, tablas, ecuaciones y referencias cruzadas.
- Bibliografía por capítulo, bibliografía general o ambas.
- Acrónimos y listas de símbolos.
- Distintos estilos tipográficos, para cambiar rápidamente el aspecto visual de forma muy cómoda.
- Anteproyectos, parte de la documentación administrativa e incluso las tesis doctorales por compendio de publicaciones.

## Empieza aquí: la versión corta

Este es el recorrido que te propongo (usa los enlaces para ir a la sección de este documento donde te doy detalles):

1. **[Prepara tu entorno](#prepara-tu-entorno)**: una instalación local con TeXstudio o un proyecto en Overleaf.
2. **[Descarga y descomprime la distribución para estudiantes](#descarga-y-descomprime-la-distribución-para-estudiantes)**.
3. **[Compila el ejemplo sin modificar nada](#compila-el-ejemplo-sin-modificar-nada)** para comprobar que todo funciona y consultar el manual que genera.
4. **[Introduce tus datos y compila de nuevo](#introduce-tus-datos-y-compila-de-nuevo)** para comprobarlos en el PDF.
5. **[Prepara la estructura mínima](#prepara-la-plantilla-para-escribir)** y empieza a escribir tu documento.

Si el PDF muestra tu nombre y el título de tu trabajo, ya tienes la plantilla funcionando. Enhorabuena, el 80 % del miedo ya está superado. El resto puede aprenderse cuando lo necesites.

## Prepara tu entorno

Para empezar te recomiendo trabajar en tu equipo con una distribución de LaTeX y [TeXstudio](https://www.texstudio.org/). Si ya utilizas otro editor, puedes seguir haciéndolo. También tienes la alternativa de Overleaf, descrita más abajo.

Tu editor debe tener seleccionado **PdfLaTeX** como compilador y **Biber** como herramienta bibliográfica. Biber prepara las referencias bibliográficas a partir de los datos que añadas a tu trabajo. No tienes que aprender a utilizarlo por separado: aquí te indico cómo seleccionarlo en TeXstudio.

### Windows

1. Instala la versión actual de [MiKTeX](https://miktex.org/download). 
2. Durante la instalación, permite que MiKTeX instale los paquetes que falten, automáticamente o tras preguntarte.
3. Abre la aplicación `MiKTeX Console`, comprueba si hay actualizaciones e instálalas (ejecuta la opción `Check for updates` que verás en la pantalla principal).
4. Instala [TeXstudio](https://www.texstudio.org/).
5. En TeXstudio, selecciona **Opciones > Configurar TeXstudio > Compilar > Herramienta bibliográfica por defecto > Biber**.

En esa misma pantalla, comprueba que **Compilador por defecto** sea **PdfLaTeX**.

### GNU/Linux

En Ubuntu o Debian, busca estos nombres exactos en el gestor de paquetes de tu sistema:

- `texlive-full`: instala la distribución completa de LaTeX, con sus paquetes, fuentes e idiomas. Ocupa varios gigabytes y puede tardar en instalarse, pero evita que tengas que averiguar qué paquetes individuales necesita la plantilla.
- `texstudio`: instala el editor en el que escribirás tu trabajo.
- `biber`: instala la herramienta que prepara la bibliografía. Con `texlive-full` normalmente ya quedará instalado como dependencia, pero puedes comprobarlo en el gestor.

Por ejemplo, si tienes el **Gestor de paquetes Synaptic** en Ubuntu, ábrelo, busca cada nombre, selecciona **Marcar para instalar** y pulsa **Aplicar**. Acepta también las dependencias que proponga. Synaptic no viene instalado en todas las versiones de Ubuntu. La [ayuda de Ubuntu sobre Synaptic](https://help.ubuntu.com/stable/ubuntu-help/addremove-install-synaptic.html.en) explica cómo obtenerlo y utilizarlo. Si prefieres instalar desde la terminal, encontrarás los comandos en el manual.

Después, abre TeXstudio y selecciona **Opciones > Configurar TeXstudio > Compilar > Herramienta bibliográfica por defecto > Biber**. En esa misma pantalla, comprueba que **Compilador por defecto** sea **PdfLaTeX**.

En otras distribuciones GNU/Linux, instala TeX Live, TeXstudio y Biber mediante su gestor de paquetes. Los nombres de las colecciones de TeX Live pueden ser distintos de los anteriores.

### macOS

1. Instala [MacTeX](https://www.tug.org/mactex/).
2. Instala [TeXstudio](https://www.texstudio.org/) si quieres seguir el recorrido recomendado.
3. Abre **TeXstudio > Preferencias > Compilar** y selecciona **Biber** en **Herramienta bibliográfica por defecto**, igual que en Windows y GNU/Linux. En esa misma pantalla, comprueba que **Compilador por defecto** sea **PdfLaTeX**. Si los menús están en inglés, busca **Preferences > Build > Default Bibliography Tool > Biber**.

La instalación completa de MacTeX ya proporciona Biber.

### Overleaf

Con [Overleaf](https://www.overleaf.com/) puedes trabajar desde el navegador, sin instalar LaTeX ni TeXstudio en tu equipo. Sólo necesitas una cuenta y conexión a Internet. Las instrucciones para importar la plantilla están en [Compila el ejemplo en Overleaf](#compila-el-ejemplo-en-overleaf).

Ojo: con el plan gratuito es casi seguro que no podrás compilar el manual completo porque esa versión de overleaf limita mucho el tiempo de compilación. Si se agota ese tiempo, no significa que hayas hecho algo mal. Puedes utilizar una instalación local o, después de revisar el manual precompilado, probar con la estructura mínima y prescindir del material de ejemplo que no necesites. Un documento más pequeño puede caber en el límite de tiempo, pero no puedo garantizártelo.

### Si te manejas con la terminal

Make es una alternativa opcional al editor para automatizar tareas. Además de la distribución de LaTeX y Biber, esta vía necesita Make, Bash, `latexmk`, Perl y el script `makeglossaries`. El objetivo predeterminado del libro utiliza también Ghostscript para generar una copia comprimida. El manual detalla estos requisitos y las herramientas adicionales para convertir determinados formatos de figuras y diagramas.

**No necesitas utilizar la terminal ni Make para trabajar con la plantilla**: tu editor de LaTeX es una alternativa igualmente válida. Si eliges esta vía, encontrarás las instrucciones en [Compilación opcional con Make](#compilación-opcional-con-make).

## Tu primer PDF, paso a paso

### Descarga y descomprime la distribución para estudiantes

Para escribir tu documento te recomiendo que descargues la distribución `zip` de [Dropbox](https://www.dropbox.com/sh/mm6fwh3ruuuyjz2/AABDUmo7Xj1S968FeJgbmFPva?dl=0)[^1].

[^1]: El [repositorio de GitHub](https://github.com/JaviMaciasG/PhD-TFM-TFG-LatexTemplate) contiene además herramientas de mantenimiento, normativa y archivos históricos. Puedes clonarlo o crear un *fork* si quieres contribuir, pero no necesitas esos materiales para empezar.

La [guía de descarga en PDF](https://www.dropbox.com/scl/fi/n4jtan9a5v06cc1cp7n4h/01-DOWNLOAD-GUIDE.pdf?rlkey=ux7d8ox85zwlpwhr6nyjvx7zk&dl=0) explica qué muestra cada ejemplo. Sólo mostramos algunos ejemplos para no abrumarte con decenas de ficheros y posibilidades, y que no exista un PDF para tu titulación concreta no significa que no esté soportada (la lista es muy grande). Si quieres consultar el manual antes de instalar nada, abre el [ejemplo de TFG del GIEC en la UAH](https://www.dropbox.com/scl/fi/wwzbaow0g4cgs7euxvwxy/TFG-GIEC-spanish.pdf?rlkey=2x54yp52avfad67a2fdl3esmv&dl=0).

Descomprime la plantilla en una carpeta en la que tengas permisos de escritura. Conserva juntos los directorios de la distribución: `Book/` necesita los archivos compartidos de `Config/`.

### Compila el ejemplo sin modificar nada

Con el [entorno preparado](#prepara-tu-entorno), abre `Book/book.tex` en TeXstudio y utiliza **Herramientas > Compilar y ver** antes de modificar nada. Si utilizas otro editor, abre ese mismo archivo y utiliza su función habitual de construcción. Si trabajas en Overleaf, sigue el [apartado siguiente](#compila-el-ejemplo-en-overleaf).

La plantilla intenta generar automáticamente las listas de acrónimos y símbolos. Para esta vía desde el editor no necesitas instalar Perl ni ejecutar `makeglossaries` cuando tu distribución permite ejecutar el indexador automáticamente. Si las listas no aparecen tras la primera compilación, vuelve a compilar. Para otras incidencias, consulta el apartado de compilación del manual.

El PDF resultante es una prueba de que tu entorno funciona, el manual de la plantilla y una colección de ejemplos. Revísalo para orientarte, sin necesidad de leerlo entero. Si esta primera compilación falla, consulta [Problemas frecuentes](#problemas-frecuentes) antes de cambiar otros archivos.

### Compila el ejemplo en Overleaf

Inicia sesión en Overleaf, crea un proyecto mediante **New Project > Upload Project** y sube el `zip` de la distribución sin descomprimir. En las opciones del proyecto, selecciona `Book/book.tex` como **Main document**, comprueba que el compilador sea **pdfLaTeX** y pulsa **Recompile**. No necesitas configurar Biber por separado. Si se agota el tiempo de compilación, revisa el aviso del apartado [Overleaf](#overleaf).

### Introduce tus datos y compila de nuevo

Abre `Config/myconfig.tex` y utiliza la búsqueda de tu editor para localizar las siguientes definiciones. No necesitas conocer sus números de línea, que pueden cambiar entre versiones. En una definición como `\newcommand{\myDegree}{GIEC}`, cambia sólo el contenido del último par de llaves.

- **Titulación:** busca `\myDegree` y sustituye `GIEC` por el identificador de tu titulación. Los comentarios inmediatamente anteriores contienen las opciones disponibles.
- **Idioma:** busca `\myLanguage` y elige `spanish` o `english`.
- **Título:** busca `\myBookTitleSpanish` y `\myBookTitleEnglish` y sustituye los títulos de ejemplo por los de tu trabajo. La plantilla selecciona el que corresponda al idioma, aunque algunas páginas institucionales pueden utilizar ambos.
- **Autoría:** completa `\myAuthorName` y `\myAuthorSurname`. En `\myAuthorGender`, indica `male` o `female` para adaptar el género gramatical.
- **Tutoría:** completa `\myAcademicTutorFullName` y `\myAcademicTutorGender`. Si tienes cotutor, completa también `\myCoTutorFullName` y `\myCoTutorGender`. Si no, deja vacío el último par de llaves de la definición de su nombre: `{}`.

Con estos datos puedes comprobar la personalización inicial. Deja las opciones avanzadas para más adelante y revisa los demás campos cuando los necesites. Las fechas, como la de defensa, puedes completarlas cuando las conozcas.

> **Importante:** no elimines ni comentes las definiciones de variables. Si un dato opcional no corresponde a tu caso, como el cotutor, conserva la variable y deja su valor vacío.

Vuelve a compilar `Book/book.tex` y comprueba que aparecen tu nombre, el título y la titulación correctos. Comprueba también que se hayan actualizado los nombres de los tutores y las fechas que hayas introducido si el modelo de tu titulación muestra esos datos, como ocurre en los modelos de la UAH. No dejes los datos de ejemplo en la versión que entregues. `Book/book.tex` es el archivo que compilas, pero normalmente no tendrás que editarlo: la configuración y el contenido están separados.

### Compilación opcional con Make

Si has preparado las herramientas del apartado [Si te manejas con la terminal](#si-te-manejas-con-la-terminal), abre una terminal en `Book/` y ejecuta:

```bash
make
```

El Makefile utiliza `latexmk` para coordinar LaTeX, Biber y el procesamiento de glosarios, realizar las pasadas necesarias y evitar recompilaciones innecesarias. Los directorios del anteproyecto y del papeleo también incluyen Makefiles. Más abajo encontrarás otros dos usos: preparar la estructura mínima y seleccionar los fuentes para Git, que se explica en el apartado de [colaboración](#colaboración-con-tu-tutor-y-revisión-del-documento).

## Los archivos que realmente necesitas conocer

La separación en carpetas no busca complicarte el trabajo, sino mantener cada elemento en su sitio para que puedas encontrarlo con facilidad. La mayoría de los archivos cumplen una función concreta y no tendrás que ocuparte de todos a la vez.

Al principio basta con localizar estos archivos y directorios:

- `Config/myconfig.tex`: donde encontrarás los datos y las opciones generales del documento.
- `Book/book.tex`: donde encontrarás el documento principal que debes compilar, aunque normalmente no tendrás que editarlo.
- `Book/content-standard.tex`: donde encontrarás la organización de los capítulos, la bibliografía y los apéndices.
- `Book/chapters/`: donde encontrarás los capítulos del trabajo.
- `Book/abstract/`: donde encontrarás el resumen y el abstract.
- `Book/appendix/`: donde encontrarás los apéndices.
- `Book/biblio/biblio.bib`: donde encontrarás las referencias bibliográficas.
- `Book/figures/`: donde encontrarás las figuras e imágenes.
- `Book/diagrams/`: donde encontrarás los diagramas editables o generados.

Por ahora, céntrate en estos archivos. Los demás pueden esperar.

Los puntos de entrada del anteproyecto y los formularios se indican en [Cuando necesites algo más](#cuando-necesites-algo-más).

## Prepara la plantilla para escribir

Ya puedes escribir en la plantilla tal como está. Sin embargo, sus capítulos contienen el manual y los ejemplos. Para empezar tu trabajo sin tener que retirarlos uno a uno, puedes sustituirlos por una estructura mínima con capítulos casi vacíos. Esta preparación es opcional: conserva la organización actual si prefieres adaptarla por tu cuenta.

Una vez que hayas compilado y revisado el manual, guarda una copia de seguridad de la carpeta completa, incluyendo cualquier contenido que hayas escrito, por si algo sale mal.

### Método sencillo y visual

La distribución incluye versiones mínimas en:

```text
Book/chapters/bare/
Book/appendix/bare/
```

Para preparar manualmente una estructura mínima convencional, sigue estos pasos:

1. Comprueba que has guardado la copia de seguridad antes de sustituir o eliminar archivos.
2. Para no dejar capítulos de ejemplo que puedan confundirte, elimina sólo los archivos `.tex` situados directamente en `Book/chapters/` y `Book/appendix/`. No elimines las carpetas ni sus subcarpetas, como `bare/`, `orig/` o `compendium/`, ni los archivos de otros tipos. Esta limpieza no es necesaria para compilar, pero deja más claro qué contenido vas a utilizar.
3. Copia a `Book/chapters/` los archivos de capítulo de `Book/chapters/bare/`, excepto el archivo de organización `content-standard.tex`.
4. Copia a `Book/appendix/` los archivos de `Book/appendix/bare/`.
5. Sustituye `Book/content-standard.tex` por `Book/chapters/bare/content-standard.tex`.
6. Revisa en `Config/myconfig.tex` qué elementos opcionales quieres incluir y deja en `false` los que no necesites. Por ejemplo, las listas de vídeos y de símbolos suelen ser prescindibles al empezar, porque se utilizan en trabajos con necesidades más específicas.
7. Compila de nuevo `Book/book.tex`.

### Si te sientes cómodo con la terminal

Si utilizas Make, mantén `\myDocumentStructure` con el valor `standard` y ejecuta desde `Book/`:

```bash
make bare
```

Este objetivo crea una copia de seguridad, prepara la estructura mínima, instala los archivos fuente correspondientes y desactiva parte del material opcional de ejemplo. También ofrece eliminar figuras y diagramas de ejemplo, sólo si lo confirmas. Antes de ejecutarlo, comprueba igualmente que has guardado tu propia copia de seguridad.

También puedes preparar la estructura mínima de una tesis doctoral por compendio si esa es la estructura seleccionada. Consulta el manual antes de aplicarlo a un documento que ya hayas empezado.

Después organiza tu trabajo añadiendo, eliminando o reordenando las instrucciones `\input{...}` de `Book/content-standard.tex`. Escribe en los archivos de contenido, compila `Book/book.tex` y revisa el PDF y los avisos. Hacer cambios pequeños y compilar con frecuencia facilita encontrar los errores.

## Colaboración con tu tutor y revisión del documento

### Git para conservar y compartir tu trabajo

Git guarda el historial de tu proyecto en un repositorio y te permite recuperar versiones anteriores. Cada *commit* registra un conjunto de cambios con un mensaje que los describe. No lo necesitas para compilar, pero te lo recomiendo para no depender de copias llamadas "final", "final-bueno" y "ahora-sí-final".

Git conserva el historial en tu equipo. Puedes compartir una copia remota mediante GitHub, GitLab u otro servicio, pero recuerda sincronizar tus cambios para mantenerla al día.

Cuando tengas preparada la estructura mínima, puedes crear tu repositorio y hacer el primer *commit* desde una aplicación gráfica, sin utilizar la consola:

1. Abre la carpeta raíz del proyecto y utiliza la opción de crear o inicializar un repositorio, si todavía no existe.
2. Conserva el `.gitignore` proporcionado y selecciona los cambios no ignorados que quieras registrar.
3. **Revisa la lista**: incluye tus fuentes y recursos, no los auxiliares de compilación ni los PDF generados.
4. Escribe un mensaje que describa el inicio de tu trabajo y crea el *commit*. Publicarlo en un servicio remoto es una operación posterior y separada.

El apartado *Preparación del repositorio Git* del manual explica qué archivos conservar, cuáles no debes subir y cómo continuar con los siguientes *commits*. Encontrarás mucha información sobre Git y GitHub, así que no voy a aburrirte aquí con los detalles.

> **Si utilizas Make:** con el repositorio ya creado, ejecuta `make sync-git-sources` desde la raíz para seleccionar los fuentes según las dependencias de compilación. Te muestra los cambios y pide confirmación antes de preparar el próximo *commit*. Puede dejar de versionar archivos que no detecte como necesarios para compilar, sin borrarlos del disco. No hace el *commit* ni publica los cambios por ti. Consulta los requisitos en el manual.

### Revisar el documento con tu tutor

El historial de Git te ayuda a ver qué ha cambiado, pero no sustituye los comentarios sobre el contenido. Puedes combinarlo con las herramientas de revisión del servicio que utilices para compartir el proyecto.

También me ha resultado útil el paquete `todonotes`, que ya carga la plantilla. Al final de `Config/myconfig.tex` encontrarás comandos de ejemplo como `\todojmg`, `\todorbc` y `\todomig`, que puedes adaptar a las personas que revisen tu trabajo. Por ejemplo, `\todojmg{Revisar esta explicación}` inserta una nota de revisión. El manual describe estas ayudas y la generación de un documento de control de cambios. Vuelve a estas ayudas cuando empieces a intercambiar versiones con tu tutor.

## Cuando necesites algo más

Incorpora estas funciones a medida que las necesites. El manual contiene los detalles y ejemplos completos.

### Anteproyecto

El punto de entrada del anteproyecto es:

```text
Anteproyecto/anteproyecto.tex
```

Comparte con el documento principal los datos definidos en `Config/myconfig.tex`.

### Bibliografía

Para un uso normal, añade tus referencias BibTeX a:

```text
Book/biblio/biblio.bib
```

La plantilla utiliza `biblatex` con `biber`. Si las referencias no aparecen, comprueba que tu editor utiliza `biber`, no `bibtex`, como procesador de bibliografía.

Si trabajas con varios archivos `.bib`, colócalos en `Book/biblio/` y decláralos en `Book/biblio/bibliofiles.tex` siguiendo los ejemplos existentes.

### Figuras y diagramas

Guarda las ilustraciones en `Book/figures/` o `Book/diagrams/`. Los formatos PDF, PNG y JPEG pueden utilizarse directamente con `pdflatex`.

Por ejemplo:

```latex
\includegraphics[width=0.8\textwidth]{mi-figura.png}
```

Los Makefiles pueden convertir algunos formatos fuente, como SVG, EPS o DIA, cuando las herramientas externas correspondientes están instaladas.

### Acrónimos y símbolos

Los acrónimos y símbolos se definen en:

```text
Book/acronyms/defacronymsgl.tex
Book/symbols/defsymbolsgl.tex
```

Ambos archivos contienen ya ejemplos que puedes imitar para añadir tus propias definiciones. La plantilla intenta generar sus listas automáticamente al compilar. En una copia recién descargada puede hacer falta volver a compilar para que aparezcan. Si no se actualizan, consulta el apartado de compilación del manual. El uso de Make tiene los requisitos adicionales indicados en [Si te manejas con la terminal](#si-te-manejas-con-la-terminal).

### Documentación administrativa

Los documentos administrativos están agrupados por tipo de trabajo:

```text
PapeleoTFG/
PapeleoTFM/
```

Puedes compilar un formulario concreto desde tu editor o utilizar los Makefiles correspondientes. En Overleaf, cambia el documento principal por el formulario que quieras compilar. Consulta las guías PDF incluidas en esas carpetas y verifica siempre la normativa aplicable.

### Tesis doctoral por compendio de publicaciones

Para una tesis doctoral por compendio:

- Selecciona el programa de doctorado mediante `\myDegree`.
- Establece `\myDocumentStructure` como `compendium` en `Config/myconfig.tex`.
- Organiza el contenido en `Book/content-compendium.tex`.
- Continúa compilando `Book/book.tex`.

Consulta el manual y la normativa de tu programa antes de incorporar publicaciones, especialmente en lo relativo a permisos de reutilización.

## Problemas frecuentes

### No se genera el PDF

Prueba primero con una copia recién descargada, sin modificaciones. Si tampoco compila:

1. Revisa el primer mensaje de error real del registro, no solo el último.
2. Actualiza tu distribución de LaTeX.
3. Permite que se instalen los paquetes que falten.
4. Comprueba que estás compilando `Book/book.tex`.
5. Verifica que tu editor utiliza PdfLaTeX y Biber, como se explica en [Prepara tu entorno](#prepara-tu-entorno).

### La bibliografía no aparece

Comprueba que:

- Las entradas están en `Book/biblio/biblio.bib` o en un archivo declarado.
- Has citado las referencias en el texto.
- TeXstudio está configurado para utilizar `biber`.

### El ejemplo compilaba antes de que lo modificara

Guarda todos los archivos y vuelve a compilar `Book/book.tex`. En TeXstudio, abre el panel de mensajes o del registro y localiza el primer error, no los avisos de formato. Si el editor permite saltar a su ubicación, abre la línea indicada y revisa también las anteriores: a veces el problema empieza antes de donde LaTeX lo detecta.

Comprueba primero los cambios que acabas de hacer:

- Que cada llave de apertura `{` tenga su cierre `}` y no hayas eliminado una barra inversa `\` de un comando.
- Que no hayas comentado ni borrado una definición de `Config/myconfig.tex`.
- Que las rutas y los nombres de los archivos coincidan exactamente con los que utilizas, incluida su extensión.
- Que los caracteres especiales del texto estén escritos correctamente, por ejemplo `\%`, `\&` o `\_` cuando quieras imprimir esos signos.
- Que las entradas bibliográficas conserven sus llaves y las comas entre campos.

Si identificas un cambio reciente que pueda ser el responsable, guarda antes una copia del archivo y deshaz sólo ese cambio para probar. También puedes compararlo con tu copia de seguridad. Evita sustituir carpetas completas o borrar tu trabajo para intentar resolver un error.

Si tus cambios en `myconfig.tex` no aparecen, comprueba además que editas la misma copia que estás compilando.

### No entiendo el mensaje de error

Revisa los errores del registro de compilación. Empieza por el primero: los demás suelen ser daños colaterales. Anota:

- El archivo y la línea indicados.
- El texto exacto del error.
- El último cambio que realizaste.

Si solicitas ayuda, incluye esa información. Un mensaje como "no compila" describe bien el estado de ánimo, pero ofrece pocas pistas técnicas.

## Manual, ejemplos y ayuda

El PDF generado al compilar la distribución es también el manual completo y una colección de ejemplos. No necesitas leerlo de principio a fin antes de empezar: consúltalo cuando quieras configurar una función o copiar la estructura de un ejemplo.

Los enlaces a la guía de descarga y al ejemplo precompilado están en [Descarga y descomprime la distribución para estudiantes](#descarga-y-descomprime-la-distribución-para-estudiantes). Para comunicar un error reproducible o proponer una mejora, puedes utilizar el [sistema de incidencias de GitHub](https://github.com/JaviMaciasG/PhD-TFM-TFG-LatexTemplate/issues).

Si necesitas ayuda con un error de compilación o quieres enviar una sugerencia, puedes escribir a [javier.maciasguarasa@uah.es](mailto:javier.maciasguarasa@uah.es). Incluye, si es posible, el sistema operativo, la distribución de LaTeX, el editor, el archivo que estabas compilando y el primer mensaje de error.

## Créditos, licencia y contribuciones

Soy Javier Macías Guarasa y mantengo esta plantilla para que puedas dedicar más tiempo al contenido de tu trabajo que al formato. Tus correcciones, experiencias y sugerencias me ayudan a mejorarla, y así ha sido a lo largo de los años.

No soy un experto en LaTeX ni en diseñar plantillas, y muchas decisiones han salido de intentar resolver problemas concretos. Como te decía en la introducción de este documento, soy muy consciente de que la estructura puede resultar abrumadora al principio y que todavía hay cosas que podrían hacerse más sencillas. Si ves alguna, o tienes cualquier sugerencia, cuéntamelo enviándome un mensaje a [javier.maciasguarasa@uah.es](mailto:javier.maciasguarasa@uah.es). 

El proyecto sigue evolucionando y todas las contribuciones son bienvenidas, especialmente para:

- Corregir errores.
- Mejorar la documentación.
- Actualizar formularios y requisitos institucionales.
- Ampliar la compatibilidad con titulaciones.
- Simplificar la experiencia de quienes utilizan la plantilla por primera vez.

Puedes proponer cambios mediante una *pull request* o comunicar una incidencia en [GitHub](https://github.com/JaviMaciasG/PhD-TFM-TFG-LatexTemplate).

Consulta el archivo de licencia incluido en la distribución antes de redistribuir o modificar el proyecto.

¡Que lo disfrutes y, sobre todo, que la plantilla te permita dedicar más tiempo al contenido que al formato!

Javi

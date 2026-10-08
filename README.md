# Introducción

Este repositorio contiene una plantilla genérica para documentos de tesis doctoral (PhD), trabajos fin de máster (MSc/TFM) y trabajos fin de grado (BSc/TFG), diseñada principalmente para utilizarse en la Universidad de Alcalá (UAH). Por ello está escrita en español, aunque la plantilla también puede generar los documentos en inglés (basta con establecer una variable en el archivo de configuración).

La versión en inglés de esta introducción está disponible en [README-en.md](README-en.md). Las guías adicionales se encuentran en la carpeta [Documentation/](Documentation/), incluida la [guía de descarga](Documentation/es/DOWNLOAD-GUIDE.md).

La plantilla utiliza variables de configuración (definidas en el archivo `Config/myconfig.tex`) para personalizar todo el proceso de generación del documento, de modo que no tengas que dedicar esfuerzo a cumplir los requisitos de formato (por ejemplo, portada y contraportada), la maquetación del documento, etc.

También se ofrece soporte para generar el "anteproyecto" (en la carpeta `Anteproyecto`), junto con parte de la documentación administrativa exigida por la normativa vigente. Desde octubre de 2026 he estado trabajando en actualizar toda la documentación requerida para los TFG y TFM de la UAH (en las carpetas `PapeleoTFG/` y `PapeleoTFM/`) para adaptarla a la normativa aprobada recientemente. Este soporte te resultará útil tanto a ti como a tu tutor o tutores (informe y rúbrica del tutor, rúbrica de defensa y autorización para publicación en abierto (para tutor/autor/tutor extranjero)). El soporte de documentación administrativa para doctorado está pendiente de revisarse por completo conforme a la nueva normativa.

Lee la guía que aparece al principio de cualquiera de los ejemplos precompilados de la distribución de Dropbox (por ejemplo, el [TFG del GIEC en la UAH](https://www.dropbox.com/scl/fi/tjxvfxrcvnzqjz41ucdpw/TFG-GIEC-spanish.pdf?rlkey=qjovi1smyjoccdaddihozm5t7&dl=0)). El capítulo 1 presenta la plantilla y te dirige a los capítulos siguientes según lo que necesites.


# Inicio rápido

## Descargar la plantilla

Se puede acceder a la plantilla de dos formas:

1. En GitHub, si quieres clonar o hacer un *fork* de mi versión de trabajo. Está disponible en
[la página del proyecto de mi cuenta de GitHub](https://github.com/JaviMaciasG/PhD-TFM-TFG-LatexTemplate), de modo que puedes clonarla desde [la URL de clonación](https://github.com/JaviMaciasG/PhD-TFM-TFG-LatexTemplate.git). Ten en cuenta que contiene muchos archivos adicionales que no deberían resultar útiles para el usuario general
2. En mi Dropbox, en formatos zip y tgz, accesible desde [esta carpeta de descargas de Dropbox](https://www.dropbox.com/sh/mm6fwh3ruuuyjz2/AABDUmo7Xj1S968FeJgbmFPva?dl=0). La carpeta también contiene una selección de documentos de ejemplo completos. Abre [`01-DOWNLOAD-GUIDE.pdf`](https://www.dropbox.com/scl/fi/n4jtan9a5v06cc1cp7n4h/01-DOWNLOAD-GUIDE.pdf?rlkey=ux7d8ox85zwlpwhr6nyjvx7zk&dl=0) para ver la lista y qué muestra cada archivo. Que no exista un PDF para una titulación concreta no significa que no sea compatible.


## Elegir dónde quieres trabajar

Tienes dos opciones principales para trabajar con la plantilla: hacerlo localmente en cualquier PC (mi configuración preferida utiliza [TeXstudio](https://www.texstudio.org/)) o hacerlo en línea mediante [Overleaf](https://www.overleaf.com/). Ambas opciones se describen a continuación.


### Trabajar en un equipo local

Necesitarás una buena distribución de LaTeX (Tex Live, MiKTeX, MacTeX, etc., según tu entorno de trabajo). Para ver una lista de todos los paquetes necesarios, puedes consultar las instrucciones `\usepackage{...}` del archivo `Config/preamble.tex`, aunque no debería ser necesario ni suponer un problema, ya que la mayoría de las distribuciones incluirán todo lo que necesitas. Si encuentras errores porque algún paquete no está disponible, instálalo (debería ser bastante sencillo).

Ten en cuenta que la compilación principal se realiza mediante `pdflatex+biber`. Puedes compilar el documento con [TeXstudio](https://www.texstudio.org/) o con cualquier buen editor de LaTeX después de configurar las herramientas necesarias. El flujo de trabajo `make` proporcionado automatiza el proceso completo y resulta práctico si está disponible en tu entorno, pero no es necesario para utilizar la plantilla.


#### Notas sobre la instalación en GNU/Linux

Me refiero aquí a distribuciones similares a Debian (principalmente Ubuntu), aunque las instrucciones y los nombres de los paquetes deberían ser parecidos en otras distribuciones.

Te recomiendo instalar la distribución Tex Live (`sudo apt-get install texlive` será suficiente en un equipo Ubuntu, por ejemplo). La mayoría de los paquetes necesarios se instalarán de forma predeterminada; las excepciones habituales son `texlive-publishers`, `texlive-lang-spanish` y `texlive-lang-english`. Instálalos también.

También puedes utilizar `sudo apt-get install texlive-full` para instalar una distribución completa y muy amplia de Tex Live, pero ocupará mucho espacio en disco.

En cuanto a editores, volvería a recomendar [TeXstudio](https://www.texstudio.org/) o [emacs](https://www.gnu.org/software/emacs/). Personalmente utilizo este último con la [configuración Doom emacs](https://github.com/doomemacs/doomemacs), pero la curva de aprendizaje puede ser realmente pronunciada, por lo que [TeXstudio](https://www.texstudio.org/) es, en mi opinión, una opción mucho más segura.


#### Notas sobre la instalación en Windows

Este es el procedimiento que recomiendo para dejarlo todo preparado (si no te funciona, por favor [avísame](mailto:javier.maciasguarasa@uah.es)):

1. Instala la última versión de [MikTeX](https://miktex.org). Selecciona la instalación de los paquetes necesarios sobre la marcha (bien "Yes" o "Ask me first")

   1.1. Ejecuta `MiKTeX Console` y `Check for updates` (de lo contrario, probablemente obtendrás un error al compilar fuentes LaTeX)

   1.2. En `MiKTeX Console`, ejecuta ahora `Updates|Update`

2. Instala la última versión de [TeXstudio](https://www.texstudio.org/)

3. Instala un intérprete de Perl si piensas utilizar acrónimos, gestionados en la plantilla mediante `makeglossaries`, algo que recomiendo totalmente. He utilizado [Strawberry perl](https://strawberryperl.com/), aunque puedes visitar el sitio de Perl (https://www.perl.org/get.html) y consultar otras alternativas.


#### Notas sobre la configuración de TeXStudio (MUY IMPORTANTE)

El soporte bibliográfico se proporciona mediante [biblatex](https://www.ctan.org/pkg/biblatex), por lo que el *backend* es ahora biber (desde 2022). Esto significa que debes configurar [TeXstudio](https://www.texstudio.org/) (o tu editor de \LaTeX{} preferido) para utilizar biber como procesador de bibliografía. En la aplicación [TeXstudio](https://www.texstudio.org/), ve simplemente a `Options > Configure TeXstudio > Build > Default Bibliography > Biber`.


### Trabajar en [Overleaf](https://www.overleaf.com/)

Antes de nada, tengo una mala noticia respecto al uso de [Overleaf](https://www.overleaf.com/) para compilar tu trabajo: por lo que sé, la modalidad gratuita de [Overleaf](https://www.overleaf.com/) (desde 2024, con sus nuevas restricciones) no te asignará suficiente tiempo de compilación para generar el archivo PDF :-(.

En cualquier caso, si quieres trabajar con la plantilla en [Overleaf](https://www.overleaf.com/) (utilizando uno de los planes de pago), es bastante sencillo. Estos son los pasos principales:

1. Inicia sesión en [Overleaf](https://www.overleaf.com/)
2. En la página principal, selecciona el botón `New Project`
3. Selecciona `Upload project`
4. Selecciona el zip correspondiente entre los que encontrarás en la [carpeta de Dropbox de la plantilla](https://www.dropbox.com/sh/mm6fwh3ruuuyjz2/AABDUmo7Xj1S968FeJgbmFPva?dl=0)
5. [Overleaf](https://www.overleaf.com/) hará su magia y, en unos segundos, tendrás instalada la plantilla

Recuerda que tendrás que seleccionar el "documento principal" (puedes acceder a esta opción mediante las opciones que aparecen al hacer clic en el logotipo de Overleaf, en la esquina superior izquierda de la página principal del proyecto). Consulta más abajo las secciones "Para trabajar en..." para ver cuáles son los archivos principales disponibles. Los más relevantes para seleccionar como "documento principal" son:

+ `Anteproyecto/anteproyecto.tex`
+ `Book/book.tex`

También puedes necesitar algunos de los archivos de documentación administrativa descritos en la sección Estructura del repositorio (#repository-structure).

En el pasado hemos tenido varios problemas con [Overleaf](https://www.overleaf.com/) (principalmente relacionados con los glosarios), y ahora deberían funcionar correctamente. Si en el futuro surgen nuevos problemas, [ponte en contacto conmigo](mailto:javier.maciasguarasa@uah.es) y/o consulta [este repositorio](https://github.com/gkilleen33/overleaf-offline/tree/master), que contiene buenas configuraciones para `latexmkrc` que deberían darte pistas sobre cómo resolverlos.


## Estructura del repositorio

Los directorios que necesitan la mayoría de los usuarios son:

- `Config/`: configuración compartida del documento.
- `Book/`: documento principal de TFG, TFM o doctorado, con sus capítulos, apéndices, resúmenes, bibliografía e ilustraciones.
- `Anteproyecto/`: documento de anteproyecto o propuesta. Su punto de entrada es `Anteproyecto/anteproyecto.tex`.

En algunos casos también puedes necesitar los recursos que se encuentran en:

- `PapeleoTFG/`, `PapeleoTFM/` y `PapeleoPHD/`: documentos administrativos asociados a cada tipo de trabajo (`PapeleoPHD/` todavía no está disponible, lo siento).

El repositorio Git completo también contiene `AdminScripts/`, `Deprecated/`, `normativas/`, `UsefulDocs/` y archivos Markdown orientados a los mantenedores. Sirven para el desarrollo, la referencia histórica y la preparación de versiones, y se omiten deliberadamente de la distribución ZIP/TGZ ordinaria.


## Configurar tus datos

Personaliza tus datos, titulación e idioma en `Config/myconfig.tex`. Los comentarios del archivo te orientan y el capítulo de configuración del manual contiene la referencia completa. **Importante**: no elimines ni comentes las definiciones de variables; si un dato no corresponde a tu caso, como el cotutor, deja su valor vacío.

También puedes probar otros estilos tipográficos para el documento principal; es una opción preliminar que se explica en el manual y no necesitas modificarla para empezar.

## Para trabajar en el "anteproyecto"

1. Configura los metadatos del documento en `Config/myconfig.tex`.
2. Ve al directorio `Anteproyecto`, donde encontrarás el archivo `anteproyecto.tex`. Este es el archivo en el que debes trabajar y el punto de entrada para la compilación. En el repositorio se proporciona un ejemplo.
3. Edita el archivo para adaptarlo a tus necesidades
4. Compílalo (hay disponible un `Makefile` incremental basado en `latexmk`, aunque puedes utilizar tu herramienta o comando habitual de compilación de LaTeX dentro de tu editor preferido).

## Para trabajar en el documento principal

### Caso general

Después de descargar la plantilla, compila primero `Book/book.tex` sin modificarlo. El PDF resultante es el manual completo, incluidos ejemplos de las funcionalidades disponibles; utiliza esta primera compilación para comprobar que todo funciona y revisar la guía antes de empezar tu documento.

1. Revisa tus datos en el archivo de configuración, como se indica arriba.
2. Mantén `\myDocumentStructure` con el valor `standard`, tal como se suministra, y utiliza las variables `\myInclude...` para seleccionar si quieres incluir en el documento los elementos opcionales: la carta PDF de ejemplo, dedicatoria, agradecimientos, lista de figuras, lista de tablas, listas de acrónimos y símbolos, y listas de código, algoritmos y vídeos.
3. Añade, elimina o reordena las líneas `\input{...}` de `Book/content-standard.tex` para organizar capítulos y apéndices, y escribe el contenido en los archivos de `Book/abstract/`, `Book/chapters/`, `Book/appendix/` y los demás directorios de contenido según sea necesario. Normalmente no deberías tener que modificar `Book/book.tex`.
4. Compila `Book/book.tex` con una herramienta de compilación LaTeX estándar o desde tu editor LaTeX preferido. Recuerda configurar la herramienta o el editor para utilizar `pdflatex` y `biber`; añade `makeglossaries` únicamente si utilizas acrónimos o símbolos. Ejecuta las pasadas adicionales de LaTeX necesarias para resolver las referencias, la bibliografía y los glosarios que pueda haber.

Si vas a preparar una tesis por compendio, consulta el caso especializado más abajo.

Si prefieres automatizar la compilación, ejecuta `make` desde `Book/`; esta alternativa requiere `latexmk`, pero no necesitas Make para utilizar la plantilla. Encontrarás los requisitos y los objetivos disponibles en el apartado del manual *Compilación mediante el Makefile*.

Cuando estés preparado para escribir tu propio documento, parte de la estructura mínima estándar: copia los archivos de capítulo de `Book/chapters/bare/` a `Book/chapters`, excepto su archivo de organización `content-standard.tex`, y los archivos de `Book/appendix/bare/` a `Book/appendix`; después utiliza `Book/chapters/bare/content-standard.tex` para sustituir `Book/content-standard.tex`. El manual ofrece el procedimiento completo orientado a principiantes. Si utilizas el Makefile suministrado, mantén `\myDocumentStructure` con el valor `standard` y ejecuta `make bare` desde `Book/`; crea una copia de seguridad, instala los archivos fuente mínimos y desactiva el material de ejemplo opcional.


Una vez que la estructura mínima esté preparada, crea tu repositorio Git y realiza un primer *commit* de sus archivos fuente. Si prefieres un cliente Git gráfico, conserva el `.gitignore` proporcionado, pide al cliente que incluya en el *commit* todos los cambios no ignorados, revisa la lista de archivos propuesta y crea después el *commit*; el cliente puede denominar esta operación *Stage all*, *Stage all changes*, *Select all* o simplemente mostrar casillas para seleccionar los archivos que se incluirán. El procedimiento completo para principiantes, los archivos que nunca deben incluirse en un *commit* y la alternativa `make sync-git-sources`, que tiene en cuenta las dependencias, se explican en la sección del manual *Preparación del repositorio Git*.

### Caso especializado: tesis doctoral por compendio de publicaciones

Si tu tesis doctoral se presenta por compendio de publicaciones, establece `\myDocumentStructure` como `compendium` y selecciona tu programa de doctorado mediante `\myDegree` en `Config/myconfig.tex`. Organiza el contenido en `Book/content-compendium.tex` y compila el mismo `Book/book.tex`. El manual explica la estructura mínima y la incorporación de publicaciones en los apartados *Caso particular: tesis por compendio de publicaciones* y *Caso especializado: tesis por compendio de publicaciones*; comprueba también la normativa de tu programa y los permisos de reutilización de los artículos.

## Personalizar el contenido del documento principal

### Figuras y diagramas

Coloca las ilustraciones del documento en `Book/figures/` o `Book/diagrams/`. Como `Book/book.tex` añade ambos directorios a `\graphicspath`, normalmente pueden incluirse por nombre de archivo:

```latex
\includegraphics[width=0.8\textwidth]{my-figure.png}
```

Si sigues la alternativa de compilación con `make`, el Makefile puede convertir archivos fuente `dia`, `SVG` y `EPS` compatibles cuando estén instaladas las herramientas externas correspondientes. Los archivos PDF, PNG y JPEG pueden utilizarse directamente con `pdflatex`. Mantén los logotipos institucionales en `Book/logos/`, separados de las ilustraciones específicas del documento.

### Acrónimos y símbolos

Define los acrónimos en `Book/acronyms/defacronymsgl.tex` y los símbolos en `Book/symbols/defsymbolsgl.tex`. Su presentación se controla mediante los archivos `acronymsgl.tex` y `symbolsgl.tex` correspondientes y la configuración compartida de glosarios, pero no necesitas modificarlos.

### Páginas PDF externas

Utiliza `\includepdf` cuando haya que insertar en el documento una carta de aprobación u otro PDF:

```latex
\includepdf[pages=-]{letters/my-letter.pdf}
\clearemptydoublepage
```

La opción `pages=-` incluye todas las páginas. El ejemplo distribuido se controla mediante `\myIncludeSampleLetter` en `Config/myconfig.tex`; establécelo como `false` cuando no sea necesario.

## Para trabajar con la documentación administrativa

1. Ve a `PapeleoTFG/`, `PapeleoTFM/` o `PapeleoPHD/`, según el tipo de documento que necesites.
2. Edita los archivos que necesites y compílalos mediante los `Makefile` correspondientes o con tu editor/herramienta de compilación LaTeX habitual. Al ejecutar `make`, se utiliza `latexmk` para generar todos los formularios del directorio y evitar recompilar los documentos que no hayan cambiado; utiliza `make help` para ver los grupos y objetivos individuales disponibles. Si utilizas [Overleaf](https://www.overleaf.com/), cambia el `main document` para que sea el que quieras compilar.


# Gestión de la bibliografía

En cuanto a los archivos de bibliografía, para un uso normal solo tienes que editar `Book/biblio/biblio.bib` para incluir las entradas BibTeX que quieras.

Si tienes varios archivos `.bib`, añade cada uno de ellos en `Book/biblio/` y define su ruta en `Book/biblio/bibliofiles.tex` mediante los ejemplos proporcionados `\mybibfileOne`, `\mybibfileTwo` y siguientes. No es necesario realizar cambios en ningún otro lugar.

Recuerda que el *backend* predeterminado para el procesamiento de la bibliografía es ahora `biber` (desde septiembre de 2022). Esto implica que debes indicar a tu editor o entorno de compilación \LaTeX{} que estás utilizando `biber` en lugar de `bibtex`. Esto se aplica, por ejemplo, a TeXStudio, como se ha descrito anteriormente.

# Colaboración con tu tutor o con otros compañeros

## Uso de GitHub para el control de versiones

Recomiendo encarecidamente utilizar [GitHub](https://www.github.com) para llevar el control y permitir compartir el código fuente LaTeX. El control de versiones permite:

- Seguir los cambios a lo largo del tiempo.
- Colaborar con tu tutor o con otros compañeros.
- Mantener una copia de seguridad de tu trabajo en un repositorio remoto.

Encontrarás mucha información útil sobre [GitHub](https://www.github.com), así que no voy a aburrirte aquí con los detalles.

## Gestión de la revisión del documento

Para gestionar la revisión del documento (por ejemplo, por parte de tu tutor), puedes utilizar las herramientas del repositorio de [GitHub](https://www.github.com). También me ha resultado útil el proceso de revisión mediante el paquete `todonotes`. Está instalado de forma predeterminada y hemos definido algunas macros útiles al final del archivo `Config/myconfig.tex` (busca entradas `\todo...`). Consúltalas si te interesan. El documento de la plantilla también incluye una sección dedicada a generar un documento de *control de cambios*.

# Descargo de responsabilidad, petición de ayuda y ofrecimiento de ayuda

Queda mucho trabajo por hacer para mejorar la documentación de esta plantilla, y haré todo lo posible, pero no puedo prometer nada. Sé que la estructura y la complejidad de la plantilla pueden resultar abrumadoras al enfrentarse a ella por primera vez, por lo que me gustaría que contribuyeras con ideas o sugerencias sobre cómo hacerla más fácil de entender y utilizar.

Hay bastantes malas prácticas de programación y hábitos muy poco profesionales, pero no soy un experto y simplemente intenté conseguir que todo funcionara directamente. Sería estupendo que pudieras contribuir de cualquier forma a mejorar esta plantilla, así que [envíame un mensaje](mailto:javier.maciasguarasa@uah.es) o considera la posibilidad de enviar una *pull request*.

Además, si necesitas ayuda para hacer que esto funcione, tienes algún error de compilación o incluso sugerencias de mejora, ponte en contacto conmigo en [mi dirección de correo electrónico](mailto:javier.maciasguarasa@uah.es).

¡Que lo disfrutes!


Javi

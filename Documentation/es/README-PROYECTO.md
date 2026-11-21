# [Título del trabajo]

Sustituye los textos entre corchetes por los datos de tu trabajo y elimina esta frase cuando hayas terminado.

- Autor/a: [Nombre completo]
- Titulación: [Nombre de la titulación] (`[Identificador]`)
- Universidad y centro: [Universidad y escuela o facultad]
- Tutor/a: [Nombre completo]
- Cotutor/a: [Nombre completo, o elimina esta línea si no hay cotutor]
- Curso académico: [Curso]

## Descripción

[Breve descripción del trabajo y sus objetivos]

## Preparación y compilación

Configura los datos del documento en `Config/myconfig.tex`, incluido el identificador de tu titulación. Los datos de este README describen el proyecto, pero no configuran la compilación.

El documento principal es `Book/book.tex`. Puedes compilarlo desde tu editor LaTeX habitual o desde `Overleaf`, con el procesamiento de bibliografía mediante `biber`. No necesitas utilizar `make`.

Para organizar tu contenido, edita `Book/content-standard.tex`. Si preparas una tesis por compendio de publicaciones, selecciona `PHDUAH-COMPENDIUM`, `PHD-ETSIT-UPM-COMPENDIUM`, `PHD-ETSII-UPM-COMPENDIUM` o `PHD-ETSII-US-COMPENDIUM` mediante `\myDegree` en `Config/myconfig.tex` y utiliza `Book/content-compendium.tex`.

Consulta [00-README.pdf](00-README.pdf) y el manual que obtienes al compilar la plantilla por primera vez para conocer el procedimiento completo.

## Con la herramienta de preparación

- **Windows:** abre `Tools/prepare-book.bat`.
- **macOS:** abre `Tools/prepare-book.command`.
- **Linux:** haz doble clic en `Tools/prepare-book.sh` y elige `Ejecutar en un terminal`. Si no aparece esa opción, ejecuta `sh Tools/prepare-book.sh` desde la carpeta de la plantilla.

Elige preparar un documento mínimo o restaurar los ejemplos. La herramienta guarda una copia de los archivos que va a sustituir. Después, compila `Book/book.tex`.

Si trabajas en Overleaf o Prism, consulta el apartado *Preparación de una estructura mínima* del manual.

## Plantilla utilizada

Este trabajo utiliza la [plantilla PhD-TFM-TFG-LaTeX de Javier Macías-Guarasa y colaboradores](https://github.com/JaviMaciasG/PhD-TFM-TFG-LatexTemplate). La versión utilizada figura en [RELEASE.txt](RELEASE.txt).

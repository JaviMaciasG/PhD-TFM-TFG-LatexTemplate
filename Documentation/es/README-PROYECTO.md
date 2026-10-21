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

El documento principal es `Book/book.tex`. Puedes compilarlo desde tu editor LaTeX habitual o desde `Overleaf` o `Prism`, con el procesamiento de bibliografía mediante `biber`. No necesitas utilizar `make`.

Para organizar tu contenido, edita `Book/content-standard.tex`. Si preparas una tesis por compendio de publicaciones, selecciona `PHDUAH-COMPENDIUM` o `PHD-ETSIT-UPM-COMPENDIUM` mediante `\myDegree` en `Config/myconfig.tex` y utiliza `Book/content-compendium.tex`.

Consulta [00-README.pdf](00-README.pdf) y el manual que obtienes al compilar la plantilla por primera vez para conocer el procedimiento completo, incluida la preparación de una estructura mínima antes de empezar a escribir.

## Plantilla utilizada

Este trabajo utiliza la [plantilla PhD-TFM-TFG-LaTeX de Javier Macías-Guarasa y colaboradores](https://github.com/JaviMaciasG/PhD-TFM-TFG-LatexTemplate). La versión utilizada figura en [RELEASE.txt](RELEASE.txt).

---
title: "Guía de descarga de la plantilla LaTeX para PhD-TFM-TFG"
author: "Javier Macías-Guarasa"
---

# ¿Qué debo descargar?

Si quieres empezar un documento nuevo, descarga el archivo ZIP o TGZ actual. Ambos archivos contienen la misma plantilla. ZIP suele ser la opción más cómoda para Windows, macOS y `Overleaf`, mientras que TGZ puede resultar más conveniente en GNU/Linux. El archivo `RELEASE.txt` identifica la versión publicada de la plantilla.

Si quieres examinar el resultado antes de descargar la plantilla, empieza por `TFG-GIEC-spanish.pdf`. Utiliza la estructura y el aspecto predeterminados, y sus primeros capítulos constituyen el manual de usuario completo.

Los PDF restantes son ejemplos seleccionados deliberadamente, en lugar de un documento generado para cada titulación compatible. En conjunto muestran los dos idiomas, las estructuras de documento compatibles, los estilos tipográficos alternativos, la compatibilidad con la URJC y la ETSIT-UPM y los distintos diseños de portada de MUIE, MUCTE y MUC. La ausencia de un PDF específico para una titulación no significa que esta no sea compatible; consulta `Config/myconfig.tex` y el manual para ver la lista completa de identificadores.

# Archivos de la plantilla e información de la versión

- `03-PhDTFMTFG-LaTeX-Template-UAH-<release>.zip`: plantilla de usuario completa en formato ZIP.
- `03-PhDTFMTFG-LaTeX-Template-UAH-<release>.tgz`: la misma plantilla en formato TAR comprimido.
- `RELEASE.txt`: identificador exacto de la versión utilizado para crear los archivos y los ejemplos.
- `00-README.pdf`: introducción al proyecto e información de inicio rápido en formato PDF.
- `01-DOWNLOAD-GUIDE.pdf`: esta guía, proporcionada en un formato que puede abrirse directamente desde Dropbox.
- `02-TYPESETTING-STYLES-COMPARISON.pdf`: comparación visual bilingüe de todos los estilos tipográficos disponibles, utilizando las mismas páginas representativas para cada uno.

Cada archivo ZIP o TGZ también contiene `04-TYPESETTING-STYLES-GUIDE.pdf` en su directorio raíz. Ese documento es la guía completa de uso y referencia para configurar los estilos tipográficos preliminares; es distinto del archivo de comparación visual `02-TYPESETTING-STYLES-COMPARISON.pdf` que se proporciona junto a los archivos comprimidos.

Después de descargar un archivo, extráelo o súbelo, compila `Book/book.tex` una vez sin modificarlo y utiliza el manual resultante para comprobar tu instalación y aprender el flujo de trabajo habitual.

# Documentos de ejemplo completos

- **`TFG-GIEC-spanish.pdf`**: trabajo fin de grado del GIEC en la UAH. Español; estructura de contenido estándar; estilo tipográfico `standard`.
- **`TFM-MUIE-spanish-modern.pdf`**: trabajo fin de máster del MUIE en la UAH. Español; estructura de contenido estándar; estilo tipográfico `modern`. Utiliza el mismo modelo de portada y contraportada que MUIT y MUII.
- **`TFM-MUCTE-english-framed.pdf`**: trabajo fin de máster del MUCTE en la UAH. Inglés; estructura de contenido estándar; estilo tipográfico `framed`.
- **`TFM-MUC-spanish-shaded.pdf`**: trabajo fin de máster del MUC en la UAH. Español; estructura de contenido estándar; estilo tipográfico `shaded`.
- **`PhD-PHDUAH-english-conventional-mimosis.pdf`**: tesis doctoral convencional de la UAH. Inglés; estructura de contenido estándar; estilo tipográfico `mimosis`.
- **`PhD-PHDUAH-spanish-conventional-chapterbib-editorial.pdf`**: tesis doctoral convencional de la UAH. Español; estructura de contenido estándar; estilo tipográfico `editorial`. Incluye bibliografías por capítulo con numeración local y una bibliografía general con numeración independiente.
- **`PhD-PHDUAH-spanish-compendium-standard.pdf`**: tesis doctoral de la UAH por compendio de publicaciones. Español; estructura de compendio; estilo tipográfico `standard`.
- **`TFG-GISTS-ETSIT-UPM-spanish.pdf`**: trabajo fin de grado del GISTS en la ETSIT-UPM. Español; estructura de contenido estándar; estilo tipográfico `standard`. Muestra la portada y la contraportada naranjas, la hoja de datos y tribunal sin títulos resaltados y el apéndice de aspectos éticos.
- **`TFG-GII-ETSII-URJC-english-editorial.pdf`**: trabajo fin de grado de Ingeniería Informática en la ETSII-URJC. Inglés; estructura de contenido estándar; estilo tipográfico `editorial`.

Los cinco estilos tipográficos alternativos están representados. El estilo `editorial` aparece en el ejemplo de la URJC y en la tesis con bibliografías por capítulo. El estilo predeterminado `standard` aparece en el ejemplo principal del GIEC, en el de GISTS-ETSIT-UPM y en el de compendio, para que puedan evaluarse las diferencias institucionales y de estructura sin añadir otra variación visual.

# Cómo entender las variaciones

La estructura de contenido `standard` es adecuada para TFG, TFM y tesis doctorales convencionales. La estructura `compendium` es una alternativa especializada para tesis doctorales presentadas como compendio de publicaciones.

El estilo tipográfico controla las fuentes del documento, los encabezados de capítulos y secciones, el índice y las cabeceras de página. Por defecto, las portadas conservan sus fuentes institucionales sin que tengas que configurar nada más.

Abre `02-TYPESETTING-STYLES-COMPARISON.pdf` para comparar directamente los estilos sin tener que ir cambiando entre los documentos de ejemplo completos. Para cada estilo registrado repite el mismo índice, inicio de capítulo, página ordinaria con ecuaciones y título de capítulo largo. El nombre del estilo activo aparece en la esquina superior derecha de cada página de muestra.

Cada ejemplo es un documento completo, por lo que puedes examinar las portadas, las páginas preliminares, los capítulos del manual, la bibliografía, los apéndices y la contraportada. Estos PDF son demostraciones, no normativas específicas de cada titulación; comprueba siempre los requisitos vigentes de tu institución antes de entregar tu trabajo.

# Elegir un ejemplo

- Empieza por `TFG-GIEC-spanish.pdf` si quieres entender el flujo de trabajo habitual o simplemente comprobar el aspecto predeterminado.
- Compara los ejemplos de MUIE, MUCTE y MUC cuando necesites examinar sus distintas secuencias de portadas de máster.
- Utiliza el ejemplo convencional PHDUAH para una tesis doctoral ordinaria y el ejemplo de compendio únicamente cuando tu tesis se presente formalmente como compendio de publicaciones.
- Abre `PhD-PHDUAH-spanish-conventional-chapterbib-editorial.pdf` para ver las bibliografías al final de cada capítulo y compararlas con la bibliografía general. Las citas enlazan con las entradas del capítulo correspondiente.
- Utiliza el ejemplo GISTS-ETSIT-UPM para examinar las páginas iniciales compartidas por GISTS, GIB y varios másteres compatibles de la ETSIT-UPM, junto con el apéndice de aspectos éticos.
- Utiliza el ejemplo GII-ETSII-URJC si trabajas en la URJC o quieres ver cómo cambia el soporte institucional sin modificar el flujo de trabajo del documento.

Los estilos visuales se distribuyen entre estos documentos para evitar publicar todas las combinaciones posibles. Cualquier documento compatible puede seleccionar cualquier estilo disponible mediante `Config/myconfig.tex`; las combinaciones de esta carpeta son ejemplos, no restricciones.

# Mantener juntos los archivos

Mantén juntos `RELEASE.txt`, los PDF de ejemplo seleccionados y los archivos ZIP/TGZ de una misma publicación. Si sus identificadores de versión o fechas de publicación difieren, vuelve a descargar el conjunto actual antes de utilizar un ejemplo para evaluar la plantilla.

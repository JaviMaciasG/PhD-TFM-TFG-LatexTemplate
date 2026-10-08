---
title: "Guía de descarga de la plantilla LaTeX para PhD-TFM-TFG"
author: "Javier Macías-Guarasa"
---

# ¿Qué debo descargar?

Si quieres empezar un documento nuevo, descarga el archivo ZIP o TGZ actual. Ambos archivos contienen la misma plantilla; ZIP suele ser la opción más cómoda para Windows, macOS y Overleaf, mientras que TGZ puede resultar más conveniente en GNU/Linux. El archivo `RELEASE.txt` identifica la versión publicada de la plantilla.

Si quieres examinar el resultado antes de descargar la plantilla, empieza por `TFG-GIEC-spanish.pdf`. Utiliza la estructura y el aspecto predeterminados, y sus primeros capítulos constituyen el manual de usuario completo.

Los PDF restantes son ejemplos seleccionados deliberadamente, en lugar de un documento generado para cada titulación compatible. En conjunto muestran los dos idiomas, las estructuras de documento compatibles, los estilos tipográficos alternativos, las dos políticas de fuentes para las páginas institucionales, la compatibilidad con la URJC y los distintos diseños de portada de MUIE, MUCTE y MUC. La ausencia de un PDF específico para una titulación no significa que esta no sea compatible; consulta `Config/myconfig.tex` y el manual para ver la lista completa de identificadores.

# Archivos de la plantilla e información de la versión

- `03-PhDTFMTFG-LaTeX-Template-UAH-<release>.zip`: plantilla de usuario completa en formato ZIP.
- `03-PhDTFMTFG-LaTeX-Template-UAH-<release>.tgz`: la misma plantilla en formato TAR comprimido.
- `RELEASE.txt`: identificador exacto de la versión utilizado para crear los archivos y los ejemplos.
- `00-README.pdf`: introducción al proyecto e información de inicio rápido en formato PDF.
- `01-DOWNLOAD-GUIDE.pdf`: esta guía, proporcionada en un formato que puede abrirse directamente desde Dropbox.
- `02-TYPESETTING-STYLES.pdf`: comparación visual bilingüe de todos los estilos tipográficos disponibles, utilizando las mismas páginas representativas para cada uno.

Cada archivo ZIP o TGZ también contiene `TYPESETTING-STYLES-GUIDE.pdf` en su directorio raíz. Ese documento es la guía completa de uso y referencia para configurar los estilos tipográficos preliminares; es distinto del archivo de comparación visual `02-TYPESETTING-STYLES.pdf` que se proporciona junto a los archivos comprimidos.

Después de descargar un archivo, extráelo o súbelo, compila `Book/book.tex` una vez sin modificarlo y utiliza el manual resultante para comprobar tu instalación y aprender el flujo de trabajo habitual.

# Documentos de ejemplo completos

- **`TFG-GIEC-spanish.pdf`**: trabajo fin de grado del GIEC en la UAH. Español; estructura de contenido estándar; estilo tipográfico `standard`; fuentes de página `institutional`.
- **`TFG-ITIURJC-english-editorial-document-fonts.pdf`**: trabajo fin de grado de ITI en la URJC. Inglés; estructura de contenido estándar; estilo tipográfico `editorial`; fuentes de página `document`.
- **`TFM-MUIE-spanish-modern-institutional-fonts.pdf`**: trabajo fin de máster del MUIE en la UAH. Español; estructura de contenido estándar; estilo tipográfico `modern`; fuentes de página `institutional`.
- **`TFM-MUCTE-english-framed-document-fonts.pdf`**: trabajo fin de máster del MUCTE en la UAH. Inglés; estructura de contenido estándar; estilo tipográfico `framed`; fuentes de página `document`.
- **`TFM-MUC-spanish-shaded-institutional-fonts.pdf`**: trabajo fin de máster del MUC en la UAH. Español; estructura de contenido estándar; estilo tipográfico `shaded`; fuentes de página `institutional`.
- **`PhD-PHDUAH-english-conventional-mimosis-document-fonts.pdf`**: tesis doctoral convencional de la UAH. Inglés; estructura de contenido estándar; estilo tipográfico `mimosis`; fuentes de página `document`.
- **`PhD-PHDUAH-spanish-compendium-standard-institutional-fonts.pdf`**: tesis doctoral de la UAH por compendio de publicaciones. Español; estructura de compendio; estilo tipográfico `standard`; fuentes de página `institutional`.

Los cinco estilos tipográficos alternativos aparecen exactamente una vez. El estilo predeterminado `standard` aparece en el ejemplo principal del GIEC y de nuevo en el ejemplo de compendio, para que pueda evaluarse la estructura especializada sin añadir otra variación visual.

# Cómo entender las variaciones

La estructura de contenido `standard` es adecuada para TFG, TFM y tesis doctorales convencionales. La estructura `compendium` es una alternativa especializada para tesis doctorales presentadas como compendio de publicaciones.

El estilo tipográfico controla las fuentes del documento, los encabezados de capítulos y secciones, el índice y las cabeceras de página. La política de fuentes `institutional` conserva las fuentes originales en las páginas institucionales, como la portada y la contraportada, mientras que `document` permite que esas páginas hereden las fuentes seleccionadas para el documento. Ninguna de las dos opciones modifica los logotipos institucionales, los textos ni la maquetación de las páginas.

Abre `02-TYPESETTING-STYLES.pdf` para comparar directamente los estilos sin tener que ir cambiando entre los documentos de ejemplo completos. Para cada estilo registrado repite el mismo índice, inicio de capítulo, página ordinaria con ecuaciones y título de capítulo largo. El nombre del estilo activo aparece en la esquina superior derecha de cada página de muestra.

Cada ejemplo es un documento completo, por lo que puedes examinar las portadas, las páginas preliminares, los capítulos del manual, la bibliografía, los apéndices y la contraportada. Estos PDF son demostraciones, no normativas específicas de cada titulación; comprueba siempre los requisitos vigentes de tu institución antes de entregar tu trabajo.

# Elegir un ejemplo

- Empieza por `TFG-GIEC-spanish.pdf` si quieres entender el flujo de trabajo habitual o simplemente comprobar el aspecto predeterminado.
- Utiliza el ejemplo ITIURJC si trabajas en la URJC o quieres ver cómo cambia el soporte institucional sin modificar el flujo de trabajo del documento.
- Compara los ejemplos de MUIE, MUCTE y MUC cuando necesites examinar sus distintas secuencias de portadas de máster.
- Utiliza el ejemplo convencional PHDUAH para una tesis doctoral ordinaria y el ejemplo de compendio únicamente cuando tu tesis se presente formalmente como compendio de publicaciones.

Los estilos visuales se distribuyen entre estos documentos para evitar publicar todas las combinaciones posibles. Cualquier documento compatible puede seleccionar cualquier estilo disponible y cualquiera de las dos políticas de fuentes para páginas institucionales mediante `Config/myconfig.tex`; las combinaciones de esta carpeta son ejemplos, no restricciones.

# Mantener juntos los archivos

Mantén juntos `RELEASE.txt`, los PDF de ejemplo seleccionados y los archivos ZIP/TGZ de una misma publicación. Si sus identificadores de versión o fechas de publicación difieren, vuelve a descargar el conjunto actual antes de utilizar un ejemplo para evaluar la plantilla.

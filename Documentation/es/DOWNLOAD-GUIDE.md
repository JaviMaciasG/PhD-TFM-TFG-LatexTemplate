---
title: "Guía de descarga de la plantilla LaTeX para PhD-TFM-TFG"
author: "Javier Macías-Guarasa"
---

# ¿Qué debo descargar?

Si quieres empezar un documento nuevo, descarga el archivo [ZIP][zip] o [TGZ][tgz] actual. Ambos archivos contienen la misma plantilla. ZIP suele ser la opción más cómoda para Windows, macOS y `Overleaf`, mientras que TGZ puede resultar más conveniente en GNU/Linux. El archivo [`RELEASE.txt`][release] identifica la versión publicada de la plantilla.

Si quieres examinar el resultado antes de descargar la plantilla, empieza por [`TFG-GIEC-spanish.pdf`][manual]. Utiliza la estructura y el aspecto predeterminados, y sus primeros capítulos constituyen el manual de usuario completo.

Los PDF restantes son ejemplos seleccionados deliberadamente, en lugar de un documento generado para cada titulación compatible. En conjunto muestran los dos idiomas, las estructuras de documento compatibles, los estilos tipográficos alternativos, la compatibilidad con la URJC y la ETSIT-UPM y los distintos diseños de portada de MUIE, MUCTE y MUC. La ausencia de un PDF específico para una titulación no significa que esta no sea compatible; consulta `Config/myconfig.tex` y el manual para ver la lista completa de identificadores.

# Archivos de la plantilla e información de la versión

- [`03-PhDTFMTFG-LaTeX-Template.zip`][zip]: plantilla de usuario completa en formato ZIP.
- [`03-PhDTFMTFG-LaTeX-Template.tgz`][tgz]: la misma plantilla en formato TAR comprimido.
- [`RELEASE.txt`][release]: identificador exacto de la versión utilizado para crear los archivos y los ejemplos. Ambos archivos comprimidos incluyen también una copia de este fichero.
- [`00-README.pdf`][readme-pdf]: introducción al proyecto e información de inicio rápido en formato PDF.
- `01-DOWNLOAD-GUIDE.pdf`: esta guía, proporcionada en un formato que puede abrirse directamente desde Dropbox.
- [`02-TYPESETTING-STYLES-COMPARISON.pdf`][style-comparison]: comparación visual bilingüe de todos los estilos tipográficos disponibles, utilizando las mismas páginas representativas para cada uno.

Cada archivo ZIP o TGZ también contiene `04-TYPESETTING-STYLES-GUIDE.pdf` en su directorio raíz. Ese documento es la guía completa de uso y referencia para configurar los estilos tipográficos; es distinto del archivo de comparación visual [`02-TYPESETTING-STYLES-COMPARISON.pdf`][style-comparison] que se proporciona junto a los archivos comprimidos.

Después de descargar un archivo, extráelo o súbelo, compila `Book/book.tex` una vez sin modificarlo y utiliza el manual resultante para comprobar tu instalación y aprender el flujo de trabajo habitual.

# Documentos de ejemplo completos

- **[`TFG-GIEC-spanish.pdf`][manual]**: trabajo fin de grado del GIEC en la UAH. Español; estructura de contenido estándar; estilo tipográfico `standard`.
- **[`TFM-MUIE-spanish-modern.pdf`][muie]**: trabajo fin de máster del MUIE en la UAH. Español; estructura de contenido estándar; estilo tipográfico `modern`. Utiliza el mismo modelo de portada y contraportada que MUIT y MUII.
- **[`TFM-MUCTE-english-framed.pdf`][mucte]**: trabajo fin de máster del MUCTE en la UAH. Inglés; estructura de contenido estándar; estilo tipográfico `framed`.
- **[`TFM-MUC-spanish-shaded.pdf`][muc]**: trabajo fin de máster del MUC en la UAH. Español; estructura de contenido estándar; estilo tipográfico `shaded`.
- **[`PhD-PHDUAH-english-conventional-mimosis.pdf`][mimosis]**: tesis doctoral convencional de la UAH. Inglés; estructura de contenido estándar; estilo tipográfico `mimosis`.
- **[`PhD-PHDUAH-spanish-conventional-chapterbib-editorial.pdf`][chapter-bib]**: tesis doctoral convencional de la UAH. Español; estructura de contenido estándar; estilo tipográfico `editorial`. Incluye bibliografías por capítulo con numeración local y una bibliografía general con numeración independiente.
- **[`PhD-PHDUAH-spanish-compendium-standard.pdf`][compendium]**: tesis doctoral de la UAH por compendio de publicaciones. Español; estructura de compendio; estilo tipográfico `standard`.
- **[`TFG-GISTS-ETSIT-UPM-spanish.pdf`][upm]**: trabajo fin de grado del GISTS en la ETSIT-UPM. Español; estructura de contenido estándar; estilo tipográfico `standard`. Muestra la portada y la contraportada naranjas, la hoja de datos y tribunal sin títulos resaltados y el apéndice de aspectos éticos.
- **[`TFG-GII-ETSII-URJC-english-editorial.pdf`][urjc]**: trabajo fin de grado de Ingeniería Informática en la ETSII-URJC. Inglés; estructura de contenido estándar; estilo tipográfico `editorial`.

Los cinco estilos tipográficos alternativos están representados. El estilo `editorial` aparece en el ejemplo de la URJC y en la tesis con bibliografías por capítulo. El estilo predeterminado `standard` aparece en el ejemplo principal del GIEC, en el de GISTS-ETSIT-UPM y en el de compendio, para que puedan evaluarse las diferencias institucionales y de estructura sin añadir otra variación visual.

# Cómo entender las variaciones

La estructura de contenido `standard` es adecuada para TFG, TFM y tesis doctorales convencionales. La estructura `compendium` es una alternativa especializada para tesis doctorales presentadas como compendio de publicaciones.

El estilo tipográfico controla las fuentes del documento, los encabezados de capítulos y secciones, el índice y las cabeceras de página. Por defecto, las portadas conservan sus fuentes institucionales sin que tengas que configurar nada más.

Abre [`02-TYPESETTING-STYLES-COMPARISON.pdf`][style-comparison] para comparar directamente los estilos sin tener que ir cambiando entre los documentos de ejemplo completos. Para cada estilo registrado repite el mismo índice, inicio de capítulo, página ordinaria con ecuaciones y título de capítulo largo. El nombre del estilo activo aparece en la esquina superior derecha de cada página de muestra.

Cada ejemplo es un documento completo, por lo que puedes examinar las portadas, las páginas preliminares, los capítulos del manual, la bibliografía, los apéndices y la contraportada. Estos PDF son demostraciones, no normativas específicas de cada titulación; comprueba siempre los requisitos vigentes de tu institución antes de entregar tu trabajo.

# Elegir un ejemplo

- Empieza por [`TFG-GIEC-spanish.pdf`][manual] si quieres entender el flujo de trabajo habitual o simplemente comprobar el aspecto predeterminado.
- Compara los ejemplos de [MUIE][muie], [MUCTE][mucte] y [MUC][muc] cuando necesites examinar sus distintas secuencias de portadas de máster.
- Utiliza el [ejemplo convencional PHDUAH][mimosis] para una tesis doctoral ordinaria y el [ejemplo de compendio][compendium] únicamente cuando tu tesis se presente formalmente como compendio de publicaciones.
- Abre [`PhD-PHDUAH-spanish-conventional-chapterbib-editorial.pdf`][chapter-bib] para ver las bibliografías al final de cada capítulo y compararlas con la bibliografía general. Las citas enlazan con las entradas del capítulo correspondiente.
- Utiliza el [ejemplo GISTS-ETSIT-UPM][upm] para examinar las páginas iniciales compartidas por GISTS, GIB y varios másteres compatibles de la ETSIT-UPM, junto con el apéndice de aspectos éticos.
- Utiliza el [ejemplo GII-ETSII-URJC][urjc] si trabajas en la URJC o quieres ver cómo cambia el soporte institucional sin modificar el flujo de trabajo del documento.

Los estilos visuales se distribuyen entre estos documentos para evitar publicar todas las combinaciones posibles. Cualquier documento compatible puede seleccionar cualquier estilo disponible mediante `Config/myconfig.tex`; las combinaciones de esta carpeta son ejemplos, no restricciones.

# Mantener juntos los archivos

Mantén juntos [`RELEASE.txt`][release], los PDF de ejemplo seleccionados y los archivos ZIP/TGZ de una misma publicación. Si sus identificadores de versión o fechas de publicación difieren, vuelve a descargar el conjunto actual antes de utilizar un ejemplo para evaluar la plantilla.

[readme-pdf]: https://www.dropbox.com/scl/fi/5714ppe99u81fk73kxdux/00-README.pdf?rlkey=bpf6175bpdlbk5phrwemjqd5e&raw=1
[style-comparison]: https://www.dropbox.com/scl/fi/kl9geyh49na52yq1oy5hp/02-TYPESETTING-STYLES-COMPARISON.pdf?rlkey=ztygupln7j1fjhjsz1mlz4ky7&raw=1
[tgz]: https://www.dropbox.com/scl/fi/1wjkpc4rkqadw3v0va81q/03-PhDTFMTFG-LaTeX-Template.tgz?rlkey=83j0c0hucbvryz6yf9p6xik3v&dl=1
[zip]: https://www.dropbox.com/scl/fi/tgaa8elj9sq3qbssptuys/03-PhDTFMTFG-LaTeX-Template.zip?rlkey=t01rv4tizsfw96vy0dcp902z0&dl=1
[mimosis]: https://www.dropbox.com/scl/fi/ihbrvgylikc9pvaylvmz7/PhD-PHDUAH-english-conventional-mimosis.pdf?rlkey=26zobzpky4sb0ln151xuhd2go&raw=1
[compendium]: https://www.dropbox.com/scl/fi/ti7p716humo5vx5lvl7oc/PhD-PHDUAH-spanish-compendium-standard.pdf?rlkey=ujuogq5bluvsnthw3xeh0ohk9&raw=1
[chapter-bib]: https://www.dropbox.com/scl/fi/j2ms7n2swy15xm3tr05qk/PhD-PHDUAH-spanish-conventional-chapterbib-editorial.pdf?rlkey=m920ztnekvst9734eitwi7pt5&raw=1
[release]: https://www.dropbox.com/scl/fi/2ivatwrcka30uiuzfr3ru/RELEASE.txt?rlkey=mu865s6qbkmchgie0nt3cl7mw&raw=1
[manual]: https://www.dropbox.com/scl/fi/wwzbaow0g4cgs7euxvwxy/TFG-GIEC-spanish.pdf?rlkey=2x54yp52avfad67a2fdl3esmv&raw=1
[urjc]: https://www.dropbox.com/scl/fi/j4t8ksau8lu6q1xxeqkdm/TFG-GII-ETSII-URJC-english-editorial.pdf?rlkey=qidobibfvmfxpttfteui11hne&raw=1
[upm]: https://www.dropbox.com/scl/fi/1gaz7irrpq1t38c6zfk9g/TFG-GISTS-ETSIT-UPM-spanish.pdf?rlkey=siunebokaz6wk7l939jax9qkl&raw=1
[muc]: https://www.dropbox.com/scl/fi/49to5rssvhs2fcaq5ot96/TFM-MUC-spanish-shaded.pdf?rlkey=c5izlrq0xcvhhu7nl8pkm69vp&raw=1
[mucte]: https://www.dropbox.com/scl/fi/r1pa6kwfkups9trnhye20/TFM-MUCTE-english-framed.pdf?rlkey=wcsnika0d1bmrnb87btcgbhkf&raw=1
[muie]: https://www.dropbox.com/scl/fi/nlwtxw96qp4hq6oe8reyf/TFM-MUIE-spanish-modern.pdf?rlkey=2en4ej47zfetwx6x848ffnr2d&raw=1

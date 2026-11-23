---
layout: default
title: Plantilla LaTeX para TFG, TFM y tesis doctorales
lang: es
examples: true
cover:
  image: /assets/portada-giec.jpg
  width: 538
  height: 760
  alt: Cubierta azul y blanca de un TFG de Ingeniería Electrónica de Comunicaciones de la Universidad de Alcalá.
  caption: Portada de ejemplo (TFG, GIEC)
footer_links:
  - label: Todos los archivos en Dropbox
    download: folder_url
    only_with_direct_zip: true
  - label: Leer el README completo (español)
    url: https://github.com/JaviMaciasG/PhD-TFM-TFG-LatexTemplate/blob/master/README.md
  - label: README in English
    url: https://github.com/JaviMaciasG/PhD-TFM-TFG-LatexTemplate/blob/master/README-en.md
    lang: en
---

# Plantilla LaTeX para TFG, TFM y tesis doctorales

Tú pones el contenido. La plantilla se encarga de la portada, los índices y la bibliografía. Está pensada sobre todo para la Universidad de Alcalá y también admite algunas titulaciones de otras universidades.

{% assign downloads = site.data.downloads %}
{% if downloads.zip_url and downloads.zip_url != "TODO" %}
[Descargar la plantilla (ZIP)]({{ downloads.zip_url }}){:.download-button}
{% else %}
[Descarga la plantilla en Dropbox]({{ downloads.folder_url }}){:.download-button}

Elige `03-PhDTFMTFG-LaTeX-Template.zip`.
{: .download-note}
{% endif %}

Para compilar, necesitas LaTeX en tu equipo o una cuenta de Overleaf. La guía te explica ambas opciones.
{: .download-note}

- [Primeros pasos](https://github.com/JaviMaciasG/PhD-TFM-TFG-LatexTemplate#empieza-aqu%C3%AD-la-versi%C3%B3n-corta)
- [Ver un TFG de ejemplo (PDF)]({{ downloads.manual_url }})
{: .next-links}

## ¿Es para mí?

Puedes usar la plantilla para un TFG, un TFM o una tesis doctoral, también por compendio de publicaciones, y escribir en español o en inglés. Si no sabes si tu titulación está incluida, consulta el apéndice *Titulaciones soportadas* del [manual]({{ downloads.manual_url }}).

## ¿Qué encontrarás al descargarla?

Si compilas el ejemplo tal como viene, obtendrás el manual y verás cómo queda un trabajo completo. Cuando quieras empezar a escribir, puedes sustituir los ejemplos por una estructura mínima con capítulos casi vacíos.

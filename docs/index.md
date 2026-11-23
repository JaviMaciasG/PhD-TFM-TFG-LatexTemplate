---
layout: default
title: Plantilla LaTeX para TFG, TFM y tesis doctorales
---

# Plantilla LaTeX para TFG, TFM y tesis doctorales

Tú pones el contenido. La plantilla se ocupa de las portadas, los márgenes y la numeración.

{% assign downloads = site.data.downloads %}
{% if downloads.zip_url and downloads.zip_url != "TODO" %}
- **[Descarga la plantilla (ZIP)]({{ downloads.zip_url }})** para empezar tu propio documento.
{% else %}
- **[Descarga la plantilla en Dropbox]({{ downloads.folder_url }})**. Elige `03-PhDTFMTFG-LaTeX-Template.zip`.
{% endif %}
- **[Empieza aquí](https://github.com/JaviMaciasG/PhD-TFM-TFG-LatexTemplate#empieza-aqu%C3%AD-la-versi%C3%B3n-corta)** si quieres una guía paso a paso.
- **[Ver el manual (PDF)]({{ downloads.manual_url }})** para ver un ejemplo completo generado con la plantilla.

{% if downloads.zip_url and downloads.zip_url != "TODO" %}
[Todos los archivos en Dropbox]({{ downloads.folder_url }}) ·
{% endif %}
[README in English](https://github.com/JaviMaciasG/PhD-TFM-TFG-LatexTemplate/blob/master/README-en.md)

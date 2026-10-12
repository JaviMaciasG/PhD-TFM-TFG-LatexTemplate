# Degree registry compatibility baseline

This document combines the current degree and layout-profile tables from Config/degrees.tex and Config/layout-profiles.tex with the historical audit of the initial migration. Update the current tables whenever the registries change; historical sections retain the behaviour compared during that migration.

## Non-UAH identifier convention

Non-UAH degree identifiers use `<degree>-<university>`, for example `ITI-URJC`, `GIB-UPM` and `MUIT-UPM`. School-specific identifiers can add the school acronym, as in `PHD-ETSIT-UPM`. Generated PDF filenames use these same identifiers.

## Migration rules

- Preserve the current degree names, work-type text and layout selection unless this document explicitly records an approved change.
- Use one canonical work type for both TeX and distribution filenames.
- Select covers and back pages through a single combined layout profile, never by overloading the work-type value.
- Keep the current `\myWorkTypeFull` language behaviour during the registry migration. Correcting untranslated English values is deferred to a later change.
- Define `\myDegreefullwrapped` and `\myDegreefullwrappedUpcase` for every degree. When no specialised wrapped form exists, derive them from `\myDegreefull`.
- Treat `GSI` and the pre-Bologna degrees as supported legacy identifiers.

## Approved differences during the initial migration (historical)

| Subject | Pre-migration behaviour | Approved registry behaviour |
|---|---|---|
| `GSI` | Mentioned as an available value in `myconfig.tex`, but absent from the active TeX conditionals, `worktypes.txt` and the effective PDF-generation list. | Supported legacy TFG with the Spanish name `Grado en Sistemas de Información`, the English name `Degree in Information Systems`, and the same work-type and layout definitions as `GISI`. |
| `PHDUAH` work type | TeX uses `PHDUAH`; distribution filenames use `PhD`. | Both use the canonical work type `PhD`; the `uah-phd` profile selects its cover. |
| `PHDUPM` work type | TeX uses `PHDUPM`; distribution filenames use `PhD`. | Both use the canonical work type `PhD`; the `upm-phd` profile selects its covers. |
| `GEINTRARR` work type | TeX uses `GEINTRARR`; distribution filenames use `RR`. | Both use the canonical work type `RR`; the `geintra-report` profile selects its cover. |
| `GMC` work-type text | `Trabajo de Fin de Carrera` in both language branches. | `Trabajo de Fin de Grado` in both language branches. |
| Wrapped degree names | Defined only for `MUSEA`, `MUIT`, `MUII`, `MUIE`, `MUCTE`, `GMC`, `MUC` and `MUANBD`. | Defined for every degree, falling back to the ordinary name and its uppercase form when no special wrapping is required. |
| English work-type text | Most TFC, TFG and TFM entries retain Spanish text; only PhD, RR and `MUANBD` currently provide English text. | Preserve this behaviour during migration. Complete English translations are explicitly deferred. |

## Current degree matrix

The table follows the order of Config/degrees.tex. Work type is the canonical value used by TeX and filenames. The degree-name column shows the base Spanish name; English variants and wrapped forms are declared separately where provided.

| Identifier | Status | Degree name (`\myDegreefull`) | Work type | `\myWorkTypeFull` Spanish / English | Layout profile |
|---|---|---|---|---|---|
| `IT` | Legacy | Ingeniería de Telecomunicación | `TFC` | Trabajo Fin de Carrera / Trabajo Fin de Carrera | `uah-tfc` |
| `IE` | Legacy | Ingeniería Electrónica | `TFC` | Trabajo Fin de Carrera / Trabajo Fin de Carrera | `uah-tfc` |
| `ITTSE` | Legacy | Ingeniería Técnica de Telecomunicación, especialidad en Sistemas Electrónicos | `TFC` | Trabajo Fin de Carrera / Trabajo Fin de Carrera | `uah-tfc` |
| `ITTST` | Legacy | Ingeniería Técnica de Telecomunicación, especialidad en Sistemas de Telecomunicación | `TFC` | Trabajo Fin de Carrera / Trabajo Fin de Carrera | `uah-tfc` |
| `ITI` | Legacy | Ingeniería Técnica Industrial, especialidad en Electrónica Industrial | `TFC` | Trabajo Fin de Carrera / Trabajo Fin de Carrera | `uah-tfc` |
| `GITT` | Active | Grado en Ingeniería en Tecnologías de Telecomunicación | `TFG` | Trabajo de Fin de Grado / Trabajo de Fin de Grado | `uah-tfg-2024` |
| `GIEC` | Active | Grado en Ingeniería Electrónica de Comunicaciones | `TFG` | Trabajo de Fin de Grado / Trabajo de Fin de Grado | `uah-tfg-2024` |
| `GIT` | Active | Grado en Ingeniería Telemática | `TFG` | Trabajo de Fin de Grado / Trabajo de Fin de Grado | `uah-tfg-2024` |
| `GIST` | Active | Grado en Ingeniería en Sistemas de Telecomunicación | `TFG` | Trabajo de Fin de Grado / Trabajo de Fin de Grado | `uah-tfg-2024` |
| `GIC` | Active | Grado en Ingeniería de Computadores | `TFG` | Trabajo de Fin de Grado / Trabajo de Fin de Grado | `uah-tfg-2024` |
| `GII` | Active | Grado en Ingeniería Informática | `TFG` | Trabajo de Fin de Grado / Trabajo de Fin de Grado | `uah-tfg-2024` |
| `GMC` | Active | Grado en Matemáticas y Computación | `TFG` | Trabajo de Fin de Grado / Trabajo de Fin de Grado | `uah-tfg-2024` |
| `GIS` | Active | Grado en Sistemas de Información | `TFG` | Trabajo de Fin de Grado / Trabajo de Fin de Grado | `uah-tfg-2024` |
| `GSI` | Legacy | Grado en Sistemas de Información | `TFG` | Trabajo de Fin de Grado / Trabajo de Fin de Grado | `uah-tfg-2024` |
| `GISI` | Active | Grado en Ingeniería en Sistemas de Información | `TFG` | Trabajo de Fin de Grado / Trabajo de Fin de Grado | `uah-tfg-2024` |
| `GIEAI` | Active | Grado en Ingeniería en Electrónica y Automática Industrial | `TFG` | Trabajo de Fin de Grado / Trabajo de Fin de Grado | `uah-tfg-2024` |
| `GITI` | Active | Grado en Ingeniería en Tecnologías Industriales | `TFG` | Trabajo de Fin de Grado / Trabajo de Fin de Grado | `uah-tfg-2024` |
| `GFIE` | Active | Grado en Física e Instrumentación Espacial | `TFG` | Trabajo de Fin de Grado / Trabajo de Fin de Grado | `uah-tfg-2024` |
| `GBS` | Active | Grado en Biología Sanitaria | `TFG` | Trabajo de Fin de Grado / Trabajo de Fin de Grado | `uah-tfg-2024` |
| `GB` | Active | Grado en Biología | `TFG` | Trabajo de Fin de Grado / Trabajo de Fin de Grado | `uah-tfg-2024` |
| `GQ` | Active | Grado en Química | `TFG` | Trabajo de Fin de Grado / Trabajo de Fin de Grado | `uah-tfg-2024` |
| `GCA` | Active | Grado en Ciencias Ambientales | `TFG` | Trabajo de Fin de Grado / Trabajo de Fin de Grado | `uah-tfg-2024` |
| `GCCTF` | Active | Grado en Criminalística: Ciencias y Tecnologías Forenses | `TFG` | Trabajo de Fin de Grado / Trabajo de Fin de Grado | `uah-tfg-2024` |
| `ITI-URJC` | Active | Grado en Ingeniería en Tecnologías Industriales | `TFG` | Trabajo Fin de Grado / Bachelor's Thesis | `urjc-iti-tfg` |
| `GISTS-UPM` | Active | Grado en Ingeniería de Tecnologías y Servicios de Telecomunicación | `TFG` | Trabajo Fin de Grado / Trabajo Fin de Grado | `upm-etsit-tft` |
| `GIB-UPM` | Active | Grado en Ingeniería Biomédica | `TFG` | Trabajo Fin de Grado / Trabajo Fin de Grado | `upm-etsit-tft` |
| `GISD-UPM` | Active | Grado en Ingeniería y Sistemas de Datos | `TFG` | Trabajo Fin de Grado / Trabajo Fin de Grado | `upm-etsit-gisd-tfg` |
| `MUSEA` | Active | Máster Universitario en Sistemas Electrónicos Avanzados. Sistemas Inteligentes | `TFM` | Trabajo Fin de Máster / Trabajo Fin de Máster | `uah-tfm-eps` |
| `MUIT` | Active | Máster Universitario en Ingeniería de Telecomunicación | `TFM` | Trabajo Fin de Máster / Trabajo Fin de Máster | `uah-tfm-eps` |
| `MUII` | Active | Máster Universitario en Ingeniería Industrial | `TFM` | Trabajo Fin de Máster / Trabajo Fin de Máster | `uah-tfm-eps` |
| `MUIE` | Active | Máster Universitario en Ingeniería Electrónica | `TFM` | Trabajo Fin de Máster / Trabajo Fin de Máster | `uah-muie` |
| `MUCTE` | Active | Máster Universitario en Ciencia y Tecnología desde el Espacio | `TFM` | Trabajo Fin de Máster / Trabajo Fin de Máster | `uah-mucte` |
| `MUANBD` | Active | Máster Universitario en Analítica de Negocio y Big Data | `TFM` | Trabajo Fin de Máster / Master's Thesis | `uah-muanbd` |
| `MUC` | Active | Máster Universitario en Ciberseguridad | `TFM` | Trabajo Fin de Máster / Trabajo Fin de Máster | `uah-muc-2026` |
| `MUIT-UPM` | Active | Máster Universitario en Ingeniería de Telecomunicación | `TFM` | Trabajo Fin de Máster / Trabajo Fin de Máster | `upm-etsit-tft` |
| `MUCS-UPM` | Active | Máster Universitario en Ciberseguridad | `TFM` | Trabajo Fin de Máster / Trabajo Fin de Máster | `upm-etsit-tft` |
| `MUESFV-UPM` | Active | Máster Universitario en Energía Solar Fotovoltaica | `TFM` | Trabajo Fin de Máster / Trabajo Fin de Máster | `upm-etsit-tft` |
| `MUIB-UPM` | Active | Máster Universitario en Ingeniería Biomédica | `TFM` | Trabajo Fin de Máster / Trabajo Fin de Máster | `upm-etsit-tft` |
| `MUIRST-UPM` | Active | Máster Universitario en Ingeniería de Redes y Servicios Telemáticos | `TFM` | Trabajo Fin de Máster / Trabajo Fin de Máster | `upm-etsit-tft` |
| `MUISE-UPM` | Active | Máster Universitario en Ingeniería de Sistemas Electrónicos | `TFM` | Trabajo Fin de Máster / Trabajo Fin de Máster | `upm-etsit-tft` |
| `MUTSC-UPM` | Active | Máster Universitario en Teoría de la Señal y Comunicaciones | `TFM` | Trabajo Fin de Máster / Trabajo Fin de Máster | `upm-etsit-tft` |
| `MUNE-UPM` | Active | Máster Universitario en Neurotecnología | `TFM` | Trabajo Fin de Máster / Master's Thesis | `upm-etsit-mune-tfm` |
| `PHDUAH` | Active | Estudios de Doctorado | `PhD` | Tesis Doctoral / Doctoral Thesis | `uah-phd` |
| `PHD-ETSIT-UPM` | Active | Doctor Ingeniero de Telecomunicación | `PhD` | Tesis Doctoral / Doctoral Thesis | `upm-phd` |
| `GEINTRARR` | Experimental | GEINTRA Research Report | `RR` | Informe técnico del Grupo de investigación \myResearchGroup{} / \myResearchGroup{} Research Report | `geintra-report` |

## Current layout profile definitions

The table reproduces the entries in Config/layout-profiles.tex. Files are included once in the declared order; each file handles its own page boundaries.

| Profile | Cover input sequence | Back-page input |
|---|---|---|
| `uah-tfc` | `cover/uah/portada-pfc-uah.tex`, then `cover/uah/cover-pfc-tfg-tfm-uah.tex` | None |
| `uah-tfg-2024` | `cover/uah/portada-tfg-uah-2024.tex`, then `cover/uah/cover-pfc-tfg-tfm-uah.tex` | `cover/uah/backpage-tfg-uah-2024.tex` |
| `urjc-iti-tfg` | `cover/urjc/portada-tfg-urjc.tex`, then `cover/urjc/cover-pfc-tfg-tfm-urjc.tex` | `cover/urjc/backpage-tfg-urjc.tex` |
| `uah-tfm-eps` | `cover/uah/portada-tfm-normativa-eps.tex`, then `cover/uah/cover-pfc-tfg-tfm-uah.tex` | `cover/uah/backpage-tfm-normativa-uah.tex` |
| `uah-muie` | `cover/uah/portada-tfg-uah.tex`, then `cover/uah/cover-pfc-tfg-tfm-uah.tex` | `cover/uah/backpage-tfg-uah.tex` |
| `uah-mucte` | `cover/uah/cover-tfm-mucte.tex`, then `cover/uah/cover-pfc-tfg-tfm-uah.tex` | `cover/uah/backpage-tfm-normativa-uah.tex` |
| `uah-muanbd` | `cover/uah/portada-tfm-normativa-uah.tex`, then `cover/uah/cover-pfc-tfg-tfm-uah.tex` | `cover/uah/backpage-tfm-normativa-uah.tex` |
| `uah-muc-2026` | `cover/uah/portada-tfm-ciberseguridad-uah-2026.tex`, then `cover/uah/cover-pfc-tfg-tfm-uah.tex` | `cover/uah/backpage-tfm-normativa-uah.tex` |
| `uah-phd` | `cover/uah/cover-phd-uah.tex` | None |
| `upm-etsit-tft` | `cover/upm/portada-tfg-etsit-upm.tex`, then `cover/upm/tribunal-tfg-etsit-upm.tex`, then `cover/upm/cover-tfg-etsit-upm.tex` | `cover/upm/backpage-etsit-upm.tex` |
| `upm-etsit-gisd-tfg` | `cover/upm/portada-tfg-etsit-upm.tex`, then `cover/upm/tribunal-tfg-gisd-upm.tex`, then `cover/upm/cover-tfg-etsit-upm.tex` | `cover/upm/backpage-etsit-upm.tex` |
| `upm-etsit-mune-tfm` | `cover/upm/cover-tfm-mune-etsit-upm.tex` | `cover/upm/backpage-etsit-upm.tex` |
| `upm-phd` | `cover/upm/portada-phd-upm.tex`, then `cover/upm/cover-phd-upm.tex`, then `cover/upm/credits-phd-upm.tex` | None |
| `geintra-report` | `cover/uah/portada-geintra-rr.tex` | None |

The `upm-etsit-mune-tfm` profile includes a wrapper: cover-tfm-mune-etsit-upm.tex selects language-dependent text and includes the outer cover, its specific committee sheet and the shared inner title page. The `upm-phd` profile uses phd-layout.tex helpers for the outer cover, inner title page and credits, without a back cover.

## Wrapped-name compatibility

The registry preserves specialised wrapped values for `MUSEA`, `MUIT`, `MUII`, `MUIE`, `MUCTE`, `GMC`, `MUC`, `MUANBD` and `GISTS-UPM`. For every other degree it must expose the following effective values:

```latex
\myDegreefullwrapped = \myDegreefull
\myDegreefullwrappedUpcase = \MakeUppercase{\myDegreefull}
```

## Initial migration audit (historical)

The inactive registry was checked against the legacy conditionals in `Config/postamble.tex`, the routing in `Book/cover/cover.tex` and `Book/cover/backpage.tex`, and the filename mappings in `Config/worktypes.txt`.

- All 26 identifiers implemented by the legacy UAH/UPM/GEINTRA TeX conditionals are represented in the registry.
- `GSI` is an intentional compatibility restoration, and `ITIURJC` is an imported URJC integration.
- Degree names and language-dependent full work-type names match the legacy definitions except for the approved `GMC` correction.
- Canonical work types match `Config/worktypes.txt`; the three intentional changes from the legacy TeX values are `PHDUAH` and `PHDUPM` to `PhD`, and `GEINTRARR` to `RR`.
- The eight specialised wrapped names match the legacy definitions, while the remaining degrees receive the approved fallback values.
- Every cover and back-page file referenced by the ten combined layout profiles exists, and each profile reproduces the current routing.

Activation added `GSI` to the effective generation set. Cover and back-page routing was switched to the combined profiles in the same change as the canonical PhD and research-report work types, avoiding any intermediate state in which the old routing would reject those values. The subsequent tooling migration removed `Config/worktypes.txt`; the Makefile and PDF generator now obtain identifiers and canonical work types directly from `Config/degrees.tex` through `Config/query-degree-registry.sh`.

## Deferred work

After the registry migration is complete and verified, review the English translations of `\myWorkTypeFull` and degree names as a separate change. This must not be folded into the compatibility migration because it would make output differences harder to diagnose.

# Base de compatibilidad del registro de titulaciones

Este documento recoge el comportamiento heredado dependiente de la titulación y el comportamiento aprobado del registro de titulaciones de referencia. Su finalidad es distinguir las correcciones deliberadas de los cambios accidentales y conservar la auditoría de la migración.

## Reglas de migración

- Conservar los nombres actuales de las titulaciones, el texto del tipo de trabajo y la selección de maquetación, salvo que este documento recoja explícitamente un cambio aprobado.
- Usar un único tipo de trabajo canónico tanto para TeX como para los nombres de los ficheros de distribución.
- Seleccionar las portadas y contraportadas mediante un único perfil de maquetación combinado, sin sobrecargar nunca el valor del tipo de trabajo.
- Mantener el comportamiento lingüístico actual de `\myWorkTypeFull` durante la migración del registro. La corrección de los valores en inglés que no están traducidos se pospone para un cambio posterior.
- Definir `\myDegreefullwrapped` y `\myDegreefullwrappedUpcase` para todas las titulaciones. Cuando no exista una forma especializada con saltos de línea, derivarlas de `\myDegreefull`.
- Tratar `GSI` y las titulaciones pre-Bolonia como identificadores heredados compatibles.

## Diferencias aprobadas respecto al comportamiento actual

| Elemento | Comportamiento actual | Comportamiento aprobado del registro |
|---|---|---|
| `GSI` | Se menciona como valor disponible en `myconfig.tex`, pero no aparece en los condicionales TeX activos, en `worktypes.txt` ni en la lista efectiva de generación de PDF. | TFG heredado compatible con el nombre en español `Grado en Sistemas de Información`, el nombre en inglés `Degree in Information Systems` y las mismas definiciones de tipo de trabajo y maquetación que `GISI`. |
| Tipo de trabajo de `PHDUAH` | TeX usa `PHDUAH`; los nombres de fichero de distribución usan `PhD`. | Ambos usan el tipo de trabajo canónico `PhD`; el perfil `uah-phd` selecciona su portada. |
| Tipo de trabajo de `PHDUPM` | TeX usa `PHDUPM`; los nombres de fichero de distribución usan `PhD`. | Ambos usan el tipo de trabajo canónico `PhD`; el perfil `upm-phd` selecciona sus portadas. |
| Tipo de trabajo de `GEINTRARR` | TeX usa `GEINTRARR`; los nombres de fichero de distribución usan `RR`. | Ambos usan el tipo de trabajo canónico `RR`; el perfil `geintra-report` selecciona su portada. |
| Texto del tipo de trabajo de `GMC` | `Trabajo de Fin de Carrera` en ambas ramas de idioma. | `Trabajo de Fin de Grado` en ambas ramas de idioma. |
| Nombres de titulación con saltos de línea | Definidos únicamente para `MUSEA`, `MUIT`, `MUII`, `MUIE`, `MUCTE`, `GMC`, `MUC` y `MUANBD`. | Definidos para todas las titulaciones, recurriendo al nombre ordinario y a su forma en mayúsculas cuando no se requiere un formato especial con saltos de línea. |
| Texto del tipo de trabajo en inglés | La mayoría de las entradas TFC, TFG y TFM conservan el texto en español; actualmente solo PhD, RR y `MUANBD` proporcionan texto en inglés. | Conservar este comportamiento durante la migración. Las traducciones completas al inglés se posponen explícitamente. |

## Matriz de titulaciones objetivo

La columna `Tipo de trabajo` contiene el valor canónico que se utilizará en TeX y en los nombres de fichero de distribución. Los nombres de las titulaciones siguen siendo independientes del idioma durante esta migración, salvo que el registro almacena el nombre en inglés solicitado para `GSI` para su uso futuro.

| Identificador | Estado | Nombre de la titulación (`\myDegreefull`) | Tipo de trabajo | `\myWorkTypeFull` español / inglés | Perfil de maquetación |
|---|---|---|---|---|---|
| `IT` | Heredado | Ingeniería de Telecomunicación | `TFC` | Trabajo Fin de Carrera / Trabajo Fin de Carrera | `uah-tfc` |
| `IE` | Heredado | Ingeniería Electrónica | `TFC` | Trabajo Fin de Carrera / Trabajo Fin de Carrera | `uah-tfc` |
| `ITTSE` | Heredado | Ingeniería Técnica de Telecomunicación, especialidad en Sistemas Electrónicos | `TFC` | Trabajo Fin de Carrera / Trabajo Fin de Carrera | `uah-tfc` |
| `ITTST` | Heredado | Ingeniería Técnica de Telecomunicación, especialidad en Sistemas de Telecomunicación | `TFC` | Trabajo Fin de Carrera / Trabajo Fin de Carrera | `uah-tfc` |
| `ITI` | Heredado | Ingeniería Técnica Industrial, especialidad en Electrónica Industrial | `TFC` | Trabajo Fin de Carrera / Trabajo Fin de Carrera | `uah-tfc` |
| `GITT` | Activo | Grado en Ingeniería en Tecnologías de Telecomunicación | `TFG` | Trabajo de Fin de Grado / Trabajo de Fin de Grado | `uah-tfg-2024` |
| `GIEC` | Activo | Grado en Ingeniería Electrónica de Comunicaciones | `TFG` | Trabajo de Fin de Grado / Trabajo de Fin de Grado | `uah-tfg-2024` |
| `GIT` | Activo | Grado en Ingeniería Telemática | `TFG` | Trabajo de Fin de Grado / Trabajo de Fin de Grado | `uah-tfg-2024` |
| `GIST` | Activo | Grado en Ingeniería en Sistemas de Telecomunicación | `TFG` | Trabajo de Fin de Grado / Trabajo de Fin de Grado | `uah-tfg-2024` |
| `GIC` | Activo | Grado en Ingeniería de Computadores | `TFG` | Trabajo de Fin de Grado / Trabajo de Fin de Grado | `uah-tfg-2024` |
| `GII` | Activo | Grado en Ingeniería Informática | `TFG` | Trabajo de Fin de Grado / Trabajo de Fin de Grado | `uah-tfg-2024` |
| `GMC` | Activo | Grado en Matemáticas y Computación | `TFG` | Trabajo de Fin de Grado / Trabajo de Fin de Grado | `uah-tfg-2024` |
| `GIS` | Activo | Grado en Sistemas de Información | `TFG` | Trabajo de Fin de Grado / Trabajo de Fin de Grado | `uah-tfg-2024` |
| `GSI` | Heredado | Grado en Sistemas de Información | `TFG` | Trabajo de Fin de Grado / Trabajo de Fin de Grado | `uah-tfg-2024` |
| `GISI` | Activo | Grado en Ingeniería en Sistemas de Información | `TFG` | Trabajo de Fin de Grado / Trabajo de Fin de Grado | `uah-tfg-2024` |
| `GIEAI` | Activo | Grado en Ingeniería en Electrónica y Automática Industrial | `TFG` | Trabajo de Fin de Grado / Trabajo de Fin de Grado | `uah-tfg-2024` |
| `GITI` | Activo | Grado en Ingeniería en Tecnologías Industriales | `TFG` | Trabajo de Fin de Grado / Trabajo de Fin de Grado | `uah-tfg-2024` |
| `ITIURJC` | Activo | Grado en Ingeniería en Tecnologías Industriales | `TFG` | Trabajo Fin de Grado / Bachelor's Thesis | `urjc-iti-tfg` |
| `MUSEA` | Activo | Máster Universitario en Sistemas Electrónicos Avanzados. Sistemas Inteligentes | `TFM` | Trabajo Fin de Máster / Trabajo Fin de Máster | `uah-tfm-eps` |
| `MUIT` | Activo | Máster Universitario en Ingeniería de Telecomunicación | `TFM` | Trabajo Fin de Máster / Trabajo Fin de Máster | `uah-tfm-eps` |
| `MUII` | Activo | Máster Universitario en Ingeniería Industrial | `TFM` | Trabajo Fin de Máster / Trabajo Fin de Máster | `uah-tfm-eps` |
| `MUIE` | Activo | Máster Universitario en Ingeniería Electrónica | `TFM` | Trabajo Fin de Máster / Trabajo Fin de Máster | `uah-muie` |
| `MUCTE` | Activo | Máster Universitario en Ciencia y Tecnología desde el Espacio | `TFM` | Trabajo Fin de Máster / Trabajo Fin de Máster | `uah-mucte` |
| `MUANBD` | Activo | Máster Universitario en Analítica de Negocio y Big Data | `TFM` | Trabajo Fin de Máster / Master's Thesis | `uah-muanbd` |
| `MUC` | Activo | Máster Universitario en Ciberseguridad | `TFM` | Trabajo Fin de Máster / Trabajo Fin de Máster | `uah-muc-2026` |
| `PHDUAH` | Activo | Estudios de Doctorado | `PhD` | Tesis Doctoral / Doctoral Thesis | `uah-phd` |
| `PHDUPM` | Activo | Doctor Ingeniero de Telecomunicación | `PhD` | Tesis Doctoral / Doctoral Thesis | `upm-phd` |
| `GEINTRARR` | Experimental | GEINTRA Research Report | `RR` | Informe técnico del Grupo de investigación `\myResearchGroup` / `\myResearchGroup` Research Report | `geintra-report` |

## Definiciones de los perfiles de maquetación

Estos nombres de perfil describen las secuencias de entrada activas seleccionadas por el registro.

| Perfil | Secuencia de entrada de portadas | Entrada de contraportada |
|---|---|---|
| `uah-tfc` | `cover/uah/portada-pfc-uah.tex`, después `cover/uah/cover-pfc-tfg-tfm-uah.tex` | Ninguna |
| `uah-tfg-2024` | `cover/uah/portada-tfg-uah-2024.tex`, después `cover/uah/cover-pfc-tfg-tfm-uah.tex` | `cover/uah/backpage-tfg-uah-2024.tex` |
| `urjc-iti-tfg` | `cover/urjc/portada-tfg-urjc.tex`, después `cover/urjc/cover-pfc-tfg-tfm-urjc.tex` | `cover/urjc/backpage-tfg-urjc.tex` |
| `uah-tfm-eps` | `cover/uah/portada-tfm-normativa-eps.tex`, después `cover/uah/cover-pfc-tfg-tfm-uah.tex` | `cover/uah/backpage-tfm-normativa-uah.tex` |
| `uah-muie` | `cover/uah/portada-tfg-uah.tex`, después `cover/uah/cover-pfc-tfg-tfm-uah.tex` | `cover/uah/backpage-tfg-uah.tex` |
| `uah-mucte` | `cover/uah/cover-tfm-mucte.tex`, después `cover/uah/cover-pfc-tfg-tfm-uah.tex` | `cover/uah/backpage-tfm-normativa-uah.tex` |
| `uah-muanbd` | `cover/uah/portada-tfm-normativa-uah.tex`, después `cover/uah/cover-pfc-tfg-tfm-uah.tex` | `cover/uah/backpage-tfm-normativa-uah.tex` |
| `uah-muc-2026` | `cover/uah/portada-tfm-ciberseguridad-uah-2026.tex`, después `cover/uah/cover-pfc-tfg-tfm-uah.tex` | `cover/uah/backpage-tfm-normativa-uah.tex` |
| `uah-phd` | `cover/uah/cover-phd-uah.tex` | Ninguna |
| `upm-phd` | `cover/upm/portada-phd-upm.tex`, después `cover/upm/cover-phd-upm.tex` | Ninguna |
| `geintra-report` | `cover/uah/portada-geintra-rr.tex` | Ninguna |

## Compatibilidad de los nombres con saltos de línea

El registro debe conservar los valores especializados con saltos de línea utilizados actualmente por `MUSEA`, `MUIT`, `MUII`, `MUIE`, `MUCTE`, `GMC`, `MUC` y `MUANBD`. Para cualquier otra titulación debe exponer los siguientes valores efectivos:

```latex
\myDegreefullwrapped = \myDegreefull
\myDegreefullwrappedUpcase = \MakeUppercase{\myDegreefull}
```

## Auditoría de compatibilidad

El registro inactivo se comprobó frente a los condicionales heredados de `Config/postamble.tex`, el encaminamiento de `Book/cover/cover.tex` y `Book/cover/backpage.tex`, y las correspondencias de nombres de fichero de `Config/worktypes.txt`.

- Los 26 identificadores implementados por los condicionales TeX heredados de UAH/UPM/GEINTRA están representados en el registro.
- `GSI` es una restauración intencionada de compatibilidad e `ITIURJC` es una integración importada de la URJC.
- Los nombres de las titulaciones y los nombres completos del tipo de trabajo dependientes del idioma coinciden con las definiciones heredadas, salvo la corrección aprobada de `GMC`.
- Los tipos de trabajo canónicos coinciden con `Config/worktypes.txt`; los tres cambios intencionados respecto a los valores TeX heredados son `PHDUAH` y `PHDUPM` a `PhD`, y `GEINTRARR` a `RR`.
- Los ocho nombres especializados con saltos de línea coinciden con las definiciones heredadas, mientras que las titulaciones restantes reciben los valores alternativos aprobados.
- Todos los ficheros de portada y contraportada referenciados por los diez perfiles de maquetación combinados existen, y cada perfil reproduce el encaminamiento actual.

La activación añadió `GSI` al conjunto efectivo de generación. El encaminamiento de portadas y contraportadas se cambió a los perfiles combinados en el mismo cambio que los tipos de trabajo canónicos de doctorado e informe de investigación, evitando cualquier estado intermedio en el que el encaminamiento anterior rechazase esos valores. La migración posterior de las herramientas eliminó `Config/worktypes.txt`; el Makefile y el generador de PDF obtienen ahora los identificadores y tipos de trabajo canónicos directamente de `Config/degrees.tex` mediante `Config/query-degree-registry.sh`.

## Trabajo pospuesto

Una vez completada y verificada la migración del registro, revise las traducciones al inglés de `\myWorkTypeFull` y de los nombres de las titulaciones como un cambio independiente. Esto no debe integrarse en la migración de compatibilidad, porque dificultaría el diagnóstico de las diferencias en la salida.

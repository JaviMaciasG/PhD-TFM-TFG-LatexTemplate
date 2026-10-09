# Manual del mantenedor

Este documento trata la generación de paquetes de publicación y la ampliación del registro institucional de titulaciones. Está dirigido a los mantenedores de la plantilla; los usuarios habituales deberían empezar por `README.md` o `README-en.md` y el manual compilado a partir de `Book/book.tex`.

## Proteger el checkout oficial de mantenimiento

Marque una vez cada checkout de mantenimiento de referencia con `git config template.officialRepository true`. Esta configuración local no se incluye en commits ni la heredan los usuarios; impide que el objetivo `make sync-git-sources`, orientado al usuario, modifique el índice Git del repositorio de la plantilla.

## Generar el registro de cambios

`Documentation/CHANGELOG.md` se genera en inglés a partir de las etiquetas Git. Instale `git-cliff` en el sistema de mantenimiento y ejecute `make -C Documentation changelog`; así se regenera todo el historial etiquetado hasta la versión indicada en `RELEASE.txt`. El fichero versionado `Documentation/cliff.toml` clasifica los prefijos de commit del repositorio y conserva los mensajes heredados no reconocidos bajo “Other Changes”. Las etiquetas que apuntan al mismo commit se agrupan en una sola sección. El resultado se genera automáticamente; ajuste la configuración en lugar de editar el changelog a mano. El objetivo habitual para generar los PDF no requiere `git-cliff`.

## Mantener las estructuras de los documentos y los conmutadores de contenido opcional

`Book/book.tex` es deliberadamente un punto de entrada estable. El cuerpo normal del documento está en `Book/content-standard.tex`; solo la modalidad especializada de doctorado por compendio utiliza `Book/content-compendium.tex`. Mantenga los preliminares comunes y la lógica de selección en `book.tex`, el orden normal de capítulos y apéndices propiedad del usuario en `content-standard.tex`, y las partes del compendio y las declaraciones de publicaciones en `content-compendium.tex`.

Cada estructura preparada se mantiene junto a los capítulos que organiza. Las plantillas estándar están en `Book/chapters/bare/` y `Book/chapters/orig/`; las plantillas especializadas están en `Book/chapters/compendium/bare/` y `Book/chapters/compendium/orig/`. Cada directorio contiene su fichero `content-*.tex` correspondiente, que el Makefile excluye explícitamente de la lista de copia de capítulos y copia por separado a la raíz de `Book/`. Siempre que cambie una organización distribuida, actualice tanto sus ficheros activos como sus copias canónicas `orig`. El Makefile debe copiar estos ficheros preparados; no debe volver a reescribir regiones marcadas dentro de `book.tex`.

Los objetivos `bare` y `orig` despachan según `\myDocumentStructure`; también están disponibles los objetivos explícitos `bare-standard`, `bare-compendium`, `orig-standard` y `orig-compendium`. Mantenga `bare-chapters` y `orig-chapters` como alias compatibles hacia atrás de la estructura estándar.

Las opciones booleanas orientadas al usuario de `Config/myconfig.tex` comparten el prefijo `\myInclude...` y aceptan exactamente `true` o `false`. `Config/postamble.tex` valida cada opción. Al añadir un conmutador, actualice su validación, la inclusión condicional correspondiente, el capítulo de configuración y su copia `orig` mantenida. Los conmutadores que controlan listas generadas no deberían deshabilitar la funcionalidad LaTeX subyacente.

El flujo de trabajo estándar debe seguir siendo el predominante en `README.md` y en el manual. Mencione brevemente la alternativa por compendio en el inicio rápido normal y dirija al pequeño conjunto de usuarios de doctorado afectados a la sección especializada de referencia, en lugar de presentar ambas estructuras como opciones equivalentes a lo largo de toda la documentación.

## Mantener los estilos de maquetación de Book

La capa visual preliminar exclusiva de Book está en `Config/typesetting/` y se selecciona mediante `\myTypesettingStyle` en `Config/myconfig.tex`. La política avanzada `\myInstitutionalPageFontMode` no aparece en la configuración ordinaria: su valor `institutional` se proporciona internamente en `Config/typesetting/typesetting.tex`, y `document` sigue disponible mediante una definición opcional explícita o los scripts de compilación. El auxiliar de prototipos conserva la compatibilidad con configuraciones antiguas y añade el ajuste solo a su copia temporal cuando falta. `standard` es un estilo de maquetación, no una política de fuentes institucionales. `Documentation/es/TYPESETTING-STYLES-GUIDE.md` es la referencia de uso e implementación, incluidos los ajustes avanzados, el registro de estilos, los renderizadores, la validación, los generadores de prototipos y comparaciones, y el aviso de licencia de Mimosis. Actualice conjuntamente esa guía, ambas copias del capítulo de configuración del manual y los comentarios del selector cuando cambien las opciones públicas.

## Mantener la capa de compilación de los Makefiles

Los Makefiles de los documentos activos incluyen `Config/latex-common.mk`, que define los motores LaTeX compatibles y los comandos comunes de compilación y limpieza de `latexmk`. Las dependencias de glosarios se registran de forma centralizada en `Config/latexmkrc`. Mantenga las listas de documentos, los objetivos de grupo orientados al usuario, las reglas de conversión y el procesado de la salida final en el Makefile correspondiente a cada directorio; no duplique allí las opciones del motor ni secuencias incondicionales de pasadas de LaTeX y Biber.

Cada objetivo de documento activo invoca deliberadamente una comprobación ligera de dependencias de `latexmk`. Un documento sin cambios no debe volver a ejecutar LaTeX, Biber, `makeglossaries`, conversiones, compresión ni comandos de copia. Al añadir un nuevo documento administrativo, añada su nombre base a la lista del directorio correspondiente y deje que `latexmk` descubra sus entradas directas y compartidas. Conserve los alias de compatibilidad documentados en el manual de usuario y actualice el despachador de documentación administrativa de la raíz únicamente cuando introduzca un nuevo tipo de trabajo mantenido.

## Generar los PDF de documentación

Ejecute `make -C Documentation` para generar los dos PDF en español que se conservan en la raíz del repositorio: `README.pdf` y `TYPESETTING-STYLES-COMPARISON.pdf`. Este último compara los estilos registrados de Book mediante páginas del GIEC en español. Se requieren Pandoc, PyMuPDF y un entorno LaTeX capaz de generar PDF. Las demás guías siguen disponibles como ficheros Markdown en `Documentation/en/` y `Documentation/es/`; sus PDF no se generan en la raíz. El changelog generado no forma parte de este objetivo, ya que los mensajes históricos pueden contener comandos LaTeX y no están pensados para mostrarse como una guía de usuario. Los archivos de distribución renombran los dos primeros como `00-README.pdf` y `02-TYPESETTING-STYLES-COMPARISON.pdf`.

## Generar una distribución de publicación

Asigne a `RELEASE.txt` el identificador de versión/etiqueta existente y ejecute:

```console
make distrib
```

El fragmento opcional `AdminScripts/maintainer.mk` proporciona este objetivo únicamente en los checkouts del repositorio. Genera `README.pdf` y `TYPESETTING-STYLES-COMPARISON.pdf`; después, `AdminScripts/go.build-distribution.sh` los renombra como `00-README.pdf` y `02-TYPESETTING-STYLES-COMPARISON.pdf` dentro del archivo y renderiza `04-TYPESETTING-STYLES-GUIDE.pdf` directamente en el área temporal de preparación de la distribución. Crea `03-PhDTFMTFG-LaTeX-Template-UAH-<release>.tgz` y `.zip` con contenido idéntico cuya raíz contiene directamente los ficheros y directorios de la plantilla. Como el fragmento y `AdminScripts/` no están incluidos en los archivos, los usuarios habituales no ven el objetivo exclusivo para mantenedores.

La distribución se construye a partir de una lista estructural explícita de fuentes de usuario bajo control de versiones que están permitidas. Contiene `RELEASE.txt`, todas las variantes registradas de titulaciones e instituciones, el libro, el anteproyecto, la documentación administrativa, los ficheros de compilación del usuario, `00-README.pdf`, `02-TYPESETTING-STYLES-COMPARISON.pdf`, la versión renderizada orientada al usuario `04-TYPESETTING-STYLES-GUIDE.pdf`, la utilidad de sincronización con Git y los recursos de entrada necesarios. Excluye `Documentation/`, `AdminScripts/`, `Deprecated/`, `normativas/`, `UsefulDocs/`, material de diapositivas y otros PDF generados. El comando valida las rutas obligatorias y prohibidas y compila el libro por defecto, el anteproyecto y los tres grupos de documentación administrativa desde una copia aislada preparada antes de crear los archivos. No crea commits ni etiquetas, no hace push, no modifica `RELEASE.txt` ni deja el PDF de la guía renderizado en la raíz del repositorio.

Antes de publicar, parta de un árbol de trabajo limpio, confirme que `RELEASE.txt` coincide con la etiqueta Git prevista, ejecute la generación completa de regresión de PDF, ejecute `make distrib`, inspeccione ambos archivos y compruebe que se descomprimen y compilan en un directorio limpio.

## Generar los ejemplos públicos de Dropbox

Ejecute `make public-samples`, o invoque `AdminScripts/go.gen-public-sample-pdfs.sh` directamente desde cualquier directorio, para generar el conjunto deliberadamente reducido de ejemplos públicos completos documentado en `Documentation/es/DOWNLOAD-GUIDE.md`. El script utiliza compilaciones aisladas y no reescribe el `Config/myconfig.tex` de trabajo. También genera `00-README.pdf`, `01-DOWNLOAD-GUIDE.pdf` y el `02-TYPESETTING-STYLES-COMPARISON.pdf` bilingüe, continúa después del fallo de una muestra individual y no permite publicar los archivos salvo que existan todos los PDF esperados. La comparación se genera de forma determinista a partir de fuentes GIEC en español para cada estilo registrado; no reutiliza PDF de prototipos que podrían estar obsoletos.

Al final, el script pregunta si los PDF generados y `RELEASE.txt` deben copiarse a `$HOME/Dropbox/PhDTFMTFG-LaTeX-Template`. Si se solicita la copia y el destino ya contiene ficheros PDF en el nivel superior, los enumera y pregunta por separado si deben eliminarse. Revise atentamente esa lista: aceptar la segunda pregunta elimina esos PDF existentes, mientras que rechazarla conserva los PDF no relacionados o anteriores y sobrescribe únicamente los nombres de fichero generados que coincidan. Use `--destination PATH` al invocar directamente el script para seleccionar otro directorio.

Para realizar la publicación completa en una sola operación, ejecute:

```bash
make publish-dropbox
```

Este objetivo, exclusivo para mantenedores, ejecuta primero el objetivo validado `distrib` y después genera los ejemplos públicos. Enumera y solicita confirmación antes de publicar los diez PDF, ambos archivos de publicación y `RELEASE.txt`. Por separado, ofrece eliminar los PDF existentes del nivel superior y los archivos ZIP/TGZ de la plantilla que coincidan antes de instalar el nuevo conjunto. Rechazar esa limpieza conserva los ficheros anteriores, aunque se siguen sobrescribiendo los que tengan nombres idénticos.

El destino predeterminado es `$HOME/Dropbox/PhDTFMTFG-LaTeX-Template`. Puede cambiarlo sin editar ficheros bajo control de versiones cuando sea necesario:

```bash
make publish-dropbox DROPBOX_DISTRIBUTION_DIR=/path/to/distribution-folder
```

El objetivo y su destino local se definen en `AdminScripts/maintainer.mk`, que se omite deliberadamente de las distribuciones ZIP/TGZ para usuarios.

Utilice `AdminScripts/go.gen-all-pdfs.sh --all` para la regresión exhaustiva de titulación/idioma/estructura de doctorado/estilo/fuentes; ya no es el conjunto de publicación. Actualice conjuntamente `Documentation/es/DOWNLOAD-GUIDE.md` y la matriz de muestras de `go.gen-public-sample-pdfs.sh` siempre que cambie un ejemplo publicado.

## Cómo añadir titulaciones y universidades

Esta guía está dirigida a los mantenedores de la plantilla. Explica cómo añadir una titulación a una institución que ya está contemplada y cómo añadir una universidad completamente nueva. Los usuarios habituales de la plantilla solo necesitan seleccionar un identificador existente con `\myDegree` en `Config/myconfig.tex`; no deberían necesitar editar los registros ni los ficheros institucionales descritos aquí.

## Cómo está conectada la configuración

El comportamiento dependiente de la titulación se reparte entre un pequeño conjunto de ficheros de referencia:

- `Config/degrees.tex` declara los identificadores de las titulaciones, sus nombres, tipos de trabajo, centros, instituciones y perfiles de maquetación.
- `Config/institutions.tex` declara las universidades y conecta cada una de ellas con un estilo institucional.
- `Config/institution-styles/` contiene colores de marca y utilidades reutilizables para las portadas institucionales.
- `Config/layout-profiles.tex` declara los ficheros de portada ordenados y la contraportada opcional utilizados por cada maquetación.
- `Book/cover/<institution>/` contiene las implementaciones de portada y contraportada específicas de cada institución.
- `Book/logos/<institution>/` contiene los logotipos específicos de cada institución. Los elementos gráficos compartidos entre instituciones o pertenecientes a proyectos deben estar en `Book/logos/shared/`.
- `Config/degree-registry.tex` implementa el registro. Normalmente no debe editarlo al añadir una titulación o una universidad.

Durante la compilación, `Config/postamble.tex` carga los registros, selecciona `\myDegree`, carga el estilo de la institución correspondiente y define las macros públicas utilizadas por los ficheros de portada. A continuación, `Book/cover/cover.tex` y `Book/cover/backpage.tex` incluyen los ficheros seleccionados por el perfil de maquetación.

La selección puede resumirse así:

```text
\myDegree
    -> degree declaration
       -> institution -> university names, acronym and institution style
       -> layout profile -> ordered cover files and optional back page
       -> degree fields -> degree name, school and work type
```

## Elija primero identificadores estables

Antes de editar los ficheros, elija dos identificadores cuando corresponda:

- Un identificador de titulación como `GIEC`, `MUIT` o `ITIURJC`. Es el valor que los usuarios asignan a `\myDegree`, aparece en los nombres de los PDF generados y debería permanecer estable una vez publicado.
- Un identificador de institución como `UAH`, `UPM` o `URJC`. Reutilice un identificador existente cuando la universidad ya esté registrada.

Use identificadores ASCII cortos y sin espacios. Los identificadores de titulaciones e instituciones en mayúsculas siguen la convención actual. Los nombres de los perfiles de maquetación usan palabras en minúsculas separadas por guiones, por ejemplo `uah-tfg-2024` o `urjc-iti-tfg`.

No codifique un tipo de trabajo independiente dentro del identificador de la titulación únicamente para resolver un problema con el nombre de fichero. El tipo de trabajo canónico se almacena de forma independiente en el campo `work-type`.

## Añadir una titulación a una universidad existente

### Paso 1: determine si puede reutilizarse una maquetación existente

Revise `Config/layout-profiles.tex` y los ficheros de `Book/cover/<institution>/`. Reutilice un perfil existente cuando la nueva titulación tenga exactamente la misma secuencia de portadas y la misma contraportada que otra titulación ya contemplada.

Por ejemplo, varios grados de la UAH comparten `uah-tfg-2024`. Una nueva titulación de grado de la UAH que utilice el mismo formato institucional normalmente solo necesita una nueva declaración en `Config/degrees.tex`; duplicar el perfil o los ficheros de portada dificultaría el mantenimiento posterior.

Cree un nuevo perfil de maquetación únicamente cuando difiera al menos uno de los siguientes elementos:

- El conjunto ordenado de páginas de portada o certificación.
- El diseño de la portada o su texto institucional.
- La contraportada.
- Un formato específico de una normativa que deba evolucionar de forma independiente.

### Paso 2: añada la declaración de la titulación

Añada un bloque `\DeclareDegree` en la sección correspondiente de `Config/degrees.tex`:

```tex
\DeclareDegree{NEWDEGREE}{
  status = active,
  institution = UAH,
  school = {Escuela Politécnica Superior},
  school-english = {Polytechnic School},
  degree-name = {Nombre oficial de la titulación},
  degree-name-english = {Official English degree name},
  degree-name-wrapped = {Nombre oficial\\de la titulación},
  degree-name-wrapped-uppercase = {\MakeUppercase{Nombre oficial}\\\MakeUppercase{de la titulación}},
  work-type = TFG,
  work-type-full-spanish = {Trabajo de Fin de Grado},
  work-type-full-english = {Bachelor's Thesis},
  layout-profile = uah-tfg-2024
}
```

Los campos obligatorios son:

- `status`: metadatos de mantenimiento. Las convenciones actuales son `active`, `legacy` y `experimental`.
- `institution`: un identificador declarado en `Config/institutions.tex`.
- `school`: el nombre oficial de la escuela, facultad o centro académico que se muestra para la titulación.
- `degree-name`: el nombre oficial de la titulación asignado actualmente a `\myDegreefull`.
- `work-type`: la categoría canónica abreviada del trabajo. Los valores existentes incluyen `TFC`, `TFG`, `TFM`, `PhD` y `RR`. También se utiliza en los nombres de fichero generados.
- `work-type-full-spanish` y `work-type-full-english`: nombres dependientes del idioma que se asignan a `\myWorkTypeFull`.
- `layout-profile`: un perfil declarado en `Config/layout-profiles.tex`.

Los campos opcionales son:

- `school-english`: nombre del centro en inglés. Si se omite, `\mySchoolEnglish` toma el valor de `\mySchool`.
- `degree-name-english`: se conserva como metadato del registro. Actualmente, la selección de la titulación sigue asignando `degree-name` a `\myDegreefull` en ambos idiomas, por lo que no debe confiar en este campo para cambiar automáticamente el nombre renderizado de la titulación.
- `degree-name-wrapped`: una forma con saltos de línea explícitos que utilizan las portadas con anchura limitada. Si se omite, `\myDegreefullwrapped` toma el valor de `\myDegreefull`.
- `degree-name-wrapped-uppercase`: una forma explícita en mayúsculas y con saltos de línea. Si se omite, `\myDegreefullwrappedUpcase` aplica `\MakeUppercase` a `\myDegreefull`.

Mantenga el formato de la declaración compatible con `Config/query-degree-registry.sh`:

- Coloque `\DeclareDegree{IDENTIFIER}{` en una línea propia, sin espacios iniciales.
- Coloque `work-type = VALUE,` en una línea propia dentro de la declaración.
- Mantenga la coma final en `work-type`.

El propio registro TeX es más flexible, pero el Makefile y el script de generación de PDF utilizan intencionadamente la sencilla herramienta de consulta orientada a líneas.

### Paso 3: cree un perfil de maquetación solo si es necesario

Si ningún perfil existente es adecuado, añada uno a `Config/layout-profiles.tex`:

```tex
\DeclareLayoutProfile{uah-newdegree-tfg}{
  cover-files = {
    cover/uah/portada-newdegree.tex,
    cover/uah/cover-newdegree.tex
  },
  backpage-file = {cover/uah/backpage-newdegree.tex}
}
```

`cover-files` es una lista ordenada, separada por comas, de longitud arbitraria. Un perfil puede contener un fichero, dos ficheros o más de dos; cada fichero de la lista se incluye exactamente una vez y en el orden declarado. El registro no inserta saltos de página entre ellos, por lo que cada fichero debe proporcionar su propio `titlepage`, `\newpage`, `\clearpage` o un mecanismo equivalente para delimitar páginas. Si falta un fichero, se produce el error normal de LaTeX de fichero no encontrado, mientras que repetir un nombre de fichero hace que se incluya repetidamente. Un valor `cover-files` vacío u omitido no genera actualmente ninguna portada y el registro no lo rechaza, por lo que cualquier perfil de documento normal debería declarar al menos un fichero de portada. `backpage-file` es opcional; omítalo cuando la titulación no tenga contraportada.

Las rutas se resuelven al compilar desde `Book/`, por lo que las rutas institucionales normalmente empiezan por `cover/<institution>/`. Use barras inclinadas hacia delante y respete las mayúsculas y minúsculas de los nombres de fichero.

Haga que la declaración de la nueva titulación apunte al nuevo perfil:

```tex
layout-profile = uah-newdegree-tfg
```

### Paso 4: implemente los nuevos ficheros de portada que sean necesarios

Coloque los nuevos ficheros en `Book/cover/<institution>/`. Parta del formato existente más próximo, pero elimine las suposiciones que no correspondan a la nueva titulación.

Use preferentemente las macros ya derivadas de los registros y de `myconfig.tex`:

- `\myUniversity`, `\myUniversityEnglish` y `\myUniversityAcronym`.
- `\mySchool` y `\mySchoolEnglish`.
- `\myDegreefull`, `\myDegreefullwrapped` y `\myDegreefullwrappedUpcase`.
- `\myWorkType` y `\myWorkTypeFull`.
- `\myBookTitle`, `\myAuthorFullName`, `\myAcademicTutorFullName` y `\myCoTutorFullName`.
- `\myDepartment` y `\myDepartmentEnglish`, que se mantienen deliberadamente configurables por el usuario porque los departamentos pueden variar dentro de una misma titulación.
- Las macros existentes de idioma, género, fecha y tutor definidas por la configuración compartida.

No codifique directamente el nombre de una universidad, centro, autor, tutor, idioma o titulación cuando exista una macro que lo represente. Trate explícitamente el caso de `\myCoTutorFullName` vacío si la página muestra información del cotutor.

Mantenga las imágenes en `Book/logos/<institution>/` cuando sean logotipos reutilizables, o junto a la portada en `Book/cover/<institution>/` cuando sean recursos de portada de página completa estrechamente ligados a esa implementación.

### Paso 5: ponga el identificador a disposición de los usuarios

Añada el nuevo identificador y su descripción a los comentarios de titulaciones compatibles de `Config/myconfig.tex`. Actualice también la lista de titulaciones de `Book/chapters/configuracion.tex` y su copia original mantenida en `Book/chapters/orig/`.

Si la auditoría de compatibilidad se mantiene para la versión, actualice `Documentation/es/DEGREE_REGISTRY_COMPATIBILITY.md` con la nueva titulación y el perfil de maquetación.

## Añadir una universidad completamente nueva

Una nueva universidad requiere una declaración de institución, un estilo, recursos organizados, al menos un perfil de maquetación y al menos una declaración de titulación.

### Paso 1: cree los directorios institucionales

Utilizando un nombre de directorio en minúsculas basado en el identificador de la institución, cree:

```text
Book/cover/newuni/
Book/logos/newuni/
```

Use `Book/logos/shared/` únicamente para recursos que compartan realmente varias instituciones o proyectos externos. No coloque ficheros específicos de una institución directamente en `Book/logos/` ni en `Book/cover/`.

### Paso 2: cree el estilo institucional

Cree `Config/institution-styles/newuni.tex`. Este fichero se carga automáticamente antes de definir el contenido dependiente del idioma y de las portadas.

Un estilo mínimo puede contener solo comentarios si las portadas utilizan colores estándar:

```tex
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% NEWUNI-specific cover style.
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

% Add institution-specific colors and reusable cover helpers here.
```

Un estilo con colores de marca podría contener:

```tex
\definecolor{NEWUNIPrimary}{RGB}{12,34,56}
\definecolor{NEWUNISecondary}{RGB}{210,180,40}
\newcommand{\colorNEWUNI}{\color{NEWUNIPrimary}}
```

Use nombres con prefijo de la institución para los nuevos colores y comandos, a fin de evitar colisiones con otros estilos y con comandos del usuario. Los colores compartidos e independientes de la institución deben estar en `Config/colors.tex`; no vuelva a añadir colores de marca a `Config/preamble.tex`.

Si varias portadas necesitan el mismo fondo o la misma utilidad de dibujo, defínala en el estilo institucional en lugar de copiarla entre los ficheros de portada. El estilo de la UAH muestra comandos reutilizables para fondos a página completa. Si una portada usa `\BgThispage`, configure explícitamente `background` en el estilo institucional para que no pueda heredar elementos gráficos de otra institución.

### Paso 3: registre la universidad

Añada una declaración a `Config/institutions.tex`:

```tex
\DeclareInstitution{NEWUNI}{
  university-name = {Universidad Nueva},
  university-name-english = {New University},
  university-acronym = NEWUNI,
  style-file = {\myConfigDirectory/institution-styles/newuni.tex}
}
```

Los campos obligatorios son `university-name`, `university-acronym` y `style-file`. Aunque actualmente `university-name-english` no se exige como obligatorio, defínalo: las portadas en inglés lo reciben mediante `\myUniversityEnglish`, y dejarlo vacío puede producir texto incompleto.

Los identificadores de institución deben ser únicos. Referenciar desde una titulación una institución no declarada produce un error explícito del registro.

### Paso 4: añada los logotipos y recursos de portada

Copie los logotipos reutilizables de la universidad y del centro en `Book/logos/newuni/`. Referéncielos desde los ficheros de portada de forma relativa a la ruta gráfica `Book/logos/`:

```tex
\includegraphics[width=5cm]{newuni/university-logo.pdf}
```

Coloque los ficheros de portada y contraportada específicos de la institución en `Book/cover/newuni/`. Los recursos de mapa de bits o PDF a página completa que pertenezcan a una sola portada pueden permanecer junto a ella:

```tex
\includegraphics[width=\paperwidth,height=\paperheight]{cover/newuni/front-background.png}
```

Use preferentemente recursos PDF vectoriales cuando estén disponibles. Compruebe que cada recurso tiene licencia para su redistribución y registre la atribución necesaria.

### Paso 5: declare un perfil de maquetación

Añada la nueva maquetación de la universidad a `Config/layout-profiles.tex`:

```tex
\DeclareLayoutProfile{newuni-tfg}{
  cover-files = {
    cover/newuni/front-page.tex,
    cover/newuni/certification-page.tex
  },
  backpage-file = {cover/newuni/back-page.tex}
}
```

El nombre de un perfil debe ser único. El registro informa explícitamente de los perfiles duplicados y desconocidos.

### Paso 6: declare la primera titulación

Añada la titulación a `Config/degrees.tex`, haciendo referencia a la nueva institución y maquetación:

```tex
\DeclareDegree{NEWUNITFG}{
  status = active,
  institution = NEWUNI,
  school = {Escuela de Ingeniería},
  school-english = {School of Engineering},
  degree-name = {Grado en Ingeniería de Ejemplo},
  degree-name-english = {Bachelor's Degree in Example Engineering},
  work-type = TFG,
  work-type-full-spanish = {Trabajo Fin de Grado},
  work-type-full-english = {Bachelor's Thesis},
  layout-profile = newuni-tfg
}
```

La institución controla los nombres y la imagen de marca comunes a toda la universidad. La titulación controla su centro, porque distintas titulaciones de una misma universidad pueden pertenecer a diferentes escuelas o facultades.

No traslade al registro de instituciones los datos del tutor, cotutor, departamento, grupo de investigación, tribunal, título o fecha. Esos valores pueden variar en cada documento y permanecen en `Config/myconfig.tex`.

### Paso 7: documente el nuevo soporte

Actualice al menos:

- Los comentarios de titulaciones compatibles en `Config/myconfig.tex`.
- La lista de titulaciones compatibles en `Book/chapters/configuracion.tex` y `Book/chapters/orig/configuracion.tex`.
- `Documentation/es/DEGREE_REGISTRY_COMPATIBILITY.md` cuando la auditoría de compatibilidad forme parte del proceso de publicación.
- `Documentation/es/REPOSITORY_OVERVIEW.md` si la incorporación introduce nuevas convenciones estructurales.
- Los créditos de los colaboradores cuando la integración se base en el trabajo de otra persona.

## Procedimiento de validación

Realice la validación en orden creciente de coste.

### Comprobaciones de la herramienta de consulta

Desde la raíz del repositorio, confirme que el identificador puede localizarse y que su tipo de trabajo es correcto:

```sh
sh Config/query-degree-registry.sh identifiers | grep -Fx NEWDEGREE
sh Config/query-degree-registry.sh work-type NEWDEGREE
```

El segundo comando debería mostrar únicamente el valor canónico, por ejemplo `TFG`.

### Comprobaciones estáticas de rutas

Confirme que todos los ficheros indicados por la nueva maquetación existen bajo `Book/`. Compruebe tanto los ficheros de portada como la contraportada opcional. Busque rutas obsoletas de recursos después de mover o renombrar ficheros:

```sh
rg -n "old-logo-name|old-cover-name" Config Book
```

Ejecute la comprobación de espacios en blanco de Git:

```sh
git diff --check
```

### Compile un idioma cada vez

Guarde la configuración actual antes de realizar las pruebas:

```sh
cp Config/myconfig.tex /tmp/myconfig.tex.before-new-degree
```

Asigne el nuevo identificador a `\myDegree` y compile desde `Book/` con su flujo de trabajo LaTeX habitual. Si utiliza el Makefile suministrado:

```sh
cd Book
make clean
make
```

El objetivo `make` utiliza `latexmk` para ejecutar pdfLaTeX, Biber, `makeglossaries` y pasadas adicionales de pdfLaTeX únicamente cuando sus entradas lo requieren. La compresión y las copias de salida con nombres descriptivos también se regeneran únicamente cuando cambia su PDF de origen.

Pruebe ambos valores:

```tex
\newcommand{\myLanguage}{spanish}
```

y:

```tex
\newcommand{\myLanguage}{english}
```

Restaure la configuración guardada cuando termine:

```sh
cp /tmp/myconfig.tex.before-new-degree Config/myconfig.tex
```

Revise visualmente el PDF generado. La compilación por sí sola no detectará texto oficial incorrecto, desbordamientos, saltos de línea inapropiados, elementos gráficos de baja resolución, capas ocultas o una contraportada incorrecta.

Compruebe al menos:

- Los nombres de la universidad, centro, titulación y tipo de trabajo.
- La redacción en español y en inglés.
- El ajuste del título con títulos cortos y deliberadamente largos.
- Los casos con solo tutor y con tutor más cotutor.
- Los valores opcionales vacíos.
- El orden de portada, página de certificación y contraportada.
- Los logotipos, colores, imágenes de fondo, márgenes y calidad de impresión.
- El nombre de fichero generado y el tipo de trabajo canónico.

### Ejecute al final la matriz completa de titulaciones

`AdminScripts/go.gen-all-pdfs.sh` obtiene titulaciones, instituciones, perfiles de portada/contraportada y estilos de los registros de la plantilla. Sin opciones genera una muestra por combinación de institución, tipo y perfil: solo TFG, TFM y doctorado, en español, con estructura y estilo `standard` y fuentes institucionales. Puede ejecutarlo desde cualquier directorio. Desde la raíz, revise y genere la matriz exhaustiva con:

La selección de fuentes utiliza preferentemente `git ls-files`. Si Git no está disponible, la consulta falla o la lista está vacía, el generador aislado selecciona los ficheros de `Book/` y `Config/`, excluyendo resultados de compilación y copias de seguridad, pero conservando los recursos PDF de los subdirectorios. Así también puede trabajar con una distribución descomprimida tras copiar `AdminScripts/` junto a `Book/` y `Config/`, sin inicializar un repositorio Git. Guarde los recursos PDF de entrada en subdirectorios, ya que este método alternativo considera los ficheros `Book/*.pdf` del primer nivel como documentos generados.

```sh
AdminScripts/go.gen-all-pdfs.sh --all --dry-run
AdminScripts/go.gen-all-pdfs.sh --all
```

Antes de comenzar, muestra los documentos previstos, su número total, el destino y los PDF existentes que sustituirá si la compilación tiene éxito, y pide confirmación (`[y/N]`). `--dry-run` solo muestra esa información, sin escribir ni compilar; `--yes` omite la pregunta, pero no la validación ni la vista previa, y es obligatorio para la generación no interactiva. Las compilaciones usan copias temporales aisladas: no se reescribe `Config/myconfig.tex` ni se limpian los archivos de compilación de trabajo.

`--all` genera todas las combinaciones compatibles: todas las titulaciones excepto TFC, incluidos informes de investigación, ambos idiomas, ambas estructuras para doctorado, todos los estilos y ambas políticas de fuentes. Puede suponer cientos de compilaciones. `--all-degrees` expande solo las titulaciones; `--all-tfgs`, `--all-tfms` y `--all-phds` seleccionan todas las de esos tipos y pueden combinarse. `--all-universities` explicita la cobertura de todas las instituciones, ya predeterminada; `--all-styles` y `--all-fonts` expanden solo su dimensión.

Acote la selección con listas separadas por comas: `--universities UAH,URJC`, `--degrees GIEC,MUC`, `--degree-types TFG,TFM,PhD,RR`, `--layout-profiles uah-muie,uah-muc-2026`, `--styles standard,framed`, `--font-modes institutional,document`, `--languages spanish,english` y `--structures standard,compendium`. Los filtros se intersectan y pueden acotar `--all`. Una lista explícita de titulaciones conserva todas las indicadas, sin reducirlas a representantes. Cada titulación mantiene su perfil de portada/contraportada; no se combinan libremente.

No combine `--all-universities` con `--universities`, `--all-styles` con `--styles` ni `--all-fonts` con `--font-modes`. Se rechazan esas contradicciones, los valores desconocidos, las listas vacías y las selecciones sin documentos. `compendium` solo se aplica a doctorado; TFC se excluye siempre. Consulte `--list-options` y `--help` para ver valores y ejemplos.

Los PDF comprimidos y sus registros se guardan en `Book/all-pdfs/` o en el destino elegido con `--output-dir`; los nombres incluyen tipo, titulación, idioma, estructura, estilo y política de fuentes. Las compilaciones fallidas conservan su registro y no impiden continuar con las demás; cualquier fallo produce un estado de error al final.

Revise tanto el registro de cada titulación como el PDF. Que un comando finalice correctamente no garantiza que la página institucional sea correcta visual o legalmente.

## Errores habituales

- Añadir un identificador únicamente a los comentarios de `myconfig.tex`. Los comentarios no registran una titulación.
- Declarar una titulación pero olvidar su institución o perfil de maquetación. El registro rechaza estos casos.
- Repetir los nombres de las universidades en cada titulación en lugar de utilizar `Config/institutions.tex`.
- Colocar el centro en la declaración de la institución. Los centros pertenecen a las titulaciones, porque una universidad puede contener varios centros.
- Trasladar las afiliaciones del departamento o tutor al registro de titulaciones. Pueden variar para cada trabajo.
- Copiar una maquetación existente cuando podría reutilizarse sin cambios.
- Reutilizar una maquetación cuya redacción oficial u orden de páginas solo sean aproximadamente similares.
- Codificar directamente nombres que ya están disponibles mediante macros del registro.
- Colocar colores de marca en el preámbulo genérico en lugar de en el estilo de la institución.
- Dejar logotipos sueltos en `Book/logos/` en lugar de en el directorio de la institución.
- Olvidar probar el inglés, las configuraciones sin cotutor y los títulos largos.
- Cambiar `Config/degree-registry.tex` únicamente para añadir datos. Ese fichero implementa el mecanismo; las extensiones normales deben hacerse en los ficheros declarativos del registro.

## Ficheros que se modifican normalmente

Para una titulación que reutiliza una universidad y una maquetación existentes, el cambio mínimo suele ser:

```text
Config/degrees.tex
Config/myconfig.tex                         # supported-degree comment
Book/chapters/configuracion.tex             # manual
Book/chapters/orig/configuracion.tex        # maintained original copy
```

Para una titulación que requiere una nueva maquetación, añada:

```text
Config/layout-profiles.tex
Book/cover/<institution>/...
Book/logos/<institution>/...                # only when new assets are needed
```

Para una universidad nueva, añada o cambie:

```text
Config/institutions.tex
Config/institution-styles/<institution>.tex
Config/degrees.tex
Config/layout-profiles.tex
Book/cover/<institution>/...
Book/logos/<institution>/...
Config/myconfig.tex
Book/chapters/configuracion.tex
Book/chapters/orig/configuracion.tex
```

No añada al commit PDF generados, ficheros auxiliares de LaTeX, registros ni configuraciones temporales de prueba. Incluya en el commit únicamente los ficheros fuente y los recursos institucionales distribuibles necesarios para reproducir los documentos.

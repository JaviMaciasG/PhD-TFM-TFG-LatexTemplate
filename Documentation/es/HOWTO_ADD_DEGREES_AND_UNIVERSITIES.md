# Cómo añadir titulaciones y universidades

Esta guía está dirigida a los mantenedores de la plantilla. Explica cómo añadir una titulación a una institución que ya está contemplada y cómo añadir una universidad completamente nueva. Los usuarios habituales de la plantilla solo necesitan seleccionar un identificador existente con `\myDegree` en `Config/myconfig.tex`; no deberían necesitar editar los registros ni los ficheros institucionales descritos aquí.

## 1. Cómo está conectada la configuración

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

## 2. Elija primero identificadores estables

Antes de editar los ficheros, elija dos identificadores cuando corresponda:

- Un identificador de titulación como `GIEC`, `MUIT` o `ITIURJC`. Es el valor que los usuarios asignan a `\myDegree`, aparece en los nombres de los PDF generados y debería permanecer estable una vez publicado.
- Un identificador de institución como `UAH`, `UPM` o `URJC`. Reutilice un identificador existente cuando la universidad ya esté registrada.

Use identificadores ASCII cortos y sin espacios. Los identificadores de titulaciones e instituciones en mayúsculas siguen la convención actual. Los nombres de los perfiles de maquetación usan palabras en minúsculas separadas por guiones, por ejemplo `uah-tfg-2024` o `urjc-iti-tfg`.

No codifique un tipo de trabajo independiente dentro del identificador de la titulación únicamente para resolver un problema con el nombre de fichero. El tipo de trabajo canónico se almacena de forma independiente en el campo `work-type`.

## 3. Añadir una titulación a una universidad existente

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

## 4. Añadir una universidad completamente nueva

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

## 5. Procedimiento de validación

Realice la validación en orden creciente de coste.

### 5.1 Comprobaciones de la herramienta de consulta

Desde la raíz del repositorio, confirme que el identificador puede localizarse y que su tipo de trabajo es correcto:

```sh
sh Config/query-degree-registry.sh identifiers | grep -Fx NEWDEGREE
sh Config/query-degree-registry.sh work-type NEWDEGREE
```

El segundo comando debería mostrar únicamente el valor canónico, por ejemplo `TFG`.

### 5.2 Comprobaciones estáticas de rutas

Confirme que todos los ficheros indicados por la nueva maquetación existen bajo `Book/`. Compruebe tanto los ficheros de portada como la contraportada opcional. Busque rutas obsoletas de recursos después de mover o renombrar ficheros:

```sh
rg -n "old-logo-name|old-cover-name" Config Book
```

Ejecute la comprobación de espacios en blanco de Git:

```sh
git diff --check
```

### 5.3 Compile un idioma cada vez

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

El objetivo `make` ejecuta pdfLaTeX, Biber, `makeglossaries`, pasadas adicionales de pdfLaTeX, compresión y generación de ficheros de salida. También actualiza y prepara para commit `RELEASE.txt`; revise el árbol de trabajo después.

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

### 5.4 Ejecute al final la matriz completa de titulaciones

`AdminScripts/go.gen-all-pdfs.sh` obtiene titulaciones, instituciones, perfiles de portada/contraportada y estilos de los registros de la plantilla. Sin opciones genera una muestra por combinación de institución, tipo y perfil: solo TFG, TFM y doctorado, en español, con estructura y estilo `standard` y fuentes institucionales. Puede ejecutarlo desde cualquier directorio. Desde la raíz, revise y genere la matriz exhaustiva con:

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

## 6. Errores habituales

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

## 7. Ficheros que se modifican normalmente

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

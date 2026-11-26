# Editor de la configuración de la plantilla LaTeX

Este editor opcional te ayuda a rellenar los ajustes habituales de
`Config/myconfig.tex`. No necesitas instalar Python, LaTeX, Git ni Make
para utilizar un paquete nativo del editor.

1. Extrae el paquete del editor para tu sistema y abre la aplicación.
   En Windows conserva la carpeta del programa completa junto al `.exe`.
2. Pulsa **Abrir directorio de trabajo…** y elige la carpeta de la plantilla que contiene
   `Config/` y `Book/`.
3. Empieza por **Documento** y **Autoría y tutoría**. Al elegir el idioma,
   la interfaz cambia sin traducir lo que hayas escrito. La titulación
   determina los rótulos y los campos institucionales que se muestran:
   por ejemplo, el sitio web solo aparece para los TFG de la EIIA-UCLM.
   El selector agrupa las titulaciones por universidad y centro y se abre
   en la titulación actual. Si no la encuentra, propone GIEC cuando está
   disponible, sin cambiar el fichero.
4. Pulsa **Guardar** y sigue compilando el documento como antes.

El editor solo cambia el contenido de las llaves de los campos que hayas
modificado. Conserva tus ajustes manuales, comentarios, comandos y finales
de línea. Todos los campos de texto admiten LaTeX. El editor guarda
`PEPE_JUAN` como `PEPE\_JUAN`, no vuelve a escapar `PEPE\_JUAN` y
deja `$3_4$` tal como está. Después de guardar, el campo muestra el
código que se escribió en el fichero.

Si al cambiar de titulación se oculta un campo editado, puedes recuperar
su borrador volviendo a la titulación anterior antes de guardar. Al guardar,
te indicará qué cambios quedarían fuera y podrás cancelar o guardar solo
los campos visibles sin modificar los valores ocultos en el fichero.

Al guardar se crea una copia en `Config/.myconfig-backups/`. Puede que tu
explorador oculte esa carpeta. Para recuperar una versión, cierra el
editor y copia el fichero de la copia de seguridad sobre `Config/myconfig.tex`.
Si editaste el fichero en otro programa después de abrirlo, el editor te
pedirá recargarlo antes de guardar. No envía datos por Internet. Los
comandos personalizados y otros ajustes no expuestos se siguen editando
directamente en `myconfig.tex`.

La pestaña **Colores de los enlaces** muestra los colores que usa el
proyecto y permite elegir entre los colores incorporados de `xcolor`.
Si ya tienes un valor personalizado, se conserva hasta que elijas otro.
El editor recuerda el último directorio de trabajo en las preferencias
locales de la aplicación. Al volver a abrir el editor, **Abrir directorio
de trabajo** empieza allí sin cargar el proyecto automáticamente.

## Desarrollo y paquetes de prueba

Desde esta carpeta, con Python 3.11 en un entorno virtual:

```sh
python -m pip install -r requirements.txt
python run_editor.py
python -m unittest discover -s tests -v
```

Desde `ConfigEditor/`, usa `make help` para ver los objetivos disponibles:

- `make distrib` crea `dist/source.zip` solo con el código del editor, sus
  dependencias declaradas, las pruebas y la licencia. No incluye la
  plantilla LaTeX ni los ejecutables.
- `make package-linux` genera el paquete Linux x86-64 localmente en
  `dist/packages/`. La primera ejecución instala las dependencias de
  empaquetado en `.venv-package/`. Usa Ubuntu 24.04 si quieres reproducir
  el entorno de CI.
- `make package-windows`, `make package-macos`,
  `make package-macos-arm64` y `make package-macos-intel` ejecutan el
  flujo de GitHub Actions y descargan los paquetes y sus sumas SHA-256 en
  `dist/packages/remote/`. El objetivo `package-macos` genera ambos ZIP.
- `make all` (o `make package-all`) genera los cuatro paquetes.
  `make clean` elimina los directorios de compilación y empaquetado
  locales; no borra `.venv/` ni toca la plantilla.

Los objetivos remotos requieren `gh auth login` y que el flujo de
empaquetado esté en la rama predeterminada del repositorio en GitHub.
Usan la rama actual publicada o la rama o etiqueta que indiques con
`PACKAGE_REF`. Desde el ZIP de código, indica también
`PACKAGE_REPO=propietario/repositorio`. Los objetivos no hacen `git push`
ni publican una versión.

Si ejecutas `make all` con `PACKAGE_REF`, esa referencia solo afecta a
los paquetes remotos; Linux se construye a partir de tu copia local.
Desde el ZIP de código, puedes indicar `SMOKE_PROJECT=/ruta/a/la/plantilla`
para probar el ejecutable de Linux al empaquetarlo. Algunas pruebas
automatizadas también necesitan el repositorio completo.

Para generar un paquete directamente en el propio sistema de destino,
sin los objetivos remotos:

```sh
python -m pip install -r packaging-requirements.txt
python build_standalone.py
python package_bundle.py --smoke-test-project ..
```

El flujo manual **Package myconfig.tex editor** de GitHub Actions realiza
estos pasos en Linux x86-64 (Ubuntu 24.04), Windows x64 y macOS 15
(Apple Silicon e Intel). Descarga el resultado en **Artifacts**. En
Linux, extrae el `.tar.gz` y abre `EditorPlantillaLaTeX` dentro de la
carpeta de la aplicación. En macOS, abre el paquete `.app` del ZIP. En
Windows, ejecuta `EditorPlantillaLaTeX.exe` dentro de su carpeta.

Los paquetes de CI son para pruebas y no se publican automáticamente. No
llevan firma de distribución de Windows ni firma Developer ID y notarización
de macOS. Antes de una publicación para estudiantes, verifica el arranque de
los paquetes descargados en equipos reales, completa la firma correspondiente
y comprueba las obligaciones de redistribución de las bibliotecas incluidas.

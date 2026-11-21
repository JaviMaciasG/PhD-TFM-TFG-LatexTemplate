@echo off
setlocal EnableExtensions DisableDelayedExpansion
rem This batch file is saved as UTF-8. Restore the caller's code page on exit.
set "saved_code_page="
for /f "tokens=2 delims=:" %%P in ('chcp') do for /f %%Q in ("%%P") do set "saved_code_page=%%Q"
chcp 65001 >nul
rem Stay in cmd.exe: no PowerShell, policy change, or extra dependency.
rem Keep delayed expansion off around paths so names containing ! survive.
set "inf=[INF]"
set "wrn=[WRN]"
set "err=[ERR]"
rem Use ANSI status colors in CMD, including when launched from Explorer.
call :colors
echo %inf% Comprobando la plantilla...
pushd "%~dp0.." || (
    echo %err% No se pudo abrir la carpeta del proyecto. >&2
    goto :finish_error
)
set "project_open=yes"

for %%D in (Config Tools Book Book\chapters) do (
    set "item=%%D"
    call :directory || goto :bad_project
)
for %%F in (Config\myconfig.tex Tools\estructuras.tsv Book\book.tex) do (
    set "item=%%~F"
    call :regular || goto :bad_project
)

set "degrees=0"
set "degree="
for /f "usebackq tokens=1,2,3 delims={}" %%A in ("Config\myconfig.tex") do (
    if "%%B"=="\myDegree" for /f "tokens=1" %%D in ("%%A") do (
        if "%%D"=="\newcommand" (
            set /a degrees+=1 >nul
            set "degree=%%C"
        )
        if "%%D"=="\renewcommand" (
            set /a degrees+=1 >nul
            set "degree=%%C"
        )
    )
)
if not "%degrees%"=="1" goto :bad_degree
setlocal EnableDelayedExpansion
set "matches=0"
set "structure="
for /f "usebackq tokens=1,2,3" %%A in ("Tools\estructuras.tsv") do (
    if "%%A"=="!degree!" if "%%C"=="" (
        set /a matches+=1 >nul
        set "structure=%%B"
    )
)
if not "!matches!"=="1" (endlocal & goto :bad_degree)
if not "!structure!"=="standard" if not "!structure!"=="compendium" (endlocal & goto :bad_degree)
endlocal & set "structure=%structure%"
if "%structure%"=="standard" (
    set "primary=Book\chapters"
    set "secondary=Book\appendix"
    set "label=convencional"
) else if "%structure%"=="compendium" (
    set "primary=Book\chapters\compendium"
    set "secondary="
    set "label=por compendio"
) else goto :bad_degree
set "content=content-%structure%.tex"
echo %inf% ... todo correcto.
echo.
echo %inf% 1. Preparar un documento mínimo
echo %inf% 2. Restaurar los ejemplos de la plantilla
echo %inf% 3. Salir
set "choice="
set /p "choice=%inf% Elige una opción [3]: "
setlocal EnableDelayedExpansion
if "!choice!"=="1" (endlocal & set "mode=bare" & goto :selected)
if "!choice!"=="2" (endlocal & set "mode=orig" & goto :selected)
if "!choice!"=="3" (endlocal & goto :finish_ok)
if not defined choice (endlocal & goto :finish_ok)
endlocal
echo %err% Opción no válida. >&2
goto :finish_error

:selected
set "organization=%primary%\%mode%\%content%"
set "item=%organization%"
call :regular || goto :bad_sources
set "item=Book\%content%"
call :regular || goto :bad_sources
set "operation=check_folder"
call :each_folder || goto :bad_sources
for /f "usebackq tokens=1,2 delims={}" %%A in ("%organization%") do (
    for /f "tokens=1" %%C in ("%%A") do if "%%C"=="\input" (
        set "input=%%B"
        call :check_input || goto :bad_sources
    )
)
echo.
if "%mode%"=="bare" (echo %inf% Preparando un documento mínimo) else echo %inf% Restaurar los ejemplos de la plantilla
echo %inf% Titulación: %degree% ^(%label%^).
echo %inf% Carpetas:  "%primary%" "%secondary%".
echo %inf% Archivo:   "Book\%content%".
call :backup_name || goto :bad_clock
if exist "%backup%" goto :backup_exists
echo %inf% Antes de sustituir los archivos, se creará una copia de seguridad en...
echo %inf%        ... "%backup%".
set "answer="
set /p "answer=%inf% ¿Continuar? [s/N]: "
setlocal EnableDelayedExpansion
if /i "!answer!"=="s" (endlocal & goto :confirmed)
if /i "!answer!"=="si" (endlocal & goto :confirmed)
endlocal
echo %inf% Cancelado. No se ha cambiado ningún archivo.
goto :finish_ok

:confirmed
echo %inf% Creando la copia de seguridad...
if exist "%backup%" goto :backup_exists
mkdir "%backup%" 2>nul || goto :bad_backup
mkdir "%backup%\Book" 2>nul || goto :bad_backup
set "item=Book\%content%"
set "destination=%backup%\%item%"
call :copy || goto :bad_backup
set "operation=save_folder"
call :each_folder || goto :bad_backup
echo %inf% Sustituyendo los archivos de contenido...
set "operation=install_folder"
call :each_folder || goto :rollback
set "item=%organization%"
set "destination=Book\%content%"
call :copy || goto :rollback
echo.
echo %inf% Operación completada.
echo %inf% Copia de seguridad: "%backup%"
echo %inf% Abre y compila Book/book.tex.
goto :finish_ok

:each_folder
set "folder=%primary%"
call :%operation% || exit /b 1
if not defined secondary exit /b 0
set "folder=%secondary%"
call :%operation%
exit /b %errorlevel%

:backup_name
rem The date shown by CMD is localized. Read the user's numeric date order.
set "order="
for /f "tokens=3" %%O in ('reg query "HKCU\Control Panel\International" /v iDate 2^>nul') do set "order=%%O"
set "n=0"
set "date_text=%date%"
rem Normalize separators before FOR /F, whose default delimiter is whitespace.
set "date_text=%date_text:/= %"
set "date_text=%date_text:.= %"
set "date_text=%date_text:-= %"
set "date_text=%date_text:,= %"
set "time_text=%time%"
set "time_text=%time_text::= %"
set "time_text=%time_text:.= %"
set "time_text=%time_text:,= %"
for /f "tokens=1-6" %%J in ("%date_text%") do (
    set "part=%%J"
    call :date_part
    set "part=%%K"
    call :date_part
    set "part=%%L"
    call :date_part
    set "part=%%M"
    call :date_part
    set "part=%%N"
    call :date_part
    set "part=%%O"
    call :date_part
)
if not "%n%"=="3" exit /b 1
if "%order%"=="0" (
    set "month=%date_1%"
    set "day=%date_2%"
    set "year=%date_3%"
) else if "%order%"=="1" (
    set "day=%date_1%"
    set "month=%date_2%"
    set "year=%date_3%"
) else if "%order%"=="2" (
    set "year=%date_1%"
    set "month=%date_2%"
    set "day=%date_3%"
) else exit /b 1
if "%year:~3,1%"=="" exit /b 1
if not "%year:~4,1%"=="" exit /b 1
if not "%month:~2,1%"=="" exit /b 1
if not "%day:~2,1%"=="" exit /b 1
set "hour="
set "minute="
set "second="
for /f "tokens=1-3" %%H in ("%time_text%") do (
    set "hour=%%H"
    set "minute=%%I"
    set "second=%%J"
)
if not defined hour exit /b 1
if not defined minute exit /b 1
if not defined second exit /b 1
for /f "delims=0123456789" %%V in ("%hour%%minute%%second%") do exit /b 1
set "month=0%month%"
set "day=0%day%"
set "hour=0%hour%"
set "minute=0%minute%"
set "second=0%second%"
set "backup=Book\.%year%%month:~-2%%day:~-2%-%hour:~-2%%minute:~-2%%second:~-2%-backup"
exit /b 0

:date_part
if not defined part exit /b 0
for /f "delims=0123456789" %%V in ("%part%") do exit /b 0
set /a n+=1 >nul
set "date_%n%=%part%"
exit /b 0

:check_folder
set "item=%folder%"
call :directory || exit /b 1
set "item=%folder%\%mode%"
call :directory || exit /b 1
for %%F in ("%folder%\*.tex") do if exist "%%~F" (
    set "item=%%~F"
    call :regular || exit /b 1
)
set "found="
for %%F in ("%folder%\%mode%\*.tex") do if exist "%%~F" (
    set "item=%%~F"
    call :regular || exit /b 1
    if /i not "%%~nxF"=="%content%" set "found=yes"
    if /i not "%folder%"=="%primary%" set "found=yes"
)
if not defined found (
    set "item=%folder%\%mode%"
    set "path_error=no contiene archivos de contenido"
    exit /b 1
)
exit /b 0

:check_input
set "input=%input:/=\%"
for %%F in ("Book\%input%") do (
    for %%D in ("%primary%\_placeholder_") do if /i "%%~dpF"=="%%~dpD" (
        set "item=%primary%\%mode%\%%~nxF"
        call :regular || exit /b 1
    )
    if defined secondary for %%D in ("%secondary%\_placeholder_") do if /i "%%~dpF"=="%%~dpD" (
        set "item=%secondary%\%mode%\%%~nxF"
        call :regular || exit /b 1
    )
)
exit /b 0

:save_folder
mkdir "%backup%\%folder%" 2>nul || exit /b 1
for %%F in ("%folder%\*.tex") do if exist "%%~F" (
    set "item=%%~F"
    set "destination=%backup%\%folder%\%%~nxF"
    call :copy || exit /b 1
)
exit /b 0

:install_folder
for %%F in ("%folder%\*.tex") do if exist "%%~F" (
    set "item=%%~F"
    call :remove || exit /b 1
)
for %%F in ("%folder%\%mode%\*.tex") do if exist "%%~F" (
    set "item=%%~F"
    set "name=%%~nxF"
    call :install_file || exit /b 1
)
exit /b 0

:install_file
if /i "%folder%"=="%primary%" if /i "%name%"=="%content%" exit /b 0
set "destination=%folder%\%name%"
goto :copy

:rollback
echo %wrn% No se pudo completar la sustitución. Recuperando los archivos originales... >&2
set "recovery_failed="
set "operation=restore_folder"
call :each_folder
set "item=%backup%\Book\%content%"
set "destination=Book\%content%"
call :restore_file || set "recovery_failed=yes"
if defined recovery_failed (
    echo %err% No se pudo recuperar todo. Recupera tus archivos desde "%backup%". >&2
) else (
    echo %err% No se completó la operación. Se han recuperado los archivos originales. >&2
    echo %inf% Copia de seguridad: "%backup%"
)
goto :finish_error

:restore_folder
for %%F in ("%folder%\*.tex") do if exist "%%~F" if not exist "%backup%\%folder%\%%~nxF" (
    set "item=%%~F"
    call :remove || set "recovery_failed=yes"
)
for %%F in ("%backup%\%folder%\*.tex") do if exist "%%~F" (
    set "item=%%~F"
    set "destination=%folder%\%%~nxF"
    call :restore_file || set "recovery_failed=yes"
)
exit /b 0

:restore_file
if exist "%destination%" (
    fc /b "%item%" "%destination%" >nul 2>&1
    if not errorlevel 1 exit /b 0
)
goto :copy

:copy
set "copy_source=%item%"
set "item=%destination%"
call :not_link
set "link_status=%errorlevel%"
set "item=%copy_source%"
if not "%link_status%"=="0" (
    echo %err% Destino no seguro: "%destination%". >&2
    exit /b 1
)
copy /y /b "%item%" "%destination%" >nul 2>&1
if errorlevel 1 (
    echo %err% No se pudo copiar "%item%" a "%destination%". >&2
    exit /b 1
)
fc /b "%item%" "%destination%" >nul 2>&1
if errorlevel 1 (
    echo %err% No se pudo verificar la copia de "%item%" en "%destination%". >&2
    exit /b 1
)
exit /b 0

:remove
del /q "%item%" >nul 2>&1
if exist "%item%" exit /b 1
exit /b 0

:directory
call :existing_path || exit /b 1
if /i "%attributes:~0,1%"=="d" exit /b 0
set "path_error=se esperaba una carpeta"
exit /b 1

:regular
call :existing_path || exit /b 1
if /i not "%attributes:~0,1%"=="d" exit /b 0
set "path_error=se esperaba un archivo"
exit /b 1

:existing_path
set "path_error=no existe o no se puede acceder"
if not exist "%item%" exit /b 1
call :not_link || exit /b 1
if not defined attributes exit /b 1
exit /b 0

:not_link
set "attributes="
for %%V in ("%item%") do set "attributes=%%~aV"
rem A new copy destination does not have attributes yet.
if not defined attributes exit /b 0
if not "%attributes:l=%"=="%attributes%" (
    set "path_error=es un enlace o punto de reanálisis"
    exit /b 1
)
exit /b 0

:bad_project
echo %err% No se pudo comprobar "%item%": %path_error%. >&2
echo %err% Carpeta del proyecto: "%CD%". >&2
echo %inf% Extrae el ZIP completo y ejecuta Tools\prepare-book.bat desde la copia extraída.
goto :finish_error

:bad_degree
echo %err% No se pudo identificar una titulación admitida en Config\myconfig.tex. >&2
goto :finish_error

:bad_sources
echo %err% No se pudo comprobar "%item%": %path_error%. >&2
echo %err% No se ha sustituido ningún archivo. >&2
goto :finish_error

:bad_backup
echo %err% No se pudo completar la copia de seguridad. No se ha sustituido ningún archivo. >&2
echo %err% Ruta de la copia: "%backup%". >&2
goto :finish_error

:bad_clock
echo %err% No se pudo obtener la fecha y hora para nombrar la copia. >&2
echo %err% Fecha de CMD: "%date%". Hora: "%time%". Orden de fecha: "%order%". >&2
echo %err% No se ha sustituido ningún archivo. >&2
goto :finish_error

:backup_exists
echo %err% Ya existe una copia en "%backup%". Vuelve a ejecutar la herramienta en unos segundos. >&2
echo %err% No se ha sustituido ningún archivo. >&2
goto :finish_error

:finish_error
set "result=1"
goto :finish

:finish_ok
set "result=0"

:finish
if defined project_open popd
echo.
echo %inf% Pulsa una tecla para cerrar.
pause <CON >nul
if defined saved_code_page chcp %saved_code_page% >nul
exit /b %result%

:colors
rem CMD's prompt $E emits the escape character.
set "esc="
for /f "delims=#" %%E in ('"prompt #$E# & for %%V in (1) do rem"') do if not defined esc set "esc=%%E"
if not defined esc exit /b 0
set "inf=%esc%[32m[INF]%esc%[0m"
set "wrn=%esc%[33m[WRN]%esc%[0m"
set "err=%esc%[31m[ERR]%esc%[0m"
exit /b 0

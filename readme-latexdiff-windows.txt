Hola,

Por si alguna vez te viene bien, creo que ya he conseguido generar el
fichero de diferencias, aunque me da algún error al compilarlo.

El Miktex incluye el ejecutable del latexdiff, pero hay que instalar un
intérprete de perl para Windows (he instalado este:
http://strawberryperl.com/releases.html)

Para ejecutarlo hay que hacerlo desde línea de comandos:

>> latexdiff --flatten paper_old.tex paper.tex > paper_diff.tex

Saludos,

Cristina

#!/usr/bin/env bash
# Two title lengths per style; select EIF or ETSII without repeating builds.
set -euo pipefail
test_directory=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)
repository_root=$(cd -- "$test_directory/../.." && pwd)
school=${URJC_COVER_TEST_SCHOOL:-EIF}
case $school in EIF|ETSII) ;; *) echo 'URJC_COVER_TEST_SCHOOL must be EIF or ETSII' >&2; exit 2 ;; esac
fixture=$(mktemp -d)
trap 'rm -rf -- "$fixture"' EXIT
mkdir -p "$fixture/Book"
cp -a "$repository_root/Config" "$fixture/Config"
cp -a "$repository_root/Book/cover" "$repository_root/Book/logos" "$repository_root/Book/biblio" "$fixture/Book/"
before=$(sha256sum "$repository_root/Config/myconfig.tex")
styles=(standard editorial modern framed shaded mimosis)
for i in "${!styles[@]}"; do
  style=${styles[$i]}
  language=spanish degree=GIAA-EIF-URJC cotutor='Nombre de la cotutora'
  ((i % 2 == 0)) || { language=english; degree=GIATA-EIF-URJC; cotutor=''; }
  if [[ $school == ETSII ]]; then
    degree=GICI-ETSII-URJC
  fi
  definitions="\def\TestDegree{$degree}\def\TestLanguage{$language}\def\TestSplit{false}\def\TestCotutor{$cotutor}\def\TestTutorGender{female}\def\TestStyle{$style}\def\TestCheckFont{1}"
  definitions+='\def\TestTitle{Diseño de sistemas}\def\TestSecondTitle{Diseño, implementación y evaluación experimental de una plataforma de procesamiento de señales y análisis de datos para la supervisión de sistemas aeroespaciales distribuidos en entornos complejos}'
  for pass in 1 2; do
    (cd "$fixture/Book" && pdflatex -interaction=nonstopmode -halt-on-error -jobname="$style" \
      "$definitions\input{$test_directory/fixtures/eif-advisors-cover.tex}") >"$fixture/build.log" 2>&1 || {
      tail -n 65 "$fixture/build.log" >&2; exit 1;
    }
  done
  pdf="$fixture/Book/$style.pdf"
  [[ $(pdfinfo "$pdf" | awk '/^Pages:/ {print $2}') == 2 ]]
  ! grep -Eq 'Overfull \\hbox|Overfull \\vbox' "$fixture/Book/$style.log"
  pdftohtml -xml -stdout "$pdf" >"$fixture/layout.xml" 2>"$fixture/html.log"
  python3 - "$fixture/layout.xml" "$language" "$school" <<'PY'
import sys
import xml.etree.ElementTree as ET
pages = ET.parse(sys.argv[1]).getroot().findall('page')
for page in pages:
    image = page.find('image')
    texts = page.findall('text')
    text = lambda e: ''.join(e.itertext()).strip()
    top_margin = float(image.get('top'))
    if sys.argv[3] == 'EIF':
        last = next(e for e in texts if text(e).startswith(('Curso académico:', 'Academic year:')))
    else:
        last = max(texts, key=lambda e: float(e.get('top')) + float(e.get('height')))
    bottom_margin = float(page.get('height')) - float(last.get('top')) - float(last.get('height'))
    assert abs(top_margin - bottom_margin) < 8, (top_margin, bottom_margin)
    # XML uses 1.5 pixels per PDF point. Allow font ascent differences, not
    # just equal baseline positions, when comparing the visible margins.
    assert abs(top_margin - 4 * 72 / 2.54 * 1.5) < 8, top_margin
    school = next(e for e in texts if 'ESCUELA' in text(e))
    degree = next(e for e in texts if text(e).startswith(('GRADO EN', 'BACHELOR')) and 'THESIS' not in text(e))
    author = next(e for e in texts if text(e).startswith(('Autora:', 'Author:')))
    font_sizes = {e.get('id'): float(e.get('size')) for e in page.findall('fontspec')}
    # Poppler declares fonts on the first page and reuses them thereafter.
    if font_sizes:
        sizes = font_sizes
    assert sizes[school.get('font')] > sizes[degree.get('font')]
    assert sizes[author.get('font')] < sizes[school.get('font')]
    assert float(author.get('top')) > float(degree.get('top'))
    assert bottom_margin > 0
PY
  if [[ -n ${EIF_TEST_OUTPUT_DIR:-} ]]; then
    mkdir -p "$EIF_TEST_OUTPUT_DIR"
    cp "$pdf" "$EIF_TEST_OUTPUT_DIR/$school-$style.pdf"
  fi
  echo "PASS: $school $style ($language), short/long titles, document font and balanced margins."
done
[[ $before == "$(sha256sum "$repository_root/Config/myconfig.tex")" ]]

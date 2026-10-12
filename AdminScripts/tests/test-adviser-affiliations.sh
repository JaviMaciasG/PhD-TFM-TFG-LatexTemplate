#!/usr/bin/env bash
# Compile affiliation and department fallback cases without changing user files.
set -euo pipefail
test_directory=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)
repository_root=$(cd -- "$test_directory/../.." && pwd)
fixture=$(mktemp -d)
trap 'rm -rf -- "$fixture"' EXIT
mkdir -p "$fixture/Book"
cp -a "$repository_root/Config" "$fixture/Config"
cp -a "$repository_root/Book/biblio" "$fixture/Book/"
cp "$test_directory/fixtures/adviser-affiliations.tex" "$fixture/Book/test.tex"
(
  cd "$fixture/Book"
  pdflatex -interaction=nonstopmode -halt-on-error test.tex > build.log 2>&1 || { tail -n 60 build.log >&2; exit 1; }
  pdftotext -layout test.pdf test.txt
)
while IFS= read -r expected; do
  grep -Fq "$expected" "$fixture/Book/test.txt" || { echo "FAIL: missing $expected" >&2; exit 1; }
done <<'EXPECTED'
Department: TutorDept
DepartmentEN: TutorDeptEN
Legacy: TutorDept
LegacyEN: TutorDeptEN
Tutor: TutorDept, TutorInstitution
TutorEN: TutorDeptEN, TutorInstitutionEN
Cotutor: CotutorDept, CotutorInstitution
CotutorEN: CotutorDeptEN, CotutorInstitutionEN
Fallback: CotutorDept
FallbackEN: CotutorDeptEN
InstitutionOnly: TutorInstitution
InstitutionOnlyEN: TutorInstitutionEN
DepartmentOnly: CotutorDept
DepartmentOnlyEN: CotutorDeptEN
EmptyDepartment: []
EmptyDepartmentEN: []
EmptyLegacy: []
EmptyLegacyEN: []
EmptyAffiliation: []
EmptyAffiliationEN: []
EXPECTED
echo 'PASS: Spanish/English department precedence, empty fields, affiliation composition and deprecated aliases.'

#!/usr/bin/env bash
# Check work-department independence without changing user files.
set -euo pipefail
test_directory=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)
repository_root=$(cd -- "$test_directory/../.." && pwd)
fixture=$(mktemp -d)
trap 'rm -rf -- "$fixture"' EXIT
mkdir -p "$fixture/Book"
cp -a "$repository_root/Config" "$fixture/Config"
cp -a "$repository_root/Book/biblio" "$fixture/Book/"
cp "$test_directory/fixtures/adviser-affiliations.tex" "$fixture/Book/test.tex"
for language in spanish english; do
for configuration in current legacy; do
job="departments-$language-$configuration"
legacy_option=
[[ $configuration != legacy ]] || legacy_option='\def\DepartmentTestLegacy{1}'
(
  cd "$fixture/Book"
  pdflatex -interaction=nonstopmode -halt-on-error -jobname="$job" "\def\DepartmentTestLanguage{$language}$legacy_option\input{test.tex}" > build.log 2>&1 || { tail -n 60 build.log >&2; exit 1; }
  pdftotext -layout "$job.pdf" "$job.txt"
)
initial=InitialWorkDept
initial_en=InitialWorkDeptEN
[[ $configuration != legacy ]] || { initial=; initial_en=; }
grep -Fq "AfterLoad: [$initial]" "$fixture/Book/$job.txt"
grep -Fq "AfterLoadEN: [$initial_en]" "$fixture/Book/$job.txt"
while IFS= read -r expected; do
  grep -Fq "$expected" "$fixture/Book/$job.txt" || { echo "FAIL: missing $expected" >&2; exit 1; }
done <<'EXPECTED'
Department: WorkDept
DepartmentEN: WorkDeptEN
Tutor: TutorDept, TutorInstitution
TutorEN: TutorDeptEN, TutorInstitutionEN
Cotutor: CotutorDept, CotutorInstitution
CotutorEN: CotutorDeptEN, CotutorInstitutionEN
Independent: WorkDept
IndependentEN: WorkDeptEN
InstitutionOnly: TutorInstitution
InstitutionOnlyEN: TutorInstitutionEN
DepartmentOnly: CotutorDept
DepartmentOnlyEN: CotutorDeptEN
EmptyDepartment: []
EmptyDepartmentEN: []
NoAdviserDepartments: WorkDept
NoAdviserDepartmentsEN: WorkDeptEN
ChangedAdviser: WorkDept
ChangedAdviserEN: WorkDeptEN
UnchangedEnglishDepartment: WorkDeptEN
UnchangedTutor: ChangedTutorDept, TutorInstitution
EmptyAffiliation: []
EmptyAffiliationEN: []
EXPECTED
printf 'PASS: independent work department / %s / %s configuration\n' "$language" "$configuration"
done
done

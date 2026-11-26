"""The app's small allowlist; every identifier is a template command."""

from dataclasses import dataclass


@dataclass(frozen=True)
class Setting:
    name: str
    label: str
    kind: str = "text"
    help: str = ""
    uses: str = "common"
    section: str = ""
    suffix_en: str = ""
    visible_lines: int = 0


DOCUMENT = (
    Setting("myDegree", "Titulación", "degree"),
    Setting("myLanguage", "Idioma del documento", "language"),
    Setting("myBookTitleSpanish", "Título en español", visible_lines=2),
    Setting("myBookTitleEnglish", "Título en inglés", visible_lines=2),
    Setting("myThesisKeywords", "Palabras clave en español",
            help="Separa las palabras clave con comas.", visible_lines=2),
    Setting("myThesisKeywordsEnglish", "Palabras clave en inglés",
            help="Separa las palabras clave con comas.", visible_lines=2),
)
AUTHORSHIP = (
    Setting("myAuthorName", "Nombre", "line"),
    Setting("myAuthorSurname", "Apellidos", "line"),
    Setting("myAuthorGender", "Género gramatical de la autoría", "gender"),
    Setting("myAuthorEmail", "Correo de contacto", "email"),
    Setting("myAcademicTutorFullName", "Nombre completo", "line", uses="primary-role"),
    Setting("myAcademicTutorGender", "Género gramatical", "gender", uses="primary-gender"),
    Setting("myCoTutorFullName", "Nombre completo", "line", uses="secondary-role"),
    Setting("myCoTutorGender", "Género gramatical", "gender", uses="secondary-gender"),
)
DATES = (
    Setting("myThesisAcademicYear", "Curso académico", "line", "Formato habitual: 2026/2027."),
    Setting("myThesisDefenseYear", "Año de defensa", "line", "Formato habitual: 2027."),
    Setting("myThesisProposalDate", "Fecha del anteproyecto", "date", "Ejemplo: 16 de enero de 2027.",
            uses="proposal"),
    Setting("myThesisDepositDate", "Fecha de depósito en español", "date", "Ejemplo: 15 de junio de 2027."),
    Setting("myThesisDepositDateEnglish", "Fecha de depósito en inglés", "date"),
    Setting("myThesisDefenseDate", "Fecha de defensa en español", "date",
            "Usa «día de mes de año» si tu portada extrae el mes de esta fecha."),
    Setting("myThesisdefenseDateEnglish", "Fecha de defensa en inglés", "date"),
    Setting("myThesisDepositYear", "Año de depósito", "line", uses="phd-deposit",
            help="Puede ser distinto del año de defensa."),
    Setting("myPaperworkDate", "Fecha del formulario en español", "date", uses="paperwork-date uah-phd-forms",
            section="Papeleo"),
    Setting("myPaperworkDateEnglish", "Fecha del formulario en inglés", "date",
            uses="foreign-publication", section="Papeleo"),
)
OPTIONS = (
    Setting("myTypesettingStyle", "Estilo tipográfico", "style"),
    Setting("ZenMode", "Modo zen", "boolean", "Omite portadas e índices mientras escribes."),
    Setting("myIncludeSampleLetter", "PDF preliminar de ejemplo", "boolean"),
    Setting("myIncludeDedication", "Dedicatoria", "boolean"),
    Setting("myIncludeAcknowledgements", "Agradecimientos", "boolean"),
    Setting("myIncludeListOfFigures", "Lista de figuras", "boolean"),
    Setting("myIncludeListOfTables", "Lista de tablas", "boolean"),
    Setting("myIncludeListOfAcronyms", "Lista de acrónimos", "boolean"),
    Setting("myIncludeListOfSymbols", "Lista de símbolos", "boolean"),
    Setting("myIncludeListOfCode", "Lista de código", "boolean"),
    Setting("myIncludeListOfAlgorithms", "Lista de algoritmos", "boolean"),
    Setting("myIncludeListOfVideos", "Lista de vídeos", "boolean"),
    Setting("myIncludeChapterBibliographies", "Bibliografía por capítulo", "boolean"),
    Setting("myIncludeFinalBibliography", "Bibliografía final", "boolean"),
    Setting("myBibliographyNumbering", "Numeración de referencias", "numbering"),
)


def contextual(name, es, en, uses, section="Datos institucionales", kind="line", help=""):
    return Setting(name, es, kind, help, uses, section, en)


_DETAILS = (
    contextual("mySpecialty", "Perfil o especialidad", "Specialisation", "specialty"),
    contextual("myWebsite", "Sitio web", "Website", "uclm", kind="uri"),
    contextual("myStudentRecordNumber", "Número de expediente", "Student record number", "uclm",
               help="Introduce solo el número, sin año ni código de titulación."),
    contextual("mySchoolAddress", "Dirección del centro", "School address", "uclm", kind="text",
               help="Deja el campo vacío para usar la dirección del centro incluida en la plantilla."),
    contextual("myDepartment", "Departamento donde se realiza el trabajo",
               "Department where the work is carried out", "department uah-plagiarism"),
    contextual("myDepartmentEnglish", "Departamento del trabajo en inglés",
               "Project department in English", "department-en"),
    contextual("myPhDProgram", "Programa de doctorado en español", "Doctoral programme in Spanish",
               "phd-program uah-phd-forms"),
    contextual("myPhDProgramEnglish", "Programa de doctorado en inglés", "Doctoral programme in English", "phd-program"),
    contextual("myUPMdegree", "Titulación previa en español", "Previous degree in Spanish", "upm-phd"),
    contextual("myUPMdegreeEnglish", "Titulación previa en inglés", "Previous degree in English", "upm-phd"),
    contextual("myThesisFundingStatement", "Financiación en español", "Funding statement in Spanish",
               "upm-phd", kind="text"),
    contextual("myThesisFundingStatementEnglish", "Financiación en inglés", "Funding statement in English",
               "upm-phd", kind="text"),
    contextual("myResearchReportID", "Identificador del informe", "Report identifier", "report"),
    contextual("myResearchGroup", "Grupo de investigación", "Research group", "report"),
    contextual("myCopyrightStatement", "Aviso de derechos de autor", "Copyright notice", "common"),
    contextual("myLicenseURL", "Enlace a la licencia", "Licence URL", "common", kind="uri"),
)
DOCUMENT += _DETAILS

AUTHORSHIP += (
    contextual("myPonenteFullName", "Ponente", "Academic sponsor", "sponsor"),
    contextual("myUPMTechnicalSupervisorFullName", "Supervisión técnica", "Technical supervisor", "technical"),
)

# Role-affiliation fields stay under the role's section. The work's own
# department is separate (see _DETAILS). Shared fields are not mirrored.
ROLE_SECTIONS = ("primary", "secondary")
_ROLE_DETAILS = (
    ("DNI", "DNI", "Identity document", "agreement tfg-confidential publication uah-phd-forms", "line"),
    ("Email", "Correo electrónico", "Email", "agreement uah-plagiarism uah-phd-forms", "email"),
    ("Department", "Departamento", "Department", "agreement tfg-tutor-rubric uah-plagiarism publication tfm-change uah-phd-forms", "line"),
    ("Institution", "Institución", "Institution", "agreement tfg-tutor-rubric uah-plagiarism publication tfm-change uah-phd-forms upm-phd", "line"),
    ("InstitutionEnglish", "Institución en inglés", "Institution in English", "upm-phd", "line"),
    ("Position", "Puesto profesional", "Position", "agreement uah-plagiarism upm-phd", "line"),
    ("PositionEnglish", "Puesto profesional en inglés", "Position in English", "upm-phd", "line"),
    ("IsPhD", "Tiene el grado de doctor/a", "Holds a doctoral degree",
     "eps-tfm upm-phd phd-honorifics", "boolean"),
)
for _section, _prefix in zip(ROLE_SECTIONS, ("myAcademicTutor", "myCoTutor")):
    _fields = tuple(contextual(_prefix + suffix, es, en, uses, _section, kind)
                    for suffix, es, en, uses, kind in _ROLE_DETAILS)
    _field_pos = next(i for i, item in enumerate(AUTHORSHIP) if item.name == _prefix + "Gender") + 1
    AUTHORSHIP = AUTHORSHIP[:_field_pos] + _fields + AUTHORSHIP[_field_pos:]

_COMMITTEE = "Tribunal y revisores"
for _key, _es, _en, _uses, _gender, _dni in (
    ("President", "Presidencia", "Chair", "committee-full committee-small uah-phd-forms",
     "committee-full committee-small uah-phd-forms", True),
    ("FirstSpokesperson", "Vocal 1", "Member 1", "committee-full committee-small uah-phd-forms",
     "honours tfm-proposal tfg-confidential", True),
    ("SecondSpokesperson", "Vocal 2", "Member 2", "committee-full",
     "honours tfm-proposal tfg-confidential", True),
    ("ThirdSpokesperson", "Vocal 3", "Member 3", "upm-phd", "", False),
    ("Secretary", "Secretaría", "Secretary", "committee-small uah-phd-forms", "committee-small", False),
    ("AlternateMember", "Suplente", "Alternate member", "committee-full committee-alternate", "tfg-confidential", True),
    ("SecondAlternateMember", "Suplente 2", "Alternate member 2", "upm-phd", "", False),
):
    AUTHORSHIP += (contextual("myTribunal" + _key, _es, _en, _uses, _COMMITTEE),)
    if _gender:
        AUTHORSHIP += (contextual("myTribunal" + _key + "Gender", f"{_es}: género gramatical",
                                  f"{_en}: grammatical gender", _gender, _COMMITTEE, "gender"),)
    if _dni:
        AUTHORSHIP += (contextual("myTribunal" + _key + "DNI", f"{_es}: DNI",
                                  f"{_en}: identity document", "tfg-confidential", _COMMITTEE),)
for _index, _prefix in enumerate(("myFirstExternalReviewer", "mySecondExternalReviewer"), 1):
    AUTHORSHIP += tuple(contextual(_prefix + suffix, f"Revisor/a {_index}{es}", f"Reviewer {_index}{en}",
                                    "upm-phd", _COMMITTEE)
                        for suffix, es, en in (("FullName", "", ""),
                                               ("Institution", ": institución en español", ": institution in Spanish"),
                                               ("InstitutionEnglish", ": institución en inglés", ": institution in English")))

_PAPERWORK = "Papeleo"
OPTIONS += (
    contextual("myAuthorDNI", "DNI de la persona autora", "Author’s identity document",
               "eps uah-plagiarism publication uah-phd-forms", _PAPERWORK),
    contextual("myAuthorStreet", "Calle y número", "Street address", "tfm-proposal", _PAPERWORK),
    contextual("myAuthorCity", "Población", "Town or city", "tfm-proposal", _PAPERWORK),
    contextual("myAuthorPostalCode", "Código postal", "Postal code", "tfm-proposal", _PAPERWORK),
    contextual("myAuthorProvince", "Provincia", "Province", "tfm-proposal", _PAPERWORK),
    contextual("myAuthorTelephone", "Teléfono", "Telephone", "agreement tfm-proposal", _PAPERWORK),
    contextual("myAcademicTutorForeignUniversity", "Universidad del tutor extranjero",
               "Overseas supervisor’s university", "foreign-publication", _PAPERWORK),
    contextual("myAcademicTutorForeignCity", "Ciudad del tutor extranjero", "Overseas supervisor’s city",
               "foreign-publication", _PAPERWORK),
    contextual("mySchoolDeputyDirectorFullName", "Subdirector/a del centro", "Deputy director", "agreement", _PAPERWORK),
    contextual("mySchoolDeputyDirectorGender", "Subdirección: género gramatical",
               "Deputy director: grammatical gender", "agreement", _PAPERWORK, "gender"),
    contextual("myTFMComisionPresidentGender", "Presidencia de la comisión: género gramatical",
               "Master’s thesis committee chair: grammatical gender", "tfm-proposal", _PAPERWORK, "gender"),
    contextual("myResearchVicerrector", "Vicerrectorado de investigación", "Vice-Rector for Research",
               "uah-cotutelle", _PAPERWORK),
    contextual("myAcademicTutorGrade", "Nota de tutoría (sobre 10)", "Advisor’s mark (out of 10)",
               "tfg-tutor-rubric", _PAPERWORK),
    contextual("myTribunalGrade", "Nota del tribunal (sobre 10)", "Committee’s mark (out of 10)",
               "tribunal-mark", _PAPERWORK),
    contextual("myTribunalMHProposal", "Propuesta de Matrícula de Honor", "Nomination for honours",
               "honours", _PAPERWORK, "yes-upper"),
    contextual("myConfidentialContent", "Contenido confidencial", "Confidential content",
               "muie-confidential", _PAPERWORK, "yes-title"),
    contextual("myAuthorizationOpenPublishing", "Autorizar la publicación en abierto", "Authorise open access",
               "publication", _PAPERWORK, "yes-title"),
    contextual("myAuthorizationOpenPublishingEmbargoMonths", "Embargo (meses)", "Embargo (months)",
               "tfm-publication", _PAPERWORK, "embargo"),
)
LINK_COLOURS = (
    Setting("mytoclinkcolor", "Enlaces del índice general", "colour"),
    Setting("myloflinkcolor", "Enlaces de la lista de figuras", "colour"),
    Setting("mylotlinkcolor", "Enlaces de la lista de tablas", "colour"),
    Setting("myothertoclinkcolor", "Enlaces de las listas de código, algoritmos y vídeos", "colour"),
    Setting("mylinkcolor", "Enlaces internos", "colour"),
    Setting("myurlcolor", "Enlaces web", "colour"),
    Setting("mycitecolor", "Enlaces a citas bibliográficas", "colour"),
)
_SETTING_GROUPS = (DOCUMENT, AUTHORSHIP, DATES, OPTIONS, LINK_COLOURS)
NAMES = tuple(field.name for group in _SETTING_GROUPS for field in group)
FIELD_BY_NAME = {field.name: field for group in _SETTING_GROUPS for field in group}

CHOICES = {
    "language": (("Español", "spanish"), ("Inglés", "english")),
    "gender": (("Masculino", "male"), ("Femenino", "female")),
    "boolean": (("No", "false"), ("Sí", "true")),
    "numbering": (("Global", "global"), ("Por capítulo", "chapter")),
    "yes-title": (("No", "No"), ("Sí", "Yes")),
    "yes-upper": (("No", "NO"), ("Sí", "YES")),
    "embargo": tuple((str(month), str(month)) for month in (0, 6, 12, 18, 24)),
}

"""Institutional applicability for the template's active layouts and forms.

Profiles mirror Config/layout-profiles.tex. UAH paperwork predicates are
separate: having a generic cover does not imply that EPS forms apply.
"""

from dataclasses import dataclass
from pathlib import Path


# (Spanish and English primary role), (Spanish and English secondary role).
TUTOR = (("Tutor/a", "Advisor"), ("Cotutor/a", "Co-advisor"))
URJC_SUPERVISOR = (("Tutor/a", "Supervisor"), ("Cotutor/a", "Co-supervisor"))
DIRECTOR = (("Director/a", "Advisor"), ("Codirector/a", "Co-advisor"))
SUPERVISOR = (("Director/a", "Supervisor"), ("Codirector/a", "Co-supervisor"))
TECHNICAL = ("Supervisión técnica", "Technical supervisor")
ACADEMIC = ("Supervisión académica", "Academic supervisor")

ROLES = {
    "uah-tfg-2024": TUTOR, "uah-tfc": TUTOR,
    "uah-tfm-eps": DIRECTOR, "uah-mucte": DIRECTOR, "uah-muanbd": DIRECTOR,
    "uah-muc-2026": DIRECTOR, "uah-phd": DIRECTOR,
    "urjc-iti-tfg": TUTOR, "urjc-etsii-tfg": URJC_SUPERVISOR, "urjc-eif-tfg": URJC_SUPERVISOR,
    "uclm-eiia-tfg": URJC_SUPERVISOR,
    "upm-etsit-tft": TUTOR, "upm-etsit-gisd-tfg": (TECHNICAL, ACADEMIC),
    "upm-etsit-mune-tfm": (ACADEMIC, None),
    "upm-etsist-pfg": (TUTOR[0], ("Director/a", "Director")),
    "upm-etsii-tfg": SUPERVISOR, "upm-etsii-tfm": SUPERVISOR, "upm-phd": SUPERVISOR,
    "us-etsii-tfg": SUPERVISOR, "us-etsii-miscdg-tfm": SUPERVISOR, "us-etsii-phd": DIRECTOR,
    "geintra-report": (None, None),
}

# Cover and institutional-page readers (including helper aliases).
PROFILE_FEATURES = {
    "uah-tfc": "committee-full",
    "uah-tfg-2024": "committee-full",
    "uah-tfm-eps": "committee-full phd-honorifics",
    "uah-mucte": "committee-full",
    "uah-muanbd": "committee-full",
    "uah-muc-2026": "committee-full",
    "uah-phd": "phd-program phd-honorifics",
    "urjc-iti-tfg": "committee-full department",
    "uclm-eiia-tfg": "uclm",
    "upm-etsit-tft": "sponsor committee-small committee-alternate department",
    "upm-etsit-gisd-tfg": "committee-small committee-alternate department",
    "upm-etsit-mune-tfm": "technical committee-small committee-alternate department",
    "upm-etsist-pfg": "committee-small department",
    "upm-phd": "upm-phd phd-program phd-deposit committee-full committee-small",
    "us-etsii-tfg": "department department-en",
    "us-etsii-phd": "phd-deposit phd-honorifics",
    "geintra-report": "report department department-en",
}

# These layouts render neutral row labels and do not use supervisor gender.
NEUTRAL_SUPERVISION = {"upm-etsit-gisd-tfg", "upm-etsit-mune-tfm", "us-etsii-tfg",
                       "us-etsii-miscdg-tfm"}

EPS_TFG_FORMS = {
    "TFG-AnexoIII-InformeTutorYRubrica-EPS-UAH.tex": "eps eps-tfg tfg-tutor-rubric",
    "TFG-AnexoV-ConvenioCooperacion-EPS-UAH.tex": "eps eps-tfg agreement paperwork-date",
    "TFG-AnexoVI-CompromisoConfidencialidad-EPS-UAH.tex": "eps eps-tfg tfg-confidential paperwork-date",
    "TFG-AnexoVII-AutorizacionATodosPubAbierto-EPS-UAH.tex": "publication",
    "TFG-AnexoVIII-AutorizacionTutorExtranjeroPubAbierto-EPS-UAH.tex": "foreign-publication",
    "TFG-AnexoIX-ActaYRubricaDefensa-EPS-UAH.tex": "eps eps-tfg tribunal-mark honours tfg-tutor-rubric",
}
EPS_TFM_FORMS = {
    "TFM-AnexoI-ConvenioCooperacion-EPS-UAH.tex": "eps eps-tfm agreement paperwork-date",
    "TFM-AnexoIV-SolicitudProrroga-EPS-UAH.tex": "eps eps-tfm",
    "TFM-AnexoV-SolicitudCambioTFM-EPS-UAH.tex": "eps eps-tfm tfm-change",
    "TFM-AnexoVII-HojaControlAnteproyecto-EPS-UAH.tex": "eps eps-tfm tfm-proposal specialty proposal department committee-full",
    "TFM-AnexoXI-ActaYRubricaDefensa-EPS-UAH.tex": "eps eps-tfm tribunal-mark honours department",
}


def _form_features(directory, forms):
    return {feature for path, flags in forms.items() if (directory / path).is_file()
            for feature in flags.split()}


@dataclass(frozen=True)
class Context:
    degree: object
    language: str
    features: frozenset
    known: bool

    def role(self, secondary=False):
        if not self.known:
            role = (("Persona que dirige el trabajo", "Primary advisor"),
                    ("Segunda persona que dirige el trabajo", "Secondary advisor"))[secondary]
        else:
            role = ROLES[self.degree.profile][secondary]
        return role[self.language == "english"] if role else ""


def make_context(degree, language, project):
    language = "english" if language.strip() == "english" else "spanish"
    known = degree is not None and degree.profile in ROLES
    features = {"common"}
    if known:
        features.update(PROFILE_FEATURES.get(degree.profile, "").split())
        for key, role in zip(("primary", "secondary"), ROLES[degree.profile]):
            if role:
                features.add(f"{key}-role")
                if degree.profile not in NEUTRAL_SUPERVISION:
                    features.add(f"{key}-gender")
        root = Path(project)
        if degree.work_type in {"TFG", "TFM"} and (root / "Anteproyecto/anteproyecto.tex").is_file():
            features.update(("proposal", "department"))
        if degree.institution == "UAH":
            tfg, tfm, phd = (root / name for name in ("PapeleoTFG", "PapeleoTFM", "PapeleoPHD"))
            if degree.work_type == "TFG":
                if (tfg / "TFG-AnexoII-InformeTutorPlagio-UAH.tex").is_file():
                    features.add("uah-plagiarism")
                if degree.school == "Escuela Politécnica Superior":
                    features.update(_form_features(tfg, EPS_TFG_FORMS))
            if degree.work_type == "TFM":
                if (tfm / "TFM-AnexoXII-AutorizacionPublicarAbierto.tex").is_file():
                    features.update(("publication", "tfm-publication"))
                if degree.profile == "uah-tfm-eps":
                    features.update(_form_features(tfm, EPS_TFM_FORMS))
                if (tfm / "TFM-AnexoX-VistoBuenoTutor.tex").is_file():
                    features.add("paperwork-date")
                    if degree.identifier == "MUIE":
                        features.add("muie-confidential")
            if degree.work_type == "PhD" and (phd / "02-TesisDoctoral").is_dir():
                features.add("uah-phd-forms")
                if (phd / "05-CotutelaDeTesis/PHD-SolicitudCotutela-UAH.tex").is_file():
                    features.add("uah-cotutelle")
    else:
        features.update(("primary-role", "secondary-role", "primary-gender", "secondary-gender", "proposal"))
    return Context(degree, language, frozenset(features), known)

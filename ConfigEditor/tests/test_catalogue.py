from pathlib import Path
import unittest

from config_editor.catalogue import load_degrees, load_styles
from config_editor.context import ROLES


CONFIG = Path(__file__).resolve().parents[2] / "Config"


class CatalogueTest(unittest.TestCase):
    def test_registry_inheritance_school_and_status(self):
        degrees = {item.identifier: item for item in load_degrees(CONFIG)}
        base = degrees["PHDUAH"]
        variant = degrees["PHDUAH-COMPENDIUM"]
        self.assertEqual((base.name, base.university, base.school, base.work_type, base.status),
                         (variant.name, variant.university, variant.school, variant.work_type, variant.status))
        self.assertEqual("compendium", variant.structure)
        self.assertIn("compendio", variant.label)
        self.assertEqual("legacy", degrees["IT"].status)
        self.assertEqual("Universidad Rey Juan Carlos", degrees["GII-ETSII-URJC"].university)
        self.assertIn("Informática", degrees["GII-ETSII-URJC"].school)
        self.assertEqual("upm-etsit-gisd-tfg", degrees["GISD-ETSIT-UPM"].profile)
        self.assertEqual("upm-phd", degrees["PHD-ETSII-UPM-COMPENDIUM"].profile)
        self.assertEqual("PHD-ETSII-UPM-COMPENDIUM",
                         degrees["PHD-ETSII-UPM-COMPENDIUM"].display_label("english").rpartition("(")[2][:-1])
        self.assertEqual(set(), {item.profile for item in degrees.values()} - ROLES.keys())

    def test_styles_from_project(self):
        self.assertEqual(("standard", "editorial", "modern", "framed", "shaded", "mimosis"),
                         load_styles(CONFIG))

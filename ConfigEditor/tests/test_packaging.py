from hashlib import sha256
import json
import os
from pathlib import Path
import tarfile
import tempfile
import unittest
from unittest.mock import patch
import zipfile

from build_standalone import APP
from package_bundle import bundle_files, make_archive, native_target, package_filename
from package_remote import TARGET_GROUPS, download_packages, find_run
from package_source import make_source_archive


class PackagingTest(unittest.TestCase):
    def test_target_matches_native_platform(self):
        for system, machine, expected in (
            ("Linux", "x86_64", "linux-x64"), ("Windows", "AMD64", "windows-x64"),
            ("Darwin", "arm64", "macos-arm64"), ("Darwin", "x86_64", "macos-intel"),
        ):
            with self.subTest(system=system, machine=machine):
                with patch("package_bundle.platform.system", return_value=system), \
                     patch("package_bundle.platform.machine", return_value=machine):
                    self.assertEqual(expected, native_target())

    def test_archive_keeps_executable_next_to_runtime_and_includes_checksum(self):
        for target in ("linux-x64", "windows-x64"):
            with self.subTest(target=target), tempfile.TemporaryDirectory() as temp:
                root = Path(temp)
                _, executable = bundle_files(root, target)
                executable.parent.mkdir()
                executable.write_bytes(b"stand-in executable")
                if target == "linux-x64" and os.name == "posix":
                    executable.chmod(0o755)
                runtime = executable.parent / "_internal"
                runtime.mkdir()
                (runtime / "sample-runtime").touch()
                archive = make_archive(root, target)
                if target == "linux-x64":
                    with tarfile.open(archive) as bundle:
                        names = bundle.getnames()
                        # Windows cannot set POSIX executable bits on the test fixture.
                        if os.name == "posix":
                            self.assertTrue(bundle.getmember(f"{APP}/{APP}").mode & 0o111)
                else:
                    with zipfile.ZipFile(archive) as bundle:
                        names = bundle.namelist()
                self.assertIn(f"{APP}/{executable.name}", names)
                self.assertIn(f"{APP}/_internal/sample-runtime", names)
                self.assertIn(f"{APP}/LICENSE", names)
                checksum = archive.with_name(archive.name + ".sha256").read_text()
                self.assertEqual(sha256(archive.read_bytes()).hexdigest(), checksum.split()[0])

    def test_macos_layout_uses_the_executable_inside_the_app(self):
        bundle, executable = bundle_files(Path("dist"), "macos-arm64")
        self.assertEqual(f"{APP}.app", bundle.name)
        self.assertEqual(Path("Contents") / "MacOS" / APP, executable.relative_to(bundle))

    def test_source_archive_is_self_contained_and_excludes_build_outputs(self):
        root = Path(__file__).resolve().parents[1]
        with tempfile.TemporaryDirectory() as temp:
            output = Path(temp) / "source.zip"
            with zipfile.ZipFile(make_source_archive(root, output)) as archive:
                names = set(archive.namelist())
                self.assertTrue({"Makefile", "README.md", "LICENSE", "package_remote.py",
                                 "config_editor/gui.py", "tests/test_packaging.py"} <= names)
                allowed_roots = {"config_editor", "tests"}
                self.assertTrue(all(path.count("/") <= 1 and path.split("/")[0] in allowed_roots
                                    for path in names if "/" in path))
                self.assertTrue(all(path.endswith(".py") for path in names if "/" in path))

    def test_remote_run_is_matched_by_request_and_revision(self):
        data = json.dumps([
            {"displayTitle": "Other request", "databaseId": 1, "headSha": "aaa"},
            {"displayTitle": "This request", "databaseId": 2, "headSha": "abc"},
        ])
        with patch("package_remote.gh", return_value=data):
            self.assertEqual(2, find_run("owner/repo", "This request", "abc"))
            with self.assertRaisesRegex(ValueError, "not building the local commit"):
                find_run("owner/repo", "This request", "old")

    def test_remote_macos_download_checks_both_archives_before_replacing(self):
        targets = TARGET_GROUPS["macos"]
        data = b"mock package"

        def fake_download(_repo, *args):
            folder = Path(args[-1])
            folder.mkdir()
            target = folder.name
            self.assertEqual(f"ConfigEditor-{target}", args[4])
            package = folder / package_filename(target)
            package.write_bytes(data)
            digest = "bad" if target == bad_target else sha256(data).hexdigest()
            package.with_name(package.name + ".sha256").write_text(f"{digest}  {package.name}\n")

        with tempfile.TemporaryDirectory() as temp, patch("package_remote.gh", side_effect=fake_download):
            output = Path(temp)
            original = output / package_filename(targets[0])
            original.write_bytes(b"previous package")
            bad_target = targets[1]
            with self.assertRaisesRegex(ValueError, bad_target):
                download_packages(None, 12, targets, output)
            self.assertEqual(b"previous package", original.read_bytes())
            self.assertFalse((output / package_filename(bad_target)).exists())
            bad_target = None
            files = download_packages(None, 12, targets, output)
            self.assertEqual(list(targets), [target for target in targets
                                             if output / package_filename(target) in files])
            for path in files:
                self.assertEqual(data, path.read_bytes())
                self.assertTrue(path.with_name(path.name + ".sha256").is_file())

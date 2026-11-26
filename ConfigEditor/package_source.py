"""Build a ZIP containing only the standalone configuration editor source."""

from pathlib import Path
from tempfile import TemporaryDirectory
from zipfile import ZIP_DEFLATED, ZipFile

from build_standalone import ROOT
from package_bundle import license_file


def make_source_archive(root, output):
    files = [root / name for name in (
        "Makefile", "README.md", "requirements.txt", "packaging-requirements.txt",
        "run_editor.py", "build_standalone.py", "package_bundle.py",
        "package_remote.py", "package_source.py",
    )]
    for directory in ("config_editor", "tests"):
        files.extend(sorted((root / directory).glob("*.py")))
    output.parent.mkdir(parents=True, exist_ok=True)
    with TemporaryDirectory(prefix=".editor-source-", dir=output.parent) as stage:
        staged = Path(stage) / output.name
        with ZipFile(staged, "w", compression=ZIP_DEFLATED) as archive:
            for path in files:
                archive.write(path, path.relative_to(root).as_posix())
            archive.write(license_file(root), "LICENSE")
        staged.replace(output)
    return output


if __name__ == "__main__":
    print(make_source_archive(ROOT, ROOT / "dist" / "source.zip"))

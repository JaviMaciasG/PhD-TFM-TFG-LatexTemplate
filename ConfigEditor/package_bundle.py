"""Smoke-test and archive a native bundle without losing executable metadata."""

import argparse
from hashlib import file_digest
import os
from pathlib import Path
import platform
import shutil
import subprocess
import tempfile

from build_standalone import APP, ROOT


TARGETS = {
    ("Linux", "x86_64"): "linux-x64",
    ("Windows", "amd64"): "windows-x64",
    ("Darwin", "arm64"): "macos-arm64",
    ("Darwin", "x86_64"): "macos-intel",
}


def native_target():
    system, machine = platform.system(), platform.machine().lower()
    if system == "Windows" and machine == "x86_64":
        machine = "amd64"
    if (system, machine) not in TARGETS:
        raise ValueError(f"Unsupported native target: {system} {machine}")
    return TARGETS[system, machine]


def bundle_files(dist, target):
    if target.startswith("macos-"):
        bundle = dist / f"{APP}.app"
        return bundle, bundle / "Contents" / "MacOS" / APP
    bundle = dist / APP
    executable = bundle / (f"{APP}.exe" if target == "windows-x64" else APP)
    return bundle, executable


def license_file(root=ROOT):
    standalone = root / "LICENSE"
    return standalone if standalone.is_file() else root.parent / "LICENSE"


def package_filename(target):
    suffix = ".tar.gz" if target == "linux-x64" else ".zip"
    return f"{APP}-{target}{suffix}"


def make_archive(dist, target, smoke_project=None):
    bundle, executable = bundle_files(dist, target)
    if not executable.is_file():
        raise FileNotFoundError(f"Native executable not found: {executable}")
    if smoke_project:
        subprocess.run([str(executable), "--smoke-test", str(smoke_project.resolve())],
                       env={**os.environ, "QT_QPA_PLATFORM": "offscreen"},
                       check=True, timeout=45)
    packages = dist / "packages"
    packages.mkdir(exist_ok=True)
    prefix = packages / f"{APP}-{target}"
    with tempfile.TemporaryDirectory(prefix="config-editor-package-") as stage:
        payload = Path(stage) / APP
        payload.mkdir()
        destination = payload / bundle.name if target.startswith("macos-") else payload
        shutil.copytree(bundle, destination, symlinks=True, dirs_exist_ok=True)
        shutil.copy2(ROOT / "README.md", payload)
        shutil.copy2(license_file(), payload)
        if target.startswith("macos-"):
            archive = prefix.with_suffix(".zip")
            subprocess.run(["ditto", "-c", "-k", "--sequesterRsrc", "--keepParent",
                            str(payload), str(archive)], check=True)
        else:
            kind = "zip" if target == "windows-x64" else "gztar"
            archive = Path(shutil.make_archive(str(prefix), kind, stage, APP))
    with archive.open("rb") as stream:
        digest = file_digest(stream, "sha256").hexdigest()
    archive.with_name(f"{archive.name}.sha256").write_text(f"{digest}  {archive.name}\n", encoding="ascii")
    return archive


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--dist-dir", type=Path, default=ROOT / "dist")
    parser.add_argument("--target", choices=tuple(TARGETS.values()))
    parser.add_argument("--smoke-test-project", type=Path)
    parser.add_argument("--check-platform", action="store_true", help="Validate the target without building")
    args = parser.parse_args()
    try:
        target = native_target()
    except ValueError as exc:
        parser.error(str(exc))
    if args.target and target != args.target:
        parser.error(f"Target {args.target} does not match the native platform {target}.")
    if not args.check_platform:
        print(make_archive(args.dist_dir.resolve(), target, args.smoke_test_project))


if __name__ == "__main__":
    main()

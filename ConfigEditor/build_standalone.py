"""Build the editor for the operating system and architecture of this Python."""

import argparse
from pathlib import Path
import subprocess
import sys


ROOT = Path(__file__).resolve().parent
APP = "EditorPlantillaLaTeX"


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--dist-dir", type=Path, default=ROOT / "dist")
    parser.add_argument("--build-dir", type=Path, default=ROOT / "build")
    args = parser.parse_args()
    build = args.build_dir.resolve()
    subprocess.run([
        sys.executable, "-m", "PyInstaller", "--noconfirm", "--clean",
        "--onedir", "--windowed", "--noupx", "--name", APP,
        "--distpath", str(args.dist_dir.resolve()), "--workpath", str(build / "work"),
        "--specpath", str(build / "spec"), str(ROOT / "run_editor.py"),
    ], check=True)


if __name__ == "__main__":
    main()

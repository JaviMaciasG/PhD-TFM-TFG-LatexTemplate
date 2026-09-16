#!/usr/bin/env python3
"""Stage exactly the repository-local files needed to rebuild the documents."""

from __future__ import annotations

import os
import subprocess
import sys
import tempfile
import xml.etree.ElementTree as ET
from pathlib import Path

GENERATED_SUFFIXES = {
    ".acn",
    ".acr",
    ".alg",
    ".aux",
    ".bbl",
    ".bcf",
    ".blg",
    ".fdb_latexmk",
    ".fls",
    ".glg",
    ".glo",
    ".gls",
    ".glsdefs",
    ".ilg",
    ".ind",
    ".ist",
    ".lof",
    ".log",
    ".lot",
    ".loa",
    ".nav",
    ".out",
    ".run.xml",
    ".sbl",
    ".slg",
    ".slo",
    ".sls",
    ".snm",
    ".sym",
    ".synctex",
    ".toc",
    ".vrb",
}
GENERATED_NAMES = {
    "pdf_dia_done",
    "pdf_eps_done",
    "pdf_svg_done",
}


def run(
    *args: str, cwd: Path | None = None, check: bool = True
) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        args,
        cwd=cwd,
        check=check,
        text=True,
        encoding="utf-8",
        errors="replace",
        capture_output=True,
    )


def is_official_repository(root: Path) -> bool:
    result = run(
        "git",
        "config",
        "--bool",
        "--get",
        "template.officialRepository",
        cwd=root,
        check=False,
    )
    return result.returncode == 0 and result.stdout.strip() == "true"


def is_generated(path: Path) -> bool:
    name = path.name
    if name in GENERATED_NAMES or name.endswith(".synctex.gz"):
        return True
    return any(name.endswith(suffix) for suffix in GENERATED_SUFFIXES)


def repository_path(path: Path, root: Path) -> str | None:
    try:
        resolved = path.resolve(strict=True)
        relative = resolved.relative_to(root)
    except (FileNotFoundError, ValueError):
        return None
    if not resolved.is_file() or is_generated(relative):
        return None
    return relative.as_posix()


def compile_with_recorder(root: Path, tex_file: Path) -> Path:
    directory = root / tex_file.parent
    print(f"Generating dependencies for {tex_file.as_posix()}...")
    result = run(
        "pdflatex",
        "-draftmode",
        "-interaction=nonstopmode",
        "-halt-on-error",
        "-recorder",
        tex_file.name,
        cwd=directory,
        check=False,
    )
    fls = directory / f"{tex_file.stem}.fls"
    if not fls.is_file():
        print(f"ERROR: {fls.relative_to(root)} was not generated.", file=sys.stderr)
        raise SystemExit(1)
    if result.returncode != 0:
        log = directory / f"{tex_file.stem}.log"
        print(
            f"WARNING: {tex_file.as_posix()} did not compile successfully; "
            f"using the dependencies recorded before the error.",
            file=sys.stderr,
        )
        print(f"Review {log.relative_to(root)}.", file=sys.stderr)
    return fls


def document_entry_points(root: Path) -> list[Path]:
    entries = [Path("Book/book.tex"), Path("Anteproyecto/anteproyecto.tex")]
    for directory in ("PapeleoTFG", "PapeleoTFM", "PapeleoPHD"):
        entries.extend(
            path.relative_to(root) for path in sorted((root / directory).glob("*.tex"))
        )
    return entries


def dependencies_from_fls(fls: Path, root: Path) -> set[str]:
    dependencies: set[str] = set()
    for line in fls.read_text(encoding="utf-8", errors="replace").splitlines():
        if not line.startswith("INPUT "):
            continue
        raw_path = line[6:].strip().strip('"')
        candidate = Path(raw_path)
        if not candidate.is_absolute():
            candidate = fls.parent / candidate
        relative = repository_path(candidate, root)
        if relative:
            dependencies.add(relative)
    return dependencies


def bibliography_dependencies(fls: Path, root: Path) -> set[str]:
    bcf = fls.with_suffix(".bcf")
    if not bcf.is_file():
        return set()
    try:
        tree = ET.parse(bcf)
    except ET.ParseError:
        return set()
    dependencies: set[str] = set()
    for element in tree.iter():
        if not element.tag.endswith("datasource") or not element.text:
            continue
        candidate = fls.parent / element.text.strip()
        relative = repository_path(candidate, root)
        if relative:
            dependencies.add(relative)
    return dependencies


def explicit_files(root: Path) -> set[str]:
    required = {
        ".gitignore",
        "LICENSE",
        "README.md",
        "Makefile",
        "AdminScripts/sync-git-sources.py",
        "AdminScripts/sync-git-sources.sh",
    }
    for directory in (
        Path("Config"),
        Path("Book"),
        Path("Anteproyecto"),
        Path("PapeleoTFG"),
        Path("PapeleoTFM"),
        Path("PapeleoPHD"),
    ):
        for name in ("Makefile", ".gitignore"):
            candidate = directory / name
            if (root / candidate).is_file():
                required.add(candidate.as_posix())
    return required


def changed_required_files(root: Path, required: set[str]) -> list[str]:
    changed: list[str] = []
    for path in sorted(required):
        status = run(
            "git",
            "status",
            "--short",
            "--untracked-files=all",
            "--",
            path,
            cwd=root,
        ).stdout
        if status:
            changed.append(path)
    return changed


def tracked_files(root: Path) -> set[str]:
    return set(run("git", "ls-files", cwd=root).stdout.splitlines())


def print_group(title: str, paths: list[str]) -> None:
    print(f"\n{title} ({len(paths)}):")
    if paths:
        for path in paths:
            print(f"  {path}")
    else:
        print("  (none)")


def update_index(root: Path, required: set[str], obsolete: list[str]) -> None:
    with tempfile.NamedTemporaryFile(mode="wb", delete=False) as file_list:
        list_path = Path(file_list.name)
        for path in sorted(required):
            file_list.write(os.fsencode(path) + b"\0")
    try:
        with list_path.open("rb") as input_file:
            subprocess.run(
                ["git", "add", "-f", "--pathspec-from-file=-", "--pathspec-file-nul"],
                cwd=root,
                check=True,
                stdin=input_file,
            )
    finally:
        list_path.unlink(missing_ok=True)
    if obsolete:
        subprocess.run(
            ["git", "rm", "--cached", "-f", "--ignore-unmatch", "--", *obsolete],
            cwd=root,
            check=True,
            stdout=subprocess.DEVNULL,
        )


def main() -> int:
    try:
        root = Path(run("git", "rev-parse", "--show-toplevel").stdout.strip()).resolve()
    except subprocess.CalledProcessError:
        print(
            "ERROR: this target must be run inside a Git repository.", file=sys.stderr
        )
        return 1

    if is_official_repository(root):
        print("This is the official template repository.")
        print(
            "The Git source synchronization target is disabled here; nothing was changed."
        )
        return 0

    required = explicit_files(root)
    for entry_point in document_entry_points(root):
        fls = compile_with_recorder(root, entry_point)
        required.update(dependencies_from_fls(fls, root))
        required.update(bibliography_dependencies(fls, root))

    tracked = tracked_files(root)
    to_update = changed_required_files(root, required)
    obsolete = sorted(tracked - required)

    print_group("Files to add or update", to_update)
    print_group("Files to stop tracking (they will remain on disk)", obsolete)
    if not to_update and not obsolete:
        print("\nThe Git index already matches the current document dependencies.")
        return 0

    answer = input("\nUpdate the Git index with these changes? [y/N] ").strip().lower()
    if answer not in {"y", "yes"}:
        print("Cancelled; the Git index was not changed.")
        return 0

    update_index(root, required, obsolete)
    print("\nThe Git index has been updated. No commit or push was performed.")
    print(
        "Review the result with 'git status' and create the appropriate commit when ready.\n"
    )
    subprocess.run(["git", "status", "--short"], cwd=root, check=False)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

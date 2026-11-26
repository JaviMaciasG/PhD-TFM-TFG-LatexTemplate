"""Dispatch a native editor package build and retrieve its verified archives."""

import argparse
from hashlib import file_digest
import json
from pathlib import Path
import shutil
import subprocess
import sys
from tempfile import TemporaryDirectory
import time
from uuid import uuid4

from build_standalone import ROOT
from package_bundle import package_filename


WORKFLOW = "package-config-editor.yml"
TARGET_GROUPS = {
    "windows-x64": ("windows-x64",),
    "macos": ("macos-arm64", "macos-intel"),
    "macos-arm64": ("macos-arm64",),
    "macos-intel": ("macos-intel",),
}


def selected_ref(ref):
    if ref:
        return ref, None

    def git(*args):
        return subprocess.check_output(["git", *args], cwd=ROOT.parent, text=True).strip()

    try:
        if git("status", "--porcelain", "--untracked-files=normal", "--",
               "ConfigEditor", "LICENSE", f".github/workflows/{WORKFLOW}"):
            raise ValueError("Editor packaging files have local changes. Commit and push them "
                             "first, or use PACKAGE_REF to build an existing remote revision.")
        branch = git("symbolic-ref", "--short", "HEAD")
        head = git("rev-parse", "HEAD")
        if git("rev-parse", "--verify", "@{upstream}") != head:
            raise ValueError("The current commit is not at its tracked upstream. "
                             "Push it first, or set PACKAGE_REF.")
        return branch, head
    except subprocess.CalledProcessError as exc:
        raise ValueError("Could not identify a pushed branch. Set PACKAGE_REF explicitly.") from exc


def gh(repo, *args, capture=True):
    command = ["gh", *args, *(["--repo", repo] if repo else [])]
    return subprocess.run(command, cwd=ROOT, text=True, check=True,
                          stdout=subprocess.PIPE if capture else None).stdout


def find_run(repo, title, expected_head):
    for _ in range(40):
        runs = json.loads(gh(repo, "run", "list", "--workflow", WORKFLOW, "--event",
                             "workflow_dispatch", "--limit", "100",
                             "--json", "databaseId,displayTitle,headSha"))
        for run in runs:
            if run["displayTitle"] == title:
                if expected_head and run["headSha"] != expected_head:
                    raise ValueError(f"GitHub run {run['databaseId']} is not building the local commit. "
                                     "Check the remote branch or use PACKAGE_REF explicitly.")
                return run["databaseId"]
        time.sleep(3)
    raise ValueError("The packaging run did not appear. Check the workflow in GitHub Actions.")


def download_packages(repo, run_id, targets, output):
    output.mkdir(parents=True, exist_ok=True)
    with TemporaryDirectory(prefix=".editor-packages-", dir=output) as stage:
        verified = []
        for target in targets:
            folder = Path(stage) / target
            gh(repo, "run", "download", str(run_id), "--name", f"ConfigEditor-{target}", "--dir", str(folder))
            package = folder / package_filename(target)
            checksum = package.with_name(package.name + ".sha256")
            try:
                with package.open("rb") as stream:
                    digest = file_digest(stream, "sha256").hexdigest()
                if not package.stat().st_size or checksum.read_text(encoding="ascii").split() != [digest, package.name]:
                    raise ValueError(f"Invalid package or checksum for {target}.")
            except OSError as exc:
                raise ValueError(f"Package or checksum missing from the artifact for {target}.") from exc
            verified.extend((package, checksum))
        for path in verified:
            path.replace(output / path.name)
    return [output / package_filename(target) for target in targets]


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--target", choices=TARGET_GROUPS, required=True)
    parser.add_argument("--ref", help="Pushed branch or tag (default: current tracked branch)")
    parser.add_argument("--repo", help="GitHub owner/repository (requires --ref)")
    parser.add_argument("--output-dir", type=Path, default=ROOT / "dist" / "packages" / "remote")
    args = parser.parse_args()
    if args.repo and not args.ref:
        parser.error("--repo requires --ref (set PACKAGE_REF in Make).")
    try:
        if not shutil.which("gh"):
            raise ValueError("GitHub CLI (gh) is required. Install it and run gh auth login.")
        ref, expected_head = selected_ref(args.ref)
        request_id = uuid4().hex
        title = f"Package editor {args.target} ({request_id})"
        print(f"[INF] Requesting {args.target} on {ref!r}; waiting for the new workflow run.", flush=True)
        gh(args.repo, "workflow", "run", WORKFLOW, "--ref", ref, "--raw-field", f"target={args.target}",
           "--raw-field", f"request_id={request_id}", capture=False)
        run_id = find_run(args.repo, title, expected_head)
        print(f"[INF] GitHub Actions run: {run_id}", flush=True)
        gh(args.repo, "run", "watch", str(run_id), "--exit-status", capture=False)
        for path in download_packages(args.repo, run_id, TARGET_GROUPS[args.target],
                                      args.output_dir.expanduser().resolve()):
            print(f"[INF] Verified {path}")
    except (subprocess.CalledProcessError, ValueError, OSError) as exc:
        print(f"[ERR] {exc}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

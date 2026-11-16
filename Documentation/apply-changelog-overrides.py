#!/usr/bin/env python3
"""Apply reviewed, commit-specific wording to git-cliff context JSON."""

import json
import sys
from pathlib import Path


def fail(message: str) -> None:
    print(f"ERROR: {message}", file=sys.stderr)
    raise SystemExit(1)


if len(sys.argv) != 4:
    fail("usage: apply-changelog-overrides.py OVERRIDES CONTEXT OUTPUT")

overrides_path, context_path, output_path = map(Path, sys.argv[1:])
try:
    overrides = json.loads(overrides_path.read_text(encoding="utf-8"))
    context = json.loads(context_path.read_text(encoding="utf-8"))
except (OSError, json.JSONDecodeError) as error:
    fail(str(error))

if not isinstance(overrides, dict) or not all(
    isinstance(prefix, str) and isinstance(message, str)
    for prefix, message in overrides.items()
):
    fail("override file must be a JSON object mapping commit hashes to messages")

commits = {
    commit["id"].lower(): commit
    for release in context
    for commit in release.get("commits", [])
    if isinstance(commit.get("id"), str)
}
used_prefixes = set()

for prefix, message in overrides.items():
    prefix = prefix.lower()
    matches = [commit_id for commit_id in commits if commit_id.startswith(prefix)]
    if len(matches) != 1:
        fail(
            f"commit hash prefix {prefix!r} matched {len(matches)} commits; "
            "use a unique prefix present in the tagged history"
        )
    commit = commits[matches[0]]
    commit["message"] = message
    commit["raw_message"] = message
    used_prefixes.add(prefix)

if len(used_prefixes) != len(overrides):
    fail("some changelog overrides were not applied")

try:
    output_path.write_text(
        json.dumps(context, ensure_ascii=False, separators=(",", ":")) + "\n",
        encoding="utf-8",
    )
except OSError as error:
    fail(str(error))

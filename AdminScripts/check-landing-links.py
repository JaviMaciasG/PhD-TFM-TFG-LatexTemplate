#!/usr/bin/env python3
"""Check the public Dropbox links used by the Pages landing page."""

import json
import shutil
import sys
from pathlib import Path
from tempfile import TemporaryFile
from urllib.parse import parse_qs, urlsplit
from urllib.request import urlopen
from zipfile import BadZipFile, ZipFile


ROOT = Path(__file__).resolve().parent.parent
LINKS = ROOT / "docs" / "_data" / "downloads.json"
TIMEOUT = 30


def require_option(url, key, value):
    if urlsplit(url).scheme != "https" or parse_qs(urlsplit(url).query).get(key) != [value]:
        raise ValueError(f"expected a public HTTPS URL with {key}={value}")


def open_public(url):
    # urllib's default opener follows redirects without authenticating or using a cookie jar.
    response = urlopen(url, timeout=TIMEOUT)
    if response.status != 200:
        response.close()
        raise ValueError(f"expected HTTP 200, got HTTP {response.status}")
    return response


def check_zip(url, expected_release):
    if url == "TODO":
        raise ValueError("replace TODO with the live ZIP's Dropbox share URL after publication")
    require_option(url, "dl", "1")
    with open_public(url) as response, TemporaryFile() as download:
        shutil.copyfileobj(response, download)
        with ZipFile(download) as archive:
            for member in ("Book/book.tex", "Config/myconfig.tex", "RELEASE.txt"):
                if not archive.getinfo(member).file_size:
                    raise ValueError(f"empty archive member: {member}")
            release = archive.read("RELEASE.txt").decode("utf-8").strip()
    if release != expected_release:
        raise ValueError(f"expected release {expected_release!r}, found {release!r}")
    return f"student archive, release {release}"


def check_manual(url):
    require_option(url, "raw", "1")
    with open_public(url) as response:
        content_type = response.headers.get_content_type()
        disposition = response.headers.get("Content-Disposition", "").split(";", 1)[0].strip().lower()
        if content_type != "application/pdf" or disposition != "inline":
            raise ValueError(f"expected inline PDF headers, got {content_type}, {disposition or 'no disposition'}")
        if response.read(5) != b"%PDF-":
            raise ValueError("response does not start with a PDF header")
    return "PDF served inline"


def check_folder(url):
    if urlsplit(url).scheme != "https":
        raise ValueError("expected a public HTTPS folder URL")
    with open_public(url) as response:
        path_parts = urlsplit(response.geturl()).path.lower().split("/")
        if any(part in {"login", "signin", "sign-in"} for part in path_parts):
            raise ValueError("redirected to a sign-in page")
        if response.headers.get_content_type() != "text/html":
            return "expected an HTML folder page; verify manually"
        listing = response.read()
    markers = ("01-DOWNLOAD-GUIDE.pdf", "RELEASE.txt")
    missing = [name for name in markers if name.encode() not in listing]
    if missing:
        return f"listing signals missing: {', '.join(missing)}; verify manually"
    return None


def main():
    try:
        links = json.loads(LINKS.read_text(encoding="utf-8"))
        expected_release = (ROOT / "RELEASE.txt").read_text(encoding="utf-8").strip()
        if not expected_release:
            raise ValueError("RELEASE.txt is empty")
    except (OSError, ValueError) as error:
        print(f"[FAIL] Configuration: {error}", file=sys.stderr)
        return 1

    failed = False
    for label, key, check in (
        ("ZIP", "zip_url", lambda url: check_zip(url, expected_release)),
        ("Manual", "manual_url", check_manual),
        ("Dropbox folder", "folder_url", check_folder),
    ):
        try:
            url = links[key]
            if not isinstance(url, str) or not url:
                raise ValueError(f"{key} must be a non-empty string")
            result = check(url)
        except (OSError, ValueError, KeyError, TypeError, BadZipFile, RuntimeError) as error:
            print(f"[FAIL] {label}: {error}")
            failed = True
        else:
            if label == "Dropbox folder" and result:
                print(f"[WARN] {label}: {result}")
            else:
                print(f"[OK] {label}: {result or 'public listing signals found'}")
    print("If a publication just finished, wait for Dropbox to sync and rerun this check.")
    return int(failed)


if __name__ == "__main__":
    sys.exit(main())

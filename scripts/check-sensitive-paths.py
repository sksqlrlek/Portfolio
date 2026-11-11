"""Fail CI when credentials or private-key files are tracked by Git.

.gitignore only prevents new untracked files from being added accidentally.
It cannot protect files that were already committed.
"""

from __future__ import annotations

import subprocess
import sys
from pathlib import PurePosixPath

# Documentation templates are allowed, but Gitleaks still scans their contents.
ALLOWED_TEMPLATES = {
    ".env.example",
    ".env.sample",
    ".env.template",
    ".env.dist",
}
KEY_EXTENSIONS = {".pem", ".key", ".p12", ".pfx", ".jks", ".keystore"}
PRIVATE_KEY_FILES = {"id_rsa", "id_ed25519", "id_ecdsa", "id_dsa"}
CREDENTIAL_FILES = {
    "credentials.json",
    "service-account.json",
    "service-account-key.json",
    ".npmrc",
}


def is_sensitive_path(filename: str) -> bool:
    path = PurePosixPath(filename.replace("\\", "/"))
    basename = path.name.lower()
    parts = {part.lower() for part in path.parts}

    if basename in ALLOWED_TEMPLATES:
        return False
    if basename == ".env" or basename.startswith(".env."):
        return True
    if path.suffix.lower() in KEY_EXTENSIONS:
        return True
    if basename in PRIVATE_KEY_FILES or basename in CREDENTIAL_FILES:
        return True
    if basename in {"terraform.tfstate", "terraform.tfstate.backup"}:
        return True
    if basename.endswith(".tfstate") or ".tfstate." in basename:
        return True
    if ".ssh" in parts or ".aws" in parts:
        return True
    return False


def main() -> int:
    result = subprocess.run(
        ["git", "ls-files", "-z"],
        check=True,
        capture_output=True,
    )
    tracked = [
        raw.decode("utf-8", errors="surrogateescape")
        for raw in result.stdout.split(b"\0")
        if raw
    ]
    violations = [name for name in tracked if is_sensitive_path(name)]
    if violations:
        print("::error::Sensitive filenames are tracked by Git.")
        for filename in violations:
            print(f"Blocked tracked path: {filename!r}")
        print("Remove the files from Git tracking and rotate any exposed credentials.")
        return 1
    print(f"Sensitive filename check passed ({len(tracked)} tracked files).")
    return 0


if __name__ == "__main__":
    sys.exit(main())

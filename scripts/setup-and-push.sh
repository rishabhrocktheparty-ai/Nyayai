#!/usr/bin/env bash
set -euo pipefail

BRANCH=nyaysetu-demo

git checkout -b "$BRANCH" || git checkout "$BRANCH"

git add .

git commit -m "feat: initial NYAY-Setu full stack implementation" || echo "Nothing to commit"

git push -u origin "$BRANCH"

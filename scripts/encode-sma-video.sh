#!/usr/bin/env bash
# Re-encode public/babylon/sma.mp4 for the Location card (small on-screen size).
# Requires: brew install ffmpeg
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/public/babylon/sma.mp4"
# Full-path template so the temp file ends in .mp4 (macOS `mktemp -t` does not expand XXXXXX).
TMP="$(mktemp "${TMPDIR:-/tmp}/don-diego-sma.XXXXXX.mp4")"
ffmpeg -y -i "$SRC" \
  -an \
  -vf "scale='min(720,iw)':-2,fps=30" \
  -c:v libx264 -preset slow -crf 28 \
  -pix_fmt yuv420p -movflags +faststart \
  "$TMP"
mv "$TMP" "$SRC"
chmod 644 "$SRC"

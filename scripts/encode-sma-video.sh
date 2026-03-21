#!/usr/bin/env bash
# Re-encode public/babylon/sma-video.mp4 for the Location card (small on-screen size).
# Requires: brew install ffmpeg
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/public/babylon/sma-video.mp4"
TMP="$(mktemp -t sma-video-XXXXXX.mp4)"
ffmpeg -y -i "$SRC" \
  -an \
  -vf "scale='min(720,iw)':-2,fps=30" \
  -c:v libx264 -preset slow -crf 28 \
  -pix_fmt yuv420p -movflags +faststart \
  "$TMP"
mv "$TMP" "$SRC"

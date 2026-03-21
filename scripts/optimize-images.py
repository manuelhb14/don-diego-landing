#!/usr/bin/env python3
"""
Optimize images in public/ for web: resize large images and compress.
Run with: uv run scripts/optimize-images.py
Examples:
  uv run scripts/optimize-images.py
  uv run scripts/optimize-images.py babylon --skip-webp residencias
"""
import argparse
from pathlib import Path
import sys

from PIL import Image

# Config
PUBLIC_DIR = Path(__file__).resolve().parent.parent / "public"
MAX_DIMENSION = 2400  # max width or height; images larger get resized
JPEG_QUALITY = 85
PNG_COMPRESS_LEVEL = 6  # 0-9, 6 is default
EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".JPG", ".JPEG", ".PNG", ".WEBP"}


def optimize_image(path: Path) -> tuple[bool, str]:
    """Optimize a single image in place. Returns (changed, message)."""
    try:
        with Image.open(path) as img:
            orig_size = path.stat().st_size
            need_resize = max(img.size) > MAX_DIMENSION
            if need_resize:
                img.thumbnail((MAX_DIMENSION, MAX_DIMENSION), Image.Resampling.LANCZOS)
            ext = path.suffix.lower()
            if ext in (".jpg", ".jpeg"):
                img.save(path, "JPEG", quality=JPEG_QUALITY, optimize=True)
            elif ext == ".png":
                img.save(path, "PNG", compress_level=PNG_COMPRESS_LEVEL, optimize=True)
            elif ext == ".webp":
                img.save(path, "WEBP", quality=85, method=6)
            else:
                return False, f"skip (unsupported: {ext})"
            new_size = path.stat().st_size
            saved = orig_size - new_size
            return True, f"saved {saved // 1024} KiB"
    except Exception as e:
        return False, str(e)


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Optimize images under public/ (resize if > max dimension, recompress)."
    )
    parser.add_argument(
        "paths",
        nargs="*",
        metavar="SUBPATH",
        help="One or more paths relative to public/ (default: entire public/)",
    )
    parser.add_argument(
        "--skip-webp",
        action="store_true",
        help="Do not process .webp files (e.g. when optimizing only raster sources in a mixed folder)",
    )
    args = parser.parse_args()

    if not PUBLIC_DIR.is_dir():
        print(f"Error: {PUBLIC_DIR} not found", file=sys.stderr)
        return 1

    roots: list[Path]
    if args.paths:
        roots = []
        for p in args.paths:
            root = (PUBLIC_DIR / p).resolve()
            try:
                root.relative_to(PUBLIC_DIR.resolve())
            except ValueError:
                print(f"Error: path must stay under {PUBLIC_DIR}", file=sys.stderr)
                return 1
            if not root.is_dir():
                print(f"Error: not a directory: {root}", file=sys.stderr)
                return 1
            roots.append(root)
    else:
        roots = [PUBLIC_DIR]

    skip_webp = args.skip_webp
    total_saved = 0
    total_files = 0
    seen: set[Path] = set()
    for root in roots:
        for path in sorted(root.rglob("*")):
            if not path.is_file() or path.suffix not in EXTENSIONS:
                continue
            if skip_webp and path.suffix.lower() == ".webp":
                continue
            resolved = path.resolve()
            if resolved in seen:
                continue
            seen.add(resolved)
            total_files += 1
            before = path.stat().st_size
            changed, msg = optimize_image(path)
            if changed:
                after = path.stat().st_size
                total_saved += before - after
                print(f"  {path.relative_to(PUBLIC_DIR)} — {msg}")
            else:
                print(f"  {path.relative_to(PUBLIC_DIR)} — {msg}")
    print(f"\nProcessed {total_files} images, saved {total_saved // 1024} KiB total.")
    return 0


if __name__ == "__main__":
    sys.exit(main())

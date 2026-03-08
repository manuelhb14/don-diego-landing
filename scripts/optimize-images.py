#!/usr/bin/env python3
"""
Optimize images in public/ for web: resize large images and compress.
Run with: uv run scripts/optimize-images.py
"""
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
    if not PUBLIC_DIR.is_dir():
        print(f"Error: {PUBLIC_DIR} not found", file=sys.stderr)
        return 1
    total_saved = 0
    total_files = 0
    for path in sorted(PUBLIC_DIR.rglob("*")):
        if path.is_file() and path.suffix in EXTENSIONS:
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

#!/usr/bin/env python3
"""
Optimize images in public/ for web: resize large images and compress.

  uv run scripts/optimize-images.py [SUBPATH ...]

Convert PNG/JPEG to lossy WebP (writes/updates stem.webp; then switch paths in the app to .webp):

  uv run scripts/optimize-images.py babylon --to-webp
  uv run scripts/optimize-images.py babylon residencias --to-webp --delete-sources

Recompress in place (no format change): omit --to-webp. --skip-webp skips .webp files in that mode.
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
WEBP_QUALITY = 85
WEBP_METHOD = 6  # 0-6, higher = smaller/slower
# Match path.suffix.lower()
RASTER_EXT = {".jpg", ".jpeg", ".png"}
EXTENSIONS = RASTER_EXT | {".webp"}


def convert_to_webp(path: Path, *, delete_source: bool) -> tuple[bool, str]:
    """Write public/.../stem.webp from a PNG or JPEG. Optionally remove the source file."""
    out = path.with_suffix(".webp")
    try:
        src_size = path.stat().st_size
        with Image.open(path) as img:
            img.load()
            if max(img.size) > MAX_DIMENSION:
                img.thumbnail((MAX_DIMENSION, MAX_DIMENSION), Image.Resampling.LANCZOS)
            img.save(
                out,
                "WEBP",
                quality=WEBP_QUALITY,
                method=WEBP_METHOD,
            )
        out_size = out.stat().st_size
        saved = src_size - out_size
        msg = f"wrote {out.name} ({out_size / 1024:.1f} KiB vs {src_size / 1024:.1f} KiB src"
        if saved > 0:
            msg += f", −{saved / 1024:.1f} KiB"
        msg += ")"
        if delete_source:
            path.unlink()
            msg += " — deleted source"
        return True, msg
    except Exception as e:
        if out.exists():
            try:
                out.unlink()
            except OSError:
                pass
        return False, str(e)


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
                img.save(path, "WEBP", quality=WEBP_QUALITY, method=WEBP_METHOD)
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
        help="Do not process .webp files (in-place mode only)",
    )
    parser.add_argument(
        "--to-webp",
        action="store_true",
        help="Encode PNG/JPEG to lossy WebP (writes stem.webp; use --delete-sources to remove originals)",
    )
    parser.add_argument(
        "--delete-sources",
        action="store_true",
        help="With --to-webp only: delete each source PNG/JPEG after a successful write",
    )
    args = parser.parse_args()
    if args.delete_sources and not args.to_webp:
        print("Error: --delete-sources requires --to-webp", file=sys.stderr)
        return 1

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
    to_webp = args.to_webp
    delete_sources = args.delete_sources
    total_saved = 0
    total_files = 0
    seen: set[Path] = set()
    for root in roots:
        for path in sorted(root.rglob("*")):
            if not path.is_file():
                continue
            suf = path.suffix.lower()
            if to_webp:
                if suf not in RASTER_EXT:
                    continue
            elif suf not in EXTENSIONS:
                continue
            if not to_webp and skip_webp and suf == ".webp":
                continue
            resolved = path.resolve()
            if resolved in seen:
                continue
            seen.add(resolved)
            total_files += 1
            if to_webp:
                rel = path.relative_to(PUBLIC_DIR)
                before = path.stat().st_size
                out_path = path.with_suffix(".webp")
                changed, msg = convert_to_webp(path, delete_source=delete_sources)
                if changed and out_path.exists():
                    total_saved += before - out_path.stat().st_size
                print(f"  {rel} — {msg}")
            else:
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

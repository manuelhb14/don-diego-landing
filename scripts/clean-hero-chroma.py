#!/usr/bin/env python3
"""Remove generated magenta matte from Don Diego hero PNG assets.

The cleanup intentionally skips glow and sky-gradient files. Glows are authored
as full-frame effects, and removing their matte needs a separate art pass.
"""

from __future__ import annotations

import argparse
import shutil
import time
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter


SKIP_EXACT = {
    "02_bird_set_1_sprite.png",
    "02_bird_set_1_transparent.png",
}
SKIP_PREFIXES = (
    "01_sun_glow_",
    "02_sky_gradient_",
)
PROTECTED_TOKENS = (
    "pink_flower",
    "lavender",
    "white_flower",
)
MAGENTA_NEUTRALIZE_TOKENS = (
    "airy_tree",
)
CLOUD_TOKENS = (
    "nube_",
)
RAIN_CLOUD_TOKENS = (
    "nube_lluvia_",
)


def key_stats(arr: np.ndarray) -> tuple[np.ndarray, float]:
    height, width = arr.shape[:2]
    sample = max(3, min(height, width) // 24)
    edge_samples = np.concatenate(
        [
            arr[:sample, :, :3].reshape(-1, 3),
            arr[height - sample :, :, :3].reshape(-1, 3),
            arr[:, :sample, :3].reshape(-1, 3),
            arr[:, width - sample :, :3].reshape(-1, 3),
        ],
        axis=0,
    )
    key = np.median(edge_samples, axis=0).astype(np.float32)
    red, green, blue = key
    return key, float((red + blue) / 2 - green)


def border_connected(binary: np.ndarray) -> np.ndarray:
    height, width = binary.shape
    image = Image.fromarray(binary.astype(np.uint8) * 255, "L")
    pixels = image.load()

    for xy in ((0, 0), (width - 1, 0), (0, height - 1), (width - 1, height - 1)):
        if pixels[xy[0], xy[1]] == 255:
            ImageDraw.floodfill(image, xy, 128, thresh=0)

    for x in range(width):
        if pixels[x, 0] == 255:
            ImageDraw.floodfill(image, (x, 0), 128, thresh=0)
        if pixels[x, height - 1] == 255:
            ImageDraw.floodfill(image, (x, height - 1), 128, thresh=0)

    for y in range(height):
        if pixels[0, y] == 255:
            ImageDraw.floodfill(image, (0, y), 128, thresh=0)
        if pixels[width - 1, y] == 255:
            ImageDraw.floodfill(image, (width - 1, y), 128, thresh=0)

    return np.array(image) == 128


def dilate(mask: np.ndarray, size: int) -> np.ndarray:
    image = Image.fromarray(mask.astype(np.uint8) * 255, "L")
    return np.array(image.filter(ImageFilter.MaxFilter(size))) > 0


def crop_alpha(image: Image.Image, pad: int = 8, keep_full: bool = False) -> Image.Image:
    if keep_full:
        return image

    bbox = image.getchannel("A").getbbox()
    if bbox is None:
        return image

    left, top, right, bottom = bbox
    return image.crop(
        (
            max(0, left - pad),
            max(0, top - pad),
            min(image.width, right + pad),
            min(image.height, bottom + pad),
        )
    )


def clean_lantern_on(image: Image.Image) -> Image.Image:
    arr = np.array(image.convert("RGBA")).astype(np.float32)
    rgb = arr[..., :3]
    alpha = arr[..., 3]
    red, green, blue = rgb[..., 0], rgb[..., 1], rgb[..., 2]
    height, width = alpha.shape
    y = np.arange(height)[:, None]
    x = np.arange(width)[None, :]

    magenta_panel = (
        (alpha > 20)
        & (red > 135)
        & (blue > 115)
        & (green < 145)
        & (((red + blue) / 2 - green) > 58)
        & ((red + blue - 2 * green) > 95)
    )
    arr[magenta_panel, 3] = 0

    right_pane_glint = (
        (arr[..., 3] > 20)
        & (x > width * 0.62)
        & (y > height * 0.18)
        & (y < height * 0.95)
        & (red > 120)
        & (blue > 85)
        & (red > green - 6)
        & (blue > green - 22)
    )
    arr[right_pane_glint, 3] = 0
    arr[arr[..., 3] < 2, :3] = 0
    return Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8), "RGBA")


def neutralize_magenta_bias(cleaned: np.ndarray, source: np.ndarray, path_name: str) -> np.ndarray:
    if not any(token in path_name for token in MAGENTA_NEUTRALIZE_TOKENS):
        return cleaned

    rgb = source[..., :3]
    red, green, blue = rgb[..., 0], rgb[..., 1], rgb[..., 2]
    alpha = cleaned[..., 3]
    height = alpha.shape[0]
    y = np.arange(height)[:, None]
    magenta_score = (red + blue) / 2 - green
    contaminated = (
        (alpha > 0)
        & (magenta_score > 16)
        & (red > green + 8)
        & (blue > green + 8)
    )
    if not contaminated.any():
        return cleaned

    luminance = 0.299 * red + 0.587 * green + 0.114 * blue
    foliage = y < height * 0.72
    foliage_neutral = np.stack(
        [
            np.minimum(255, luminance * 1.1 + 22),
            np.minimum(255, luminance * 1.02 + 12),
            np.maximum(0, luminance * 0.58 + 8),
        ],
        axis=2,
    )
    trunk_neutral = np.stack(
        [
            np.minimum(255, luminance * 0.98 + 20),
            np.minimum(255, luminance * 0.74 + 12),
            np.maximum(0, luminance * 0.42 + 6),
        ],
        axis=2,
    )
    neutral = np.where(foliage[..., None], foliage_neutral, trunk_neutral)
    blend = np.where(contaminated[..., None], 0.78, 0)
    cleaned[..., :3] = cleaned[..., :3] * (1 - blend) + neutral * blend

    hot_matte = contaminated & (magenta_score > 70) & (red > 110) & (blue > 110)
    alpha[hot_matte] *= 0.5
    cleaned[..., 3] = alpha
    return cleaned


def clean_cloud_bias(image: Image.Image) -> Image.Image:
    """Remove hot magenta halos and color spill left on soft cloud edges."""

    arr = np.array(image.convert("RGBA")).astype(np.float32)
    rgb = arr[..., :3]
    alpha = arr[..., 3]
    red, green, blue = rgb[..., 0], rgb[..., 1], rgb[..., 2]
    magenta_score = (red + blue) / 2 - green

    transparent = alpha < 16
    fringe_zone = dilate(transparent, 17) & (alpha > 0)
    hot_magenta = (
        (magenta_score > 28)
        & (red > 112)
        & (blue > 90)
        & (green < 205)
    )
    hard_fringe = fringe_zone & hot_magenta
    alpha[hard_fringe] = 0

    soft_zone = dilate(transparent, 35) & (alpha > 0)
    soft_fringe = (
        soft_zone
        & (magenta_score > 18)
        & (red > 100)
        & (blue > 80)
        & (green < 218)
    )
    if soft_fringe.any():
        fringe_strength = np.clip((magenta_score - 18) / 80, 0, 1)
        alpha[soft_fringe] = np.minimum(
            alpha[soft_fringe],
            255 * (1 - 0.65 * fringe_strength[soft_fringe]),
        )

    remaining = (
        (alpha > 0)
        & (magenta_score > 4)
        & (red > 85)
        & (blue > 68)
    )
    if remaining.any():
        luminance = 0.299 * red + 0.587 * green + 0.114 * blue
        warm_cloud = np.stack(
            [
                np.minimum(255, luminance + 42),
                np.minimum(255, luminance + 36),
                np.maximum(0, luminance + 8),
            ],
            axis=2,
        )
        neutral_edge = np.stack(
            [
                np.minimum(255, luminance + 24),
                np.minimum(255, luminance + 23),
                np.minimum(255, luminance + 18),
            ],
            axis=2,
        )
        soft_edge = dilate(alpha < 220, 15)
        target = np.where(soft_edge[..., None], neutral_edge, warm_cloud)
        blend = np.clip((magenta_score - 4) / 62, 0, 0.96)[..., None]
        arr[..., :3] = np.where(
            remaining[..., None],
            arr[..., :3] * (1 - blend) + target * blend,
            arr[..., :3],
        )

        green_lift = np.clip((magenta_score - 2) / 80, 0, 0.21)
        arr[..., 1] = np.where(
            alpha > 0,
            np.minimum(255, arr[..., 1] + green_lift * 36),
            arr[..., 1],
        )

    arr[..., 3] = alpha
    arr[arr[..., 3] < 2, :3] = 0
    return Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8), "RGBA")


def clean_rain_cloud_bias(image: Image.Image) -> Image.Image:
    """Keep rain clouds neutral gray after removing the magenta matte."""

    arr = np.array(image.convert("RGBA")).astype(np.float32)
    rgb = arr[..., :3]
    alpha = arr[..., 3]
    red, green, blue = rgb[..., 0], rgb[..., 1], rgb[..., 2]
    magenta_score = (red + blue) / 2 - green
    visible = alpha > 0

    hot_edge = (
        visible
        & (alpha < 230)
        & (magenta_score > 4)
        & (red > green + 2)
        & (blue > green + 2)
    )
    alpha[hot_edge & (alpha < 34)] = 0
    alpha[hot_edge & (alpha >= 34)] *= 0.72

    tinted = (
        (alpha > 0)
        & (magenta_score > -1)
        & ((red > green + 1) | (blue > green + 2))
    )
    if tinted.any():
        luminance = 0.299 * red + 0.587 * green + 0.114 * blue
        cool_gray = np.stack(
            [
                np.clip(luminance + 7, 0, 255),
                np.clip(luminance + 10, 0, 255),
                np.clip(luminance + 13, 0, 255),
            ],
            axis=2,
        )
        edge = alpha < 230
        strength = np.clip((magenta_score + 1) / 16, 0.28, 0.92)
        strength = np.where(edge, np.maximum(strength, 0.78), strength)
        blend = np.where(tinted, strength, 0)[..., None]
        arr[..., :3] = arr[..., :3] * (1 - blend) + cool_gray * blend

    arr[..., 3] = alpha
    arr[arr[..., 3] < 2, :3] = 0
    return Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8), "RGBA")


def clean_asset(path: Path) -> Image.Image | None:
    image = Image.open(path).convert("RGBA")
    arr = np.array(image).astype(np.float32)
    key, score = key_stats(arr)

    if score < 90:
        return None

    protected = any(token in path.name for token in PROTECTED_TOKENS)
    rgb = arr[..., :3]
    red, green, blue = rgb[..., 0], rgb[..., 1], rgb[..., 2]
    distance = np.linalg.norm(rgb - key, axis=2)
    magenta_score = (red + blue) / 2 - green

    traversable = (distance < 138) | (
        (magenta_score > 102) & (green < 132) & (red > 128) & (blue > 112)
    )
    background = border_connected(traversable)

    if protected:
        hard_matte = (distance < 42) | (
            (magenta_score > 190) & (green < 60) & (red > 170) & (blue > 145)
        )
    else:
        hard_matte = (
            (distance < 58)
            | (
                (distance < 120)
                & (magenta_score > 68)
                & (green < 132)
                & (red > 138)
                & (blue > 122)
            )
            | (
                (magenta_score > 98)
                & (green < 110)
                & (red > 145)
                & (blue > 124)
            )
        )

    background = background | hard_matte
    ring = dilate(background, 9 if not protected else 5) & ~background
    rim = ring & (magenta_score > 42) & (red > 94) & (blue > 94) & (green < 178)

    if not protected:
        background = background | (
            rim & ((distance < 155) | ((magenta_score > 72) & (green < 138)))
        )
        ring = dilate(background, 5) & ~background
        rim = ring & (magenta_score > 35) & (red > 92) & (blue > 92) & (green < 180)

    cleaned = arr.copy()
    alpha = cleaned[..., 3].copy()
    alpha[background] = 0

    if rim.any():
        magenta_strength = np.clip((magenta_score - 35) / 160, 0, 1)
        distance_strength = np.clip((150 - distance) / 115, 0, 1)
        strength = magenta_strength * distance_strength
        alpha[rim] = np.minimum(alpha[rim], 255 * (1 - 0.72 * strength[rim]))

        luminance = 0.299 * red + 0.587 * green + 0.114 * blue
        neutral = np.stack(
            [
                np.minimum(255, luminance + 16),
                np.minimum(255, luminance + 12),
                np.minimum(255, luminance + 8),
            ],
            axis=2,
        )
        blend = (0.55 * strength)[..., None]
        cleaned[..., :3] = cleaned[..., :3] * (1 - blend) + neutral * blend

    cleaned[..., 3] = alpha
    cleaned = neutralize_magenta_bias(cleaned, arr, path.name)
    cleaned[cleaned[..., 3] < 2, :3] = 0

    output = Image.fromarray(np.clip(cleaned, 0, 255).astype(np.uint8), "RGBA")
    keep_full = path.name.startswith("02_hills") or path.name == "06_pond.png"
    output = crop_alpha(output, pad=8, keep_full=keep_full)

    if path.name.startswith(CLOUD_TOKENS):
        output = crop_alpha(clean_cloud_bias(output), pad=8, keep_full=keep_full)

    if path.name.startswith(RAIN_CLOUD_TOKENS):
        output = crop_alpha(clean_rain_cloud_bias(output), pad=8, keep_full=keep_full)

    if path.name == "03_lantern_scone_on.png":
        output = crop_alpha(clean_lantern_on(output), pad=8, keep_full=keep_full)

    return output


def should_skip(path: Path) -> bool:
    return path.name in SKIP_EXACT or path.name.startswith(SKIP_PREFIXES)


def clean_directory(source: Path, output: Path, clear: bool) -> int:
    if clear and output.exists():
        for asset in output.glob("*.png"):
            if asset.name.startswith(SKIP_PREFIXES):
                continue
            asset.unlink()

    output.mkdir(parents=True, exist_ok=True)
    processed = 0

    for path in sorted(source.glob("*.png")):
        if path.parent == output or should_skip(path):
            continue

        cleaned = clean_asset(path)
        if cleaned is None:
            continue

        cleaned.save(output / path.name, optimize=True)
        processed += 1

    return processed


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--source", type=Path, default=Path("public/hero"))
    parser.add_argument("--output", type=Path, default=Path("public/hero/clean"))
    parser.add_argument(
        "--clear",
        action="store_true",
        help="Remove old non-glow PNG outputs before writing cleaned assets.",
    )
    args = parser.parse_args()

    start = time.time()
    count = clean_directory(args.source, args.output, args.clear)
    print(f"Cleaned {count} hero assets into {args.output} in {time.time() - start:.1f}s")


if __name__ == "__main__":
    main()

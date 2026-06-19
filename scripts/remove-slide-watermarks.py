"""
Remove faint circular corner watermarks from campus album slide images.
"""

from __future__ import annotations

from pathlib import Path

import cv2
import numpy as np

ROOT = Path(__file__).resolve().parents[1]
SLIDES_DIR = ROOT / "public" / "images" / "slides"
SKIP_FILES = {"placement-2025-26.png"}

PHOTO_INPAINTS: dict[str, list[tuple[int, int, int]]] = {
    "kalika-26.jpg": [(164, 1466, 11)],
    "yuga-26.jpg": [(100, 1485, 17)],
    "excellence-day-25.png": [(84, 898, 28)],
    "achievements-2025.jpg": [(202, 1439, 40)],
    "industry-campus.jpg": [(35, 895, 24)],
    "thrikonam-25.png": [(347, 924, 20)],
}


def build_mask(height: int, width: int, center: tuple[int, int], radius: int) -> np.ndarray:
    mask = np.zeros((height, width), dtype=np.uint8)
    cv2.circle(mask, center, radius, 255, thickness=-1)
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
    return cv2.dilate(mask, kernel, iterations=1)


def feather_mask(mask: np.ndarray, radius: int) -> np.ndarray:
    blur = max(5, radius // 2)
    if blur % 2 == 0:
        blur += 1
    return np.clip(cv2.GaussianBlur(mask.astype(np.float32), (blur, blur), 0) / 255.0, 0, 1)


def sample_edge_color(bgr: np.ndarray) -> np.ndarray:
    height, width = bgr.shape[:2]
    bottom = bgr[height - 10 : height, 80 : min(width, 260)]
    left = bgr[height - 240 : height - 70, 0:10]
    pixels = np.vstack([bottom.reshape(-1, 3), left.reshape(-1, 3)])
    return np.median(pixels, axis=0)


def repair_corner(bgr: np.ndarray) -> np.ndarray:
    height, width = bgr.shape[:2]
    radius = max(18, int(min(height, width) * 0.022))
    center = (radius + 8, height - radius - 8)
    fill_color = sample_edge_color(bgr)

    mask = build_mask(height, width, center, radius)
    fill = np.full_like(bgr, fill_color)
    alpha = feather_mask(mask, radius)[:, :, np.newaxis]
    return np.clip(
        bgr.astype(np.float32) * (1 - alpha) + fill.astype(np.float32) * alpha,
        0,
        255,
    ).astype(np.uint8)


def inpaint_spots(bgr: np.ndarray, spots: list[tuple[int, int, int]]) -> np.ndarray:
    height, width = bgr.shape[:2]
    for cx, cy, radius in spots:
        mask = build_mask(height, width, (cx, cy), radius)
        bgr = cv2.inpaint(bgr, mask, inpaintRadius=4, flags=cv2.INPAINT_NS)
    return bgr


def process_image(path: Path) -> bool:
    data = np.fromfile(str(path), dtype=np.uint8)
    image = cv2.imdecode(data, cv2.IMREAD_UNCHANGED)
    if image is None:
        return False

    if image.ndim == 2:
        image = cv2.cvtColor(image, cv2.COLOR_GRAY2BGR)

    has_alpha = image.shape[2] == 4
    bgr = image[:, :, :3] if has_alpha else image.copy()
    alpha = image[:, :, 3] if has_alpha else None

    if path.name not in SKIP_FILES:
        bgr = repair_corner(bgr)

    spots = PHOTO_INPAINTS.get(path.name)
    if spots:
        bgr = inpaint_spots(bgr, spots)

    output = np.dstack([bgr, alpha]) if has_alpha else bgr
    ext = path.suffix.lower()
    params = [cv2.IMWRITE_PNG_COMPRESSION, 3] if ext == ".png" else [cv2.IMWRITE_JPEG_QUALITY, 96]
    ok, encoded = cv2.imencode(ext, output, params)
    if not ok:
        return False

    encoded.tofile(str(path))
    print(f"OK: {path.name}")
    return True


def main() -> None:
    files = sorted(
        p for p in SLIDES_DIR.iterdir() if p.suffix.lower() in {".jpg", ".jpeg", ".png"}
    )
    count = sum(process_image(path) for path in files)
    print(f"\nUpdated {count}/{len(files)} images.")


if __name__ == "__main__":
    main()

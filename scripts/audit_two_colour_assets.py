"""Pixel-level audit of runtime raster assets against the two-colour palette.

Requires Pillow and NumPy. Run with: python scripts/audit_two_colour_assets.py
"""
from pathlib import Path
import re
import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
ALLOWED = {(60, 36, 21), (221, 217, 206)}

for filename in ('vastoco-logo.png', 'house-cutaway.webp', 'project-residential.webp', 'project-interior.webp', 'project-vastu.webp'):
    image = Image.open(ROOT / 'public' / 'assets' / filename).convert('RGBA')
    pixels = np.asarray(image)
    visible = pixels[:, :, 3] > 0
    actual = {tuple(map(int, rgb)) for rgb in pixels[:, :, :3][visible]}
    unexpected = actual - ALLOWED
    if unexpected:
        raise SystemExit(f'{filename}: unexpected visible colours {sorted(unexpected)}')
    print(f'PASS {filename}: {len(actual)} visible colour(s), approved palette only')

for path in (ROOT / 'public' / 'assets').glob('*.svg'):
    values = {value.upper() for value in re.findall(r'#[0-9A-Fa-f]{3,8}', path.read_text())}
    unexpected = values - {'#3C2415', '#DDD9CE'}
    if unexpected:
        raise SystemExit(f'{path.name}: unexpected SVG colours {sorted(unexpected)}')
    print(f'PASS {path.name}: SVG palette approved')

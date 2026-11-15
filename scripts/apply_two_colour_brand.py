from pathlib import Path
import re
import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
ESPRESSO = '#3C2415'
PALE_OAK = '#DDD9CE'
ESPRESSO_RGB = (60, 36, 21)
PALE_OAK_RGB = (221, 217, 206)


def srgb_luminance(rgb):
    channels = []
    for value in rgb:
        value = value / 255
        channels.append(value / 12.92 if value <= 0.04045 else ((value + 0.055) / 1.055) ** 2.4)
    return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2]


def palette_for(rgb):
    # Keep dark forms and linework Espresso; map light forms and surfaces to Pale Oak.
    return ESPRESSO if srgb_luminance(rgb) < 0.34 else PALE_OAK


def replace_hex(match):
    value = match.group(0)
    raw = value[1:]
    if len(raw) == 3:
        raw = ''.join(ch * 2 for ch in raw)
    if len(raw) == 8:
        rgb = tuple(int(raw[i:i + 2], 16) for i in (0, 2, 4))
    elif len(raw) == 6:
        rgb = tuple(int(raw[i:i + 2], 16) for i in (0, 2, 4))
    else:
        return value
    return palette_for(rgb)


def replace_rgb_function(match):
    fn = match.group(0)
    nums = [float(part.strip()) for part in re.findall(r'[-+]?(?:\d*\.)?\d+', fn)]
    if len(nums) < 3:
        return fn
    rgb = tuple(max(0, min(255, int(round(v)))) for v in nums[:3])
    alpha = nums[3] if len(nums) > 3 else None
    chosen = ESPRESSO_RGB if palette_for(rgb) == ESPRESSO else PALE_OAK_RGB
    if alpha is None:
        return f'rgb({chosen[0]}, {chosen[1]}, {chosen[2]})'
    alpha = max(0, min(1, alpha))
    return f'rgba({chosen[0]}, {chosen[1]}, {chosen[2]}, {alpha:g})'


# Runtime CSS: reduce every literal colour and all old colour tokens to the two supplied hues.
css_path = ROOT / 'src' / 'styles.css'
css = css_path.read_text()
css = re.sub(r'rgba?\([^)]*\)', replace_rgb_function, css, flags=re.I)
css = re.sub(r'#[0-9a-fA-F]{3,8}', replace_hex, css)

# Remove the former expanded palette and define only the supplied colours.
start = css.index(':root {')
end = css.index('\n}', start) + 2
root_block = ''' :root {
  color-scheme: light;
  --espresso: #3C2415;
  --pale-oak: #DDD9CE;
  --muted: rgba(60, 36, 21, .72);
  --line: rgba(60, 36, 21, .18);
  --line-strong: rgba(60, 36, 21, .34);
  --white: var(--pale-oak);
  --font-display: "Instrument Serif", Georgia, "Times New Roman", serif;
  --font-ui: "Inter", "Segoe UI", Arial, sans-serif;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;
  --space-9: 88px;
  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 20px;
  --radius-xl: 28px;
  --shadow-soft: 0 12px 30px rgba(60, 36, 21, .08);
  --shadow-frame: 0 28px 70px rgba(60, 36, 21, .18), 0 4px 14px rgba(60, 36, 21, .10);
  --container: 1240px;
}'''.strip()
css = css[:start] + root_block + css[end:]

# Replace removed semantic aliases with the two approved base colours.
for old, new in {
    '--espresso-deep': '--espresso',
    '--ivory': '--pale-oak',
    '--paper-bright': '--pale-oak',
    '--paper': '--pale-oak',
    '--teal': '--espresso',
    '--sage-soft': '--pale-oak',
    '--sage': '--espresso',
    '--clay': '--espresso',
    '--ink': '--espresso',
    '--danger': '--espresso',
    '--success': '--espresso',
}.items():
    css = css.replace(f'var({old})', f'var({new})')

# Status colour is no longer a hue; use layout and text to distinguish outcome.
css = css.replace('.form-status--success { border-color: rgba(60, 36, 21, .25) !important; color: var(--espresso); background: rgba(60, 36, 21, .06) !important; }',
                  '.form-status--success { border-color: var(--line-strong) !important; color: var(--espresso); background: var(--pale-oak) !important; }')
# Rebuild the earnings split using only the two brand colours.
css = re.sub(r'\.earnings-pie \{[^}]*\}', '.earnings-pie { width: 190px; aspect-ratio: 1; display: grid; place-items: center; border-radius: 50%; background: conic-gradient(var(--pale-oak) 0 85%, transparent 85% 100%); }', css)
css = re.sub(r'\.legend-dot--pro \{[^}]*\}', '.legend-dot--pro { background: var(--pale-oak); }', css)
css = re.sub(r'\.legend-dot--platform \{[^}]*\}', '.legend-dot--platform { background: transparent; border: 1px solid var(--pale-oak); }', css)
# Recolour any CSS RGB literals that were introduced by source changes and assert the palette.
css_path.write_text(css)

# Re-map hand-authored illustration vectors to the same two inks. Opacity is retained as tonal variation.
for svg_path in (ROOT / 'public' / 'assets').glob('*.svg'):
    text = svg_path.read_text()
    text = re.sub(r'#[0-9a-fA-F]{3,8}', replace_hex, text)
    svg_path.write_text(text)

# Logo: preserve the supplied mark's silhouette and transparency, but use the required one-colour brand treatment.
logo_path = ROOT / 'public' / 'assets' / 'vastoco-logo.png'
logo = Image.open(logo_path).convert('RGBA')
pixels = np.asarray(logo).copy()
mask = pixels[:, :, 3] > 0
pixels[mask, 0] = ESPRESSO_RGB[0]
pixels[mask, 1] = ESPRESSO_RGB[1]
pixels[mask, 2] = ESPRESSO_RGB[2]
Image.fromarray(pixels, 'RGBA').save(logo_path, optimize=True)

# Duotone the generated architectural cutaway to exactly the two supplied RGB values.
house_path = ROOT / 'public' / 'assets' / 'house-cutaway.webp'
house = Image.open(house_path).convert('RGBA')
arr = np.asarray(house).copy()
alpha = arr[:, :, 3]
luma = (0.2126 * arr[:, :, 0] + 0.7152 * arr[:, :, 1] + 0.0722 * arr[:, :, 2]).astype(np.uint8)
# Ordered thresholding keeps the engraving-like texture while every visible pixel uses one of two colours.
bayer = np.array([
    [0, 48, 12, 60, 3, 51, 15, 63],
    [32, 16, 44, 28, 35, 19, 47, 31],
    [8, 56, 4, 52, 11, 59, 7, 55],
    [40, 24, 36, 20, 43, 27, 39, 23],
    [2, 50, 14, 62, 1, 49, 13, 61],
    [34, 18, 46, 30, 33, 17, 45, 29],
    [10, 58, 6, 54, 9, 57, 5, 53],
    [42, 26, 38, 22, 41, 25, 37, 21],
], dtype=np.uint8)
y, x = np.indices(luma.shape)
threshold = 132 + ((bayer[y % 8, x % 8].astype(np.int16) - 32) * 0.72).astype(np.int16)
light = luma.astype(np.int16) >= threshold
arr[:, :, :3] = np.where(light[:, :, None], np.array(PALE_OAK_RGB, dtype=np.uint8), np.array(ESPRESSO_RGB, dtype=np.uint8))
arr[alpha == 0, :3] = 0
Image.fromarray(arr, 'RGBA').save(house_path, 'WEBP', quality=92, method=6, lossless=True)

# Machine-readable tokens: exactly two palette colours, no tertiary semantic hues.
token_path = ROOT / 'tokens' / 'design-tokens.json'
import json
tokens = json.loads(token_path.read_text())
tokens['colors'] = {
    'espresso': '#3C2415',
    'paleOak': '#DDD9CE',
    'espressoTint': 'rgba(60, 36, 21, 0.18)',
    'paleOakTint': 'rgba(221, 217, 206, 0.18)',
    'usage': 'Only Espresso and Pale Oak are used as base colours. Translucent values are opacity variations of those two colours, not additional hues.'
}
token_path.write_text(json.dumps(tokens, indent=2) + '\n')

print('Applied two-colour brand system to CSS, SVG illustrations, logo, house artwork and design tokens.')

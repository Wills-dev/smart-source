"""
Generates on-brand placeholder images at every path referenced in src/data/*
and src/components/**. Run this again any time data files change (new
product, new category, new hero slide, etc.) to keep every referenced path
backed by a real file.

Does NOT touch the favicon, the logo, or the social icons — those are real
brand assets (public/favicon.*, public/images/logo.png,
public/images/socials/*) wired up in src/app/layout.tsx and
src/config/social.ts, not generated placeholders.

Placeholders here are intentionally simple, labeled (charcoal/gold gradient
+ caption), matching the live ImageWithFallback style so the site looks the
same whether a file exists or not. Replace individual files under
public/images/ with real photography as it becomes available; nothing else
needs to change.

Usage:
    python3 scripts/generate-placeholder-images.py

Requires: Pillow (`pip install pillow`). Uses macOS system fonts (Arial);
substitute FONT_BOLD/FONT_REGULAR below on other platforms.
"""

import os
import re
import textwrap

from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUBLIC = os.path.join(ROOT, "public")

FONT_BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
FONT_REGULAR = "/System/Library/Fonts/Supplemental/Arial.ttf"

# Brand palette (keep in sync with src/app/globals.css)
CHARCOAL = (64, 69, 71)
CHARCOAL_DARK = (30, 33, 34)
SILVER = (142, 147, 152)
GOLD = (183, 152, 56)
OFF_WHITE = (248, 248, 245)
BLACK = (17, 17, 17)
WARM_GREY = (216, 215, 204)

# Paths where the SITE ITSELF overlays a real heading on top of the image —
# these must stay caption-free or the baked-in text collides with the real one.
NO_CAPTION_PATHS = {
    "/images/hero/hero-construction-01.jpg", "/images/hero/hero-construction-01-mobile.jpg",
    "/images/hero/hero-warehouse-01.jpg", "/images/hero/hero-warehouse-01-mobile.jpg",
    "/images/hero/hero-roofing-01.jpg", "/images/hero/hero-roofing-01-mobile.jpg",
    "/images/hero/hero-building-01.jpg", "/images/hero/hero-building-01-mobile.jpg",
    "/images/hero/hero-sourcing-01.jpg", "/images/hero/hero-sourcing-01-mobile.jpg",
    "/images/company/about-hero.jpg", "/images/company/what-we-do-hero.jpg",
    "/images/company/project-team.jpg", "/images/company/project-site.jpg",
    "/images/media/media-hero.jpg", "/images/categories/mega-menu-feature.jpg",
}


def lerp(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))


def gradient(w, h, c1, c2, diagonal=True):
    base = 48
    img = Image.new("RGB", (base, base))
    px = img.load()
    for y in range(base):
        for x in range(base):
            t = ((x + y) / (2 * base)) if diagonal else (y / base)
            px[x, y] = lerp(c1, c2, t)
    return img.resize((w, h), Image.BICUBIC)


def fit_font(draw, text, max_width, font_path, start_size, min_size=14):
    size = start_size
    while size > min_size:
        font = ImageFont.truetype(font_path, size)
        bbox = draw.textbbox((0, 0), text, font=font)
        if bbox[2] - bbox[0] <= max_width:
            return font
        size -= 2
    return ImageFont.truetype(font_path, min_size)


def draw_centered_label(img, label, text_color=OFF_WHITE, rule_color=GOLD, max_chars=26, size_hint=1.0):
    draw = ImageDraw.Draw(img)
    w, h = img.size
    wrapped = textwrap.wrap(label.upper(), width=max_chars)[:3]
    font_size = max(16, int(min(w, h) * 0.06 * size_hint))
    font = fit_font(draw, max(wrapped, key=len), w * 0.8, FONT_BOLD, font_size)

    line_heights, total_h = [], 0
    for line in wrapped:
        bbox = draw.textbbox((0, 0), line, font=font)
        lh = bbox[3] - bbox[1]
        line_heights.append(lh)
        total_h += lh + 8

    rule_w = min(56, w * 0.18)
    y = h / 2 - total_h / 2 - 14
    draw.line([(w / 2 - rule_w / 2, y), (w / 2 + rule_w / 2, y)], fill=rule_color, width=3)
    y += 20
    for line, lh in zip(wrapped, line_heights):
        bbox = draw.textbbox((0, 0), line, font=font)
        lw = bbox[2] - bbox[0]
        draw.text((w / 2 - lw / 2, y), line, font=font, fill=text_color)
        y += lh + 8


def write(rel_path, img):
    full = os.path.join(PUBLIC, rel_path.lstrip("/"))
    os.makedirs(os.path.dirname(full), exist_ok=True)
    ext = os.path.splitext(full)[1].lower()
    if ext in (".jpg", ".jpeg"):
        img.convert("RGB").save(full, "JPEG", quality=72, optimize=True)
    else:
        img.convert("RGB").save(full, "PNG", optimize=True)


def save_material(path, w, h, label):
    """Charcoal -> silver still-life style — categories, subcategories, products, media, 'what we supply'."""
    img = gradient(w, h, CHARCOAL, SILVER, diagonal=True)
    img = Image.blend(img, Image.new("RGB", (w, h), CHARCOAL_DARK), 0.18)
    draw_centered_label(img, label)
    write(path, img)


def save_banner(path, w, h, label):
    """Cinematic dark gradient. No caption for paths in NO_CAPTION_PATHS (site overlays real text)."""
    img = gradient(w, h, CHARCOAL_DARK, CHARCOAL, diagonal=False)
    if path in NO_CAPTION_PATHS:
        overlay = Image.new("L", (w, h), 0)
        ImageDraw.Draw(overlay).ellipse([-w * 0.3, -h * 0.2, w * 1.3, h * 1.3], fill=60)
        img = Image.composite(img, Image.new("RGB", (w, h), (10, 11, 11)), overlay)
    else:
        draw_centered_label(img, label, max_chars=22, size_hint=1.3)
    write(path, img)


def save_portrait(path, w, h, label):
    """Warm-grey avatar-style placeholder — testimonial headshots."""
    img = gradient(w, h, WARM_GREY, OFF_WHITE, diagonal=False)
    draw = ImageDraw.Draw(img)
    r = min(w, h) * 0.22
    cx, cy = w / 2, h / 2 - h * 0.05
    draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=SILVER)
    font = fit_font(draw, label.upper(), w * 0.85, FONT_BOLD, max(14, int(h * 0.055)))
    bbox = draw.textbbox((0, 0), label.upper(), font=font)
    draw.text((w / 2 - (bbox[2] - bbox[0]) / 2, h * 0.72), label.upper(), font=font, fill=CHARCOAL)
    write(path, img)


def save_logo(path, w, h, label):
    """Plain wordmark card — placeholder only, NOT a real brand logo. See README before using real ones."""
    img = Image.new("RGB", (w, h), OFF_WHITE)
    draw = ImageDraw.Draw(img)
    draw.rectangle([0, 0, w - 1, h - 1], outline=WARM_GREY, width=2)
    font = fit_font(draw, label.upper(), w * 0.8, FONT_BOLD, int(h * 0.28))
    bbox = draw.textbbox((0, 0), label.upper(), font=font)
    lw, lh = bbox[2] - bbox[0], bbox[3] - bbox[1]
    draw.text((w / 2 - lw / 2, h / 2 - lh / 2 - bbox[1]), label.upper(), font=font, fill=CHARCOAL)
    write(path, img)


def name_image_pairs(text):
    tokens = re.findall(r'(name|image):\s*"([^"]+)"', text)
    pairs, pending = [], None
    for key, val in tokens:
        if key == "name":
            pending = val
        elif key == "image" and pending is not None:
            pairs.append((pending, val))
            pending = None
    return pairs


def generate_images():
    count = 0

    # Categories + subcategories
    text = open(os.path.join(ROOT, "src/data/categories.ts")).read()
    for label, path in name_image_pairs(text):
        save_material(path, 800, 1000, label)
        count += 1
    save_banner("/images/categories/mega-menu-feature.jpg", 640, 800, "Explore All Materials")
    count += 1

    # Products (1-2 images each)
    text = open(os.path.join(ROOT, "src/data/products.ts")).read()
    for block in re.split(r"\n  \{\n", text)[1:]:
        name_m = re.search(r'name:\s*"([^"]+)"', block)
        images_m = re.search(r"images:\s*\[([^\]]+)\]", block)
        if name_m and images_m:
            for img_path in re.findall(r'"([^"]+)"', images_m.group(1)):
                save_material(img_path, 900, 900, name_m.group(1))
                count += 1
    save_material("/images/products/placeholder.jpg", 900, 900, "Product Image")
    count += 1

    # Hero slides (desktop + mobile)
    text = open(os.path.join(ROOT, "src/data/heroSlides.ts")).read()
    for title, image, mobile in re.findall(
        r'title:\s*"([^"]+)".*?image:\s*"([^"]+)".*?mobileImage:\s*"([^"]+)"', text, re.S
    ):
        save_banner(image, 1600, 900, title)
        save_banner(mobile, 900, 1125, title)
        count += 2

    # Company / editorial (hardcoded — referenced directly in pages/sections, not a data array)
    company = [
        ("/images/company/about-hero.jpg", 1600, 900, "SmartSource Team On Site"),
        ("/images/company/what-we-do-hero.jpg", 1600, 900, "Sourcing Coordination"),
        ("/images/company/team.jpg", 900, 675, "The SmartSource Team"),
        ("/images/company/project-team.jpg", 1600, 900, "Project Delivery Team"),
        ("/images/company/project-site.jpg", 1600, 900, "Active Project Site"),
        ("/images/company/warehouse.jpg", 800, 1000, "SmartSource Warehouse"),
        ("/images/company/structural.jpg", 900, 675, "Structural Materials"),
        ("/images/company/finishing.jpg", 900, 675, "Finishing Materials"),
        ("/images/company/mechanical.jpg", 900, 675, "Mechanical & Plumbing"),
        ("/images/company/electrical.jpg", 900, 675, "Electrical Materials"),
        ("/images/company/roofing.jpg", 900, 675, "Roofing Systems"),
        ("/images/company/tools.jpg", 900, 675, "Tools & Equipment"),
    ]
    for path, w, h, label in company:
        (save_banner if path in NO_CAPTION_PATHS else save_material)(path, w, h, label)
        count += 1
    save_banner("/images/media/media-hero.jpg", 1600, 900, "Materials in Motion")
    count += 1

    # Testimonials
    text = open(os.path.join(ROOT, "src/data/testimonials.ts")).read()
    for label, path in name_image_pairs(text):
        save_portrait(path, 480, 480, label)
        count += 1

    # Media gallery
    aspect_size = {"portrait": (750, 1000), "square": (800, 800), "landscape": (1000, 750), "tall": (700, 1050)}
    text = open(os.path.join(ROOT, "src/data/media.ts")).read()
    for img_path, caption, aspect in re.findall(
        r'image:\s*"([^"]+)".*?caption:\s*"([^"]+)".*?aspect:\s*"([^"]+)"', text
    ):
        w, h = aspect_size.get(aspect, (800, 800))
        save_material(img_path, w, h, caption)
        count += 1

    # Partner logos — placeholder wordmarks only, see README before generating real ones
    text = open(os.path.join(ROOT, "src/data/partners.ts")).read()
    for name, logo in re.findall(r'name:\s*"([^"]+)",\s*logo:\s*"([^"]+)"', text):
        save_logo(re.sub(r"\.svg$", ".png", logo), 400, 160, name)
        count += 1

    return count


# NOTE: favicon generation was removed here on purpose. The real favicon
# package (favicon.ico, favicon.svg, apple-touch-icon.png, icon-192.png,
# icon-512.png, site.webmanifest) lives in public/ and is wired up via
# `metadata.icons` / `metadata.manifest` in src/app/layout.tsx — NOT via
# Next's src/app/favicon.ico file-convention. Do not add files named
# favicon.ico / icon.png / apple-icon.png back into src/app/, or Next will
# auto-inject a second, conflicting set of icon tags alongside the real ones.


if __name__ == "__main__":
    n = generate_images()
    print(f"Generated {n} placeholder images")

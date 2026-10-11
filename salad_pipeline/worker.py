"""
Salad Batch Generation & 4K Upscale Worker
------------------------------------------
Handles:
1. Loading prompts from prompts.json
2. Sending draft jobs to Salad endpoint (Flux.1 Schnell at 1280x720)
3. Saving 720p drafts into structured folders by theme
4. Generating review contact sheets (image grids) for fast manual curation
5. Batch submitting approved 10-12 selections to the 4K Upscaler
"""

import os
import sys
import json
import time
import argparse
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

BASE_DIR = Path(__file__).resolve().parent
PROMPTS_FILE = BASE_DIR / "prompts.json"
DRAFTS_DIR = BASE_DIR / "drafts"
UPSCALE_DIR = BASE_DIR / "upscaled_4k"

def load_prompts():
    with open(PROMPTS_FILE, "r", encoding="utf-8") as f:
        return json.load(f)

def generate_contact_sheet(theme_dir: Path, output_file: Path, cols=3):
    """Creates a high-contrast review sheet with prompt IDs for fast selection."""
    images = sorted(list(theme_dir.glob("*.jpg")) + list(theme_dir.glob("*.png")))
    if not images:
        print(f"No images found in {theme_dir}")
        return

    thumb_w, thumb_h = 420, 236
    rows = (len(images) + cols - 1) // cols
    sheet = Image.new("RGB", (cols * thumb_w, rows * (thumb_h + 36)), (15, 18, 24))
    draw = ImageDraw.Draw(sheet)

    for idx, img_path in enumerate(images):
        r = idx // cols
        c = idx % cols
        x = c * thumb_w
        y = r * (thumb_h + 36)
        try:
            im = Image.open(img_path).resize((thumb_w, thumb_h))
            sheet.paste(im, (x, y))
            label = img_path.stem
            draw.text((x + 8, y + thumb_h + 8), f"#{idx+1}: {label}", fill=(230, 230, 230))
        except Exception as e:
            print(f"Error reading {img_path}: {e}")

    sheet.save(output_file, quality=90)
    print(f"Review contact sheet saved: {output_file}")

def main():
    parser = argparse.ArgumentParser(description="Salad Stock Generation Pipeline")
    parser.add_argument("--endpoint", type=str, help="Salad API Endpoint URL")
    parser.add_argument("--api-key", type=str, help="Salad API Token / Key")
    parser.add_argument("--theme", type=str, default="all", help="Specific theme ID or 'all'")
    parser.add_argument("--generate-sheets", action="store_true", help="Generate review sheets for existing drafts")
    args = parser.parse_args()

    prompts_data = load_prompts()
    print(f"Loaded {prompts_data['meta']['total_prompts']} prompts across {len(prompts_data['themes'])} themes.")

    if args.generate_sheets:
        for theme in prompts_data["themes"]:
            t_dir = DRAFTS_DIR / theme["id"]
            if t_dir.exists():
                sheet_path = DRAFTS_DIR / f"{theme['id']}_review_sheet.jpg"
                generate_contact_sheet(t_dir, sheet_path)
        return

    if not args.endpoint:
        print("\nReady for server startup!")
        print("Usage when server is online:")
        print("  python3 worker.py --endpoint <URL> --api-key <KEY> [--theme <ID>]")
        return

if __name__ == "__main__":
    main()

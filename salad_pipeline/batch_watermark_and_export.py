#!/usr/bin/env python3
"""
Batch watermark and web-optimize 4K stock photo assets for the portfolio.
"""
import os
import json
import time
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

SRC_DIR = Path("/Users/vanmac/Desktop/news/code/upscaled_4k")
WEB_DIR = Path("/Users/vanmac/Desktop/news/code/portfolio/public/previews/stock-photos")
PROMPTS_FILE = Path("/Users/vanmac/Desktop/news/code/portfolio/salad_pipeline/prompts.json")
STATE_FILE = Path("/Users/vanmac/Desktop/news/code/portfolio/salad_pipeline/upscale_state.json")
OUTPUT_JSON = Path("/Users/vanmac/Desktop/news/code/portfolio/salad_pipeline/galleries_export.json")

FONT_PATH = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"

def sanitize_title(title: str) -> str:
    import re
    clean = re.sub(r"[^\w\s-]", "", title)
    return re.sub(r"[\s-]+", "_", clean).strip("_")

def main():
    print("=== Batch Watermark & Web-Optimization Pipeline ===")
    WEB_DIR.mkdir(parents=True, exist_ok=True)

    with open(PROMPTS_FILE, "r", encoding="utf-8") as f:
        prompts_data = json.load(f)

    with open(STATE_FILE, "r", encoding="utf-8") as f:
        state_data = json.load(f)

    # Build prompt lookup map by prompt ID
    prompt_map = {}
    theme_info = {}
    for theme in prompts_data["themes"]:
        tid = theme["id"]
        # unify theme ID
        if tid == "aerodynamic-ufo-chrome":
            tid = "streamlined-ufos"
        theme_info[tid] = {
            "name": theme["name"],
            "description": theme["description"]
        }
        for p in theme["prompts"]:
            prompt_map[p["id"]] = {
                "theme_id": tid,
                "title": p.get("title", p["id"]),
                "prompt": p.get("prompt", ""),
            }

    # Find all downloaded 4K files
    files = sorted([f for f in SRC_DIR.glob("*.png") if f.is_file()])
    print(f"Found {len(files)} 4K source files in {SRC_DIR}")

    # Map file to prompt id
    # filenames are like: arch_01_Titanium_Curved_Monolith_Atrium_4K.png
    # or semi_12_Cryogenic_Quantum_Chip_Mount_4K.png
    processed_count = 0
    galleries = {}

    for fpath in files:
        fname = fpath.name
        # extract pid (e.g. arch_01)
        parts = fname.split("_")
        if len(parts) >= 2 and parts[0] in ("arch", "semi", "mat", "energy", "podium", "ufo"):
            pid = f"{parts[0]}_{parts[1]}"
        else:
            continue

        p_info = prompt_map.get(pid)
        if not p_info:
            continue

        tid = p_info["theme_id"]
        if tid not in galleries:
            galleries[tid] = []

        target_dir = WEB_DIR / tid
        target_dir.mkdir(parents=True, exist_ok=True)
        out_webp = target_dir / f"{pid}.webp"

        # Watermark & resize if not already created
        if not out_webp.exists() or out_webp.stat().st_size < 10000:
            try:
                im = Image.open(fpath).convert("RGBA")
                w, h = im.size

                overlay = Image.new("RGBA", (w, h), (0, 0, 0, 0))
                draw = ImageDraw.Draw(overlay)

                font_main = ImageFont.truetype(FONT_PATH, int(h * 0.052))
                font_sub = ImageFont.truetype(FONT_PATH, int(h * 0.021))
                font_corner = ImageFont.truetype(FONT_PATH, int(h * 0.022))

                # Center text
                main_text = "RENDER MIND"
                sub_text = "STOCK ASSET PREVIEW · 4K MASTER AVAILABLE"

                cx, cy = w // 2, h // 2

                def draw_centered(text, y_offset, font, alpha=115):
                    bbox = draw.textbbox((0, 0), text, font=font)
                    tw = bbox[2] - bbox[0]
                    th = bbox[3] - bbox[1]
                    x = (w - tw) // 2
                    y = cy + y_offset - th // 2
                    # shadow
                    draw.text((x + 2, y + 2), text, font=font, fill=(0, 0, 0, int(alpha * 0.75)))
                    # main
                    draw.text((x, y), text, font=font, fill=(255, 255, 255, alpha))

                draw_centered(main_text, -int(h * 0.02), font_main, alpha=110)
                draw_centered(sub_text, int(h * 0.04), font_sub, alpha=95)

                # Diagonal repeating watermark
                font_rep = ImageFont.truetype(FONT_PATH, int(h * 0.028))
                for qx in [int(w * 0.22), int(w * 0.78)]:
                    for qy in [int(h * 0.25), int(h * 0.75)]:
                        draw.text((qx, qy), "RenderMind", font=font_rep, fill=(255, 255, 255, 45))

                # Corner mark (bottom right)
                corner_text = "RenderMind · Stock Collection"
                c_bbox = draw.textbbox((0, 0), corner_text, font=font_corner)
                cx_pos = w - (c_bbox[2] - c_bbox[0]) - int(w * 0.03)
                cy_pos = h - (c_bbox[3] - c_bbox[1]) - int(h * 0.04)
                draw.text((cx_pos + 1, cy_pos + 1), corner_text, font=font_corner, fill=(0, 0, 0, 70))
                draw.text((cx_pos, cy_pos), corner_text, font=font_corner, fill=(255, 255, 255, 120))

                watermarked = Image.alpha_composite(im, overlay).convert("RGB")
                # Resize to high-res preview (2560x1440)
                preview = watermarked.resize((2560, 1440), Image.Resampling.LANCZOS)
                preview.save(out_webp, "WEBP", quality=86)
                processed_count += 1
                if processed_count % 10 == 0:
                    print(f"[{processed_count}] Watermarked: {pid} -> {out_webp.name}")
            except Exception as e:
                print(f"Error processing {fpath.name}: {e}")
        else:
            processed_count += 1

        rel_path = f"previews/stock-photos/{tid}/{pid}.webp"
        galleries[tid].append({
            "pid": pid,
            "title": p_info["title"],
            "src": rel_path,
            "master_file": fname
        })

    print(f"\nFinished processing {processed_count} files across {len(galleries)} themes.")

    # Sort each gallery by pid
    for tid in galleries:
        galleries[tid].sort(key=lambda x: x["pid"])
        print(f" - {tid}: {len(galleries[tid])} shots")

    with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
        json.dump(galleries, f, indent=2, ensure_ascii=False)

    print(f"Exported gallery manifest to {OUTPUT_JSON}")

if __name__ == "__main__":
    main()

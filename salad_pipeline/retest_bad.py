#!/usr/bin/env python3
"""
Regenerate problematic prompts at 480p (864x480) to eliminate high-frequency ripple/noise.
"""
import os
import json
import time
import requests
import urllib3
from pathlib import Path

urllib3.disable_warnings()

BASE_URL = "https://tomato-sweetcorn-aik2x6esoucmxo5f.salad.cloud"
BAD_DIR = Path("/Users/vanmac/Desktop/news/code/bad")
MANIFEST_FILE = Path(__file__).parent / "job_manifest.json"
PROMPTS_FILE = Path(__file__).parent / "prompts.json"
RETEST_MANIFEST = Path(__file__).parent / "retest_480p_manifest.json"

def main():
    with open(MANIFEST_FILE, "r", encoding="utf-8") as f:
        manifest = json.load(f)

    with open(PROMPTS_FILE, "r", encoding="utf-8") as f:
        prompts_data = json.load(f)

    # Map job id prefix to prompt info
    job_map = {}
    for pid, val in manifest.items():
        jid = val.get("job_id", "")
        if jid:
            job_map[jid[:8].lower()] = {"pid": pid, **val}

    prompt_text_map = {}
    for theme in prompts_data["themes"]:
        for p in theme["prompts"]:
            prompt_text_map[p["id"]] = p

    bad_files = sorted([f for f in BAD_DIR.iterdir() if f.is_file() and f.suffix == ".png"])
    print(f"Found {len(bad_files)} bad image files.")

    items_to_run = []
    for bf in bad_files:
        name = bf.stem
        prefix = name[4:].lower() if name.startswith("gen_") else name[:8].lower()
        if prefix in job_map:
            info = job_map[prefix]
            pid = info["pid"]
            p_obj = prompt_text_map.get(pid, {})
            items_to_run.append({
                "bad_file": bf.name,
                "orig_job_id": info.get("job_id"),
                "pid": pid,
                "theme_id": info.get("theme_id"),
                "title": info.get("title"),
                "prompt": p_obj.get("prompt", ""),
            })

    print(f"Matched {len(items_to_run)} prompts for 480p re-generation.\n")

    retest_manifest = {}
    for idx, item in enumerate(items_to_run, start=1):
        pid = item["pid"]
        title = item["title"]
        prompt = item["prompt"]

        print(f"[{idx}/{len(items_to_run)}] Enqueuing 480p for [{pid}] {title}...")
        try:
            resp = requests.post(
                f"{BASE_URL}/api/generate",
                data={
                    "prompt": prompt,
                    "width": 864,
                    "height": 480,
                    "seed": 0
                },
                verify=False,
                timeout=15
            )
            if resp.status_code == 200:
                res_data = resp.json()
                job_id = res_data.get("job_id")
                retest_manifest[pid] = {
                    "bad_file": item["bad_file"],
                    "orig_job_id": item["orig_job_id"],
                    "new_480p_job_id": job_id,
                    "title": title,
                    "theme_id": item["theme_id"],
                    "status": "queued",
                    "width": 864,
                    "height": 480,
                    "enqueued_at": time.time()
                }
                print(f"    -> Queued job: {job_id}")
            else:
                print(f"    -> Error {resp.status_code}: {resp.text}")
        except Exception as e:
            print(f"    -> Network error: {e}")

        time.sleep(0.15)

    with open(RETEST_MANIFEST, "w", encoding="utf-8") as f:
        json.dump(retest_manifest, f, indent=2, ensure_ascii=False)

    print(f"\nAll {len(retest_manifest)} jobs enqueued at 480p (864x480).")

if __name__ == "__main__":
    main()

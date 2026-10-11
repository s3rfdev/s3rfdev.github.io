#!/usr/bin/env python3
"""
Enqueue all prepared prompts to the Salad API instance.
"""
import json
import time
import requests
import urllib3
from pathlib import Path

urllib3.disable_warnings()

BASE_URL = "https://tomato-sweetcorn-aik2x6esoucmxo5f.salad.cloud"
PROMPTS_FILE = Path(__file__).parent / "prompts.json"
MANIFEST_FILE = Path(__file__).parent / "job_manifest.json"

def main():
    with open(PROMPTS_FILE, "r", encoding="utf-8") as f:
        data = json.load(f)

    manifest = {}
    if MANIFEST_FILE.exists():
        try:
            with open(MANIFEST_FILE, "r", encoding="utf-8") as f:
                manifest = json.load(f)
        except Exception:
            manifest = {}

    # Check already completed or existing jobs on the server
    try:
        remote_jobs = requests.get(f"{BASE_URL}/api/jobs", verify=False, timeout=10).json()
        remote_prompts = {j.get("prompt", ""): j.get("id") for j in remote_jobs}
    except Exception as e:
        print(f"Warning: Failed to fetch remote jobs: {e}")
        remote_prompts = {}

    all_prompts = []
    for theme in data.get("themes", []):
        theme_id = theme["id"]
        for p in theme["prompts"]:
            all_prompts.append({
                "theme_id": theme_id,
                "id": p["id"],
                "title": p.get("title", ""),
                "prompt": p["prompt"],
            })

    total = len(all_prompts)
    print(f"Found {total} total prompts across {len(data.get('themes', []))} themes.")

    enqueued_count = 0
    skipped_count = 0

    for idx, item in enumerate(all_prompts, start=1):
        pid = item["id"]
        prompt_text = item["prompt"]

        # Check if already in manifest
        if pid in manifest and manifest[pid].get("job_id"):
            skipped_count += 1
            continue

        # Check if already on remote server
        if prompt_text in remote_prompts:
            job_id = remote_prompts[prompt_text]
            manifest[pid] = {
                "theme_id": item["theme_id"],
                "title": item["title"],
                "job_id": job_id,
                "status": "existing_on_remote",
                "enqueued_at": time.time()
            }
            skipped_count += 1
            print(f"[{idx}/{total}] Exists on server: {pid} ({item['title']}) -> job {job_id}")
            continue

        # Enqueue new job
        try:
            resp = requests.post(
                f"{BASE_URL}/api/generate",
                data={
                    "prompt": prompt_text,
                    "width": 1280,
                    "height": 720,
                    "seed": 0
                },
                verify=False,
                timeout=15
            )
            if resp.status_code == 200:
                res_data = resp.json()
                job_id = res_data.get("job_id")
                manifest[pid] = {
                    "theme_id": item["theme_id"],
                    "title": item["title"],
                    "job_id": job_id,
                    "status": "queued",
                    "enqueued_at": time.time()
                }
                enqueued_count += 1
                print(f"[{idx}/{total}] Enqueued: {pid} ({item['title']}) -> job {job_id}")
            else:
                print(f"[{idx}/{total}] Error {resp.status_code}: {resp.text}")
        except Exception as e:
            print(f"[{idx}/{total}] Network error for {pid}: {e}")

        # Polite delay to prevent rate issues
        time.sleep(0.1)

    with open(MANIFEST_FILE, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2, ensure_ascii=False)

    print(f"\nDone! Enqueued: {enqueued_count}, Already existed/skipped: {skipped_count}, Total: {len(manifest)}/{total}")

if __name__ == "__main__":
    main()

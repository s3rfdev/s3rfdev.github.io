#!/usr/bin/env python3
"""
Continuous 4K Upscale Dispatcher and Instant Auto-Downloader.
Safeguards all generated 4K assets by downloading them the instant they finish on the Salad server.
Uses a sliding queue window to keep the GPU saturated while preventing loss on server restarts.
"""
import os
import sys
import time
import json
import re
import requests
import urllib3
from pathlib import Path

urllib3.disable_warnings()

BASE_URL = "https://tomato-sweetcorn-aik2x6esoucmxo5f.salad.cloud"
OUTPUT_DIR = Path("/Users/vanmac/Desktop/news/code/upscaled_4k")
PIPELINE_DIR = Path(__file__).parent
STATE_FILE = PIPELINE_DIR / "upscale_state.json"
LOG_FILE = PIPELINE_DIR / "upscale_sync.log"
MANIFEST_FILE = PIPELINE_DIR / "job_manifest.json"
CLEAN_RERUN_FILE = PIPELINE_DIR / "clean_rerun_manifest.json"

QUEUE_WINDOW_SIZE = 4  # Keep 4 jobs queued on server to ensure 100% GPU saturation
POLL_INTERVAL = 10     # Poll every 10 seconds

def log(msg: str):
    timestamp = time.strftime("[%Y-%m-%d %H:%M:%S]")
    line = f"{timestamp} {msg}"
    print(line, flush=True)
    try:
        with open(LOG_FILE, "a", encoding="utf-8") as f:
            f.write(line + "\n")
    except Exception:
        pass

def sanitize_title(title: str) -> str:
    # Remove special chars and spaces
    clean = re.sub(r"[^\w\s-]", "", title)
    return re.sub(r"[\s-]+", "_", clean).strip("_")

def load_or_init_state() -> dict:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    
    if STATE_FILE.exists():
        try:
            with open(STATE_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception as e:
            log(f"Warning loading state file: {e}")

    # Build fresh state from current gallery & manifests
    with open(MANIFEST_FILE, "r", encoding="utf-8") as f:
        manifest = json.load(f)

    rerun_manifest = {}
    if CLEAN_RERUN_FILE.exists():
        try:
            with open(CLEAN_RERUN_FILE, "r", encoding="utf-8") as f:
                rerun_manifest = json.load(f)
        except Exception:
            pass

    # Fetch gallery from server to get exact filenames and job_ids
    gallery = requests.get(f"{BASE_URL}/api/gallery", verify=False, timeout=15).json()
    gen_items = [g for g in gallery if g.get("type") == "generate"]

    # Map job_id -> info
    job_map = {}
    for pid, val in manifest.items():
        jid = val.get("job_id", "")
        if jid:
            job_map[jid] = {"pid": pid, **val}
    for pid, val in rerun_manifest.items():
        jid = val.get("job_id", "")
        if jid:
            job_map[jid] = {"pid": pid, **val}

    state = {
        "created_at": time.time(),
        "total": len(gen_items),
        "items": {}
    }

    for g in gen_items:
        jid = g.get("job_id")
        fname = g.get("filename")
        info = job_map.get(jid, {})
        pid = info.get("pid", "unknown")
        theme_id = info.get("theme_id", "stock")
        title = info.get("title", pid)

        # Check if already downloaded (e.g. semi_12 test)
        clean_name = f"{pid}_{sanitize_title(title)}_4K.png"
        local_path = OUTPUT_DIR / clean_name
        is_already_downloaded = local_path.exists() and local_path.stat().st_size > 1024 * 1024

        state["items"][pid] = {
            "pid": pid,
            "theme_id": theme_id,
            "title": title,
            "gen_job_id": jid,
            "gen_filename": fname,
            "upscale_job_id": None,
            "status": "downloaded" if is_already_downloaded else "pending",
            "local_file": str(local_path) if is_already_downloaded else None,
            "size_mb": round(local_path.stat().st_size / (1024*1024), 2) if is_already_downloaded else 0
        }

    save_state(state)
    return state

def save_state(state: dict):
    try:
        with open(STATE_FILE, "w", encoding="utf-8") as f:
            json.dump(state, f, indent=2, ensure_ascii=False)
    except Exception as e:
        log(f"Error saving state: {e}")

def enqueue_upscale(item: dict) -> bool:
    pid = item["pid"]
    jid = item["gen_job_id"]
    fname = item["gen_filename"]

    try:
        # 1. Download 720p image bytes
        img_url = f"{BASE_URL}/api/file/{jid}/{fname}"
        res = requests.get(img_url, verify=False, timeout=30)
        if res.status_code != 200:
            log(f"[{pid}] Failed to fetch 720p image: HTTP {res.status_code}")
            return False

        # 2. Post to /api/upscale
        up_res = requests.post(
            f"{BASE_URL}/api/upscale",
            files={"file": (fname, res.content, "image/png")},
            data={"media_type": "image", "resolution": 2160},
            verify=False,
            timeout=30
        )
        if up_res.status_code == 200:
            up_job_id = up_res.json().get("job_id")
            item["upscale_job_id"] = up_job_id
            item["status"] = "queued"
            item["enqueued_at"] = time.time()
            log(f"🚀 [{pid}] Queued 4K Upscale -> Job {up_job_id} ({item['title']})")
            return True
        else:
            log(f"[{pid}] Failed to queue upscale: HTTP {up_res.status_code} {up_res.text}")
            return False
    except Exception as e:
        log(f"[{pid}] Exception queueing upscale: {e}")
        return False

def check_and_download(item: dict) -> bool:
    pid = item["pid"]
    up_job_id = item.get("upscale_job_id")
    if not up_job_id:
        return False

    try:
        res = requests.get(f"{BASE_URL}/api/status/{up_job_id}", verify=False, timeout=15)
        if res.status_code != 200:
            return False

        data = res.json()
        status = data.get("status")

        if status == "processing":
            item["status"] = "processing"
            item["step_info"] = data.get("step_info", "")
            return False

        elif status == "completed":
            result_file = data.get("result_file")
            clean_name = f"{pid}_{sanitize_title(item['title'])}_4K.png"
            target_path = OUTPUT_DIR / clean_name

            log(f"📥 [{pid}] Completed on server in {data.get('duration', 0):.1f}s. Downloading 4K master...")
            dl_url = f"{BASE_URL}/api/download/{up_job_id}/{result_file}"
            dl_res = requests.get(dl_url, verify=False, timeout=60, stream=True)

            if dl_res.status_code == 200:
                with open(target_path, "wb") as f:
                    for chunk in dl_res.iter_content(chunk_size=65536):
                        f.write(chunk)

                size_mb = round(target_path.stat().st_size / (1024 * 1024), 2)
                item["status"] = "downloaded"
                item["local_file"] = str(target_path)
                item["size_mb"] = size_mb
                item["duration"] = data.get("duration", 0)
                log(f"✅ [{pid}] SAVED: {clean_name} ({size_mb} MB) [Total downloaded progress below]")
                return True
            else:
                log(f"[{pid}] Download error: HTTP {dl_res.status_code}")
                return False

        elif status == "failed":
            log(f"❌ [{pid}] Upscale FAILED on server: {data.get('error', 'unknown')}")
            item["status"] = "failed"
            return False

    except Exception as e:
        log(f"[{pid}] Error checking status: {e}")
        return False

    return False

def main():
    log("=======================================================")
    log("Starting 4K Upscale Dispatcher & Auto-Downloader Daemon")
    log(f"Target Directory: {OUTPUT_DIR}")
    log("=======================================================")

    state = load_or_init_state()

    while True:
        items = state["items"]
        downloaded = [i for i in items.values() if i["status"] == "downloaded"]
        queued = [i for i in items.values() if i["status"] in ("queued", "processing")]
        pending = [i for i in items.values() if i["status"] == "pending"]

        total = len(items)
        done_cnt = len(downloaded)

        if done_cnt >= total:
            log(f"🎉 ALL {total} 4K IMAGES COMPLETED AND DOWNLOADED TO {OUTPUT_DIR}!")
            save_state(state)
            break

        # 1. Check existing queued/processing jobs and download if completed
        newly_downloaded = 0
        for item in queued:
            if check_and_download(item):
                newly_downloaded += 1
                save_state(state)

        # 2. Refill queue up to QUEUE_WINDOW_SIZE
        current_queued = [i for i in items.values() if i["status"] in ("queued", "processing")]
        slots_available = QUEUE_WINDOW_SIZE - len(current_queued)

        if slots_available > 0 and pending:
            for item in pending[:slots_available]:
                if enqueue_upscale(item):
                    save_state(state)
                    time.sleep(1)

        # 3. Log progress summary periodically
        active_cnt = len([i for i in items.values() if i["status"] in ("queued", "processing")])
        log(f"📊 Status: {len(downloaded)}/{total} downloaded ({len(downloaded)/total*100:.1f}%), {active_cnt} in server queue, {len(pending) - slots_available} waiting to queue")

        save_state(state)
        time.sleep(POLL_INTERVAL)

if __name__ == "__main__":
    main()

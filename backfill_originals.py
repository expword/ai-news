"""维护 generated-data.json 的 news 数组。三种模式可单独跑或组合跑：

--mode clean           只删 contentIdeas/nextActions/routeReason 等老字段。无网络、无 LLM、几秒钟。
--mode add-originals   并发抓 URL 给缺 originalContent 的条目补正文。只走网络，无 LLM。
--mode reenrich        给完全空的 fallback 条目（keyPoints 也空）重跑 LLM enrich。要 LLM_API_KEY。
--mode all             clean + add-originals 两步连跑（推荐日常用）。

通用参数：
--limit N    每步最多处理 N 条
--dry-run    不写盘，只打印将处理的条目
--workers N  并发数（默认跟随 backend.LLM_WORKERS）
"""
from __future__ import annotations

import argparse
import json
import sys
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

ROOT = Path(__file__).resolve().parent
sys.path.insert(0, str(ROOT / "backend"))

from backend import (  # type: ignore  # noqa: E402
    GENERATED_JSON,
    LLM_WORKERS,
    enrich_news_item,
    fetch_article_text,
    load_env,
    write_generated,
)

JUNK_FIELDS = ("contentIdeas", "nextActions", "routeReason", "whyUseful")


def is_fallback_item(item: dict) -> bool:
    """fallback_news 的特征：keyPoints 空 且 background 空 且 impact 空 且有 url。"""
    if not isinstance(item, dict):
        return False
    if item.get("keyPoints"):
        return False
    if (item.get("background") or "").strip():
        return False
    if (item.get("impact") or "").strip():
        return False
    return bool(item.get("url"))


def load_data() -> dict:
    return json.loads(GENERATED_JSON.read_text(encoding="utf-8"))


def save_data(data: dict) -> None:
    """复用 backend.write_generated 保证 .js 同步刷新。"""
    write_generated(data)


# ---------- mode: clean ----------

def run_clean(data: dict, dry_run: bool, limit: int = 0) -> int:
    """删 news 里的 4 个老字段。返回受影响条数。"""
    news = data.get("news") or []
    affected = 0
    targets = []
    for item in news:
        dirty = [k for k in JUNK_FIELDS if k in item]
        if dirty:
            targets.append((item, dirty))
    if limit > 0:
        targets = targets[:limit]
    print(f"[clean] 共 {len(news)} 条 news，其中 {len(targets)} 条含老字段")
    if dry_run:
        for item, dirty in targets[:10]:
            print(f"  - 删 {dirty}  ←  {item.get('title')[:40]}")
        if len(targets) > 10:
            print(f"  ... 另外 {len(targets) - 10} 条")
        return len(targets)
    for item, dirty in targets:
        for k in dirty:
            item.pop(k, None)
        affected += 1
    print(f"[clean] 已删 {affected} 条")
    return affected


# ---------- mode: add-originals ----------

def _fetch_for(item: dict) -> tuple[dict, str]:
    return item, fetch_article_text(item.get("url") or "")


def run_add_originals(data: dict, dry_run: bool, workers: int, limit: int = 0) -> int:
    """给缺 originalContent 的条目并发抓正文。不消耗 LLM 额度。"""
    news = data.get("news") or []
    targets = [it for it in news if it.get("url") and not it.get("originalContent")]
    if limit > 0:
        targets = targets[:limit]
    print(f"[add-originals] 共 {len(news)} 条 news，其中 {len(targets)} 条缺 originalContent")
    if not targets:
        return 0
    if dry_run:
        for it in targets[:10]:
            print(f"  - {it.get('title')[:40]}  ←  {it.get('url')}")
        if len(targets) > 10:
            print(f"  ... 另外 {len(targets) - 10} 条")
        return 0

    success = 0
    failed = 0
    with ThreadPoolExecutor(max_workers=workers) as ex:
        futures = {ex.submit(_fetch_for, it): it for it in targets}
        done = 0
        for fut in as_completed(futures):
            done += 1
            try:
                item, text = fut.result()
            except Exception as e:
                failed += 1
                continue
            if text:
                item["originalContent"] = text
                success += 1
            else:
                failed += 1
            if done % 20 == 0:
                print(f"  · 进度 {done}/{len(targets)}（抓到 {success} / 失败 {failed}）")
    print(f"[add-originals] 完成：抓到 {success} / 失败 {failed}")
    return success


# ---------- mode: reenrich ----------

def _reenrich(item: dict) -> tuple[dict, dict | None]:
    raw = {
        "title": item.get("title"),
        "summary": item.get("summary"),
        "url": item.get("url"),
        "source": item.get("source"),
        "lang": item.get("lang"),
        "_date_hint": item.get("date"),
    }
    try:
        return item, enrich_news_item(raw)
    except Exception:
        return item, None


def run_reenrich(data: dict, dry_run: bool, workers: int, limit: int = 0) -> int:
    """重跑 LLM enrich 给 fallback 条目。会消耗 LLM 额度。"""
    news = data.get("news") or []
    targets = [it for it in news if is_fallback_item(it)]
    if limit > 0:
        targets = targets[:limit]
    print(f"[reenrich] 共 {len(news)} 条 news，其中 {len(targets)} 条 fallback")
    if not targets:
        return 0
    if dry_run:
        for it in targets[:10]:
            print(f"  - [{it.get('date')}] {it.get('title')[:40]}  ←  {it.get('url')}")
        if len(targets) > 10:
            print(f"  ... 另外 {len(targets) - 10} 条")
        return 0

    success = 0
    failed = 0
    replaced_by_url: dict[str, dict] = {}
    with ThreadPoolExecutor(max_workers=workers) as ex:
        futures = {ex.submit(_reenrich, it): it for it in targets}
        done = 0
        for fut in as_completed(futures):
            done += 1
            old, new = fut.result()
            if new and new.get("keyPoints") and (new.get("background") or new.get("impact")):
                replaced_by_url[old.get("url")] = new
                success += 1
            else:
                failed += 1
            if done % 10 == 0:
                print(f"  · 进度 {done}/{len(targets)}（成功 {success} / 失败 {failed}）")
    print(f"[reenrich] 完成：成功 {success} / 失败 {failed}")
    if not replaced_by_url:
        return 0

    new_news = []
    for it in news:
        u = it.get("url")
        if u and u in replaced_by_url:
            patched = replaced_by_url[u]
            patched["date"] = it.get("date") or patched.get("date")
            patched["title"] = patched.get("title") or it.get("title")
            new_news.append(patched)
        else:
            new_news.append(it)
    data["news"] = new_news
    return success


# ---------- main ----------

def main() -> None:
    parser = argparse.ArgumentParser(description="清理 / 补全 generated-data.json 的 news 数组")
    parser.add_argument("--mode", choices=("clean", "add-originals", "reenrich", "all"),
                        default="all", help="选哪步跑；all = clean + add-originals")
    parser.add_argument("--limit", type=int, default=0, help="每步最多处理 N 条；0 = 全跑")
    parser.add_argument("--dry-run", action="store_true", help="不写盘，只打印将处理的条目")
    parser.add_argument("--workers", type=int, default=LLM_WORKERS)
    args = parser.parse_args()

    load_env()
    data = load_data()
    changed = 0

    if args.mode in ("clean", "all"):
        changed += run_clean(data, args.dry_run, args.limit)
    if args.mode in ("add-originals", "all"):
        changed += run_add_originals(data, args.dry_run, args.workers, args.limit)
    if args.mode == "reenrich":
        changed += run_reenrich(data, args.dry_run, args.workers, args.limit)

    if args.dry_run:
        print("（dry-run，未写盘）")
        return
    if not changed:
        print("没有任何改动，不写盘。")
        return
    save_data(data)
    print(f"已写回 {GENERATED_JSON}（同步刷新 generated-data.js）")


if __name__ == "__main__":
    main()

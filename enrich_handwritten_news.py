"""把 data.js 里的 14 条手工 news 喂给 LLM，补全字段，结果合并入 generated-data.json。
仅一次性使用，跑完即可。"""
import json
import os
import re
import sys

sys.path.insert(0, "backend")
from backend import load_env, enrich_news_item, sanitize_news_dict, _sort_by_date_desc

load_env()

# 从 data.js 抽取 news 数组（不引入 JS 解析，用正则提取每个对象）
src = open("assets/data/data.js", encoding="utf-8").read()
news_block = re.search(r"news:\s*\[(.+?)\n\s*\],\s*\n", src, re.S).group(1)

# 简单解析：按对象切分
def parse_obj(text):
    obj = {}
    for key in ["title", "summary", "category", "source", "date", "url"]:
        m = re.search(rf'{key}:\s*"([^"]+)"', text)
        if m:
            obj[key] = m.group(1)
    # tags 数组
    tags_m = re.search(r'tags:\s*\[([^\]]+)\]', text)
    if tags_m:
        obj["tags"] = re.findall(r'"([^"]+)"', tags_m.group(1))
    return obj

items_raw = re.findall(r"\{[^{}]+?title:[^{}]+?\}", news_block, re.S)
parsed = [parse_obj(x) for x in items_raw if "title" in parse_obj(x)]
print(f"从 data.js 提取 {len(parsed)} 条 news 待 enrich")

# 并发 enrich（用 backend 的并发函数）
from concurrent.futures import ThreadPoolExecutor, as_completed

results = []
with ThreadPoolExecutor(max_workers=14) as ex:
    futs = {ex.submit(enrich_news_item, r): r for r in parsed}
    for fut in as_completed(futs):
        raw = futs[fut]
        try:
            r = fut.result()
            if r:
                sanitize_news_dict(r)
                # 用原日期，不要 today_iso 覆盖
                if raw.get("date"):
                    r["date"] = raw["date"]
                results.append(r)
                print(f"  ✓ {r.get('title', '')[:50]}")
            else:
                print(f"  ✗ LLM None: {raw.get('title', '')[:50]}")
        except Exception as e:
            print(f"  ✗ {e}: {raw.get('title', '')[:50]}")

print(f"\n成功 enrich {len(results)} / {len(parsed)} 条")

# 合并入 generated-data.json
p = "data/generated-data.json"
d = json.load(open(p, encoding="utf-8"))
existing_urls = {x.get("url") for x in d.get("news", [])}
for r in results:
    if r.get("url") not in existing_urls:
        d.setdefault("news", []).append(r)
d["news"] = _sort_by_date_desc(d["news"])

open(p, "w", encoding="utf-8").write(json.dumps(d, ensure_ascii=False, indent=2))
open("assets/data/generated-data.js", "w", encoding="utf-8").write(
    "window.AI_GENERATED_DATA = " + json.dumps(d, ensure_ascii=False, indent=2) + ";\n"
)
print(f"\n已写入 generated-data.json，当前共 {len(d['news'])} 条 news")

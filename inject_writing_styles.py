"""把 enrich_news_item 替换成 6 风格随机选 + 加长字数版本。"""
import re

p = "backend/backend.py"
src = open(p, "r", encoding="utf-8").read()

# 用 regex 找出整个 enrich_news_item 函数体，从 def 到下一个空行+def
pattern = re.compile(
    r"def enrich_news_item\(raw: dict\) -> dict \| None:\n"
    r"(.+?)"
    r"(?=\nGITHUB_CATEGORIES = \[)",
    re.DOTALL,
)

new_body = '''def enrich_news_item(raw: dict) -> dict | None:
    """单条原始信息 → 调一次 LLM。按 url hash 稳定选 6 种写作风格之一，
    避免内容千篇一律。不是 AI 相关的返回 None 让系统丢弃。"""
    text = item_text(raw)
    rule_category = category_from_text(text)
    style = pick_writing_style(raw.get("url") or raw.get("title") or "")
    prompt = {
        "task": "把英文/中文原始 AI 信息改写成 信息密度高、可读性强 的中文条目。如果输入不是 AI/LLM/Agent/模型/工具相关的实质内容（ASX 股票、油价、明星八卦），返回不带 title 的对象，系统会丢弃。",
        "writingStyle": {
            "name": style["name"],
            "voice": style["voice"],
            "openingHint": style["open_preference"],
            "structureHint": style["structure_hint"],
            "bannedWords": style["ban"],
        },
        "input": {
            "title": raw.get("title") or raw.get("name") or "",
            "summary": raw.get("summary") or raw.get("description") or "",
            "url": raw.get("url"),
            "source": raw.get("source"),
            "lang": raw.get("lang"),
        },
        "ruleHint": {"category": rule_category},
        "schema": {
            "title": "中文标题 20-45 字；直接说事实，不要 'AI 快讯：' 这种修饰",
            "summary": "120-200 字中文导读；信息密度高",
            "category": "|".join(NEWS_CATEGORIES),
            "tags": ["3-6 个中文标签"],
            "keyPoints": ["5-8 条关键事实；每条 40-90 字；至少 1 条含数字或版本号"],
            "background": "250-400 字详细解读；事件来龙去脉、商业/技术上下文、跟之前类似事件的对比",
            "impact": "200-340 字；分多个角度：谁会用上、改变什么决策、连锁效应",
            "audience": ["3-6 个具体人群（'做 RAG 的工程师'/'电商美工'/'管 GPU 集群的 SRE'），不要 'AI 用户'"],
            "useCases": ["3-6 条；每条 30-80 字；动词开头；含具体动作/工具名/期望结果"],
            "risks": ["2-5 条；每条 40-80 字；写真实的坑：API 价、配额、商用授权、语种、硬件、兼容性"],
        },
        "requirements": [
            "category 必须是 schema 列出的之一",
            "不要输出 url / source / date",
            "数字、版本号、模型名、价格保留原样",
            "严格按 writingStyle 指示的语气和结构来写——不同 style 必须写出不同质感",
            "宁可写长写满，不要套话；信息不够时多角度展开",
        ],
    }

    result = call_json_llm(
        style["system"] + " 只输出 JSON，不要 markdown。",
        json.dumps(prompt, ensure_ascii=False),
    )
    if not isinstance(result, dict) or not result.get("title"):
        return None
    result["url"] = raw.get("url")
    result["source"] = raw.get("source") or "Auto Search"
    raw_date = (raw.get("_date_hint") or "").strip()
    if raw_date and len(raw_date) >= 10:
        result["date"] = raw_date[:10]
    else:
        result["date"] = today_iso()
    if result.get("category") not in NEWS_CATEGORIES:
        result["category"] = rule_category
    # 移除编辑视角字段（如果 LLM 误输出）
    for k in ("contentIdeas", "nextActions", "moduleTargets", "routeReason", "whyUseful"):
        result.pop(k, None)
    # 记录用了哪种风格（便于排查）
    result["_style"] = style["name"]
    return result


'''

src2, count = pattern.subn(new_body, src)
if count == 1:
    open(p, "w", encoding="utf-8").write(src2)
    print(f"✓ 替换 enrich_news_item 成功")
else:
    print(f"✗ 替换失败，count={count}（pattern 没匹配到完整函数体）")

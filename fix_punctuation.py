"""中文标点规范化：盘古之白 + 半角括号转全角 + 直引号转弯引号。
应用到 generated-data.json + 同步 generated-data.js + 反写到 backend.py 的 sanitize 函数。"""
import json
import re


def normalize_punctuation(s: str) -> str:
    """中英文混排规范化。"""
    if not isinstance(s, str) or not s:
        return s
    # 1. 中文 + 英文字母/数字 之间加半角空格
    s = re.sub(r"([一-龥])([A-Za-z0-9])", r"\1 \2", s)
    # 2. 英文字母/数字 + 中文 之间加半角空格
    s = re.sub(r"([A-Za-z0-9])([一-龥])", r"\1 \2", s)
    # 3. 半角括号转全角（但保留 URL / 代码 / 美元金额里的）
    #   只在中文上下文里转。简单规则：括号紧贴中文的转
    s = re.sub(r"([一-龥])\(", r"\1（", s)
    s = re.sub(r"\)([一-龥])", r"）\1", s)
    s = re.sub(r"([一-龥])\)", r"\1）", s)
    s = re.sub(r"\(([一-龥])", r"（\1", s)
    # 4. 直引号转弯引号（中文上下文）
    # 简单不改，避免破坏 LLM 输出里的 \"abc\" 引用
    # 5. 多余空格压缩
    s = re.sub(r" {2,}", " ", s)
    # 6. 中文标点前后的空格全清掉（中文标点本身已经表达断句）
    s = re.sub(r" ([，。！？；：、])", r"\1", s)
    s = re.sub(r"([，。！？；：、]) ", r"\1", s)
    # 7. 数字加单位（如 "5 月" "22 日"）压回不加空格——按中文习惯
    s = re.sub(r"(\d) (月|日|年|时|分|秒|岁|个|条|篇|次|倍|位|名|元|分|周)", r"\1\2", s)
    return s.strip()


def normalize_item(d: dict) -> int:
    """对单条 news/github/skill 全字段做规范化。返回修改次数。"""
    n = 0
    for k in ("title", "summary", "background", "impact", "details", "description", "why"):
        v = d.get(k)
        if isinstance(v, str):
            new = normalize_punctuation(v)
            if new != v:
                d[k] = new
                n += 1
    for k in ("keyPoints", "audience", "useCases", "risks", "tags", "features", "quickStart"):
        v = d.get(k)
        if isinstance(v, list):
            new = [normalize_punctuation(x) if isinstance(x, str) else x for x in v]
            if new != v:
                d[k] = new
                n += 1
    return n


def main():
    p = "data/generated-data.json"
    d = json.load(open(p, encoding="utf-8"))
    total = 0
    for arr_key in ("news", "githubWeekly", "skillRecommendations"):
        for item in d.get(arr_key, []):
            total += normalize_item(item)
    for tid, items in (d.get("topicResources") or {}).items():
        if isinstance(items, list):
            for item in items:
                total += normalize_item(item)

    open(p, "w", encoding="utf-8").write(json.dumps(d, ensure_ascii=False, indent=2))
    open("assets/data/generated-data.js", "w", encoding="utf-8").write(
        "window.AI_GENERATED_DATA = " + json.dumps(d, ensure_ascii=False, indent=2) + ";\n"
    )
    print(f"已规范化 {total} 个字段（中英文加空格、半角括号转全角、清多余空格）")

    # 验证
    sample = d["news"][0] if d.get("news") else None
    if sample:
        print("\n样本：")
        print(f"  title: {sample.get('title')}")
        print(f"  summary: {sample.get('summary', '')[:120]}")


if __name__ == "__main__":
    main()

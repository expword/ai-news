from __future__ import annotations

import json
import os
import re
import sys
import threading
import time
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime, timedelta, timezone
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

LLM_WORKERS = int(os.getenv("LLM_WORKERS", "50"))

ROOT = Path(__file__).resolve().parent.parent
GENERATED_JSON = ROOT / "data" / "generated-data.json"
GENERATED_JS = ROOT / "assets" / "data" / "generated-data.js"
SCHEDULER_STATE = ROOT / "data" / "scheduler-state.json"

FREE_INFO_SOURCES = [
    {"name": "Google Programmable Search", "description": "官方 Google 搜索 API，注册 Google Cloud/PSE 后每天 100 次免费查询，适合兜底搜 AI 工具、模型和榜单来源。", "url": "https://developers.google.com/custom-search/v1/overview"},
    {"name": "NewsAPI", "description": "新闻搜索 API，注册后开发者计划每天 100 次请求；注意免费版只适合开发测试，不建议直接用于生产商业站。", "url": "https://newsapi.org/pricing"},
    {"name": "GNews API", "description": "新闻搜索 API，注册免费 key 后每天 100 次请求，适合抓 AI、startup、technology 等关键词新闻。", "url": "https://gnews.io/"},
    {"name": "NewsData.io", "description": "新闻 API，注册免费 key 后每天 200 credits，免费层新闻有约 12 小时延迟，适合每日自动简报。", "url": "https://newsdata.io/pricing"},
    {"name": "The Guardian Open Platform", "description": "卫报内容 API，注册 key 后每天 500 次请求、每秒 1 次；适合搜索 AI 政策、产业和深度报道。", "url": "https://open-platform.theguardian.com/access/"},
    {"name": "Currents API", "description": "新闻 API，官方比较页标注免费层每天 1,000 次请求；适合补充英文科技新闻源。", "url": "https://currentsapi.services/en/compare/features"},
    {"name": "World News API", "description": "全球新闻搜索 API，注册后免费层每天 50 points，可查近 1 个月内容，适合低频精选。", "url": "https://worldnewsapi.com/pricing"},
    {"name": "Marketaux", "description": "金融/市场新闻 API，注册后免费层每天 100 次请求，适合 AI 公司融资、股票和商业动态。", "url": "https://www.marketaux.com/pricing"},
    {"name": "FreeNewsAPI.io", "description": "新闻 API，页面标注每天 5,000 次免费请求；适合做备用新闻源，上线前需再确认服务稳定性。", "url": "https://www.freenewsapi.io/"},
    {"name": "NewsDataHub", "description": "新闻 API，注册后免费层每天 50 次请求，无需信用卡，适合低频抓 AI 关键词和来源列表。", "url": "https://newsdatahub.com/free-news-api"},
    {"name": "GitHub Trending", "description": "免费查看每日、每周、每月热门开源项目，可按语言筛选，适合追 AI 项目热点。", "url": "https://github.com/trending"},
    {"name": "GitHub Search API", "description": "免费搜索最近更新的 AI、LLM、Agent、MCP 项目；未登录每小时 60 次，token 每小时 5,000 次。", "url": "https://github.com/search?q=topic%3Aartificial-intelligence&type=repositories&s=updated&o=desc"},
    {"name": "Hugging Face Trending", "description": "免费观察模型、数据集、Spaces 趋势；Hub API 有免费速率限制，适合每日拉取开源模型和 Demo。", "url": "https://huggingface.co/models?sort=trending"},
    {"name": "Papers with Code Trending", "description": "免费查看论文、代码、任务和榜单趋势，适合 AI 论文与开源项目栏目。", "url": "https://paperswithcode.com/"},
    {"name": "arXiv cs.AI Recent", "description": "免费追踪人工智能最新论文；建议遵守约每 3 秒 1 次请求，适合每日论文抓取。", "url": "https://arxiv.org/list/cs.AI/recent"},
    {"name": "Semantic Scholar", "description": "免费学术搜索 API，可查论文、作者、引用；可申请 API key，适合 AI 论文和数据集来源核对。", "url": "https://www.semanticscholar.org/"},
    {"name": "Perplexity", "description": "带引用的 AI 搜索入口，适合人工核对新闻、工具和产品动态。", "url": "https://www.perplexity.ai/"},
    {"name": "Phind", "description": "面向开发者的 AI 搜索，适合查框架、库、GitHub 项目和技术问题。", "url": "https://www.phind.com/"},
    {"name": "Consensus", "description": "面向论文证据的 AI 搜索，适合找研究结论和可引用论文。", "url": "https://consensus.app/"},
    {"name": "AI News", "description": "AI 行业新闻聚合入口，可作为人工选题和每日资讯来源。", "url": "https://www.artificialintelligence-news.com/"},
]

SEARCH_QUERIES = [
    "artificial intelligence",
    "large language model",
    "generative AI",
    "AI agent",
    "AI coding tool",
    "AI benchmark leaderboard",
    "open source LLM",
    "RAG framework",
    "Claude AI",
    "Google Gemini",
    "DeepSeek",
    "Qwen Alibaba",
]

GITHUB_QUERIES = [
    "topic:artificial-intelligence pushed:>={date} stars:>50",
    "topic:llm pushed:>={date} stars:>30",
    "topic:ai-agent pushed:>={date} stars:>20",
    "topic:mcp pushed:>={date} stars:>10",
    "topic:generative-ai pushed:>={date} stars:>20",
    "topic:rag pushed:>={date} stars:>20",
    "topic:agent-skills pushed:>={date} stars:>5",
    "topic:claude-code pushed:>={date} stars:>5",
]

RSS_FEEDS = [
    {"name": "Hugging Face Blog", "url": "https://huggingface.co/blog/feed.xml", "lang": "en"},
    {"name": "VentureBeat AI", "url": "https://venturebeat.com/category/ai/feed/", "lang": "en"},
    {"name": "TechCrunch AI", "url": "https://techcrunch.com/category/artificial-intelligence/feed/", "lang": "en"},
    {"name": "The Register AI/ML", "url": "https://www.theregister.com/software/ai_ml/headlines.atom", "lang": "en"},
    {"name": "MIT Tech Review AI", "url": "https://www.technologyreview.com/topic/artificial-intelligence/feed", "lang": "en"},
    {"name": "Google AI Blog", "url": "https://blog.google/technology/ai/rss/", "lang": "en"},
    {"name": "OpenAI Blog", "url": "https://openai.com/news/rss.xml", "lang": "en"},
    {"name": "DeepLearning.AI", "url": "https://www.deeplearning.ai/the-batch/feed/", "lang": "en"},
    {"name": "量子位", "url": "https://www.qbitai.com/feed", "lang": "zh"},
    {"name": "机器之心", "url": "https://www.jiqizhixin.com/rss", "lang": "zh"},
    {"name": "IT之家 AI", "url": "https://www.ithome.com/rss/", "lang": "zh"},
    {"name": "少数派", "url": "https://sspai.com/feed", "lang": "zh"},
]


def load_env() -> None:
    env_path = ROOT / ".env"
    if not env_path.exists():
        return
    for line in env_path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        os.environ.setdefault(key.strip(), value.strip().strip("'\""))


def today_iso() -> str:
    return datetime.now().strftime("%Y-%m-%d")


def days_ago(days: int) -> str:
    return (datetime.now() - timedelta(days=days)).strftime("%Y-%m-%d")


def week_id(now: datetime | None = None) -> str:
    now = now or datetime.now(timezone.utc)
    return f"{now.isocalendar().year}-W{now.isocalendar().week:02d}"


def week_label(now: datetime | None = None) -> str:
    now = now or datetime.now()
    start = now - timedelta(days=now.weekday())
    return f"{start.strftime('%Y-%m-%d')} ~ {now.strftime('%Y-%m-%d')}"


def read_json(path: Path, fallback):
    if not path.exists():
        return fallback
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except Exception:
        return fallback


def write_generated(data: dict) -> None:
    GENERATED_JSON.parent.mkdir(parents=True, exist_ok=True)
    GENERATED_JSON.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    GENERATED_JS.write_text("window.AI_GENERATED_DATA = " + json.dumps(data, ensure_ascii=False, indent=2) + ";\n", encoding="utf-8")


def uniq_by(items: list[dict], key_fn) -> list[dict]:
    seen = set()
    result = []
    for item in items:
        key = key_fn(item)
        if not key or key in seen:
            continue
        seen.add(key)
        result.append(item)
    return result


def request_json(url: str, headers: dict | None = None, payload: dict | None = None, timeout: int = 25):
    data = None
    method = "GET"
    req_headers = {"User-Agent": "ai-nav-site-python/1.0", **(headers or {})}
    if payload is not None:
        method = "POST"
        data = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        req_headers.setdefault("Content-Type", "application/json")
    req = urllib.request.Request(url, data=data, headers=req_headers, method=method)
    with urllib.request.urlopen(req, timeout=timeout) as response:
        text = response.read().decode("utf-8", errors="replace")
        return json.loads(text)


def request_text(url: str, headers: dict | None = None, timeout: int = 25) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": "ai-nav-site-python/1.0", **(headers or {})})
    with urllib.request.urlopen(req, timeout=timeout) as response:
        return response.read().decode("utf-8", errors="replace")


def category_from_text(text: str) -> str:
    value = text.lower()
    if "github" in value or "coding" in value or "code" in value:
        return "ai-coding"
    if "benchmark" in value or "leaderboard" in value:
        return "ai-benchmark"
    if "agent" in value or "mcp" in value:
        return "ai-agents"
    if any(word in value for word in ["image", "video", "tts", "audio"]):
        return "ai-image-video"
    if any(word in value for word in ["paper", "arxiv", "research"]):
        return "ai-research"
    if any(word in value for word in ["business", "funding", "stock", "market"]):
        return "ai-business"
    return "ai-models"


def call_json_llm(system: str, user: str) -> dict | None:
    api_key = os.getenv("LLM_API_KEY")
    if not api_key:
        return None
    base_url = os.getenv("LLM_BASE_URL", "https://api.openai.com").rstrip("/")
    endpoint = os.getenv("LLM_ENDPOINT") or (f"{base_url}/chat/completions" if base_url.endswith("/v1") else f"{base_url}/v1/chat/completions")
    body = {
        "model": os.getenv("LLM_MODEL", "gpt-4.1-mini"),
        "temperature": 0.2,
        "response_format": {"type": "json_object"},
        "messages": [{"role": "system", "content": system}, {"role": "user", "content": user}],
    }
    headers = {"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"}
    try:
        payload = request_json(endpoint, headers=headers, payload=body, timeout=60)
    except Exception:
        body.pop("response_format", None)
        try:
            payload = request_json(endpoint, headers=headers, payload=body, timeout=60)
        except Exception:
            return None
    content = (((payload or {}).get("choices") or [{}])[0].get("message") or {}).get("content") or "{}"
    match = re.search(r"\{[\s\S]*\}", content)
    try:
        return json.loads(match.group(0) if match else content)
    except Exception:
        return None


def fetch_github_candidates(since: str) -> list[dict]:
    headers = {"Accept": "application/vnd.github+json"}
    if os.getenv("GITHUB_TOKEN"):
        headers["Authorization"] = f"Bearer {os.getenv('GITHUB_TOKEN')}"
    results = []
    for template in GITHUB_QUERIES:
        query = template.replace("{date}", since)
        params = urllib.parse.urlencode({"q": query, "sort": "stars", "order": "desc", "per_page": "10"})
        try:
            payload = request_json(f"https://api.github.com/search/repositories?{params}", headers=headers)
        except Exception:
            continue
        for item in payload.get("items", []):
            results.append({
                "name": item.get("full_name"),
                "lang": item.get("language") or "Repo",
                "description": item.get("description") or "AI 相关开源项目。",
                "stars": f"{item.get('stargazers_count', 0)} stars",
                "why": "近期更新且具备 AI / LLM / Agent 相关主题，适合做项目介绍、教程或同类对比。",
                "url": item.get("html_url"),
                "source": f"GitHub Search · {today_iso()}",
            })
    return uniq_by(results, lambda item: item.get("name"))[:20]


def fetch_news_api_items() -> list[dict]:
    """轮询 SEARCH_QUERIES 所有关键词，覆盖每个已配置的新闻 API。
    单次每个 query 拉 5 条，6 个 query × 7 个 API = 最多约 42 次 API 调用，
    在每个免费层 100 次/天的额度内安全运行。"""
    items: list[dict] = []
    queries = SEARCH_QUERIES[:6]  # 每次跑前 6 个关键词，避免烧 quota

    def add(title, summary, url, source):
        if title and url:
            items.append({"title": title, "summary": summary or "", "url": url, "source": source})

    if os.getenv("NEWSAPI_KEY"):
        for q in queries:
            params = urllib.parse.urlencode({"q": q, "language": "en", "sortBy": "publishedAt", "pageSize": "5", "apiKey": os.getenv("NEWSAPI_KEY")})
            try:
                for article in request_json(f"https://newsapi.org/v2/everything?{params}").get("articles", []):
                    add(article.get("title"), article.get("description"), article.get("url"), f"NewsAPI:{q}")
            except Exception:
                pass

    if os.getenv("GNEWS_API_KEY"):
        for q in queries:
            params = urllib.parse.urlencode({"q": q, "lang": "en", "max": "5", "apikey": os.getenv("GNEWS_API_KEY")})
            try:
                for article in request_json(f"https://gnews.io/api/v4/search?{params}").get("articles", []):
                    add(article.get("title"), article.get("description"), article.get("url"), f"GNews:{q}")
            except Exception:
                pass

    if os.getenv("NEWSDATA_API_KEY"):
        for q in queries:
            params = urllib.parse.urlencode({"apikey": os.getenv("NEWSDATA_API_KEY"), "q": q, "language": "en"})
            try:
                for article in request_json(f"https://newsdata.io/api/1/latest?{params}").get("results", [])[:5]:
                    add(article.get("title"), article.get("description"), article.get("link"), f"NewsData.io:{q}")
            except Exception:
                pass

    if os.getenv("GUARDIAN_API_KEY"):
        for q in queries:
            params = urllib.parse.urlencode({"q": q, "api-key": os.getenv("GUARDIAN_API_KEY"), "page-size": "5", "order-by": "newest"})
            try:
                for article in request_json(f"https://content.guardianapis.com/search?{params}").get("response", {}).get("results", []):
                    add(article.get("webTitle"), "", article.get("webUrl"), f"The Guardian:{q}")
            except Exception:
                pass

    if os.getenv("CURRENTS_API_KEY"):
        for q in queries:
            params = urllib.parse.urlencode({"keywords": q, "language": "en", "apiKey": os.getenv("CURRENTS_API_KEY")})
            try:
                for article in request_json(f"https://api.currentsapi.services/v1/search?{params}").get("news", [])[:5]:
                    add(article.get("title"), article.get("description"), article.get("url"), f"Currents:{q}")
            except Exception:
                pass

    if os.getenv("WORLDNEWS_API_KEY"):
        for q in queries:
            params = urllib.parse.urlencode({"text": q, "number": "5", "api-key": os.getenv("WORLDNEWS_API_KEY")})
            try:
                for article in request_json(f"https://api.worldnewsapi.com/search-news?{params}").get("news", []):
                    add(article.get("title"), article.get("summary"), article.get("url"), f"World News API:{q}")
            except Exception:
                pass

    if os.getenv("MARKETAUX_API_KEY"):
        for q in queries:
            params = urllib.parse.urlencode({"api_token": os.getenv("MARKETAUX_API_KEY"), "search": q, "limit": "5", "language": "en"})
            try:
                for article in request_json(f"https://api.marketaux.com/v1/news/all?{params}").get("data", []):
                    add(article.get("title"), article.get("description"), article.get("url"), f"Marketaux:{q}")
            except Exception:
                pass

    return uniq_by(items, lambda item: item.get("url"))


def strip_html(html: str) -> str:
    """去掉 HTML 标签 + 折叠空白，处理 RSS description 里的富文本。"""
    if not html:
        return ""
    text = re.sub(r"<[^>]+>", " ", html)
    text = re.sub(r"&nbsp;", " ", text)
    text = re.sub(r"&amp;", "&", text)
    text = re.sub(r"&lt;", "<", text)
    text = re.sub(r"&gt;", ">", text)
    text = re.sub(r"&#39;", "'", text)
    text = re.sub(r"&quot;", '"', text)
    return re.sub(r"\s+", " ", text).strip()


def fetch_rss_items() -> list[dict]:
    """抓取 RSS_FEEDS 里所有 feed，兼容 RSS 2.0 和 Atom 两种格式。"""
    items: list[dict] = []
    atom_ns = {"atom": "http://www.w3.org/2005/Atom"}
    for feed in RSS_FEEDS:
        try:
            xml_text = request_text(feed["url"], timeout=15)
            root = ET.fromstring(xml_text)
        except Exception:
            continue

        # RSS 2.0 ：<channel><item>
        for item in root.findall(".//item")[:8]:
            title = strip_html(item.findtext("title") or "")
            link = (item.findtext("link") or "").strip()
            desc = strip_html(item.findtext("description") or "")
            if title and link:
                items.append({
                    "title": title,
                    "summary": desc[:500],
                    "url": link,
                    "source": f"RSS · {feed['name']}",
                    "lang": feed.get("lang", "en"),
                })

        # Atom：<feed><entry>
        for entry in root.findall("atom:entry", atom_ns)[:8]:
            title = strip_html(entry.findtext("atom:title", default="", namespaces=atom_ns) or "")
            link_el = entry.find("atom:link", atom_ns)
            link = link_el.get("href") if link_el is not None else ""
            summ = strip_html(entry.findtext("atom:summary", default="", namespaces=atom_ns) or "")
            if not summ:
                summ = strip_html(entry.findtext("atom:content", default="", namespaces=atom_ns) or "")
            if title and link:
                items.append({
                    "title": title,
                    "summary": summ[:500],
                    "url": link,
                    "source": f"RSS · {feed['name']}",
                    "lang": feed.get("lang", "en"),
                })

    return uniq_by(items, lambda item: item.get("url"))[:40]


def fetch_research_items() -> list[dict]:
    items = []
    try:
        params = urllib.parse.urlencode({"search_query": 'all:"large language model"', "start": "0", "max_results": "8", "sortBy": "submittedDate", "sortOrder": "descending"})
        xml_text = request_text(f"https://export.arxiv.org/api/query?{params}", timeout=30)
        root = ET.fromstring(xml_text)
        ns = {"atom": "http://www.w3.org/2005/Atom"}
        for entry in root.findall("atom:entry", ns):
            title = " ".join((entry.findtext("atom:title", default="", namespaces=ns) or "").split())
            summary = " ".join((entry.findtext("atom:summary", default="", namespaces=ns) or "").split())[:500]
            url = entry.findtext("atom:id", default="", namespaces=ns)
            if title and url:
                items.append({"title": title, "summary": summary, "url": url, "source": "arXiv"})
        time.sleep(3)
    except Exception:
        pass

    headers = {}
    if os.getenv("SEMANTIC_SCHOLAR_API_KEY"):
        headers["x-api-key"] = os.getenv("SEMANTIC_SCHOLAR_API_KEY")
    try:
        params = urllib.parse.urlencode({"query": "large language model agents", "limit": "8", "fields": "title,url,abstract,year"})
        payload = request_json(f"https://api.semanticscholar.org/graph/v1/paper/search?{params}", headers=headers)
        for paper in payload.get("data", []):
            items.append({"title": paper.get("title"), "summary": paper.get("abstract") or "", "url": paper.get("url"), "source": "Semantic Scholar"})
    except Exception:
        pass

    return uniq_by(items, lambda item: item.get("url"))[:16]


NEWS_CATEGORIES = [
    "ai-tools", "ai-coding", "ai-image-video", "ai-agents",
    "ai-models", "ai-benchmark", "ai-office", "ai-research", "ai-business",
]


def enrich_news_item(raw: dict) -> dict | None:
    """单条原始信息 → 调一次 LLM，产出读者向中文快讯条目。
    只输出读者关心的字段，去掉所有编辑视角字段（contentIdeas / nextActions 等）。"""
    text = item_text(raw)
    rule_category = category_from_text(text)
    prompt = {
        "task": "把这条原始信息整理成中文 AI 快讯条目。基于事实总结，不要编造。",
        "input": {
            "title": raw.get("title") or raw.get("name") or "",
            "summary": raw.get("summary") or raw.get("description") or "",
            "url": raw.get("url"),
            "source": raw.get("source"),
            "lang": raw.get("lang"),
        },
        "ruleHint": {"category": rule_category, "note": "category 必须是 schema 列出的之一。"},
        "schema": {
            "title": "中文标题，简洁说清是什么（25-50 字）",
            "summary": "中文摘要 120-220 字：是什么、做了什么、亮点、和读者关系",
            "category": "|".join(NEWS_CATEGORIES),
            "tags": ["3-5 个中文标签"],
            "keyPoints": ["3-5 条关键事实，每条 30-80 字，基于原文事实"],
            "background": "事件背景或上下文 60-120 字（如果原文有不止于摘要的内容才填）",
            "impact": "对开发者/创业者/企业的实际影响 80-150 字",
            "audience": ["2-4 个具体人群（不要笼统说 'AI 用户'）"],
            "useCases": ["2-4 个具体使用/参考场景"],
            "risks": ["1-3 条注意事项或局限"],
        },
        "requirements": [
            "中文输出，避免翻译腔",
            "category 必须在 schema 列出的范围内",
            "标题不要带 'AI快讯：' 前缀",
            "若原文信息不足以填某字段，宁可留空数组/空字符串，也不要编造",
            "不要输出 url / source / date / contentIdeas / nextActions / moduleTargets",
        ],
    }
    result = call_json_llm(
        "你是中文 AI 导航站编辑，把信息整理成读者向的中文条目。只输出 JSON，不要 markdown。",
        json.dumps(prompt, ensure_ascii=False),
    )
    if not isinstance(result, dict) or not result.get("title"):
        return None
    # 系统注入字段
    result["url"] = raw.get("url")
    result["source"] = raw.get("source") or "Auto Search"
    result["date"] = today_iso()
    if result.get("category") not in NEWS_CATEGORIES:
        result["category"] = rule_category
    # 移除可能被 LLM 误输出的编辑视角字段
    for k in ("contentIdeas", "nextActions", "moduleTargets", "routeReason", "whyUseful"):
        result.pop(k, None)
    return result


GITHUB_CATEGORIES = [
    "Coding Agent", "AI 编辑器", "本地推理", "本地 LLM UI", "推理引擎",
    "LLM 应用平台", "Agent 框架", "RAG 引擎", "MCP 服务", "Skill 集合", "视频生成",
]

SKILL_TYPES = [
    "agent-skills 仓库", "Skill 精选", "官方平台更新",
    "MCP / 工作流", "MCP 服务", "方法论 / 文章",
    "桌面工具", "Agent 项目", "中文 Prompt 模板",
]


def is_skill_repo(raw: dict) -> bool:
    """判断 GitHub 仓库是不是 Skill 类型（用于路由到 weeklyDigests.skills）。"""
    blob = f"{raw.get('name') or ''} {raw.get('description') or ''}".lower()
    if any(k in blob for k in ["agent-skills", "claude-code-skill", "/skills", "skill-collection",
                                "mcp-server", "claude-skills", "code-skills"]):
        return True
    name = (raw.get("name") or "").lower()
    return name.endswith("/skills") or "agent-skills" in name


def enrich_github_item(raw: dict) -> dict | None:
    """单条 GitHub 项目 → 1 次 LLM，产出含 category 的中文项目条目。"""
    prompt = {
        "task": "把这个 GitHub 项目整理成中文项目条目。基于输入事实总结，不要编造 star 数。",
        "input": {
            "name": raw.get("name"),
            "lang": raw.get("lang"),
            "description": raw.get("description"),
            "url": raw.get("url"),
            "stars": raw.get("stars"),
        },
        "schema": {
            "name": "owner/repo 原名，不翻译",
            "lang": "主要语言",
            "category": "|".join(GITHUB_CATEGORIES),
            "description": "一句话中文描述（40-80 字）",
            "details": "中文详细介绍 150-280 字：解决什么问题、和同类有什么不同、适合谁",
            "features": ["4-6 条核心特性，每条 15-40 字"],
            "useCases": ["3-5 个具体使用场景"],
            "quickStart": ["3-5 步快速上手指引"],
            "why": "为什么值得看 60-120 字",
            "tags": ["3-5 个中文标签"]
        },
        "requirements": [
            "中文输出",
            "category 必须严格在 schema 列出的 11 类之一，不要造新类型",
            "如果不确定，选最接近的；非 AI 工具的项目不要进入",
            "不要编造功能或 star 数据",
        ],
    }
    result = call_json_llm(
        "你是中文 AI 导航站编辑。只输出 JSON。基于 GitHub 项目信息整理成内容丰富的中文项目卡。",
        json.dumps(prompt, ensure_ascii=False),
    )
    if not isinstance(result, dict) or not result.get("name"):
        return None
    result["url"] = raw.get("url")
    result["stars"] = raw.get("stars") or result.get("stars") or ""
    result["source"] = raw.get("source") or "GitHub"
    result["date"] = today_iso()
    if result.get("category") not in GITHUB_CATEGORIES:
        result["category"] = "Coding Agent"
    return result


def enrich_skill_item(raw: dict) -> dict | None:
    """单条 Skill 候选 → 1 次 LLM，产出 weeklyDigests.skills 用的 Skill 条目。"""
    prompt = {
        "task": "把这个项目/资源整理为 AI Skill 条目（要被分类到 9 种 Skill type 之一）。",
        "input": {
            "title": raw.get("name") or raw.get("title"),
            "description": raw.get("description") or raw.get("summary"),
            "lang": raw.get("lang"),
            "url": raw.get("url"),
            "source": raw.get("source"),
        },
        "schema": {
            "title": "Skill 名称（保留英文项目名时不翻译，比如 mattpocock/skills 保留原样）",
            "type": "|".join(SKILL_TYPES),
            "description": "一句话中文说明（40-80 字）",
            "details": "中文详细介绍 150-260 字：这个 Skill 能让 Claude Code/Cursor 做什么、和同类比有什么独特",
            "features": ["4-6 条核心特性"],
            "useCases": ["3-5 个适用场景：什么团队/什么场景该装这个"],
            "tags": ["3-5 个中文标签"]
        },
        "requirements": [
            "中文输出",
            "type 必须严格选 schema 给出的 9 种之一",
            "如果输入不像 AI Skill / agent-skills 仓库 / MCP 服务，返回 null",
            "不要编造功能",
        ],
    }
    result = call_json_llm(
        "你是中文 AI 导航站 Skill 编辑。只输出 JSON。基于输入资料判断它是哪类 Skill 并整理条目。",
        json.dumps(prompt, ensure_ascii=False),
    )
    if not isinstance(result, dict) or not result.get("title"):
        return None
    result["url"] = raw.get("url")
    result["source"] = raw.get("source") or "GitHub"
    result["date"] = today_iso()
    if result.get("type") not in SKILL_TYPES:
        result["type"] = "agent-skills 仓库"
    return result


def parallel_enrich(items: list[dict], enricher, label: str = "items") -> list[dict]:
    """用 ThreadPoolExecutor 并发调 LLM，单条失败回退到 fallback。"""
    if not items:
        return []
    results: list[dict] = []
    failed: list[dict] = []
    workers = min(LLM_WORKERS, max(1, len(items)))
    with ThreadPoolExecutor(max_workers=workers) as ex:
        future_to_raw = {ex.submit(enricher, it): it for it in items}
        for fut in as_completed(future_to_raw):
            raw = future_to_raw[fut]
            try:
                enriched = fut.result()
                if enriched:
                    results.append(enriched)
                else:
                    failed.append(raw)
            except Exception:
                failed.append(raw)
    print(f"  · parallel_enrich({label}): 成功 {len(results)} / 失败 {len(failed)} / 总 {len(items)}")
    return results, failed


def fallback_news(raw_items: list[dict]) -> list[dict]:
    """LLM 失败时的兜底：只填读者向最小字段，不塞编辑视角字段。"""
    news = []
    for item in uniq_by(raw_items, lambda row: row.get("url"))[:10]:
        title = item.get("title") or item.get("name") or "AI 资讯"
        summary = (item.get("summary") or item.get("description") or "").strip()
        news.append({
            "title": title,
            "summary": summary[:180] if summary else "",
            "category": category_from_text(f"{title} {summary}"),
            "source": item.get("source") or "Auto Search",
            "date": today_iso(),
            "tags": [],
            "url": item.get("url"),
            "keyPoints": [],
            "background": "",
            "impact": "",
            "audience": [],
            "useCases": [],
            "risks": [],
        })
    return news


def normalize_news(raw_items: list[dict]) -> list[dict]:
    if not raw_items:
        return []
    prompt = {
        "task": "把原始搜索/GitHub/论文结果提取成中文 AI 快讯，必须总结有用内容，不要只翻译标题。",
        "schema": {
            "news": [{
                "title": "中文标题",
                "summary": "80-140字中文摘要",
                "category": "ai-tools|ai-coding|ai-image-video|ai-agents|ai-models|ai-benchmark|ai-office|ai-research|ai-business",
                "source": "来源名",
                "date": today_iso(),
                "tags": ["2-4个标签"],
                "url": "原始链接",
                "keyPoints": ["提取出的关键事实1", "关键事实2", "关键事实3"],
                "whyUseful": "为什么这条对站内读者有用",
                "nextActions": ["站内下一步内容动作1", "动作2"]
            }]
        },
        "requirements": ["最多输出10条", "只基于输入来源", "保留原始url", "过滤重复或低价值内容"],
        "items": raw_items[:30],
    }
    result = call_json_llm(
        "你是中文 AI 导航站编辑。只输出 JSON。你要从原始信息里提取有用事实、总结价值、给出站内内容动作，不要编造。",
        json.dumps(prompt, ensure_ascii=False),
    )
    if isinstance(result, dict) and isinstance(result.get("news"), list) and result["news"]:
        return result["news"][:10]
    return fallback_news(raw_items)


def normalize_weekly(github_items: list[dict]) -> dict:
    fallback = {
        "weekId": week_id(),
        "label": week_label(),
        "summary": f"自动收集本周 AI GitHub 项目 {len(github_items)} 个，建议优先补安装教程、使用场景和同类对比。",
        "skills": [],
        "github": github_items[:12],
    }
    if not github_items:
        return fallback
    prompt = {
        "task": "把 GitHub 项目提取成本周 GitHub 周榜和 Skill 推荐。必须总结项目解决的问题、适合谁、可写成什么内容。",
        "schema": {
            "summary": "本周趋势总结",
            "github": [{"name": "", "lang": "", "description": "", "details": "", "features": [], "useCases": [], "why": "", "stars": "", "url": "", "source": "", "tags": []}],
            "skills": [{"title": "", "type": "", "description": "", "details": "", "features": [], "useCases": [], "url": "", "source": "", "tags": []}],
        },
        "items": github_items[:20],
    }
    result = call_json_llm(
        "你是中文 AI 导航站编辑。只输出 JSON。你要提取真正有用的 GitHub 趋势与 Skill，不要编造 star 增量。",
        json.dumps(prompt, ensure_ascii=False),
    )
    if not isinstance(result, dict):
        return fallback
    return {
        "weekId": week_id(),
        "label": week_label(),
        "summary": result.get("summary") or fallback["summary"],
        "skills": (result.get("skills") or [])[:8],
        "github": (result.get("github") or fallback["github"])[:12],
    }


def topic_from_text(text: str) -> str:
    category = category_from_text(text)
    if category in {"ai-tools", "ai-coding", "ai-image-video", "ai-agents", "ai-models", "ai-office", "ai-research", "ai-business"}:
        return category
    if category == "ai-benchmark":
        return "ai-benchmark"
    return "ai-tools"


def item_text(item: dict) -> str:
    return " ".join(str(item.get(key) or "") for key in ["title", "name", "summary", "description", "source", "url", "lang"])


def routed_targets(item: dict) -> list[str]:
    text = item_text(item).lower()
    targets = ["news"]
    if item.get("name") or "github.com" in text or "github" in text:
        targets.append("githubWeekly")
        if any(word in text for word in ["skill", "prompt", "agent", "workflow", "mcp", "coding", "code"]):
            targets.append("skillRecommendations")
        targets.append("topicResources")
    if any(word in text for word in ["tool", "assistant", "app", "platform", "api", "search", "editor", "workflow"]):
        targets.append("topicResources")
    if any(word in text for word in ["benchmark", "leaderboard", "eval", "evaluation", "dataset", "ranking"]):
        targets.extend(["benchmarkBoards", "benchmarkDatasets"])
    if any(word in text for word in ["paper", "arxiv", "research", "semantic scholar"]):
        targets.append("news")
    return list(dict.fromkeys(targets))


def fallback_routed_content(raw_items: list[dict], github_items: list[dict] | None = None) -> dict:
    raw_unique = uniq_by(raw_items, lambda row: row.get("url") or row.get("name") or row.get("title"))[:18]
    routed = {
        "news": [],
        "topicResources": {},
        "skillRecommendations": [],
        "githubWeekly": [],
        "benchmarkBoards": [],
        "benchmarkDatasets": [],
        "sources": FREE_INFO_SOURCES,
    }

    for item in raw_unique:
        title = item.get("title") or item.get("name") or "AI information"
        summary = item.get("summary") or item.get("description") or "自动采集到的 AI 相关信息，建议结合原始来源继续核对。"
        source = item.get("source") or "Auto Search"
        url = item.get("url")
        text = f"{title} {summary} {source} {url or ''}"
        category = category_from_text(text)
        topic_id = topic_from_text(text)
        targets = routed_targets(item)
        name = item.get("name") or title.split("：")[-1][:80]

        routed["news"].append({
            "title": title if title.startswith(("GitHub", "AI快讯")) else f"AI快讯：{title}",
            "summary": summary[:260],
            "category": category,
            "source": source,
            "date": today_iso(),
            "tags": ["自动采集", category.replace("ai-", "")],
            "url": url,
            "moduleTargets": targets,
            "routeReason": f"根据标题、摘要和来源识别为 {category}，同步进入 {', '.join(targets)}。",
            "background": f"这条信息来自 {source}，原始标题为：{title}。",
            "keyPoints": [
                f"来源：{source}",
                f"核心信息：{summary[:120]}",
                f"原始入口：{url or '暂无链接'}",
            ],
            "impact": "可作为站内选题线索，用来补充工具介绍、趋势解读、教程或榜单更新。",
            "audience": ["AI 工具用户", "内容运营", "开发者"] if "githubWeekly" not in targets else ["开发者", "AI Agent 用户", "技术内容运营"],
            "useCases": ["写成快讯详情", "归档到对应分类", "延伸为教程或对比文章"],
            "risks": ["需要打开原始来源核对细节", "自动摘要不能替代官方说明", "热度不等于长期价值"],
            "contentIdeas": ["做中文解读", "补适用人群", "补同类对比", "加入 FAQ"],
            "nextActions": ["核对原始来源", "按模块补充详情页", "关联到对应分类或周榜"],
        })

        if "topicResources" in targets:
            routed["topicResources"].setdefault(topic_id, []).append({
                "name": name,
                "provider": source.split(" · ")[0].split(" 路 ")[0],
                "type": "AI 项目/工具",
                "bestFor": "适合进一步整理成工具条目、教程或同类对比",
                "description": summary[:220],
                "useCases": ["快速了解", "教程选题", "同类对比"],
                "watch": "自动采集条目需要人工核对功能、价格、许可和更新时间。",
                "sourceName": source,
                "url": url or "#",
            })

        if "skillRecommendations" in targets:
            routed["skillRecommendations"].append({
                "title": f"{name} 使用 Skill",
                "level": "实战",
                "description": f"围绕 {name} 整理安装、配置、适用场景、限制和可复用提示词。",
                "keywords": ["AI", "Skill", topic_id],
                "url": url or "#",
                "source": source,
                "tags": ["Skill", topic_id],
            })

        if "githubWeekly" in targets:
            routed["githubWeekly"].append({
                "name": name,
                "lang": item.get("lang") or "Repo",
                "description": summary[:180],
                "details": summary[:500],
                "features": ["近期活跃", "适合做项目介绍", "可延伸教程"],
                "useCases": ["开源项目追踪", "技术教程", "同类项目对比"],
                "why": "由 GitHub 或开发者生态信号识别，适合进入每周 GitHub 模块。",
                "stars": item.get("stars") or "",
                "url": url or "#",
                "source": source,
                "tags": ["GitHub", topic_id],
            })

        # benchmarkBoards / benchmarkDatasets 故意不自动写入——避免污染人工榜单

    if github_items:
        routed["githubWeekly"] = uniq_by([*routed["githubWeekly"], *github_items], lambda item: item.get("name") or item.get("url"))[:20]

    return routed


def normalize_routed_content(raw_items: list[dict], github_items: list[dict]) -> dict:
    fallback = fallback_routed_content(raw_items, github_items)
    if not raw_items:
        return fallback

    prompt = {
        "task": "把原始 AI 信息分发到站点合适模块。不是只生成快讯；要判断它应进入哪些模块，并为每个模块生成可直接展示的字段。",
        "siteModules": {
            "news": "今日快讯/历史快讯，适合新闻、论文、产品发布、趋势线索。",
            "topicResources": "AI工具导航分类页，按 topicId 放工具、平台、开源项目和服务。",
            "skillRecommendations": "Skill推荐，放可执行方法、工作流、提示词、Agent使用方式。",
            "githubWeekly": "一周最新 GitHub，放开源项目和开发者生态项目。",
            "benchmarkBoards": "大模型/ASR/TTS/OCR/Embedding等专业榜单入口。",
            "benchmarkDatasets": "测评数据集入口。",
            "sources": "免费搜索、新闻、论文、GitHub等信息源。",
        },
        "topicIds": ["ai-tools", "ai-coding", "ai-image-video", "ai-agents", "ai-models", "ai-benchmark", "ai-office", "ai-research", "ai-business"],
        "schema": {
            "news": [{
                "title": "", "summary": "", "category": "", "source": "", "date": today_iso(), "tags": [], "url": "",
                "moduleTargets": [], "routeReason": "", "background": "", "keyPoints": [], "impact": "",
                "audience": [], "useCases": [], "risks": [], "contentIdeas": [], "nextActions": []
            }],
            "topicResources": {
                "ai-coding": [{"name": "", "provider": "", "type": "", "bestFor": "", "description": "", "useCases": [], "watch": "", "sourceName": "", "url": ""}]
            },
            "skillRecommendations": [{"title": "", "level": "", "description": "", "keywords": [], "url": "", "source": "", "tags": []}],
            "githubWeekly": [{"name": "", "lang": "", "description": "", "details": "", "features": [], "useCases": [], "why": "", "stars": "", "url": "", "source": "", "tags": []}],
            "benchmarkBoards": [{"title": "", "type": "", "description": "", "datasets": [], "rankingMetric": "", "rankingUpdated": "", "rankingSourceName": "", "rankingSourceUrl": "", "rankings": [], "source": "", "url": ""}],
            "benchmarkDatasets": [{"name": "", "area": "", "note": "", "source": ""}],
            "sources": [{"name": "", "description": "", "url": ""}]
        },
        "requirements": [
            "每条重要信息至少进入 news，同时按内容进入一个或多个其他模块。",
            "GitHub 仓库必须进入 githubWeekly；如果是工作流/提示词/Agent能力，也进入 skillRecommendations。",
            "工具、平台、产品、API、开源项目应进入 topicResources，并选择最合适 topicId。",
            "benchmark、leaderboard、dataset、evaluation 信息才进入 benchmarkBoards 或 benchmarkDatasets。",
            "内容要丰富：背景、关键事实、影响、适用人群、使用场景、风险、延伸选题都要尽量填。",
            "只能基于输入来源，不要编造排名、价格或 star 增量。",
            "最多输出 news 12 条、topicResources 每类 8 条、githubWeekly 12 条、skills 8 条。"
        ],
        "items": raw_items[:32],
    }
    result = call_json_llm(
        "你是中文 AI 导航站的信息分发编辑。只输出 JSON。目标是把采集信息落到最合适的站点模块，并为每个模块生成可展示内容。",
        json.dumps(prompt, ensure_ascii=False),
    )
    if not isinstance(result, dict):
        return fallback

    merged = {
        "news": (result.get("news") or fallback["news"])[:12],
        "topicResources": result.get("topicResources") or fallback["topicResources"],
        "skillRecommendations": (result.get("skillRecommendations") or fallback["skillRecommendations"])[:8],
        "githubWeekly": (result.get("githubWeekly") or fallback["githubWeekly"])[:12],
        "benchmarkBoards": (result.get("benchmarkBoards") or fallback["benchmarkBoards"])[:8],
        "benchmarkDatasets": (result.get("benchmarkDatasets") or fallback["benchmarkDatasets"])[:12],
        "sources": uniq_by([*(result.get("sources") or []), *FREE_INFO_SOURCES], lambda item: f"{item.get('name')}|{item.get('url')}"),
    }
    return merged


def merge_topic_resources(current: dict | None, patch: dict | None) -> dict:
    merged = {**(current or {})}
    for topic_id, items in (patch or {}).items():
        merged[topic_id] = uniq_by([*(items or []), *(merged.get(topic_id) or [])], lambda item: item.get("url") or item.get("name"))[:40]
    return merged


def _parse_date(value) -> float:
    """把 '2026-05-23' / ISO 字符串 / 缺失值都转成 timestamp，None/空 → 0。"""
    if not value:
        return 0
    try:
        s = str(value).strip().split(" ")[0]  # 取日期部分
        # 支持 'YYYY-MM-DD' 或 ISO
        if "T" in s:
            return datetime.fromisoformat(s.replace("Z", "+00:00")).timestamp()
        return datetime.strptime(s, "%Y-%m-%d").timestamp()
    except Exception:
        return 0


def _sort_by_date_desc(items: list[dict]) -> list[dict]:
    return sorted(items, key=lambda x: _parse_date(x.get("date")), reverse=True)


def merge_generated(patch: dict) -> dict:
    current = read_json(GENERATED_JSON, {
        "lastUpdated": today_iso(), "generatedAt": "",
        "news": [], "weeklyDigests": [], "githubWeekly": [],
        "sources": [], "topicResources": {}, "skillRecommendations": [],
    })
    # 注意：benchmarkBoards / benchmarkDatasets 不再由后端写入，由 data.js 人工维护
    merged = {
        **current,
        **patch,
        "lastUpdated": today_iso(),
        "generatedAt": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
        "sources": uniq_by([*(patch.get("sources") or []), *FREE_INFO_SOURCES, *(current.get("sources") or [])], lambda item: f"{item.get('name')}|{item.get('url')}"),
        "news": uniq_by([*(patch.get("news") or []), *(current.get("news") or [])], lambda item: f"{item.get('title')}|{item.get('url', '')}")[:100],
        "weeklyDigests": uniq_by([*(patch.get("weeklyDigests") or []), *(current.get("weeklyDigests") or [])], lambda item: item.get("weekId"))[:24],
        "githubWeekly": uniq_by([*(patch.get("githubWeekly") or []), *(current.get("githubWeekly") or [])], lambda item: item.get("name") or item.get("url"))[:60],
        "topicResources": merge_topic_resources(current.get("topicResources"), patch.get("topicResources")),
        "skillRecommendations": uniq_by([*(patch.get("skillRecommendations") or []), *(current.get("skillRecommendations") or [])], lambda item: item.get("url") or item.get("title"))[:80],
    }

    # 排序：所有带 date 字段的列表按时间倒序
    merged["news"] = _sort_by_date_desc(merged["news"])
    merged["githubWeekly"] = _sort_by_date_desc(merged["githubWeekly"])
    merged["skillRecommendations"] = _sort_by_date_desc(merged["skillRecommendations"])
    # weeklyDigests 按 weekId 字符串倒序（'2026-W21' > '2026-W20'）
    merged["weeklyDigests"] = sorted(merged["weeklyDigests"], key=lambda x: str(x.get("weekId", "")), reverse=True)
    # 每个 topic 内部也排
    for tid, items in (merged.get("topicResources") or {}).items():
        if isinstance(items, list):
            merged["topicResources"][tid] = _sort_by_date_desc(items)

    # 清除遗留的 benchmark 自动写入（防止旧数据残留）
    merged.pop("benchmarkBoards", None)
    merged.pop("benchmarkDatasets", None)
    write_generated(merged)
    return merged


def split_github_for_skills(github_items: list[dict]) -> tuple[list[dict], list[dict]]:
    """把 GitHub 候选拆成"普通 GitHub 项目" 和 "可走 Skill 路线的候选"。
    可走 Skill 路线的：repo 名/描述含 skill / claude-code / mcp-server 等关键词。"""
    skill_candidates = []
    regular = []
    for raw in github_items:
        if is_skill_repo(raw):
            skill_candidates.append(raw)
        regular.append(raw)
    return regular, skill_candidates


def run_daily() -> dict:
    print(f"[{datetime.now().strftime('%H:%M:%S')}] run_daily 开始")

    github_items = fetch_github_candidates(days_ago(2))
    print(f"  · GitHub 抓取 {len(github_items)} 个候选")

    raw_news_items = []
    raw_news_items.extend(fetch_news_api_items())
    raw_news_items.extend(fetch_rss_items())
    raw_news_items.extend(fetch_research_items())
    raw_news_items = uniq_by(raw_news_items, lambda r: r.get("url"))
    print(f"  · 新闻类原始候选 {len(raw_news_items)} 条")

    # 并发 LLM 第一波：news 条目
    enriched_news, failed_news = parallel_enrich(raw_news_items[:60], enrich_news_item, "news")
    if failed_news:
        enriched_news.extend(fallback_news(failed_news))

    # 并发 LLM 第二波：GitHub 项目（含 category 分类）
    regular_gh, skill_candidates = split_github_for_skills(github_items[:30])
    enriched_github, failed_github = parallel_enrich(regular_gh, enrich_github_item, "github")
    if failed_github:
        for raw in failed_github:
            enriched_github.append({
                **raw,
                "category": "Coding Agent",
                "details": (raw.get("description") or "")[:300],
                "features": [], "useCases": [], "quickStart": [],
            })

    # 并发 LLM 第三波：Skill 候选（独立 prompt，按 9 种 type 分类）
    enriched_skills = []
    if skill_candidates:
        enriched_skills, _ = parallel_enrich(skill_candidates, enrich_skill_item, "skills")

    payload = route_enriched(enriched_news, enriched_github, enriched_skills)
    payload["sources"] = FREE_INFO_SOURCES
    print(f"[{datetime.now().strftime('%H:%M:%S')}] run_daily 完成：news={len(payload.get('news', []))} github={len(payload.get('githubWeekly', []))} skills={len(enriched_skills)}")
    return merge_generated(payload)


def run_weekly() -> dict:
    print(f"[{datetime.now().strftime('%H:%M:%S')}] run_weekly 开始")

    github_items = fetch_github_candidates(days_ago(7))
    regular_gh, skill_candidates = split_github_for_skills(github_items[:25])

    # 并发：GitHub 项目
    enriched_github, failed_github = parallel_enrich(regular_gh, enrich_github_item, "github-weekly")
    if failed_github:
        for raw in failed_github:
            enriched_github.append({
                **raw, "category": "Coding Agent",
                "details": (raw.get("description") or "")[:300],
                "features": [], "useCases": [], "quickStart": [],
            })

    # 并发：Skill 候选
    enriched_skills = []
    if skill_candidates:
        enriched_skills, _ = parallel_enrich(skill_candidates, enrich_skill_item, "skills-weekly")

    # 并发：news（来自 RSS）
    rss_items = fetch_rss_items()
    enriched_news, failed_news = parallel_enrich(rss_items[:30], enrich_news_item, "news-weekly")
    if failed_news:
        enriched_news.extend(fallback_news(failed_news))

    digest = {
        "weekId": week_id(),
        "label": week_label(),
        "summary": (f"本周自动收集 GitHub 项目 {len(enriched_github)} 个、Skill 候选 "
                    f"{len(enriched_skills)} 条、新闻 {len(enriched_news)} 条，全部由 LLM 并发整理为中文条目。"),
        "skills": enriched_skills[:20],
        "github": enriched_github[:20],
    }
    payload = {
        "weeklyDigests": [digest],
        "githubWeekly": enriched_github[:30],
        "sources": FREE_INFO_SOURCES,
    }
    if enriched_news:
        payload["news"] = enriched_news[:30]
    print(f"[{datetime.now().strftime('%H:%M:%S')}] run_weekly 完成")
    return merge_generated(payload)


def route_enriched(news_items: list[dict], github_items: list[dict], skill_items: list[dict] | None = None) -> dict:
    """把已经 enrich 过的 news 分发到 news 模块。
    重要：**不再自动写入 benchmarkBoards / benchmarkDatasets**——这两个模块只接受人工维护。
    skill_items 直接进入当周 digest（在 run_weekly / run_daily 已处理），这里只做兜底。"""
    routed = {
        "news": list(news_items),
        "topicResources": {},
        "skillRecommendations": list(skill_items or []),
        "githubWeekly": list(github_items),
        # benchmarkBoards / benchmarkDatasets 故意不放——避免污染人工维护的榜单数据
    }
    for n in news_items:
        text = item_text(n).lower()
        # 工具类资讯可顺手收进 topicResources
        if any(w in text for w in ["tool", "platform", "api", "assistant", "app", "editor", "agent"]):
            topic_id = topic_from_text(item_text(n))
            routed["topicResources"].setdefault(topic_id, []).append({
                "name": n.get("title", "")[:60],
                "provider": (n.get("source") or "").split(":")[0].split(" · ")[0],
                "type": "AI 项目/工具",
                "bestFor": (n.get("impact") or n.get("summary") or "")[:160],
                "description": (n.get("summary") or "")[:260],
                "useCases": n.get("useCases") or [],
                "watch": (n.get("risks") or ["请打开原始来源核对"])[0],
                "sourceName": n.get("source") or "",
                "url": n.get("url") or "#",
            })
    return routed


def run_all() -> dict:
    run_daily()
    return run_weekly()


def is_authorized(handler: SimpleHTTPRequestHandler) -> bool:
    token = os.getenv("ADMIN_TOKEN")
    if not token or token == "change-me":
        return True
    parsed = urllib.parse.urlparse(handler.path)
    params = urllib.parse.parse_qs(parsed.query)
    auth = handler.headers.get("Authorization", "")
    return params.get("token", [""])[0] == token or auth == f"Bearer {token}"


def send_json(handler: SimpleHTTPRequestHandler, status: int, payload: dict) -> None:
    body = json.dumps(payload, ensure_ascii=False, indent=2).encode("utf-8")
    handler.send_response(status)
    handler.send_header("Content-Type", "application/json; charset=utf-8")
    handler.send_header("Content-Length", str(len(body)))
    handler.end_headers()
    handler.wfile.write(body)


class BackendHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def end_headers(self):
        # 给数据/脚本文件加 no-store，杜绝浏览器缓存旧 data.js / generated-data.js
        path = urllib.parse.urlparse(self.path).path.lower()
        if path.endswith(".js") or path.endswith(".json") or path.endswith(".html"):
            self.send_header("Cache-Control", "no-store, no-cache, must-revalidate")
            self.send_header("Pragma", "no-cache")
            self.send_header("Expires", "0")
        super().end_headers()

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path.startswith("/api/"):
            self.handle_api(parsed.path)
            return
        super().do_GET()

    def handle_api(self, path: str) -> None:
        if path == "/api/status":
            generated = read_json(GENERATED_JSON, {})
            scheduler = read_json(SCHEDULER_STATE, {})
            send_json(self, 200, {
                "ok": True,
                "backend": "python",
                "generatedAt": generated.get("generatedAt"),
                "lastUpdated": generated.get("lastUpdated"),
                "counts": {
                    "news": len(generated.get("news") or []),
                    "weeklyDigests": len(generated.get("weeklyDigests") or []),
                    "githubWeekly": len(generated.get("githubWeekly") or []),
                    "topicResources": sum(len(items or []) for items in (generated.get("topicResources") or {}).values()),
                    "skillRecommendations": len(generated.get("skillRecommendations") or []),
                    "benchmarkBoards": len(generated.get("benchmarkBoards") or []),
                    "benchmarkDatasets": len(generated.get("benchmarkDatasets") or []),
                    "sources": len(generated.get("sources") or []),
                },
                "scheduler": scheduler,
                "config": {
                    "dailyTime": os.getenv("DAILY_TIME", "09:10"),
                    "weeklyDay": int(os.getenv("WEEKLY_DAY", "1")),
                    "weeklyTime": os.getenv("WEEKLY_TIME", "09:30"),
                    "hasLLMKey": bool(os.getenv("LLM_API_KEY")),
                    "hasGitHubToken": bool(os.getenv("GITHUB_TOKEN")),
                },
            })
            return
        if not path.startswith("/api/admin/"):
            send_json(self, 404, {"ok": False, "error": "Not found"})
            return
        if not is_authorized(self):
            send_json(self, 401, {"ok": False, "error": "Unauthorized"})
            return
        try:
            if path == "/api/admin/run-daily":
                result = run_daily()
            elif path == "/api/admin/run-weekly":
                result = run_weekly()
            elif path == "/api/admin/run-all":
                result = run_all()
            else:
                send_json(self, 404, {"ok": False, "error": "Unknown admin action"})
                return
            send_json(self, 200, {"ok": True, "generatedAt": result.get("generatedAt"), "counts": {"news": len(result.get("news") or []), "weeklyDigests": len(result.get("weeklyDigests") or []), "githubWeekly": len(result.get("githubWeekly") or []), "sources": len(result.get("sources") or [])}})
        except Exception as error:
            send_json(self, 500, {"ok": False, "error": str(error)})


def scheduler_loop() -> None:
    while True:
        try:
            state = read_json(SCHEDULER_STATE, {})
            now = datetime.now()
            today = today_iso()
            current_time = now.strftime("%H:%M")
            if current_time == os.getenv("DAILY_TIME", "09:10") and state.get("lastDaily") != today:
                state["lastDaily"] = today
                state["lastDailyStartedAt"] = datetime.now(timezone.utc).isoformat()
                SCHEDULER_STATE.write_text(json.dumps(state, ensure_ascii=False, indent=2), encoding="utf-8")
                try:
                    run_daily()
                    state["lastDailyFinishedAt"] = datetime.now(timezone.utc).isoformat()
                except Exception as error:
                    state["lastDailyError"] = str(error)
                SCHEDULER_STATE.write_text(json.dumps(state, ensure_ascii=False, indent=2), encoding="utf-8")
            weekly_day = int(os.getenv("WEEKLY_DAY", "1"))
            if now.weekday() + 1 == weekly_day and current_time == os.getenv("WEEKLY_TIME", "09:30") and state.get("lastWeekly") != today:
                state["lastWeekly"] = today
                state["lastWeeklyStartedAt"] = datetime.now(timezone.utc).isoformat()
                SCHEDULER_STATE.write_text(json.dumps(state, ensure_ascii=False, indent=2), encoding="utf-8")
                try:
                    run_weekly()
                    state["lastWeeklyFinishedAt"] = datetime.now(timezone.utc).isoformat()
                except Exception as error:
                    state["lastWeeklyError"] = str(error)
                SCHEDULER_STATE.write_text(json.dumps(state, ensure_ascii=False, indent=2), encoding="utf-8")
        except Exception:
            pass
        time.sleep(60)


def print_help() -> None:
    print("Usage:")
    print("  python backend/backend.py           # 启动 HTTP 服务 + 定时任务（默认）")
    print("  python backend/backend.py run-all   # 一次性跑：抓取+LLM+合并，跑完退出")
    print("  python backend/backend.py daily     # 只跑 run_daily")
    print("  python backend/backend.py weekly    # 只跑 run_weekly")
    print("  python backend/backend.py bootstrap # 启服务前先跑一次 run_all")


def main() -> None:
    load_env()
    args = sys.argv[1:]
    cmd = (args[0] if args else "").lower()

    if cmd in ("run-all", "all", "once"):
        result = run_all()
        print(json.dumps({
            "ok": True,
            "counts": {
                "news": len(result.get("news") or []),
                "weeklyDigests": len(result.get("weeklyDigests") or []),
                "githubWeekly": len(result.get("githubWeekly") or []),
                "skillRecommendations": len(result.get("skillRecommendations") or []),
                "topicResources": sum(len(v) for v in (result.get("topicResources") or {}).values()),
                "benchmarkBoards": len(result.get("benchmarkBoards") or []),
                "benchmarkDatasets": len(result.get("benchmarkDatasets") or []),
            }
        }, ensure_ascii=False, indent=2))
        return

    if cmd in ("daily", "run-daily"):
        run_daily()
        return

    if cmd in ("weekly", "run-weekly"):
        run_weekly()
        return

    if cmd in ("help", "-h", "--help"):
        print_help()
        return

    host = os.getenv("HOST", "127.0.0.1")
    port = int(os.getenv("PORT", "5179"))

    if cmd == "bootstrap":
        print(f"[{datetime.now().strftime('%H:%M:%S')}] bootstrap：先跑一次 run_all 再启动服务")
        try:
            run_all()
        except Exception as e:
            print(f"  bootstrap 失败：{e}")

    threading.Thread(target=scheduler_loop, daemon=True).start()
    server = ThreadingHTTPServer((host, port), BackendHandler)
    print(f"Python AI nav backend running at http://{host}:{port}/")
    print(f"Status: http://{host}:{port}/api/status")
    server.serve_forever()


if __name__ == "__main__":
    main()

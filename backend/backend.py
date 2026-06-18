from __future__ import annotations

import json
import os
import re
import subprocess
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
    {"name": "AI HOT", "description": "中文 AI 资讯聚合站，每天精选模型发布、产品更新、行业动态、论文与技巧；开放免费 REST API / RSS，无需 token，适合做每日新鲜内容源。", "url": "https://aihot.virxact.com/"},
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

# 国内大模型厂商：官网基本无 RSS，但开源模型都发在 GitHub。
# 通过组织级 GitHub 搜索（org:xxx）追踪各厂最新开源动态/模型发布，单独采集不与上面的 topic 查询争名额。
# 视为 T1 一手源（厂商官方组织）。
GITHUB_VENDOR_ORGS = [
    {"org": "deepseek-ai", "vendor": "DeepSeek"},
    {"org": "QwenLM", "vendor": "通义千问 Qwen"},
    {"org": "THUDM", "vendor": "智谱 GLM"},
    {"org": "zai-org", "vendor": "智谱 Z.ai"},
    {"org": "MoonshotAI", "vendor": "月之暗面 Kimi"},
    {"org": "MiniMax-AI", "vendor": "MiniMax"},
    {"org": "stepfun-ai", "vendor": "阶跃星辰 StepFun"},
    {"org": "OpenBMB", "vendor": "面壁智能 MiniCPM"},
    {"org": "InternLM", "vendor": "上海AI实验室 书生"},
    {"org": "01-ai", "vendor": "零一万物 Yi"},
    {"org": "baichuan-inc", "vendor": "百川智能"},
    {"org": "Tencent-Hunyuan", "vendor": "腾讯混元"},
    {"org": "bytedance-seed", "vendor": "字节跳动 Seed"},
]

# 信源分级（信源比信息重要，一手优先）：
#   T1   = 官方一手 / 顶级实验室博客 / 论文源        —— 权重最高
#   T1.5 = 官方社媒、官方聚合（杂、噪声多）          —— 权重略降
#   T2   = KOL / 媒体 / 综合资讯站（多为二手转载）   —— 权重最低
# 评分阶段用 TIER_WEIGHT 给最终质量分加成。
TIER_WEIGHT = {"T1": 1.0, "T1.5": 0.8, "T2": 0.6}

# 注：Anthropic 无官方 RSS（/rss.xml、/news/rss.xml 均 404），需后续单独爬 HTML
#     （https://www.anthropic.com/news），暂未纳入下方 RSS 列表。
# 以下 URL 均已实测可拉到有效 XML。
RSS_FEEDS = [
    # —— T1 官方 / 顶级实验室一手 ——
    {"name": "OpenAI Blog", "url": "https://openai.com/news/rss.xml", "lang": "en", "tier": "T1"},
    {"name": "Google DeepMind", "url": "https://deepmind.google/blog/rss.xml", "lang": "en", "tier": "T1"},
    {"name": "Google AI Blog", "url": "https://blog.google/technology/ai/rss/", "lang": "en", "tier": "T1"},
    {"name": "Google Research", "url": "https://research.google/blog/rss/", "lang": "en", "tier": "T1"},
    {"name": "Microsoft Research", "url": "https://www.microsoft.com/en-us/research/feed/", "lang": "en", "tier": "T1"},
    {"name": "Hugging Face Blog", "url": "https://huggingface.co/blog/feed.xml", "lang": "en", "tier": "T1"},
    {"name": "NVIDIA Deep Learning", "url": "https://blogs.nvidia.com/blog/category/deep-learning/feed/", "lang": "en", "tier": "T1"},
    {"name": "AWS Machine Learning", "url": "https://aws.amazon.com/blogs/machine-learning/feed/", "lang": "en", "tier": "T1"},
    {"name": "Amazon Science", "url": "https://www.amazon.science/index.rss", "lang": "en", "tier": "T1"},
    {"name": "Meta Engineering", "url": "https://engineering.fb.com/feed/", "lang": "en", "tier": "T1"},
    {"name": "Together AI", "url": "https://www.together.ai/blog/rss.xml", "lang": "en", "tier": "T1"},
    {"name": "BAIR (Berkeley)", "url": "https://bair.berkeley.edu/blog/feed.xml", "lang": "en", "tier": "T1"},
    {"name": "Apple ML Research", "url": "https://machinelearning.apple.com/rss.xml", "lang": "en", "tier": "T1"},
    {"name": "Qwen (通义千问)", "url": "https://qwenlm.github.io/blog/index.xml", "lang": "en", "tier": "T1"},
    {"name": "EleutherAI", "url": "https://blog.eleuther.ai/index.xml", "lang": "en", "tier": "T1"},
    {"name": "Answer.AI", "url": "https://www.answer.ai/index.xml", "lang": "en", "tier": "T1"},
    # —— T1 论文源（category=paper）——
    {"name": "arXiv cs.AI", "url": "http://export.arxiv.org/rss/cs.AI", "lang": "en", "tier": "T1"},
    {"name": "arXiv cs.CL", "url": "http://export.arxiv.org/rss/cs.CL", "lang": "en", "tier": "T1"},
    {"name": "arXiv cs.LG", "url": "http://export.arxiv.org/rss/cs.LG", "lang": "en", "tier": "T1"},
    {"name": "arXiv cs.CV", "url": "http://export.arxiv.org/rss/cs.CV", "lang": "en", "tier": "T1"},
    {"name": "arXiv stat.ML", "url": "http://export.arxiv.org/rss/stat.ML", "lang": "en", "tier": "T1"},
    # —— T1.5 研究者个人博客（高信号、低噪声）——
    {"name": "Lilian Weng", "url": "https://lilianweng.github.io/index.xml", "lang": "en", "tier": "T1.5"},
    {"name": "Sebastian Raschka", "url": "https://magazine.sebastianraschka.com/feed", "lang": "en", "tier": "T1.5"},
    {"name": "Chip Huyen", "url": "https://huyenchip.com/feed.xml", "lang": "en", "tier": "T1.5"},
    {"name": "Eugene Yan", "url": "https://eugeneyan.com/rss/", "lang": "en", "tier": "T1.5"},
    {"name": "Interconnects (Nathan Lambert)", "url": "https://www.interconnects.ai/feed", "lang": "en", "tier": "T1.5"},
    {"name": "Sebastian Ruder", "url": "https://newsletter.ruder.io/feed", "lang": "en", "tier": "T1.5"},
    {"name": "Latent Space (swyx)", "url": "https://www.latent.space/feed", "lang": "en", "tier": "T1.5"},
    {"name": "Andrej Karpathy", "url": "https://karpathy.github.io/feed.xml", "lang": "en", "tier": "T1.5"},
    {"name": "Jay Alammar", "url": "https://jalammar.github.io/feed.xml", "lang": "en", "tier": "T1.5"},
    {"name": "Chris Olah (colah)", "url": "https://colah.github.io/rss.xml", "lang": "en", "tier": "T1.5"},
    {"name": "Ethan Mollick", "url": "https://www.oneusefulthing.org/feed", "lang": "en", "tier": "T1.5"},
    {"name": "fast.ai (Jeremy Howard)", "url": "https://www.fast.ai/index.xml", "lang": "en", "tier": "T1.5"},
    {"name": "Phil Schmid", "url": "https://www.philschmid.de/rss", "lang": "en", "tier": "T1.5"},
    {"name": "Cameron Wolfe", "url": "https://cameronrwolfe.substack.com/feed", "lang": "en", "tier": "T1.5"},
    {"name": "Tim Dettmers", "url": "https://timdettmers.com/feed/", "lang": "en", "tier": "T1.5"},
    {"name": "The Kaitchup", "url": "https://kaitchup.substack.com/feed", "lang": "en", "tier": "T1.5"},
    {"name": "Artificial Fintelligence", "url": "https://www.artfintel.com/feed", "lang": "en", "tier": "T1.5"},
    {"name": "Vicki Boykis", "url": "https://vickiboykis.com/index.xml", "lang": "en", "tier": "T2"},
    {"name": "LJ Miranda", "url": "https://ljvmiranda921.github.io/feed.xml", "lang": "en", "tier": "T2"},
    # —— T1.5 / T2 媒体、社区、精选 newsletter ——
    {"name": "MIT Tech Review AI", "url": "https://www.technologyreview.com/topic/artificial-intelligence/feed", "lang": "en", "tier": "T1.5"},
    {"name": "The Gradient", "url": "https://thegradient.pub/rss/", "lang": "en", "tier": "T1.5"},
    {"name": "Import AI (Jack Clark)", "url": "https://importai.substack.com/feed", "lang": "en", "tier": "T1.5"},
    {"name": "Simon Willison", "url": "https://simonwillison.net/atom/everything/", "lang": "en", "tier": "T1.5"},
    {"name": "AI Snake Oil", "url": "https://www.aisnakeoil.com/feed", "lang": "en", "tier": "T1.5"},
    {"name": "Understanding AI", "url": "https://www.understandingai.org/feed", "lang": "en", "tier": "T1.5"},
    {"name": "Platformer", "url": "https://www.platformer.news/rss/", "lang": "en", "tier": "T1.5"},
    {"name": "Smol AI News", "url": "https://news.smol.ai/rss.xml", "lang": "en", "tier": "T2"},
    {"name": "AINews", "url": "https://buttondown.com/ainews/rss", "lang": "en", "tier": "T2"},
    {"name": "Last Week in AI", "url": "https://lastweekin.ai/feed", "lang": "en", "tier": "T2"},
    {"name": "TLDR AI", "url": "https://tldr.tech/api/rss/ai", "lang": "en", "tier": "T2"},
    {"name": "Synced", "url": "https://syncedreview.com/feed/", "lang": "en", "tier": "T2"},
    {"name": "The Decoder", "url": "https://the-decoder.com/feed/", "lang": "en", "tier": "T2"},
    {"name": "MarkTechPost", "url": "https://www.marktechpost.com/feed/", "lang": "en", "tier": "T2"},
    {"name": "IEEE Spectrum AI", "url": "https://spectrum.ieee.org/feeds/topic/artificial-intelligence.rss", "lang": "en", "tier": "T2"},
    {"name": "The Verge AI", "url": "https://www.theverge.com/rss/ai-artificial-intelligence/index.xml", "lang": "en", "tier": "T2"},
    {"name": "Ars Technica AI", "url": "https://arstechnica.com/ai/feed/", "lang": "en", "tier": "T2"},
    {"name": "Wired AI", "url": "https://www.wired.com/feed/tag/ai/latest/rss", "lang": "en", "tier": "T2"},
    {"name": "VentureBeat AI", "url": "https://venturebeat.com/category/ai/feed/", "lang": "en", "tier": "T2"},
    {"name": "TechCrunch AI", "url": "https://techcrunch.com/category/artificial-intelligence/feed/", "lang": "en", "tier": "T2"},
    {"name": "The Register AI/ML", "url": "https://www.theregister.com/software/ai_ml/headlines.atom", "lang": "en", "tier": "T2"},
    # —— 工具/平台（产品动态）——
    {"name": "Replicate", "url": "https://replicate.com/blog/rss", "lang": "en", "tier": "T2"},
    {"name": "Roboflow", "url": "https://blog.roboflow.com/rss/", "lang": "en", "tier": "T2"},
    # —— 国内 ——
    {"name": "量子位", "url": "https://www.qbitai.com/feed", "lang": "zh", "tier": "T2"},
    {"name": "机器之心", "url": "https://www.jiqizhixin.com/rss", "lang": "zh", "tier": "T2"},
    {"name": "雷峰网", "url": "https://www.leiphone.com/feed", "lang": "zh", "tier": "T2"},
    {"name": "36氪快讯", "url": "https://36kr.com/feed-newsflash", "lang": "zh", "tier": "T2"},
    {"name": "IT之家 AI", "url": "https://www.ithome.com/rss/", "lang": "zh", "tier": "T2"},
    {"name": "少数派", "url": "https://sspai.com/feed", "lang": "zh", "tier": "T2"},
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

    # 国内大模型厂商组织级动态（单独采集，保证不被上面的结果挤掉）
    vendor_results = []
    for vendor in GITHUB_VENDOR_ORGS:
        query = f"org:{vendor['org']} pushed:>={since}"
        params = urllib.parse.urlencode({"q": query, "sort": "updated", "order": "desc", "per_page": "5"})
        try:
            payload = request_json(f"https://api.github.com/search/repositories?{params}", headers=headers)
        except Exception:
            continue
        for item in payload.get("items", []):
            vendor_results.append({
                "name": item.get("full_name"),
                "lang": item.get("language") or "Repo",
                "description": item.get("description") or f"{vendor['vendor']} 开源项目。",
                "stars": f"{item.get('stargazers_count', 0)} stars",
                "why": f"国产大模型厂商 {vendor['vendor']} 的最新开源动态/模型发布，属一手信源。",
                "url": item.get("html_url"),
                "source": f"GitHub · {vendor['vendor']}",
                "tier": "T1",
            })

    topic = uniq_by(results, lambda item: item.get("name"))[:20]
    vendors = uniq_by(vendor_results, lambda item: item.get("name"))[:30]
    return uniq_by(topic + vendors, lambda item: item.get("name"))


# 专门抓 GitHub 上热门的 Skill / MCP / Agent-Skills 仓库（按 star 排序取最热）
SKILL_GITHUB_QUERIES = [
    "topic:claude-skills",
    "topic:agent-skills",
    "topic:claude-code",
    "topic:mcp-server",
    "claude code skill in:name,description",
    "awesome claude skills in:name,description",
]


def fetch_skill_repos(per_query: int = 8, top: int = 24) -> list[dict]:
    """抓 GitHub 上最热门的 Skill / MCP 仓库（按 star 排序），作为 Skill 推荐候选。"""
    headers = {"Accept": "application/vnd.github+json"}
    if os.getenv("GITHUB_TOKEN"):
        headers["Authorization"] = f"Bearer {os.getenv('GITHUB_TOKEN')}"
    results = []
    for q in SKILL_GITHUB_QUERIES:
        params = urllib.parse.urlencode({"q": f"{q} stars:>10", "sort": "stars", "order": "desc", "per_page": str(per_query)})
        try:
            payload = request_json(f"https://api.github.com/search/repositories?{params}", headers=headers)
        except Exception:
            continue
        for item in payload.get("items", []):
            results.append({
                "name": item.get("full_name"),
                "lang": item.get("language") or "Repo",
                "description": item.get("description") or "Claude / Agent Skill 相关仓库。",
                "stars": f"{item.get('stargazers_count', 0)} stars",
                "_stars_num": int(item.get("stargazers_count", 0)),
                "url": item.get("html_url"),
                "source": "GitHub Skill",
            })
    results = uniq_by(results, lambda it: it.get("name"))
    results.sort(key=lambda it: -it.get("_stars_num", 0))
    return results[:top]


def fetch_skill_external(top: int = 30) -> list[dict]:
    """从多个『大家分享 Skill / MCP / AI 工具』的平台聚合候选（GitHub 之外再加 8 个来源）：
    Hacker News、Smithery MCP 注册表、Hugging Face Spaces、npm、Dev.to、Reddit(r/ClaudeAI, r/mcp)、Product Hunt。
    注：抖音/TikTok/YouTube/小红书等视频平台无免费可用 API 且强反爬，无法用 urllib 抓取，故用上述同类的文字/代码平台替代。"""
    ua = {"User-Agent": BROWSER_UA}
    out: list[dict] = []
    per_source: dict[str, int] = {}
    PER_SOURCE_CAP = 6   # 每个平台最多取 6 条，保证多平台都有代表

    def add(name, desc, url, source):
        if not name or not url:
            return
        if per_source.get(source, 0) >= PER_SOURCE_CAP:
            return
        per_source[source] = per_source.get(source, 0) + 1
        out.append({"name": str(name).strip(), "title": str(name).strip(),
                    "description": (desc or "")[:300], "url": url, "source": source, "lang": "en"})

    # 1) Hacker News（Show HN / 讨论里大量 Claude skill、MCP 分享）
    for q in ("Claude skill", "MCP server", "Claude Code", "AI agent"):
        try:
            payload = request_json(f"https://hn.algolia.com/api/v1/search?query={urllib.parse.quote(q)}&tags=story&hitsPerPage=6", headers=ua)
            for h in payload.get("hits", []):
                if (h.get("points") or 0) >= 40:
                    add(h.get("title"), f"Hacker News 讨论 · {h.get('points')} 分", h.get("url") or f"https://news.ycombinator.com/item?id={h.get('objectID')}", "Hacker News")
        except Exception:
            pass

    # 2) Smithery —— MCP 服务器注册表（开发者发布的 skill/工具）
    try:
        payload = request_json("https://registry.smithery.ai/servers?page=1&pageSize=24", headers=ua)
        for s in payload.get("servers", []):
            qn = s.get("qualifiedName") or ""
            add(s.get("displayName") or qn, s.get("description"), f"https://smithery.ai/server/{qn}", "Smithery MCP")
    except Exception:
        pass

    # 3) Hugging Face Spaces（agent / assistant 类应用）
    for q in ("agent", "assistant", "claude"):
        try:
            payload = request_json(f"https://huggingface.co/api/spaces?search={q}&sort=likes&limit=6", headers=ua)
            for sp in (payload if isinstance(payload, list) else []):
                add(sp.get("id"), f"Hugging Face Space · {sp.get('likes', 0)} likes", f"https://huggingface.co/spaces/{sp.get('id')}", "HF Spaces")
        except Exception:
            pass

    # 4) npm（claude / mcp 相关包）
    for q in ("mcp-server", "claude skill"):
        try:
            payload = request_json(f"https://registry.npmjs.org/-/v1/search?text={urllib.parse.quote(q)}&size=8", headers=ua)
            for o in payload.get("objects", []):
                p = o.get("package", {})
                add(p.get("name"), p.get("description"), (p.get("links") or {}).get("npm") or f"https://www.npmjs.com/package/{p.get('name')}", "npm")
        except Exception:
            pass

    # 5) Dev.to（claude / mcp / agent 教程与分享）
    for tag in ("claude", "mcp", "aiagents"):
        try:
            payload = request_json(f"https://dev.to/api/articles?tag={tag}&top=30&per_page=5", headers=ua)
            for a in (payload if isinstance(payload, list) else []):
                add(a.get("title"), a.get("description"), a.get("url"), "Dev.to")
        except Exception:
            pass

    # 6) Reddit r/ClaudeAI + r/mcp（社区热帖，RSS/Atom）
    atom_ns = {"atom": "http://www.w3.org/2005/Atom"}
    for sub in ("ClaudeAI", "mcp"):
        try:
            xml = request_text(f"https://www.reddit.com/r/{sub}/top.rss?t=week", headers=ua, timeout=15)
            root = ET.fromstring(xml)
            for e in root.findall("atom:entry", atom_ns)[:6]:
                t = strip_html(e.findtext("atom:title", default="", namespaces=atom_ns) or "")
                link = e.find("atom:link", atom_ns)
                add(t, f"Reddit r/{sub} 本周热帖", link.get("href") if link is not None else "", f"Reddit r/{sub}")
        except Exception:
            pass

    # 7) Product Hunt（AI 分类新发布工具，RSS）
    try:
        xml = request_text("https://www.producthunt.com/feed?category=artificial-intelligence", headers=ua, timeout=15)
        root = ET.fromstring(xml)
        for it in root.findall(".//item")[:8]:
            add(strip_html(it.findtext("title") or ""), strip_html(it.findtext("description") or ""), (it.findtext("link") or "").strip(), "Product Hunt")
    except Exception:
        pass

    return uniq_by(out, lambda x: x.get("url"))[:top]


# ===== 批量 Skill 抓取 + 功能分类（用于一次性灌入大量 skill） =====
# 分类按"功能"优先匹配，MCP/Claude/Agent 作为兜底类。顺序敏感：靠前的先命中。
SKILL_CATEGORY_RULES = [
    ("编程开发", ["code", "coding", "developer", "ide", "programming", "copilot", "debug", "review", "lint", "git", "godot", "unity"]),
    ("浏览器 / 自动化", ["browser", "playwright", "puppeteer", "selenium", "automation", "scrape", "crawl", "rpa", "computer-use", "computer use"]),
    ("RAG / 知识库", ["rag", "retrieval", "embedding", "vector", "knowledge", "memory", "semantic search"]),
    ("搜索 / 信息", ["search", "serp", "perplexity", "exa", "tavily", "web search", "fetch"]),
    ("数据 / 分析", ["sql", "database", "postgres", "mysql", "sqlite", "mongodb", "analytics", "data analysis", "spreadsheet", "excel", "bigquery"]),
    ("设计 / 创意", ["image", "design", "figma", "video", "art", "draw", "diffusion", "photo", "blender", "canvas", "ui generation"]),
    ("写作 / 办公", ["writing", "write", "notion", "obsidian", "document", "markdown", "office", "slides", "ppt", "email", "calendar", "slack"]),
    ("语音 / 音频", ["voice", "speech", "audio", "tts", "asr", "whisper", "transcribe"]),
    ("安全 / 运维", ["security", "vuln", "pentest", "ghidra", "devops", "docker", "kubernetes", "monitoring", "infra", "aws", "cloud"]),
    ("金融 / 商业", ["finance", "stock", "trading", "crypto", "payment", "stripe", "market"]),
    ("Agent 框架", ["agent framework", "autogpt", "autogen", "crewai", "langgraph", "multi-agent", "metagpt", "swarm", "orchestrat"]),
    ("MCP 服务", ["mcp-server", "mcp server", "model context protocol", "modelcontextprotocol", "mcp"]),
    ("Claude Skill", ["claude-skill", "claude skill", "agent-skills", "agent skill", "claude-code", "claude code", "claude"]),
]


def categorize_skill(text: str) -> str:
    t = (text or "").lower()
    for cat, kws in SKILL_CATEGORY_RULES:
        if any(k in t for k in kws):
            return cat
    return "其他"


SKILL_BULK_QUERIES = [
    "topic:mcp-server", "topic:mcp", "topic:claude-skills", "topic:agent-skills",
    "topic:claude-code", "topic:ai-agent", "topic:llm-agent", "topic:rag",
    "mcp server in:name,description", "claude skill in:name,description",
    "topic:ai-tools", "topic:autonomous-agents", "topic:ai-agents", "topic:llm-tools",
]


def fetch_skills_bulk(target: int = 100) -> list[dict]:
    """从 GitHub（多查询，按 star）+ Smithery 批量抓 skill，并按功能分类。返回 target 条。"""
    headers = {"Accept": "application/vnd.github+json"}
    if os.getenv("GITHUB_TOKEN"):
        headers["Authorization"] = f"Bearer {os.getenv('GITHUB_TOKEN')}"
    raw = []
    for q in SKILL_BULK_QUERIES:
        params = urllib.parse.urlencode({"q": f"{q} stars:>20", "sort": "stars", "order": "desc", "per_page": "30"})
        try:
            payload = request_json(f"https://api.github.com/search/repositories?{params}", headers=headers)
        except Exception:
            continue
        for item in payload.get("items", []):
            name = item.get("full_name") or ""
            desc = item.get("description") or ""
            topics = " ".join(item.get("topics") or [])
            cat = categorize_skill(f"{name} {desc} {topics}")
            raw.append({
                "title": name,
                "type": cat,
                "description": desc or "Claude / Agent / MCP 相关 skill。",
                "tags": [item.get("language") or "Repo", cat, "GitHub"],
                "url": item.get("html_url"),
                "source": "GitHub",
                "stars": int(item.get("stargazers_count", 0)),
                "date": today_iso(),
            })
        time.sleep(1)  # 礼貌限速，避免触发 GitHub search 限流

    # Smithery MCP 注册表补充
    try:
        payload = request_json("https://registry.smithery.ai/servers?page=1&pageSize=40", headers={"User-Agent": BROWSER_UA})
        for s in payload.get("servers", []):
            qn = s.get("qualifiedName") or ""
            desc = s.get("description") or ""
            cat = categorize_skill(f"{s.get('displayName','')} {qn} {desc}")
            raw.append({
                "title": s.get("displayName") or qn,
                "type": cat,
                "description": desc or "Smithery 上的 MCP 服务。",
                "tags": [cat, "MCP", "Smithery"],
                "url": f"https://smithery.ai/server/{qn}",
                "source": "Smithery MCP",
                "stars": int(s.get("useCount") or 0),
                "date": today_iso(),
            })
    except Exception:
        pass

    deduped = uniq_by(raw, lambda x: x.get("url") or x.get("title"))
    deduped.sort(key=lambda x: -int(x.get("stars") or 0))
    return deduped[:target]


def localize_skill_card(raw: dict) -> dict | None:
    """把一条批量抓来的 skill 卡片中文化：标题用中文（知名品牌保留原名）、描述 40-70 字中文、
    3 个中文标签。只改 title / description / tags，type / url / source / stars / date 原样保留，
    保证首页卡片统一。LLM 失败时返回 None（调用方回退到原始英文卡片）。"""
    title = raw.get("title") or ""
    desc = raw.get("description") or ""
    if not title:
        return None
    prompt = {
        "task": "把这个 AI Skill / 工具卡片改写成中文，让它在中文导航站里和其它卡片风格统一。",
        "input": {
            "title": title,
            "description": desc,
            "type": raw.get("type"),
            "url": raw.get("url"),
        },
        "schema": {
            "title": "中文标题，6-16 字；知名英文产品名保留原样（如 n8n / AutoGPT / LangGraph / Dify），其余用简洁中文重命名；不要写成 owner/repo 路径",
            "description": "40-70 字中文，说清这个 Skill / 工具给 AI Agent 或开发者带来什么能力，不要只翻译标题",
            "tags": ["3 个中文功能标签，名词短语，不带 #"],
        },
        "style": [
            "禁用词：强大 / 先进 / 助力 / 旨在 / 一站式 / 值得关注",
            "技术名保留原样（Claude Code / MCP / Cursor / RAG 等）",
            "不要编造原描述里没有的功能",
        ],
    }
    result = call_json_llm(
        "你是中文 AI 工具导航编辑。把英文 skill 卡片改写成统一风格的中文卡片，只输出 JSON。",
        json.dumps(prompt, ensure_ascii=False),
    )
    if not isinstance(result, dict) or not result.get("title") or not result.get("description"):
        return None
    tags = result.get("tags")
    if not isinstance(tags, list) or not tags:
        tags = raw.get("tags") or []
    # 保留原有结构性字段，只覆盖展示文案
    card = dict(raw)
    card["title"] = str(result["title"]).strip()
    card["description"] = str(result["description"]).strip()
    card["tags"] = [str(t).strip() for t in tags][:3]
    return card


def localize_skills_list(skills: list[dict]) -> list[dict]:
    """并发把一批 skill 卡片中文化；失败的条目保留原始卡片，不丢数据。按 stars 重新排序。"""
    if not skills:
        return []
    localized, failed = parallel_enrich(skills, localize_skill_card, "skills-localize")
    merged = localized + failed  # failed 保留英文原卡，避免丢条目
    merged.sort(key=lambda x: -int(x.get("stars") or 0))
    return merged


def seed_skills(target: int = 100) -> dict:
    """一次性抓 target 个 skill 并按分类写入 generated-data.json 的 skillRecommendations。"""
    skills = fetch_skills_bulk(target)
    skills = localize_skills_list(skills)  # 中文化，保证卡片统一
    import collections as _c
    dist = _c.Counter(s["type"] for s in skills)
    data = read_json(GENERATED_JSON, {})
    data["skillRecommendations"] = skills
    data["lastUpdated"] = today_iso()
    write_generated(data)
    print(f"已灌入 {len(skills)} 个 skill，分类分布：")
    for cat, n in dist.most_common():
        print(f"  {cat}: {n}")
    return data


def localize_existing_skills() -> dict:
    """一次性命令：把 generated-data.json 里现有的 skillRecommendations 全部中文化并回写 json+js。
    用于把历史灌入的英文卡片就地翻译，不重新抓 GitHub。"""
    data = read_json(GENERATED_JSON, {})
    skills = data.get("skillRecommendations") or []
    if not skills:
        print("generated-data.json 里没有 skillRecommendations，跳过。")
        return data
    print(f"开始中文化 {len(skills)} 条现有 skill 卡片…")
    data["skillRecommendations"] = localize_skills_list(skills)
    data["lastUpdated"] = today_iso()
    write_generated(data)
    print(f"完成：已回写 {len(data['skillRecommendations'])} 条到 generated-data.json / generated-data.js")
    return data


# ===== 大模型榜单（采集 ReLE 中文大模型能力评测）=====
LLM_LEADERBOARD_URL = "https://raw.githubusercontent.com/jeinlee1991/chinese-llm-benchmark/main/leaderboard/%E6%80%BB%E5%88%86.md"


def fetch_llm_leaderboard() -> list[dict]:
    """抓取并解析 chinese-llm-benchmark 的综合能力排行榜（总分.md）。"""
    txt = request_text(LLM_LEADERBOARD_URL, headers={"User-Agent": BROWSER_UA}, timeout=20)
    rows = []
    for line in txt.splitlines():
        line = line.strip()
        if not line.startswith("|"):
            continue
        cells = [c.strip() for c in line.strip("|").split("|")]
        if len(cells) < 8:
            continue
        rank = cells[7]
        if not rank.isdigit():   # 跳过表头/分隔行
            continue
        rows.append({
            "rank": int(rank),
            "type": cells[0],        # 商用 / 开源
            "org": cells[1],         # 机构
            "model": cells[2],       # 大模型
            "score": cells[3],       # 总分准确率
            "latency": cells[4],     # 平均耗时
            "tokens": cells[5],      # 平均消耗 token
            "cost": cells[6],        # 花费/千次（元）
        })
    rows.sort(key=lambda r: r["rank"])
    return rows


def seed_llm_leaderboard() -> dict:
    """抓榜单写入 generated-data.json 的 llmLeaderboard。"""
    rows = fetch_llm_leaderboard()
    data = read_json(GENERATED_JSON, {})
    data["llmLeaderboard"] = {
        "updated": today_iso(),
        "source": "ReLE 中文大模型能力评测（综合能力）",
        "sourceUrl": "https://github.com/jeinlee1991/chinese-llm-benchmark",
        "items": rows,
    }
    data["lastUpdated"] = today_iso()
    write_generated(data)
    print(f"大模型榜单写入 {len(rows)} 条")
    return data


def fetch_news_api_items(since: str | None = None, until: str | None = None) -> list[dict]:
    """轮询 SEARCH_QUERIES 全部关键词，覆盖每个已配置的新闻 API。
    since/until 是 'YYYY-MM-DD' 字符串；None 表示拿最新。"""
    items: list[dict] = []
    queries = SEARCH_QUERIES[:6]

    def add(title, summary, url, source, published_date=None):
        if title and url:
            items.append({
                "title": title, "summary": summary or "", "url": url, "source": source,
                "_date_hint": published_date,
            })

    if os.getenv("NEWSAPI_KEY"):
        for q in queries:
            params = {"q": q, "language": "en", "sortBy": "publishedAt", "pageSize": "10", "apiKey": os.getenv("NEWSAPI_KEY")}
            if since: params["from"] = since
            if until: params["to"] = until
            try:
                for article in request_json(f"https://newsapi.org/v2/everything?{urllib.parse.urlencode(params)}").get("articles", []):
                    add(article.get("title"), article.get("description"), article.get("url"), f"NewsAPI:{q}", article.get("publishedAt"))
            except Exception:
                pass

    if os.getenv("GNEWS_API_KEY"):
        for q in queries:
            params = {"q": q, "lang": "en", "max": "10", "apikey": os.getenv("GNEWS_API_KEY")}
            if since: params["from"] = since + "T00:00:00Z"
            if until: params["to"] = until + "T23:59:59Z"
            try:
                for article in request_json(f"https://gnews.io/api/v4/search?{urllib.parse.urlencode(params)}").get("articles", []):
                    add(article.get("title"), article.get("description"), article.get("url"), f"GNews:{q}", article.get("publishedAt"))
            except Exception:
                pass

    if os.getenv("NEWSDATA_API_KEY"):
        for q in queries:
            params = {"apikey": os.getenv("NEWSDATA_API_KEY"), "q": q, "language": "en"}
            if since: params["from_date"] = since
            if until: params["to_date"] = until
            try:
                for article in request_json(f"https://newsdata.io/api/1/latest?{urllib.parse.urlencode(params)}").get("results", [])[:10]:
                    add(article.get("title"), article.get("description"), article.get("link"), f"NewsData.io:{q}", article.get("pubDate"))
            except Exception:
                pass

    if os.getenv("GUARDIAN_API_KEY"):
        for q in queries:
            params = {"q": q, "api-key": os.getenv("GUARDIAN_API_KEY"), "page-size": "10", "order-by": "newest"}
            if since: params["from-date"] = since
            if until: params["to-date"] = until
            try:
                for article in request_json(f"https://content.guardianapis.com/search?{urllib.parse.urlencode(params)}").get("response", {}).get("results", []):
                    add(article.get("webTitle"), "", article.get("webUrl"), f"The Guardian:{q}", article.get("webPublicationDate"))
            except Exception:
                pass

    if os.getenv("CURRENTS_API_KEY"):
        for q in queries:
            params = {"keywords": q, "language": "en", "apiKey": os.getenv("CURRENTS_API_KEY")}
            if since: params["start_date"] = since + "T00:00:00.00+00:00"
            if until: params["end_date"] = until + "T23:59:59.99+00:00"
            try:
                for article in request_json(f"https://api.currentsapi.services/v1/search?{urllib.parse.urlencode(params)}").get("news", [])[:10]:
                    add(article.get("title"), article.get("description"), article.get("url"), f"Currents:{q}", article.get("published"))
            except Exception:
                pass

    if os.getenv("WORLDNEWS_API_KEY"):
        for q in queries:
            params = {"text": q, "number": "10", "api-key": os.getenv("WORLDNEWS_API_KEY")}
            if since: params["earliest-publish-date"] = since
            if until: params["latest-publish-date"] = until
            try:
                for article in request_json(f"https://api.worldnewsapi.com/search-news?{urllib.parse.urlencode(params)}").get("news", []):
                    add(article.get("title"), article.get("summary"), article.get("url"), f"World News API:{q}", article.get("publish_date"))
            except Exception:
                pass

    if os.getenv("MARKETAUX_API_KEY"):
        for q in queries:
            params = {"api_token": os.getenv("MARKETAUX_API_KEY"), "search": q, "limit": "5", "language": "en"}
            if since: params["published_after"] = since + "T00:00"
            if until: params["published_before"] = until + "T23:59"
            try:
                for article in request_json(f"https://api.marketaux.com/v1/news/all?{urllib.parse.urlencode(params)}").get("data", []):
                    add(article.get("title"), article.get("description"), article.get("url"), f"Marketaux:{q}", article.get("published_at"))
            except Exception:
                pass

    return uniq_by(items, lambda item: item.get("url"))


# AIHOT（aihot.virxact.com）：已经聚合 + 精选好的中文 AI 资讯源，每天更新，
# 正好补一手官方博客「不日更」的空窗。每条带原始 source 和原文 url，
# 视为 T1.5（已精选的二手聚合源）。注意：/api/public/* 走 UA 黑名单，必须带浏览器 UA。
AIHOT_ITEMS_API = "https://aihot.virxact.com/api/public/items"


def fetch_aihot_items(mode: str = "selected", take: int = 50) -> list[dict]:
    """从 AIHOT 拉取精选 AI 动态，转成统一 news 候选（再走本地富化管线）。
    mode=selected 是它每天精挑的主菜单；take 上限 100。失败返回空列表。"""
    take = max(1, min(int(take), 100))
    url = f"{AIHOT_ITEMS_API}?mode={mode}&take={take}"
    try:
        data = request_json(url, headers={"User-Agent": BROWSER_UA}, timeout=20)
    except Exception:
        return []
    items: list[dict] = []
    for it in (data.get("items") or []):
        title = (it.get("title") or "").strip()
        link = (it.get("url") or "").strip()
        if not title or not link:
            continue
        origin = (it.get("source") or "").strip()
        pub = it.get("publishedAt") or ""
        items.append({
            "title": title,
            "summary": (it.get("summary") or "")[:500],
            "url": link,
            "source": f"AIHOT · {origin}" if origin else "AIHOT",
            "lang": "zh",
            "tier": "T1.5",  # 已精选的聚合源
            "_date_hint": parse_date_to_iso(pub),
            "_datetime_hint": parse_datetime_to_iso(pub),
        })
    return items


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


_ARTICLE_TAG_RE = re.compile(r"<(article|main)[^>]*>([\s\S]*?)</\1>", re.I)
_NOISE_BLOCK_RE = re.compile(
    r"<(script|style|nav|footer|header|aside|form|noscript|iframe|svg)[^>]*>[\s\S]*?</\1>",
    re.I,
)


def fetch_article_text(url: str, max_chars: int = 5000, timeout: int = 12) -> str:
    """抓 URL 原文 → 去脚本/导航/页脚 → 优先取 <article>/<main> → 剥标签 → 截断。
    失败返回空字符串，不抛异常（enrich 流程对失败要容错）。"""
    if not url or not url.startswith(("http://", "https://")):
        return ""
    try:
        html = request_text(url, timeout=timeout)
    except Exception:
        return ""
    if not html:
        return ""
    # 优先取 <article> / <main> 主体；否则用整页
    body = html
    match = _ARTICLE_TAG_RE.search(html)
    if match:
        body = match.group(2)
    # 剥噪音块（注意去噪要在 strip_html 之前）
    body = _NOISE_BLOCK_RE.sub(" ", body)
    text = strip_html(body)
    # 过滤掉过短的（说明抓到的是登录墙/JS 渲染页）
    if len(text) < 200:
        return ""
    return text[:max_chars]


CN_TZ = timezone(timedelta(hours=8))   # 北京时间，发布时间统一按它展示


def parse_dt(s: str):
    """把各种日期字符串解析成 datetime（RFC822 / ISO / 'Jun 9, 2026' / YYYY-MM-DD）。失败返回 None。"""
    s = (s or "").strip()
    if not s:
        return None
    try:
        return datetime.fromisoformat(s.replace("Z", "+00:00"))
    except Exception:
        pass
    try:
        from email.utils import parsedate_to_datetime
        d = parsedate_to_datetime(s)
        if d:
            return d
    except Exception:
        pass
    m = re.search(r"([A-Z][a-z]{2,8})\s+(\d{1,2}),\s+(\d{4})", s)
    if m:
        for fmt in ("%b %d %Y", "%B %d %Y"):
            try:
                return datetime.strptime(f"{m.group(1)} {m.group(2)} {m.group(3)}", fmt)
            except Exception:
                continue
    m = re.search(r"\d{4}-\d{2}-\d{2}", s)
    if m:
        try:
            return datetime.fromisoformat(m.group(0))
        except Exception:
            return None
    return None


def _to_cn(dt):
    return dt.astimezone(CN_TZ) if dt.tzinfo else dt


def parse_date_to_iso(s: str) -> str:
    """统一成 YYYY-MM-DD（北京时间）。"""
    dt = parse_dt(s)
    return _to_cn(dt).strftime("%Y-%m-%d") if dt else ""


def parse_datetime_to_iso(s: str) -> str:
    """统一成 YYYY-MM-DDTHH:MM（北京时间）。仅当原始字符串含时间成分时返回，否则返回空。"""
    if ":" not in (s or ""):
        return ""
    dt = parse_dt(s)
    return _to_cn(dt).strftime("%Y-%m-%dT%H:%M") if dt else ""


_DC_DATE = "{http://purl.org/dc/elements/1.1/}date"


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
            pub = item.findtext("pubDate") or item.findtext(_DC_DATE) or ""
            if title and link:
                items.append({
                    "title": title,
                    "summary": desc[:500],
                    "url": link,
                    "source": f"RSS · {feed['name']}",
                    "lang": feed.get("lang", "en"),
                    "tier": feed.get("tier", "T2"),
                    "_date_hint": parse_date_to_iso(pub),
                    "_datetime_hint": parse_datetime_to_iso(pub),
                })

        # Atom：<feed><entry>
        for entry in root.findall("atom:entry", atom_ns)[:8]:
            title = strip_html(entry.findtext("atom:title", default="", namespaces=atom_ns) or "")
            link_el = entry.find("atom:link", atom_ns)
            link = link_el.get("href") if link_el is not None else ""
            summ = strip_html(entry.findtext("atom:summary", default="", namespaces=atom_ns) or "")
            if not summ:
                summ = strip_html(entry.findtext("atom:content", default="", namespaces=atom_ns) or "")
            pub = (entry.findtext("atom:published", default="", namespaces=atom_ns)
                   or entry.findtext("atom:updated", default="", namespaces=atom_ns) or "")
            if title and link:
                items.append({
                    "title": title,
                    "summary": summ[:500],
                    "url": link,
                    "source": f"RSS · {feed['name']}",
                    "lang": feed.get("lang", "en"),
                    "tier": feed.get("tier", "T2"),
                    "_date_hint": parse_date_to_iso(pub),
                    "_datetime_hint": parse_datetime_to_iso(pub),
                })

    # 先去重，再按信源等级排序后截断，保证 T1 一手源不会被后面的源挤掉。
    deduped = uniq_by(items, lambda item: item.get("url"))
    tier_rank = {"T1": 0, "T1.5": 1, "T2": 2}
    deduped.sort(key=lambda it: tier_rank.get(it.get("tier", "T2"), 3))
    return deduped[:80]


# 无官方 RSS、但能从静态 HTML 里直接抽到文章链接的一手源。
# 注：智谱 / 阶跃 / 文心 等是纯 JS 渲染的 SPA（HTML 是空壳），urllib 抓不到，
#     需要无头浏览器，超出当前零依赖设计，故不纳入；它们的开源模型已由 GitHub 厂商管线覆盖。
# pattern 是文章链接的相对路径正则；以下均已实测能抽到带标题的链接。
HTML_SOURCES = [
    {"name": "Anthropic", "url": "https://www.anthropic.com/news",
     "base": "https://www.anthropic.com", "pattern": r"/news/[a-z0-9-]+",
     "lang": "en", "tier": "T1"},
    {"name": "MiniMax", "url": "https://www.minimaxi.com/news",
     "base": "https://www.minimaxi.com", "pattern": r"/news/[a-z0-9-]+",
     "lang": "zh", "tier": "T1"},
]

# 部分一手站点会拦截非浏览器 UA，HTML 抓取统一用浏览器 UA。
BROWSER_UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"


def fetch_html_items() -> list[dict]:
    """从无 RSS 的一手站点（Anthropic / MiniMax 等）的静态 HTML 中抽取文章链接+标题。"""
    items: list[dict] = []
    for src in HTML_SOURCES:
        try:
            html = request_text(src["url"], headers={"User-Agent": BROWSER_UA}, timeout=20)
        except Exception:
            continue
        seen = set()
        count = 0
        for m in re.finditer(r'<a[^>]+href="(' + src["pattern"] + r')"[^>]*>(.*?)</a>', html, re.S):
            href = m.group(1)
            text = strip_html(m.group(2))
            if not href or href in seen or len(text) < 8:
                continue
            seen.add(href)
            url = href if href.startswith("http") else src["base"] + href
            items.append({
                "title": text[:120],      # 锚文本可能含分类/日期噪声，交给 LLM 归一化为中文标题
                "summary": text[:500],
                "url": url,
                "source": f"HTML · {src['name']}",
                "lang": src.get("lang", "en"),
                "tier": src.get("tier", "T1"),
                "_date_hint": parse_date_to_iso(text),   # 从锚文本里抽 "Jun 9, 2026" 这类发布日期
                "_datetime_hint": parse_datetime_to_iso(text),
            })
            count += 1
            if count >= 10:           # 每个源最多取 10 条最新
                break
    return uniq_by(items, lambda it: it.get("url"))


def fetch_research_items(since: str | None = None, until: str | None = None) -> list[dict]:
    items = []
    try:
        search = 'all:"large language model"'
        if since and until:
            # arXiv 日期格式 YYYYMMDDhhmm
            s = since.replace("-", "") + "0000"
            u = until.replace("-", "") + "2359"
            search = f'{search} AND submittedDate:[{s} TO {u}]'
        params = urllib.parse.urlencode({"search_query": search, "start": "0", "max_results": "16", "sortBy": "submittedDate", "sortOrder": "descending"})
        xml_text = request_text(f"https://export.arxiv.org/api/query?{params}", timeout=30)
        root = ET.fromstring(xml_text)
        ns = {"atom": "http://www.w3.org/2005/Atom"}
        for entry in root.findall("atom:entry", ns):
            title = " ".join((entry.findtext("atom:title", default="", namespaces=ns) or "").split())
            summary = " ".join((entry.findtext("atom:summary", default="", namespaces=ns) or "").split())[:500]
            url = entry.findtext("atom:id", default="", namespaces=ns)
            published = entry.findtext("atom:published", default="", namespaces=ns)
            if title and url:
                items.append({"title": title, "summary": summary, "url": url, "source": "arXiv", "_date_hint": published})
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

# 9 类的中文名（前端筛选 chip + 日报版块标题用）
CATEGORY_LABELS = {
    "ai-models": "模型发布",
    "ai-coding": "AI 编程",
    "ai-agents": "Agent / MCP",
    "ai-research": "论文研究",
    "ai-tools": "AI 工具",
    "ai-image-video": "图像视频",
    "ai-office": "办公提效",
    "ai-benchmark": "评测榜单",
    "ai-business": "行业商业",
}

# ============ 评分 / 精选机制（信息处理核心层）============
# 参考 AIHOT 的迭代教训：能用代码就别让模型决策。
# 模型只对每条信息打 5 个维度分（0-100），最终质量分、是否精选全部由代码按公式计算——
# 这样可控、可调、省钱，也避免"规则越加模型越笨"。
SCORE_DIMENSIONS = ["importance", "novelty", "firsthand", "impact", "credibility"]
SCORE_WEIGHTS = {
    "importance": 0.30,   # 重要性：这件事在 AI 圈分量多大
    "impact": 0.25,       # 影响范围：影响多少人 / 多少下游
    "novelty": 0.20,      # 信息增量：是不是新东西、有没有新信息
    "firsthand": 0.15,    # 一手性：是不是原始 / 官方发布
    "credibility": 0.10,  # 可信度：来源是否可靠、有无实证
}
# 分类别精选阈值（最终质量分 >= 阈值才进精选）。一手强的类别门槛低，资讯/商业类门槛高。
CATEGORY_THRESHOLD = {
    "ai-models": 55, "ai-coding": 56, "ai-agents": 56, "ai-research": 58,
    "ai-image-video": 58, "ai-tools": 58, "ai-benchmark": 58,
    "ai-office": 60, "ai-business": 60,
}
DEFAULT_THRESHOLD = 58

# 预筛：判断一条原始信息是否跟 AI 相关。命中即进入后续（昂贵的）抓原文 + LLM 富化。
# 用代码先过滤，省掉对明显无关内容（股票、油价、八卦）的 LLM 开销。
_AI_KEYWORDS = (
    "ai", "a.i", "人工智能", "大模型", "llm", "gpt", "claude", "gemini", "deepseek",
    "qwen", "通义", "智谱", "kimi", "llama", "mistral", "agent", "智能体", "mcp",
    "rag", "embedding", "transformer", "neural", "深度学习", "机器学习", "model",
    "模型", "开源模型", "推理", "inference", "微调", "fine-tun", "prompt", "提示词",
    "多模态", "multimodal", "扩散", "diffusion", "生成式", "generative", "ocr",
    "tts", "asr", "语音合成", "文生图", "文生视频", "sora", "midjourney", "stable diffusion",
    "openai", "anthropic", "deepmind", "hugging face", "huggingface", "nvidia",
    "copilot", "cursor", "benchmark", "评测", "arxiv", "数据集", "dataset",
)
_NON_AI_HINTS = (
    "stock", "shares", "nasdaq", "dow jones", "oil price", "box office", "celebrity",
    "football", "nba", "weather", "recipe", "股价", "油价", "票房", "彩票", "星座",
)


def is_ai_relevant(raw: dict) -> bool:
    """代码预筛：T1/T1.5 一手源直接放行（它们本身就是 AI 信源，标题可能不含关键词）；
    其余源要求命中 AI 关键词，且不命中明显的非 AI 噪声词。"""
    tier = raw.get("tier")
    source = (raw.get("source") or "").lower()
    if tier in ("T1", "T1.5"):
        return True
    if source.startswith("arxiv") or "semantic scholar" in source or source.startswith("github"):
        return True
    blob = f"{raw.get('title') or raw.get('name') or ''} {raw.get('summary') or raw.get('description') or ''}".lower()
    if not blob.strip():
        return True  # 信息不足时不武断丢弃，交给 LLM 判断
    has_ai = any(k in blob for k in _AI_KEYWORDS)
    has_noise = any(k in blob for k in _NON_AI_HINTS)
    if has_noise and not has_ai:
        return False
    return has_ai


def compute_quality_score(scores: dict | None, tier: str = "T2") -> int:
    """代码按公式算最终质量分：5 维加权 × 信源等级权重 → 0-100。
    无 scores（旧数据/LLM 未给分）时用 tier 推一个保守的兜底分。"""
    weight = TIER_WEIGHT.get(tier or "T2", 0.6)
    if not isinstance(scores, dict) or not scores:
        return round(70 * weight)  # 兜底：按等级给个中性分，保证旧数据可排序/展示
    total = 0.0
    for dim, w in SCORE_WEIGHTS.items():
        try:
            v = float(scores.get(dim, 0))
        except (TypeError, ValueError):
            v = 0.0
        total += max(0.0, min(100.0, v)) * w
    return round(total * weight)


def select_threshold(category: str) -> int:
    return CATEGORY_THRESHOLD.get(category, DEFAULT_THRESHOLD)


# 分类归一化：旧数据/LLM 可能给中文或别名分类，统一映射回 9 个 slug
CATEGORY_ALIASES = {
    "ai-coding": ["编程", "代码", "coding", "code"],
    "ai-business": ["行业", "商业", "business", "产业", "融资", "市场"],
    "ai-research": ["研究", "论文", "paper", "research", "学术", "arxiv"],
    "ai-tools": ["工具", "tool", "应用", "app", "平台", "助手"],
    "ai-models": ["模型", "model", "大模型"],
    "ai-image-video": ["图像", "视频", "图片", "image", "video", "绘画", "多模态", "生成"],
    "ai-office": ["办公", "写作", "office", "效率", "提效"],
    "ai-benchmark": ["榜单", "评测", "benchmark", "排行", "leaderboard"],
    "ai-agents": ["智能体", "agent", "mcp", "代理", "工作流"],
}


def normalize_category(cat: str, text: str = "") -> str:
    """把任意分类值归一化成 9 个 slug 之一。"""
    if cat in NEWS_CATEGORIES:
        return cat
    c = (cat or "").lower()
    for slug, keys in CATEGORY_ALIASES.items():
        if any(k.lower() in c for k in keys):
            return slug
    return category_from_text(text or cat or "")


# source 字符串 → tier 反查表（用于给旧数据/无 tier 条目补等级）
_SOURCE_TIER = {f["name"]: f["tier"] for f in RSS_FEEDS}
_SOURCE_TIER.update({s["name"]: s["tier"] for s in HTML_SOURCES})


def infer_tier_from_source(source: str) -> str:
    """从 source 文本推断信源等级。一手源（官方/论文/厂商）→T1，二手聚合（NewsAPI 等）→T2。"""
    if not source:
        return "T2"
    s = source.strip()
    low = s.lower()
    if low.startswith("arxiv") or "semantic scholar" in low:
        return "T1"
    if low.startswith("github ·") or low.startswith("github·"):
        return "T1"          # 厂商组织动态
    if low.startswith("github search"):
        return "T1.5"
    # "RSS · 名称" / "HTML · 名称" → 去前缀后查表
    name = re.sub(r"^(RSS|HTML)\s*·\s*", "", s).strip()
    if name in _SOURCE_TIER:
        return _SOURCE_TIER[name]
    for known, tier in _SOURCE_TIER.items():
        if known and known in s:
            return tier
    # NewsAPI / GNews / NewsData.io 等二手新闻 API
    if any(p in s for p in ("NewsAPI", "GNews", "NewsData", "Guardian", "Currents",
                            "World News", "Marketaux", "Auto Search")):
        return "T2"
    return "T2"


# ============ 事件聚类去重 ============
# 同一件事常被多源报道（官方 + X + 各媒体）。按 URL 去重留不住——URL 不同但是同一事件。
# 用标题的"显著 token + 中文二元组"做相似度聚类：同簇只保留最权威的一条当主条，
# 其余折叠进 relatedSources，并记 sourceCount（被多少源报道 = 热度信号）。
_CLUSTER_STOPWORDS = {
    "the", "and", "for", "with", "new", "now", "how", "why", "what", "your", "you",
    "ai", "llm", "model", "models", "release", "released", "launch", "launches",
    "introducing", "announces", "announced", "update", "updates", "发布", "推出",
    "更新", "上线", "宣布", "正式", "最新", "中国", "全球",
}


def _title_tokens(title: str) -> set:
    """从标题抽显著 token：英文词/数字/版本号（去停用词）+ 中文二元组。"""
    if not title:
        return set()
    toks = set()
    for w in re.findall(r"[a-z0-9][a-z0-9.\-]{2,}", title.lower()):
        if w not in _CLUSTER_STOPWORDS:
            toks.add(w)
    zh = re.findall(r"[一-鿿]", title)
    for i in range(len(zh) - 1):
        bigram = zh[i] + zh[i + 1]
        if bigram not in _CLUSTER_STOPWORDS:
            toks.add(bigram)
    return toks


def _same_event(a: set, b: set, threshold: float = 0.5) -> bool:
    """重叠系数 |A∩B| / min(|A|,|B|) >= 阈值 且共享 token >= 2 → 判为同一事件。"""
    if not a or not b:
        return False
    inter = len(a & b)
    if inter < 2:
        return False
    return inter / min(len(a), len(b)) >= threshold


_TIER_RANK = {"T1": 0, "T1.5": 1, "T2": 2}


def cluster_news(items: list[dict]) -> list[dict]:
    """对 news 列表做事件聚类：同簇保留主条（tier 高 > 分高 > 新），其余折叠。
    主条会带上 sourceCount 和 relatedSources。"""
    if not items:
        return items
    # 代表性排序：tier 高、分高、日期新的优先当主条
    order = sorted(
        items,
        key=lambda it: (
            _TIER_RANK.get(it.get("tier", "T2"), 3),
            -int(it.get("score") or 0),
            str(it.get("date") or ""),
        ),
    )
    sigs = {id(it): _title_tokens(it.get("title") or "") for it in order}
    used = set()
    representatives = []
    for main in order:
        if id(main) in used:
            continue
        used.add(id(main))
        related = []
        for other in order:
            if id(other) in used:
                continue
            if _same_event(sigs[id(main)], sigs[id(other)]):
                used.add(id(other))
                related.append(other)
        if related:
            main["sourceCount"] = 1 + len(related)
            main["relatedSources"] = [
                {"source": r.get("source") or "", "url": r.get("url") or "", "title": r.get("title") or ""}
                for r in related
            ]
        else:
            main.setdefault("sourceCount", 1)
        representatives.append(main)
    return representatives


# ============ AI 日报（预计算分桶）============
# 日报不调任何大模型：精选/分类/摘要在入库时已做完，日报只是把已处理好的精选条目
# 按类别分桶 + 按分排序，几毫秒生成。参考 AIHOT：日报是"标题层"成品。
def existing_news_urls() -> set:
    """已入库的 news URL 集合——用于高频采集时跳过已处理条目。"""
    data = read_json(GENERATED_JSON, {})
    urls = set()
    for n in data.get("news") or []:
        if n.get("url"):
            urls.add(n["url"])
        for r in n.get("relatedSources") or []:
            if r.get("url"):
                urls.add(r["url"])
    return urls


def _bucket_daily(items: list[dict], date_label: str) -> dict:
    """把一组（已精选的）条目按 9 类分桶 + 按分排序，组装成一份日报对象。"""
    buckets: dict[str, list] = {}
    for n in items:
        buckets.setdefault(n.get("category") or "ai-models", []).append(n)
    sections = []
    for cat in NEWS_CATEGORIES:
        bucket = buckets.get(cat) or []
        if not bucket:
            continue
        bucket = sorted(bucket, key=lambda n: -int(n.get("score") or 0))[:12]
        sections.append({
            "category": cat,
            "label": CATEGORY_LABELS.get(cat, cat),
            "items": [{
                "title": n.get("title") or "",
                "summary": (n.get("summary") or "")[:140],
                "source": n.get("source") or "",
                "url": n.get("url") or "",
                "score": int(n.get("score") or 0),
                "sourceCount": int(n.get("sourceCount") or 1),
                "date": n.get("date") or "",
                "publishedAt": n.get("publishedAt") or "",
                "reason": n.get("reason") or "",
            } for n in bucket],
        })
    return {
        "date": date_label,
        "generatedAt": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
        "total": sum(len(s["items"]) for s in sections),
        "sections": sections,
    }


def build_daily_report(news: list[dict], window_days: int = 1, min_items: int = 8) -> dict:
    """滚动日报：取最近窗口的精选条目分桶（首页/最新日报用）。"""
    selected = [n for n in news if n.get("aiSelected")]
    cutoff = days_ago(window_days)
    recent = [n for n in selected if str(n.get("date") or "") >= cutoff]
    if len(recent) < min_items:
        # 兜底：数据较旧/较少时，取最近的精选条目，保证日报页不空
        recent = sorted(selected, key=lambda n: str(n.get("date") or ""), reverse=True)[:max(min_items, 24)]
    return _bucket_daily(recent, today_iso())


def freeze_daily_report(for_date: str | None = None, keep: int = 60) -> dict:
    """每天 0 点固化：把指定日期（默认昨天）当天发布且精选的条目，
    固化成一份带日期的日报，存入 dailyReports 归档（AIHOT 式 /daily/{date}）。"""
    data = read_json(GENERATED_JSON, {})
    news = data.get("news") or []
    target = for_date or days_ago(1)
    day_items = [n for n in news if str(n.get("date") or "")[:10] == target and n.get("aiSelected")]
    report = _bucket_daily(day_items, target)
    # 兜底：目标日的精选条目可能已被 news 的 [:100] 上限裁掉，导致归档为空壳
    # （daily.js 会过滤掉没有 sections 的报告）。此时用当前滚动日报的内容快照成该日归档。
    if report.get("total", 0) < 1:
        rolling = data.get("dailyReport") or {}
        if rolling.get("sections"):
            report = {
                "date": target,
                "generatedAt": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
                "total": rolling.get("total") or sum(len(s.get("items") or []) for s in rolling["sections"]),
                "sections": rolling["sections"],
            }
    archive = [r for r in (data.get("dailyReports") or []) if r.get("date") != target]
    archive.insert(0, report)
    # 只保留有内容的归档，顺带清掉历史遗留的空壳条目
    data["dailyReports"] = [r for r in archive if r.get("sections")][:keep]
    # 注意：不覆盖 data["dailyReport"]（那是 merge 维护的"滚动最新日报"）；
    # 归档是带日期的成品，日报页优先展示最新非空归档，否则回退滚动日报。
    data["lastUpdated"] = today_iso()
    write_generated(data)
    print(f"[{datetime.now().strftime('%H:%M:%S')}] 固化日报 {target}：{report['total']} 条")
    return report


_SANITIZE_PATTERNS = [
    re.compile(r"\?{3,}"),                           # 一堆问号
    re.compile(r"NewsAPI:\S*", re.I),                # 残留的 source 标记
    re.compile(r"GNews:\S*|NewsData\.io:\S*|The Guardian:\S*|Currents:\S*", re.I),
    re.compile(r"Marketaux:\S*|World News API:\S*", re.I),
    re.compile(r"RSS · [^.]+", re.I),
    re.compile(r"GitHub Search · \d{4}-\d{2}-\d{2}", re.I),
]


def sanitize_text(s: str) -> str:
    """清 source 残留 + 中英文标点规范化（盘古之白 + 全角括号 + 单位贴近）。"""
    if not isinstance(s, str):
        return s
    for pat in _SANITIZE_PATTERNS:
        s = pat.sub("", s)
    s = re.sub(r"\s+", " ", s).strip()
    # 中文 + 英文/数字 → 加空格
    s = re.sub(r"([一-鿿])([A-Za-z0-9])", r"\1 \2", s)
    s = re.sub(r"([A-Za-z0-9])([一-鿿])", r"\1 \2", s)
    # 半角括号紧贴中文 → 全角
    s = re.sub(r"([一-鿿])\(", r"\1（", s)
    s = re.sub(r"\)([一-鿿])", r"）\1", s)
    s = re.sub(r"([一-鿿])\)", r"\1）", s)
    s = re.sub(r"\(([一-鿿])", r"（\1", s)
    # 中文标点前后空格清掉
    s = re.sub(r" ([，。！？；：、])", r"\1", s)
    s = re.sub(r"([，。！？；：、]) ", r"\1", s)
    # 数字 + 常见中文单位不留空格
    s = re.sub(r"(\d) (月|日|年|时|分|秒|岁|个|条|篇|次|倍|位|名|元|周)", r"\1\2", s)
    return s.strip()


NEWS_WRITING_STYLES = [
    {
        "name": "observer",
        "system": "你是中文 AI 行业的资深观察者。语气像把笔记本里的观察发出来：直接说事实、举具体例子、保留模型名/数字/版本号原样。",
        "voice": "第三人称客观陈述，但偶尔在 keyPoints 里夹一句作者判断。",
        "open_preference": "用具体事件名或具体数字开头（'OpenAI 在 5 月 20 日...'、'Claude 4.5 Sonnet 在...'）",
        "structure_hint": "title 直接说事实；summary 先说谁做了什么、再说亮点；background 写时间线和上下文；impact 写连锁效应。",
        "ban": ["旨在", "推动", "助力", "赋能", "引领", "重磅", "震撼", "值得关注", "标志着"],
    },
    {
        "name": "reviewer",
        "system": "你是写产品评测的中文科技博主。语气像 ProductHunt / 少数派的评测：以读者使用决策为核心。",
        "voice": "评测口吻，给出推荐/不推荐的态度。",
        "open_preference": "summary 用 '这次发布的核心点是...' 这类直接评测开头。",
        "structure_hint": "background 改成 '它和同类有什么不同'；impact 改成 '推荐 vs 不推荐的人群'；useCases 含具体动作；risks 写真实坑。",
        "ban": ["业界领先", "颠覆性", "强大", "革命性", "无与伦比"],
    },
    {
        "name": "recommender",
        "system": "你是把好用 AI 工具/项目分享给同事的资深开发者，第一人称口吻（'我'、'我们'）。",
        "voice": "口语化、像分享个人发现，不端着。",
        "open_preference": "summary 可以用 '我注意到...' / '最近看到...' 开头，但只在 summary 用一次，其他字段保持中性。",
        "structure_hint": "audience 写具体角色；useCases 像在跟人介绍自己的真实使用场景。",
        "ban": ["旨在", "推动", "助力", "据悉", "众所周知"],
    },
    {
        "name": "analyst",
        "system": "你是 AI 行业分析师。从商业、技术栈、竞争格局、监管影响的角度切入。",
        "voice": "理性、含数据、含对比。",
        "open_preference": "summary 含数字或对比（'相比上一代提升 X%'、'比同期同类产品...'）。",
        "structure_hint": "background 含行业背景和竞争对手；impact 写连锁效应和下游影响；risks 写监管/合规/商业风险。",
        "ban": ["旨在", "推动", "赋能", "引领", "重磅"],
    },
    {
        "name": "tutorial",
        "system": "你是写实用教程的中文技术编辑，重点是'读完能怎么动手'。",
        "voice": "动作导向，结果可衡量。",
        "open_preference": "summary 偏 '它能让你 X 分钟内做到 Y' 这种结果导向。",
        "structure_hint": "useCases 必须是 3-5 个动作步骤（动词开头）；risks 写实操中容易踩的坑（环境配置、API quota、版本兼容）。",
        "ban": ["值得关注", "重磅", "震撼", "引发关注"],
    },
    {
        "name": "critic",
        "system": "你是带批判性思维的中文 AI 分析者。不光介绍功能，要点出局限、对比同类、给中立结论。",
        "voice": "中立、含反面、不当软文。",
        "open_preference": "summary 含正反两面（'X 提升了 Y，但仍然 Z'）。",
        "structure_hint": "risks 至少 3 条具体局限；audience 注明'不适合谁'。",
        "ban": ["旨在", "颠覆", "无可挑剔", "完美", "前所未有"],
    },
]


def pick_writing_style(seed: str) -> dict:
    """按字符串 hash 稳定选一种风格——同一条 news 多次跑保持同样风格。"""
    if not seed:
        return NEWS_WRITING_STYLES[0]
    h = sum(ord(c) for c in seed) % len(NEWS_WRITING_STYLES)
    return NEWS_WRITING_STYLES[h]


def sanitize_news_dict(d: dict) -> dict:
    """对 enrich 返回的 dict 做整体清洗：字符串字段全部 sanitize，list 字段每项也清。"""
    for k in ("title", "summary", "background", "impact", "reason"):
        if isinstance(d.get(k), str):
            d[k] = sanitize_text(d[k])
    for k in ("keyPoints", "audience", "useCases", "risks", "tags",
              "features", "quickStart", "details", "description", "why"):
        v = d.get(k)
        if isinstance(v, list):
            d[k] = [sanitize_text(x) if isinstance(x, str) else x for x in v if x]
        elif isinstance(v, str):
            d[k] = sanitize_text(v)
    return d


def enrich_news_item(raw: dict) -> dict | None:
    """单条原始信息 → 调一次 LLM。按 url hash 稳定选 6 种写作风格之一，
    避免内容千篇一律。不是 AI 相关的返回 None 让系统丢弃。
    新策略：调 LLM 前先抓 URL 原文，给 LLM 一份完整正文，避免只靠 180 字 summary 改写。"""
    text = item_text(raw)
    rule_category = category_from_text(text)
    style = pick_writing_style(raw.get("url") or raw.get("title") or "")
    # 抓原文（失败返回空字符串，LLM 仍可基于 summary 改写）
    original_content = fetch_article_text(raw.get("url") or "")
    prompt = {
        "task": "把英文/中文原始 AI 信息改写成 信息密度高、可读性强 的中文条目。LLM 应优先依据 input.originalContent 写作（这是抓到的完整原文）；input.summary 只是新闻 API 给的短摘要、信息量有限。如果输入不是 AI/LLM/Agent/模型/工具相关的实质内容（ASX 股票、油价、明星八卦），返回不带 title 的对象，系统会丢弃。",
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
            "originalContent": original_content,
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
            "reason": "一句话推荐理由：为什么这条值得一看（30-50 字，点出独特价值，不要套话）",
            "scores": {
                "importance": "0-100：这件事在 AI 圈的分量（行业级大事 80+，小更新 30-50）",
                "novelty": "0-100：信息增量（全新发布/突破 80+，已被反复报道的旧事 20-40）",
                "firsthand": "0-100：一手性（官方/作者原始发布 90+，媒体二手转述 30-50）",
                "impact": "0-100：影响范围（影响大量开发者/用户 80+，小众 30-50）",
                "credibility": "0-100：可信度（有实证/官方背书 80+，传闻/营销 20-40）",
            },
        },
        "requirements": [
            "category 必须是 schema 列出的之一",
            "不要输出 url / source / date",
            "数字、版本号、模型名、价格保留原样",
            "严格按 writingStyle 指示的语气和结构来写——不同 style 必须写出不同质感",
            "宁可写长写满，不要套话；信息不够时多角度展开",
            "scores 的 5 个维度都必须给 0-100 的整数，客观打分，不要全部给高分",
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
    result["publishedAt"] = (raw.get("_datetime_hint") or "")   # 精确到分钟（北京时间），无则空
    if result.get("category") not in NEWS_CATEGORIES:
        result["category"] = rule_category
    # 保存原文正文（前端可折叠展示）
    if original_content:
        result["originalContent"] = original_content
    # —— 评分 / 精选：模型只打 5 维，最终分和是否精选由代码算 ——
    tier = raw.get("tier") or "T2"
    scores = result.get("scores") if isinstance(result.get("scores"), dict) else None
    result["tier"] = tier
    result["scores"] = scores or {}
    result["score"] = compute_quality_score(scores, tier)
    result["aiSelected"] = result["score"] >= select_threshold(result["category"])
    # 移除编辑视角字段（如果 LLM 误输出）
    for k in ("contentIdeas", "nextActions", "moduleTargets", "routeReason", "whyUseful"):
        result.pop(k, None)
    # 记录用了哪种风格（便于排查）
    result["_style"] = style["name"]
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
    """单条 GitHub 项目 → 1 次 LLM，产出含 category 的中文项目卡。
    风格目标：像懂行的开发者推荐 repo，不写'强大的''先进的'这种空词。"""
    prompt = {
        "task": "把 GitHub 项目改写成中文项目卡。",
        "input": {
            "name": raw.get("name"),
            "lang": raw.get("lang"),
            "description": raw.get("description"),
            "url": raw.get("url"),
            "stars": raw.get("stars"),
        },
        "schema": {
            "name": "保留 owner/repo 原名，不翻译",
            "lang": "主要语言",
            "category": "|".join(GITHUB_CATEGORIES),
            "description": "60-100 字一句话；说这是给谁用的什么工具，含 1 个亮点",
            "details": "200-320 字详细介绍：解决什么问题、和同类（点名具体竞品）的差异、技术栈/语言/许可证、推荐谁试、不推荐谁",
            "features": ["5-7 条；每条 15-35 字；列能力点（如 'OpenAI 兼容 API'、'支持 GGUF 量化、混合精度'），不写形容词",],
            "useCases": ["3-5 条；动词开头并含具体动作（如 '本地跑 Llama3 70B 做客服初筛'、'替换 Pinecone 做企业 RAG 向量检索'）"],
            "quickStart": ["4-6 步上手；用命令或动作描述（'pip install xxx' / 'docker run' / 'curl https://...' / '在 Claude Code 里 /add-plugin'）"],
            "why": "100-160 字；为什么这个比同类好或不同；具体证据（star 数 / 厂商 / 发布时间 / 技术细节 / 社区活跃度）；不要说'值得关注'",
            "tags": ["3-5 个中文标签"]
        },
        "style": [
            "禁用词：强大 / 先进 / 助力 / 推动 / 引领 / 重磅 / 旨在 / 值得关注",
            "宁可短而具体，不要堆形容词",
            "技术名（model name、framework、protocol）保留原样",
        ],
        "requirements": [
            "category 必须严格在 schema 列出的 11 类之一",
            "如果不是 AI 相关项目，返回不带 name 的对象（系统会过滤）",
            "stars 字段保留输入值，不要编造",
        ],
    }
    result = call_json_llm(
        "你是中文 AI 导航站编辑。语气像懂行的开发者推荐 repo。只输出 JSON。",
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
    """单条 Skill 候选 → 1 次 LLM，产出 Skill 条目。
    风格目标：像把 .claude/skills 安装文档浓缩成一张卡片。"""
    prompt = {
        "task": "把这个资源整理为 AI Skill 条目，必须归到 9 种 type 之一。",
        "input": {
            "title": raw.get("name") or raw.get("title"),
            "description": raw.get("description") or raw.get("summary"),
            "lang": raw.get("lang"),
            "url": raw.get("url"),
            "source": raw.get("source"),
        },
        "schema": {
            "title": "Skill 名称；英文 owner/repo 保留原名",
            "type": "|".join(SKILL_TYPES),
            "description": "40-70 字；告诉读者这个 Skill 让 Coding Agent 多了什么能力",
            "details": "200-320 字；展开讲具体场景（如 'commit 前自动跑 ggshield 扫密钥' / 'PR review 时检查 SQL 注入'）、和同类的差异、技术栈/兼容性",
            "features": ["4-6 条；动作/能力点（如 'PreToolUse hook 拦截危险命令'）；不写形容词"],
            "useCases": ["3-5 条；'谁/什么场景/解决什么'，动词开头"],
            "tags": ["3-5 个中文标签"]
        },
        "style": [
            "禁用词：强大 / 先进 / 助力 / 旨在 / 值得关注",
            "技术名保留原样（Claude Code / MCP / Cursor 等）",
            "如果输入不像 Skill / agent-skills 仓库 / MCP 服务，返回不带 title 的对象（系统会过滤）",
        ],
        "requirements": [
            "type 必须严格选 schema 给出的 9 种之一",
            "不要编造功能",
        ],
    }
    result = call_json_llm(
        "你是中文 AI Skill 编辑。语气像把 .claude/skills 安装文档浓缩成卡片。只输出 JSON。",
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
        category = category_from_text(f"{title} {summary}")
        tier = item.get("tier") or "T2"
        score = compute_quality_score(None, tier)
        raw_date = (item.get("_date_hint") or "").strip()
        news.append({
            "title": title,
            "summary": summary[:180] if summary else "",
            "category": category,
            "source": item.get("source") or "Auto Search",
            "date": raw_date[:10] if len(raw_date) >= 10 else today_iso(),
            "publishedAt": item.get("_datetime_hint") or "",
            "tags": [],
            "url": item.get("url"),
            "keyPoints": [],
            "background": "",
            "impact": "",
            "audience": [],
            "useCases": [],
            "risks": [],
            "tier": tier,
            "scores": {},
            "score": score,
            "aiSelected": score >= select_threshold(category),
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
        "skillRecommendations": uniq_by([*(patch.get("skillRecommendations") or []), *(current.get("skillRecommendations") or [])], lambda item: item.get("url") or item.get("title"))[:200],
    }

    # 向后兼容 + 评分补齐（幂等）：
    #  - 真实 LLM 打分（scores 非空）→ 保留模型分，tier 用 enrich 时写入的；
    #  - 旧数据 / 兜底（无 scores）→ 每次按 source 反推 tier 并用兜底公式重算，保证幂等。
    for n in merged["news"]:
        n["category"] = normalize_category(n.get("category"), f"{n.get('title','')} {n.get('summary','')}")
        has_real_scores = isinstance(n.get("scores"), dict) and bool(n.get("scores"))
        if has_real_scores:
            n.setdefault("tier", infer_tier_from_source(n.get("source") or ""))
            if n.get("score") is None:
                n["score"] = compute_quality_score(n["scores"], n["tier"])
        else:
            n["tier"] = infer_tier_from_source(n.get("source") or "")
            n["score"] = compute_quality_score(None, n["tier"])
        n["aiSelected"] = n["score"] >= select_threshold(n.get("category", ""))
    # 只录精品：未过质量阈值的条目不入站（宁缺毋滥）
    merged["news"] = [n for n in merged["news"] if n.get("aiSelected")]
    # 事件聚类去重：同一事件折叠成一条主条，记 sourceCount / relatedSources
    merged["news"] = cluster_news(merged["news"])

    # 排序：所有带 date 字段的列表按时间倒序
    merged["news"] = _sort_by_date_desc(merged["news"])

    # AI 日报：基于已评分/精选/聚类的 news 预计算分桶（不调 LLM）
    merged["dailyReport"] = build_daily_report(merged["news"])
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
    # 剥掉已弃用的编辑视角字段（迁移：老数据里还有 contentIdeas/nextActions/routeReason）
    for item in merged.get("news", []) or []:
        for k in ("contentIdeas", "nextActions", "routeReason", "whyUseful"):
            item.pop(k, None)
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


def date_str_to_dt(s: str) -> datetime:
    return datetime.strptime(s, "%Y-%m-%d")


def iter_week_chunks(start: str, end: str):
    """把 [start, end] 按 7 天切片，yields (chunk_since, chunk_until)。"""
    s = date_str_to_dt(start)
    e = date_str_to_dt(end)
    cur = s
    while cur <= e:
        nxt = min(cur + timedelta(days=6), e)
        yield cur.strftime("%Y-%m-%d"), nxt.strftime("%Y-%m-%d")
        cur = nxt + timedelta(days=1)


def run_backfill(days: int | None = None, start: str | None = None, end: str | None = None) -> dict:
    """回填指定时间段的历史内容。按周切片，每片并发拉新闻 + GitHub + arXiv，
    全部 LLM 并发改写为中文条目，合并入 generated-data.json。"""
    if start and end:
        period_start, period_end = start, end
    else:
        n = days or 30
        period_end = today_iso()
        period_start = days_ago(n)

    print(f"[{datetime.now().strftime('%H:%M:%S')}] 开始 backfill：{period_start} → {period_end}")

    all_news_raw: list[dict] = []
    all_github_raw: list[dict] = []

    chunks = list(iter_week_chunks(period_start, period_end))
    print(f"  切成 {len(chunks)} 个 7 天片段")

    for since, until in chunks:
        print(f"  · 抓取片段 {since} → {until}")
        gh = fetch_github_candidates(since)
        all_github_raw.extend(gh)
        news = fetch_news_api_items(since=since, until=until)
        all_news_raw.extend(news)
        research = fetch_research_items(since=since, until=until)
        all_news_raw.extend(research)

    all_news_raw = uniq_by(all_news_raw, lambda r: r.get("url"))
    all_github_raw = uniq_by(all_github_raw, lambda r: r.get("name") or r.get("url"))
    print(f"  共抓到原始：news {len(all_news_raw)} 条 / github {len(all_github_raw)} 个")

    # 并发 LLM 第一波：news（可能上百条，分批并发）
    enriched_news, failed_news = parallel_enrich(all_news_raw[:200], enrich_news_item, "backfill-news")
    if failed_news:
        enriched_news.extend(fallback_news(failed_news))

    # 第二波：GitHub
    regular_gh, skill_candidates = split_github_for_skills(all_github_raw[:80])
    enriched_github, failed_gh = parallel_enrich(regular_gh, enrich_github_item, "backfill-github")
    if failed_gh:
        for raw in failed_gh:
            enriched_github.append({**raw, "category": "Coding Agent", "details": (raw.get("description") or "")[:300], "features": [], "useCases": [], "quickStart": []})

    # 第三波：Skill 候选
    enriched_skills = []
    if skill_candidates:
        enriched_skills, _ = parallel_enrich(skill_candidates, enrich_skill_item, "backfill-skills")

    payload = route_enriched(enriched_news, enriched_github, enriched_skills)
    payload["sources"] = FREE_INFO_SOURCES
    print(f"[{datetime.now().strftime('%H:%M:%S')}] backfill 完成：news={len(payload['news'])} github={len(enriched_github)} skills={len(enriched_skills)}")
    return merge_generated(payload)


def run_daily() -> dict:
    print(f"[{datetime.now().strftime('%H:%M:%S')}] run_daily 开始")

    github_items = fetch_github_candidates(days_ago(2))
    print(f"  · GitHub 抓取 {len(github_items)} 个候选")

    raw_news_items = []
    raw_news_items.extend(fetch_aihot_items())   # 已精选的中文聚合源，放最前优先送富化
    raw_news_items.extend(fetch_news_api_items())
    raw_news_items.extend(fetch_rss_items())
    raw_news_items.extend(fetch_html_items())
    raw_news_items.extend(fetch_research_items())
    raw_news_items = uniq_by(raw_news_items, lambda r: r.get("url"))
    # 代码预筛：丢掉明显非 AI 的噪声，省掉对它们的抓原文 + LLM 开销
    before = len(raw_news_items)
    raw_news_items = [r for r in raw_news_items if is_ai_relevant(r)]
    # 跳过已采集过的 URL：高频（每 10 分钟）采集时，只把新增条目送 LLM，避免重复处理与重复花钱
    known = existing_news_urls()
    raw_news_items = [r for r in raw_news_items if r.get("url") and r.get("url") not in known]
    print(f"  · 新闻类原始候选 {before} 条 → 预筛后 {len([r for r in raw_news_items])} 条新增（已知 {len(known)} 条已跳过）")

    # 并发 LLM 第一波：news 条目
    enriched_news, failed_news = parallel_enrich(raw_news_items[:60], enrich_news_item, "news")
    if failed_news:
        enriched_news.extend(fallback_news(failed_news))

    # 并发 LLM 第二波：GitHub 项目（含 category 分类）
    regular_gh, skill_candidates = split_github_for_skills(github_items[:30])
    # 补充多平台热门 Skill：GitHub 仓库 + 8 个社区/注册表来源（HN、Smithery、HF、npm、Dev.to、Reddit、Product Hunt）
    known_skill_urls = {s.get("url") for s in (read_json(GENERATED_JSON, {}).get("skillRecommendations") or [])}
    popular_skills = fetch_skill_repos() + fetch_skill_external()
    popular_skills = [s for s in popular_skills if s.get("url") not in known_skill_urls]
    skill_candidates = uniq_by(skill_candidates + popular_skills, lambda s: s.get("url") or s.get("name"))[:36]
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

    # 并发：news（来自 RSS + HTML 一手源）
    rss_items = fetch_rss_items() + fetch_html_items()
    rss_items = uniq_by(rss_items, lambda r: r.get("url"))
    rss_items = [r for r in rss_items if is_ai_relevant(r)]
    known = existing_news_urls()
    rss_items = [r for r in rss_items if r.get("url") and r.get("url") not in known]
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
        targets = list(n.get("moduleTargets") or ["news"])
        # 工具类资讯可顺手收进 topicResources
        if any(w in text for w in ["tool", "platform", "api", "assistant", "app", "editor", "agent"]):
            topic_id = topic_from_text(item_text(n))
            if "topicResources" not in targets:
                targets.append("topicResources")
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
        n["moduleTargets"] = targets
        # 清掉 LLM 可能误输出或老数据里的编辑视角字段
        for k in ("contentIdeas", "nextActions", "routeReason", "whyUseful"):
            n.pop(k, None)
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
                    "dailyReports": len(generated.get("dailyReports") or []),
                },
                "scheduler": scheduler,
                "config": {
                    "crawlIntervalMinutes": float(os.getenv("CRAWL_INTERVAL_MINUTES", "10")),
                    "dailyReportTime": os.getenv("DAILY_REPORT_TIME", "00:00"),
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
            elif path == "/api/admin/freeze-report":
                report = freeze_daily_report()
                send_json(self, 200, {"ok": True, "date": report.get("date"), "total": report.get("total")})
                return
            else:
                send_json(self, 404, {"ok": False, "error": "Unknown admin action"})
                return
            send_json(self, 200, {"ok": True, "generatedAt": result.get("generatedAt"), "counts": {"news": len(result.get("news") or []), "weeklyDigests": len(result.get("weeklyDigests") or []), "githubWeekly": len(result.get("githubWeekly") or []), "sources": len(result.get("sources") or [])}})
        except Exception as error:
            send_json(self, 500, {"ok": False, "error": str(error)})


def git_auto_push(message: str | None = None) -> bool:
    """把生成的数据文件提交并推送到 GitHub，从而触发 Vercel 自动重新部署。

    只暂存数据文件（data/、assets/data/），不会把本地其他改动一起提交；
    没有实际变化时不提交、不推送，返回 False。
    需要本机已经配置好 git 推送凭证（HTTPS 用 PAT/凭证管理器，或 SSH key）。"""
    paths = ["data", "assets/data"]
    branch = os.getenv("GIT_BRANCH", "main")
    remote = os.getenv("GIT_REMOTE", "origin")

    def run(cmd: list[str]) -> subprocess.CompletedProcess:
        return subprocess.run(cmd, cwd=str(ROOT), capture_output=True, text=True)

    try:
        run(["git", "add", "--"] + paths)
        status = run(["git", "status", "--porcelain", "--"] + paths)
        if not status.stdout.strip():
            return False  # 没有实际变化，跳过
        msg = message or f"chore(data): auto update {datetime.now().strftime('%Y-%m-%d %H:%M')}"
        commit = run(["git", "commit", "-m", msg])
        if commit.returncode != 0:
            print("[git] commit failed:", (commit.stderr or commit.stdout).strip())
            return False

        # 多实例/手动提交会让远端领先，导致 push 被判 non-fast-forward 拒绝。
        # 先 push，被拒就 pull --rebase 整合远端再重试；最多重试 3 次以应对竞争。
        # 本函数只提交 data/、assets/data/，rebase 冲突只可能发生在数据文件上，
        # 用 -X theirs（rebase 语境=正在重放的本地提交）保留本轮最新抓取的数据。
        for attempt in range(3):
            push = run(["git", "push", remote, branch])
            if push.returncode == 0:
                print("[git] pushed:", msg)
                return True
            err = (push.stderr or push.stdout).strip()
            print(f"[git] push rejected (attempt {attempt + 1}/3):", err.splitlines()[0] if err else "")
            pull = run(["git", "pull", "--rebase", "-X", "theirs", "--autostash", remote, branch])
            if pull.returncode != 0:
                run(["git", "rebase", "--abort"])
                print("[git] pull --rebase failed, aborted:", (pull.stderr or pull.stdout).strip())
                return False
        print("[git] push still failing after retries; will retry next cycle")
        return False
    except Exception as error:
        print("[git] auto push error:", error)
        return False


def git_auto_self_update() -> None:
    """定期从远端拉取最新代码；若 backend.py 变化则原地重启进程加载新代码。
    仅当 AUTO_GIT_PULL 开启时生效。

    安全设计（避免 autostash 放回脏数据导致冲突、把工作区搞成 unmerged 状态）：
      1) 先 fetch，只比较"远端是否领先"；远端没有新提交就**完全不碰工作区**，
         不打扰正在进行的采集（data 文件持续被改写属正常）。
      2) 远端确有新提交时，才丢弃本地对 data/、assets/data/ 的未提交改动
         （它们下一轮会自动重新生成），让工作区干净，再做**无 autostash** 的 rebase。
      3) 任何异常都先 `rebase --abort` 复位，绝不把仓库留在半冲突状态。"""
    branch = os.getenv("GIT_BRANCH", "main")
    remote = os.getenv("GIT_REMOTE", "origin")
    data_paths = ["data", "assets/data"]
    backend_file = Path(__file__).resolve()

    def run(cmd: list[str]) -> subprocess.CompletedProcess:
        return subprocess.run(cmd, cwd=str(ROOT), capture_output=True, text=True)

    try:
        # 1) 防御：若上次遗留了未完成的 rebase，先复位
        if (ROOT / ".git" / "rebase-merge").exists() or (ROOT / ".git" / "rebase-apply").exists():
            run(["git", "rebase", "--abort"])

        # 2) fetch 后判断远端是否领先；不领先就什么都不做
        if run(["git", "fetch", remote, branch]).returncode != 0:
            return
        behind = run(["git", "rev-list", "--count", "HEAD..FETCH_HEAD"]).stdout.strip()
        if behind in ("", "0"):
            return  # 远端无新提交，保持工作区不动

        # 3) 远端有新提交：丢弃本地会自动重生的 data 改动，保证工作区干净再 rebase
        before = backend_file.read_bytes()
        run(["git", "checkout", "--", *data_paths])
        pull = run(["git", "pull", "--rebase", remote, branch])
        if pull.returncode != 0:
            run(["git", "rebase", "--abort"])
            print("[git] auto pull failed, aborted:", (pull.stderr or pull.stdout).strip().splitlines()[:1])
            return
        print("[git] pulled:", f"远端领先 {behind} 个提交，已同步")
        if backend_file.read_bytes() != before:
            print("[git] backend.py 已更新 → 重启进程加载新代码…")
            sys.stdout.flush()
            os.execv(sys.executable, [sys.executable] + sys.argv)  # 原地重启，不再返回
    except Exception as error:
        print("[git] auto self-update error:", error)


def _save_state(state: dict) -> None:
    SCHEDULER_STATE.write_text(json.dumps(state, ensure_ascii=False, indent=2), encoding="utf-8")


def scheduler_loop() -> None:
    """调度策略：
    1) 间隔采集：每 CRAWL_INTERVAL_MINUTES 分钟跑一次 run_daily（抓取+评分+精选+滚动日报）。
       已知 URL 不会重复送 LLM，所以高频采集只会处理新增条目，成本可控。
       状态持久化在 scheduler-state.json，频繁重启不会重复触发；首次启动会跑一次。
    2) 每日 0 点（DAILY_REPORT_TIME）固化：把昨天的精选固化成带日期的日报存入归档。
    3) 每周（WEEKLY_DAY/WEEKLY_TIME）跑一次 run_weekly（GitHub/Skill 周报）。"""
    while True:
        try:
            state = read_json(SCHEDULER_STATE, {})
            now = datetime.now()
            today = today_iso()
            current_time = now.strftime("%H:%M")

            # —— 0) 自动同步代码：定期 git pull，backend.py 变了就自重启 ——
            # 让本机在开发机推送新代码后自动跟上，无需手动 pull/重启。
            if os.getenv("AUTO_GIT_PULL", "0").lower() in ("1", "true", "yes", "on"):
                pull_interval = float(os.getenv("GIT_PULL_INTERVAL_MINUTES", "5"))
                last_pull = state.get("lastPullAt")
                pull_due = True
                if last_pull:
                    try:
                        elapsed = (datetime.now(timezone.utc) - datetime.fromisoformat(last_pull)).total_seconds()
                        pull_due = elapsed >= pull_interval * 60
                    except Exception:
                        pull_due = True
                if pull_due:
                    state["lastPullAt"] = datetime.now(timezone.utc).isoformat()
                    _save_state(state)        # 先存，避免重启后立即又拉一次
                    git_auto_self_update()    # backend.py 变化时会在此原地重启，不再返回

            # —— 1) 间隔采集 ——
            interval_minutes = float(os.getenv("CRAWL_INTERVAL_MINUTES", "10"))
            last_crawl = state.get("lastCrawlAt")
            due = True
            if last_crawl:
                try:
                    elapsed = (datetime.now(timezone.utc) - datetime.fromisoformat(last_crawl)).total_seconds()
                    due = elapsed >= interval_minutes * 60
                except Exception:
                    due = True
            if due:
                state["lastCrawlAt"] = datetime.now(timezone.utc).isoformat()
                _save_state(state)
                try:
                    run_daily()
                    state["lastCrawlFinishedAt"] = datetime.now(timezone.utc).isoformat()
                    state.pop("lastCrawlError", None)
                except Exception as error:
                    state["lastCrawlError"] = str(error)
                _save_state(state)

            # —— 2) 每日固化日报（固化"昨天"）——
            # catch-up：新的一天里、到了配置时间后第一次 tick 就补做一次，不再依赖恰好卡在那一分钟，
            # 避免进程没在 00:00 那一分钟运行就整天漏掉归档。字符串比较 "HH:MM" 即可正确排序。
            if current_time >= os.getenv("DAILY_REPORT_TIME", "00:00") and state.get("lastReportDate") != today:
                state["lastReportDate"] = today
                _save_state(state)
                try:
                    freeze_daily_report()
                    state["lastReportFinishedAt"] = datetime.now(timezone.utc).isoformat()
                    state.pop("lastReportError", None)
                except Exception as error:
                    state["lastReportError"] = str(error)
                _save_state(state)

            # —— 2.5) 每日刷新固定数据：大模型榜单 + 批量 Skill（每天第一次 tick 时跑一次）——
            if state.get("lastSeedDate") != today:
                state["lastSeedDate"] = today
                _save_state(state)
                try:
                    seed_llm_leaderboard()        # 刷新大模型榜单
                except Exception as error:
                    state["lastLlmError"] = str(error)
                try:
                    seed_skills(100)              # 刷新 100 个分类 Skill
                except Exception as error:
                    state["lastSkillSeedError"] = str(error)
                state["lastSeedFinishedAt"] = datetime.now(timezone.utc).isoformat()
                _save_state(state)

            # —— 3) 每周周报 ——
            weekly_day = int(os.getenv("WEEKLY_DAY", "1"))
            if now.weekday() + 1 == weekly_day and current_time == os.getenv("WEEKLY_TIME", "09:30") and state.get("lastWeekly") != today:
                state["lastWeekly"] = today
                state["lastWeeklyStartedAt"] = datetime.now(timezone.utc).isoformat()
                _save_state(state)
                try:
                    run_weekly()
                    state["lastWeeklyFinishedAt"] = datetime.now(timezone.utc).isoformat()
                except Exception as error:
                    state["lastWeeklyError"] = str(error)
                _save_state(state)

            # —— 4) 自动推送到 GitHub（触发 Vercel 重新部署）——
            # 与采集频率解耦：采集可以很频繁，但推送按 GIT_PUSH_INTERVAL_MINUTES 节流，
            # 避免 Vercel 被频繁重新构建打满免费额度。
            if os.getenv("AUTO_GIT_PUSH", "0").lower() in ("1", "true", "yes", "on"):
                push_interval = float(os.getenv("GIT_PUSH_INTERVAL_MINUTES", "60"))
                last_push = state.get("lastPushAt")
                push_due = True
                if last_push:
                    try:
                        elapsed = (datetime.now(timezone.utc) - datetime.fromisoformat(last_push)).total_seconds()
                        push_due = elapsed >= push_interval * 60
                    except Exception:
                        push_due = True
                if push_due and git_auto_push():
                    state["lastPushAt"] = datetime.now(timezone.utc).isoformat()
                    _save_state(state)
        except Exception:
            pass
        time.sleep(60)


def print_help() -> None:
    print("Usage:")
    print("  python backend/backend.py           # 启动 HTTP 服务 + 定时任务（默认）")
    print("  python backend/backend.py run-all   # 一次性跑：抓取+LLM+合并，跑完退出")
    print("  python backend/backend.py daily     # 只跑 run_daily（采集+评分+精选）")
    print("  python backend/backend.py weekly    # 只跑 run_weekly")
    print("  python backend/backend.py report [YYYY-MM-DD]  # 固化某天（默认昨天）的日报到归档")
    print("  python backend/backend.py seed-skills [N]    # 抓 N 个 skill 并中文化后灌入（默认 100）")
    print("  python backend/backend.py localize-skills     # 把现有 skillRecommendations 就地中文化")
    print("  python backend/backend.py bootstrap # 启服务前先跑一次 run_all")
    print("  python backend/backend.py backfill [--days N | --from YYYY-MM-DD --to YYYY-MM-DD]")
    print("                                       # 回填一段历史时间，按周切片+并发抓取+LLM")


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

    if cmd == "report":
        date_arg = args[1] if len(args) > 1 else None
        freeze_daily_report(date_arg)
        return

    if cmd == "seed-skills":
        n = int(args[1]) if len(args) > 1 and args[1].isdigit() else 100
        seed_skills(n)
        return

    if cmd in ("localize-skills", "localize"):
        localize_existing_skills()
        return

    if cmd == "seed-llm":
        seed_llm_leaderboard()
        return

    if cmd == "backfill":
        # 解析参数：--days N 或 --from YYYY-MM-DD --to YYYY-MM-DD
        days = 30
        start = end = None
        i = 1
        while i < len(args):
            a = args[i]
            if a in ("--days", "-d") and i + 1 < len(args):
                days = int(args[i + 1]); i += 2
            elif a in ("--from", "-f") and i + 1 < len(args):
                start = args[i + 1]; i += 2
            elif a in ("--to", "-t") and i + 1 < len(args):
                end = args[i + 1]; i += 2
            else:
                i += 1
        result = run_backfill(days=days if not (start and end) else None, start=start, end=end)
        print(json.dumps({
            "ok": True,
            "counts": {
                "news": len(result.get("news") or []),
                "githubWeekly": len(result.get("githubWeekly") or []),
            }
        }, ensure_ascii=False, indent=2))
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

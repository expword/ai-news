"""彻底排查 + 修复所有截断标题/链接/文案。"""
import os

# (查找, 替换) — 用更长的上下文锚定，避免误改
PAIRS = [
    # === HTML headings ===
    ("<h2>测评数据</h2>", "<h2>测评数据集</h2>"),
    ("<h2>榜单怎么</h2>", "<h2>榜单怎么用</h2>"),
    ("<h2>Top20 排行榜快</h2>", "<h2>Top20 排行榜快照</h2>"),
    ("<h2>它主要测什</h2>", "<h2>评测内容</h2>"),
    ("<h2>看哪些指</h2>", "<h2>核心指标</h2>"),
    ("<h2>适合用来判断什</h2>", "<h2>适用场景</h2>"),
    ("<h2>来源与论</h2>", "<h2>来源</h2>"),
    ("<h2>核心特</h2>", "<h2>核心特性</h2>"),
    ("<h2>快速开</h2>", "<h2>快速开始</h2>"),
    ("<h2>为什么值得</h2>", "<h2>为什么值得看</h2>"),
    ("<h2>仓库与趋势来</h2>", "<h2>仓库链接</h2>"),
    ("<h2>关键</h2>", "<h2>关键词</h2>"),
    ("<h2>适合</ 使用场景</h2>", "<h2>适用场景</h2>"),
    ("<h2>我们收集的信</h2>", "<h2>我们收集的信息</h2>"),
    ("<h2>Cookie 与广</h2>", "<h2>Cookie 与广告</h2>"),
    ("<h2>第三方链</h2>", "<h2>第三方链接</h2>"),
    # === Sidebar nav links ===
    ('<a href="#features">核心特</a>', '<a href="#features">核心特性</a>'),
    ('<a href="#quickstart">快速开</a>', '<a href="#quickstart">快速开始</a>'),
    ('<a href="#tags">关键</a>', '<a href="#tags">关键词</a>'),
    ('<a href="#datasets">测评数据</a>', '<a href="#datasets">测评数据集</a>'),
    ('<a class="back-link" href="/pages/benchmark.html#datasets">返回测评数据</a>',
     '<a class="back-link" href="/pages/benchmark.html#datasets">返回测评数据集</a>'),
    # === index.html ===
    ("<h1>AI 入口，一页够用。。</h1>", "<h1>AI 入口，一页够用。</h1>"),
    # === 小文案截断 ===
    ("<small>测评数据</small>", "<small>测评数据集</small>"),
    ("<span>广告</span>", "<span>广告位</span>"),
    ("<small>分类详</small>", "<small>分类详情</small>"),
    ("<small>快讯详</small>", "<small>快讯详情</small>"),
    ("<small>历史快</small>", "<small>历史快讯</small>"),
    ("<small>榜单测</small>", "<small>榜单测评</small>"),
    ("<small>榜单详</small>", "<small>榜单详情</small>"),
    ("<small>Skill 详</small>", "<small>Skill 详情</small>"),
    ("<small>GitHub 详</small>", "<small>GitHub 详情</small>"),
    ("<small>资讯 · 工具 · 教</small>", "<small>资讯 · 工具 · 教程</small>"),
    ("<small>每周 Skill 推</small>", "<small>每周 Skill 推荐</small>"),
    ("<small>Skill · GitHub · 增</small>", "<small>Skill · GitHub · 增长</small>"),
    ("<small>Skill 周详</small>", "<small>Skill 周详情</small>"),
    ("<small>GitHub 周详</small>", "<small>GitHub 周详情</small>"),
    ("<small>GitHub 周</small>", "<small>GitHub 周榜</small>"),
    ("<small>测评数据</small>", "<small>测评数据集</small>"),
    ("<small>Skill 分</small>", "<small>Skill 分类</small>"),
    ("<small>GitHub 分</small>", "<small>GitHub 分类</small>"),
    ("<small>工具 · Skill · GitHub · 榜</small>", "<small>工具 · Skill · GitHub · 榜单</small>"),
    # 详情页广告位文案
    ("<small>适合信息流广</small>", "<small>适合信息流广告</small>"),
    ("<small>适合信息流广告或工具推</small>", "<small>适合信息流广告或工具推荐</small>"),
    ("<small>适合信息流广告或相关工具推</small>", "<small>适合信息流广告或相关工具推荐</small>"),
    ("<small>可放 AdSense 侧栏广</small>", "<small>可放 AdSense 侧栏广告</small>"),
    ("<small>可放 AdSense 侧栏广告</small>", "<small>可放 AdSense 侧栏广告</small>"),
    ("<small>AdSense 通过后接入真实代</small>", "<small>AdSense 通过后接入真实代码</small>"),
    ("<small>审核前保留占位；通过 AdSense 后再替换代</small>", "<small>审核前保留占位；通过 AdSense 后再替换代码</small>"),
    # placeholder 标题
    ('<h1 id="datasetTitle">测评数据</h1>', '<h1 id="datasetTitle">测评数据集</h1>'),
]


def main():
    targets = ["index.html"]
    if os.path.isdir("pages"):
        for f in os.listdir("pages"):
            if f.endswith(".html"):
                targets.append(f"pages/{f}")

    total = 0
    for p in targets:
        if not os.path.exists(p):
            continue
        src = open(p, "r", encoding="utf-8").read()
        orig = src
        n = 0
        for old, new in PAIRS:
            if old in src:
                c = src.count(old)
                src = src.replace(old, new)
                n += c
        if src != orig:
            open(p, "w", encoding="utf-8").write(src)
            print(f"  fixed {n} in {p}")
            total += n
    print(f"\n total: {total} replacements")


if __name__ == "__main__":
    main()

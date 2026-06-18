(function () {
  const data = window.AI_NEWS_DATA;
  const state = {
    category: "all",
    query: "",
    sort: "newest", // 今日精选默认按发布时间线排列
    mode: "selected", // selected = 只看精选；all = 全部资讯
    skillCat: "all",  // 热门 Skill 的分类筛选
    llmType: "all"    // 大模型榜单：全部/商用/开源
  };

  const lastUpdated = document.querySelector("#lastUpdated");
  const categoryList = document.querySelector("#categoryList");
  const newsGrid = document.querySelector("#newsGrid");
  const sourceGrid = document.querySelector("#sourceGrid");
  const watchList = document.querySelector("#watchList");
  const searchInput = document.querySelector("#searchInput");
  const sortSelect = document.querySelector("#sortSelect");
  const tickerTrack = document.querySelector("#tickerTrack");
  const topicGrid = document.querySelector("#topicGrid");
  const skillGrid = document.querySelector("#skillGrid");
  const githubGrid = document.querySelector("#githubGrid");
  const rankTableBody = document.querySelector("#rankTableBody");
  const dimensionList = document.querySelector("#dimensionList");
  const selectionGrid = document.querySelector("#selectionGrid");
  const benchmarkBoardGrid = document.querySelector("#benchmarkBoardGrid");
  const benchmarkDatasetGrid = document.querySelector("#benchmarkDatasetGrid");
  const detailModal = document.querySelector("#detailModal");
  const detailContent = document.querySelector("#detailContent");

  const detailCollections = {
    topic: () => data.topics,
    skill: () => data.skillRecommendations,
    github: () => data.githubWeekly,
    benchmark: () => data.benchmarkBoards,
    dataset: () => data.benchmarkDatasets,
    news: () => data.news
  };

  const expandedLists = new Set();

  const topicPlans = {
    "ai-tools": {
      modules: ["工具总览", "免费工具", "国内可用", "价格对比", "替代品推荐"],
      examples: ["ChatGPT vs Claude vs Gemini", "免费 AI 写作工具清单", "适合学生的 AI 工具"],
      next: "优先做“AI工具大全”和“免费AI工具推荐”两篇入口文章，再拆写作、搜索、图片、视频、办公等子页。"
    },
    "ai-coding": {
      modules: ["代码补全", "代码审查", "Bug 修复", "测试生成", "终端 Agent"],
      examples: ["Cursor 使用教程", "Claude Code 工作流", "Codex 适合做什么", "AI 写单元测试"],
      next: "每个工具都写“适合谁、能做什么、不能做什么、价格和替代品”。"
    },
    "ai-image-video": {
      modules: ["文生图", "图生图", "文生视频", "商品图", "短视频素材"],
      examples: ["AI绘画提示词模板", "Runway/Kling/Sora 对比", "电商商品图生成教程"],
      next: "用案例图、提示词和商用版权说明做内容，转化率会比纯新闻高。"
    },
    "ai-agents": {
      modules: ["MCP", "浏览器 Agent", "桌面 Agent", "工作流自动化", "企业 Agent"],
      examples: ["什么是 AI Agent", "MCP 工具调用入门", "UI-TARS 桌面 Agent 观察"],
      next: "Agent 拆成普通用户自动化、开发者工具调用、企业流程三类"
    },
    "ai-models": {
      modules: ["模型发布", "API 价格", "上下文长度", "多模态", "本地部署"],
      examples: ["GPT/Gemini/Claude 怎么选", "开源模型和闭源模型区别", "模型价格对比表"],
      next: "发布页不要只搬新闻，要补“对用户有什么影响”和“适合哪些任务”。"
    },
    "ai-benchmark": {
      modules: ["中文榜单", "代码榜单", "Agent榜单", "多模态榜单", "安全榜单"],
      examples: ["中文大模型排行榜怎么看", "SWE-bench 是否适合选编程模型", "LMArena 不是万能榜"],
      next: "把每个榜单做成单独卡片页，底部保留官方来源和使用提醒。"
    },
    "ai-office": {
      modules: ["AI写作", "PPT", "会议纪要", "表格分析", "学习助手"],
      examples: ["AI 做 PPT 工具推荐", "会议录音转纪要流程", "学生如何用 AI 学习"],
      next: "面向非技术用户，正文要更像教程：场景、步骤、模板、注意事项。"
    },
    "ai-research": {
      modules: ["论文检索", "论文总结", "代码复现", "数据集", "实验记录"],
      examples: ["arXiv AI 论文追踪", "Papers with Code 怎么用", "研究写作 Skill 工作流"],
      next: "适合做长尾内容：论文阅读工具、综述写作、实验复现清单。"
    },
    "ai-business": {
      modules: ["AI SaaS", "内容站", "自动化获客", "企业服务", "出海工具"],
      examples: ["AI 副业项目清单", "AI 内容站怎么做", "企业 AI 服务案例"],
      next: "注意不要写夸张收益承诺，重点写成本、流程、案例和风险。"
    },
    "ai-audio": {
      modules: ["ASR 转写", "TTS 配音", "说话人识别", "音频 Embedding", "会议语音"],
      examples: ["Open ASR Leaderboard 怎么看", "TTS 模型如何比较自然度", "会议转写工具推荐"],
      next: "语音类内容要写清楚指标：WER、延迟、语言、说话人、噪声环境。"
    },
    "ai-retrieval": {
      modules: ["Embedding", "Reranker", "RAG", "多语言检索", "企业知识库"],
      examples: ["MTEB 怎么选 Embedding", "RAG 检索模型对比", "知识库问答评测方法"],
      next: "榜单只能做初筛，最好补“用自己文档做小测试”的教程。"
    },
    "ai-vision-doc": {
      modules: ["OCR", "DocVQA", "表格抽取", "票据识别", "长文档解析"],
      examples: ["OCRBench 怎么看", "DocVQA 适合评测什么", "文档 AI 工具推荐"],
      next: "文档类内容要强调真实扫描件、表格、手写、公式和版面复杂度。"
    }
  };

  const skillPlans = {
    "AI 编程 Skill": {
      steps: ["建立项目上下文", "让 AI 先读文件再改代码", "要求输出测试计划", "用小 diff 迭代", "最后做 Review"],
      outputs: ["CLAUDE.md / AGENTS.md", "测试用例", "PR 描述", "代码审查清单"]
    },
    "研究写作 Skill": {
      steps: ["收集论文", "抽取方法和实验", "整理相关工作", "生成大纲", "逐段修改"],
      outputs: ["论文卡片", "综述表格", "实验记录", "审稿回复草稿"]
    },
    "Agent 自动化 Skill": {
      steps: ["定义任务边界", "列出可用工具", "设置权限", "拆分步骤", "记录失败案例"],
      outputs: ["MCP 配置", "工具调用日志", "自动化流程图", "安全检查表"]
    },
    "AI 绘画视频 Skill": {
      steps: ["确定画面目标", "写镜头和风格", "生成初稿", "局部重绘", "导出素材"],
      outputs: ["提示词模板", "镜头脚本", "风格库", "商用版权检查表"]
    },
    "模型评测 Skill": {
      steps: ["确定任务", "选择公开榜单", "设计真实样例", "记录成本和延迟", "给出推荐结论"],
      outputs: ["模型对比表", "评测脚本", "使用建议", "风险说明"]
    },
    "AI 内容站 Skill": {
      steps: ["确定长尾词", "做分类页", "补原创导读", "加来源和更新时间", "提交 sitemap"],
      outputs: ["关键词表", "文章计划", "广告位规划", "Search Console 记录"]
    }
  };

  const benchmarkTypeGuides = [
    { key: "ASR", metrics: ["WER", "多语言覆盖", "长音频稳定性", "噪声/远场表现"] },
    { key: "TTS", metrics: ["自然度", "韵律", "说话人相似度", "指令跟随"] },
    { key: "Embedding", metrics: ["Retrieval", "Reranking", "多语言", "领域适配"] },
    { key: "视频", metrics: ["文本对齐", "运动一致性", "主体保持", "视觉质量"] },
    { key: "OCR", metrics: ["文字识别", "版面解析", "表格/公式", "文档问答"] },
    { key: "代码", metrics: ["真实 issue 修复", "代码生成", "测试通过率", "成本/耗时"] },
    { key: "工具调用", metrics: ["函数选择", "参数填写", "拒绝无关工具", "多步调用"] },
    { key: "中文", metrics: ["中文知识", "指令遵循", "推理", "幻觉控制"] }
  ];

  function formatDate(dateValue) {
    const d = new Date(dateValue);
    if (isNaN(d.getTime())) return dateValue || "";
    return new Intl.DateTimeFormat("zh-CN", {
      month: "2-digit",
      day: "2-digit"
    }).format(d);
  }

  // 显示发布时间：有 publishedAt（精确到分钟）则显示 "MM-DD HH:MM"，否则只显示日期
  function formatWhen(item) {
    const pa = item.publishedAt;
    if (pa) {
      const d = new Date(pa);
      if (!isNaN(d.getTime())) {
        const mm = String(d.getMonth() + 1).padStart(2, "0");
        const dd = String(d.getDate()).padStart(2, "0");
        const hh = String(d.getHours()).padStart(2, "0");
        const mi = String(d.getMinutes()).padStart(2, "0");
        return `${mm}-${dd} ${hh}:${mi}`;
      }
    }
    return formatDate(item.date);
  }

  // 时间线排序用的时间戳：优先 publishedAt（精确到分钟），退回 date（按天）
  function tsOf(item) {
    const t = new Date(item.publishedAt || item.date || 0).getTime();
    return isNaN(t) ? 0 : t;
  }

  // 本地日期 YYYY-MM-DD（用于时间线按天分组，避免 UTC 偏移）
  function localDay(value) {
    const d = new Date(value);
    if (isNaN(d.getTime())) return String(value || "").slice(0, 10);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }

  // 时间线左栏：放大的 HH:MM（有 publishedAt 时），否则显示日期
  function timelineParts(item) {
    const dayKey = (item.date || "").slice(0, 10) || localDay(item.publishedAt);
    let hm = "";
    if (item.publishedAt) {
      const d = new Date(item.publishedAt);
      if (!isNaN(d.getTime())) {
        hm = `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
      }
    }
    return { dayKey, hm, rail: hm || formatDate(item.date) };
  }

  // 时间线按天分组的标签：今天 / 昨天 / MM-DD
  function dayDividerLabel(dayKey) {
    const today = localDay(new Date());
    const yesterday = localDay(new Date(Date.now() - 86400000));
    if (dayKey === today) return "今天";
    if (dayKey === yesterday) return "昨天";
    return formatDate(dayKey);
  }

  function getCategoryName(id) {
    return data.categories.find((item) => item.id === id)?.name || "未分类";
  }

  // 归一化：转小写 + 去掉空格/连字符/下划线/斜杠/点/顿号等分隔符，
  // 让 "GLM-5.2"、"glm 5.2"、"glm5.2"、"glm52" 互相都能匹配。
  function normalizeText(s) {
    return String(s == null ? "" : s).toLowerCase().replace(/[\s\-_/.:：·、，,]+/g, "");
  }
  // 容错匹配：query 按空白拆成多个词，每个词归一化后都要命中（AND）。
  function looseIncludes(rawQuery, values) {
    const q = String(rawQuery || "").trim();
    if (!q) return true;
    const blob = normalizeText(values.filter(Boolean).join(" "));
    return q.split(/\s+/).every((tok) => {
      const t = normalizeText(tok);
      return !t || blob.includes(t);
    });
  }

  function matchesQuery(item) {
    return looseIncludes(state.query, [
      item.title, item.summary, item.source,
      ...(item.tags || []), ...(item.keyPoints || []), item.background,
    ]);
  }

  function includesQuery(values) {
    return looseIncludes(state.query, values);
  }

  function getOriginalIndex(collection, item) {
    return collection.indexOf(item);
  }

  function renderTagList(items) {
    if (!items || !items.length) return "";

    return `
      <div class="tag-row detail-tags">
        ${items.map((item) => `<span class="tag">${item}</span>`).join("")}
      </div>
    `;
  }

  function renderRankingSnapshot(item) {
    if (!item.rankings || !item.rankings.length) return "";
    const rows = item.rankings.slice(0, 20);

    return `
      <section class="ranking-snapshot">
        <div class="ranking-head">
          <h3>Top ${rows.length} 排名快照</h3>
          <span>${item.rankingUpdated || "来源快照"}</span>
        </div>
        <p>${item.rankingMetric || "榜单指标"}</p>
        <table class="mini-rank-table">
          <thead>
            <tr>
              <th>#</th>
              <th>名称</th>
              <th>分数</th>
              <th>备注</th>
            </tr>
          </thead>
          <tbody>
            ${rows
              .map(
                (rank) => `
                  <tr>
                    <td>${rank.rank}</td>
                    <td>${rank.name}</td>
                    <td>${rank.score}</td>
                    <td>${rank.note || ""}</td>
                  </tr>
                `
              )
              .join("")}
          </tbody>
        </table>
      </section>
    `;
  }

  function hasCompleteTop20(item) {
    return Array.isArray(item.rankings) && item.rankings.length >= 20;
  }

  function renderRankingFallback(item) {
    const guide = getBenchmarkGuide(item);

    return `
      <section class="ranking-snapshot">
        <div class="ranking-head">
          <h3>原始榜单入口</h3>
          <span>${item.rankingUpdated || "实时页面"}</span>
        </div>
        <p>该来源没有在公开文本中提供可稳定缓存Top20 表格，本站保留官方入口和评测维度</p>
        <div class="tag-row">
          ${guide.metrics.map((metric) => `<span class="tag">${metric}</span>`).join("")}
        </div>
      </section>
    `;
  }

  function renderDetailSection(title, items) {
    if (!items || !items.length) return "";

    return `
      <section class="detail-section">
        <h3>${title}</h3>
        <ul>
          ${items.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </section>
    `;
  }

  function renderDetailNote(title, text) {
    if (!text) return "";

    return `
      <section class="detail-section detail-note">
        <h3>${title}</h3>
        <p>${text}</p>
      </section>
    `;
  }

  function getBenchmarkGuide(item) {
    return (
      benchmarkTypeGuides.find((guide) => item.type.includes(guide.key) || item.title.includes(guide.key)) || {
        metrics: ["任务匹配", "数据集来", "更新时间", "复现方式"]
      }
    );
  }

  function renderSourceBlock(item) {
    const sourceUrl = item.url || item.source;
    const sourceName = item.source || item.name || item.title || "来源";

    if (!sourceUrl || !String(sourceUrl).startsWith("http")) {
      return `
        <div class="detail-source">
          <strong>来源</strong>
          <span>${sourceName}</span>
        </div>
      `;
    }

    return `
      <div class="detail-source">
        <strong>来源</strong>
        <a href="${sourceUrl}" target="_blank" rel="noopener">${sourceName}</a>
      </div>
    `;
  }

  function newsDetailHref(item) {
    const slug = String(`${item.date || ""}-${item.title || ""}`)
      .toLowerCase()
      .replace(/[\s\/]+/g, "-")
      .replace(/[^a-z0-9\u4e00-\u9fa5\-]/g, "")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    return `/pages/news-detail.html?id=${encodeURIComponent(slug)}`;
  }

  function buildDetail(kind, item) {
    if (kind === "topic") {
      const plan = topicPlans[item.id];

      return `
        <p class="eyebrow">Category</p>
        <h2 id="detailTitle">${item.title}</h2>
        <p class="detail-lead">${item.description}</p>
        <dl class="detail-list">
          <div><dt>适合搜索</dt><dd>${item.keyword}</dd></div>
          <div><dt>用户意图</dt><dd>${item.userIntent}</dd></div>
          <div><dt>内容建议</dt><dd>可以扩展成工具清单、价格对比、使用教程、FAQ 和每月更新榜单</dd></div>
        </dl>
        ${renderDetailSection("这个模块应该放什", plan?.modules)}
        ${renderDetailSection("可以先写的内", plan?.examples)}
        ${renderDetailNote("下一步规", plan?.next)}
        ${renderTagList(item.examples)}
        ${renderSourceBlock({ source: "本站分类整理" })}
      `;
    }

    if (kind === "skill") {
      const plan = skillPlans[item.title];

      return `
        <p class="eyebrow">AI Skill</p>
        <h2 id="detailTitle">${item.title}</h2>
        <p class="detail-lead">${item.description}</p>
        <dl class="detail-list">
          <div><dt>难度</dt><dd>${item.level}</dd></div>
          <div><dt>怎么</dt><dd>把这Skill 做成独立文章：先写适用场景，再给步骤、工具组合、提示词模板和常见错误</dd></div>
        </dl>
        ${renderDetailSection("推荐学习路径", plan?.steps)}
        ${renderDetailSection("最终可以沉淀", plan?.outputs)}
        ${renderTagList(item.keywords)}
        ${renderSourceBlock({ source: "本站原创整理" })}
      `;
    }

    if (kind === "github") {
      const projectIdeas = [
        `先记录项目解决的问题{item.description}`,
        `补一段适用人群：开发者、研究者、Agent 用户或内容站读者。`,
        `实际体验建议：安装、跑通示例、截图、和同类项目比较。`
      ];

      return `
        <p class="eyebrow">GitHub Weekly</p>
        <h2 id="detailTitle">${item.name}</h2>
        <p class="detail-lead">${item.description}</p>
        <dl class="detail-list">
          <div><dt>语言/类型</dt><dd>${item.lang}</dd></div>
          <div><dt>推荐理由</dt><dd>${item.why}</dd></div>
          <div><dt>可做内容</dt><dd>项目介绍、安装体验、适用场景、同类项目对比、中文教程</dd></div>
        </dl>
        ${renderDetailSection("站内内容怎么", projectIdeas)}
        ${renderSourceBlock(item)}
      `;
    }

    if (kind === "benchmark") {
      const guide = getBenchmarkGuide(item);
      const readingSteps = [
        "先确认榜单任务是否和你的使用场景一致",
        "看指标，不只看排名。不同榜单可能测的是完全不同能力",
        "记录更新时间和数据来源，避免用过期排名做结论",
        "最后用自己的真实样例复测一遍"
      ];

      return `
        <p class="eyebrow">Benchmark Board</p>
        <h2 id="detailTitle">${item.title}</h2>
        <p class="detail-lead">${item.description}</p>
        <dl class="detail-list">
          <div><dt>榜单类型</dt><dd>${item.type}</dd></div>
          <div><dt>主要看什</dt><dd>${item.datasets.join("")}</dd></div>
          <div><dt>怎么解读</dt><dd>不要只看总排名。先确认任务是否匹配你的场景，再看数据集、指标、更新频率和是否容易被训练污染</dd></div>
        </dl>
        ${renderRankingSnapshot(item) || renderRankingFallback(item)}
        ${renderDetailSection("重点指标", guide.metrics)}
        ${renderDetailSection("阅读顺序", readingSteps)}
        ${renderTagList(item.datasets)}
        ${renderSourceBlock(item)}
      `;
    }

    if (kind === "dataset") {
      const detailKey = Object.keys(data.datasetDetails || {}).find((key) => data.datasetDetails[key].title === item.name);
      const detail = detailKey ? data.datasetDetails[detailKey] : null;

      return `
        <p class="eyebrow">Benchmark Dataset</p>
        <h2 id="detailTitle">${item.name}</h2>
        <p class="detail-lead">${detail?.summary || item.note}</p>
        <dl class="detail-list">
          <div><dt>评测方向</dt><dd>${item.area}</dd></div>
          <div><dt>内容</dt><dd>${detailKey ? `<a href="/pages/dataset.html?id=${detailKey}">打开 ${item.name} 完整内容</a>` : "暂无独立"}</dd></div>
          <div><dt>来源</dt><dd><a href="${item.source}" target="_blank" rel="noopener">${item.source}</a></dd></div>
        </dl>
        ${detail ? renderDetailSection("它主要测什", detail.evaluates) : ""}
        ${detail ? renderDetailSection("核心指标", detail.metrics) : ""}
        ${detail ? renderDetailSection("使用时要注意", detail.limitations) : ""}
        ${renderSourceBlock(item)}
      `;
    }

    const newsPlan = [
      "先用一段话解释事件本身",
      "再补充它影响哪些用户：开发者、普通用户、企业或内容创作者",
      "最后给出可延伸内容：教程、工具对比、榜单更新或风险提醒"
    ];

    return `
      <p class="eyebrow">Latest</p>
      <h2 id="detailTitle">${item.title}</h2>
      <p class="detail-lead">${item.summary}</p>
      <dl class="detail-list">
        <div><dt>分类</dt><dd>${getCategoryName(item.category)}</dd></div>
        <div><dt>日期</dt><dd>${item.date}</dd></div>
      </dl>
      ${renderDetailSection("站内解读应该补什", newsPlan)}
      ${renderTagList(item.tags)}
      ${renderSourceBlock(item)}
    `;
  }

  function openDetail(kind, index) {
    const collection = detailCollections[kind]?.();
    const item = collection?.[Number(index)];
    if (!item) return;

    detailContent.innerHTML = buildDetail(kind, item);
    detailModal.classList.add("is-open");
    detailModal.setAttribute("aria-hidden", "false");
  }

  function closeDetail() {
    detailModal.classList.remove("is-open");
    detailModal.setAttribute("aria-hidden", "true");
  }

  // 标题归一化：用于前端兜底去重（后端已聚类，这里再防 base/generated 跨源近重复）
  function titleKey(item) {
    return String(item.title || "")
      .toLowerCase()
      .replace(/[\s\-_:：，。、！？!?.,（）()【】\[\]"'`]/g, "")
      .slice(0, 40);
  }

  function dedupeByTitle(items) {
    const seen = new Set();
    return items.filter((item) => {
      const k = titleKey(item) || (item.url || "");
      if (!k || seen.has(k)) return false;
      seen.add(k);
      return true;
    });
  }

  // 取"当天"内容：有今天的就只看今天；今天还没有（如本地旧数据）则回退到最近一天
  function recentWindow(items) {
    const dateOf = (it) => String(it.date || "").slice(0, 10);
    const dates = items.map(dateOf).filter(Boolean).sort();
    if (!dates.length) return items;
    const latest = dates[dates.length - 1];
    const todayStr = new Date().toISOString().slice(0, 10);
    const target = latest >= todayStr ? todayStr : latest; // 有今天用今天，否则用最近一天
    const sameDay = items.filter((it) => dateOf(it) === target);
    return sameDay.length ? sameDay : items;
  }

  function getFilteredNews() {
    let items = data.news.filter((item) => {
      const inCategory = state.category === "all" || item.category === state.category;
      const inMode = state.mode === "all" || item.aiSelected;
      return inCategory && inMode && matchesQuery(item);
    });

    // 首页聚焦当天（全部模式 / 搜索时不收窄，方便回看）
    if (state.mode === "selected" && !state.query.trim()) {
      items = recentWindow(items);
    }

    items = dedupeByTitle(items);

    return items.sort((a, b) => {
      if (state.sort === "source") {
        return (a.source || "").localeCompare(b.source || "", "zh-CN");
      }
      if (state.sort === "newest") {
        return tsOf(b) - tsOf(a);
      }
      // 默认：精选优先 → 分数高优先 → 日期新优先
      const selDiff = (b.aiSelected ? 1 : 0) - (a.aiSelected ? 1 : 0);
      if (selDiff) return selDiff;
      const scoreDiff = (b.score || 0) - (a.score || 0);
      if (scoreDiff) return scoreDiff;
      return new Date(b.date || 0) - new Date(a.date || 0);
    });
  }

  function renderTopics() {
    if (!topicGrid) return;
    const channels = data.homeChannels || data.topics;
    const items = channels
      .filter((topic) =>
        includesQuery([
          topic.title,
          topic.badge,
          topic.promise,
          topic.description,
          topic.audience,
          ...(topic.highlights || topic.examples || [])
        ])
      )
      .slice(0, 6)
      .map(
        (topic) => `
          <a class="card-link" href="${topic.href || `/pages/category.html?id=${topic.id}`}" id="topic-${topic.id}">
            <article class="topic-card channel-card">
              <div class="topic-card-head">
                <h3>${topic.title}</h3>
                <span>${topic.badge || topic.keyword}</span>
              </div>
              ${topic.promise ? `<strong class="channel-promise">${topic.promise}</strong>` : ""}
              <p>${topic.description}</p>
              ${topic.audience ? `<small class="channel-audience">适合：${topic.audience}</small>` : ""}
              <div class="tag-row">
                ${(topic.highlights || topic.examples || []).slice(0, 4).map((item) => `<span class="tag">${item}</span>`).join("")}
              </div>
            </article>
          </a>
        `
      )
      .join("");

    topicGrid.innerHTML = items || '<div class="empty-state">没有匹配的分类</div>';
  }

  function renderCategories() {
    if (!categoryList) return;

    categoryList.innerHTML = data.categories
      .map((category) => {
        const count =
          category.id === "all"
            ? data.news.length
            : data.news.filter((item) => item.category === category.id).length;
        const activeClass = category.id === state.category ? " is-active" : "";

        return `
          <button class="category-button${activeClass}" data-category="${category.id}" type="button">
            <span>${category.name}</span>
            <small>${count}</small>
          </button>
        `;
      })
      .join("");
  }

  function skillCard(s) {
    const href = s.url || "/pages/skills.html";
    const tags = (s.tags || s.keywords || []).slice(0, 3);
    return `
      <a class="card-link" href="${href}" target="_blank" rel="noopener">
        <article class="skill-card">
          <div>
            <strong>${s.title}</strong>
            <span>${s.type || s.level || "Skill"}</span>
          </div>
          <p>${s.description || ""}</p>
          <div class="tag-row">
            ${tags.map((t) => `<span class="tag">${t}</span>`).join("")}
          </div>
        </article>
      </a>`;
  }

  function renderSkills() {
    if (!skillGrid) return;
    // 优先用 skillRecommendations（已分类的 100 个）；为空再退回本周 digest
    let source = data.skillRecommendations || [];
    if (!source.length) {
      const wk = (data.weeklyDigests || []).find((w) => w.skills && w.skills.length);
      source = wk ? wk.skills : [];
    }
    source = source.filter((s) => includesQuery([s.title, s.type, s.description, ...(s.tags || [])]));
    if (!source.length) {
      skillGrid.innerHTML = '<div class="empty-state">暂无 Skill</div>';
      return;
    }

    // 按分类分组
    const groups = {};
    source.forEach((s) => {
      const cat = s.type || "其他";
      (groups[cat] = groups[cat] || []).push(s);
    });
    const cats = Object.keys(groups).sort((a, b) => groups[b].length - groups[a].length);

    // 分类筛选 chips
    const chips = [`<button class="skill-cat${state.skillCat === "all" ? " is-active" : ""}" data-skillcat="all">全部 <small>${source.length}</small></button>`]
      .concat(cats.map((c) => `<button class="skill-cat${state.skillCat === c ? " is-active" : ""}" data-skillcat="${c}">${c} <small>${groups[c].length}</small></button>`))
      .join("");

    const showCats = state.skillCat === "all" ? cats : cats.filter((c) => c === state.skillCat);
    const body = showCats
      .map((c) => `
        <div class="skill-group">
          <h3 class="skill-group-head">${c} <small>${groups[c].length}</small></h3>
          <div class="skill-grid">${groups[c].map(skillCard).join("")}</div>
        </div>`)
      .join("");

    skillGrid.innerHTML = `<div class="skill-cats">${chips}</div>${body}`;
  }

  function renderGithubWeekly() {
    if (!githubGrid) return;
    const latest = (data.weeklyDigests || [])[0];
    if (!latest) {
      githubGrid.innerHTML = '<div class="empty-state">暂无本周 GitHub</div>';
      return;
    }
    const projects = (latest.github || [])
      .filter((g) => includesQuery([g.name, g.lang, g.description, g.why, g.source]))
      .slice(0, 3);
    const items = projects
      .map(
        (g) => `
          <a class="card-link" href="/pages/github-item.html?week=${latest.weekId}&i=${(latest.github || []).indexOf(g)}">
            <article class="github-card">
              <div class="github-card-head">
                <strong>${g.name}</strong>
                <span>${g.lang}</span>
              </div>
              <p>${g.description}</p>
              <small>${g.why}</small>
              <span class="source-name">${g.source}</span>
            </article>
          </a>
        `
      )
      .join("");

    githubGrid.innerHTML = items || '<div class="empty-state">没有匹配GitHub 项目</div>';
  }

  function renderBenchmark() {
    if (!benchmarkBoardGrid && !benchmarkDatasetGrid && !rankTableBody) return;
    const slugOf = window.boardSlugByTitle || ((t) => t);
    if (benchmarkBoardGrid && benchmarkDatasetGrid) {
      benchmarkBoardGrid.innerHTML = data.benchmarkBoards
        .filter((item) =>
          hasCompleteTop20(item) && includesQuery([item.title, item.type, item.description, item.source, ...item.datasets])
        )
        .slice(0, expandedLists.has("benchmarkBoardGrid") ? 60 : 24)
        .map((item) => {
          const href = `/pages/board.html?id=${slugOf(item.title)}`;
          return `
            <a class="card-link" href="${href}">
              <article class="benchmark-card">
                <div class="benchmark-card-head">
                  <strong>${item.title}</strong>
                  <span>${item.type}</span>
                </div>
                <p>${item.description}</p>
                <div class="tag-row">
                  ${item.datasets.slice(0, 4).map((dataset) => `<span class="tag">${dataset}</span>`).join("")}
                </div>
                <span class="source-name">${item.source}</span>
              </article>
            </a>
          `;
        })
        .join("");

      benchmarkDatasetGrid.innerHTML = data.benchmarkDatasets
        .filter((item) => includesQuery([item.name, item.area, item.note, item.source]))
        .slice(0, expandedLists.has("benchmarkDatasetGrid") ? 60 : 24)
        .map((item) => {
          const detailKey = Object.keys(data.datasetDetails || {}).find(
            (key) => data.datasetDetails[key].title === item.name
          );
          const slug = detailKey || encodeURIComponent((item.name || "").toLowerCase().replace(/\s+/g, "-"));
          const href = `/pages/dataset.html?id=${slug}`;
          return `
            <a class="card-link" href="${href}">
              <article class="dataset-card">
                <strong>${item.name}</strong>
                <span>${item.area}</span>
                <p>${item.note}</p>
              </article>
            </a>
          `;
        })
        .join("");

      return;
    }

    rankTableBody.innerHTML = data.benchmarkRanks
      .slice(0, 5)
      .map(
        (item) => `
          <tr>
            <td>${item.rank}</td>
            <td>${item.model}</td>
            <td>${item.vendor}</td>
            <td>${item.score}</td>
          </tr>
        `
      )
      .join("");

    dimensionList.innerHTML = data.benchmarkDimensions
      .slice(0, 6)
      .map(
        (item) => `
          <article class="dimension-item">
            <strong>${item.name}</strong>
          </article>
        `
      )
      .join("");

    if (!selectionGrid) return;

    selectionGrid.innerHTML = data.selectionGuides
      .map(
        (item) => `
          <article class="selection-item">
            <strong>${item.title}</strong>
            <span>${item.text}</span>
          </article>
        `
      )
      .join("");
  }

  function renderNews() {
    if (!newsGrid) return;
    const items = getFilteredNews();

    // 时间线布局只在「按时间线」排序时启用；其它排序退回普通卡片流
    const timeline = state.sort === "newest";
    newsGrid.classList.toggle("timeline", timeline);

    if (!items.length) {
      newsGrid.innerHTML = '<div class="empty-state">没有找到匹配内容，换个关键词试试。</div>';
      return;
    }

    const limit = expandedLists.has("newsGrid") ? 30 : 12;
    let lastDay = null;
    const cards = items.slice(0, limit).map((item, idx) => {
      const href = newsDetailHref(item);
      const score = Number(item.score) || 0;
      const scoreBadge = score
        ? `<span class="score-badge is-selected" title="综合质量分（0-100）：由模型多维打分 × 信源等级算出，越高越值得看">质量 ${score}</span>`
        : "";
      const srcCount = Number(item.sourceCount) || 1;
      const srcBadge = srcCount > 1 ? `<span class="src-count" title="被 ${srcCount} 个信源报道">${srcCount} 信源</span>` : "";
      const reason = (item.reason || item.impact || "").trim();
      const reasonLine = reason ? `<p class="news-reason"><strong>推荐理由：</strong>${reason.slice(0, 80)}</p>` : "";

      const cardInner = `
            <div class="card-meta">
              ${timeline ? "" : `<span class="news-rank">#${idx + 1}</span><time datetime="${item.publishedAt || item.date}">${formatWhen(item)}</time>`}
              <span>${getCategoryName(item.category)}</span>
              ${srcBadge}
              ${scoreBadge}
            </div>
            <h3>${item.title}</h3>
            <p>${item.summary}</p>
            ${reasonLine}
            <div class="tag-row">
              ${(item.tags || []).map((tag) => `<span class="tag">${tag}</span>`).join("")}
            </div>
            <span class="source-name">${item.source}</span>`;

      if (!timeline) {
        return `
        <a class="card-link" href="${href}">
          <article class="news-card${item.aiSelected ? " news-card--selected" : ""}">${cardInner}
          </article>
        </a>`;
      }

      const t = timelineParts(item);
      let divider = "";
      if (t.dayKey && t.dayKey !== lastDay) {
        lastDay = t.dayKey;
        divider = `<div class="timeline-day"><span>${dayDividerLabel(t.dayKey)}</span></div>`;
      }
      return `${divider}
        <a class="card-link timeline-item${item.aiSelected ? " is-selected" : ""}" href="${href}">
          <div class="timeline-rail"><span class="timeline-time">${t.rail}</span></div>
          <article class="news-card${item.aiSelected ? " news-card--selected" : ""}">${cardInner}
          </article>
        </a>`;
    });

    newsGrid.innerHTML = cards.join("");
  }

  // 每天最重要的 5 条：当天（或最近一天）精选里质量分最高的 5 条
  function renderTop5() {
    const list = document.querySelector("#top5List");
    if (!list) return;
    let items = (data.news || []).filter((n) => n.aiSelected !== false);
    items = recentWindow(items);
    items = dedupeByTitle(items)
      .slice()
      .sort((a, b) => (b.score || 0) - (a.score || 0))
      .slice(0, 5);
    if (!items.length) {
      list.innerHTML = '<li class="empty-state">暂无要闻</li>';
      return;
    }
    list.innerHTML = items
      .map((item) => {
        return `
          <li>
            <a href="${newsDetailHref(item)}">
              <span class="top5-title">${item.title}</span>
            </a>
          </li>`;
      })
      .join("");
  }

  function renderLlmLeaderboard() {
    const box = document.querySelector("#llmTable");
    if (!box) return;
    const lb = data.llmLeaderboard || {};
    const items = (lb.items || []).filter((m) => state.llmType === "all" || m.type === state.llmType);
    const srcLink = document.querySelector("#llmSource");
    if (srcLink && lb.sourceUrl) srcLink.href = lb.sourceUrl;
    const note = document.querySelector("#llmNote");
    if (note) note.textContent = `${lb.source || "大模型综合能力评测"}　·　更新于 ${lb.updated || ""}　·　共 ${(lb.items || []).length} 个模型`;
    if (!items.length) {
      box.innerHTML = '<div class="empty-state">暂无榜单数据</div>';
      return;
    }
    const rows = items
      .map(
        (m) => `
        <tr>
          <td class="llm-rank">${m.rank}</td>
          <td class="llm-model">${m.model}</td>
          <td>${m.org || ""}</td>
          <td><span class="llm-tag ${m.type === "开源" ? "is-oss" : "is-com"}">${m.type || ""}</span></td>
          <td class="llm-score">${m.score || ""}</td>
          <td>${m.latency || ""}</td>
          <td>${m.tokens || ""}</td>
          <td>${m.cost || ""}</td>
        </tr>`
      )
      .join("");
    box.innerHTML = `
      <div class="llm-table-wrap">
        <table class="llm-table">
          <thead>
            <tr><th>#</th><th>模型</th><th>机构</th><th>类型</th><th>总分</th><th>耗时</th><th>Token</th><th>成本/千次</th></tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>`;
  }

  function renderTicker() {
    if (!tickerTrack) return;
    const html = data.news
      .slice()
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 8)
      .map((item) => {
        return `<a class="ticker-item" href="${newsDetailHref(item)}">${item.title}</a>`;
      })
      .join("");
    tickerTrack.innerHTML = html || '<span class="ticker-item">暂无今日快讯。</span>';
  }

  function renderHistoricalNews() {
    const grid = document.querySelector("#historicalNewsGrid");
    if (!grid) return;
    const sorted = (data.news || [])
      .slice()
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    const historical = sorted.slice(8, 16);
    const items = historical.length ? historical : sorted;
    grid.innerHTML = items
      .map((item) => {
        const target = "";
        const href = newsDetailHref(item);
        return `
          <a class="historical-news-card" href="${href}" ${target}>
            <time datetime="${item.date}">${item.date}</time>
            <h3>${item.title}</h3>
            <p>${item.summary || ""}</p>
            <span class="source-name">${item.source || ""}</span>
          </a>
        `;
      })
      .join("") || '<div class="empty-state">暂无历史快讯。</div>';
  }

  function startTickerAutoScroll() {
    if (!tickerTrack) return;
    let paused = false;
    const speed = 0.6; // 每帧滑动像素
    tickerTrack.addEventListener("mouseenter", () => { paused = true; });
    tickerTrack.addEventListener("mouseleave", () => { paused = false; });
    tickerTrack.addEventListener("touchstart", () => { paused = true; }, { passive: true });
    tickerTrack.addEventListener("touchend", () => { paused = false; });

    function tick() {
      if (!paused && tickerTrack.scrollWidth > tickerTrack.clientWidth) {
        tickerTrack.scrollLeft += speed;
        const end = tickerTrack.scrollWidth - tickerTrack.clientWidth;
        if (tickerTrack.scrollLeft >= end) {
          tickerTrack.scrollLeft = 0;
        }
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function renderSources() {
    if (!sourceGrid) return;
    sourceGrid.innerHTML = data.sources
      .slice(0, expandedLists.has("sourceGrid") ? 32 : 6)
      .map(
        (source) => `
          <a class="source-card" href="${source.url}" target="_blank" rel="noopener">
            <strong>${source.name}</strong>
            <p>${source.description}</p>
          </a>
        `
      )
      .join("");
  }

  function renderWatchList() {
    if (!watchList) return;

    watchList.innerHTML = data.watchList
      .map(
        (item) => `
          <li>
            <time>${item.date}</time>
            <span>${item.text}</span>
          </li>
        `
      )
      .join("");
  }

  function bindEvents() {
    document.addEventListener("click", (event) => {
      // 侧边栏折叠开关
      const sideToggle = event.target.closest(".side-toggle");
      if (sideToggle) {
        const card = sideToggle.closest(".side-card");
        if (card) {
          const collapsed = card.classList.toggle("is-collapsed");
          sideToggle.setAttribute("aria-expanded", String(!collapsed));
        }
        return;
      }

      const detailButton = event.target.closest("[data-detail-kind]");
      if (detailButton) {
        openDetail(detailButton.dataset.detailKind, detailButton.dataset.detailIndex);
        return;
      }

      if (event.target.closest("[data-close-detail]")) {
        closeDetail();
      }

      const toggleButton = event.target.closest("[data-toggle-target]");
      if (toggleButton) {
        const target = toggleButton.dataset.toggleTarget;
        if (expandedLists.has(target)) {
          expandedLists.delete(target);
        } else {
          expandedLists.add(target);
        }
        if (target === "benchmarkBoardGrid" || target === "benchmarkDatasetGrid") renderBenchmark();
        if (target === "newsGrid") renderNews();
        if (target === "sourceGrid") renderSources();
        document.querySelectorAll("[data-toggle-target]").forEach((button) => {
          const buttonTarget = button.dataset.toggleTarget;
          button.textContent = expandedLists.has(buttonTarget)
            ? button.dataset.labelLess
            : button.dataset.labelMore;
        });
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeDetail();
    });

    if (categoryList) {
      categoryList.addEventListener("click", (event) => {
        const button = event.target.closest("[data-category]");
        if (!button) return;

        state.category = button.dataset.category;
        renderCategories();
        renderNews();
      });
    }

    if (searchInput) {
      searchInput.addEventListener("input", (event) => {
        state.query = event.target.value;
        renderTopics();
        renderSkills();
        renderGithubWeekly();
        renderBenchmark();
        renderNews();
      });
    }

    if (sortSelect) {
      sortSelect.addEventListener("change", (event) => {
        state.sort = event.target.value;
        renderNews();
      });
    }

    // 大模型榜单：商用/开源 筛选
    const llmFilter = document.querySelector("#llmFilter");
    if (llmFilter) {
      llmFilter.addEventListener("click", (event) => {
        const btn = event.target.closest("[data-llm]");
        if (!btn) return;
        state.llmType = btn.dataset.llm;
        llmFilter.querySelectorAll("[data-llm]").forEach((b) => b.classList.toggle("is-active", b.dataset.llm === state.llmType));
        renderLlmLeaderboard();
      });
    }

    // 热门 Skill 分类筛选
    if (skillGrid) {
      skillGrid.addEventListener("click", (event) => {
        const chip = event.target.closest("[data-skillcat]");
        if (!chip) return;
        event.preventDefault();
        state.skillCat = chip.dataset.skillcat;
        renderSkills();
      });
    }

    // 左侧菜单：点击切换主区面板
    const sideNav = document.querySelector("#sideNav");
    if (sideNav) {
      sideNav.addEventListener("click", (event) => {
        const button = event.target.closest("button[data-panel]");
        if (!button) return;
        const panel = button.dataset.panel;
        sideNav.querySelectorAll("button[data-panel]").forEach((b) => {
          b.classList.toggle("is-active", b.dataset.panel === panel);
        });
        document.querySelectorAll(".home-panel").forEach((p) => {
          p.classList.toggle("is-active", p.dataset.panel === panel);
        });
        // 切换后滚动到内容区顶部
        const main = document.querySelector(".home-main");
        if (main && window.scrollY > main.offsetTop) main.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }

    const modeToggle = document.querySelector("#modeToggle");
    if (modeToggle) {
      modeToggle.addEventListener("click", (event) => {
        const button = event.target.closest("[data-mode]");
        if (!button) return;
        state.mode = button.dataset.mode;
        modeToggle.querySelectorAll("[data-mode]").forEach((b) => {
          b.classList.toggle("is-active", b.dataset.mode === state.mode);
        });
        renderCategories();
        renderNews();
      });
    }
  }

  function init() {
    lastUpdated.textContent = data.lastUpdated;
    renderTopics();
    renderSkills();
    renderGithubWeekly();
    renderBenchmark();
    renderTicker();
    startTickerAutoScroll();
    renderHistoricalNews();
    renderTop5();
    renderLlmLeaderboard();
    renderCategories();
    renderNews();
    renderSources();
    renderWatchList();
    bindEvents();
    startAutoRefresh();
  }

  // 自动刷新：每 2 分钟检查后端是否产出了新数据（对比 generatedAt），有更新才刷新页面
  function startAutoRefresh() {
    const loadedAt = (window.AI_GENERATED_DATA && window.AI_GENERATED_DATA.generatedAt) || "";
    setInterval(async () => {
      try {
        const res = await fetch("/assets/data/generated-data.json?t=" + Date.now(), { cache: "no-store" });
        if (!res.ok) return;
        const d = await res.json();
        if (d.generatedAt && d.generatedAt !== loadedAt) location.reload();
      } catch (e) { /* 离线/出错时静默，不打扰 */ }
    }, 120000);
  }

  init();
})();

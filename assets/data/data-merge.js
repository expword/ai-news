(function () {
  const base = window.AI_NEWS_DATA;
  const generated = window.AI_GENERATED_DATA;

  if (!base || !generated) return;

  function mergeBy(items, extra, keyFn) {
    const seen = new Set();
    return [...(extra || []), ...(items || [])].filter((item) => {
      const key = keyFn(item);
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  function publicNewsItem(item) {
    if (!item || typeof item !== "object") return item;
    const { originalContent, ...publicItem } = item;
    return publicItem;
  }

  function mergeWeeklyDigests(items, extra) {
    const baseById = new Map((items || []).map((item) => [item.weekId, item]));
    const seen = new Set();
    const merged = [];

    for (const item of extra || []) {
      if (!item.weekId || seen.has(item.weekId)) continue;
      const baseItem = baseById.get(item.weekId);
      merged.push({
        ...(baseItem || {}),
        ...item,
        skills: item.skills && item.skills.length ? item.skills : baseItem?.skills || [],
        github: item.github && item.github.length ? item.github : baseItem?.github || [],
        summary: item.summary || baseItem?.summary || ""
      });
      seen.add(item.weekId);
    }

    for (const item of items || []) {
      if (!item.weekId || seen.has(item.weekId)) continue;
      merged.push(item);
      seen.add(item.weekId);
    }

    return merged;
  }

  function mergeTopicResources(items, extra) {
    const merged = { ...(items || {}) };

    for (const [topicId, resources] of Object.entries(extra || {})) {
      merged[topicId] = mergeBy(merged[topicId] || [], resources || [], (item) => item.url || item.name);
    }

    return merged;
  }

  function datasetSlug(name) {
    return String(name || "")
      .trim()
      .toLowerCase()
      .replace(/[\s/]+/g, "-")
      .replace(/[^a-z0-9\u4e00-\u9fff._-]/g, "")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  }

  function benchmarkNameFromNews(item) {
    const text = `${item?.title || ""} ${item?.summary || ""}`;
    const explicit = text.match(/\b([A-Za-z][A-Za-z0-9._+-]{1,48}(?:Bench(?:mark)?|Eval|Dataset))\b/i);
    return explicit ? explicit[1] : "";
  }

  function benchmarkArea(item) {
    const text = `${item?.title || ""} ${item?.summary || ""} ${(item?.tags || []).join(" ")}`.toLowerCase();
    if (/视觉|图像|多模态|vision|visual|multimodal|vlm/.test(text)) return "视觉感知 / 多模态";
    if (/代码|编程|coding|software|swe-/.test(text)) return "代码 / 软件工程";
    if (/语音|音频|asr|tts|audio|speech/.test(text)) return "语音 / 音频";
    if (/agent|智能体|工具调用/.test(text)) return "Agent / 工具调用";
    if (/检索|embedding|rag|retrieval/.test(text)) return "检索 / Embedding";
    return "AI 模型能力评测";
  }

  function derivedBenchmarkDatasets(news) {
    return (news || []).flatMap((item) => {
      const name = benchmarkNameFromNews(item);
      const text = `${item?.title || ""} ${item?.summary || ""}`.toLowerCase();
      const isEvaluation = item?.category === "ai-benchmark" || /benchmark|evaluation|dataset|基准|评测集|测试集/.test(text);
      if (!name || !isEvaluation || !item.url || item.url === "#") return [];

      item.moduleTargets = Array.from(new Set([...(item.moduleTargets || ["news"]), "benchmarkDatasets"]));
      return [{
        name,
        slug: datasetSlug(name),
        area: benchmarkArea(item),
        note: item.summary || item.reason || item.title,
        source: item.url,
        sourceName: item.source || "原始发布",
        date: item.date || "",
        originTitle: item.title || "",
        evaluates: (item.keyPoints || []).slice(0, 5),
        useCases: (item.useCases || []).slice(0, 5),
        limitations: (item.risks || []).slice(0, 5)
      }];
    });
  }

  base.lastUpdated = generated.lastUpdated || base.lastUpdated;
  base.news = mergeBy(base.news, generated.news, (item) => `${item.title}|${item.url || ""}`)
    .map(publicNewsItem);
  // AI 日报（后端预计算分桶，前端直接用）：滚动最新 + 带日期归档
  if (generated.dailyReport) base.dailyReport = generated.dailyReport;
  if (generated.dailyReports) base.dailyReports = generated.dailyReports;
  if (generated.llmLeaderboard) base.llmLeaderboard = generated.llmLeaderboard;
  base.sources = mergeBy(base.sources, generated.sources, (item) => `${item.name}|${item.url}`);
  base.githubWeekly = mergeBy(base.githubWeekly, generated.githubWeekly, (item) => item.name || item.url);
  base.weeklyDigests = mergeWeeklyDigests(base.weeklyDigests, generated.weeklyDigests);
  base.topicResources = mergeTopicResources(base.topicResources, generated.topicResources);
  base.skillRecommendations = mergeBy(base.skillRecommendations, generated.skillRecommendations, (item) => item.url || item.title);
  // 榜单排名仍只接受人工维护；明确命名的 Benchmark/Eval/Dataset
  // 可从精选新闻跨模块归档到“测评数据集”，并保留原始来源供核验。
  base.benchmarkDatasets = mergeBy(
    base.benchmarkDatasets,
    [...(generated.benchmarkDatasets || []), ...derivedBenchmarkDatasets(generated.news)],
    (item) => datasetSlug(item.name) || item.source
  );

  // === 全局排序：所有带 date 的内容都按时间倒序，weeklyDigests 按 weekId 倒序 ===
  function byDateDesc(a, b) {
    return new Date(b.date || 0) - new Date(a.date || 0);
  }

  if (Array.isArray(base.news)) base.news.sort(byDateDesc);
  if (Array.isArray(base.githubWeekly)) base.githubWeekly.sort(byDateDesc);
  if (Array.isArray(base.skillRecommendations)) base.skillRecommendations.sort(byDateDesc);

  // topicResources 是 {topicId: [...]} 字典，每个分类内部也排
  if (base.topicResources && typeof base.topicResources === "object") {
    for (const k of Object.keys(base.topicResources)) {
      if (Array.isArray(base.topicResources[k])) base.topicResources[k].sort(byDateDesc);
    }
  }

  // weeklyDigests 按 weekId 倒序（"2026-W21" > "2026-W20"）
  if (Array.isArray(base.weeklyDigests)) {
    base.weeklyDigests.sort((a, b) => String(b.weekId || "").localeCompare(String(a.weekId || "")));
  }
})();

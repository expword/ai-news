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

  base.lastUpdated = generated.lastUpdated || base.lastUpdated;
  base.news = mergeBy(base.news, generated.news, (item) => `${item.title}|${item.url || ""}`);
  // AI 日报（后端预计算分桶，前端直接用）：滚动最新 + 带日期归档
  if (generated.dailyReport) base.dailyReport = generated.dailyReport;
  if (generated.dailyReports) base.dailyReports = generated.dailyReports;
  if (generated.llmLeaderboard) base.llmLeaderboard = generated.llmLeaderboard;
  base.sources = mergeBy(base.sources, generated.sources, (item) => `${item.name}|${item.url}`);
  base.githubWeekly = mergeBy(base.githubWeekly, generated.githubWeekly, (item) => item.name || item.url);
  base.weeklyDigests = mergeWeeklyDigests(base.weeklyDigests, generated.weeklyDigests);
  base.topicResources = mergeTopicResources(base.topicResources, generated.topicResources);
  base.skillRecommendations = mergeBy(base.skillRecommendations, generated.skillRecommendations, (item) => item.url || item.title);
  // benchmarkBoards / benchmarkDatasets 故意不合并 generated 数据
  // —— 这两个模块只接受 data.js 的人工维护数据，避免被自动采集污染

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

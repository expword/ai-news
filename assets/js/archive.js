(function () {
  const data = window.AI_NEWS_DATA;
  const searchInput = document.querySelector("#archiveSearch");
  const navEl = document.querySelector("#archiveGroupNav");
  const sectionsEl = document.querySelector("#archiveSections");
  const totalChip = document.querySelector("#archiveTotalChip");

  // 6 大类 → category 映射
  const GROUPS = [
    { id: "models",   label: "AI 模型",   icon: "🧠", tone: "info",      cats: ["ai-models"],
      desc: "新模型发布、版本迭代、API 价格、上下文长度变化、基准分数" },
    { id: "tools",    label: "工具",      icon: "🛠️", tone: "accent",    cats: ["ai-tools", "ai-office", "ai-image-video", "ai-audio", "ai-retrieval", "ai-vision-doc"],
      desc: "通用助手、办公工具、创作工具、语音、文档、向量检索等具体产品" },
    { id: "oss",      label: "开源项目",  icon: "📦", tone: "soft",      cats: ["ai-coding"],
      desc: "GitHub 上的 AI 编程工具、Coding Agent、Skill 仓库、MCP 服务" },
    { id: "boards",   label: "榜单/评测", icon: "📊", tone: "highlight", cats: ["ai-benchmark"],
      desc: "LLM / ASR / TTS / OCR / Embedding / 视频生成等评测结果" },
    { id: "agents",   label: "搜索/Agent", icon: "🤖", tone: "neutral",   cats: ["ai-agents"],
      desc: "AI Agent、MCP、自动化工作流、浏览器/桌面操作、企业落地" },
    { id: "industry", label: "行业动态",  icon: "📈", tone: "warn",      cats: ["ai-business", "ai-research"],
      desc: "公司融资、产品战略、监管动向、合规、论文趋势" },
  ];

  function groupOf(item) {
    const c = item.category || "";
    return GROUPS.find((g) => g.cats.includes(c)) || GROUPS[GROUPS.length - 1];
  }

  function monthKey(d) {
    return (d || "").slice(0, 7); // 'YYYY-MM'
  }

  function monthLabel(key) {
    if (!key || key.length < 7) return "未注明日期";
    const [y, m] = key.split("-");
    return `${y} 年 ${parseInt(m, 10)} 月`;
  }

  function matches(item, q) {
    if (!q) return true;
    const blob = [item.title, item.summary, item.source, ...(item.tags || [])].join(" ").toLowerCase();
    return blob.includes(q.toLowerCase());
  }

  function slugOf(item) {
    return String(`${item.date || ""}-${item.title || ""}`)
      .toLowerCase()
      .replace(/[\s\/]+/g, "-")
      .replace(/[^a-z0-9一-龥\-]/g, "")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  }

  function newsCard(item) {
    const detailHref = `/pages/news-detail.html?id=${encodeURIComponent(slugOf(item))}`;
    const externalUrl = item.url && !item.url.startsWith("#") ? item.url : "";
    return `
      <article class="archive-card">
        <div class="archive-card-head">
          <span class="archive-date">${item.date || "—"}</span>
          <span class="archive-source">${item.source || ""}</span>
        </div>
        <h3><a href="${detailHref}">${item.title}</a></h3>
        ${item.summary ? `<p class="archive-summary">${item.summary.slice(0, 120)}</p>` : ""}
        <div class="archive-actions">
          <a class="archive-link" href="${detailHref}">站内详情</a>
          ${externalUrl ? `<a class="archive-link archive-link-external" href="${externalUrl}" target="_blank" rel="noopener">原文 →</a>` : ""}
          ${(item.tags || []).slice(0, 3).map((t) => `<span class="tag">${t}</span>`).join("")}
        </div>
      </article>
    `;
  }

  function render(query = "") {
    const news = (data.news || []).filter((n) => matches(n, query));
    totalChip.textContent = `共 ${news.length} 条`;

    // 按 group → month 双层聚合
    const tree = {};
    for (const g of GROUPS) tree[g.id] = {};
    for (const item of news) {
      const g = groupOf(item);
      const mk = monthKey(item.date);
      if (!tree[g.id][mk]) tree[g.id][mk] = [];
      tree[g.id][mk].push(item);
    }

    // 顶部导航：6 类 + 各自数量
    navEl.innerHTML = GROUPS.map((g) => {
      const cnt = Object.values(tree[g.id]).reduce((a, b) => a + b.length, 0);
      return `<a href="#g-${g.id}" class="cat-nav-chip">${g.icon} ${g.label} <small>${cnt}</small></a>`;
    }).join("");

    // 主体：每类一个 section，section 内按月份倒序分组
    sectionsEl.innerHTML = GROUPS.map((g) => {
      const monthsMap = tree[g.id];
      const months = Object.keys(monthsMap).sort((a, b) => b.localeCompare(a));
      const total = Object.values(monthsMap).reduce((a, b) => a + b.length, 0);
      const inner = months.map((mk) => {
        const items = monthsMap[mk].sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
        return `
          <div class="archive-month">
            <div class="archive-month-head">
              <h3>${monthLabel(mk)}</h3>
              <span class="archive-month-count">${items.length} 条</span>
            </div>
            <div class="archive-cards">
              ${items.map(newsCard).join("")}
            </div>
          </div>
        `;
      }).join("");

      return `
        <section id="g-${g.id}" class="cat-section tone-${g.tone}">
          <div class="cat-section-head">
            <div>
              <h2><span class="cat-icon">${g.icon}</span> ${g.label}</h2>
              <p class="cat-section-desc">${g.desc}</p>
            </div>
            <span class="cat-count">${total} 条</span>
          </div>
          ${total ? inner : '<p class="muted-text" style="padding:12px 4px;">这类暂时没有条目。</p>'}
        </section>
      `;
    }).join("");
  }

  searchInput.addEventListener("input", (e) => render(e.target.value));
  render();
})();

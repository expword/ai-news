(function () {
  const data = window.AI_NEWS_DATA;
  const searchInput = document.querySelector("#githubSearch");
  const navEl = document.querySelector("#githubCategoryNav");
  const sectionsEl = document.querySelector("#githubCategorySections");
  const countChip = document.querySelector("#githubCountChip");

  const CAT_META = {
    "Coding Agent": { icon: "🤖", tone: "info", desc: "终端/IDE 形态的编码 Agent，能理解整个代码库并直接动手改代码" },
    "AI 编辑器": { icon: "✏️", tone: "info", desc: "把 AI 助手做成一等公民的代码编辑器" },
    "本地推理": { icon: "🖥️", tone: "highlight", desc: "在本机/笔记本上跑 LLM 的推理引擎或一键启动工具" },
    "本地 LLM UI": { icon: "🎨", tone: "highlight", desc: "本地自托管的 LLM Web UI 与对话前端" },
    "推理引擎": { icon: "⚡", tone: "accent", desc: "高吞吐 LLM 推理服务，企业生产环境部署主力" },
    "LLM 应用平台": { icon: "🏗️", tone: "accent", desc: "可视化拖拽搭建 LLM 应用、RAG、Agent 工作流的平台" },
    "Agent 框架": { icon: "🧩", tone: "soft", desc: "搭建 Agent 应用的代码框架（链、记忆、工具、可观测性）" },
    "RAG 引擎": { icon: "📚", tone: "soft", desc: "面向企业资料的检索增强生成引擎" },
    "MCP 服务": { icon: "🔌", tone: "neutral", desc: "MCP 协议官方/社区服务端实现合集" },
    "Skill 集合": { icon: "📦", tone: "warn", desc: "可一键安装的 Coding Agent Skill 集合仓库" },
    "视频生成": { icon: "🎬", tone: "warn", desc: "端到端 AI 视频生成 pipeline" },
  };

  function collectAll() {
    const flat = [];
    for (const week of (data.weeklyDigests || [])) {
      for (const g of (week.github || [])) {
        flat.push({ ...g, _weekId: week.weekId, _weekIndex: (week.github || []).indexOf(g) });
      }
    }
    return flat;
  }

  function matches(g, q) {
    if (!q) return true;
    const blob = [g.name, g.lang, g.category, g.description, g.details, g.why].join(" ").toLowerCase();
    return blob.includes(q.toLowerCase());
  }

  function projCard(g) {
    const features = (g.features || []).slice(0, 3);
    return `
      <a class="card-link" href="/pages/github-item.html?week=${g._weekId}&i=${g._weekIndex}">
        <article class="skill-card-v2">
          <div class="skill-card-head">
            <span class="chip chip-muted">${g.lang || "Repo"}</span>
            <span class="chip chip-accent">${g.stars || "—"}</span>
          </div>
          <h3>${g.name}</h3>
          <p class="skill-card-desc">${g.description || ""}</p>
          ${features.length ? `
            <div class="skill-card-features">
              <div class="skill-card-features-label">具体作用</div>
              <ul>
                ${features.map((f) => `<li>${f}</li>`).join("")}
              </ul>
            </div>
          ` : ""}
          ${g.why ? `
            <div class="skill-card-usecases">
              <span class="muted-label">为什么值得看：</span>${g.why}
            </div>
          ` : ""}
          <div class="skill-card-foot">
            <span class="source-name">${g.source || ""}</span>
          </div>
        </article>
      </a>
    `;
  }

  function render(query = "") {
    const all = collectAll().filter((g) => matches(g, query));
    countChip.textContent = `共 ${all.length} 个项目`;

    const groups = {};
    for (const g of all) {
      const c = g.category || "其他";
      if (!groups[c]) groups[c] = [];
      groups[c].push(g);
    }
    const cats = Object.keys(groups);

    navEl.innerHTML = cats
      .map((c) => `<a href="#cat-${encodeURIComponent(c)}" class="cat-nav-chip">${CAT_META[c]?.icon || "📌"} ${c} <small>${groups[c].length}</small></a>`)
      .join("");

    sectionsEl.innerHTML = cats.map((c) => {
      const meta = CAT_META[c] || { icon: "📌", tone: "neutral", desc: "" };
      return `
        <section id="cat-${encodeURIComponent(c)}" class="cat-section tone-${meta.tone}">
          <div class="cat-section-head">
            <div>
              <h2><span class="cat-icon">${meta.icon}</span> ${c}</h2>
              <p class="cat-section-desc">${meta.desc}</p>
            </div>
            <span class="cat-count">${groups[c].length} 项</span>
          </div>
          <div class="cat-grid">
            ${groups[c].map(projCard).join("")}
          </div>
        </section>
      `;
    }).join("") || '<div class="empty-state">没有匹配的项目。</div>';
  }

  searchInput.addEventListener("input", (e) => render(e.target.value));
  render();
})();

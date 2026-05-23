(function () {
  const data = window.AI_NEWS_DATA;
  const searchInput = document.querySelector("#skillSearch");
  const navEl = document.querySelector("#skillCategoryNav");
  const sectionsEl = document.querySelector("#skillCategorySections");
  const countChip = document.querySelector("#skillCountChip");

  // 类型 → 显示名 + icon + tone
  const TYPE_META = {
    "agent-skills 仓库": { icon: "📦", tone: "info", desc: "可一键安装到 Claude Code / Codex / Cursor 的 Skill 集合仓库" },
    "Skill 精选": { icon: "🌟", tone: "highlight", desc: "由社区或官方维护的 Skill 精选合集（Awesome 类目录）" },
    "官方平台更新": { icon: "🏛️", tone: "accent", desc: "Anthropic / OpenAI / Google 等官方的 Skill / 平台能力变更" },
    "MCP / 工作流": { icon: "🔌", tone: "info", desc: "MCP server、外部工具桥接、自动化工作流" },
    "MCP 服务": { icon: "🔌", tone: "info", desc: "MCP 协议服务端实现（语义检索、文件、数据库等）" },
    "方法论 / 文章": { icon: "📚", tone: "soft", desc: "Prompt / Context Engineering / Agent 设计模式等深度文章" },
    "桌面工具": { icon: "🖥️", tone: "neutral", desc: "跨多个 Coding Agent 的桌面端工具与管理面板" },
    "Agent 项目": { icon: "🤖", tone: "accent", desc: "围绕特定任务（ML、研究、写作等）的 Agent 项目" },
    "中文 Prompt 模板": { icon: "🀄", tone: "warn", desc: "中文 ChatGPT / Claude 提示词模板与中文社区资源" },
  };

  function collectAllSkills() {
    const flat = [];
    for (const week of (data.weeklyDigests || [])) {
      for (const s of (week.skills || [])) {
        flat.push({ ...s, _weekId: week.weekId, _weekIndex: (week.skills || []).indexOf(s) });
      }
    }
    return flat;
  }

  function matches(skill, q) {
    if (!q) return true;
    const blob = [skill.title, skill.type, skill.description, skill.details, ...(skill.tags || [])].join(" ").toLowerCase();
    return blob.includes(q.toLowerCase());
  }

  function skillCard(s) {
    const features = (s.features || []).slice(0, 3);
    const useCases = (s.useCases || []).slice(0, 2);
    return `
      <a class="card-link" href="/pages/skill-item.html?week=${s._weekId}&i=${s._weekIndex}">
        <article class="skill-card-v2">
          <div class="skill-card-head">
            <span class="chip chip-muted">${s.type}</span>
          </div>
          <h3>${s.title}</h3>
          <p class="skill-card-desc">${s.description || ""}</p>
          ${features.length ? `
            <div class="skill-card-features">
              <div class="skill-card-features-label">具体作用</div>
              <ul>
                ${features.map((f) => `<li>${f}</li>`).join("")}
              </ul>
            </div>
          ` : ""}
          ${useCases.length ? `
            <div class="skill-card-usecases">
              <span class="muted-label">适合场景：</span>${useCases.join(" · ")}
            </div>
          ` : ""}
          <div class="skill-card-foot">
            <div class="tag-row">
              ${(s.tags || []).slice(0, 3).map((t) => `<span class="tag">${t}</span>`).join("")}
            </div>
            <span class="source-name">${s.source || ""}</span>
          </div>
        </article>
      </a>
    `;
  }

  function render(query = "") {
    const all = collectAllSkills().filter((s) => matches(s, query));
    countChip.textContent = `共 ${all.length} 个 Skill`;

    // 按 type 分组
    const groups = {};
    for (const s of all) {
      const t = s.type || "其他";
      if (!groups[t]) groups[t] = [];
      groups[t].push(s);
    }
    const types = Object.keys(groups);

    // 导航条
    navEl.innerHTML = types
      .map((t) => `<a href="#type-${encodeURIComponent(t)}" class="cat-nav-chip">${TYPE_META[t]?.icon || "📌"} ${t} <small>${groups[t].length}</small></a>`)
      .join("");

    // 每类一个 section
    sectionsEl.innerHTML = types.map((t) => {
      const meta = TYPE_META[t] || { icon: "📌", tone: "neutral", desc: "" };
      return `
        <section id="type-${encodeURIComponent(t)}" class="cat-section tone-${meta.tone}">
          <div class="cat-section-head">
            <div>
              <h2><span class="cat-icon">${meta.icon}</span> ${t}</h2>
              <p class="cat-section-desc">${meta.desc}</p>
            </div>
            <span class="cat-count">${groups[t].length} 项</span>
          </div>
          <div class="cat-grid">
            ${groups[t].map(skillCard).join("")}
          </div>
        </section>
      `;
    }).join("") || '<div class="empty-state">没有匹配的 Skill。</div>';
  }

  searchInput.addEventListener("input", (e) => render(e.target.value));
  render();
})();

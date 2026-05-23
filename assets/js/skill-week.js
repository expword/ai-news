(function () {
  const data = window.AI_NEWS_DATA;
  const params = new URLSearchParams(window.location.search);
  const weekId = params.get("id") || ((data.weeklyDigests || [])[0] || {}).weekId;
  const week = (data.weeklyDigests || []).find((w) => w.weekId === weekId);

  const titleEl = document.querySelector("#weekTitle");
  const subtitleEl = document.querySelector("#weekSubtitle");
  const summaryEl = document.querySelector("#weekSummary");
  const skillGrid = document.querySelector("#weekSkillGrid");
  const typeNav = document.querySelector("#skillTypeNav");
  const githubLink = document.querySelector("#weekGithubLink");

  if (!week) {
    titleEl.textContent = "没有找到这周";
    subtitleEl.textContent = "请从每周 Skill 列表重新进入";
    summaryEl.textContent = "";
    skillGrid.innerHTML = "";
    typeNav.innerHTML = "";
    githubLink.innerHTML = "";
    return;
  }

  document.title = `${week.label} Skill 推荐 - AI工具导航`;
  titleEl.textContent = `${week.label} Skill 推荐`;
  subtitleEl.textContent = `${week.weekId} · 收录 ${(week.skills || []).length} Skill / ${(week.github || []).length} GitHub`;
  summaryEl.textContent = week.summary || "";

  const types = Array.from(new Set((week.skills || []).map((s) => s.type)));
  typeNav.innerHTML = types
    .map((t, i) => `<a href="#type-${i}">${t}</a>`)
    .join("");

  skillGrid.innerHTML = (week.skills || [])
    .map(
      (s, i) => `
        <a class="card-link" id="type-${types.indexOf(s.type)}" href="/pages/skill-item.html?week=${week.weekId}&i=${i}">
          <article class="benchmark-card">
            <div class="benchmark-card-head">
              <strong>${s.title}</strong>
              <span>${s.type}</span>
            </div>
            <p>${s.description}</p>
            <div class="tag-row">
              ${(s.tags || []).map((t) => `<span class="tag">${t}</span>`).join("")}
            </div>
            <span class="source-name">${s.source || ""}</span>
          </article>
        </a>
      `
    )
    .join("");

  githubLink.innerHTML = `
    <a class="card-link" href="/pages/github-week.html?id=${week.weekId}">
      <article class="benchmark-card">
        <div class="benchmark-card-head">
          <strong>${week.label} GitHub 周榜</strong>
          <span>${(week.github || []).length} 个项</span>
        </div>
        <p>查看本周 GitHub Trending 上的 AI 项目，含 star 增量与推荐理由</p>
        <span class="source-name">点击进入 GitHub 周详</span>
      </article>
    </a>
  `;
})();

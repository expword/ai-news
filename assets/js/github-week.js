(function () {
  const data = window.AI_NEWS_DATA;
  const params = new URLSearchParams(window.location.search);
  const weekId = params.get("id") || ((data.weeklyDigests || [])[0] || {}).weekId;
  const week = (data.weeklyDigests || []).find((w) => w.weekId === weekId);

  const titleEl = document.querySelector("#weekTitle");
  const subtitleEl = document.querySelector("#weekSubtitle");
  const summaryEl = document.querySelector("#weekSummary");
  const projectGrid = document.querySelector("#weekGithubGrid");
  const itemNav = document.querySelector("#githubItemNav");
  const skillLink = document.querySelector("#weekSkillLink");

  if (!week) {
    titleEl.textContent = "没有找到这周";
    subtitleEl.textContent = "请从 GitHub 周榜列表重新进入";
    summaryEl.textContent = "";
    projectGrid.innerHTML = "";
    itemNav.innerHTML = "";
    skillLink.innerHTML = "";
    return;
  }

  document.title = `${week.label} GitHub 周榜 - AI工具导航`;
  titleEl.textContent = `${week.label} GitHub 周榜`;
  subtitleEl.textContent = `${week.weekId} · 收录 ${(week.github || []).length} AI 项目`;
  summaryEl.textContent = week.summary || "";

  itemNav.innerHTML = (week.github || [])
    .map((g, i) => `<a href="#proj-${i}">${g.name}</a>`)
    .join("");

  projectGrid.innerHTML = (week.github || [])
    .map(
      (g, i) => `
        <a class="card-link" id="proj-${i}" href="/pages/github-item.html?week=${week.weekId}&i=${i}">
          <article class="benchmark-card">
            <div class="benchmark-card-head">
              <strong>${g.name}</strong>
              <span>${g.lang}</span>
            </div>
            <p>${g.description}</p>
            <div class="tag-row">
              <span class="tag">${g.stars || ""}</span>
              <span class="tag">${g.source || ""}</span>
            </div>
            <span class="source-name">${g.why || ""}</span>
          </article>
        </a>
      `
    )
    .join("");

  skillLink.innerHTML = `
    <a class="card-link" href="/pages/skill-week.html?id=${week.weekId}">
      <article class="benchmark-card">
        <div class="benchmark-card-head">
          <strong>${week.label} Skill 推荐</strong>
          <span>${(week.skills || []).length} Skill</span>
        </div>
        <p>查看本周整理agent-skills、Claude Code Skill、MCP 工作流、prompt 模板</p>
        <span class="source-name">点击进入 Skill 周详</span>
      </article>
    </a>
  `;
})();

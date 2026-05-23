(function () {
  const data = window.AI_NEWS_DATA;
  const params = new URLSearchParams(window.location.search);
  const weekId = params.get("week");
  const index = Number(params.get("i"));
  const week = (data.weeklyDigests || []).find((w) => w.weekId === weekId);
  const skill = week && week.skills && week.skills[index];

  const titleEl = document.querySelector("#skillTitle");
  const typeEl = document.querySelector("#skillType");
  const descEl = document.querySelector("#skillDescription");
  const factsEl = document.querySelector("#skillFacts");
  const detailsEl = document.querySelector("#skillDetails");
  const featuresEl = document.querySelector("#skillFeatures");
  const useCasesEl = document.querySelector("#skillUseCases");
  const tagsEl = document.querySelector("#skillTags");
  const sourceEl = document.querySelector("#skillSource");
  const backEl = document.querySelector("#backToWeek");

  function listHtml(items) {
    if (!items || !items.length) {
      return '<article class="dataset-content-item"><span></span><p>暂无补充内容</p></article>';
    }
    return items
      .map((t) => `<article class="dataset-content-item"><span></span><p>${t}</p></article>`)
      .join("");
  }

  function paragraphHtml(text) {
    if (!text) return '<article class="dataset-content-item"><span></span><p>暂无详细介绍</p></article>';
    return `<article class="dataset-content-item"><span></span><p>${text}</p></article>`;
  }

  if (!skill) {
    titleEl.textContent = "没有找到这条 Skill";
    typeEl.textContent = "链接可能失效";
    descEl.textContent = "请从每周 Skill 列表重新进入";
    factsEl.innerHTML = "";
    detailsEl.innerHTML = "";
    featuresEl.innerHTML = "";
    useCasesEl.innerHTML = "";
    tagsEl.innerHTML = "";
    sourceEl.innerHTML = "";
    return;
  }

  document.title = `${skill.title} - Skill 详情`;
  titleEl.textContent = skill.title;
  typeEl.textContent = skill.type || "";
  descEl.textContent = skill.description || "";
  if (week) backEl.href = `/pages/skill-week.html?id=${week.weekId}`;

  const facts = [
    { label: "类型", value: skill.type || "" },
    { label: "所属周", value: week ? `${week.label} (${week.weekId})` : "" },
    { label: "来源", value: skill.source || "" },
    { label: "标签", value: String((skill.tags || []).length) }
  ];
  factsEl.innerHTML = facts
    .map(
      (f) => `
        <article class="dataset-fact-card">
          <span>${f.label}</span>
          <strong>${f.value}</strong>
        </article>
      `
    )
    .join("");

  detailsEl.innerHTML = paragraphHtml(skill.details || skill.description);
  featuresEl.innerHTML = listHtml(skill.features);
  useCasesEl.innerHTML = listHtml(skill.useCases);

  tagsEl.innerHTML = (skill.tags || [])
    .map((t) => `<span class="tag">${t}</span>`)
    .join("") || '<span class="card-hint">无标</span>';

  if (skill.url) {
    sourceEl.innerHTML = `
      <a class="dataset-source-card" href="${skill.url}" target="_blank" rel="noopener">
        <strong>${skill.source || "原始链接"}</strong>
        <span>${skill.url}</span>
      </a>
    `;
  } else {
    sourceEl.innerHTML = '<span class="card-hint">未提供链</span>';
  }
})();

(function () {
  const data = window.AI_NEWS_DATA;
  const params = new URLSearchParams(window.location.search);
  const weekId = params.get("week");
  const index = Number(params.get("i"));
  const week = (data.weeklyDigests || []).find((w) => w.weekId === weekId);
  const proj = week && week.github && week.github[index];

  const titleEl = document.querySelector("#projTitle");
  const langEl = document.querySelector("#projLang");
  const descEl = document.querySelector("#projDescription");
  const factsEl = document.querySelector("#projFacts");
  const detailsEl = document.querySelector("#projDetails");
  const featuresEl = document.querySelector("#projFeatures");
  const quickStartEl = document.querySelector("#projQuickStart");
  const whyEl = document.querySelector("#projWhy");
  const sourceEl = document.querySelector("#projSource");
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

  if (!proj) {
    titleEl.textContent = "没有找到这个项目";
    langEl.textContent = "链接可能失效";
    descEl.textContent = "请从 GitHub 周榜重新进入";
    factsEl.innerHTML = "";
    detailsEl.innerHTML = "";
    featuresEl.innerHTML = "";
    quickStartEl.innerHTML = "";
    whyEl.innerHTML = "";
    sourceEl.innerHTML = "";
    return;
  }

  document.title = `${proj.name} - GitHub 项目详情`;
  titleEl.textContent = proj.name;
  langEl.textContent = proj.lang || "";
  descEl.textContent = proj.description || "";
  if (week) backEl.href = `/pages/github-week.html?id=${week.weekId}`;

  const facts = [
    { label: "主要语言", value: proj.lang || "" },
    { label: "Star 增量", value: proj.stars || "" },
    { label: "所属周", value: week ? `${week.label} (${week.weekId})` : "" },
    { label: "趋势来源", value: proj.source || "" }
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

  detailsEl.innerHTML = paragraphHtml(proj.details || proj.description);
  featuresEl.innerHTML = listHtml(proj.features);
  quickStartEl.innerHTML = listHtml(proj.quickStart);

  whyEl.innerHTML = `
    <article class="dataset-content-item">
      <span></span>
      <p>${proj.why || "暂无推荐理由说明"}</p>
    </article>
  `;

  if (proj.url) {
    sourceEl.innerHTML = `
      <a class="dataset-source-card" href="${proj.url}" target="_blank" rel="noopener">
        <strong>${proj.name}</strong>
        <span>${proj.url}</span>
      </a>
    `;
  } else {
    sourceEl.innerHTML = '<span class="card-hint">未提供链</span>';
  }
})();

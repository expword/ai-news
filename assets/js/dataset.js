(function () {
  const data = window.AI_NEWS_DATA;
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("id") || "c-eval";
  const detail = data.datasetDetails?.[slug];

  const datasetTitle = document.querySelector("#datasetTitle");
  const datasetSubtitle = document.querySelector("#datasetSubtitle");
  const datasetSummary = document.querySelector("#datasetSummary");
  const datasetFacts = document.querySelector("#datasetFacts");
  const datasetEvaluates = document.querySelector("#datasetEvaluates");
  const datasetMetrics = document.querySelector("#datasetMetrics");
  const datasetUseCases = document.querySelector("#datasetUseCases");
  const datasetLimitations = document.querySelector("#datasetLimitations");
  const datasetSources = document.querySelector("#datasetSources");
  const datasetRankingsMeta = document.querySelector("#datasetRankingsMeta");
  const datasetRankingsTableWrap = document.querySelector("#datasetRankingsTableWrap");
  const datasetRankingsSection = document.querySelector("#rankings");

  function renderList(target, items) {
    target.innerHTML = items
      .map(
        (item) => `
          <article class="dataset-content-item">
            <span></span>
            <p>${item}</p>
          </article>
        `
      )
      .join("");
  }

  function renderMissing() {
    datasetTitle.textContent = "没有找到这个数据";
    datasetSubtitle.textContent = "请从测评数据集列表重新进入";
    datasetSummary.textContent = "当前链接没有匹配到已整理的数据集内容";
    datasetFacts.innerHTML = "";
    datasetEvaluates.innerHTML = "";
    datasetMetrics.innerHTML = "";
    datasetUseCases.innerHTML = "";
    datasetLimitations.innerHTML = "";
    datasetSources.innerHTML = "";
  }

  if (!detail) {
    renderMissing();
    return;
  }

  document.title = `${detail.title} 测评数据集详- AI工具导航`;
  datasetTitle.textContent = detail.title;
  datasetSubtitle.textContent = detail.subtitle;
  datasetSummary.textContent = detail.summary;

  datasetFacts.innerHTML = detail.facts
    .map(
      (item) => `
        <article class="dataset-fact-card">
          <span>${item.label}</span>
          <strong>${item.value}</strong>
        </article>
      `
    )
    .join("");

  if (detail.rankings && Array.isArray(detail.rankings.items) && detail.rankings.items.length) {
    const r = detail.rankings;
    datasetRankingsMeta.innerHTML = `
      <p class="ranking-line"><strong>指标</strong>${r.metric || ""}</p>
      <p class="ranking-line"><strong>更新</strong>${r.updated || ""}</p>
    `;
    datasetRankingsTableWrap.innerHTML = `
      <table class="mini-rank-table">
        <thead>
          <tr><th>#</th><th>名称</th><th>分数</th><th>备注</th></tr>
        </thead>
        <tbody>
          ${r.items
            .slice(0, 20)
            .map(
              (row) => `
                <tr>
                  <td>${row.rank}</td>
                  <td>${row.name}</td>
                  <td>${row.score}</td>
                  <td>${row.note || ""}</td>
                </tr>
              `
            )
            .join("")}
        </tbody>
      </table>
    `;
  } else {
    datasetRankingsSection.style.display = "none";
  }

  renderList(datasetEvaluates, detail.evaluates);
  renderList(datasetMetrics, detail.metrics);
  renderList(datasetUseCases, detail.useCases);
  renderList(datasetLimitations, detail.limitations);

  datasetSources.innerHTML = detail.sources
    .map(
      (item) => `
        <a class="dataset-source-card" href="${item.url}" target="_blank" rel="noopener">
          <strong>${item.name}</strong>
          <span>${item.url}</span>
        </a>
      `
    )
    .join("");
})();

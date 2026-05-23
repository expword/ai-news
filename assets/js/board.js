(function () {
  const data = window.AI_NEWS_DATA;
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("id") || "";
  const slugOf = window.boardSlugByTitle || ((t) => t);
  const board = (data.benchmarkBoards || []).find((item) => slugOf(item.title) === slug);

  const titleEl = document.querySelector("#boardTitle");
  const typeEl = document.querySelector("#boardType");
  const descEl = document.querySelector("#boardDescription");
  const factsEl = document.querySelector("#boardFacts");
  const rankingsMeta = document.querySelector("#boardRankingsMeta");
  const rankingsTableWrap = document.querySelector("#boardRankingsTableWrap");
  const rankingsFallback = document.querySelector("#boardRankingsFallback");
  const tagsEl = document.querySelector("#boardDatasets");
  const sourceEl = document.querySelector("#boardSource");

  if (!board) {
    titleEl.textContent = "没有找到这个榜单";
    typeEl.textContent = "请从榜单测评页重新进入";
    descEl.textContent = "当前链接没有匹配到已整理的榜单";
    factsEl.innerHTML = "";
    rankingsMeta.innerHTML = "";
    rankingsTableWrap.innerHTML = "";
    tagsEl.innerHTML = "";
    sourceEl.innerHTML = "";
    return;
  }

  document.title = `${board.title} 榜单详情 - AI工具导航`;
  titleEl.textContent = board.title;
  typeEl.textContent = board.type;
  descEl.textContent = board.description;

  const facts = [
    { label: "榜单类型", value: board.type },
    { label: "更新", value: board.rankingUpdated || "" },
    { label: "评测指标", value: board.rankingMetric || "" },
    { label: "来源", value: board.rankingSourceName || board.source || "" }
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

  if (Array.isArray(board.rankings) && board.rankings.length) {
    rankingsMeta.innerHTML = `
      <p class="ranking-line"><strong>指标</strong>${board.rankingMetric || ""}</p>
      <p class="ranking-line"><strong>更新</strong>${board.rankingUpdated || ""}</p>
    `;
    rankingsTableWrap.innerHTML = `
      <table class="mini-rank-table">
        <thead>
          <tr><th>#</th><th>名称</th><th>分数</th><th>备注</th></tr>
        </thead>
        <tbody>
          ${board.rankings
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
    rankingsFallback.hidden = true;
  } else {
    rankingsMeta.innerHTML = "";
    rankingsTableWrap.innerHTML = "";
    rankingsFallback.hidden = false;
    rankingsFallback.textContent = "该榜单暂无可缓存Top20 数据，请通过下方官方来源查看实时排名";
  }

  tagsEl.innerHTML = (board.datasets || [])
    .map((d) => `<span class="tag">${d}</span>`)
    .join("");

  const sourceUrl = board.rankingSourceUrl || board.url;
  const sourceName = board.rankingSourceName || board.source || "原始榜单";
  if (sourceUrl) {
    sourceEl.innerHTML = `
      <a class="dataset-source-card" href="${sourceUrl}" target="_blank" rel="noopener">
        <strong>${sourceName}</strong>
        <span>${sourceUrl}</span>
      </a>
    `;
  } else {
    sourceEl.innerHTML = "";
  }
})();

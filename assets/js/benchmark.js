(function () {
  const data = window.AI_NEWS_DATA;
  const boardGrid = document.querySelector("#boardGrid");
  const datasetGrid = document.querySelector("#datasetGrid");
  const searchInput = document.querySelector("#benchmarkSearch");
  const slugOf = window.boardSlugByTitle || ((t) => t);

  function includesQuery(item, query) {
    if (!query) return true;
    return Object.values(item)
      .flat()
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(query.toLowerCase());
  }

  function hasCompleteTop20(item) {
    return Array.isArray(item.rankings) && item.rankings.length >= 20;
  }

  function render(query = "") {
    const boards = data.benchmarkBoards.filter((item) => hasCompleteTop20(item) && includesQuery(item, query));
    const datasets = data.benchmarkDatasets.filter((item) => includesQuery(item, query));

    boardGrid.innerHTML = boards.length
      ? boards
          .map((item) => {
            const href = `/pages/board.html?id=${slugOf(item.title)}`;
            return `
              <a class="card-link" href="${href}">
                <article class="benchmark-card">
                  <div class="benchmark-card-head">
                    <strong>${item.title}</strong>
                    <span>${item.type}</span>
                  </div>
                  <p>${item.description}</p>
                  <div class="tag-row">
                    ${item.datasets.map((dataset) => `<span class="tag">${dataset}</span>`).join("")}
                  </div>
                  <span class="source-name">${item.source}</span>
                </article>
              </a>
            `;
          })
          .join("")
      : '<div class="empty-state">没有匹配的榜单</div>';

    datasetGrid.innerHTML = datasets.length
      ? datasets
          .map((item) => {
            const detailKey = Object.keys(data.datasetDetails || {}).find(
              (key) => data.datasetDetails[key].title === item.name
            );
            const slug = detailKey || encodeURIComponent((item.name || "").toLowerCase().replace(/\s+/g, "-"));
            const href = `/pages/dataset.html?id=${slug}`;
            return `
              <a class="card-link" href="${href}">
                <article class="dataset-card">
                  <strong>${item.name}</strong>
                  <span>${item.area}</span>
                  <p>${item.note}</p>
                </article>
              </a>
            `;
          })
          .join("")
      : '<div class="empty-state">没有匹配的数据集。</div>';
  }

  searchInput.addEventListener("input", (event) => render(event.target.value));
  render();
})();

(function () {
  const data = window.AI_NEWS_DATA;
  const searchInput = document.querySelector("#historySearch");
  const grid = document.querySelector("#historyGrid");
  const countEl = document.querySelector("#historyCount");
  const categoryNav = document.querySelector("#historyCategoryNav");

  const categoryNames = new Map((data.categories || []).map((item) => [item.id, item.name]));
  let activeCategory = "all";

  function getItems(query = "") {
    const value = query.trim().toLowerCase();
    return (data.news || [])
      .filter((item) => activeCategory === "all" || item.category === activeCategory)
      .filter((item) => {
        if (!value) return true;
        return [item.title, item.summary, item.source, ...(item.tags || [])].join(" ").toLowerCase().includes(value);
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  function newsDetailHref(item) {
    const slug = String(`${item.date || ""}-${item.title || ""}`)
      .toLowerCase()
      .replace(/[\s\/]+/g, "-")
      .replace(/[^a-z0-9\u4e00-\u9fa5\-]/g, "")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    return `/pages/news-detail.html?id=${encodeURIComponent(slug)}`;
  }

  function renderNav() {
    const counts = new Map();
    for (const item of data.news || []) {
      counts.set(item.category, (counts.get(item.category) || 0) + 1);
    }
    const buttons = [
      { id: "all", name: "全部", count: (data.news || []).length },
      ...(data.categories || []).filter((item) => item.id !== "all" && counts.has(item.id)).map((item) => ({
        id: item.id,
        name: item.name,
        count: counts.get(item.id)
      }))
    ];

    categoryNav.innerHTML = buttons
      .map(
        (item) => `
          <button class="side-link-button${item.id === activeCategory ? " is-active" : ""}" data-history-category="${item.id}" type="button">
            <span>${item.name}</span>
            <small>${item.count}</small>
          </button>
        `
      )
      .join("");
  }

  function render(query = "") {
    const items = getItems(query);
    countEl.textContent = `${items.length} 条`;
    grid.innerHTML = items.length
      ? items
          .map((item) => {
            const target = "";
            const href = newsDetailHref(item);
            return `
              <a class="historical-news-card" href="${href}" ${target}>
                <time datetime="${item.date}">${item.date} · ${categoryNames.get(item.category) || "AI快讯"}</time>
                <h3>${item.title}</h3>
                <p>${item.summary || ""}</p>
                <div class="tag-row">
                  ${(item.tags || []).slice(0, 4).map((tag) => `<span class="tag">${tag}</span>`).join("")}
                </div>
                <span class="source-name">${item.source || ""}</span>
              </a>
            `;
          })
          .join("")
      : '<div class="empty-state">没有匹配的快讯</div>';
  }

  categoryNav.addEventListener("click", (event) => {
    const button = event.target.closest("[data-history-category]");
    if (!button) return;
    activeCategory = button.dataset.historyCategory;
    renderNav();
    render(searchInput.value);
  });

  searchInput.addEventListener("input", (event) => render(event.target.value));
  renderNav();
  render();
})();

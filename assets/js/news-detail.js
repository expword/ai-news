(function () {
  const data = window.AI_NEWS_DATA;
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id") || "";

  const titleEl = document.querySelector("#newsTitle");
  const leadEl = document.querySelector("#newsLead");
  const tagsEl = document.querySelector("#newsTags");
  const categoryChip = document.querySelector("#newsCategoryChip");
  const dateChip = document.querySelector("#newsDateChip");
  const sourceChip = document.querySelector("#newsSourceChip");
  const ctaTop = document.querySelector("#newsSourceCtaTop");
  const ctaSide = document.querySelector("#newsSourceCtaSide");
  const tldrEl = document.querySelector("#newsTldr");
  const keyPointsTop = document.querySelector("#newsKeyPointsTop");
  const bodyEl = document.querySelector("#newsBody");
  const metaEl = document.querySelector("#newsMeta");
  const relatedSection = document.querySelector("#newsRelatedSection");
  const relatedGrid = document.querySelector("#newsRelated");

  const categoryNames = new Map((data.categories || []).map((it) => [it.id, it.name]));

  function slugOf(item) {
    return String(`${item.date || ""}-${item.title || ""}`)
      .toLowerCase()
      .replace(/[\s\/]+/g, "-")
      .replace(/[^a-z0-9一-龥\-]/g, "")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  }

  function findItem() {
    const decoded = decodeURIComponent(id);
    return (data.news || []).find((it) => slugOf(it) === decoded) || (data.news || [])[0];
  }

  // 判断文本是否实质性非空（去掉占位、过短、和 summary 完全重复的情况）
  function isSubstantive(text, summary) {
    if (!text || typeof text !== "string") return false;
    const t = text.trim();
    if (t.length < 20) return false;
    if (summary && t === summary.trim()) return false;
    if (t.includes("自动采集到的 AI 相关信息")) return false;
    return true;
  }

  function nonEmptyList(arr, summary) {
    if (!Array.isArray(arr)) return [];
    return arr
      .map((s) => (typeof s === "string" ? s.trim() : ""))
      .filter((s) => s && s.length > 4 && !s.includes("自动采集") && s !== (summary || "").trim());
  }

  function bullets(items, cls) {
    if (!items || !items.length) return "";
    return `<ul class="${cls || "bullet-list"}">${items.map((t) => `<li>${t}</li>`).join("")}</ul>`;
  }

  function block(tone, icon, title, body) {
    if (!body) return "";
    return `
      <section class="detail-block tone-${tone}">
        <div class="detail-block-head">
          ${icon ? `<span class="detail-block-icon">${icon}</span>` : ""}
          <h2>${title}</h2>
        </div>
        <div class="detail-block-body">${body}</div>
      </section>
    `;
  }

  function relatedCard(it) {
    return `
      <a class="card-link" href="/pages/news-detail.html?id=${encodeURIComponent(slugOf(it))}">
        <article class="related-card">
          <span class="chip chip-muted">${categoryNames.get(it.category) || "AI"}</span>
          <h3>${it.title}</h3>
          <p>${(it.summary || "").slice(0, 80)}</p>
          <span class="related-meta">${it.date || ""} · ${it.source || ""}</span>
        </article>
      </a>
    `;
  }

  const item = findItem();
  if (!item) {
    titleEl.textContent = "没有找到快讯";
    leadEl.textContent = "请返回历史快讯列表重新进入。";
    bodyEl.innerHTML = "";
    return;
  }

  const category = categoryNames.get(item.category) || "AI快讯";
  const summary = item.summary || "";
  const keyPoints = nonEmptyList(item.keyPoints, summary);
  const background = isSubstantive(item.background, summary) ? item.background : "";
  const impact = isSubstantive(item.impact, summary) ? item.impact : "";
  const audience = nonEmptyList(item.audience);
  const useCases = nonEmptyList(item.useCases || item.scenarios);
  const risks = nonEmptyList(item.risks);
  const contentIdeas = nonEmptyList(item.contentIdeas);
  const nextActions = nonEmptyList(item.nextActions);
  const moduleTargets = nonEmptyList(item.moduleTargets);
  const routeReason = isSubstantive(item.routeReason, summary) ? item.routeReason : "";
  const url = item.url || "";

  // === HERO ===
  document.title = `${item.title} - AI 快讯详情`;
  titleEl.textContent = item.title;
  leadEl.textContent = summary || "这条快讯还没有详细整理，建议直接查看原文。";
  tagsEl.innerHTML = (item.tags || []).map((t) => `<span class="tag">${t}</span>`).join("");
  categoryChip.textContent = category;
  dateChip.textContent = item.date ? `📅 ${item.date}` : "";
  sourceChip.textContent = item.source ? `🔗 ${item.source}` : "";

  if (url && !url.startsWith("#")) {
    ctaTop.href = url;
    ctaSide.href = url;
  } else {
    ctaTop.style.display = "none";
    ctaSide.style.display = "none";
  }

  // === TL;DR：只在有 keyPoints 时显示 ===
  if (keyPoints.length) {
    keyPointsTop.innerHTML = keyPoints.slice(0, 5).map((p) => `<li>${p}</li>`).join("");
  } else {
    tldrEl.style.display = "none";
  }

  // === BODY：只显示有实质内容的 section ===
  const blocks = [];

  if (background) {
    blocks.push(block("info", "📰", "解读", `<p class="detail-paragraph">${background}</p>`));
  }

  if (impact) {
    blocks.push(block("accent", "📈", "影响", `<p class="detail-paragraph">${impact}</p>`));
  }

  if (audience.length || useCases.length) {
    blocks.push(`
      <section class="detail-block tone-neutral detail-dual">
        <div class="detail-dual-col">
          <div class="detail-block-head">
            <span class="detail-block-icon">👥</span>
            <h2>适合谁</h2>
          </div>
          ${audience.length ? bullets(audience, "dot-list") : '<p class="muted-text">未注明</p>'}
        </div>
        <div class="detail-dual-col">
          <div class="detail-block-head">
            <span class="detail-block-icon">🛠️</span>
            <h2>怎么用</h2>
          </div>
          ${useCases.length ? bullets(useCases, "dot-list") : '<p class="muted-text">未注明</p>'}
        </div>
      </section>
    `);
  }

  if (risks.length) {
    blocks.push(block("warn", "⚠️", "注意", bullets(risks, "warn-list")));
  }

  if (contentIdeas.length || nextActions.length) {
    blocks.push(`
      <section class="detail-block tone-info detail-dual">
        <div class="detail-dual-col">
          <div class="detail-block-head">
            <span class="detail-block-icon">🧩</span>
            <h2>可延伸选题</h2>
          </div>
          ${contentIdeas.length ? bullets(contentIdeas, "dot-list") : '<p class="muted-text">未注明</p>'}
        </div>
        <div class="detail-dual-col">
          <div class="detail-block-head">
            <span class="detail-block-icon">✅</span>
            <h2>下一步</h2>
          </div>
          ${nextActions.length ? bullets(nextActions, "dot-list") : '<p class="muted-text">未注明</p>'}
        </div>
      </section>
    `);
  }

  if (moduleTargets.length || routeReason) {
    blocks.push(block(
      "neutral",
      "📌",
      "分发到哪里",
      `
        ${moduleTargets.length ? bullets(moduleTargets, "dot-list") : ""}
        ${routeReason ? `<p class="detail-paragraph">${routeReason}</p>` : ""}
      `
    ));
  }

  if (!background && !impact && !audience.length && !useCases.length && !risks.length && !contentIdeas.length && !nextActions.length) {
    blocks.push(`
      <section class="detail-block tone-soft">
        <div class="detail-block-head">
          <span class="detail-block-icon">📭</span>
          <h2>暂无整理</h2>
        </div>
        <p class="detail-paragraph">这条还没有详细内容，建议直接打开原文。</p>
      </section>
    `);
  }

  if (url && !url.startsWith("#")) {
    blocks.push(`
      <section class="detail-cta-block">
        <h2>原文</h2>
        <a class="btn-primary btn-large" href="${url}" target="_blank" rel="noopener">查看原文 →</a>
      </section>
    `);
  }

  blocks.push(`
    <p class="detail-disclaimer">本页内容由 AI 整理，关键信息以原文为准。</p>
  `);

  bodyEl.innerHTML = blocks.join("");

  // === SIDE META ===
  metaEl.innerHTML = [
    { k: "日期", v: item.date || "—" },
    { k: "分类", v: category },
    { k: "来源", v: item.source || "—" },
    { k: "模块", v: moduleTargets.join("、") || "news" },
    { k: "标签", v: (item.tags || []).join("、") || "—" },
  ].map((m) => `<div><dt>${m.k}</dt><dd>${m.v}</dd></div>`).join("");

  // === RELATED ===
  const related = (data.news || [])
    .filter((it) => it !== item && it.category === item.category)
    .slice(0, 4);
  if (related.length) {
    relatedSection.hidden = false;
    relatedGrid.innerHTML = related.map(relatedCard).join("");
  }
})();

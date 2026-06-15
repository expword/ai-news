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

  // 实质性检查：有 10 字以上就算；不和 summary 完全相同；不是已知占位
  function isSubstantive(text, summary) {
    if (!text || typeof text !== "string") return false;
    const t = text.trim();
    if (t.length < 10) return false;
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
  const originalContent = isSubstantive(item.originalContent, summary) ? item.originalContent : "";
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
    ctaSide.href = url;
  } else {
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

  // 解读：优先用 background；否则用 keyPoints 拼成一段。
  // 注意：每条 keyPoint 通常自带句末标点，拼接前先去掉，避免出现 "。；" 或 "。。"
  let interpretText = background;
  if (!interpretText && keyPoints.length >= 2) {
    const cleaned = keyPoints
      .map((k) => String(k).trim().replace(/[。；，！？、,;.!?]+$/u, ""))
      .filter(Boolean);
    interpretText = cleaned.join("；") + "。";
  }
  if (interpretText) {
    blocks.push(block("info", "📰", "解读", `<p class="detail-paragraph">${interpretText}</p>`));
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

  if (originalContent) {
    // 原文来自任意外站，必须 HTML 转义防 XSS
    const escape = (s) =>
      String(s)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
    const paragraphs = originalContent
      .split(/\n\n+|\r\n\r\n+/)
      .map((s) => s.trim())
      .filter(Boolean);
    const html = (paragraphs.length ? paragraphs : [originalContent])
      .map((p) => `<p class="detail-paragraph">${escape(p)}</p>`)
      .join("");
    blocks.push(`
      <details class="detail-block tone-soft detail-original">
        <summary class="detail-block-head detail-original-summary">
          <span class="detail-block-icon">📄</span>
          <h2>原文内容</h2>
          <span class="detail-original-hint">点击展开 / 收起</span>
        </summary>
        <div class="detail-block-body detail-original-body">${html}</div>
      </details>
    `);
  }

  if (!background && !impact && !audience.length && !useCases.length && !risks.length && !originalContent) {
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

  bodyEl.innerHTML = blocks.join("");

  // === SIDE META ===
  metaEl.innerHTML = [
    { k: "日期", v: item.date || "—" },
    { k: "分类", v: category },
    { k: "来源", v: item.source || "—" },
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

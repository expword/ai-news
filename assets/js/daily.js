(function () {
  const data = window.AI_NEWS_DATA || {};
  const root = document.querySelector("#dailyReport");
  const archiveBox = document.querySelector("#dailyArchive");
  if (!root) return;

  function esc(s) {
    return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  // 收集每一天的日报：归档（带日期） + 滚动最新（若其日期不在归档里也纳入），按日期倒序
  const hasItems = (r) => r && Array.isArray(r.sections) && r.sections.length > 0;
  let reports = (Array.isArray(data.dailyReports) ? data.dailyReports : []).slice();
  if (hasItems(data.dailyReport) && !reports.some((r) => r.date === data.dailyReport.date)) {
    reports.unshift(data.dailyReport);
  }
  reports = reports.filter(hasItems);
  reports.sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));

  if (!reports.length) {
    root.innerHTML = '<div class="empty-state">今日日报还没生成（后端每天 0 点自动产出）。先去 <a href="/">精选首页</a> 看看。</div>';
    if (archiveBox) archiveBox.innerHTML = "";
    return;
  }

  const WEEK = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
  function dateTitle(dateStr) {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return esc(dateStr || "");
    return `${d.getFullYear()} 年 ${d.getMonth() + 1} 月 ${d.getDate()} 日 · ${WEEK[d.getDay()]}`;
  }
  function timeStr(item) {
    const v = item.publishedAt || item.date;
    const d = new Date(v);
    if (isNaN(d.getTime())) return "";
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    if (item.publishedAt) {
      return `${mm}-${dd} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
    }
    return `${mm}-${dd}`;
  }

  function renderReport(report) {
    const total = report.total || report.sections.reduce((n, s) => n + (s.items ? s.items.length : 0), 0);
    const allItems = report.sections.flatMap((s) => s.items || []);
    const sourceSet = new Set(allItems.map((i) => i.source).filter(Boolean));
    const modelCount = (report.sections.find((s) => s.category === "ai-models")?.items || []).length;
    const multiSrc = allItems.filter((i) => (i.sourceCount || 1) > 1).length;

    let n = 0;
    const sectionsHtml = report.sections
      .map((section) => {
        const items = (section.items || [])
          .map((item) => {
            n += 1;
            const url = item.url && /^https?:/.test(item.url) ? item.url : "#";
            const srcCount = Number(item.sourceCount) || 1;
            const srcBadge = srcCount > 1 ? `<span class="src-count">${srcCount} 信源</span>` : "";
            const score = Number(item.score) || 0;
            const reason = (item.reason || "").trim();
            return `
              <article class="daily-item">
                <h3><a href="${esc(url)}" target="_blank" rel="noopener">${n}. ${esc(item.title)}</a></h3>
                <div class="daily-meta">
                  <span class="daily-src">${esc(item.source)}</span>
                  <span>${timeStr(item)}</span>
                  ${srcBadge}
                  ${score ? `<span class="score-badge is-selected">质量 ${score}</span>` : ""}
                </div>
                ${item.summary ? `<p>${esc(item.summary)}</p>` : ""}
                ${reason ? `<p class="daily-reason"><strong>推荐理由：</strong>${esc(reason)}</p>` : ""}
              </article>`;
          })
          .join("");
        return `
          <section class="daily-section">
            <h2>${esc(section.label)} <small>${(section.items || []).length} 篇</small></h2>
            ${items}
          </section>`;
      })
      .join("");

    root.innerHTML = `
      <div class="daily-header">
        <h1>AI 日报</h1>
        <p class="daily-date">${dateTitle(report.date)}</p>
      </div>
      <div class="daily-stats">
        <div><strong>${total}</strong><span>今日事件</span></div>
        <div><strong>${modelCount}</strong><span>新模型</span></div>
        <div><strong>${multiSrc}</strong><span>多源聚合</span></div>
        <div><strong>${sourceSet.size}</strong><span>信源</span></div>
      </div>
      ${sectionsHtml}`;
  }

  function monthKeyOf(d) {
    return String(d || "").slice(0, 7); // 'YYYY-MM'
  }
  function monthLabelOf(key) {
    const [y, m] = String(key).split("-");
    return y && m ? `${y} 年 ${parseInt(m, 10)} 月` : "未注明日期";
  }
  const WEEK_SHORT = ["日", "一", "二", "三", "四", "五", "六"];
  function dayLabel(dateStr) {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return esc(dateStr || "最新");
    return `${d.getMonth() + 1} 月 ${d.getDate()} 日 · 周${WEEK_SHORT[d.getDay()]}`;
  }

  // 按月分组渲染（reports 已按日期倒序）：每月一个可折叠 <details>，
  // 当前查看的那天所在月份默认展开；点某天只切高亮，不重渲染，保留其它月份的展开状态。
  function renderArchive(activeIdx) {
    if (!archiveBox) return;
    const activeMonth = monthKeyOf(reports[activeIdx] && reports[activeIdx].date);
    const groups = [];
    const byKey = {};
    reports.forEach((r, i) => {
      const mk = monthKeyOf(r.date);
      if (!byKey[mk]) { byKey[mk] = { key: mk, items: [] }; groups.push(byKey[mk]); }
      byKey[mk].items.push({ r, i });
    });
    archiveBox.innerHTML = groups
      .map((g) => {
        const open = g.key === activeMonth ? " open" : "";
        const days = g.items
          .map(({ r, i }) => {
            const cnt = r.total || (r.sections || []).reduce((n, s) => n + (s.items ? s.items.length : 0), 0);
            return `<button type="button" data-idx="${i}" class="${i === activeIdx ? "is-active" : ""}">
                <span class="arc-date">${dayLabel(r.date)}</span>
                <span class="arc-cnt">${cnt} 条</span>
              </button>`;
          })
          .join("");
        return `<details class="arc-month"${open}>
            <summary><span class="arc-month-label">${monthLabelOf(g.key)}</span><span class="arc-month-cnt">${g.items.length} 天</span></summary>
            <div class="arc-month-days">${days}</div>
          </details>`;
      })
      .join("");
  }

  function setActive(idx) {
    archiveBox.querySelectorAll("button[data-idx]").forEach((b) => {
      b.classList.toggle("is-active", Number(b.dataset.idx) === idx);
    });
  }

  let current = 0;
  renderReport(reports[current]);
  renderArchive(current);

  if (archiveBox) {
    archiveBox.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-idx]");
      if (!btn) return;
      current = Number(btn.dataset.idx);
      renderReport(reports[current]);
      setActive(current); // 仅切高亮，保留各月份的折叠状态
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // 自动刷新：有新日报数据时自动更新页面
  (function () {
    const loadedAt = (window.AI_GENERATED_DATA && window.AI_GENERATED_DATA.generatedAt) || "";
    setInterval(async () => {
      try {
        const res = await fetch("/assets/data/generated-data.json?t=" + Date.now(), { cache: "no-store" });
        if (!res.ok) return;
        const d = await res.json();
        if (d.generatedAt && d.generatedAt !== loadedAt) location.reload();
      } catch (e) {}
    }, 120000);
  })();
})();

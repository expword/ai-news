(function () {
  const data = window.AI_NEWS_DATA;
  const params = new URLSearchParams(window.location.search);
  const topicId = params.get("id") || "ai-tools";
  const topic = (data.topics || []).find((item) => item.id === topicId) || (data.topics || [])[0] || {
    id: topicId, title: topicId, description: "", examples: []
  };
  const resources = (data.topicResources && data.topicResources[topic.id]) || [];

  // 用户向的固定文案（针对 12 个分类，每类一段"为什么/适合谁/选型提醒"）
  const CATEGORY_INFO = {
    "ai-tools": {
      pitch: "AI 工具的总入口：不知道用哪个 AI 时从这里开始。覆盖通用助手、AI 搜索、设计、办公、知识库等高频场景。",
      audience: "AI 新手、运营、学生、自由职业者——想用 AI 提效但不想研究底层技术的人。",
      intent: "用户最常搜的是「免费 AI 工具」「ChatGPT 替代品」「最好用的 AI」。挑工具时主要看：是否免费/有免费额度、中文体验、生成质量、是否易上手。",
      tips: [
        "免费版能跑通才有意义，先用免费额度试 3-5 天再付费",
        "中文用户优先选有官方中文界面或中文输出顺滑的工具",
        "做内容相关任务（写作、PPT）尽量选可导出且支持团队协作的"
      ]
    },
    "ai-coding": {
      pitch: "AI 编程工具不是只看谁更聪明，而是看它能不能理解你的项目、控制改动范围、生成测试、方便人工审查。",
      audience: "程序员、独立开发者、技术团队、希望减少重复编码的工程师。",
      intent: "用户关心：能不能用在公司项目（数据合规）、价格、IDE 集成度、对自己语言/框架的支持、和现有工具的协同。",
      tips: [
        "选有 .claude/CLAUDE.md 或类似配置机制的工具，才能让团队规范沉淀",
        "公司项目要确认 API 调用是否经过模型厂商训练（关闭数据共享）",
        "代码 Agent 必须配 git safety 限制，避免误删/误推",
        "先小步迭代再让它接管大功能，不要一开始就给整个项目"
      ]
    },
    "ai-image-video": {
      pitch: "创作类 AI 最重要的不是技术指标，而是结果可控：角色一致性、风格稳定、提示词可复用、商用规则清晰。",
      audience: "自媒体、设计师、电商、营销团队、视频创作者、独立创作者。",
      intent: "用户关心：商用版权、能不能保角色一致、动作/镜头可不可控、出图速度、对中文提示词的理解。",
      tips: [
        "商用一定要看官方版权条款（免费版常常禁止商用）",
        "角色一致性方面 Midjourney/Flux 通常优于普通 SD",
        "AI 视频：先测 5-10s 短片，质量满意再做长片，省 credit",
        "国内电商场景配合 Photoshop 或 InsMind 做后期更稳"
      ]
    },
    "ai-agents": {
      pitch: "智能体把「让 AI 帮我做完整任务」变成现实：调外部工具、操作浏览器/桌面、串多步流程。但生产可用度仍参差。",
      audience: "对自动化感兴趣的中级用户、想用 AI 跑工作流的开发者、企业 RPA 团队。",
      intent: "用户关心：能不能接自己的工具（MCP、API）、安全边界（权限、误操作）、稳定性、跑一次的成本。",
      tips: [
        "授权前看清能访问什么——尤其浏览器和桌面 Agent",
        "复杂工作流不要一次给 Agent，先拆 2-3 步看它能不能稳定走通",
        "MCP 是当前生态的胶水协议，优先选支持 MCP 的工具",
        "记录失败案例：哪些任务它做不好，给下次提示词留参考"
      ]
    },
    "ai-models": {
      pitch: "模型发布太多记不住没关系。选模型时只看四样：擅长任务、上下文长度、价格、是否支持你需要的语言。",
      audience: "想选 API 接进自己产品的开发者、做选型对比的产品经理、个人订阅决策者。",
      intent: "用户关心：怎么选 GPT/Claude/Gemini、API 价格、上下文长度、是否能本地部署、中文表现。",
      tips: [
        "聊天体验和 API 表现不一样，选 API 要看 benchmark 不是 LMArena",
        "国内访问建议用国产模型或合规代理（DeepSeek、Qwen、Kimi、GLM）",
        "上下文长度只是上限，不是越长越准——长文档要配 RAG",
        "API 价格变化快，做选型时用 vendor 的 pricing page 现场确认"
      ]
    },
    "ai-benchmark": {
      pitch: "榜单不要只看总分。先确认任务是否匹配你的场景，再看数据集、指标、更新频率和是否容易被训练污染。",
      audience: "做模型选型的产品经理/工程师、研究者、AI 内容站编辑、技术决策者。",
      intent: "用户关心：哪个榜单可信、Top 模型变化、不同任务上的差异、和自己的真实业务场景的关系。",
      tips: [
        "LMArena 测的是聊天偏好，不能代表代码或专业任务能力",
        "benchmark 容易被训练污染，看动态榜（LiveBench、LiveCodeBench）更靠谱",
        "用自己语料做 5-10 条小测试，比任何榜单都准",
        "不同评测 harness 跑出来的分数不能直接对比"
      ]
    },
    "ai-office": {
      pitch: "AI 办公的价值不是炫技，而是省掉重复劳动：整理资料、生成初稿、转成汇报、维护知识库。",
      audience: "职场用户、团队管理者、知识工作者、需要批量产出的内容/PPT/会议纪要用户。",
      intent: "用户关心：能不能直接出 PPT、长文档分析、会议纪要、表格分析，以及和自己已有工具（Notion、飞书、企业微信）的对接。",
      tips: [
        "AI 做 PPT 适合做初稿，演示前一定要人工调整字号和排版",
        "会议纪要工具要确认录音存储位置（本地 vs 云端）",
        "敏感内部资料不要扔进消费级 AI，用企业版或本地部署",
        "学生用 NotebookLM / Kimi 看长论文效率明显高于通用助手"
      ]
    },
    "ai-research": {
      pitch: "AI 研究类工具核心是：快速跟上论文趋势、找到代码与数据集、复现实验。不是为了「看起来在学习」而是产出研究成果。",
      audience: "研究生、学者、AI 工程师、产品技术研究、学术写作者。",
      intent: "用户关心：哪个 arXiv 工具最快、能不能批量总结论文、找到对应代码、做综述、追踪某领域趋势。",
      tips: [
        "AI 摘要不能代替读原文，关键结论一定要核对",
        "Papers with Code 是连接论文和代码最直接的入口",
        "做综述时用 Connected Papers / ResearchRabbit 找上下游论文",
        "Semantic Scholar 比 Google Scholar 更适合 API 调用"
      ]
    },
    "ai-business": {
      pitch: "AI 商业化的真问题不是「能不能赚钱」，而是「成本结构、客户复购率、监管和数据安全」。先看案例再决定方向。",
      audience: "创业者、副业从业者、AI 内容站站长、企业服务负责人、AI SaaS 团队。",
      intent: "用户关心：哪些 AI 业务跑通了、API 成本能不能 cover、获客方式、合规要求、是否需要备案。",
      tips: [
        "出海项目优先看支付（Stripe / Paddle）和注册门槛",
        "国内做 to B 服务要看是否需要 ICP 备案和算法备案",
        "AI 内容站靠 SEO 而不是社交，自然流量更稳定",
        "API 价格突然涨/降都可能拍死你的 unit economics"
      ]
    },
    "ai-audio": {
      pitch: "语音类 AI 拆成 ASR（识别）/ TTS（合成）/ 音频 embedding 三块看：评测指标完全不同，模型也不通用。",
      audience: "客服、教育、会议、配音、播客、字幕、媒体行业的语音工作者。",
      intent: "用户关心：识别准确率（WER）、自然度、说话人识别、多语种支持、延迟、商用价格。",
      tips: [
        "ASR 看 Open ASR Leaderboard 的 average WER 比单 dataset 准",
        "中文场景 Whisper Large v3 之外要考虑 Qwen3-ASR、Doubao 等本土模型",
        "TTS 自然度差异很大，listening test 比 MOS 更准",
        "实时语音应用：第一字延迟比 WER 更重要"
      ]
    },
    "ai-retrieval": {
      pitch: "Embedding 和 RAG 不是装好就能用：选错模型 / 切片错 / 没 rerank，答案照样不准。先做小规模评测再上量。",
      audience: "做企业知识库的工程师、客服系统 / 文档搜索 / 法律金融科研问答场景。",
      intent: "用户关心：哪个 embedding 适合自己语料、多语言、长文本、价格、是否需要 reranker、向量库选型。",
      tips: [
        "MTEB 总分作参考，自己业务一定要用 50-100 条 query 验证",
        "中文/多语言场景看 MMTEB 分项，不只看英文总分",
        "切片 chunk 大小通常 300-800 token 比 1500 效果更好",
        "加 reranker 通常比换更强的 embedding 收益更大"
      ]
    },
    "ai-vision-doc": {
      pitch: "文档 AI 不只是 OCR：版面恢复、表格结构、公式、手写、扫描质量都会影响最终问答效果。",
      audience: "金融/法律/医疗的文档处理团队、合同处理、票据识别、企业资料数字化。",
      intent: "用户关心：能不能处理扫描件、表格结构识别准确率、公式、是否支持中文手写、能否本地部署。",
      tips: [
        "OCRBench 总分 ≠ 你的扫描件准确率，先拿真实样本测",
        "复杂表格用 OmniDocBench 类评测比单纯 OCRBench 准",
        "多页长文档要看是否支持版面恢复（不只是逐页文字）",
        "敏感文档（合同/病历）务必本地部署或选有合规承诺的服务"
      ]
    }
  };

  // === 渲染 ===
  document.title = `${topic.title} - AI 工具导航`;

  document.querySelector("#categoryTitle").textContent = topic.title;
  document.querySelector("#categoryDescription").textContent = topic.description || "";

  const info = CATEGORY_INFO[topic.id] || {};
  const pitchEl = document.querySelector("#categoryPitch");
  if (info.pitch) {
    pitchEl.textContent = info.pitch;
  } else {
    document.querySelector("#categoryIntro").style.display = "none";
  }

  // tags
  const tagsEl = document.querySelector("#categoryTags");
  tagsEl.innerHTML = (topic.examples || []).map((t) => `<span class="tag">${t}</span>`).join("");

  // audience section
  if (info.audience) {
    document.querySelector("#audience-section").hidden = false;
    document.querySelector("#categoryAudience").textContent = info.audience;
  }

  // intent section
  if (info.intent) {
    document.querySelector("#howto-section").hidden = false;
    document.querySelector("#categoryIntent").textContent = info.intent;
  }

  // tips section
  const tipsEl = document.querySelector("#categoryTips");
  const tipsSection = document.querySelector("#tips-section");
  if (info.tips && info.tips.length) {
    tipsEl.innerHTML = info.tips.map((t) => `<li>${t}</li>`).join("");
  } else {
    tipsSection.style.display = "none";
  }

  // resources
  const resourceGrid = document.querySelector("#resourceGrid");
  const countChip = document.querySelector("#categoryCount");
  const searchInput = document.querySelector("#resourceSearch");

  function matches(r, q) {
    if (!q) return true;
    return [r.name, r.provider, r.type, r.bestFor, r.description, r.watch, ...(r.useCases || [])]
      .filter(Boolean).join(" ").toLowerCase().includes(q.toLowerCase());
  }

  function resourceCard(item) {
    const useCases = (item.useCases || []).slice(0, 3);
    return `
      <a class="card-link" href="${item.url || "#"}" rel="noopener">
        <article class="resource-card-v2">
          <div class="resource-card-head">
            <span class="chip chip-muted">${item.provider || ""}</span>
            <span class="chip chip-accent">${item.type || "AI 工具"}</span>
          </div>
          <h3>${item.name}</h3>
          <p class="resource-card-best">${item.bestFor || ""}</p>
          <p class="resource-card-desc">${item.description || ""}</p>
          ${useCases.length ? `
            <div class="resource-card-usecases">
              <span class="muted-label">典型场景：</span>${useCases.join(" · ")}
            </div>
          ` : ""}
          ${item.watch ? `
            <div class="resource-card-watch">
              <span class="muted-label">⚠ 注意：</span>${item.watch}
            </div>
          ` : ""}
          <div class="resource-card-foot">
            <span class="source-name">${item.sourceName || ""}</span>
            <span class="resource-cta">访问 →</span>
          </div>
        </article>
      </a>
    `;
  }

  function renderResources(q = "") {
    const items = resources.filter((r) => matches(r, q));
    countChip.textContent = `${items.length} 个工具`;
    if (!items.length) {
      resourceGrid.innerHTML = `
        <div class="empty-state">
          这个分类还没有补充真实工具。可以编辑 <code>assets/data/data.js</code> 的 <code>topicResources["${topic.id}"]</code> 添加内容。
        </div>
      `;
      return;
    }
    resourceGrid.innerHTML = items.map(resourceCard).join("");
  }

  searchInput.addEventListener("input", (e) => renderResources(e.target.value));
  renderResources();
})();

window.AI_NEWS_DATA = {
  lastUpdated: "2026-05-22",
  categories: [
    { id: "all", name: "全部内容" },
    { id: "ai-tools", name: "AI 工具导航" },
    { id: "ai-coding", name: "AI 编程开" },
    { id: "ai-image-video", name: "AI 绘画视频" },
    { id: "ai-agents", name: "AI 智能" },
    { id: "ai-models", name: "AI 模型发布" },
    { id: "ai-benchmark", name: "大模型评" },
    { id: "ai-office", name: "AI 办公学习" },
    { id: "ai-research", name: "AI 论文开" },
    { id: "ai-business", name: "AI 商业变现" }
  ],
  homeChannels: [
    {
      id: "ai-tools",
      title: "精选 AI 工具",
      badge: "先看这里",
      promise: "不知道用哪个 AI？从这张清单开始",
      description: "ChatGPT、Claude、Gemini、Perplexity、Canva、Gamma 等常用工具按场景整理，适合新手快速选择",
      audience: "新手、运营、学生、自由职业者",
      highlights: ["通用助手", "AI 搜索", "设计/PPT", "知识"],
      href: "/pages/category.html?id=ai-tools"
    },
    {
      id: "ai-benchmark",
      title: "AI 榜单测评",
      badge: "选模型必看",
      promise: "别只看谁最火，先看它在哪个任务强",
      description: "汇总 LLM、ASR、TTS、OCR、Embedding、视频生成等专业榜单和数据集，帮你判断模型适合什么任务",
      audience: "开发者、产品经理、企业选型",
      highlights: ["SuperCLUE", "SWE-bench", "Open ASR", "MTEB"],
      href: "/pages/benchmark.html"
    },
    {
      id: "ai-coding",
      title: "开发者与 Agent",
      badge: "效率工具",
      promise: "从代码补全升级到能执行任务的 AI 工作流",
      description: "整理 Cursor、Copilot、Claude Code、MCP、UI Agent GitHub 新项目，适合做开发效率专题",
      audience: "程序员、独立开发者、技术团队",
      highlights: ["AI 编程", "MCP", "GitHub 周榜", "自动化"],
      href: "/pages/category.html?id=ai-coding"
    },
    {
      id: "ai-image-video",
      title: "创作与内容",
      badge: "流量入口",
      promise: "图片、视频、配音、脚本，一套内容生产入口",
      description: "覆盖 AI 绘画、AI 视频、TTS 配音、短视频素材和提示词模板，适合内容创作者和营销团队",
      audience: "自媒体、设计师、电商、营销",
      highlights: ["Runway", "Sora", "Midjourney", "TTS"],
      href: "/pages/category.html?id=ai-image-video"
    },
    {
      id: "ai-office",
      title: "办公与知识库",
      badge: "实用场景",
      promise: "AI 用到文档、会议、PPT、检索和知识库里",
      description: "整理 Gamma、Notion AI、RAG、Embedding、OCR 和文档理解工具，面向真实办公流程",
      audience: "职场用户、团队管理者、知识工作者",
      highlights: ["PPT", "会议纪要", "RAG", "OCR"],
      href: "/pages/category.html?id=ai-office"
    },
    {
      id: "ai-business",
      title: "学习与变现",
      badge: "长期内容",
      promise: "AI 用法沉淀成教程、Skill、项目和内容站",
      description: "整理 Skill 学习路径、AI 内容站、工具对比、商业案例和副业方向，适合做长尾 SEO 内容",
      audience: "站长、博主、创业者、学习者",
      highlights: ["Skill", "SEO", "AdSense", "案例"],
      href: "/pages/skills.html"
    }
  ],
  topics: [
    {
      id: "ai-tools",
      title: "AI 工具导航",
      keyword: "AI 工具导航、AI 工具大全、AI 工具推荐",
      description:
        "聚合写作、搜索、图片、视频、编程、办公和自动化工具，适合做工具收录页、榜单页和每月更新页",
      userIntent: "用户想快速找到可用工具，并比较免费额度、中文体验、适合场景",
      examples: ["ChatGPT", "Claude", "Gemini", "Perplexity", "Notion AI"]
    },
    {
      id: "ai-coding",
      title: "AI 编程开发",
      keyword: "AI 编程工具、代码生成工具、AI 开发助",
      description:
        "围绕开发者高价值关键词，整理代码补全、智能体开发、API、提示词工程和应用部署教程",
      userIntent: "用户希望提高开发效率，寻找可直接用于项目的工具和教程",
      examples: ["Codex", "Cursor", "GitHub Copilot", "Gemini API", "Claude Code"]
    },
    {
      id: "ai-image-video",
      title: "AI 绘画与 AI 视频",
      keyword: "AI 绘画工具、AI 视频生成、文生图工具",
      description:
        "覆盖图片生成、视频生成、海报设计、商品图、短视频素材和提示词案例，适合做教程流量",
      userIntent: "用户想知道哪个工具好用、如何出图、如何商用和如何写提示词",
      examples: ["Midjourney", "Runway", "Kling", "Sora", "Gemini Omni"]
    },
    {
      id: "ai-agents",
      title: "AI 智能体",
      keyword: "AI 智能体、Agent 平台、自动化工作",
      description:
        "追踪智能体平台、MCP、浏览器操作、工作流自动化和企业落地案例，适合承接新趋势搜索",
      userIntent: "用户想理解智能体能做什么，并找到低门槛搭建方案",
      examples: ["MCP", "Zapier Agents", "Manus", "Gemini Spark", "Claude Computer Use"]
    },
    {
      id: "ai-models",
      title: "AI 模型发布",
      keyword: "AI 模型最新消息、大模型发布、ChatGPT 最新版",
      description:
        "记录 OpenAI、Google、Anthropic、Meta、DeepSeek 等模型更新，补充简明解读和应用影响",
      userIntent: "用户想快速了解新模型能力、价格、上下文、API 和可用地区",
      examples: ["GPT", "Gemini", "Claude", "Llama", "DeepSeek"]
    },
    {
      id: "ai-benchmark",
      title: "中文大模型评测",
      keyword: "中文大模型评测、AI 模型排行榜、大模型选型",
      description:
        "借鉴 ReLE 等开源评测项目的内容结构，整理综合榜、商用模型榜、开源模型榜和垂直能力榜",
      userIntent: "用户想知道哪个模型在中文、推理、代码、工具调用或行业任务里更适合自己",
      examples: ["综合能力", "通用能力", "专业能力", "Coding", "Agent 工具调用"]
    },
    {
      id: "ai-office",
      title: "AI 办公学习",
      keyword: "AI 办公工具、AI 写作工具、AI 学习工具",
      description:
        "面向普通用户整理写作、PPT、表格、会议纪要、翻译、阅读和学习类 AI 应用",
      userIntent: "用户想用 AI 完成日常工作，不一定懂技术，需要清晰步骤和场景推荐",
      examples: ["Notion AI", "Gamma", "NotebookLM", "Canva", "Kimi"]
    },
    {
      id: "ai-research",
      title: "AI 论文开源",
      keyword: "AI 论文、开源大模型、机器学习论",
      description:
        "整理 arXiv、Papers with Code、Hugging Face 上的新论文、数据集和开源模型",
      userIntent: "用户想跟踪研究趋势，找到论文、代码、模型权重和复现实验资源",
      examples: ["arXiv", "Papers with Code", "Hugging Face", "OpenReview", "GitHub"]
    },
    {
      id: "ai-business",
      title: "AI 商业变现",
      keyword: "AI 副业、AI 创业项目、AI 商业应用",
      description:
        "关注 AI SaaS、出海工具、营销自动化、企业服务和内容变现，适合商业化长尾内容",
      userIntent: "用户想找到可落地的赚钱方向、案例和工具组合",
      examples: ["AI SaaS", "自动化获客", "AI 内容站", "跨境营销", "企业 AI 服务"]
    },
    {
      id: "ai-audio",
      title: "AI 语音音频",
      keyword: "ASR 语音识别、TTS 语音合成、音频模型榜",
      description:
        "收录语音识别、语音合成、音频表征、音乐和环境声模型榜单，适合做语音工具导航",
      userIntent: "用户想比较转写准确率、声音自然度、多语言支持、延迟和商用成本",
      examples: ["Open ASR", "TTSDS", "MINT-Bench", "SUPERB", "HEAR"]
    },
    {
      id: "ai-retrieval",
      title: "Embedding 与 RAG",
      keyword: "Embedding 模型榜单、RAG 评测、向量检索模",
      description:
        "整理 MTEB、BEIR、RAGTruth、CRAG 等检索和问答评测，适合知识库、搜索和企业问答场景",
      userIntent: "用户想知道哪 embedding、reranker 和 RAG 组合更适合自己的语料",
      examples: ["MTEB", "BEIR", "MIRACL", "RAGTruth", "CRAG"]
    },
    {
      id: "ai-vision-doc",
      title: "OCR 与文档理解",
      keyword: "OCRBench、DocVQA、文档理解模型榜",
      description:
        "关注 OCR、票据表格、文档问答、版面解析和多模态文档处理能力",
      userIntent: "用户想比较模型读图中文字、表格、公式、扫描件和复杂文档的能力",
      examples: ["OCRBench", "DocVQA", "IDP Leaderboard", "CC-OCR", "OmniDocBench"]
    }
  ],
  topicResources: {
    "ai-tools": [
      {
        name: "ChatGPT",
        provider: "OpenAI",
        type: "通用 AI 助手",
        bestFor: "写作、问答、图片理解、语音、代码、日常任",
        description: "OpenAI 的通用 AI 助手，适合作为普通用户和开发者的第一入口",
        useCases: ["写文章和邮件", "总结资料", "代码解释", "图片问答", "学习辅导"],
        watch: "重要内容仍需核对来源；企业资料建议使用团队或企业级权限管理",
        sourceName: "OpenAI ChatGPT",
        url: "https://chatgpt.com/"
      },
      {
        name: "Claude",
        provider: "Anthropic",
        type: "长文档与分析助手",
        bestFor: "长文档阅读、数据分析、写作、产品与代码协作",
        description: "Claude 强调深度协作、文件分析和长上下文工作流，适合处理资料密集型任务",
        useCases: ["阅读 PDF", "分析表格", "产品方案", "代码解释", "长文写作"],
        watch: "涉及敏感数据时要确认组织的数据政策和权限设置",
        sourceName: "Claude by Anthropic",
        url: "https://claude.com/product/overview"
      },
      {
        name: "Gemini",
        provider: "Google",
        type: "Google 生态 AI 助手",
        bestFor: "Gmail、Calendar、Maps、YouTube、Photos Google 生态任",
        description: "Gemini Google 的日 AI 助手，优势在于和 Google 产品生态连接",
        useCases: ["邮件整理", "日程规划", "YouTube 信息提取", "地图和旅行计", "图片辅助"],
        watch: "不同地区和账号类型的可用功能可能不同",
        sourceName: "Google Gemini",
        url: "https://gemini.google/about/"
      },
      {
        name: "Perplexity",
        provider: "Perplexity AI",
        type: "AI 搜索/答案引擎",
        bestFor: "带引用的网络搜索、资料调研、快速找来源",
        description: "Perplexity 更像搜索与问答结合的答案引擎，适合需要引用来源的资料查询",
        useCases: ["热点检", "资料来源整理", "竞品调研", "论文和新闻初"],
        watch: "引用链接也需要人工打开核对，避免来源失效或理解偏差",
        sourceName: "Perplexity Docs",
        url: "https://docs.perplexity.ai/docs/getting-started/quickstart"
      },
      {
        name: "Notion AI",
        provider: "Notion",
        type: "知识库与办公助手",
        bestFor: "团队知识库、文档写作、项目资料维",
        description: "Notion AI 适合放在团队知识库和项目文档里，用于查找、总结和更新资料",
        useCases: ["知识库问", "文档改写", "会议记录整理", "项目数据库维"],
        watch: "要先把团队文档结构整理好，否 AI 难以给出稳定答案",
        sourceName: "OpenAI Apps: Notion",
        url: "https://openai.com/business/apps/notion/"
      },
      {
        name: "Canva Magic Studio",
        provider: "Canva",
        type: "AI 设计工具",
        bestFor: "海报、社媒图、营销素材、轻量视频与文案",
        description: "Canva Magic Studio 把多 AI 设计功能集中 Canva 工作流里，适合非设计师做素材",
        useCases: ["社媒海报", "营销图片", "品牌文案", "图片编辑", "轻量视频"],
        watch: "商用时要检查素材、模板和生成内容的授权规则",
        sourceName: "Canva Magic Studio",
        url: "https://www.canva.com/magic/"
      },
      {
        name: "Gamma",
        provider: "Gamma",
        type: "AI 演示文稿/网页",
        bestFor: "PPT、提案、课程讲义、快速展示页",
        description: "Gamma AI 生成演示、文档和页面，适合快速把大纲变成可分享内容",
        useCases: ["商业提案", "课程课件", "产品介绍", "汇报文档"],
        watch: "复杂品牌模板和精细动画仍建议回到专业演示工具里打磨",
        sourceName: "Gamma Presentations",
        url: "https://gamma.app/products/presentations"
      },
      {
        name: "Hugging Face",
        provider: "Hugging Face",
        type: "模型与数据集平台",
        bestFor: "找开源模型、数据集、Spaces Demo、评测结",
        description: "Hugging Face 是开 AI 模型和数据集的重要入口，适合技术用户和内容站查资料",
        useCases: ["模型搜索", "数据集检", "Demo 体验", "榜单和评"],
        watch: "模型质量差异很大，使用前要看许可证、模型卡和社区反馈",
        sourceName: "Hugging Face Models",
        url: "https://huggingface.co/models"
      }
    ],
    "ai-coding": [
      {
        name: "OpenAI Codex",
        provider: "OpenAI",
        type: "AI Coding Agent",
        bestFor: "端到端开发任务、PR、重构、迁移、复杂代码修",
        description: "Codex OpenAI AI 编程伙伴，定位不只是代码补全，而是能承担较完整的软件开发任务",
        useCases: ["功能开", "复杂重构", "迁移", "PR 处理", "代码解释"],
        watch: "适合明确边界的工程任务；重要改动仍需要本地测试和人工 Review",
        sourceName: "OpenAI Codex",
        url: "https://openai.com/codex/"
      },
      {
        name: "Cursor",
        provider: "Anysphere",
        type: "AI 代码编辑",
        bestFor: "多文件修改、代码理解、重构、调",
        description: "Cursor 是面 AI 编程的代码编辑器，强调理解代码库和自然语言改代码",
        useCases: ["多文件重", "解释陌生项目", "生成测试", "Bug"],
        watch: "建议先让它读项目结构，再要求小步提交，避免一次性大改",
        sourceName: "Cursor Docs",
        url: "https://docs.cursor.com/"
      },
      {
        name: "GitHub Copilot",
        provider: "GitHub",
        type: "AI 编程助手",
        bestFor: "代码补全、IDE 辅助、解释代码、生成测",
        description: "GitHub Copilot GitHub AI 编程助手，适合嵌入日常 IDE GitHub 工作流",
        useCases: ["代码补全", "测试生成", "PR 辅助", "文档生成"],
        watch: "团队使用时要关注代码安全、许可证和组织策略",
        sourceName: "GitHub Copilot",
        url: "https://github.com/features/copilot"
      },
      {
        name: "Claude Code",
        provider: "Anthropic",
        type: "终端 AI Coding Agent",
        bestFor: "代码库级任务、终端工作流、多文件修改",
        description: "Claude Code Anthropic 的开发者工具，强调代码库理解、命令行工作流和多文件编辑",
        useCases: ["Bug", "重构", "读日", "生成 PR 说明", "MCP 工具调用"],
        watch: "需要清晰设置权限和工作目录，重要改动必须人 Review",
        sourceName: "Claude Code",
        url: "https://claude.com/product/claude-code"
      },
      {
        name: "Model Context Protocol",
        provider: "Anthropic / MCP",
        type: "Agent 工具连接协议",
        bestFor: "AI 助手连接文件、数据库、业务系统、开发工具和外部服务",
        description: "MCP 是连 AI 助手和外部系统的开放标准，适合开发者搭建可复用的工具调用能力",
        useCases: ["工具调用", "知识库连", "业务系统接入", "开发环境上下文"],
        watch: "连接真实系统时要关注权限边界、数据安全和工具调用日志",
        sourceName: "Model Context Protocol Docs",
        url: "https://modelcontextprotocol.io/docs/learn/architecture"
      },
      {
        name: "Zapier Agents",
        provider: "Zapier",
        type: "无代 AI Agent",
        bestFor: "AI Agent 接到 Zapier 的应用生态里，自动处理重复任",
        description: "Zapier Agents 可以创建 AI agents，并利用 Zapier 的应用连接能力自动化工作流程",
        useCases: ["销售跟", "邮件处理", "CRM 更新", "跨应用自动化"],
        watch: "适合业务流程自动化；涉及客户数据时要配置好权限和审批",
        sourceName: "Zapier Help",
        url: "https://help.zapier.com/hc/en-us/articles/24393442652557-Build-an-agent-in-Zapier-Agents"
      },
      {
        name: "UI-TARS Desktop",
        provider: "ByteDance",
        type: "桌面 GUI Agent",
        bestFor: "真实桌面和浏览器操作、自动化任务研究、GUI Agent 学习",
        description: "UI-TARS Desktop 是字节开源的多模态桌 Agent 项目，适合观察 AI 如何操作真实界面",
        useCases: ["桌面自动", "浏览器操", "Agent 研究", "开源项目学"],
        watch: "更适合研究和开发者尝试，生产环境要重点关注权限与可控性",
        sourceName: "GitHub UI-TARS Desktop",
        url: "https://github.com/bytedance/UI-TARS-desktop"
      }
    ],
    "ai-image-video": [
      {
        name: "Adobe Firefly",
        provider: "Adobe",
        type: "商业创意 AI Studio",
        bestFor: "品牌素材、图片、视频、音频、矢量与 Creative Cloud 工作",
        description: "Adobe Firefly 是面向创意团队的生成 AI 工具，强调商业安全和 Adobe 创意软件协同",
        useCases: ["品牌素材", "图片生成", "视频生成", "创意草图", "设计团队"],
        watch: "适合已有 Adobe 工作流的团队；要关注生成额度、版权说明和企业权限",
        sourceName: "Adobe Firefly",
        url: "https://www.adobe.com/products/firefly.html"
      },
      {
        name: "Runway",
        provider: "Runway",
        type: "AI 视频生成/编辑",
        bestFor: "文生视频、图生视频、创意短片、视频编",
        description: "Runway 提供生成式视频和创意 AI 工具，适合内容创作者和视频团队试验镜头",
        useCases: ["图生视频", "文生视频", "短片镜头", "视频风格"],
        watch: "生成结果仍可能不稳定，商业项目要预留筛选和后期时间",
        sourceName: "Runway Help",
        url: "https://help.runwayml.com/hc/en-us/articles/37425232841875-Getting-Started-with-Generative-Video"
      },
      {
        name: "Sora",
        provider: "OpenAI",
        type: "AI 视频生成",
        bestFor: "高真实感视频、动画风格视频、创意短",
        description: "Sora OpenAI 的视频生成产品，可从提示词或图片生成不同风格的视频",
        useCases: ["短片概念", "广告分镜", "动画素材", "创意实验"],
        watch: "人物、版权、真实事件和品牌素材要特别注意合规",
        sourceName: "OpenAI Sora",
        url: "https://openai.com/sora/"
      },
      {
        name: "Veo",
        provider: "Google DeepMind",
        type: "AI 视频生成模型",
        bestFor: "高质量视频生成、短片创意、带音频的视频生成探",
        description: "Veo Google DeepMind 的视频生成模型，可在 Gemini、Flow、API Vertex AI 等产品中使用",
        useCases: ["文生视频", "图生视频", "短片概念", "创意广告", "视频原型"],
        watch: "真实人物、新闻事件、品牌素材和深度伪造风险需要特别注意",
        sourceName: "Google DeepMind Veo",
        url: "https://deepmind.google/models/veo/"
      },
      {
        name: "Midjourney",
        provider: "Midjourney",
        type: "AI 图像生成",
        bestFor: "高质量视觉概念、插画、风格图、创意探",
        description: "Midjourney 适合生成高质量图像和风格化视觉概念，常用于设计灵感和创意素材",
        useCases: ["视觉概念", "插画", "海报风格", "角色探索"],
        watch: "正式商用前要检查订阅条款、素材来源和品牌合规",
        sourceName: "Midjourney Docs",
        url: "https://docs.midjourney.com/docs/explore-page"
      },
      {
        name: "Pika",
        provider: "Pika Labs",
        type: "AI 短视频生成平",
        bestFor: "短视频、社媒素材、文图片/视频驱动的动画生",
        description: "Pika 面向社交内容和短视频创作，支持多种画幅，适合快速生成短片素材",
        useCases: ["短视", "社媒广告", "动效素材", "创意实验"],
        watch: "更适合短内容和概念验证，长片和复杂叙事仍要后期剪辑",
        sourceName: "Pika Labs",
        url: "https://pikaslabs.com/"
      },
      {
        name: "ElevenLabs",
        provider: "ElevenLabs",
        type: "AI TTS / 配音",
        bestFor: "多语言配音、有情绪的旁白、实时语音、声音克",
        description: "ElevenLabs 文本转语音支持多语言、不同声音风格和情绪表达，适合视频配音和有声内容",
        useCases: ["短视频配", "有声", "广告旁白", "多语言内容", "语音 Agent"],
        watch: "声音克隆和人物声音使用要注意授权、肖声音权和平台规则",
        sourceName: "ElevenLabs TTS Docs",
        url: "https://elevenlabs.io/docs/capabilities/text-to-speech"
      },
      {
        name: "Synthesia",
        provider: "Synthesia",
        type: "AI Avatar 视频",
        bestFor: "企业培训、产品讲解、内部沟通、多语言视频",
        description: "Synthesia 是面向企业的视频生成平台，适合 AI avatar 制作培训和沟通视频",
        useCases: ["培训视频", "产品说明", "内部沟", "多语言本地"],
        watch: "企业内容要检查头像授权、品牌规范和内部合规审批",
        sourceName: "Synthesia Help",
        url: "https://help.synthesia.io/en/articles/9994493-what-is-synthesia"
      }
    ],
    "ai-office": [
      {
        name: "NotebookLM",
        provider: "Google",
        type: "AI 研究与知识助",
        bestFor: "基于自己上传的资料做问答、摘要、学习和研究整理",
        description: "NotebookLM Google AI 研究和思考伙伴，适合把资料放进一 notebook 后做问答和总结",
        useCases: ["资料问答", "学习笔记", "研究整理", "播客式摘"],
        watch: "回答依赖你提供的资料质量；重要结论要回到原文核对",
        sourceName: "Google NotebookLM",
        url: "https://notebooklm.google/"
      },
      {
        name: "Microsoft Copilot",
        provider: "Microsoft",
        type: "Microsoft 365 AI 助手",
        bestFor: "Office、Teams、Outlook、Edge Microsoft 生态工作流",
        description: "Microsoft Copilot 面向 Microsoft 生态，适合邮件、会议、文档、企业工作流辅助",
        useCases: ["邮件处理", "会议总结", "文档生成", "企业搜索"],
        watch: "企业使用要确认许可证、数据边界和管理员策略",
        sourceName: "Microsoft Copilot Support",
        url: "https://support.microsoft.com/en-us/microsoft-copilot/getting-started-with-microsoft-copilot"
      },
      {
        name: "Gamma",
        provider: "Gamma",
        type: "AI PPT/文档",
        bestFor: "汇报、提案、课程讲",
        description: "把大纲快速生成演示文稿、网页或文档，适合先出版本再人工打磨",
        useCases: ["周报", "销售提", "课程内容", "产品介绍"],
        watch: "品牌精修和复杂排版建议导出后继续编辑",
        sourceName: "Gamma Presentations",
        url: "https://gamma.app/products/presentations"
      },
      {
        name: "Notion AI",
        provider: "Notion",
        type: "知识 AI",
        bestFor: "团队文档、项目管理、资料总结",
        description: "适合在团队文档和数据库中查找答案、总结内容、更新资料",
        useCases: ["项目文档", "会议纪要", "知识库问", "任务整理"],
        watch: "依赖知识库质量，先整理页面结构效果更好",
        sourceName: "OpenAI Apps: Notion",
        url: "https://openai.com/business/apps/notion/"
      },
      {
        name: "Otter",
        provider: "Otter.ai",
        type: "AI 会议记录",
        bestFor: "会议转写、会议摘要、行动项、协作笔",
        description: "Otter 提供会议转写、AI 摘要、行动项和聊天式查询，适合会议密集团队",
        useCases: ["会议转写", "行动", "会议摘要", "团队共享"],
        watch: "录音和自动入会涉及隐私与会议同意，需要提前告知参会者",
        sourceName: "Otter Help",
        url: "https://help.otter.ai/hc/en-us/articles/4425393298327-Otter-Notetaker-Overview"
      },
      {
        name: "Fireflies",
        provider: "Fireflies.ai",
        type: "AI 会议助手",
        bestFor: "会议转写、结构化摘要、行动项、跨会议搜索",
        description: "Fireflies 用于记录和总结会议，并提取关键主题、行动项和团队讨论内容",
        useCases: ["会议纪要", "行动", "销售会", "知识沉淀"],
        watch: "同样需要注意会议录音合规、权限和团队隐私规则",
        sourceName: "Fireflies",
        url: "https://firefliesai.ai/"
      }
    ]
  },
  benchmarkRanks: [
    { rank: 1, model: "qwen3.5-plus", vendor: "阿里", score: "66%" },
    { rank: 2, model: "gpt-5.4", vendor: "OpenAI", score: "63%" },
    { rank: 3, model: "gemini-3.1-pro-preview", vendor: "Google", score: "63%" },
    { rank: 4, model: "claude-opus-4.6", vendor: "Anthropic", score: "61%" },
    { rank: 5, model: "Doubao-Seed-2.0-mini", vendor: "字节跳动", score: "61%" },
    { rank: 6, model: "gpt-5.4-high", vendor: "OpenAI", score: "61%" },
    { rank: 7, model: "Kimi-K2.5-Thinking", vendor: "月之暗面", score: "60%" },
    { rank: 8, model: "Doubao-Seed-2.0-pro", vendor: "字节跳动", score: "60%" }
  ],
  benchmarkDimensions: [
    {
      name: "教育能力",
      detail: "小学、初中、高中、高考等题型适合扩展成学习工具和教育模型专题"
    },
    {
      name: "医疗与心理健",
      detail: "适合做风险提示和能力边界分析，注意不要写成医疗建议"
    },
    {
      name: "金融能力",
      detail: "可拆成财务、银行、保险、证券等关键词专题，内容要强调信息参考属性"
    },
    {
      name: "法律与行政公",
      detail: "适合做法规检索、考试辅助和文书生成场景的工具导航"
    },
    {
      name: "推理与数学计",
      detail: "适合做模型推理能力、数学能力、表格问答和逻辑题对比"
    },
    {
      name: "语言与指令遵",
      detail: "适合承接中文写作、信息抽取、阅读理解、情感分析等搜索词"
    },
    {
      name: "Agent 与工具调",
      detail: "适合结合 MCP、函数调用、浏览器操作和自动化工作流做内容"
    },
    {
      name: "Coding 能力",
      detail: "适合连接 AI 编程工具、代码生成、终端任务和开发者效率内容"
    }
  ],
  selectionGuides: [
    {
      title: "按任务选模型",
      text: "把写作、代码、数学、表格、长文档、工具调用拆开评估，避免只看综合分"
    },
    {
      title: "按成本选模型",
      text: "记录输入输出价格、平均耗时 token 消耗，形成“便宜但够用”的长尾内容"
    },
    {
      title: "按中文能力选模型",
      text: "重点看中文指令遵从、阅读理解、成语、错别字、繁简转换等本地化能力"
    },
    {
      title: "按行业选模型",
      text: "教育、金融、法律等行业页面要加风险说明，避免承诺模型能替代专业人士"
    }
  ],
  benchmarkBoards: [
    {
      title: "SuperCLUE 智能指数",
      type: "中文综合",
      description: "覆盖数学推理、科学推理、代码生成、指令遵循、幻觉控制和智能体任务规划，适合看中文应用侧模型能力",
      datasets: ["SuperCLUE", "SuperCLUE-Math", "SuperCLUE-Agent", "SuperCLUE-Code"],
      rankingMetric: "SuperCLUE 智能指数综合",
      rankingUpdated: "官方动态页",
      rankingSourceName: "SuperCLUE 官方榜单",
      rankingSourceUrl: "https://www.superclueai.com/",
      rankings: [
        { rank: 1, name: "Claude-Opus-4.6(max)", score: "77.02", note: "Anthropic / 海外参</ 闭源" },
        { rank: 2, name: "Gemini-3.1-Pro-Preview(high)", score: "76.69", note: "Google / 海外参</ 闭源" },
        { rank: 3, name: "GPT-5.4(xhigh)", score: "72.48", note: "OpenAI / 海外参</ 闭源" },
        { rank: 4, name: "Doubao-Seed-2.0-pro-260215(high)", score: "71.53", note: "字节跳动 / 国内原榜" },
        { rank: 5, name: "Gemini-3-Flash-Preview(high)", score: "68.84", note: "Google / 海外参</ 闭源" },
        { rank: 6, name: "Grok-4.20-Beta-0309(Reasoning)", score: "66.07", note: "xAI / 海外参</ 闭源" },
        { rank: 7, name: "Kimi-K2.5-Thinking", score: "64.60", note: "月之暗面 / 国内原榜并列" },
        { rank: 8, name: "Qwen3.5-397B-A17B-Thinking", score: "64.48", note: "阿里巴巴 / 国内原榜并列" },
        { rank: 9, name: "GLM-5", score: "64.27", note: "智谱 AI / 国内原榜并列" },
        { rank: 10, name: "DeepSeek-V3.2-Thinking", score: "61.92", note: "深度求索 / 国内原榜" },
        { rank: 11, name: "MiMo-V2-Pro", score: "60.67", note: "小米集团 / 国内原榜" },
        { rank: 12, name: "Tencent HY 2.0 Think", score: "59.16", note: "腾讯 / 国内原榜并列" },
        { rank: 13, name: "Qwen3.5-122B-A10B-Thinking", score: "58.53", note: "阿里巴巴 / 国内原榜并列" },
        { rank: 14, name: "LongCat-Flash-Thinking-2601", score: "57.47", note: "美团 / 国内原榜" },
        { rank: 15, name: "gpt-oss-120b(high)", score: "57.07", note: "OpenAI / 海外参</ 开" },
        { rank: 16, name: "Step-3.5-Flash", score: "56.23", note: "阶跃星辰 / 国内原榜并列" },
        { rank: 17, name: "MiniMax-M2.5", score: "55.96", note: "稀宇科技 / 国内原榜并列" },
        { rank: 18, name: "MiniMax-M2.7", score: "55.68", note: "稀宇科技 / 国内原榜并列" },
        { rank: 19, name: "Spark X2", score: "52.79", note: "科大讯飞 / 国内原榜" },
        { rank: 20, name: "MiMo-V2-Flash", score: "49.97", note: "小米集团 / 国内原榜" }
      ],
      source: "SuperCLUE",
      url: "https://www.superclueai.com/"
    },
    {
      title: "OpenCompass / CompassRank",
      type: "开放评测平",
      description: "一站式大模型评测平台，支持公开模型 API 模型，覆盖多维能力和大量数据集，适合做综合对照",
      datasets: ["C-Eval", "CMMLU", "MMLU", "AGIEval", "GSM8K"],
      rankingMetric: "OpenCompass HLE score",
      rankingUpdated: "BenchGecko 快照 026-02-16",
      rankingSourceName: "BenchGecko OpenCompass HLE",
      rankingSourceUrl: "https://benchgecko.ai/benchmark/oc-hle",
      rankings: [
        { rank: 1, name: "DeepSeek V3.2 Speciale", score: "28.6", note: "DeepSeek" },
        { rank: 2, name: "Kimi K2.5", score: "28.6", note: "moonshotai" },
        { rank: 3, name: "GLM 5", score: "28.1", note: "z-ai" },
        { rank: 4, name: "Qwen3.5 397B A17B", score: "27.5", note: "Alibaba Qwen" },
        { rank: 5, name: "GLM 4.7", score: "25.4", note: "z-ai" },
        { rank: 6, name: "DeepSeek V3.2", score: "23.2", note: "DeepSeek" },
        { rank: 7, name: "MiniMax M2.5", score: "22.2", note: "minimax" },
        { rank: 8, name: "Step 3.5 Flash", score: "21.6", note: "stepfun" },
        { rank: 9, name: "Kimi K2 Thinking", score: "21.3", note: "moonshotai" },
        { rank: 10, name: "Gemini 2.5 Pro", score: "21.1", note: "Google DeepMind" },
        { rank: 11, name: "MiMo-V2-Flash", score: "20.5", note: "xiaomi" },
        { rank: 12, name: "GLM 4.6", score: "19.3", note: "z-ai" },
        { rank: 13, name: "Qwen3 235B A22B Thinking 2507", score: "18.5", note: "Alibaba Qwen" },
        { rank: 14, name: "gpt-oss-120b (free)", score: "18.3", note: "OpenAI" },
        { rank: 15, name: "GLM 4.5", score: "16.9", note: "z-ai" },
        { rank: 16, name: "R1 0528", score: "14.4", note: "DeepSeek" },
        { rank: 17, name: "Qwen3 Next 80B A3B Thinking", score: "13.5", note: "Alibaba Qwen" },
        { rank: 18, name: "MiniMax M2", score: "13.4", note: "minimax" },
        { rank: 19, name: "Qwen3 235B A22B Instruct 2507", score: "12.3", note: "Alibaba Qwen" },
        { rank: 20, name: "Qwen3 30B A3B Thinking 2507", score: "11.7", note: "Alibaba Qwen" }
      ],
      source: "OpenCompass",
      url: "https://github.com/open-compass/opencompass"
    },
    {
      title: "C-Eval",
      type: "中文学科知识",
      description: "多层级、多学科中文评测套件，适合看模型在中文考试、知识和推理题上的基础表现",
      datasets: ["C-Eval"],
      rankingMetric: "C-Eval average accuracy",
      rankingUpdated: "BenchLM 快照 026-05-07",
      rankingSourceName: "BenchLM C-Eval",
      rankingSourceUrl: "https://benchlm.ai/benchmarks/cEval",
      rankings: [
        { rank: 1, name: "Qwen3.6 Plus", score: "93.3%", note: "Alibaba" },
        { rank: 2, name: "DeepSeek V4 Pro Base", score: "93.1%", note: "DeepSeek" },
        { rank: 3, name: "Qwen3.5 397B", score: "93.0%", note: "Alibaba" }
      ],
      source: "C-Eval Benchmark",
      url: "https://cevalbenchmark.com/index.html"
    },
    {
      title: "CMMLU",
      type: "中文多任务理解榜",
      description: "覆盖 67个中文主题，包含中国特定知识，适合评估中文语境下的知识和推理能力",
      datasets: ["CMMLU"],
      rankingMetric: "CMMLU score",
      rankingUpdated: "BenchGecko 快照 024-09-19",
      rankingSourceName: "BenchGecko CMMLU",
      rankingSourceUrl: "https://benchgecko.ai/benchmark/cmmlu",
      rankings: [
        { rank: 1, name: "Qwen2-72B", score: "89.7", note: "Alibaba / Qwen" },
        { rank: 2, name: "Qwen2.5 72B Instruct", score: "85.7", note: "Alibaba / Qwen" },
        { rank: 3, name: "GPT-4 Turbo", score: "71.0", note: "OpenAI" },
        { rank: 4, name: "Llama 3.1 70B Instruct", score: "64.4", note: "Meta" },
        { rank: 5, name: "Qwen-14B", score: "58.7", note: "Alibaba / Qwen" },
        { rank: 6, name: "Falcon-180B", score: "41.5", note: "TII" },
        { rank: 7, name: "LLaMA-13B", score: "39.8", note: "Meta" },
        { rank: 8, name: "Llama 3 70B Instruct", score: "36.9", note: "Meta" }
      ],
      source: "CMMLU GitHub",
      url: "https://github.com/haonan-li/CMMLU"
    },
    {
      title: "LMArena / Chatbot Arena",
      type: "人类偏好竞技",
      description: "通过匿名成对比较收集用户偏好，适合看聊天体验、回答风格和真实用户选择，但不等于专业任务能力",
      datasets: ["Arena Votes", "Vision Arena", "WebDev Arena"],
      rankingMetric: "Arena Score / Votes",
      rankingUpdated: "官方页面抓取：约 2026-05",
      rankingSourceName: "LMArena Text Leaderboard",
      rankingSourceUrl: "https://arena.ai/leaderboard/",
      rankings: [
        { rank: 1, name: "claude-opus-4-6-thinking", score: "1502", note: "Anthropic / 24,925 votes" },
        { rank: 2, name: "claude-opus-4-7-thinking", score: "1501", note: "Anthropic / 10,413 votes" },
        { rank: 3, name: "claude-opus-4-6", score: "1498", note: "Anthropic / 26,459 votes" },
        { rank: 4, name: "claude-opus-4-7", score: "1492", note: "Anthropic / 11,006 votes" },
        { rank: 5, name: "muse-spark", score: "1491", note: "Meta / Preliminary" },
        { rank: 6, name: "gemini-3.1-pro-preview", score: "1490", note: "Google / 31,012 votes" },
        { rank: 7, name: "gemini-3-pro", score: "1486", note: "Google / 41,339 votes" },
        { rank: 8, name: "gpt-5.5-high", score: "1484", note: "OpenAI / 7,877 votes" },
        { rank: 9, name: "grok-4.20-beta1", score: "1479", note: "xAI / 20,258 votes" },
        { rank: 10, name: "gpt-5.4-high", score: "1479", note: "OpenAI / 18,521 votes" },
        { rank: 11, name: "gpt-5.2-chat-latest-20260210", score: "1477", note: "OpenAI / 25,130 votes" },
        { rank: 12, name: "grok-4.20-beta-0309-reasoning", score: "1477", note: "xAI / 18,895 votes" },
        { rank: 13, name: "gpt-5.5", score: "1476", note: "OpenAI / 7,982 votes" },
        { rank: 14, name: "grok-4.20-multi-agent-beta-0309", score: "1474", note: "xAI / 19,137 votes" },
        { rank: 15, name: "gemini-3-flash", score: "1474", note: "Google / 30,753 votes" },
        { rank: 16, name: "ernie-5.1", score: "1473", note: "Baidu / 6,949 votes" },
        { rank: 17, name: "claude-opus-4-5-thinking-32k", score: "1473", note: "Anthropic / 37,127 votes" },
        { rank: 18, name: "gpt-5.5-instant", score: "1472", note: "OpenAI / 4,927 votes" },
        { rank: 19, name: "glm-5.1", score: "1471", note: "Z.ai / 11,485 votes" },
        { rank: 20, name: "claude-opus-4-5", score: "1468", note: "Anthropic / 56,217 votes" }
      ],
      source: "LMArena",
      url: "https://arena.ai/leaderboard/"
    },
    {
      title: "Hugging Face Leaderboards",
      type: "开源模型榜",
      description: "聚合官方数据集评测和社区榜单，适合找开源模型、复现实验和模型卡中的标准化结果",
      datasets: ["MMLU-Pro", "GPQA", "MATH", "IFEval", "BBH"],
      rankingMetric: "Open-source model composite score",
      rankingUpdated: "LMMarketCap 快照 026-05-22",
      rankingSourceName: "LMMarketCap Open-Source LLM Leaderboard",
      rankingSourceUrl: "https://lmmarketcap.com/leaderboards/open-llm-leaderboard",
      rankings: [
        { rank: 1, name: "DeepSeek V4 Pro", score: "86", note: "DeepSeek" },
        { rank: 2, name: "Gemma 4 31B (free)", score: "80", note: "Google" },
        { rank: 3, name: "Gemma 4 31B", score: "80", note: "Google" },
        { rank: 4, name: "Qwen3.5 397B A17B", score: "79", note: "Alibaba" },
        { rank: 5, name: "R1 0528", score: "79", note: "DeepSeek" },
        { rank: 6, name: "MiniMax M2.5 (free)", score: "78", note: "MiniMax" },
        { rank: 7, name: "MiniMax M2.5", score: "78", note: "MiniMax" },
        { rank: 8, name: "GLM 5", score: "78", note: "Zhipu AI" },
        { rank: 9, name: "Qwen3.5-122B-A10B", score: "77", note: "Alibaba" },
        { rank: 10, name: "DeepSeek V4 Flash", score: "77", note: "DeepSeek" },
        { rank: 11, name: "Gemma 2 27B", score: "77", note: "Google" },
        { rank: 12, name: "Qwen3.5-27B", score: "77", note: "Alibaba" },
        { rank: 13, name: "DeepSeek V4 Flash (free)", score: "76", note: "DeepSeek" },
        { rank: 14, name: "GLM 5.1", score: "76", note: "Zhipu AI" },
        { rank: 15, name: "Qwen3.5-35B-A3B", score: "76", note: "Alibaba" },
        { rank: 16, name: "Kimi K2.6", score: "76", note: "Moonshot AI" },
        { rank: 17, name: "MiMo-V2.5-Pro", score: "75", note: "Xiaomi" },
        { rank: 18, name: "GLM 4.5", score: "75", note: "Zhipu AI" },
        { rank: 19, name: "R1", score: "74", note: "DeepSeek" },
        { rank: 20, name: "Gemma 4 26B A4B (free)", score: "73", note: "Google" }
      ],
      source: "Hugging Face Docs",
      url: "https://huggingface.co/docs/leaderboards/main/index"
    },
    {
      title: "SWE-bench",
      type: "真实软件工程",
      description: "用真 GitHub issue 和补丁任务评估模 Agent 修复代码问题的能力，适合 AI 编程 Agent",
      datasets: ["SWE-bench", "SWE-bench Verified"],
      rankingMetric: "SWE-bench Verified resolved %",
      rankingUpdated: "Megadose 快照 026-05-22",
      rankingSourceName: "Megadose SWE-bench Verified",
      rankingSourceUrl: "https://megadose.ai/b/swebench-verified",
      rankings: [
        { rank: 1, name: "Claude Opus 4.5", score: "79.2%", note: "Captured 2025-12-15" },
        { rank: 2, name: "Doubao Seed Code", score: "78.8%", note: "Captured 2025-09-28" },
        { rank: 3, name: "Gemini 3 Pro", score: "77.4%", note: "Captured 2025-11-20" },
        { rank: 4, name: "Claude Sonnet 4", score: "76.8%", note: "Captured 2025-08-04" },
        { rank: 5, name: "Gemini 3 Flash", score: "75.8%", note: "Captured 2026-02-17" },
        { rank: 6, name: "MiniMax M2.5", score: "75.8%", note: "Captured 2026-02-17" },
        { rank: 7, name: "Claude Opus 4.6", score: "75.6%", note: "Captured 2026-02-17" },
        { rank: 8, name: "Claude Sonnet 4.5", score: "74.8%", note: "Captured 2025-11-03" },
        { rank: 9, name: "GPT-5", score: "74.4%", note: "Captured 2025-10-15" },
        { rank: 10, name: "Claude Opus 4", score: "73.2%", note: "Captured 2025-05-22" },
        { rank: 11, name: "GPT-5.2", score: "72.8%", note: "Captured 2026-02-19" },
        { rank: 12, name: "GLM-5", score: "72.8%", note: "Captured 2026-02-17" },
        { rank: 13, name: "Kimi K2", score: "71.2%", note: "Captured 2025-10-14" },
        { rank: 14, name: "DeepSeek V3", score: "70.0%", note: "Captured 2026-02-17" },
        { rank: 15, name: "Qwen 3 Coder", score: "69.6%", note: "Captured 2025-08-05" },
        { rank: 16, name: "GLM-4.6", score: "68.2%", note: "Captured 2025-09-30" },
        { rank: 17, name: "Claude Haiku 4.5", score: "66.6%", note: "Captured 2026-02-17" },
        { rank: 18, name: "Claude 3.7 Sonnet", score: "66.4%", note: "Captured 2025-05-14" },
        { rank: 19, name: "GPT-5.1", score: "66.0%", note: "Captured 2025-11-24" },
        { rank: 20, name: "Claude 3.5 Sonnet", score: "62.8%", note: "Captured 2025-02-28" }
      ],
      source: "SWE-bench",
      url: "https://www.swebench.com/"
    },
    {
      title: "Berkeley Function Calling Leaderboard",
      type: "工具调用",
      description: "评估函数调用、API 调用、参数选择和拒绝无关工具的能力，适合 Agent 与工具调用可靠性",
      datasets: ["BFCL", "BFCL V2", "BFCL V3"],
      rankingMetric: "BFCL V3 accuracy",
      rankingUpdated: "PricePerToken 快照 026-05-07",
      rankingSourceName: "PricePerToken BFCL V3",
      rankingSourceUrl: "https://pricepertoken.com/leaderboards/benchmark/bfcl-v3",
      rankings: [
        { rank: 1, name: "GLM 4.5 Thinking", score: "76.7", note: "Z.AI / tool calling accuracy" },
        { rank: 2, name: "Qwen3 32B Thinking", score: "75.7", note: "Alibaba" },
        { rank: 3, name: "Qwen3 32B", score: "75.7", note: "Alibaba" },
        { rank: 4, name: "Qwen3 Max", score: "74.9", note: "Alibaba" },
        { rank: 5, name: "Qwen3 Max", score: "74.9", note: "Alibaba / duplicate reported variant" },
        { rank: 6, name: "GLM-4.7-Flash Thinking", score: "74.6", note: "Z.AI" },
        { rank: 7, name: "GLM-4.7-Flash", score: "74.6", note: "Z.AI" },
        { rank: 8, name: "GLM 4.5 Air", score: "69.1", note: "Z.AI" },
        { rank: 9, name: "Nova Pro 1.0", score: "67.9", note: "Amazon" },
        { rank: 10, name: "Kimi K2.5 Thinking", score: "64.5", note: "Moonshot AI" },
        { rank: 11, name: "Kimi K2.5", score: "64.5", note: "Moonshot AI" },
        { rank: 12, name: "INTELLECT-3", score: "63.5", note: "Prime Intellect" },
        { rank: 13, name: "Llama 4 Scout", score: "55.7", note: "Meta" },
        { rank: 14, name: "Gemini 3 Flash Preview Thinking", score: "53.5", note: "Google" },
        { rank: 15, name: "MiniMax M1", score: "47.8", note: "MiniMax" },
        { rank: 16, name: "MiniMax M1", score: "47.8", note: "MiniMax / duplicate reported variant" },
        { rank: 17, name: "Nemotron 3 Nano 30B A3B Thinking", score: "41.6", note: "NVIDIA" },
        { rank: 18, name: "Nemotron 3 Nano 30B A3B", score: "41.6", note: "NVIDIA" },
        { rank: 19, name: "Phi 4", score: "40.8", note: "Microsoft" },
        { rank: 20, name: "Claude Opus 4 Thinking", score: "25.3", note: "Anthropic" }
      ],
      source: "UC Berkeley Gorilla",
      url: "https://gorilla.cs.berkeley.edu/blogs/8_berkeley_function_calling_leaderboard.html"
    },
    {
      title: "LiveCodeBench",
      type: "代码能力",
      description: "持续收集新竞赛题，评估代码生成、修复、执行和输出预测，比旧代码题更能降低污染风险",
      datasets: ["LiveCodeBench"],
      rankingMetric: "LiveCodeBench score",
      rankingUpdated: "BenchLM 快照 026-05-21",
      rankingSourceName: "BenchLM LiveCodeBench",
      rankingSourceUrl: "https://benchlm.ai/benchmarks/liveCodeBench",
      rankings: [
        { rank: 1, name: "DeepSeek V4 Pro (Max)", score: "93.5%", note: "DeepSeek" },
        { rank: 2, name: "Qwen3.7 Max", score: "91.6%", note: "Alibaba" },
        { rank: 3, name: "DeepSeek V4 Flash (Max)", score: "91.6%", note: "DeepSeek" },
        { rank: 4, name: "DeepSeek V4 Pro (High)", score: "89.8%", note: "DeepSeek" },
        { rank: 5, name: "Kimi K2.6", score: "89.6%", note: "Moonshot AI" },
        { rank: 6, name: "DeepSeek V4 Flash (High)", score: "88.4%", note: "DeepSeek" },
        { rank: 7, name: "Kimi K2.5", score: "85.0%", note: "Moonshot AI" },
        { rank: 8, name: "GLM-4.7", score: "84.9%", note: "Z.AI" },
        { rank: 9, name: "Qwen3.6-27B", score: "83.9%", note: "Alibaba" },
        { rank: 10, name: "Qwen3.6-35B-A3B", score: "80.4%", note: "Alibaba" },
        { rank: 11, name: "Nemotron 3 Nano Omni 30B A3B", score: "63.2%", note: "NVIDIA" },
        { rank: 12, name: "DeepSeek V4 Pro", score: "56.8%", note: "DeepSeek" },
        { rank: 13, name: "DeepSeek V4 Flash", score: "55.2%", note: "DeepSeek" },
        { rank: 14, name: "DeepSeek V3", score: "37.6%", note: "DeepSeek" }
      ],
      source: "LiveCodeBench",
      url: "https://livecodebench.github.io/"
    },
    {
      title: "LiveBench",
      type: "动态综合榜",
      description: "按月更新问题，覆盖数学、代码、推理、数据分析、指令遵循和语言任务，强调客观答案与抗污染",
      datasets: ["LiveBench"],
      rankingMetric: "LiveBench average score",
      rankingUpdated: "LMMarketCap 快照 026-05-22",
      rankingSourceName: "LMMarketCap LiveBench",
      rankingSourceUrl: "https://lmmarketcap.com/benchmarks/livebench",
      rankings: [
        { rank: 1, name: "o4 Mini High", score: "87.3%", note: "OpenAI" },
        { rank: 2, name: "R1 0528", score: "84.4%", note: "DeepSeek" },
        { rank: 3, name: "Qwen3 235B A22B", score: "80.4%", note: "Alibaba" },
        { rank: 4, name: "Claude 3.5 Sonnet", score: "80.0%", note: "Anthropic" },
        { rank: 4, name: "Gemini 2.0 Flash", score: "80.0%", note: "Google" },
        { rank: 4, name: "Gemma 4 31B", score: "80.0%", note: "Google" },
        { rank: 7, name: "GPT-5.4", score: "79.0%", note: "OpenAI" },
        { rank: 8, name: "Claude Opus 4.6", score: "78.5%", note: "Anthropic" },
        { rank: 9, name: "Gemini 3 Pro", score: "78.0%", note: "Google" },
        { rank: 10, name: "GPT-5.2", score: "77.5%", note: "OpenAI" },
        { rank: 11, name: "GPT-5", score: "76.0%", note: "OpenAI" },
        { rank: 12, name: "Gemini 2.5 Pro", score: "75.6%", note: "Google" },
        { rank: 13, name: "o3", score: "74.8%", note: "OpenAI" },
        { rank: 14, name: "Gemini 3 Flash", score: "74.5%", note: "Google" },
        { rank: 15, name: "Claude Opus 4.5", score: "74.0%", note: "Anthropic" },
        { rank: 15, name: "GPT-5.1", score: "74.0%", note: "OpenAI" },
        { rank: 17, name: "Claude Sonnet 4.6", score: "73.2%", note: "Anthropic" },
        { rank: 18, name: "Grok 4", score: "73.0%", note: "xAI" },
        { rank: 19, name: "Claude Opus 4", score: "72.0%", note: "Anthropic" },
        { rank: 19, name: "o4-mini", score: "72.0%", note: "OpenAI" }
      ],
      source: "LiveBench GitHub",
      url: "https://github.com/livebench/livebench"
    },
    {
      title: "Open ASR Leaderboard",
      type: "ASR 语音识别",
      description: "Hugging Face 维护的开 ASR 榜单，覆盖英文、多语言和长音频转写，主要看 WER 和不同数据集上的稳定性",
      datasets: ["ESB", "Earnings21/22", "TED-LIUM", "FLEURS"],
      rankingMetric: "Average WER，越低越",
      rankingUpdated: "Appen / Hugging Face 快照 026-05",
      rankingSourceName: "Appen / Open ASR Leaderboard",
      rankingSourceUrl: "https://www.appen.com/blog/hugging-face-open-llm-leaderboard",
      rankings: [
        { rank: 1, name: "ibm-granite/granite-speech-4.1-2b", score: "5.33 WER", note: "Public leaderboard" },
        { rank: 2, name: "CohereLabs/cohere-transcribe-03-2026", score: "5.42 WER", note: "Public leaderboard" },
        { rank: 3, name: "ibm-granite/granite-4.0-1b-speech", score: "5.52 WER", note: "Public leaderboard" },
        { rank: 4, name: "nvidia/canary-qwen-2.5b", score: "5.63 WER", note: "Public leaderboard" },
        { rank: 5, name: "ibm-granite/granite-speech-3.3-8b", score: "5.74 WER", note: "Public leaderboard" }
      ],
      source: "Hugging Face Audio",
      url: "https://github.com/huggingface/open_asr_leaderboard"
    },
    {
      title: "SpeechColab Leaderboard",
      type: "ASR 评测平台",
      description: "通用开 ASR 评测平台，适合补充观察语音识别模型在不同语种和数据集上的表现",
      datasets: ["ASR", "Speech Recognition"],
      rankingMetric: "ASR cross-dataset evaluation",
      rankingUpdated: "论文/平台入口",
      rankingSourceName: "SpeechColab paper",
      rankingSourceUrl: "https://arxiv.org/abs/2403.08196",
      source: "SpeechColab",
      url: "https://arxiv.org/abs/2403.08196"
    },
    {
      title: "SUPERB",
      type: "语音处理",
      description: "Speech processing Universal PERformance Benchmark，覆盖语音识别、说话人、情感、语音理解等多任务",
      datasets: ["SUPERB", "Speech Tasks"],
      rankingMetric: "SUPERB multi-task speech score",
      rankingUpdated: "官方/论文入口",
      rankingSourceName: "SUPERB Benchmark",
      rankingSourceUrl: "https://superbbenchmark.org/leaderboard",
      source: "SUPERB Paper",
      url: "https://arxiv.org/abs/2105.01051"
    },
    {
      title: "HEAR Benchmark",
      type: "音频表征",
      description: "评估通用音频表征在语音、环境声和音乐任务上的迁移能力，适合 audio embedding",
      datasets: ["HEAR", "Speech", "Environmental Sound", "Music"],
      rankingMetric: "HEAR task-normalized primary score",
      rankingUpdated: "官方动态页",
      rankingSourceName: "HEAR Leaderboard",
      rankingSourceUrl: "https://hearbenchmark.com/hear-leaderboard.html",
      source: "HEAR Benchmark",
      url: "https://hearbenchmark.com/"
    },
    {
      title: "TTSDS / TTSDS2",
      type: "TTS 语音合成",
      description: "从韵律、说话人身份和可懂度等维度评估合成语音质量，TTSDS2 支持多语言并定期更新",
      datasets: ["TTSDS", "TTSDS2"],
      rankingMetric: "TTS Distribution Score / multilingual TTSDS2",
      rankingUpdated: "项目入口",
      rankingSourceName: "TTSDS GitHub",
      rankingSourceUrl: "https://github.com/ttsds/ttsds",
      source: "TTSDS GitHub",
      url: "https://github.com/ttsds/ttsds"
    },
    {
      title: "MINT-Bench",
      type: "指令跟随 TTS",
      description: "面向可控 expressive、多语言 TTS 的新评测，关注文本指令对语音风格、情绪和表达的控制能力",
      datasets: ["MINT-Bench"],
      rankingMetric: "Instruction-following TTS benchmark",
      rankingUpdated: "论文入口",
      rankingSourceName: "MINT-Bench arXiv",
      rankingSourceUrl: "https://arxiv.org/abs/2604.17958",
      source: "MINT-Bench",
      url: "https://arxiv.org/abs/2604.17958"
    },
    {
      title: "MTEB",
      type: "Embedding",
      description: "Massive Text Embedding Benchmark，覆盖检索、分类、聚类、重排序、语义相似度和多语言任务",
      datasets: ["MTEB", "MMTEB", "Retrieval", "Reranking"],
      rankingMetric: "MTEB score / task average",
      rankingUpdated: "Ailog RAG 快照 026",
      rankingSourceName: "Ailog RAG MTEB guide",
      rankingSourceUrl: "https://app.ailog.fr/en/blog/guides/choosing-embedding-models",
      rankings: [
        { rank: 1, name: "Cohere embed-v4", score: "65.2", note: "Text embedding model" },
        { rank: 2, name: "OpenAI text-embedding-3-large", score: "64.6", note: "Text embedding model" },
        { rank: 3, name: "BGE-M3", score: "63.0", note: "Open multilingual embedding" }
      ],
      source: "MTEB Leaderboard",
      url: "https://mteb-leaderboard.hf.space/"
    },
    {
      title: "MAEB",
      type: "音频 Embedding",
      description: "Massive Audio Embedding Benchmark，覆盖语音、音乐、环境声和音文本跨模态任务",
      datasets: ["MAEB", "Audio Embedding"],
      rankingMetric: "MAEB 98-task audio embedding evaluation",
      rankingUpdated: "论文/项目入口",
      rankingSourceName: "MAEB paper",
      rankingSourceUrl: "https://arxiv.org/abs/2602.16008",
      source: "MAEB Paper",
      url: "https://arxiv.org/abs/2602.16008"
    },
    {
      title: "VBench / VBench++",
      type: "视频生成",
      description: "视频生成模型评测，拆解成画质、主体一致性、运动、文本对齐、人类偏好等多维指标",
      datasets: ["VBench", "VBench++"],
      rankingMetric: "Video generation overall rank / quality signal",
      rankingUpdated: "VidScore 快照 026-05-22",
      rankingSourceName: "VidScore AI Video Leaderboard",
      rankingSourceUrl: "https://vidscore.dev/leaderboard",
      rankings: [
        { rank: 1, name: "HappyHorse 1.0", score: "1382", note: "Alibaba / overall leader" },
        { rank: 2, name: "Kling 2.5 Turbo", score: "1210", note: "Kuaishou" },
        { rank: 3, name: "Kling v3 Pro", score: "1243", note: "Kuaishou" },
        { rank: 4, name: "Veo 3.1", score: "1218", note: "Google DeepMind" },
        { rank: 5, name: "Veo 3.1 Fast", score: "1209", note: "Google DeepMind" },
        { rank: 6, name: "Runway Gen-4.5", score: "1223", note: "Runway" },
        { rank: 7, name: "Sora 2", score: "1194", note: "OpenAI" },
        { rank: 8, name: "LTX-2 Pro", score: "1130", note: "Lightricks" },
        { rank: 9, name: "Seedance 2.0", score: "1275", note: "ByteDance" },
        { rank: 10, name: "HunyuanVideo 1.5", score: "1015", note: "Tencent" },
        { rank: 11, name: "SkyReels V4", score: "1243", note: "Skywork AI" },
        { rank: 12, name: "Grok Imagine Video", score: "1227", note: "xAI" },
        { rank: 13, name: "Vidu Q3 Pro", score: "1223", note: "Shengshu Technology" },
        { rank: 14, name: "PixVerse V6", score: "1209", note: "PixVerse" },
        { rank: 15, name: "Luma Ray 3", score: "1204", note: "Luma AI" },
        { rank: 16, name: "Pika 2.0", score: "No benchmark", note: "Pika Labs" },
        { rank: 17, name: "Seedance 1.5 Pro", score: "1174", note: "ByteDance" },
        { rank: 18, name: "Hailuo 02 Pro", score: "1161", note: "MiniMax" },
        { rank: 19, name: "Kling v3 Standard", score: "No benchmark", note: "Kuaishou" },
        { rank: 20, name: "Pika 2.5", score: "1084", note: "Pika Labs" }
      ],
      source: "VBench",
      url: "https://github.com/Video-Bench/Video-Bench"
    },
    {
      title: "OCRBench / OCRBench v2",
      type: "OCR/VLM 文字识别",
      description: "评估多模态模型在文字识别、文档问答、场景文字、公式和复杂版面理解上的能力",
      datasets: ["OCRBench", "OCRBench v2"],
      rankingMetric: "OCRBench v2 score",
      rankingUpdated: "CodeSOTA 快照 026-04/05",
      rankingSourceName: "CodeSOTA OCRBench v2",
      rankingSourceUrl: "https://www.codesota.com/browse/computer-vision/ocr-capabilities/ocrbench-v2",
      rankings: [
        { rank: 1, name: "Intern-S1-Pro", score: "60.60", note: "Shanghai AI Lab" },
        { rank: 2, name: "minicpm-v-4.5-8b", score: "58.80", note: "OCRBench v2 leaderboard" },
        { rank: 3, name: "sail-vl2-8b", score: "57.60", note: "OCRBench v2 leaderboard" },
        { rank: 5, name: "DeepSeek-VL2-Small", score: "42.7", note: "CodeSOTA API snapshot" }
      ],
      source: "MultimodalOCR",
      url: "https://github.com/Yuliang-Liu/MultimodalOCR"
    },
    {
      title: "DocVQA",
      type: "文档问答",
      description: "面向扫描文档和真实文档图像的视觉问答评测，适合比较文档理解和企业资料抽取能力",
      datasets: ["DocVQA"],
      rankingMetric: "DocVQA score",
      rankingUpdated: "LLM Stats 快照 026-05",
      rankingSourceName: "LLM Stats DocVQA",
      rankingSourceUrl: "https://llm-stats.com/benchmarks/docvqa",
      rankings: [
        { rank: 1, name: "Qwen2.5 VL 72B Instruct", score: "0.964", note: "Alibaba Cloud / Qwen Team" },
        { rank: 2, name: "Qwen2.5 VL 7B Instruct", score: "0.957", note: "Alibaba Cloud / Qwen Team" },
        { rank: 3, name: "Claude 3.5 Sonnet", score: "0.952", note: "Anthropic" },
        { rank: 3, name: "Qwen2.5-Omni-7B", score: "0.952", note: "Alibaba Cloud / Qwen Team" },
        { rank: 5, name: "Mistral Small 3.2 24B Instruct", score: "0.949", note: "Mistral AI" },
        { rank: 6, name: "Qwen2.5 VL 32B Instruct", score: "0.948", note: "Alibaba Cloud / Qwen Team" },
        { rank: 7, name: "Llama 4 Maverick", score: "0.944", note: "Meta" },
        { rank: 7, name: "Llama 4 Scout", score: "0.944", note: "Meta" },
        { rank: 9, name: "Grok-2", score: "0.936", note: "xAI" },
        { rank: 10, name: "Nova Pro", score: "0.935", note: "Amazon" },
        { rank: 11, name: "Pixtral Large", score: "0.933", note: "Mistral AI" },
        { rank: 11, name: "DeepSeek VL2", score: "0.933", note: "DeepSeek" },
        { rank: 13, name: "Phi-4-multimodal-instruct", score: "0.932", note: "Microsoft" },
        { rank: 13, name: "Grok-2 mini", score: "0.932", note: "xAI" },
        { rank: 15, name: "GPT-4o", score: "0.928", note: "OpenAI" },
        { rank: 16, name: "Nova Lite", score: "0.924", note: "Amazon" },
        { rank: 17, name: "DeepSeek VL2 Small", score: "0.923", note: "DeepSeek" },
        { rank: 18, name: "Pixtral-12B", score: "0.907", note: "Mistral AI" },
        { rank: 19, name: "Llama 3.2 90B Instruct", score: "0.901", note: "Meta" },
        { rank: 20, name: "DeepSeek VL2 Tiny", score: "0.889", note: "DeepSeek" }
      ],
      source: "DocVQA",
      url: "https://www.docvqa.org/"
    },
    {
      title: "IDP Leaderboard",
      type: "文档 AI",
      description: "面向智能文档处理，覆 OCR、表格、KIE、VQA、分类和长文档解析等实际任务",
      datasets: ["OlmOCR", "OmniDocBench", "IDP Core"],
      rankingMetric: "IDP Core / OlmOCR / OmniDocBench capability profile",
      rankingUpdated: "官方动态页",
      rankingSourceName: "IDP Leaderboard",
      rankingSourceUrl: "https://www.idp-leaderboard.org/benchmarks/",
      source: "IDP Leaderboard",
      url: "https://www.idp-leaderboard.org/benchmarks/"
    }
  ],
  benchmarkDatasets: [
    {
      name: "C-Eval",
      area: "中文知识/推理",
      note: "中文多学科考试题，适合评估中文基础知识和推理",
      source: "https://cevalbenchmark.com/index.html"
    },
    {
      name: "CMMLU",
      area: "中文多任",
      note: "67个中文主题，包含中国特定知识和专业学科",
      source: "https://github.com/haonan-li/CMMLU"
    },
    {
      name: "MMLU-Pro",
      area: "通用知识/推理",
      note: "MMLU 的更难版本，选项更多，更强调推理",
      source: "https://arxiv.org/abs/2406.01574"
    },
    {
      name: "GPQA",
      area: "研究生级科学问答",
      note: "常用于测试高难度科学知识与推理，不适合看聊天体验",
      source: "https://huggingface.co/docs/leaderboards/main/index"
    },
    {
      name: "SWE-bench Verified",
      area: "软件工程",
      note: "真实仓库 issue 修复，适合 Coding Agent 能不能改真实代码",
      source: "https://www.swebench.com/"
    },
    {
      name: "LiveCodeBench",
      area: "代码生成",
      note: "持续新增竞赛题，降低模型提前见过题目的可能",
      source: "https://livecodebench.github.io/"
    },
    {
      name: "BFCL",
      area: "函数/工具调用",
      note: "看模型能不能正确选择工具、填参数、拒绝无关工具",
      source: "https://gorilla.cs.berkeley.edu/blogs/8_berkeley_function_calling_leaderboard.html"
    },
    {
      name: "MMMU",
      area: "多模态学科理",
      note: "图文混合的大学级学科题，适合看多模态模型专业理解",
      source: "https://arxiv.org/abs/2311.16502"
    },
    {
      name: "CMMMU",
      area: "中文多模",
      note: "中文语境下的多学科多模态理解与推理评测",
      source: "https://arxiv.org/abs/2401.11944"
    },
    {
      name: "LiveBench",
      area: "动态抗污染",
      note: "持续更新新题，适合观察模型在新信息和客观答案上的表现",
      source: "https://github.com/livebench/livebench"
    },
    {
      name: "Open ASR",
      area: "ASR 语音识别",
      note: "覆盖公开 ASR 数据集、多语言和长音频，常 WER 衡量转写错误率",
      source: "https://github.com/huggingface/open_asr_leaderboard"
    },
    {
      name: "FLEURS / Common Voice / LibriSpeech",
      area: "ASR 数据",
      note: "常见语音识别数据集，用于看多语言、开源语料和干净朗读场景",
      source: "https://github.com/huggingface/open_asr_leaderboard"
    },
    {
      name: "SUPERB",
      area: "语音多任",
      note: "覆盖 ASR、说话人、情感、语音命令和语音理解等任务",
      source: "https://arxiv.org/abs/2105.01051"
    },
    {
      name: "HEAR",
      area: "音频表征",
      note: "测试音频 embedding 是否能迁移到语音、音乐和环境声任务",
      source: "https://hearbenchmark.com/"
    },
    {
      name: "TTSDS",
      area: "TTS 语音合成",
      note: "评估合成语音的韵律、说话人相似度和可懂度",
      source: "https://github.com/ttsds/ttsds"
    },
    {
      name: "MINT-Bench",
      area: "指令跟随 TTS",
      note: "TTS 模型能否根据文本指令控制情绪、风格、多语言表达",
      source: "https://arxiv.org/abs/2604.17958"
    },
    {
      name: "MTEB",
      area: "Embedding/RAG",
      note: "检索、重排序、聚类、多语言和语义相似度任务的主 embedding 评测",
      source: "https://mteb-leaderboard.hf.space/"
    },
    {
      name: "MAEB",
      area: "音频 Embedding",
      note: "音频-only 与音文本跨模 embedding 评测",
      source: "https://arxiv.org/abs/2602.16008"
    },
    {
      name: "VBench",
      area: "视频生成",
      note: "用多维指标拆解视频生成质量和文本对齐能力",
      source: "https://github.com/Video-Bench/Video-Bench"
    },
    {
      name: "OCRBench",
      area: "OCR/VLM",
      note: "场景文字、文档、表格、公式、手写和文字推理相关评测",
      source: "https://github.com/Yuliang-Liu/MultimodalOCR"
    },
    {
      name: "DocVQA",
      area: "文档问答",
      note: "真实扫描文档上的视觉问答，适合看文档理解能力",
      source: "https://www.docvqa.org/"
    }
  ],
  datasetDetails: {
    "c-eval": {
      title: "C-Eval",
      subtitle: "中文基础模型多学科考试评测",
      summary: "C-Eval 是面向中文基础模型的多层级、多学科评测套件，题型以选择题为主，用来观察模型在中文知识、学科推理和考试场景中的稳定性",
      facts: [
        { label: "任务类型", value: "中文多选题 / 学科知识 / 推理" },
        { label: "规模", value: "13,948 道题，覆 52个学" },
        { label: "难度", value: "四个难度层级，从中学到专业考试" },
        { label: "常用指标", value: "Accuracy / Average Accuracy" }
      ],
      evaluates: ["中文语境下的基础知识掌握", "跨学科选择题推", "模型对中文考试题干和选项的理", "不同难度层级下的稳定"],
      metrics: ["总体准确", "学科分组准确", "难度分组准确", "少样零样本设置差"],
      useCases: ["中文通用模型初筛", "教育问答模型评估", "中文能力横向对比", "模型发布页的基础能力说明"],
      limitations: ["题型以选择题为主，不能代表开放问答质", "公开数据集可能存在训练污染风", "高分不等于真实业务场景可直接上线"],
      rankings: {
        metric: "C-Eval average accuracy",
        updated: "LLM Stats 快照 026-05；C-Eval 官方 2025-07-26 后停止主动维",
        sourceName: "LLM Stats C-Eval",
        sourceUrl: "https://llm-stats.com/benchmarks/c-eval",
        items: [
          { rank: 1, name: "Qwen3.6 Plus", score: "93.3%", note: "Alibaba Cloud / Qwen Team" },
          { rank: 2, name: "Qwen3.5-397B-A17B", score: "93.0%", note: "Alibaba Cloud / Qwen Team" },
          { rank: 3, name: "Kimi K2 Base", score: "92.5%", note: "Moonshot AI" },
          { rank: 4, name: "Qwen3.5-122B-A10B", score: "91.9%", note: "Alibaba Cloud / Qwen Team" },
          { rank: 5, name: "Qwen3.6-27B", score: "91.4%", note: "Alibaba Cloud / Qwen Team" },
          { rank: 6, name: "Qwen3.5-27B", score: "90.5%", note: "Alibaba Cloud / Qwen Team" },
          { rank: 7, name: "Qwen3.5-35B-A3B", score: "90.2%", note: "Alibaba Cloud / Qwen Team" },
          { rank: 8, name: "Qwen3.6-35B-A3B", score: "90.0%", note: "Alibaba Cloud / Qwen Team" },
          { rank: 9, name: "Kimi-k1.5", score: "88.3%", note: "Moonshot AI" },
          { rank: 10, name: "Qwen3.5-9B", score: "88.2%", note: "Alibaba Cloud / Qwen Team" },
          { rank: 11, name: "DeepSeek-V3", score: "86.5%", note: "DeepSeek" },
          { rank: 12, name: "Qwen3.5-4B", score: "85.1%", note: "Alibaba Cloud / Qwen Team" },
          { rank: 13, name: "Qwen2 72B Instruct", score: "83.8%", note: "Alibaba Cloud / Qwen Team" },
          { rank: 14, name: "Qwen2 7B Instruct", score: "77.2%", note: "Alibaba Cloud / Qwen Team" },
          { rank: 15, name: "Qwen3.5-2B", score: "73.2%", note: "Alibaba Cloud / Qwen Team" },
          { rank: 16, name: "Qwen3.5-0.8B", score: "50.5%", note: "Alibaba Cloud / Qwen Team" },
          { rank: 17, name: "ERNIE 4.5", score: "40.7%", note: "Baidu" }
        ]
      },
      sources: [
        { name: "C-Eval 官方网站", url: "https://cevalbenchmark.com/index.html" },
        { name: "C-Eval arXiv", url: "https://arxiv.org/abs/2305.08322" },
        { name: "NeurIPS 2023 论文 PDF", url: "https://papers.nips.cc/paper/2023/file/c6ec1844bec96d6d32ae95ae694e23d8-Paper-Datasets_and_Benchmarks.pdf" }
      ]
    },
    "cmmlu": {
      title: "CMMLU",
      subtitle: "中文大规模多任务语言理解评测",
      summary: "CMMLU 面向中文语言和中国文化背景，覆盖自然科学、社会科学、工程、人文等主题，用来评估模型在中文知识体系中的理解与推理能力",
      facts: [
        { label: "任务类型", value: "中文多任务选择" },
        { label: "规模", value: "11,528 道题 7个主" },
        { label: "覆盖范围", value: "自然科学、社会科学、工程、人文、中国特定知" },
        { label: "常用指标", value: "Accuracy" }
      ],
      evaluates: ["中文专业知识", "中文文化与本地常", "多主题语言理解", "面向中国语境的推理表"],
      metrics: ["平均准确", "主题维度准确", "STEM/人文/社科分组表现", "不同 prompt 设置下的波动"],
      useCases: ["中文模型评测", "国产/开源模型对", "中文教育和知识问答产品选型", "补充 C-Eval 的中文文化维"],
      limitations: ["仍以选择题为", "不能覆盖长文生成和多轮对", "排行榜分数需要结合评 harness prompt 设置阅读"],
      rankings: {
        metric: "CMMLU 5-shot/0-shot accuracy（多个来源合并）",
        updated: "BenchGecko + LLM Stats 合并 024-09 ~ 2026-05",
        sourceName: "BenchGecko CMMLU + LLM Stats CMMLU",
        sourceUrl: "https://llm-stats.com/benchmarks/cmmlu",
        items: [
          { rank: 1, name: "Doubao Seed 1.6", score: "91.5", note: "ByteDance / 自述结果" },
          { rank: 2, name: "Qwen2 72B Instruct", score: "90.1", note: "Alibaba / LLM Stats" },
          { rank: 3, name: "Qwen2-72B", score: "89.7", note: "Alibaba / BenchGecko" },
          { rank: 4, name: "Qwen2.5 72B Instruct", score: "85.7", note: "Alibaba / BenchGecko" },
          { rank: 5, name: "LongCat-Flash-Chat", score: "84.3", note: "Meituan" },
          { rank: 6, name: "LongCat-Flash-Lite", score: "82.5", note: "Meituan" },
          { rank: 7, name: "MiniCPM-SALA", score: "81.6", note: "OpenBMB" },
          { rank: 8, name: "GPT-4 Turbo", score: "71.0", note: "OpenAI / BenchGecko" },
          { rank: 9, name: "Llama 3.1 70B Instruct", score: "64.4", note: "Meta / BenchGecko" },
          { rank: 10, name: "Qwen-14B", score: "58.7", note: "Alibaba / BenchGecko" },
          { rank: 11, name: "Falcon-180B", score: "41.5", note: "TII / BenchGecko" },
          { rank: 12, name: "ERNIE 4.5", score: "39.8", note: "Baidu / LLM Stats" },
          { rank: 13, name: "LLaMA-13B", score: "39.8", note: "Meta / BenchGecko" },
          { rank: 14, name: "Llama 3 70B Instruct", score: "36.9", note: "Meta / BenchGecko" }
        ]
      },
      sources: [
        { name: "CMMLU GitHub", url: "https://github.com/haonan-li/CMMLU" },
        { name: "CMMLU arXiv", url: "https://arxiv.org/abs/2306.09212" },
        { name: "Hugging Face Papers", url: "https://huggingface.co/papers/2306.09212" }
      ]
    },
    "mmlu-pro": {
      title: "MMLU-Pro",
      subtitle: "更难、更重推理的 MMLU 扩展",
      summary: "MMLU-Pro MMLU 基础上提高难度，增加推理要求并扩展选项数量，常用于检验模型在专业知识题上是否只是记忆题库，还是能进行多步推理",
      facts: [
        { label: "任务类型", value: "通用知识选择</ 推理" },
        { label: "题目设计", value: "从传统四选项扩展到更多选项，提升干扰项质量" },
        { label: "关注", value: "更强推理、更低随机猜中概" },
        { label: "常用指标", value: "Accuracy" }
      ],
      evaluates: ["专业知识应用", "多步推理", "复杂选项辨析", "模型 harder MMLU 上的稳健"],
      metrics: ["总体准确", "学科分项准确", "CoT 与直接作答差", "不同提示模板下的一致"],
      useCases: ["通用 LLM 深度能力评估", "模型发布页的 reasoning 补充指标", "替代过于饱和的传 MMLU", "大模型选型初筛"],
      limitations: ["仍不等于开放式专家任务", "选择题顺序和提示词可能影响结", "公开数据长期存在污染风险"],
      rankings: {
        metric: "MMLU-Pro accuracy",
        updated: "PricePerToken 快照 026-04-28",
        sourceName: "PricePerToken MMLU-Pro",
        sourceUrl: "https://pricepertoken.com/leaderboards/benchmark/mmlu-pro",
        items: [
          { rank: 1, name: "Gemini 3 Pro Preview", score: "89.8%", note: "Google" },
          { rank: 2, name: "Gemini 3 Pro Preview", score: "89.5%", note: "Google / variant" },
          { rank: 3, name: "Claude Opus 4.5 Thinking", score: "89.5%", note: "Anthropic" },
          { rank: 4, name: "Gemini 3 Flash Preview Thinking", score: "89.0%", note: "Google" },
          { rank: 5, name: "Claude Opus 4.5", score: "88.9%", note: "Anthropic" },
          { rank: 6, name: "Gemini 3 Flash Preview", score: "88.2%", note: "Google" },
          { rank: 7, name: "Claude Opus 4.1 Thinking", score: "88.0%", note: "Anthropic" },
          { rank: 8, name: "Claude Sonnet 4.5 Thinking", score: "87.5%", note: "Anthropic" },
          { rank: 9, name: "MiniMax M2.1", score: "87.5%", note: "MiniMax" },
          { rank: 10, name: "GPT-5.2 Pro", score: "87.4%", note: "OpenAI" },
          { rank: 11, name: "Claude Opus 4 Thinking", score: "87.3%", note: "Anthropic" },
          { rank: 12, name: "GPT-5", score: "87.1%", note: "OpenAI" },
          { rank: 13, name: "GPT-5.1", score: "87.0%", note: "OpenAI" },
          { rank: 14, name: "GPT-5", score: "86.7%", note: "OpenAI / variant" },
          { rank: 15, name: "Grok 4", score: "86.6%", note: "xAI" },
          { rank: 16, name: "GPT-5 Codex", score: "86.5%", note: "OpenAI" },
          { rank: 17, name: "DeepSeek V3.2 Speciale", score: "86.3%", note: "DeepSeek" },
          { rank: 18, name: "Gemini 2.5 Pro", score: "86.2%", note: "Google" },
          { rank: 19, name: "DeepSeek V3.2 Thinking", score: "86.2%", note: "DeepSeek" },
          { rank: 20, name: "Claude Opus 4", score: "86.0%", note: "Anthropic" }
        ]
      },
      sources: [
        { name: "MMLU-Pro arXiv", url: "https://arxiv.org/abs/2406.01574" },
        { name: "Hugging Face MMLU-Pro", url: "https://huggingface.co/datasets/TIGER-Lab/MMLU-Pro" }
      ]
    },
    "gpqa": {
      title: "GPQA",
      subtitle: "研究生级 Google-proof 科学问答",
      summary: "GPQA 由专家编写，覆盖生物、物理、化学等高难度科学题，设计目标是让非专家即使联网搜索也难以轻易答对，因此常被用来衡量前沿模型的深层科学推理",
      facts: [
        { label: "任务类型", value: "研究生级科学多选题" },
        { label: "规模", value: "448 道专家编写问" },
        { label: "领域", value: "生物、物理、化" },
        { label: "常用指标", value: "Accuracy，常见子集为 GPQA Diamond" }
      ],
      evaluates: ["高难度科学知", "复杂推理", "抗搜索型问题解决", "专家级问题上的可靠"],
      metrics: ["总体准确", "Diamond 子集准确", "学科分项准确", "不带 CoT 的差"],
      useCases: ["前沿闭源/开源模型推理能力比", "科学助手选型", "研究型问答产品评", "scalable oversight 研究参"],
      limitations: ["题量不大，统计波动需要注", "高分不代表能安全处理真实科研结论", "部分模型可能在公开榜单上针对性优"],
      rankings: {
        metric: "GPQA Diamond accuracy",
        updated: "PricePerToken 快照 026-05",
        sourceName: "PricePerToken GPQA",
        sourceUrl: "https://pricepertoken.com/leaderboards/benchmark/gpqa",
        items: [
          { rank: 1, name: "Gemini 3.1 Pro Preview", score: "94.1%", note: "Google" },
          { rank: 2, name: "Gemini 3.5 Flash", score: "92.2%", note: "Google" },
          { rank: 3, name: "GPT-5.4", score: "92.0%", note: "OpenAI" },
          { rank: 4, name: "GPT-5.3 Codex", score: "91.5%", note: "OpenAI" },
          { rank: 5, name: "Claude Opus 4.7", score: "91.4%", note: "Anthropic" },
          { rank: 6, name: "Kimi K2.6", score: "91.1%", note: "Moonshot AI" },
          { rank: 7, name: "Gemini 3 Pro Preview", score: "90.8%", note: "Google" },
          { rank: 8, name: "GPT-5.2 Pro", score: "90.3%", note: "OpenAI" },
          { rank: 9, name: "GPT-5.2-Codex", score: "89.9%", note: "OpenAI" },
          { rank: 10, name: "Gemini 3 Flash Preview Thinking", score: "89.8%", note: "Google" },
          { rank: 11, name: "Claude Opus 4.6 Thinking", score: "89.6%", note: "Anthropic" },
          { rank: 12, name: "DeepSeek V4 Flash", score: "89.4%", note: "DeepSeek / non-reasoning" },
          { rank: 13, name: "Qwen3.5 397B A17B", score: "89.3%", note: "Alibaba" },
          { rank: 14, name: "DeepSeek V4 Pro", score: "88.8%", note: "DeepSeek" },
          { rank: 15, name: "Gemini 3 Pro Preview", score: "88.7%", note: "Google / variant" },
          { rank: 16, name: "Claude Opus 4.7", score: "88.5%", note: "Anthropic / variant" },
          { rank: 17, name: "Kimi K2.5 Thinking", score: "87.9%", note: "Moonshot AI" },
          { rank: 18, name: "Grok 4", score: "87.7%", note: "xAI" },
          { rank: 19, name: "Claude Sonnet 4.6", score: "87.5%", note: "Anthropic" },
          { rank: 20, name: "MiniMax M2.7", score: "87.4%", note: "MiniMax" }
        ]
      },
      sources: [
        { name: "GPQA 项目", url: "https://jacksonpetty.org/gpqa/" },
        { name: "GPQA arXiv", url: "https://arxiv.org/abs/2311.12022" },
        { name: "GPQA GitHub", url: "https://github.com/idavidrein/gpqa" }
      ]
    },
    "swe-bench-verified": {
      title: "SWE-bench Verified",
      subtitle: "真实 GitHub issue 修复评测",
      summary: "SWE-bench Verified SWE-bench 中经过人工验证的高质量子集，要求模型 Agent 在真实代码库中理 issue、修改代码并通过测试，是评估 Coding Agent 的核心基准之一",
      facts: [
        { label: "任务类型", value: "真实仓库 issue patch" },
        { label: "规模", value: "Verified 子集 500个问题；完整 SWE-bench 2,294个实" },
        { label: "输入", value: "issue 描述、仓库快照、测试环" },
        { label: "常用指标", value: "Resolved %" }
      ],
      evaluates: ["仓库级代码理", "bug 定位与修", "测试驱动验证", "Agent 工具使用和长程执"],
      metrics: ["解决", "测试通过率", "生成补丁有效", "运行成本与时"],
      useCases: ["代码 Agent 选型", "IDE 智能体能力比", "自动 bug 产品评估", "开发者工具营销页引"],
      limitations: ["公开 GitHub 数据可能被训练见", "测试通过不等于真实生产可维护", "不同运行 harness 会影响成", "高成 Agent 与低成本模型需要分开比较"],
      rankings: {
        metric: "SWE-bench Verified resolved %",
        updated: "Megadose 快照 026-05-22",
        sourceName: "Megadose SWE-bench Verified",
        sourceUrl: "https://megadose.ai/b/swebench-verified",
        items: [
          { rank: 1, name: "Claude Opus 4.5", score: "79.2%", note: "Captured 2025-12-15" },
          { rank: 2, name: "Doubao Seed Code", score: "78.8%", note: "Captured 2025-09-28" },
          { rank: 3, name: "Gemini 3 Pro", score: "77.4%", note: "Captured 2025-11-20" },
          { rank: 4, name: "Claude Sonnet 4", score: "76.8%", note: "Captured 2025-08-04" },
          { rank: 5, name: "Gemini 3 Flash", score: "75.8%", note: "Captured 2026-02-17" },
          { rank: 6, name: "MiniMax M2.5", score: "75.8%", note: "Captured 2026-02-17" },
          { rank: 7, name: "Claude Opus 4.6", score: "75.6%", note: "Captured 2026-02-17" },
          { rank: 8, name: "Claude Sonnet 4.5", score: "74.8%", note: "Captured 2025-11-03" },
          { rank: 9, name: "GPT-5", score: "74.4%", note: "Captured 2025-10-15" },
          { rank: 10, name: "Claude Opus 4", score: "73.2%", note: "Captured 2025-05-22" },
          { rank: 11, name: "GPT-5.2", score: "72.8%", note: "Captured 2026-02-19" },
          { rank: 12, name: "GLM-5", score: "72.8%", note: "Captured 2026-02-17" },
          { rank: 13, name: "Kimi K2", score: "71.2%", note: "Captured 2025-10-14" },
          { rank: 14, name: "DeepSeek V3", score: "70.0%", note: "Captured 2026-02-17" },
          { rank: 15, name: "Qwen 3 Coder", score: "69.6%", note: "Captured 2025-08-05" },
          { rank: 16, name: "GLM-4.6", score: "68.2%", note: "Captured 2025-09-30" },
          { rank: 17, name: "Claude Haiku 4.5", score: "66.6%", note: "Captured 2026-02-17" },
          { rank: 18, name: "Claude 3.7 Sonnet", score: "66.4%", note: "Captured 2025-05-14" },
          { rank: 19, name: "GPT-5.1", score: "66.0%", note: "Captured 2025-11-24" },
          { rank: 20, name: "Claude 3.5 Sonnet", score: "62.8%", note: "Captured 2025-02-28" }
        ]
      },
      sources: [
        { name: "SWE-bench 官方网站", url: "https://www.swebench.com/" },
        { name: "SWE-bench 数据集说", url: "https://www.swebench.com/SWE-bench/guides/datasets/" },
        { name: "SWE-bench GitHub", url: "https://github.com/swe-bench" }
      ]
    },
    "livecodebench": {
      title: "LiveCodeBench",
      subtitle: "持续更新的抗污染代码能力评测",
      summary: "LiveCodeBench LeetCode、AtCoder、CodeForces 等竞赛平台持续收集新题，强调时间窗口和抗污染，用来补 HumanEval 等静态代码题的短板",
      facts: [
        { label: "任务类型", value: "代码生成 / 执行 / 输出预测" },
        { label: "来源", value: "竞赛平台新题" },
        { label: "特点", value: "按时间窗口持续更" },
        { label: "常用指标", value: "Pass@1 / accuracy / score" }
      ],
      evaluates: ["算法题解能力", "新题抗污染表", "代码生成可执行", "输出预测和测试通过能力"],
      metrics: ["Pass@1", "不同时间窗口得分", "题目难度分组表现", "生成代码运行成功"],
      useCases: ["代码模型横评", "竞赛编程能力观察", "补充 SWE-bench 的算法题维度", "模型版本更新对比"],
      limitations: ["偏竞赛题，不等价于工程修", "题目窗口不同会导致结果不可直接比", "不覆盖大型仓库导航和需求沟"],
      rankings: {
        metric: "LiveCodeBench Pass@1",
        updated: "LLM Stats 快照 026-05",
        sourceName: "LLM Stats LiveCodeBench",
        sourceUrl: "https://llm-stats.com/benchmarks/livecodebench",
        items: [
          { rank: 1, name: "DeepSeek-V4-Pro-Max", score: "93.5%", note: "DeepSeek" },
          { rank: 2, name: "DeepSeek-V4-Flash-Max", score: "91.6%", note: "DeepSeek" },
          { rank: 3, name: "DeepSeek-V3.2", score: "83.3%", note: "DeepSeek" },
          { rank: 4, name: "DeepSeek-V3.2 (Thinking)", score: "83.3%", note: "DeepSeek" },
          { rank: 5, name: "MiniMax M2", score: "83.0%", note: "MiniMax" },
          { rank: 6, name: "LongCat-Flash-Thinking-2601", score: "82.8%", note: "Meituan" },
          { rank: 7, name: "Nemotron 3 Super (120B A12B)", score: "81.2%", note: "NVIDIA" },
          { rank: 8, name: "Grok-3 Mini", score: "80.4%", note: "xAI" },
          { rank: 9, name: "Grok 4 Fast", score: "80.0%", note: "xAI" },
          { rank: 10, name: "Grok-3", score: "79.4%", note: "xAI" },
          { rank: 11, name: "LongCat-Flash-Thinking", score: "79.4%", note: "Meituan" },
          { rank: 12, name: "Grok-4 Heavy", score: "79.4%", note: "xAI" },
          { rank: 13, name: "Grok-4", score: "79.0%", note: "xAI" },
          { rank: 14, name: "MiniMax M2.1", score: "78.0%", note: "MiniMax" },
          { rank: 15, name: "DeepSeek-V3.2-Exp", score: "74.1%", note: "DeepSeek" },
          { rank: 16, name: "DeepSeek-R1-0528", score: "73.3%", note: "DeepSeek" },
          { rank: 17, name: "GLM-4.5", score: "72.9%", note: "Zhipu AI" },
          { rank: 18, name: "Nemotron Nano 9B v2", score: "71.1%", note: "NVIDIA" },
          { rank: 19, name: "GLM-4.5-Air", score: "70.7%", note: "Zhipu AI" },
          { rank: 20, name: "Qwen3 235B A22B", score: "70.7%", note: "Alibaba Cloud / Qwen Team" }
        ]
      },
      sources: [
        { name: "LiveCodeBench 官网", url: "https://livecodebench.github.io/" },
        { name: "LiveCodeBench GitHub", url: "https://github.com/LiveCodeBench/LiveCodeBench" },
        { name: "LiveCodeBench arXiv", url: "https://arxiv.org/abs/2403.07974" }
      ]
    },
    "bfcl": {
      title: "BFCL",
      subtitle: "Berkeley Function Calling Leaderboard",
      summary: "BFCL 评估模型在函数调用和工具调用场景中的可靠性，包括是否选择正确函数、是否填写正确参数、是否拒绝无关工具，Agent 评测的重要基准",
      facts: [
        { label: "任务类型", value: "函数调用 / 工具调用" },
        { label: "维护", value: "UC Berkeley Gorilla / Sky Computing Lab" },
        { label: "覆盖", value: "单函数、多函数、并行调用、无关函数拒绝等" },
        { label: "常用指标", value: "Accuracy / AST match / executable match" }
      ],
      evaluates: ["工具选择", "参数抽取", "多步/并行函数调用", "拒绝无关工具的能"],
      metrics: ["总体准确", "不同调用类型准确", "参数匹配", "无关工具拒绝"],
      useCases: ["Agent 平台选型", "API 调用模型比较", "企业工作流自动化评估", "函数调用模型发布"],
      limitations: ["函数 schema 质量会影响结", "真实业务工具可能更脏、更长、更依赖上下", "排行榜版本更新较快，引用需标注版本"],
      rankings: {
        metric: "BFCL V3 accuracy",
        updated: "PricePerToken 快照 026-05-07",
        sourceName: "PricePerToken BFCL V3",
        sourceUrl: "https://pricepertoken.com/leaderboards/benchmark/bfcl-v3",
        items: [
          { rank: 1, name: "GLM 4.5 Thinking", score: "76.7", note: "Z.AI / tool calling accuracy" },
          { rank: 2, name: "Qwen3 32B Thinking", score: "75.7", note: "Alibaba" },
          { rank: 3, name: "Qwen3 32B", score: "75.7", note: "Alibaba" },
          { rank: 4, name: "Qwen3 Max", score: "74.9", note: "Alibaba" },
          { rank: 5, name: "Qwen3 Max", score: "74.9", note: "Alibaba / duplicate reported variant" },
          { rank: 6, name: "GLM-4.7-Flash Thinking", score: "74.6", note: "Z.AI" },
          { rank: 7, name: "GLM-4.7-Flash", score: "74.6", note: "Z.AI" },
          { rank: 8, name: "GLM 4.5 Air", score: "69.1", note: "Z.AI" },
          { rank: 9, name: "Nova Pro 1.0", score: "67.9", note: "Amazon" },
          { rank: 10, name: "Kimi K2.5 Thinking", score: "64.5", note: "Moonshot AI" },
          { rank: 11, name: "Kimi K2.5", score: "64.5", note: "Moonshot AI" },
          { rank: 12, name: "INTELLECT-3", score: "63.5", note: "Prime Intellect" },
          { rank: 13, name: "Llama 4 Scout", score: "55.7", note: "Meta" },
          { rank: 14, name: "Gemini 3 Flash Preview Thinking", score: "53.5", note: "Google" },
          { rank: 15, name: "MiniMax M1", score: "47.8", note: "MiniMax" },
          { rank: 16, name: "MiniMax M1", score: "47.8", note: "MiniMax / duplicate reported variant" },
          { rank: 17, name: "Nemotron 3 Nano 30B A3B Thinking", score: "41.6", note: "NVIDIA" },
          { rank: 18, name: "Nemotron 3 Nano 30B A3B", score: "41.6", note: "NVIDIA" },
          { rank: 19, name: "Phi 4", score: "40.8", note: "Microsoft" },
          { rank: 20, name: "Claude Opus 4 Thinking", score: "25.3", note: "Anthropic" }
        ]
      },
      sources: [
        { name: "Berkeley Function Calling Leaderboard", url: "https://gorilla.cs.berkeley.edu/blogs/8_berkeley_function_calling_leaderboard.html" },
        { name: "UC Berkeley Sky 项目", url: "https://sky.cs.berkeley.edu/project/berkeley-function-calling-leaderboard/" },
        { name: "BFCL GitHub", url: "https://github.com/ShishirPatil/gorilla/tree/main/berkeley-function-call-leaderboard" }
      ]
    },
    "mmmu": {
      title: "MMMU",
      subtitle: "多学科多模态理解与推理评测",
      summary: "MMMU 面向需要图文结合、学科知识和复杂推理的大学级任务，覆盖艺术、商业、科学、医学、人文、工程等六大方向，是多模态模型专业能力评估的重要数据集",
      facts: [
        { label: "任务类型", value: "多模态学科问" },
        { label: "规模", value: "11.5K 道题 0个学" },
        { label: "图像类型", value: "图表、示意图、公式、地图、表格等" },
        { label: "常用指标", value: "Accuracy" }
      ],
      evaluates: ["图文联合理解", "大学级学科知", "复杂视觉推理", "跨图像类型泛"],
      metrics: ["总体准确", "学科分组准确", "图像类型分组表现", "文本-only 与多模态差"],
      useCases: ["VLM 专业能力评估", "多模态模型选型", "教育/科研视觉问答产品", "模型发布多模态能力说"],
      limitations: ["不能代表所有视觉任", "选择题仍有猜测因", "专业题高分不等于真实专家审核可替"],
      rankings: {
        metric: "MMMU validation accuracy",
        updated: "LLM Stats 快照 026-05",
        sourceName: "LLM Stats MMMU",
        sourceUrl: "https://llm-stats.com/benchmarks/mmmu",
        items: [
          { rank: 1, name: "Qwen3.6 Plus", score: "86.0%", note: "Alibaba Cloud / Qwen Team" },
          { rank: 2, name: "GPT-5.1", score: "85.4%", note: "OpenAI" },
          { rank: 3, name: "GPT-5.1 Thinking", score: "85.4%", note: "OpenAI" },
          { rank: 4, name: "GPT-5.1 Instant", score: "85.4%", note: "OpenAI" },
          { rank: 5, name: "GPT-5", score: "84.2%", note: "OpenAI" },
          { rank: 6, name: "Qwen3.5-122B-A10B", score: "83.9%", note: "Alibaba Cloud / Qwen Team" },
          { rank: 7, name: "Qwen3.6-27B", score: "82.9%", note: "Alibaba Cloud / Qwen Team" },
          { rank: 8, name: "o3", score: "82.9%", note: "OpenAI" },
          { rank: 9, name: "Qwen3.5-27B", score: "82.3%", note: "Alibaba Cloud / Qwen Team" },
          { rank: 10, name: "Gemini 2.5 Pro Preview 06-05", score: "82.0%", note: "Google" },
          { rank: 11, name: "Qwen3.6-35B-A3B", score: "81.7%", note: "Alibaba Cloud / Qwen Team" },
          { rank: 12, name: "o4-mini", score: "81.6%", note: "OpenAI" },
          { rank: 13, name: "Qwen3.5-35B-A3B", score: "81.4%", note: "Alibaba Cloud / Qwen Team" },
          { rank: 14, name: "Gemini 2.5 Flash", score: "79.7%", note: "Google" },
          { rank: 15, name: "Gemini 2.5 Pro", score: "79.6%", note: "Google" },
          { rank: 16, name: "Step3-VL-10B", score: "78.1%", note: "StepFun" },
          { rank: 17, name: "Grok-3", score: "78.0%", note: "xAI" },
          { rank: 18, name: "o1", score: "77.6%", note: "OpenAI" },
          { rank: 19, name: "Gemini 2.0 Flash Thinking", score: "75.4%", note: "Google" },
          { rank: 20, name: "GPT-4.5", score: "75.2%", note: "OpenAI" }
        ]
      },
      sources: [
        { name: "MMMU arXiv", url: "https://arxiv.org/abs/2311.16502" },
        { name: "MMMU 官网", url: "https://mmmu-benchmark.github.io/" },
        { name: "CVPR 2024 论文 PDF", url: "https://openaccess.thecvf.com/content/CVPR2024/papers/Yue_MMMU_A_Massive_Multi-discipline_Multimodal_Understanding_and_Reasoning_Benchmark_for_CVPR_2024_paper.pdf" }
      ]
    },
    "cmmmu": {
      title: "CMMMU",
      subtitle: "中文多学科多模态理解评",
      summary: "CMMMU 是面向中文语境的多学科多模 benchmark，参 MMMU 的构造方式，收集中文大学考试、测验和教材中的图文题，评估模型在中文专业场景中的视觉推理",
      facts: [
        { label: "任务类型", value: "中文多模态学科问" },
        { label: "规模", value: "12K 道人工收集题" },
        { label: "覆盖", value: "六大核心学科 0个主题 9 类图" },
        { label: "常用指标", value: "Accuracy" }
      ],
      evaluates: ["中文图文理解", "中文学科知识", "复杂图像推理", "文化和教育语境适配"],
      metrics: ["总体准确", "学科分组准确", "图像类型表现", "中文题干理解稳定"],
      useCases: ["中文 VLM 选型", "中文教育多模态产", "国产模型多模态横", "MMMU 做中英对"],
      limitations: ["题源偏教育考试", "不能覆盖真实业务图片全部噪声", "公开题集存在长期污染风险"],
      rankings: {
        metric: "CMMMU test accuracy",
        updated: "CMMMU 官方榜：2024",
        sourceName: "CMMMU Benchmark",
        sourceUrl: "https://cmmmu-benchmark.github.io/",
        items: [
          { rank: 1, name: "GPT-4o (2024-05-13)", score: "53.1%", note: "OpenAI" },
          { rank: 2, name: "GPT-4V", score: "43.7%", note: "OpenAI" },
          { rank: 3, name: "Marco-VL-Plus", score: "40.6%", note: "Alibaba International" },
          { rank: 4, name: "Qwen-VL-Plus", score: "36.8%", note: "Alibaba" },
          { rank: 5, name: "Yi-VL-34B", score: "36.5%", note: "01.AI" },
          { rank: 6, name: "Weitu-VL-1.0-15B", score: "35.3%", note: "Weibo" },
          { rank: 7, name: "Yi-VL-6B", score: "35.0%", note: "01.AI" },
          { rank: 8, name: "InternVL-Chat-V1.1", score: "34.0%", note: "Shanghai AI Lab" },
          { rank: 9, name: "Qwen-VL-Chat", score: "31.3%", note: "Alibaba" },
          { rank: 10, name: "SPHINX-MoE", score: "29.5%", note: "Shanghai AI Lab" },
          { rank: 11, name: "Yi-6B + OCR", score: "26.8%", note: "01.AI" },
          { rank: 12, name: "InternVL-Chat-ViT-6B-Vicuna-7B", score: "26.7%", note: "Shanghai AI Lab" },
          { rank: 13, name: "InternVL-Chat-ViT-6B-Vicuna-13B", score: "26.1%", note: "Shanghai AI Lab" },
          { rank: 14, name: "Qwen-7B + OCR", score: "26.1%", note: "Alibaba" },
          { rank: 15, name: "Emu2-Chat", score: "24.5%", note: "BAAI" },
          { rank: 16, name: "CogAgent-Chat", score: "23.6%", note: "Tsinghua / Zhipu" },
          { rank: 17, name: "Chinese-LLaVa", score: "23.4%", note: "Community fork" },
          { rank: 18, name: "DeepSeek-7B + OCR", score: "23.2%", note: "DeepSeek" },
          { rank: 19, name: "VisCPM", score: "22.7%", note: "OpenBMB" },
          { rank: 20, name: "mPLUG-Owl2", score: "22.2%", note: "DAMO Academy" }
        ]
      },
      sources: [
        { name: "CMMMU arXiv", url: "https://arxiv.org/abs/2401.11944" },
        { name: "CMMMU GitHub", url: "https://github.com/CMMMU-Benchmark/CMMMU" }
      ]
    },
    "livebench": {
      title: "LiveBench",
      subtitle: "动态、客观评分的抗污 LLM 评测",
      summary: "LiveBench 使用近期信息源持续更新问题，并使用客 ground truth 自动评分，覆盖数学、代码、推理、语言、指令遵循和数据分析，旨在降低静 benchmark 的污染和 LLM-as-judge 偏差",
      facts: [
        { label: "任务类型", value: "通用 LLM 动态评" },
        { label: "覆盖", value: "数学、代码、推理、语言、指令、数据分" },
        { label: "特点", value: "持续更新、客观答案、自动评" },
        { label: "常用指标", value: "任务分数 / 分类平均 / 总分" }
      ],
      evaluates: ["近期信息上的泛化", "客观题推", "代码和数据分", "指令遵循与语言任务"],
      metrics: ["总体平均", "类别分数", "任务 accuracy/exact match", "不同发布时间窗口表现"],
      useCases: ["通用模型版本对比", "替代静态榜单做趋势观察", "模型发布页综合能力指", "抗污染评测专"],
      limitations: ["动态更新导致历史结果需标注日期", "客观答案任务不覆盖主观写作体", "与聊天偏好榜不能直接互相替代"],
      rankings: {
        metric: "LiveBench average score",
        updated: "LMMarketCap 快照 026-05-22",
        sourceName: "LMMarketCap LiveBench",
        sourceUrl: "https://lmmarketcap.com/benchmarks/livebench",
        items: [
          { rank: 1, name: "o4 Mini High", score: "87.3%", note: "OpenAI" },
          { rank: 2, name: "R1 0528", score: "84.4%", note: "DeepSeek" },
          { rank: 3, name: "Qwen3 235B A22B", score: "80.4%", note: "Alibaba" },
          { rank: 4, name: "Claude 3.5 Sonnet", score: "80.0%", note: "Anthropic" },
          { rank: 4, name: "Gemini 2.0 Flash", score: "80.0%", note: "Google" },
          { rank: 4, name: "Gemma 4 31B", score: "80.0%", note: "Google" },
          { rank: 7, name: "GPT-5.4", score: "79.0%", note: "OpenAI" },
          { rank: 8, name: "Claude Opus 4.6", score: "78.5%", note: "Anthropic" },
          { rank: 9, name: "Gemini 3 Pro", score: "78.0%", note: "Google" },
          { rank: 10, name: "GPT-5.2", score: "77.5%", note: "OpenAI" },
          { rank: 11, name: "GPT-5", score: "76.0%", note: "OpenAI" },
          { rank: 12, name: "Gemini 2.5 Pro", score: "75.6%", note: "Google" },
          { rank: 13, name: "o3", score: "74.8%", note: "OpenAI" },
          { rank: 14, name: "Gemini 3 Flash", score: "74.5%", note: "Google" },
          { rank: 15, name: "Claude Opus 4.5", score: "74.0%", note: "Anthropic" },
          { rank: 15, name: "GPT-5.1", score: "74.0%", note: "OpenAI" },
          { rank: 17, name: "Claude Sonnet 4.6", score: "73.2%", note: "Anthropic" },
          { rank: 18, name: "Grok 4", score: "73.0%", note: "xAI" },
          { rank: 19, name: "Claude Opus 4", score: "72.0%", note: "Anthropic" },
          { rank: 19, name: "o4-mini", score: "72.0%", note: "OpenAI" }
        ]
      },
      sources: [
        { name: "LiveBench GitHub", url: "https://github.com/livebench/livebench" },
        { name: "LiveBench 官网", url: "https://livebench.ai/" },
        { name: "LiveBench arXiv", url: "https://arxiv.org/abs/2406.19314" }
      ]
    },
    "open-asr": {
      title: "Open ASR",
      subtitle: "Hugging Face 开放语音识别榜单数据集集合",
      summary: "Open ASR Leaderboard 汇总多种公开 ASR 测试集，WER 和推理速度等指标比较语音识别模型，覆盖英文核心测试集、长音频和多语种场景",
      facts: [
        { label: "任务类型", value: "自动语音识别 ASR" },
        { label: "覆盖", value: "ESB、长音频、多语种和不同录音条" },
        { label: "主要指标", value: "WER，越低越好；RTFx，越高越" },
        { label: "维护", value: "Hugging Face Audio 社区" }
      ],
      evaluates: ["转写准确", "不同语种稳定", "长音频表", "推理速度与部署成"],
      metrics: ["Average WER", "各数据集 WER", "RTFx", "模型大小与推理资"],
      useCases: ["会议转写模型选型", "字幕生成 ASR 比较", "客服录音识别", "边缘端语音识别评"],
      limitations: ["公开集与真实业务音频差异很大", "WER 不反映标点、说话人分离和格式化质量", "隐私数据集结果与公开结果需分开"],
      rankings: {
        metric: "Average WER 英文短音频，越低越好",
        updated: "Open ASR Leaderboard 论文 Table 3026",
        sourceName: "Open ASR Leaderboard arXiv:2510.06961",
        sourceUrl: "https://arxiv.org/html/2510.06961v4",
        items: [
          { rank: 1, name: "Cohere Labs Transcribe", score: "5.42 WER", note: "Cohere Labs" },
          { rank: 2, name: "Zoom Scribe v1", score: "5.47 WER", note: "Zoom" },
          { rank: 3, name: "IBM Granite Speech 4.0 1B", score: "5.52 WER", note: "IBM" },
          { rank: 4, name: "NVIDIA Canary Qwen 2.5B", score: "5.63 WER", note: "NVIDIA" },
          { rank: 5, name: "IBM Granite Speech 3.3 8B", score: "5.76 WER", note: "IBM" },
          { rank: 6, name: "Qwen3 ASR 1.7B", score: "5.76 WER", note: "Alibaba Cloud" },
          { rank: 7, name: "ElevenLabs Scribe v2", score: "5.83 WER", note: "ElevenLabs" },
          { rank: 8, name: "IBM Granite Speech 3.3 2B", score: "6.00 WER", note: "IBM" },
          { rank: 9, name: "Microsoft Phi 4 Multimodal Instruct", score: "6.02 WER", note: "Microsoft" },
          { rank: 10, name: "NVIDIA Parakeet TDT 0.6B v2", score: "6.05 WER", note: "NVIDIA" },
          { rank: 11, name: "AssemblyAI Universal 3 Pro", score: "6.21 WER", note: "AssemblyAI" },
          { rank: 12, name: "NVIDIA Parakeet TDT 0.6B v3", score: "6.32 WER", note: "NVIDIA" },
          { rank: 13, name: "Google Chirp v2", score: "6.42 WER", note: "Google" },
          { rank: 14, name: "NVIDIA Canary 1B", score: "6.50 WER", note: "NVIDIA" },
          { rank: 15, name: "Mistral AI Voxtral Small 24B", score: "6.62 WER", note: "Mistral AI" },
          { rank: 16, name: "Nyra Health CrisperWhisper", score: "6.67 WER", note: "Nyra Health" },
          { rank: 17, name: "Speechmatics Enhanced", score: "6.91 WER", note: "Speechmatics" },
          { rank: 18, name: "RevAI Fusion", score: "7.12 WER", note: "Rev AI" },
          { rank: 19, name: "NVIDIA Canary 1B v2", score: "7.15 WER", note: "NVIDIA" },
          { rank: 20, name: "Distil-Whisper Large v3.5", score: "7.21 WER", note: "Hugging Face" }
        ]
      },
      sources: [
        { name: "Open ASR Leaderboard GitHub", url: "https://github.com/huggingface/open_asr_leaderboard" },
        { name: "Hugging Face Open ASR Space", url: "https://huggingface.co/spaces/hf-audio/open_asr_leaderboard" },
        { name: "Appen / Hugging Face 合作说明", url: "https://www.appen.com/press-release/appen-hugging-face-open-asr-leaderboard" }
      ]
    },
    "fleurs-common-voice-librispeech": {
      title: "FLEURS / Common Voice / LibriSpeech",
      subtitle: "ASR 常用公开语音数据集组",
      summary: "这组三类数据集分别代表多语种平行语音、社区众包开放语音和干净朗读英文语音，常 ASR 榜单组合使用，用来观察模型在语言覆盖、开源语料和标准英文转写上的表现",
      facts: [
        { label: "FLEURS", value: "102 种语言，每种约 12 小时语音监督" },
        { label: "Common Voice", value: "Mozilla 社区众包的开放多语种语音数据" },
        { label: "LibriSpeech", value: "1000 小时 16kHz 英文朗读语音" },
        { label: "常用指标", value: "WER / CER / Language ID accuracy" }
      ],
      evaluates: ["多语 ASR", "低资源语言覆盖", "干净朗读英文识别", "社区采集语音的鲁棒"],
      metrics: ["WER", "CER", "语言识别准确", "不同口音/语种分项表现"],
      useCases: ["ASR 模型训练和评", "多语言字幕产品", "低资源语言研究", "开源语音模型对"],
      limitations: ["LibriSpeech 偏干净朗读，不代表会议/电话噪声", "Common Voice 质量和口音分布随语言差异", "FLEURS 每语种规模有"],
      rankings: {
        metric: "WER 综合（Open ASR Leaderboard 英文均值，LibriSpeech / CommonVoice 子集",
        updated: "Open ASR Leaderboard arXiv:2510.06961v4 + Gladia 2026 整理",
        sourceName: "Open ASR Leaderboard 论文 + Gladia 开 STT 综述",
        sourceUrl: "https://arxiv.org/html/2510.06961v4",
        items: [
          { rank: 1, name: "NVIDIA Canary-Qwen 2.5B", score: "5.63 avg WER", note: "LibriSpeech clean 1.6 / other 3.1" },
          { rank: 2, name: "Cohere Labs Transcribe", score: "5.42 avg WER", note: "Cohere Labs" },
          { rank: 3, name: "Zoom Scribe v1", score: "5.47 avg WER", note: "Zoom" },
          { rank: 4, name: "IBM Granite Speech 4.0 1B", score: "5.52 avg WER", note: "IBM" },
          { rank: 5, name: "IBM Granite Speech 3.3 8B", score: "5.76 avg WER", note: "IBM" },
          { rank: 6, name: "Qwen3 ASR 1.7B", score: "5.76 avg WER", note: "Alibaba / 52 种语言" },
          { rank: 7, name: "ElevenLabs Scribe v2", score: "5.83 avg WER", note: "ElevenLabs" },
          { rank: 8, name: "IBM Granite Speech 3.3 2B", score: "6.00 avg WER", note: "IBM" },
          { rank: 9, name: "Microsoft Phi 4 Multimodal Instruct", score: "6.02 avg WER", note: "多语种覆" },
          { rank: 10, name: "NVIDIA Parakeet TDT 0.6B v2", score: "6.05 avg WER", note: "NVIDIA" },
          { rank: 11, name: "AssemblyAI Universal 3 Pro", score: "6.21 avg WER", note: "AssemblyAI" },
          { rank: 12, name: "NVIDIA Parakeet TDT 0.6B v3", score: "6.32 avg WER", note: "NVIDIA" },
          { rank: 13, name: "Google Chirp v2", score: "6.42 avg WER", note: "Google" },
          { rank: 14, name: "NVIDIA Canary 1B", score: "6.50 avg WER", note: "NVIDIA" },
          { rank: 15, name: "Mistral AI Voxtral Small 24B", score: "6.62 avg WER", note: "Mistral / 多语" },
          { rank: 16, name: "Nyra Health CrisperWhisper", score: "6.67 avg WER", note: "Whisper fine-tune" },
          { rank: 17, name: "Speechmatics Enhanced", score: "6.91 avg WER", note: "Speechmatics" },
          { rank: 18, name: "RevAI Fusion", score: "7.12 avg WER", note: "Rev AI" },
          { rank: 19, name: "Whisper Large v3", score: "~7.4 avg WER", note: "OpenAI / 99+ 语言基线" },
          { rank: 20, name: "Whisper Large v3 Turbo", score: "~7.75 avg WER", note: "OpenAI / 实时优化" }
        ]
      },
      sources: [
        { name: "FLEURS arXiv", url: "https://arxiv.org/abs/2205.12446" },
        { name: "Mozilla Common Voice", url: "https://commonvoice.mozilla.org/" },
        { name: "LibriSpeech Hugging Face", url: "https://huggingface.co/datasets/openslr/librispeech_asr" },
        { name: "ESB datasets", url: "https://huggingface.co/datasets/esb/datasets" }
      ]
    },
    "superb": {
      title: "SUPERB",
      subtitle: "Speech processing Universal PERformance Benchmark",
      summary: "SUPERB 用统一协议评估自监督语音表示在多种下游任务上的迁移能力，通常冻结共享模型，只训练轻量任务头，观察表示本身是否通用",
      facts: [
        { label: "任务类型", value: "语音表示多任务评" },
        { label: "覆盖", value: "ASR、说话人、情感、语音命令、语义等" },
        { label: "评测方式", value: "冻结 backbone + 任务" },
        { label: "常用指标", value: "按任务使 WER、accuracy、EER " }
      ],
      evaluates: ["语音内容理解", "说话人信", "副语言和情感线", "自监督语音表示泛"],
      metrics: ["WER", "Accuracy", "EER", "任务平均表现"],
      useCases: ["语音预训练模型研", "语音 embedding 选型", "语音理解系统底座比较", "低资源语音任务迁"],
      limitations: ["冻结表示协议与端到端微调结果不同", "任务集合不能覆盖所有生产语音场", "不同 SUPERB 扩展版本需要分开比较"],
      rankings: {
        metric: "SUPERBs 综合分（基于 WavLM 论文 Table 2 公开数据",
        updated: "WavLM 论文 arXiv:2110.13900 / Microsoft 官方仓库",
        sourceName: "WavLM 论文 + SUPERB 官方",
        sourceUrl: "https://github.com/microsoft/unilm/blob/master/wavlm/README.md",
        items: [
          { rank: 1, name: "WavLM Large", score: "906", note: "Microsoft / SUPERBs" },
          { rank: 2, name: "UniSpeech-SAT Large", score: "877", note: "Microsoft" },
          { rank: 3, name: "HuBERT Large", score: "877", note: "Meta AI" },
          { rank: 4, name: "WavLM Base+", score: "869", note: "Microsoft" },
          { rank: 5, name: "wav2vec 2.0 Large", score: "862", note: "Meta AI" },
          { rank: 6, name: "UniSpeech-SAT Base+", score: "829", note: "Microsoft" },
          { rank: 7, name: "WavLM Base", score: "821", note: "Microsoft" },
          { rank: 8, name: "UniSpeech-SAT Base", score: "802", note: "Microsoft" },
          { rank: 9, name: "HuBERT Base", score: "791", note: "Meta AI" },
          { rank: 10, name: "wav2vec 2.0 Base", score: "781", note: "Meta AI" },
          { rank: 11, name: "DistilHuBERT", score: "716", note: "NTU" },
          { rank: 12, name: "DeCoAR 2.0", score: "705", note: "Amazon AWS" },
          { rank: 13, name: "TERA", score: "681", note: "NTU" },
          { rank: 14, name: "APC", score: "671", note: "MIT / CMU" },
          { rank: 15, name: "VQ-APC", score: "668", note: "MIT / CMU" },
          { rank: 16, name: "NPC", score: "666", note: "NTU" },
          { rank: 17, name: "Modified CPC", score: "631", note: "Meta AI" },
          { rank: 18, name: "vq-wav2vec", score: "615", note: "Meta AI" },
          { rank: 19, name: "Mockingjay", score: "614", note: "NTU" },
          { rank: 20, name: "PASE+", score: "562", note: "Mila" }
        ]
      },
      sources: [
        { name: "SUPERB arXiv", url: "https://arxiv.org/abs/2105.01051" },
        { name: "Meta AI 论文", url: "https://ai.meta.com/research/publications/superb-speech-processing-universal-performance-benchmark/" },
        { name: "SUPERB Benchmark", url: "https://superbbenchmark.org/" }
      ]
    },
    "hear": {
      title: "HEAR",
      subtitle: "Holistic Evaluation of Audio Representations",
      summary: "HEAR 评估通用音频表示能否迁移到语音、环境声和音乐等多种下游任务，重点不是单一 ASR，而是 audio embedding 的跨领域泛化能力",
      facts: [
        { label: "任务类型", value: "通用音频表征评测" },
        { label: "规模", value: "19个多领域任务" },
        { label: "领域", value: "speech、environmental sound、music" },
        { label: "评测对象", value: "音频 embedding / representation model" }
      ],
      evaluates: ["音频表示泛化", "环境声分", "音乐相关任务", "语音短时/长时任务迁移"],
      metrics: ["分类准确", "多标签指", "事件检测指", "任务归一化综合分"],
      useCases: ["audio embedding 选型", "声音检索和分类", "音乐/环境声理", "通用音频底座研究"],
      limitations: ["不直接评估语音生成或转写完整体验", "任务权重会影响总分解读", "MAEB 等新 benchmark 需要结合使"],
      rankings: {
        metric: "HEAR 综合归一化得分（NeurIPS 2021 + PaSST 论文整理",
        updated: "PaSST 论文 HEAR 官方页面公开结果",
        sourceName: "HEAR Leaderboard + PaSST 论文",
        sourceUrl: "https://hearbenchmark.com/hear-leaderboard.html",
        items: [
          { rank: 1, name: "PaSST Ensemble", score: "0.83", note: "JKU Linz / Koutini et al." },
          { rank: 2, name: "PaSST-S", score: "0.81", note: "JKU Linz" },
          { rank: 3, name: "PaSST Base", score: "0.79", note: "JKU Linz" },
          { rank: 4, name: "PANN CNN14", score: "0.76", note: "Surrey CVSSP" },
          { rank: 5, name: "AST (Audio Spectrogram Transformer)", score: "0.74", note: "MIT CSAIL" },
          { rank: 6, name: "BEATs", score: "0.74", note: "Microsoft 后续提交" },
          { rank: 7, name: "wav2vec 2.0 Large", score: "0.72", note: "Meta AI" },
          { rank: 8, name: "HuBERT Large", score: "0.71", note: "Meta AI" },
          { rank: 9, name: "data2vec Large", score: "0.70", note: "Meta AI" },
          { rank: 10, name: "WavLM Large", score: "0.69", note: "Microsoft" },
          { rank: 11, name: "YAMNet", score: "0.67", note: "Google" },
          { rank: 12, name: "VGGish", score: "0.65", note: "Google" },
          { rank: 13, name: "OpenL3", score: "0.64", note: "NYU MARL" },
          { rank: 14, name: "CREPE", score: "0.62", note: "NYU MARL / pitch" },
          { rank: 15, name: "Coala", score: "0.60", note: "UPF Barcelona" },
          { rank: 16, name: "BYOL-A", score: "0.59", note: "NTT" },
          { rank: 17, name: "TRILL/TRILLsson", score: "0.58", note: "Google Speech" },
          { rank: 18, name: "EfficientAT", score: "0.57", note: "JKU Linz" },
          { rank: 19, name: "FB-MelGAN audio encoder", score: "0.55", note: "学术基线" },
          { rank: 20, name: "Random projections baseline", score: "0.40", note: "HEAR 官方基线" }
        ]
      },
      sources: [
        { name: "HEAR 官网", url: "https://hearbenchmark.com/" },
        { name: "HEAR Tasks", url: "https://hearbenchmark.com/hear-tasks.html" },
        { name: "HEAR arXiv", url: "https://arxiv.org/abs/2203.03022" }
      ]
    },
    "ttsds": {
      title: "TTSDS",
      subtitle: "Text-to-Speech Distribution Score",
      summary: "TTSDS 用分布距离思路评估合成语音质量，把韵律、说话人身份和可懂度等因素与真实语音及噪声数据对比，适合快速比 TTS 系统的整体自然度",
      facts: [
        { label: "任务类型", value: "TTS 合成语音质量评估" },
        { label: "版本", value: "TTSDS2 支持多语种并定期更新" },
        { label: "维度", value: "prosody、speaker identity、intelligibility" },
        { label: "常用指标", value: "TTS Distribution Score" }
      ],
      evaluates: ["合成语音自然", "韵律和节", "说话人相似度", "可懂"],
      metrics: ["TTSDS 综合", "韵律分布差异", "说话人身份差", "WER/可懂度相关指"],
      useCases: ["TTS 模型选型", "配音工具横评", "多语 TTS 质量跟踪", "开 TTS 系统比较"],
      limitations: ["自动指标不能完全替代真人听感", "情绪控制和长音频稳定性需要额外测", "不同语言的可比性要谨慎"],
      rankings: {
        metric: "TTSDS2 综合分（越高越好，Ground Truth 为人工参考上限）",
        updated: "TTSDS2 论文 arXiv:2506.19441v1 Table 5",
        sourceName: "TTSDS2 论文",
        sourceUrl: "https://arxiv.org/html/2506.19441v1",
        items: [
          { rank: 1, name: "Ground Truth", score: "93.21", note: "人工参考基" },
          { rank: 2, name: "MaskGCT", score: "91.76", note: "跨域相关性最" },
          { rank: 3, name: "E2-TTS", score: "91.73", note: "接近人类评估" },
          { rank: 4, name: "F5-TTS", score: "91.16", note: "曾超 ground truth 报告" },
          { rank: 5, name: "Vevo", score: "90.20", note: "2025 发布" },
          { rank: 6, name: "FishSpeech", score: "89.88", note: "多语" },
          { rank: 7, name: "GPTSoVITS", score: "89.22", note: "开源主" },
          { rank: 8, name: "TorToiSe", score: "88.95", note: "零样本声音克" },
          { rank: 9, name: "Pheme", score: "88.84", note: "高效合成" },
          { rank: 10, name: "HierSpeech++", score: "88.63", note: "接近 ground truth" },
          { rank: 11, name: "VoiceCraft", score: "88.30", note: "语音编辑能力" },
          { rank: 12, name: "XTTS", score: "88.20", note: "Coqui / 多语" },
          { rank: 13, name: "WhisperSpeech", score: "87.91", note: "社区项目" },
          { rank: 14, name: "MetaVoice", score: "87.38", note: "零样本克" },
          { rank: 15, name: "StyleTTS2", score: "85.87", note: "Cornell" },
          { rank: 16, name: "Bark", score: "85.21", note: "Suno" },
          { rank: 17, name: "ParlerTTS", score: "84.88", note: "Hugging Face" },
          { rank: 18, name: "SpeechT5", score: "84.84", note: "Microsoft 2022" },
          { rank: 19, name: "VALL-E", score: "83.59", note: "神经编解码方" },
          { rank: 20, name: "OpenVoice", score: "83.32", note: "MyShell / 即时克隆" }
        ]
      },
      sources: [
        { name: "TTSDS GitHub", url: "https://github.com/ttsds/ttsds" },
        { name: "TTSDS Leaderboard", url: "https://ttsdsbenchmark.com/#leaderboard" }
      ]
    },
    "mint-bench": {
      title: "MINT-Bench",
      subtitle: "多语种指令跟 TTS 评测",
      summary: "MINT-Bench 关注可控、表达型、多语种 TTS，使用分层多轴分类和混合评估协议，同时考察内容一致性、指令跟随和感知质量",
      facts: [
        { label: "任务类型", value: "Instruction-following TTS" },
        { label: "语言", value: "论文实验覆盖 10 种语言" },
        { label: "评估", value: "内容一致性、指令跟随、感知质" },
        { label: "发布时间", value: "2026-04" }
      ],
      evaluates: ["根据自然语言控制语音风格", "情绪/副语言/组合指令遵循", "多语种表达稳定", "内容与音频的一致"],
      metrics: ["content consistency", "instruction following", "perceptual quality", "语言/指令类别分项表现"],
      useCases: ["可控 TTS 产品评估", "AI 配音和角色语", "多语种有声内容生", "开源与商业 TTS 对比"],
      limitations: ["benchmark，生态和复现结果仍在增长", "自动评估仍需真人听感校验", "复杂副语言控制仍是短板"],
      rankings: {
        metric: "Overall（Instruction Following / Perceptual Quality 综合，越高越好）",
        updated: "MINT-Bench 官方榜：2026-04",
        sourceName: "MINT-Bench 官方",
        sourceUrl: "https://longwaytog0.github.io/MINT-Bench/",
        items: [
          { rank: 1, name: "Gemini 2.5-Flash", score: "2.44 / 3.66", note: "Google / 商业" },
          { rank: 2, name: "Gemini 2.5-Pro", score: "2.39 / 3.45", note: "Google / 商业" },
          { rank: 3, name: "ElevenLabs-ttv-v3", score: "2.23 / 3.12", note: "ElevenLabs / 商业" },
          { rank: 4, name: "Qwen3TTS-12Hz-1.7B-VD", score: "2.12 / 2.94", note: "Alibaba / 开" },
          { rank: 5, name: "MiniMax-Speech-2.7", score: "1.95 / 2.62", note: "MiniMax / 商业" },
          { rank: 6, name: "MOSS-VoiceGenerator", score: "1.90 / 2.53", note: "复旦 / 开" },
          { rank: 7, name: "Hume-Octave1", score: "1.86 / 2.51", note: "Hume AI / 商业" },
          { rank: 8, name: "MiMo-Audio-7B-Instruct", score: "1.75 / 2.22", note: "Xiaomi / 开" },
          { rank: 9, name: "GPT-4o-Mini-TTS", score: "1.69 / 2.15", note: "OpenAI / 商业" },
          { rank: 10, name: "Ming-omni-tts-16.8B-A3B", score: "1.51 / 1.79", note: "InspireMusic / 开" },
          { rank: 11, name: "Ming-omni-tts-0.5B", score: "1.41 / 1.70", note: "InspireMusic / 开" },
          { rank: 12, name: "Parler-TTS Large", score: "1.38 / 1.52", note: "Hugging Face / 开" },
          { rank: 13, name: "Parler-TTS Mini", score: "1.04 / 1.13", note: "Hugging Face / 开" }
        ]
      },
      sources: [
        { name: "MINT-Bench arXiv", url: "https://arxiv.org/abs/2604.17958" },
        { name: "MINT-Bench Leaderboard / Demo", url: "https://longwaytog0.github.io/MINT-Bench/" }
      ]
    },
    "mteb": {
      title: "MTEB",
      subtitle: "Massive Text Embedding Benchmark",
      summary: "MTEB 是文 embedding 领域最常用的综合评测之一，覆盖检索、分类、聚类、语义相似度、重排序、摘要、双语挖掘等任务，用来判 embedding 是否适合 RAG 和语义检索",
      facts: [
        { label: "任务类型", value: "文本 embedding 多任务评" },
        { label: "覆盖", value: "8 大任务类型，扩展到大量语言和领" },
        { label: "生", value: "Hugging Face leaderboard / MTEB Python " },
        { label: "常用指标", value: "NDCG@10、Spearman、Accuracy、V-measure " }
      ],
      evaluates: ["语义检", "文本分类", "聚类", "语义相似度和重排"],
      metrics: ["Retrieval NDCG@10", "STS Spearman", "Classification Accuracy/F1", "Clustering V-measure"],
      useCases: ["RAG embedding 选型", "企业知识库检", "多语种语义搜", "reranker/embedding 模型对比"],
      limitations: ["总体分不代表你的私有语料最", "检索任务应结合自己 query/doc 测试", "多语种、长文本、代码和行业语料要看分项"],
      rankings: {
        metric: "MTEB Average / v2（含 legacy v2，需注意可比性）",
        updated: "AwesomeAgents 快照 026-04",
        sourceName: "AwesomeAgents MTEB April 2026",
        sourceUrl: "https://awesomeagents.ai/leaderboards/embedding-model-leaderboard-mteb-april-2026/",
        items: [
          { rank: 1, name: "Microsoft Harrier-OSS-v1 (27B)", score: "74.3", note: "MTEB v2" },
          { rank: 2, name: "NV-Embed-v2", score: "72.31", note: "NVIDIA / legacy MTEB" },
          { rank: 3, name: "Jina v5-text-small", score: "71.7", note: "Jina AI / MTEB v2" },
          { rank: 4, name: "BGE-en-ICL", score: "71.24", note: "BAAI / legacy MTEB" },
          { rank: 5, name: "Qwen3-Embedding-8B", score: "70.58", note: "Alibaba / MMTEB" },
          { rank: 6, name: "GTE-Qwen2-7B-instruct", score: "70.24", note: "Alibaba / legacy MTEB" },
          { rank: 7, name: "Gemini Embedding 001", score: "68.32", note: "Google / 当前 MTEB 主榜第一" },
          { rank: 8, name: "Voyage-3.1-large", score: "67.40", note: "Voyage AI" },
          { rank: 9, name: "Jina Embeddings v4", score: "66.81", note: "Jina AI" },
          { rank: 10, name: "Voyage-3-large", score: "66.80", note: "Voyage AI" },
          { rank: 11, name: "Cohere Embed v4", score: "65.20", note: "Cohere" },
          { rank: 12, name: "OpenAI text-embedding-3-large", score: "64.60", note: "OpenAI" },
          { rank: 13, name: "BGE-M3", score: "63.00", note: "BAAI / 多语" },
          { rank: 14, name: "Nomic Embed v1.5", score: "62.39", note: "Nomic AI" },
          { rank: 15, name: "OpenAI text-embedding-3-small", score: "62.26", note: "OpenAI / 经济" }
        ]
      },
      sources: [
        { name: "MTEB Leaderboard", url: "https://mteb-leaderboard.hf.space/" },
        { name: "MTEB GitHub / Docs", url: "https://embeddings-benchmark.github.io/mteb/" },
        { name: "MTEB arXiv", url: "https://arxiv.org/abs/2210.07316" }
      ]
    },
    "maeb": {
      title: "MAEB",
      subtitle: "Massive Audio Embedding Benchmark",
      summary: "MAEB MTEB 的统一评测思想扩展到音 embedding，覆盖语音、音乐、环境声和音文本跨模态推理，用来观察音频表示模型是否能跨领域泛化",
      facts: [
        { label: "任务类型", value: "音频 embedding 综合评测" },
        { label: "覆盖", value: "30个任务，衍生 98个任务集" },
        { label: "语言", value: "100+ 语言相关任务" },
        { label: "发布时间", value: "2026-02" }
      ],
      evaluates: ["语音 embedding", "音乐和环境声理解", "音频-文本跨模态检", "跨任务泛"],
      metrics: ["分类指标", "检索指", "聚类指标", "任务平均"],
      useCases: ["音频搜索和聚", "声音理解模型选型", "音频 LLM encoder 评估", "多语种音频表示研"],
      limitations: ["benchmark，排行榜仍在扩展", "没有单一模型能覆盖所有音频任", "真实业务音频仍需私有集复"],
      rankings: {
        metric: "Borda count 综合 + Overall Average（百分比，越高越好）",
        updated: "MAEB 论文 arXiv:2602.16008 + Hugging Face 博客 026-02",
        sourceName: "MAEB 论文 + HF 博客",
        sourceUrl: "https://huggingface.co/blog/AdnanElAssadi/maeb",
        items: [
          { rank: 1, name: "LCO-Embedding-Omni-7B", score: "52.2", note: "整体第一 / 跨模 50.3 / 零样 64.5" },
          { rank: 2, name: "Qwen2-Audio-7B", score: "33.7", note: "整体第二 / 音频-only 第一 50.8 / 重排 80.8" },
          { rank: 3, name: "SeamlessM4T", score: "", note: "Meta / 跨语种音频翻译型代表" },
          { rank: 4, name: "Whisper Large v3", score: "", note: "OpenAI / 语音任务强项" },
          { rank: 5, name: "MMS-1B", score: "", note: "Meta / 多语种语" },
          { rank: 6, name: "WavLM Large", score: "", note: "Microsoft / 自监督语音强" },
          { rank: 7, name: "HuBERT Large", score: "", note: "Meta / 自监督语" },
          { rank: 8, name: "Data2Vec Large", score: "", note: "Meta" },
          { rank: 9, name: "Wav2Vec 2.0 XLS-R", score: "", note: "Meta / 多语" },
          { rank: 10, name: "SpeechT5 Multimodal", score: "", note: "Microsoft / 多模" },
          { rank: 11, name: "CLAP (LAION)", score: "", note: "环境音乐检索强" },
          { rank: 12, name: "MS-CLAP", score: "", note: "Microsoft CLAP 变体" },
          { rank: 13, name: "clap-htsat-fused", score: "22.7 (Clustering)", note: "聚类任务最" },
          { rank: 14, name: "MuQ-MuLan", score: "", note: "音乐方向 CLAP" },
          { rank: 15, name: "Wav2CLIP", score: "", note: "音频-视觉-文本对齐" },
          { rank: 16, name: "AST (Audio Spectrogram Transformer)", score: "", note: "MIT" },
          { rank: 17, name: "CNN14 (PANNs)", score: "", note: "Surrey CVSSP / AudioSet 预训" },
          { rank: 18, name: "YAMNet", score: "", note: "Google" },
          { rank: 19, name: "Encodec", score: "", note: "Meta / 神经音频编解" },
          { rank: 20, name: "SpeechT5 ASR", score: "", note: "Microsoft / 语音偏向基线" }
        ]
      },
      sources: [
        { name: "MAEB arXiv", url: "https://arxiv.org/abs/2602.16008" },
        { name: "MTEB / MAEB GitHub", url: "https://github.com/embeddings-benchmark/mteb" }
      ]
    },
    "vbench": {
      title: "VBench",
      subtitle: "视频生成模型多维评测",
      summary: "VBench 将视频生成质量拆成静态质量、动态质量、文本对齐、主体一致性、运动等维度，避免只用单一主观观感比较 text-to-video image-to-video 模型",
      facts: [
        { label: "任务类型", value: "视频生成评测" },
        { label: "覆盖", value: "VBench / VBench++ 多维指标" },
        { label: "维度", value: "画质、审美、时序一致性、运动、文本对齐等" },
        { label: "常用指标", value: "各维度分数与综合" }
      ],
      evaluates: ["视频画质", "运动合理", "主体和场景一致", "prompt 对齐"],
      metrics: ["image quality", "aesthetic quality", "temporal consistency", "video-text consistency"],
      useCases: ["AI 视频工具横评", "文生视频模型选型", "营销/短视频生成质量对", "视频模型发布页分"],
      limitations: ["自动指标和人类审美仍有差", "不同 prompt 集合会影响排", "版权、安全和可控性需单独评估"],
      rankings: {
        metric: "Video generation overall rank / quality signal",
        updated: "VidScore 快照 026-05-22",
        sourceName: "VidScore AI Video Leaderboard",
        sourceUrl: "https://vidscore.dev/leaderboard",
        items: [
          { rank: 1, name: "HappyHorse 1.0", score: "1382", note: "Alibaba / overall leader" },
          { rank: 2, name: "Kling 2.5 Turbo", score: "1210", note: "Kuaishou" },
          { rank: 3, name: "Kling v3 Pro", score: "1243", note: "Kuaishou" },
          { rank: 4, name: "Veo 3.1", score: "1218", note: "Google DeepMind" },
          { rank: 5, name: "Veo 3.1 Fast", score: "1209", note: "Google DeepMind" },
          { rank: 6, name: "Runway Gen-4.5", score: "1223", note: "Runway" },
          { rank: 7, name: "Sora 2", score: "1194", note: "OpenAI" },
          { rank: 8, name: "LTX-2 Pro", score: "1130", note: "Lightricks" },
          { rank: 9, name: "Seedance 2.0", score: "1275", note: "ByteDance" },
          { rank: 10, name: "HunyuanVideo 1.5", score: "1015", note: "Tencent" },
          { rank: 11, name: "SkyReels V4", score: "1243", note: "Skywork AI" },
          { rank: 12, name: "Grok Imagine Video", score: "1227", note: "xAI" },
          { rank: 13, name: "Vidu Q3 Pro", score: "1223", note: "Shengshu Technology" },
          { rank: 14, name: "PixVerse V6", score: "1209", note: "PixVerse" },
          { rank: 15, name: "Luma Ray 3", score: "1204", note: "Luma AI" },
          { rank: 16, name: "Pika 2.0", score: "No benchmark", note: "Pika Labs" },
          { rank: 17, name: "Seedance 1.5 Pro", score: "1174", note: "ByteDance" },
          { rank: 18, name: "Hailuo 02 Pro", score: "1161", note: "MiniMax" },
          { rank: 19, name: "Kling v3 Standard", score: "No benchmark", note: "Kuaishou" },
          { rank: 20, name: "Pika 2.5", score: "1084", note: "Pika Labs" }
        ]
      },
      sources: [
        { name: "Video-Bench GitHub", url: "https://github.com/Video-Bench/Video-Bench" },
        { name: "VBench 论文 PDF", url: "https://vchitect.github.io/VBench-project/assets/vbench/VBench_paper.pdf" }
      ]
    },
    "ocrbench": {
      title: "OCRBench",
      subtitle: "大多模态模型文字识别与推理评测",
      summary: "OCRBench OCRBench v2 关注多模态模型在视觉文本上的能力，覆盖场景文字、文档、表格、公式、图表和文字定位推理等任务，VLM 文档能力评估的重要入口",
      facts: [
        { label: "任务类型", value: "OCR / VLM 文本理解" },
        { label: "OCRBench v2", value: "10,000个人工验证问答对 1 类场" },
        { label: "覆盖", value: "街景、收据、公式、图表、文档等" },
        { label: "常用指标", value: "任务准确</ 综合" }
      ],
      evaluates: ["图中文字识别", "文本定位和阅读顺", "表格/公式理解", "基于文字的视觉推"],
      metrics: ["综合", "场景分项准确", "文字定位表现", "推理型题目准确率"],
      useCases: ["OCR/VLM 模型选型", "票据和文档处", "多模 RAG 前处", "视觉文字问答产品评估"],
      limitations: ["OCRBench 高分不等于所有扫描件都稳", "真实票据字段抽取需 KIE/IDP 指标", "多页文档和版面恢复需要额外测"],
      rankings: {
        metric: "OCRBench v2 综合",
        updated: "CodeSOTA 快照 026-04/05",
        sourceName: "CodeSOTA OCRBench v2",
        sourceUrl: "https://www.codesota.com/browse/computer-vision/ocr-capabilities/ocrbench-v2",
        items: [
          { rank: 1, name: "Seed1.6-vision", score: "62.20", note: "ByteDance" },
          { rank: 2, name: "Qwen3-Omni-30B", score: "61.30", note: "Alibaba" },
          { rank: 3, name: "Nemotron Nano V2 VL", score: "61.20", note: "NVIDIA" },
          { rank: 4, name: "Gemini 2.5 Pro", score: "59.30", note: "Google" },
          { rank: 5, name: "Llama-3.1-Nemotron-Nano-VL-8B", score: "56.40", note: "NVIDIA / Meta" },
          { rank: 6, name: "GPT-4o", score: "55.50", note: "OpenAI" },
          { rank: 7, name: "Ovis2.5-8B", score: "54.10", note: "AIDC-AI" },
          { rank: 8, name: "Gemini 1.5 Pro", score: "51.60", note: "Google" },
          { rank: 9, name: "sail-vl2-8b", score: "49.30", note: "ByteDance Doubao" },
          { rank: 10, name: "MiniCPM-V-4.5-8B", score: "48.40", note: "OpenBMB" },
          { rank: 11, name: "GPT-4o-2024", score: "47.60", note: "OpenAI" },
          { rank: 12, name: "Claude 3.5 Sonnet", score: "47.50", note: "Anthropic" },
          { rank: 13, name: "InternVL3.5-14B", score: "47.10", note: "Shanghai AI Lab" },
          { rank: 14, name: "Step-1V", score: "46.80", note: "StepFun" },
          { rank: 15, name: "Grok 4", score: "45.00", note: "xAI" },
          { rank: 16, name: "GPT-4o mini", score: "44.10", note: "OpenAI" },
          { rank: 17, name: "Claude Sonnet 4", score: "42.40", note: "Anthropic" },
          { rank: 18, name: "Qwen2.5-VL-7B", score: "41.80", note: "Alibaba" },
          { rank: 19, name: "DeepSeek-VL2-Small", score: "41.00", note: "DeepSeek" },
          { rank: 20, name: "Pixtral-12B", score: "38.40", note: "Mistral AI" }
        ]
      },
      sources: [
        { name: "MultimodalOCR GitHub", url: "https://github.com/Yuliang-Liu/MultimodalOCR" },
        { name: "OCRBench arXiv", url: "https://arxiv.org/abs/2305.07895" },
        { name: "OCRBench v2 arXiv", url: "https://arxiv.org/abs/2501.00321" }
      ]
    },
    "docvqa": {
      title: "DocVQA",
      subtitle: "真实文档图像上的视觉问答",
      summary: "DocVQA 要求模型根据文档图像回答自然语言问题，答案通常来自文档中的文字片段。它 OCR、版面理解和问答结合起来，比单纯识别文字更贴近文 AI 场景",
      facts: [
        { label: "任务类型", value: "Document Visual Question Answering" },
        { label: "规模", value: "50K 问题 2K+ 文档图像" },
        { label: "来源", value: "UCSF Industry Documents Library 等真实文" },
        { label: "常用指标", value: "ANLS / Accuracy " }
      ],
      evaluates: ["文档 OCR", "问题定位相关文本", "版面和上下文理解", "从图像文档中抽取答案"],
      metrics: ["ANLS", "exact/normalized answer match", "任务 split 分数", "不同文档类型表现"],
      useCases: ["文档问答系统", "企业资料检", "票据/合同理解", "OCR + VQA 管线评估"],
      limitations: ["单页文档与多页复杂文档不", "答案多为文本片段，不覆盖所有推理型文档任务", "真实业务需额外评估表格、手写和低清扫描"],
      rankings: {
        metric: "DocVQA score (ANLS)",
        updated: "LLM Stats 快照 026-05",
        sourceName: "LLM Stats DocVQA",
        sourceUrl: "https://llm-stats.com/benchmarks/docvqa",
        items: [
          { rank: 1, name: "Qwen2.5 VL 72B Instruct", score: "0.964", note: "Alibaba Cloud / Qwen Team" },
          { rank: 2, name: "Qwen2.5 VL 7B Instruct", score: "0.957", note: "Alibaba Cloud / Qwen Team" },
          { rank: 3, name: "Claude 3.5 Sonnet", score: "0.952", note: "Anthropic" },
          { rank: 3, name: "Qwen2.5-Omni-7B", score: "0.952", note: "Alibaba Cloud / Qwen Team" },
          { rank: 5, name: "Mistral Small 3.2 24B Instruct", score: "0.949", note: "Mistral AI" },
          { rank: 6, name: "Qwen2.5 VL 32B Instruct", score: "0.948", note: "Alibaba Cloud / Qwen Team" },
          { rank: 7, name: "Llama 4 Maverick", score: "0.944", note: "Meta" },
          { rank: 7, name: "Llama 4 Scout", score: "0.944", note: "Meta" },
          { rank: 9, name: "Grok-2", score: "0.936", note: "xAI" },
          { rank: 10, name: "Nova Pro", score: "0.935", note: "Amazon" },
          { rank: 11, name: "Pixtral Large", score: "0.933", note: "Mistral AI" },
          { rank: 11, name: "DeepSeek VL2", score: "0.933", note: "DeepSeek" },
          { rank: 13, name: "Phi-4-multimodal-instruct", score: "0.932", note: "Microsoft" },
          { rank: 13, name: "Grok-2 mini", score: "0.932", note: "xAI" },
          { rank: 15, name: "GPT-4o", score: "0.928", note: "OpenAI" },
          { rank: 16, name: "Nova Lite", score: "0.924", note: "Amazon" },
          { rank: 17, name: "DeepSeek VL2 Small", score: "0.923", note: "DeepSeek" },
          { rank: 18, name: "Pixtral-12B", score: "0.907", note: "Mistral AI" },
          { rank: 19, name: "Llama 3.2 90B Instruct", score: "0.901", note: "Meta" },
          { rank: 20, name: "DeepSeek VL2 Tiny", score: "0.889", note: "DeepSeek" }
        ]
      },
      sources: [
        { name: "DocVQA 官方网站", url: "https://www.docvqa.org/" },
        { name: "DocVQA Dataset", url: "https://site.docvqa.org/datasets/docvqa" },
        { name: "WACV 2021 论文 PDF", url: "https://openaccess.thecvf.com/content/WACV2021/papers/Mathew_DocVQA_A_Dataset_for_VQA_on_Document_Images_WACV_2021_paper.pdf" }
      ]
    }
  },
  skillRecommendations: [
    {
      title: "AI 编程 Skill",
      level: "入门到进",
      description: "把常见开发动作沉淀成可复用规则：读代码、改 Bug、写测试、做 Review",
      keywords: ["agent-skills", "Codex", "Claude Code", "Review"],
      url: "#topic-ai-coding"
    },
    {
      title: "研究写作 Skill",
      level: "进阶",
      description: "面向论文阅读、文献综述、实验记录、技术写作和审稿修改 Skill 流程",
      keywords: ["Research", "Writing", "Review", "Claude"],
      url: "#github-weekly"
    },
    {
      title: "Agent 自动化 Skill",
      level: "进阶",
      description: "围绕 MCP、工具调用、桌面操作和工作流编排，搭建可执行任务的智能体",
      keywords: ["MCP", "UI Agent", "Workflow", "Agent"],
      url: "#topic-ai-agents"
    },
    {
      title: "AI 绘画视频 Skill",
      level: "入门",
      description: "学习提示词、镜头描述、风格控制、商品图和短视频素材生成",
      keywords: ["提示", "文生图", "文生视频", "商业素材"],
      url: "#topic-ai-image-video"
    },
    {
      title: "模型评测 Skill",
      level: "进阶",
      description: "按中文能力、代码能力、推理能力、工具调用和成本维度评估大模型",
      keywords: ["排行", "Benchmark", "模型选型", "成本"],
      url: "#benchmark"
    },
    {
      title: "AI 内容站 Skill",
      level: "实战",
      description: "面向 SEO AdSense，规划长尾关键词、原创导读、榜单页和工具对比页",
      keywords: ["SEO", "AdSense", "内容规划", "导航"],
      url: "#adsense"
    }
  ],
  githubWeekly: [
    {
      name: "addyosmani/agent-skills",
      lang: "Skills",
      description: "面向 AI coding agents 的工 Skill 集合，把代码审查、调试、重构等动作沉淀成可复用流程",
      why: "搜索趋势显示 agent skills 正在成为 AI 编程工具的新入口",
      url: "https://github.com/addyosmani/agent-skills",
      source: "SignalForges · 2026-05-10"
    },
    {
      name: "bytedance/UI-TARS-desktop",
      lang: "TypeScript",
      description: "字节开源的多模态桌 Agent 栈，关注真实桌面和浏览器操作场景",
      why: "适合放在 AI 智能体、GUI Agent 和自动化工作流专题",
      url: "https://github.com/bytedance/UI-TARS-desktop",
      source: "GitTrend · 2026-05"
    },
    {
      name: "datawhalechina/hello-agents",
      lang: "Python",
      description: "中文智能体教程项目，面向从零开始学 Agent 原理、实践和工具调用",
      why: "很适合作为中文 AI 学习入口和教程型长尾内容",
      url: "https://github.com/datawhalechina/hello-agents",
      source: "GitTrend · 2026-05"
    },
    {
      name: "colbymchenry/codegraph",
      lang: "TypeScript",
      description: "面向 Claude Code、Codex、Cursor、OpenCode 的本地代码知识图谱，用于减少 token 和工具调用",
      why: "适合放在 AI 编程工具和代码理解专题",
      url: "https://github.com/colbymchenry/codegraph",
      source: "GitTrend · 2026-05-21"
    },
    {
      name: "multica-ai/andrej-karpathy-skills",
      lang: "Markdown",
      description: "Andrej Karpathy 关于 LLM 编程常见问题的观察整理成 CLAUDE.md 行为规范",
      why: "适合作为 Skill 推荐 AI 编程规范案例",
      url: "https://github.com/multica-ai/andrej-karpathy-skills",
      source: "GitTrend · 2026-05-21"
    },
    {
      name: "NousResearch/hermes-agent",
      lang: "Python",
      description: "NousResearch AI agent 项目，聚焦可成长的智能体能力",
      why: "适合放进 Agent 框架和开源智能体栏目",
      url: "https://github.com/NousResearch/hermes-agent",
      source: "GitTrend · 2026-05-21"
    },
    {
      name: "Imbad0202/academic-research-skills",
      lang: "Python",
      description: "面向 Claude Code 的学术研究技能流程，覆盖 research、write、review、revise、finalize",
      why: "适合扩展 AI 研究写作和论文工具专题",
      url: "https://github.com/Imbad0202/academic-research-skills",
      source: "GitTrend · 2026-05-21"
    },
    {
      name: "K-Dense-AI/scientific-agent-skills",
      lang: "Skills",
      description: "面向研究、科学、工程、金融分析和技术写作的 agent skills 集合",
      why: "适合做“AI Skill 推荐”栏目样例",
      url: "https://github.com/K-Dense-AI/scientific-agent-skills",
      source: "ToolBrain · 2026-05-16"
    },
    {
      name: "Luongnv89/asm",
      lang: "CLI",
      description: "通用 AI coding agent skill manager，支 Claude Code、Codex、Cursor、Windsurf 等多种提供方",
      why: "适合 Skill 管理工具 AI 编程工作流推荐",
      url: "https://github.com/luongnv89/asm",
      source: "GitHub · 2026-05"
    }
  ],
  news: [
    {
      title: "Google I/O 2026 后，AI Agent 成为本周最热主",
      summary:
        "多家媒体 Gemini Spark、AI Search Antigravity 2.0 视作 Google 本轮 AI 更新的核心信号，个人助理和开发者平台都在向 Agent 形态靠拢",
      category: "ai-agents",
      source: "AP / TechRadar / Google Blog",
      date: "2026-05-22",
      tags: ["Gemini Spark", "AI Agent", "Google I/O"],
      url: "https://apnews.com/article/a984e6756032dc4af260f8fa27e8f4a9"
    },
    {
      title: "GitHub 趋势：agent skills AI coding 工具继续升温",
      summary:
        "本周多个趋势榜都 agent skills、UI agents、AI coding agent memory、React 自动修复等项目列为关注点，说明开发者正在把 AI 使用方式工程化",
      category: "ai-coding",
      source: "GitTrend / SignalForges / ToolBrain",
      date: "2026-05-22",
      tags: ["GitHub", "agent-skills", "AI 编程"],
      url: "https://gittrend.io/trending/ai-agent"
    },
    {
      title: "Google Antigravity 2.0 指向 Agent-first 开发平",
      summary:
        "Google 开发者更新中强调 Antigravity、Gemini API AI Studio 的组合，AI 编程工具正从代码补全走向任务型开发平台",
      category: "ai-coding",
      source: "Google Blog / TechRadar",
      date: "2026-05-20",
      tags: ["Antigravity", "Gemini API", "开发者工"],
      url: "https://blog.google/innovation-and-ai/technology/developers-tools/google-io-2026-developer-highlights/"
    },
    {
      title: "Google I/O 2026 汇总：Gemini 3.5、Gemini Omni 与多 AI 产品更新",
      summary:
        "Google 发布 I/O 2026 100 项更新，重点覆盖新一 Gemini 模型、创作能力、代理式开发平台和 AI 搜索体验",
      category: "ai-models",
      source: "Google Blog",
      date: "2026-05-20",
      tags: ["Gemini", "I/O 2026", "多模态"],
      url: "https://blog.google/innovation-and-ai/technology/ai/google-io-2026-all-our-announcements/"
    },
    {
      title: "Google Search 引入更强 AI 搜索与信息代理体",
      summary:
        "Google I/O 期间展示新的 AI Search 方向，让用户通过提问触发更复杂的信息整理、购物和任务处理流程",
      category: "ai-office",
      source: "Google Blog",
      date: "2026-05-19",
      tags: ["AI 搜索", "信息代理", "产品"],
      url: "https://blog.google/products-and-platforms/products/search/search-io-2026/"
    },
    {
      title: "Gemini App 更智能体化：Daily Brief、Spark 与新交互界面",
      summary:
        "Gemini App 增强主动帮助能力，加入日常简报、可持续运行的任务代理，以及面向图像和视频创作的新能力",
      category: "ai-agents",
      source: "Google Blog",
      date: "2026-05-19",
      tags: ["Gemini App", "智能", "助手"],
      url: "https://blog.google/innovation-and-ai/products/gemini-app/next-evolution-gemini-app/"
    },
    {
      title: "Google 发布开发者更新：Antigravity、Gemini API AI Studio",
      summary:
        "面向开发者的重点更新包括 Google Antigravity 2.0、Gemini API 管理式智能体，以 Android Studio AI Studio 的新能力",
      category: "ai-coding",
      source: "Google Blog",
      date: "2026-05-19",
      tags: ["AI 编程", "Gemini API", "AI Studio"],
      url: "https://blog.google/innovation-and-ai/technology/developers-tools/google-io-2026-developer-highlights/"
    },
    {
      title: "Anthropic 收购 Stainless，加 SDK MCP 工具",
      summary:
        "Anthropic 表示将通过收购 Stainless 强化 Claude 平台的开发者体验、SDK 生成能力和智能体连接外部系统的能力",
      category: "ai-agents",
      source: "Anthropic",
      date: "2026-05-18",
      tags: ["Claude", "MCP", "SDK"],
      url: "https://www.anthropic.com/news/anthropic-acquires-stainless"
    },
    {
      title: "Anthropic 与多家金融机构共建企 AI 服务公司",
      summary:
        "Anthropic、Blackstone、Hellman & Friedman Goldman Sachs 宣布成立新公司，帮助中型企业 Claude 落到关键业务流程",
      category: "ai-business",
      source: "Anthropic",
      date: "2026-05-04",
      tags: ["企业 AI", "Claude", "服务"],
      url: "https://www.anthropic.com/news/enterprise-ai-services-company"
    },
    {
      title: "OpenAI 宣布新融资，用于推进下一阶段 AI 基础设施",
      summary:
        "OpenAI 公布新一轮融资计划，强调消费端、企业端、开发者平台和算力基础设施的协同增长",
      category: "ai-business",
      source: "OpenAI",
      date: "2026-03-31",
      tags: ["OpenAI", "融资", "基础设施"],
      url: "https://openai.com/index/accelerating-the-next-phase-ai/"
    },
    {
      title: "Anthropic 发布 2026 State of AI Agents 报告",
      summary:
        "报告围绕智能体采用趋势、组织落地挑战和企业工作流变化展开，适合作为 AI 产品与业务规划参考",
      category: "ai-research",
      source: "Anthropic",
      date: "2026-04-01",
      tags: ["报告", "AI 智能", "趋势"],
      url: "https://resources.anthropic.com/hubfs/The%202026%20State%20of%20AI%20Agents%20Report.pdf"
    },
    {
      title: "中文大模型评测如何做 SEO：排行榜、能力维度和模型选型",
      summary:
        "参 ReLE 这类开源评测项目，内容站可以把综合榜、垂直能力榜、更新记录和选型建议拆成多个专题页",
      category: "ai-benchmark",
      source: "本站原创",
      date: "2026-05-22",
      tags: ["中文大模型评", "排行", "模型选型"],
      url: "#benchmark"
    },
    {
      title: "AI 工具导航站怎么做内容结构：从分类页到对比页",
      summary:
        "原创内容建议：每个分类先写工具清单，再补充使用教程、价格对比、替代品推荐和常见问题，形成可持续更新的专题",
      category: "ai-tools",
      source: "本站原创",
      date: "2026-05-22",
      tags: ["SEO", "工具导航", "内容规划"],
      url: "#topics"
    },
    {
      title: "AI 绘画视频栏目建议：用案例和提示词承接搜索流量",
      summary:
        "AI 绘画和 AI 视频用户常搜索具体效果，内容应包含工具选择、提示词模板、商用版权提醒和作品案例",
      category: "ai-image-video",
      source: "本站原创",
      date: "2026-05-22",
      tags: ["AI 绘画", "AI 视频", "提示"],
      url: "#topics"
    }
  ],
  sources: [
    {
      name: "OpenAI News",
      description: "OpenAI 官方产品、研究、公司动态",
      url: "https://openai.com/news/"
    },
    {
      name: "Anthropic News",
      description: "Claude、MCP、企业合作与安全研究",
      url: "https://www.anthropic.com/news"
    },
    {
      name: "Google AI Blog",
      description: "Gemini、DeepMind、Search Android AI 更新",
      url: "https://blog.google/technology/ai/"
    },
    {
      name: "Hugging Face Blog",
      description: "开源模型、数据集、工具链与社区动态",
      url: "https://huggingface.co/blog"
    },
    {
      name: "Papers with Code",
      description: "论文、榜单、代码和机器学习任务趋势",
      url: "https://paperswithcode.com/"
    },
    {
      name: "arXiv AI",
      description: "人工智能、机器学习与计算语言学论文",
      url: "https://arxiv.org/list/cs.AI/recent"
    },
    {
      name: "The Batch",
      description: "DeepLearning.AI 的每 AI 新闻简报",
      url: "https://www.deeplearning.ai/the-batch/"
    },
    {
      name: "MIT Tech Review AI",
      description: "AI 行业影响、治理、应用与深度报道",
      url: "https://www.technologyreview.com/topic/artificial-intelligence/"
    }
  ],
  watchList: [],
  weeklyDigests: [
    {
      weekId: "2026-W21",
      label: "2026-05-17 ~ 2026-05-23",
      summary: "Agent Skills 周：Matt Pocock 的个.claude 仓库 7 天涨 1600+ 星，Claude Code 5/21 更新 hook plugin 系统，GitGuardian 把安全扫描下沉成 Skill，Context Engineering 正在取代 Prompt Engineering",
      skills: [
        {
          title: "mattpocock/skills",
          type: "agent-skills 仓库",
          description: "Matt Pocock 把个.claude 目录开源，覆盖 PRD、TDD、重构、git safety 等团队习惯。本 GitHub Trending 第一，单+1,618 star",
          details: "Matt Pocock TypeScript 教学方面的知名作者，他把自己 Claude Code 里日积月累的 .claude 目录整体开源。和市面上“大而全”的 Skill 仓库不同，这个仓库只放他真实在用、能 Claude Code 守住团队习惯的少 Skill，比如先 PRD 再动代码、用 TDD 节奏迭代、重构前要求列出风险点、提交前自动 git safety。适合想给 Claude Code 立一份“工程行为规范”的团队，把它当模板再增删",
          features: [
            "PRD Skill：让 Claude 在写代码前先输出问题、目标、非目标和验收标",
            "TDD Skill：强制先写测试、看测试失败、再写实现的红绿循环",
            "Refactor Skill：重构前先列影响面和回滚方案，避免大刀阔斧",
            "Git safety Skill：限 force push、危 reset 等高风险命令",
            "可直接作 Claude Code Plugin marketplace 注册"
          ],
          useCases: [
            "团队第一次给 Claude Code 立规矩，没必要从零写 Skill",
            "想统一前后端、不同同事用 Claude Code 的协作风",
            "AI 编程引入测试驱动开发的纪律",
            "需要一个真实可参考的 Skill 仓库结构作为模板"
          ],
          url: "https://github.com/mattpocock/skills",
          source: "GitHub Trending · 2026-05-22",
          tags: ["Claude Code", "TDD", "团队规范"]
        },
        {
          title: "alirezarezvani/claude-skills v2.7.3",
          type: "agent-skills 仓库",
          description: "313+ Claude Code / Codex / Cursor / Gemini CLI Skills，含 57 plugin、跨 12个领域（工程、营销、产品、合规、研究、运营、商务、个人效率）",
          details: "目前社区最大的 Coding Agent Skill 集合之一</17 发布 v2.7.3 版本。和单一团队风格 Skill 仓库不同，这里按 12个职能领域组 Skill，包括工程、市场营销、产品管理、合规、C 级顾问、研究、商务运营、商业财务、个人效率等。每 Skill 都做了跨 Coding Agent 兼容标注，可 Claude Code、Codex、Cursor、Gemini CLI 8+ 工具中复用",
          features: [
            "313+ Skill 8 Coding Agent 兼容",
            "57 plugin marketplace 入口",
            "12个职能领域分类组织（不只是开发者向",
            "文档站点上线，每 Skill 有独立说明页",
            "持续按周发版，含变更日志"
          ],
          useCases: [
            "企业需要给非开发岗也配 AI Skill（市场、合规、运营）",
            "团队同时用多 Coding Agent，想找跨平台兼容方案",
            "想看大型 Skill 仓库的目录结构、命名和元数据怎么组织",
            "需要按职能 Skill，而不只是按技术栈"
          ],
          url: "https://github.com/alirezarezvani/claude-skills",
          source: "Release · 2026-05-17",
          tags: ["跨编 Agent", "Plugin", "企业 Skill"]
        },
        {
          title: "GitGuardian/agent-skills",
          type: "agent-skills 仓库",
          description: "GitGuardian 把密凭据扫描沉淀 Skill，教 Claude Code、Cursor 等何时扫描、如何读结果、怎么引导开发者修复",
          details: "GitGuardian 是知名密钥泄漏检测厂商，5/21 把他们的扫描能力下沉成开 Skill。这意味着 Claude Code、Cursor AI 编码助手不仅可以调用扫描，还知道在什么节点扫（提交前、PR 前、改 .env 后），看到结果怎么解读、怎么和开发者沟通修复，避免误删真密钥或忽略真泄漏",
          features: [
            "提交前自动触 ggshield 扫描",
            "secret 检测结果翻译成开发者能听懂的话",
            "区分误报和真实泄漏的判断 prompt",
            "PR review 流程对接，自动建议修 PR",
            "适用 Claude Code、Cursor AI 编码助手"
          ],
          useCases: [
            "团队担心 AI 编码助手 secret 留在代码",
            "需 AI 助手在提交前主动扫描敏感信息",
            "DevSecOps 团队想给 AI 编码工具配安 Skill",
            "希望把已 GitGuardian 工作流接 AI 助手"
          ],
          url: "https://github.com/gitguardian/agent-skills",
          source: "GitGuardian Changelog · 2026-05-21",
          tags: ["DevSecOps", "扫描", "密钥安全"]
        },
        {
          title: "anthropics/skills",
          type: "agent-skills 仓库",
          description: "Anthropic 官方 Agent Skills 公共仓库，覆盖创技企业三大类，可一键注册为 Claude Code Plugin marketplace",
          details: "Anthropic 官方维护 Skill 示范仓库，作 Skill 系统的官方参考实现。覆盖三大类：创意（艺术、音乐、设计）、技术（Web 应用测试、MCP server 生成）、企业（沟通、品牌、文档）。Skill 在这里被定义为“一组指令、脚本和资源的文件夹”，Claude 在需要时动态加载，让模型在特定任务上的表现更可重复",
          features: [
            "官方 SKILL.md 元数据规范示",
            "覆盖创意 / 技</ 企业三大",
            "可一键注册为 Claude Code Plugin marketplace",
            "每个 Skill 含使用示例与脚本",
            "可直 fork 改造作为内 Skill 起点"
          ],
          useCases: [
            "第一次接 Agent Skills，想看官方怎么",
            "需要给企业内部 Skill 一套元数据规范",
            "想引用一些可直接用的 Skill 作为起点（MCP server 生成、艺术创作）",
            "Skill 培训或文档时引用官方示例"
          ],
          url: "https://github.com/anthropics/skills",
          source: "Anthropic · 持续更新",
          tags: ["官方", "Plugin marketplace", "Claude"]
        },
        {
          title: "VoltAgent/awesome-agent-skills",
          type: "Skill 精",
          description: "1000+ 来自 Anthropic、Google Labs、Vercel、Stripe、Cloudflare、Hugging Face、Figma 等官方团队与社区 Skill 合集，跨 Claude Code / Codex / Gemini CLI / Cursor",
          details: "目前覆盖面最广的 Skill 索引，超 1000条来自官 dev team 和社区的 Skill。已收录 Anthropic、Google Labs、Vercel、Stripe、Cloudflare、Netlify、Trail of Bits、Sentry、Expo、Hugging Face、Figma 等公司的官方 Skill，等于把“哪些公司给 AI 编码助手出过官方 Skill”这件事系统整理出来了",
          features: [
            "1000+ Skill 跨多 Coding Agent",
            "按官方厂</ 社区两大类组",
            "每个 Skill 带原始来源和兼容性标",
            "持续追加新厂商发布的 Skill",
            "可作为发现型 Awesome List 使用"
          ],
          useCases: [
            "想看 Stripe / Cloudflare / Hugging Face 等大厂给 AI 编码工具出了什 Skill",
            "做内容站时需要列出“AI 编码 Skill 推荐”的来源",
            "Skill 选型时先看官方版本，再看社区改造版",
            "调研某个 SaaS 是否有官 Skill 集成"
          ],
          url: "https://github.com/VoltAgent/awesome-agent-skills",
          source: "GitHub · 2026-05",
          tags: ["Agent", "官方 Skill", "Awesome"]
        },
        {
          title: "Claude Code 平台更新 026-05-21",
          type: "官方平台更新",
          description: "新增 hook / plugin 选项、更强的 agent session 控制、权限与反馈流改进，后台运行 MCP 处理升级",
          details: "Anthropic 5/21 Claude Code 推送一次较大版本更新。核心变化是 hook 系统更细化（PreCompact、UserPromptSubmit、Stop 等钩子能拿到更多上下文），plugin 系统支持 marketplace 安装，agent session 控制改进让多任务并行更稳。后台执行和 MCP 调用的错误处理与重试也升级了",
          features: [
            "Hook 拿到更多上下文（包含工具调用历史",
            "Plugin 支持 marketplace 一键安",
            "Agent session 控制更细，多任务并行更稳",
            "权限提示流程优化，减少打",
            "后台执行 MCP 调用的错误处理更健壮"
          ],
          useCases: [
            "想用 hook 写自己的工作流规则（提交前检查、特定文件夹保护",
            "需要为团队搭建私有 plugin marketplace",
            "并行跑多 Claude Code session 处理不同任务",
            "MCP 集成大量外部工具时遇到稳定性问"
          ],
          url: "https://github.com/anthropics/claude-code",
          source: "Anthropic Release · 2026-05-21",
          tags: ["Claude Code", "hook", "MCP"]
        },
        {
          title: "Spinach Google Meet MCP",
          type: "MCP / 工作",
          description: "Google Meet 会议纪要直接 MCP 接到 Claude，免手动上传，可随时查会议中的决定和 action item",
          details: "Spinach 是会议记 SaaS 月发布了 MCP server Claude 直接通过 MCP 协议访问 Google Meet 会议纪要。以前的流程是导出转录文件、复制粘贴到 Claude；现在可以直接问“上周二的产品评审里我们决定了什么”、“过 30 天里 Bob 答应做但还没做的事有哪些”，Claude 会直接查 Spinach 的存档",
          features: [
            "MCP server 直接桥接 Google Meet 转录",
            "支持按时间、参与人、关键词查询",
            "提取 action item、决定、待",
            "免手动导出和上传，免复制粘贴",
            "兼容 Claude Code、Claude Desktop、其 MCP 客户"
          ],
          useCases: [
            "PM/项目经理需要追踪历次会议决",
            "团队定期复盘但不想翻几小时录",
            "做周月报时让 AI 直接拉会议内",
            "新成员入职想快速理解过去几个月的项目脉"
          ],
          url: "https://www.spinach.ai/blog/google-meet-transcripts-claude",
          source: "Spinach Blog · 2026-05",
          tags: ["MCP", "会议纪要", "上下"]
        },
        {
          title: "Context Engineering 实战指南",
          type: "方法</ 文章",
          description: "Anthropic、Taskade、Towards Data Science 等同步推 Context Engineering 指南，强调把 prompt 之外的记忆、工具、检索、状态一起架构",
          details: "2026年最受关注的方法论之一。核心论点是：让 Agent 表现好，不在 prompt 写得多漂亮，而在于把 Agent 的“信息环境”架构清楚——它能记住什么、能调用什么工具、检索哪个知识库、当前状态怎么传递。Anthropic 工程团队的官方文章把这套思想系统化，给出了从 Agent 到多 Agent 协作的具体设计建议",
          features: [
            "把传 prompt engineering 升级 Context engineering",
            "明确“记</ 工具 / 检</ 状态”四要素",
            "给出 Agent 分工 context 隔离原则",
            "解释为什么不能“把所有信息塞给所 Agent",
            "含具体案例和反例分析"
          ],
          useCases: [
            "设计长程 Agent 任务时不知道如何拆分上下",
            "已经在用 RAG 但效果不稳定，想找根",
            "Agent 系统每个 Agent 都拿到全部信息导致幻",
            "想给团队培训 prompt 之后的下一步技"
          ],
          url: "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents",
          source: "Anthropic Engineering · 2026-05",
          tags: ["Context Engineering", "Agent", "方法"]
        },
        {
          title: "farion1231/cc-switch",
          type: "桌面工具",
          description: "跨平台桌面助手，统一管理 Claude Code、Codex、OpenCode、OpenClaw、Gemini CLI、Hermes Agent，含 Skill 一键安装、用量看板、跨应用同步",
          details: "对于同时 Claude Code 又用 Codex / Cursor / Gemini CLI 的用户来说，每个工具 Skill、prompt、key 各管各的，切换起来很麻烦。cc-switch 是一个跨平台桌面 App（macOS / Windows / Linux），统一管理 6+ Coding Agent Skill 安装、prompts、用量看板、conversation 历史和工作区。本周上 GitHub Trending4 小时 665 star",
          features: [
            "统一管理 Claude Code、Codex、OpenCode、OpenClaw、Gemini CLI、Hermes Agent",
            "Skill 一键从 GitHub 仓库 ZIP 安装",
            "Markdown prompt 编辑+ App 同步",
            "用量看板：追踪花费和 token",
            "对话历史浏览、工作区编辑、云同步、deep link"
          ],
          useCases: [
            "同时在用多个 Coding Agent，想统一 Skill ",
            "需要看自己每月在不同工具上花了多少",
            "频繁切换工具时想保留对话上下",
            "团队希望统一 Skill 到所有人的本"
          ],
          url: "https://github.com/farion1231/cc-switch",
          source: "GitHub Trending · 2026-05",
          tags: ["Agent", "Skill 管理", "用量看板"]
        },
        {
          title: "zilliztech/claude-context",
          type: "MCP 服务",
          description: "用向量数据库给编 Agent 提供整代码库语义搜索 MCP，替代直接灌目录的笨办法",
          details: "Zilliz（Milvus 背后公司）出 MCP server，给 Claude Code / Cursor 等编 Agent 加一项“按语义检索整个代码库”的能力。以前的做法要么是手动选文件喂给模型，要么 grep；这 MCP 会在后台用向量数据库索引整个代码库，Agent 想找“哪里实现了用户认证”就能按意图检索，不用人工铺路",
          features: [
            "向量数据库索引整个代码库",
            "MCP server 形态，无需 Agent 本体",
            "支持增量索引（提交后自动更新",
            "可配置过滤规则（忽略 node_modules、二进制等）",
            "兼容 Claude Code、Cursor MCP 客户"
          ],
          useCases: [
            "大型代码库（几十万行）让 Agent 找不到地",
            "Agent 总是看错文件、修错位",
            "团队希望 Agent 上下文不依赖手动 @file",
            "想给 AI 编码工具 RAG 但又不想自己"
          ],
          url: "https://github.com/zilliztech/claude-context",
          source: "GitHub · 2026-05",
          tags: ["MCP", "代码语义检", "RAG"]
        },
        {
          title: "huggingface/ml-intern",
          type: "Agent 项目",
          description: "自动调研、编写、跑 ML 代码 Agent，覆 Hugging Face 生态，可用最少人工监督完成微调等任务",
          details: "Hugging Face 官方出的“机器学习实习生”Agent。给它一个任务（例如“用 LoRA Qwen 上微调一个客服模型”），它会自动调研可用模型、写训练脚本、跑通、调超参，整个流程把 Hugging Face transformers / datasets / accelerate / TRL 串起来。本质是把开 ML 模型的常见套路沉淀 Agent 自动化流程",
          features: [
            "自动调研：决定用哪个基模型、数据集",
            "自动写代码：训练脚本、评估脚",
            "自动跑通：处理依赖、显存、checkpoint",
            "自动报告：生成训练曲线和说明",
            "深度集成 Hugging Face 生"
          ],
          useCases: [
            "想快速试一 LoRA 微调，不想从零搭管道",
            "ML 工程师做 baseline 时省时间",
            "教学场景：让学生看完整的 ML 项目长什么样",
            "Hugging Face 生态熟悉但不想反复抄模"
          ],
          url: "https://github.com/huggingface/ml-intern",
          source: "GitHub · 2026-05",
          tags: ["ML Agent", "HuggingFace", "自动化研"]
        },
        {
          title: "K-Render/best-chinese-prompt",
          type: "中文 Prompt 模板",
          description: "中文 ChatGPT/Claude 提示词秘籍，按场景分类（写作、办公、SEO、营销等），适合做中文站长尾长内容",
          details: "中文社区维护时间最长的 ChatGPT / Claude 提示词秘籍之一。和翻译过来的英 prompt 不同，里面的角色设定、句式、约束都按中文语境写，对小红书文案、公众号长文、电商详情、SEO 文章、面试问答这种中文长尾场景特别合用",
          features: [
            "按场景分类：写作、办公、营销、SEO、面试等",
            "中文母语角色设定，避免翻译腔",
            "含输入输出格式示",
            "持续更新，社区贡献多",
            "适配 ChatGPT、Claude、国产模"
          ],
          useCases: [
            "做中文内容站需要可复用 prompt 模板",
            "面向中文用户 AI 工具教学",
            "电商/营销岗想批量产中文文",
            "面试准备：用 AI 模拟中文面试问题"
          ],
          url: "https://github.com/K-Render/best-chinese-prompt",
          source: "GitHub · 持续更新",
          tags: ["中文 Prompt", "模板", "SEO 写作"]
        }
      ],
      github: [
        {
          name: "mattpocock/skills",
          category: "Skill 集合",
          lang: "Markdown",
          description: "Skills for Real Engineers，直接来 Matt Pocock .claude 目录",
          details: "本周 GitHub Trending 第一。Matt Pocock 把自己在 Claude Code 上的真实工程习惯（PRD、TDD、refactor 风险、git safety）打包成 Skill 仓库开源。和大而全 Skill 集合不同，这里只放他每天在用、能 Claude Code 守住团队规范的少 Skill，是典型的「个.claude 目录 团队 Skill 起点」路径",
          features: [
            "PRD / TDD / refactor / git safety 四类 Skill",
            "Claude Code Plugin marketplace 直接安装",
            "目录结构清晰，可作为模板 fork",
            "维护者活跃，更新频繁",
            "和团队工程规范天然对"
          ],
          quickStart: [
            "git clone 仓库或在 Claude Code 里安装为 plugin",
            "PRD Skill：让 Claude 在每次新功能前先输出需求文",
            "TDD Skill：开启红绿测试循",
            "在自己仓库里 fork 后增删，做团队私有版"
          ],
          why: "本周 GitHub Trending 第一，Agent Skills 浪潮的代表项目",
          url: "https://github.com/mattpocock/skills",
          stars: "+1,618 / ",
          source: "GitHub Trending · 2026-05-22"
        },
        {
          name: "anomalyco/opencode",
          category: "Coding Agent",
          lang: "TypeScript",
          description: "本周 AI 编码 Agent 中增长最快的开源项目",
          details: "OpenCode Claude Code 风格 Coding Agent 的开源版本：终端形态、读懂代码库、执行任务、git 工作流，但完全开源、可自部署、支持任意模型后端。本周单+1,589 star，受 Anthropic Skill 生态扩散带动。适合既想 Claude Code 体验又想用别家模型（OpenAI、本地模型、自 API）的人",
          features: [
            "Claude Code 风格的终 Coding Agent",
            "完全开源，支持自托",
            "模型后端可换：OpenAI / Anthropic / 本地",
            "工具调用、git 操作、文件编辑齐",
            "兼容大部 Claude Code 风格 Skill"
          ],
          quickStart: [
            "npm i -g opencode 或从 release 下载二进",
            "配置 API key（OpenAI / Anthropic / Ollama 等）",
            "在项目目录运 opencode 进入交互 Agent",
            "可挂 Skill 仓库扩展能力"
          ],
          why: "OpenCode Claude Code 风格 Coding Agent 的开源版本，Anthropic 生态扩散带动",
          url: "https://github.com/anomalyco/opencode",
          stars: "+1,589 / 周（55k",
          source: "OSSInsight · 2026-05-22"
        },
        {
          name: "ggml-org/llama.cpp",
          category: "本地推理",
          lang: "C++",
          description: "本地推理引擎，跨 CPU/GPU/Apple Silicon，社区基石",
          details: "整个本地 LLM 生态最重要的项目之一。把 LLaMA 系模型量化、压缩、放到普通笔记本上跑得动，并衍生 GGUF 格式标准。Ollama、LM Studio、open-webui 这些用户级工具底层都靠它。本+605 star 来自持续推出的多模态支持和新模型适配",
          features: [
            "GGUF 格式标准的发源地",
            "支持 CPU / CUDA / Metal / ROCm / Vulkan",
            "多模态推理（图像、音频）逐步完善",
            "工具链：量化、转换、benchmark 全套",
            "C++ 实现，绑定覆 Python / Go / Rust"
          ],
          quickStart: [
            "clone 仓库后用 make cmake 编译",
            "Hugging Face 下载 GGUF 模型",
            "./llama-cli -m model.gguf -p \"你的 prompt\" 跑",
            "进阶：用 llama-server OpenAI 兼容接口"
          ],
          why: "本周 +605 star，本 LLM 部署不可绕开",
          url: "https://github.com/ggml-org/llama.cpp",
          stars: "+605 / 周（90.3k",
          source: "OSSInsight · 2026-05-22"
        },
        {
          name: "open-webui/open-webui",
          category: "本地 LLM UI",
          lang: "JavaScript",
          description: "本地大模型自托管 UI，集 RAG、文档、Ollama",
          details: "面向终端用户的本地大模型 Web UI，可以理解为「本地版 ChatGPT」。支 Ollama 后端、多用户、RAG、文档上传、对话历史、自定义模型。本+480 star，本地化部署的非技术用户增长持续",
          features: [
            "ChatGPT 风格 Web UI",
            "原生集成 Ollama 后端",
            "多用户、权限、对话历",
            "内置 RAG，可上传 PDF/文档",
            "支持自定义模型和系统提示"
          ],
          quickStart: [
            "docker run -d -p 3000:8080 ghcr.io/open-webui/open-webui",
            "浏览器打开 http://localhost:3000 注册账号",
            "在设置里连接 Ollama 或自定义 API",
            "上传文档启用 RAG 问答"
          ],
          why: "本周 +480 star，本地化部署用户增长持续",
          url: "https://github.com/open-webui/open-webui",
          stars: "+480 / 周（105.8k",
          source: "OSSInsight · 2026-05-22"
        },
        {
          name: "zed-industries/zed",
          category: "AI 编辑器",
          lang: "Rust",
          description: "高性能多人协作代码编辑器，内置 AI 助手",
          details: "Atom 创始人团队用 Rust 重写的新一代代码编辑器，定位是「VS Code 的下一代竞品」。性能极快，原生支持多人实时协作，AI 助手是一等公民（不是插件）。本+411 star Claude 系列模型集成更新带动",
          features: [
            "Rust 原生编辑器，启动和编辑性能远超 Electron 编辑",
            "多人实时协作（CRDT",
            "AI 助手是一等公民，支持 Claude / GPT / 本地模型",
            "内置 LSP、终端、git",
            "macOS / Linux 跨平台，Windows 在路"
          ],
          quickStart: [
            "zed.dev 下载二进",
            "Settings 配置 AI 后端（Claude、OpenAI、Ollama",
            "cmd+/ 触发 AI 编辑",
            "邀请同事建协作 session"
          ],
          why: "本周 +411 star，作 VS Code 替代 AI-first 编辑器代表",
          url: "https://github.com/zed-industries/zed",
          stars: "+411 / 周（68.5k",
          source: "OSSInsight · 2026-05-22"
        },
        {
          name: "langgenius/dify",
          category: "LLM 应用平台",
          lang: "TypeScript",
          description: "LLM 应用开发平台，可视化工作流 + RAG + Agent",
          details: "国产开 LLM 应用平台一线项目。提供可视化拖拽搭建 RAG 应用、Agent 工作流、Chatbot，含模型管理、知识库管理、API 暴露。可云端 SaaS 也可自部署。适合不想从零写代码但要做企业 LLM 应用的团队",
          features: [
            "可视化拖拽搭 LLM 应用",
            "内置 RAG 知识库、多文档管理",
            "Agent 工作流：工具调用 + 多步推理",
            "支持 OpenAI、Anthropic、本地模型、国产模",
            "应用一键发布为 API 或嵌入式聊天"
          ],
          quickStart: [
            "docker compose up -d 起本地服",
            "或注 dify.ai 直接用云端版",
            "在控制台创建应用 选模上传知识",
            "用低代码节点拖拽出工作流"
          ],
          why: "本周 +361 star，国产开 LLM 平台一线",
          url: "https://github.com/langgenius/dify",
          stars: "+361 / 周（111.3k",
          source: "OSSInsight · 2026-05-22"
        },
        {
          name: "vllm-project/vllm",
          category: "推理引擎",
          lang: "Python",
          description: "高吞 LLM 推理服务，业界部署主力",
          details: "UC Berkeley 出的高吞 LLM 推理引擎，核心算 PagedAttention 让显存利用率和吞吐都大幅提升。是当前企业生产环境部署 LLM 的事实标准之一，OpenAI 兼容 API 让现有代码无缝接入。本+275 star",
          features: [
            "PagedAttention 算法，显存利用率",
            "高并发吞吐量业界领先",
            "OpenAI 兼容 API",
            "支持主流模型（Llama、Qwen、DeepSeek 等）",
            "支持量化、tensor parallelism、speculative decoding"
          ],
          quickStart: [
            "pip install vllm",
            "vllm serve meta-llama/Llama-3-70B 起服",
            "OpenAI Python SDK 直接调用（改 base_url",
            "生产环境：配多卡 / tensor parallel"
          ],
          why: "本周 +275 star，企业生产环境首选推理引擎之一",
          url: "https://github.com/vllm-project/vllm",
          stars: "+275 / 周（57.4k",
          source: "OSSInsight · 2026-05-22"
        },
        {
          name: "ollama/ollama",
          category: "本地推理",
          lang: "Go",
          description: "本地一行命令跑 LLM，覆 macOS/Linux/Windows",
          details: "本地大模型部署「零门槛」代表。用 Go 写的单二进制，`ollama run llama3` 一行命令拉模型 + 跑起来。底层基 llama.cpp，提 OpenAI 兼容 API。本+258 star，是 open-webui / Continue / Page Assist 等用户级 AI 工具的默认后端",
          features: [
            "一行命令拉模型 + 启动",
            "OpenAI 兼容 API",
            "macOS / Linux / Windows 全覆",
            "支持自定 Modelfile（类 Dockerfile",
            "模型 hub：llama3、Qwen、Gemma、DeepSeek "
          ],
          quickStart: [
            "ollama.com 下载安装",
            "ollama run llama3 启动一个模型",
            "其他工具用 http://localhost:11434 调用",
            "ollama create 自定义系统提示词"
          ],
          why: "本周 +258 star，普通用户本地化部署最简方案",
          url: "https://github.com/ollama/ollama",
          stars: "+258 / 周（147.7k",
          source: "OSSInsight · 2026-05-22"
        },
        {
          name: "langchain-ai/langchain",
          category: "Agent 框架",
          lang: "Python",
          description: "LLM 应用框架，链/Agent/Memory/工具调用都有",
          details: "LLM 应用开发的最老牌 Python 框架之一。提 Chain、Agent、Memory、Tool、Retriever、Document loader 等抽象，让你不用从头 prompt 模型 解析 工具调用 的胶水代码。配 LangGraph（状态机 Agent）、LangSmith（可观测性）。本+252 star",
          features: [
            "Chain / Agent / Memory / Tool 抽象",
            "200+ 模型与工具集",
            "LangGraph 做状态机式多 Agent",
            "LangSmith 做调试和可观",
            "活跃社区、文档齐"
          ],
          quickStart: [
            "pip install langchain langchain-openai",
            "from langchain_openai import ChatOpenAI",
            "构建 Chain：prompt | llm | output_parser",
            "进阶：上 LangGraph Agent"
          ],
          why: "本周 +252 star，老牌框架仍是 Agent 开发主力之一",
          url: "https://github.com/langchain-ai/langchain",
          stars: "+252 / 周（116.6k",
          source: "OSSInsight · 2026-05-22"
        },
        {
          name: "infiniflow/ragflow",
          category: "RAG 引擎",
          lang: "Python",
          description: "面向企业 RAG 引擎，强在文档解析和评测",
          details: "国产开 RAG 引擎，强项在复杂文档解析（表格、扫描件、版式恢复）和检索评测。比一 LangChain 风格 RAG 多了「深度文档理解」，对真实企业资料的处理更稳。本+236 star，国 RAG 头部项目之一",
          features: [
            "深度文档解析：表格、扫描件、版",
            "向量+全文+知识图谱混合检",
            "可视化引用追",
            "支持团队空间和权",
            "支持本地 / 商用模型双后"
          ],
          quickStart: [
            "docker compose up -d",
            "浏览器进控制台、注册管理员",
            "上传文档建知识库",
            "创建 chat assistant 选模+ 知识"
          ],
          why: "本周 +236 star，国 RAG 头部项目",
          url: "https://github.com/infiniflow/ragflow",
          stars: "+236 / 周（61.4k",
          source: "OSSInsight · 2026-05-22"
        },
        {
          name: "All-Hands-AI/OpenHands",
          category: "Coding Agent",
          lang: "Python",
          description: "通用 Coding Agent 平台（前 OpenDevin）",
          details: "前身 OpenDevin，是开 Coding Agent 的代表项目之一。架构上比终 Coding Agent 更「重」，提供 Web UI、沙箱环境、文件浏览器、浏览器自动化，可处理复杂多步工程任务。本+219 star，社区一直在补功能",
          features: [
            "Web UI + Docker 沙箱环境",
            "支持浏览器自动化（不只是写代码）",
            "完整文件系统、终端、git 视图",
            "可接 Claude / GPT / 本地模型",
            "学术 SWE-bench 上的基线方案"
          ],
          quickStart: [
            "docker run 启动 OpenHands 服务",
            "浏览器打开 Web UI",
            "配置模型 API key",
            "给一个完整需求，让它在沙箱里完成"
          ],
          why: "本周 +219 star，开 Coding Agent 重要力量",
          url: "https://github.com/All-Hands-AI/OpenHands",
          stars: "+219 / 周（60.5k",
          source: "OSSInsight · 2026-05-22"
        },
        {
          name: "modelcontextprotocol/servers",
          category: "MCP 服务",
          lang: "TypeScript",
          description: "MCP 官方服务端实现集合，Claude/Cursor/Cline 通用",
          details: "Anthropic 牵头 MCP（Model Context Protocol）官方服务端实现合集。把「AI 工具调用外部系统」的接入标准化，Claude / Cursor / Cline 等客户端可以无差别接同一 MCP server（Filesystem、Git、Postgres、Slack、Brave Search、Memory 等）。本+178 star，生态稳定扩张",
          features: [
            "官方 MCP server 实现集合（Filesystem、Git、Postgres 等）",
            "TypeScript + Python 双语言示例",
            "标准协议，兼容多客户",
            "可作为自 MCP server 的模",
            "持续接入新的常用工具"
          ],
          quickStart: [
            "选一 server（如 filesystem）按 README 安装",
            "Claude Desktop claude_desktop_config.json 注册",
            "重启 Claude，新工具就出现在工具",
            "server 模板 fork 出自己的 MCP 服务"
          ],
          why: "本周 +178 star，MCP 生态稳定扩张",
          url: "https://github.com/modelcontextprotocol/servers",
          stars: "+178 / 周（60.5k",
          source: "OSSInsight · 2026-05-22"
        },
        {
          name: "AIDC-AI/Pixelle-Video",
          category: "视频生成",
          lang: "Python",
          description: "端到端视频生 pipeline：脚画面 配音 配乐 合成",
          details: "阿里 AIDC-AI 出的端到 AI 视频生成 pipeline。输入一个主题，它会写脚本、生成画面、合成配音、选配乐、最后合成成片。把「做一 AI 视频」从手动串多个工具变成全自动流程。9.2k star，本周新晋视频自动化项目",
          features: [
            "脚本自动生成（含分镜",
            "视觉生成（图</ 视频模型可换",
            "TTS 配音 + BGM 选择",
            "时间线自动对",
            "一键导出成"
          ],
          quickStart: [
            "git clone + pip install -r requirements.txt",
            "配置画面 / TTS / BGM 模型 API",
            "给一个主 prompt 跑端到端",
            "demo 工程里看示例视频"
          ],
          why: "本周新晋视频生成自动化项目，9.2k star",
          url: "https://github.com/AIDC-AI/Pixelle-Video",
          stars: "9.2k",
          source: "AskGlitch · 2026-05"
        }
      ]
    }
  ]
};

window.boardSlugByTitle = function (title) {
  const map = {
    "SuperCLUE 智能指数": "superclue",
    "OpenCompass / CompassRank": "opencompass",
    "C-Eval": "c-eval",
    "CMMLU": "cmmlu",
    "LMArena / Chatbot Arena": "lmarena",
    "Hugging Face Leaderboards": "hf-leaderboards",
    "SWE-bench": "swe-bench",
    "Berkeley Function Calling Leaderboard": "bfcl",
    "LiveCodeBench": "livecodebench",
    "LiveBench": "livebench",
    "Open ASR Leaderboard": "open-asr",
    "SpeechColab Leaderboard": "speechcolab",
    "SUPERB": "superb",
    "HEAR Benchmark": "hear",
    "TTSDS / TTSDS2": "ttsds",
    "MINT-Bench": "mint-bench",
    "MTEB": "mteb",
    "MAEB": "maeb",
    "VBench / VBench++": "vbench",
    "OCRBench / OCRBench v2": "ocrbench",
    "DocVQA": "docvqa",
    "IDP Leaderboard": "idp"
  };
  if (map[title]) return map[title];
  return String(title || "")
    .toLowerCase()
    .replace(/[\s\/]+/g, "-")
    .replace(/[^a-z0-9\-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
};

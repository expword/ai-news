# 内容分发流程

后端不是把所有采集结果都当成一条快讯处理，而是按模块分发。

## 1. 采集层

每天任务会收集：

- AIHOT（aihot.virxact.com）：已聚合 + 精选的中文 AI 资讯，每天更新，作为 T1.5 源补一手官方博客的空窗
- 新闻 API：模型发布、产品发布、产业动态
- GitHub Search：AI 项目、Agent、MCP、Coding 工具
- arXiv / Semantic Scholar：论文和研究线索
- 预设信息源：免费搜索、新闻、论文、GitHub 入口

## 2. 统一素材层

每条原始信息先被整理成统一素材：

- title / name
- summary / description
- source
- url
- lang / stars 等可选字段

## 3. 模块判断

后端会判断每条素材应该进入哪些模块：

- `news`：今日快讯、历史快讯、快讯详情页
- `topicResources`：AI 工具导航分类页
- `skillRecommendations`：Skill 推荐
- `githubWeekly`：一周最新 GitHub
- `benchmarkBoards`：大模型、ASR、TTS、OCR、Embedding 等榜单
- `benchmarkDatasets`：测评数据集
- `sources`：免费搜索和信息源入口

一条信息可以进入多个模块。比如一个 GitHub Agent 项目会同时进入：

- `news`
- `githubWeekly`
- `topicResources.ai-agents`
- `skillRecommendations`

## 4. 内容提取字段

快讯不只提取一句摘要，还会提取：

- `background`：背景信息
- `keyPoints`：关键事实
- `impact`：可能影响
- `audience`：适合哪些人看
- `useCases`：可以怎么用
- `risks`：注意事项
- `contentIdeas`：可以延伸成哪些站内内容
- `moduleTargets`：落入哪些模块
- `routeReason`：为什么这样分发
- `nextActions`：下一步站内更新动作

## 5. 写入数据

后端写入：

- `data/generated-data.json`
- `assets/data/generated-data.js`

前端通过 `assets/data/data-merge.js` 合并到基础数据里。

## 6. 页面消费

- 首页最新资讯读取 `news`
- 历史快讯读取 `news`
- 快讯详情页展示丰富字段
- 分类页读取 `topicResources`
- Skill 页面读取 `skillRecommendations` 和 `weeklyDigests.skills`
- GitHub 页面读取 `githubWeekly` 和 `weeklyDigests.github`
- 榜单页读取 `benchmarkBoards`
- 数据集页读取 `benchmarkDatasets`


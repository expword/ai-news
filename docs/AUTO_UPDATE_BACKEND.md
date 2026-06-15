# Python 自动采集后台说明

项目现在使用 Python 后端，不需要数据库，也不需要安装第三方依赖。后台会每天/每周抓取信息源，然后调用大模型提取有用内容，写入：

- `data/generated-data.json`：后端结构化数据
- `assets/data/generated-data.js`：前端页面直接加载的数据

前端仍然通过 `assets/data/data-merge.js` 自动把生成数据合并到 `assets/data/data.js`。

## 1. 启动

```bash
python backend/backend.py
```

默认地址：

```text
http://127.0.0.1:5179/
http://127.0.0.1:5179/api/status
```

## 2. 大模型配置

`.env` 里已经按云雾接口配置：

```env
LLM_API_KEY=你的key
LLM_BASE_URL=https://yunwu.ai
LLM_ENDPOINT=https://yunwu.ai/v1/chat/completions
LLM_MODEL=gpt-5.4-nano
```

`https://yunwu.ai/vl` 是网页入口，不是 API endpoint。

## 3. 自动提取字段

Python 后端会把原始搜索、GitHub、论文、新闻 API 结果交给大模型，要求输出：

- `title`：中文标题
- `summary`：中文摘要
- `category`：站内分类
- `tags`：标签
- `keyPoints`：自动提取的关键内容
- `whyUseful`：为什么值得关注
- `nextActions`：站内下一步内容动作
- `url`：原始链接

`news-detail.html` 会优先展示这些字段，最后附原始链接。

## 4. 手动触发

```text
http://127.0.0.1:5179/api/admin/run-daily?token=你的ADMIN_TOKEN
http://127.0.0.1:5179/api/admin/run-weekly?token=你的ADMIN_TOKEN
http://127.0.0.1:5179/api/admin/run-all?token=你的ADMIN_TOKEN
```

如果 `ADMIN_TOKEN=change-me`，本地调试不会拦截；上线前务必换成随机字符串。

## 5. 定时任务

`.env`：

```env
CRAWL_INTERVAL_MINUTES=10   # 每 10 分钟采集一次（抓取+评分+精选+滚动日报）
DAILY_REPORT_TIME=00:00     # 每天 0 点把"昨天"的精选固化成带日期的日报
WEEKLY_DAY=1                # 每周几跑周报（周一=1 … 周日=7）
WEEKLY_TIME=09:30
```

- **间隔采集**：每 `CRAWL_INTERVAL_MINUTES` 分钟跑一次。已采集过的 URL 不会重复送 LLM，
  所以高频采集只处理新增条目，成本可控。状态存在 `data/scheduler-state.json`，频繁重启不会重复触发；
  首次启动会跑一次。
- **每日 0 点固化**：到 `DAILY_REPORT_TIME` 时，把昨天发布且精选的条目固化成一份带日期的日报，
  存入 `dailyReports` 归档（类似 AIHOT 的 /daily/{date}），前端日报页读取。
- **手动固化**：`python backend/backend.py report [YYYY-MM-DD]` 或 `GET /api/admin/freeze-report?token=…`。

## 5.1 自动推送到 GitHub（配合 Vercel 自动部署）

网页用 Vercel 部署时，只要 GitHub 仓库收到 push，Vercel 就会自动重新构建。
后端可以在每次生成新数据后自动提交并推送，实现"常驻采集 → 自动上线"。

`.env`：

```env
AUTO_GIT_PUSH=1              # 开启自动推送（常驻运行的电脑上设为 1）
GIT_PUSH_INTERVAL_MINUTES=60 # 推送节流：至少间隔多少分钟推一次，避免 Vercel 频繁重建
GIT_REMOTE=origin
GIT_BRANCH=main
```

要点：

- **只提交数据文件**：自动推送只 `git add data/ assets/data/`，不会把你本地其他改动一起提交。
- **没变化不推送**：数据没实际变化时跳过提交和推送。
- **频率解耦**：采集可以每 10 分钟一次，但推送按 `GIT_PUSH_INTERVAL_MINUTES` 节流，
  Vercel 免费版每天构建次数有限，建议推送间隔 ≥ 30~60 分钟。
- **需要 git 凭证**：常驻电脑上要先配好推送凭证（HTTPS 用 Personal Access Token + 凭证管理器，或 SSH key），
  否则 `git push` 会失败（日志会打印 `[git] push failed`）。

## 6. 可接入的免费搜索/新闻源

需要 API key 的源，把 key 填入 `.env.example` 对应字段即可。没有 key 时，后端仍会用 GitHub、arXiv、Semantic Scholar 等可用源做基础采集。

| 来源 | 免费额度 | 注册 | 用途 |
| --- | --- | --- | --- |
| Google Programmable Search | 100 queries/day | 需要 | 通用网页搜索 |
| NewsAPI | 100 requests/day | 需要 | AI/科技新闻，免费版仅开发测试 |
| GNews API | 100 requests/day | 需要 | 新闻搜索 |
| NewsData.io | 200 credits/day | 需要 | 每日新闻简报 |
| The Guardian Open Platform | 500 calls/day | 需要 | 深度报道、政策、产业 |
| Currents API | 1,000 requests/day | 需要 | 英文科技新闻 |
| World News API | 50 points/day | 需要 | 低频精选新闻 |
| Marketaux | 100 requests/day | 需要 | AI 公司、融资、商业新闻 |
| FreeNewsAPI.io | 5,000 requests/day | 可能需要 | 备用新闻源 |
| NewsDataHub | 50 requests/day | 需要 | 低频新闻搜索 |
| GitHub Search API | 60/hour 无 token；5,000/hour 有 token | 可选 | GitHub AI 项目 |
| Semantic Scholar | 公开可用；key 后更稳定 | 可选 | AI 论文 |
| arXiv API | 免费；建议约 3 秒 1 次请求 | 不需要 | 每日论文 |

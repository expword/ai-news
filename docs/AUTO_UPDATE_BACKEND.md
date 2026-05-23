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
DAILY_TIME=09:10
WEEKLY_DAY=1
WEEKLY_TIME=09:30
```

`WEEKLY_DAY` 使用 Python 星期习惯：周一是 `1`，周日是 `7`。

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

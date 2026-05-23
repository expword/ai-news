# SEO 与 Google AdSense 实施说明

## 1. 上线前必须替换的信息

把下面占位内容替换成你的真实信息：

- `https://your-domain.com/`：替换为你的正式域名。
- `hello@your-domain.com`：替换为你的联系邮箱。
- `sitemap.xml` 和 `robots.txt` 里的域名也要同步替换。

可以全局搜索 `your-domain.com`。

## 2. SEO 引流内容方向

本站现在按搜索意图分成这些专题：

- AI工具导航
- AI编程开发
- AI绘画视频
- AI智能体
- AI模型发布
- 中文大模型评测
- AI办公学习
- AI论文开源
- AI商业变现

建议每个专题至少扩展 3 到 5 篇原创内容，例如：

- 2026 年 AI编程工具推荐：适合新手和开发者的工具清单
- AI绘画工具哪个好用：免费额度、中文体验和商用限制对比
- AI智能体是什么：普通人能用来做哪些自动化任务
- ChatGPT、Claude、Gemini 有什么区别：使用场景对比
- 中文大模型评测怎么看：综合榜、Coding榜、Agent工具调用榜的区别
- AI模型排行榜怎么用：不要只看总分，还要看任务、成本和中文能力

## 2.1 可借鉴的开源评测结构

当前站点加入了一个“中文大模型评测与选型”板块，灵感来自：

- GitHub 项目：`jeinlee1991/chinese-llm-benchmark`
- 项目内容结构：综合能力榜、商用大模型榜、开源大模型榜、教育、医疗、金融、法律、推理、语言、Agent、Coding 等维度。

注意：可以引用并注明来源，但不要大段复制 README。更适合 SEO 的做法是围绕榜单写自己的解读：

- 这个榜单适合什么用户？
- 排名靠前的模型适合哪些任务？
- 便宜模型是否足够用于内容生成、客服、摘要、代码？
- 中文能力、工具调用、Coding 能力应该怎么分别看？

只聚合外链容易被判断为低价值内容；要增加原创导读、对比、教程、FAQ、使用截图或实际体验。

## 3. 申请 Google AdSense 前的准备

建议先完成：

- 绑定正式域名，并能正常 HTTPS 访问。
- 保证首页、关于、联系、隐私政策都可访问。
- 发布 20 到 30 篇以上有实际帮助的原创内容。
- 不放诱导点击广告，不让广告遮挡导航和正文。
- 提交 Google Search Console，并提交 `sitemap.xml`。
- 等待 Google 收录一部分页面后再申请 AdSense。

## 4. AdSense 代码放置位置

通过审核后，Google 会给你类似下面的代码。把它放到每个 HTML 文件的 `</head>` 前面。

```html
<script
  async
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-你的发布商ID"
  crossorigin="anonymous"
></script>
```

如果使用展示广告单元，把 Google 生成的 `<ins class="adsbygoogle">...</ins>` 放到现有的广告占位区，例如首页顶部、侧栏或信息流广告位。

## 5. ads.txt

AdSense 后台提示你添加 `ads.txt` 时，在网站根目录新建 `ads.txt`，内容通常类似：

```txt
google.com, pub-你的发布商ID, DIRECT, f08c47fec0942fa0
```

发布商 ID 必须使用你 AdSense 后台里的真实 ID。

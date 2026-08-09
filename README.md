# build-ai-native-html-decks

AI 原生 HTML 演示文稿构建 Skill：把 brief、文档、PDF、PPT、品牌资产、图片、视频和结构化数据，转化为可播放、可验收、可交付的 HTML 演示文稿。

> Skill definition: [SKILL.md](SKILL.md)

## 这个 Skill 解决什么问题

它把 HTML Deck 当作一个“可生成、可验证、可回滚的产品”，而不是一组手工拼接的页面。核心目标是：

- 先整理素材和叙事，再进入完整制作；
- 用结构化内容和可复用组件保持单一事实源；
- 用本地资产和离线优先策略保障现场播放；
- 用 Playwright、构建检查和资源检查发现溢出、缺失、外链和控制台错误；
- 在交付前保留验证报告、PDF fallback 和版本记录。

## 适用场景

适合以下请求：

- 从 brief、Word、PDF、PPT 或旧 HTML 生成演示文稿；
- 创建或重构 kickoff、发布会、培训、比赛、报告、提案、项目汇报等 Deck；
- 将既有演示文稿迁移成可维护的 HTML 版本；
- 需要本地/离线素材、浏览器验收、截图、PDF 备用交付；
- 需要可复用的 slide components、content schema 和版本化交付流程。

不适合把它当作：

- 没有事实核对的“一键长文转幻灯片”；
- 只追求视觉效果、不做浏览器验证的静态页面生成器；
- 与 HTML 并行维护、彼此不一致的 PPT 编辑流程。

## 默认技术栈

在没有特殊约束时，Skill 默认使用：

- Vite + TypeScript；
- Reveal.js 或兼容的 HTML slide runtime；
- JSON/YAML 结构化内容；
- CSS custom properties 和可复用组件；
- Playwright 做浏览器检查、截图和溢出检查；
- Git 做版本、基线和回滚。

优先使用本地资产，避免外部字体、远程 iframe 和网络依赖成为现场播放风险。

## 工作流

1. **Intake**：建立工作区，盘点资料、品牌、媒体、数据和缺口；
2. **Content contract**：为每页定义目标、唯一 takeaway、页面类型、素材和 speaker notes；
3. **Representative slides**：先证明封面、普通信息页和最复杂页面的视觉系统；
4. **Reusable components**：从共享组件生成全套页面，避免逐页手工复制；
5. **AI QA loop**：构建、资源校验、浏览器检查、截图和 overflow/console 检查；
6. **Delivery**：交付 HTML、资产、PDF fallback、截图/contact sheet 和 verification report。

核心边界是：没有确认的事实要标记，不要把占位符带入生产版；没有渲染验证，不要声称演示文稿已经完成。

## 在 Codex 中调用

可以使用技能名直接调用：

~~~text
使用 build-ai-native-html-decks，帮我把这份项目 brief 和参考 PDF 做成一个 16:9 的 HTML kickoff deck。先整理素材和叙事，再给我代表性页面方案。
~~~

也可以使用默认 prompt：

~~~text
Use $build-ai-native-html-decks to turn the provided materials into a validated HTML presentation.
~~~

调用时最好同时提供：

- 目标受众和演示场景；
- 屏幕比例、播放环境和是否必须离线；
- 已确认的事实、数字、日期、人物和品牌规范；
- 参考 Deck、图片、视频、字体和版权边界；
- 交付时间、是否需要 PDF 和截图。

## 安装到 Codex

通过 GitHub 技能安装脚本：

~~~bash
python3 ~/.codex/skills/.system/skill-installer/scripts/install-skill-from-github.py \
  --repo Alexgydddd/build-ai-native-html-decks \
  --path . \
  --name build-ai-native-html-decks
~~~

也可以手动克隆到 Codex 技能目录：

~~~bash
git clone https://github.com/Alexgydddd/build-ai-native-html-decks.git \
  ~/.codex/skills/build-ai-native-html-decks
~~~

安装后重启 Codex，确保重新读取技能清单。

## 创建一个新的 Deck 工作区

在本仓库根目录执行：

~~~bash
sh scripts/scaffold_deck.sh /path/to/new-deck
~~~

脚手架会创建：

- materials/00-brief：项目 brief；
- materials/01-source-documents：Word、PDF、PPT 等原始资料；
- materials/02-brand-assets：Logo、字体、品牌图形；
- materials/03-visual-references：参考 Deck、截图和风格样例；
- materials/04-media：图片、视频和音频；
- materials/05-data：表格、指标和结构化数据；
- materials/06-review-feedback：评审反馈；
- project-brief.md、intake-report.md 和 starter 项目；
- tools/validate-deck.mjs：复制到项目内的验证脚本。

脚手架默认拒绝写入非空目录，以保护已有项目文件。

## Starter 项目常用命令

进入脚手架生成的项目后：

~~~bash
npm install
npm run build
npm run validate
npm run qa
~~~

其中：

- npm run build：TypeScript 类型检查和 Vite 构建；
- npm run validate：检查 dist/index.html、本地资源引用和未解决占位符；
- npm run qa：依次执行 build、validate 和 Playwright 测试；
- npm run preview：本地预览构建结果。

如果只是验证一个已有静态 HTML，也可以直接运行：

~~~bash
node scripts/validate_deck.mjs dist/index.html
~~~

需要临时允许外部依赖时，显式使用：

~~~bash
node scripts/validate_deck.mjs dist/index.html --allow-external
~~~

## 仓库目录说明

| 路径 | 用途 |
|---|---|
| SKILL.md | Skill 的完整行为规范、工作流和质量边界 |
| agents/openai.yaml | OpenAI/Codex 侧的展示名称、简介和默认调用 prompt |
| references/deck-schema.md | content/deck.json 等内容模型的字段约定 |
| references/quality-gates.md | 交付前的质量门槛和检查清单 |
| scripts/scaffold_deck.sh | 创建新的 Deck 工作区和素材目录 |
| scripts/validate_deck.mjs | 检查构建入口、占位符和本地资源引用 |
| assets/starter/ | 可复制的 Vite/TypeScript starter 项目 |
| assets/starter/content/deck.json | starter 的结构化 Deck 内容样例 |
| assets/starter/src/ | starter 的页面入口和样式 |
| assets/starter/tests/ | Playwright 基础测试 |
| assets/starter/public/assets/ | starter 的本地演示资产 |

## 质量标准

交付前至少确认：

- 每页只有一个主要 takeaway；
- 生产输出中没有 TODO、TBD 或待确认占位符；
- 所有本地资源都能解析；
- 目标 viewport 没有内容溢出；
- 浏览器控制台没有未处理错误；
- 离线关键场景没有隐式网络依赖；
- HTML 是唯一事实源，没有与 PPT 双向手工维护；
- 已完成实际构建和浏览器渲染验证。

## 当前版本

- Skill package：当前仓库初始公开版本；
- Starter package：assets/starter/package.json 中为 0.1.0；
- 版本变更：见 [CHANGELOG.md](CHANGELOG.md)；
- 仓库：Alexgydddd/build-ai-native-html-decks。

## 许可证说明

本仓库目前未附许可证文件。公开可见不等于自动授予再发布、商用或二次分发权利；如需对外授权，请先补充明确的许可证和资产版权说明。

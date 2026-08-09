# HTML 演示项目材料指南

你不需要把所有文件夹都填满。先放现有材料，Agent 会检查并告诉你哪些缺失会真正阻塞创作。

| 文件夹 | 放什么 | 是否必需 |
| --- | --- | --- |
| `materials/00-brief/` | 活动背景、受众、目标、场景、时长、页数、截止时间 | 至少需要基本目标 |
| `materials/01-source-documents/` | Word、PDF、PPT、会议纪要、策划案、历史文稿 | 有核心内容时建议提供 |
| `materials/02-brand-assets/` | Logo、品牌色、字体、VI手册、禁用规则 | 无品牌要求时可空 |
| `materials/03-visual-references/` | 喜欢或不喜欢的页面截图、网页、PPT、设计案例 | 可空，Agent 可提出方向 |
| `materials/04-media/` | 照片、插图、视频、音频、人物头像 | 按内容需要提供 |
| `materials/05-data/` | Excel、CSV、指标、图表原始数据及口径 | 出现数字结论时需要 |
| `materials/06-review-feedback/` | 修改意见、批注截图、评审纪要、确认记录 | 进入修改阶段后使用 |

## 推荐启动顺序

1. 填写根目录的 `project-brief.md`，不知道的字段可以留空。
2. 把已有文件放入对应的 `materials/` 子目录，不必改格式。
3. 让 Agent 执行“检查材料并生成 intake-report.md”。
4. 确认没有阻塞项后，Agent 生成 `deck-spec.md` 和三页视觉样稿。
5. 视觉方向确认后，再生成完整演示并自动验收。

## 对 Agent 的启动指令

> 使用 `$build-ai-native-html-decks` 检查当前项目材料。先更新 `project-brief.md` 和 `intake-report.md`，告诉我哪些材料足够、哪些缺失会阻塞；现在不要直接生成完整演示。

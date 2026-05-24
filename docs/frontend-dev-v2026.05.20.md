# Alcheme 前端开发文档 v2026.05.20

这份文档是给前端工程师和前端 AI coding 用的。

目标不是解释所有技术细节，而是让 AI 在开始写代码前，明确：
- 这个前端项目要做哪些页面
- 每个页面负责什么
- 现在应该如何和后端接口配合
- 哪些部分是阶段一先做，哪些放阶段二

## 1. 项目定位

- 前端是 `React Web App`
- 部署在 `Vercel`
- 用户主要用手机浏览器打开
- 当前目标是先做一个体验接近 App 的 Web 版本，不做原生 App

## 2. 前端目录建议

```text
app/
  components/
  screens/
  hooks/
  api/
  theme/
```

约定：
- `components/`：可复用 UI 组件
- `screens/`：页面文件，每个页面一个主文件
- `hooks/`：状态逻辑、loading/error/result 管理
- `api/`：接口请求函数，不写 UI
- `theme/`：颜色、字体、间距等设计常量

## 3. 页面清单

阶段一优先页面：

1. `HomeScreen`
   - 首页
   - 新用户进入引导
   - 老用户进入输入页

2. `OnboardingScreen`
   - 2 到 3 屏产品介绍
   - 最后一屏引导进入 InputScreen

3. `InputScreen`
   - 用户输入“说说”的文字
   - 提交后调用后端主接口

4. `AlchemyScreen`
   - 提交后的等待动效页
   - 显示炼金过程、字幕或 loading

5. `NoteDetailScreen`
   - 展示本次 AI 提炼结果
   - 展示原始输入
   - 展示二次补充输入

6. `NotebookScreen`
   - 手记列表页
   - 按时间倒序展示

7. `MailboxScreen`
   - 信箱列表页
   - 阶段一可以先支持空状态或真实列表

8. `LetterDetailScreen`
   - 单封信详情页
   - 信纸排版和开信动效

## 4. 前端与后端的配合方式

### 4.1 “说说”主链路

前端现在的职责是：
- 提交用户输入
- 等待后端处理完成
- 展示后端返回结果
- 跳转到手记详情页

前端不再负责“最终保存主手记”。

### 4.2 列表和详情

前端仍然负责读取并展示：
- 用户自己的 `profiles`
- 用户自己的 `notes`
- 用户自己的 `letters`

### 4.3 不展示的内部信息

前端不负责展示这些内容：
- `note_summaries.analysis`
- 来信触发原因
- 来信关联了哪些 note
- Agent 运行记录

这些都属于后端和团队调试层。

## 5. 前端主要接口

以交接文档《表结构与接口契约》为准，这里只写前端最常用的几个。

### 5.1 提交文字

`POST /v1/notes/distill`

前端传：

```json
{
  "raw_input_type": "text",
  "raw_input": "用户第一次输入内容",
  "second_input_type": "text",
  "second_input": "可选"
}
```

后端返回：

```json
{
  "note_id": "uuid",
  "raw_input_type": "text",
  "raw_input": "用户第一次输入内容",
  "ai_distilled": [
    "提炼结果1",
    "提炼结果2"
  ],
  "second_input_type": "text",
  "second_input": "可选",
  "created_at": "时间"
}
```

前端处理方式：
- 提交后进入 loading / AlchemyScreen
- 成功后进入 NoteDetailScreen
- 失败后显示统一错误状态

### 5.2 手记列表

`GET /v1/notes`

用于：
- NotebookScreen

### 5.3 手记详情

`GET /v1/notes/:id`

用于：
- NoteDetailScreen

### 5.4 信件列表

`GET /v1/letters`

用于：
- MailboxScreen

### 5.5 标记已读

`POST /v1/letters/:id/read`

用于：
- 用户打开某封信后标记为已读

### 5.6 用户资料

前端还需要接用户基础资料，用于：
- 判断 onboarding 是否完成
- 记录时区
- 预留“我的”页面基础信息

关于 `timezone`，前端需要额外明确：
- 首次注册或首次进入产品时，从浏览器自动读取用户时区
- 把这个时区写入 `profiles.timezone`
- 展示手记日期、来信日期、“今天 / 昨天 / 最近”这类时间时，按用户时区格式化

## 6. hook 建议

建议至少有以下 hooks：

- `useAuth`
  - 管理登录态
  - 判断是否新用户

- `useAlchemy`
  - 调用提交接口
  - 管理 `loading / result / error`

- `useNotebook`
  - 拉取手记列表
  - 读取单篇手记详情

- `useMailbox`
  - 拉取信件列表
  - 标记已读

- `useProfile`
  - 拉取和更新资料层信息
  - 判断 onboarding 和时区相关状态

## 7. UI 和交互要求

- 风格延续现有产品视觉
- 首页、输入页、炼金页、信件详情页是重点体验页
- 动效要服务气质，不要堆太多杂动效
- 手机端优先适配
- 所有加载、空状态、失败状态都要明确

## 8. 时间相关前端要求

- 所有展示给用户看的日期时间，都按 `profiles.timezone` 解释
- 前端不要假设服务器时间就是用户本地时间
- 如果后端返回 UTC 时间，前端负责按用户时区做显示转换
- 手记列表、手记详情、信件列表、信件详情都遵守同一套时间展示逻辑

## 9. 阶段一前端验收标准

- 用户可以完成注册 / 登录
- 用户可以在 InputScreen 提交内容
- 提交后有炼金过程页
- 可以看到 AI 提炼结果和手记详情
- 可以查看历史手记列表
- 可以进入信箱空状态页或真实列表页
- 可以读取基础资料层信息
- 可以正确读取和使用用户时区展示日期
- 页面在手机浏览器上排版正常

## 10. 给前端 AI 的直接任务建议

可以把下面这类任务直接交给 AI：

1. 先搭 `screens/components/hooks/api/theme` 基础结构
2. 先用 mock 数据完成所有页面骨架
3. 再替换成真实接口
4. 最后打磨炼金动画和开信动效

====================================

# 关于与 AI agent 协作 coding 的建议

## 一、UI页面还原

请作为 Alcheme 项目的前端工程师，帮我实现 React Web 前端。

你需要先完整阅读以下资料，并按它们协同工作：

1. D:\Projects\alcheme_new\alcheme_项目开发文档_v2026.05.16.html
2. D:\Projects\alcheme_new\alcheme_项目开发文档_v2026.05.20.html
3. D:\Projects\alcheme_new\alcheme_前端开发文档_v2026.05.20.md
4. D:\Projects\alcheme_new\alcheme_表结构与接口契约_v2026.05.20.md
5. D:\Projects\alcheme_new\ui\images

阅读规则：
- 把 `alcheme_项目开发文档_v2026.05.16.html` 当作原始全貌参考，帮助你理解页面、流程和产品整体结构
- 把 `alcheme_项目开发文档_v2026.05.20.html` 当作当前生效口径
- 如果两个版本有冲突，一律以 `v2026.05.20` 为准
- 前端接口、字段命名、用户可见/不可见数据边界，以 `alcheme_表结构与接口契约_v2026.05.20.md` 为准
- 页面职责、开发顺序、前端边界，以 `alcheme_前端开发文档_v2026.05.20.md` 为准
- 视觉和页面层级，以 `ui\images` 里的现有 UI 稿为准，并在此基础上做前端优化

当前任务目标：
先做“页面还原版”的前端，不要一开始就接真实接口。

具体要求：
1. 先基于 `ui\images` 还原主要页面的结构、视觉层级和移动端布局
2. 先用 mock 数据完成页面展示、页面跳转和基础交互
3. 暂时不要接真实后端接口
4. 暂时不要花太多时间打磨复杂动画，只需要为动画预留位置或做简单占位
5. 页面风格要尽量接近现有 UI 稿，但可以在实现时做更合理的前端结构优化
6. 页面优先级如下：
   - HomeScreen
   - OnboardingScreen
   - InputScreen
   - AlchemyScreen
   - NoteDetailScreen
   - NotebookScreen
   - MailboxScreen
   - LetterDetailScreen
7. 前端项目目录建议使用：
   - components/
   - screens/
   - hooks/
   - api/
   - theme/
8. 当前前端不负责直接写主手记数据，只负责提交、等待、展示和跳转
9. 不展示内部字段，如：
   - note_summaries.analysis
   - letter_events.payload.reason
   - letter_events.payload.triggered_by
   - agent_runs
10. 时间展示要考虑 `profiles.timezone`，但在这一轮页面还原阶段可以先预留实现点，第二轮再接真实逻辑

请你按以下输出顺序工作：
第一步：
- 先总结你从文档里理解到的产品页面结构、核心用户流程、当前生效口径
- 明确列出你准备实现的页面和组件结构

第二步：
- 搭建前端基础目录结构
- 设计 theme 基础常量（颜色、字体、间距、圆角、阴影等）
- 搭出主要页面组件骨架

第三步：
- 用 mock 数据实现页面内容、跳转和基础交互
- 确保移动端布局优先
- 确保每个页面至少有：正常态、空状态或占位态、加载态占位

第四步：
- 输出当前已完成内容、未完成内容、下一步建议
- 不要进入真实接口联调，除非我明确让你进入第二轮

实现原则：
- 先还原页面，再整理组件，再接接口，最后打磨动画
- 不要擅自改字段名
- 不要擅自发明新业务流程
- 如果发现 UI 稿和文档有不一致，先以 `v2026.05.20` 文档口径为准，并把冲突点列出来

## 二、接入真实接口

请继续作为 Alcheme 项目的前端工程师，在已有前端页面还原版基础上，进入第二轮：接入真实接口和真实数据逻辑。

请继续参考以下资料：

1. D:\Projects\alcheme_new\alcheme_项目开发文档_v2026.05.16.html
2. D:\Projects\alcheme_new\alcheme_项目开发文档_v2026.05.20.html
3. D:\Projects\alcheme_new\alcheme_前端开发文档_v2026.05.20.md
4. D:\Projects\alcheme_new\alcheme_表结构与接口契约_v2026.05.20.md

理解规则：
- `v2026.05.16` 用于补足全貌
- `v2026.05.20` 是当前生效口径
- 如果有冲突，一律以 `v2026.05.20` 为准
- 所有接口、字段名、用户可见/不可见数据边界，严格以 `alcheme_表结构与接口契约_v2026.05.20.md` 为准

当前任务目标：
把前端从 mock 数据切换到真实接口数据。

本轮重点：
1. 保留现有页面结构和视觉实现
2. 把 mock 数据替换成真实接口调用
3. 实现 loading / error / empty state
4. 正确处理 `profiles.timezone`
5. 不展示任何内部分析字段或调试字段

你需要接入的真实能力：

### 1. 提交“说说”
接口：
- `POST /v1/notes/distill`

前端职责：
- 从 InputScreen 提交：
  - `raw_input_type`
  - `raw_input`
  - `second_input_type`
  - `second_input`
- 提交后进入 loading / AlchemyScreen
- 成功后进入 NoteDetailScreen
- 展示返回的：
  - `ai_distilled`
  - `raw_input`
  - `second_input`
  - `created_at`

注意：
- 前端不自己写 `notes`
- 后端已经负责提炼和落库
- 前端只负责提交、等待、展示和跳转

### 2. 获取手记列表
接口：
- `GET /v1/notes`

前端职责：
- NotebookScreen 读取并展示用户自己的手记列表
- 使用返回字段：
  - `id`
  - `preview`
  - `created_at`

### 3. 获取单篇手记详情
接口：
- `GET /v1/notes/:id`

前端职责：
- NoteDetailScreen 展示：
  - `raw_input_type`
  - `raw_input`
  - `raw_voice_url`
  - `ai_distilled`
  - `second_input_type`
  - `second_input`
  - `second_voice_url`
  - `created_at`

### 4. 获取信件列表
接口：
- `GET /v1/letters`

前端职责：
- MailboxScreen 展示信件列表
- LetterDetailScreen 展示单封信内容
- 仅展示用户可见内容，不展示任何触发原因

### 5. 标记信件已读
接口：
- `POST /v1/letters/:id/read`

前端职责：
- 用户打开某封信后调用
- 更新已读状态

### 6. 用户资料和时区
前端需要接 `profiles` 相关数据，用于：
- 判断 `onboarding_completed`
- 获取 `timezone`
- 正确展示手记和来信日期

时间处理要求：
- 后端返回的时间按 UTC 理解
- 前端展示时，按 `profiles.timezone` 做本地化显示
- 手记列表、手记详情、信件列表、信件详情都要遵守同一套时间显示逻辑

绝对不要展示这些内容：
- `note_summaries.analysis`
- `letter_events.payload.reason`
- `letter_events.payload.triggered_by`
- `agent_runs`
- 任何内部分析结果

本轮建议的实现顺序：
1. 先实现 `useAlchemy`
2. 再实现 `useNotebook`
3. 再实现 `useMailbox`
4. 再实现 `useProfile`
5. 最后统一补 loading / error / empty state 和时间格式化逻辑

请按以下顺序输出：

第一步：
- 总结当前前端项目中哪些地方是 mock，哪些地方需要替换成真实接口
- 列出你准备修改的 hooks / api / screens

第二步：
- 实现真实接口请求层
- 替换 mock 数据
- 补齐必要状态管理

第三步：
- 检查所有页面是否遵守以下规则：
  - 不自己写主手记
  - 不展示内部字段
  - 时间按 `profiles.timezone` 显示
  - loading / error / empty state 完整

第四步：
- 输出本轮完成内容
- 明确剩余风险、缺失接口或需要后端配合的地方

实现原则：
- 保持现有页面结构，不要大改视觉
- 不要擅自修改字段名
- 不要擅自新增业务流程
- 如果某个接口细节不够明确，以 `alcheme_表结构与接口契约_v2026.05.20.md` 为准，并把问题列出来
# Alcheme 前端进度同步 · 2026.05.25

对齐文档版本：`frontend-dev-v2026.05.20.md` · `api-contract-v2026.05.20.md`

---

## 一、当前状态总结

**阶段一页面还原已基本完成，接口联调尚未开始。**

所有主要页面已用 mock 数据实现可交互 Demo，已部署至 GitHub（私有仓库），Vercel 部署进行中。

---

## 二、已完成（Done）

### 页面与流程

| 页面 | 状态 | 说明 |
|---|---|---|
| `AuthScreen` | ✅ 完成 | 登录 / 注册切换，mock 鉴权写入 localStorage |
| `OnboardingScreen` | ✅ 完成 | 多屏引导，注册后触发，登录跳过 |
| `HomeScreen` | ✅ 完成 | 情绪贴纸入口，主问句，开始说说按钮 |
| `InputScreen` | ✅ 完成 | 纸张输入区，能量选择，提炼按钮 |
| `AlchemyScreen` | ✅ 完成 | 炼金等待动效页 |
| `NoteDetailScreen` | ✅ 完成 | AI 提炼结果展示，第二次叙述入口 |
| `SecondNarrationScreen` | ✅ 完成 | 第二次叙述输入，可跳过 |
| `NotebookScreen` | ✅ 完成 | 手记列表，按月分组，骨架屏，空状态，错误态 |
| `JournalNoteDetailScreen` | ✅ 完成 | 手记详情，原声卡片，第二次叙述卡片 |
| `MailboxScreen` | ✅ 完成 | 信封列表，开信动效，未读鸟标，骨架屏 |
| `LetterDetailScreen` | ✅ 完成 | 信纸详情，日期组件，信纸纹理 |
| `MeScreen` | ✅ 完成 | 用户资料占位，隐私说明，登出 |

### 组件与设计系统

- ✅ CSS Token 体系（颜色、字体、间距、圆角）
- ✅ `AppShell` + `BottomNav`（四个主 Tab，iOS safe area 适配）
- ✅ `PaperCard`（纸张底色、纹理、阴影）
- ✅ `PrimaryButton` / `SecondaryButton`
- ✅ `PaperTextarea`（手记输入框）
- ✅ `ScreenHeader`（主页 / 详情页两种变体，含邮戳资产）
- ✅ `PostmarkStamp`（右上角邮戳装饰，四个主页通用）
- ✅ `OriginalVoiceCard` / `ReflectionVoiceCard`（原声 / 第二次叙述专属纸张卡片）
- ✅ `LetterDateBadge`（信件详情日期组件）
- ✅ `MoodSticker` / `WeatherStickers` / `EnergyDots`（情绪、能量选择器）
- ✅ `Stickers`（LeafSticker / FlowerSticker / StarSticker 花草贴纸资产）
- ✅ `EmptyState`（空状态组件，手记 / 信箱两种变体）
- ✅ 骨架屏（NotebookScreen、MailboxScreen）
- ✅ 错误状态 + 重试按钮（NotebookScreen、MailboxScreen）

### 接口与 Hook 骨架

- ✅ `api/client.ts`：通用 fetch 封装，Bearer token 支持，ApiError 类型
- ✅ `api/notes.ts` / `api/letters.ts` / `api/profile.ts`：接口函数签名和类型定义
- ✅ `useAlchemy` / `useNotebook` / `useNoteDetail` / `useMailbox` / `useProfile`：Hook 骨架已建立，类型对齐 API 契约，内部标注 `TODO (phase 2)` 注释

### 工程

- ✅ React 19 + TypeScript + Vite，TypeScript 严格模式无报错
- ✅ 移动端优先布局，桌面端居中 App 画布
- ✅ `prefers-reduced-motion` 尊重（动效降级）
- ✅ GitHub 私有仓库：[github.com/iamyfy/Alcheme_frontend](https://github.com/iamyfy/Alcheme_frontend)

---

## 三、待完成（To-Do）

### 接口联调（阶段二核心任务）

以下 hook 已有骨架，需在后端接口就绪后接入真实数据：

| Hook | 对应接口 | 优先级 |
|---|---|---|
| `useAlchemy.submit()` | `POST /v1/notes/distill` | 🔴 最高 |
| `useNotebook.reload()` | `GET /v1/notes` | 🔴 最高 |
| `useNoteDetail` | `GET /v1/notes/:id` | 🔴 最高 |
| `useMailbox.reload()` | `GET /v1/letters` | 🟡 次高 |
| `useMailbox.markRead()` | `POST /v1/letters/:id/read` | 🟡 次高 |
| `useProfile.reload()` | `GET /v1/profiles/me`（待确认） | 🟡 次高 |
| `useAuth` | Supabase `auth.users` | 🟡 次高 |

### 尚未实现的功能点

- ⬜ 真实登录 / 注册（当前为 localStorage mock，需接 Supabase Auth）
- ⬜ 时区自动检测后写入 `profiles.timezone`（前端代码已预留 `detectAndSaveTimezone()`，需接口支持）
- ⬜ 手记列表和信件列表按 `profiles.timezone` 格式化日期（当前用浏览器本地时区）
- ⬜ `onboarding_completed` 状态与 `profiles` 接口打通（当前存 localStorage）
- ⬜ 信件详情 `content` 字段渲染（当前为 mock 正文）
- ⬜ 手记详情真实 `ai_distilled` 数组渲染
- ⬜ 语音输入（`raw_input_type: "voice"`）—— 文档定义为阶段二
- ⬜ `MeScreen` 导出手记功能

---

## 四、需要后端 / 其他成员支持的地方

### 1. 接口部署和联调环境

**需要：** 一个可以从前端访问的 API 地址（`VITE_API_BASE_URL`），哪怕是本地或 staging 环境都可以。

目前前端 `api/client.ts` 已支持通过环境变量配置，部署时加 `.env` 即可接入。

### 2. 确认 profiles 接口

文档里说了 `profiles` 需要前端读取，但接口路径尚未在 `api-contract-v2026.05.20.md` 里明确列出。

**需要确认：**
- `GET /v1/profiles/me` 是否存在？返回结构是什么？
- `PATCH /v1/profiles/me` 是否支持更新 `timezone` 和 `onboarding_completed`？

### 3. 信件列表接口返回结构

`api-contract-v2026.05.20.md` 里 `GET /v1/letters` 只给了接口路径，没有返回字段示例。

**需要确认：** 返回数组里每封信包含哪些字段？至少需要：
- `id`、`type`、`content`（或 `title`）、`is_read`、`created_at`

当前 `letters` 表结构里有 `type` 字段，前端需要知道 `type` 如何映射到页面上展示的中文标签（随机回望 / 模式发现 / 近期回顾等），或者后端直接返回展示用的 label。

### 4. Supabase 项目配置

前端接入真实登录需要：
- Supabase 项目 URL
- Supabase anon key（公开安全，可给前端）
- 确认 Row Level Security (RLS) 策略已按用户隔离

**注意：** `SUPABASE_SECRET_KEY` 和 `DEEPSEEK_API_KEY` 严禁出现在前端代码或环境变量中。

### 5. `POST /v1/notes/distill` 接口可用时间

这是主链路的核心接口，前端 `AlchemyScreen` 和 `NoteDetailScreen` 都依赖它的返回值。目前这两个页面用 mock 数据展示，一旦接口可用可立即接入。

---

## 五、Demo 访问

- GitHub 仓库：[github.com/iamyfy/Alcheme_frontend](https://github.com/iamyfy/Alcheme_frontend)（私有，需邀请）
- 本地运行：`npm install && npm run dev`
- 构建：`npm run build`（产物在 `dist/`）
- Vercel 部署：进行中，地址待更新

---

*文档更新时间：2026-05-25*

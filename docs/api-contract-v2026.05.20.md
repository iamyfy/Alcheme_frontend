# Alcheme 表结构与接口契约 v2026.05.20

这份文档是产品+后端今天要交接给前端和 Prompt 工程师的版本。

目标：
- 让三个人都清楚数据库里有哪些核心数据
- 让前端知道该接什么字段
- 让 Prompt 工程师知道哪些 AI 结果给用户看，哪些是系统内部用
- 让 AI coding 在开工前能直接读取这份文档

## 1. 核心原则

### 1.1 用户可见内容和系统内部内容分开

- 用户可见：
  - `profiles`
  - `notes`
  - `letters`

- 系统内部：
  - `note_summaries`
  - `agent_runs`
  - `letter_events`

### 1.2 主链路由后端统一落库

用户在“说说”页提交内容后：

1. 前端把原始内容交给后端
2. 后端做 AI 提炼
3. 后端写入 `notes`
4. 后端写入 `note_summaries`
5. 后端把结果返回前端

前端不再自己写主手记。

### 1.3 Supabase 自带用户表不等于 profiles

- `auth.users`：Supabase 自动维护，负责认证
- `profiles`：产品自己的资料扩展表

`profiles` 用来存产品字段，比如：
- 是否完成引导
- 时区
- 最近活跃时间

## 2. 表结构概览

| 表名 | 用途 | 前端参与方式 / 权限 | 后端参与方式 / 权限 | Prompt 参与方式 / 权限 |
| --- | --- | --- | --- | --- |
| `profiles` | 用户资料扩展表 | 读取、展示、更新自己的资料 | 建表、读写、维护资料逻辑 | 不直接参与 |
| `notes` | 用户手记主表 | 读取并展示自己的手记 | 调用 DeepSeek 后写入主手记 | 通过提炼 Prompt 决定 `ai_distilled` 的内容 |
| `note_summaries` | 给 Agent 用的内部分析 | 不可见、无权限 | 写入、读取、提供给 Agent | 通过提炼 Prompt 定义 `analysis` 输出结构，供 Agent 消费 |
| `letters` | 来信主表 | 读取并展示自己的来信，标记已读 | 生成并写入来信 | 通过触发 Prompt 和来信 Prompt 参与生成 |
| `agent_runs` | 夜间任务记录 | 不可见、无权限 | 记录 nightly run 状态、错误、结果 | 不直接参与 |
| `letter_events` | 信件事件与触发原因记录 | 不可见、无权限 | 记录触发原因、关联 note、事件日志 | 提供触发原因和生成过程所依赖的 Prompt 结构 |

## 3. 详细表结构

### 3.1 profiles

用途：
- 补充用户资料

核心字段：

| 字段 | 说明 |
| --- | --- |
| `id` | 对应 `auth.users.id` |
| `onboarding_completed` | 是否完成引导 |
| `timezone` | 时区 |
| `last_active_at` | 最近活跃时间 |
| `created_at` | 创建时间 |
| `updated_at` | 更新时间 |

说明：
- 这是产品自己的资料层
- 当前保持轻量即可

字段补充说明：

#### `id`
- 保存意义：把这条资料记录和 Supabase 登录用户一一对应起来
- 获取方式：来自 `auth.users.id`
- 谁写入：后端或建档逻辑写入
- 什么时候写入：用户注册成功、第一次创建资料记录时

#### `onboarding_completed`
- 保存意义：判断用户是否完成新手引导
- 获取方式：用户完成引导后由产品流程触发
- 谁写入：前端触发，前端或后端更新
- 什么时候更新：完成 onboarding 的那个节点

#### `timezone`
- 保存意义：记录用户所在时区
- 主要用途：
  - 决定手记和来信的日期应该如何展示
  - 决定“今天 / 昨天 / 最近几天”这类时间语义如何解释
  - 决定 Agent 应按用户本地什么时间运行或计算日期窗口
- 获取方式：
  - 首次进入产品时由前端从浏览器自动获取
  - 以后如果有设置页，可允许用户手动修改
- 谁写入：前端获取，前端或后端写入
- 什么时候更新：
  - 首次注册后写入一次
  - 用户主动修改时区设置时更新

#### `last_active_at`
- 保存意义：记录最近一次活跃时间
- 主要用途：
  - 判断最近 30 天是否活跃
  - 决定夜间 Agent 是否需要处理该用户
- 获取方式：用户发生关键行为时更新
- 谁写入：前端触发，前端或后端更新
- 建议更新时机：
  - 登录时
  - 提交“说说”时

#### `created_at`
- 保存意义：记录资料创建时间
- 获取方式：数据库自动生成
- 谁写入：数据库
- 什么时候写入：首次创建时

#### `updated_at`
- 保存意义：记录资料最后更新时间
- 获取方式：每次更新资料时自动刷新
- 谁写入：后端或数据库自动维护
- 什么时候更新：资料字段变化时

### 3.2 notes

用途：
- 用户手记主表

核心字段：

| 字段 | 说明 |
| --- | --- |
| `id` | 手记 id |
| `user_id` | 所属用户 |
| `raw_input_type` | 第一次输入是 `text` 或 `voice` |
| `raw_input` | 第一次输入文本；如果是语音，这里存转写文本 |
| `raw_voice_url` | 第一次输入原始语音地址，可为空 |
| `ai_distilled` | AI 提炼结果，`jsonb` 数组，条数不固定 |
| `second_input_type` | 第二次输入是 `text` 或 `voice`，可为空 |
| `second_input` | 第二次输入文本，可为空 |
| `second_voice_url` | 第二次输入原始语音地址，可为空 |
| `created_at` | 创建时间 |

说明：
- 手记主体是 `ai_distilled`
- `raw_input` 保留原始表达
- `second_input` 是用户二次补充表达
- 当前不做“重炼历史版本”存库
- 如果以后要做重炼，可以在产品和接口层扩展

### 3.3 note_summaries

用途：
- 给 Agent 使用的摘要层

核心字段：

| 字段 | 说明 |
| --- | --- |
| `id` | 摘要 id |
| `note_id` | 对应哪篇手记 |
| `user_id` | 所属用户 |
| `analysis` | `jsonb`，内部分析结果 |
| `created_at` | 创建时间 |

说明：
- 不给前端直接展示
- 和 `notes` 分开，是为了权限隔离
- `analysis` 的内部结构由 Prompt 输出约定定义
- 数据库层不拆成很多固定列

### 3.4 letters

用途：
- 用户收到的来信

核心字段：

| 字段 | 说明 |
| --- | --- |
| `id` | 信件 id |
| `user_id` | 所属用户 |
| `type` | 信件类型 |
| `content` | 正文 |
| `is_read` | 是否已读 |
| `created_at` | 创建时间 |

说明：
- 这张表尽量只放用户需要看到的主内容
- 不把“为什么触发”直接放在用户可见层

### 3.5 agent_runs

用途：
- 记录每次夜间 Agent 任务

核心字段：

| 字段 | 说明 |
| --- | --- |
| `id` | 任务记录 id |
| `run_type` | 任务类型 |
| `run_date` | 业务日期 |
| `user_id` | 对应用户 |
| `status` | `started / skipped / succeeded / failed` |
| `trigger_result` | 触发判断结果 |
| `error_message` | 错误信息 |
| `started_at` | 开始时间 |
| `finished_at` | 结束时间 |

说明：
- 这张表是团队排查问题用的
- 不给用户展示

### 3.6 letter_events

用途：
- 记录信件生命周期事件，以及触发原因、关联手记等内部信息

核心字段：

| 字段 | 说明 |
| --- | --- |
| `id` | 事件 id |
| `letter_id` | 对应信件 |
| `user_id` | 所属用户 |
| `event_type` | 如 `generated / read / failed` |
| `payload` | 补充信息，可包含 `triggered_by`、`reason` |
| `created_at` | 创建时间 |

说明：
- `payload.triggered_by` 可存触发这封信的 `note_id` 数组
- `payload.reason` 可存一条简短触发原因
- 这些信息给后端和团队 debug 用，不直接给用户看
- 当前先使用 `payload`，是因为这部分内部调试信息还在早期探索期，结构可能还会变化
- 现在先放在 `jsonb` 里，后续新增或调整字段不需要改表结构
- 如果以后团队经常按某个字段筛选、统计、排序，或者前端/运营后台开始稳定依赖这些字段，再考虑把它们拆成单独列

## 4. 前端要接的核心接口

### 4.1 提交“说说”

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

说明：
- 如果是语音输入，对应传 `voice`
- 语音上传链路属于阶段二

后端回：

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

用途：
- InputScreen 提交
- AlchemyScreen 等待
- NoteDetailScreen 展示

### 4.2 获取手记列表

`GET /v1/notes`

返回示意：

```json
{
  "items": [
    {
      "id": "uuid",
      "preview": "提炼第一条",
      "created_at": "时间"
    }
  ],
  "next_cursor": null
}
```

### 4.3 获取单篇手记详情

`GET /v1/notes/:id`

返回示意：

```json
{
  "id": "uuid",
  "raw_input_type": "text",
  "raw_input": "原始输入",
  "raw_voice_url": null,
  "ai_distilled": ["句子1", "句子2"],
  "second_input_type": "text",
  "second_input": "可选",
  "second_voice_url": null,
  "created_at": "时间"
}
```

### 4.4 获取信件列表

`GET /v1/letters`

### 4.5 标记信件已读

`POST /v1/letters/:id/read`

返回示意：

```json
{
  "id": "uuid",
  "is_read": true,
  "read_at": "时间"
}
```

## 5. Prompt 工程师需要特别知道的点

### 5.1 给用户看的内容

- `notes.ai_distilled`
- `letters.content`

### 5.2 不直接给用户看的内容

- `note_summaries.analysis`
- `agent_runs.trigger_result`
- `letter_events.payload.triggered_by`
- `letter_events.payload.reason`

## 6. 前后端字段命名约定

以下字段名尽量不要再改：

- `raw_input_type`
- `raw_input`
- `raw_voice_url`
- `ai_distilled`
- `second_input_type`
- `second_input`
- `second_voice_url`
- `analysis`
- `type`
- `is_read`
- `triggered_by`
- `reason`

原因：
- 一旦命名改动，会造成前端、后端、Prompt、AI coding 多方重新对齐

## 7. 时间处理统一口径

- 数据库中的时间统一存 UTC
- 包括：
  - `created_at`
  - `updated_at`
  - `last_active_at`
  - `read_at`
  - `started_at`
  - `finished_at`
- `profiles.timezone` 用来记录用户时区，例如 `Asia/Shanghai`
- 前端展示手记和来信日期时，要按用户时区格式化
- 后端做“今天 / 昨天 / 最近 7 天 / 最近 30 天”这类计算时，要按用户时区解释 UTC 时间

## 8. 六种来信名称

当前统一使用以下六种来信名称：

- `review`
- `recall`
- `deepen`
- `pattern`
- `shift`
- `absent`

## 9. 阶段一交付范围

今天这份文档交付后，阶段一建议按这个范围推进：

1. 完成表结构
2. 完成主提炼接口
3. 完成手记列表与详情接口
4. 完成信件列表与已读接口
5. Prompt 工程师先打磨：
   - “说说”提炼
   - 内部分析 `analysis`
   - `review` 来信

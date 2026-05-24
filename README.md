# Alcheme Frontend

Alcheme 的前端项目壳子。当前阶段先做页面还原版：用 mock 数据把移动端页面、页面跳转和基础交互跑通，暂时不接真实后端接口。

## 怎么启动

```bash
npm install
npm run dev
```

打开本地地址：

```text
http://127.0.0.1:5173/
```

生产构建检查：

```bash
npm run build
```

## 当前目录说明

```text
Alcheme_frontend/
  docs/                 项目文档、接口契约、UI 设计说明
  public/
    reference/          设计参考图，不参与打包逻辑，方便照着还原 UI
  src/                  前端源码
    api/                请求函数层，后面接真实接口时改这里
    components/         可复用 UI 组件
    hooks/              页面状态逻辑，比如 loading / error / result
    screens/            页面组件，一个页面一个主文件
    theme/              颜色、字体、间距等设计 token
    App.tsx             当前页面路由和主流程控制
    main.tsx            React 入口
    styles.css          全局样式
    types.ts            全局类型
  index.html            Vite HTML 入口
  package.json          依赖和脚本
  vite.config.ts        Vite 配置
  tsconfig*.json        TypeScript 配置
```

## 你接下来怎么做

第一轮先别接接口，先还原页面：

1. 先看 `docs/ui-design.md` 和 `public/reference/` 里的三张图。
2. 优先改 `src/components/`，把纸张卡片、按钮、底部导航、输入框做成可复用组件。
3. 再改 `src/screens/`，按页面补视觉和交互。
4. mock 数据先直接放页面里，等页面稳定后再抽到 hooks。
5. 每个核心页面都补 loading、empty、error、success 状态。

第二轮再接真实接口：

1. 在 `src/api/client.ts` 配置基础请求。
2. 在 `src/api/notes.ts` 接 `/v1/notes/distill`、`/v1/notes`、`/v1/notes/:id`。
3. 在 `src/api/letters.ts` 接 `/v1/letters`、`/v1/letters/:id/read`。
4. 在 `src/api/profile.ts` 接用户资料、onboarding、timezone。
5. 在 `src/hooks/` 里管理 loading / error / result。

## 后端地址配置

等进入接口联调时，新建 `.env.local`：

```text
VITE_API_BASE_URL=https://your-api.example.com
```

不要把 `.env.local` 提交到仓库。

## 当前注意事项

- 前端不负责直接写主手记，提交后由后端统一提炼和落库。
- 不展示内部字段：`note_summaries.analysis`、`letter_events.payload.reason`、`letter_events.payload.triggered_by`、`agent_runs`。
- 手记文案用第一人称“我……”。
- 来信文案用第二人称“你……”。
- 移动端优先，桌面端只需要居中展示手机画布。

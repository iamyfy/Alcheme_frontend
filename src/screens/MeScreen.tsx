import { useState, useRef } from "react";
import { Pencil } from "lucide-react";
import { PaperCard } from "../components/PaperCard";
import { PrimaryScreenHeader } from "../components/ScreenHeader";
import { BottleSticker, StarSticker } from "../components/Stickers";

const NAME_KEY = "alcheme_mock_name";

type MeScreenProps = {
  onSignOut: () => void;
  onOnboarding: () => void;
};

export function MeScreen({ onSignOut, onOnboarding }: MeScreenProps) {
  const [demoMode, setDemoMode] = useState(true);
  const [name, setName] = useState(() => window.localStorage.getItem(NAME_KEY) ?? "");
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const startEdit = () => {
    setDraft(name);
    setEditing(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const commitEdit = () => {
    const trimmed = draft.trim();
    setName(trimmed);
    window.localStorage.setItem(NAME_KEY, trimmed);
    setEditing(false);
  };

  return (
    <section className="screen">
      {/* Decorative sticker */}
      <StarSticker
        variant="gold"
        className="scr-deco"
        style={{ top: 20, right: 16, width: 16, height: 16, opacity: 0.4 }}
        aria-hidden
      />

      <PrimaryScreenHeader title="我的" kicker="这里没有旁观者，只有你" />

      {/* User profile card */}
      <div className="me-avatar-card">
        <div className="me-avatar">
          <BottleSticker style={{ width: 36, height: 56 }} aria-hidden />
        </div>
        <div className="me-name-block">
          {editing ? (
            <input
              ref={inputRef}
              className="me-name-input"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onBlur={commitEdit}
              onKeyDown={(e) => { if (e.key === "Enter") commitEdit(); if (e.key === "Escape") setEditing(false); }}
              maxLength={20}
              placeholder="你的称呼"
              aria-label="编辑称呼"
            />
          ) : (
            <button
              className="me-name-btn"
              type="button"
              onClick={startEdit}
              aria-label="点击设置或修改称呼"
            >
              <span className="me-name-text">{name || " "}</span>
              <Pencil size={13} strokeWidth={1.6} className="me-name-pencil" aria-hidden />
            </button>
          )}
          <span className="me-name-hint">希望 Alcheme 怎么称呼你</span>
        </div>
      </div>

      {/* Privacy card */}
      <PaperCard
        hasTape
        tapeColor="sage"
        tapePosition="top-left"
        style={{ marginBottom: 20, padding: "16px 18px" }}
      >
        <p className="reflection-card__label">关于你的隐私</p>
        <p style={{ margin: 0, fontSize: "var(--text-note)", color: "var(--ink)", lineHeight: "var(--leading-body)" }}>
          这里不是表演空间。你的手记只用于生成你的手记和来信，不会用于训练，也不会对外分享。
        </p>
      </PaperCard>

      {/* Menu */}
      <p className="me-section-label">功能</p>
      <nav className="me-menu" style={{ marginBottom: 20 }}>
        <button className="me-menu-item" type="button" onClick={onOnboarding}>
          <span className="me-menu-item__label">重新查看引导</span>
          <span className="me-menu-item__chevron">›</span>
        </button>
        <button className="me-menu-item" type="button">
          <span className="me-menu-item__label">导出我的手记</span>
          <span className="me-menu-item__chevron">›</span>
        </button>
        <button className="me-menu-item" type="button">
          <span className="me-menu-item__label">隐私说明</span>
          <span className="me-menu-item__chevron">›</span>
        </button>
      </nav>

      {/* Demo mode toggle */}
      <p className="me-section-label">开发选项</p>
      <div className="me-toggle-row" style={{ marginBottom: 20 }}>
        <div className="me-toggle-text">
          <span className="me-toggle-title">演示模式</span>
          <span className="me-toggle-desc">使用模拟数据，不连接服务器</span>
        </div>
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={demoMode}
            onChange={(e) => setDemoMode(e.target.checked)}
          />
          <span className="toggle-track" />
        </label>
      </div>

      {/* Sign out */}
      <nav className="me-menu">
        <button className="me-menu-item" type="button" onClick={onSignOut} style={{ color: "var(--rose-dark)" }}>
          <span className="me-menu-item__label">退出登录</span>
        </button>
      </nav>
    </section>
  );
}

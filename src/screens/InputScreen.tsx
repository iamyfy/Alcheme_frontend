import { useState } from "react";
import { Calendar, ChevronLeft, Mic } from "lucide-react";
import { WeatherStickers } from "../components/WeatherStickers";

type InputScreenProps = {
  onBack: () => void;
  onSubmit: () => void;
};

function getNow() {
  return new Date().toLocaleTimeString("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function getDateLabel() {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const weekdays = ["日", "一", "二", "三", "四", "五", "六"];
  const weekday = `周${weekdays[now.getDay()]}`;
  return `${month}月${day}日 ${weekday}`;
}

export function InputScreen({ onBack, onSubmit }: InputScreenProps) {
  const [content, setContent] = useState("");
  const [energy, setEnergy] = useState<string>();
  const [time] = useState(getNow);
  const [date] = useState(getDateLabel);

  const charCount = content.length;
  const canSubmit = content.trim().length > 0;

  return (
    <div className="input-fullscreen">
      {/* ── Top bar ── */}
      <div className="input-topbar">
        <button
          className="input-topbar__back"
          type="button"
          aria-label="返回"
          onClick={onBack}
        >
          <ChevronLeft size={22} strokeWidth={1.8} />
        </button>

        {/* Date badge pill */}
        <div className="input-date-badge" aria-label={`记录日期：${date}`}>
          <Calendar size={13} strokeWidth={1.8} className="input-date-badge__icon" />
          <span className="input-date-badge__text">{date}</span>
        </div>

        {/* Spacer to balance the back button on the left */}
        <div style={{ width: 44 }} aria-hidden="true" />
      </div>

      {/* ── Status strip (△ 未整理 · time) ── */}
      <div className="input-status-strip">
        <span className="input-status-icon" aria-hidden="true">△</span>
        <span className="input-status-text">未整理</span>
        <span className="input-status-sep" aria-hidden="true">·</span>
        <span className="input-status-time">{time}</span>
      </div>

      {/* ── Weather energy sticker row ── */}
      <div className="input-sticker-strip">
        <WeatherStickers value={energy} onChange={setEnergy} />
      </div>

      {/* ── Full-screen ruled writing area ── */}
      <div
        className="input-paper"
        onClick={(e) => {
          const ta = (e.currentTarget as HTMLElement).querySelector("textarea");
          ta?.focus();
        }}
      >
        <label htmlFor="journal-content" className="sr-only">今天发生了什么</label>
        <textarea
          id="journal-content"
          className="input-paper__textarea"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="今天发生了什么，哪怕只有一句话。"
          autoFocus
        />
      </div>

      {/* ── Bottom toolbar ── */}
      <div className="input-bottombar">
        <span className="input-wordcount">{charCount} 字</span>
        <div className="input-bottombar__tools">
          <button
            className="input-alchemy-btn"
            type="button"
            disabled={!canSubmit}
            onClick={() => { if (canSubmit) onSubmit(); }}
          >
            开始提炼
          </button>
        </div>
      </div>

      {/* ── Floating mic FAB ── */}
      <button
        className="input-mic-fab"
        type="button"
        aria-label="语音输入"
      >
        <Mic size={19} strokeWidth={1.8} />
      </button>
    </div>
  );
}

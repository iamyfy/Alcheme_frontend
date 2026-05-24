import { useState } from "react";
import { Calendar, ChevronLeft, Mic } from "lucide-react";
import { WeatherStickers } from "../components/WeatherStickers";

type InputScreenProps = {
  onBack: () => void;
  onSubmit: () => void;
};

// timeZone defaults to browser locale; swap in userProfile.timezone when API is ready
function getNow(timeZone?: string) {
  return new Date().toLocaleTimeString("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone,
  });
}

function getDateLabel(timeZone?: string) {
  const parts = new Intl.DateTimeFormat("zh-CN", {
    month: "numeric",
    day: "numeric",
    weekday: "short",
    timeZone,
  }).formatToParts(new Date());
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "";
  return `${get("month")}月${get("day")}日 ${get("weekday")}`;
}

// Minimum character count before submission is allowed.
// Roughly 5 Chinese characters — "at least one real sentence".
const MIN_CHARS = 10;

type InputStatus = "idle" | "too-short" | "submitting" | "error";

export function InputScreen({ onBack, onSubmit }: InputScreenProps) {
  const [content, setContent] = useState("");
  const [energy, setEnergy] = useState<string>();
  const [time] = useState(getNow);
  const [date] = useState(getDateLabel);
  const [status, setStatus] = useState<InputStatus>("idle");

  const trimmed = content.trim();
  const charCount = content.length;
  // Button is only hard-disabled when empty or mid-submit.
  const btnDisabled = trimmed.length === 0 || status === "submitting";

  const handleSubmit = () => {
    if (btnDisabled) return;
    if (trimmed.length < MIN_CHARS) {
      setStatus("too-short");
      return;
    }
    setStatus("submitting");
    // TODO (phase 2): call distillNote(); set "error" on failure.
    setTimeout(onSubmit, 520);
  };

  const handleRetry = () => {
    setStatus("submitting");
    setTimeout(onSubmit, 520);
  };

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
          onChange={(e) => {
            setContent(e.target.value);
            if (status === "too-short" || status === "error") setStatus("idle");
          }}
          placeholder="今天发生了什么，哪怕只有一句话。"
          autoFocus
        />
      </div>

      {/* ── Floating paper-note popup ── */}
      {(status === "too-short" || status === "error") && (
        <div className="input-note-popup" role="alert">
          {/* Leaf sticker — top-left corner */}
          <div className="input-note-popup__leaf" aria-hidden>
            <svg width="20" height="26" viewBox="0 0 20 26">
              <path
                d="M 10 2 Q 17 7, 17 14 Q 16 21, 10 24 Q 4 21, 3 14 Q 3 7, 10 2 Z"
                fill="#A8B496" opacity="0.72"
              />
              <path
                d="M 10 4 Q 13 9, 13 14 Q 12 19, 10 22"
                stroke="#5E7350" strokeWidth="0.8" fill="none" opacity="0.55"
              />
            </svg>
          </div>

          {status === "too-short" && (
            <p className="input-note-popup__text input-note-popup__text--warn">
              再多给我一点线索，好让我更认真地看见你。
            </p>
          )}

          {status === "error" && (
            <>
              <p className="input-note-popup__text">
                提炼这一页时出了点意外，内容都还在。
              </p>
              <button
                className="input-note-popup__retry"
                type="button"
                onClick={handleRetry}
              >
                重试 →
              </button>
            </>
          )}
        </div>
      )}

      {/* ── Bottom toolbar ── */}
      <div className="input-bottombar">
        <span className="input-wordcount">{charCount} 字</span>
        <div className="input-bottombar__tools">
          <button
            className={`input-alchemy-btn${status === "submitting" ? " input-alchemy-btn--submitting" : ""}`}
            type="button"
            disabled={btnDisabled}
            onClick={handleSubmit}
          >
            {status === "submitting" ? "照亮中 ✦" : "开始提炼 ✦"}
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

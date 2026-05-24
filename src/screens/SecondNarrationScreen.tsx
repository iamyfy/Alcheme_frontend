import { useState } from "react";
import { PaperCard } from "../components/PaperCard";
import { SecondaryScreenHeader } from "../components/ScreenHeader";
import { TitleUnderline } from "../components/TitleUnderline";

type SecondNarrationScreenProps = {
  onBack: () => void;
  onSave: () => void;
};

const AI_REFLECTIONS = [
  "我在很累的时候，还是把重要的事情推进了一步。",
  "我没有逃开那件让我不安的事。",
  "我正在学习用更温柔的方式对待自己。",
];

/* ── Paper pin SVG ── */
function Pin() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
      <circle cx="11" cy="8" r="5.2" fill="#E6C37A" stroke="#B9954A" strokeWidth="1.2" />
      <circle cx="11" cy="8" r="2.2" fill="#B9954A" opacity="0.8" />
      <line x1="11" y1="13.2" x2="11" y2="20" stroke="#B9954A" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function SecondNarrationScreen({ onBack, onSave }: SecondNarrationScreenProps) {
  const [text, setText] = useState("");

  return (
    <section className="screen second-screen">
      <div className="enter enter-1">
        <SecondaryScreenHeader title="用你的话留住它" onBack={onBack} />
        <TitleUnderline width={140} />
      </div>

      {/* Pinned AI reflection bundle */}
      <div className="second-bundle enter enter-2" style={{ transform: "rotate(-1.6deg)" }}>
        {/* Paper pin at top center */}
        <div className="second-bundle__pin">
          <Pin />
        </div>

        <PaperCard torn="both" className="second-bundle__card">
          {/* Branch sticker: top-right */}
          <div className="second-bundle__deco second-bundle__deco--branch" aria-hidden="true">
            <svg width="34" height="30" viewBox="0 0 34 30"
              style={{ filter: "drop-shadow(0 0 1px rgba(255,255,255,0.85)) drop-shadow(0 1px 2px rgba(120,90,50,0.18))" }}>
              <path d="M 4 26 Q 10 18, 16 10 Q 22 3, 28 3"
                stroke="#7F8E6A" strokeWidth="1.8" fill="none" strokeLinecap="round" />
              <path d="M 16 10 Q 10 8, 8 3"
                stroke="#A8B496" strokeWidth="1.2" fill="none" strokeLinecap="round" />
              <path d="M 22 16 Q 28 13, 30 8"
                stroke="#A8B496" strokeWidth="1.2" fill="none" strokeLinecap="round" />
              <ellipse cx="8" cy="3" rx="3.5" ry="2.2" fill="#A8B496" opacity="0.8" transform="rotate(-18 8 3)" />
              <ellipse cx="30" cy="8" rx="3.5" ry="2.2" fill="#A8B496" opacity="0.8" transform="rotate(15 30 8)" />
            </svg>
          </div>

          {/* Sparkle: bottom-left */}
          <div className="second-bundle__deco second-bundle__deco--sparkle" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 14 14">
              <line x1="7" y1="1" x2="7" y2="13" stroke="#E6C37A" strokeWidth="1.4" strokeLinecap="round" />
              <line x1="1" y1="7" x2="13" y2="7" stroke="#E6C37A" strokeWidth="1.4" strokeLinecap="round" />
              <line x1="3" y1="3" x2="11" y2="11" stroke="#B8B1C8" strokeWidth="0.9" strokeLinecap="round" opacity="0.7" />
              <line x1="11" y1="3" x2="3"  y2="11" stroke="#B8B1C8" strokeWidth="0.9" strokeLinecap="round" opacity="0.7" />
            </svg>
          </div>

          {/* Reflection text lines */}
          <div className="second-bundle__lines">
            {AI_REFLECTIONS.map((r, i) => (
              <p key={i} className="second-bundle__line">{r}</p>
            ))}
          </div>
        </PaperCard>
      </div>

      {/* Writing card */}
      <div className="second-writing-wrap enter enter-3" style={{ transform: "rotate(0.6deg)" }}>
        <PaperCard variant="writing" torn="both" className="second-writing-card">
          <textarea
            className="second-writing-textarea"
            placeholder={"不需要写得更好，\n只是让它变成你的声音。"}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          {/* Moon sticker decoration */}
          <div className="second-writing-sticker" aria-hidden="true">
            <svg width="32" height="32" viewBox="0 0 32 32"
              style={{ filter: "drop-shadow(0 0 1px rgba(255,255,255,0.85)) drop-shadow(0 1px 3px rgba(120,90,50,0.15))" }}>
              <path
                d="M 23 6 Q 30 13, 26 22 Q 20 30, 9 26 Q 2 20, 6 11 Q 10 3, 19 5 Q 21 5.5, 23 6 Z"
                fill="#E7E3EE"
                opacity="0.88"
              />
              <path
                d="M 10 16 Q 14 9, 21 11 Q 16 13, 10 16 Z"
                fill="#D5CFE0"
                opacity="0.55"
              />
            </svg>
          </div>
        </PaperCard>
      </div>

      {/* Lavender save CTA */}
      <div className="second-actions enter enter-4">
        <button className="second-save-btn" type="button" onClick={onSave}>
          保存这次叙述 ✦
        </button>
      </div>
    </section>
  );
}

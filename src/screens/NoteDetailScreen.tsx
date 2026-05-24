import type { CSSProperties } from "react";
import { PenLine } from "lucide-react";
import { PaperCard } from "../components/PaperCard";
import { SecondaryScreenHeader } from "../components/ScreenHeader";
import { TitleUnderline } from "../components/TitleUnderline";

type NoteDetailScreenProps = {
  onBack: () => void;
  onRealchemy?: () => void;
  onSecond?: () => void;
};

const mockReflections = [
  "我在很累的时候，还是把重要的事情推进了一步。",
  "我没有逃开那件让我不安的事。",
  "我正在学习用更温柔的方式对待自己。",
];

const tapeColors = ["pink", "sage", "lavender"] as const;
const rotations = [-1.5, 1.2, -0.8];

/* ── Sticker SVG decorations ──────────────────────────────────── */
const stickerStyle: CSSProperties = {
  filter:
    "drop-shadow(0 0 1px rgba(255,255,255,0.9)) drop-shadow(0 1px 3px rgba(120,90,50,0.18))",
  display: "block",
};

function StickerLeaf() {
  return (
    <svg width="32" height="34" viewBox="0 0 32 34" aria-hidden="true" style={stickerStyle}>
      <path
        d="M 16 3 Q 26 8, 26 18 Q 26 27, 16 31 Q 6 27, 6 18 Q 6 8, 16 3 Z"
        fill="#A8B496"
        opacity="0.85"
      />
      <path
        d="M 16 5 Q 20 11, 20 18 Q 19 24, 16 29"
        stroke="#5E7350"
        strokeWidth="0.9"
        fill="none"
        opacity="0.55"
      />
    </svg>
  );
}

function StickerFlower() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true" style={stickerStyle}>
      <circle cx="15" cy="9"  r="5.5" fill="#ECC9C7" opacity="0.82" />
      <circle cx="22" cy="17" r="5.5" fill="#ECC9C7" opacity="0.82" />
      <circle cx="8"  cy="17" r="5.5" fill="#ECC9C7" opacity="0.82" />
      <circle cx="15" cy="23" r="5.5" fill="#ECC9C7" opacity="0.82" />
      <circle cx="15" cy="15" r="4.5" fill="#E6C37A" opacity="0.95" />
    </svg>
  );
}

function StickerLavender() {
  return (
    <svg width="30" height="36" viewBox="0 0 30 36" aria-hidden="true" style={stickerStyle}>
      <line x1="15" y1="18" x2="15" y2="34" stroke="#7F8E6A" strokeWidth="2.2" strokeLinecap="round" opacity="0.65" />
      <ellipse cx="11" cy="11" rx="5.5" ry="3.5" fill="#D5CFE0" opacity="0.88" transform="rotate(-22 11 11)" />
      <ellipse cx="19" cy="13" rx="5.5" ry="3.5" fill="#D5CFE0" opacity="0.88" transform="rotate(22 19 13)" />
      <ellipse cx="9"  cy="18" rx="4.5" ry="2.8" fill="#B8B1C8" opacity="0.72" transform="rotate(-28 9 18)" />
      <ellipse cx="21" cy="19" rx="4.5" ry="2.8" fill="#B8B1C8" opacity="0.72" transform="rotate(28 21 19)" />
      <ellipse cx="15" cy="17" rx="3.5" ry="2.5" fill="#D5CFE0" opacity="0.9" />
    </svg>
  );
}

const STICKERS = [StickerLeaf, StickerFlower, StickerLavender];

const STICKER_POS: CSSProperties[] = [
  { position: "absolute", top: -12, left: -6, transform: "rotate(-20deg)", zIndex: 2, pointerEvents: "none" },
  { position: "absolute", top: -10, right: -8, transform: "rotate(14deg)",  zIndex: 2, pointerEvents: "none" },
  { position: "absolute", top: -10, left: 8,   transform: "rotate(-8deg)",  zIndex: 2, pointerEvents: "none" },
];

export function NoteDetailScreen({ onBack, onRealchemy: _onRealchemy, onSecond }: NoteDetailScreenProps) {
  return (
    <section className="screen note-detail-screen">
      <div className="enter enter-1">
        <SecondaryScreenHeader title="我在这页里看见了这些" onBack={onBack} />
        <TitleUnderline width={180} />
        <p className="note-detail-subtitle">它们本来就在，只是刚刚被照亮。</p>
      </div>

      <div className="note-detail-reflections">
        {mockReflections.map((text, i) => {
          const Sticker = STICKERS[i];
          return (
            <div
              key={text}
              className={`note-detail-card-wrap enter enter-${i + 2}`}
              style={{ transform: `rotate(${rotations[i]}deg)` }}
            >
              <PaperCard
                variant="reflection"
                hasTape
                torn="both"
                tapeColor={tapeColors[i]}
                tapePosition="top-left"
                className="reflection-card"
              >
                <p className="reflection-card__text">{text}</p>
              </PaperCard>
              {/* Sticker renders after card so it paints on top */}
              <div style={STICKER_POS[i]} aria-hidden="true">
                <Sticker />
              </div>
            </div>
          );
        })}
      </div>

      {/* Actions pinned to bottom of flex column */}
      <div className="note-detail-actions" role="group" aria-label="操作">
        <p className="note-detail-prompt">想不想用自己的话，留住这几句话？</p>
        <div className="note-detail-actions__row">
          <button
            className="note-detail-secondary-btn"
            type="button"
            onClick={onSecond}
          >
            <PenLine aria-hidden size={14} strokeWidth={1.8} />
            用自己的话留住它
          </button>
          <button
            className="note-detail-secondary-btn"
            type="button"
            onClick={onBack}
          >
            今天先跳过
          </button>
        </div>
        <button
          className="note-detail-save-btn"
          type="button"
          onClick={onBack}
        >
          收进手记本 ✦
        </button>
      </div>
    </section>
  );
}

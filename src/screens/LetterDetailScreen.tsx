import { ArrowLeft } from "lucide-react";
import { LetterDateBadge } from "../components/LetterDateBadge";
import { PaperCard } from "../components/PaperCard";
import { PrimaryButton } from "../components/PrimaryButton";
import {
  LeafSticker,
  MoonSticker,
  EnvelopeSticker,
  StarSticker,
  QuillSticker,
} from "../components/Stickers";

type LetterDetailScreenProps = {
  onBack: () => void;
};

// Wavy divider with a center dot — visually separates title from body
function LetterDivider() {
  return (
    <div className="letter-detail-divider" aria-hidden="true">
      <svg width="96" height="12" viewBox="0 0 96 12" fill="none">
        <path
          d="M2 6 C16 1 30 11 48 6 C66 1 80 11 94 6"
          stroke="rgba(181,119,114,0.42)"
          strokeWidth="1.4"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="48" cy="6" r="2.2" fill="rgba(181,119,114,0.52)" />
      </svg>
    </div>
  );
}

export function LetterDetailScreen({ onBack }: LetterDetailScreenProps) {
  return (
    <section className="screen letter-detail-screen">

      {/* Ambient decorations */}
      <LeafSticker
        className="scr-deco"
        style={{ bottom: 230, left: -10, width: 52, height: 52, opacity: 0.36, transform: "rotate(-25deg) scaleX(-1)" }}
        aria-hidden
      />
      <QuillSticker
        className="scr-deco"
        style={{ top: 140, right: -2, width: 22, height: 34, opacity: 0.25, transform: "rotate(15deg)" }}
        aria-hidden
      />
      <MoonSticker
        className="scr-deco"
        style={{ top: 18, right: 18, width: 26, height: 26, opacity: 0.44 }}
        aria-hidden
      />
      <EnvelopeSticker
        className="scr-deco"
        style={{ bottom: 112, left: 20, width: 34, height: 26, opacity: 0.32 }}
        aria-hidden
      />
      <StarSticker
        variant="lavender"
        className="scr-deco"
        style={{ bottom: 152, right: 22, width: 13, height: 13, opacity: 0.42 }}
        aria-hidden
      />

      {/* Header: back ← | date badge | moon (three-column) */}
      <div className="letter-detail-header enter">
        <button
          className="icon-button"
          type="button"
          aria-label="返回"
          onClick={onBack}
        >
          <ArrowLeft aria-hidden size={22} />
        </button>
        <LetterDateBadge isoDate="2025-05-14T10:00:00+08:00" />
        <MoonSticker style={{ width: 26, height: 26, opacity: 0.48 }} aria-hidden />
      </div>

      {/* Letter card */}
      <PaperCard variant="letter" className="letter-detail-card enter enter-1">

        {/* Tag — same style & color as the mailbox card (rose) */}
        <div className="letter-detail-tag-row">
          <span className="env-card__tag env-card__tag--rose">随机回望</span>
        </div>

        {/* Letter title */}
        <h2 className="letter-detail-title">我今天想起了你</h2>

        {/* Decorative divider */}
        <LetterDivider />

        {/* Body — poetic line breaks */}
        <div className="letter-detail-body">
          <p>你那天说，<br />自己只是勉强撑住了。</p>
          <p>可是我记得，<br />那个时候你其实已经把<br />一件很难的事完成了。</p>
          <p>它不是侥幸，<br />它是你在场的证据。</p>
          <p>我把它放在这里，留给你慢慢看。</p>
        </div>

      </PaperCard>

      <div className="enter enter-2">
        <PrimaryButton onClick={onBack}>收好这封信 ✦</PrimaryButton>
      </div>

    </section>
  );
}

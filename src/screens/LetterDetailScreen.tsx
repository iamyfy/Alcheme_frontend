import { useState, useEffect } from "react";
import { PaperCard } from "../components/PaperCard";
import { PrimaryButton } from "../components/PrimaryButton";
import { SecondaryScreenHeader } from "../components/ScreenHeader";
import { StarSticker, MoonSticker } from "../components/Stickers";

type LetterDetailScreenProps = {
  onBack: () => void;
};

type Phase = "sealed" | "opening" | "revealed";

const SEAL_FILL = "#ECC9C7";
const SEAL_STROKE = "#B57772";

export function LetterDetailScreen({ onBack }: LetterDetailScreenProps) {
  const [phase, setPhase] = useState<Phase>("sealed");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("opening"), 80);
    const t2 = setTimeout(() => setPhase("revealed"), 580);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const flapOpen = phase !== "sealed";
  const contentVisible = phase === "revealed";

  return (
    <section className="screen">
      <MoonSticker
        className="scr-deco"
        style={{ top: 20, right: 20, width: 28, height: 28, opacity: 0.5 }}
        aria-hidden
      />
      <StarSticker
        variant="lavender"
        className="scr-deco"
        style={{ bottom: 160, right: 16, width: 16, height: 16, opacity: 0.4 }}
        aria-hidden
      />

      <SecondaryScreenHeader title="5 月 14 日" onBack={onBack} />

      <div className="letter-open-stage">
        {/* Envelope flap — rotates open on mount */}
        <div
          className={`letter-open-flap${flapOpen ? " letter-open-flap--open" : ""}`}
          aria-hidden="true"
        >
          <svg
            width="100%"
            height="64"
            viewBox="0 0 380 64"
            preserveAspectRatio="none"
          >
            <path
              d="M 0 0 L 380 0 L 190 60 Z"
              fill="rgba(231,220,199,0.94)"
              stroke="rgba(180,158,118,0.55)"
              strokeWidth="1.2"
            />
          </svg>
          <div className="letter-open-seal">
            <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden="true">
              <circle cx="22" cy="22" r="21" fill={SEAL_FILL} stroke={SEAL_STROKE} strokeWidth="1.2" />
              <circle cx="22" cy="22" r="17" fill="none" stroke={SEAL_STROKE} strokeWidth="0.6" opacity="0.5" />
              <text
                x="22" y="26"
                textAnchor="middle"
                fontSize="14"
                fill={SEAL_STROKE}
                fontFamily="serif"
                opacity="0.85"
              >✦</text>
            </svg>
          </div>
        </div>

        {/* Letter content — slides up after flap opens */}
        <div className={`letter-open-content${contentVisible ? " letter-open-content--visible" : ""}`}>
          <PaperCard
            variant="letter"
            hasTape
            tapeColor="lavender"
            tapePosition="both"
            className="letter-detail-card"
          >
            <div className="letter-detail-meta">
              <span className="letter-type-badge">随机回望</span>
              <span className="letter-detail-date">5 月 14 日</span>
            </div>
            <p className="letter-detail-body">
              我今天想起了你。{"\n\n"}
              你那天说，自己只是勉强撑住了。{"\n\n"}
              可是我记得，那个时候你其实已经把一件很难的事完成了。{"\n\n"}
              它不是侥幸，它是你在场的证据。{"\n\n"}
              我把它放在这里，留给你慢慢看。
            </p>
          </PaperCard>

          <PrimaryButton onClick={onBack}>收好这封信 ✦</PrimaryButton>
        </div>
      </div>
    </section>
  );
}

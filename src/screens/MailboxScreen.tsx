import { useState, useEffect } from "react";
import { PrimaryScreenHeader } from "../components/ScreenHeader";
import { EmptyState } from "../components/States";

type MailboxScreenProps = {
  onOpenLetter: () => void;
};

type Phase = "loading" | "ready" | "error";

type SealColor = "rose" | "sage" | "lavender";

const sealColors: Record<SealColor, { fill: string; stroke: string; glyph: string }> = {
  rose:     { fill: "#ECC9C7", stroke: "#B57772", glyph: "✦" },
  sage:     { fill: "#C6D0B5", stroke: "#5E7350", glyph: "⌒" },
  lavender: { fill: "#D5CFE0", stroke: "#6E65A0", glyph: "◎" },
};

function WaxSeal({ color, size = 40 }: { color: SealColor; size?: number }) {
  const { fill, stroke, glyph } = sealColors[color];
  const r = size / 2;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
      <circle cx={r} cy={r} r={r - 1} fill={fill} stroke={stroke} strokeWidth="1.2" />
      <circle cx={r} cy={r} r={r - 5} fill="none" stroke={stroke} strokeWidth="0.6" opacity="0.5" />
      <text
        x={r} y={r + 4}
        textAnchor="middle"
        fontSize={size * 0.32}
        fill={stroke}
        fontFamily="serif"
        opacity="0.85"
      >{glyph}</text>
    </svg>
  );
}

const mockLetters = [
  {
    id: "1",
    title: "我今天想起你说过的一句话",
    tag: "随机回望",
    seal: "rose" as SealColor,
    rotate: -1.2,
    isRead: false,
  },
  {
    id: "2",
    title: "我在你身上看见了一条线",
    tag: "模式发现",
    seal: "sage" as SealColor,
    rotate: 0.7,
    isRead: true,
  },
  {
    id: "3",
    title: "最近这段时间，你经历了这些",
    tag: "近期回顾",
    seal: "lavender" as SealColor,
    rotate: -0.5,
    isRead: true,
  },
];

const SKELETON_SEALS: SealColor[] = ["rose", "sage", "lavender"];
const SKELETON_ROTATIONS = [-1.2, 0.7, -0.5];

function EnvelopeCardSkeleton({ rotate, seal }: { rotate: number; seal: SealColor }) {
  return (
    <div
      className="envelope-card envelope-card--skeleton"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div className="envelope-card__body">
        <div className="envelope-card__flap" aria-hidden="true">
          <svg width="100%" height="52" viewBox="0 0 380 52" preserveAspectRatio="none">
            <path
              d="M 0 0 L 380 0 L 190 48 Z"
              fill="rgba(231,220,199,0.3)"
              stroke="rgba(231,220,199,0.6)"
              strokeWidth="1"
            />
          </svg>
        </div>
        <div className="envelope-card__seal" style={{ opacity: 0.35 }}>
          <WaxSeal color={seal} size={40} />
        </div>
        <div style={{ paddingTop: 8 }}>
          <div className="skeleton-line skeleton-line--full" />
          <div className="skeleton-line skeleton-line--medium" />
          <div style={{ marginTop: 6 }}>
            <div className="skeleton-line skeleton-line--tag" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function MailboxScreen({ onOpenLetter }: MailboxScreenProps) {
  const [phase, setPhase] = useState<Phase>("loading");

  useEffect(() => {
    const t = setTimeout(() => setPhase("ready"), 800);
    return () => clearTimeout(t);
  }, []);

  const retry = () => {
    setPhase("loading");
    setTimeout(() => setPhase("ready"), 800);
  };

  return (
    <section className="screen">
      <PrimaryScreenHeader title="信箱" kicker="有些话，会在合适的时候，找到你" />

      {phase === "loading" && (
        <div className="entry-list">
          {SKELETON_ROTATIONS.map((r, i) => (
            <EnvelopeCardSkeleton key={i} rotate={r} seal={SKELETON_SEALS[i]} />
          ))}
        </div>
      )}

      {phase === "error" && (
        <div className="screen-error">
          <p className="screen-error__text">信箱暂时打不开，但信还在那里。</p>
          <button className="screen-error__retry" type="button" onClick={retry}>
            再试一次
          </button>
        </div>
      )}

      {phase === "ready" && (
        mockLetters.length === 0 ? (
          <EmptyState
            variant="letters"
            title="信箱现在是安静的"
            description="你每写一页，都会在某一天收到一封信。"
          />
        ) : (
          <div className="entry-list">
            {mockLetters.map((letter, i) => (
              <button
                key={letter.id}
                className={`envelope-card enter enter-${i + 1}`}
                type="button"
                onClick={onOpenLetter}
                style={{ transform: `rotate(${letter.rotate}deg)` }}
                aria-label={letter.title}
              >
                <div className="envelope-card__body">
                  <div className="envelope-card__flap" aria-hidden="true">
                    <svg width="100%" height="52" viewBox="0 0 380 52" preserveAspectRatio="none">
                      <path
                        d="M 0 0 L 380 0 L 190 48 Z"
                        fill="rgba(231,220,199,0.45)"
                        stroke="rgba(231,220,199,0.8)"
                        strokeWidth="1"
                      />
                    </svg>
                  </div>
                  <div className="envelope-card__seal">
                    <WaxSeal color={letter.seal} size={40} />
                  </div>
                  {!letter.isRead && (
                    <span className="envelope-card__unread" aria-label="未读" />
                  )}
                  <p className="envelope-card__title">{letter.title}</p>
                  <span className="envelope-card__tag">{letter.tag}</span>
                </div>
              </button>
            ))}
          </div>
        )
      )}
    </section>
  );
}

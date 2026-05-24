import { useState, useEffect } from "react";
import { PrimaryScreenHeader } from "../components/ScreenHeader";
import { EmptyState } from "../components/States";

type MailboxScreenProps = {
  onOpenLetter: () => void;
};

type Phase = "loading" | "ready" | "error";
type FlapColor = "rose" | "sage" | "lavender";

// ── Flap color palette ────────────────────────────────────────────────────────

const flapPalette: Record<FlapColor, {
  bg: string;
  glyphColor: string;
  glyphBorder: string;
}> = {
  rose:     { bg: "rgba(217,163,161,0.20)", glyphColor: "#A86762", glyphBorder: "rgba(168,103,98,0.32)" },
  sage:     { bg: "rgba(168,180,150,0.24)", glyphColor: "#5E7350", glyphBorder: "rgba(94,115,80,0.30)"  },
  lavender: { bg: "rgba(184,177,200,0.26)", glyphColor: "#6E65A0", glyphBorder: "rgba(110,101,160,0.28)" },
};

// ── Literary time ─────────────────────────────────────────────────────────────
// Converts ISO timestamp into a poetic Chinese expression.

function toLiteraryTime(isoDate: string): string {
  const diffMs  = Date.now() - new Date(isoDate).getTime();
  const diffH   = diffMs / 36e5;
  const diffD   = diffH  / 24;
  if (diffH  <  2)  return "刚刚抵达";
  if (diffH  < 10)  return "今晨送来";
  if (diffH  < 36)  return "昨夜抵达";
  if (diffD  <  4)  return "前日寄来";
  if (diffD  <  8)  return "七日前";
  if (diffD  < 16)  return "半月前";
  if (diffD  < 32)  return "月前抵达";
  return "久前寄来";
}

// ── Pigeon SVG (unread indicator) ─────────────────────────────────────────────

function PigeonIcon() {
  return (
    <svg width="22" height="17" viewBox="0 0 22 17" fill="none" aria-hidden="true">
      {/* wings */}
      <path d="M10 8 C8 5 4 4 1 5"   stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M10 8 C12 5 16 4 19 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      {/* body */}
      <ellipse cx="9.5" cy="10" rx="3.2" ry="2" fill="currentColor" opacity="0.80"/>
      {/* head */}
      <circle cx="13.5" cy="8" r="2.1" fill="currentColor" opacity="0.80"/>
      {/* beak */}
      <path d="M15.5 8 L17.5 8.4 L15.5 9" fill="currentColor" opacity="0.65"/>
      {/* tail feathers */}
      <path d="M6.5 11 L4 14"   stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.60"/>
      <path d="M7   11 L5 14.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" opacity="0.45"/>
    </svg>
  );
}

// ── Mock data ─────────────────────────────────────────────────────────────────
// created_at drives toLiteraryTime; other fields match LetterListItem shape.

const mockLetters = [
  {
    id:         "1",
    title:      "我今天想起你说过的一句话",
    tag:        "随机回望",
    flapColor:  "rose"     as FlapColor,
    rotate:     -1.2,
    isRead:     false,
    created_at: "2025-05-23T01:30:00+08:00",  // → 昨夜抵达
  },
  {
    id:         "2",
    title:      "我在你身上看见了一条线",
    tag:        "模式发现",
    flapColor:  "sage"     as FlapColor,
    rotate:     0.7,
    isRead:     true,
    created_at: "2025-05-21T10:00:00+08:00",  // → 前日寄来
  },
  {
    id:         "3",
    title:      "最近这段时间，你经历了这些",
    tag:        "近期回顾",
    flapColor:  "lavender" as FlapColor,
    rotate:     -0.5,
    isRead:     true,
    created_at: "2025-05-17T10:00:00+08:00",  // → 七日前
  },
];

// ── Skeleton ──────────────────────────────────────────────────────────────────

const SKELETON_CONFIGS: { flapColor: FlapColor; rotate: number }[] = [
  { flapColor: "rose",     rotate: -1.2 },
  { flapColor: "sage",     rotate:  0.7 },
  { flapColor: "lavender", rotate: -0.5 },
];

function EnvelopeCardSkeleton({ flapColor, rotate }: { flapColor: FlapColor; rotate: number }) {
  const { bg } = flapPalette[flapColor];
  return (
    <div className="env-card" style={{ transform: `rotate(${rotate}deg)` }} aria-hidden="true">
      <div className="env-card__inner">
        <div className="env-card__flap" style={{ background: bg, opacity: 0.45 }} />
        <div className="env-card__content">
          <div className="skeleton-line" style={{ width: 52, height: 10, marginBottom: 8 }} />
          <div className="skeleton-line skeleton-line--full" />
          <div className="skeleton-line skeleton-line--medium" />
          <div className="skeleton-line skeleton-line--tag" style={{ marginTop: 8 }} />
        </div>
      </div>
    </div>
  );
}

// ── Screen ────────────────────────────────────────────────────────────────────

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
          {SKELETON_CONFIGS.map((cfg, i) => (
            <EnvelopeCardSkeleton key={i} {...cfg} />
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
            {mockLetters.map((letter, i) => {
              const { bg, glyphColor, glyphBorder } = flapPalette[letter.flapColor];
              const literaryTime = toLiteraryTime(letter.created_at);
              return (
                <button
                  key={letter.id}
                  className={`env-card enter enter-${i + 1}`}
                  type="button"
                  onClick={onOpenLetter}
                  style={{ transform: `rotate(${letter.rotate}deg)` }}
                  aria-label={letter.title}
                >
                  <div className="env-card__inner">

                    {/* ── Left diagonal flap ── */}
                    <div className="env-card__flap" style={{ background: bg }} aria-hidden="true">
                      <span
                        className="env-card__glyph"
                        style={{ color: glyphColor, borderColor: glyphBorder }}
                      >
                        信
                      </span>
                    </div>

                    {/* ── Right content ── */}
                    <div className="env-card__content">
                      <span className="env-card__time">{literaryTime}</span>

                      {/* Unread: pigeon top-right */}
                      {!letter.isRead && (
                        <span className="env-card__pigeon" aria-label="未读">
                          <PigeonIcon />
                        </span>
                      )}

                      <p className="env-card__title">「{letter.title}」</p>

                      <div className="env-card__footer">
                        <span className="env-card__tag">{letter.tag}</span>
                        {/* Read: label bottom-right */}
                        {letter.isRead && (
                          <span className="env-card__read-label">已读</span>
                        )}
                      </div>
                    </div>

                  </div>
                </button>
              );
            })}
          </div>
        )
      )}
    </section>
  );
}

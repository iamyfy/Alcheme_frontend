import { useState, useEffect } from "react";
import { PrimaryScreenHeader } from "../components/ScreenHeader";
import { EmptyState } from "../components/States";

type MailboxScreenProps = { onOpenLetter: () => void };
type Phase    = "loading" | "ready" | "error";
type FlapColor = "rose" | "sage" | "lavender";
type OpenPhase = "entering" | "opening";

// ── Wax seal ──────────────────────────────────────────────────────────────────

const sealStyles: Record<FlapColor, { fill: string; stroke: string; glyph: string }> = {
  rose:     { fill: "#ECC9C7", stroke: "#B57772", glyph: "✦" },
  sage:     { fill: "#C6D0B5", stroke: "#5E7350", glyph: "⌒" },
  lavender: { fill: "#D5CFE0", stroke: "#6E65A0", glyph: "◎" },
};

function WaxSeal({ flapColor, size = 34 }: { flapColor: FlapColor; size?: number }) {
  const { fill, stroke, glyph } = sealStyles[flapColor];
  const r = size / 2;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
      <circle cx={r} cy={r} r={r - 1}   fill={fill}   stroke={stroke} strokeWidth="1.2" />
      <circle cx={r} cy={r} r={r - 4.5} fill="none"   stroke={stroke} strokeWidth="0.6" opacity="0.5" />
      <text
        x={r} y={r + 4}
        textAnchor="middle"
        fontSize={size * 0.33}
        fill={stroke}
        fontFamily="serif"
        opacity="0.88"
      >{glyph}</text>
    </svg>
  );
}

// ── Flap palette ──────────────────────────────────────────────────────────────

const flapPalette: Record<FlapColor, { bg: string }> = {
  rose:     { bg: "rgba(217,163,161,0.22)" },
  sage:     { bg: "rgba(168,180,150,0.26)" },
  lavender: { bg: "rgba(184,177,200,0.28)" },
};

// ── Pigeon icon ───────────────────────────────────────────────────────────────

function PigeonIcon() {
  return (
    <svg width="30" height="23" viewBox="0 0 30 23" fill="none" aria-hidden="true">
      {/* wings */}
      <path d="M13 10 C10 6 5 5 1 6"  stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"/>
      <path d="M13 10 C16 6 21 5 25 6" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"/>
      {/* body */}
      <ellipse cx="12" cy="13.5" rx="4.2" ry="2.6" fill="currentColor" opacity="0.82"/>
      {/* head */}
      <circle cx="17.5" cy="10.5" r="3"   fill="currentColor" opacity="0.82"/>
      {/* beak */}
      <path d="M20 10.5 L23 11.2 L20 12" fill="currentColor" opacity="0.68"/>
      {/* tail feathers */}
      <path d="M8  14.5 L4.5 19"   stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.58"/>
      <path d="M9  14.5 L6.5 19.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.42"/>
    </svg>
  );
}

// ── Literary time ─────────────────────────────────────────────────────────────

function toLiteraryTime(isoDate: string): string {
  const diffH = (Date.now() - new Date(isoDate).getTime()) / 3_600_000;
  const diffD = diffH / 24;
  if (diffH <  2) return "刚刚抵达";
  if (diffH < 10) return "今晨送来";
  if (diffH < 36) return "昨夜抵达";
  if (diffD <  4) return "前日寄来";
  if (diffD <  8) return "七日前";
  if (diffD < 16) return "半月前";
  if (diffD < 32) return "月前抵达";
  return "久前寄来";
}

// ── Mock data ─────────────────────────────────────────────────────────────────

const mockLetters = [
  {
    id: "1", title: "我今天想起你说过的一句话",
    tag: "随机回望", flapColor: "rose" as FlapColor,
    rotate: -1.2, isRead: false,
    created_at: "2025-05-23T01:30:00+08:00",
  },
  {
    id: "2", title: "我在你身上看见了一条线",
    tag: "模式发现", flapColor: "sage" as FlapColor,
    rotate: 0.7, isRead: true,
    created_at: "2025-05-21T10:00:00+08:00",
  },
  {
    id: "3", title: "最近这段时间，你经历了这些",
    tag: "近期回顾", flapColor: "lavender" as FlapColor,
    rotate: -0.5, isRead: true,
    created_at: "2025-05-17T10:00:00+08:00",
  },
];

type MockLetter = typeof mockLetters[number];

// ── Skeleton ──────────────────────────────────────────────────────────────────

const SKELETON_CONFIGS: { flapColor: FlapColor; rotate: number }[] = [
  { flapColor: "rose",     rotate: -1.2 },
  { flapColor: "sage",     rotate:  0.7 },
  { flapColor: "lavender", rotate: -0.5 },
];

function EnvelopeCardSkeleton({ flapColor, rotate }: { flapColor: FlapColor; rotate: number }) {
  return (
    <div className="env-card" style={{ transform: `rotate(${rotate}deg)` }} aria-hidden="true">
      <div className="env-card__inner">
        <div className="env-card__flap" style={{ background: flapPalette[flapColor].bg, opacity: 0.45 }} />
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
  const [phase, setPhase]               = useState<Phase>("loading");
  const [openingLetter, setOpeningLetter] = useState<MockLetter | null>(null);
  const [openPhase, setOpenPhase]       = useState<OpenPhase>("entering");

  useEffect(() => {
    const t = setTimeout(() => setPhase("ready"), 800);
    return () => clearTimeout(t);
  }, []);

  const retry = () => {
    setPhase("loading");
    setTimeout(() => setPhase("ready"), 800);
  };

  const handleLetterClick = (letter: MockLetter) => {
    setOpeningLetter(letter);
    setOpenPhase("entering");
    // Start flap rotation after card-appear animation
    const t1 = setTimeout(() => setOpenPhase("opening"), 300);
    // Navigate after flap is fully folded
    const t2 = setTimeout(onOpenLetter, 900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  };

  return (
    <section className="screen">
      <PrimaryScreenHeader title="信箱" kicker="有些话，会在合适的时候，找到你" />

      {/* ── Skeleton ── */}
      {phase === "loading" && (
        <div className="entry-list">
          {SKELETON_CONFIGS.map((cfg, i) => <EnvelopeCardSkeleton key={i} {...cfg} />)}
        </div>
      )}

      {/* ── Error ── */}
      {phase === "error" && (
        <div className="screen-error">
          <p className="screen-error__text">信箱暂时打不开，但信还在那里。</p>
          <button className="screen-error__retry" type="button" onClick={retry}>再试一次</button>
        </div>
      )}

      {/* ── Ready ── */}
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
                className={`env-card enter enter-${i + 1}`}
                type="button"
                onClick={() => handleLetterClick(letter)}
                style={{ transform: `rotate(${letter.rotate}deg)` }}
                aria-label={letter.title}
              >
                <div className="env-card__inner">
                  {/* Left diagonal flap with wax seal */}
                  <div className="env-card__flap" style={{ background: flapPalette[letter.flapColor].bg }} aria-hidden="true">
                    <WaxSeal flapColor={letter.flapColor} size={34} />
                  </div>
                  {/* Right content */}
                  <div className="env-card__content">
                    <span className="env-card__time">{toLiteraryTime(letter.created_at)}</span>
                    {!letter.isRead && (
                      <span className="env-card__pigeon" aria-label="未读">
                        <PigeonIcon />
                      </span>
                    )}
                    <p className="env-card__title">「{letter.title}」</p>
                    <div className="env-card__footer">
                      <span className="env-card__tag">{letter.tag}</span>
                      {letter.isRead && <span className="env-card__read-label">已读</span>}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )
      )}

      {/* ── Opening animation overlay ── */}
      {openingLetter && (
        <div className="env-open-overlay" aria-hidden="true">
          <div className="env-open-card">
            <div className="env-open-inner">
              {/* Flap: rectangular (no clip-path), rotates open on Y axis */}
              <div
                className={`env-open-flap${openPhase === "opening" ? " env-open-flap--open" : ""}`}
                style={{ background: flapPalette[openingLetter.flapColor].bg }}
              >
                <WaxSeal flapColor={openingLetter.flapColor} size={44} />
              </div>
              {/* Content */}
              <div className="env-open-content">
                <span className="env-card__time">{toLiteraryTime(openingLetter.created_at)}</span>
                <p className="env-open-title">「{openingLetter.title}」</p>
                <span className="env-card__tag">{openingLetter.tag}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

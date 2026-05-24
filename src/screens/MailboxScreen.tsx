import { useState, useEffect } from "react";
import { PrimaryScreenHeader } from "../components/ScreenHeader";
import { EmptyState } from "../components/States";

type MailboxScreenProps = { onOpenLetter: () => void };
type Phase    = "loading" | "ready" | "error";
type FlapColor = "rose" | "sage" | "lavender";
type OpenPhase = "entering" | "opening" | "exiting";

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
    // Wings rotate around the shoulder at SVG coordinate (18, 15)
    <svg width="46" height="38" viewBox="0 0 46 38" fill="none" aria-hidden="true">
      {/* Left wing — animated via .pigeon-wing-l */}
      <g className="pigeon-wing-l">
        <path d="M18 15 C13 8 6 5 0 6"
          stroke="white" strokeWidth="3.2" strokeLinecap="round" fill="none"/>
        <path d="M18 15 C13 12 6 10 1 11"
          stroke="white" strokeWidth="1.9" strokeLinecap="round" fill="none" opacity="0.58"/>
      </g>
      {/* Right wing — animated via .pigeon-wing-r */}
      <g className="pigeon-wing-r">
        <path d="M18 15 C23 8 30 5 36 6"
          stroke="white" strokeWidth="3.2" strokeLinecap="round" fill="none"/>
        <path d="M18 15 C23 12 30 10 34 11"
          stroke="white" strokeWidth="1.9" strokeLinecap="round" fill="none" opacity="0.58"/>
      </g>
      {/* Body */}
      <ellipse cx="15" cy="23" rx="9.5" ry="5.8" fill="white"/>
      {/* Neck (connects body to head) */}
      <ellipse cx="23" cy="19" rx="5"   ry="4.2" fill="white"/>
      {/* Head */}
      <circle  cx="29" cy="14" r="5.8"  fill="white"/>
      {/* Beak */}
      <path d="M34 12.5 L42 14.2 L34 16.2" fill="rgba(230,172,95,0.95)"/>
      {/* Eye */}
      <circle cx="30.5" cy="12.2" r="1.5" fill="rgba(75,65,105,0.88)"/>
      <circle cx="31"   cy="11.7" r="0.55" fill="white" opacity="0.85"/>
      {/* Tail feathers */}
      <path d="M7 26 L2  34" stroke="white" strokeWidth="2.6" strokeLinecap="round" opacity="0.88"/>
      <path d="M10 27 L6  35" stroke="white" strokeWidth="2"   strokeLinecap="round" opacity="0.66"/>
      <path d="M13 27.5 L10 35" stroke="white" strokeWidth="1.4" strokeLinecap="round" opacity="0.44"/>
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
    // 300 ms: card is settled → start flap fold
    setTimeout(() => setOpenPhase("opening"), 300);
    // 800 ms: flap mostly open → begin card exit (scale-up + fade)
    setTimeout(() => setOpenPhase("exiting"), 800);
    // 1000 ms: overlay is faded → navigate
    setTimeout(onOpenLetter, 1000);
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
        <div
          className={`env-open-overlay${openPhase === "exiting" ? " env-open-overlay--out" : ""}`}
          aria-hidden="true"
        >
          <div className={`env-open-card${openPhase === "exiting" ? " env-open-card--out" : ""}`}>
            <div className="env-open-inner">

              {/* Flap — same clip-path & padding as list card, folds back via rotateY */}
              <div
                className={`env-open-flap${
                  openPhase === "opening" || openPhase === "exiting" ? " env-open-flap--open" : ""
                }`}
                style={{ background: flapPalette[openingLetter.flapColor].bg }}
              >
                <WaxSeal flapColor={openingLetter.flapColor} size={44} />
              </div>

              {/* Letter paper revealed behind flap as it opens */}
              <div
                className={`env-open-paper${
                  openPhase === "opening" || openPhase === "exiting" ? " env-open-paper--visible" : ""
                }`}
              />

              {/* Right content — same classes as list card */}
              <div className="env-card__content">
                <span className="env-card__time">{toLiteraryTime(openingLetter.created_at)}</span>
                <p className="env-open-title">「{openingLetter.title}」</p>
                <div className="env-card__footer">
                  <span className="env-card__tag">{openingLetter.tag}</span>
                  {openingLetter.isRead && <span className="env-card__read-label">已读</span>}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
}

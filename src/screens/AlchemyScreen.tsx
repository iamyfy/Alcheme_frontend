import { useEffect } from "react";

type AlchemyScreenProps = {
  onDone: () => void;
};

/* Sparkle positions around the illustration */
const SPARKLES = [
  { x: 68,  y: 28,  size: 13, cls: "twinkle"   },
  { x: 40,  y: 58,  size: 9,  cls: "twinkle-2"  },
  { x: 162, y: 42,  size: 11, cls: "twinkle-3"  },
  { x: 148, y: 72,  size: 8,  cls: "twinkle"    },
  { x: 56,  y: 88,  size: 10, cls: "twinkle-2"  },
  { x: 176, y: 100, size: 9,  cls: "twinkle-3"  },
  { x: 90,  y: 18,  size: 7,  cls: "twinkle"    },
  { x: 130, y: 24,  size: 12, cls: "twinkle-2"  },
];

function Sparkle({ x, y, size, cls }: { x: number; y: number; size: number; cls: string }) {
  const h = size / 2;
  return (
    <g className={cls} transform={`translate(${x} ${y})`}>
      <line x1={0} y1={-h} x2={0} y2={h} stroke="#E6C37A" strokeWidth="1.2" strokeLinecap="round" />
      <line x1={-h} y1={0} x2={h} y2={0} stroke="#E6C37A" strokeWidth="1.2" strokeLinecap="round" />
      <line x1={-h * 0.6} y1={-h * 0.6} x2={h * 0.6} y2={h * 0.6} stroke="#B8B1C8" strokeWidth="0.8" strokeLinecap="round" opacity="0.7" />
      <line x1={h * 0.6} y1={-h * 0.6} x2={-h * 0.6} y2={h * 0.6} stroke="#B8B1C8" strokeWidth="0.8" strokeLinecap="round" opacity="0.7" />
    </g>
  );
}

export function AlchemyScreen({ onDone }: AlchemyScreenProps) {
  useEffect(() => {
    const timer = window.setTimeout(onDone, 3200);
    return () => window.clearTimeout(timer);
  }, [onDone]);

  return (
    <section className="alchemy-screen">
      {/* Central illustration */}
      <div className="alchemy-illustration drift enter">
        <svg width="220" height="220" viewBox="0 0 220 220" aria-hidden="true">
          {/* Sparkles */}
          {SPARKLES.map((s, i) => <Sparkle key={i} {...s} />)}

          {/* Open book */}
          <path
            d="M 30 148 Q 30 141, 37 139 L 104 126 L 104 181 L 37 193 Q 30 192, 30 185 Z"
            fill="#F5E7C7" stroke="#B9954A" strokeWidth="1.1"
          />
          <path
            d="M 188 148 Q 188 141, 181 139 L 104 126 L 104 181 L 181 193 Q 188 192, 188 185 Z"
            fill="#FBF6EC" stroke="#B9954A" strokeWidth="1.1"
          />
          <line x1="104" y1="126" x2="104" y2="181" stroke="#B9954A" strokeWidth="1" />
          {/* Page lines */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <g key={i} opacity="0.4">
              <line x1="44" y1={148 + i * 6} x2="96"  y2={147 + i * 6} stroke="#B9954A" strokeWidth="0.45" />
              <line x1="112" y1={147 + i * 6} x2="177" y2={148 + i * 6} stroke="#B9954A" strokeWidth="0.45" />
            </g>
          ))}

          {/* Feather quill */}
          <g transform="translate(112 66) rotate(22)">
            <path d="M 0 62 L 5 0" stroke="#5A4A3D" strokeWidth="0.9" />
            <path d="M 4 4 Q 15 3, 19 10 Q 14 15, 4 14 Q 4 8, 4 4 Z" fill="#D5CFE0" stroke="#8E84A6" strokeWidth="0.7" />
            <path d="M 3 14 Q 17 13, 23 22 Q 17 28, 3 27 Q 3 21, 3 14 Z" fill="#B8B1C8" stroke="#8E84A6" strokeWidth="0.7" />
            <path d="M 2 27 Q 19 26, 27 37 Q 19 43, 2 41 Q 2 34, 2 27 Z" fill="#D5CFE0" stroke="#8E84A6" strokeWidth="0.7" />
            <path d="M 1 41 Q 23 40, 31 53 Q 21 59, 1 55 Z" fill="#B8B1C8" stroke="#8E84A6" strokeWidth="0.7" />
          </g>

          {/* Potion bottle */}
          <g transform="translate(150 106)">
            {/* Cork */}
            <rect x="5" y="0" width="10" height="3" rx="0.7" fill="#8E84A6" />
            {/* Neck */}
            <rect x="2" y="3" width="16" height="6" rx="1" fill="#D5CFE0" stroke="#8E84A6" strokeWidth="0.9" />
            {/* Body */}
            <path
              d="M 0 9 Q -4 14, -4 21 L -4 39 Q -4 44, 0 44 L 20 44 Q 24 44, 24 39 L 24 21 Q 24 14, 20 9 Z"
              fill="#E7E3EE" stroke="#8E84A6" strokeWidth="1"
            />
            {/* Gold bubbles */}
            <circle cx="6"  cy="27" r="1.1" fill="#E6C37A" />
            <circle cx="14" cy="33" r="0.9" fill="#E6C37A" opacity="0.72" />
            <circle cx="9"  cy="38" r="0.7" fill="#E6C37A" opacity="0.58" />
          </g>
        </svg>
      </div>

      {/* Loading text */}
      <p className="alchemy-label enter enter-2">正在把这一页照亮…</p>

      {/* Animated dots */}
      <div className="alchemy-dots enter enter-3" aria-hidden="true">
        <span className="twinkle"   style={{ background: "var(--lavender)" }} />
        <span className="twinkle-2" style={{ background: "var(--gold)" }} />
        <span className="twinkle-3" style={{ background: "var(--rose)" }} />
      </div>
    </section>
  );
}

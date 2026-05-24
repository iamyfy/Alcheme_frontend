import type { ReactNode } from "react";

type ReflectionVoiceCardProps = {
  children: ReactNode;
  className?: string;
};

/* Single centered tape strip — soft lavender washi tape across the top */
function WashiTape() {
  return (
    <div className="rvc__tape" aria-hidden="true">
      <svg width="100%" height="100%" className="rvc__tape-texture" preserveAspectRatio="none">
        <defs>
          <pattern id="rvc-stripe" x="0" y="0" width="8" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(-60)">
            <rect width="4" height="20" fill="rgba(255,255,255,0.20)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#rvc-stripe)" />
      </svg>
    </div>
  );
}

/* Small star cluster — top-left of content */
function StarCluster() {
  return (
    <svg width="28" height="20" viewBox="0 0 28 20" aria-hidden="true" className="rvc__stars">
      {/* Large star */}
      <line x1="10" y1="2" x2="10" y2="12" stroke="rgba(140,120,190,0.30)" strokeWidth="1.3" strokeLinecap="round" />
      <line x1="5"  y1="7" x2="15" y2="7"  stroke="rgba(140,120,190,0.30)" strokeWidth="1.3" strokeLinecap="round" />
      <line x1="7"  y1="4" x2="13" y2="10" stroke="rgba(160,140,200,0.20)" strokeWidth="0.9" strokeLinecap="round" />
      <line x1="13" y1="4" x2="7"  y2="10" stroke="rgba(160,140,200,0.20)" strokeWidth="0.9" strokeLinecap="round" />
      {/* Small star */}
      <line x1="22" y1="5" x2="22" y2="11" stroke="rgba(140,120,190,0.22)" strokeWidth="1.0" strokeLinecap="round" />
      <line x1="19" y1="8" x2="25" y2="8"  stroke="rgba(140,120,190,0.22)" strokeWidth="1.0" strokeLinecap="round" />
      {/* Dot */}
      <circle cx="20" cy="16" r="1.2" fill="rgba(150,130,195,0.28)" />
    </svg>
  );
}

/* Pressed botanical — bottom-right corner, slightly different from OVC */
function PressedLeaf() {
  return (
    <svg width="46" height="44" viewBox="0 0 46 44" aria-hidden="true" className="rvc__leaf">
      {/* Stem */}
      <path d="M6 40 Q14 28 22 16 Q28 8 36 4" stroke="#9AAAB8" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.60" />
      {/* Leaves — cooler blue-green tint to match lavender theme */}
      <ellipse cx="16" cy="28" rx="6.5" ry="3" fill="#A8BAC8" opacity="0.52" transform="rotate(-38 16 28)" />
      <ellipse cx="25" cy="18" rx="6.5" ry="3" fill="#A8BAC8" opacity="0.48" transform="rotate(-52 25 18)" />
      <ellipse cx="33" cy="10" rx="5.5" ry="2.5" fill="#B8CAD8" opacity="0.44" transform="rotate(-62 33 10)" />
      {/* Tiny buds */}
      <circle cx="37" cy="5"  r="2.0" fill="#C4D4E0" opacity="0.55" />
      <circle cx="40" cy="8"  r="1.6" fill="#B8CAD8" opacity="0.48" />
    </svg>
  );
}

export function ReflectionVoiceCard({ children, className = "" }: ReflectionVoiceCardProps) {
  return (
    <div className={`rvc ${className}`}>
      <WashiTape />

      <div className="rvc__paper">
        <StarCluster />
        <div className="rvc__content">
          {children}
        </div>
        <PressedLeaf />
      </div>
    </div>
  );
}

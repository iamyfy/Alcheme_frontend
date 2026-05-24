import type { ReactNode } from "react";

type OriginalVoiceCardProps = {
  children: ReactNode;
  className?: string;
};

/* Single centered tape strip — amber washi tape across the top */
function WashiTape() {
  return (
    <div className="ovc__tape" aria-hidden="true">
      {/* Stripe pattern layered on top of the solid background via SVG */}
      <svg width="100%" height="100%" className="ovc__tape-texture" preserveAspectRatio="none">
        <defs>
          <pattern id="ovc-stripe" x="0" y="0" width="8" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(-60)">
            <rect width="4" height="20" fill="rgba(255,255,255,0.18)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ovc-stripe)" />
      </svg>
    </div>
  );
}

/* Large decorative open-quote mark — top-left of content */
function QuoteMark() {
  return (
    <svg width="22" height="18" viewBox="0 0 22 18" aria-hidden="true" className="ovc__quote">
      <text x="0" y="16" fontFamily="Georgia, serif" fontSize="28" fill="rgba(170,130,70,0.22)" letterSpacing="-2">"</text>
    </svg>
  );
}

/* Botanical sprig — bottom-right corner */
function BotanicalSprig() {
  return (
    <svg width="52" height="48" viewBox="0 0 52 48" aria-hidden="true" className="ovc__sprig">
      {/* Main stem */}
      <path d="M8 44 Q18 30 28 18 Q36 8 42 4" stroke="#8A9E72" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.7" />
      {/* Leaves */}
      <ellipse cx="20" cy="30" rx="7" ry="3.5" fill="#A8B496" opacity="0.60" transform="rotate(-40 20 30)" />
      <ellipse cx="30" cy="20" rx="7" ry="3.5" fill="#A8B496" opacity="0.55" transform="rotate(-55 30 20)" />
      <ellipse cx="38" cy="11" rx="6" ry="3"   fill="#B8C8A0" opacity="0.50" transform="rotate(-65 38 11)" />
      {/* Small berries */}
      <circle cx="43" cy="5"  r="2.2" fill="#C8D8B0" opacity="0.62" />
      <circle cx="47" cy="8"  r="1.8" fill="#B8C8A0" opacity="0.55" />
      <circle cx="40" cy="3"  r="1.6" fill="#D0DEB8" opacity="0.50" />
    </svg>
  );
}

export function OriginalVoiceCard({ children, className = "" }: OriginalVoiceCardProps) {
  return (
    <div className={`ovc ${className}`}>
      <WashiTape />

      <div className="ovc__paper">
        <QuoteMark />
        <div className="ovc__content">
          {children}
        </div>
        <BotanicalSprig />
      </div>
    </div>
  );
}

type StickerProps = {
  style?: React.CSSProperties;
  className?: string;
};

export function LeafSticker({ style, className = "" }: StickerProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" style={{ width: 32, height: 32, display: "block", ...style }} className={className}>
      <path d="M16 4 C8 8, 6 16, 10 24 C14 28, 18 26, 20 22 C22 18, 20 12, 16 4" fill="#B8C8A8" stroke="#8FA078" strokeWidth="0.5" />
      <path d="M16 8 L16 20" stroke="#8FA078" strokeWidth="0.5" strokeLinecap="round" />
      <path d="M12 12 L16 14 L20 10" stroke="#8FA078" strokeWidth="0.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function MoonSticker({ style, className = "" }: StickerProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" style={{ width: 32, height: 32, display: "block", ...style }} className={className}>
      <path d="M22 6 C14 8, 10 16, 14 24 C12 20, 14 12, 22 6" fill="#C8BFD8" stroke="#A89FC0" strokeWidth="0.5" />
    </svg>
  );
}

export function StarSticker({ style, className = "", variant = "gold" }: StickerProps & { variant?: "gold" | "pink" | "lavender" }) {
  const colors = {
    gold: { fill: "#F5D878", stroke: "#E8C45C" },
    pink: { fill: "#E8C0BC", stroke: "#D4A09C" },
    lavender: { fill: "#C8BFD8", stroke: "#A89FC0" },
  };
  const { fill, stroke } = colors[variant];
  return (
    <svg viewBox="0 0 24 24" fill="none" style={{ width: 24, height: 24, display: "block", ...style }} className={className}>
      <path d="M12 2 L14 9 L21 9 L15.5 13.5 L17.5 21 L12 16.5 L6.5 21 L8.5 13.5 L3 9 L10 9 Z" fill={fill} stroke={stroke} strokeWidth="0.5" />
    </svg>
  );
}

export function FlowerSticker({ style, className = "" }: StickerProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" style={{ width: 32, height: 32, display: "block", ...style }} className={className}>
      <circle cx="16" cy="16" r="4" fill="#F5D878" />
      <ellipse cx="16" cy="8" rx="3" ry="4" fill="#E8C0BC" stroke="#D4A09C" strokeWidth="0.3" />
      <ellipse cx="16" cy="24" rx="3" ry="4" fill="#E8C0BC" stroke="#D4A09C" strokeWidth="0.3" />
      <ellipse cx="8" cy="16" rx="4" ry="3" fill="#E8C0BC" stroke="#D4A09C" strokeWidth="0.3" />
      <ellipse cx="24" cy="16" rx="4" ry="3" fill="#E8C0BC" stroke="#D4A09C" strokeWidth="0.3" />
    </svg>
  );
}

export function CandleSticker({ style, className = "" }: StickerProps) {
  return (
    <svg viewBox="0 0 32 48" fill="none" style={{ width: 32, height: 48, display: "block", ...style }} className={className}>
      <rect x="10" y="16" width="12" height="28" rx="2" fill="#F5F2E8" stroke="#E7DCC7" strokeWidth="0.5" />
      <ellipse cx="16" cy="12" rx="4" ry="6" fill="#F5D878" opacity="0.8" />
      <ellipse cx="16" cy="10" rx="2" ry="4" fill="#F8E8A8" />
      <path d="M16 6 L16 8" stroke="#E8C45C" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

export function BookSticker({ style, className = "" }: StickerProps) {
  return (
    <svg viewBox="0 0 40 32" fill="none" style={{ width: 40, height: 32, display: "block", ...style }} className={className}>
      <path d="M4 4 L20 8 L36 4 L36 28 L20 24 L4 28 Z" fill="#A8B496" stroke="#8FA078" strokeWidth="0.5" />
      <path d="M20 8 L20 24" stroke="#8FA078" strokeWidth="0.5" />
      <path d="M8 8 L16 10" stroke="#F5F2E8" strokeWidth="0.5" strokeLinecap="round" />
      <path d="M8 12 L14 13" stroke="#F5F2E8" strokeWidth="0.5" strokeLinecap="round" />
    </svg>
  );
}

export function EnvelopeSticker({ style, className = "", sealed = false }: StickerProps & { sealed?: boolean }) {
  return (
    <svg viewBox="0 0 40 32" fill="none" style={{ width: 40, height: 32, display: "block", ...style }} className={className}>
      <rect x="2" y="4" width="36" height="24" rx="2" fill="#F5F2E8" stroke="#E7DCC7" strokeWidth="0.5" />
      <path d="M2 6 L20 18 L38 6" stroke="#E7DCC7" strokeWidth="0.5" fill="none" />
      {sealed && <circle cx="20" cy="18" r="5" fill="#D4A09C" stroke="#C08E8C" strokeWidth="0.5" />}
    </svg>
  );
}

export function BottleSticker({ style, className = "" }: StickerProps) {
  return (
    <svg viewBox="0 0 24 40" fill="none" style={{ width: 24, height: 40, display: "block", ...style }} className={className}>
      <rect x="8" y="2" width="8" height="4" rx="1" fill="#E7DCC7" stroke="#D4C8B4" strokeWidth="0.3" />
      <path d="M6 10 Q6 6, 10 6 L14 6 Q18 6, 18 10 L18 34 Q18 38, 12 38 Q6 38, 6 34 Z" fill="#E8E0F0" stroke="#C8BFD8" strokeWidth="0.5" />
      <ellipse cx="12" cy="28" rx="4" ry="2" fill="#C8BFD8" opacity="0.5" />
    </svg>
  );
}

export function QuillSticker({ style, className = "" }: StickerProps) {
  return (
    <svg viewBox="0 0 32 48" fill="none" style={{ width: 32, height: 48, display: "block", ...style }} className={className}>
      <path d="M28 2 C20 8, 12 20, 8 36 L10 38 C16 24, 22 14, 28 2" fill="#C8BFD8" stroke="#A89FC0" strokeWidth="0.5" />
      <path d="M8 36 L4 46" stroke="#8FA078" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

export function SparkleIcon({ style, className = "" }: StickerProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" style={{ width: 16, height: 16, display: "block", ...style }} className={className}>
      <path d="M8 0 L9 6 L16 8 L9 10 L8 16 L7 10 L0 8 L7 6 Z" fill="currentColor" />
    </svg>
  );
}

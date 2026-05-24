type LetterDateBadgeProps = {
  isoDate?: string;
  className?: string;
};

function formatLetterDate(isoDate?: string): string {
  const d = isoDate ? new Date(isoDate) : new Date();
  const parts = new Intl.DateTimeFormat("zh-CN", {
    month: "numeric",
    day: "numeric",
    weekday: "short",
  }).formatToParts(d);
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "";
  return `${get("month")}月${get("day")}日  ${get("weekday")}`;
}

// Pen-nib icon — minimal SVG, no external dependency
function PenNibIcon() {
  return (
    <svg
      width="12"
      height="14"
      viewBox="0 0 12 14"
      fill="none"
      aria-hidden="true"
      className="letter-date-badge__icon"
    >
      <path
        d="M6 1 L10 5 L6 13 L2 5 Z"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinejoin="round"
        fill="none"
      />
      <line
        x1="3.2" y1="5.5" x2="8.8" y2="5.5"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinecap="round"
      />
      <line
        x1="6" y1="1" x2="6" y2="5.5"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function LetterDateBadge({ isoDate, className = "" }: LetterDateBadgeProps) {
  const label = formatLetterDate(isoDate);
  return (
    <div
      className={`letter-date-badge ${className}`}
      aria-label={`信件日期：${label}`}
    >
      <PenNibIcon />
      <span className="letter-date-badge__text">{label}</span>
    </div>
  );
}

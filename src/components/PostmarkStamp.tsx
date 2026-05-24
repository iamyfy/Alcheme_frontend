type PostmarkStampProps = {
  size?: number;
  className?: string;
};

export function PostmarkStamp({ size = 100, className = "" }: PostmarkStampProps) {
  const cx = size / 2;
  const cy = size / 2;
  const outerR = size / 2 - 2;
  const innerR = outerR - 6;

  // Arc helpers for text-on-path
  const arcPath = (r: number, startDeg: number, endDeg: number, sweep: 0 | 1) => {
    const toRad = (d: number) => (d * Math.PI) / 180;
    const x1 = cx + r * Math.cos(toRad(startDeg));
    const y1 = cy + r * Math.sin(toRad(startDeg));
    const x2 = cx + r * Math.cos(toRad(endDeg));
    const y2 = cy + r * Math.sin(toRad(endDeg));
    return `M ${x1} ${y1} A ${r} ${r} 0 0 ${sweep} ${x2} ${y2}`;
  };

  // Three parallel cancellation lines across the center
  const lineY = [cy - 4, cy + 2, cy + 8];

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      aria-hidden="true"
      className={`postmark-stamp ${className}`}
    >
      <defs>
        {/* Upper arc: "SENT · ALCHEME" */}
        <path
          id="pm-arc-top"
          d={arcPath(innerR - 3, -168, -12, 1)}
        />
        {/* Lower arc: "· 2025 ·" */}
        <path
          id="pm-arc-bot"
          d={arcPath(innerR - 3, 12, 168, 1)}
        />
      </defs>

      {/* Outer ring */}
      <circle cx={cx} cy={cy} r={outerR} stroke="currentColor" strokeWidth="1.8" />
      {/* Inner ring */}
      <circle cx={cx} cy={cy} r={innerR} stroke="currentColor" strokeWidth="1.0" />

      {/* Top arc text */}
      <text
        fontFamily="'Helvetica Neue', Arial, sans-serif"
        fontSize={size * 0.105}
        fill="currentColor"
        letterSpacing="0.18em"
        fontWeight="600"
      >
        <textPath href="#pm-arc-top" startOffset="50%" textAnchor="middle">
          SENT · ALCHEME
        </textPath>
      </text>

      {/* Bottom arc text */}
      <text
        fontFamily="'Helvetica Neue', Arial, sans-serif"
        fontSize={size * 0.095}
        fill="currentColor"
        letterSpacing="0.14em"
      >
        <textPath href="#pm-arc-bot" startOffset="50%" textAnchor="middle">
          · 2025 ·
        </textPath>
      </text>

      {/* Three parallel cancellation lines */}
      {lineY.map((y, i) => (
        <line
          key={i}
          x1={cx - innerR + 8}
          y1={y}
          x2={cx + innerR - 8}
          y2={y}
          stroke="currentColor"
          strokeWidth={i === 1 ? 1.1 : 0.8}
          strokeLinecap="round"
          opacity={i === 1 ? 1 : 0.65}
        />
      ))}
    </svg>
  );
}

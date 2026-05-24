type TitleUnderlineProps = {
  width?: number;
};

/** Wavy decorative underline with a gold dot — used under screen titles */
export function TitleUnderline({ width = 120 }: TitleUnderlineProps) {
  const cx = width / 2;
  const path = `M 4 8 Q ${cx * 0.5} 2, ${cx} 8 T ${width - 4} 8`;
  return (
    <svg
      width={width}
      height={16}
      viewBox={`0 0 ${width} 16`}
      style={{ display: "block", margin: "7px auto 0" }}
      aria-hidden="true"
    >
      <path d={path} stroke="#B8B1C8" strokeWidth="1.2" fill="none" />
      <circle cx={cx} cy={8} r="2.2" fill="#E6C37A" />
    </svg>
  );
}

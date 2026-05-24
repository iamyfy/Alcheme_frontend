import type { ReactNode, HTMLAttributes } from "react";

type TapeColor = "pink" | "sage" | "lavender" | "gold";
type TapePosition = "top-left" | "top-right" | "both";
type CardVariant = "default" | "writing" | "reflection" | "letter";
type TornEdge = false | "top" | "both";

const tapeHex: Record<TapeColor, string> = {
  pink: "#F5E0DC",
  sage: "#D4E2C8",
  lavender: "#E2DFF0",
  gold: "#F5E6C8",
};

type PaperCardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  variant?: CardVariant;
  hasTape?: boolean;
  tapeColor?: TapeColor;
  tapePosition?: TapePosition;
  torn?: TornEdge;
  className?: string;
};

export function PaperCard({
  children,
  variant = "default",
  hasTape = false,
  tapeColor = "pink",
  tapePosition = "top-left",
  torn = false,
  className = "",
  style,
  ...rest
}: PaperCardProps) {
  const variantClass = variant !== "default" ? ` paper-card--${variant}` : "";
  const tornClass = torn ? ` paper-card--torn-${torn}` : "";
  return (
    <div
      className={`paper-card${variantClass}${tornClass} ${className}`}
      style={style}
      {...rest}
    >
      {hasTape && (tapePosition === "top-left" || tapePosition === "both") && (
        <span
          className="tape tape--left"
          style={{ backgroundColor: tapeHex[tapeColor] }}
          aria-hidden="true"
        />
      )}
      {hasTape && (tapePosition === "top-right" || tapePosition === "both") && (
        <span
          className="tape tape--right"
          style={{ backgroundColor: tapeHex[tapeColor] }}
          aria-hidden="true"
        />
      )}
      {children}
    </div>
  );
}

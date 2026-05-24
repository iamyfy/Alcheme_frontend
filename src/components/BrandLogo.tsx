import type { CSSProperties } from "react";

interface BrandLogoProps {
  className?: string;
  style?: CSSProperties;
  /** Height of the logo image in px (width scales automatically). Default: 52 */
  height?: number;
}

/**
 * Alcheme brand logo — renders the official SVG asset.
 * mix-blend-mode: multiply removes the white background on any warm/light surface.
 */
export function BrandLogo({ className, style, height = 52 }: BrandLogoProps) {
  return (
    <img
      src="/logo.svg"
      alt="alcheme"
      className={`brand-logo-img${className ? ` ${className}` : ""}`}
      style={{ height, width: "auto", ...style }}
      draggable={false}
    />
  );
}

import type { ReactNode } from "react";

type SectionProps = {
  title: string;
  children: ReactNode;
};

export function Section({ title, children }: SectionProps) {
  return (
    <section className="wire-section">
      <div className="section-label">{title}</div>
      {children}
    </section>
  );
}

type PlaceholderProps = {
  label: string;
  height?: "sm" | "md" | "lg";
};

export function Placeholder({ label, height = "md" }: PlaceholderProps) {
  return <div className={`placeholder placeholder--${height}`}>{label}</div>;
}

type StateStripProps = {
  states?: string[];
};

export function StateStrip({ states = ["normal", "loading", "empty", "error"] }: StateStripProps) {
  return (
    <div className="state-strip" aria-label="页面状态占位">
      {states.map((state) => (
        <span key={state}>{state}</span>
      ))}
    </div>
  );
}

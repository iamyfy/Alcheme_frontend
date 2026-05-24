import { useState } from "react";

const energyOptions = [
  { id: "very-low", label: "很低", color: "#B8B1C8" },
  { id: "low", label: "偏低", color: "#A8B496" },
  { id: "okay", label: "中等", color: "#C5D4B8" },
  { id: "good", label: "偏高", color: "#E6C37A" },
  { id: "high", label: "很高", color: "#E8B89A" },
];

type EnergyDotsProps = {
  value?: string;
  onChange?: (value: string) => void;
  compact?: boolean;
};

export function EnergyDots({ value, onChange, compact = false }: EnergyDotsProps) {
  const [selected, setSelected] = useState(value);

  const handleSelect = (id: string) => {
    setSelected(id);
    onChange?.(id);
  };

  if (compact) {
    return (
      <div className="energy-dots-compact">
        <span className="energy-dots-compact__label">能量</span>
        <div className="energy-dots-compact__row">
          {energyOptions.map((energy) => (
            <button
              key={energy.id}
              onClick={() => handleSelect(energy.id)}
              className={`energy-dot-compact-btn${selected === energy.id ? " energy-dot-compact-btn--selected" : ""}`}
              aria-label={energy.label}
              aria-pressed={selected === energy.id}
              title={energy.label}
            >
              <span
                className="energy-dot-compact"
                style={{ backgroundColor: energy.color, opacity: selected === energy.id ? 1 : 0.55 }}
                aria-hidden="true"
              />
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="energy-dots-wrap">
      <p className="energy-label-text">此刻的能量是：</p>
      <div className="energy-dots-row">
        {energyOptions.map((energy) => (
          <button
            key={energy.id}
            onClick={() => handleSelect(energy.id)}
            className={`energy-dot-btn${selected === energy.id ? " energy-dot-btn--selected" : ""}`}
            aria-pressed={selected === energy.id}
          >
            <span
              className="energy-dot"
              style={{ backgroundColor: energy.color, opacity: selected === energy.id ? 1 : 0.7 }}
              aria-hidden="true"
            />
            <span className="energy-dot-label">{energy.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

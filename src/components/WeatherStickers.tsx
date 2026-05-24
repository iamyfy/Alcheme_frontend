import { useState } from "react";

/* ─── Weather icon SVGs ─────────────────────────────────────────────── */

function StormCloud() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* dark cloud */}
      <path
        d="M8 30 C7 23 11 18 17 18 C16 11 22 8 28 11 C31 6 38 8 39 15 C44 14 46 19 45 25 C44 29 41 31 37 31 L11 31 C9.5 31 8 30.8 8 30 Z"
        fill="#B8B1C8"
        fillOpacity="0.28"
        stroke="#9490B0"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* second smaller cloud behind */}
      <path
        d="M30 19 C30 15 34 13 37 15 C38 12 42 12 43 15 C46 15 47 18 45 20 L32 20 Z"
        fill="#B8B1C8"
        fillOpacity="0.18"
        stroke="#9490B0"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* rain drops */}
      <line x1="17" y1="35" x2="15" y2="43" stroke="#9490B0" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="25" y1="35" x2="23" y2="43" stroke="#9490B0" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="33" y1="35" x2="31" y2="43" stroke="#9490B0" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function CloudIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* puffy cloud */}
      <path
        d="M6 33 C5 25 10 20 17 20 C16 13 22 9 29 12 C33 7 41 9 41 17 C46 17 47 22 46 27 C45 31 42 34 38 34 L9 34 C7.5 34 6 33.5 6 33 Z"
        fill="#A8B496"
        fillOpacity="0.28"
        stroke="#7A9068"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* small bump detail */}
      <path
        d="M14 20 C13 16 17 14 20 16"
        stroke="#7A9068"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
    </svg>
  );
}

function PartlyCloudyIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* sun rays (top-right) */}
      <line x1="36" y1="5" x2="36" y2="2" stroke="#C9A050" strokeWidth="2" strokeLinecap="round" />
      <line x1="42" y1="8" x2="44" y2="6" stroke="#C9A050" strokeWidth="2" strokeLinecap="round" />
      <line x1="46" y1="15" x2="48" y2="14" stroke="#C9A050" strokeWidth="2" strokeLinecap="round" />
      <line x1="44" y1="22" x2="47" y2="22" stroke="#C9A050" strokeWidth="2" strokeLinecap="round" />
      {/* sun circle */}
      <circle cx="36" cy="15" r="9" fill="#E6C37A" fillOpacity="0.4" stroke="#C9A050" strokeWidth="1.9" />
      {/* cloud in front */}
      <path
        d="M5 36 C4 29 9 24 15 24 C14 17 20 14 26 17 C29 12 36 14 36 22 C41 22 42 27 40 31 C39 35 36 37 32 37 L8 37 C6.5 37 5 36.5 5 36 Z"
        fill="#C5D4B8"
        fillOpacity="0.32"
        stroke="#7A9068"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MostlySunnyIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* sun glow ring */}
      <circle cx="24" cy="20" r="13" fill="#E6C37A" fillOpacity="0.15" />
      {/* sun */}
      <circle cx="24" cy="20" r="9" fill="#E6C37A" fillOpacity="0.45" stroke="#C9A050" strokeWidth="1.9" />
      {/* rays */}
      <line x1="24" y1="6" x2="24" y2="3" stroke="#C9A050" strokeWidth="2" strokeLinecap="round" />
      <line x1="35" y1="9" x2="37" y2="7" stroke="#C9A050" strokeWidth="2" strokeLinecap="round" />
      <line x1="41" y1="20" x2="44" y2="20" stroke="#C9A050" strokeWidth="2" strokeLinecap="round" />
      <line x1="35" y1="31" x2="37" y2="33" stroke="#C9A050" strokeWidth="2" strokeLinecap="round" />
      <line x1="13" y1="9" x2="11" y2="7" stroke="#C9A050" strokeWidth="2" strokeLinecap="round" />
      <line x1="7" y1="20" x2="4" y2="20" stroke="#C9A050" strokeWidth="2" strokeLinecap="round" />
      {/* small cloud bottom-right */}
      <path
        d="M22 40 C22 36 25 34 28 35 C29 32 33 32 34 35 C37 35 38 38 36 40 L24 40 C23 40 22 40.3 22 40 Z"
        fill="#E8B89A"
        fillOpacity="0.35"
        stroke="#CC8E6A"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SunnyIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* outer glow */}
      <circle cx="24" cy="24" r="16" fill="#E8B89A" fillOpacity="0.12" />
      {/* inner warm fill */}
      <circle cx="24" cy="24" r="10" fill="#E6C37A" fillOpacity="0.55" />
      {/* main sun circle */}
      <circle cx="24" cy="24" r="10" stroke="#CC8E6A" strokeWidth="2" fill="none" />
      {/* 8 rays */}
      <line x1="24" y1="9" x2="24" y2="5" stroke="#CC8E6A" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="34" y1="12" x2="37" y2="9" stroke="#CC8E6A" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="39" y1="24" x2="43" y2="24" stroke="#CC8E6A" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="34" y1="36" x2="37" y2="39" stroke="#CC8E6A" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="24" y1="39" x2="24" y2="43" stroke="#CC8E6A" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="14" y1="36" x2="11" y2="39" stroke="#CC8E6A" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="9" y1="24" x2="5" y2="24" stroke="#CC8E6A" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="14" y1="12" x2="11" y2="9" stroke="#CC8E6A" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

/* ─── Weather options data ──────────────────────────────────────────── */

export const weatherOptions = [
  {
    id: "very-low",
    label: "很低",
    bgColor: "rgba(184,177,200,0.22)",
    borderColor: "rgba(148,144,176,0.5)",
    Icon: StormCloud,
  },
  {
    id: "low",
    label: "偏低",
    bgColor: "rgba(168,180,150,0.22)",
    borderColor: "rgba(122,144,104,0.5)",
    Icon: CloudIcon,
  },
  {
    id: "okay",
    label: "中等",
    bgColor: "rgba(197,212,184,0.25)",
    borderColor: "rgba(139,168,123,0.5)",
    Icon: PartlyCloudyIcon,
  },
  {
    id: "good",
    label: "偏高",
    bgColor: "rgba(230,195,122,0.25)",
    borderColor: "rgba(201,160,80,0.5)",
    Icon: MostlySunnyIcon,
  },
  {
    id: "high",
    label: "很高",
    bgColor: "rgba(232,184,154,0.25)",
    borderColor: "rgba(204,142,106,0.5)",
    Icon: SunnyIcon,
  },
];

/* ─── Component ─────────────────────────────────────────────────────── */

type WeatherStickersProps = {
  value?: string;
  onChange?: (value: string) => void;
};

export function WeatherStickers({ value, onChange }: WeatherStickersProps) {
  const [selected, setSelected] = useState(value);
  // animKey forces re-mount of the selected button to retrigger CSS animation
  const [animKey, setAnimKey] = useState(0);

  const handleSelect = (id: string) => {
    if (selected !== id) {
      setSelected(id);
      setAnimKey((k) => k + 1);
      onChange?.(id);
    }
  };

  return (
    <div className="weather-stickers" role="group" aria-label="选择今日能量状态">
      <p className="weather-stickers__hint">今天的能量天气是…</p>
      <div className="weather-stickers__row">
        {weatherOptions.map((w) => {
          const isSelected = selected === w.id;
          return (
            <button
              key={isSelected ? `${w.id}-${animKey}` : w.id}
              type="button"
              className={`weather-sticker-btn${isSelected ? " weather-sticker-btn--selected" : ""}`}
              onClick={() => handleSelect(w.id)}
              aria-pressed={isSelected}
              aria-label={`能量${w.label}`}
              style={
                isSelected
                  ? { "--sticker-bg": w.bgColor, "--sticker-border": w.borderColor } as React.CSSProperties
                  : {}
              }
            >
              <span className="weather-sticker-icon">
                <w.Icon />
              </span>
              <span className="weather-sticker-label">{w.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

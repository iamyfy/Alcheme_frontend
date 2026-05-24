import { useState } from "react";

const CloudyIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" style={{ width: "100%", height: "100%" }}>
    <ellipse cx="24" cy="28" rx="16" ry="10" fill="#E8E4DC" stroke="#C5C0B8" strokeWidth="1" />
    <ellipse cx="16" cy="26" rx="8" ry="6" fill="#F0ECE4" stroke="#C5C0B8" strokeWidth="0.5" />
    <ellipse cx="32" cy="26" rx="7" ry="5" fill="#F0ECE4" stroke="#C5C0B8" strokeWidth="0.5" />
    <ellipse cx="24" cy="22" rx="6" ry="5" fill="#F5F2EC" stroke="#C5C0B8" strokeWidth="0.5" />
  </svg>
);

const TiredIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" style={{ width: "100%", height: "100%" }}>
    <circle cx="24" cy="24" r="14" fill="#C8BFD8" stroke="#A89FC0" strokeWidth="1" />
    <path d="M18 22 C18 20, 21 20, 21 22" stroke="#6B5A8C" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <path d="M27 22 C27 20, 30 20, 30 22" stroke="#6B5A8C" strokeWidth="1.5" strokeLinecap="round" fill="none" />
  </svg>
);

const CalmIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" style={{ width: "100%", height: "100%" }}>
    <ellipse cx="20" cy="28" rx="10" ry="10" fill="#B8C8A8" stroke="#8FA078" strokeWidth="1" />
    <ellipse cx="20" cy="28" rx="6" ry="6" fill="#F5F2E8" />
    <path d="M32 16 L36 20 L32 28 L28 24 L32 16" fill="#8FA078" stroke="#6B8058" strokeWidth="0.5" />
  </svg>
);

const HopefulIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" style={{ width: "100%", height: "100%" }}>
    <path d="M24 8 C16 14, 10 22, 24 38 C38 22, 32 14, 24 8" fill="#E8C0BC" stroke="#D4A09C" strokeWidth="1" />
    <path d="M24 14 C20 18, 18 22, 24 30" stroke="#F5E8E4" strokeWidth="2" strokeLinecap="round" fill="none" />
  </svg>
);

const BrightIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" style={{ width: "100%", height: "100%" }}>
    <circle cx="24" cy="24" r="10" fill="#F5D878" stroke="#E8C45C" strokeWidth="1" />
    <circle cx="21" cy="22" r="1.5" fill="#6B5A48" />
    <circle cx="27" cy="22" r="1.5" fill="#6B5A48" />
    <path d="M20 27 Q24 30, 28 27" stroke="#6B5A48" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <circle cx="18" cy="26" r="2" fill="#F8B8A8" opacity="0.6" />
    <circle cx="30" cy="26" r="2" fill="#F8B8A8" opacity="0.6" />
    <path d="M12 14 L14 18" stroke="#E8C45C" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M36 14 L34 18" stroke="#E8C45C" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M8 24 L12 24" stroke="#E8C45C" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M36 24 L40 24" stroke="#E8C45C" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const moodOptions = [
  { id: "cloudy", label: "多云", icon: <CloudyIcon /> },
  { id: "tired", label: "疲惫", icon: <TiredIcon /> },
  { id: "calm", label: "平静", icon: <CalmIcon /> },
  { id: "hopeful", label: "有希望", icon: <HopefulIcon /> },
  { id: "bright", label: "明亮", icon: <BrightIcon /> },
];

type MoodStickerProps = {
  value?: string;
  onChange?: (value: string) => void;
};

export function MoodSticker({ value, onChange }: MoodStickerProps) {
  const [selected, setSelected] = useState(value);

  const handleSelect = (id: string) => {
    setSelected(id);
    onChange?.(id);
  };

  return (
    <div className="mood-sticker-row">
      {moodOptions.map((mood) => (
        <button
          key={mood.id}
          onClick={() => handleSelect(mood.id)}
          className={`mood-option${selected === mood.id ? " mood-option--selected" : ""}`}
          aria-pressed={selected === mood.id}
        >
          <div className="mood-icon">{mood.icon}</div>
          <span className="mood-label">{mood.label}</span>
        </button>
      ))}
    </div>
  );
}

import { useState } from "react";
import { PrimaryButton } from "../components/PrimaryButton";
import { PaperCard } from "../components/PaperCard";
import { EnergyDots } from "../components/EnergyDots";
import { SecondaryScreenHeader } from "../components/ScreenHeader";
import { MoonSticker, StarSticker, LeafSticker, FlowerSticker } from "../components/Stickers";

type InputScreenProps = {
  onBack: () => void;
  onSubmit: () => void;
};

const today = new Date();
const dateString = today.toLocaleDateString("zh-CN", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

const inputTypes = [
  { id: "text", label: "文字" },
  { id: "voice", label: "语音" },
];

export function InputScreen({ onBack, onSubmit }: InputScreenProps) {
  const [content, setContent] = useState("");
  const [energy, setEnergy] = useState<string>();
  const [activeType, setActiveType] = useState("text");

  const handleSubmit = () => {
    if (content.trim().length > 0) {
      onSubmit();
    }
  };

  return (
    <section className="screen">
      {/* Decorative stickers */}
      <MoonSticker
        className="scr-deco"
        style={{ top: 16, right: 16, width: 32, height: 32, opacity: 0.6 }}
        aria-hidden
      />
      <StarSticker
        variant="lavender"
        className="scr-deco"
        style={{ bottom: 160, right: 16, width: 16, height: 16, opacity: 0.4 }}
        aria-hidden
      />
      <LeafSticker
        className="scr-deco"
        style={{ bottom: 240, left: 8, width: 24, height: 32, opacity: 0.4 }}
        aria-hidden
      />

      <SecondaryScreenHeader title="把今天放在这里" kicker={dateString} onBack={onBack} />

      {/* Input type pills */}
      <div className="input-type-pills">
        {inputTypes.map((t) => (
          <button
            key={t.id}
            className={`input-type-pill${activeType === t.id ? " input-type-pill--active" : ""}`}
            onClick={() => setActiveType(t.id)}
            type="button"
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Writing card */}
      <section style={{ position: "relative", marginBottom: 20 }}>
        <PaperCard variant="writing" style={{ padding: 0, overflow: "hidden" }}>
          <StarSticker
            variant="lavender"
            style={{ position: "absolute", top: 8, right: 8, width: 16, height: 16, opacity: 0.4 }}
            aria-hidden
          />
          <label htmlFor="journal-content" className="sr-only">今天发生了什么</label>
          <textarea
            id="journal-content"
            className="writing-textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="今天发生了什么，哪怕只有一句话。"
            style={{ padding: "20px 20px 24px", minHeight: 200 }}
          />
        </PaperCard>
        <LeafSticker
          style={{ position: "absolute", bottom: -12, left: -4, width: 24, height: 32, opacity: 0.5 }}
          aria-hidden
        />
        <FlowerSticker
          style={{ position: "absolute", bottom: -8, right: 24, width: 16, height: 16, opacity: 0.4 }}
          aria-hidden
        />
      </section>

      {/* Energy selector */}
      <section style={{ marginBottom: 24 }}>
        <EnergyDots value={energy} onChange={setEnergy} />
      </section>

      <PrimaryButton
        onClick={handleSubmit}
        disabled={content.trim().length === 0}
        className="primary-button--lavender"
      >
        提炼这一页 ✦
      </PrimaryButton>
    </section>
  );
}

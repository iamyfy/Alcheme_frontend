import { useState } from "react";
import type { CSSProperties } from "react";
import { ChevronDown } from "lucide-react";
import { PaperCard } from "../components/PaperCard";
import { SecondaryScreenHeader } from "../components/ScreenHeader";
import { weatherOptions } from "../components/WeatherStickers";

type JournalNoteDetailScreenProps = {
  onBack: () => void;
};

/* ── Mock data ──────────────────────────────────────────────────────── */
// TODO (phase 2): energy not yet persisted by backend — needs schema update
const mockNote = {
  date: "5 月 23 日 · 周五",
  energy: "low",               // weather sticker id selected at write time
  preview: "我在没有把握的时候，还是做了选择。",
  reflections: [
    "我在不确定的处境里，还是往前走了一步。",
    "我允许自己感到害怕，但没有因为害怕就停住。",
    "选择本身，就是对自己的一种信任。",
  ],
  narration:
    "今天开了一个会，我其实不确定自己说的是对的。但我还是开口了，把自己的想法说出来了，虽然后来有人提出了不同意见，但我没有立刻认错或者退缩。这对我来说其实挺难的。",
  secondNarration:
    "我是一个很怕出错的人，所以选择对我来说总是很沉重。但今天我意识到，选择不是为了不犯错，而是为了不停在原地。",
};

/* ── Collapsible section ─────────────────────────────────────────────── */
function CollapsibleSection({
  label,
  children,
  defaultOpen = true,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={`journal-detail-section ${className}`}>
      <button
        className="journal-detail-toggle"
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="journal-detail-label">{label}</span>
        <ChevronDown
          aria-hidden
          size={14}
          strokeWidth={2.2}
          className={`journal-detail-chevron${open ? " journal-detail-chevron--open" : ""}`}
        />
      </button>

      <div className={`journal-detail-collapsible${open ? "" : " journal-detail-collapsible--closed"}`}>
        <div>{children}</div>
      </div>
    </div>
  );
}

/* ── Screen ─────────────────────────────────────────────────────────── */
export function JournalNoteDetailScreen({ onBack }: JournalNoteDetailScreenProps) {
  const hasSecond = !!mockNote.secondNarration;
  const energyOpt = weatherOptions.find((w) => w.id === mockNote.energy) ?? null;

  return (
    <section className="screen journal-detail-screen">
      <SecondaryScreenHeader title="手记详情" onBack={onBack} />

      {/* ── 日期 · 能量 meta 行 ──────────────────── */}
      <div className="journal-detail-meta enter enter-1">
        <span className="journal-detail-meta__date">{mockNote.date}</span>
        {energyOpt && (
          <span
            className="journal-detail-meta__energy"
            aria-label={`当时能量：${energyOpt.label}`}
            style={{
              "--sticker-bg": energyOpt.bgColor,
              "--sticker-border": energyOpt.borderColor,
            } as CSSProperties}
          >
            <span className="journal-detail-meta__energy-icon" aria-hidden="true">
              <energyOpt.Icon />
            </span>
            <span className="journal-detail-meta__energy-label">{energyOpt.label}</span>
          </span>
        )}
      </div>

      {/* ── 主线标题 ──────────────────────────────── */}
      <div className="journal-detail-section enter enter-2">
        <p className="journal-detail-label">这一页的主线</p>
        <PaperCard hasTape tapeColor="lavender" tapePosition="top-left" style={{ padding: "16px 18px" }}>
          <p className="journal-detail-headline">{mockNote.preview}</p>
        </PaperCard>
      </div>

      {/* ── 提炼内容 ──────────────────────────────── */}
      <div className="journal-detail-section enter enter-3">
        <p className="journal-detail-label">提炼内容</p>
        <PaperCard variant="reflection" style={{ padding: "2px 18px" }}>
          {mockNote.reflections.map((text) => (
            <div key={text} className="journal-detail-reflection-item">
              <span className="journal-detail-reflection-dot" aria-hidden />
              <span>{text}</span>
            </div>
          ))}
        </PaperCard>
      </div>

      {/* ── 原来的我怎么说 ─────────────────────────── */}
      <CollapsibleSection label="原来的我怎么说" className="enter enter-4">
        <PaperCard
          variant="writing"
          style={{ padding: "16px 18px", minHeight: 112 }}
        >
          <p className="journal-detail-narration">{mockNote.narration}</p>
        </PaperCard>
      </CollapsibleSection>

      {/* ── 现在的我怎么说 ─────────────────────────── */}
      <CollapsibleSection label="现在的我怎么说" className="enter enter-5">
        {hasSecond ? (
          <PaperCard
            hasTape
            tapeColor="sage"
            tapePosition="top-left"
            style={{ padding: "16px 18px" }}
          >
            <p className="journal-detail-narration">{mockNote.secondNarration}</p>
          </PaperCard>
        ) : (
          <PaperCard style={{ padding: "16px 18px" }}>
            <p className="journal-detail-empty">尚未记录第二次叙述</p>
          </PaperCard>
        )}
      </CollapsibleSection>
    </section>
  );
}

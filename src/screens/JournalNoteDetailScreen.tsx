import { useState } from "react";
import type { CSSProperties } from "react";
import { ChevronDown, MoreHorizontal } from "lucide-react";
import { OriginalVoiceCard } from "../components/OriginalVoiceCard";
import { PaperCard } from "../components/PaperCard";
import { ReflectionVoiceCard } from "../components/ReflectionVoiceCard";
import { SecondaryScreenHeader } from "../components/ScreenHeader";
import { weatherOptions } from "../components/WeatherStickers";

type JournalNoteDetailScreenProps = {
  onBack: () => void;
};

/* ── Mock data ──────────────────────────────────────────────────────── */
// TODO (phase 2): energy not yet persisted by backend — needs schema update
const mockNote = {
  date: "5 月 23 日 · 周五",
  time: "10:24",               // HH:MM at write time (from created_at in phase 2)
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
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <section className="screen journal-detail-screen">
      <SecondaryScreenHeader
        title="手记详情"
        onBack={onBack}
        action={
          <button
            className="icon-button jd-more-btn"
            type="button"
            aria-label="更多操作"
            onClick={() => setDrawerOpen(true)}
          >
            <MoreHorizontal aria-hidden size={20} strokeWidth={1.8} />
          </button>
        }
      />

      {/* ── 日期 · 能量 meta 行 ──────────────────── */}
      <div className="journal-detail-meta enter enter-1">

        {/* 左：日期两行 */}
        <div className="journal-detail-meta__date">
          <span className="journal-detail-meta__date-day">{mockNote.date}</span>
          <span className="journal-detail-meta__date-time">{mockNote.time}</span>
        </div>

        {/* 右：能量方块 + 文字（同上一版样式） */}
        {energyOpt && (
          <div
            className="journal-detail-meta__energy"
            aria-label={`当时能量：${energyOpt.label}`}
          >
            <span
              className="journal-detail-meta__energy-icon"
              style={{
                "--sticker-bg": energyOpt.bgColor,
                "--sticker-border": energyOpt.borderColor,
              } as CSSProperties}
              aria-hidden="true"
            >
              <energyOpt.Icon />
            </span>
            <span className="journal-detail-meta__energy-text">
              <span className="journal-detail-meta__energy-hint">当时的能量</span>
              <span className="journal-detail-meta__energy-value">{energyOpt.label}</span>
            </span>
          </div>
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
      <CollapsibleSection label="提炼内容" className="enter enter-3">
        <PaperCard variant="reflection" style={{ padding: "2px 18px" }}>
          {mockNote.reflections.map((text) => (
            <div key={text} className="journal-detail-reflection-item">
              <span className="journal-detail-reflection-dot" aria-hidden />
              <span>{text}</span>
            </div>
          ))}
        </PaperCard>
      </CollapsibleSection>

      {/* ── 原来的我怎么说 ─────────────────────────── */}
      <CollapsibleSection label="原来的我怎么说" className="enter enter-4">
        <OriginalVoiceCard>
          <p className="journal-detail-narration">{mockNote.narration}</p>
        </OriginalVoiceCard>
      </CollapsibleSection>

      {/* ── 现在的我怎么说 ─────────────────────────── */}
      <CollapsibleSection label="现在的我怎么说" className="enter enter-5">
        {hasSecond ? (
          <ReflectionVoiceCard>
            <p className="journal-detail-narration">{mockNote.secondNarration}</p>
          </ReflectionVoiceCard>
        ) : (
          <PaperCard style={{ padding: "16px 18px" }}>
            <p className="journal-detail-empty">尚未记录第二次叙述</p>
          </PaperCard>
        )}
      </CollapsibleSection>
      {/* ── 操作下拉菜单 ─────────────────────────── */}
      {drawerOpen && (
        <>
          {/* 透明遮罩，捕获点击外部 */}
          <div
            className="jd-popover-scrim"
            aria-hidden="true"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="jd-popover" role="menu" aria-label="手记操作">
            <button
              className="jd-popover__item"
              type="button"
              role="menuitem"
              onClick={() => setDrawerOpen(false)}
            >
              编辑手记
            </button>
            <div className="jd-popover__divider" aria-hidden="true" />
            <button
              className="jd-popover__item jd-popover__item--delete"
              type="button"
              role="menuitem"
              onClick={() => setDrawerOpen(false)}
            >
              删除这页
            </button>
          </div>
        </>
      )}
    </section>
  );
}

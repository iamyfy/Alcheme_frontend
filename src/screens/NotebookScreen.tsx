import { useState, useEffect } from "react";
import { PrimaryScreenHeader } from "../components/ScreenHeader";
import { EmptyState } from "../components/States";

type NotebookScreenProps = {
  onOpenNote: () => void;
};

type Phase = "loading" | "ready" | "error";

// ── Mock data (shape mirrors NoteListItem + UI decoration) ────────────────────
// Replace with useNotebook() in phase 2; grouping logic stays the same.

type MockEntry = {
  id: string;
  created_at: string;          // ISO — used for date formatting and grouping
  preview: string;
  tags: { label: string; variant: string }[];
  rotate: number;              // subtle card tilt, UI-only
};

const mockEntries: MockEntry[] = [
  {
    id: "1",
    created_at: "2025-05-23T10:00:00+08:00",
    preview: "我在没有把握的时候，还是做了选择。",
    tags: [
      { label: "第二次叙述", variant: "rose" },
      { label: "已收录",     variant: "lavender" },
    ],
    rotate: -0.4,
  },
  {
    id: "2",
    created_at: "2025-05-22T21:30:00+08:00",
    preview: "我没有否定自己的疲惫，也没有因为疲惫就停下来。",
    tags: [{ label: "已收录", variant: "lavender" }],
    rotate: 0.3,
  },
  {
    id: "3",
    created_at: "2025-05-21T19:15:00+08:00",
    preview: "我把很难说出口的念头说出来了。",
    tags: [
      { label: "第二次叙述", variant: "rose" },
      { label: "原声",       variant: "sage" },
      { label: "已收录",     variant: "lavender" },
    ],
    rotate: -0.2,
  },
  {
    id: "4",
    created_at: "2025-04-30T20:00:00+08:00",
    preview: "今天想起了一件很久以前的事，没想到还记得那么清楚。",
    tags: [{ label: "已收录", variant: "lavender" }],
    rotate: 0.5,
  },
  {
    id: "5",
    created_at: "2025-04-15T08:30:00+08:00",
    preview: "我试着不去解释自己，只是把它们记下来。",
    tags: [
      { label: "第二次叙述", variant: "rose" },
      { label: "已收录",     variant: "lavender" },
    ],
    rotate: -0.6,
  },
];

// ── Date / grouping helpers ───────────────────────────────────────────────────

function getMonthKey(isoDate: string): string {
  const d = new Date(isoDate);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function formatMonthLabel(isoDate: string): string {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
  }).format(new Date(isoDate));
  // → "2025年5月"
}

function formatEntryDate(isoDate: string): string {
  const d = new Date(isoDate);
  const parts = new Intl.DateTimeFormat("zh-CN", {
    month: "numeric",
    day: "numeric",
    weekday: "short",
  }).formatToParts(d);
  const get = (t: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === t)?.value ?? "";
  return `${get("month")} 月 ${get("day")} 日 · ${get("weekday")}`;
}

type MonthGroup = { key: string; label: string; entries: MockEntry[] };

function groupByMonth(entries: MockEntry[]): MonthGroup[] {
  const groups: MonthGroup[] = [];
  for (const entry of entries) {
    const key = getMonthKey(entry.created_at);
    const last = groups[groups.length - 1];
    if (!last || last.key !== key) {
      groups.push({ key, label: formatMonthLabel(entry.created_at), entries: [entry] });
    } else {
      last.entries.push(entry);
    }
  }
  return groups;
}

// ── Skeleton ──────────────────────────────────────────────────────────────────

const SKELETON_ROTATIONS = [-0.4, 0.3, -0.2];

function EntryCardSkeleton({ rotate }: { rotate: number }) {
  return (
    <div className="entry-card entry-card--skeleton" style={{ transform: `rotate(${rotate}deg)` }}>
      <div className="skeleton-line skeleton-line--date" />
      <div className="skeleton-line skeleton-line--full" />
      <div className="skeleton-line skeleton-line--medium" />
      <div style={{ marginTop: 10 }}>
        <div className="skeleton-line skeleton-line--tag" />
      </div>
    </div>
  );
}

// ── Main screen ───────────────────────────────────────────────────────────────

export function NotebookScreen({ onOpenNote }: NotebookScreenProps) {
  const [phase, setPhase] = useState<Phase>("loading");

  useEffect(() => {
    const t = setTimeout(() => setPhase("ready"), 800);
    return () => clearTimeout(t);
  }, []);

  const retry = () => {
    setPhase("loading");
    setTimeout(() => setPhase("ready"), 800);
  };

  const groups = groupByMonth(mockEntries);

  return (
    <section className="screen">
      <PrimaryScreenHeader title="手记本" kicker="每一页都是一次抵达" />

      {/* ── Loading skeleton ── */}
      {phase === "loading" && (
        <div className="entry-list">
          <div className="nb-month-label nb-month-label--skeleton" aria-hidden>
            <span className="nb-month-label__text">
              <span className="skeleton-line" style={{ display: "inline-block", width: 72, height: 11, verticalAlign: "middle" }} />
            </span>
          </div>
          {SKELETON_ROTATIONS.map((r, i) => (
            <EntryCardSkeleton key={i} rotate={r} />
          ))}
        </div>
      )}

      {/* ── Error ── */}
      {phase === "error" && (
        <div className="screen-error">
          <p className="screen-error__text">这一页暂时没有打开，但手记还在那里。</p>
          <button className="screen-error__retry" type="button" onClick={retry}>
            再试一次
          </button>
        </div>
      )}

      {/* ── Ready ── */}
      {phase === "ready" && (
        mockEntries.length === 0 ? (
          <EmptyState
            variant="journal"
            title="手记本还是空的"
            description="第一句话，会成为第一页。"
          />
        ) : (
          <div className="entry-list">
            {groups.map((group, gi) => {
              // Global card index for staggered enter animation
              const groupOffset = groups
                .slice(0, gi)
                .reduce((sum, g) => sum + g.entries.length, 0);

              return (
                <div key={group.key} className="nb-month-group">
                  <div className="nb-month-label" role="separator" aria-label={group.label}>
                    <span className="nb-month-label__text">{group.label}</span>
                  </div>

                  {group.entries.map((entry, i) => {
                    const enterIdx = groupOffset + i;
                    return (
                      <button
                        key={entry.id}
                        className={`entry-card enter enter-${Math.min(enterIdx + 1, 6)}`}
                        type="button"
                        onClick={onOpenNote}
                        style={{ transform: `rotate(${entry.rotate}deg)` }}
                      >
                        <p className="entry-card__date">{formatEntryDate(entry.created_at)}</p>
                        <p className="entry-card__preview">{entry.preview}</p>
                        <div className="entry-card__mood">
                          {entry.tags.map((tag) => (
                            <span
                              key={tag.label}
                              className={`entry-tag entry-tag--${tag.variant}`}
                            >
                              {tag.label}
                            </span>
                          ))}
                        </div>
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>
        )
      )}
    </section>
  );
}

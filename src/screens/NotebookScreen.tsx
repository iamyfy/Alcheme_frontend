import { useState, useEffect } from "react";
import { PrimaryScreenHeader } from "../components/ScreenHeader";
import { EmptyState } from "../components/States";

type NotebookScreenProps = {
  onOpenNote: () => void;
};

type Phase = "loading" | "ready" | "error";

const mockEntries = [
  {
    id: "1",
    date: "5 月 23 日 · 周五",
    preview: "我在没有把握的时候，还是做了选择。",
    tags: [
      { label: "第二次叙述", variant: "rose" },
      { label: "已收录",     variant: "lavender" },
    ],
    rotate: -0.4,
  },
  {
    id: "2",
    date: "5 月 22 日 · 周四",
    preview: "我没有否定自己的疲惫，也没有因为疲惫就停下来。",
    tags: [
      { label: "已收录", variant: "lavender" },
    ],
    rotate: 0.3,
  },
  {
    id: "3",
    date: "5 月 21 日 · 周三",
    preview: "我把很难说出口的念头说出来了。",
    tags: [
      { label: "第二次叙述", variant: "rose" },
      { label: "原声",       variant: "sage" },
      { label: "已收录",     variant: "lavender" },
    ],
    rotate: -0.2,
  },
];

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

  return (
    <section className="screen">
      <PrimaryScreenHeader title="手记本" kicker="每一页都是一次抵达" />

      {phase === "loading" && (
        <div className="entry-list">
          {SKELETON_ROTATIONS.map((r, i) => (
            <EntryCardSkeleton key={i} rotate={r} />
          ))}
        </div>
      )}

      {phase === "error" && (
        <div className="screen-error">
          <p className="screen-error__text">这一页暂时没有打开，但手记还在那里。</p>
          <button className="screen-error__retry" type="button" onClick={retry}>
            再试一次
          </button>
        </div>
      )}

      {phase === "ready" && (
        mockEntries.length === 0 ? (
          <EmptyState
            variant="journal"
            title="手记本还是空的"
            description="第一句话，会成为第一页。"
          />
        ) : (
          <div className="entry-list">
            {mockEntries.map((entry, i) => (
              <button
                key={entry.id}
                className={`entry-card enter enter-${i + 1}`}
                type="button"
                onClick={onOpenNote}
                style={{ transform: `rotate(${entry.rotate}deg)` }}
              >
                <p className="entry-card__date">{entry.date}</p>
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
            ))}
          </div>
        )
      )}
    </section>
  );
}

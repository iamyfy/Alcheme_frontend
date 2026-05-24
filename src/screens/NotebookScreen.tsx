import { PrimaryScreenHeader } from "../components/ScreenHeader";
import { EmptyState } from "../components/States";

type NotebookScreenProps = {
  onOpenNote: () => void;
};

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

const SHOW_EMPTY = false;

export function NotebookScreen({ onOpenNote }: NotebookScreenProps) {
  return (
    <section className="screen">
      <PrimaryScreenHeader title="手记本" kicker="2026 年 5 月" />

      {SHOW_EMPTY ? (
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
      )}
    </section>
  );
}

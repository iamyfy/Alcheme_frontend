import { PaperCard } from "../components/PaperCard";
import { PrimaryScreenHeader } from "../components/ScreenHeader";
import { useHomeCopy } from "../hooks/useHomeCopy";
import {
  MoonSticker as MoonDeco,
  StarSticker,
  LeafSticker,
  FlowerSticker,
} from "../components/Stickers";

type HomeScreenProps = {
  onStart: () => void;
  onOnboarding: () => void;
};

const mockRecentEntries = [
  { id: "1", date: "5 月 22 日 · 周四", preview: "我没有否定自己的疲惫，也没有因为疲惫就停下来。" },
  { id: "2", date: "5 月 21 日 · 周三", preview: "我把很难说出口的念头说出来了。" },
];

const PenIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden>
    <path
      d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"
      fill="currentColor"
    />
  </svg>
);

export function HomeScreen({ onStart, onOnboarding: _onOnboarding }: HomeScreenProps) {
  const copy = useHomeCopy();

  return (
    <section className="screen">
      <MoonDeco
        className="scr-deco"
        style={{ top: 16, right: 16, width: 32, height: 32, opacity: 0.6 }}
        aria-hidden
      />
      <StarSticker
        variant="gold"
        className="scr-deco"
        style={{ top: 80, right: 32, width: 16, height: 16, opacity: 0.4 }}
        aria-hidden
      />
      <LeafSticker
        className="scr-deco"
        style={{ bottom: 160, left: 16, width: 40, height: 56, opacity: 0.5 }}
        aria-hidden
      />
      <FlowerSticker
        className="scr-deco"
        style={{ bottom: 200, right: 24, width: 24, height: 24, opacity: 0.4 }}
        aria-hidden
      />

      <PrimaryScreenHeader kicker="每一个此刻，都值得被看见" title={copy.headline} />

      {/* Writing card CTA */}
      <section style={{ marginBottom: 32 }}>
        <PaperCard
          variant="writing"
          hasTape
          tapeColor="pink"
          tapePosition="top-left"
          className="home-write-card"
          onClick={onStart}
          role="button"
          tabIndex={0}
          onKeyDown={(e: React.KeyboardEvent) => e.key === "Enter" && onStart()}
          aria-label="轻点开始记录"
        >
          <span className="home-write-card__kicker">新的一页 · 轻点开始</span>

          <p className="home-write-card__prompt">
            {copy.promptLines[0]}
            <span className="home-write-card__cursor" aria-hidden />
          </p>

          <div className="home-write-card__pen" aria-hidden>
            <PenIcon />
          </div>
        </PaperCard>
      </section>

      {/* Recent entries */}
      <section>
        <p className="home-section-label">最近的提炼</p>
        <div className="entry-list">
          {mockRecentEntries.map((entry) => (
            <button
              key={entry.id}
              className="entry-card"
              type="button"
            >
              <p className="entry-card__date">{entry.date}</p>
              <p className="entry-card__preview">{entry.preview}</p>
            </button>
          ))}
        </div>
      </section>
    </section>
  );
}

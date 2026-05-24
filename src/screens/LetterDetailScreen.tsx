import { PaperCard } from "../components/PaperCard";
import { PrimaryButton } from "../components/PrimaryButton";
import { SecondaryScreenHeader } from "../components/ScreenHeader";
import { StarSticker, MoonSticker } from "../components/Stickers";

type LetterDetailScreenProps = {
  onBack: () => void;
};

export function LetterDetailScreen({ onBack }: LetterDetailScreenProps) {
  return (
    <section className="screen">
      {/* Decorative stickers */}
      <MoonSticker
        className="scr-deco"
        style={{ top: 20, right: 20, width: 28, height: 28, opacity: 0.5 }}
        aria-hidden
      />
      <StarSticker
        variant="lavender"
        className="scr-deco"
        style={{ bottom: 160, right: 16, width: 16, height: 16, opacity: 0.4 }}
        aria-hidden
      />

      <SecondaryScreenHeader title="5 月 14 日" onBack={onBack} />

      <PaperCard
        variant="letter"
        hasTape
        tapeColor="lavender"
        tapePosition="both"
        className="letter-detail-card"
      >
        <div className="letter-detail-meta">
          <span className="letter-type-badge">随机回望</span>
          <span className="letter-detail-date">5 月 14 日</span>
        </div>
        <p className="letter-detail-body">
          我今天想起了你。{"\n\n"}
          你那天说，自己只是勉强撑住了。{"\n\n"}
          可是我记得，那个时候你其实已经把一件很难的事完成了。{"\n\n"}
          它不是侥幸，它是你在场的证据。{"\n\n"}
          我把它放在这里，留给你慢慢看。
        </p>
      </PaperCard>

      <PrimaryButton onClick={onBack}>收好这封信 ✦</PrimaryButton>
    </section>
  );
}

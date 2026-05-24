import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PrimaryButton } from "../components/PrimaryButton";
import { StarSticker, MoonSticker, LeafSticker, FlowerSticker, BookSticker, EnvelopeSticker, QuillSticker } from "../components/Stickers";

type OnboardingScreenProps = {
  onDone: () => void;
};

type OnboardingSlide = {
  title: string;
  note: string;
};

const slides: OnboardingSlide[] = [
  {
    title: "你写下的话，\n这里会读成「我……」",
    note: "每一段未整理的言语，\n都藏着被忽视的事实。",
  },
  {
    title: "再用你自己的声音，\n把它说一遍",
    note: "第二次叙述会沉淀进你的私人书，\n它只属于你。",
  },
  {
    title: "有一天，\n你会收到一封信",
    note: "一个有记忆的见证者，\n会在合适时机写来。",
  },
];

export function OnboardingScreen({ onDone }: OnboardingScreenProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const isFirst = activeIndex === 0;
  const isLast = activeIndex === slides.length - 1;

  const goTo = (index: number) => {
    setActiveIndex(Math.max(0, Math.min(slides.length - 1, index)));
  };

  const handleTouchEnd = (clientX: number) => {
    if (touchStartX === null) {
      return;
    }

    const deltaX = clientX - touchStartX;
    if (Math.abs(deltaX) > 48) {
      goTo(activeIndex + (deltaX < 0 ? 1 : -1));
    }
    setTouchStartX(null);
  };

  return (
    <section className="screen onboarding-screen">
      <div className="onboarding-controls" aria-label="引导页控制">
        <button className="icon-button" type="button" aria-label="上一页" disabled={isFirst} onClick={() => goTo(activeIndex - 1)}>
          <ChevronLeft aria-hidden size={22} />
        </button>
        <div className="onboarding-dots" aria-label="当前页">
          {slides.map((slide, index) => (
            <button
              aria-label={`第 ${index + 1} 帧`}
              className={activeIndex === index ? "active" : ""}
              key={slide.title}
              type="button"
              onClick={() => goTo(index)}
            />
          ))}
        </div>
        <button className="icon-button" type="button" aria-label="下一页" disabled={isLast} onClick={() => goTo(activeIndex + 1)}>
          <ChevronRight aria-hidden size={22} />
        </button>
      </div>

      <div
        className="onboarding-track"
        onTouchStart={(event) => setTouchStartX(event.touches[0].clientX)}
        onTouchEnd={(event) => handleTouchEnd(event.changedTouches[0].clientX)}
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <article className="onboarding-slide" key={slide.title} aria-hidden={activeIndex !== index}>
            <div className="onboarding-slide-body">
            <div className="onboarding-illustration" aria-hidden>
              {index === 0 && (
                <>
                  <QuillSticker style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-60%)", width: 48, height: 72, opacity: 0.7 }} />
                  <StarSticker variant="gold" style={{ position: "absolute", top: 20, right: 32, width: 20, height: 20, opacity: 0.6 }} />
                  <StarSticker variant="pink" style={{ position: "absolute", bottom: 24, left: 40, width: 14, height: 14, opacity: 0.5 }} />
                  <MoonSticker style={{ position: "absolute", top: 16, left: 24, width: 28, height: 28, opacity: 0.5 }} />
                </>
              )}
              {index === 1 && (
                <>
                  <BookSticker style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-55%)", width: 72, height: 56, opacity: 0.7 }} />
                  <LeafSticker style={{ position: "absolute", top: 16, right: 28, width: 24, height: 36, opacity: 0.5 }} />
                  <FlowerSticker style={{ position: "absolute", bottom: 20, left: 36, width: 20, height: 20, opacity: 0.5 }} />
                  <StarSticker variant="lavender" style={{ position: "absolute", bottom: 32, right: 40, width: 14, height: 14, opacity: 0.5 }} />
                </>
              )}
              {index === 2 && (
                <>
                  <EnvelopeSticker sealed style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-55%)", width: 72, height: 56, opacity: 0.7 }} />
                  <StarSticker variant="gold" style={{ position: "absolute", top: 20, left: 32, width: 18, height: 18, opacity: 0.6 }} />
                  <MoonSticker style={{ position: "absolute", top: 24, right: 24, width: 28, height: 28, opacity: 0.5 }} />
                  <FlowerSticker style={{ position: "absolute", bottom: 16, right: 36, width: 18, height: 18, opacity: 0.4 }} />
                </>
              )}
            </div>
            <div className="onboarding-copy">
              <h1 className="page-title">{slide.title}</h1>
              <p>{slide.note}</p>
              {index === slides.length - 1 && (
                <div className="onboarding-action">
                  <PrimaryButton onClick={onDone}>开启旅程</PrimaryButton>
                </div>
              )}
            </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

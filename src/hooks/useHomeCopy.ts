import { useEffect, useState } from "react";

export type HomeCopy = {
  brand: string;
  headline: string;
  promptLines: string[];
  moods: string[];
  primaryAction: string;
  debugOnboardingAction: string;
};

const fallbackCopy: HomeCopy = {
  brand: "alcheme",
  headline: "今天，你是怎样抵达这里的？",
  promptLines: ["写一句也可以。", "不用整理好，先把这一刻放下来。"],
  moods: ["cloudy", "tired", "calm", "hopeful", "bright"],
  primaryAction: "开始说说 ✦",
  debugOnboardingAction: "查看引导页结构",
};

export function useHomeCopy() {
  const [copy, setCopy] = useState<HomeCopy>(fallbackCopy);

  useEffect(() => {
    let isMounted = true;

    fetch("/content/home.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Home copy failed to load");
        }
        return response.json() as Promise<HomeCopy>;
      })
      .then((data) => {
        if (isMounted) {
          setCopy(data);
        }
      })
      .catch(() => {
        if (isMounted) {
          setCopy(fallbackCopy);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return copy;
}

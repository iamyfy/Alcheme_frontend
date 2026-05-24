import { BookOpen, Home, Mail, UserRound } from "lucide-react";
import type { ScreenKey, TabKey } from "../types";

const items: Array<{ key: TabKey; label: string; screen: ScreenKey; icon: typeof Home }> = [
  { key: "home", label: "Home", screen: "home", icon: Home },
  { key: "journal", label: "手记本", screen: "journal", icon: BookOpen },
  { key: "letters", label: "信箱", screen: "letters", icon: Mail },
  { key: "me", label: "我的", screen: "me", icon: UserRound },
];

type BottomNavProps = {
  activeTab: TabKey;
  onNavigate: (screen: ScreenKey) => void;
};

export function BottomNav({ activeTab, onNavigate }: BottomNavProps) {
  return (
    <nav className="bottom-nav" aria-label="主导航">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <button
            className={activeTab === item.key ? "active" : ""}
            key={item.key}
            type="button"
            onClick={() => onNavigate(item.screen)}
          >
            <Icon aria-hidden size={22} strokeWidth={1.7} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

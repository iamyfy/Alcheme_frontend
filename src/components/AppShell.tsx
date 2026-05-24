import type { ReactNode } from "react";
import { BottomNav } from "./BottomNav";
import type { ScreenKey, TabKey } from "../types";

type AppShellProps = {
  activeTab: TabKey;
  children: ReactNode;
  onNavigate: (screen: ScreenKey) => void;
  showNav?: boolean;
};

export function AppShell({ activeTab, children, onNavigate, showNav = true }: AppShellProps) {
  return (
    <div className="app-frame">
      <main className="app-canvas">
        {children}
        {showNav && <BottomNav activeTab={activeTab} onNavigate={onNavigate} />}
      </main>
    </div>
  );
}

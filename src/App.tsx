import { useState } from "react";
import { AppShell } from "./components/AppShell";
import { AlchemyScreen } from "./screens/AlchemyScreen";
import { AuthScreen } from "./screens/AuthScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { InputScreen } from "./screens/InputScreen";
import { JournalNoteDetailScreen } from "./screens/JournalNoteDetailScreen";
import { LetterDetailScreen } from "./screens/LetterDetailScreen";
import { MailboxScreen } from "./screens/MailboxScreen";
import { MeScreen } from "./screens/MeScreen";
import { NotebookScreen } from "./screens/NotebookScreen";
import { NoteDetailScreen } from "./screens/NoteDetailScreen";
import { SecondNarrationScreen } from "./screens/SecondNarrationScreen";
import { OnboardingScreen } from "./screens/OnboardingScreen";
import type { ScreenKey, TabKey } from "./types";

const tabByScreen: Partial<Record<ScreenKey, TabKey>> = {
  home: "home",
  input: "home",
  alchemy: "home",
  noteDetail: "journal",
  second: "journal",
  journalDetail: "journal",
  journal: "journal",
  letters: "letters",
  letterDetail: "letters",
  me: "me",
};

export default function App() {
  const [screen, setScreen] = useState<ScreenKey>(() => {
    const isAuthenticated = window.localStorage.getItem("alcheme_mock_auth") === "true";
    if (!isAuthenticated) {
      return "auth";
    }
    // 已登录：直接进主页，onboarding 只在注册流程中出现
    return "home";
  });
  const activeTab = tabByScreen[screen] ?? "home";
  const authenticate = (mode: "login" | "register") => {
    window.localStorage.setItem("alcheme_mock_auth", "true");
    if (mode === "register") {
      // 注册：清除 onboarding 标记，进入引导流程
      window.localStorage.removeItem("alcheme_onboarding_completed");
      setScreen("onboarding");
      return;
    }
    // 登录：始终直接进主页
    setScreen("home");
  };
  const completeOnboarding = () => {
    window.localStorage.setItem("alcheme_onboarding_completed", "true");
    setScreen("home");
  };
  const signOut = () => {
    window.localStorage.removeItem("alcheme_mock_auth");
    setScreen("auth");
  };
  const showNav = (["home", "journal", "letters", "me"] as ScreenKey[]).includes(screen);

  return (
    <AppShell activeTab={activeTab} onNavigate={setScreen} showNav={showNav}>
      {screen === "auth" && <AuthScreen onAuthenticated={authenticate} />}
      {screen === "home" && <HomeScreen onStart={() => setScreen("input")} onOnboarding={() => setScreen("onboarding")} />}
      {screen === "onboarding" && <OnboardingScreen onDone={completeOnboarding} />}
      {screen === "input" && <InputScreen onBack={() => setScreen("home")} onSubmit={() => setScreen("alchemy")} />}
      {screen === "alchemy" && <AlchemyScreen onDone={() => setScreen("noteDetail")} />}
      {screen === "noteDetail" && (
        <NoteDetailScreen
          onBack={() => setScreen("journal")}
          onRealchemy={() => setScreen("alchemy")}
          onSecond={() => setScreen("second")}
        />
      )}
      {screen === "second" && (
        <SecondNarrationScreen
          onBack={() => setScreen("noteDetail")}
          onSave={() => setScreen("journal")}
        />
      )}
      {screen === "journal" && <NotebookScreen onOpenNote={() => setScreen("journalDetail")} />}
      {screen === "journalDetail" && <JournalNoteDetailScreen onBack={() => setScreen("journal")} />}
      {screen === "letters" && <MailboxScreen onOpenLetter={() => setScreen("letterDetail")} />}
      {screen === "letterDetail" && <LetterDetailScreen onBack={() => setScreen("letters")} />}
      {screen === "me" && <MeScreen onSignOut={signOut} onOnboarding={() => setScreen("onboarding")} />}
    </AppShell>
  );
}

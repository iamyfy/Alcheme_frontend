import { useState } from "react";
import { BrandLogo } from "../components/BrandLogo";
import { PrimaryButton } from "../components/PrimaryButton";

type AuthMode = "login" | "register";
type AuthStatus =
  | "idle"
  | "submitting"
  | "loginSuccess"
  | "registerEmailSent"
  | "registerVerified"
  | "invalidForm"
  | "authError"
  | "emailAlreadyRegistered"
  | "emailNotVerified"
  | "verificationExpired";

type AuthScreenProps = {
  onAuthenticated: (mode: AuthMode) => void;
};

const statusCopy: Record<AuthStatus, string> = {
  idle: "",
  submitting: "正在提交，请稍等。",
  loginSuccess: "登录成功，正在进入 Alcheme。",
  registerEmailSent: "验证邮件已经发送。请到邮箱点击验证链接，完成后再回到这里继续。",
  registerVerified: "邮箱验证完成，正在进入引导页。",
  invalidForm: "请填写有效邮箱和至少 8 位密码。",
  authError: "邮箱或密码不正确，请检查后再试。",
  emailAlreadyRegistered: "这个邮箱已经注册过，请直接登录。",
  emailNotVerified: "这个邮箱还没有完成验证，请先打开验证邮件。",
  verificationExpired: "验证链接可能已经过期，请重新发送验证邮件。",
};

export function AuthScreen({ onAuthenticated }: AuthScreenProps) {
  const [mode, setMode] = useState<AuthMode>("login");
  const [status, setStatus] = useState<AuthStatus>("idle");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isRegister = mode === "register";
  const canSubmit = email.includes("@") && password.length >= 8;

  const switchMode = (nextMode: AuthMode) => {
    setMode(nextMode);
    setStatus("idle");
  };

  const submit = () => {
    if (!canSubmit) {
      setStatus("invalidForm");
      return;
    }

    setStatus("submitting");

    window.setTimeout(() => {
      if (isRegister) {
        setStatus("registerEmailSent");
        return;
      }

      setStatus("loginSuccess");
      window.setTimeout(() => onAuthenticated("login"), 450);
    }, 450);
  };

  const simulateVerified = () => {
    setStatus("registerVerified");
    window.setTimeout(() => onAuthenticated("register"), 450);
  };

  return (
    <section className="screen auth-screen">
      <div className="auth-backdrop" aria-hidden />

      <header className="auth-header">
        <BrandLogo height={72} />
      </header>

      <div className="auth-panel">
        <h1 className="page-title">{isRegister ? "创建账号" : "欢迎回来"}</h1>

        <div className="auth-fields">
          <label className="field">
            <span>邮箱</span>
            <input autoComplete="email" onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" type="email" value={email} />
          </label>
          <label className="field">
            <span>密码</span>
            <input
              autoComplete={isRegister ? "new-password" : "current-password"}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="至少 8 位"
              type="password"
              value={password}
            />
          </label>
        </div>

        {status !== "idle" && (
          <div className={`auth-status auth-status--${status}`}>{statusCopy[status]}</div>
        )}

        <div className="auth-submit">
          {status === "registerEmailSent" ? (
            <div className="auth-actions">
              <PrimaryButton onClick={simulateVerified}>我已完成邮箱验证</PrimaryButton>
              <button className="text-link" type="button" onClick={() => setStatus("registerEmailSent")}>
                重新发送验证邮件
              </button>
            </div>
          ) : (
            <PrimaryButton disabled={status === "submitting"} onClick={submit}>
              {isRegister ? "注册" : "登录"}
            </PrimaryButton>
          )}
        </div>

        <div className="auth-bottom-link">
          {isRegister ? "已有账号？" : "还没有账号？"}
          <button className="text-link" type="button" onClick={() => switchMode(isRegister ? "login" : "register")}>
            {isRegister ? "去登录" : "去注册"}
          </button>
        </div>
      </div>
    </section>
  );
}

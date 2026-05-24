import { StarSticker, MoonSticker, LeafSticker, FlowerSticker, BookSticker } from "./Stickers";

type EmptyStateProps = {
  variant: "journal" | "letters" | "default";
  title: string;
  description?: string;
  className?: string;
};

export function EmptyState({ variant, title, description, className = "" }: EmptyStateProps) {
  return (
    <div className={`empty-state ${className}`}>
      <div className="empty-state__illustration">
        {variant === "journal" && (
          <>
            <BookSticker style={{ width: 64, height: 56, position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }} />
            <LeafSticker style={{ width: 24, height: 32, position: "absolute", top: -4, right: -4 }} />
            <FlowerSticker style={{ width: 20, height: 20, position: "absolute", bottom: -4, left: 8 }} />
          </>
        )}
        {variant === "letters" && (
          <>
            <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", width: 64, height: 48 }}>
              <svg viewBox="0 0 64 48" fill="none" style={{ width: "100%", height: "100%" }}>
                <rect x="4" y="8" width="56" height="36" rx="3" fill="#F5F2E8" stroke="#E7DCC7" strokeWidth="1" />
                <path d="M4 12 L32 30 L60 12" stroke="#E7DCC7" strokeWidth="1" fill="none" />
              </svg>
            </div>
            <div style={{ position: "absolute", top: -8, right: 0 }}>
              <svg viewBox="0 0 24 24" fill="none" style={{ width: 32, height: 32 }}>
                <path d="M12 4 C8 8, 6 12, 12 20 C18 12, 16 8, 12 4" fill="#E8C0BC" stroke="#D4A09C" strokeWidth="0.5" />
              </svg>
            </div>
            <StarSticker variant="gold" style={{ width: 16, height: 16, position: "absolute", bottom: -8, left: 16 }} />
          </>
        )}
        {variant === "default" && (
          <>
            <MoonSticker style={{ width: 48, height: 48, position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }} />
            <StarSticker variant="gold" style={{ width: 16, height: 16, position: "absolute", top: 0, right: 8 }} />
            <StarSticker variant="pink" style={{ width: 12, height: 12, position: "absolute", bottom: 8, left: 16 }} />
          </>
        )}
      </div>
      <h3 className="empty-state__title">{title}</h3>
      {description && <p className="empty-state__desc">{description}</p>}
    </div>
  );
}

type LoadingStateProps = {
  message?: string;
  className?: string;
};

export function LoadingState({ message = "正在把这一页照亮…", className = "" }: LoadingStateProps) {
  return (
    <div className={`loading-state ${className}`}>
      <div className="loading-state__illustration">
        <svg viewBox="0 0 120 100" fill="none" style={{ width: "100%", height: "100%" }}>
          <path d="M10 20 L60 30 L110 20 L110 80 L60 70 L10 80 Z" fill="#F5F2E8" stroke="#E7DCC7" strokeWidth="1" />
          <path d="M60 30 L60 70" stroke="#E7DCC7" strokeWidth="1" />
          <path d="M20 35 L50 40" stroke="#E7DCC7" strokeWidth="0.5" strokeLinecap="round" />
          <path d="M20 45 L45 48" stroke="#E7DCC7" strokeWidth="0.5" strokeLinecap="round" />
          <path d="M70 40 L100 35" stroke="#E7DCC7" strokeWidth="0.5" strokeLinecap="round" />
          <path d="M75 48 L100 45" stroke="#E7DCC7" strokeWidth="0.5" strokeLinecap="round" />
          <path d="M85 5 C75 15, 70 25, 68 40" stroke="#C8BFD8" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M85 5 C90 8, 92 12, 88 18 C84 24, 78 22, 75 15 C72 8, 78 2, 85 5" fill="#C8BFD8" stroke="#A89FC0" strokeWidth="0.5" />
        </svg>
        <StarSticker variant="gold" style={{ width: 16, height: 16, position: "absolute", top: 8, right: 16 }} className="pulse-1" />
        <StarSticker variant="pink" style={{ width: 12, height: 12, position: "absolute", bottom: 32, left: 24 }} className="pulse-2" />
        <StarSticker variant="lavender" style={{ width: 12, height: 12, position: "absolute", top: 32, left: 8 }} className="pulse-3" />
      </div>
      <p className="loading-state__text pulse-1">{message}</p>
    </div>
  );
}

type InlineErrorProps = {
  message: string;
  onRetry?: () => void;
  className?: string;
};

export function InlineError({ message, onRetry, className = "" }: InlineErrorProps) {
  return (
    <div className={`inline-error ${className}`}>
      <div className="inline-error__icon">!</div>
      <p className="inline-error__message">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="inline-error__retry" aria-label="重试">
          &times;
        </button>
      )}
    </div>
  );
}

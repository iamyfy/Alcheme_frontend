import { ArrowLeft } from "lucide-react";
import { BrandLogo } from "./BrandLogo";
import { PostmarkStamp } from "./PostmarkStamp";

type ScreenHeaderBaseProps = {
  title: string;
  kicker?: string;
  action?: React.ReactNode;
};

type PrimaryScreenHeaderProps = ScreenHeaderBaseProps;

type SecondaryScreenHeaderProps = ScreenHeaderBaseProps & {
  onBack: () => void;
};

type ScreenHeaderShellProps = ScreenHeaderBaseProps & {
  variant: "primary" | "secondary";
  onBack?: () => void;
};

function ScreenHeaderShell({ variant, title, kicker, onBack, action }: ScreenHeaderShellProps) {
  return (
    <header className={`screen-header screen-header--${variant}`}>
      {variant === "primary" && (
        <PostmarkStamp size={100} className="screen-header__postmark" />
      )}
      <div className="screen-header__top">
        {variant === "secondary" && onBack ? (
          <button className="icon-button" type="button" aria-label="返回" onClick={onBack}>
            <ArrowLeft aria-hidden size={22} />
          </button>
        ) : (
          <BrandLogo height={72} />
        )}
        {action}
      </div>
      {kicker && <p className="page-kicker">{kicker}</p>}
      <h1 className="page-title">{title}</h1>
    </header>
  );
}

export function PrimaryScreenHeader(props: PrimaryScreenHeaderProps) {
  return <ScreenHeaderShell variant="primary" {...props} />;
}

export function SecondaryScreenHeader({ onBack, ...props }: SecondaryScreenHeaderProps) {
  return <ScreenHeaderShell variant="secondary" onBack={onBack} {...props} />;
}

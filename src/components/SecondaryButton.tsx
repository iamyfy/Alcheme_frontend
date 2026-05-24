import type { ButtonHTMLAttributes, ReactNode } from "react";

type SecondaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export function SecondaryButton({ children, className = "", ...props }: SecondaryButtonProps) {
  return (
    <button className={`secondary-button ${className}`} type="button" {...props}>
      {children}
    </button>
  );
}

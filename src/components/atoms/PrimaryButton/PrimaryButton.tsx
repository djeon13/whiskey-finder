import type { ButtonHTMLAttributes, ReactNode } from "react";
import "./PrimaryButton.css";

export interface PrimaryButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function PrimaryButton({
  children,
  className = "primary-button",
  type = "button",
  ...rest
}: PrimaryButtonProps) {
  return (
    <button type={type} className={className} {...rest}>
      {children}
    </button>
  );
}

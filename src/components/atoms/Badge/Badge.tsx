import type { ReactNode } from "react";
import "./Badge.css";

export interface BadgeProps {
  children: ReactNode;
  className?: string;
}

export function Badge({ children, className = "badge" }: BadgeProps) {
  return <span className={className}>{children}</span>;
}

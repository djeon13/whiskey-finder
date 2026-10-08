import type { ReactNode } from "react";
import "./Eyebrow.css";

export interface EyebrowProps {
  children: ReactNode;
  className?: string;
}

export function Eyebrow({ children, className = "eyebrow" }: EyebrowProps) {
  return <p className={className}>{children}</p>;
}

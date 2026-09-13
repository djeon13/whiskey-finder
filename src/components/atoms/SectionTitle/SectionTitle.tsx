import type { ReactNode } from "react";
import "./SectionTitle.css";

export interface SectionTitleProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function SectionTitle({
  children,
  className = "section-title",
  id,
}: SectionTitleProps) {
  return (
    <h3 className={className} id={id}>
      {children}
    </h3>
  );
}

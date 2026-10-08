import type { ReactNode } from "react";
import { SectionTitle } from "@components/atoms";
import "./TitledSection.css";

export interface TitledSectionProps {
  title: ReactNode;
  children?: ReactNode;
  leading?: ReactNode;
  className?: string;
  titleClassName?: string;
}

export function TitledSection({
  title,
  children,
  leading,
  className = "titled-section",
  titleClassName = "titled-section__title",
}: TitledSectionProps) {
  return (
    <section className={className}>
      {leading}

      <SectionTitle className={titleClassName}>{title}</SectionTitle>

      {children}
    </section>
  );
}

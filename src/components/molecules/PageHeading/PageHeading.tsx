import type { ElementType, ReactNode } from "react";
import { Eyebrow } from "../../atoms/Eyebrow/Eyebrow";
import "./PageHeading.css";

export interface PageHeadingProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  as?: ElementType;
  eyebrowClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

export function PageHeading({
  eyebrow,
  title,
  description,
  as: Heading = "h2",
  eyebrowClassName,
  titleClassName = "page-heading__title",
  descriptionClassName = "page-heading__description",
}: PageHeadingProps) {
  return (
    <>
      {eyebrow && <Eyebrow className={eyebrowClassName}>{eyebrow}</Eyebrow>}

      <Heading className={titleClassName}>{title}</Heading>

      {description && <p className={descriptionClassName}>{description}</p>}
    </>
  );
}

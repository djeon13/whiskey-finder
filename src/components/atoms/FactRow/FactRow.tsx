import type { ReactNode } from "react";
import "./FactRow.css";

export interface FactRowProps {
  label: ReactNode;
  value: ReactNode;
  className?: string;
  labelClassName?: string;
  valueClassName?: string;
}

export function FactRow({
  label,
  value,
  className = "fact-row",
  labelClassName = "fact-row__label",
  valueClassName = "fact-row__value",
}: FactRowProps) {
  return (
    <div className={className}>
      <dt className={labelClassName}>{label}</dt>
      <dd className={valueClassName}>{value}</dd>
    </div>
  );
}

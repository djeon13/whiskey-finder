import type { ReactNode } from "react";
import "./Stat.css";

export interface StatProps {
  icon?: ReactNode;
  label: ReactNode;
  value: ReactNode;
  className?: string;
  labelClassName?: string;
  valueClassName?: string;
}

export function Stat({
  icon,
  label,
  value,
  className = "stat",
  labelClassName = "stat__label",
  valueClassName = "stat__value",
}: StatProps) {
  return (
    <div className={className}>
      <div className={labelClassName}>
        {icon}
        <span>{label}</span>
      </div>

      <p className={valueClassName}>{value}</p>
    </div>
  );
}

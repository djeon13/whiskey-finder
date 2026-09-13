import type { ReactNode } from "react";
import "./PillList.css";

export interface PillListItem {
  id: string;
  label: ReactNode;
  className?: string;
}

export interface PillListProps {
  items: PillListItem[];
  className?: string;
  itemClassName?: string;
}

export function PillList({
  items,
  className = "pill-list",
  itemClassName = "pill-list__item",
}: PillListProps) {
  return (
    <ul className={className}>
      {items.map((item) => (
        <li key={item.id} className={item.className ?? itemClassName}>
          {item.label}
        </li>
      ))}
    </ul>
  );
}

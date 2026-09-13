import type { ReactNode } from "react";
import "./Menu.css";

export interface MenuProps {
  children: ReactNode;
  className?: string;
}

export function Menu({ children, className = "menu" }: MenuProps) {
  return <div className={className}>{children}</div>;
}

export interface MenuItemProps {
  children: ReactNode;
  selected?: boolean;
  disabled?: boolean;
  onSelect: () => void;
  className?: string;
  selectedClassName?: string;
}

export function MenuItem({
  children,
  selected = false,
  disabled = false,
  onSelect,
  className = "menu__item",
  selectedClassName = "menu__item--selected",
}: MenuItemProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onSelect}
      className={`${className} ${selected ? selectedClassName : ""}`.trim()}
    >
      {children}
    </button>
  );
}

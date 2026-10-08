import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import "./NavItem.css";

export interface NavItemProps {
  to: string;
  children: ReactNode;
  className?: string;
  activeClassName?: string;
}

export function NavItem({
  to,
  children,
  className = "nav-item",
  activeClassName = "nav-item--active",
}: NavItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${className} ${isActive ? activeClassName : ""}`.trim()
      }
    >
      {children}
    </NavLink>
  );
}

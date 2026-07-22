import { NavLink } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  return (
    <nav className="navigation">
      <NavLink
  to="/"
  className={({ isActive }) =>
    `navigation__link ${
      isActive ? "navigation__link--active" : ""
    }`
  }
>
  Home
</NavLink>

<NavLink
  to="/finder"
  className={({ isActive }) =>
    `navigation__link ${
      isActive ? "navigation__link--active" : ""
    }`}
>
  Finder
</NavLink>
    </nav>
  );
}

export default Navigation;
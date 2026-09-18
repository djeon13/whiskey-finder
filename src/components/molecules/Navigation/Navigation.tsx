import { NavItem } from "@components/atoms/NavItem/NavItem";
import "./Navigation.css";

function Navigation() {
  return (
    <nav className="navigation">
      <NavItem
        to="/"
        className="navigation__link"
        activeClassName="navigation__link--active"
      >
        Home
      </NavItem>

      <NavItem
        to="/finder"
        className="navigation__link"
        activeClassName="navigation__link--active"
      >
        Finder
      </NavItem>
    </nav>
  );
}

export default Navigation;

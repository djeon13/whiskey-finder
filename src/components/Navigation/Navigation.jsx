import { NavLink } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  return (
    <nav className="navigation">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/finder">Find Your Perfect Pour</NavLink>
    </nav>
  );
}

export default Navigation;
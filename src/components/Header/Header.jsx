import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <Link className="header__logo" to="/">
        The Whiskey Library
      </Link>

      <Navigation />
    </header>
  );
}

export default Header;
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import logo from "../../assets/wolf-crane-logo.png";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <Link
        className="header__logo"
        to="/"
      >
        <img
          className="header__logo-image"
          src={logo}
          alt="Wolf & Crane Whiskey Library"
        />
      </Link>

      <Navigation />
    </header>
  );
}

export default Header;
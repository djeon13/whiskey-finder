import { Link } from "react-router-dom";
import Navigation from "../../molecules/Navigation/Navigation";
import logo from "../../../assets/wolf-crane-logo.svg";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <Link className="header__logo" to="/">
        <img
          className="header__logo-image"
          src={logo}
          alt="Wolf & Crane Whiskey Library"
        />
      </Link>

      <h1 className="header__title">
        <span>Wolf & Crane</span>
        <span>Whiskey Library</span>
      </h1>

      <Navigation />
    </header>
  );
}

export default Header;

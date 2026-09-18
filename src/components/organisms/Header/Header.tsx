import Navigation from "@components/molecules/Navigation/Navigation";
import logo from "@assets/wolf-crane-logo.svg";
import { BrandLogo } from "@components/atoms/BrandLogo/BrandLogo";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <BrandLogo
        className="header__logo"
        imageClassName="header__logo-image"
        src={logo}
        alt="Wolf & Crane Whiskey Library"
      />

      <h1 className="header__title">
        <span>Wolf & Crane</span>
        <span>Whiskey Library</span>
      </h1>

      <Navigation />
    </header>
  );
}

export default Header;

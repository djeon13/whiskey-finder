import { Link } from "react-router-dom";
import logo from "../../../assets/wolf-crane-logo.svg";
import { BrandLogo } from "../../atoms/BrandLogo/BrandLogo";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__brand">
          <BrandLogo
            className="footer__logo-link"
            imageClassName="footer__logo"
            src={logo}
            alt="Wolf & Crane Whiskey Library"
          />

          <p className="footer__description">
            Explore the Wolf & Crane collection through personalized whiskey
            recommendations based on your tasting preferences.
          </p>
        </div>

        <nav className="footer__navigation">
          <Link className="footer__link" to="/">
            Home
          </Link>

          <Link className="footer__link" to="/finder">
            Finder
          </Link>
        </nav>
      </div>

      <div className="footer__bottom">
        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} • Built by Daniel Jeon</p>

          <p>
            Independent portfolio project inspired by Wolf & Crane, Los Angeles.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

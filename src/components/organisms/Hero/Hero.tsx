import { useNavigate } from "react-router-dom";

import whiskeyPour from "../../../assets/origami-whiskeyglass.png";
import { Eyebrow } from "../../atoms/Eyebrow/Eyebrow";
import { PrimaryButton } from "../../atoms/PrimaryButton/PrimaryButton";

import "./Hero.css";

function Hero() {
  const navigate = useNavigate();

  function handleStartExploring() {
    navigate("/finder");
  }

  return (
    <section className="hero">
      <div className="hero__content">
        <Eyebrow className="hero__eyebrow">
          Curated Whiskey Recommendations
        </Eyebrow>

        <h1 className="hero__title">
          Discover Your
          <br />
          Perfect Pour
        </h1>

        <p className="hero__description">
          Explore the Wolf & Crane collection through personalized whiskey
          recommendations based on flavor profile, price, and country of origin.
        </p>

        <div className="hero__cta">
          <div className="hero__illustration">
            <img
              className="hero__pour"
              src={whiskeyPour}
              alt="Illustration of a whiskey glass folded in an origami style."
            />
          </div>

          <PrimaryButton className="hero__button" onClick={handleStartExploring}>
            Start Exploring
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
}

export default Hero;

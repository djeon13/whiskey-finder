import { useNavigate } from "react-router-dom";

import whiskeyPour from "../../assets/origami-whiskeyglass.png";

import "./Hero.css";

function Hero() {
  const navigate = useNavigate();

  function handleStartExploring() {
    navigate("/finder");
  }

  return (
    <section className="hero">
      <div className="hero__content">
        <p className="hero__eyebrow">
          Curated Whiskey Recommendations
        </p>

        <h1 className="hero__title">
          Discover Your
          <br />
          Perfect Pour
        </h1>

        <p className="hero__description">
          Explore the Wolf & Crane collection through
          personalized whiskey recommendations based on
          flavor profile, price, and country of origin.
        </p>

<div className="hero__cta">
  <div className="hero__illustration">
    <img
      className="hero__pour"
      src={whiskeyPour}
      alt=""
      aria-hidden="true"
    />
  </div>

  <button
    className="hero__button"
    type="button"
    onClick={handleStartExploring}
  >
    Start Exploring
  </button>
</div>
      </div>
    </section>
  );
}

export default Hero;
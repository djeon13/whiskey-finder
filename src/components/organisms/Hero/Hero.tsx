import { useNavigate } from "react-router-dom";

import whiskeyPour from "@assets/origami-whiskeyglass.png";
import { PrimaryButton } from "@components/atoms/PrimaryButton/PrimaryButton";
import { PageHeading } from "@components/molecules/PageHeading/PageHeading";

import "./Hero.css";

function Hero() {
  const navigate = useNavigate();

  function handleStartExploring() {
    navigate("/finder");
  }

  return (
    <section className="hero">
      <div className="hero__content">
        <PageHeading
          as="h1"
          eyebrow="Curated Whiskey Recommendations"
          eyebrowClassName="hero__eyebrow"
          title={
            <>
              Discover Your
              <br />
              Perfect Pour
            </>
          }
          titleClassName="hero__title"
          description="Explore the Wolf & Crane collection through personalized whiskey recommendations based on flavor profile, price, and country of origin."
          descriptionClassName="hero__description"
        />

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

import { useEffect, useState } from "react";
import { getBartenderPerspective } from "../../utils/bartenderApi";
import WhiskeyLoader from "../WhiskeyLoader/WhiskeyLoader";
import {
  getFlavorNoteLabel,
  getBarrelTypeLabel,
  getFlavorCategory,
} from "../../utils/flavorHelpers";
import "./WhiskeyDetailsModal.css";

/**
 * @param {Object} props
 * @param {import("../../types").RecommendedWhiskey | null} props.whiskey
 * @param {{ flavors: string[], priceRange: string, country: string }} props.preferences
 * @param {boolean} props.isOpen
 * @param {() => void} props.onClose
 */
function WhiskeyDetailsModal({ whiskey, preferences, isOpen, onClose }) {
  const [isBartenderLoading, setIsBartenderLoading] = useState(false);

  const [bartenderPerspective, setBartenderPerspective] = useState("");

  const [bartenderError, setBartenderError] = useState("");

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !whiskey) {
    return null;
  }

  function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  async function handleAskBartender() {
    try {
      setBartenderError("");
      setBartenderPerspective("");

      setIsBartenderLoading(true);

      const response = await getBartenderPerspective({
        whiskey,
        preferences,
      });

      setBartenderPerspective(response);
    } catch (error) {
      console.error(error);

      setBartenderError(
        "The bartender is unavailable at the moment. Please try again."
      );
    } finally {
      setIsBartenderLoading(false);
    }
  }

  return (
    <div className="whiskey-modal" onMouseDown={handleOverlayClick}>
      <div
        className="whiskey-modal__container"
        role="dialog"
        aria-modal="true"
        aria-labelledby="whiskey-modal-title"
      >
        <button
          className="whiskey-modal__close"
          type="button"
          aria-label="Close whiskey details"
          onClick={onClose}
        >
          ×
        </button>

        <div className="whiskey-modal__hero">
          <div className="whiskey-modal__hero-content">
            <header className="whiskey-modal__heading">
              <p className="whiskey-modal__distillery">{whiskey.distillery}</p>

              <h2 className="whiskey-modal__title" id="whiskey-modal-title">
                {whiskey.name}
              </h2>

              <p className="whiskey-modal__location">{whiskey.location}</p>
            </header>

            <dl className="whiskey-modal__facts">
              {whiskey.age !== null && (
                <div className="whiskey-modal__fact">
                  <dt className="whiskey-modal__fact-label">Age</dt>

                  <dd className="whiskey-modal__fact-value">
                    {whiskey.age} Years
                  </dd>
                </div>
              )}

              <div className="whiskey-modal__fact">
                <dt className="whiskey-modal__fact-label">ABV</dt>

                <dd className="whiskey-modal__fact-value">{whiskey.abv}%</dd>
              </div>

              <div className="whiskey-modal__fact">
                <dt className="whiskey-modal__fact-label">Price</dt>

                <dd className="whiskey-modal__fact-value">
                  ${whiskey.price} / pour
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="whiskey-modal__body">
          <section className="whiskey-modal__section">
            <h3 className="whiskey-modal__section-title">Flavor Profile</h3>

            <ul className="whiskey-modal__flavors">
              {whiskey.flavorNotes.map((note) => (
                <li
                  key={note}
                  className={`whiskey-modal__flavor whiskey-modal__flavor--${getFlavorCategory(
                    note
                  )}`}
                >
                  {getFlavorNoteLabel(note)}
                </li>
              ))}
            </ul>
          </section>

          {whiskey.matchingNotes?.length > 0 && (
            <section className="whiskey-modal__section">
              <h3 className="whiskey-modal__section-title">
                Why We Recommended This
              </h3>

              <p className="whiskey-modal__section-description">
                These flavor notes matched your selections:
              </p>

              <ul className="whiskey-modal__flavors">
                {whiskey.matchingNotes.map((note) => (
                  <li
                    key={note}
                    className={`whiskey-modal__flavor whiskey-modal__flavor--${getFlavorCategory(
                      note
                    )}`}
                  >
                    ✓ {getFlavorNoteLabel(note)}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="whiskey-modal__section">
            <h3 className="whiskey-modal__section-title">Barrel Types</h3>

            <ul className="whiskey-modal__flavors">
              {whiskey.barrelTypes.map((barrelType) => (
                <li className="whiskey-modal__flavor" key={barrelType}>
                  {getBarrelTypeLabel(barrelType)}
                </li>
              ))}
            </ul>
          </section>

          <section className="whiskey-modal__section">
            <h3 className="whiskey-modal__section-title">About This Whiskey</h3>

            <p className="whiskey-modal__text">{whiskey.description}</p>
          </section>

          <section className="whiskey-modal__section whiskey-modal__section--bartender">
            <h3 className="whiskey-modal__section-title">
              Bartender's Recommendation
            </h3>

            <p className="whiskey-modal__text">{whiskey.bartenderNote}</p>

            {!isBartenderLoading && (
              <button
                className="whiskey-modal__bartender-button"
                type="button"
                onClick={handleAskBartender}
              >
                {bartenderPerspective ? "✨ Ask Again" : "✨ Ask the Bartender"}
              </button>
            )}

            {isBartenderLoading && (
              <div className="whiskey-modal__bartender-loader">
                <WhiskeyLoader />
              </div>
            )}

            {bartenderPerspective && (
              <div className="whiskey-modal__bartender-bubble">
                <h4 className="whiskey-modal__bartender-title">
                  🥃 Bartender's Perspective
                </h4>

                <p className="whiskey-modal__text">{bartenderPerspective}</p>
              </div>
            )}

            {bartenderError && (
              <p className="whiskey-modal__bartender-error">{bartenderError}</p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default WhiskeyDetailsModal;

import { useEffect, useState } from "react";
import { getBartenderPerspective } from "../../utils/bartenderApi";
import WhiskeyLoader from "../WhiskeyLoader/WhiskeyLoader";
import {
  getFlavorNoteLabel,
  getBarrelTypeLabel,
  getFlavorCategory,
} from "../../utils/flavorHelpers";
import type { Preferences, RecommendedWhiskey } from "../../types";
import { PillList } from "../PillList/PillList";
import "./WhiskeyDetailsModal.css";

interface WhiskeyDetailsModalProps {
  whiskey: RecommendedWhiskey | null;
  preferences: Preferences;
  isOpen: boolean;
  onClose: () => void;
}

function WhiskeyDetailsModal({
  whiskey,
  preferences,
  isOpen,
  onClose,
}: WhiskeyDetailsModalProps) {
  const [isBartenderLoading, setIsBartenderLoading] = useState(false);

  const [bartenderPerspective, setBartenderPerspective] = useState("");

  const [bartenderError, setBartenderError] = useState("");

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleEscape(event: KeyboardEvent) {
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

  function handleOverlayClick(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  async function handleAskBartender() {
    if (!whiskey) {
      return;
    }

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

            <PillList
              className="whiskey-modal__flavors"
              items={whiskey.flavorNotes.map((note) => ({
                id: note,
                label: getFlavorNoteLabel(note),
                className: `whiskey-modal__flavor whiskey-modal__flavor--${getFlavorCategory(
                  note
                )}`,
              }))}
            />
          </section>

          {(whiskey.matchingNotes?.length ?? 0) > 0 && (
            <section className="whiskey-modal__section">
              <h3 className="whiskey-modal__section-title">
                Why We Recommended This
              </h3>

              <p className="whiskey-modal__section-description">
                These flavor notes matched your selections:
              </p>

              <PillList
                className="whiskey-modal__flavors"
                items={(whiskey.matchingNotes ?? []).map((note) => ({
                  id: note,
                  label: `✓ ${getFlavorNoteLabel(note)}`,
                  className: `whiskey-modal__flavor whiskey-modal__flavor--${getFlavorCategory(
                    note
                  )}`,
                }))}
              />
            </section>
          )}

          <section className="whiskey-modal__section">
            <h3 className="whiskey-modal__section-title">Barrel Types</h3>

            <PillList
              className="whiskey-modal__flavors"
              itemClassName="whiskey-modal__flavor"
              items={whiskey.barrelTypes.map((barrelType) => ({
                id: barrelType,
                label: getBarrelTypeLabel(barrelType),
              }))}
            />
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

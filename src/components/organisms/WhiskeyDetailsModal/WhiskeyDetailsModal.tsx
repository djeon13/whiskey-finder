import { useEffect, useState } from "react";
import {
  getBartenderPerspective,
  getFlavorNoteLabel,
  getBarrelTypeLabel,
  getFlavorCategory,
} from "@utils";
import type { Preferences, RecommendedWhiskey } from "@types";
import {
  WhiskeyLoader,
  CloseButton,
  PrimaryButton,
  FactRow,
} from "@components/atoms";
import { PillList, TitledSection } from "@components/molecules";
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
        <CloseButton
          className="whiskey-modal__close"
          onClick={onClose}
          label="Close whiskey details"
        />

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
                <FactRow
                  className="whiskey-modal__fact"
                  labelClassName="whiskey-modal__fact-label"
                  valueClassName="whiskey-modal__fact-value"
                  label="Age"
                  value={`${whiskey.age} Years`}
                />
              )}

              <FactRow
                className="whiskey-modal__fact"
                labelClassName="whiskey-modal__fact-label"
                valueClassName="whiskey-modal__fact-value"
                label="ABV"
                value={`${whiskey.abv}%`}
              />

              <FactRow
                className="whiskey-modal__fact"
                labelClassName="whiskey-modal__fact-label"
                valueClassName="whiskey-modal__fact-value"
                label="Price"
                value={`$${whiskey.price} / pour`}
              />
            </dl>
          </div>
        </div>

        <div className="whiskey-modal__body">
          <TitledSection
            className="whiskey-modal__section"
            titleClassName="whiskey-modal__section-title"
            title="Flavor Profile"
          >
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
          </TitledSection>

          {(whiskey.matchingNotes?.length ?? 0) > 0 && (
            <TitledSection
              className="whiskey-modal__section"
              titleClassName="whiskey-modal__section-title"
              title="Why We Recommended This"
            >
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
            </TitledSection>
          )}

          <TitledSection
            className="whiskey-modal__section"
            titleClassName="whiskey-modal__section-title"
            title="Barrel Types"
          >
            <PillList
              className="whiskey-modal__flavors"
              itemClassName="whiskey-modal__flavor"
              items={whiskey.barrelTypes.map((barrelType) => ({
                id: barrelType,
                label: getBarrelTypeLabel(barrelType),
              }))}
            />
          </TitledSection>

          <TitledSection
            className="whiskey-modal__section"
            titleClassName="whiskey-modal__section-title"
            title="About This Whiskey"
          >
            <p className="whiskey-modal__text">{whiskey.description}</p>
          </TitledSection>

          <TitledSection
            className="whiskey-modal__section whiskey-modal__section--bartender"
            titleClassName="whiskey-modal__section-title"
            title="Bartender's Recommendation"
          >
            <p className="whiskey-modal__text">{whiskey.bartenderNote}</p>

            {!isBartenderLoading && (
              <PrimaryButton
                className="whiskey-modal__bartender-button"
                onClick={handleAskBartender}
              >
                {bartenderPerspective ? "✨ Ask Again" : "✨ Ask the Bartender"}
              </PrimaryButton>
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
          </TitledSection>
        </div>
      </div>
    </div>
  );
}

export default WhiskeyDetailsModal;

import { useState } from "react";

import { FLAVOR_CATEGORIES } from "../../data/flavorNotes";
import { COUNTRIES } from "../../data/countries";
import { PRICE_RANGES } from "../../data/priceRanges";

import { recommendWhiskeys } from "../../utils/recommendationEngine";
import { getFlavorDescription } from "../../utils/flavorDescriptions";

import WhiskeyCard from "../WhiskeyCard/WhiskeyCard";
import WhiskeyDetailsModal from "../WhiskeyDetailsModal/WhiskeyDetailsModal";
import WhiskeyLoader from "../WhiskeyLoader/WhiskeyLoader";

import "./WhiskeyFinder.css";

function WhiskeyFinder() {
  const [preferences, setPreferences] = useState({
    flavors: [],
    priceRange: "",
    country: "",
  });

  const [activeFlavor, setActiveFlavor] =
    useState(null);

  const [recommendations, setRecommendations] =
    useState([]);

  const [hasSearched, setHasSearched] =
    useState(false);

  const [selectedWhiskey, setSelectedWhiskey] =
    useState(null);

  const [isLoading, setIsLoading] =
    useState(false);

  function handleViewDetails(whiskey) {
    setSelectedWhiskey(whiskey);
  }

  function handleCloseDetails() {
    setSelectedWhiskey(null);
  }

 function handleFlavorClick(flavorId) {
  const isSelected =
    preferences.flavors.includes(flavorId);

  if (isSelected) {
    const updatedFlavors =
      preferences.flavors.filter(
        (flavor) => flavor !== flavorId
      );

    setPreferences((current) => ({
      ...current,
      flavors: updatedFlavors,
    }));

    if (activeFlavor === flavorId) {
      setActiveFlavor(updatedFlavors[0] ?? null);
    }

    return;
  }

  if (preferences.flavors.length >= 2) {
    return;
  }

  const updatedFlavors = [
    ...preferences.flavors,
    flavorId,
  ];

  setPreferences((current) => ({
    ...current,
    flavors: updatedFlavors,
  }));

  setActiveFlavor(flavorId);
}

  function handlePriceChange(event) {
    setPreferences((currentPreferences) => ({
      ...currentPreferences,
      priceRange: event.target.value,
    }));
  }

  function handleCountryChange(event) {
    setPreferences((currentPreferences) => ({
      ...currentPreferences,
      country: event.target.value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    setTimeout(() => {
      const whiskeyRecommendations =
        recommendWhiskeys(preferences);

      setRecommendations(
        whiskeyRecommendations
      );

      setHasSearched(true);

      setIsLoading(false);
    }, 700);
  }

  const displayedFlavor =
  FLAVOR_CATEGORIES.find(
    (category) => category.id === activeFlavor
  );

  return (
    <section className="whiskey-finder">
      <div className="whiskey-finder__container">
        <div className="whiskey-finder__heading">
          <p className="whiskey-finder__eyebrow">
            Personalized Recommendations
          </p>

          <h2 className="whiskey-finder__title">
            Find Your Whiskey
          </h2>

          <p className="whiskey-finder__description">
            Tell us what you enjoy and we'll
            recommend three whiskeys from our
            collection.
          </p>
        </div>

        <form
          className="whiskey-finder__form"
          onSubmit={handleSubmit}
        >
          <fieldset className="whiskey-finder__fieldset">
            <legend className="whiskey-finder__legend">
              Choose Your Flavors
            </legend>

            <p className="whiskey-finder__helper-text">
              Choose up to two flavor profiles.
              (
              {preferences.flavors.length}
              /2 selected)
            </p>

            <div className="whiskey-finder__options">
              {FLAVOR_CATEGORIES.map(
                (flavor) => {
                  const isSelected =
                    preferences.flavors.includes(
                      flavor.id
                    );

                  const isDisabled =
                    preferences.flavors.length >=
                      2 && !isSelected;

                  return (
                    <button
                      key={flavor.id}
                      type="button"
                      disabled={isDisabled}
                      onClick={() =>
                        handleFlavorClick(
                          flavor.id
                        )
                      }
                      className={`whiskey-finder__option ${
                        isSelected
                          ? "whiskey-finder__option--selected"
                          : ""
                      }`}
                    >
                      {isSelected && "✓ "}
                      {flavor.label}
                    </button>
                  );
                }
              )}
            </div>

            {displayedFlavor && (
              <section className="whiskey-finder__flavor-panel">
                <h3 className="whiskey-finder__flavor-title">
                  {displayedFlavor.label}
                </h3>

                <p className="whiskey-finder__flavor-description">
                  {getFlavorDescription(
                    displayedFlavor.id
                  )}
                </p>

                <p className="whiskey-finder__flavor-subtitle">
                  Typical Tasting Notes
                </p>

                <ul className="whiskey-finder__notes-list">
                  {displayedFlavor.notes.map(
                    (note) => (
                      <li
                        key={note.id}
                        className="whiskey-finder__note"
                      >
                        {note.label}
                      </li>
                    )
                  )}
                </ul>
              </section>
            )}
          </fieldset>
                    <fieldset className="whiskey-finder__fieldset">
            <legend className="whiskey-finder__legend">
              Price Range
            </legend>

            <p className="whiskey-finder__helper-text">
              Optional
            </p>

            <select
              className="whiskey-finder__select"
              value={preferences.priceRange}
              onChange={handlePriceChange}
            >
              <option value="">
                Any Price
              </option>

              {PRICE_RANGES.map((priceRange) => (
                <option
                  key={priceRange.id}
                  value={priceRange.id}
                >
                  {priceRange.label}
                </option>
              ))}
            </select>
          </fieldset>

          <fieldset className="whiskey-finder__fieldset">
            <legend className="whiskey-finder__legend">
              Country of Origin
            </legend>

            <p className="whiskey-finder__helper-text">
              Optional
            </p>

            <select
              className="whiskey-finder__select"
              value={preferences.country}
              onChange={handleCountryChange}
            >
              <option value="">
                Any Country
              </option>

              {COUNTRIES.map((country) => (
                <option
                  key={country.id}
                  value={country.id}
                >
                  {country.label}
                </option>
              ))}
            </select>
          </fieldset>

          <button
            className="whiskey-finder__submit"
            type="submit"
            disabled={isLoading}
          >
            {isLoading
              ? "Finding Your Whiskey..."
              : "Find My Whiskey"}
          </button>
        </form>

        {isLoading && (
          <section className="whiskey-finder__loading">
            <WhiskeyLoader />

            <h3 className="whiskey-finder__loading-title">
              Finding Your Perfect Pour...
            </h3>

            <p className="whiskey-finder__loading-text">
              Searching our collection for the
              best matches.
            </p>
          </section>
        )}

        {hasSearched &&
          recommendations.length > 0 && (
            <section className="whiskey-finder__results">
              <h3 className="whiskey-finder__results-title">
                Your Whiskey Matches
              </h3>

              <ul className="whiskey-finder__results-list">
                {recommendations.map(
                  (whiskey, index) => (
                    <li
                      key={whiskey.id}
                      className="whiskey-finder__results-item"
                      style={{
                        animationDelay: `${index * 180}ms`,
                      }}
                    >
                      <WhiskeyCard
                        whiskey={whiskey}
                        onViewDetails={
                          handleViewDetails
                        }
                      />
                    </li>
                  )
                )}
              </ul>
            </section>
          )}

        {hasSearched &&
          !isLoading &&
          recommendations.length === 0 && (
            <section className="whiskey-finder__empty">
              <h3 className="whiskey-finder__empty-title">
                No Matches Found
              </h3>

              <p className="whiskey-finder__empty-text">
                We couldn't find a whiskey that
                matches those flavor profiles and
                filters. Try selecting a different
                flavor combination or removing a
                filter.
              </p>
            </section>
          )}
      </div>

      <WhiskeyDetailsModal
        whiskey={selectedWhiskey}
        isOpen={Boolean(selectedWhiskey)}
        onClose={handleCloseDetails}
      />
    </section>
  );
}

export default WhiskeyFinder;
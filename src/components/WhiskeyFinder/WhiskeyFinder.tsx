import { useState } from "react";

import flavorNotesData from "../../data/flavorNotes.json";
import countriesData from "../../data/countries.json";
import priceRangesData from "../../data/priceRanges.json";
import whiskeyCollectionData from "../../data/whiskeyCollection.json";
import type {
  Country,
  FlavorCategory,
  Preferences,
  PriceRange,
  RecommendedWhiskey,
  Whiskey,
} from "../../types";

const FLAVOR_CATEGORIES = flavorNotesData as FlavorCategory[];
const COUNTRIES = countriesData as Country[];
const PRICE_RANGES = priceRangesData as PriceRange[];
const whiskeyCollection = whiskeyCollectionData as Whiskey[];

import { recommendWhiskeys } from "../../utils/recommendationEngine";
import { getFlavorDescription } from "../../utils/flavorDescriptions";

import WhiskeyCard from "../WhiskeyCard/WhiskeyCard";
import WhiskeyDetailsModal from "../WhiskeyDetailsModal/WhiskeyDetailsModal";
import WhiskeyLoader from "../WhiskeyLoader/WhiskeyLoader";

import "./WhiskeyFinder.css";

function WhiskeyFinder() {
  const [preferences, setPreferences] = useState<Preferences>({
    flavors: [],
    priceRange: "",
    country: "",
  });

  const [activeFlavor, setActiveFlavor] = useState<string | null>(null);

  const [recommendations, setRecommendations] = useState<
    RecommendedWhiskey[]
  >([]);

  const [searchQuery, setSearchQuery] = useState("");

  const [hasSearched, setHasSearched] = useState(false);

  const [searchResults, setSearchResults] = useState<RecommendedWhiskey[]>([]);

  const [isResultsModalOpen, setIsResultsModalOpen] = useState(false);

  const [selectedWhiskey, setSelectedWhiskey] =
    useState<RecommendedWhiskey | null>(null);

  const [detailsSource, setDetailsSource] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const searchKeywords = [
    ...new Set(
      whiskeyCollection.flatMap((whiskey) => {
        const searchableFields = [whiskey.name, whiskey.distillery].filter(
          Boolean
        );

        return searchableFields.flatMap((field) =>
          field
            .split(/\s+/)
            .map((word) => word.replace(/[^\w'-]/g, ""))
            .filter((word) => word.length > 2)
        );
      })
    ),
  ];

  const searchSuggestions =
    searchQuery.trim().length > 0
      ? searchKeywords
          .filter((keyword) =>
            keyword.toLowerCase().startsWith(searchQuery.trim().toLowerCase())
          )
          .slice(0, 1)
      : [];

  function handleViewDetails(whiskey: RecommendedWhiskey, source?: string) {
    setIsResultsModalOpen(false);
    setSelectedWhiskey(whiskey);
    setDetailsSource(source ?? null);
  }

  function handleCloseDetails() {
    setSelectedWhiskey(null);

    if (detailsSource === "recommendations") {
      setIsResultsModalOpen(true);
    }

    setDetailsSource(null);
  }

  function handleCloseResultsModal() {
    setIsResultsModalOpen(false);
    setRecommendations([]);
    setHasSearched(false);
  }

  function handleFlavorClick(flavorId: string) {
    const isSelected = preferences.flavors.includes(flavorId);

    if (isSelected) {
      const updatedFlavors = preferences.flavors.filter(
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

    const updatedFlavors = [...preferences.flavors, flavorId];

    setPreferences((current) => ({
      ...current,
      flavors: updatedFlavors,
    }));

    setActiveFlavor(flavorId);
  }

  function handlePriceChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setPreferences((currentPreferences) => ({
      ...currentPreferences,
      priceRange: event.target.value,
    }));
  }

  function handleCountryChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setPreferences((currentPreferences) => ({
      ...currentPreferences,
      country: event.target.value,
    }));
  }

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return;
    }

    const matches = whiskeyCollection.filter((whiskey) => {
      const searchText = [whiskey.name, whiskey.distillery]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchText.includes(query);
    });

    setSearchResults(matches);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSearchResults([]);
    setSearchQuery("");
    setIsLoading(true);

    setTimeout(() => {
      const whiskeyRecommendations = recommendWhiskeys(preferences);

      setRecommendations(whiskeyRecommendations);

      setHasSearched(true);

      if (whiskeyRecommendations.length > 0) {
        setIsResultsModalOpen(true);
      }

      setIsLoading(false);
    }, 700);
  }

  const displayedFlavor = FLAVOR_CATEGORIES.find(
    (category) => category.id === activeFlavor
  );

  return (
    <section className="whiskey-finder">
      <div className="whiskey-finder__container">
        <div className="whiskey-finder__heading">
          <p className="whiskey-finder__eyebrow">
            Personalized Recommendations
          </p>

          <h2 className="whiskey-finder__title">Find Your Whiskey</h2>

          <p className="whiskey-finder__description">
            Tell us what you enjoy and we'll recommend three whiskeys from our
            collection.
          </p>
        </div>

        <form className="whiskey-finder__form" onSubmit={handleSubmit}>
          <fieldset className="whiskey-finder__fieldset">
            <legend className="whiskey-finder__legend">
              Choose Your Flavors
            </legend>

            <p className="whiskey-finder__helper-text">
              Choose up to two flavor profiles. ({preferences.flavors.length}/2
              selected)
            </p>

            <div className="whiskey-finder__options">
              {FLAVOR_CATEGORIES.map((flavor) => {
                const isSelected = preferences.flavors.includes(flavor.id);

                const isDisabled =
                  preferences.flavors.length >= 2 && !isSelected;

                return (
                  <button
                    key={flavor.id}
                    type="button"
                    disabled={isDisabled}
                    onClick={() => handleFlavorClick(flavor.id)}
                    className={`whiskey-finder__option ${
                      isSelected ? "whiskey-finder__option--selected" : ""
                    }`}
                  >
                    {isSelected && "✓ "}
                    {flavor.label}
                  </button>
                );
              })}
            </div>

            {displayedFlavor && (
              <section className="whiskey-finder__flavor-panel">
                <h3 className="whiskey-finder__flavor-title">
                  {displayedFlavor.label}
                </h3>

                <p className="whiskey-finder__flavor-description">
                  {getFlavorDescription(displayedFlavor.id)}
                </p>

                <p className="whiskey-finder__flavor-subtitle">
                  Typical Tasting Notes
                </p>

                <ul className="whiskey-finder__notes-list">
                  {displayedFlavor.previewNotes.map((note) => (
                    <li key={note.id} className="whiskey-finder__note">
                      {note.label}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </fieldset>

          <fieldset className="whiskey-finder__fieldset">
            <legend className="whiskey-finder__legend">Price Range</legend>

            <p className="whiskey-finder__helper-text">Optional</p>

            <select
              className="whiskey-finder__select"
              value={preferences.priceRange}
              onChange={handlePriceChange}
            >
              <option value="">Any Price</option>

              {PRICE_RANGES.map((priceRange) => (
                <option key={priceRange.id} value={priceRange.id}>
                  {priceRange.label}
                </option>
              ))}
            </select>
          </fieldset>

          <fieldset className="whiskey-finder__fieldset">
            <legend className="whiskey-finder__legend">
              Country of Origin
            </legend>

            <p className="whiskey-finder__helper-text">Optional</p>

            <select
              className="whiskey-finder__select"
              value={preferences.country}
              onChange={handleCountryChange}
            >
              <option value="">Any Country</option>

              {COUNTRIES.map((country) => (
                <option key={country.id} value={country.id}>
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
            {isLoading ? "Finding Your Whiskey..." : "Find My Whiskey"}
          </button>
        </form>

        {isLoading && (
          <section className="whiskey-finder__loading">
            <WhiskeyLoader />

            <h3 className="whiskey-finder__loading-title">
              Finding Your Perfect Pour...
            </h3>

            <p className="whiskey-finder__loading-text">
              Searching our collection for the best matches.
            </p>
          </section>
        )}

        {hasSearched && recommendations.length > 0 && (
          <section className="whiskey-finder__results">
            <h3 className="whiskey-finder__results-title">
              Your Whiskey Matches
            </h3>

            <ul className="whiskey-finder__results-list">
              {recommendations.map((whiskey, index) => (
                <li
                  key={whiskey.id}
                  className="whiskey-finder__results-item"
                  style={{
                    animationDelay: `${index * 180}ms`,
                  }}
                >
                  <WhiskeyCard
                    whiskey={whiskey}
                    rank={index + 1}
                    onViewDetails={(whiskey) =>
                      handleViewDetails(whiskey, "recommendations")
                    }
                  />
                </li>
              ))}
            </ul>
          </section>
        )}

        {hasSearched && !isLoading && recommendations.length === 0 && (
          <section className="whiskey-finder__empty">
            <h3 className="whiskey-finder__empty-title">No Matches Found</h3>

            <p className="whiskey-finder__empty-text">
              We couldn't find a whiskey that matches those flavor profiles and
              filters. Try selecting a different flavor combination or removing
              a filter.
            </p>
          </section>
        )}
        <section className="whiskey-finder__library-search">
          <p className="whiskey-finder__library-search-text">
            Already know what you want? Search the library to see if Wolf &amp;
            Crane has it.
          </p>

          <form className="whiskey-finder__search" onSubmit={handleSearch}>
            <div className="whiskey-finder__search-input-wrapper">
              <input
                className="whiskey-finder__search-input"
                type="search"
                placeholder="Search the whiskey library..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                aria-label="Search the whiskey library"
              />

              {searchSuggestions.length > 0 &&
                searchSuggestions[0].toLowerCase() !==
                  searchQuery.trim().toLowerCase() && (
                  <ul className="whiskey-finder__search-suggestions">
                    {searchSuggestions.map((suggestion) => (
                      <li key={suggestion}>
                        <button
                          type="button"
                          className="whiskey-finder__search-suggestion"
                          onClick={() => {
                            const keyword = suggestion;

                            setSearchQuery(keyword);

                            const matches = whiskeyCollection.filter(
                              (whiskey) => {
                                const searchText = [
                                  whiskey.name,
                                  whiskey.distillery,
                                ]
                                  .filter(Boolean)
                                  .join(" ")
                                  .toLowerCase();

                                return searchText.includes(
                                  keyword.toLowerCase()
                                );
                              }
                            );

                            setSearchResults(matches);
                          }}
                        >
                          {suggestion}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
            </div>

            <button
              className="whiskey-finder__search-button"
              type="submit"
              aria-label="Search"
            >
              &#128269;
            </button>
          </form>
        </section>

        {searchResults.length > 0 && (
          <section className="whiskey-finder__search-results">
            <h3 className="whiskey-finder__results-title">Search Results</h3>

            <ul className="whiskey-finder__results-list">
              {searchResults.map((whiskey) => (
                <li key={whiskey.id} className="whiskey-finder__results-item">
                  <WhiskeyCard
                    whiskey={whiskey}
                    showTags={false}
                    onViewDetails={handleViewDetails}
                  />
                </li>
              ))}
            </ul>
          </section>
        )}

        {searchQuery.trim() &&
          searchSuggestions.length === 0 &&
          searchResults.length === 0 && (
            <section className="whiskey-finder__search-empty">
              <p>
                We couldn't find that whiskey in the Wolf &amp; Crane library.
              </p>
            </section>
          )}
      </div>

      <div
        className={`whiskey-finder__results-modal ${
          isResultsModalOpen ? "whiskey-finder__results-modal--open" : ""
        }`}
      >
        <div className="whiskey-finder__results-modal-content">
          <div className="whiskey-finder__results-modal-header">
            <div>
              <p className="whiskey-finder__eyebrow">
                Personalized Recommendations
              </p>

              <h3 className="whiskey-finder__results-title">
                Your Whiskey Matches
              </h3>
            </div>

            <button
              className="whiskey-finder__results-modal-close"
              type="button"
              onClick={handleCloseResultsModal}
              aria-label="Close whiskey recommendations"
            >
              ×
            </button>
          </div>

          <ul className="whiskey-finder__results-list">
            {recommendations.map((whiskey, index) => (
              <li key={whiskey.id} className="whiskey-finder__results-item">
                <WhiskeyCard
                  whiskey={whiskey}
                  rank={index + 1}
                  onViewDetails={(whiskey) =>
                    handleViewDetails(whiskey, "recommendations")
                  }
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <WhiskeyDetailsModal
        key={selectedWhiskey?.id}
        whiskey={selectedWhiskey}
        preferences={preferences}
        isOpen={Boolean(selectedWhiskey)}
        onClose={handleCloseDetails}
      />
    </section>
  );
}

export default WhiskeyFinder;

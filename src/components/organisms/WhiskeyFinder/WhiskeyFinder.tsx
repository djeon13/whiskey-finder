import { useState } from "react";

import flavorNotesData from "../../../data/flavorNotes.json";
import countriesData from "../../../data/countries.json";
import priceRangesData from "../../../data/priceRanges.json";
import whiskeyCollectionData from "../../../data/whiskeyCollection.json";
import type {
  Country,
  FlavorCategory,
  Preferences,
  PriceRange,
  RecommendedWhiskey,
  Whiskey,
} from "../../../types";

const FLAVOR_CATEGORIES = flavorNotesData as FlavorCategory[];
const COUNTRIES = countriesData as Country[];
const PRICE_RANGES = priceRangesData as PriceRange[];
const whiskeyCollection = whiskeyCollectionData as Whiskey[];

import { recommendWhiskeys } from "../../../utils/recommendationEngine";
import { getFlavorDescription } from "../../../utils/flavorDescriptions";

import { Menu, MenuItem } from "../../molecules/Menu/Menu";
import { FormFieldset } from "../../atoms/FormFieldset/FormFieldset";
import { SelectField } from "../../atoms/SelectField/SelectField";
import { PillList } from "../../molecules/PillList/PillList";
import { WhiskeyCardList } from "../WhiskeyCardList/WhiskeyCardList";
import WhiskeyDetailsModal from "../WhiskeyDetailsModal/WhiskeyDetailsModal";
import WhiskeyLoader from "../../atoms/WhiskeyLoader/WhiskeyLoader";
import { Eyebrow } from "../../atoms/Eyebrow/Eyebrow";
import { SectionTitle } from "../../atoms/SectionTitle/SectionTitle";
import { PrimaryButton } from "../../atoms/PrimaryButton/PrimaryButton";
import { CloseButton } from "../../atoms/CloseButton/CloseButton";

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
          <Eyebrow className="whiskey-finder__eyebrow">
            Personalized Recommendations
          </Eyebrow>

          <h2 className="whiskey-finder__title">Find Your Whiskey</h2>

          <p className="whiskey-finder__description">
            Tell us what you enjoy and we'll recommend three whiskeys from our
            collection.
          </p>
        </div>

        <form className="whiskey-finder__form" onSubmit={handleSubmit}>
          <FormFieldset
            className="whiskey-finder__fieldset"
            legendClassName="whiskey-finder__legend"
            helperTextClassName="whiskey-finder__helper-text"
            legend="Choose Your Flavors"
            helperText={`Choose up to two flavor profiles. (${preferences.flavors.length}/2 selected)`}
          >
            <Menu className="whiskey-finder__options">
              {FLAVOR_CATEGORIES.map((flavor) => {
                const isSelected = preferences.flavors.includes(flavor.id);

                const isDisabled =
                  preferences.flavors.length >= 2 && !isSelected;

                return (
                  <MenuItem
                    key={flavor.id}
                    selected={isSelected}
                    disabled={isDisabled}
                    onSelect={() => handleFlavorClick(flavor.id)}
                    className="whiskey-finder__option"
                    selectedClassName="whiskey-finder__option--selected"
                  >
                    {isSelected && "✓ "}
                    {flavor.label}
                  </MenuItem>
                );
              })}
            </Menu>

            {displayedFlavor && (
              <section className="whiskey-finder__flavor-panel">
                <SectionTitle className="whiskey-finder__flavor-title">
                  {displayedFlavor.label}
                </SectionTitle>

                <p className="whiskey-finder__flavor-description">
                  {getFlavorDescription(displayedFlavor.id)}
                </p>

                <p className="whiskey-finder__flavor-subtitle">
                  Typical Tasting Notes
                </p>

                <PillList
                  className="whiskey-finder__notes-list"
                  itemClassName="whiskey-finder__note"
                  items={displayedFlavor.previewNotes.map((note) => ({
                    id: note.id,
                    label: note.label,
                  }))}
                />
              </section>
            )}
          </FormFieldset>

          <FormFieldset
            className="whiskey-finder__fieldset"
            legendClassName="whiskey-finder__legend"
            helperTextClassName="whiskey-finder__helper-text"
            legend="Price Range"
            helperText="Optional"
          >
            <SelectField
              className="whiskey-finder__select"
              options={PRICE_RANGES}
              value={preferences.priceRange}
              onChange={handlePriceChange}
              placeholderLabel="Any Price"
            />
          </FormFieldset>

          <FormFieldset
            className="whiskey-finder__fieldset"
            legendClassName="whiskey-finder__legend"
            helperTextClassName="whiskey-finder__helper-text"
            legend="Country of Origin"
            helperText="Optional"
          >
            <SelectField
              className="whiskey-finder__select"
              options={COUNTRIES}
              value={preferences.country}
              onChange={handleCountryChange}
              placeholderLabel="Any Country"
            />
          </FormFieldset>

          <PrimaryButton
            className="whiskey-finder__submit"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Finding Your Whiskey..." : "Find My Whiskey"}
          </PrimaryButton>
        </form>

        {isLoading && (
          <section className="whiskey-finder__loading">
            <WhiskeyLoader />

            <SectionTitle className="whiskey-finder__loading-title">
              Finding Your Perfect Pour...
            </SectionTitle>

            <p className="whiskey-finder__loading-text">
              Searching our collection for the best matches.
            </p>
          </section>
        )}

        {hasSearched && recommendations.length > 0 && (
          <section className="whiskey-finder__results">
            <SectionTitle className="whiskey-finder__results-title">
              Your Whiskey Matches
            </SectionTitle>

            <WhiskeyCardList
              whiskeys={recommendations}
              onViewDetails={handleViewDetails}
              viewDetailsSource="recommendations"
              showRank
              animateStagger
            />
          </section>
        )}

        {hasSearched && !isLoading && recommendations.length === 0 && (
          <section className="whiskey-finder__empty">
            <SectionTitle className="whiskey-finder__empty-title">
              No Matches Found
            </SectionTitle>

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
            <SectionTitle className="whiskey-finder__results-title">
              Search Results
            </SectionTitle>

            <WhiskeyCardList
              whiskeys={searchResults}
              onViewDetails={handleViewDetails}
              showTags={false}
            />
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
              <Eyebrow className="whiskey-finder__eyebrow">
                Personalized Recommendations
              </Eyebrow>

              <SectionTitle className="whiskey-finder__results-title">
                Your Whiskey Matches
              </SectionTitle>
            </div>

            <CloseButton
              className="whiskey-finder__results-modal-close"
              onClick={handleCloseResultsModal}
              label="Close whiskey recommendations"
            />
          </div>

          <WhiskeyCardList
            whiskeys={recommendations}
            onViewDetails={handleViewDetails}
            viewDetailsSource="recommendations"
            showRank
          />
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

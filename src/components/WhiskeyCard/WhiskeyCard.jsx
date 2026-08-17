import { getFlavorNoteLabel } from "../../utils/flavorHelpers";
import { getTagLabel } from "../../utils/tagHelpers";
import {
  MapPin,
  FlaskConical,
  DollarSign,
} from "lucide-react";

import "./WhiskeyCard.css";

function WhiskeyCard({
  whiskey,
  rank,
  onViewDetails,
  showTags = true,
}) {
  const isRecommendation = showTags;

  return (
    <article className="whiskey-card">
      <div className="whiskey-card__accent" />

      <div className="whiskey-card__content">
        <div className="whiskey-card__top">
          {isRecommendation && (
            <p className="whiskey-card__recommendation-label">
              Recommended Pour
            </p>
          )}

          {rank && isRecommendation && (
            <span className="whiskey-card__rank">
              #{rank} Match
            </span>
          )}
        </div>

        <div className="whiskey-card__heading">
          <h4 className="whiskey-card__name">
            {whiskey.name}
          </h4>

          <p className="whiskey-card__distillery">
            {whiskey.distillery}
          </p>
        </div>

        <div className="whiskey-card__location">
          <MapPin
            size={15}
            className="whiskey-card__icon"
            aria-hidden="true"
          />

          <span>{whiskey.location}</span>
        </div>

        <div className="whiskey-card__facts">
          <div className="whiskey-card__fact">
            <div className="whiskey-card__fact-label">
              <FlaskConical
                size={14}
                className="whiskey-card__fact-icon"
                aria-hidden="true"
              />

              <span>ABV</span>
            </div>

            <p className="whiskey-card__fact-value">
              {whiskey.abv}%
            </p>
          </div>

          <div className="whiskey-card__fact">
            <div className="whiskey-card__fact-label">
              <DollarSign
                size={14}
                className="whiskey-card__fact-icon"
                aria-hidden="true"
              />

              <span>Pour</span>
            </div>

            <p className="whiskey-card__fact-value">
              ${whiskey.price}
            </p>
          </div>

          <div className="whiskey-card__fact">
            <div className="whiskey-card__fact-label">
              <span>Age</span>
            </div>

            <p className="whiskey-card__fact-value">
              {whiskey.age
                ? `${whiskey.age} yr${whiskey.age === 1 ? "" : "s"}`
                : "NAS"}
            </p>
          </div>
        </div>

        {showTags && whiskey.tags?.length > 0 && (
          <div className="whiskey-card__badges">
            {whiskey.tags.map((tag) => (
              <span
                key={tag}
                className={`whiskey-card__badge whiskey-card__badge--${tag}`}
              >
                {getTagLabel(tag)}
              </span>
            ))}
          </div>
        )}

        {showTags && whiskey.matchingNotes?.length > 0 && (
          <div className="whiskey-card__matches">
            <p className="whiskey-card__matches-title">
              Your Flavor Matches
            </p>

            <ul className="whiskey-card__matches-list">
              {whiskey.matchingNotes.map((note) => (
                <li
                  className="whiskey-card__match"
                  key={note}
                >
                  {getFlavorNoteLabel(note)}
                </li>
              ))}
            </ul>
          </div>
        )}

        {whiskey.description && (
          <p className="whiskey-card__description">
            {whiskey.description}
          </p>
        )}

        <button
          className="whiskey-card__button"
          type="button"
          onClick={() => onViewDetails(whiskey)}
        >
          View Details
        </button>
      </div>
    </article>
  );
}

export default WhiskeyCard;
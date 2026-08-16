import { getFlavorNoteLabel } from "../../utils/flavorHelpers";
import { getTagLabel } from "../../utils/tagHelpers";
import { MapPin, FlaskConical, DollarSign } from "lucide-react";
import "./WhiskeyCard.css";

function WhiskeyCard({
  whiskey,
  onViewDetails,
  rank,
}) {
  return (
    <article className="whiskey-card">
      <div className="whiskey-card__accent" />

      {rank && (
        <div className="whiskey-card__score">
          #{rank} Match
        </div>
      )}

      <div className="whiskey-card__content">
        <div className="whiskey-card__heading">
          <p className="whiskey-card__eyebrow">
            Recommended Pour
          </p>

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
            className="whiskey-card__location-icon"
          />

          <span>{whiskey.location}</span>
        </div>

        <div className="whiskey-card__stats">
          <div className="whiskey-card__stat">
            <FlaskConical
              size={15}
              className="whiskey-card__stat-icon"
            />

            <div>
              <span className="whiskey-card__stat-label">
                ABV
              </span>

              <span className="whiskey-card__stat-value">
                {whiskey.abv}%
              </span>
            </div>
          </div>

          <div className="whiskey-card__stat">
            <DollarSign
              size={15}
              className="whiskey-card__stat-icon"
            />

            <div>
              <span className="whiskey-card__stat-label">
                Pour
              </span>

              <span className="whiskey-card__stat-value">
                ${whiskey.price}
              </span>
            </div>
          </div>

          {whiskey.age && (
            <div className="whiskey-card__stat">
              <div>
                <span className="whiskey-card__stat-label">
                  Age
                </span>

                <span className="whiskey-card__stat-value">
                  {whiskey.age} yr
                </span>
              </div>
            </div>
          )}
        </div>

        {whiskey.tags?.length > 0 && (
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

        {whiskey.matchingNotes?.length > 0 && (
          <div className="whiskey-card__matches">
            <p className="whiskey-card__matches-title">
              Flavor Matches
            </p>

            <ul className="whiskey-card__matches-list">
              {whiskey.matchingNotes
                .slice(0, 5)
                .map((note) => (
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
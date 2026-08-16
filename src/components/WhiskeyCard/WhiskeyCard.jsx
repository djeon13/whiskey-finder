import { getFlavorNoteLabel } from "../../utils/flavorHelpers";
import { getTagLabel } from "../../utils/tagHelpers";
import { MapPin, FlaskConical, DollarSign } from "lucide-react";
import "./WhiskeyCard.css";

function WhiskeyCard({ whiskey, onViewDetails }) {
  return (
    <article className="whiskey-card">
      <div className="whiskey-card__content">
        <div className="whiskey-card__heading">
          <h4 className="whiskey-card__name">{whiskey.name}</h4>

          <p className="whiskey-card__distillery">{whiskey.distillery}</p>
        </div>

        <div className="whiskey-card__details">
          <div className="whiskey-card__chip">
            <MapPin size={15} className="whiskey-card__chip-icon" />

            <span className="whiskey-card__chip-text">{whiskey.location}</span>
          </div>

          <div className="whiskey-card__chip">
            <FlaskConical size={15} className="whiskey-card__chip-icon" />
            <span>{whiskey.abv}% ABV</span>
          </div>

          <div className="whiskey-card__chip">
            <DollarSign size={15} className="whiskey-card__chip-icon" />
            <span>${whiskey.price} / pour</span>
          </div>
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
            <p className="whiskey-card__matches-title">Your Flavor Matches</p>

            <ul className="whiskey-card__matches-list">
              {whiskey.matchingNotes.map((note) => (
                <li className="whiskey-card__match" key={note}>
                  {getFlavorNoteLabel(note)}
                </li>
              ))}
            </ul>
          </div>
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

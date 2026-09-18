import { getFlavorNoteLabel, getTagLabel } from "@utils";
import { MapPin, FlaskConical, DollarSign } from "lucide-react";
import type { RecommendedWhiskey } from "@types";
import { Stat, Badge, PrimaryButton } from "@components/atoms";
import { PillList } from "@components/molecules";

import "./WhiskeyCard.css";

interface WhiskeyCardProps {
  whiskey: RecommendedWhiskey;
  rank?: number;
  onViewDetails: (whiskey: RecommendedWhiskey) => void;
  showTags?: boolean;
}

function WhiskeyCard({
  whiskey,
  rank,
  onViewDetails,
  showTags = true,
}: WhiskeyCardProps) {
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
            <Badge className="whiskey-card__rank">#{rank} Match</Badge>
          )}
        </div>

        <div className="whiskey-card__heading">
          <h4 className="whiskey-card__name">{whiskey.name}</h4>

          <p className="whiskey-card__distillery">{whiskey.distillery}</p>
        </div>

        <div className="whiskey-card__location">
          <MapPin size={15} className="whiskey-card__icon" aria-hidden="true" />

          <span>{whiskey.location}</span>
        </div>

        <div className="whiskey-card__facts">
          <Stat
            className="whiskey-card__fact"
            labelClassName="whiskey-card__fact-label"
            valueClassName="whiskey-card__fact-value"
            icon={
              <FlaskConical
                size={14}
                className="whiskey-card__fact-icon"
                aria-hidden="true"
              />
            }
            label="ABV"
            value={`${whiskey.abv}%`}
          />

          <Stat
            className="whiskey-card__fact"
            labelClassName="whiskey-card__fact-label"
            valueClassName="whiskey-card__fact-value"
            icon={
              <DollarSign
                size={14}
                className="whiskey-card__fact-icon"
                aria-hidden="true"
              />
            }
            label="Pour"
            value={`$${whiskey.price} / ${whiskey.pourSize ?? 1.5} oz`}
          />

          <Stat
            className="whiskey-card__fact"
            labelClassName="whiskey-card__fact-label"
            valueClassName="whiskey-card__fact-value"
            label="Age"
            value={
              whiskey.age
                ? `${whiskey.age} yr${whiskey.age === 1 ? "" : "s"}`
                : "NAS"
            }
          />
        </div>

        {showTags && whiskey.tags.length > 0 && (
          <div className="whiskey-card__badges">
            {whiskey.tags.map((tag) => (
              <Badge
                key={tag}
                className={`whiskey-card__badge whiskey-card__badge--${tag}`}
              >
                {getTagLabel(tag)}
              </Badge>
            ))}
          </div>
        )}

        {showTags && (whiskey.matchingNotes?.length ?? 0) > 0 && (
          <div className="whiskey-card__matches">
            <p className="whiskey-card__matches-title">Your Flavor Matches</p>

            <PillList
              className="whiskey-card__matches-list"
              itemClassName="whiskey-card__match"
              items={(whiskey.matchingNotes ?? []).map((note) => ({
                id: note,
                label: getFlavorNoteLabel(note),
              }))}
            />
          </div>
        )}

        {whiskey.description && (
          <p className="whiskey-card__description">{whiskey.description}</p>
        )}

        <PrimaryButton
          className="whiskey-card__button"
          onClick={() => onViewDetails(whiskey)}
        >
          View Details
        </PrimaryButton>
      </div>
    </article>
  );
}

export default WhiskeyCard;

import type { RecommendedWhiskey } from "../../types";
import WhiskeyCard from "../WhiskeyCard/WhiskeyCard";

export interface WhiskeyCardListProps {
  whiskeys: RecommendedWhiskey[];
  onViewDetails: (whiskey: RecommendedWhiskey, source?: string) => void;
  showRank?: boolean;
  showTags?: boolean;
  viewDetailsSource?: string;
  animateStagger?: boolean;
  className?: string;
  itemClassName?: string;
}

export function WhiskeyCardList({
  whiskeys,
  onViewDetails,
  showRank = false,
  showTags = true,
  viewDetailsSource,
  animateStagger = false,
  className = "whiskey-finder__results-list",
  itemClassName = "whiskey-finder__results-item",
}: WhiskeyCardListProps) {
  return (
    <ul className={className}>
      {whiskeys.map((whiskey, index) => (
        <li
          key={whiskey.id}
          className={itemClassName}
          style={
            animateStagger
              ? { animationDelay: `${index * 180}ms` }
              : undefined
          }
        >
          <WhiskeyCard
            whiskey={whiskey}
            rank={showRank ? index + 1 : undefined}
            showTags={showTags}
            onViewDetails={(selected) =>
              onViewDetails(selected, viewDetailsSource)
            }
          />
        </li>
      ))}
    </ul>
  );
}

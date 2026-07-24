import WhiskeyLoader from "../WhiskeyLoader/WhiskeyLoader";

import "./BartenderRecommendation.css";

function BartenderRecommendation({
  isLoading,
  message,
  error,
  onAsk,
  onClose,
}) {
  return (
    <section className="bartender">
      {!isLoading &&
        !message &&
        !error && (
          <button
            className="bartender__button"
            type="button"
            onClick={onAsk}
          >
            ✨ Ask the Bartender
          </button>
        )}

      {isLoading && (
        <div className="bartender__loader">
          <WhiskeyLoader />
        </div>
      )}

      {(message || error) && (
        <article className="bartender__bubble">
          <div className="bartender__header">
            <h3 className="bartender__title">
              Bartender's Recommendation
            </h3>

            <button
              className="bartender__close"
              type="button"
              onClick={onClose}
              aria-label="Close bartender recommendation"
            >
              ✕
            </button>
          </div>

          <p className="bartender__message">
            {message || error}
          </p>
        </article>
      )}
    </section>
  );
}

export default BartenderRecommendation;
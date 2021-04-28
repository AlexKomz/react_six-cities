import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import {convertRaitingIntoPercent} from "../../utils";


class OfferCard extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isFavorite: this.props.offer.isFavorite,
    };
  }

  render() {
    const {
      offer,
      onMouseEnter,
      onMouseLeave,
    } = this.props;

    const {isFavorite} = this.state;

    const {
      isPremium,
      previewImage,
      price,
      rating,
      title,
      type
    } = offer;

    const boormarkBtnClasses = classNames({
      "place-card__bookmark-button": true,
      "place-card__bookmark-button--active": isFavorite,
      "button": true
    });

    return (
      <article
        className="cities__place-card place-card"
        onMouseEnter={() => {
          onMouseEnter(offer);
        }}
        onMouseLeave={onMouseLeave}
      >
        {isPremium && (
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
        )}
        <div className="cities__image-wrapper place-card__image-wrapper">
          <a href="#">
            <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place image"/>
          </a>
        </div>
        <div className="place-card__info">
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">&euro;{price}</b>
              <span className="place-card__price-text">&#47;&nbsp;night</span>
            </div>
            <button className={boormarkBtnClasses} type="button">
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">{isFavorite ? `In` : `To`} bookmarks</span>
            </button>
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span
                style={{
                  width: convertRaitingIntoPercent(rating) + `%`
                }}>
              </span>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name">
            <a href="#">{title}</a>
          </h2>
          <p className="place-card__type">{type}</p>
        </div>
      </article>
    );
  }
}

OfferCard.propTypes = {
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  offer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    isPremium: PropTypes.bool.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    previewImage: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
};


export default OfferCard;

import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import {convertRaitingIntoPercent} from "../../utils";


export default class OfferCard extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      inBookmarks: false,
    };
  }

  render() {
    const {
      offer,
      onMouseEnter,
      onMouseLeave,
    } = this.props;
    const {inBookmarks} = this.state;
    const {
      isPremium,
      image,
      price,
      rating,
      name,
      type
    } = offer;
    const boormarkBtnClasses = classNames({
      "place-card__bookmark-button": true,
      "place-card__bookmark-button--active": inBookmarks,
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
            <img className="place-card__image" src={image.src} width="260" height="200" alt="Place image"/>
          </a>
        </div>
        <div className="place-card__info">
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">&euro;{price.value}</b>
              <span className="place-card__price-text">&#47;&nbsp;{price.text}</span>
            </div>
            <button className={boormarkBtnClasses} type="button">
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">{inBookmarks ? `In` : `To`} bookmarks</span>
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
            <a href="#">{name}</a>
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
    id: PropTypes.string.isRequired,
    city: PropTypes.shape({
      name: PropTypes.string.isRequired,
      coords: PropTypes.array.isRequired,
    }).isRequired,
    isPremium: PropTypes.bool.isRequired,
    image: PropTypes.shape({src: PropTypes.string.isRequired}).isRequired,
    price: PropTypes.shape({
      value: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired,
    rating: PropTypes.oneOf([1, 2, 3, 4, 5]).isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    coords: PropTypes.array.isRequired,
  }).isRequired,
};

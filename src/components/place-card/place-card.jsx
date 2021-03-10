import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import {convertRaitingIntoPercent} from "../../utils";


class PlaceCard extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isPremium: false,
      inBookmarks: false,
    };
  }

  render() {
    const {onHover, offer} = this.props;
    const {inBookmarks} = this.state;

    const {image, price} = offer;

    const boormarkBtnClasses = [
      `place-card__bookmark-button`,
      `${inBookmarks ? `place-card__bookmark-button--active` : ``}`,
      `button`
    ];

    return (
      <article
        className="cities__place-card place-card"
        onMouseOver={onHover(this)}
      >
        {this._hasPremiumMark()}
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
            <button className={boormarkBtnClasses.join(` `)} type="button">
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">{inBookmarks ? `In` : `To`} bookmarks</span>
            </button>
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={`width: ${convertRaitingIntoPercent(offer.rating)}%`}></span>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name">
            <a href="#">{offer.name}</a>
          </h2>
          <p className="place-card__type">{offer.type}</p>
        </div>
      </article>
    );
  }

  _hasPremiumMark() {
    const {isPremium} = this.state;

    return isPremium ? (
      <div className="place-card__mark">
        <span>Premium</span>
      </div>
    ) : null;
  }
}

PlaceCard.propTypes = {
  onHover: PropTypes.func.isRequired,
  offer: PropTypes.shape({
    image: PropTypes.shape({src: PropTypes.string.isRequired}).isRequired,
    price: PropTypes.shape({
      value: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired,
    rating: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
};


export default PlaceCard;

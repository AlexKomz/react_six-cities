import React, {Fragment} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {connect} from "react-redux";

import OfferCard from "../offer-card/offer-card.jsx";
import Map from "../map/map.jsx";

import {ActionCreator} from "../../reducer/data/data.js";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";
import {getOfferByID} from "../../utils.js";
import {CardType, AppRoute, Calculations} from "../../const.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import {convertRaitingIntoPercent, extend, distanceBetweenPointsInMeters} from "../../utils";
import history from "../../history.js";


const Property = (props) => {
  const {
    match,
    offers,
    onFavoriteButtonClick,
    authorizationStatus,
    currentOffer,
    onMouseEnter,
    onMouseLeave,
  } = props;

  const id = Number(match.params.id);

  const selectedOffer = getOfferByID(offers, id);

  const {
    images,
    isPremium,
    isFavorite,
    title,
    rating,
    type,
    bedrooms,
    maxAdults,
    price,
    goods,
    host,
    description,
  } = selectedOffer;

  const {zoom} = selectedOffer.city.location;
  const {location} = selectedOffer;
  const centerCoords = [location.latitude, location.longitude];

  const boormarkBtnClasses = classNames({
    "property__bookmark-button": true,
    "property__bookmark-button--active": isFavorite,
    "button": true,
  });

  const offersWithoutCurrent = offers.filter((offer) => offer.id !== id);
  const nearestOffers = offersWithoutCurrent.sort((left, right) => {
    return distanceBetweenPointsInMeters(left.location, location) - distanceBetweenPointsInMeters(right.location, location);
  }).slice(0, 3);

  return (
    <Fragment>
      <section className="property">
        <div className="property__gallery-container container">
          <div className="property__gallery">
            {images.slice(0, 6).map((image, i) => (
              <div
                key={`${image}-${i}`}
                className="property__image-wrapper"
              >
                <img className="property__image" src={image} alt="Photo studio" />
              </div>
            ))}
          </div>
        </div>
        <div className="property__container container">
          <div className="property__wrapper">
            {isPremium && (
              <div className="property__mark">
                <span>Premium</span>
              </div>
            )}
            <div className="property__name-wrapper">
              <h1 className="property__name">
                {title}
              </h1>
              <button
                className={boormarkBtnClasses}
                type="button"
                onClick={(evt) => {
                  evt.stopPropagation();

                  if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
                    history.push(AppRoute.LOGIN);
                    return;
                  }

                  onFavoriteButtonClick(extend(selectedOffer, {isFavorite: !isFavorite}));
                }}
              >
                <svg className="property__bookmark-icon" width="31" height="33">
                  <use xlinkHref="#icon-bookmark"></use>
                </svg>
                <span className="visually-hidden">{isFavorite ? `In` : `To`} bookmarks</span>
              </button>
            </div>
            <div className="property__rating rating">
              <div className="property__stars rating__stars">
                <span style={{
                  width: convertRaitingIntoPercent(rating) + `%`
                }}></span>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="property__rating-value rating__value">{rating}</span>
            </div>
            <ul className="property__features">
              <li className="property__feature property__feature--entire">
                {type}
              </li>
              <li className="property__feature property__feature--bedrooms">
                {bedrooms} Bedrooms
              </li>
              <li className="property__feature property__feature--adults">
              Max {maxAdults} adults
              </li>
            </ul>
            <div className="property__price">
              <b className="property__price-value">&euro;{price}</b>
              <span className="property__price-text">&nbsp;night</span>
            </div>
            <div className="property__inside">
              <h2 className="property__inside-title">What&apos;s inside</h2>
              <ul className="property__inside-list">
                {goods.map((good, i) => (
                  <li
                    key={`${good}-${i}`}
                    className="property__inside-item"
                  >
                    {good}
                  </li>
                ))}
              </ul>
            </div>
            <div className="property__host">
              <h2 className="property__host-title">Meet the host</h2>
              <div className="property__host-user user">
                <div
                  className={`property__avatar-wrapper user__avatar-wrapper ${host.isPro ? `property__avatar-wrapper--pro` : ``}`}
                >
                  <img className="property__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt="Host avatar" />
                </div>
                <span className="property__user-name">
                  {host.name}
                </span>
              </div>
              <div className="property__description">
                <p className="property__text">
                  {description}
                </p>
              </div>
            </div>
            <section className="property__reviews reviews">
              <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">0</span></h2>
              {(authorizationStatus === AuthorizationStatus.AUTH) ? (
                <form className="reviews__form form" action="#" method="post">
                  <label className="reviews__label form__label" htmlFor="review">Your review</label>
                  <div className="reviews__rating-form form__rating">
                    <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio" />
                    <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
                      <svg className="form__star-image" width="37" height="33">
                        <use xlinkHref="#icon-star"></use>
                      </svg>
                    </label>

                    <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio" />
                    <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
                      <svg className="form__star-image" width="37" height="33">
                        <use xlinkHref="#icon-star"></use>
                      </svg>
                    </label>

                    <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio" />
                    <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
                      <svg className="form__star-image" width="37" height="33">
                        <use xlinkHref="#icon-star"></use>
                      </svg>
                    </label>

                    <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio" />
                    <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
                      <svg className="form__star-image" width="37" height="33">
                        <use xlinkHref="#icon-star"></use>
                      </svg>
                    </label>

                    <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio" />
                    <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
                      <svg className="form__star-image" width="37" height="33">
                        <use xlinkHref="#icon-star"></use>
                      </svg>
                    </label>
                  </div>
                  <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"></textarea>
                  <div className="reviews__button-wrapper">
                    <p className="reviews__help">
                      To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
                    </p>
                    <button className="reviews__submit form__submit button" type="submit" disabled="">Submit</button>
                  </div>
                </form>
              ) : ``}
            </section>
          </div>
        </div>
        <section className="property__map map">
          {<Map
            offers={nearestOffers}
            currentOffer={currentOffer}
            centerCoords={centerCoords}
            zoom={zoom}
            circle={{
              color: `lightblue`,
              fillColor: `lightblue`,
              fillOpacity: 0.3,
              radius: Calculations.RADIUS,
            }}
          />}
        </section>
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <div className="near-places__list places__list">
            {nearestOffers.map((offer) => (
              <OfferCard
                key={offer.id}
                offer={offer}
                cardType={CardType.NEAR_PLACES}
                imgSize={{
                  width: 260,
                  height: 200,
                }}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
              />
            ))}
          </div>
        </section>
      </div>
    </Fragment>
  );
};

Property.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }),
  offers: PropTypes.array.isRequired,
  onFavoriteButtonClick: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  currentOffer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    city: PropTypes.shape({
      name: PropTypes.string.isRequired,
      location: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
        zoom: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired,
    location: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      zoom: PropTypes.number.isRequired,
    }).isRequired,
  }),
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  onFavoriteButtonClick: (offer) => {
    dispatch(ActionCreator.updateOffers(offer));
  },
});


export {Property};
export default connect(mapStateToProps, mapDispatchToProps)(Property);

import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {connect} from "react-redux";

import {AuthorizationStatus} from "../../reducer/user/user.js";
import {ActionCreator} from "../../reducer/data/data.js";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";
import {convertRaitingIntoPercent, extend} from "../../utils";
import {CardType, AppRoute} from "../../const.js";
import history from "../../history.js";


class OfferCard extends PureComponent {
  render() {
    const {
      offer,
      cardType,
      imgSize,
      onMouseEnter,
      onMouseLeave,
      onFavoriteButtonClick,
      authorizationStatus,
    } = this.props;

    const {
      isPremium,
      isFavorite,
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
        className={
          cardType === CardType.FAVORITE
            ? cardType + `__card place-card`
            : cardType + `__place-card place-card`
        }
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
        <div className={cardType + `__image-wrapper place-card__image-wrapper`}>
          <a href="#">
            <img className="place-card__image" src={previewImage} width={imgSize.width} height={imgSize.height} alt="Place image"/>
          </a>
        </div>
        <div className={
          cardType === CardType.FAVORITE
            ? cardType + `__card__info`
            : `` + `place-card__info`
        }>
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">&euro;{price}</b>
              <span className="place-card__price-text">&#47;&nbsp;night</span>
            </div>
            <button
              className={boormarkBtnClasses}
              type="button"
              onClick={() => {
                if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
                  history.push(AppRoute.LOGIN);
                  return;
                }

                onFavoriteButtonClick(extend(offer, {isFavorite: !isFavorite}));
              }}
            >
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
  imgSize: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired,
  onFavoriteButtonClick: PropTypes.func.isRequired,
  cardType: PropTypes.string.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  onFavoriteButtonClick: (offer) => {
    dispatch(ActionCreator.updateOffers(offer));
  },
});


export {OfferCard};
export default connect(mapStateToProps, mapDispatchToProps)(OfferCard);

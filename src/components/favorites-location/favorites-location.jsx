import React from "react";
import PropTypes from "prop-types";

import OfferCard from "../offer-card/offer-card.jsx";

import {CardType} from "../../const.js";


const FavoritesLocation = (props) => {
  const {city, offers} = props;

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{city}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {offers.map((offer) => (
          <OfferCard
            key={offer.id}
            offer={offer}
            cardType={CardType.FAVORITE}
            imgSize={{
              width: 150,
              height: 110,
            }}
            onMouseEnter={() => {}}
            onMouseLeave={() => {}}
          />
        ))}
      </div>
    </li>
  );
};

FavoritesLocation.propTypes = {
  city: PropTypes.string.isRequired,
  offers: PropTypes.array.isRequired,
};


export default FavoritesLocation;

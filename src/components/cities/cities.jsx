import React from "react";
import PropTypes from "prop-types";

import Places from "../places/places.jsx";
import Map from "../map/map.jsx";

import withSort from "../../hocs/with-sort/with-sort.js";

import {filteringOffersByCity} from "../../utils.js";


const PlacesWrapped = withSort(Places);

const Cities = (props) => {
  const {
    city,
    offers,
    currentOffer,
    onMouseEnter,
    onMouseLeave,
  } = props;

  const filteredOffers = filteringOffersByCity(offers, city);
  const offersCount = filteredOffers.length;

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <PlacesWrapped
          offersCount={offersCount}
          city={city}
          offers={filteredOffers}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />
        <div className="cities__right-section">
          {<Map
            offers={filteredOffers}
            currentOffer={currentOffer}
          />}
        </div>
      </div>
    </div>
  );
};

Cities.propTypes = {
  city: PropTypes.string.isRequired,
  offers: PropTypes.array.isRequired,
  currentOffer: PropTypes.shape({
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
  }),
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
};


export default Cities;

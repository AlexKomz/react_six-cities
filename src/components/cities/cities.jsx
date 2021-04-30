import React from "react";
import PropTypes from "prop-types";

import Places from "../places/places.jsx";
import Map from "../map/map.jsx";

import withSort from "../../hocs/with-sort/with-sort.js";


const PlacesWrapped = withSort(Places);

const Cities = (props) => {
  const {
    city,
    offers,
    currentOffer,
    onMouseEnter,
    onMouseLeave,
  } = props;

  const offersCount = offers.length;

  const {location} = offers[0].city;
  const centerCoords = [location.latitude, location.longitude];

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <PlacesWrapped
          offersCount={offersCount}
          city={city}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />
        <div className="cities__right-section">
          <section className="cities__map map">
            {<Map
              offers={offers}
              currentOffer={currentOffer}
              centerCoords={centerCoords}
              zoom={location.zoom}
            />}
          </section>
        </div>
      </div>
    </div>
  );
};

Cities.propTypes = {
  city: PropTypes.string.isRequired,
  offers: PropTypes.array.isRequired,
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


export default Cities;

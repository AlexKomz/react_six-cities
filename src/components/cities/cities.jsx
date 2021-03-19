import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import Places from "../places/places.jsx";
import Map from "../map/map.jsx";

import {filteringOffersByCity} from "../../utils.js";


export default class Cities extends PureComponent {
  constructor(props) {
    super(props);

    this._mouseEnterHandler = this._mouseEnterHandler.bind(this);
    this._mouseLeaveHandler = this._mouseLeaveHandler.bind(this);

    this.state = {
      currentOffer: null,
    };
  }

  render() {
    const {city, offers} = this.props;
    const {currentOffer} = this.state;
    const filteredOffers = filteringOffersByCity(offers, city);
    const offersCount = filteredOffers.length;

    return (
      <div className="cities">
        <div className="cities__places-container container">
          <Places
            offersCount={offersCount}
            city={city}
            offers={filteredOffers}
            onMouseEnter={this._mouseEnterHandler}
            onMouseLeave={this._mouseLeaveHandler}
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
  }

  _mouseEnterHandler(current) {
    this.setState({
      currentOffer: current,
    });
  }

  _mouseLeaveHandler() {
    this.setState({
      currentOffer: null,
    });
  }
}

Cities.propTypes = {
  city: PropTypes.string.isRequired,
  offers: PropTypes.array.isRequired,
};

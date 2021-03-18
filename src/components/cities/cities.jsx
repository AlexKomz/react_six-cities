import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import OffersList from "../offers-list/offers-list.jsx";
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
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{offersCount} places to stay in {city}</b>
            <form className="places__sorting" action="#" method="get">
              <span className="places__sorting-caption">Sort by</span>
              <span className="places__sorting-type" tabIndex={0}>
                    Popular
                <svg className="places__sorting-arrow" width={7} height={4}>
                  <use xlinkHref="#icon-arrow-select" />
                </svg>
              </span>
              <ul className="places__options places__options--custom places__options--opened">
                <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                <li className="places__option" tabIndex={0}>Price: low to high</li>
                <li className="places__option" tabIndex={0}>Price: high to low</li>
                <li className="places__option" tabIndex={0}>Top rated first</li>
              </ul>
            </form>
            {<OffersList
              city={city}
              offers={filteredOffers}
              onMouseEnter={this._mouseEnterHandler}
              onMouseLeave={this._mouseLeaveHandler}
            />}
          </section>
          <div className="cities__right-section">
            <section className="cities__map map">
              {<Map
                offers={filteredOffers}
                currentOffer={currentOffer}
              />}
            </section>
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

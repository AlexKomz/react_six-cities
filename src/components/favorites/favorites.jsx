import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import FavoritesLocation from "../favorites-location/favorites-location.jsx";


class Favorites extends PureComponent {
  render() {
    return (
      <div className="page__favorites-container container">
        {this._renderFavoritesScreen()}
      </div>
    );
  }

  _renderFavoritesScreen() {
    const {
      offers,
    } = this.props;
    const offersCount = offers.length;

    const groupedOffersByCity = Object.values(offers.reduce((reducedOffers, offer) => {
      const city = offer.city.name;

      reducedOffers[city] = [...(reducedOffers[city] ? reducedOffers[city] : []), offer];

      return reducedOffers;
    }, {}));

    if (offersCount === 0) {
      return (
        <section className="favorites favorites--empty">
          <h1 className="visually-hidden">Favorites (empty)</h1>
          <div className="favorites__status-wrapper">
            <b className="favorites__status">Nothing yet saved.</b>
            <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
          </div>
        </section>
      );
    }

    return (
      <section className="favorites">
        <h1 className="favorites__title">Saved listing</h1>
        <ul className="favorites__list">
          {groupedOffersByCity.map((group, i) => {
            const city = group[0].city.name;

            return (
              <FavoritesLocation
                key={`${city}-${i}`}
                city={city}
                offers={group}
              />
            );
          })}
        </ul>
      </section>
    );
  }
}

Favorites.propTypes = {
  offers: PropTypes.array.isRequired,
};


export default Favorites;

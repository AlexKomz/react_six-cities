import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import classNames from "classnames";

import EmptyScreen from "../empty-screen/empty-screen.jsx";
import LocationTabsList from "../locations-tabs-list/locations-tabs-list.jsx";
import Cities from "../cities/cities.jsx";

import withHoverOffer from "../../hocs/with-hover-offer/with-hover-offer.js";

import {ActionCreator} from "../../reducer/main/main.js";
import {getCity, getFilteredOffers} from "../../reducer/main/selectors.js";


const CitiesWrapped = withHoverOffer(Cities);

class App extends PureComponent {
  render() {
    return (
      <div className="page page--gray page--main">
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <a className="header__logo-link header__logo-link--active">
                  <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width={81} height={41} />
                </a>
              </div>
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <a className="header__nav-link header__nav-link--profile" href="#">
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>
        {this._renderOffersScreen()}
      </div>
    );
  }

  _renderOffersScreen() {
    const {
      city,
      onTabClick,
      offers,
    } = this.props;

    const offersCount = offers.length;

    let component = (
      <CitiesWrapped
        city={city}
        offers={offers}
      />
    );

    if (offersCount === 0) {
      component = (
        <EmptyScreen
          city={city}
        />
      );
    }

    const mainClasses = classNames({
      "page__main": true,
      "page__main--index": true,
      "page__main--index-empty": offersCount === 0,
    });

    return (
      <main className={mainClasses}>
        <h1 className="visually-hidden">Cities</h1>
        {<LocationTabsList
          activeCity={city}
          onTabClick={onTabClick}
        />}
        {component}
      </main>
    );
  }
}

App.propTypes = {
  city: PropTypes.string.isRequired,
  offers: PropTypes.array.isRequired,
  onTabClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  city: getCity(state),
  offers: getFilteredOffers(state),
});

const mapDispatchToProps = (dispatch) => ({
  onTabClick: (city) => {
    dispatch(ActionCreator.changeCity(city));
  },
});


export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);

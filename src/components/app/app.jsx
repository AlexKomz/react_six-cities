import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import LocationList from "../locations-list/locations-list.jsx";
import Cities from "../cities/cities.jsx";

import withHoverOffer from "../../hocs/with-hover-offer/with-hover-offer.js";

import {ActionCreator} from "../../reducer.js";
import {SortType} from "../../consts.js";


const CitiesWrapped = withHoverOffer(Cities);

export const App = (props) => {
  const {
    city,
    offers,
    onTabClick,
    sortType,
    onSortOptionClick,
  } = props;

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
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          {<LocationList
            activeCity={city}
            offers={offers}
            onTabClick={onTabClick}
          />}
        </div>
        {<CitiesWrapped
          city={city}
          offers={offers}
          sortType={sortType}
          onSortOptionClick={onSortOptionClick}
        />}
      </main>
    </div>
  );
};

App.propTypes = {
  city: PropTypes.string.isRequired,
  offers: PropTypes.array.isRequired,
  onTabClick: PropTypes.func.isRequired,
  sortType: PropTypes.oneOf(Object.values(SortType)).isRequired,
  onSortOptionClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  city: state.city,
  offers: state.offers,
  sortType: state.sortType,
});

const mapDispatchToProps = (dispatch) => ({
  onTabClick: (city) => {
    dispatch(ActionCreator.changeCity(city));
  },
  onSortOptionClick: (sortType) => {
    dispatch(ActionCreator.changeSortType(sortType));
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(App);

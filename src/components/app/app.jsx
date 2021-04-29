import React, {PureComponent} from "react";
import {Switch, Route, Router} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import classNames from "classnames";

import Page from "../page/page.jsx";
import Main from "../main/main.jsx";
import Header from "../header/header.jsx";
import EmptyScreen from "../empty-screen/empty-screen.jsx";
import LocationTabsList from "../locations-tabs-list/locations-tabs-list.jsx";
import Cities from "../cities/cities.jsx";

import withHoverOffer from "../../hocs/with-hover-offer/with-hover-offer.js";

import {ActionCreator} from "../../reducer/main/main.js";
import {getCity, getFilteredOffers} from "../../reducer/main/selectors.js";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";
import {AppRoute} from "../../const.js";
import history from "../../history.js";


const CitiesWrapped = withHoverOffer(Cities);

class App extends PureComponent {
  render() {
    return (
      <Router
        history={history}
      >
        <Switch>
          <Route exact path={AppRoute.ROOT}>
            {this._renderIndexScreen()}
          </Route>
        </Switch>
      </Router>
    );
  }

  _renderIndexScreen() {
    const {
      authorizationStatus,
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

    const pageClasses = classNames({
      "page": true,
      "page--gray": true,
      "page--main": true,
    });

    const mainClasses = classNames({
      "page__main": true,
      "page__main--index": true,
      "page__main--index-empty": offersCount === 0,
    });

    return (
      <Page
        pageClasses={pageClasses}
      >
        <Header
          authorizationStatus={authorizationStatus}
          user={null}
        />
        <Main
          mainClasses={mainClasses}
        >
          <LocationTabsList
            activeCity={city}
            onTabClick={onTabClick}
          />
          {component}
        </Main>
      </Page>
    );
  }
}

App.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  offers: PropTypes.array.isRequired,
  onTabClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
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

import React, {PureComponent} from "react";
import {Switch, Route, Router, Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import classNames from "classnames";

import Page from "../page/page.jsx";
import Main from "../main/main.jsx";
import Header from "../header/header.jsx";
import Footer from "../footer/footer.jsx";
import AuthScreen from "../auth-screen/auth-screen.jsx";
import EmptyScreen from "../empty-screen/empty-screen.jsx";
import LocationTabsList from "../locations-tabs-list/locations-tabs-list.jsx";
import Cities from "../cities/cities.jsx";
import Property from "../property/property.jsx";
import Favorites from "../favorites/favorites.jsx";
import PrivateRoute from "../private-route/private-route.jsx";

import withHoverOffer from "../../hocs/with-hover-offer/with-hover-offer.js";

import {ActionCreator} from "../../reducer/main/main.js";
import {AuthorizationStatus, Operation as UserOperation} from "../../reducer/user/user.js";
import {getCity, getFilteredOffers, getFavoritedOffers} from "../../reducer/main/selectors.js";
import {getAuthorizationStatus, getUser} from "../../reducer/user/selectors.js";
import {AppRoute} from "../../const.js";
import history from "../../history.js";


const CitiesWrapped = withHoverOffer(Cities);
const PropertyWrapped = withHoverOffer(Property);

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
          <Route exact path={AppRoute.LOGIN}>
            {this._renderLoginScreen()}
          </Route>
          <Route
            exact
            path={`${AppRoute.PROPERTY}/:id`}
            render={(props) => this._renderPropertyScreen(props)}
          />
          <PrivateRoute
            exact
            path={AppRoute.FAVORITES}
            render={() => this._renderFavoritesScreen()}
          />
        </Switch>
      </Router>
    );
  }

  _renderPropertyScreen(props) {
    const {
      authorizationStatus,
      user,
      offers,
      city,
    } = this.props;

    const pageClasses = classNames({
      "page": true,
    });

    const mainClasses = classNames({
      "page__main": true,
      "page__main--property": true,
    });

    return (
      <Page
        pageClasses={pageClasses}
      >
        <Header
          authorizationStatus={authorizationStatus}
          user={user}
        />
        <Main
          mainClasses={mainClasses}
        >
          <PropertyWrapped
            {...props}
            city={city}
            offers={offers}
          />
        </Main>
      </Page>
    );
  }

  _renderFavoritesScreen() {
    const {
      authorizationStatus,
      user,
      favoriteOffers,
    } = this.props;
    const offersCount = favoriteOffers.length;

    const pageClasses = classNames({
      "page": true,
      "page--favorites-empty": offersCount === 0,
    });

    const mainClasses = classNames({
      "page__main": true,
      "page__main--favorites": true,
      "page__main--favorites-empty": offersCount === 0,
    });

    const footerClasses = classNames({
      "footer": true,
      "container": offersCount > 0,
    });

    return (
      <Page
        pageClasses={pageClasses}
      >
        <Header
          authorizationStatus={authorizationStatus}
          user={user}
        />
        <Main
          mainClasses={mainClasses}
        >
          <Favorites
            offers={favoriteOffers}
          />
        </Main>
        <Footer
          footerClasses={footerClasses}
        />
      </Page>
    );
  }

  _renderLoginScreen() {
    const {
      authorizationStatus,
      user,
      city,
      login,
    } = this.props;

    if (authorizationStatus === AuthorizationStatus.AUTH) {
      return <Redirect to={AppRoute.FAVORITES} />;
    }

    const pageClasses = classNames({
      "page": true,
      "page--gray": true,
      "page--login": true,
    });

    const mainClasses = classNames({
      "page__main": true,
      "page__main--login": true,
    });

    return (
      <Page
        pageClasses={pageClasses}
      >
        <Header
          authorizationStatus={authorizationStatus}
          user={user}
        />
        <Main
          mainClasses={mainClasses}
        >
          <AuthScreen
            city={city}
            onSubmit={login}
          />
        </Main>
      </Page>
    );
  }

  _renderIndexScreen() {
    const {
      authorizationStatus,
      user,
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
          user={user}
        />
        <Main
          mainClasses={mainClasses}
        >
          <h1 className="visually-hidden">Cities</h1>
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
  user: PropTypes.shape({
    avatarUrl: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    isPro: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
  }),
  login: PropTypes.func.isRequired,
  city: PropTypes.string.isRequired,
  offers: PropTypes.array.isRequired,
  favoriteOffers: PropTypes.array.isRequired,
  onTabClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  user: getUser(state),
  city: getCity(state),
  offers: getFilteredOffers(state),
  favoriteOffers: getFavoritedOffers(state),
});

const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    dispatch(UserOperation.login(authData));
  },
  onTabClick: (city) => {
    dispatch(ActionCreator.changeCity(city));
  },
});


export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);

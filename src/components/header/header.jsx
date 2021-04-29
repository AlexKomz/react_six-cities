import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

import {AppRoute} from "../../const.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";


const Header = (props) => {
  const {
    authorizationStatus,
    user,
  } = props;
  const isAuthorized = authorizationStatus === AuthorizationStatus.AUTH;
  const loginClasses = (isAuthorized)
    ? `header__user-name user__name`
    : `header__login`;
  const userName = (isAuthorized && user)
    ? user.email
    : `Sign in`;

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link
              className="header__logo-link header__logo-link--active"
              to={AppRoute.ROOT}
            >
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width={81} height={41} />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <Link
                  className="header__nav-link header__nav-link--profile"
                  to={AppRoute.LOGIN}
                >
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                  </div>
                  <span className={loginClasses}>{userName}</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }),
};


export default Header;

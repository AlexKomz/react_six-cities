import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

import history from "../../history.js";
import {AppRoute} from "../../const.js";


class AuthScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.emailRef = createRef();
    this.passwordRef = createRef();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    const {onSubmit} = this.props;

    evt.preventDefault();

    onSubmit({
      login: this.emailRef.current.value,
      password: this.passwordRef.current.value,
    });

    history.push(AppRoute.ROOT);
  }

  render() {
    const {city} = this.props;

    return (
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">Sign in</h1>
          <form
            className="login__form form"
            action=""
            method="post"
            onSubmit={this.handleSubmit}
          >
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">E-mail</label>
              <input
                className="login__input form__input"
                type="email"
                name="email"
                placeholder="Email"
                required
                ref={this.emailRef}
              />
            </div>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">Password</label>
              <input
                className="login__input form__input"
                type="password"
                name="password"
                placeholder="Password"
                required
                ref={this.passwordRef}
              />
            </div>
            <button className="login__submit form__submit button" type="submit">Sign in</button>
          </form>
        </section>
        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <Link
              className="locations__item-link"
              to={AppRoute.ROOT}
            >
              <span>{city}</span>
            </Link>
          </div>
        </section>
      </div>
    );
  }
}

AuthScreen.propTypes = {
  city: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};


export default AuthScreen;

import React from "react";
import PropTypes from "prop-types";


const Footer = (props) => {
  const {
    footerClasses,
  } = props;

  return (
    <footer className={footerClasses}>
      <a className="footer__logo-link" href="main.html">
        <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
      </a>
    </footer>
  );
};

Footer.propTypes = {
  footerClasses: PropTypes.string.isRequired,
};


export default Footer;

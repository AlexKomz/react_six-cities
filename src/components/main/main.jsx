import React from "react";
import PropTypes from "prop-types";


const Main = (props) => {
  const {
    mainClasses,
    children,
  } = props;

  return (
    <main className={mainClasses}>
      {children}
    </main>
  );
};

Main.propTypes = {
  mainClasses: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
};


export default Main;

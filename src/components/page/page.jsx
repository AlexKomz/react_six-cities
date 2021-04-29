import React from "react";
import PropTypes from "prop-types";


const Page = (props) => {
  const {
    pageClasses,
    children,
  } = props;

  return (
    <div className={pageClasses}>
      {children}
    </div>
  );
};

Page.propTypes = {
  pageClasses: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
};


export default Page;

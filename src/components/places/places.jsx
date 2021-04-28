import React from "react";
import PropTypes from "prop-types";

import Sort from "../sort/sort.jsx";
import OffersList from "../offers-list/offers-list.jsx";

import {SortType} from "../../consts.js";


const Places = (props) => {
  const {
    offersCount,
    city,
    onMouseEnter,
    onMouseLeave,
    sortType,
    onSortOptionClick,
    isSortFormOpened,
    offers,
    onSortLabelClick,
  } = props;

  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{offersCount} places to stay in {city}</b>
      {<Sort
        isSortFormOpened={isSortFormOpened}
        onSortLabelClick={onSortLabelClick}
        sortType={sortType}
        onSortOptionClick={onSortOptionClick}
      />}
      {<OffersList
        offers={offers}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />}
    </section>
  );
};

Places.propTypes = {
  offersCount: PropTypes.number.isRequired,
  city: PropTypes.string.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  sortType: PropTypes.oneOf(Object.values(SortType)).isRequired,
  onSortOptionClick: PropTypes.func.isRequired,
  isSortFormOpened: PropTypes.bool.isRequired,
  offers: PropTypes.array.isRequired,
  onSortLabelClick: PropTypes.func.isRequired,
};


export default Places;

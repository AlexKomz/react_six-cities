import React from "react";
import PropTypes from "prop-types";

import {SortType} from "../../consts";


const Sort = (props) => {
  const {
    isSortFormOpened,
    onSortLabelClick,
    sortType,
    onSortOptionClick
  } = props;

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}
        onClick={onSortLabelClick}
      >
        {sortType}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isSortFormOpened ? `places__options--opened` : ``}`}>
        {Object.values(SortType).map((type, i) => (
          <li
            key={`${type}-${i}`}
            className={`places__option ${sortType === type ? `places__option--active` : ``}`}
            onClick={() => {
              if (sortType === type) {
                return;
              }

              onSortOptionClick(type);
              onSortLabelClick();
            }}
            tabIndex={0}
          >
            {type}
          </li>
        ))}
      </ul>
    </form>
  );
};

Sort.propTypes = {
  isSortFormOpened: PropTypes.bool.isRequired,
  onSortLabelClick: PropTypes.func.isRequired,
  sortType: PropTypes.oneOf(Object.values(SortType)).isRequired,
  onSortOptionClick: PropTypes.func.isRequired,
};


export default Sort;

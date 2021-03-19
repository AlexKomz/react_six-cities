import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import Sort from "../sort/sort.jsx";
import OffersList from "../offers-list/offers-list.jsx";

import {ActionCreator} from "../../reducer.js";
import {SortType} from "../../consts.js";
import {sortingOffers} from "../../utils";


export class Places extends PureComponent {
  constructor(props) {
    super(props);

    this._sortLabelClickHandler = this._sortLabelClickHandler.bind(this);

    this.state = {
      isSortFormOpened: false,
    };
  }

  render() {
    const {
      offersCount,
      city,
      offers,
      onMouseEnter,
      onMouseLeave,
      sortType,
      onSortOptionClick,
    } = this.props;
    const {isSortFormOpened} = this.state;
    const sortedOffers = sortingOffers(offers, sortType);

    return (
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{offersCount} places to stay in {city}</b>
        {<Sort
          isSortFormOpened={isSortFormOpened}
          onSortLabelClick={this._sortLabelClickHandler}
          sortType={sortType}
          onSortOptionClick={onSortOptionClick}
        />}
        {<OffersList
          city={city}
          offers={sortedOffers}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />}
      </section>
    );
  }

  _sortLabelClickHandler() {
    this.setState((prevState) => ({
      isSortFormOpened: !prevState.isSortFormOpened,
    }));
  }
}

Places.propTypes = {
  offersCount: PropTypes.number.isRequired,
  city: PropTypes.string.isRequired,
  offers: PropTypes.array.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  sortType: PropTypes.oneOf(Object.values(SortType)).isRequired,
  onSortOptionClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  sortType: state.sortType,
});

const mapDispatchToProps = (dispatch) => ({
  onSortOptionClick: (sortType) => {
    dispatch(ActionCreator.changeSortType(sortType));
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(Places);

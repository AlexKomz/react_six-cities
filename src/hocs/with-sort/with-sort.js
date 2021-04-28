import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {ActionCreator} from "../../reducer/main/main.js";
import {getSortType, getSortedOffers} from "../../reducer/main/selectors.js";
import {SortType} from "../../consts.js";


const withSort = (Component) => {
  class WithSort extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isSortFormOpened: false,
      };

      this._sortLabelClickHandler = this._sortLabelClickHandler.bind(this);
    }

    render() {
      const {offers} = this.props;
      const {isSortFormOpened} = this.state;

      return (
        <Component
          {...this.props}
          isSortFormOpened={isSortFormOpened}
          offers={offers}
          onSortLabelClick={this._sortLabelClickHandler}
        />
      );
    }

    _sortLabelClickHandler() {
      this.setState((prevState) => ({
        isSortFormOpened: !prevState.isSortFormOpened,
      }));
    }
  }

  WithSort.propTypes = {
    offersCount: PropTypes.number.isRequired,
    city: PropTypes.string.isRequired,
    offers: PropTypes.array.isRequired,
    onMouseEnter: PropTypes.func.isRequired,
    onMouseLeave: PropTypes.func.isRequired,
    sortType: PropTypes.oneOf(Object.values(SortType)).isRequired,
    onSortOptionClick: PropTypes.func.isRequired,
  };

  const mapStateToProps = (state) => ({
    sortType: getSortType(state),
    offers: getSortedOffers(state),
  });

  const mapDispatchToProps = (dispatch) => ({
    onSortOptionClick: (sortType) => {
      dispatch(ActionCreator.changeSortType(sortType));
    },
  });

  return connect(mapStateToProps, mapDispatchToProps)(WithSort);
};


export default withSort;

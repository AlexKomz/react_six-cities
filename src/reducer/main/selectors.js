import {createSelector} from "reselect";

import NameSpace from "../name-space.js";
import {SortType} from "../../const.js";
import {getOffers} from "../data/selectors.js";


const getSortType = (state) => state[NameSpace.MAIN].sortType;

const getCity = (state) => state[NameSpace.MAIN].city;

const getFilteredOffers = createSelector(
    getOffers,
    getCity,
    (offers, city) => offers.filter((offer) => offer.city.name.toLowerCase() === city.toLowerCase())
);

const getSortedOffers = createSelector(
    getFilteredOffers,
    getSortType,
    (offers, sortType) => {
      const sortedOffers = offers.slice();

      switch (sortType) {
        case SortType.LOW_TO_HIGH:
          sortedOffers.sort((a, b) => a.price - b.price);
          break;
        case SortType.HIGH_TO_LOW:
          sortedOffers.sort((a, b) => b.price - a.price);
          break;
        case SortType.TOP_RATED_FIRST:
          sortedOffers.sort((a, b) => b.rating - a.rating);
          break;
      }

      return sortedOffers;
    }
);

const getFavoritedOffers = createSelector(
    getOffers,
    (offers) => offers.filter((offer) => offer.isFavorite)
);


export {
  getSortType,
  getCity,
  getFilteredOffers,
  getSortedOffers,
  getFavoritedOffers,
};

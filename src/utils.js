import {Raiting, SortType} from "./consts.js";


export const convertRaitingIntoPercent = (raiting) => {
  return (raiting * 100) / Raiting.MAX;
};

export const extend = (a, b) => Object.assign({}, a, b);

export const filteringOffersByCity = (offers, city) => {
  return offers.filter((offer) => offer.city.name.toLowerCase() === city.toLowerCase());
};

export const sortingOffers = (offers, sortType) => {
  const sortedOffers = offers.slice();

  switch (sortType) {
    case SortType.LOW_TO_HIGH:
      sortedOffers.sort((a, b) => a.price.value - b.price.value);
      break;
    case SortType.HIGH_TO_LOW:
      sortedOffers.sort((a, b) => b.price.value - a.price.value);
      break;
    case SortType.TOP_RATED_FIRST:
      sortedOffers.sort((a, b) => b.rating - a.rating);
      break;
  }

  return sortedOffers;
};

import {Raiting} from "./consts.js";

export const convertRaitingIntoPercent = (raiting) => {
  return (raiting * 100) / Raiting.MAX;
};

export const extend = (a, b) => Object.assign({}, a, b);

export const filteringOffersByCity = (offers, city) => {
  return offers.filter((offer) => offer.city.name.toLowerCase() === city.toLowerCase());
};

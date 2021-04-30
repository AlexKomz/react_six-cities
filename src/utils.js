import {Raiting, Calculations} from "./const.js";


const convertRaitingIntoPercent = (raiting) => {
  return (raiting * 100) / Raiting.MAX;
};

const extend = (a, b) => Object.assign({}, a, b);

const getOfferByID = (offers, id) => offers.find((offer) => offer.id === id);

const distanceBetweenPointsInMeters = (pointA, pointB) => {
  return 2 *
  Math.asin(
      Math.sqrt(
          Math.pow(Math.sin((pointB.latitude - pointA.latitude) / 2), 2) +
            Math.cos(pointA.latitude) * Math.cos(pointB.latitude) *
            Math.pow(
                Math.sin(
                    Math.abs(pointA.longitude - pointB.longitude) / 2), 2))) * Calculations.EARTH_RADIUS;
};


export {convertRaitingIntoPercent, extend, getOfferByID, distanceBetweenPointsInMeters};

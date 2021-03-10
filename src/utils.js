import {Raiting} from "./consts.js";

export const convertRaitingIntoPercent = (raiting) => {
  return (raiting * 100) / Raiting.MAX;
};

import {Raiting} from "./consts.js";


const convertRaitingIntoPercent = (raiting) => {
  return (raiting * 100) / Raiting.MAX;
};

const extend = (a, b) => Object.assign({}, a, b);


export {convertRaitingIntoPercent, extend};

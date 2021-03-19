import {extend} from "./utils.js";
import offers from "./mocks/offers.js";
import {SortType} from "./consts";


const initialState = {
  city: offers[0].city.name,
  sortType: SortType.POPULAR,
  offers,
};

export const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  CHANGE_SORT_TYPE: `CHANGE_SORT_TYPE`,
  GET_OFFERS: `GET_OFFERS`,
};

export const ActionCreator = {
  changeCity: (city) => ({
    type: ActionType.CHANGE_CITY,
    payload: city,
  }),

  changeSortType: (sortType) => ({
    type: ActionType.CHANGE_SORT_TYPE,
    payload: sortType,
  }),

  getOffers: () => ({
    type: ActionType.GET_OFFERS,
  }),
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      const newCity = action.payload;

      return extend(state, {
        city: newCity,
      });

    case ActionType.CHANGE_SORT_TYPE:
      const newSortType = action.payload;

      return extend(state, {
        sortType: newSortType,
      });

    case ActionType.GET_OFFERS:
      return extend(state, {
        offers: initialState.offers,
      });
  }

  return state;
};

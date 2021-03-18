import {extend} from "./utils.js";
import offers from "./mocks/offers.js";


const initialState = {
  city: offers[0].city.name,
  offers,
};

export const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
};

export const ActionCreator = {
  changeCity: (city) => ({
    type: ActionType.CHANGE_CITY,
    payload: city,
  }),
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      const newCity = action.payload;

      return extend(state, {
        city: newCity,
      });
  }

  return state;
};

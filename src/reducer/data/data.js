import camelcaseKeys from "camelcase-keys";

import {extend} from "../../utils.js";


const initialState = {
  offers: [],
};

const ActionType = {
  LOAD_OFFERS: `LOAD_OFFERS`,
};

const ActionCreator = {
  loadOffers: (offers) => ({
    type: ActionType.LOAD_OFFERS,
    payload: {
      offers,
    },
  }),
};

const Operation = {
  loadOffers: () => (dispatch, _, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        const offers = camelcaseKeys(response.data);
        dispatch(ActionCreator.loadOffers(offers));
      });
  },
};

const reducer = (state = initialState, action) => {
  const {
    type,
    payload,
  } = action;

  switch (type) {
    case ActionType.LOAD_OFFERS:
      return extend(state, {
        offers: payload.offers,
      });
  }

  return state;
};


export {
  ActionType,
  ActionCreator,
  Operation,
  reducer,
};

import camelcaseKeys from "camelcase-keys";

import {extend} from "../../utils.js";


const initialState = {
  offers: [],
};

const ActionType = {
  LOAD_OFFERS: `LOAD_OFFERS`,
  UPDATE_OFFERS: `UPDATE_OFFERS`,
};

const ActionCreator = {
  loadOffers: (offers) => ({
    type: ActionType.LOAD_OFFERS,
    payload: {
      offers,
    },
  }),

  updateOffers: (offer) => ({
    type: ActionType.UPDATE_OFFERS,
    payload: {
      offer,
    },
  }),
};

const Operation = {
  loadOffers: () => (dispatch, _, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        const offers = camelcaseKeys(response.data, {
          deep: true,
        });
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

    case ActionType.UPDATE_OFFERS:
      return extend(state, {
        offers: state.offers.map((offer) => {
          if (offer.id === payload.offer.id) {
            return payload.offer;
          }

          return offer;
        }),
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

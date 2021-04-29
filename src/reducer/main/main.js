import {extend} from "../../utils.js";
import {SortType, City} from "../../const.js";


const initialState = {
  sortType: SortType.POPULAR,
  city: City.PARIS,
};

const ActionType = {
  CHANGE_SORT_TYPE: `CHANGE_SORT_TYPE`,
  CHANGE_CITY: `CHANGE_CITY`,
};

const ActionCreator = {
  changeSortType: (sortType) => ({
    type: ActionType.CHANGE_SORT_TYPE,
    payload: {
      sortType,
    },
  }),

  changeCity: (city) => ({
    type: ActionType.CHANGE_CITY,
    payload: {
      city,
    },
  }),
};

const reducer = (state = initialState, action) => {
  const {
    type,
    payload,
  } = action;

  switch (type) {
    case ActionType.CHANGE_SORT_TYPE:
      return extend(state, {
        sortType: payload.sortType,
      });

    case ActionType.CHANGE_CITY:
      return extend(state, {
        city: payload.city,
      });
  }

  return state;
};


export {
  ActionType,
  ActionCreator,
  reducer,
};

import {ActionType, ActionCreator, reducer} from "./main.js";
import {SortType, City} from "../../consts.js";


it(`Reducer whithout additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    sortType: SortType.POPULAR,
    city: City.PARIS,
  });
});

it(`Reducer should change sortType by a given value`, () => {
  expect(reducer({
    sortType: SortType.POPULAR,
    city: City.PARIS,
  }, {
    type: ActionType.CHANGE_SORT_TYPE,
    payload: {
      sortType: SortType.HIGH_TO_LOW,
    },
  })).toEqual({
    sortType: SortType.HIGH_TO_LOW,
    city: City.PARIS,
  });

  expect(reducer({
    sortType: SortType.POPULAR,
    city: City.PARIS,
  }, {
    type: ActionType.CHANGE_SORT_TYPE,
    payload: {
      sortType: SortType.LOW_TO_HIGH,
    },
  })).toEqual({
    sortType: SortType.LOW_TO_HIGH,
    city: City.PARIS,
  });
});

it(`Reducer should change city by a given value`, () => {
  expect(reducer({
    sortType: SortType.POPULAR,
    city: City.PARIS,
  }, {
    type: ActionType.CHANGE_CITY,
    payload: {
      city: City.AMSTERDAM,
    },
  })).toEqual({
    sortType: SortType.POPULAR,
    city: City.AMSTERDAM,
  });

  expect(reducer({
    sortType: SortType.POPULAR,
    city: City.PARIS,
  }, {
    type: ActionType.CHANGE_CITY,
    payload: {
      city: City.BRUSSELS,
    },
  })).toEqual({
    sortType: SortType.POPULAR,
    city: City.BRUSSELS,
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for change sort type returns correct action`, () => {
    expect(ActionCreator.changeSortType(SortType.TOP_RATED_FIRST)).toEqual({
      type: ActionType.CHANGE_SORT_TYPE,
      payload: {
        sortType: SortType.TOP_RATED_FIRST,
      },
    });
  });

  it(`Action creator for change city returns correct action`, () => {
    expect(ActionCreator.changeCity(City.DUSSELDORF)).toEqual({
      type: ActionType.CHANGE_CITY,
      payload: {
        city: City.DUSSELDORF,
      },
    });
  });
});

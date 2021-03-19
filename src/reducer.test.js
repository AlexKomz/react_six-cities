import {reducer, ActionCreator, ActionType} from "./reducer.js";
import offers from "./mocks/offers.js";
import {SortType} from "./consts";


it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    city: offers[0].city.name,
    sortType: SortType.POPULAR,
    offers,
  });
});

it(`Reducer should change city by a given value`, () => {
  expect(reducer({
    city: offers[0].city.name,
    sortType: SortType.POPULAR,
    offers,
  }, {
    type: ActionType.CHANGE_CITY,
    payload: `London`,
  })).toEqual({
    city: `London`,
    sortType: SortType.POPULAR,
    offers,
  });

  expect(reducer({
    city: offers[0].city.name,
    sortType: SortType.POPULAR,
    offers,
  }, {
    type: ActionType.CHANGE_CITY,
    payload: offers[0].city.name,
  })).toEqual({
    city: offers[0].city.name,
    sortType: SortType.POPULAR,
    offers,
  });
});

it(`Reducer should change sort type by a given value`, () => {
  expect(reducer({
    city: offers[0].city.name,
    sortType: SortType.POPULAR,
    offers,
  }, {
    type: ActionType.CHANGE_SORT_TYPE,
    payload: SortType.HIGH_TO_LOW,
  })).toEqual({
    city: offers[0].city.name,
    sortType: SortType.HIGH_TO_LOW,
    offers,
  });

  expect(reducer({
    city: offers[0].city.name,
    sortType: SortType.POPULAR,
    offers,
  }, {
    type: ActionType.CHANGE_SORT_TYPE,
    payload: SortType.TOP_RATED_FIRST,
  })).toEqual({
    city: offers[0].city.name,
    sortType: SortType.TOP_RATED_FIRST,
    offers,
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for changing city returns corrent action`, () => {
    expect(ActionCreator.changeCity(`Amsterdam`)).toEqual({
      type: ActionType.CHANGE_CITY,
      payload: `Amsterdam`,
    });
  });

  it(`Action creator for changing sort type returns corrent action`, () => {
    expect(ActionCreator.changeSortType(SortType.TOP_RATED_FIRST)).toEqual({
      type: ActionType.CHANGE_SORT_TYPE,
      payload: SortType.TOP_RATED_FIRST,
    });
  });
});

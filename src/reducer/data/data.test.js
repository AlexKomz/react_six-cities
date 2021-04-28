import MockAdapter from "axios-mock-adapter";

import createAPI from "../../api.js";
import {ActionType, Operation, reducer} from "./data.js";


const api = createAPI(() => {});

const offers = [{
  "city": {
    "name": `Brussels`,
    "location": {
      "latitude": 50.846557,
      "longitude": 4.351697,
      "zoom": 13
    }
  },
  "preview_image": `https://htmlacademy-react-2.appspot.com/six-cities/static/hotel/10.jpg`,
  "images": [
    `https://htmlacademy-react-2.appspot.com/six-cities/static/hotel/2.jpg`,
    `https://htmlacademy-react-2.appspot.com/six-cities/static/hotel/1.jpg`,
    `https://htmlacademy-react-2.appspot.com/six-cities/static/hotel/5.jpg`,
    `https://htmlacademy-react-2.appspot.com/six-cities/static/hotel/11.jpg`,
    `https://htmlacademy-react-2.appspot.com/six-cities/static/hotel/6.jpg`,
    `https://htmlacademy-react-2.appspot.com/six-cities/static/hotel/17.jpg`,
    `https://htmlacademy-react-2.appspot.com/six-cities/static/hotel/19.jpg`,
    `https://htmlacademy-react-2.appspot.com/six-cities/static/hotel/20.jpg`,
    `https://htmlacademy-react-2.appspot.com/six-cities/static/hotel/15.jpg`,
    `https://htmlacademy-react-2.appspot.com/six-cities/static/hotel/16.jpg`,
    `https://htmlacademy-react-2.appspot.com/six-cities/static/hotel/9.jpg`,
    `https://htmlacademy-react-2.appspot.com/six-cities/static/hotel/12.jpg`,
    `https://htmlacademy-react-2.appspot.com/six-cities/static/hotel/18.jpg`,
    `https://htmlacademy-react-2.appspot.com/six-cities/static/hotel/4.jpg`
  ],
  "title": `Nice, cozy, warm big bed apartment`,
  "is_favorite": false,
  "is_premium": false,
  "rating": 4,
  "type": `hotel`,
  "bedrooms": 4,
  "max_adults": 7,
  "price": 463,
  "goods": [
    `Baby seat`,
    `Laptop friendly workspace`,
    `Fridge`,
    `Air conditioning`,
    `Towels`,
    `Washer`,
    `Breakfast`
  ],
  "host": {
    "id": 25,
    "name": `Angelina`,
    "is_pro": true,
    "avatar_url": `img/avatar-angelina.jpg`
  },
  "description": `I am happy to welcome you to my apartment in the city center! Three words: location, cosy and chic!`,
  "location": {
    "latitude": 50.860557,
    "longitude": 4.376697,
    "zoom": 16
  },
  "id": 1
}];

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    offers: [],
  });
});

it(`Reducer should update questions by load questions`, () => {
  expect(reducer({
    offers: [],
  }, {
    type: ActionType.LOAD_OFFERS,
    payload: {
      offers,
    },
  })).toEqual({
    offers,
  });
});

describe(`Operation work correctly`, () => {
  it(`Should make a correct API call to /hotels`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const offersLoader = Operation.loadOffers();

    apiMock
      .onGet(`/hotels`)
      .reply(200, [{fake: true}]);

    return offersLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_OFFERS,
          payload: {
            offers: [{fake: true}],
          },
        });
      });
  });
});

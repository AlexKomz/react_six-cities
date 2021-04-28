import React from "react";
import renderer from "react-test-renderer";

import Places from "./places.jsx";

import {SortType} from "../../consts.js";


const city = `London`;
const offers = [{
  "city": {
    "name": `Brussels`,
    "location": {
      "latitude": 50.846557,
      "longitude": 4.351697,
      "zoom": 13
    }
  },
  "previewImage": `https://htmlacademy-react-2.appspot.com/six-cities/static/hotel/10.jpg`,
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
  "isFavorite": false,
  "isPremium": false,
  "rating": 4,
  "type": `hotel`,
  "bedrooms": 4,
  "maxAdults": 7,
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
    "isPro": true,
    "avatarUrl": `img/avatar-angelina.jpg`
  },
  "description": `I am happy to welcome you to my apartment in the city center! Three words: location, cosy and chic!`,
  "location": {
    "latitude": 50.860557,
    "longitude": 4.376697,
    "zoom": 16
  },
  "id": 1
}];

it(`Should Places render correctly`, () => {
  const tree = renderer
    .create(
        <Places
          offersCount={offers.length}
          city={city}
          onMouseEnter={jest.fn()}
          onMouseLeave={jest.fn()}
          sortType={SortType.POPULAR}
          onSortOptionClick={jest.fn()}
          isSortFormOpened={false}
          offers={offers}
          onSortLabelClick={jest.fn()}
        />
    ).toJSON();

  expect(tree).toMatchSnapshot();
});

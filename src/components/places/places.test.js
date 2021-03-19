import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

import Places, {Places as PlacesWithoutStore} from "../places/places.jsx";

import {SortType} from "../../consts.js";


const mockStore = configureStore([]);

const city = `London`;
const offers = [{
  id: `id1`,
  city: {
    name: `Amsterdam`,
    coords: [52.38333, 4.9],
  },
  isPremium: true,
  image: {src: `img/apartment-01.jpg`},
  price: {
    value: 120,
    text: `night`
  },
  rating: 4,
  name: `Beautiful &amp; luxurious apartment at great location`,
  type: `Apartment`,
  coords: [52.3909553943508, 4.85309666406198]
}, {
  id: `id2`,
  city: {
    name: `Amsterdam`,
    coords: [52.38333, 4.9],
  },
  isPremium: false,
  image: {src: `img/room.jpg`},
  price: {
    value: 80,
    text: `night`
  },
  rating: 4,
  name: `Wood and stone place`,
  type: `Private room`,
  coords: [52.369553943508, 4.85309666406198]
}, {
  id: `id3`,
  city: {
    name: `Amsterdam`,
    coords: [52.38333, 4.9],
  },
  isPremium: false,
  image: {src: `img/apartment-02.jpg`},
  price: {
    value: 132,
    text: `night`
  },
  rating: 4,
  name: `Canal View Prinsengracht`,
  type: `Apartment`,
  coords: [52.3909553943508, 4.929309666406198]
}, {
  id: `id4`,
  city: {
    name: `Amsterdam`,
    coords: [52.38333, 4.9],
  },
  isPremium: true,
  image: {src: `img/apartment-03.jpg`},
  price: {
    value: 180,
    text: `night`
  },
  rating: 5,
  name: `Nice, cozy, warm big bed apartment`,
  type: `Apartment`,
  coords: [52.3809553943508, 4.939309666406198]
}];

describe(`Render Places`, () => {
  it(`Should Places render correctly without store`, () => {
    const tree = renderer
      .create(
          <PlacesWithoutStore
            offersCount={offers.length}
            city={city}
            offers={offers}
            onMouseEnter={jest.fn()}
            onMouseLeave={jest.fn()}
            sortType={SortType.POPULAR}
            onSortOptionClick={jest.fn()}
          />
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Should Places render correctly with store`, () => {
    const store = mockStore({
      city: `Amsterdam`,
      sortType: SortType.POPULAR,
      offers,
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <Places
              offersCount={offers.length}
              city={city}
              offers={offers}
              onMouseEnter={jest.fn()}
              onMouseLeave={jest.fn()}
            />
          </Provider>
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

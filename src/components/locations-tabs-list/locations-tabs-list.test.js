import React from "react";
import renderer from "react-test-renderer";

import LocationTabsList from "./locations-tabs-list.jsx";


const city = `Amsterdam`;
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
}];

it(`Should LocationTabsList render correctly`, () => {
  const tree = renderer
    .create(
        <LocationTabsList
          activeCity={city}
          offers={offers}
          onTabClick={jest.fn()}
        />
    ).toJSON();

  expect(tree).toMatchSnapshot();
});

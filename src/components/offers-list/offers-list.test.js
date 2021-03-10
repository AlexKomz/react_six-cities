import React from "react";
import renderer from "react-test-renderer";

import OffersList from "./offers-list.jsx";


const offers = [
  {
    isPremium: false,
    image: {src: `img/apartment-01.jpg`},
    price: {
      value: 120,
      text: `night`
    },
    rating: 4,
    name: `Beautiful &amp; luxurious apartment at great location`,
    type: `Apartment`
  }, {
    isPremium: true,
    image: {src: `img/room.jpg`},
    price: {
      value: 80,
      text: `night`
    },
    rating: 4,
    name: `Wood and stone place`,
    type: `Private room`
  }
];

it(`Should OffersList render correctly`, () => {
  const tree = renderer
    .create(
        <OffersList
          offers={offers}
        />
    ).toJSON();

  expect(tree).toMatchSnapshot();
});

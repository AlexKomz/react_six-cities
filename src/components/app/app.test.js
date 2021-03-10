import React from "react";
import renderer from "react-test-renderer";

import App from "./app.jsx";


const offers = [
  {
    image: {src: `img/apartment-01.jpg`},
    price: {
      value: 120,
      text: `night`
    },
    rating: 4,
    name: `Beautiful &amp; luxurious apartment at great location`,
    type: `Apartment`
  }, {
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

it(`Should App render correctly`, () => {
  const tree = renderer
    .create(
        <App
          offers={offers}
        />
    ).toJSON();

  expect(tree).toMatchSnapshot();
});

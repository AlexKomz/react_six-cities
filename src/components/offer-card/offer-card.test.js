import React from "react";
import renderer from "react-test-renderer";

import OfferCard from "./offer-card.jsx";


const offer = {
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
};

it(`Should OfferCard render correctly`, () => {
  const tree = renderer
    .create(
        <OfferCard
          offer={offer}
          onMouseEnter={jest.fn()}
          onMouseLeave={jest.fn()}
        />
    ).toJSON();

  expect(tree).toMatchSnapshot();
});

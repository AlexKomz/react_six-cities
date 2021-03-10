import React from "react";
import renderer from "react-test-renderer";

import OfferCard from "./offer-card.jsx";


const offer = {
  isPremium: false,
  image: {src: `img/apartment-01.jpg`},
  price: {
    value: 120,
    text: `night`
  },
  rating: 4,
  name: `Beautiful &amp; luxurious apartment at great location`,
  type: `Apartment`
};

it(`Should OfferCard render correctly`, () => {
  const tree = renderer
    .create(
        <OfferCard
          offer={offer}
          onHover={() => {}}
        />
    ).toJSON();

  expect(tree).toMatchSnapshot();
});

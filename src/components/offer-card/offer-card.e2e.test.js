import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import OfferCard from "./offer-card.jsx";


configure({adapter: new Adapter()});

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

it(`On hover the mouse over, the event handler gets the correct information`, () => {
  const onHover = jest.fn();
  const hoveredOffer = {
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

  const offerCard = shallow(
      <OfferCard
        offer={offer}
        onMouseEnter={onHover}
        onMouseLeave={jest.fn()}
      />);

  offerCard.simulate(`mouseenter`, () => {});

  expect(onHover).toHaveBeenCalledTimes(1);
  expect(onHover.mock.calls[0][0]).toMatchObject(hoveredOffer);
});

import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import OfferCard from "./offer-card.jsx";


configure({adapter: new Adapter()});

const offer = {
  image: {src: `img/apartment-01.jpg`},
  price: {
    value: 120,
    text: `night`
  },
  rating: 4,
  name: `Beautiful &amp; luxurious apartment at great location`,
  type: `Apartment`
};

it(`On hover the mouse over, the event handler gets the correct information`, () => {
  const onHover = jest.fn();
  const hoveredOffer = {
    image: {src: `img/apartment-01.jpg`},
    price: {
      value: 120,
      text: `night`
    },
    rating: 4,
    name: `Beautiful &amp; luxurious apartment at great location`,
    type: `Apartment`
  };

  const offerCard = shallow(
      <OfferCard
        offer={offer}
        onHover={onHover}
      />);

  offerCard.simulate(`mouseover`, () => {});

  expect(onHover).toHaveBeenCalledTimes(1);
  expect(onHover.mock.calls[0][0]).toMatchObject(hoveredOffer);
});

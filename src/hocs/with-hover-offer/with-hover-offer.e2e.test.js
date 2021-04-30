import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import withHoverOffer from "./with-hover-offer.js";

import {SortType} from "../../const.js";


configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withHoverOffer(MockComponent);

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

it(`On hover the mouse over, the event handler gets the correct information`, () => {
  const city = `Amsterdam`;
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

  const wrapper = shallow(
      <MockComponentWrapped
        city={city}
        offers={offers}
        sortType={SortType.POPULAR}
        onSortOptionClick={jest.fn()}
      />);

  wrapper.props().onMouseEnter(hoveredOffer);
  expect(wrapper.props().currentOffer).toEqual(hoveredOffer);
});

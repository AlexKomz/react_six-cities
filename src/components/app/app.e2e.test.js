import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import App from "./app.jsx";


configure({adapter: new Adapter()});

it(`Should place name be clicked`, () => {
  const onPlacesNameClick = jest.fn();

  const app = shallow(
      <App
        places={[
          {
            name: `Beautiful &amp; luxurious apartment at great location`,
          }
        ]}
        onPlacesNameClick={onPlacesNameClick}
      />
  );

  const placeName = app.find(`h2.place-card__name`);

  placeName.props().onClick();

  expect(onPlacesNameClick.mock.calls.length).toBe(1);
});

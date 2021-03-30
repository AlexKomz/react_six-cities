import React from "react";
import renderer from "react-test-renderer";

import Map from "./map.jsx";


it(`Should Map render correctly`, () => {
  const tree = renderer
    .create(
        <Map
          offers={[]}
          currentOffer={null}
        />
    ).toJSON();

  expect(tree).toMatchSnapshot();
});


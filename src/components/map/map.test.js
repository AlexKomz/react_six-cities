import React from "react";
import renderer from "react-test-renderer";

import Map from "./map.jsx";


it(`Should Map render correctly`, () => {
  const centerCoords = [10.1, 10.1];
  const zoom = 10;

  const tree = renderer
    .create(
        <Map
          offers={[]}
          currentOffer={null}
          centerCoords={centerCoords}
          zoom={zoom}
        />
    ).toJSON();

  expect(tree).toMatchSnapshot();
});


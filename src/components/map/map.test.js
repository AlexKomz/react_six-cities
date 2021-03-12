import React from "react";
import renderer from "react-test-renderer";

import Map from "../map/map.jsx";


const coords = [
  [52.3909553943508, 4.85309666406198],
  [52.369553943508, 4.85309666406198],
  [52.3909553943508, 4.929309666406198],
  [52.3809553943508, 4.939309666406198]
];

it(`Should Map render correctly`, () => {
  const city = [52.38333, 4.9];

  const tree = renderer
    .create(
        <Map
          city={city}
          coords={coords}
        />
    ).toJSON();

  expect(tree).toMatchSnapshot();
});


import React from "react";
import renderer from "react-test-renderer";

import App from "./app.jsx";


it(`Should App render correctly`, () => {
  const tree = renderer
    .create(
        <App
          places={[
            {
              name: `Beautiful &amp; luxurious apartment at great location`,
            },
            {
              name: `Wood and stone place`,
            },
            {
              name: `Canal View Prinsengracht`,
            },
            {
              name: `Nice, cozy, warm big bed apartment`,
            },
          ]}
          onPlacesNameClick={() => {}}
        />
    ).toJSON();

  expect(tree).toMatchSnapshot();
});

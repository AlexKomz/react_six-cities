import React from "react";
import renderer from "react-test-renderer";

import EmptyScreen from "./empty-screen.jsx";


it(`Should EmptyScreen render correctly`, () => {
  const city = `Amsterdam`;

  const tree = renderer
    .create(
        <EmptyScreen
          city={city}
        />
    ).toJSON();

  expect(tree).toMatchSnapshot();
});

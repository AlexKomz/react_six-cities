import React from "react";
import renderer from "react-test-renderer";

import Main from "./main.jsx";

const children = <div></div>;

it(`Should Main render correctly`, () => {
  const tree = renderer
    .create(
        <Main mainClasses={`page__main`}>
          {children}
        </Main>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});

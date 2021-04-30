import React from "react";
import renderer from "react-test-renderer";

import Page from "./page.jsx";

const children = <div></div>;

it(`Should Page render correctly`, () => {
  const tree = renderer
    .create(
        <Page pageClasses={`page`}>
          {children}
        </Page>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});

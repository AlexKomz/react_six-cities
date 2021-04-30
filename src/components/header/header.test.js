import React from "react";
import {Route, Router} from "react-router-dom";
import renderer from "react-test-renderer";

import Header from "./header.jsx";

import history from "../../history.js";


it(`Should Header render correctly`, () => {
  const tree = renderer
    .create(
        <Router
          history={history}
        >
          <Route>
            <Header
              authorizationStatus={`AUTH`}
              user={null}
            />
          </Route>
        </Router>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});

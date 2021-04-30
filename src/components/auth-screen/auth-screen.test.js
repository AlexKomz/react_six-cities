import React from "react";
import {Route, Router} from "react-router-dom";
import renderer from "react-test-renderer";

import AuthScreen from "./auth-screen.jsx";

import history from "../../history.js";


it(`Should AuthScreen render correctly`, () => {
  const tree = renderer
    .create(
        <Router
          history={history}
        >
          <Route>
            <AuthScreen
              city={`Paris`}
              onSubmit={() => {}}
            />
          </Route>
        </Router>

    ).toJSON();

  expect(tree).toMatchSnapshot();
});

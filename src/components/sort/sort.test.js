import React from "react";
import renderer from "react-test-renderer";

import Sort from "../sort/sort.jsx";

import {SortType} from "../../consts.js";


it(`Should Sort render correctly`, () => {
  const tree = renderer
    .create(
        <Sort
          isSortFormOpened={false}
          onSortLabelClick={jest.fn()}
          sortType={SortType.TOP_RATED_FIRST}
          onSortOptionClick={jest.fn()}
        />
    ).toJSON();

  expect(tree).toMatchSnapshot();
});

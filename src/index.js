import React from "react";
import ReactDOM from "react-dom";

import App from "./components/app/app.jsx";


const PLACES = [
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
];

ReactDOM.render(
    <App
      places={PLACES}
      onPlacesNameClick={() => {}}
    />,
    document.querySelector(`#root`)
);

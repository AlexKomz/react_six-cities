import React from "react";
import PropTypes from "prop-types";

import {City} from "../../consts.js";


const LocationTabsList = (props) => {
  const {
    activeCity,
    onTabClick
  } = props;

  const cities = Object.values(City);

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((city, i) => (
            <li
              key={`${city}-${i}`}
              className="locations__item">
              <a
                className={`locations__item-link tabs__item ${city === activeCity ? `tabs__item--active` : ``}`}
                href="#"
                onClick={() => {
                  if (city === activeCity) {
                    return;
                  }

                  onTabClick(city);
                }}
              >
                <span>{city}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

LocationTabsList.propTypes = {
  activeCity: PropTypes.string.isRequired,
  onTabClick: PropTypes.func.isRequired,
};


export default LocationTabsList;

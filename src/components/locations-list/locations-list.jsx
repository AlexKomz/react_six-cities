import React from "react";
import PropTypes from "prop-types";


const LocationList = ({activeCity, offers, onTabClick}) => {
  const cities = offers.reduce((acc, offer) => {
    const city = offer.city.name;

    if (!acc.includes(city)) {
      acc.push(city);
    }

    return acc;
  }, []);

  return (
    <ul className="locations__list tabs__list">
      {cities.map((city, i) => (
        <li
          key={`${city}-${i}`}
          className="locations__item">
          <a
            className={`locations__item-link tabs__item ${city === activeCity ? `tabs__item--active` : ``}`}
            href="#"
            onClick={() => {
              onTabClick(city);
            }}
          >
            <span>{city}</span>
          </a>
        </li>
      ))}
    </ul>
  );
};

LocationList.propTypes = {
  activeCity: PropTypes.string.isRequired,
  offers: PropTypes.array.isRequired,
  onTabClick: PropTypes.func.isRequired,
};


export default LocationList;

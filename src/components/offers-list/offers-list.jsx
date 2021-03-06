import React from "react";
import PropTypes from "prop-types";

import OfferCard from "../offer-card/offer-card.jsx";

import {CardType} from "../../const.js";


const OffersList = (props) => {
  const {
    offers,
    onMouseEnter,
    onMouseLeave
  } = props;

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          cardType={CardType.CITY}
          imgSize={{
            width: 260,
            height: 200,
          }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />
      ))}
    </div>
  );
};

OffersList.propTypes = {
  offers: PropTypes.array.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
};


export default OffersList;

import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import OfferCard from "../offer-card/offer-card.jsx";


class OffersList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentOffer: null,
    };
  }

  render() {
    const {offers} = this.props;

    return (
      <div className="cities__places-list places__list tabs__content">
        {offers.map((offer, i) => {
          return (
            <OfferCard
              key={`${offer.name}_${i}`}
              offer={offer}
              onHover={(current) => {
                this.setState({
                  currentOffer: current,
                });
              }}
            />
          );
        })}
      </div>
    );
  }
}

OffersList.propTypes = {
  offers: PropTypes.array.isRequired,
};


export default OffersList;

import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";
import leaflet from "leaflet";

import {ZOOM, Icon} from "../../consts.js";


export default class Map extends PureComponent {
  constructor(props) {
    super(props);

    this._map = null;
    this._mapRef = createRef();

    this._icon = leaflet.icon({
      iconUrl: Icon.ICON_URL,
      iconSize: Icon.ICON_SIZE,
    });

    this._activeIcon = leaflet.icon({
      iconUrl: Icon.ACTIVE_ICON_URL,
      iconSize: Icon.ICON_SIZE,
    });
  }

  render() {
    this._mapInit();

    return (
      <section className="cities__map map">
        <div id="map" ref={this._mapRef} style={{height: `100%`}} />
      </section>
    );
  }

  componentDidMount() {
    this._mapInit();
  }

  componentWillUnmount() {
    this._map.remove();
    this._map = null;
  }

  _mapInit() {
    if (!this._mapRef.current) {
      return;
    }

    if (this._map) {
      this._map.remove();
      this._map = null;
    }

    const {offers, currentOffer} = this.props;

    if (offers.length === 0) {
      return;
    }

    const currentId = currentOffer ? currentOffer.id : null;
    const cityCoords = offers[0].city.coords;

    this._map = leaflet.map(this._mapRef.current, {
      center: cityCoords,
      zoom: ZOOM,
      zoomControl: false,
      marker: true
    });

    this._map.setView(cityCoords, ZOOM);

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(this._map);

    offers.forEach((offer) => {
      let iconContainer = currentId === offer.id ? this._activeIcon : this._icon;

      leaflet
        .marker(offer.coords, {icon: iconContainer})
        .addTo(this._map);
    });
  }
}

Map.propTypes = {
  offers: PropTypes.array.isRequired,
  currentOffer: PropTypes.shape({
    id: PropTypes.string.isRequired,
    city: PropTypes.shape({
      name: PropTypes.string.isRequired,
      coords: PropTypes.array.isRequired,
    }).isRequired,
    isPremium: PropTypes.bool.isRequired,
    image: PropTypes.shape({src: PropTypes.string.isRequired}).isRequired,
    price: PropTypes.shape({
      value: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired,
    rating: PropTypes.oneOf([1, 2, 3, 4, 5]).isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    coords: PropTypes.array.isRequired,
  }),
};

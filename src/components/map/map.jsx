import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";
import leaflet from "leaflet";

import {Icon} from "../../const.js";


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
      <div id="map" ref={this._mapRef} style={{height: `100%`}} />
    );
  }

  componentDidMount() {
    this._mapInit();
  }

  componentWillUnmount() {
    if (this._map) {
      this._map.remove();
      this._map = null;
    }
  }

  _mapInit() {
    if (!this._mapRef.current) {
      return;
    }

    if (this._map) {
      this._map.remove();
      this._map = null;
    }

    const {
      offers,
      currentOffer,
      centerCoords,
      zoom,
      circle,
    } = this.props;

    if (offers.length === 0) {
      return;
    }

    const currentId = currentOffer ? currentOffer.id : null;

    this._map = leaflet.map(this._mapRef.current, {
      center: centerCoords,
      zoom,
      zoomControl: false,
      marker: true
    });

    this._map.setView(centerCoords, zoom);

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(this._map);

    if (circle) {
      leaflet.circle(centerCoords, circle).addTo(this._map);
    }

    offers.forEach((offer) => {
      const iconContainer = (currentId === offer.id)
        ? this._activeIcon
        : this._icon;

      const {location} = offer;
      const coords = [location.latitude, location.longitude];

      leaflet
        .marker(coords, {icon: iconContainer})
        .addTo(this._map);
    });
  }
}

Map.propTypes = {
  centerCoords: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  zoom: PropTypes.number.isRequired,
  offers: PropTypes.array.isRequired,
  currentOffer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    city: PropTypes.shape({
      name: PropTypes.string.isRequired,
      location: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
        zoom: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired,
    location: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      zoom: PropTypes.number.isRequired,
    }).isRequired,
  }),
  circle: PropTypes.shape({
    color: PropTypes.string.isRequired,
    fillColor: PropTypes.string. isRequired,
    fillOpacity: PropTypes.oneOf(
        [...(new Array(10))].map((_, i) => i + 0.1)
    ).isRequired,
    radius: PropTypes.number.isRequired,
  }),
};

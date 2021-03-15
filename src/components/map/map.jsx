import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";
import leaflet from "leaflet";

import {ZOOM, Icon} from "../../consts.js";


export default class Map extends PureComponent {
  constructor(props) {
    super(props);

    this._mapRef = createRef();
  }

  render() {
    return (
      <div id="map" ref={this._mapRef} style={{height: `100%`}} />
    );
  }

  componentDidMount() {
    this._mapInit();
  }

  componentWillUnmount() {
    this._map.remove();
  }

  _mapInit() {
    if (!this._mapRef.current) {
      return;
    }

    const {city, coords} = this.props;

    const icon = leaflet.icon({
      iconUrl: Icon.ICONURL,
      iconSize: Icon.ICONSIZE,
    });

    this._map = leaflet.map(this._mapRef.current, {
      center: city,
      zoom: ZOOM,
      zoomControl: false,
      marker: true
    });

    this._map.setView(city, ZOOM);

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(this._map);

    coords.forEach((coord) => {
      leaflet
        .marker(coord, {icon})
        .addTo(this._map);
    });
  }
}

Map.propTypes = {
  city: PropTypes.array.isRequired,
  coords: PropTypes.arrayOf(PropTypes.array).isRequired
};

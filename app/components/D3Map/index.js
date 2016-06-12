/**
*
* D3Map
*
*/

import React from 'react';
import { Map, TileLayer } from 'react-leaflet';
import CountryTopoData from './data/countries.topo.json';
import styles from './styles.css';
import MapOverlay from './map-overlay';

/* eslint-disable react/prefer-stateless-function */
class D3Map extends React.Component {
  render() {
    const {
      center,
      defaultZoomLevel,
      maxZoom,
    } = this.props;

    const mapModel = CountryTopoData;

    return (
      <div
        className={styles.map}
      >
        <Map
          zoom={defaultZoomLevel}
          center={center}
          className={styles.map}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            maxZoom={maxZoom}
            url="http://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png"
          />
          <MapOverlay mapModel={mapModel} />
        </Map>
      </div>
    );
  }
}

D3Map.propTypes = {
  center: React.PropTypes.array,
  maxZoom: React.PropTypes.number,
  defaultZoomLevel: React.PropTypes.number,
  width: React.PropTypes.number,
  height: React.PropTypes.number,
};

export default D3Map;

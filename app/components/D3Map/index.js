/**
*
* D3Map
*
*/

import React from 'react';
import {
  Map,
  TileLayer,
} from 'react-leaflet';
import topojson from 'topojson';
import styles from './styles.css';
import MapOverlay from './map-overlay';
import { toD3Path } from './utils';


/* eslint-disable react/prefer-stateless-function */
class D3Map extends React.Component {
  // componentWillReceiveProps(nextProps) {
  //   const { map }
  //   if (nextProps.boundsForZoom !== this.props.boundsForZoom) {
  //
  //   }
  // }

  render() {
    const {
      center,
      zoom,
      maxZoom,
      borderData,
      impactData,
      onViewreset,
      bounds,
      boundsForZoom,
      height,
    } = this.props;

    // const countriesBorders = topojson.feature(CountryTopoData, CountryTopoData.objects.countries);
    const provincesGeo = topojson.feature(borderData, borderData.objects.states_chn);
    return (
      <div
        className={styles.map}
      >
        <Map
          zoom={zoom}
          center={center}
          className={styles.map}
          style={{
            height,
          }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            maxZoom={maxZoom}
            url="http://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png"
          />
          <MapOverlay
            provincesGeo={provincesGeo}
            onViewreset={onViewreset}
            bounds={bounds}
            impactData={impactData}
            boundsForZoom={boundsForZoom}
          />
        </Map>
      </div>
    );
  }
}

D3Map.propTypes = {
  center: React.PropTypes.array,
  height: React.PropTypes.number,
  boundsForZoom: React.PropTypes.array,
  maxZoom: React.PropTypes.number,
  zoom: React.PropTypes.number,
  borderData: React.PropTypes.object,
  impactData: React.PropTypes.array,
  projectCoordinates: React.PropTypes.object,
  bounds: React.PropTypes.array,
  onViewreset: React.PropTypes.func,
};

export { toD3Path };
export default D3Map;

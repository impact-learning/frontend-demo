import React from 'react';
import ReactDOM from 'react-dom';
import MapCountryBordersLayer from './map-country-borders-layer';

/* eslint-disable react/prefer-stateless-function */
class MapOverlay extends React.Component {
  componentDidMount() {
    const {
      map,
      mapModel,
    } = this.props;
    ReactDOM.render(<MapCountryBordersLayer
      map={map}
      mapModel={mapModel}
    />, map.getPanes().overlayPane);
  }
  render() {
    return null;
  }
}

MapOverlay.propTypes = {
  map: React.PropTypes.object,
  mapModel: React.PropTypes.object,
};

export default MapOverlay;

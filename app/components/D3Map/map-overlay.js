import React from 'react';
import MapCountryBordersLayer from './map-country-borders-layer';

/* eslint-disable react/prefer-stateless-function */
class MapOverlay extends React.Component {
  componentDidMount() {
    const { map } = this.props;
    map.getPanes().overlayPane.appendChild(this.root);
  }

  componentWillUnmount() {
    const { map } = this.props;
    map.getPanes().overlayPane.removeChild(this.root);
  }

  render() {
    return (
      <div
        ref={
          borders => {
            this.root = borders;
          }
        }
      >
        <MapCountryBordersLayer
          {...this.props}
        />
      </div>
    );
  }
}

MapOverlay.propTypes = {
  map: React.PropTypes.object,
  bounds: React.PropTypes.array,
  provincesGeo: React.PropTypes.object,
  onViewreset: React.PropTypes.func,
};

export default MapOverlay;

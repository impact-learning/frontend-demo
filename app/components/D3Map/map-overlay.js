import React from 'react';
import MapCountryBordersLayer from './map-country-borders-layer';
import { CircleMarker } from 'react-leaflet';


/* eslint-disable react/prefer-stateless-function */
class MapOverlay extends React.Component {
  componentDidMount() {
    const { map } = this.props;
    map.zoomControl.removeFrom(map); // Remove Zoom control
    map.getPanes().overlayPane.appendChild(this.root);
  }

  componentWillReceiveProps(nextProps) {
    const { boundsForZoom } = nextProps;
    if (boundsForZoom.length) {
      const { map } = this.props;
      map.fitBounds(boundsForZoom);
    }
  }

  componentWillUnmount() {
    const { map } = this.props;
    map.getPanes().overlayPane.removeChild(this.root);
  }

  render() {
    const { impactData } = this.props;

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
        {impactData.map(d =>
          <CircleMarker
            key={`${[d.coordinates[1], d.coordinates[0]]}`}
            center={[d.coordinates[1], d.coordinates[0]]}
            radius={20}
            color="green"
            {...this.props}
          />
        )}
      </div>
    );
  }
}

MapOverlay.propTypes = {
  map: React.PropTypes.object,
  bounds: React.PropTypes.array,
  boundsForZoom: React.PropTypes.array,
  provincesGeo: React.PropTypes.object,
  impactData: React.PropTypes.array,
  onViewreset: React.PropTypes.func,
};

export default MapOverlay;

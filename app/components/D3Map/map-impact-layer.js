import React from 'react';
import MapBubble from './map-bubble';
// import { toD3Path } from './utils';
import geojson from 'geojson';
import L from 'leaflet';


/* eslint-disable react/prefer-stateless-function */
class MapImpactLayer extends React.Component {
  // constructor() {
  //   super();
  //   // this.updateD3 = this.updateD3.bind(this);
  // }

  shouldComponentUpdate(nextProps) {
    return this.props.bounds !== nextProps.bounds;
  }

  // updateD3(event) {
  //   const map = event.target;
  //   this.props.onViewreset(map);
  // }
  render() {
    const { impacts, bounds } = this.props;

    const theBounds = isEmpty(bounds) ? this.path.bounds(impacts) : bounds;
    const topLeft = theBounds[0];
    const bottomRight = theBounds[1];
    return (
      <svg
        className="map-country-borders-layer"
        ref="svg"
        width={bottomRight[0] - topLeft[0]}
        height={bottomRight[1] - topLeft[1]}
        style={{
          left: topLeft[0],
          top: topLeft[1],
        }}
      >
        <g transform={`translate(${-topLeft[0]},${-topLeft[1]})`} className="leaflet-zoom-hide">
        {impacts.map((v) =>
          (
          <MapBubble
            r={v.impact}
            coordinates={v.coordinates}
          />
          )
        )}
        </g>
      </svg>
    );
  }
}

MapImpactLayer.propTypes = {
  map: React.PropTypes.object,
  bounds: React.PropTypes.array,
  impacts: React.PropTypes.object,
  onViewreset: React.PropTypes.func,
};

export default MapImpactLayer;

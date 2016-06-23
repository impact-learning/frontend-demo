import React from 'react';
import MapBorder from './map-border';
import { toD3Path } from './utils';
// import isEmpty from 'lodash/isEmpty';

/* eslint-disable react/prefer-stateless-function */
class MapCountryBordersLayer extends React.Component {
  constructor() {
    super();
    this.updateD3 = this.updateD3.bind(this);
  }
  componentWillMount() {
    const { map } = this.props;
    this.path = toD3Path(map);
  }

  componentDidMount() {
    const { map } = this.props;

    map.on('viewreset', this.updateD3);
  }

  componentWillReceiveProps(newProps) {
    this.path = toD3Path(newProps.map);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.bounds !== nextProps.bounds;
  }

  updateD3(event) {
    const map = event.target;
    this.props.onViewreset(map);
  }

  render() {
    const { provincesGeo, bounds } = this.props;
    const theBounds = bounds.size ? bounds : this.path.bounds(provincesGeo);
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
        {provincesGeo.features.map((feature) =>
          (
          <MapBorder
            key={feature.id}
            path={this.path}
            feature={feature}
          />
          )
        )}
        </g>
      </svg>
    );
  }
}

MapCountryBordersLayer.propTypes = {
  map: React.PropTypes.object,
  bounds: React.PropTypes.array,
  provincesGeo: React.PropTypes.object,
  onViewreset: React.PropTypes.func,
};

export default MapCountryBordersLayer;

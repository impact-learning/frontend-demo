import React from 'react';
import d3 from 'd3';
import topojson from 'topojson';
import MapBorder from './map-border';
import L from 'leaflet';

/* eslint-disable react/prefer-stateless-function */
class MapCountryBordersLayer extends React.Component {
  render() {
    const {
      map,
      mapModel,
    } = this.props;
    const transform = d3.geo.transform({
      point(x, y) {
        const point = map.latLngToLayerPoint(new L.LatLng(y, x));
        this.stream.point(point.x, point.y);
      },
    });
    const path = d3.geo.path().projection(transform);

    const bounds = path.bounds(topojson.feature(mapModel, mapModel.objects.countries));
    const topLeft = bounds[0];
    const bottomRight = bounds[1];

    return (
      <svg
        className="map-country-borders-layer"
        width={bottomRight[0] - topLeft[0]}
        height={bottomRight[1] - topLeft[1]}
        style={{
          left: topLeft[0],
          top: topLeft[1],
        }}
      >
        <g transform={`translate(${-topLeft[0]},${-topLeft[1]})`} className="leaflet-zoom-hide">
        {topojson.feature(mapModel, mapModel.objects.countries).features.map((feature) =>
          (
          <MapBorder
            key={feature.id}
            path={path}
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
  mapModel: React.PropTypes.object,
  width: React.PropTypes.number,
  height: React.PropTypes.number,
};

export default MapCountryBordersLayer;

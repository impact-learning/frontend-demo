import d3 from 'd3';
import L from 'leaflet';

// Use leaflet's conversion method to convert the latlng points into d3's projection.
function toD3Path(mapInstance) {
  const transform = d3.geo.transform({
    point(x, y) {
      const point = mapInstance.latLngToLayerPoint(new L.LatLng(y, x));
      this.stream.point(point.x, point.y);
    },
  });
  return d3.geo.path().projection(transform);
}

export {
  toD3Path,
};

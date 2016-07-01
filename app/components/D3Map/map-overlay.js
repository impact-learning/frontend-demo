import React from 'react';
// import MapCountryBordersLayer from './map-country-borders-layer';
import { CircleMarker, Popup } from 'react-leaflet';
import { PieChart, Pie, Tooltip } from 'recharts';
import { precisionRound } from 'd3-format';

/* eslint-disable react/prefer-stateless-function */
class MapOverlay extends React.Component {
  componentDidMount() {
    const { map } = this.props;
    map.zoomControl.removeFrom(map); // Remove Zoom control
    map.getPanes().overlayPane.appendChild(this.root);
  }

  componentWillReceiveProps(nextProps) {
    const { boundsForZoom } = nextProps;
    if (boundsForZoom.length &&
      this.props.boundsForZoom !== nextProps.boundsForZoom
    ) {
      const { map } = this.props;
      map.fitBounds(boundsForZoom);
    }
  }

  componentWillUnmount() {
    const { map } = this.props;
    map.getPanes().overlayPane.removeChild(this.root);
  }

  render() {
    const { impactData, onClickCircle } = this.props;

    return (
      <div
        ref={
          borders => {
            this.root = borders;
          }
        }
      >
        {impactData.map(d =>
          <CircleMarker
            key={`${[d.coordinates[1], d.coordinates[0]]}`}
            center={[d.coordinates[1], d.coordinates[0]]}
            radius={d.score}
            color="green"
            {...this.props}
          >
            <Popup>
              <div>
                <span>Average Income (%)</span>
                <PieChart
                  width={300} height={200}
                >
                  <Pie
                    data={
                      Object.keys(d.income).map(k => ({
                        name: k,
                        value: precisionRound(d.income[k] * 100, 2),
                      }))
                    }
                    outerRadius={60}
                    fill="#8884d8"
                    label
                  />
                  <Tooltip />
                </PieChart>
              </div>
            </Popup>
          </CircleMarker>
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
  onClickCircle: React.PropTypes.func,
};

export default MapOverlay;

import React from 'react';
// import MapCountryBordersLayer from './map-country-borders-layer';
import { CircleMarker, Popup } from 'react-leaflet';
import { PieChart, Pie, Tooltip } from 'recharts';
import { precisionRound } from 'd3-format';
import { greenA700, greenA400, greenA200, amber900, amber400, amber700, cyan500 } from 'material-ui/styles/colors';
import { median, deviation } from 'd3-array';
import inRange from 'lodash/inRange';

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
    const { impactData } = this.props;
    const scores = impactData.map(d => d.score);
    const med = median(scores);
    const sd = deviation(scores);
    const colors = scores.map(s => {
      if (s > med + 2 * sd) return greenA700;
      if (inRange(s, med + sd, med + 2 * sd)) return greenA400;
      if (inRange(s, med, med + sd)) return greenA200;
      if (inRange(s, med - sd, med)) return amber400;
      if (inRange(s, med - 2 * sd, med - sd)) return amber700;
      return amber900;
    });

    return (
      <div
        ref={
          borders => {
            this.root = borders;
          }
        }
      >
        {impactData.map((d, i) =>
          <CircleMarker
            key={`${[d.coordinates[1], d.coordinates[0]]}`}
            center={[d.coordinates[1], d.coordinates[0]]}
            radius={d.score / 2}
            color={colors[i]}
            stroke={false}
            fillOpacity={0.7}
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
                    fill={cyan500}
                    isAnimationActive={false}
                    labelLine={false}
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

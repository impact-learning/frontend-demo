import React from 'react';
// import MapCountryBordersLayer from './map-country-borders-layer';
import { CircleMarker, Popup } from 'react-leaflet';
import { PieChart, Pie, Tooltip } from 'recharts';
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
            radius={Math.pow((d.score - med), 2) * Math.PI}
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
                      [
                        {
                          name: '<5k',
                          value: Math.round(d.income5k * 10000) / 100,
                        },
                        {
                          name: '5k - 10k',
                          value: Math.round(d.income10k * 10000) / 100,
                        },
                        {
                          name: '10k - 15k',
                          value: Math.round(d.income15k * 10000) / 100,
                        },
                        {
                          name: '15k - 20k',
                          value: Math.round(d.income20k * 10000) / 100,
                        },
                        {
                          name: '>25k',
                          value: Math.round(d.income25k * 10000) / 100,
                        },
                        {
                          name: '>25k',
                          value: Math.round(d.income30k * 10000) / 100,
                        },
                      ]
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

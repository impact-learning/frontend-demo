/*
 *
 * ImpactMap
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import D3Map, { toD3Path } from 'components/D3Map';
import provinceBordersCHN from 'data/state_chn.topo.json';
import jinxiu from 'data/jinxiu.topo.json';
import styles from './styles.css';
import { createStructuredSelector } from 'reselect';
import topojson from 'topojson';
import ActionSearch from 'material-ui/svg-icons/action/search';
import AutoComplete from 'material-ui/AutoComplete';
import Paper from 'material-ui/Paper';
// import LineChart from 'components/LineChart';
import ContainerDimensions from 'react-container-dimensions';
import socket from 'utils/socketio';
import isEmpty from 'lodash/isEmpty';
import inRange from 'lodash/inRange';
import L from 'leaflet';
import { grey500, cyan500 } from 'material-ui/styles/colors';

import IconButton from 'material-ui/IconButton';
import ArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import ArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import { browserHistory } from 'react-router';
import { getScreenSize, appBarHeight } from 'utils/utils';
import DataSelector from 'components/DataSelector';


import {
  updateMap,
  fitToBounds,
  addVillages,
  updateBoundsForZoom,
  updateCurrentX,
} from './actions';
import {
  boundsSelector,
  villagesSelector,
  boundsForZoomSelector,
  currentXSelector,
} from './selectors';

const brushHeight = 100;
const projects = [
  '绿化扶平',
  '金秀',
  'CGF',
];

class ImpactMap extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.onSearchResponse = this.onSearchResponse.bind(this);
    this.prepareData = this.prepareData.bind(this);
  }

  componentDidMount() {
    socket.on('search response', this.onSearchResponse);
    const { updateVillages, villages } = this.props;
    if (villages.length > 2) {
      updateVillages(villages);
    }
  }

  onSearchResponse(villages) {
    const { updateVillages } = this.props;
    updateVillages(JSON.parse(villages));
  }

  prepareData() {
    const { villages } = this.props;
    if (!Object.keys(villages).length) {
      return [{ x: 0, y: 0 }];
    }

    const score = {};
    Object.keys(villages).forEach(vk => {
      villages[vk].scores.forEach(s => {
        if (score[s.year]) {
          score[s.year] += s.overall;
        } else {
          score[s.year] = s.overall;
        }
      });
    });

    return Object.keys(score).map(k => ({
      x: k,
      y: score[k] / Object.keys(villages).length,
    }));
  }

  render() {
    const {
      bounds,
      onSearch,
      villages,
      boundsForZoom,
      currentX,
      onFilterX,
    } = this.props;

    const center = [35.3174, 104.8535];

    const d = isEmpty(villages) ? [{
      coordinates: [110.18394058186335, 24.13800001458207],
      date: new Date(),
      score: 20,
      income: {},
    }] : villages.map(v => ({
      coordinates: v.coordinates,
      date: new Date(v.date),
      score: v.Score,
      income: v.avg_income,
      income5k: v['average_income-5k'],
      income10k: v['average_income-5k_10k'],
      income15k: v['average_income-10k_15k'],
      income20k: v['average_income-15k_20k'],
      income25k: v['average_income-20k_25k'],
      income30k: v['average_income-25k'],
    }));

    return (
      <div className={styles.impactMap}>
        <ContainerDimensions>
          {
            ({ width }) =>
              <div>
                <D3Map
                  width={width}
                  height={(getScreenSize().height - (appBarHeight + brushHeight))}
                  center={center}
                  maxZoom={19}
                  zoom={4}
                  borderData={provinceBordersCHN}
                  projectCoordinates={jinxiu}
                  onViewreset={this.props.onViewreset}
                  bounds={bounds}
                  impactData={d.filter(i => {
                    if (isEmpty(currentX)) return true;
                    return inRange(i.date, currentX[0], currentX[1]);
                  })}
                  boundsForZoom={boundsForZoom}
                />
                <Paper
                  className={styles.searchBoxContainer}
                >
                  <AutoComplete
                    hintText={'Search for Project'}
                    dataSource={projects}
                    filter={AutoComplete.fuzzyFilter}
                    onNewRequest={onSearch}
                  />
                  <ActionSearch
                    color={grey500}
                    style={{
                      marginLeft: 12,
                    }}
                  />
                </Paper>
                <IconButton
                  style={{
                    display: 'block',
                    position: 'absolute',
                    top: '40%',
                    width: 80,
                    height: 80,
                    padding: 0,
                  }}
                  iconStyle={{
                    width: 80,
                    height: 80,
                  }}
                  onClick={() => browserHistory.push('dashboard')}
                >
                  <ArrowLeft
                    color={cyan500}
                  />
                </IconButton>
                <IconButton
                  style={{
                    display: 'block',
                    position: 'absolute',
                    top: '40%',
                    right: 0,
                    width: 80,
                    height: 80,
                    padding: 0,
                  }}
                  iconStyle={{
                    width: 80,
                    height: 80,
                  }}
                  onClick={() => browserHistory.push('prediction')}
                >
                  <ArrowRight
                    color={cyan500}
                  />
                </IconButton>
              </div>
        }
        </ContainerDimensions>
        <ContainerDimensions>
          {
            ({ width }) =>
              <DataSelector
                width={width}
                height={100}
                padding={{
                  top: 0,
                  left: 20,
                  right: 20,
                  bottom: 20,
                }}
                data={d}
                dateRange={[new Date(2010, 1, 1), new Date(2016, 7, 5)]}
                filterX={x => onFilterX(x)}
              />
          }
        </ContainerDimensions>
      </div>
    );
  }
}

ImpactMap.propTypes = {
  onViewreset: React.PropTypes.func,
  bounds: React.PropTypes.array,
  villages: React.PropTypes.object,
  scores: React.PropTypes.array,
  boundsForZoom: React.PropTypes.array,
  onSearch: React.PropTypes.func,
  updateVillages: React.PropTypes.func,
  onFilterX: React.PropTypes.func,
  currentX: React.PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  bounds: boundsSelector(),
  villages: villagesSelector(),
  boundsForZoom: boundsForZoomSelector(),
  currentX: currentXSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onViewreset: (map) => {
      dispatch(updateMap(map));
      const provincesGeo = topojson.feature(provinceBordersCHN, provinceBordersCHN.objects.states_chn);
      dispatch(fitToBounds(toD3Path(map).bounds(provincesGeo)));
    },
    onSearch: (county) => {
      if (projects.indexOf(county) >= 0) {
        socket.emit('search county', {
          county,
        });
      }
    },
    updateVillages: (villages) => {
      dispatch(addVillages(villages));
      const latLngs = villages.map(k => L.latLng(k.coordinates[1], k.coordinates[0]));
      const bounds = L.latLngBounds(latLngs);

      dispatch(updateBoundsForZoom([
        [bounds._southWest.lat, bounds._southWest.lng], // eslint-disable-line no-underscore-dangle
        [bounds._northEast.lat, bounds._northEast.lng], // eslint-disable-line no-underscore-dangle
      ]));
    },
    onFilterX: (x) => {
      dispatch(updateCurrentX(x));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ImpactMap);

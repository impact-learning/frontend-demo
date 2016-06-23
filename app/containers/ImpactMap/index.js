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
import L from 'leaflet';
// import { LineChart, XAxis, Line, Tooltip } from 'recharts';
import { VictoryChart, VictoryLine, VictoryScatter } from 'victory';
import IconButton from 'material-ui/IconButton';
import ArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import ArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import { browserHistory } from 'react-router';

import {
  updateMap,
  fitToBounds,
  addVillages,
  updateBoundsForZoom,
  updateCurrentYear,
} from './actions';
import {
  boundsSelector,
  villagesSelector,
  boundsForZoomSelector,
  currentYearSelector,
} from './selectors';

export class ImpactMap extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.onSearchResponse = this.onSearchResponse.bind(this);
    this.prepareData = this.prepareData.bind(this);
  }
  componentDidMount() {
    socket.on('search response', this.onSearchResponse);
    this.height = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;
  }

  componentWillReceiveProps() {
    this.height = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;
  }

  onSearchResponse(villages) {
    const { updateVillages } = this.props;
    updateVillages(villages);
  }

  onClickCircle(e) {
    console.log(e);
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
      currentYear,
      onClickOnChart,
    } = this.props;

    const center = [35.3174, 104.8535];
    const projects = [
      'Jinxiu',
      'Huangsan',
    ];
    const d = isEmpty(villages) ? [{
      coordinates: [110.18394058186335, 24.13800001458207],
      year: currentYear,
      score: 20,
    }] : Object.keys(villages).map(key => ({
      coordinates: villages[key].coordinates,
      year: currentYear,
      score: villages[key].scores.filter(s => s.year === currentYear)[0].overall,
    }));


    return (
      <ContainerDimensions>
        {
          ({ width }) =>
            <div className={styles.impactMap}>
              <D3Map
                width={width}
                height={this.height * 0.65}
                center={center}
                maxZoom={19}
                zoom={4}
                borderData={provinceBordersCHN}
                projectCoordinates={jinxiu}
                onViewreset={this.props.onViewreset}
                bounds={bounds}
                impactData={d}
                boundsForZoom={boundsForZoom}
                onClickCircle={console.log('OMG')}
              />
              <VictoryChart
                width={width}
                height={this.height * 0.15}
                events={
                  [{
                    taget: 'label',
                    childName: 'PPIScatter',
                    eventHandlers: {
                      onClick: (e, i) => {
                        onClickOnChart(i);
                      },
                    },
                  }]
                }
              >
                <VictoryLine
                  name="PPILine"
                  standalone={false}
                  interpolation="monotoneX"
                  data={this.prepareData()}
                />
                <VictoryScatter
                  name="PPIScatter"
                  standalone={false}
                  data={this.prepareData()}
                />
              </VictoryChart>
              <Paper
                className={styles.searchBoxContainer}
              >
                <ActionSearch />
                <AutoComplete
                  hintText={'Search for Project'}
                  dataSource={projects}
                  filter={AutoComplete.fuzzyFilter}
                  onNewRequest={onSearch}
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
                  color="#00BCD4"
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
                  color="#00BCD4"
                />
              </IconButton>
            </div>
        }
      </ContainerDimensions>
    );
  }
}

ImpactMap.propTypes = {
  onViewreset: React.PropTypes.func,
  bounds: React.PropTypes.array,
  villages: React.PropTypes.object,
  boundsForZoom: React.PropTypes.array,
  onSearch: React.PropTypes.func,
  updateVillages: React.PropTypes.func,
  onClickOnChart: React.PropTypes.func,
  currentYear: React.PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  bounds: boundsSelector(),
  villages: villagesSelector(),
  boundsForZoom: boundsForZoomSelector(),
  currentYear: currentYearSelector(),
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
      socket.emit('search county', {
        county,
      });
    },
    updateVillages: (villages) => {
      dispatch(addVillages(villages));
      const latLngs = Object.keys(villages).map(k => L.latLng(villages[k].coordinates[1], villages[k].coordinates[0]));
      const bounds = L.latLngBounds(latLngs);

      dispatch(updateBoundsForZoom([
        [bounds._southWest.lat, bounds._southWest.lng], // eslint-disable-line no-underscore-dangle
        [bounds._northEast.lat, bounds._northEast.lng], // eslint-disable-line no-underscore-dangle
      ]));
    },
    onClickOnChart: (item) => {
      const i = parseInt(item.key.split('-')[1], 10);
      dispatch(updateCurrentYear(2009 + i));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ImpactMap);

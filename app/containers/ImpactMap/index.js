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
import LineChart from 'components/LineChart';
import ContainerDimensions from 'react-container-dimensions';
import socket from 'utils/socketio';
import isEmpty from 'lodash/isEmpty';
import L from 'leaflet';

import {
  updateMap,
  fitToBounds,
  addVillages,
  updateBoundsForZoom,
} from './actions';
import {
  boundsSelector,
  villagesSelector,
  boundsForZoomSelector,
} from './selectors';

export class ImpactMap extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.onSearchResponse = this.onSearchResponse.bind(this);
  }
  componentDidMount() {
    socket.on('search response', this.onSearchResponse);
  }

  onSearchResponse(villages) {
    const { updateVillages } = this.props;
    updateVillages(villages);
  }

  render() {
    const {
      bounds,
      onSearch,
      villages,
      boundsForZoom,
    } = this.props;

    const center = [35.3174, 104.8535];
    const projects = [
      'Jinxiu',
      'Huangsan',
    ];
    const d = isEmpty(villages) ? [{
      coordinates: [110.18394058186335, 24.13800001458207],
    }] : Object.keys(villages).map(key => villages[key]);
    return (
      <div className={styles.impactMap}>
        <D3Map
          center={center}
          maxZoom={19}
          zoom={4}
          borderData={provinceBordersCHN}
          projectCoordinates={jinxiu}
          onViewreset={this.props.onViewreset}
          bounds={bounds}
          impactData={d}
          boundsForZoom={boundsForZoom}
        />
        <ContainerDimensions>
        {
          ({ width }) =>
            <LineChart
              width={width}
              height={80}
              className={styles.brush}
            />
        }
        </ContainerDimensions>
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
      </div>
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
};

const mapStateToProps = createStructuredSelector({
  bounds: boundsSelector(),
  villages: villagesSelector(),
  boundsForZoom: boundsForZoomSelector(),
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ImpactMap);

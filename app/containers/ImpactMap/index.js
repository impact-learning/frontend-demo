/*
 *
 * ImpactMap
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import D3Map, { toD3Path } from 'components/D3Map';
import { updateMap, fitToBounds, addVillages } from './actions';
import boundsSelector from './selectors';
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
    const { bounds, onSearch } = this.props;
    const center = [35.3174, 104.8535];
    const projects = [
      'Jinxiu',
      'Huangsan',
    ];

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
  onSearch: React.PropTypes.func,
  updateVillages: React.PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  bounds: boundsSelector(),
  // villages: villagesSelector(),
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
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ImpactMap);

/*
 *
 * ImpactMap
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import D3Map, { toD3Path } from 'components/D3Map';
import { updateMap, fitToBounds } from './actions';
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


export class ImpactMap extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    const { bounds } = this.props;
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
        <LineChart
          width={980}
          height={80}
          className={styles.brush}
        />
        <Paper
          className={styles.searchBoxContainer}
        >
          <ActionSearch />
          <AutoComplete
            hintText={'Search for Project'}
            dataSource={projects}
            filter={AutoComplete.fuzzyFilter}
          />
        </Paper>
      </div>
    );
  }
}

ImpactMap.propTypes = {
  onViewreset: React.PropTypes.func,
  bounds: React.PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  bounds: boundsSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onViewreset: (map) => {
      dispatch(updateMap(map));
      const provincesGeo = topojson.feature(provinceBordersCHN, provinceBordersCHN.objects.states_chn);
      dispatch(fitToBounds(toD3Path(map).bounds(provincesGeo)));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ImpactMap);

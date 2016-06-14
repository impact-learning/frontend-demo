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
import styles from './styles.css';
import { createStructuredSelector } from 'reselect';
import topojson from 'topojson';


export class ImpactMap extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    const { bounds } = this.props;
    const center = [24.1037, 109.9943];

    return (
      <div className={styles.impactMap}>
        <D3Map
          center={center}
          maxZoom={19}
          zoom={4}
          borderData={provinceBordersCHN}
          onViewreset={this.props.onViewreset}
          bounds={bounds}
        />
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
      console.log(`Map Reset: ${map}`);
      dispatch(updateMap(map));
      const provincesGeo = topojson.feature(provinceBordersCHN, provinceBordersCHN.objects.states_chn);
      dispatch(fitToBounds(toD3Path(map).bounds(provincesGeo)));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ImpactMap);

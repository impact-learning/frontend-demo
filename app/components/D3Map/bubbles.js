import React from 'react';
import {
  CircleMarker,
  LayerGroup,
  Popup,
} from 'react-leaflet';
import { PieChart, Pie, Legend, Tooltip } from 'recharts';


/* eslint-disable react/prefer-stateless-function */
class Bubbles extends React.Component {
  render() {
    const { impactData } = this.props;
    return (
      <LayerGroup
        {...this.props}
      >
        {impactData.map(d =>
          <CircleMarker
            key={`${d.coordinates}`}
            center={[d.coordinates[1], d.coordinates[0]]}
            radius={20}
            color="green"
            {...this.props}
          >
            <Popup>
              <span>Test</span>
            </Popup>
          </CircleMarker>
        )}
      </LayerGroup>
    );
  }
}


Bubbles.propTypes = {
  impactData: React.PropTypes.array,
  map: React.PropTypes.object,
};

export default Bubbles;

import React from 'react';


const MapBubble = ({ coordinates, r }) =>
  (
  <circle
    transform={`translate(${coordinates[0]},${coordinates[1]})`}
    r={r}
  >
  </circle>
  );


MapBubble.propTypes = {
  coordinates: React.PropTypes.array,
  r: React.PropTypes.number,
};

export default MapBubble;

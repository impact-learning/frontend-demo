import React from 'react';

/* eslint-disable react/prefer-stateless-function */
class MapBorder extends React.Component {
  render() {
    const {
      path,
      feature,
    } = this.props;
    return (
      <path
        key="p1"
        d={path(feature)}
      >
      </path>
    );
  }
}

MapBorder.propTypes = {
  map: React.PropTypes.func,
  path: React.PropTypes.func,
  feature: React.PropTypes.object,
  transform: React.PropTypes.string,
};

export default MapBorder;

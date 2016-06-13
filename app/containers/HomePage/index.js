/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a neccessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import D3Map from 'components/D3Map';

/* eslint-disable react/prefer-stateless-function */
export default class HomePage extends React.Component {

  render() {
    const center = [24.1037, 109.9943];
    const width = 960;
    const height = 776;

    return (
      <D3Map
        center={center}
        maxZoom={19}
        defaultZoomLevel={13}
        width={width}
        height={height}
      />
    );
  }
}

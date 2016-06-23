/*
 *
 * Prediction
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectPrediction from './selectors';
import styles from './styles.css';

export class Prediction extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={ styles.prediction }>
      This is Prediction container !
      </div>
    );
  }
}

const mapStateToProps = selectPrediction();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Prediction);

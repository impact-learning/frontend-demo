/*
 *
 * Prediction
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import styles from './styles.css';
import ContainerDimensions from 'react-container-dimensions';
import socket from 'utils/socketio';
import { createStructuredSelector } from 'reselect';

import {
  VictoryChart,
  VictoryLine,
  VictoryAxis,
} from 'victory';

import {
  updateScores,
} from './actions';


import {
  scoresSelector,
} from './selectors';

export class Prediction extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.onResponseHistData = this.onResponseHistData.bind(this);
  }

  componentDidMount() {
    this.props.onGetHistData();
    socket.on('response historical data', this.onResponseHistData);
  }

  onResponseHistData(data) {
    // console.log(data)
    console.log(data);
  }

  genFuzzy(basePoints, variances) {
    const intensity = 30;
    const fuzzyPoints = [];
    for (let i = 1; i <= intensity; i++) {
      const fp1 = [];
      basePoints.forEach((b, idx) => {
        fp1.push({
          x: b.x,
          y: b.y + b.y * (variances[idx] * i / intensity),
        });
      });
      fuzzyPoints.push(fp1);
    }
    return fuzzyPoints;
  }

  render() {
    const {
      scores,
    } = this.props;

    const variances = [0, 0, 0, 0, 0, 0, 0, 0.1, 0.17, 0.2, 0.3];
    const data = this.genFuzzy(scores, variances);
    return (
      <div className={styles.prediction}>
        <ContainerDimensions>
          {
            ({ width }) =>
              <VictoryChart
                width={width}
                height={450}
              >
                {
                  data.map(d =>
                    <VictoryLine
                      data={d}
                      interpolation="monotoneX"
                      style={{
                        data: {
                          stroke: '#00BCD4',
                          strokeOpacity: 0.4,
                          opacity: 0.3,
                        },
                      }}
                    />
                  )
                }
                <VictoryAxis
                  orientation="bottom"
                  standalone={false}
                />
                <VictoryAxis
                  dependentAxis
                  standalone={false}
                  orientation="left"
                />
                <VictoryAxis
                  dependentAxis
                  standalone={false}
                  orientation="right"
                />
              </VictoryChart>
          }
        </ContainerDimensions>
      </div>
    );
  }
}


Prediction.propTypes = {
  onGetHistData: React.PropTypes.func,
  updateTheScores: React.PropTypes.func,
  scores: React.PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  scores: scoresSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onGetHistData: () => {
      socket.emit('get historical data');
    },
    updateTheScores: (scores) => {
      updateScores(scores);
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Prediction);

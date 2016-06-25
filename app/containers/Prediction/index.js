/*
 *
 * Prediction
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectPrediction from './selectors';
import styles from './styles.css';
import ContainerDimensions from 'react-container-dimensions';
import {
  VictoryChart,
  VictoryLine,
} from 'victory';

export class Prediction extends React.Component { // eslint-disable-line react/prefer-stateless-function
  genFuzzy(basePoints, variances) {
    const intensity = 80;
    const fuzzyPoints = [];
    for (let i = 1; i <= intensity; i++) {
      const fp1 = [];
      basePoints.forEach((b, idx) => {
        fp1.push({
          x: b.x,
          y: b.y + b.y * variances[idx] * i / intensity,
        });
      });
      fuzzyPoints.push(fp1);
    }
    return fuzzyPoints;
  }
  renderLines() {

  }

  render() {
    const base = [
      { x: '2010', y: 2800 },
      { x: '2011', y: 3000 },
      { x: '2012', y: 2000 },
      { x: '2013', y: 2780 },
      { x: '2014', y: 1890 },
      { x: '2015', y: 2390 },
      { x: '2016', y: 3490 },
      { x: '2017', y: 4490 },
      { x: '2018', y: 6490 },
      { x: '2019', y: 8490 },
      { x: '2020', y: 9490 },
    ];
    const variances = [0, 0, 0, 0, 0, 0, 0, 0.1, 0.17, 0.2, 0.3];
    const data = this.genFuzzy(base, variances);
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
              </VictoryChart>
          }
        </ContainerDimensions>
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

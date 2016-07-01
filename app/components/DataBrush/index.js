/**
*
* DataBrush
*
*/

import React from 'react';
import {
  VictoryChart,
  VictoryLine,
  VictoryAxis,
} from 'victory';
import Paper from 'material-ui/Paper';
import { cyan500 } from 'material-ui/styles/colors';
// import { brushX } from 'd3-brush';
// import { select } from 'd3-selection';

import styles from './styles.css';

function DataBrush({ chart, width }) {
  // const lineChart = select(chart);
  // const brush = brushX();
  // lineChart.call(brush);
  return (
    <div className={styles.dataBrush}>
      <Paper
        className={styles.chart}
      >
        <VictoryChart
          ref={chart}
          width={width}
          height={100}
          padding={{
            top: 20,
            bottom: 25,
            left: 10,
            right: 10,
          }}
          style={{
            height: '100%',
          }}
        >
          <VictoryLine
            style={{
              data: {
                stroke: cyan500,
                strokeWidth: 1,
              },
            }}
          />
          <VictoryAxis
            style={{
              axis: {
                strokeWidth: 1,
              },
              ticks: {
                strokeWidth: 1,
              },
              tickLabels: {
                fontSize: 11,
              },
            }}
          />
        </VictoryChart>
      </Paper>
    </div>
  );
}

DataBrush.propTypes = {
  chart: React.PropTypes.func,
  width: React.PropTypes.number,
};

export default DataBrush;

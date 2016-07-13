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
import { greenA700, greenA400, greenA200, amber900, amber400, amber700, cyan500 } from 'material-ui/styles/colors';
import Slider from 'material-ui/Slider';
import {
  List,
  ListItem,
} from 'material-ui/List';

import {
  timeMonth,
} from 'd3-time';

import {
  format
} from 'd3-format';

import {
  min,
  max,
} from 'd3-array';

import {
  VictoryLine,
  VictoryScatter,
  VictoryAxis,
} from 'victory';

import {
  updateScores,
  updateDonation,
  updateYears,
} from './actions';


import {
  scoresSelector,
  donationSelector,
  yearsSelector,
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
    const {
      updatePrediction,
    } = this.props;
    const scores = JSON.parse(data);
    updatePrediction(scores);
  }

  genFuzzy(basePoints, variances) {
    const intensity = 30;
    const fuzzyPoints = [];
    for (let i = 1; i <= intensity; i++) {
      const fp1 = [];
      basePoints.forEach((b, idx) => {
        fp1.push({
          x: new Date(b.date),
          y: b.Score,
        });
      });
      fuzzyPoints.push(fp1);
    }
    return fuzzyPoints;
  }

  render() {
    const {
      scores,
      donation,
      years,
      onChangeDonation,
      onChangeYears,
    } = this.props;

    const variances = [0, 0, 0, 0, 0, 0, 0, 0.1, 0.17, 0.2, 0.3];
    const data = this.genFuzzy(scores, variances);
    const height = 450;
    const dates = scores.map(s => new Date(s.date));
    const scoreValues = scores.map(s => s.Score);
    const minDate = min(dates);
    const maxDate = max(dates);

    return (
      <div className={styles.prediction}>
        <ContainerDimensions>
          {
            ({ width }) =>
              <svg
                width={width}
                height={height}
              >
                {
                  data.map((d, i) =>
                    <VictoryLine
                      key={i}
                      data={d}
                      interpolation="monotoneX"
                      width={width}
                      height={height}
                      style={{
                        data: {
                          stroke: '#00BCD4',
                          strokeOpacity: 0.4,
                          opacity: 0.5,
                        },
                      }}
                    />
                  )
                }
                <VictoryScatter
                  data={scores}
                  width={width}
                  height={height}
                  x={(d) => new Date(d.date)}
                  y={(d) => d.median}
                  style={{
                    data: {
                      fill: greenA200,
                      opacity: 0.6,
                    },
                  }}
                  size={(d) => Math.PI * Math.pow(d.var, 2)}
                />
                <VictoryScatter
                  data={scores}
                  width={width}
                  height={height}
                  x={(d) => new Date(d.date)}
                  y={(d) => d.amax}
                  style={{
                    data: {
                      fill: amber400,
                      opacity: 0.6,
                    },
                  }}
                  size={(d) => Math.PI * Math.pow(d.var, 2)}
                />
                <VictoryScatter
                  data={scores}
                  width={width}
                  height={height}
                  x={(d) => new Date(d.date)}
                  y={(d) => d.amin}
                  style={{
                    data: {
                      fill: amber900,
                      opacity: 0.6,
                    },
                  }}
                  size={(d) => Math.PI * Math.pow(d.var, 2)}
                />
                <VictoryAxis
                  orientation="bottom"
                  standalone={false}
                  label="Date"
                  width={width}
                  height={height}
                  scale="time"
                  tickValues={
                    timeMonth.every(6).range(minDate, maxDate)
                  }
                />
                <VictoryAxis
                  dependent
                  standalone={false}
                  orientation="left"
                  width={width}
                  height={height}
                  domain={[min(scoreValues), max(scoreValues)]}
                />
                <VictoryAxis
                  dependentAxis
                  standalone={false}
                  orientation="right"
                  width={width}
                  height={height}
                  domain={[min(scoreValues), max(scoreValues)]}
                />
              </svg>
          }
        </ContainerDimensions>
        <List>
          <ListItem
            disabled
            primaryText={`Donation Amount ${format('$,.0f')(donation)}`}
            leftIcon={
              <Slider
                style={{
                  width: 200,
                  paddingLeft: 50,
                }}
                axis="x"
                min={0}
                max={100000000}
                defaultValue={donation}
                step={10000}
                onChange={onChangeDonation}
              />
            }
          />
          <ListItem
            disabled
            primaryText={`Predict to ${years}`}
            leftIcon={
              <Slider
                style={{
                  width: 200,
                  paddingLeft: 50,
                }}
                axis="x"
                min={(new Date()).getFullYear()}
                max={(new Date()).getFullYear() + 5}
                defaultValue={years}
                step={1}
                onChange={onChangeYears}
              />
            }
          />
        </List>
      </div>
    );
  }
}


Prediction.propTypes = {
  onGetHistData: React.PropTypes.func,
  updatePrediction: React.PropTypes.func,
  scores: React.PropTypes.array,
  donation: React.PropTypes.number,
  years: React.PropTypes.number,
  onChangeDonation: React.PropTypes.func,
  onChangeYears: React.PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  scores: scoresSelector(),
  donation: donationSelector(),
  years: yearsSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onGetHistData: () => {
      socket.emit('get historical data');
    },
    updatePrediction: (scores) => {
      dispatch(updateScores(scores));
    },
    onChangeDonation: (e, value) => {
      dispatch(updateDonation(value));
    },
    onChangeYears: (e, value) => {
      dispatch(updateYears(value));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Prediction);

/**
*
* DataSelector
*
*/

import React from 'react';
import {
  scaleTime,
} from 'd3-scale';
import {
  axisBottom,
} from 'd3-axis';
import {
  timeMonth,
} from 'd3-time';

import {
  brushX,
} from 'd3-brush';
import {
  event as d3Event,
  select,
} from 'd3-selection';

import {
  VictoryLine,
} from 'victory';

import styles from './styles.css';


class DataSelector extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    const {
      width,
      height,
      padding,
      dateRange,
    } = props;

    this.brushEnded = this.brushEnded.bind(this);

    this.contentWidth = width - padding.left - padding.right;

    this.contentHeight = height - padding.top - padding.bottom;

    this.x = scaleTime().domain(dateRange)
    .rangeRound([0, this.contentWidth]);

    this.brush = brushX()
      .extent([[0, 0], [this.contentWidth, this.contentHeight]])
      .on('end', this.brushEnded);

    this.axisGrid = axisBottom(this.x)
      .ticks(timeMonth, 1)
      .tickSize(-this.contentHeight)
      .tickFormat(() => null);

    this.axisX = axisBottom(this.x)
      .ticks(timeMonth.every(6))
      .tickPadding(0);
  }

  componentDidMount() {
    select(this.gAxisGrid).call(this.axisGrid)
      .selectAll('.tick')
      .classed('tick--minor', d => d.getMonth());
    select(this.gAxisX).call(this.axisX)
      .style('text-anchor', null)
      .selectAll('text')
      .attr('x', 6);
    select(this.gBrush).call(this.brush);
  }

  brushEnded() {
    if (!d3Event.sourceEvent) return; // Only transition after input.
    if (!d3Event.selection) return; // Ignore empty selections.
    const domain0 = d3Event.selection.map(this.x.invert);
    const domain1 = domain0.map(timeMonth.round);

    // If empty when rounded, use floor & ceil instead
    if (domain1[0] >= domain1[1]) {
      domain1[0] = timeMonth.floor(domain0[0]);
      domain1[1] = timeMonth.ceil(domain0[1]);
    }
    select(this.gBrush)
      .transition()
      .call(this.brush.move, domain1.map(this.x));
    this.props.filterX(domain1);
  }

  render() {
    const {
      width,
      height,
      padding,
      data,
    } = this.props;
    return (
      <div className={styles.dataSelector}>
        <svg
          width={width}
          height={height}
        >
          <g transform={`translate(${padding.left},${padding.top})`}>
            <VictoryLine
              data={data}
              interpolation="monotoneX"
              width={width}
              height={height}
              style={{
                data: {
                  stroke: '#00BCD4',
                  strokeOpacity: 1.0,
                  opacity: 1.0,
                },
              }}
              scale={{
                x: 'time',
                y: 'linear',
              }}
              x={(d) => new Date(d.date)}
              y={(d) => d.Score}
            />
          </g>
          <g
            transform={`translate(${padding.left},${padding.top})`}
          >
          </g>
          <g
            className={styles.grid}
            ref={c => {
              this.gAxisGrid = c;
              return this.gAxisGrid;
            }}
            transform={`translate(${padding.left},${this.contentHeight + padding.top})`}
          >
          </g>
          <g
            ref={
              c => {
                this.gAxisX = c;
                return this.gAxisX;
              }
            }
            transform={`translate(${padding.left},${this.contentHeight + padding.top})`}
          >
          </g>
          <g
            ref={
              c => {
                this.gBrush = c;
                return this.gBrush;
              }
            }
            transform={`translate(${padding.left},${padding.top})`}
            className={styles.brush}
          >
          </g>
        </svg>
      </div>
    );
  }
}

DataSelector.propTypes = {
  padding: React.PropTypes.object,
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  dateRange: React.PropTypes.array,
  filterX: React.PropTypes.func,
  data: React.PropTypes.array,
};

export default DataSelector;

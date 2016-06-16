/**
*
* LineChart
*
*/

import React from 'react';
import d3 from 'd3';

import styles from './styles.css';

/* eslint-disable react/prefer-stateless-function */
class LineChart extends React.Component {
  constructor(props) {
    super(props);
    const { width, height } = props;
    this.parseDate = d3.time.format('%d-%b-%y');
    this.x = d3.time.scale().range([0, width]);
    this.y = d3.scale.linear().range([height, 0]);
    this.xAxis = d3.svg.axis().scale(this.x).orient('bottom');
    this.yAxis = d3.svg.axis().scale(this.y).orient('left');
    this.line = d3.svg.line().interpolate('monotone')
    .x((d) => this.x(this.parseDate.parse(d.date)))
    .y((d) => this.y(d.price));
    this.brush = d3.svg.brush().x(this.x).on('brush', this.brushed);
  }

  componentDidMount() {
    d3.select(this.xaxis).call(this.xAxis)
    .attr('fill', 'none')
    .attr('stroke', '#000')
    .attr('shape-rendering', 'crispEdges');
    d3.select(this.root).call(this.brush)
    .selectAll('rect')
    .attr('transform', `translate(${20}, ${0})`)
    .attr('opacity', 0.125)
    .attr('stroke', '#fff')
    .attr('shape-rendering', 'crispEdges')
    .attr('height', this.props.height);
  }

  brushed() {
    console.log('brushed');
  }

  render() {
    const { width, height } = this.props;
    const data = [
      {
        date: '1-May-12',
        price: 582.13,
      },
      {
        date: '30-Apr-12',
        price: 583.98,
      },
      {
        date: '27-Apr-12',
        price: 603.00,
      },
      {
        date: '26-Apr-12',
        price: 607.70,
      },
      {
        date: '25-Apr-12',
        price: 610.00,
      },
      {
        date: '24-Apr-12',
        price: 560.28,
      },
      {
        date: '23-Apr-12',
        price: 571.70,
      },
      {
        date: '20-Apr-12',
        price: 572.98,
      },
      {
        date: '19-Apr-12',
        price: 587.44,
      },
      {
        date: '18-Apr-12',
        price: 608.34,
      },
      {
        date: '17-Apr-12',
        price: 609.70,
      },
      {
        date: '16-Apr-12',
        price: 580.13,
      },
      {
        date: '13-Apr-12',
        price: 605.23,
      },
      {
        date: '12-Apr-12',
        price: 622.77,
      },
      {
        date: '11-Apr-12',
        price: 626.20,
      },
      {
        date: '10-Apr-12',
        price: 3628.44,
      },
      {
        date: '9-Apr-12',
        price: 636.23,
      },
      {
        date: '5-Apr-12',
        price: 6833.68,
      },
      {
        date: '4-Apr-12',
        price: 624.31,
      },
      {
        date: '3-Apr-12',
        price: 629.32,
      },
      {
        date: '2-Apr-12',
        price: 0,
      },
    ];
    this.x.domain(d3.extent(data, d => this.parseDate.parse(d.date)));
    this.y.domain(d3.extent(data, d => d.price));
    const margin = {
      top: 2,
      right: 20,
      bottom: 30,
      left: 20,
    };
    return (
      <div className={styles.lineChart}>
        <svg
          ref={
            d => {
              this.root = d;
              return this.root;
            }
          }
          height={height + margin.top + margin.bottom}
          width={width + margin.left + margin.right}
        >
          <g
            transform={`translate(${margin.left}, ${margin.top})`}
          >
            {
              <path
                className={styles.line}
                d={`${this.line(data)}`}
              />
            }
          </g>
          <g
            ref={
              g => {
                this.xaxis = g;
                return g;
              }
            }
            transform={`translate(${margin.left},${margin.top + height})`}
          >
          </g>
        </svg>
      </div>
    );
  }
}

LineChart.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
};

export default LineChart;

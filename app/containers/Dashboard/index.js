/*
 *
 * Dashboard
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectDashboard from './selectors';
// import styles from './styles.css';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {
  VictoryPie,
  VictoryChart,
  VictoryBar,
  VictoryLine,
  VictoryAxis,
} from 'victory';
import { GridList, GridTile } from 'material-ui/GridList';


export class Dashboard extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = { open: false };
  }
  handleToggle = () => this.setState({ open: !this.state.open });
  handleClose = () => this.setState({ open: false });
  render() {
    const styles = {
      smallIcon: {
        width: 36,
        height: 36,
      },
      mediumIcon: {
        width: 48,
        height: 48,
      },
      largeIcon: {
        width: 60,
        height: 60,
      },
      small: {
        width: 72,
        height: 72,
        padding: 16,
      },
      medium: {
        width: 96,
        height: 96,
        padding: 24,
      },
      large: {
        width: 120,
        height: 120,
        padding: 30,
      },

      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',

      },
      gridList: {
        width: 2000,
        height: 370,
        overflowY: 'auto',
        marginBottom: 0,
      },
    };
    return (
      <div className={styles.dashboard}>
        <Card initiallyExpanded>
          <CardHeader
            title="Input 投入绩效"
            subtitle=""
            actAsExpander
            showExpandableButton
            titleColor="00CCFF"
          />
          <CardText expandable >
            <div style={styles.root}>
              <GridList
                cellHeight={360}
                style={styles.gridList}
                cols={3}
              >
                <GridTile>
                  <Card initiallyExpanded>
                    <CardHeader
                      title="总投入"
                      actAsExpander
                      showExpandableButton
                    />
                    <CardText
                      expandable
                      style={{ fontSize: 45 }}
                    >
                      <h1>2.47百万</h1>
                    </CardText>
                  </Card>
                </GridTile>
                <GridTile>
                  <card>
                    <CardHeader
                      title="植茶树数目"
                    />
                    <VictoryChart
                      domainPadding={{ x: 30, y: 30 }}
                      height={350}
                      width={500}
                    >
                      <VictoryBar
                        name="bar"
                        style={{
                          data: { width: 15, fill: 'Grey' },
                          labels: { fontSize: 20 },
                        }}
                        data={[
                          { x: 2010, y: 8.1 },
                          { x: 2011, y: 8.5 },
                          { x: 2012, y: 8.6 },
                          { x: 2013, y: 9.0 },
                          { x: 2014, y: 9.1 },
                          { x: 2015, y: 9.6 },
                          { x: 2016, y: 11.2 },
                        ]}
                      />
                      <VictoryLine
                        name="line"
                        data={[
                          { x: 2010, y: 8.1 },
                          { x: 2011, y: 8.5 },
                          { x: 2012, y: 8.6 },
                          { x: 2013, y: 9.0 },
                          { x: 2014, y: 9.1 },
                          { x: 2015, y: 9.6 },
                          { x: 2016, y: 11.2 },
                        ]}
                        style={{
                          data: { stroke: 'DarkTurquoise' },
                          labels: { fontSize: 20 },
                        }}
                      />
                      <VictoryAxis
                        tickFormat={
                          x => x
                        }
                      />
                      <VictoryAxis
                        dependentAxis
                        padding={75}
                        label="y-axis"
                        standalone={false}
                      />
                    </VictoryChart>
                  </card>
                </GridTile>
                <GridTile>
                  <Card>
                    <CardHeader
                      title="茶树木品种"
                    />
                    <CardText>
                      <VictoryPie
                        width={500}
                        height={350}
                        data={[
                          {animal: "石崖茶 12%", pet: 12, wild: 90},
                          {animal: "野生红茶 30％", pet: 56, wild: 90},
                          {animal: "银藤茶 40％", pet: 90, wild: 90},
                          {animal: "股蓝茶 18%", pet: 43, wild: 90},
                        ]}
                        x={"animal"}
                        y={(data) => data.pet + data.wild}
                      />
                    </CardText>
                  </Card>
                </GridTile>
              </GridList>
            </div>
          </CardText>
        </Card>

        <Card initiallyExpanded>
          <CardHeader
            title="Activity 活动绩效"
            subtitle=""
            actAsExpander
            showExpandableButton
          />
          <CardText expandable>
            <div style={styles.root}>
              <GridList
                cellHeight={350}
                style={styles.gridList}
                cols={3}
              >
                <GridTile>
                  <Card initiallyExpanded>
                    <CardHeader
                      title="树木存活"
                      actAsExpander
                      showExpandableButton
                    />
                    <CardText
                      expandable
                      style={{ fontSize: 50 }}
                    >
                      <h1>98.8 %</h1>
                    </CardText>
                  </Card>
                </GridTile>
                <GridTile>
                  <Card>
                    <CardHeader
                      title="树数目"
                    />
                    <CardText>
                        <VictoryChart
                        domainPadding={{x: 30, y: 30}}
                        height={350}
                        width={500}
                        events={[{
                          childName: "bar",
                          target: "data",
                          eventHandlers: {
                            onClick: () => {
                              return [
                                {
                                  target: "labels",
                                  eventKey: [2015, 2020, 2025],
                                  mutation: () => {
                                    return {text: "WOW"};
                                  }
                                }, {
                                  childName: "line",
                                  target: "data",
                                  mutation: (props) => {
                                    return {style: {stroke: "lime", strokeWidth:  5}};
                                  }
                                }, {
                                  childName: "line",
                                  target: "labels",
                                  mutation: () => {
                                    return {text: "LINE"};
                                  }
                                }
                              ];
                            }
                          }
                        }]}
                      >
                      <VictoryBar name="bar"
                        style={{
                          data: {width: 15, fill: "Grey"},
                          labels: {fontSize: 20}

                        }}
                        data={[
                          {x: 2010, y: 8.1},
                          {x: 2011, y: 8.5},
                          {x: 2012, y: 8.6},
                          {x: 2013, y: 9.0},
                          {x: 2014, y: 9.1},
                          {x: 2015, y: 9.6},
                          {x: 2016, y: 11.2}
                        ]}
                      />
                      <VictoryLine name="line"
                        data={[
                          {x: 2010, y: 8.1},
                          {x: 2011, y: 8.5},
                          {x: 2012, y: 8.6},
                          {x: 2013, y: 9.0},
                          {x: 2014, y: 9.1},
                          {x: 2015, y: 9.6},
                          {x: 2016, y: 11.2}
                        ]}
                        style={{
                          data: {stroke: "DarkTurquoise "},
                          labels: {fontSize: 20},

                        }}
                      />
                      <VictoryAxis
                        tickFormat={
                          x => x
                        }
                      />
                      <VictoryAxis dependentAxis
                        padding={75}
                        label="y-axis"
                        standalone={false}/>
                      </VictoryChart>
                    </CardText>
                  </Card>
                </GridTile>

                <GridTile>
                  <Card>
                    <CardHeader
                      title="树木品种"
                    />
                    <CardText>
                      <VictoryPie
                        width={500}
                        height={350}
                        data={[
                          {animal: "榕树 12%", pet: 22, wild: 90},
                          {animal: "杨树 30％", pet: 56, wild: 90},
                          {animal: "槐树 40％", pet: 60, wild: 90},
                          {animal: "大乔木 18%", pet: 45, wild: 90},
                          {animal: "杜鹃树 18%", pet: 22, wild: 90},
                          {animal: "巨杉树 18%", pet: 12, wild: 90},
                          {animal: "侧柏树 18%", pet: 87, wild: 90}
                        ]}
                        x={"animal"}
                        y={(data) => data.pet + data.wild}
                      />
                    </CardText>
                  </Card>
                </GridTile>
              </GridList>
            </div>
          </CardText>
        </Card>


        <Card>
          <CardHeader
            title="Output 产出绩效"
            subtitle=""
            actAsExpander
            showExpandableButton
          />
          <CardText expandable>
            <div style={styles.root}>
              <GridList
                cellHeight={350}
                style={styles.gridList}
                cols={3}
              >
                <GridTile>
                  <Card initiallyExpanded>
                    <CardHeader
                      title="树木存活"
                      actAsExpander
                      showExpandableButton
                    />
                    <CardText
                      expandable
                      style={{fontSize: 50}}
                    >
                      <h1>98.8 %</h1>
                    </CardText>
                  </Card>
                </GridTile>
                <GridTile>
                  <Card>
                    <CardHeader
                      title="茶树品种"
                    />
                    <CardText>
                      <VictoryChart
                        height={300}
                        scale={{
                          x: "time"
                        }}>
                        <VictoryAxis
                          label="Decades"
                          tickValues={[
                            new Date(2010, 1, 1),
                            new Date(2010, 1, 1),
                            new Date(2012, 1, 1),
                            new Date(2014, 1, 1),
                            new Date(2016, 1, 1),
                            new Date(2020, 1, 1),
                          ]}
                          tickFormat={(x) => x.getFullYear()}/>
                        <VictoryLine
                          data={[
                            {x: new Date(2010, 1, 1), y: 125},
                            {x: new Date(2011, 1, 1), y: 257},
                            {x: new Date(2012, 1, 1), y: 345},
                            {x: new Date(2013, 1, 1), y: 515},
                            {x: new Date(2014, 1, 1), y: 530},
                            {x: new Date(2015, 1, 1), y: 580},
                            {x: new Date(2016, 1, 1), y: 620},
                            {x: new Date(2020, 1, 1), y: 679}
                          ]}/>
                      </VictoryChart>
                    </CardText>
                  </Card>
                </GridTile>

                <GridTile>
                  <Card>
                    <CardHeader
                      title="茶葉品種"
                    />
                    <CardText>
                      <VictoryPie
                        width={500}
                        height={350}
                        data={[
                          {animal: "石崖茶 12%", pet: 12, wild: 90},
                          {animal: "野生红茶 30％", pet: 56, wild: 90},
                          {animal: "银藤茶 40％", pet: 90, wild: 90},
                          {animal: "股蓝茶 18%", pet: 43, wild: 90},
                        ]}
                        x={"animal"}
                        y={(data) => data.pet + data.wild}
                      />
                    </CardText>
                  </Card>
                </GridTile>
              </GridList>
            </div>
          </CardText>
          <CardActions expandable>
            <FlatButton label="Action1" />
            <FlatButton label="Action2" />
          </CardActions>
        </Card>
        <Card>
          <CardHeader
            title="Outcome 结果绩效"
            subtitle=""
            actAsExpander
            showExpandableButton
          />
          <CardText expandable>
          </CardText>
          <CardActions expandable>
            <FlatButton label="Action1" />
            <FlatButton label="Action2" />
          </CardActions>
        </Card>
        <Card>
          <CardHeader
            title="Impact 影响力绩效"
            subtitle=""
            actAsExpander
            showExpandableButton
          />
          <CardText expandable>
            <div style={styles.root}>
                <GridList
                  cellHeight={360}
                  style={styles.gridList}
                  cols={3}
                >
                  <GridTile>
                    <Card initiallyExpanded>
                      <CardHeader
                        title="总投入"
                        actAsExpander
                        showExpandableButton
                      />
                      <CardText expandable>
                        2.47百万
                      </CardText>
                    </Card>
                  </GridTile>
                  <GridTile>
                    <card>
                      <CardHeader
                        title="Title"
                      />
                      <VictoryChart
                        domainPadding={{x: 30, y: 30}}
                        height={350}
                        width={500}
                        events={[{
                          childName: "bar",
                          target: "data",
                          eventHandlers: {
                            onClick: () => {
                              return [
                                {
                                  target: "labels",
                                  eventKey: [2015, 2020, 2025],
                                  mutation: () => {
                                    return {text: "WOW"};
                                  }
                                }, {
                                  childName: "line",
                                  target: "data",
                                  mutation: (props) => {
                                    return {style: {stroke: "lime", strokeWidth:  5}};
                                  }
                                }, {
                                  childName: "line",
                                  target: "labels",
                                  mutation: () => {
                                    return {text: "LINE"};
                                  }
                                }
                              ];
                            }
                          }
                        }]}
                      >
                      <VictoryBar name="bar"
                        style={{
                          data: {width: 15, fill: "Grey"},
                          labels: {fontSize: 20}
                        }}
                        data={[
                          {x: 1, y: 100},
                          {x: 2, y: 200},
                          {x: 3, y: 230},
                          {x: 4, y: 250},
                          {x: 5, y: 280},
                          {x: 6, y: 300},
                          {x: 7, y: 310},
                          {x: 8, y: 500},
                          {x: 9, y: 600},
                          {x: 10, y: 650},
                          {x: 11, y: 690},
                          {x: 12, y: 800},
                          {x: 13, y: 900}
                        ]}
                      />
                      <VictoryLine name="line"
                        data={[
                         {x: 1, y: 100},
                          {x: 2, y: 200},
                          {x: 3, y: 230},
                          {x: 4, y: 250},
                          {x: 5, y: 280},
                          {x: 6, y: 300},
                          {x: 7, y: 310},
                          {x: 8, y: 500},
                          {x: 9, y: 600},
                          {x: 10, y: 650},
                          {x: 11, y: 690},
                          {x: 12, y: 800},
                          {x: 13, y: 900}
                        ]}
                        style={{
                          data: {stroke: "DarkTurquoise"},
                          labels: {fontSize: 20}
                        }}
                      />
                      </VictoryChart>
                    </card>
                  </GridTile>
                  <GridTile>
                    <Card>
                      <CardHeader
                        title="Title"
                      />
                      <CardText>
                        <VictoryPie
                          width={500}
                          height={350}
                          data={[
                            {animal: "石崖茶 12%", pet: 12, wild: 90},
                            {animal: "野生红茶 30％", pet: 56, wild: 90},
                            {animal: "银藤茶 40％", pet: 90, wild: 90},
                            {animal: "股蓝茶 18%", pet: 43, wild: 90},
                          ]}
                          x={"animal"}
                          y={(data) => data.pet + data.wild}
                        />
                      </CardText>
                    </Card>
                  </GridTile>
                </GridList>
              </div>
          </CardText>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = selectDashboard();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

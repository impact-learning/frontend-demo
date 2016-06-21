/*
 *
 * Dashboard
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectDashboard from './selectors';
import styles from './styles.css';
import AppBar from 'material-ui/AppBar';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import Divider from 'material-ui/Divider';
import { render } from 'react-dom';
import { VictoryPie } from 'victory';
import { VictoryChart } from 'victory';
import { VictoryBar } from 'victory';
import { VictoryStack } from 'victory';
import { VictoryLine } from 'victory';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import {GridList, GridTile} from 'material-ui/GridList';


export class Dashboard extends React.Component { // eslint-disable-line react/prefer-stateless-function
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
        width: 1000,
        height: 520,
        overflowY: 'auto',
        marginBottom: 24,
      },
    };

    const tilesData = [
      {
        img: 'images/grid-list/00-52-29-429_640.jpg',
        title: 'Breakfast',
        author: 'jill111',
      },
      {
        img: 'images/grid-list/burger-827309_640.jpg',
        title: 'Tasty burger',
        author: 'pashminu',
      },
      {
        img: 'images/grid-list/camera-813814_640.jpg',
        title: 'Camera',
        author: 'Danson67',
      },
      {
        img: 'images/grid-list/morning-819362_640.jpg',
        title: 'Morning',
        author: 'fancycrave1',
      },
      {
        img: 'images/grid-list/hats-829509_640.jpg',
        title: 'Hats',
        author: 'Hans',
      },
      {
        img: 'images/grid-list/honey-823614_640.jpg',
        title: 'Honey',
        author: 'fancycravel',
      },
      {
        img: 'images/grid-list/vegetables-790022_640.jpg',
        title: 'Vegetables',
        author: 'jill111',
      },
      {
        img: 'images/grid-list/water-plant-821293_640.jpg',
        title: 'Water plant',
        author: 'BkrmadtyaKarki',
      },
    ];
    return (
      <div className={styles.dashboard}>
        <AppBar
          title="Impact Learning Dashboard"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          iconElementRight={
            <IconMenu
              iconButtonElement={
                <IconButton><MoreVertIcon /></IconButton>
              }
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
              <MenuItem primaryText="Refresh" />
              <MenuItem primaryText="Help" />
              <Divider />
              <MenuItem primaryText="Log out" href={'http://localhost:3000'}/>
            </IconMenu>
          }
        />
        <IconButton
          iconStyle={styles.smallIcon}
          style={styles.small}
          className="smallIcon"
        >
          <ActionHome
            className="smallIcon" 
          />
        </IconButton>

        <Card initiallyExpanded={true}>
          <CardHeader
            title="Input 投入绩效"
            subtitle=""
            actAsExpander={true}
            showExpandableButton={true}
            titleColor="00CCFF"

          />
          <CardText expandable={true}>
             <div style={styles.root}>
                <GridList
                  cellHeight={500}
                  style={styles.gridList}
                >
                  <GridTile>
                    <VictoryChart 
                      domainPadding={{x: 30, y: 30}}
                      height={600} 
                      width={700}
                      events={[{
                        childName: "bar",
                        target: "data",
                        eventHandlers: {
                          onClick: () => {
                            return [
                              {
                                target: "labels",
                                eventKey: [2, 6, 10],
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
                          data: {width: 15, fill: "green"},
                          labels: {fontSize: 20}
                        }}
                        data={[
                          {x: 1, y: 100},
                          {x: 2, y: 200},
                          {x: 3, y: 300},
                          {x: 4, y: 400},
                          {x: 5, y: 500},
                          {x: 6, y: 600},
                          {x: 7, y: 700},
                          {x: 8, y: 800},
                          {x: 9, y: 900},
                          {x: 10, y: 1000},
                          {x: 11, y: 1100},
                          {x: 12, y: 1200},
                          {x: 13, y: 1300}
                        ]}
                      />
                      <VictoryLine name="line"
                        
                        data={[
                          {x: 1, y: 100},
                          {x: 2, y: 200},
                          {x: 3, y: 300},
                          {x: 4, y: 400},
                          {x: 5, y: 500},
                          {x: 6, y: 600},
                          {x: 7, y: 700},
                          {x: 8, y: 800},
                          {x: 9, y: 900},
                          {x: 10, y: 1000},
                          {x: 11, y: 1100},
                          {x: 12, y: 1200},
                          {x: 13, y: 1300}
                        ]}
                        style={{
                          data: {stroke: "blue"},
                          labels: {fontSize: 20}
                        }}
                      />

                    </VictoryChart>
                  </GridTile>
                  <GridTile>
                    <VictoryPie
                      width={450}
                      data={[
                        {animal: "Cat", pet: 45, wild: 17},
                        {animal: "Dog", pet: 85, wild: 6},
                        {animal: "Fish", pet: 55, wild: 0},
                        {animal: "Bird", pet: 15, wild: 40},
                      ]}
                      x={"animal"}
                      y={(data) => data.pet + data.wild}
                    />
                  </GridTile>
                </GridList>
              </div>

          </CardText>
          <CardActions expandable={true}>
            <FlatButton label="Action1" />
            <FlatButton label="Action2" />
          </CardActions>
        </Card>

        <Card >
          <CardHeader
            title="Activity 活动绩效"
            subtitle=""
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
            <VictoryChart
              height={300}
              width={1100}
              domainPadding={{x: 100}}>
              <VictoryStack
                labels={[
                  "apples\n(fuji)",
                  "bananas",
                  "oranges\n(navel)"
                ]}
                colorScale={"qualitative"}
              >
                <VictoryBar
                  data={[
                    {x: "apples", y: 1},
                    {x: "bananas", y: 3},
                    {x: "oranges", y: 3}
                  ]}
                />
                <VictoryBar
                  data={[
                    {x: "apples", y: 2},
                    {x: "bananas", y: 1},
                    {x: "oranges", y: 3}
                  ]}
                />
                <VictoryBar
                    data={[
                    {x: "apples", y: 3},
                    {x: "bananas", y: 1},
                    {x: "oranges", y: 1}
                  ]}
                />
              </VictoryStack>
            </VictoryChart>
          </CardText>
          <CardActions expandable={true}>
            <FlatButton label="Action1" />
            <FlatButton label="Action2" />
          </CardActions>
        </Card>
        <Card>
          <CardHeader
            title="Output 产出绩效"
            subtitle=""
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
            
            


          </CardText>
          <CardActions expandable={true}>
            <FlatButton label="Action1" />
            <FlatButton label="Action2" />
          </CardActions>
        </Card>
        <Card>
          <CardHeader
            title="Outcome 结果绩效"
            subtitle=""
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
           
          </CardText>
          <CardActions expandable={true}>
            <FlatButton label="Action1" />
            <FlatButton label="Action2" />
          </CardActions>
        </Card>
        <Card>
          <CardHeader
            title="Impact 影响力绩效"
            subtitle=""
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
          
            <div style={styles.root}>
                <GridList
                  cellHeight={500}
                  style={styles.gridList}
                >
                  <GridTile>
                    <VictoryChart 
                      domainPadding={{x: 30, y: 30}}
                      height={600} 
                      width={700}
                      events={[{
                        childName: "bar",
                        target: "data",
                        eventHandlers: {
                          onClick: () => {
                            return [
                              {
                                target: "labels",
                                eventKey: [2, 6, 10],
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
                          data: {width: 15, fill: "green"},
                          labels: {fontSize: 20}
                        }}
                        data={[
                          {x: 1, y: 100},
                          {x: 2, y: 200},
                          {x: 3, y: 300},
                          {x: 4, y: 400},
                          {x: 5, y: 500},
                          {x: 6, y: 600},
                          {x: 7, y: 700},
                          {x: 8, y: 800},
                          {x: 9, y: 900},
                          {x: 10, y: 1000},
                          {x: 11, y: 1100},
                          {x: 12, y: 1200},
                          {x: 13, y: 1300}
                        ]}
                      />
                      <VictoryLine name="line"
                        
                        data={[
                          {x: 1, y: 100},
                          {x: 2, y: 200},
                          {x: 3, y: 300},
                          {x: 4, y: 400},
                          {x: 5, y: 500},
                          {x: 6, y: 600},
                          {x: 7, y: 700},
                          {x: 8, y: 800},
                          {x: 9, y: 900},
                          {x: 10, y: 1000},
                          {x: 11, y: 1100},
                          {x: 12, y: 1200},
                          {x: 13, y: 1300}
                        ]}
                        style={{
                          data: {stroke: "blue"},
                          labels: {fontSize: 20}
                        }}
                      />

                    </VictoryChart>
                  </GridTile>
                  <GridTile>
                    <VictoryPie
                      width={450}
                      data={[
                        {animal: "Cat", pet: 45, wild: 17},
                        {animal: "Dog", pet: 85, wild: 6},
                        {animal: "Fish", pet: 55, wild: 0},
                        {animal: "Bird", pet: 15, wild: 40},
                      ]}
                      x={"animal"}
                      y={(data) => data.pet + data.wild}
                    />
                  </GridTile>
                </GridList>
              </div>

          </CardText>
          <CardActions expandable={true}>
            <FlatButton label="Action1" />
            <FlatButton label="Action2" />
          </CardActions>
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

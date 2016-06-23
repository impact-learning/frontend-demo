/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a neccessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { connect } from 'react-redux';
import socket from 'utils/socketio';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Listicon from 'material-ui/svg-icons/action/list';
import MapIcon from 'material-ui/svg-icons/maps/map';
import DashboardIcon from 'material-ui/svg-icons/action/dashboard';
import ChartIcon from 'material-ui/svg-icons/editor/show-chart';
import Drawer from 'material-ui/Drawer';
import { browserHistory } from 'react-router';
import { createStructuredSelector } from 'reselect';

import {
  toggleDrawer,
  updateDrawer,
} from 'containers/HomePage/actions';

import {
  drawerOpenedSelector,
} from 'containers/HomePage/selectors';

/* eslint-disable react/prefer-stateless-function */
class App extends React.Component {
  componentDidMount() {
    socket.on('connect', this.onConnect);
  }

  onConnect() {
    socket.emit('my event', 'yea');
  }

  render() {
    const { onToggleDrawer, drawerOpened, onRequestChange } = this.props;
    return (
      <div>
        <Drawer
          width={200}
          docked={false}
          open={drawerOpened}
          onRequestChange={(open) => onRequestChange(open)}
        >
          <MenuItem
            onTouchTap={() => {
              browserHistory.push('/impactMap');
              onRequestChange(false);
            }}
            leftIcon={<MapIcon />}
          >Impact Map</MenuItem>
          <MenuItem
            onTouchTap={() => {
              browserHistory.push('/dashboard');
              onRequestChange(false);
            }}
            leftIcon={<DashboardIcon />}
          >Dashboard</MenuItem>
          <MenuItem
            onTouchTap={() => {
              browserHistory.push('/prediction');
              onRequestChange(false);
            }}
            leftIcon={<ChartIcon />}
          >Prediction</MenuItem>
        </Drawer>
        <AppBar
          title="Impact Learning"
          iconElementLeft={
            <IconButton
              onTouchTap={onToggleDrawer}
            >
              <Listicon />
            </IconButton>
          }
          iconElementRight={
            <IconMenu
              iconButtonElement={
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              }
              targetOrigin={{
                horizontal: 'right',
                vertical: 'top',
              }}
              anchorOrigin={{
                horizontal: 'right',
                vertical: 'top',
              }}
            >
              <MenuItem primaryText="Refresh" />
              <MenuItem primaryText="Help" />
              <MenuItem
                primaryText="Sign out"
                onTouchTap={() => browserHistory.push('/')}
              />
            </IconMenu>
          }
        />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.node,
  onClickExpand: React.PropTypes.func,
  drawerOpened: React.PropTypes.bool,
  onToggleDrawer: React.PropTypes.func,
  onRequestChange: React.PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  drawerOpened: drawerOpenedSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onToggleDrawer: () => {
      dispatch(toggleDrawer());
    },
    onRequestChange: (open) => {
      dispatch(updateDrawer(open));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

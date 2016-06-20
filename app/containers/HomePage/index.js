/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a neccessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import styles from './style.css';
import RaisedButton from 'material-ui/RaisedButton';
import ActionSearch from 'material-ui/svg-icons/action/search';
import AutoComplete from 'material-ui/AutoComplete';
import AppBar from 'material-ui/AppBar';


/* eslint-disable react/prefer-stateless-function */
export default class HomePage extends React.Component {

  render() {
    const projects = [
      'Jinxiu',
      'Huangsan',
    ];
    return (
      <div>
        <AppBar
          title="Title"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
        <ActionSearch className={styles.searchIcon} />
        <AutoComplete
          className={styles.searchBar}
          hintText={'Search for Project'}
          dataSource={projects}
          filter={AutoComplete.fuzzyFilter}
        />

        <Paper
          className={styles.ID}
        >

          <TextField
            hintText="ID"
          /><br />
          <TextField
            hintText="Password Field"
            floatingLabelText="Password"
            type="password"
          /><br />
          <br>
          </br>
          <RaisedButton
            label="Login"
            href={'/impactMap'}
            linkButton
            fullWidth
            primary
          />
        </Paper>
      </div>
    );
  }
}

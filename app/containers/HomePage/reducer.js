/*
 *
 * App reducer
 *
 */

import { fromJS } from 'immutable';
import {
  TOGGLE_DRAWER,
  UPDATE_DRAWER,
} from './constants';

const initialState = fromJS({
  drawerOpened: false,
});

function homeReducer(state = initialState, action) {
  switch (action.type) {

    case TOGGLE_DRAWER: {
      return state.set('drawerOpened', !state.drawerOpened);
    }

    case UPDATE_DRAWER: {
      return state.merge({
        drawerOpened: action.open,
      });
    }

    default:
      return state;
  }
}

export default homeReducer;

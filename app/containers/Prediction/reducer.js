/*
 *
 * Prediction reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  UPDATE_SCORES,
} from './constants';

const initialState = fromJS({
  scores: [{x: 2016, y: 1000}],
});

function predictionReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case UPDATE_SCORES:
      return state.merge({
        scores: [],
      });
    default:
      return state;
  }
}

export default predictionReducer;

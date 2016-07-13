/*
 *
 * Prediction reducer
 *
 */

import { fromJS, Map } from 'immutable';
import {
  DEFAULT_ACTION,
  UPDATE_SCORES,
  UPDATE_DONATION,
  UPDATE_YEARS,
} from './constants';

const initialState = fromJS({
  scores: [{ date: 2016, Score: 1000 }],
  donation: 5000000.0,
  years: 2017,
});

function predictionReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case UPDATE_SCORES: {
      const scores = action.scores.reduce((s, json) =>
        s.set(json.date, fromJS(json)), Map()  // eslint-disable-line new-cap
      );
      return state.update('scores', () => scores);
    }
    case UPDATE_DONATION: {
      return state.merge({
        donation: action.donation,
      });
    }
    case UPDATE_YEARS: {
      return state.merge({
        years: action.years,
      });
    }
    default:
      return state;
  }
}

export default predictionReducer;

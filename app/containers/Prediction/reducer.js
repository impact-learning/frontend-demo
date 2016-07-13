/*
 *
 * Prediction reducer
 *
 */

import { fromJS, Map } from 'immutable';
import {
  DEFAULT_ACTION,
  UPDATE_SCORES,
} from './constants';

const initialState = fromJS({
  scores: [{ date: 2016, Score: 1000 }],
});

function predictionReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case UPDATE_SCORES: {
      const scores = action.scores.reduce((s, json) =>
        s.set(json.date, fromJS(json)), Map()  // eslint-disable-line new-cap
      );
      console.log(scores);
      return state.update('scores', () => scores);
    }
    default:
      return state;
  }
}

export default predictionReducer;

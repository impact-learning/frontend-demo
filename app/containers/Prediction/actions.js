/*
 *
 * Prediction actions
 *
 */

import {
  DEFAULT_ACTION,
  UPDATE_SCORES,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function updateScores(scores) {
  return {
    type: UPDATE_SCORES,
    scores,
  };
}

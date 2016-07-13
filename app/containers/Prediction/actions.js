/*
 *
 * Prediction actions
 *
 */

import {
  DEFAULT_ACTION,
  UPDATE_SCORES,
  UPDATE_DONATION,
  UPDATE_YEARS,
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


export function updateDonation(donation) {
  return {
    type: UPDATE_DONATION,
    donation,
  };
}

export function updateYears(years) {
  return {
    type: UPDATE_YEARS,
    years,
  };
}

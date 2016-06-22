/*
 *
 * ImpactMap actions
 *
 */

import {
  UPDATE_MAP,
  FIT_TO_BOUNDS,
  ADD_COUNTY,
} from './constants';

export function updateMap(map) {
  return {
    type: UPDATE_MAP,
    map,
  };
}

export function fitToBounds(bounds) {
  return {
    type: FIT_TO_BOUNDS,
    bounds,
  };
}

export function addCounty(county) {
  return {
    type: ADD_COUNTY,
    county,
  };
}

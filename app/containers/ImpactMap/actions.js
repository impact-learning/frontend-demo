/*
 *
 * ImpactMap actions
 *
 */

import {
  UPDATE_MAP,
  FIT_TO_BOUNDS,
  ADD_VILLAGES,
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

export function addVillages(villages) {
  return {
    type: ADD_VILLAGES,
    villages,
  };
}

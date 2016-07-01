/*
 *
 * ImpactMap actions
 *
 */

import {
  UPDATE_MAP,
  FIT_TO_BOUNDS,
  ADD_VILLAGES,
  UPDATE_BOUNDS_FOR_ZOOM,
  UPDATE_CURRENT_X,
  TOGGLE_DRAWER,
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

export function updateBoundsForZoom(bounds) {
  return {
    type: UPDATE_BOUNDS_FOR_ZOOM,
    bounds,
  };
}

export function updateCurrentX(x) {
  return {
    type: UPDATE_CURRENT_X,
    x,
  };
}


export function toggleDrawer() {
  return {
    type: TOGGLE_DRAWER,
  };
}

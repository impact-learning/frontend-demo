/*
 *
 * App actions
 *
 */

import {
  TOGGLE_DRAWER,
  UPDATE_DRAWER,
} from './constants';


export function toggleDrawer() {
  return {
    type: TOGGLE_DRAWER,
  };
}

export function updateDrawer(open) {
  return {
    type: UPDATE_DRAWER,
    open,
  };
}

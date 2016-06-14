/*
 *
 * ImpactMap reducer
 *
 */

import { fromJS } from 'immutable';
import {
  UPDATE_MAP,
  FIT_TO_BOUNDS,
} from './constants';

const initialState = fromJS({
  zoom: 0,
  center: [],
  bounds: [],
});

function impactMapReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_MAP: {
      return state.merge({
        zoom: action.map.getZoom(),
        center: action.map.getCenter(),
      });
    }
    case FIT_TO_BOUNDS: {
      return state.merge({ bounds: action.bounds });
    }
    default:
      return state;
  }
}

export default impactMapReducer;

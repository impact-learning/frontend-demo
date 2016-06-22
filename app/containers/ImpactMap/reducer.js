/*
 *
 * ImpactMap reducer
 *
 */

import { fromJS } from 'immutable';
import {
  UPDATE_MAP,
  FIT_TO_BOUNDS,
  ADD_COUNTY,
} from './constants';

const initialState = fromJS({
  zoom: 0,
  center: [],
  bounds: [],
  counties: {},
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

    case ADD_COUNTY: {
      const county = fromJS(action.county);
      return state.update('counties', counties =>
        counties.set(`${county.get('township')}${county.get('village')}`, county));
    }

    default:
      return state;
  }
}

export default impactMapReducer;

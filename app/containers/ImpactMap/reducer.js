/*
 *
 * ImpactMap reducer
 *
 */

import { fromJS, Map } from 'immutable';
import {
  UPDATE_MAP,
  FIT_TO_BOUNDS,
  ADD_VILLAGES,
} from './constants';

const initialState = fromJS({
  zoom: 0,
  center: [],
  bounds: [],
  villages: {},
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

    case ADD_VILLAGES: {
      const villages = action.villages.reduce((v, json) =>
        v.set(`${json.township}${json.village}`, fromJS(json)), Map() // eslint-disable-line new-cap
      );
      return state.update('villages', () => villages);
    }

    default:
      return state;
  }
}

export default impactMapReducer;

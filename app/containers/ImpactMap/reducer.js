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
  UPDATE_BOUNDS_FOR_ZOOM,
  UPDATE_CURRENT_X,
} from './constants';

const initialState = fromJS({
  zoom: 0,
  center: [],
  bounds: [],
  villages: {},
  boundsForZoom: [],
  currentX: [],
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

    case UPDATE_BOUNDS_FOR_ZOOM: {
      return state.merge({
        boundsForZoom: action.bounds,
      });
    }

    case UPDATE_CURRENT_X: {
      return state.merge({
        currentX: action.x,
      });
    }

    default:
      return state;
  }
}

export default impactMapReducer;

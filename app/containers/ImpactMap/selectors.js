import { createSelector } from 'reselect';

/**
 * Direct selector to the impactMap state domain
 */
const impactMapSelector = () => (state) => state.get('impactMap');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ImpactMap
 */

const boundsSelector = () => createSelector(
  impactMapSelector(),
  (impactMap) => impactMap.get('bounds').toJS(),
);

const villagesSelector = () => createSelector(
  impactMapSelector(),
  (impactMap) => impactMap.get('villages').toJS(),
);


const boundsForZoomSelector = () => createSelector(
  impactMapSelector(),
  (impactMap) => impactMap.get('boundsForZoom').toJS(),
);


const currentYearSelector = () => createSelector(
  impactMapSelector(),
  (impactMap) => impactMap.get('currentYear'),
);


const drawerOpenedSelector = () => createSelector(
  impactMapSelector(),
  (impactMap) => impactMap.get('drawerOpened'),
);


export {
  impactMapSelector,
  boundsSelector,
  villagesSelector,
  boundsForZoomSelector,
  currentYearSelector,
  drawerOpenedSelector,
};

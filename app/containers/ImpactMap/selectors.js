import { createSelector } from 'reselect';

/**
 * Direct selector to the impactMap state domain
 */
const selectImpactMapDomain = state => state.get('impactMap');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ImpactMap
 */

const boundsSelector = () => createSelector(
  [
    selectImpactMapDomain,
  ],
  impactMap => impactMap.get('bounds').toJS(),
);

export default boundsSelector;
export {
  selectImpactMapDomain,
};

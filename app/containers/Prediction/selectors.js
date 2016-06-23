import { createSelector } from 'reselect';

/**
 * Direct selector to the prediction state domain
 */
const selectPredictionDomain = () => state => state.get('prediction');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Prediction
 */

const selectPrediction = () => createSelector(
  selectPredictionDomain(),
  (substate) => substate.toJS()
);

export default selectPrediction;
export {
  selectPredictionDomain,
};

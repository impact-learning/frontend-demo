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


const scoresSelector = () => createSelector(
  selectPredictionDomain(),
  (prediction) => prediction.get('scores').toList().toJS(),
);

const donationSelector = () => createSelector(
  selectPredictionDomain(),
  (prediction) => prediction.get('donation'),
);
const yearsSelector = () => createSelector(
  selectPredictionDomain(),
  (prediction) => prediction.get('years'),
);

export default selectPrediction;
export {
  selectPredictionDomain,
  scoresSelector,
  donationSelector,
  yearsSelector,
};

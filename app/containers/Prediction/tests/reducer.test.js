import expect from 'expect';
import predictionReducer from '../reducer';
import { fromJS } from 'immutable';

describe('predictionReducer', () => {
  it('returns the initial state', () => {
    expect(predictionReducer(undefined, {})).toEqual(fromJS({}));
  });
});

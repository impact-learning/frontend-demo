import expect from 'expect';
import impactMapReducer from '../reducer';
import { fromJS } from 'immutable';

describe('impactMapReducer', () => {
  it('returns the initial state', () => {
    expect(impactMapReducer(undefined, {})).toEqual(fromJS({}));
  });
});

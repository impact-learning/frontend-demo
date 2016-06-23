import { createSelector } from 'reselect';

const homeDomainSelector = () => (state) => state.get('home');

const drawerOpenedSelector = () => createSelector(
  homeDomainSelector(),
  (home) => home.get('drawerOpened'),
);

export {
  homeDomainSelector,
  drawerOpenedSelector,
};

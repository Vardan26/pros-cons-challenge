import { createSelector } from 'reselect';

const selectHome = state => state.get('homeReducer');

const makeSelectProsCons = () => createSelector(
  selectHome,
  home => home.data,
);
const makeSelectProsConsCopy = () => createSelector(
  selectHome,
  home => home.dataCopy,
);
const makeSelectLoad = () => createSelector(
  selectHome,
  home => home.loading,
);
export { makeSelectProsCons, makeSelectLoad, makeSelectProsConsCopy };

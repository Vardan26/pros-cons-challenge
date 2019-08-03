import { createSelector } from 'reselect';

const selectGlobal = state => state.get('global');

const makeSelectLoad = () => createSelector(
  selectGlobal,
  app => app.loading,
);
const makeSelectUserId = () => createSelector(
  selectGlobal,
  app => app.userId,
);
const makeSelectGroupId = () => createSelector(
  selectGlobal,
  app => app.groupId,
);

export {
  makeSelectUserId,
  makeSelectGroupId,
  makeSelectLoad,
};

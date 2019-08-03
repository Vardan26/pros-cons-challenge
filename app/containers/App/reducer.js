import {
  LOAD_USERID,
  LOAD_USERID_SUCCESS,
  LOAD_USERID_FAIL,
  LOAD_GROUPID,
  LOAD_GROUPID_SUCCESS,
  LOAD_GROUPID_FAIL,
} from './constants';

import { VALIDATION_ERROR } from '../../errors/error-types';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  userId: '',
  groupId: '',
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_USERID: {
      return Object.assign({}, state, {
        loading: true,
      });
    }

    case LOAD_USERID_SUCCESS: {
      return Object.assign({}, state, {
        userId: action.data,
        loading: false,
        validationErrors: [],
      });
    }

    case LOAD_USERID_FAIL: {
      return Object.assign({}, state, {
        validationErrors: action.error,
        loading: false,
      });
    }

    case LOAD_GROUPID: {
      return Object.assign({}, state, {
        loading: true,
      });
    }

    case LOAD_GROUPID_SUCCESS: {
      return Object.assign({}, state, {
        groupId: action.data,
        loading: false,
        validationErrors: [],
      });
    }

    case LOAD_GROUPID_FAIL: {
      return Object.assign({}, state, {
        validationErrors: action.error,
        loading: false,
      });
    }

    default:
      if (action.error && action.error.type) {
        switch (action.error.type) {
          case VALIDATION_ERROR: {
            return Object.assign({}, state, {
              validationErrors: action.error.validationErrors,
            });
          }
        }
      } else {
        return state;
      }
  }
}

export default appReducer;

import {
  LOAD_USERID,
  LOAD_USERID_SUCCESS,
  LOAD_USERID_FAIL,
  LOAD_GROUPID,
  LOAD_GROUPID_SUCCESS,
  LOAD_GROUPID_FAIL,
} from './constants';

export function loadUserId() {
  return {
    type: LOAD_USERID,
  };
}

export function loadUserIdSuccess(data) {
  return {
    type: LOAD_USERID_SUCCESS,
    data,
  };
}

export function loadUserIdFail(error) {
  return {
    type: LOAD_USERID_FAIL,
    error,
  };
}

export function loadGroupId() {
  return {
    type: LOAD_GROUPID,
  };
}

export function loadGroupIdSuccess(data) {
  return {
    type: LOAD_GROUPID_SUCCESS,
    data,
  };
}

export function loadGroupIdFail(error) {
  return {
    type: LOAD_GROUPID_FAIL,
    error,
  };
}

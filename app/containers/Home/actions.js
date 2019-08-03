import {
  LOAD_PROS_CONS,
  LOAD_PROS_CONS_SUCCESS,
  LOAD_PROS_CONS_FAIL,
  EDIT_PROS_CONS,
} from './constants';

export function getProsCons(data) {
  return {
    type: LOAD_PROS_CONS,
    data,
  };
}

export function getProsConsSuccess(data) {
  return {
    type: LOAD_PROS_CONS_SUCCESS,
    data,
  };
}

export function getProsConsFail(error) {
  return {
    type: LOAD_PROS_CONS_FAIL,
    error,
  };
}

export function editProsCons(data) {
  return {
    type: EDIT_PROS_CONS,
    data,
  };
}

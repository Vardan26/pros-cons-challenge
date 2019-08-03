import { call, put, takeLatest } from 'redux-saga/effects';
import remote from '../../hoc/request';

import {
  LOAD_PROS_CONS,
  EDIT_PROS_CONS,
} from './constants';

import {
  getProsConsSuccess,
  getProsConsFail,
} from './actions';

export default function* watchAppSaga() {
  yield takeLatest(LOAD_PROS_CONS, _loadProsCons);
  yield takeLatest(EDIT_PROS_CONS, _editProsCons);
}

export function* _loadProsCons(action) {
  const url = `/proscons/group/${action.data.groupId}/user/${action.data.userId}`;
  try {
    const response = yield call(remote, {
      route: url,
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.success) {
      yield put(getProsConsSuccess(response.data));
    } else {
      yield put(getProsConsFail(response.error.message));
    }
  } catch (e) {
    console.log(e);
  }
}

export function* _editProsCons(action) {
  const url = `/proscons/group/${action.data.user.groupId}/user/${action.data.user.userId}`;
  try {
    const response = yield call(remote, {
      route: url,
      method: 'put',
      body: JSON.stringify(action.data.newData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.success) {
      yield put(getProsConsSuccess(response.data));
    } else {
      yield put(getProsConsFail(response.error.message));
    }
  } catch (e) {
    console.log(e);
  }
}

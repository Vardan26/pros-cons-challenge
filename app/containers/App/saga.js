import { call, put, takeLatest } from 'redux-saga/effects';
import remote from '../../hoc/request';

import {
  LOAD_USERID,
  LOAD_GROUPID,
} from './constants';

import {
  loadUserIdSuccess,
  loadUserIdFail,
  loadGroupIdSuccess,
  loadGroupIdFail,
} from './actions';


export default function* watchAppSaga() {
  yield takeLatest(LOAD_USERID, _loadUserId);
  yield takeLatest(LOAD_GROUPID, _loadUgroupId);
}

export function* _loadUserId(action) {
  const url = '/user/vardan_shahbazyan';

  try {
    const response = yield call(remote, {
      route: url,
      method: 'get',
      body: JSON.stringify(action.data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.success) {
      yield put(loadUserIdSuccess(response.data.userId));
    } else {
      yield put(loadUserIdFail(response.error.message));
    }
  } catch (e) {
    console.log(e);
  }
}

export function* _loadUgroupId(action) {
  const url = '/group/vardan_shahbazyan';

  try {
    const response = yield call(remote, {
      route: url,
      method: 'get',
      body: JSON.stringify(action.data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.success) {
      yield put(loadGroupIdSuccess(response.data.groupId));
    } else {
      yield put(loadGroupIdFail(response.error.message));
    }
  } catch (e) {
    console.log(e);
  }
}

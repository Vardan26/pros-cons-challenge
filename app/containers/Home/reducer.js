import {
  LOAD_PROS_CONS,
  LOAD_PROS_CONS_SUCCESS,
  LOAD_PROS_CONS_FAIL,
} from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  data: null,
  dataCopy: null,
};

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_PROS_CONS: {
      return Object.assign({}, state, {
        loading: true,
      });
    }

    case LOAD_PROS_CONS_SUCCESS: {
      return Object.assign({}, state, {
        data: action.data,
        loading: false,
      });
    }

    case LOAD_PROS_CONS_FAIL: {
      return Object.assign({}, state, {
        loading: false,
      });
    }

    default:
      return state;
  }
}

export default homeReducer;

import 'whatwg-fetch';

import {
  HTTP_CREATED,
  HTTP_OK,
  HTTP_UNPROCESSABLE_ENTITY,
  HTTP_BAD_REQUEST,
  HTTP_NOT_FOUND,
  HTTP_CONFLICT,
  HTTP_INTERNAL_SERVER_ERROR,
} from '../errors/status-codes';
import {
  UNKNOWN_ERROR,
  VALIDATION_ERROR,
  PAGE_NOT_FOUND_ERROR,
  SERVER_ERROR,
} from '../errors/error-types';

import { store } from '../utils/store';
import * as actionCreators from '../containers/App/actions';

const DEFAULT_ERROR_MESSAGE = 'Something went wrong. Please try again later.';

function getErrorFromResponse(response, statusCode) {
  let error = {
    type: UNKNOWN_ERROR,
    message: DEFAULT_ERROR_MESSAGE,
  };
  if (statusCode === HTTP_BAD_REQUEST || statusCode === HTTP_CONFLICT) {
    error.type = response.type;
    error.message = response.error.message;
  } else if (statusCode === HTTP_UNPROCESSABLE_ENTITY) {
    error.type = VALIDATION_ERROR;
    if (response.error.message && Object.keys(response.error.message).length) {
      error.validationErrors = {};
      if (typeof response.error.message === []) {
        Object.keys(response.error.message).forEach(key => {
          error.validationErrors[key] = response.error.message[key][0];
        });
      } else {
        error.validationErrors = response.error.message;
      }
      delete error.message;
    } else if (response.error.message) {
      console.warn('Got validation error without field specified.', response);
      error.message = response.error.message;
    }
  } else if (statusCode === HTTP_NOT_FOUND) {
    error.type = PAGE_NOT_FOUND_ERROR;
    error.message = `The page you're looking for can't be found.`;
  } else if (statusCode >= HTTP_INTERNAL_SERVER_ERROR) { // Server Error group
    error.type = SERVER_ERROR;
    error.message = DEFAULT_ERROR_MESSAGE;
  }
  return error;
}

export const METHOD_GET = 'get';
export const METHOD_DELETE = 'delete';
export const METHOD_PUT = 'put';
export const METHOD_POST = 'post';

export default function* request(options) {
  const url = process.env.APP_BASE_URL + options.route || "https://avetiq-test.firebaseapp.com";

  options.headers = options.headers || {};
  // options.headers['Access-Control-Allow-Origin'] = "*";

  let statusCode;
  const returnData = {
    success: false,
    data: {},
    error: {},
  };

  return yield fetch(url, options)
    .then(response => {
      statusCode = response.status;
      if (statusCode === HTTP_OK || statusCode === HTTP_CREATED) {
        returnData.success = true;
      }
      if (statusCode >= 400 && statusCode !== 422) {
        returnData.success = false;
      }
      if (options.method === METHOD_DELETE && statusCode === HTTP_OK) {
        return '';
      }

      return response.json()
        .catch(err => {
          if (options.method === METHOD_GET) {
            throw err;
          } else {
            console.warn('Invalid json response received.', err);
            return '';
          }
        });
    })
    .then(response => {
      if (returnData.success) {
        returnData.data = response;
      } else {
        returnData.error = getErrorFromResponse(response, statusCode);
      }
      return returnData;
    })
    .catch(error => {
      returnData.success = false;
      returnData.error.type = UNKNOWN_ERROR;
      returnData.error.message = DEFAULT_ERROR_MESSAGE;
      return returnData;
    });
}

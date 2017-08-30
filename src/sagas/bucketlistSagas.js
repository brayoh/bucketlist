import { put, call } from "redux-saga/effects";
import {
  GET_BUCKETLISTS_SUCCESS,
  GET_BUCKETLISTS_FAILURE
} from "../actions/constants";

import Api from "../common/bucketlistService";

export function* getBucketlists(token) {
  try {
    // make request to server
    const bucketData = yield call(Api.getBuckets, token);
    // login was successful dispatch success
    yield put({
      type: GET_BUCKETLISTS_SUCCESS,
      payload: {
        data: bucketData.bucketlists
      }
    });
  } catch (error) {
    // login failed dispatch failure
    yield put({
      type: GET_BUCKETLISTS_FAILURE,
      payload: {
        message: error.response.data.message,
        status: error.response.data.status
      }
    });
  }
}

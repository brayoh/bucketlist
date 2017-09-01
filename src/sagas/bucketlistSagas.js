import { put, call } from "redux-saga/effects";
import {
  GET_BUCKETLISTS_SUCCESS,
  GET_BUCKETLISTS_FAILURE,
  ADD_BUCKETLIST_SUCCESS,
  ADD_BUCKETLIST_FAILURE,
  UPDATE_BUCKETLIST_SUCCESS,
  UPDATE_BUCKETLIST_FAILURE,
  DELETE_BUCKETLIST_SUCCESS,
  DELETE_BUCKETLIST_FAILURE
} from "../actions/constants";

import Api from "../common/bucketlistService";

export function* getBucketlists(token: string) {
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

export function* addBucketlist(data: Object) {
  try {
    // make request to server
    const bucketData = yield call(Api.addBucket, data.payload);
    // login was successful dispatch success
    yield put({
      type: ADD_BUCKETLIST_SUCCESS,
      payload: {
        message: bucketData.message,
        status: bucketData.status
      }
    });
  } catch (error) {
    // login failed dispatch failure
    yield put({
      type: ADD_BUCKETLIST_FAILURE,
      payload: {
        message: error.response.data.message,
        status: error.response.data.status
      }
    });
  }
}

export function* updateBucketlist(data: Object) {
  try {
    console.log(data)
    // make request to server
    const bucketData = yield call(Api.updateBucket, data.payload);
    // login was successful dispatch success
    yield put({
      type: UPDATE_BUCKETLIST_SUCCESS,
      payload: {
        status: bucketData.status,
        message: bucketData.message
      }
    });
  } catch (error) {
    console.log(error)
    // login failed dispatch failure
    yield put({
      type: UPDATE_BUCKETLIST_FAILURE,
      payload: {
        message: error.response.data.message,
        status: error.response.data.status
      }
    });
  }
}

export function* deleteBucketlist(data: Object) {
  try {
    // make request to server
    const bucketData = yield call(Api.deleteBucket, data.payload);
    // login was successful dispatch success
    yield put({
      type: DELETE_BUCKETLIST_SUCCESS,
      payload: {
        message: bucketData.message,
        status: bucketData.status,
        bucket_id: data.payload.bucket_id
      }
    });
  } catch (error) {
    // login failed dispatch failure
    yield put({
      type: DELETE_BUCKETLIST_FAILURE,
      payload: {
        message: error.response.data.message,
        status: error.response.data.status
      }
    });
  }
}

import { takeLatest } from 'redux-saga/effects';
import {loginUser, registerUser} from "./authorizationSagas";
import {getBucketlists, addBucketlist, deleteBucketlist} from "./bucketlistSagas";
import {whoami} from "./whoamiSaga";

import {
  LOGIN_REQUEST,
  SIGNUP_REQUEST,
  WHOAMI_REQUEST,
  GET_BUCKETLISTS_REQUEST,
  ADD_BUCKETLIST_REQUEST,
  DELETE_BUCKETLIST_REQUEST
} from "../actions/constants";

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield [
    takeLatest(LOGIN_REQUEST, loginUser),
    takeLatest(SIGNUP_REQUEST, registerUser),
    takeLatest(GET_BUCKETLISTS_REQUEST, getBucketlists),
    takeLatest(ADD_BUCKETLIST_REQUEST, addBucketlist),
    takeLatest(DELETE_BUCKETLIST_REQUEST, deleteBucketlist),
    takeLatest(WHOAMI_REQUEST, whoami)
  ]
}

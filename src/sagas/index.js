import { takeLatest } from 'redux-saga/effects';
import {loginUser, registerUser} from "./authorizationSagas";
import {
  getBucketlists,
  addBucketlist,
  updateBucketlist,
  deleteBucketlist
} from "./bucketlistSagas";
import {
  addItem,
  updateItem,
  deleteItem
} from "./itemSaga";
import {whoami} from "./whoamiSaga";

import {
  LOGIN_REQUEST,
  SIGNUP_REQUEST,
  WHOAMI_REQUEST,
  GET_BUCKETLISTS_REQUEST,
  ADD_BUCKETLIST_REQUEST,
  UPDATE_BUCKETLIST_REQUEST,
  DELETE_BUCKETLIST_REQUEST,
  ADD_ITEM_REQUEST,
  UPDATE_ITEM_REQUEST,
  DELETE_ITEM_REQUEST
} from "../actions/constants";

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield [
    takeLatest(LOGIN_REQUEST, loginUser),
    takeLatest(SIGNUP_REQUEST, registerUser),
    takeLatest(WHOAMI_REQUEST, whoami),
    takeLatest(GET_BUCKETLISTS_REQUEST, getBucketlists),
    takeLatest(ADD_BUCKETLIST_REQUEST, addBucketlist),
    takeLatest(UPDATE_BUCKETLIST_REQUEST, updateBucketlist),
    takeLatest(DELETE_BUCKETLIST_REQUEST, deleteBucketlist),
    takeLatest(ADD_ITEM_REQUEST, addItem),
    takeLatest(UPDATE_ITEM_REQUEST, updateItem),
    takeLatest(DELETE_ITEM_REQUEST, deleteItem),

  ]
}

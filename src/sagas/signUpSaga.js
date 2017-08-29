import {put} from "redux-saga/effects";
import {SIGNUP_REQUEST, SIGNUP_FAILURE, SIGNUP_SUCCESS} from "../actions/constants";

export function* registerUser(data) {
  console.log("async saga", data)
  yield put({type: SIGNUP_SUCCESS})
}

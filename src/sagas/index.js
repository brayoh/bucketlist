import { takeLatest } from 'redux-saga/effects';

import {LOGIN_REQUEST, SIGNUP_REQUEST} from "../actions/constants";
import {loginUser} from "./loginSaga";
import {registerUser} from "./signUpSaga";

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield [
    takeLatest(LOGIN_REQUEST, loginUser),
    takeLatest(SIGNUP_REQUEST, registerUser)
  ]
}

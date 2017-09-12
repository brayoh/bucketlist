import { put, call } from "redux-saga/effects";
import {
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS
} from "../actions/constants";

import Api from "../common/authService";

export function* loginUser(data) {
  try {
    // make request to server
    const authData = yield call(Api.loginUser, data.user);

    // save token in localStorage
    if (localStorage !== undefined) {
      localStorage.setItem("awesome_bucketlist_token", authData.token)
    }

    // get user info
    yield put({
      type: WHOAMI_REQUEST,
      token: authData.token
    });

    // login was successful dispatch success
    yield put({
      type: LOGIN_SUCCESS,
      payload: {
        message: authData.message,
        status: authData.status
      }
    });
  } catch (error) {
    // login failed dispatch failure
    yield put({
      type: LOGIN_FAILURE,
      payload: {
        message: error.response.data.message,
        status: error.response.data.status
      }
    });
  }
}

export function* registerUser(data) {
  try {
    // make request to server
    const authData = yield call(Api.registerUser, data.user);
    // login was successful dispatch success
    yield put({
      type: SIGNUP_SUCCESS,
      payload: {
        message: authData.message,
        status: authData.status,

      }
    });
  } catch (error) {
    // login failed dispatch failure
    yield put({
      type: SIGNUP_FAILURE,
      payload: {
        message: error.response.data.message,
        status: (error.status !== 200) ? "failed" : "success"
      }
    });
  }
}

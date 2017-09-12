import {put, call} from "redux-saga/effects";
import {WHOAMI_FAILURE, WHOAMI_SUCCESS, REDIRECT} from "../actions/constants";
import Api from "../common/authService";
import { push } from "react-router-redux";

export function* whoami(data) {
  try {
    // make request to server
    const authData = yield call(Api.fetchUserData, data.token);
    // login was successful dispatch success
    yield put({
      type: WHOAMI_SUCCESS,
      payload: {
        user: authData
      }
    });

    } catch (error) {
      // login failed dispatch failure
      yield put({
        type: WHOAMI_FAILURE,
        payload: {
          message: error.response.data.message,
          status: error.response.data.status
        }
      });
  }
}

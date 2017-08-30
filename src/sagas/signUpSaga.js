import {put, call} from "redux-saga/effects";
import {SIGNUP_FAILURE, SIGNUP_SUCCESS} from "../actions/constants";
import Api from "../common/authService";

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
        status: error.response.data.status
      }
    });
  }
}

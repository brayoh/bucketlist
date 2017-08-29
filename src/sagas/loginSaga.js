import {
  put,
  call
} from "redux-saga/effects";
import {
  LOGIN_FAILURE,
  LOGIN_SUCCESS
} from "../actions/constants";
import Api from "../common/app_requests";

export function* loginUser(data) {
  try {
    // make request to server
    const authData = yield call(Api.loginUser, data.user);
    // login was successful dispatch success
    yield put({
     type: LOGIN_SUCCESS,
     payload: {
       message: authData.message,
     }
   });
  } catch (error) {
    // login failed dispatch failure
    yield put({
     type: LOGIN_FAILURE,
     payload: {
       message: error.response.data.message,
     }
   });
  }
}

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGOUT_USER
} from "../actions/constants";

import initialState from "./defaultState";

export default function auth(state = initialState, action: Object) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return state;
      break;

    case LOGIN_SUCCESS:
      state = Object.assign({}, state, {
        authenticated: true
      })
      return state
      break;

    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        authenticated: false,
        message: action.payload.message,
        status: action.payload.status
      })
      break;
    case LOGOUT_USER:
      localStorage.removeItem("awesome_bucketlist_token");
      state = Object.assign({}, state, {
        authenticated: false
      });
    break;
    case SIGNUP_REQUEST:
      return state;
      break;

    case SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        message: action.payload.message,
        status: action.payload.status
      })
      break;

    case SIGNUP_FAILURE:
      return Object.assign({}, state, {
        authenticated: false,
        message: action.payload.message,
        status: action.payload.status
      })
      break;

    default:
      return state;
  }
}

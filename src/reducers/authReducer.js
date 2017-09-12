import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGOUT_USER,
  WHOAMI_REQUEST,
  WHOAMI_SUCCESS,
  WHOAMI_FAILURE,
  REDIRECT
} from "../actions/constants";

import initialState from "./defaultState";


export default function auth(state = initialState, action: Object) {
  switch (action.type) {
    case LOGIN_REQUEST:
    case WHOAMI_REQUEST:
    case SIGNUP_REQUEST:
      return state;

    case LOGIN_SUCCESS:
      state = Object.assign({}, state, {
        authenticated: true
      })
      return state

    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        authenticated: false,
        message: action.payload.message,
        status: action.payload.status
      })

    case LOGOUT_USER:
      localStorage.removeItem("awesome_bucketlist_token");
      return Object.assign({}, state, {
        authenticated: false,
        whoami: {}
      });


    case SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        message: action.payload.message,
        status: action.payload.status
      })

    case SIGNUP_FAILURE:
      return Object.assign({}, state, {
        authenticated: false,
        message: action.payload.message,
        status: action.payload.status
      })

    case WHOAMI_SUCCESS:
      return Object.assign({}, state, {
        authenticated: true,
        whoami: action.payload.user
      })

    case WHOAMI_FAILURE:
      return Object.assign({}, state, {
        authenticated: false,
        status: action.payload.status,
        message: action.payload.message
      })

    case REDIRECT:
      return state;

    default:
      return state;
  }
}

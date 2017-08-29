import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from "../actions/constants";

import initialState from "./defaultState";

export default function login(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return state;
      break;
    case LOGIN_SUCCESS:
      state = Object.assign({}, state, {
        authenticated: true,
        message: action.message
      })
      return state
      break;
    case LOGIN_FAILURE:

      return Object.assign({}, state, {
        authenticated: false,
        message: action.payload.message
      })
      break;
    default:
      return state;
  }
}

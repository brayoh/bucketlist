import {
  SIGNUP_REQUEST,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  WHOAMI_REQUEST,
  REDIRECT,
  LOGOUT_USER
} from "./constants";


export const login : Object = (user) => ({ type: LOGIN_REQUEST, user })

export const logoutUser : Object = () => ({ type: LOGOUT_USER })

export const loginUserSuccess : Object = () => ({ type: LOGIN_SUCCESS })

export const signup : Object = (user) => ({ type: SIGNUP_REQUEST, user })

export const whoami : Object = (token) => ({ type: WHOAMI_REQUEST, token })

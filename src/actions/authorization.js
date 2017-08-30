import {SIGNUP_REQUEST} from "./constants";
import {LOGIN_REQUEST, LOGIN_SUCCESS, WHOAMI_REQUEST} from "./constants";

export const login: Object = (user) => ({type: LOGIN_REQUEST, user})

export const loginUserSuccess: Object = () => ({type: LOGIN_SUCCESS})

export const signup: Object = (user) => ({type: SIGNUP_REQUEST, user})

export const whoami: Object = (token) => ({type: WHOAMI_REQUEST, token})

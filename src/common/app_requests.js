import instance from "./axios_config";
import LOGIN_FAILURE from "../actions/constants";
import {
  put
} from "redux-saga/effects";

function loginUser(user) {
  return instance.request({
    url: '/auth/login',
    method: 'POST',
    data: {
      username: user.username,
      password: user.password
    }
  }).then(function(response) {
    return response.data
  })
}

function registerUser(user) {
  return instance.request({
    url: '/auth/register',
    method: 'POST',
    data: {
      username: user.username,
      password: user.password
    }
  }).then(function(response) {
    return response.data
  })
}

const Api = Object.assign({}, {
  loginUser,
  registerUser
})

export default Api;

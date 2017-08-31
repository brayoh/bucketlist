import instance from "./axios_config";

function loginUser(user: Object) {
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

function fetchUserData(token) {
  return instance.request({
    url: '/whoami',
    method: 'GET',
    headers: {
      "Authorization":  token
    }
  }).then(function(response) {
    return response.data
  })
}

const Api = Object.assign({}, {
  loginUser,
  registerUser,
  fetchUserData
})

export default Api;

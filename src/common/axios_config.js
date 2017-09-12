import axios from "axios";

const instance = axios.create({
  baseURL: 'https://awesome-bucketlist-api.herokuapp.com/api/v1/',
  // baseURL: 'http://127.0.0.1:5000/api/v1/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// intercept requests and add authorization token
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('awesome_bucketlist_token');
  if (token) {
    config.headers.Authorization = token
  }
  return config;
});

export default instance;

import axios from "axios";
import queryString from 'query-string';
import store from "../app/store";



// Setup default config for http requests
const axiosFormClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-type': 'multipart/form-data',
  },
  paramsSerializer: params => queryString.stringify(params),
});

axiosFormClient.interceptors.request.use( (config) => {
  // Handle token here
  const access_token = store.getState().user.token;
  // console.log('access_token',access_token);
  if(access_token) {
    config.headers.Authorization = `Bearer ${access_token}`;
  }
    return config;
  }
  , error => Promise.reject(error)
);

axiosFormClient.interceptors.response.use((response) => {
  if(response && response.data) {
    return response.data;
  }
  return response;
}, (error) => {
  //Handle...
  throw error;
});

export default axiosFormClient;

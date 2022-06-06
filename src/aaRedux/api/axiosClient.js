import axios from "axios";
import queryString from "query-string";
import store from "../app/store";
// Setups the axios client for http requests
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: params => { queryString.stringify(params, { arrayFormat: 'brackets' }) },
});

axiosClient.interceptors.request.use((config) => {
  // Handle token here
  const access_token = store.getState().user.access_token;
  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`;
  }
  return config;
},
error => Promise.reject(error));

axiosClient.interceptors.response.use((response) => {
  if (response && response.data ) {
    return response.data;
  }
  return response;
}, (error) => {
  // Handle error here
  throw error;
});

export default axiosClient;
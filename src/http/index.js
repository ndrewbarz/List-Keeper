import axios from "axios";

export const API_URl = "https://your-list-app.herokuapp.com/api";

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URl,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem(
    "accessToken"
  )}`;
  return config;
});

export default $api;

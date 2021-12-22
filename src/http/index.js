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

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get(`${API_URl}/refresh`, {
          withCredentials: true,
        });
        localStorage.setItem("accessToken", response.data.accessToken);
        return $api.request(originalRequest);
      } catch (e) {
        console.log("UNAUTHORIZED");
      }
    }
    throw error;
  }
);

export default $api;

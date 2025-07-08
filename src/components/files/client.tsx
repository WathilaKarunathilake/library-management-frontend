import { logoutUser } from "@/auth/AuthProvider";
import { API_URL } from "@/config";
import { getToken } from "@/storage/Storage";
import axios from "axios";
import { showErrorToast } from "./toast";

const apiClient = axios.create({
  baseURL: API_URL,
});

apiClient.interceptors.request.use(config => {
  const token = getToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      logoutUser();
      window.location.href = "/login";
      showErrorToast("User session timeout")
    }
    return Promise.reject(error);
  }
);

export default apiClient;

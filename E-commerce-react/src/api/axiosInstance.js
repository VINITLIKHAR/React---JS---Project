import axios from 'axios';

export const API_BASE_URL = "API_LINK_HERE";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

export default axiosInstance;
import axios, { AxiosInstance } from 'axios';

const config = {
  backend: {
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  },
};

const server = config.backend.baseURL;

const api: AxiosInstance = axios.create({
  baseURL: server,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

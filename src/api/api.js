import axios from "axios";

export const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: backendUrl,
  withCredentials: true,
});

export default api;

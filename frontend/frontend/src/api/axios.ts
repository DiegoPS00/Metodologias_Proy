import axios from "axios";
import { alertError } from "../utils/alerts";

export const api = axios.create({
  baseURL: "http://localhost:3001",
});

// Token automático con corrección real
api.interceptors.request.use((config) => {
  let token = localStorage.getItem("token");

  if (token) {
    // Elimina prefijos duplicados
    token = token.replace("Bearer ", "").trim();

    // Envía solo 1 Bearer
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Manejo global de errores
api.interceptors.response.use(
  (res) => res,
  (err) => {
    alertError(err.response?.data?.message || "Error de servidor");
    return Promise.reject(err);
  }
);

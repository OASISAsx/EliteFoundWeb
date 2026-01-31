import axios from "axios";
import { signOut } from "next-auth/react";

export const serverApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

serverApi.interceptors.request.use(
  (config) => {
    console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);

    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 🔹 ดัก 401 → logout อัตโนมัติ
serverApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      await signOut({ callbackUrl: "/login" });
    }

    return Promise.reject(error);
  },
);

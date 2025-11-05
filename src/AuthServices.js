// authService.js
import axios from "axios";

// Base URL should stop at /users
const API_URL = "http://localhost:9000/api/users"; 

export const signup = async (userData) => {
  const res = await axios.post(`${API_URL}/reg`, userData);
  return res.data;
};

export const login = async (userData) => {
  const res = await axios.post(`${API_URL}/login`, userData);
  if (res.data.token) {
    localStorage.setItem("token", res.data.token);
  }
  return res.data;
};

export const logout = () => {
  localStorage.removeItem("token");
};

import axios from "axios";

const API_URL = "http://localhost:3000/api/user";
const token = localStorage.getItem("token");

export const Signin = async (payload) => {
  const res = await axios.post(`${API_URL}/login`, payload);
  return res.data;
};

export const Signup = async (payload) => {
  const res = await axios.post(`${API_URL}/register`, payload);
  return res.data;
};

export const getAllUser = async () => {
  const res = await axios.get(`${API_URL}/getAll`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getUserById = async () => {
  const res = await axios.get(`${API_URL}/getUserById`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

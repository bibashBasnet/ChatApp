import axios from "axios";

const API_URL = "http://localhost:3000/api/user";

export const Signin = async (payload) => {
  const res = await axios.post(`${API_URL}/login`, payload);
  return res.data;
};

export const Signup = async (payload) => {
  const res = await axios.post(`${API_URL}/register`, payload);
  return res.data;
};

import axios from "axios";

const API_URL = "http://localhost:3000/api/message";
const token = localStorage.getItem("token");

export const getMessage = async (payload) => {
  try {
    const res = await axios.post(`${API_URL}/getMessage`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (e) {
    console.log("This error is from message api", e.response.data.error);
  }
};

export const createMessage = async (payload) => {
  try {
    const res = await axios.post(`${API_URL}/createMessage`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (e) {
    console.log(e.response.data.error);
  }
};

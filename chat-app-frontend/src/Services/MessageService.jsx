const API_URL = "http://localhost:3000/api/message";
const token = localStorage.getItem("token");

export const getMessage = async (payload) => {
  console.log("Api called");
  try {
    const res = await axios.post(`${API_URL}/getMessage`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (e) {
    console.log("This error is from message api", e.response.message);
  }

  console.log("Res", JSON.stringify(res));
  return res;
};

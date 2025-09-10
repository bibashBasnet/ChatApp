import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Signin } from "../Services/UserService";

const LoginPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    if (!username || !password) {
      alert("Enter all the credentials");
    }
    const payload = {
      username,
      password,
    };
    try {
      const res = await Signin(payload);
      localStorage.setItem("token", res.token);
      navigate("/");
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center bg-white cursor-default ">
      <div className="max-w-md my-30 bg-gray-100 rounded-lg shadow-lg">
        <div className="w-full flex items-center justify-center flex-col">
          <div className="flex flex-col text-center mt-5 mb-10">
            <p className="text-xl font-bold mb-1">Welcome Back!</p>
            <p className="font-semibold">Please Login to Continue</p>
          </div>
          <div className="w-full grid grid-cols-3 px-6 mt-10 mb-5">
            <label className="col-span-1" htmlFor="username">
              UserName:
            </label>
            <input
              id="username"
              name="username"
              type="text"
              className="border col-span-2 mb-5 rounded px-1 hover:ring-2 hover:ring-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label className="col-span-1" htmlFor="password">
              Password:{" "}
            </label>
            <input
              type="password"
              className="border col-span-2 rounded px-1 hover:ring-2 hover:ring-blue-400 focus:outline-none focus:ring-2 focus: ring-blue-400"
              name="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button
            className="max-w-md col-spans-3 items-center justify-center border rounded px-5 py-1 hover:ring-2 hover:ring-blue-400 hover:text-blue-400"
            onClick={handleSubmit}
          >
            Login
          </button>
          <div className="flex flex-col items-center mt-10">
            <p>Do not have an account?</p>
            <div className="gap-2 flex">
              <p>Please</p>
              <button
                className="cursor-pointer"
                onClick={() => {
                  navigate("/signup");
                }}
              >
                <p className="font-semibold hover:ring-2 hover:ring-blue-400 rounded px-1 hover:text-blue-400 pb-1">
                  sign up
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

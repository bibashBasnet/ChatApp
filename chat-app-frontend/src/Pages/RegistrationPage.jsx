import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Signup } from "../Services/UserService";

const RegistrationPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async () => {
    if (!fullname || !username || !password || !confirmPassword) {
      alert("Enter all the credentials");
      return;
    }
    if (password != confirmPassword) {
      alert("The password doesnot match with the confirm password");
      return;
    }
    const payload = {
      username,
      password,
      fullname,
    };
    try {
      const res = await Signup(payload);
      alert(res.message);
      navigate("/");
    } catch (e) {
      alert(e.response.data.message);
    }
  };
  return (
    <div className="min-h-screen flex justify-center bg-white cursor-default ">
      <div className="max-w-xl my-30 bg-gray-100 rounded-lg shadow-lg">
        <div className="w-full flex items-center justify-center flex-col">
          <div className="flex flex-col text-center mt-5 mb-5">
            <p className="text-xl font-bold mb-1">Signup Form</p>
            <p className="font-semibold">Please Enter you credentails</p>
          </div>
          <div className="w-full grid grid-cols-3 px-6 mt-10 mb-5">
            <label className="col-span-1" htmlFor="fullname">
              FullName:
            </label>
            <input
              id="fullname"
              name="fullname"
              type="text"
              className="border col-span-2 mb-5 rounded px-1 hover:ring-2 hover:ring-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
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
              Password:
            </label>
            <input
              type={show ? "password" : "text"}
              className="border col-span-2 mb-5 rounded px-1 hover:ring-2 hover:ring-blue-400 focus:outline-none focus:ring-2 focus: ring-blue-400"
              name="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button
              onClick={() => setShow(!show)}
              className="absolute right-6  top-[49vh] mr-120 text-gray-600 "
            >
              {show ? "🙈" : "👁️"}
            </button>
            <label className="col-span-1 pr-2" htmlFor="confirmPassword">
              Confirm Password:
            </label>
            <input
              type={showPassword ? "password" : "text"}
              className="border col-span-2 rounded px-1 hover:ring-2 hover:ring-blue-400 focus:outline-none focus:ring-2 focus: ring-blue-400"
              name="confirmPassword"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-6  top-[56vh] mr-120 text-gray-600 "
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          <button
            className="max-w-md col-spans-3 items-center mt-5 justify-center border rounded px-5 py-1 hover:ring-2 hover:ring-blue-400 hover:text-blue-400"
            onClick={handleSubmit}
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;

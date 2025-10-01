import { useEffect, useState } from "react";
import Card from "../Components/Card";
import { useNavigate } from "react-router-dom";
import { getAllUser } from "../Services/UserService";
import { createMessage, getMessage } from "../Services/MessageService";

const HomePage = () => {
  const navigate = useNavigate();

  const [text, setText] = useState("");
  const [id, setId] = useState("1");
  const [users, setUser] = useState([]);
  const [messages, setMessage] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllUser();
        setUser(res);
      } catch (e) {
        alert(e.response.data.message);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async () => {
    const payload = {
      receiver: selectedUser._id,
      message: text,
    };
    try {
      const res = await createMessage(payload);
      console.log("Response = ", res.data.message);
    } catch (e) {
      console.log("error: ", e);
    }
  };

  const handleSelect = async (user) => {
    setSelectedUser(user);
    const payload = {
      receiver: user._id,
    };
    try {
      const res = await getMessage(payload);
      console.log("messages = ", JSON.stringify(res.data.messages, null, 2));
    } catch (e) {
      alert(e);
      console.log("error", e);
    }
  };

  const handleClick = async () => {
    const confirm = window.confirm("Are you sure you want to log out?");
    if (confirm) {
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  return (
    <div className="bg-white rounded min-h-screen items-center justify-center">
      <div className="grid grid-cols-3 min-h-screen gap-4 p-4">
        <div className="shadow bg-gray-100 rounded-lg w-full px-2 py-2">
          <div className="border bg-gray-200 mb-10 rounded hover:ring-2 hover:ring-blue-400 ">
            <input
              type="text"
              className="w-full rounded p-1 opacity-60 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Type username"
            />
          </div>
          <div className="h-[70vh]">
            {users.map((user) => (
              <div
                key={user._id}
                onClick={() => {
                  handleSelect(user);
                }}
              >
                <Card text={user.fullname} from="user" />
              </div>
            ))}
          </div>
          <div className="w-full">
            <button
              className="shadow bg-red-500 w-full py-2 mt-10 rounded text-white hover:outline-none hover:ring-2 hover:ring-blue-400 hover:text-lg"
              onClick={handleClick}
            >
              Logout
            </button>
          </div>
        </div>
        <div className="shadow bg-gray-100 rounded-lg w-full px-2 py-2 col-span-2">
          <p className="text-center h-[10vh] text-xl font-bold my-3 ">
            Messages
          </p>
          <div className="h-[70vh] w-full overflow-y-auto grid grid-cols-2 auto-rows-min gap-4 px-5 min-w-0">
            {messages.map((m, idx) => {
              const mine = m.sender === id;
              return (
                <div
                  key={m._id ?? m.id ?? idx}
                  className={`col-span-2 ${
                    mine ? "justify-self-end" : "justify-self-start"
                  } min-w-0`}
                >
                  <Card text={m.message} mine={mine} />
                </div>
              );
            })}
          </div>

          <div className="h-[6vh] grid grid-cols-10 gap-2 mt-5 rounded">
            <input
              type="text"
              placeholder="Enter message"
              className="col-span-9 shadow bg-gray-200 text-center rounded "
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button
              className="col-span-1 bg-gray-200 shadow hover:ring-2 hover:ring-blue-400 rounded hover:text-blue-400"
              onClick={handleSubmit}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

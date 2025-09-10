import { useState } from "react";
import Card from "../Components/Card";

const HomePage = () => {
  const [text, setText] = useState("");
  const [id, setId] = useState("1");
  const [users, setUser] = useState([
    { id: "1", fullname: "Bibash" },
    { id: "2", fullname: "Ramesh" },
  ]);
  const [messages, setMessage] = useState([
    { id: "1", message: "Hikkkkkkkkkkkkkkkkkk", sender: "1", receiver: "2" },
    { id: "2", message: "hello", sender: "2", receiver: "1" },
    { id: "3", message: "Hi", sender: "1", receiver: "2" },
    { id: "4", message: "hello", sender: "2", receiver: "1" },
    { id: "5", message: "Hi", sender: "1", receiver: "2" },
    { id: "6", message: "hello", sender: "2", receiver: "1" },
    { id: "7", message: "Hi", sender: "1", receiver: "2" },
    { id: "8", message: "hello", sender: "2", receiver: "1" },
    { id: "9", message: "Hi", sender: "1", receiver: "2" },
    { id: "10", message: "hello", sender: "2", receiver: "1" },
    { id: "11", message: "Hi", sender: "1", receiver: "2" },
    { id: "12", message: "hello", sender: "2", receiver: "1" },
  ]);

  const handleSubmit = async () => {};

  return (
    <div className="bg-white rounded min-h-screen items-center justify-center">
      <div className="grid grid-cols-3 min-h-screen gap-4 p-4">
        <div className="shadow bg-gray-100 rounded-lg w-full px-2 py-2">
          <div className="bg-gray-200 mb-10 rounded hover:ring-2 hover:ring-blue-400 ">
            <input
              type="text"
              className="w-full rounded p-1 opacity-60 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Type username"
            />
          </div>
          {users.map((user) => (
            <div key={user.id}>
              <Card text={user.fullname} from="user" />
            </div>
          ))}
        </div>
        <div className="shadow bg-gray-100 rounded-lg w-full px-2 py-2 col-span-2">
          <p className="border text-center h-[10vh] text-xl font-bold my-3 border">
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

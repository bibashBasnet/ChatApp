import { useEffect } from "react";
import { io } from "socket.io-client";

function App() {
  useEffect(() => {
    // Connect to backend
    const socket = io("http://localhost:3000", {
      transports: ["websocket"], // ensures websocket only
    });

    socket.on("Messages:change", (payload) => {
      console.log("📢 Message change:", payload);
    });

    socket.on("connect", () => {
      console.log("✅ Connected:", socket.id);
    });

    socket.on("users:change", (payload) => {
      console.log("📢 DB Change:", payload);
    });

    socket.on("disconnect", () => {
      console.log("❌ Disconnected");
    });

    // cleanup on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>React + Socket.IO Test</h1>
      <p>Open the console to see DB updates.</p>
    </div>
  );
}

export default App;

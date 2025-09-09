const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
const MessageModel = require("../Models/MessageModel");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: "*" });

await mongoose.connect(process.env.MONGODB_URI);

const message = new MessageModel();

const changeStream = message.watch(
  [
    {
      $match: {
        operationType: { $in: ["insert", "create", "replace", "delete"] },
      },
    },
  ],
  { fullDocument: "updateLookup" }
);

changeStream.on("change", (change) => {
  const payload = {
    type: change.operationType,
    id: (change.documentKey && change.documentKey._id) || null,
    doc: change.fullDocument
      ? {
          id: change.fullDocument._id,
          message: change.fullDocument.message,
          sender: change.fullDocument.sender,
          receiver: change.fullDocument.receiver,
        }
      : null,
    updatedFields: change.updateDescription?.updatedFields,
    removedFields: change.updateDescription?.removedFields,
  };

  io.emit("Messages:change", payload);
});

io.on("connection", (socket) => {
  console.log("client connected ", socket.id);
  socket.on("disconnect", () => {
    console.log("client disconnected ", socket.id);
  });
});

server.listen(process.env.PORT || 5000, () => {
  console.log("server is listening on ", process.env.Port || 5000);
});

// middleware/realtime.js
const { Server } = require("socket.io");
const mongoose = require("mongoose");

function attachRealtime(httpServer) {
  // 1) Attach Socket.IO to the existing HTTP server
  const io = new Server(httpServer, { cors: { origin: "*" } });

  const message = new MessageModel();

  const changeStream = User.watch(
    [
      {
        $match: {
          operationType: { $in: ["insert", "update", "replace", "delete"] },
        },
      },
    ],
    { fullDocument: "updateLookup" }
  );

  changeStream.on("change", (change) => {
    const payload = {
      type: change.operationType,
      id: (change.documentKey && change.documentKey._id) || null,
      doc: change.fullDocument
        ? {
            id: change.fullDocument._id,
            message: change.fullDocument.message,
            sender: change.fullDocument.sender,
            receiver: change.fullDocument.receiver,
          }
        : null,
      updatedFields: change.updateDescription?.updatedFields,
      removedFields: change.updateDescription?.removedFields,
    };

    io.emit("Messages:change", payload);
  });

  io.on("connection", (socket) => {
    console.log("socket connected:", socket.id);
    socket.on("disconnect", () =>
      console.log("socket disconnected:", socket.id)
    );
  });

  // allow graceful shutdown from the caller
  const closeAll = async () => {
    try {
      await changeStream.close();
    } catch {}
    io.close();
  };

  return { io, closeAll };
}

module.exports = { attachRealtime };

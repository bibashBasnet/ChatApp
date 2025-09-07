const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();
dotenv.config();

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("DB connected");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((e) => {
    console.log("MongoDB connection error");
  });

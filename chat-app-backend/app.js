const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRouter = require("./Routes/UserRoute");
const app = express();
dotenv.config();

app.use(express.json());

app.use("/api/user", userRouter);

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

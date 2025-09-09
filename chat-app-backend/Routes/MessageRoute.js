const express = require("express");
const {
  getMessage,
  createMessage,
} = require("../Controllers/MessageController");
const authMiddleware = require("../MiddleWares/authMiddleware");
const router = express.Router();

router.get("/getMessage", authMiddleware, getMessage);
router.post("/createMessage", authMiddleware, createMessage);

module.exports = router

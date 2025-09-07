const express = require("express");
const router = express.Router();
const UserController = require("../Controllers/UserController");
const authMiddleware = require("../MiddleWares/authMiddleware");

router.post("/register", UserController.register);
router.get("/login", UserController.login);
router.get("/getAll", authMiddleware, UserController.getAllUser);

module.exports = router;

const express = require("express");
const router = express.Router();
const UserController = require("../Controllers/UserController");
const authMiddleware = require("../MiddleWares/authMiddleware");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/getAll", authMiddleware, UserController.getAllUser);
router.get("/getUserById", authMiddleware, UserController.getUserById);

module.exports = router;

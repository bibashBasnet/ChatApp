const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../Models/UserModel");
const dotenv = require("dotenv");

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

exports.register = async (req, res) => {
  const { fullname, username, password } = req.body;
  try {
    const exist = await UserModel.findOne({ username });
    if (exist) {
      return res.status(400).json({ message: "User already exist" });
    }
    const user = new UserModel({ fullname, username, password });
    await user.save();
    return res.status(201).json({ message: "User has been registered" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "User doesnot exist" });
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(401).json({ message: "Incorrect password" });
    }
    const token = jwt.sign(
      { id: user._id, username: user.username, fullname: user.fullname },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.getAllUser = async (req, res) => {
  try {
    const users = await UserModel.find().select("_id fullname");
    return res.status(201).json(users);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

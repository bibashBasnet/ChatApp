const mongoose = require("mongoose");
const bycrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bycrypt.hash(this.password, 10);
  next();
});

userSchema.method.comparePassword = function (candidatePassword) {
  return bycrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);

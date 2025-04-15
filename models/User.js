const mongoose = require("mongoose");
const { resetPassword } = require("../controllers/authController");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user", 
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date
});

module.exports = mongoose.model("User", UserSchema);
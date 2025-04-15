const User = require("..//User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Default to "user" role if no role is provided
    const userRole = role === "admin" ? "admin" : "user";
    user = new User({ name, email, password, role: userRole });

    // Encrypt password
    user.password = await bcrypt.hash(password, 10);

    await user.save();

    const token = jwt.sign({ user: { id: user._id, role: user.role } }, process.env.JWT_SECRET, { expiresIn: "24h" });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ user: { id: user._id, role: user.role } }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

dotenv.config();
const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

exports.forgotPassword = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const tokenExpire = Date.now() + 3600000;

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = tokenExpire;
    await user.save();

    const resetUrl = `http://localhost:5000/resetpassword/${resetToken}`;

    const mailMessage = {
      from: process.env.EMAIL,
      to: user.email,
      subject: "Password Reset",
      text: `You are receiving this email because you (or someone else) has requested the reset of the password. Please make a PUT request to: \n\n ${resetUrl}`,
    };

    await transport.sendMail(mailMessage);


  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    
    let user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid token" });
    }

    if(newPassword.length < 6) {
      return res.status(400).json({ message: "Password must be at least 8 characters" });
    }

    user.password = await bcrypt.hash(newPassword, 10);

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({ message: "Password updated" });
  }catch (error) {
    res.status(500).json({ error: error.message });
  }

}
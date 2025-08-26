const express = require("express");
const { login, register, forgotPassword, resetPassword, getCurrentUser, changePassword, deleteAccount } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:resetToken", resetPassword);
router.get("/me", protect, getCurrentUser);
router.put("/changepassword", protect, changePassword);
router.delete("/deleteaccount", protect, deleteAccount);

module.exports = router;
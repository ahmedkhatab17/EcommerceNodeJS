const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes for logged-in users
exports.protect = async (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.user.id); // ✅ تعديل هنا

    if (!req.user) {
      return res.status(401).json({ message: 'User not found' });
    }

    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, invalid token' });
  }
};

// Admin-only middleware
exports.adminOnly = (req, res, next) => {
  console.log(req.user); // ✅ لطباعة بيانات المستخدم والتحقق من الدور

  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as admin' });
  }
};

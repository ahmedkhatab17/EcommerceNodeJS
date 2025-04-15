const express = require('express');
const { createCategory, getAllCategories } = require('../controllers/categoryController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

// Routes
router.post('/', protect, adminOnly, createCategory); // Admin only
router.get('/', getAllCategories); // Public route

module.exports = router;

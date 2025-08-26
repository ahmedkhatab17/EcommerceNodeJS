const express = require('express');
const { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } = require('../controllers/categoryController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

// Routes
router.post('/', protect, adminOnly, createCategory); // Admin only
router.get('/', getAllCategories); // Public route
router.get('/:id', getCategoryById); // Public route
router.put('/:id', protect, adminOnly, updateCategory); // Admin only
router.delete('/:id', protect, adminOnly, deleteCategory); // Admin only

module.exports = router;

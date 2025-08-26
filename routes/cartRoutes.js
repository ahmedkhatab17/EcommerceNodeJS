const express = require('express');
const { addToCart, removeFromCart, getCart, updateCartItem, clearCart } = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Routes
router.post('/add', protect, addToCart);
router.delete('/remove', protect, removeFromCart);
router.put('/update', protect, updateCartItem);
router.delete('/clear', protect, clearCart);
router.get('/', protect, getCart);

module.exports = router;

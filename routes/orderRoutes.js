const express = require('express');
const { createOrder, getAllOrders, getUserOrders } = require('../controllers/orderController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const router = express.Router();

// Routes
router.post('/', protect, createOrder); // User can create an order
router.get('/', protect, adminOnly, getAllOrders); // Admin can get all orders
router.get('/user', protect, getUserOrders); // User can get their orders


module.exports = router;

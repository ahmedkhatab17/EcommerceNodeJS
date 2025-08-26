const express = require('express');
const { createOrder, getAllOrders, getUserOrders, updateOrderStatus, getOrderById } = require('../controllers/orderController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, createOrder);
router.get('/', protect, adminOnly, getAllOrders);
router.get('/user', protect, getUserOrders);
router.get('/:id', protect, getOrderById);
router.put('/:id/status', protect, adminOnly, updateOrderStatus);

module.exports = router;

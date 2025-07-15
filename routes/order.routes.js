const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth.middleware');
const { createOrder, getUserOrders } = require('../controllers/order.controller');

// 🛒 Place a new order from the cart
router.post('/', auth, createOrder);

// 📜 View all orders of logged-in customer
router.get('/', auth, getUserOrders);

module.exports = router;

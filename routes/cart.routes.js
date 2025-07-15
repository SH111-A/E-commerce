const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth.middleware');
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart
} = require('../controllers/cart.controller');

router.use(auth);

router.get('/', getCart);
router.post('/', addToCart);
router.put('/', updateCartItem);
router.delete('/:productId', removeFromCart);

module.exports = router;

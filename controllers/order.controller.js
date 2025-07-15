const Cart = require('../models/cart.model');
const Order = require('../models/order.model');

// 📦 Create a new order using cart
exports.createOrder = async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user._id });
  if (!cart || cart.items.length === 0) {
    return res.status(400).send('Cart is empty');
  }

  const order = new Order({
    userId: req.user._id,
    products: cart.items
  });

  await order.save();
  await Cart.findOneAndDelete({ userId: req.user._id });
  res.status(201).json(order);
};

// 📜 Get all orders of the logged-in customer
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).populate('products.productId');
    res.json(orders);
  } catch (err) {
    res.status(500).send('Error fetching orders');
  }
};

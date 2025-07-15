const Cart = require('../models/cart.model');

exports.getCart = async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user._id }).populate('items.productId');
  res.json(cart || { items: [] });
};

exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  let cart = await Cart.findOne({ userId: req.user._id });
  if (!cart) cart = new Cart({ userId: req.user._id, items: [] });

  const itemIndex = cart.items.findIndex(i => i.productId.equals(productId));
  if (itemIndex > -1) cart.items[itemIndex].quantity += quantity;
  else cart.items.push({ productId, quantity });

  await cart.save();
  res.json(cart);
};

exports.updateCartItem = async (req, res) => {
  const { productId, quantity } = req.body;
  const cart = await Cart.findOne({ userId: req.user._id });
  const item = cart.items.find(i => i.productId.equals(productId));
  if (item) item.quantity = quantity;
  await cart.save();
  res.json(cart);
};

exports.removeFromCart = async (req, res) => {
  const { productId } = req.params;
  const cart = await Cart.findOne({ userId: req.user._id });
  cart.items = cart.items.filter(i => !i.productId.equals(productId));
  await cart.save();
  res.json(cart);
};

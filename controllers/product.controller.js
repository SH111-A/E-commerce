const Product = require('../models/product.model');

exports.getAllProducts = async (req, res) => {
  const { search, category, page = 1, limit = 5 } = req.query;
  const query = {};
  if (search) query.name = new RegExp(search, 'i');
  if (category) query.category = category;

  const products = await Product.find(query)
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  res.json(products);
};

exports.addProduct = async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.status(201).json(product);
};

exports.updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(product);
};

exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.send('Product deleted');
};

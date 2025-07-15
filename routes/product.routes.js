const express = require('express');
const router = express.Router();
const { auth, authorizeRoles } = require('../middlewares/auth.middleware');
const {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/product.controller');

// Public: View products
router.get('/', getAllProducts);

// Admin only
router.post('/', auth, authorizeRoles('admin'), addProduct);
router.put('/:id', auth, authorizeRoles('admin'), updateProduct);
router.delete('/:id', auth, authorizeRoles('admin'), deleteProduct);

module.exports = router;

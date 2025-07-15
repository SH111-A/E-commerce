require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

// ✅ Allow cross-origin requests from frontend (e.g., localhost:5500)
app.use(cors());

// ✅ Parse incoming JSON requests
app.use(express.json());

// ✅ Serve static files (frontend HTML/JS)
app.use(express.static(path.join(__dirname, 'public')));

// ✅ API Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/products', require('./routes/product.routes'));
app.use('/api/cart', require('./routes/cart.routes'));
app.use('/api/orders', require('./routes/order.routes'));

// ✅ Connect to MongoDB (Mongoose v7+)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ MongoDB Connected');

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📦 API ready at http://localhost:${PORT}/api`);
  });
})
.catch(err => {
  console.error('❌ MongoDB Connection Error:', err);
});

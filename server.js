const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Add a root route for testing
app.get('/', (req, res) => {
  res.json({ 
    message: 'E-commerce API is running! 🚀',
    endpoints: {
      products: '/products',
      categories: '/categories',
      auth: '/auth',
      cart: '/cart',
      orders: '/orders',
      health: '/health'
    }
  });
});

// Import routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Mount routes with error handling
try {
  app.use('/auth', authRoutes);
  console.log('✅ Auth routes mounted');
} catch (error) {
  console.error('❌ Error mounting auth routes:', error);
}

try {
  app.use('/products', productRoutes);
  console.log('✅ Product routes mounted');
} catch (error) {
  console.error('❌ Error mounting product routes:', error);
}

try {
  app.use('/categories', categoryRoutes);
  console.log('✅ Category routes mounted');
} catch (error) {
  console.error('❌ Error mounting category routes:', error);
}

try {
  app.use('/cart', cartRoutes);
  console.log('✅ Cart routes mounted');
} catch (error) {
  console.error('❌ Error mounting cart routes:', error);
}

try {
  app.use('/orders', orderRoutes);
  console.log('✅ Order routes mounted');
} catch (error) {
  console.error('❌ Error mounting order routes:', error);
}

// Debug route to test if routes are loaded
app.get('/debug/routes', (req, res) => {
  res.json({
    message: 'Routes debug info',
    routes: app._router.stack
      .filter(layer => layer.route)
      .map(layer => ({
        path: layer.route.path,
        methods: Object.keys(layer.route.methods)
      }))
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// 404 handler for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: `The route ${req.originalUrl} does not exist`,
    availableRoutes: [
      '/',
      '/health',
      '/auth',
      '/products',
      '/categories',
      '/cart',
      '/orders',
      '/debug/routes'
    ]
  });
});

const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`🚀 Server running on ${HOST}:${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Health check: http://${HOST}:${PORT}/health`);
});
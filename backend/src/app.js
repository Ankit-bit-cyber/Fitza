const express = require('express');
const cors = require('cors');
const errorMiddleware = require('./middlewares/error.middleware');

const authRoutes    = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');
const cartRoutes    = require('./routes/cart.routes');
const orderRoutes   = require('./routes/order.routes');

const app = express();

const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Public routes
app.use('/api/auth',     authRoutes);
app.use('/api/products', productRoutes);

// Protected routes
app.use('/api/cart',     cartRoutes);
app.use('/api/order',    orderRoutes);

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Fitza API running 🚀' });
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found.` });
});

app.use(errorMiddleware);

module.exports = app;
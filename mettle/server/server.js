// server.js

/**
 * Main server entry point
 * -----------------------
 * Sets up Express app, middleware, routes, MongoDB connection, and Swagger docs.
 */

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger.js';

// Import routes using ES module syntax with .js extension
import productRoutes from './routes/productRoutes.js';
import articleRoutes from './routes/articleRoutes.js';
import authRoutes from './routes/authRoutes.js';
import searchRoutes from './routes/searchRoutes.js';
import submissionRoutes from './routes/submissionRoutes.js';

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true,
}));
app.use(express.json()); // Parse JSON body requests

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/submission', submissionRoutes);

// Swagger API docs route (available at /api-docs)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mettleApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Debug log to verify JWT_SECRET loaded
console.log('JWT_SECRET is:', process.env.JWT_SECRET);

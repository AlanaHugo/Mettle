require('dotenv').config();

// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const swaggerSpec = require("./swagger");
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file

// Import route modules
const searchRoutes = require('./routes/searchroutes');
const productRoutes = require('./routes/productRoutes');
const articleRoutes = require('./routes/articleRoutes');
const authRoutes = require('./routes/authRoutes');
const submissionRoutes = require('./routes/submissionRoutes');

// Import Swagger middleware and spec
const swaggerUi = require("swagger-ui-express");

const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)
app.use(express.json()); // Parse incoming JSON requests

// Route definitions
app.use('/api/products', productRoutes); // Product-related routes
app.use('/api/articles', articleRoutes); // Article-related routes
app.use('/api/auth', authRoutes);        // Authentication routes
app.use("/api/search", searchRoutes);    // Search functionality routes
app.use('/api/submission', submissionRoutes); //Submission (new article) routes

// Swagger API documentation route (accessible at /api-docs)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Connect to MongoDB using connection string from .env or fallback to localhost
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mettleApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected')) // Success message
.catch(err => console.error('MongoDB connection error:', err)); // Error handler

// Start server on port defined in .env or fallback to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); // Log server startup
});

console.log('JWT_SECRET is:', process.env.JWT_SECRET);
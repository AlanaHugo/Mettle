// routes/productRoutes.js

/**
 * Product Routes
 * --------------
 * Handles fetching products.
 */

import express from 'express';
import mongoose from 'mongoose';
import Product from '../models/Product.js';  // Mongoose model for products

const router = express.Router();

/**
 * GET /api/products
 * Public route to get all products.
 */
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * GET /api/products/:id
 * Public route to get a single product by its ID.
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  // Validate MongoDB ObjectId format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid product ID format' });
  }

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

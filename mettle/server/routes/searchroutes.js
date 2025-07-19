// routes/searchRoutes.js

/**
 * Search Routes
 * --------------
 * Provides full-text search on products and articles collections.
 */

import express from 'express';
import Product from '../models/Product.js';
import Article from '../models/Article.js';

const router = express.Router();

/**
 * GET /api/search?q=searchTerm
 * Performs text search on products and articles collections.
 * Returns matching products and articles.
 */
router.get('/', async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ error: 'Missing search query parameter "q"' });
  }

  try {
    // Text search on products collection
    const productResults = await Product.find({
      $text: { $search: query }
    });

    // Text search on articles collection
    const articleResults = await Article.find({
      $text: { $search: query }
    });

    res.json({
      products: productResults,
      articles: articleResults
    });
  } catch (err) {
    console.error('Search failed:', err);
    res.status(500).json({ error: 'Search failed' });
  }
});

export default router;

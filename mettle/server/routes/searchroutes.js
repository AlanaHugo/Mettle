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
 * @swagger
 * tags:
 *   name: Search
 *   description: Full-text search on products and articles
 */

/**
 * @swagger
 * /api/search:
 *   get:
 *     summary: Search products and articles by query string
 *     tags: [Search]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: true
 *         description: The search term to query products and articles
 *         example: cancer
 *     responses:
 *       200:
 *         description: Search results containing matching products and articles
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *                 articles:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Article'
 *       400:
 *         description: Missing search query parameter "q"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Search failed due to server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
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

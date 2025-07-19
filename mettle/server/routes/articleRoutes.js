// routes/articleRoutes.js

/**
 * Article Routes
 * --------------
 * Handles CRUD operations for articles.
 * Uses JWT authentication middleware for protected routes.
 */

import express from 'express';
import Article from '../models/Article.js';                 // Mongoose model for articles
import authMiddleware from '../middleware/authMiddleware.js'; // JWT auth middleware

const router = express.Router();

/**
 * GET /api/articles
 * Public route to get all articles.
 */
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * GET /api/articles/:id
 * Public route to get a single article by ID.
 */
router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.json(article);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * POST /api/articles
 * Protected route to create a new article.
 * Requires a valid JWT token.
 */
router.post('/', authMiddleware, async (req, res) => {
  const { title, content, anonymous, aboutAuth, tags, image } = req.body;

  try {
    // Use 'Anonymous' if anonymous flag is true, else use user info from token
    const newArticle = new Article({
      title,
      content,
      author: anonymous ? 'Anonymous' : req.user.username || 'Unknown',
      aboutAuth,
      tags,
      image,
      createdAt: new Date(),
    });

    await newArticle.save();

    res.status(201).json(newArticle);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

// routes/articleRoutes.js
const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const authMiddleware = require('../middleware/authMiddleware');

// GET all articles
router.get('/', async (req, res) => {
  const articles = await Article.find();
  res.json(articles);
});

// GET one article by ID
router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: 'Article not found' });
    res.json(article);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new article (protected)
router.post('/', authMiddleware, async (req, res) => {
  const { title, content, anonymous } = req.body;

  try {
    const newArticle = new Article({
      title,
      content,
      author: anonymous ? 'Anonymous' : req.user.username,
      createdAt: new Date(),
    });

    await newArticle.save();
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Article = require('../models/Article');            // Mongoose model for articles
const authMiddleware = require('../middleware/authMiddleware');  // Middleware to protect routes

/**
 * @route   GET /api/articles
 * @desc    Get all articles from the database
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find();  // Fetch all articles from MongoDB
    res.json(articles);                      // Return articles as JSON response
  } catch (err) {
    res.status(500).json({ message: 'Server error' }); // Return 500 on failure
  }
});

/**
 * @route   GET /api/articles/:id
 * @desc    Get a single article by its ID
 * @access  Public
 */
router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);  // Find article by MongoDB ID
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });  // 404 if not found
    }
    res.json(article);  // Send back the found article data
  } catch (err) {
    res.status(500).json({ message: 'Server error' });  // Handle any errors
  }
});

/**
 * @route   POST /api/articles
 * @desc    Create a new article
 * @access  Protected (requires authentication)
 */
router.post('/', authMiddleware, async (req, res) => {
  // Destructure expected fields from request body
  const { title, content, anonymous, aboutAuth, tags, image } = req.body;

  try {
    // Create new Article document, conditionally set author
    const newArticle = new Article({
      title,
      content,
      author: anonymous ? 'Anonymous' : req.user.username,  // Use 'Anonymous' if flagged, else logged-in username
      aboutAuth,  // Short bio/description of the author
      tags,       // Optional array of tags for categorization
      image,      // Optional image URL or data string
      createdAt: new Date(),  // Set current timestamp on creation
    });

    await newArticle.save();    // Save new article to the MongoDB database

    // Respond with HTTP 201 Created and the saved article object
    res.status(201).json(newArticle);
  } catch (error) {
    // Log error for debugging if needed (optional)
    // console.error("Error creating article:", error);

    // Respond with 500 Internal Server Error if save fails
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

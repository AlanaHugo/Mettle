// Import Express to create a router
import express from "express";
// Import the Article model to interact with the database
import Article from "../models/Article.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Articles
 *   description: API for managing user-submitted articles
 */

/**
 * @swagger
 * /api/articles:
 *   get:
 *     summary: Get all articles. User does not need to be authenticated to view all summarised articles.
 *     tags: [Articles]
 *     responses:
 *       200:
 *         description: Successfully retrieved all articles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article'
 *       500:
 *         description: Server error
 */
// GET /api/articles - Retrieve all articles
router.get("/", async (req, res) => {
  try {
    const articles = await Article.find(); // Fetch all articles from DB
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: "Server error" }); // Send error if something goes wrong
  }
});

/**
 * @swagger
 * /api/articles/{id}:
 *   get:
 *     summary: Get a single article by ID to view the full content of the article.
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The article ID
 *     responses:
 *       200:
 *         description: Article found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       404:
 *         description: Article not found
 *       500:
 *         description: Server error
 */

// GET /api/articles/:id - Retrieve a single article by its ID
router.get("/:id", async (req, res) => {
  try {
    const article = await Article.findById(req.params.id); // Find article by ID
    if (!article) return res.status(404).json({ message: "Article not found" }); // Not found
    res.json(article);
  } catch (err) {
    res.status(500).json({ message: "Server error" }); // Error occurred
  }
});

export default router;

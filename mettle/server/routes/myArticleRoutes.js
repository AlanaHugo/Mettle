import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getMyArticles, updateArticle, deleteArticle } from "../controllers/articleController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Articles - My Articles
 *   description: Endpoints for managing articles created by the authenticated user
 */

/**
 * @swagger
 * /api/my-articles/mine:
 *   get:
 *     summary: Get all articles created by the authenticated user
 *     tags: [Articles - My Articles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's articles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article'
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/mine", authMiddleware, getMyArticles);

/**
 * @swagger
 * /api/my-articles/{id}:
 *   put:
 *     summary: Update an article by ID (only if owned by authenticated user)
 *     tags: [Articles - My Articles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Article ID to update
 *     requestBody:
 *       description: Article fields to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ArticleUpdate'
 *     responses:
 *       200:
 *         description: Article updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Article not found
 */
router.put("/:id", authMiddleware, updateArticle);

/**
 * @swagger
 * /api/my-articles/{id}:
 *   delete:
 *     summary: Delete an article by ID (only if owned by authenticated user)
 *     tags: [Articles - My Articles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Article ID to delete
 *     responses:
 *       200:
 *         description: Article deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Article not found
 */
router.delete("/:id", authMiddleware, deleteArticle);

export default router;

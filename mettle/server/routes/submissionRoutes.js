import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { createSubmission } from '../controllers/submissionController.js';

const router = express.Router();

console.log('✅ submissionRoutes file loaded');

/**
 * @swagger
 * tags:
 *   name: Articles - Submission
 *   description: Routes for article submissions by authenticated users
 */

/**
 * @swagger
 * /api/submission:
 *   post:
 *     summary: Allows an authenticated user to submit an article
 *     description: |
 *       Users can submit an article with optional anonymity, contact preference, and social info.
 *     tags: [Articles - Submission]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               aboutAuth:
 *                 type: string
 *                 description: Information about the author
 *               content:
 *                 type: string
 *                 description: The article content to submit
 *               contact:
 *                 type: boolean
 *                 description: Whether user agrees to be contacted
 *               social:
 *                 type: string
 *                 description: User's social/contact information (optional)
 *               anonymous:
 *                 type: boolean
 *                 description: Whether to submit the article anonymously
 *     responses:
 *       200:
 *         description: Submission successful
 *       401:
 *         description: Unauthorized - user not authenticated
 */

/**
 * POST /api/submission
 * Protected route to create a new article submission.
 */
router.post('/', authMiddleware, createSubmission);

/**
 * @swagger
 * /api/submission/test-auth:
 *   get:
 *     summary: Simple test to verify JWT authentication middleware
 *     tags: [Test - Submission]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns user info if authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   description: Authenticated user's info
 *       401:
 *         description: Unauthorized - invalid or missing token
 */

/**
 * GET /api/submission/test-auth
 * Simple test route to verify authMiddleware works and user info is available.
 */
router.get('/test-auth', authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

export default router;

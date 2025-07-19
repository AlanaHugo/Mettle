import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { createSubmission } from '../controllers/submissionController.js';

const router = express.Router();

console.log('✅ submissionRoutes file loaded');

/**
 * @swagger
 * tags:
 *   name: Submission
 *   description: Routes for article submissions
 */

/**
 * @swagger
 * /api/submission:
 *   post:
 *     summary: Allows an authenticated user to submit an article (with optional anonymity and contact).
 *     tags: [Submission]
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
 *               content:
 *                 type: string
 *               contact:
 *                 type: boolean
 *               social:
 *                 type: string
 *               anonymous:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Submission successful
 *       401:
 *         description: Unauthorized
 */
router.post('/', authMiddleware, createSubmission);

/**
 * @swagger
 * /api/submission/test-auth:
 *   get:
 *     summary: Test route to verify JWT middleware works.
 *     tags: [Submission]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns user info if authenticated
 *       401:
 *         description: Unauthorized
 */
router.get('/test-auth', authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

export default router;

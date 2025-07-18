
console.log("✅ submissionRoutes file loaded"); 


// Import Express to create the router
const express = require('express');
const router = express.Router(); // Create an instance of Express Router

// Import authentication middleware to protect the route
const authMiddleware = require('../middleware/authMiddleware');

// Import the controller function that handles submission logic
const { createSubmission } = require('../controllers/submissionController');


console.log('submissionRoutes loaded');

router.get("/test-auth", authMiddleware, (req, res) => {
  console.log("✅ /test-auth route hit");
  res.json({ user: req.user });
});

/**
 * @route   POST /api/submission
 * @desc    Submit a new article (requires authentication)
 * @access  Private
 *
 * Middleware:
 * - authMiddleware: Verifies JWT token and attaches user to request
 *
 * Controller:
 * - createSubmission: Handles the logic for creating and saving a new article
 */
router.post('/', authMiddleware, createSubmission);  // Protected route

// Export the router to be used in the main server file
module.exports = router;

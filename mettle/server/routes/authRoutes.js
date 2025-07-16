const express = require('express');
const bcrypt = require('bcryptjs');          // For hashing passwords securely
const jwt = require('jsonwebtoken');         // For generating and verifying JSON Web Tokens (JWT)
const User = require('../models/User');      // Mongoose User model
require('dotenv').config();                   // Load environment variables from .env file

const router = express.Router();              // Create a router to define routes modularly

/**
 * POST /register
 * Register a new user.
 * Expects JSON body: { firstName, lastName, email, password }
 * Checks if email already exists, hashes password, saves user.
 * Returns 201 on success or appropriate error messages.
 */
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // Check if user with this email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      // Email already registered - send client error
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password before saving for security
    const hashed = await bcrypt.hash(password, 10);

    // Create new user document with hashed password
    const user = new User({ firstName, lastName, email, password: hashed });

    // Save user to database
    await user.save();

    // Respond with success
    res.status(201).json({ message: 'User created' });
  } catch (err) {
    // Catch any unexpected errors
    console.error('Error in /register:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * POST /login
 * Authenticate user and return JWT.
 * Expects JSON body: { email, password }
 * Verifies credentials and returns token + user info.
 */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      // User not found
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare provided password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // Passwords don't match
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT token with user ID payload, expires in 1 day
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Return token and user info (exclude password)
    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
      }
    });
  } catch (err) {
    console.error('Error in /login:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * GET /me
 * Get current logged-in user info from JWT token.
 * Token expected in 'Authorization' header as 'Bearer <token>'.
 * Returns user data except password or relevant errors.
 */
router.get('/me', async (req, res) => {
  // Extract token from Authorization header
  const token = req.headers.authorization?.split(' ')[1]; // Format: 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify token and decode payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by ID, exclude password field for security
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return user data
    res.json(user);
  } catch (err) {
    console.error('Error in /me:', err);
    res.status(401).json({ message: 'Invalid token' });
  }
});

module.exports = router;  // Export router to be used in main server app

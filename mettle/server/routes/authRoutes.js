const express = require("express");
const bcrypt = require("bcryptjs"); // For hashing passwords securely
const jwt = require("jsonwebtoken"); // For generating/verifying JSON Web Tokens (JWT)
const User = require("../models/User"); // Mongoose User model
require("dotenv").config(); // Load environment variables from .env file

const router = express.Router(); // Create a router instance for modular routes

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User registration, login and profile retrieval
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: strongPassword123
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User created
 *       400:
 *         description: Email already registered
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 */
router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // Check if a user with this email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password securely before saving
    const hashed = await bcrypt.hash(password, 10);

    // Create new user with hashed password
    const user = new User({ firstName, lastName, email, password: hashed });

    // Save the new user document in the database
    await user.save();

    // Success response
    res.status(201).json({ message: "User created" });
  } catch (err) {
    console.error("Error in /register:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Authenticate user and return a JWT token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: strongPassword123
 *     responses:
 *       200:
 *         description: Authentication successful, returns JWT token and user info
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for authenticated requests
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: User ID
 *                     email:
 *                       type: string
 *                       format: email
 *       400:
 *         description: Invalid credentials (email or password)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare given password to hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Sign JWT token with user ID payload, expires in 1 day
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Return token and user info (excluding password)
    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Error in /login:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get currently authenticated user info
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []  # Indicates JWT bearer token required
 *     responses:
 *       200:
 *         description: Returns user information excluding password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 64f8e6dd31beec2b345abc78
 *                 email:
 *                   type: string
 *                   example: user@example.com
 *                 username:
 *                   type: string
 *                   example: johndoe
 *       401:
 *         description: No token provided or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/me", async (req, res) => {
  // Extract token from 'Authorization' header, format: 'Bearer <token>'
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    // Verify and decode token using JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by decoded ID and exclude password field
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return user info
    res.json(user);
  } catch (err) {
    console.error("Error in /me:", err);
    res.status(401).json({ message: "Invalid token" });
  }
});

module.exports = router;

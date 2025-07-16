const mongoose = require("mongoose");

/**
 * User Schema
 * -----------
 * Defines the structure of User documents in MongoDB.
 *
 * Fields:
 * - firstName: user's first name (required)
 * - lastName: user's last name (optional)
 * - email: unique identifier for the user (required)
 * - password: hashed password (required)
 *
 * Options:
 * - timestamps: automatically add createdAt and updatedAt fields
 */
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true, // First name is mandatory
    },

    lastName: {
      type: String,
      // Not required, optional field
    },

    email: {
      type: String,
      required: true, // Email is mandatory
      unique: true,   // Enforces unique emails across users
    },

    password: {
      type: String,
      required: true, // Password is mandatory
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

// Export the User model based on this schema for use in other files
module.exports = mongoose.model("User", userSchema);

const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },     // Article title (required)
  content: { type: String, required: true },   // Article body/content (required)
  author: String,                              // Author name (string)
  aboutAuth: { type: String, required: true },// Short author bio (required)
  tags: [String],                             // Optional array of tags (strings)
  image: String,                              // Optional image URL or data string
  createdAt: { type: Date, default: Date.now }, // Auto-set creation timestamp
});

// Add text index for efficient search on title and content fields
articleSchema.index({ title: "text", content: "text" });

module.exports = mongoose.model('Article', articleSchema);

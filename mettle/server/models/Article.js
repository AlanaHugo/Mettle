const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: String,
  tags: [String],
  image: String,
  createdAt: { type: Date, default: Date.now },
});

articleSchema.index({ title: "text", content: "text" });

module.exports = mongoose.model('Article', articleSchema);

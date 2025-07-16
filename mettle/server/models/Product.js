const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  imageUrl: String,
  createdAt: { type: Date, default: Date.now },
});

// text index for search (on relevant fields)
productSchema.index({ name: "text", description: "text", category: "text" });

module.exports = mongoose.model('Product', productSchema);

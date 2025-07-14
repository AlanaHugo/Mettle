const express = require("express");
const router = express.Router();

const Product = require("../models/Product");   
const Article = require("../models/Article");  

router.get("/", async (req, res) => {
  const query = req.query.q;

  try {
    const productResults = await Product.find({
      $text: { $search: query }
    });

    const articleResults = await Article.find({
      $text: { $search: query }
    });

    res.json({
      products: productResults,
      articles: articleResults
    });
  } catch (err) {
    console.error("Search failed:", err);
    res.status(500).json({ error: "Search failed" });
  }
});

module.exports = router;
